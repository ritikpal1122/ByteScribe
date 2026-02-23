import type { DocCategory } from './types';

export const K8S_PART5_CATEGORIES: DocCategory[] = [
  {
    id: 'k8s-helm',
    label: 'Helm & Package Management',
    icon: '⎈',
    entries: [
      {
        id: 'k8s-helm-intro',
        title: 'Introduction to Helm',
        difficulty: 'intermediate',
        tags: ['helm', 'charts', 'releases', 'package-management', 'helm3'],
        sections: [
          {
            heading: 'What is Helm?',
            content: 'Helm is the package manager for Kubernetes, often called the "apt/yum of Kubernetes." It bundles related Kubernetes manifests into a single unit called a chart. Charts are versioned, shareable, and can be published to repositories. Helm 3 (the current major version) removed the server-side Tiller component, making it more secure by storing release metadata directly in Kubernetes Secrets. A release is a deployed instance of a chart in a cluster. You can have multiple releases of the same chart with different configurations, enabling multiple environments from one chart definition.',
            code: `# Helm architecture overview (Helm 3)
# Client-only: no Tiller, uses kubeconfig directly

helm version
# Install a chart from a repo
helm install my-release bitnami/nginx

# List all releases
helm list -A

# Helm stores release state as Secrets
kubectl get secrets -l owner=helm -n default`,
            tip: 'Helm 3 uses Secrets to store release state in the same namespace as the release, improving multi-tenancy and security over Helm 2.'
          },
          {
            heading: 'Charts and Releases',
            content: 'A chart is a collection of files describing a related set of Kubernetes resources. Charts follow a specific directory structure: a Chart.yaml metadata file, a values.yaml file with default configuration, and a templates/ directory with Go-template manifests. A release is created when you run `helm install`, which renders the templates with provided values and applies them to the cluster. Each release gets a unique name within a namespace. Helm tracks release history, allowing rollbacks. Charts can declare dependencies on other charts via the Chart.yaml dependencies field, which Helm resolves using `helm dependency update`.',
            code: `graph TD
    A[Chart Repository] -->|helm repo add| B[Local Cache]
    B -->|helm install| C[Release]
    C -->|stored as| D[Kubernetes Secret]
    C -->|creates| E[K8s Resources]
    E --> F[Deployments]
    E --> G[Services]
    E --> H[ConfigMaps]
    C -->|helm upgrade| C
    C -->|helm rollback| C`,
            note: 'Each `helm upgrade` increments the release revision number. `helm history <release>` shows all revisions with their status and notes.'
          },
          {
            heading: 'Helm 3 Key Changes',
            content: 'Helm 3 made several breaking changes from Helm 2. Tiller was removed entirely, so Helm now uses your kubeconfig credentials directly, respecting existing RBAC policies. Release names are now scoped to a namespace rather than cluster-wide, so the same release name can exist in different namespaces. The `helm delete` command now fully removes releases by default (no `--purge` flag needed). Three-way strategic merge patches replaced two-way patches for upgrades, correctly handling changes made outside of Helm. The `requirements.yaml` file was consolidated into `Chart.yaml` under the `dependencies` key.',
            code: `# Helm 3: release names are namespace-scoped
helm install myapp ./mychart -n staging
helm install myapp ./mychart -n production  # OK in Helm 3

# Delete now fully removes (no --purge needed)
helm uninstall myapp -n staging

# Check release status
helm status myapp -n production

# Show computed values for a release
helm get values myapp -n production`,
            analogy: 'Think of Helm releases like Git commits — each upgrade creates a new revision, and you can roll back to any previous state just like `git checkout`.'
          }
        ]
      },
      {
        id: 'k8s-helm-install',
        title: 'Installing & Using Helm',
        difficulty: 'intermediate',
        tags: ['helm', 'install', 'upgrade', 'rollback', 'lifecycle'],
        sections: [
          {
            heading: 'Installing and Upgrading Releases',
            content: 'The `helm install` command deploys a chart as a new release. You specify a release name, chart reference, and optional value overrides. The `helm upgrade` command updates an existing release with new chart version or changed values. Use `--install` flag to perform an install if the release does not exist, or an upgrade if it does — this idempotent pattern is ideal for CI/CD pipelines. The `--atomic` flag automatically rolls back if the upgrade fails, and `--wait` makes Helm wait until all resources are ready before marking the release successful. Use `--timeout` to control how long Helm waits.',
            code: `# Install a release
helm install myapp bitnami/nginx \
  --namespace production \
  --create-namespace \
  --values custom-values.yaml \
  --set replicaCount=3

# Upgrade (or install if not exists)
helm upgrade --install myapp bitnami/nginx \
  --namespace production \
  --atomic \
  --wait \
  --timeout 5m \
  --values custom-values.yaml`,
            tip: 'Use `helm upgrade --install` in CI/CD to make deployments idempotent — it handles both first-time deploys and subsequent updates with one command.'
          },
          {
            heading: 'Rolling Back Releases',
            content: 'Helm maintains a full revision history for each release, enabling easy rollbacks. The `helm rollback` command reverts a release to a previous revision. By default, Helm keeps the last 10 revisions; control this with `--history-max` on install or in the Helm configuration. Rolling back re-applies the Kubernetes manifests from the target revision using a three-way merge. Note that Helm rollback does not automatically roll back persistent data — PersistentVolumes and database contents remain unchanged. Use `helm history` to inspect all revisions before deciding which to roll back to.',
            code: `# View release history
helm history myapp -n production

# Roll back to previous revision
helm rollback myapp -n production

# Roll back to specific revision
helm rollback myapp 3 -n production

# Set max history during install
helm install myapp ./chart --history-max 20

# Dry-run a rollback
helm rollback myapp 2 --dry-run -n production`,
            warning: 'Rollback reverts Kubernetes resource definitions but does NOT roll back database migrations, PVC data, or external state changes made by hooks.'
          },
          {
            heading: 'Helm Diff and Dry-Run',
            content: 'Before applying changes to production, always preview what Helm will do. The `--dry-run` flag renders templates and validates them against the cluster API without actually applying any changes. The `helm template` command renders templates locally without any cluster connection, useful in offline pipelines. The `helm-diff` plugin (not built-in) shows a colorized diff between the current release and what an upgrade would apply — similar to `terraform plan`. Always combine `helm upgrade --dry-run` with `helm diff` to understand the impact before deployment.',
            code: `# Dry-run upgrade (validates against cluster API)
helm upgrade myapp ./chart --dry-run -n production

# Render templates locally (no cluster needed)
helm template myapp ./chart --values prod-values.yaml

# Install helm-diff plugin
helm plugin install https://github.com/databus23/helm-diff

# Show diff between current and new version
helm diff upgrade myapp bitnami/nginx \
  --values prod-values.yaml -n production`,
            note: 'The `helm template` command is ideal for GitOps workflows where manifests are rendered by CI and committed to a repo for tools like Argo CD to apply.'
          }
        ],
        quiz: [
          {
            question: 'What does the `--atomic` flag do during `helm upgrade`?',
            options: [
              'Prevents concurrent upgrades from running',
              'Automatically rolls back if the upgrade fails',
              'Applies changes one resource at a time',
              'Disables history tracking for the release'
            ],
            correctIndex: 1,
            explanation: 'The `--atomic` flag makes Helm automatically roll back to the previous revision if the upgrade fails or times out, ensuring the cluster is not left in a broken state.'
          },
          {
            question: 'Which command is idempotent — performing install or upgrade depending on whether the release exists?',
            options: [
              'helm install --force',
              'helm deploy',
              'helm upgrade --install',
              'helm apply'
            ],
            correctIndex: 2,
            explanation: '`helm upgrade --install` installs the release if it does not exist, or upgrades it if it does. This idempotent behavior makes it the standard pattern for CI/CD pipelines.'
          },
          {
            question: 'What does `helm rollback` NOT revert?',
            options: [
              'Deployment replica counts',
              'ConfigMap data',
              'PersistentVolume data',
              'Service selectors'
            ],
            correctIndex: 2,
            explanation: 'Helm rollback reverts Kubernetes resource definitions but does not affect data stored in PersistentVolumes, databases, or any external state.'
          }
        ]
      },
      {
        id: 'k8s-helm-charts',
        title: 'Creating Charts',
        difficulty: 'intermediate',
        tags: ['helm', 'charts', 'structure', 'chart-yaml', 'templates'],
        sections: [
          {
            heading: 'Chart Directory Structure',
            content: 'A Helm chart is a directory with a specific structure. At the root is Chart.yaml, which contains chart metadata (name, version, appVersion, description, type). The values.yaml file provides default values for templates. The templates/ directory contains Kubernetes manifest templates. The charts/ subdirectory holds packaged chart dependencies. Optional files include a LICENSE, README.md, values.schema.json for value validation, and a NOTES.txt file in templates/ that displays post-install instructions to users. Run `helm create mychart` to scaffold this structure automatically.',
            code: `# Scaffold a new chart
helm create mychart

# Resulting structure:
# mychart/
# ├── Chart.yaml          # Chart metadata
# ├── values.yaml         # Default values
# ├── charts/             # Chart dependencies
# ├── templates/
# │   ├── deployment.yaml
# │   ├── service.yaml
# │   ├── ingress.yaml
# │   ├── _helpers.tpl    # Named templates
# │   ├── NOTES.txt       # Post-install notes
# │   └── tests/
# └── values.schema.json  # Optional value validation`,
            tip: 'The `_helpers.tpl` file (prefixed with underscore) is not rendered as a manifest — it defines reusable named templates referenced with `{{ template }}` or `{{ include }}`.'
          },
          {
            heading: 'Chart.yaml Metadata',
            content: 'The Chart.yaml file is required and defines essential chart metadata. The `name` and `version` fields are mandatory; `version` follows semantic versioning and must be incremented with each chart change. The `appVersion` field tracks the version of the application packaged (informational only). Setting `type: library` marks a chart as a shared library with no deployable resources. The `dependencies` array replaces the old `requirements.yaml` from Helm 2, listing sub-charts with their name, version, and repository. Run `helm dependency update` to download and lock sub-chart versions into charts/ and Chart.lock.',
            code: `# Chart.yaml
apiVersion: v2
name: myapp
description: A Helm chart for MyApp
type: application
version: 1.2.0
appVersion: "2.5.1"
keywords:
  - myapp
  - backend
maintainers:
  - name: Platform Team
    email: platform@example.com
dependencies:
  - name: postgresql
    version: "12.x.x"
    repository: https://charts.bitnami.com/bitnami
    condition: postgresql.enabled
  - name: redis
    version: "17.x.x"
    repository: https://charts.bitnami.com/bitnami`,
            note: 'Always increment `version` in Chart.yaml when making any changes to the chart, even if only values.yaml changed. This enables proper release tracking and rollbacks.'
          },
          {
            heading: 'Packaging and Distributing Charts',
            content: 'Once a chart is ready, `helm package` creates a versioned `.tgz` archive suitable for distribution. The archive name combines the chart name and version (e.g., myapp-1.2.0.tgz). Use `helm lint` to validate chart structure and template syntax before packaging. `helm package` can optionally sign charts with a GPG key for provenance. To share charts, push them to a chart repository (an HTTP server with an index.yaml) or to an OCI registry using `helm push`. The `helm repo index` command generates the repository index from a directory of chart archives.',
            code: `# Lint chart for errors
helm lint ./mychart

# Run lint with specific values
helm lint ./mychart --values prod-values.yaml

# Package chart into a .tgz archive
helm package ./mychart --destination ./dist

# Output: Successfully packaged: dist/myapp-1.2.0.tgz

# Generate repo index
helm repo index ./dist --url https://charts.example.com

# Push to OCI registry
helm push myapp-1.2.0.tgz oci://registry.example.com/helm-charts`,
            warning: 'Always run `helm lint` in CI before packaging. Lint catches template syntax errors, missing required fields, and other issues before they reach the cluster.'
          }
        ]
      },
      {
        id: 'k8s-helm-templates',
        title: 'Helm Templates',
        difficulty: 'advanced',
        tags: ['helm', 'go-templates', 'templating', 'functions', 'pipelines'],
        sections: [
          {
            heading: 'Go Template Basics',
            content: 'Helm templates use Go\'s text/template engine augmented with the Sprig function library and Helm-specific functions. Template actions are enclosed in double curly braces: `{{ }}`. The dot (`.`) represents the current scope — typically the merged values object. Access values with `.Values.key`, chart metadata with `.Chart.Name`, and release info with `.Release.Name`. Use `{{- ` and ` -}}` to trim surrounding whitespace. The `if/else/end`, `range`, `with`, and `define/template` constructs provide flow control. Template output becomes the rendered YAML that Helm applies to Kubernetes.',
            code: `# templates/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ .Release.Name }}-{{ .Chart.Name }}
  namespace: {{ .Release.Namespace }}
  labels:
    app.kubernetes.io/name: {{ .Chart.Name }}
    app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
    helm.sh/chart: {{ printf "%s-%s" .Chart.Name .Chart.Version }}
spec:
  replicas: {{ .Values.replicaCount | default 1 }}
  {{- if .Values.autoscaling.enabled }}
  # replicas managed by HPA
  {{- end }}`,
            tip: 'Use `{{ include "mychart.labels" . | indent 4 }}` instead of `{{ template }}` when you need to pipe the output through other functions like `indent` or `nindent`.'
          },
          {
            heading: 'Functions and Pipelines',
            content: 'Helm templates support pipelines using the `|` operator, passing the output of one function as the last argument to the next. The Sprig library adds over 70 functions for string manipulation, math, date, encoding, and more. Common functions: `default` (fallback value), `quote` (wrap in quotes), `upper`/`lower` (case), `trimSuffix`/`trimPrefix`, `toYaml`/`fromYaml` (YAML serialization), `required` (fail if value missing), `tpl` (render a string as a template), and `lookup` (query existing cluster resources). Use `toYaml | nindent N` to render nested YAML structures from values.',
            code: `# Pipeline examples in templates
image: {{ .Values.image.repository }}:{{ .Values.image.tag | default .Chart.AppVersion }}

# required fails with error if value not set
host: {{ required "ingress.host is required" .Values.ingress.host }}

# toYaml with nindent for nested objects
env:
  {{- toYaml .Values.env | nindent 2 }}

# Render arbitrary values as template
{{- tpl .Values.configTemplate . | nindent 4 }}

# Conditional with else
replicas: {{ if .Values.ha.enabled }}3{{ else }}1{{ end }}`,
            note: 'The `required` function is invaluable for mandatory values — it causes `helm install` to fail immediately with a clear error message if the value is not provided.'
          },
          {
            heading: 'Named Templates and Helpers',
            content: 'Named templates (partials) are defined in `_helpers.tpl` using the `define` action and called with `include`. They enable reuse of common patterns like standard labels, selectors, and annotations across all chart templates. By convention, named templates are prefixed with the chart name to avoid collisions when used as sub-charts. The `include` function (preferred over `template`) returns a string that can be piped to `nindent`, while `template` outputs directly without pipeline support. The scaffolded `_helpers.tpl` already defines `fullname`, `labels`, and `selectorLabels` templates.',
            code: `# templates/_helpers.tpl
{{- define "myapp.labels" -}}
app.kubernetes.io/name: {{ .Chart.Name }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{- define "myapp.selectorLabels" -}}
app.kubernetes.io/name: {{ .Chart.Name }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

# Usage in deployment.yaml
metadata:
  labels:
    {{- include "myapp.labels" . | nindent 4 }}`,
            analogy: 'Named templates in Helm are like functions in programming — define once in _helpers.tpl, call everywhere. This keeps templates DRY and consistent across all manifests.'
          }
        ],
        quiz: [
          {
            question: 'Which function should you prefer over `template` when you need to pipe template output to other functions?',
            options: ['render', 'include', 'partial', 'call'],
            correctIndex: 1,
            explanation: '`include` returns a string that can be piped to functions like `nindent` or `trimSuffix`, whereas `template` outputs directly and cannot be piped.'
          },
          {
            question: 'What does the `required` function do in a Helm template?',
            options: [
              'Marks a value as required in values.schema.json',
              'Sets a default value if the key is missing',
              'Fails the helm install/upgrade with an error if the value is empty',
              'Validates value type at runtime'
            ],
            correctIndex: 2,
            explanation: 'The `required` function causes `helm install` or `helm upgrade` to fail immediately with a descriptive error message when the specified value is not set.'
          },
          {
            question: 'What is the recommended way to embed nested YAML from a values key into a template?',
            options: [
              '{{ .Values.myList | toJSON }}',
              '{{ .Values.myList | toYaml | nindent 4 }}',
              '{{ yaml .Values.myList }}',
              '{{ marshal .Values.myList }}'
            ],
            correctIndex: 1,
            explanation: '`toYaml | nindent N` converts a values object or list to a YAML string and indents it to the correct level in the rendered manifest.'
          }
        ]
      },
      {
        id: 'k8s-helm-values',
        title: 'Managing Values',
        difficulty: 'intermediate',
        tags: ['helm', 'values', 'configuration', 'schema', 'overrides'],
        sections: [
          {
            heading: 'Values Hierarchy and Overrides',
            content: 'Helm merges values from multiple sources in a defined priority order, with higher-priority sources overriding lower ones. From lowest to highest priority: default values.yaml in the chart, values.yaml files from parent charts for sub-charts, values files passed with `-f`/`--values` (left-to-right priority), and individual key overrides with `--set`. The `--set` flag supports dot-notation for nested keys and comma-separation for multiple values. Use `--set-string` to force string type even for numeric-looking values, and `--set-file` to read a value from a file (useful for certificates or scripts).',
            code: `# Layer values files (later files override earlier)
helm upgrade myapp ./chart \
  -f base-values.yaml \
  -f prod-values.yaml \
  --set replicaCount=5 \
  --set image.tag=v2.0.1

# Set nested values
--set "ingress.annotations.kubernetes\\.io/ingress\\.class=nginx"

# Set array values
--set "tolerations[0].key=node-role,tolerations[0].effect=NoSchedule"

# Force string type
--set-string podAnnotations.buildNumber=042`,
            tip: 'Escape dots in annotation keys with backslashes when using `--set` to prevent Helm from interpreting them as nested path separators.'
          },
          {
            heading: 'Structuring values.yaml',
            content: 'A well-structured values.yaml is the primary API contract of your chart. Group related values under logical keys: `image`, `resources`, `autoscaling`, `ingress`, `service`, `podAnnotations`. Use boolean flags like `ingress.enabled` and `autoscaling.enabled` to toggle optional features in templates using `{{- if .Values.ingress.enabled }}`. Include comments explaining every value, valid options, and defaults. Avoid deeply nested structures that are difficult to override with `--set`. Structure values to mirror the Kubernetes resource fields they configure, making the relationship between values and rendered manifests obvious.',
            code: `# values.yaml - well-structured example
replicaCount: 1

image:
  repository: myapp
  pullPolicy: IfNotPresent
  tag: ""  # defaults to .Chart.AppVersion

service:
  type: ClusterIP
  port: 80

ingress:
  enabled: false
  className: nginx
  annotations: {}
  hosts:
    - host: chart-example.local
      paths:
        - path: /
          pathType: Prefix

resources:
  limits:
    cpu: 500m
    memory: 128Mi
  requests:
    cpu: 100m
    memory: 64Mi`,
            note: 'Document every value with a comment in values.yaml. The chart values.yaml is the primary reference for users — treat it as user-facing documentation.'
          },
          {
            heading: 'Values Schema Validation',
            content: 'Helm supports JSON Schema validation of values via a `values.schema.json` file in the chart root. When present, Helm validates user-provided values against the schema during `helm install`, `helm upgrade`, `helm lint`, and `helm template`. This catches type mismatches, missing required fields, and invalid enum values before they cause cryptic template errors or failed deployments. Define required fields, value types, minimum/maximum constraints, and allowed enum values. Use `additionalProperties: false` to prevent typos in top-level keys from going unnoticed.',
            code: `# values.schema.json (JSON format shown as YAML for readability)
{
  "$schema": "http://json-schema.org/draft-07/schema",
  "type": "object",
  "required": ["image"],
  "properties": {
    "replicaCount": {
      "type": "integer",
      "minimum": 1,
      "maximum": 100
    },
    "image": {
      "type": "object",
      "required": ["repository"],
      "properties": {
        "repository": { "type": "string" },
        "tag": { "type": "string" },
        "pullPolicy": {
          "type": "string",
          "enum": ["Always", "Never", "IfNotPresent"]
        }
      }
    }
  }
}`,
            warning: 'JSON Schema validation runs client-side during Helm operations. It does NOT validate against live cluster state — use admission webhooks for server-side policy enforcement.'
          }
        ]
      },
      {
        id: 'k8s-helm-repositories',
        title: 'Chart Repositories',
        difficulty: 'intermediate',
        tags: ['helm', 'repositories', 'oci', 'registry', 'charts'],
        sections: [
          {
            heading: 'Managing Chart Repositories',
            content: 'Helm chart repositories are HTTP servers hosting a collection of chart archives and an index.yaml file that lists available charts with their versions and metadata. Use `helm repo add` to register a repository with a name and URL. After adding repos, run `helm repo update` to fetch the latest index from all registered repositories. Use `helm search repo <keyword>` to find charts across all added repos. The popular Artifact Hub (artifacthub.io) aggregates thousands of public chart repos. ArtifactHub provides a search interface and shows security scan results, and provides the `helm repo add` command for each publisher.',
            code: `# Add popular chart repositories
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo add cert-manager https://charts.jetstack.io
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts

# Update all repo indexes
helm repo update

# Search for charts
helm search repo nginx
helm search repo nginx --versions  # show all versions

# List configured repos
helm repo list`,
            tip: 'Run `helm repo update` before every `helm install` or `helm upgrade` in CI pipelines to ensure you are resolving against the latest chart versions.'
          },
          {
            heading: 'OCI Registries',
            content: 'Helm 3.8+ supports OCI (Open Container Initiative) registries as chart repositories, using the same infrastructure as container image registries. OCI support is now GA (stable) and is the recommended approach for private chart distribution. Charts are pushed as OCI artifacts alongside container images. Use `helm push` to publish and `helm pull oci://...` or reference in `helm install` directly. Major registries supporting OCI Helm charts include Docker Hub, GitHub Container Registry (ghcr.io), AWS ECR, Google Artifact Registry, and Azure ACR. OCI registries provide better authentication, access control, and artifact provenance than traditional HTTP repos.',
            code: `# Login to OCI registry
helm registry login registry.example.com \
  --username myuser --password mypassword

# Push chart to OCI registry
helm push myapp-1.2.0.tgz oci://registry.example.com/helm-charts

# Pull chart from OCI registry
helm pull oci://registry.example.com/helm-charts/myapp --version 1.2.0

# Install directly from OCI registry
helm install myapp \
  oci://registry.example.com/helm-charts/myapp \
  --version 1.2.0

# List tags (using crane or registry CLI)
helm show chart oci://registry.example.com/helm-charts/myapp`,
            note: 'OCI registries do not use `helm repo add` — you reference them directly by their full OCI URI. Authentication uses `helm registry login` rather than repo credentials.'
          },
          {
            heading: 'Private Repositories and Authentication',
            content: 'Private chart repositories require authentication. Traditional HTTP repos support basic auth via `--username` and `--password` flags in `helm repo add`, and TLS client certificates with `--cert-file`/`--key-file`. For OCI registries, use `helm registry login`. Credentials are stored in the Helm config directory (typically `~/.config/helm/`). In CI/CD, pass credentials as environment variables and use `--password-stdin` for security. For Kubernetes-native distribution, ChartMuseum is a popular self-hosted chart repo server. Nexus, JFrog Artifactory, and Harbor also support hosting Helm charts via their artifact repository features.',
            code: `# Add private repo with basic auth
helm repo add private-repo https://charts.example.com \
  --username admin \
  --password secret \
  --pass-credentials

# Add with TLS client cert
helm repo add private-repo https://charts.example.com \
  --cert-file client.crt \
  --key-file client.key \
  --ca-file ca.crt

# OCI login using env var (CI-friendly)
echo "$REGISTRY_PASSWORD" | helm registry login \
  registry.example.com \
  --username "$REGISTRY_USER" \
  --password-stdin`,
            warning: 'Never hardcode chart repository passwords in shell scripts or CI configs. Use CI secret management (GitHub Secrets, Vault, etc.) and pass via environment variables.'
          }
        ],
        quiz: [
          {
            question: 'Which command must be run after `helm repo add` to fetch the latest list of available charts?',
            options: ['helm repo sync', 'helm repo update', 'helm repo refresh', 'helm fetch'],
            correctIndex: 1,
            explanation: '`helm repo update` fetches the latest index.yaml from all registered chart repositories, updating the local cache. Without this, you may install outdated chart versions.'
          },
          {
            question: 'How do you reference an OCI chart registry in `helm install`?',
            options: [
              'helm install myapp --repo oci://registry.example.com/charts myapp',
              'helm install myapp oci://registry.example.com/charts/myapp',
              'helm install myapp --oci registry.example.com/charts/myapp',
              'helm install oci+https://registry.example.com/charts/myapp'
            ],
            correctIndex: 1,
            explanation: 'OCI charts are referenced with the full `oci://` URI directly as the chart argument in `helm install`, without using `helm repo add`.'
          },
          {
            question: 'Where does Helm store chart repository credentials added with `helm repo add --username --password`?',
            options: [
              'In a Kubernetes Secret in kube-system',
              'In the Helm config directory (e.g., ~/.config/helm/)',
              'In a .helmrc file in the current directory',
              'In the chart\'s values.yaml'
            ],
            correctIndex: 1,
            explanation: 'Helm stores repository credentials in its local config directory (typically ~/.config/helm/ on Linux/macOS), not in the cluster.'
          }
        ]
      },
      {
        id: 'k8s-helm-hooks',
        title: 'Helm Hooks',
        difficulty: 'advanced',
        tags: ['helm', 'hooks', 'lifecycle', 'jobs', 'pre-install'],
        sections: [
          {
            heading: 'Understanding Helm Hooks',
            content: 'Helm hooks are Kubernetes resources (typically Jobs or Pods) annotated to run at specific points in a release lifecycle. They allow you to perform actions like database migrations before an upgrade, data seeding after install, or cleanup on uninstall. Hook resources are annotated with `helm.sh/hook` specifying the lifecycle event: `pre-install`, `post-install`, `pre-upgrade`, `post-upgrade`, `pre-rollback`, `post-rollback`, `pre-delete`, `post-delete`, and `test`. Hooks are not tracked as part of the release resources and are not deleted when the release is uninstalled unless annotated with `helm.sh/hook-delete-policy`.',
            code: `# templates/pre-upgrade-migration.yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: {{ .Release.Name }}-migrate
  annotations:
    "helm.sh/hook": pre-upgrade
    "helm.sh/hook-weight": "-5"
    "helm.sh/hook-delete-policy": before-hook-creation,hook-succeeded
spec:
  template:
    spec:
      restartPolicy: Never
      containers:
        - name: migrate
          image: {{ .Values.image.repository }}:{{ .Values.image.tag }}
          command: ["python", "manage.py", "migrate"]
          envFrom:
            - secretRef:
                name: {{ .Release.Name }}-db-secret`,
            tip: 'Use `hook-delete-policy: before-hook-creation,hook-succeeded` to clean up successful hook Jobs automatically while retaining failed ones for debugging.'
          },
          {
            heading: 'Hook Weights and Ordering',
            content: 'When multiple hooks are defined for the same lifecycle event, Helm executes them in order by weight. Hook weights are integers specified in the `helm.sh/hook-weight` annotation. Lower weights run first; negative weights are allowed. Hooks with the same weight run simultaneously. Helm waits for each weight group to complete before starting the next. A hook "completes" when its associated resource reaches its terminal state: for Jobs, when all pods complete successfully. If any hook fails (Job fails, Pod exits non-zero), Helm marks the hook as failed and stops the operation. This ordering is crucial for multi-step operations like schema migration followed by data seeding.',
            code: `# Hook execution order by weight
# Weight -10 runs first, weight 10 runs last

# 1. Create schema (weight: -10)
annotations:
  "helm.sh/hook": pre-upgrade
  "helm.sh/hook-weight": "-10"

# 2. Run migrations (weight: 0)
annotations:
  "helm.sh/hook": pre-upgrade
  "helm.sh/hook-weight": "0"

# 3. Seed reference data (weight: 5)
annotations:
  "helm.sh/hook": pre-upgrade
  "helm.sh/hook-weight": "5"

# Helm waits for each weight group
# before proceeding to the next`,
            note: 'Hooks are blocking — Helm waits for each hook to complete before proceeding with the release. Long-running hooks will delay the overall deployment. Set appropriate Job timeouts.'
          },
          {
            heading: 'Test Hooks',
            content: 'Helm test hooks allow you to verify a release is working correctly after deployment. Test resources are annotated with `helm.sh/hook: test` and are executed when you run `helm test <release-name>`. Tests are typically Jobs or Pods that run connectivity checks, smoke tests, or health verifications. A test succeeds if the Pod/Job exits with code 0. Use `helm test --logs` to stream test pod output. Tests are not run automatically on install or upgrade — they must be explicitly invoked. This makes them ideal for post-deployment validation in CI/CD pipelines after `helm upgrade --install` completes.',
            code: `# templates/tests/test-connection.yaml
apiVersion: v1
kind: Pod
metadata:
  name: {{ .Release.Name }}-test-connection
  annotations:
    "helm.sh/hook": test
spec:
  restartPolicy: Never
  containers:
    - name: wget
      image: busybox
      command: ['wget', '--spider',
        'http://{{ .Release.Name }}-service:{{ .Values.service.port }}/health']`,
            analogy: 'Helm test hooks are like integration tests in your deployment pipeline — they verify the deployed application actually works, not just that manifests applied without error.'
          }
        ]
      },
      {
        id: 'k8s-helm-best-practices',
        title: 'Helm Best Practices',
        difficulty: 'advanced',
        tags: ['helm', 'best-practices', 'versioning', 'dependencies', 'testing'],
        sections: [
          {
            heading: 'Chart Versioning and Dependency Management',
            content: 'Follow semantic versioning strictly for chart versions in Chart.yaml. Increment patch for bug fixes, minor for backward-compatible additions, and major for breaking changes. Pin sub-chart dependency versions using exact versions or constrained ranges (e.g., `~12.0.0`) and commit Chart.lock to version control for reproducible builds. Run `helm dependency update` to regenerate the lock file after changing dependencies. Avoid floating version ranges like `*` or `>=` in production charts. Use `condition` fields in dependencies to make sub-charts optional, controlled by a values flag. Regularly audit and update dependency versions for security patches.',
            code: `# Chart.yaml - pinned dependencies
dependencies:
  - name: postgresql
    version: "12.5.6"    # exact pin
    repository: https://charts.bitnami.com/bitnami
    condition: postgresql.enabled
  - name: redis
    version: "~17.11.0"  # patch-level flexibility
    repository: https://charts.bitnami.com/bitnami
    condition: redis.enabled

# Commit Chart.lock for reproducibility
# Chart.lock pins exact resolved versions
# Run: helm dependency update ./mychart`,
            tip: 'Commit both Chart.yaml (desired constraints) and Chart.lock (resolved versions) to version control. This ensures everyone on the team and CI builds the exact same dependency tree.'
          },
          {
            heading: 'Template Quality and Linting',
            content: 'Use `helm lint` in CI to catch issues early. Run `helm template | kubectl apply --dry-run=server` to validate rendered manifests against the live cluster API server, catching issues that client-side lint cannot detect. Add `ct lint` (chart-testing) for more thorough validation including schema checks and CI-specific testing. Set resource requests and limits in default values to prevent unbounded resource consumption. Always quote string values in templates with `| quote` to avoid YAML parsing issues. Use the `tpl` function carefully — it executes arbitrary template code from values, which could be a security risk in multi-tenant environments.',
            code: `# Full validation pipeline
# 1. Helm lint
helm lint ./mychart --values values.yaml

# 2. Render and server-side dry-run
helm template myapp ./mychart \
  --values values.yaml | \
  kubectl apply --dry-run=server -f -

# 3. Use chart-testing tool (ct)
ct lint --charts ./charts/mychart

# 4. Run helm tests post-deploy
helm upgrade --install myapp ./mychart
helm test myapp --logs`,
            note: 'Server-side dry-run (`kubectl apply --dry-run=server`) validates rendered manifests against the actual cluster API, catching issues like invalid field names that client-side lint misses.'
          },
          {
            heading: 'Security and Production Hardening',
            content: 'In production, always set `securityContext` defaults in chart values: run as non-root, drop all capabilities, use read-only root filesystem. Use `lookup` function to check for existing resources (like existing Secrets) rather than creating conflicting duplicates. Avoid `helm install` with `--debug` in production as it prints secret values. Use Helm Secrets plugin or external-secrets to manage sensitive values — never commit plaintext secrets to values.yaml. For GitOps workflows, use tools like Argo CD or Flux that support Helm natively. Set RBAC in charts to least-privilege — avoid creating ClusterRole resources unless truly needed.',
            code: `# Secure default securityContext in values.yaml
securityContext:
  runAsNonRoot: true
  runAsUser: 1000
  fsGroup: 2000

containerSecurityContext:
  allowPrivilegeEscalation: false
  capabilities:
    drop: ["ALL"]
  readOnlyRootFilesystem: true

# Check for existing secret before creating
{{- if not (lookup "v1" "Secret" .Release.Namespace (printf "%s-tls" .Release.Name)) }}
apiVersion: v1
kind: Secret
...
{{- end }}`,
            warning: 'Never store real credentials in values.yaml. Use the Helm Secrets plugin, Vault Agent, or external-secrets operator to inject secrets at deploy time without committing them to source control.'
          }
        ],
        quiz: [
          {
            question: 'What should you commit to version control alongside Chart.yaml to ensure reproducible dependency builds?',
            options: ['charts/ directory', 'Chart.lock', '.helmignore', 'values.schema.json'],
            correctIndex: 1,
            explanation: 'Chart.lock pins the exact resolved versions of all dependencies, ensuring every build uses the identical sub-chart versions regardless of when `helm dependency update` is run.'
          },
          {
            question: 'Which validation catches issues with rendered manifests that `helm lint` cannot detect?',
            options: [
              'helm verify',
              'helm check',
              'kubectl apply --dry-run=server on rendered templates',
              'helm validate --cluster'
            ],
            correctIndex: 2,
            explanation: 'Server-side dry-run validates rendered manifests against the live cluster API server, catching issues like unknown fields and API version mismatches that client-side lint cannot detect.'
          },
          {
            question: 'Why should you avoid using `tpl` with user-provided values in multi-tenant environments?',
            options: [
              'It causes template caching issues',
              'It executes arbitrary template code from values, which is a security risk',
              'It does not support nested objects',
              'It is deprecated in Helm 3'
            ],
            correctIndex: 1,
            explanation: 'The `tpl` function executes a string as a Go template, meaning malicious template code in user-provided values could perform unauthorized actions or read sensitive data.'
          }
        ]
      }
    ]
  },
  {
    id: 'k8s-troubleshooting',
    label: 'Troubleshooting',
    icon: '🔍',
    entries: [
      {
        id: 'k8s-debug-pods',
        title: 'Debugging Pods',
        difficulty: 'intermediate',
        tags: ['debugging', 'pods', 'crashloopbackoff', 'imagepullbackoff', 'pending'],
        sections: [
          {
            heading: 'Common Pod Failure States',
            content: 'Pods fail in distinct, diagnosable states. `CrashLoopBackOff` means the container starts but exits with an error — Kubernetes keeps restarting it with exponential backoff. `ImagePullBackOff` (or `ErrImagePull`) means the kubelet cannot pull the container image — usually wrong image name, missing tag, or missing registry credentials. `Pending` means the scheduler cannot place the pod on any node — reasons include insufficient resources, unsatisfied node affinity, missing PVC, or taints without tolerations. `OOMKilled` means the container exceeded its memory limit. Always start with `kubectl describe pod` for the Events section and `kubectl logs` for application output.',
            code: `flowchart TD
    A[Pod Not Running] --> B{kubectl describe pod}
    B --> C[Status: Pending]
    B --> D[Status: CrashLoopBackOff]
    B --> E[Status: ImagePullBackOff]
    C --> F{Check Events}
    F --> G[Insufficient resources → resize node/request]
    F --> H[Unschedulable → check taints/affinity]
    F --> I[PVC pending → check storage class]
    D --> J[kubectl logs --previous]
    J --> K[App crash → fix application]
    J --> L[OOMKilled → increase memory limit]
    E --> M[Wrong image name/tag → fix image ref]
    E --> N[Private registry → add imagePullSecret]`,
            tip: 'For `CrashLoopBackOff`, use `kubectl logs <pod> --previous` to see logs from the last crashed container — the current container may not have any logs yet.'
          },
          {
            heading: 'Diagnosing Pending Pods',
            content: 'A pod stuck in `Pending` state means the Kubernetes scheduler cannot find a suitable node. The first step is `kubectl describe pod <name>` — the Events section will explain why scheduling failed. Common reasons: insufficient CPU or memory on all nodes (request exceeds available capacity), node selector or affinity rules that no node matches, taints on nodes without corresponding pod tolerations, topology spread constraints that cannot be satisfied, or PersistentVolumeClaims that are themselves in `Pending` state because no storage is available. Use `kubectl get events --sort-by=.metadata.creationTimestamp` to see scheduling events in context.',
            code: `# Check why pod is pending
kubectl describe pod my-pending-pod -n mynamespace

# Check node available resources
kubectl describe nodes | grep -A 5 "Allocated resources"

# Check if any nodes match pod's node selector
kubectl get nodes --show-labels

# Check node taints
kubectl get nodes -o json | jq '.items[].spec.taints'

# Check PVC status
kubectl get pvc -n mynamespace

# Get events sorted by time
kubectl get events -n mynamespace \
  --sort-by='.metadata.creationTimestamp'`,
            note: 'Resource requests (not limits) determine schedulability. A pod with a 4CPU request will remain Pending even if nodes have 8CPU capacity but are running pods that together use 5CPU of requests.'
          },
          {
            heading: 'Interpreting Pod Logs and Exit Codes',
            content: 'Container exit codes indicate why a process terminated. Exit code 0 is success. Exit code 1 is generic application error. Exit code 137 (128+9) means the container received SIGKILL — typically OOMKill from exceeding memory limits. Exit code 143 (128+15) means SIGTERM — normal graceful shutdown. Exit code 139 means segmentation fault. Exit code 127 means command not found (wrong entrypoint). Use `kubectl logs` with `--since`, `--tail`, `-f` (follow), and `-c <container>` for multi-container pods. For init container failures, check with `kubectl logs <pod> -c <init-container-name>`.',
            code: `# Get current logs
kubectl logs my-pod -n mynamespace

# Get previous container logs (after crash)
kubectl logs my-pod --previous -n mynamespace

# Tail last 100 lines and follow
kubectl logs my-pod --tail=100 -f -n mynamespace

# Logs from specific container in multi-container pod
kubectl logs my-pod -c sidecar -n mynamespace

# Logs from all pods matching a label
kubectl logs -l app=myapp --all-containers=true -n mynamespace

# Check last exit code and reason
kubectl get pod my-pod -o jsonpath='{.status.containerStatuses[0].lastState}'`,
            warning: 'Exit code 137 (OOMKill) will not always appear in application logs since the kernel kills the process instantly. Check `kubectl describe pod` for OOMKilled in the `lastState` section.'
          }
        ],
        quiz: [
          {
            question: 'What does exit code 137 indicate for a container?',
            options: [
              'Command not found in the container',
              'Container was killed by SIGKILL, typically due to OOM (Out of Memory)',
              'Application returned a generic error',
              'Container image failed to start'
            ],
            correctIndex: 1,
            explanation: 'Exit code 137 = 128 + 9 (SIGKILL signal number). This typically means the container exceeded its memory limit and was killed by the Linux OOM killer or kubelet.'
          },
          {
            question: 'Which kubectl command shows logs from a container that has already crashed and restarted?',
            options: [
              'kubectl logs <pod> --restart',
              'kubectl logs <pod> --previous',
              'kubectl logs <pod> --last-crash',
              'kubectl describe pod <pod> --logs'
            ],
            correctIndex: 1,
            explanation: '`kubectl logs --previous` shows logs from the last terminated container instance, essential for diagnosing CrashLoopBackOff since the current container may not have logged anything yet.'
          },
          {
            question: 'A pod is stuck in Pending. What resource determines schedulability — requests or limits?',
            options: [
              'Limits — the scheduler reserves limit capacity',
              'Requests — the scheduler uses request values to find a suitable node',
              'The average of requests and limits',
              'Whichever is larger'
            ],
            correctIndex: 1,
            explanation: 'The Kubernetes scheduler uses resource requests (not limits) when finding a node. A pod will remain Pending if no node has sufficient unreserved capacity matching the pod\'s requests.'
          }
        ]
      },
      {
        id: 'k8s-debug-services',
        title: 'Debugging Services',
        difficulty: 'intermediate',
        tags: ['debugging', 'services', 'endpoints', 'dns', 'selectors'],
        sections: [
          {
            heading: 'Service Selector Mismatches',
            content: 'The most common Service issue is a label selector mismatch — the Service selects labels that do not match any pod labels. When this happens, the Service has no Endpoints, and all traffic results in connection refused. Check `kubectl get endpoints <service-name>` — if the Endpoints resource shows `<none>`, the selector matches no pods. Compare the Service\'s `spec.selector` with pod labels using `kubectl get pods --show-labels`. Labels must match exactly; extra labels on pods are fine, but the Service selector must be a subset of the pod\'s labels. Selectors are case-sensitive.',
            code: `# Check service endpoints
kubectl get endpoints my-service -n mynamespace

# If endpoints show <none>, check selector vs pod labels
kubectl describe service my-service -n mynamespace
# Look at: Selector field

# List pods with labels
kubectl get pods --show-labels -n mynamespace

# Find pods matching a selector
kubectl get pods -l "app=myapp,tier=backend" -n mynamespace

# Verify service can reach pods manually
kubectl run -it --rm debug --image=busybox --restart=Never -- \
  wget -qO- http://my-service.mynamespace.svc.cluster.local`,
            tip: 'A Service with `<none>` endpoints means traffic will never reach any pod. Always verify endpoints immediately when debugging connection issues — it rules out selector problems instantly.'
          },
          {
            heading: 'DNS Resolution Issues',
            content: 'Kubernetes uses CoreDNS (or kube-dns) for service discovery. Services are resolvable at `<service>.<namespace>.svc.cluster.local`. Pods within the same namespace can use just `<service>`. DNS issues manifest as connection failures with "name resolution failed" or "no such host" errors. Verify CoreDNS pods are running in kube-system. Test DNS resolution from within a pod using a debug container with `nslookup` or `dig`. Check CoreDNS ConfigMap for customizations. Issues can also stem from incorrect ndots settings in pod dnsConfig, causing short names to fail before trying the full FQDN.',
            code: `# Check CoreDNS pods
kubectl get pods -n kube-system -l k8s-app=kube-dns

# Test DNS from within cluster
kubectl run -it --rm dns-debug \
  --image=busybox:1.28 --restart=Never -- \
  nslookup kubernetes.default.svc.cluster.local

# Test service DNS resolution
kubectl exec -it my-pod -- \
  nslookup my-service.mynamespace.svc.cluster.local

# Check CoreDNS config
kubectl get configmap coredns -n kube-system -o yaml

# View CoreDNS logs
kubectl logs -l k8s-app=kube-dns -n kube-system`,
            note: 'Use `busybox:1.28` (not latest) for DNS debugging — newer busybox versions have a known issue with the `nslookup` tool returning incorrect results in some Kubernetes environments.'
          },
          {
            heading: 'Service Types and Port Mapping',
            content: 'Service port mapping confusion is a frequent source of bugs. A Service has three port fields: `port` (the port exposed to other pods), `targetPort` (the port on the pod), and `nodePort` (for NodePort/LoadBalancer services). The `targetPort` must match the container\'s `containerPort` — not the Service `port`. Mismatching `targetPort` sends traffic to the right pod but wrong port, resulting in connection refused. For LoadBalancer services, the external IP may show `<pending>` indefinitely on bare-metal clusters without a load balancer controller (MetalLB, cloud provider). ExternalName services do a DNS CNAME, not proxying.',
            code: `# Service port mapping
apiVersion: v1
kind: Service
spec:
  selector:
    app: myapp
  ports:
    - name: http
      port: 80          # Port other pods use to reach this Service
      targetPort: 8080  # Must match container's containerPort
      nodePort: 30080   # Only for NodePort/LoadBalancer type

---
# Corresponding Pod template
spec:
  containers:
    - name: app
      image: myapp:latest
      ports:
        - containerPort: 8080  # Must match Service targetPort`,
            warning: 'The `containerPort` field in pod spec is informational only — Kubernetes does not enforce it. Traffic is routed based on Service `targetPort` regardless of whether `containerPort` matches.'
          }
        ]
      },
      {
        id: 'k8s-debug-networking',
        title: 'Debugging Networking',
        difficulty: 'advanced',
        tags: ['networking', 'cni', 'connectivity', 'network-policy', 'dns'],
        sections: [
          {
            heading: 'Pod-to-Pod Connectivity',
            content: 'When pods cannot communicate, the issue is usually in the CNI plugin, NetworkPolicy rules, or routing. Every pod gets a unique IP address, and all pods should be able to reach each other directly without NAT. Test connectivity with `kubectl exec` to curl another pod\'s IP directly. If direct pod IP works but Service does not, the issue is with kube-proxy or Service configuration. If direct pod IP also fails, the CNI is misconfigured or a NetworkPolicy is blocking traffic. Check that CNI pods are running (`kubectl get pods -n kube-system` for flannel, calico, weave, etc.). Check for NetworkPolicy resources that may be blocking ingress or egress.',
            code: `# Get pod IPs
kubectl get pods -o wide -n mynamespace

# Test direct pod-to-pod connectivity
kubectl exec -it pod-a -- curl http://10.244.1.5:8080/health

# Test service connectivity
kubectl exec -it pod-a -- curl http://my-service.mynamespace:80

# Check for NetworkPolicies blocking traffic
kubectl get networkpolicy -A

# Check CNI pod health
kubectl get pods -n kube-system | grep -E "calico|flannel|weave|cilium"

# Capture traffic on a node (advanced)
kubectl node-shell <node-name> -- \
  tcpdump -i eth0 host 10.244.1.5`,
            tip: 'Install the `netshoot` container (nicolaka/netshoot) as a debug pod — it includes curl, dig, nslookup, tcpdump, netstat, and dozens of other networking tools in one image.'
          },
          {
            heading: 'NetworkPolicy Debugging',
            content: 'NetworkPolicies are additive allow-rules — once any NetworkPolicy selects a pod, all traffic not explicitly allowed is denied. A common mistake is creating a NetworkPolicy for pod ingress/egress but forgetting that DNS (UDP port 53 to CoreDNS) is also blocked. Always include an egress rule to allow DNS when creating egress NetworkPolicies. Use `kubectl describe networkpolicy` to read the policy spec in human-readable form. Some CNI plugins (like Calico) have additional CLI tools (`calicoctl`) that show computed effective policies. Cilium provides a powerful `cilium monitor` command for real-time packet tracing.',
            code: `# NetworkPolicy: allow ingress from same namespace + egress DNS
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-same-namespace
spec:
  podSelector:
    matchLabels:
      app: myapp
  policyTypes:
    - Ingress
    - Egress
  ingress:
    - from:
        - podSelector: {}  # any pod in same namespace
  egress:
    - to:
        - namespaceSelector:
            matchLabels:
              kubernetes.io/metadata.name: kube-system
      ports:
        - port: 53
          protocol: UDP  # Allow DNS`,
            warning: 'Forgetting to allow egress DNS (UDP 53 to kube-system) in an Egress NetworkPolicy is one of the most common mistakes — it breaks all hostname-based connections even when other egress is allowed.'
          },
          {
            heading: 'Ingress Controller Debugging',
            content: 'When Ingress resources are not routing traffic correctly, check in order: verify the Ingress controller pods are running, check the Ingress resource for annotation correctness and correct `ingressClassName`, verify the backend Service and Endpoints exist, and check Ingress controller logs for routing errors. The `ingressClassName` must match the controller\'s IngressClass name. TLS issues are usually misconfigured Secret names or namespace mismatches. For NGINX ingress, check the generated nginx.conf: `kubectl exec -it <nginx-pod> -- nginx -T`. Use `kubectl describe ingress` to see the Address field — an empty address means the controller has not processed the Ingress.',
            code: `# Check Ingress resource and status
kubectl describe ingress my-ingress -n mynamespace

# Check ingress controller pods
kubectl get pods -n ingress-nginx

# View ingress controller logs
kubectl logs -l app.kubernetes.io/name=ingress-nginx \
  -n ingress-nginx --tail=50

# Check backend service and endpoints
kubectl get svc,endpoints my-backend-svc -n mynamespace

# Test ingress with curl (bypass DNS)
curl -H "Host: myapp.example.com" http://<ingress-ip>/api/health

# Check NGINX generated config
kubectl exec -it <nginx-pod> -n ingress-nginx -- nginx -T | grep myapp`,
            note: 'An Ingress with empty `.status.loadBalancer.ingress` means the controller has not reconciled it. Check IngressClass name matches and controller logs for validation errors.'
          }
        ]
      },
      {
        id: 'k8s-debug-storage',
        title: 'Debugging Storage',
        difficulty: 'intermediate',
        tags: ['storage', 'pvc', 'pv', 'debugging', 'mount-errors'],
        sections: [
          {
            heading: 'PVC Pending and Binding Issues',
            content: 'A PersistentVolumeClaim stuck in `Pending` state means Kubernetes cannot find a matching PersistentVolume to bind to it. For dynamic provisioning, this usually means the StorageClass is incorrect, the provisioner pod is not running, or the underlying storage infrastructure is unavailable. For static provisioning, no pre-created PV matches the PVC\'s requirements (access modes, storage size, StorageClass). Check `kubectl describe pvc` for events explaining why binding failed. Ensure the requested storage size does not exceed available PV capacity. Access modes must match exactly — ReadWriteOnce PVCs cannot bind to ReadOnlyMany PVs.',
            code: `# Check PVC status and events
kubectl describe pvc my-pvc -n mynamespace

# List PVs and their status
kubectl get pv

# Check StorageClass exists
kubectl get storageclass

# Check CSI/provisioner pods
kubectl get pods -n kube-system | grep -E "csi|provisioner"

# View CSI driver logs
kubectl logs -l app=ebs-csi-controller \
  -n kube-system -c csi-provisioner

# Check storage class provisioner
kubectl get storageclass standard -o yaml | grep provisioner`,
            tip: 'If a PVC remains Pending after fixing the underlying issue, the provisioner may need the PVC to be deleted and recreated — some provisioners do not re-evaluate existing Pending PVCs.'
          },
          {
            heading: 'Volume Mount Errors',
            content: 'When pods fail to start with volume mount errors, the issue is usually filesystem permissions, SELinux/AppArmor policy, or the node cannot mount the storage. Common errors: "Unable to attach or mount volumes" (node-level issue, check node events), "permission denied" (fsGroup mismatch or container running as wrong user), "transport endpoint is not connected" (NFS/FUSE mount dropped). Set `securityContext.fsGroup` to ensure the volume is owned by the correct group on mount. For ReadWriteOnce volumes, only one node can mount them — if a pod reschedules to a new node, the old node must first release the volume.',
            code: `# Check pod events for mount errors
kubectl describe pod my-pod -n mynamespace
# Look for: "Unable to attach or mount volumes"

# Check node-level volume attach events
kubectl get events -n mynamespace \
  --field-selector reason=FailedAttachVolume

# Verify fsGroup setting
# In pod spec:
securityContext:
  fsGroup: 2000  # Volume will be chown'd to this GID

# Check if volume is still attached to old node
kubectl get volumeattachments

# Force detach stuck volume (use with caution)
kubectl delete volumeattachment <attachment-name>`,
            warning: 'ReadWriteOnce PersistentVolumes can only be mounted on one node at a time. If the volume is stuck attached to a crashed node, manually deleting the VolumeAttachment object may be necessary.'
          },
          {
            heading: 'StatefulSet Storage Debugging',
            content: 'StatefulSets use volumeClaimTemplates to create a dedicated PVC for each pod replica. These PVCs are not deleted when the StatefulSet is deleted or scaled down — this is intentional to preserve data. PVC names follow the pattern `<template-name>-<statefulset-name>-<ordinal>`. If a StatefulSet pod is stuck because its PVC is Pending, the pod will wait indefinitely. When scaling a StatefulSet back up, it reattaches existing PVCs to the same ordinal pods. If you need to reset data, manually delete the PVCs. Debugging StatefulSet storage is similar to PVC debugging but requires tracking which PVC belongs to which pod.',
            code: `# List PVCs for a StatefulSet
kubectl get pvc -l app=my-statefulset -n mynamespace

# PVC naming pattern: <template>-<sts-name>-<ordinal>
# e.g., data-mydb-0, data-mydb-1, data-mydb-2

# Check specific pod's PVC
kubectl describe pod mydb-0 -n mynamespace | grep -A 5 Volumes

# StatefulSet won't delete PVCs on scale-down
# Manual cleanup:
kubectl delete pvc data-mydb-2 -n mynamespace

# Check StatefulSet status
kubectl get statefulset mydb -n mynamespace
kubectl describe statefulset mydb -n mynamespace`,
            note: 'StatefulSet PVCs outlive the StatefulSet itself — `kubectl delete statefulset` does not delete PVCs. This protects data but requires manual cleanup when decommissioning a StatefulSet permanently.'
          }
        ]
      },
      {
        id: 'k8s-kubectl-debug',
        title: 'kubectl debug',
        difficulty: 'advanced',
        tags: ['kubectl-debug', 'ephemeral-containers', 'node-debugging', 'troubleshooting'],
        sections: [
          {
            heading: 'Ephemeral Debug Containers',
            content: 'Ephemeral containers are temporary containers added to a running pod for debugging, without restarting the pod. This is critical for debugging distroless or minimal images that lack shells or debugging tools. Use `kubectl debug -it <pod> --image=busybox --target=<container>` to inject a debug container that shares the process namespace with the target container. The `--target` flag enables process namespace sharing, allowing you to inspect the target container\'s processes. Ephemeral containers cannot be removed after being added and cannot have resource limits changed, but they are automatically cleaned up when the pod is deleted. Requires Kubernetes 1.23+ (GA).',
            code: `# Add ephemeral debug container to running pod
kubectl debug -it my-pod \
  --image=nicolaka/netshoot \
  --target=main-container \
  -n mynamespace

# Inside ephemeral container, you can:
# - See processes of main container (ps aux)
# - Access its filesystem via /proc/<pid>/root
# - Run network tools: curl, dig, tcpdump

# Debug a distroless container
kubectl debug -it my-distroless-pod \
  --image=busybox \
  --target=app

# List ephemeral containers in a pod
kubectl get pod my-pod \
  -o jsonpath='{.spec.ephemeralContainers}'`,
            tip: 'Use `nicolaka/netshoot` as your debug image — it includes virtually every networking, tracing, and performance tool you need for Kubernetes debugging in a single container.'
          },
          {
            heading: 'Debugging with Pod Copies',
            content: 'When you need to debug a crashing pod but cannot inject an ephemeral container (e.g., the pod crashes before you can connect), use `kubectl debug` to create a copy of the pod with modifications. The `--copy-to` flag creates a new pod with the same spec as the original. Use `--set-image` to override the container image (e.g., replace the crashing app with a shell image), or add `--share-processes` to share the process namespace. You can also override the command with `-- /bin/sh` to prevent the original entrypoint from running. This technique is safe because it creates a new pod and does not affect the original.',
            code: `# Create a copy of a crashing pod with shell override
kubectl debug my-crashing-pod \
  --copy-to=debug-pod \
  --set-image=app=busybox \
  -- /bin/sh \
  -n mynamespace -it

# Copy pod but keep original image, add debug container
kubectl debug my-pod \
  --copy-to=debug-pod \
  --image=nicolaka/netshoot \
  --share-processes \
  -n mynamespace -it

# Clean up after debugging
kubectl delete pod debug-pod -n mynamespace`,
            note: 'Pod copies created with `kubectl debug --copy-to` are not managed by any controller and will not be auto-deleted. Always clean up debug pods manually after investigation.'
          },
          {
            heading: 'Node Debugging',
            content: 'Sometimes the issue is at the node level — kubelet failures, disk pressure, network interface problems, or kernel issues. `kubectl debug node/<node-name> -it --image=ubuntu` creates a privileged pod on the specified node with the host filesystem mounted at `/host`. This gives full access to node files, logs, and processes. Read systemd service logs with `chroot /host journalctl -u kubelet`. Check disk usage, network interfaces, and iptables rules. Use `crictl` (available via `chroot /host`) to interact with the container runtime directly — useful when kubectl itself is not responding.',
            code: `# Start privileged debug pod on a specific node
kubectl debug node/my-node-1 \
  -it --image=ubuntu

# Inside the node debug pod:
# Host filesystem is at /host

# Check kubelet logs
chroot /host journalctl -u kubelet --since "1 hour ago"

# Check node disk usage
chroot /host df -h

# List running containers via container runtime
chroot /host crictl ps

# Check iptables rules (for Service debugging)
chroot /host iptables -t nat -L KUBE-SERVICES -n

# Check kubelet config
cat /host/var/lib/kubelet/config.yaml`,
            analogy: 'kubectl debug node is like having a remote SSH session into the node with full root access — but provisioned through Kubernetes RBAC rather than requiring separate SSH credentials.'
          }
        ],
        quiz: [
          {
            question: 'What is the primary use case for ephemeral containers in kubectl debug?',
            options: [
              'Running persistent services alongside application containers',
              'Debugging minimal/distroless images that lack shells or debugging tools',
              'Replacing crashed containers automatically',
              'Running batch jobs within existing pods'
            ],
            correctIndex: 1,
            explanation: 'Ephemeral containers inject debugging tools into pods running minimal images (like distroless) that have no shell or utilities, without requiring a pod restart.'
          },
          {
            question: 'How do you debug a pod that crashes immediately on startup, preventing ephemeral container injection?',
            options: [
              'Use kubectl attach instead of kubectl exec',
              'Use kubectl debug --copy-to to create a copy with an overridden command',
              'Scale the deployment to 0 and back to 1',
              'Use kubectl replace --force to restart the pod'
            ],
            correctIndex: 1,
            explanation: '`kubectl debug --copy-to` creates a copy of the crashing pod where you can override the image or command (e.g., replace with busybox and run /bin/sh), allowing investigation of the filesystem and environment without the crashing entrypoint.'
          },
          {
            question: 'Where is the node host filesystem mounted when using `kubectl debug node/<node-name>`?',
            options: ['/mnt', '/host', '/node', '/rootfs'],
            correctIndex: 1,
            explanation: 'The `kubectl debug node/` command creates a privileged pod on the target node with the node\'s host filesystem mounted at `/host`. Use `chroot /host` to run commands in the host OS context.'
          }
        ]
      },
      {
        id: 'k8s-events-logs',
        title: 'Events & Logging',
        difficulty: 'intermediate',
        tags: ['events', 'logging', 'fluentd', 'loki', 'observability'],
        sections: [
          {
            heading: 'Kubernetes Events',
            content: 'Kubernetes Events are objects that capture what happened in the cluster — scheduler decisions, kubelet actions, controller reconciliations, and warnings. Events are namespace-scoped (except for cluster-level events in default namespace). They expire after 1 hour by default. Use `kubectl get events --sort-by=.metadata.creationTimestamp` to see recent events in time order. Filter by resource with `--field-selector involvedObject.name=<pod-name>`. The `Warning` type events indicate problems; `Normal` events are informational. Events are the first place to look when something changes unexpectedly — they explain the "why" behind pod restarts, rescheduling, and failures.',
            code: `# Get all events in a namespace, sorted by time
kubectl get events -n mynamespace \
  --sort-by='.metadata.creationTimestamp'

# Filter events for a specific pod
kubectl get events -n mynamespace \
  --field-selector involvedObject.name=my-pod

# Watch events in real-time
kubectl get events -n mynamespace -w

# Get only Warning events across all namespaces
kubectl get events -A \
  --field-selector type=Warning

# Describe a specific event
kubectl describe event <event-name> -n mynamespace`,
            tip: 'Events are ephemeral (1 hour TTL by default). For persistent event history, deploy an event exporter like `kubernetes-event-exporter` to ship events to Elasticsearch or a logging backend.'
          },
          {
            heading: 'Node-Level and Cluster Logging',
            content: 'Kubernetes does not provide built-in cluster-wide log aggregation. By default, container logs are stored on each node in `/var/log/pods/` and `/var/log/containers/` (symlinks). Logs are also accessible via `kubectl logs` until the pod is deleted or log rotation occurs. For production clusters, deploy a logging agent as a DaemonSet on every node. Fluentd and Fluent Bit are the most common agents — they collect container logs and ship them to Elasticsearch, Splunk, or cloud logging services. The EFK stack (Elasticsearch + Fluentd + Kibana) and PLG stack (Promtail + Loki + Grafana) are the two dominant log aggregation architectures.',
            code: `# Fluent Bit DaemonSet (simplified)
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: fluent-bit
  namespace: logging
spec:
  selector:
    matchLabels:
      app: fluent-bit
  template:
    spec:
      tolerations:
        - operator: Exists  # Run on all nodes including masters
      containers:
        - name: fluent-bit
          image: fluent/fluent-bit:2.1
          volumeMounts:
            - name: varlog
              mountPath: /var/log
              readOnly: true
      volumes:
        - name: varlog
          hostPath:
            path: /var/log`,
            note: 'Fluent Bit is preferred over Fluentd for resource-constrained nodes — it uses significantly less CPU and memory. Fluentd is better when you need complex log transformation via its rich plugin ecosystem.'
          },
          {
            heading: 'Loki and Structured Logging',
            content: 'Grafana Loki is a log aggregation system designed for Kubernetes, using a label-based indexing approach similar to Prometheus metrics. Unlike Elasticsearch, Loki does not full-text index log content — it only indexes log stream labels (pod name, namespace, container). This makes Loki cheaper to operate at scale. Deploy Promtail (or Alloy) as a DaemonSet to scrape pod logs and push them to Loki with Kubernetes metadata labels. Query logs in Grafana using LogQL. Structured logging (JSON log lines) enables powerful filtering with `| json | field = "value"` in LogQL. Loki integrates with Grafana\'s Explore view for correlating logs with metrics.',
            code: `# Install Loki stack with Helm
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update

helm install loki-stack grafana/loki-stack \
  --namespace monitoring \
  --create-namespace \
  --set grafana.enabled=true \
  --set promtail.enabled=true

# LogQL query examples in Grafana:
# All logs from a namespace:
# {namespace="production"}

# Logs containing "error" from a specific app:
# {app="myapp"} |= "error"

# JSON structured logs:
# {app="myapp"} | json | level="ERROR"`,
            analogy: 'Loki indexes log labels (like a filing cabinet index) but stores full log text separately. This makes finding the right drawer cheap, then you read the full document once found.'
          }
        ]
      },
      {
        id: 'k8s-monitoring',
        title: 'Monitoring & Observability',
        difficulty: 'intermediate',
        tags: ['monitoring', 'prometheus', 'grafana', 'metrics-server', 'observability'],
        sections: [
          {
            heading: 'Prometheus and kube-state-metrics',
            content: 'Prometheus is the standard monitoring solution for Kubernetes, using a pull-based model to scrape metrics from instrumented targets. The `kube-state-metrics` deployment exposes Kubernetes object metrics (pod status, deployment replicas, PVC binding) as Prometheus metrics. The `node-exporter` DaemonSet exposes node-level metrics (CPU, memory, disk, network). The `metrics-server` enables `kubectl top` and is required for HPA. The kube-prometheus-stack Helm chart installs Prometheus, Alertmanager, Grafana, kube-state-metrics, and node-exporter together with pre-built dashboards and alert rules, making it the recommended production setup.',
            code: `# Install kube-prometheus-stack
helm repo add prometheus-community \
  https://prometheus-community.github.io/helm-charts
helm repo update

helm install monitoring prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --create-namespace \
  --set grafana.adminPassword=admin

# Check all monitoring pods are running
kubectl get pods -n monitoring

# Access Grafana (port-forward)
kubectl port-forward svc/monitoring-grafana 3000:80 -n monitoring

# Access Prometheus
kubectl port-forward svc/monitoring-kube-prometheus-prometheus \
  9090:9090 -n monitoring`,
            tip: 'The kube-prometheus-stack includes pre-built Grafana dashboards (IDs 315, 6417, 13332) for Kubernetes cluster overview, node metrics, and namespace-level views out of the box.'
          },
          {
            heading: 'Custom Metrics and ServiceMonitors',
            content: 'The Prometheus Operator (included in kube-prometheus-stack) introduces CRDs for managing Prometheus configuration declaratively. `ServiceMonitor` resources tell Prometheus which Services to scrape for metrics — eliminating the need to manually edit prometheus.yaml. To expose custom application metrics: instrument your app with a Prometheus client library, expose a `/metrics` endpoint, create a ServiceMonitor that selects your Service by label. `PodMonitor` works similarly for scraping pods directly without a Service. `PrometheusRule` defines recording rules and alerting rules as Kubernetes resources that the operator automatically loads into Prometheus.',
            code: `# ServiceMonitor for custom app metrics
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: myapp-monitor
  namespace: monitoring
  labels:
    release: monitoring  # Must match Prometheus's serviceMonitorSelector
spec:
  selector:
    matchLabels:
      app: myapp
      metrics: "true"
  namespaceSelector:
    matchNames:
      - production
  endpoints:
    - port: metrics      # Named port in the Service
      path: /metrics
      interval: 30s
      scheme: http`,
            note: 'The ServiceMonitor must have labels matching the Prometheus Operator\'s `serviceMonitorSelector`. Check `kubectl get prometheus -n monitoring -o yaml` to see what labels are required.'
          },
          {
            heading: 'Resource Metrics and kubectl top',
            content: 'The metrics-server aggregates real-time CPU and memory usage from kubelets and exposes them via the Kubernetes Metrics API. This powers `kubectl top node` and `kubectl top pod` — useful for spot-checking resource usage. It is also required for Horizontal Pod Autoscaler and Vertical Pod Autoscaler to function. Note that metrics-server shows current usage, not historical data. For historical metrics and capacity planning, use Prometheus with long-term storage. Deploy metrics-server with its Helm chart or the official YAML manifests. On managed clusters (EKS, GKE, AKS), metrics-server is usually pre-installed.',
            code: `# Install metrics-server
helm repo add metrics-server \
  https://kubernetes-sigs.github.io/metrics-server/
helm install metrics-server metrics-server/metrics-server \
  -n kube-system

# View node resource usage
kubectl top nodes

# View pod resource usage in a namespace
kubectl top pods -n production

# Sort pods by CPU usage
kubectl top pods -n production \
  --sort-by=cpu

# Sort by memory
kubectl top pods -n production \
  --sort-by=memory

# View containers within pods
kubectl top pods -n production --containers`,
            warning: 'metrics-server provides instantaneous metrics only. A pod that spikes CPU for 10 seconds and then idles will show low usage in `kubectl top` — use Prometheus for accurate capacity planning.'
          }
        ],
        quiz: [
          {
            question: 'Which component is required for `kubectl top pod` to work and for HPA to function?',
            options: ['Prometheus', 'kube-state-metrics', 'metrics-server', 'node-exporter'],
            correctIndex: 2,
            explanation: 'metrics-server aggregates real-time CPU and memory metrics from kubelets and exposes them via the Metrics API, which both `kubectl top` and the Horizontal Pod Autoscaler depend on.'
          },
          {
            question: 'What does a ServiceMonitor resource do in a Prometheus Operator setup?',
            options: [
              'Monitors Service health and restarts unhealthy ones',
              'Configures which Services Prometheus should scrape for metrics',
              'Exposes Service metrics via a sidecar container',
              'Creates alert rules for Service availability'
            ],
            correctIndex: 1,
            explanation: 'ServiceMonitor is a Prometheus Operator CRD that declaratively configures Prometheus to scrape metrics from Services matching the specified selector, eliminating manual prometheus.yaml editing.'
          },
          {
            question: 'What is the key architectural difference between Loki and Elasticsearch for log storage?',
            options: [
              'Loki only stores logs in memory; Elasticsearch persists to disk',
              'Loki indexes only log stream labels, not full log content; Elasticsearch full-text indexes everything',
              'Loki is push-based; Elasticsearch is pull-based',
              'Loki only supports structured JSON logs; Elasticsearch supports any format'
            ],
            correctIndex: 1,
            explanation: 'Loki indexes only metadata labels (namespace, pod, container), not log content. This makes storage much cheaper. Full-text search is done by scanning log chunks matching label filters, not an inverted index.'
          }
        ]
      },
      {
        id: 'k8s-common-issues',
        title: 'Common Issues & Solutions',
        difficulty: 'intermediate',
        tags: ['troubleshooting', 'resource-limits', 'probes', 'rbac', 'best-practices'],
        sections: [
          {
            heading: 'Resource Limits and OOMKill',
            content: 'Incorrectly sized resource requests and limits are among the most common Kubernetes problems. Setting limits too low causes OOMKill (exit 137) or CPU throttling, degrading performance without obvious errors. Setting requests too low causes poor scheduling — pods land on overloaded nodes. Setting limits much higher than requests leads to noisy-neighbor problems. Use `kubectl top pods` combined with Prometheus metrics to right-size resources. The Vertical Pod Autoscaler (VPA) in recommendation mode analyzes actual usage and suggests appropriate request/limit values without automatically applying changes. CPU throttling is invisible in `kubectl top` — use the `container_cpu_cfs_throttled_seconds_total` Prometheus metric.',
            code: `# Identify OOMKilled pods
kubectl get pods -A -o json | jq '
  .items[] |
  select(.status.containerStatuses[]?.lastState.terminated.reason == "OOMKilled") |
  {name: .metadata.name, ns: .metadata.namespace}'

# Check CPU throttling (requires Prometheus)
# PromQL:
# rate(container_cpu_cfs_throttled_seconds_total[5m])
# / rate(container_cpu_cfs_periods_total[5m]) > 0.25

# VPA recommendation (read-only mode)
kubectl get vpa -A
kubectl describe vpa my-app-vpa -n production`,
            tip: 'A CPU throttling rate above 25% indicates the CPU limit is too restrictive. Increase the limit or, for latency-sensitive apps, remove the CPU limit entirely and rely on requests for scheduling.'
          },
          {
            heading: 'Liveness and Readiness Probe Failures',
            content: 'Misconfigured probes cause intermittent restarts and traffic disruption. A liveness probe that is too aggressive (low timeout, insufficient initialDelaySeconds) kills healthy pods during startup or GC pauses. Set `initialDelaySeconds` higher than your worst-case startup time. A readiness probe that is too strict removes pods from Service load balancing under temporary load spikes, causing cascading failures. Use separate liveness and readiness endpoints — readiness can check dependencies like DB connectivity while liveness should only check if the app process is alive. Startup probes (Kubernetes 1.18+) handle slow-starting apps by disabling liveness during startup.',
            code: `# Well-configured probe strategy
livenessProbe:
  httpGet:
    path: /healthz      # Only checks: is the process alive?
    port: 8080
  initialDelaySeconds: 30  # Wait for app to start
  periodSeconds: 10
  failureThreshold: 3
  timeoutSeconds: 5

readinessProbe:
  httpGet:
    path: /ready        # Checks: can this pod serve traffic?
    port: 8080
  initialDelaySeconds: 5
  periodSeconds: 5
  failureThreshold: 3

startupProbe:
  httpGet:
    path: /healthz
    port: 8080
  failureThreshold: 30   # Allow up to 5 minutes for startup
  periodSeconds: 10`,
            note: 'Never use the same endpoint for liveness and readiness if readiness checks external dependencies. A DB outage should remove a pod from load balancing (readiness fails) but NOT restart it (liveness still passes).'
          },
          {
            heading: 'RBAC Permission Errors',
            content: 'RBAC errors surface as HTTP 403 Forbidden responses from the API server. The error message includes the verb, resource, and namespace that was denied. Use `kubectl auth can-i` to test permissions for any user or ServiceAccount. Use `--as system:serviceaccount:<namespace>:<name>` to impersonate a ServiceAccount. The `kubectl auth can-i --list` command shows all allowed verbs for the current user. A common mistake is binding a Role (namespace-scoped) when a ClusterRole is needed (for cluster-scoped resources like Nodes or PersistentVolumes). Check audit logs on the API server for 403 events to identify systematic permission gaps.',
            code: `# Check what permissions current user has
kubectl auth can-i --list

# Test specific permission
kubectl auth can-i get pods -n production

# Test as a ServiceAccount
kubectl auth can-i list secrets -n production \
  --as system:serviceaccount:production:my-app-sa

# Describe a ServiceAccount's bound roles
kubectl get rolebindings,clusterrolebindings -A \
  -o json | jq '
  .items[] |
  select(.subjects[]?.name == "my-app-sa") |
  {name: .metadata.name, role: .roleRef.name}'

# Check audit log for 403s (requires audit logging enabled)
kubectl logs -n kube-system kube-apiserver-* | grep "403"`,
            warning: 'Avoid using cluster-admin ClusterRoleBindings for application ServiceAccounts. Follow least-privilege by granting only the specific verbs and resources the application actually needs.'
          }
        ],
        challenge: {
          title: 'Full Cluster Troubleshooting Scenario',
          difficulty: 'advanced',
          description: 'A production microservice deployment is experiencing issues. Multiple symptoms are present simultaneously. Your task is to diagnose and resolve all issues in the correct order.',
          starterCode: `# Scenario: myapp deployment in "production" namespace
# Symptoms:
# 1. Some pods are in CrashLoopBackOff
# 2. Service cannot be reached from other pods
# 3. Grafana shows CPU throttling on surviving pods
# 4. New deployments fail with RBAC errors

# Step 1: Diagnose pod failures
kubectl get pods -n production
kubectl describe pod <crashing-pod> -n production
kubectl logs <crashing-pod> --previous -n production

# Step 2: Check service connectivity
kubectl get endpoints myapp-service -n production
kubectl get pods --show-labels -n production
# Fix: Update service selector to match pod labels

# Step 3: Check CPU throttling
kubectl top pods -n production
# PromQL: rate(container_cpu_cfs_throttled_seconds_total[5m])
# Fix: Increase CPU limits in deployment

# Step 4: Diagnose RBAC
kubectl auth can-i create deployments -n production \
  --as system:serviceaccount:production:ci-deployer
# Fix: Create appropriate Role and RoleBinding`,
          solution: `# Complete resolution:

# 1. Fix CrashLoopBackOff (OOMKill)
kubectl patch deployment myapp -n production \
  --type merge -p '{"spec":{"template":{"spec":{"containers":[{
    "name":"app",
    "resources":{"limits":{"memory":"512Mi","cpu":"500m"},
    "requests":{"memory":"256Mi","cpu":"100m"}}}]}}}}'

# 2. Fix service selector mismatch
kubectl patch service myapp-service -n production \
  --type merge -p '{"spec":{"selector":{"app":"myapp","version":"v2"}}}'

# 3. Fix CPU throttling (increase limit)
kubectl set resources deployment myapp -n production \
  --limits=cpu=1000m,memory=512Mi

# 4. Fix RBAC for CI deployer
kubectl create role ci-deployer-role -n production \
  --verb=get,list,create,update,patch \
  --resource=deployments,replicasets,pods

kubectl create rolebinding ci-deployer-binding -n production \
  --role=ci-deployer-role \
  --serviceaccount=production:ci-deployer`
        }
      }
    ]
  }
];
