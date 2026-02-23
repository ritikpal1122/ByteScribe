import type { DocCategory } from './types';

export const K8S_PART1_CATEGORIES: DocCategory[] = [
  {
    id: 'k8s-getting-started',
    label: 'Getting Started',
    icon: '🚀',
    description: 'Foundational concepts, installation, and first steps with Kubernetes.',
    entries: [
      {
        id: 'k8s-what-is-kubernetes',
        title: 'What is Kubernetes?',
        difficulty: 'beginner',
        tags: ['kubernetes', 'orchestration', 'containers', 'cncf', 'cloud-native'],
        sections: [
          {
            heading: 'Container Orchestration',
            content:
              'Kubernetes (K8s) is an open-source container orchestration platform originally developed by Google and donated to the CNCF in 2016. It automates deployment, scaling, and management of containerized applications across clusters of machines. Rather than manually placing containers on servers, Kubernetes tracks desired state vs. actual state and continuously reconciles the two. It handles failures by restarting crashed containers, reschedules workloads when nodes go down, and scales replicas up or down based on demand — removing most operational toil from running production services.',
            code: `# Check Kubernetes version
kubectl version --client

# View cluster info
kubectl cluster-info`,
            tip: 'K8s is an abbreviation: 8 letters between K and s in "Kubernetes".',
          },
          {
            heading: 'Why Kubernetes?',
            content:
              'Before Kubernetes, teams ran custom scripts and configuration management tools to deploy containers at scale — fragile and error-prone. Kubernetes provides a unified API for declaring what you want to run, and the platform handles the how. It supports rolling updates with zero downtime, automatic rollbacks on failure, horizontal pod autoscaling, secret management, service discovery, and persistent storage abstraction. Its declarative model (YAML manifests) makes infrastructure reproducible and auditable via version control, fitting naturally into GitOps workflows.',
            code: `# Kubernetes is CNCF graduated (highest maturity)
# https://www.cncf.io/projects/kubernetes/

# Key capabilities:
# - Self-healing (restart failed containers)
# - Horizontal scaling
# - Service discovery & load balancing
# - Automated rollouts/rollbacks
# - Secret & config management`,
            note: 'Kubernetes does not build images — it runs them. Use Docker or Buildah to build.',
          },
          {
            heading: 'Core Concepts Overview',
            content:
              'Kubernetes organises workloads into Pods (groups of containers), managed by higher-level abstractions like Deployments, StatefulSets, and DaemonSets. A cluster has a Control Plane (API server, scheduler, controllers, etcd) and Worker Nodes (kubelet, kube-proxy, container runtime). Users interact via kubectl or the REST API. Everything is expressed as resources with apiVersion, kind, metadata, and spec fields. Labels and selectors tie resources together — a Service selects Pods by label, a Deployment manages Pods via selector.',
            code: `# Core resource types
kubectl api-resources --namespaced=true | head -20

# Most-used kinds:
# Pod, Deployment, Service, ConfigMap,
# Secret, Namespace, Ingress, PersistentVolumeClaim`,
            analogy:
              'Kubernetes is like an airline operations centre: you declare destinations and passenger loads; it figures out which planes (nodes) to assign and handles gate changes (rescheduling).',
          },
        ],
        quiz: [
          {
            question: 'What does CNCF stand for?',
            options: [
              'Cloud Native Computing Foundation',
              'Container Network Configuration Framework',
              'Cluster Node Control Federation',
              'Cloud Network Container Format',
            ],
            correctIndex: 0,
            explanation: 'CNCF is the Cloud Native Computing Foundation, the vendor-neutral home of Kubernetes.',
          },
          {
            question: 'Which component stores the cluster state in Kubernetes?',
            options: ['kube-scheduler', 'kubelet', 'etcd', 'kube-proxy'],
            correctIndex: 2,
            explanation: 'etcd is a distributed key-value store that holds all cluster state and configuration.',
          },
          {
            question: 'What is the smallest deployable unit in Kubernetes?',
            options: ['Container', 'Node', 'Pod', 'Deployment'],
            correctIndex: 2,
            explanation: 'A Pod is the smallest deployable unit; it wraps one or more containers that share network and storage.',
          },
        ],
      },
      {
        id: 'k8s-architecture',
        title: 'Kubernetes Architecture',
        difficulty: 'beginner',
        tags: ['architecture', 'control-plane', 'etcd', 'nodes', 'kubelet'],
        sections: [
          {
            heading: 'Control Plane Components',
            content:
              'The control plane manages cluster state. The kube-apiserver is the front door — all communication goes through its REST API. etcd stores all cluster data as a consistent key-value store; it is the source of truth. The kube-scheduler watches for unscheduled Pods and assigns them to nodes based on resource availability, affinity rules, and taints. The kube-controller-manager runs controllers (Deployment, ReplicaSet, Node, etc.) that reconcile actual state with desired state. cloud-controller-manager integrates with cloud provider APIs for nodes, routes, and load balancers.',
            code: `# Inspect control-plane pods (kubeadm clusters)
kubectl get pods -n kube-system

# Key control-plane components:
# kube-apiserver
# etcd
# kube-scheduler
# kube-controller-manager`,
            diagram: {
              kind: 'mermaid',
              code: `graph TD
  subgraph ControlPlane["Control Plane"]
    API[kube-apiserver]
    ETCD[(etcd)]
    SCHED[kube-scheduler]
    CM[kube-controller-manager]
    API <--> ETCD
    API --> SCHED
    API --> CM
  end
  subgraph Worker["Worker Node"]
    KL[kubelet]
    KP[kube-proxy]
    CRI[Container Runtime]
    KL --> CRI
  end
  API <-->|"watch/update"| KL`,
              caption: 'High-level Kubernetes architecture',
            },
            tip: 'In managed clusters (GKE, EKS, AKS) you never see or manage control-plane nodes — the provider handles them.',
          },
          {
            heading: 'Worker Node Components',
            content:
              'Each worker node runs three key components. The kubelet is an agent that communicates with the API server, receives Pod specs, and ensures containers are running via the container runtime (containerd or CRI-O). kube-proxy maintains iptables/ipvs rules for Service networking — it routes traffic to the correct Pod IP. The container runtime pulls images and manages container lifecycle. Nodes also run CoreDNS (cluster DNS) and CNI plugins (Flannel, Calico, Cilium) for Pod networking.',
            code: `# View node status
kubectl get nodes -o wide

# Describe a node
kubectl describe node <node-name>

# Check kubelet status (on node)
systemctl status kubelet`,
            note: 'Docker as a container runtime was deprecated in Kubernetes 1.20 and removed in 1.24. containerd is now standard.',
          },
          {
            heading: 'Communication Flow',
            content:
              'All cluster communication flows through the API server. Clients (kubectl, controllers, kubelets) authenticate with certificates or tokens, then send REST requests. The API server validates, persists to etcd, and notifies watchers. Controllers watch for desired-state changes and take action — a Deployment controller creates ReplicaSets; a ReplicaSet controller creates Pods. The scheduler watches for unscheduled Pods and updates their nodeName. The kubelet on the target node then creates the containers. This watch-reconcile loop is the heart of Kubernetes.',
            code: `# Watch resources in real time
kubectl get pods --watch

# See events for debugging
kubectl get events --sort-by=.lastTimestamp

# API server audit log location (kubeadm)
# /var/log/kubernetes/audit/audit.log`,
            analogy: 'The API server is like a post office: every message must pass through it, get validated, and be delivered to the right recipient.',
          },
        ],
        quiz: [
          {
            question: 'Which control-plane component is responsible for assigning Pods to nodes?',
            options: ['kube-controller-manager', 'kube-scheduler', 'kubelet', 'kube-apiserver'],
            correctIndex: 1,
            explanation: 'The kube-scheduler watches for Pods with no assigned node and selects the best node based on resource and policy constraints.',
          },
          {
            question: 'What is the role of etcd in a Kubernetes cluster?',
            options: [
              'Container runtime interface',
              'Distributed key-value store for all cluster state',
              'Network proxy on each node',
              'Image registry',
            ],
            correctIndex: 1,
            explanation: 'etcd is the persistent, consistent key-value store that backs all cluster state — if it is lost without backup, the cluster state is gone.',
          },
          {
            question: 'Which node component maintains Service networking rules?',
            options: ['kubelet', 'containerd', 'kube-proxy', 'CoreDNS'],
            correctIndex: 2,
            explanation: 'kube-proxy manages iptables/ipvs rules on each node to route Service traffic to the correct Pod endpoints.',
          },
        ],
      },
      {
        id: 'k8s-installation',
        title: 'Setting Up Kubernetes',
        difficulty: 'beginner',
        tags: ['minikube', 'kind', 'k3s', 'installation', 'local-cluster'],
        sections: [
          {
            heading: 'Local Options: minikube & kind',
            content:
              'For local development, minikube spins up a single-node cluster in a VM or container, supporting multiple drivers (Docker, VirtualBox, HyperKit). It includes add-ons like Ingress, Dashboard, and metrics-server. kind (Kubernetes IN Docker) runs cluster nodes as Docker containers — fast to create, ideal for CI. kind supports multi-node clusters by adding role-labeled containers. Both tools use the same kubectl commands as production clusters, making them excellent for learning and testing manifests before deploying to cloud.',
            code: `# Install minikube (macOS)
brew install minikube
minikube start --driver=docker --cpus=2 --memory=4g

# Install kind
brew install kind
kind create cluster --name dev

# List clusters
kind get clusters
minikube profile list`,
            tip: 'Use kind for CI pipelines — it starts in ~30 seconds and cleans up completely with `kind delete cluster`.',
          },
          {
            heading: 'Lightweight Production: k3s',
            content:
              'k3s is a CNCF-certified lightweight Kubernetes distribution by Rancher, designed for edge, IoT, and resource-constrained environments. It bundles containerd, Flannel, CoreDNS, and a local-path storage provisioner into a single binary under 70 MB. Installation takes under 60 seconds. k3s replaces etcd with SQLite (single node) or embeds etcd for HA. For production clusters on bare metal or VMs, kubeadm is the standard bootstrapping tool — it initialises the control plane, joins workers, and manages certificates.',
            code: `# Install k3s (single node)
curl -sfL https://get.k3s.io | sh -

# Check cluster
sudo k3s kubectl get nodes

# Multi-master HA with embedded etcd
curl -sfL https://get.k3s.io | \\
  K3S_TOKEN=SECRET sh -s - server \\
  --cluster-init`,
            note: 'k3s uses /etc/rancher/k3s/k3s.yaml as its kubeconfig — copy it to ~/.kube/config to use standard kubectl.',
          },
          {
            heading: 'Managed Cloud Clusters',
            content:
              'Cloud-managed Kubernetes (GKE, EKS, AKS, DOKS) handles the control plane for you — upgrades, HA etcd, API server SLA. You only manage worker nodes (or use auto-provisioned node pools). Each provider has a CLI to fetch credentials into your kubeconfig. For production, managed clusters are strongly preferred: they reduce operational overhead and are covered by SLAs. Use Terraform or Pulumi to provision clusters as code and keep configuration reproducible.',
            code: `# GKE - get credentials
gcloud container clusters get-credentials my-cluster \\
  --region us-central1

# EKS - update kubeconfig
aws eks update-kubeconfig \\
  --region us-east-1 --name my-cluster

# AKS - get credentials
az aks get-credentials \\
  --resource-group myRG --name myAKS`,
            warning: 'Never run `kubeadm reset` on a node unless you intend to fully destroy and re-initialise it.',
          },
        ],
      },
      {
        id: 'k8s-kubectl',
        title: 'kubectl Basics',
        difficulty: 'beginner',
        tags: ['kubectl', 'cli', 'context', 'config', 'commands'],
        sections: [
          {
            heading: 'Configuration & Contexts',
            content:
              'kubectl reads cluster credentials from ~/.kube/config, a YAML file containing clusters, users, and contexts. A context binds a cluster, user, and namespace together. Multiple contexts let you switch between clusters (dev, staging, prod) with a single command. kubectx and kubens are popular third-party tools that simplify context and namespace switching. The KUBECONFIG environment variable can point to multiple config files, which kubectl merges automatically — useful for managing many clusters.',
            code: `# View current context
kubectl config current-context

# List all contexts
kubectl config get-contexts

# Switch context
kubectl config use-context minikube

# Set default namespace for context
kubectl config set-context --current --namespace=staging`,
            tip: 'Install kubectx + kubens via brew for fast context/namespace switching without typing full commands.',
          },
          {
            heading: 'Essential Commands',
            content:
              'The most-used kubectl commands follow a pattern: kubectl <verb> <resource> <name>. get lists resources (add -o wide, -o yaml, -o json for detail). describe shows events and full spec — essential for debugging. apply -f creates or updates resources from a manifest. delete removes them. logs streams container output. exec -it opens a shell inside a running container. port-forward tunnels a local port to a Pod port — useful for testing without exposing a Service.',
            code: `# List and inspect
kubectl get pods -n default -o wide
kubectl describe pod <name>

# Apply / delete
kubectl apply -f deployment.yaml
kubectl delete -f deployment.yaml

# Debug
kubectl logs <pod> -f --tail=100
kubectl exec -it <pod> -- /bin/sh
kubectl port-forward pod/<pod> 8080:80`,
            note: 'Add `-n <namespace>` or `--all-namespaces` / `-A` to scope commands across namespaces.',
          },
          {
            heading: 'Output Formats & JSONPath',
            content:
              'kubectl supports multiple output formats. -o yaml dumps the full manifest — useful for understanding what Kubernetes generated. -o json enables jq pipelines. -o jsonpath lets you extract specific fields inline. -o custom-columns formats tabular output. --dry-run=client -o yaml generates a manifest without applying it — great for scaffolding. Combine with diff to preview changes before applying. kubectl explain <resource.field> documents any field in the API directly in the terminal.',
            code: `# Get Pod image names
kubectl get pods -o jsonpath='{.items[*].spec.containers[*].image}'

# Custom columns
kubectl get nodes -o custom-columns=\\
'NAME:.metadata.name,CPU:.status.capacity.cpu'

# Dry-run scaffold
kubectl create deployment nginx \\
  --image=nginx --dry-run=client -o yaml > deploy.yaml

# Field docs
kubectl explain pod.spec.containers`,
            tip: 'Alias kubectl to k in your shell profile — saves thousands of keystrokes: `alias k=kubectl`.',
          },
        ],
        quiz: [
          {
            question: 'What does `kubectl config use-context` do?',
            options: [
              'Creates a new cluster context',
              'Switches the active cluster/user/namespace binding',
              'Deletes a context from kubeconfig',
              'Exports the kubeconfig to a file',
            ],
            correctIndex: 1,
            explanation: 'use-context sets the current-context field in kubeconfig, switching which cluster and credentials kubectl uses.',
          },
          {
            question: 'Which flag generates a manifest without applying it to the cluster?',
            options: ['--output=yaml', '--preview', '--dry-run=client', '--no-apply'],
            correctIndex: 2,
            explanation: '--dry-run=client processes the manifest locally and prints what would be sent, without contacting the API server.',
          },
          {
            question: 'How do you open an interactive shell inside a running Pod?',
            options: [
              'kubectl ssh <pod>',
              'kubectl exec -it <pod> -- /bin/sh',
              'kubectl attach <pod>',
              'kubectl run --shell <pod>',
            ],
            correctIndex: 1,
            explanation: 'kubectl exec -it opens an interactive terminal (-i keeps stdin open, -t allocates a pseudo-TTY) running the given command inside the Pod.',
          },
        ],
      },
      {
        id: 'k8s-first-deployment',
        title: 'Your First Deployment',
        difficulty: 'beginner',
        tags: ['deployment', 'nginx', 'expose', 'scale', 'kubectl'],
        sections: [
          {
            heading: 'Deploy and Expose nginx',
            content:
              'The quickest way to deploy an application is kubectl create deployment, which creates a Deployment resource managing a ReplicaSet and Pods. Then kubectl expose creates a Service to make Pods accessible. Using --type=NodePort opens a port on every node; LoadBalancer provisions a cloud load balancer. For minikube, kubectl service <name> --url generates an accessible URL by tunnelling through minikube\'s networking. This imperative approach is useful for quick tests; production workloads should use declarative YAML files.',
            code: `# Create deployment
kubectl create deployment nginx --image=nginx:1.25

# Expose as NodePort
kubectl expose deployment nginx \\
  --port=80 --type=NodePort

# Get access URL (minikube)
minikube service nginx --url

# Check rollout
kubectl rollout status deployment/nginx`,
            tip: 'Always pin image tags (nginx:1.25) rather than using :latest to ensure reproducible deployments.',
          },
          {
            heading: 'Scaling & Updating',
            content:
              'kubectl scale changes the number of Pod replicas immediately. For zero-downtime updates, change the container image with kubectl set image — Kubernetes performs a rolling update: it creates new Pods before terminating old ones, maintaining availability throughout. The maxSurge and maxUnavailable parameters (in the Deployment spec) control the pace. Check progress with kubectl rollout status. If something goes wrong, kubectl rollout undo instantly reverts to the previous ReplicaSet.',
            code: `# Scale to 3 replicas
kubectl scale deployment/nginx --replicas=3

# Update image
kubectl set image deployment/nginx nginx=nginx:1.26

# Watch rollout
kubectl rollout status deployment/nginx

# Rollback
kubectl rollout undo deployment/nginx

# View history
kubectl rollout history deployment/nginx`,
            note: 'Each kubectl set image or kubectl apply that changes the Pod template creates a new ReplicaSet, enabling rollback.',
          },
          {
            heading: 'Declarative Manifest',
            content:
              'While imperative commands are convenient, declarative manifests are the production standard. Store your YAML in git, apply with kubectl apply -f, and let Kubernetes handle the diff. The manifest below defines the same nginx Deployment declaratively. Adding resources.requests and resources.limits ensures the scheduler can make smart placement decisions and prevents a Pod from consuming all node memory. Liveness and readiness probes tell Kubernetes when to restart a Pod or route traffic to it.',
            code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.25
        ports:
        - containerPort: 80
        resources:
          requests:
            cpu: 100m
            memory: 128Mi
          limits:
            cpu: 250m
            memory: 256Mi`,
            warning: 'Without resource limits, a single misbehaving Pod can starve other workloads on the same node.',
          },
        ],
        challenge: {
          prompt:
            'Deploy a Deployment running 2 replicas of httpd:2.4, expose it as a ClusterIP Service on port 80, then scale to 4 replicas and update the image to httpd:2.4.58.',
          starterCode: `# Step 1: Create deployment
kubectl create deployment _____ --image=_____:_____ --replicas=_____

# Step 2: Expose
kubectl expose deployment _____ --port=_____ --type=_____

# Step 3: Scale
kubectl scale deployment/_____ --replicas=_____

# Step 4: Update image
kubectl set image deployment/_____ _____=_____:_____`,
          solutionCode: `# Step 1: Create deployment
kubectl create deployment httpd --image=httpd:2.4 --replicas=2

# Step 2: Expose
kubectl expose deployment httpd --port=80 --type=ClusterIP

# Step 3: Scale
kubectl scale deployment/httpd --replicas=4

# Step 4: Update image
kubectl set image deployment/httpd httpd=httpd:2.4.58

# Verify
kubectl rollout status deployment/httpd
kubectl get pods`,
          hints: [
            'The container name in kubectl set image is the name you gave in the Deployment spec (same as deployment name when created via kubectl create).',
            'ClusterIP is the default Service type — traffic is only reachable within the cluster.',
            'Use kubectl rollout status to confirm the rolling update completed before moving to the next step.',
          ],
        },
      },
      {
        id: 'k8s-namespaces',
        title: 'Namespaces',
        difficulty: 'beginner',
        tags: ['namespaces', 'resource-quotas', 'isolation', 'multi-tenancy'],
        sections: [
          {
            heading: 'What Are Namespaces?',
            content:
              'Namespaces provide logical isolation within a single Kubernetes cluster. Resources (Pods, Services, Deployments) in one namespace are hidden from commands scoped to another. Four namespaces exist by default: default (user workloads if none specified), kube-system (Kubernetes internal components), kube-public (publicly readable, stores cluster-info), and kube-node-lease (node heartbeat objects). Namespaces are ideal for separating teams, environments (dev/staging), or applications on shared clusters. Note: cluster-scoped resources (Nodes, PersistentVolumes, ClusterRoles) are not namespaced.',
            code: `# List all namespaces
kubectl get namespaces

# Create a namespace
kubectl create namespace staging

# Deploy into a namespace
kubectl apply -f app.yaml -n staging

# List pods across all namespaces
kubectl get pods -A`,
            tip: 'Use -n <namespace> or set a default namespace in your kubeconfig context to avoid accidentally deploying to the wrong environment.',
          },
          {
            heading: 'Resource Quotas & LimitRanges',
            content:
              'ResourceQuota limits total resource consumption in a namespace — you can cap CPU, memory, number of Pods, Services, PVCs, etc. LimitRange sets default and maximum resource requests/limits for individual containers in a namespace. Together they prevent one team from monopolising cluster resources. When a namespace has a ResourceQuota, all Pods must specify resource requests; otherwise the scheduler rejects them. Combining both objects enforces consistent resource hygiene across all workloads in the namespace.',
            code: `apiVersion: v1
kind: ResourceQuota
metadata:
  name: team-quota
  namespace: staging
spec:
  hard:
    requests.cpu: "4"
    requests.memory: 8Gi
    limits.cpu: "8"
    limits.memory: 16Gi
    pods: "20"
    services: "10"`,
            note: 'ResourceQuota only enforces limits on new resource creation — existing resources over quota are not evicted.',
          },
          {
            heading: 'Namespace Best Practices',
            content:
              'Use namespaces to segment by team or environment, not by application component (one namespace per microservice creates unnecessary overhead). Apply RBAC roles at the namespace level to give teams autonomy without cluster-admin rights. Use Network Policies to restrict cross-namespace traffic. Label namespaces for Pod Security Admission (PSA) enforcement: restricted, baseline, or privileged. Avoid deploying user workloads into kube-system — it can break cluster components and makes auditing harder.',
            code: `# Label namespace for Pod Security
kubectl label namespace staging \\
  pod-security.kubernetes.io/enforce=baseline \\
  pod-security.kubernetes.io/warn=restricted

# RBAC: bind role in a namespace only
kubectl create rolebinding dev-edit \\
  --clusterrole=edit \\
  --user=alice@example.com \\
  -n staging`,
            warning: 'Deleting a namespace deletes ALL resources in it — there is no undo. Always confirm the namespace before running kubectl delete namespace.',
          },
        ],
        quiz: [
          {
            question: 'Which default namespace contains Kubernetes system components?',
            options: ['default', 'kube-public', 'kube-system', 'kube-node-lease'],
            correctIndex: 2,
            explanation: 'kube-system hosts core components like kube-dns, kube-proxy, and the metrics-server.',
          },
          {
            question: 'What does a ResourceQuota enforce?',
            options: [
              'Per-container CPU and memory defaults',
              'Total resource consumption limits in a namespace',
              'Node-level resource caps',
              'Image pull rate limits',
            ],
            correctIndex: 1,
            explanation: 'ResourceQuota sets hard limits on aggregate resource usage (CPU, memory, object counts) across all resources in a namespace.',
          },
          {
            question: 'Are Node resources namespaced?',
            options: [
              'Yes, nodes belong to the default namespace',
              'Yes, nodes can be in any namespace',
              'No, nodes are cluster-scoped resources',
              'Only in multi-tenant clusters',
            ],
            correctIndex: 2,
            explanation: 'Nodes are cluster-scoped and not namespaced; the -n flag has no effect on them.',
          },
        ],
      },
      {
        id: 'k8s-yaml-manifests',
        title: 'Writing YAML Manifests',
        difficulty: 'beginner',
        tags: ['yaml', 'manifests', 'apiVersion', 'kind', 'metadata', 'spec'],
        sections: [
          {
            heading: 'Manifest Structure',
            content:
              'Every Kubernetes resource manifest has four top-level fields. apiVersion identifies which API group and version handles the resource (e.g., apps/v1, v1, batch/v1). kind names the resource type (Deployment, Service, ConfigMap). metadata holds identifying information: name, namespace, labels, and annotations. spec declares desired state — its shape depends entirely on the kind. When you kubectl apply a manifest, the API server validates it against the OpenAPI schema for that apiVersion/kind, then stores it in etcd.',
            code: `apiVersion: apps/v1        # API group/version
kind: Deployment           # Resource type
metadata:
  name: my-app             # Unique within namespace
  namespace: production
  labels:
    app: my-app
    version: "1.0"
spec:                      # Desired state (kind-specific)
  replicas: 2
  selector:
    matchLabels:
      app: my-app`,
            tip: 'Use kubectl explain <kind> or kubectl explain <kind>.spec.field to discover valid fields without leaving the terminal.',
          },
          {
            heading: 'Labels, Metadata & Annotations',
            content:
              'Labels are key/value pairs attached to resources for selection and grouping — Services and Deployments use label selectors to identify their Pods. Annotations store arbitrary metadata not used for selection: tool version, build IDs, config hashes, or owner contact. Common label conventions: app (application name), version, component (frontend/backend), env (dev/prod), tier (web/db). Well-structured labels enable powerful queries and integrate with monitoring tools like Prometheus, which scrapes label dimensions as metric tags.',
            code: `metadata:
  name: api-server
  labels:
    app: my-platform       # required by Service selector
    component: api
    version: "2.3.1"
    env: production
  annotations:
    kubernetes.io/change-cause: "Bumped to v2.3.1"
    prometheus.io/scrape: "true"
    prometheus.io/port: "8080"
    owner: "platform-team@example.com"`,
            note: 'Labels have a 63-character value limit and must match [a-z0-9A-Z.-_]. Annotations have no size limit per key but all annotations total under 256 KB.',
          },
          {
            heading: 'Multi-Resource Files & Kustomize',
            content:
              'A single YAML file can hold multiple resources separated by ---. This keeps related resources together and allows a single kubectl apply -f to deploy them all atomically. For environment-specific configuration, Kustomize (built into kubectl) applies patches and overlays on a base manifest without duplicating YAML. kubectl apply -k ./overlays/staging applies the staging overlay. Helm is an alternative templating approach using charts with values files — better for complex, parameterised applications.',
            code: `# Multi-resource file (deployment + service)
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
spec:
  replicas: 2
  # ...
---
apiVersion: v1
kind: Service
metadata:
  name: api
spec:
  selector:
    app: api
  ports:
  - port: 80

# Apply kustomize overlay
kubectl apply -k ./overlays/production`,
            analogy: 'YAML manifests are like a contract between you and Kubernetes: you describe what you want, and Kubernetes is legally obligated to make it happen.',
          },
        ],
      },
      {
        id: 'k8s-api-resources',
        title: 'API Resources & Versions',
        difficulty: 'beginner',
        tags: ['api', 'apiVersion', 'crd', 'stable', 'beta', 'alpha'],
        sections: [
          {
            heading: 'API Groups and Stability',
            content:
              'Kubernetes APIs are versioned by stability tier. v1 (stable core) covers foundational types: Pod, Service, ConfigMap, Secret, Namespace. apps/v1 covers Deployment, DaemonSet, StatefulSet, ReplicaSet. batch/v1 covers Job and CronJob. Beta versions (e.g., policy/v1beta1) indicate features mostly complete but with possible breaking changes. Alpha (e.g., something/v1alpha1) can be removed at any release. Always use the most stable available version for your cluster. Run kubectl api-versions to see all supported groups in your cluster.',
            code: `# List all API versions
kubectl api-versions

# List all resource types
kubectl api-resources

# Get stable core resources
kubectl api-resources --api-group=""

# Get apps group resources
kubectl api-resources --api-group=apps`,
            tip: 'When migrating clusters, run kubectl convert -f old.yaml to upgrade manifests from deprecated API versions.',
          },
          {
            heading: 'Custom Resource Definitions (CRDs)',
            content:
              'CRDs extend the Kubernetes API with user-defined resource types. Operators (like cert-manager, Prometheus Operator, ArgoCD) install CRDs to manage their domain objects (Certificate, PrometheusRule, Application) using the same kubectl workflow as built-in types. A CRD defines the schema for the new resource; a custom controller (operator) watches those resources and implements the business logic. This is the canonical pattern for packaging complex stateful applications on Kubernetes.',
            code: `# List installed CRDs
kubectl get crds

# Inspect a CRD
kubectl describe crd certificates.cert-manager.io

# Use a custom resource (cert-manager example)
kubectl get certificates -A
kubectl describe certificate my-tls-cert

# Check operator pod
kubectl get pods -n cert-manager`,
            note: 'CRDs are cluster-scoped resources, so their instances can be either cluster-scoped or namespace-scoped depending on the CRD\'s scope field.',
          },
          {
            heading: 'Deprecation & Version Migration',
            content:
              'Kubernetes deprecates API versions on a schedule, giving users multiple releases to migrate. The API server serves deprecated versions alongside newer ones during the transition. kubectl apply will warn when you apply a manifest using a deprecated version. Tools like pluto and kubent scan your cluster and manifests for deprecated API usage. When upgrading Kubernetes, always check the release notes for removed APIs — Ingress moved from extensions/v1beta1 to networking.k8s.io/v1 in 1.22, breaking many manifests.',
            code: `# Check for deprecated APIs (pluto)
pluto detect-files -d ./k8s/
pluto detect-helm -o wide

# Check deprecated APIs in cluster (kubent)
kubent

# Convert manifest to newer API version
kubectl convert -f ingress-old.yaml \\
  --output-version networking.k8s.io/v1`,
            warning: 'Kubernetes removes deprecated API versions — not just warns. Upgrading a cluster without migrating manifests can break all your deployments.',
          },
        ],
      },
    ],
  },
  {
    id: 'k8s-core-resources',
    label: 'Core Resources',
    icon: '🧱',
    description: 'The fundamental workload and configuration resources that make up a Kubernetes application.',
    entries: [
      {
        id: 'k8s-pods',
        title: 'Pods',
        difficulty: 'beginner',
        tags: ['pods', 'lifecycle', 'containers', 'restart-policy', 'init-containers'],
        sections: [
          {
            heading: 'Pod Basics',
            content:
              'A Pod is the atomic unit of Kubernetes scheduling: a group of one or more containers that share a network namespace (same IP, same localhost) and optionally storage volumes. Containers in a Pod are co-located on the same node and can communicate via localhost. Pods are ephemeral — when they die, they are not resurrected; higher-level controllers (Deployments, StatefulSets) create replacement Pods. Each Pod gets its own cluster-internal IP address. Init containers run to completion before app containers start, used for setup tasks like waiting for a database.',
            code: `apiVersion: v1
kind: Pod
metadata:
  name: my-pod
  labels:
    app: my-app
spec:
  containers:
  - name: app
    image: nginx:1.25
    ports:
    - containerPort: 80
    resources:
      requests:
        memory: 64Mi
        cpu: 50m`,
            diagram: {
              kind: 'mermaid',
              code: `stateDiagram-v2
  [*] --> Pending : Scheduled
  Pending --> Running : Containers start
  Running --> Succeeded : All containers exit 0
  Running --> Failed : Container exits non-zero
  Running --> Unknown : Node unreachable
  Succeeded --> [*]
  Failed --> [*]`,
              caption: 'Pod lifecycle states',
            },
            tip: 'Rarely create bare Pods in production — they are not rescheduled if a node fails. Use a Deployment or Job instead.',
          },
          {
            heading: 'Pod Lifecycle & Restart Policies',
            content:
              'Kubernetes tracks Pod phase: Pending (waiting for scheduling/image pull), Running (at least one container is running), Succeeded (all containers exited 0), Failed (at least one container exited non-zero), Unknown (node unreachable). RestartPolicy controls kubelet behaviour: Always (default — restart on any exit, used for long-running services), OnFailure (restart only on non-zero exit, used for Jobs), Never (no restart). Container states within a Pod are Waiting, Running, and Terminated.',
            code: `# Watch pod status
kubectl get pod my-pod -w

# Describe for events/restart count
kubectl describe pod my-pod

# RestartPolicy examples
spec:
  restartPolicy: Always    # Deployments
  # restartPolicy: OnFailure  # Jobs
  # restartPolicy: Never      # One-shot tasks`,
            note: 'CrashLoopBackOff means a container keeps crashing and kubelet is applying exponential backoff (10s, 20s, 40s… up to 5min) before restarting.',
          },
          {
            heading: 'Multi-Container Patterns',
            content:
              'Pods support several multi-container patterns. The sidecar pattern adds a helper container (log shipper, proxy) alongside the main app — both share the same Pod network and volumes. The ambassador pattern puts a proxy container in front to abstract external services. The adapter pattern transforms output format for monitoring. Init containers handle one-time setup before the main container starts. All containers in a Pod must be scheduled together, which is why coupling should be intentional — containers with different scaling needs should be separate Pods.',
            code: `spec:
  initContainers:
  - name: wait-for-db
    image: busybox
    command: ['sh', '-c', 'until nc -z db 5432; do sleep 2; done']
  containers:
  - name: app
    image: myapp:1.0
  - name: log-shipper       # sidecar
    image: fluent-bit:2.1
    volumeMounts:
    - name: logs
      mountPath: /var/log/app`,
            analogy: 'A Pod is like a shipping container on a cargo ship: multiple items (containers) inside share the same address and move together.',
          },
        ],
        quiz: [
          {
            question: 'What restart policy should a Kubernetes Job use?',
            options: ['Always', 'OnFailure', 'Never', 'OnSuccess'],
            correctIndex: 1,
            explanation: 'OnFailure tells kubelet to restart the container only when it exits with a non-zero code, which is ideal for batch jobs that should succeed once.',
          },
          {
            question: 'What does CrashLoopBackOff indicate?',
            options: [
              'The Pod is waiting for a volume to mount',
              'The container repeatedly crashes and kubelet is backing off before restarting',
              'The node lost network connectivity',
              'The image pull failed',
            ],
            correctIndex: 1,
            explanation: 'CrashLoopBackOff means the container keeps exiting and kubelet applies increasing delays before each restart attempt.',
          },
          {
            question: 'Do containers within the same Pod share the same IP address?',
            options: [
              'No, each container gets its own IP',
              'Only if they use hostNetwork',
              'Yes, they share the Pod network namespace',
              'Only containers using the same image',
            ],
            correctIndex: 2,
            explanation: 'All containers in a Pod share a single network namespace, meaning they share an IP and can reach each other via localhost.',
          },
        ],
      },
      {
        id: 'k8s-replicasets',
        title: 'ReplicaSets',
        difficulty: 'beginner',
        tags: ['replicaset', 'desired-state', 'selector', 'scaling'],
        sections: [
          {
            heading: 'Purpose & How It Works',
            content:
              'A ReplicaSet ensures a specified number of Pod replicas are running at all times. It watches Pods matching its selector and creates or deletes Pods to match the desired count. If a Pod is deleted manually or a node fails, the ReplicaSet controller creates a replacement. ReplicaSets use label selectors (matchLabels or matchExpressions) to identify their Pods — labels must match the Pod template\'s labels. You rarely create ReplicaSets directly; Deployments own them and add rolling update and rollback capabilities on top.',
            code: `apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: frontend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
      - name: frontend
        image: nginx:1.25`,
            tip: 'Deployments manage ReplicaSets — prefer Deployments in production. Use bare ReplicaSets only if you need custom update logic.',
          },
          {
            heading: 'Selector Mechanics',
            content:
              'The selector field is immutable after creation — you cannot change which Pods a ReplicaSet manages. The selector must match the Pod template labels exactly; a mismatch causes a validation error. ReplicaSets use set-based selectors (matchLabels, matchExpressions) which are more expressive than the older equality-based selectors used by Replication Controllers. If you create a Pod with labels matching an existing ReplicaSet\'s selector, the ReplicaSet will adopt it and may delete other Pods to maintain the desired count.',
            code: `# matchLabels (equality)
selector:
  matchLabels:
    app: frontend
    tier: web

# matchExpressions (set-based)
selector:
  matchExpressions:
  - key: app
    operator: In
    values: [frontend, web]
  - key: env
    operator: NotIn
    values: [legacy]`,
            warning: 'Never manually create Pods with labels matching a ReplicaSet selector unless intentional — the RS may immediately delete excess Pods.',
          },
          {
            heading: 'Inspecting ReplicaSets',
            content:
              'kubectl get rs shows DESIRED, CURRENT, and READY counts. DESIRED is the spec.replicas value; CURRENT is how many Pods exist matching the selector; READY is how many have passed readiness checks. When a Deployment rolls out, you\'ll see two ReplicaSets: old (scaling down) and new (scaling up). kubectl describe rs shows the selector, Pod template, and recent events. Use kubectl get pods -l app=frontend to list Pods owned by the ReplicaSet filtered by its selector.',
            code: `# List ReplicaSets
kubectl get rs -n default

# Describe
kubectl describe rs frontend

# List owned Pods
kubectl get pods -l app=frontend

# Scale a RS directly (not recommended over Deployment)
kubectl scale rs/frontend --replicas=5`,
            note: 'When you scale a Deployment, it updates the Deployment spec, which then updates the owned ReplicaSet — not the RS directly.',
          },
        ],
      },
      {
        id: 'k8s-deployments',
        title: 'Deployments',
        difficulty: 'beginner',
        tags: ['deployment', 'rolling-update', 'rollback', 'strategy', 'revisions'],
        sections: [
          {
            heading: 'Deployment Strategy',
            content:
              'A Deployment manages ReplicaSets to provide declarative updates, rolling upgrades, and rollback. The default strategy is RollingUpdate: it incrementally replaces old Pods with new ones. maxUnavailable (default 25%) is the max number of Pods that can be unavailable during an update. maxSurge (default 25%) is how many extra Pods can exist above the desired count. The Recreate strategy terminates all old Pods before creating new ones — causes downtime but avoids running two versions simultaneously, which matters for apps that cannot tolerate multiple versions concurrently.',
            code: `spec:
  replicas: 4
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1
      maxSurge: 1
  selector:
    matchLabels:
      app: api
  template:
    metadata:
      labels:
        app: api
    spec:
      containers:
      - name: api
        image: myapi:2.0`,
            tip: 'Set maxUnavailable: 0 and maxSurge: 1 for zero-downtime deployments — always at least replicas Pods running.',
          },
          {
            heading: 'Rollouts & Rollbacks',
            content:
              'Every change to the Pod template (image, env vars, resource limits) creates a new revision. kubectl rollout history lists revisions with change-cause annotations. kubectl rollout undo reverts to the previous revision; --to-revision=N jumps to a specific one. Kubernetes keeps revisionHistoryLimit old ReplicaSets (default 10) to enable rollbacks — the ReplicaSets still exist but are scaled to 0. Pausing a rollout with kubectl rollout pause lets you make multiple changes before resuming, preventing multiple simultaneous updates.',
            code: `# Annotate for history
kubectl annotate deployment/api \\
  kubernetes.io/change-cause="Upgrade to v2.1"

# View history
kubectl rollout history deployment/api

# Rollback to previous
kubectl rollout undo deployment/api

# Rollback to specific revision
kubectl rollout undo deployment/api --to-revision=3

# Pause / resume
kubectl rollout pause deployment/api
kubectl rollout resume deployment/api`,
            note: 'kubectl rollout restart triggers a rolling restart without changing the image — useful for picking up ConfigMap changes.',
          },
          {
            heading: 'Health Probes',
            content:
              'Probes determine when a container is ready to serve traffic (readinessProbe) and when it should be restarted (livenessProbe). Without a readinessProbe, Kubernetes sends traffic to a Pod as soon as it starts — before the app is ready. A livenessProbe detects deadlocks by restarting the container. A startupProbe gives slow-starting containers extra time before liveness checks begin. Probes can be HTTP GET (checks status code), TCP socket (checks port open), or exec (runs a command, checks exit code).',
            code: `containers:
- name: api
  image: myapi:2.0
  readinessProbe:
    httpGet:
      path: /health/ready
      port: 8080
    initialDelaySeconds: 5
    periodSeconds: 10
  livenessProbe:
    httpGet:
      path: /health/live
      port: 8080
    initialDelaySeconds: 15
    failureThreshold: 3`,
            warning: 'A misconfigured livenessProbe that fires too aggressively causes endless container restarts (CrashLoopBackOff) even when the app is healthy.',
          },
        ],
        quiz: [
          {
            question: 'What does maxSurge control in a RollingUpdate strategy?',
            options: [
              'Maximum number of Pods that can be unavailable',
              'Maximum number of extra Pods above the desired count during an update',
              'Maximum number of revisions stored',
              'Maximum time allowed for a rollout',
            ],
            correctIndex: 1,
            explanation: 'maxSurge specifies how many additional Pods (above replicas) can be created during a rolling update, trading extra resources for faster rollout.',
          },
          {
            question: 'Which probe prevents a Pod from receiving traffic until the app is ready?',
            options: ['livenessProbe', 'startupProbe', 'readinessProbe', 'healthProbe'],
            correctIndex: 2,
            explanation: 'readinessProbe controls whether a Pod is added to Service endpoints. A failing readinessProbe removes the Pod from load balancing without restarting it.',
          },
          {
            question: 'What command triggers a rolling restart of a Deployment without changing the image?',
            options: [
              'kubectl apply -f deployment.yaml',
              'kubectl rollout restart deployment/api',
              'kubectl scale deployment/api --replicas=0',
              'kubectl delete pods -l app=api',
            ],
            correctIndex: 1,
            explanation: 'kubectl rollout restart adds a restart annotation to the Pod template, triggering a rolling update without any spec change.',
          },
        ],
        challenge: {
          prompt:
            'Write a complete Deployment manifest for a web app: 3 replicas, image myapp:1.0, port 8080, rollingUpdate with maxUnavailable=1 maxSurge=1, an HTTP readinessProbe on /ready port 8080 (delay 5s, period 10s), and resource requests of 100m CPU / 128Mi memory.',
          starterCode: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
spec:
  replicas: ___
  strategy:
    type: ___
    rollingUpdate:
      maxUnavailable: ___
      maxSurge: ___
  selector:
    matchLabels:
      app: web-app
  template:
    metadata:
      labels:
        app: web-app
    spec:
      containers:
      - name: web-app
        image: ___:___
        ports:
        - containerPort: ___
        resources:
          requests:
            cpu: ___
            memory: ___
        readinessProbe:
          httpGet:
            path: ___
            port: ___
          initialDelaySeconds: ___
          periodSeconds: ___`,
          solutionCode: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1
      maxSurge: 1
  selector:
    matchLabels:
      app: web-app
  template:
    metadata:
      labels:
        app: web-app
    spec:
      containers:
      - name: web-app
        image: myapp:1.0
        ports:
        - containerPort: 8080
        resources:
          requests:
            cpu: 100m
            memory: 128Mi
        readinessProbe:
          httpGet:
            path: /ready
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 10`,
          hints: [
            'The selector.matchLabels must exactly match template.metadata.labels.',
            'Resource requests use millicores for CPU (100m = 0.1 vCPU) and binary SI units for memory (128Mi).',
            'The readinessProbe httpGet.port should match the containerPort value.',
          ],
        },
      },
      {
        id: 'k8s-services',
        title: 'Services',
        difficulty: 'beginner',
        tags: ['services', 'clusterip', 'nodeport', 'loadbalancer', 'networking'],
        sections: [
          {
            heading: 'Why Services Exist',
            content:
              'Pods are ephemeral — they get new IP addresses every time they restart. Services provide a stable virtual IP (ClusterIP) and DNS name that routes to matching Pods via label selector. Kubernetes maintains an Endpoints object listing the current Pod IPs for each Service. kube-proxy programs iptables/ipvs rules to forward traffic from the ClusterIP to one of the ready Pod endpoints (round-robin by default). Services also enable service discovery: within a cluster, any Pod can reach service-name.namespace.svc.cluster.local.',
            code: `apiVersion: v1
kind: Service
metadata:
  name: api
spec:
  selector:
    app: api           # Matches Pod labels
  ports:
  - port: 80           # Service port
    targetPort: 8080   # Container port
  type: ClusterIP      # Only reachable in-cluster`,
            diagram: {
              kind: 'mermaid',
              code: `graph LR
  Client -->|ClusterIP:80| SVC[Service]
  SVC -->|round-robin| P1[Pod 1\n10.0.0.5:8080]
  SVC -->|round-robin| P2[Pod 2\n10.0.0.6:8080]
  SVC -->|round-robin| P3[Pod 3\n10.0.0.7:8080]`,
              caption: 'Service load-balancing across Pods',
            },
            tip: 'A Service with an empty selector creates no Endpoints automatically — useful for manually pointing to external services by creating Endpoints yourself.',
          },
          {
            heading: 'Service Types',
            content:
              'ClusterIP (default) exposes the Service only inside the cluster. NodePort opens a port (30000–32767) on every node and forwards to the Service — accessible from outside the cluster via <NodeIP>:<NodePort>. LoadBalancer provisions an external cloud load balancer pointing to NodePort endpoints; the cloud controller assigns an external IP. ExternalName creates a CNAME DNS alias to an external hostname — no proxying or load balancing. Headless Services (clusterIP: None) return Pod IPs directly from DNS instead of a virtual IP — used by StatefulSets for stable DNS-based discovery.',
            code: `# NodePort
spec:
  type: NodePort
  ports:
  - port: 80
    targetPort: 8080
    nodePort: 30080   # optional; random if omitted

# LoadBalancer (cloud)
spec:
  type: LoadBalancer
  ports:
  - port: 443
    targetPort: 8443

# Headless (StatefulSet)
spec:
  clusterIP: None
  selector:
    app: mysql`,
            note: 'For HTTP/HTTPS traffic, use an Ingress controller (nginx, Traefik) rather than many LoadBalancer Services — one external IP for multiple hostnames is cheaper.',
          },
          {
            heading: 'Service Discovery & DNS',
            content:
              'CoreDNS runs in kube-system and answers DNS queries for Services. A Service named api in namespace production is reachable at api.production.svc.cluster.local from any Pod. Within the same namespace, the short name api resolves. Pod DNS is configured via /etc/resolv.conf injected by kubelet. Environment variables are also injected into Pods for each Service in the same namespace at Pod creation time (API_SERVICE_HOST, API_SERVICE_PORT), though DNS-based discovery is preferred as it does not require restarting Pods when Services change.',
            code: `# DNS resolution inside a Pod
kubectl exec -it my-pod -- nslookup api
# Returns: api.default.svc.cluster.local -> 10.96.0.50

# Full FQDN
# <service>.<namespace>.svc.cluster.local

# Check CoreDNS
kubectl get pods -n kube-system -l k8s-app=kube-dns
kubectl logs -n kube-system -l k8s-app=kube-dns`,
            analogy: 'A Service is like a phone switchboard: callers dial one stable number, and the switchboard routes to whichever operator (Pod) is available.',
          },
        ],
        quiz: [
          {
            question: 'Which Service type provisions an external cloud load balancer?',
            options: ['ClusterIP', 'NodePort', 'LoadBalancer', 'ExternalName'],
            correctIndex: 2,
            explanation: 'LoadBalancer type triggers the cloud controller manager to provision a cloud-native load balancer with an external IP pointing to the cluster.',
          },
          {
            question: 'What is the DNS name format for a Service named "db" in namespace "data"?',
            options: [
              'db.cluster.local',
              'db.data.svc.cluster.local',
              'data.db.cluster.local',
              'svc.data.db',
            ],
            correctIndex: 1,
            explanation: 'The FQDN pattern is <service>.<namespace>.svc.cluster.local, so db in the data namespace is db.data.svc.cluster.local.',
          },
          {
            question: 'What does clusterIP: None create?',
            options: [
              'A Service with no networking',
              'An external Service pointing to a hostname',
              'A headless Service that returns Pod IPs from DNS',
              'A Service accessible only on localhost',
            ],
            correctIndex: 2,
            explanation: 'A headless Service (clusterIP: None) has no virtual IP. DNS returns the individual Pod IPs directly, enabling stateful peer discovery.',
          },
        ],
      },
      {
        id: 'k8s-labels-selectors',
        title: 'Labels & Selectors',
        difficulty: 'beginner',
        tags: ['labels', 'selectors', 'filtering', 'matchLabels', 'matchExpressions'],
        sections: [
          {
            heading: 'Labels',
            content:
              'Labels are arbitrary key/value pairs attached to Kubernetes objects. They have no semantic meaning to the system by default — their meaning comes from how you choose to use them. Common conventions: app (application identifier), version, component (frontend/backend/cache), env (dev/staging/prod), tier (web/db). Labels have a 63-character value limit, must start/end with alphanumeric characters, and allow hyphens, underscores, and dots. A key may include an optional DNS subdomain prefix: app.kubernetes.io/name is the recommended standard label key.',
            code: `metadata:
  labels:
    app.kubernetes.io/name: my-app
    app.kubernetes.io/version: "1.2.3"
    app.kubernetes.io/component: frontend
    app.kubernetes.io/part-of: my-platform
    app.kubernetes.io/managed-by: helm
    environment: production

# Filter by label
kubectl get pods -l app=my-app
kubectl get pods -l 'env in (staging,production)'
kubectl get pods -l app=my-app,component=frontend`,
            tip: 'The app.kubernetes.io/* label family is the recommended standard — tools like Helm and Argo use them for resource discovery.',
          },
          {
            heading: 'Selectors',
            content:
              'Selectors filter resources by label. Equality-based selectors use =, ==, or != operators (used in Service .spec.selector). Set-based selectors use In, NotIn, Exists, DoesNotExist (used in Deployment/ReplicaSet .spec.selector.matchExpressions). kubectl supports both styles in -l flags. Node selectors (spec.nodeSelector) assign Pods to nodes with matching labels — a simple form of scheduling constraint. Node affinity (spec.affinity.nodeAffinity) is the richer replacement with required and preferred scheduling rules.',
            code: `# Equality-based (kubectl)
kubectl get pods -l app=nginx
kubectl get pods -l app!=legacy

# Set-based (kubectl)
kubectl get pods -l 'version in (v1,v2)'
kubectl get pods -l 'feature notin (beta)'

# matchExpressions in manifest
selector:
  matchExpressions:
  - key: tier
    operator: In
    values: [frontend, web]
  - key: deprecated
    operator: DoesNotExist`,
            note: 'A Deployment\'s spec.selector is immutable. To change selectors, you must delete and recreate the Deployment.',
          },
          {
            heading: 'Label-Driven Architecture',
            content:
              'Labels are the connective tissue of Kubernetes. Services route to Pods by label. Deployments manage Pods by label. Network Policies allow/deny traffic by label. PodDisruptionBudgets protect Pods by label. HorizontalPodAutoscaler targets Deployments/StatefulSets referenced by label. Monitoring tools scrape metrics from Pods with specific labels. Well-designed label schemas make it easy to query, group, and manage complex applications. Avoid using labels for data you\'d search with -l — that is what annotations are for.',
            code: `# Network Policy using label selectors
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-frontend
spec:
  podSelector:
    matchLabels:
      app: backend
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: frontend`,
            analogy: 'Labels are like colour-coded tags in a warehouse. Any system (Services, Deployments, monitoring) can query "give me everything tagged blue+production".',
          },
        ],
      },
      {
        id: 'k8s-annotations',
        title: 'Annotations',
        difficulty: 'beginner',
        tags: ['annotations', 'metadata', 'tooling', 'documentation'],
        sections: [
          {
            heading: 'What Are Annotations?',
            content:
              'Annotations are key/value pairs stored in resource metadata, similar to labels but intended for non-identifying metadata — data used by tools, operators, and humans rather than Kubernetes selectors. There is no size or character restriction on annotation values (max 256 KB total), making them suitable for storing JSON blobs, certificates, build metadata, or instructions for controllers. Unlike labels, you cannot use annotations in kubectl -l filters or resource selectors. They are purely informational or tool-driven configuration.',
            code: `metadata:
  annotations:
    # Deployment change reason
    kubernetes.io/change-cause: "v2.1: Added OAuth support"
    # Prometheus scraping config
    prometheus.io/scrape: "true"
    prometheus.io/port: "9090"
    prometheus.io/path: "/metrics"
    # Cert-manager TLS
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
    # Human-readable docs
    description: "Main API server for platform v2"`,
            tip: 'kubectl annotate adds annotations imperatively: `kubectl annotate pod my-pod note="needs review"`.',
          },
          {
            heading: 'Common Tool Annotations',
            content:
              'Many tools read annotations to configure behaviour. nginx Ingress controller uses nginx.ingress.kubernetes.io/rewrite-target, rate-limit, and ssl-redirect annotations on Ingress objects. cert-manager watches for cert-manager.io/cluster-issuer to provision TLS certificates. Prometheus looks for prometheus.io/scrape: "true" on Pods to add them to scrape targets. Argo Rollouts and Flagger use annotations for canary weight configuration. Cluster autoscaler uses cluster-autoscaler.kubernetes.io annotations on node groups.',
            code: `# Ingress with nginx annotations
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: api
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
    nginx.ingress.kubernetes.io/rate-limit: "100"
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  rules:
  - host: api.example.com`,
            note: 'Annotation keys follow the same format as label keys: optional-prefix/name. Tool-specific annotations should use the tool\'s domain as prefix.',
          },
          {
            heading: 'Annotations vs Labels',
            content:
              'Use labels for data that identifies and groups resources — things you filter with selectors (app, env, version, component). Use annotations for everything else: build metadata, last deployer, documentation links, config hashes for triggering rollouts, tool-specific settings. A common pattern is to store a hash of a ConfigMap or Secret in a Deployment annotation — when the config changes, the annotation changes, triggering a rolling restart automatically without manual kubectl rollout restart.',
            code: `# Trigger redeploy when config changes (Helm idiom)
spec:
  template:
    metadata:
      annotations:
        checksum/config: {{ include (print $.Template.BasePath "/configmap.yaml") . | sha256sum }}

# Manually annotate to trigger rollout
kubectl annotate deployment/api \\
  rollout-trigger="$(date +%s)" --overwrite`,
            analogy: 'Labels are like product SKU codes — used for querying and grouping. Annotations are like the product manual — rich information for those who need it.',
          },
        ],
      },
      {
        id: 'k8s-configmaps',
        title: 'ConfigMaps',
        difficulty: 'beginner',
        tags: ['configmap', 'configuration', 'env-vars', 'volumes', 'immutable'],
        sections: [
          {
            heading: 'ConfigMap Basics',
            content:
              'ConfigMaps store non-sensitive configuration data as key/value pairs, decoupling configuration from container images. They can hold single values (DATABASE_HOST=db), multi-line config files (nginx.conf), or JSON blobs. Pods consume ConfigMaps as environment variables (envFrom or env.valueFrom), command-line arguments, or mounted files in a volume. The same container image can run in dev and prod with different ConfigMaps — no image rebuild needed. ConfigMap data is stored in etcd as plaintext; do not use them for passwords or certificates (use Secrets).',
            code: `apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  LOG_LEVEL: info
  DATABASE_HOST: postgres.data.svc.cluster.local
  DATABASE_PORT: "5432"
  config.yaml: |
    server:
      port: 8080
      timeout: 30s
    feature_flags:
      new_ui: true`,
            tip: 'Setting immutable: true on a ConfigMap prevents accidental changes and allows kubelet to stop watching it — better performance at scale.',
          },
          {
            heading: 'Using ConfigMaps in Pods',
            content:
              'There are three ways to use a ConfigMap in a Pod. envFrom loads all keys as environment variables at once. env.valueFrom.configMapKeyRef loads a specific key as a named env var. volumeMount with a configMap volume mounts each key as a file — ideal for config files your app reads from disk. Volume-mounted ConfigMaps update automatically when the ConfigMap changes (within ~1 minute via kubelet sync), while environment variables do not update without a Pod restart. Use checksums or ArgoCD sync to trigger restarts on config change.',
            code: `spec:
  containers:
  - name: app
    image: myapp:1.0
    # Load all keys as env vars
    envFrom:
    - configMapRef:
        name: app-config
    # Or load specific key
    env:
    - name: LOG_LEVEL
      valueFrom:
        configMapKeyRef:
          name: app-config
          key: LOG_LEVEL
    volumeMounts:
    - name: config
      mountPath: /etc/app
  volumes:
  - name: config
    configMap:
      name: app-config`,
            note: 'When a ConfigMap key maps to a mounted file, the filename is the key name. Use items to rename or select specific keys.',
          },
          {
            heading: 'Managing ConfigMaps',
            content:
              'Create ConfigMaps from literal values, files, or directories. kubectl create configmap with --from-literal adds individual key/value pairs. --from-file loads file contents as a value (filename becomes the key). --from-env-file loads a .env-style file. In GitOps workflows, store ConfigMap manifests in version control; avoid imperative creation in production. For sensitive configs that still need to be in a ConfigMap (non-secret but not public), consider using Sealed Secrets or External Secrets Operator to manage them securely.',
            code: `# From literal
kubectl create configmap app-config \\
  --from-literal=LOG_LEVEL=info \\
  --from-literal=PORT=8080

# From file
kubectl create configmap nginx-conf \\
  --from-file=nginx.conf=./nginx.conf

# From directory
kubectl create configmap app-configs \\
  --from-file=./config/

# View
kubectl get configmap app-config -o yaml`,
            warning: 'ConfigMap updates do not restart Pods automatically. Running Pods continue using the old environment variables until restarted.',
          },
        ],
        quiz: [
          {
            question: 'What is the main difference between ConfigMaps and Secrets?',
            options: [
              'ConfigMaps are namespaced; Secrets are not',
              'ConfigMaps store plaintext config; Secrets store base64-encoded sensitive data',
              'ConfigMaps can be mounted as volumes; Secrets cannot',
              'ConfigMaps support immutable flag; Secrets do not',
            ],
            correctIndex: 1,
            explanation: 'ConfigMaps store plaintext non-sensitive config. Secrets store base64-encoded sensitive data with additional access controls and encryption at rest (if enabled).',
          },
          {
            question: 'When does a volume-mounted ConfigMap update in a running Pod?',
            options: [
              'Never — the Pod must restart',
              'Immediately upon ConfigMap change',
              'Within ~1 minute via kubelet sync',
              'Only after a rolling update',
            ],
            correctIndex: 2,
            explanation: 'kubelet periodically syncs mounted ConfigMap volumes. Updates propagate within the kubelet sync period (default 1 minute), without a Pod restart.',
          },
          {
            question: 'What does setting immutable: true on a ConfigMap do?',
            options: [
              'Encrypts the ConfigMap data',
              'Prevents changes and stops kubelet from watching it',
              'Makes the ConfigMap cluster-scoped',
              'Shares the ConfigMap across namespaces',
            ],
            correctIndex: 1,
            explanation: 'Immutable ConfigMaps cannot be modified (only deleted/recreated) and allow kubelet to stop watching for updates, improving performance in large clusters.',
          },
        ],
      },
      {
        id: 'k8s-secrets',
        title: 'Secrets',
        difficulty: 'intermediate',
        tags: ['secrets', 'base64', 'tls', 'external-secrets', 'sealed-secrets'],
        sections: [
          {
            heading: 'Secret Types & Encoding',
            content:
              'Kubernetes Secrets store sensitive data: passwords, tokens, certificates. Data values are base64-encoded (not encrypted) in the manifest — this is encoding, not security. Built-in types: Opaque (generic key/value), kubernetes.io/tls (TLS cert+key pair), kubernetes.io/dockerconfigjson (registry credentials), kubernetes.io/service-account-token (SA tokens). Secrets are namespaced and access-controlled via RBAC. Enable encryption at rest (EncryptionConfiguration) to encrypt Secrets in etcd. Without it, etcd contains plaintext Secrets.',
            code: `apiVersion: v1
kind: Secret
metadata:
  name: db-credentials
type: Opaque
data:
  # Values must be base64 encoded
  username: YWRtaW4=        # echo -n "admin" | base64
  password: c3VwZXJzZWNyZXQ= # echo -n "supersecret" | base64

# Or use stringData (auto-encoded, write-only)
stringData:
  api-key: "my-plaintext-key"`,
            warning: 'Base64 is not encryption. Anyone with kubectl get secret and RBAC access can decode values. Always use encryption at rest and strict RBAC for Secrets.',
          },
          {
            heading: 'Using Secrets in Pods',
            content:
              'Secrets are consumed the same way as ConfigMaps. envFrom or env.valueFrom.secretKeyRef inject values as environment variables. volumeMount with a secret volume mounts each key as a file with permissions 0644 by default. For TLS, mount the kubernetes.io/tls Secret as a volume and point your web server at the cert/key files. Service accounts automatically mount their token Secret at /var/run/secrets/kubernetes.io/serviceaccount — containers use this token to call the Kubernetes API.',
            code: `spec:
  containers:
  - name: app
    image: myapp:1.0
    env:
    - name: DB_PASSWORD
      valueFrom:
        secretKeyRef:
          name: db-credentials
          key: password
    volumeMounts:
    - name: tls
      mountPath: /etc/tls
      readOnly: true
  volumes:
  - name: tls
    secret:
      secretName: my-tls-cert`,
            tip: 'Mount Secrets as volumes (readOnly: true) rather than env vars where possible — env vars are visible in process listings and crash dumps.',
          },
          {
            heading: 'External Secret Management',
            content:
              'Storing Secret manifests in git (even encrypted) is risky. The preferred pattern is to keep secrets in a dedicated vault (HashiCorp Vault, AWS Secrets Manager, GCP Secret Manager) and sync them into Kubernetes using an operator. External Secrets Operator (ESO) watches ExternalSecret CRDs and creates/updates Kubernetes Secrets from external providers automatically. Sealed Secrets (Bitnami) encrypts Secrets with a cluster-specific key so the SealedSecret CRD can be safely committed to git, and the controller decrypts it into a real Secret.',
            code: `# ExternalSecret (ESO) example
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: db-password
spec:
  refreshInterval: 1h
  secretStoreRef:
    name: aws-secretsmanager
    kind: ClusterSecretStore
  target:
    name: db-credentials
  data:
  - secretKey: password
    remoteRef:
      key: prod/db/password`,
            note: 'ESO supports 20+ providers including AWS, GCP, Azure, HashiCorp Vault, and 1Password — it is the most flexible option for multi-cloud.',
          },
        ],
      },
      {
        id: 'k8s-daemonsets',
        title: 'DaemonSets',
        difficulty: 'intermediate',
        tags: ['daemonset', 'node-agent', 'logging', 'monitoring', 'per-node'],
        sections: [
          {
            heading: 'What DaemonSets Do',
            content:
              'A DaemonSet ensures exactly one Pod runs on every node (or a subset via nodeSelector/affinity). When nodes join the cluster, the DaemonSet controller automatically schedules a Pod on them; when nodes are removed, Pods are garbage-collected. This makes DaemonSets ideal for node-level infrastructure: log shippers (Fluentd, Fluent Bit), monitoring agents (Prometheus node-exporter, Datadog agent), network plugins (Calico, Cilium), storage agents (Ceph), and intrusion detection systems. Unlike Deployments, DaemonSets do not specify replicas — the count equals the number of target nodes.',
            code: `apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: log-shipper
  namespace: monitoring
spec:
  selector:
    matchLabels:
      app: log-shipper
  template:
    metadata:
      labels:
        app: log-shipper
    spec:
      containers:
      - name: fluent-bit
        image: fluent/fluent-bit:2.1
        volumeMounts:
        - name: varlog
          mountPath: /var/log
      volumes:
      - name: varlog
        hostPath:
          path: /var/log`,
            tip: 'DaemonSet Pods often need hostPath volumes (node filesystem) or hostNetwork: true (node network) to do their job — review security implications carefully.',
          },
          {
            heading: 'Node Selection',
            content:
              'By default, a DaemonSet runs on all nodes. Use nodeSelector to restrict it to nodes with specific labels (e.g., only GPU nodes for a GPU monitoring agent). Node affinity provides richer constraints. Tolerations allow DaemonSet Pods to schedule on tainted nodes — system DaemonSets (like kube-proxy) tolerate node.kubernetes.io/not-ready and node.kubernetes.io/disk-pressure to run even on degraded nodes. kube-system DaemonSets that are critical for node function should tolerate all taints.',
            code: `spec:
  template:
    spec:
      nodeSelector:
        kubernetes.io/os: linux
        node-role: worker
      tolerations:
      - key: node-role.kubernetes.io/control-plane
        operator: Exists
        effect: NoSchedule
      - key: node.kubernetes.io/not-ready
        operator: Exists
        effect: NoExecute`,
            note: 'Control-plane nodes are tainted with node-role.kubernetes.io/control-plane:NoSchedule by default. Add a toleration to run DaemonSet Pods there too.',
          },
          {
            heading: 'Update Strategy',
            content:
              'DaemonSets support two update strategies. RollingUpdate (default) updates Pods one at a time as nodes become available — you can control the pace with maxUnavailable (default 1). OnDelete requires manual deletion of old Pods — only then will the controller create updated ones. Rolling updates are safer but slower for large clusters. For cluster-critical DaemonSets (CNI, kube-proxy), use OnDelete with a maintenance window so you can control exactly when each node updates.',
            code: `spec:
  updateStrategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1   # Update 1 node at a time

# Force update on specific node (OnDelete strategy)
kubectl delete pod -l app=log-shipper \\
  --field-selector spec.nodeName=node1

# Check DaemonSet rollout
kubectl rollout status daemonset/log-shipper`,
            analogy: 'A DaemonSet is like a security guard assignment: every building (node) must have exactly one guard (Pod) on duty at all times.',
          },
        ],
      },
      {
        id: 'k8s-statefulsets',
        title: 'StatefulSets',
        difficulty: 'intermediate',
        tags: ['statefulset', 'stable-identity', 'ordered', 'persistent-storage', 'databases'],
        sections: [
          {
            heading: 'StatefulSet Guarantees',
            content:
              'StatefulSets manage stateful applications that need stable network identities and persistent storage. Unlike Deployments, each Pod gets a unique, predictable name (web-0, web-1, web-2) and a stable DNS hostname (web-0.headless-svc.namespace.svc.cluster.local). Pods are created in order (0, 1, 2) and terminated in reverse order. Each Pod can have its own PersistentVolumeClaim via volumeClaimTemplates — storage is not shared between replicas. These guarantees make StatefulSets suitable for databases (MySQL, PostgreSQL, Cassandra), message brokers (Kafka, RabbitMQ), and distributed caches.',
            code: `apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: mysql
spec:
  serviceName: mysql-headless
  replicas: 3
  selector:
    matchLabels:
      app: mysql
  template:
    metadata:
      labels:
        app: mysql
    spec:
      containers:
      - name: mysql
        image: mysql:8.0
  volumeClaimTemplates:
  - metadata:
      name: data
    spec:
      accessModes: [ReadWriteOnce]
      resources:
        requests:
          storage: 20Gi`,
            tip: 'StatefulSets require a headless Service (clusterIP: None) to create stable DNS entries for each Pod — create it before the StatefulSet.',
          },
          {
            heading: 'Ordered Operations',
            content:
              'By default, StatefulSet Pods start in order: Pod 0 must be Running and Ready before Pod 1 starts. Deletion reverses the order. This ensures leader election and cluster bootstrap happen correctly for distributed systems. The podManagementPolicy: Parallel setting removes ordering constraints — all Pods start and stop simultaneously, useful when your application does not need sequential initialisation. Each Pod\'s PVC persists across restarts and rescheduling — the same Pod name always reattaches to the same PVC, preserving data identity.',
            code: `spec:
  podManagementPolicy: OrderedReady  # default
  # podManagementPolicy: Parallel    # simultaneous

  updateStrategy:
    type: RollingUpdate
    rollingUpdate:
      partition: 1   # Only update pods >= 1 (canary)

# Scale down removes highest-numbered pods first
kubectl scale statefulset/mysql --replicas=2
# web-2 is deleted first, then web-1 if scaled to 1`,
            note: 'Deleting a StatefulSet does not delete its PVCs automatically — this is intentional to prevent data loss. Delete PVCs manually after confirming data is backed up.',
          },
          {
            heading: 'Headless Service & DNS',
            content:
              'StatefulSets use a headless Service (spec.serviceName) for stable network identity. CoreDNS creates an A record for each Pod: <pod>.<service>.<namespace>.svc.cluster.local. This lets replicas discover each other by name — MySQL replica 2 connects to mysql-0.mysql-headless for primary replication. The headless Service also creates an SRV record listing all Pod IPs, which clients use for cluster membership discovery. Without the headless Service, Pod DNS names do not exist and StatefulSet inter-Pod communication breaks.',
            code: `# Headless Service (required)
apiVersion: v1
kind: Service
metadata:
  name: mysql-headless
spec:
  clusterIP: None    # Headless
  selector:
    app: mysql
  ports:
  - port: 3306

# Pod DNS names created:
# mysql-0.mysql-headless.default.svc.cluster.local
# mysql-1.mysql-headless.default.svc.cluster.local
# mysql-2.mysql-headless.default.svc.cluster.local`,
            analogy: 'A StatefulSet is like a sports team roster: each player (Pod) has a permanent jersey number (name) and locker (PVC) that stays with them even if they are benched and return.',
          },
        ],
        quiz: [
          {
            question: 'What naming pattern does StatefulSet use for its Pods?',
            options: [
              'Random UUID suffix like Deployments',
              'Predictable <statefulset-name>-<ordinal> e.g. web-0, web-1',
              'Node-based naming',
              'Timestamp-based naming',
            ],
            correctIndex: 1,
            explanation: 'StatefulSet Pods are named <statefulset-name>-<ordinal-index>, giving each Pod a stable, predictable name across restarts.',
          },
          {
            question: 'What happens to a StatefulSet PVC when the Pod is deleted?',
            options: [
              'It is deleted automatically with the Pod',
              'It is retained and reattached when the Pod is recreated',
              'It is archived to object storage',
              'It is claimed by the next Pod in sequence',
            ],
            correctIndex: 1,
            explanation: 'StatefulSet PVCs are intentionally retained when Pods are deleted. The same Pod name reattaches to the same PVC on restart, preserving data.',
          },
          {
            question: 'Why does a StatefulSet require a headless Service?',
            options: [
              'For external load balancing',
              'To provide stable DNS hostnames for individual Pods',
              'To enable NodePort access',
              'For pod-to-pod encryption',
            ],
            correctIndex: 1,
            explanation: 'The headless Service causes CoreDNS to create individual A records for each Pod, enabling stable DNS-based peer discovery within the StatefulSet.',
          },
        ],
      },
      {
        id: 'k8s-jobs',
        title: 'Jobs',
        difficulty: 'intermediate',
        tags: ['jobs', 'batch', 'parallelism', 'completions', 'one-off'],
        sections: [
          {
            heading: 'Job Basics',
            content:
              'A Job creates Pods to run a task to completion. Unlike Deployments, Jobs are not long-lived — they succeed when the specified number of completions is reached and do not restart successful Pods. If a Pod fails, the Job creates a replacement (up to backoffLimit retries). Jobs are ideal for batch processing, database migrations, report generation, and any finite task. The Job tracks completion state and Pods are retained after completion for log inspection (until the Job is deleted). Use ttlSecondsAfterFinished to auto-clean completed Jobs.',
            code: `apiVersion: batch/v1
kind: Job
metadata:
  name: db-migrate
spec:
  completions: 1
  backoffLimit: 3
  ttlSecondsAfterFinished: 3600
  template:
    spec:
      restartPolicy: OnFailure
      containers:
      - name: migrate
        image: myapp:1.0
        command: ["python", "manage.py", "migrate"]
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: url`,
            tip: 'Jobs require restartPolicy: OnFailure or Never — the default Always is not allowed, as Jobs manage their own retry logic.',
          },
          {
            heading: 'Parallel Jobs',
            content:
              'Jobs support two patterns for parallel execution. Fixed completion count: set completions to the total work items and parallelism to how many run concurrently — each Pod processes one item. Work queue: set parallelism to the number of workers and omit completions; Pods pull from a queue and the Job succeeds when all workers report completion. The activeDeadlineSeconds field terminates the Job (and all its Pods) if it runs longer than the deadline — prevents runaway batch jobs from consuming resources indefinitely.',
            code: `spec:
  completions: 10        # Process 10 items total
  parallelism: 3         # 3 Pods run concurrently
  backoffLimit: 6
  activeDeadlineSeconds: 600  # Kill if > 10 min

# Check Job status
kubectl get job db-migrate
kubectl describe job db-migrate

# View Job Pods
kubectl get pods -l job-name=db-migrate

# Get logs from completed Pod
kubectl logs job/db-migrate`,
            note: 'When completions is set and parallelism > completions, Kubernetes caps parallelism at completions.',
          },
          {
            heading: 'Indexed Jobs',
            content:
              'Indexed Jobs (completionMode: Indexed) give each Pod a unique completion index (0 to completions-1) via the JOB_COMPLETION_INDEX environment variable. This enables static work partitioning — Pod 0 processes shard 0, Pod 1 processes shard 1, etc., without a work queue. Indexed Jobs are useful for embarrassingly parallel tasks like machine learning training shards or data processing segments. Each indexed Pod creates a stable hostname (<job>-<index>.<svc>) allowing inter-worker communication for collective operations.',
            code: `spec:
  completions: 5
  parallelism: 5
  completionMode: Indexed  # Each pod gets unique index
  template:
    spec:
      containers:
      - name: worker
        image: processor:1.0
        env:
        - name: JOB_INDEX
          valueFrom:
            fieldRef:
              fieldPath: metadata.annotations['batch.kubernetes.io/job-completion-index']`,
            analogy: 'A Job is like a project milestone: it has a defined scope of work, a deadline, and is marked "done" when all tasks complete — unlike a service that runs forever.',
          },
        ],
      },
      {
        id: 'k8s-cronjobs',
        title: 'CronJobs',
        difficulty: 'intermediate',
        tags: ['cronjobs', 'schedule', 'cron', 'concurrency', 'batch'],
        sections: [
          {
            heading: 'CronJob Basics',
            content:
              'A CronJob creates Jobs on a repeating schedule using standard cron syntax. The schedule field uses UTC timezone by default (configurable with timeZone in Kubernetes 1.27+). Each scheduled run creates a new Job, which creates Pods. CronJobs are perfect for periodic tasks: database backups, report generation, cache warming, cleanup jobs, and health checks. The CronJob controller checks every 10 seconds whether a new Job should be created. If a scheduled time is missed by more than startingDeadlineSeconds, the Job is skipped.',
            code: `apiVersion: batch/v1
kind: CronJob
metadata:
  name: daily-backup
spec:
  schedule: "0 2 * * *"   # 2 AM UTC daily
  timeZone: "America/New_York"  # k8s 1.27+
  jobTemplate:
    spec:
      template:
        spec:
          restartPolicy: OnFailure
          containers:
          - name: backup
            image: backup-tool:1.0
            command: ["/backup.sh"]`,
            tip: 'Use https://crontab.guru to verify cron expressions before deploying. A wrong schedule can run jobs too frequently or never at all.',
          },
          {
            heading: 'Concurrency Policy',
            content:
              'CronJobs handle overlapping runs via concurrencyPolicy. Allow (default) permits multiple Job instances concurrently — if a Job takes longer than its interval, multiple run simultaneously. Forbid skips a new run if the previous Job is still running. Replace cancels the current running Job and starts a fresh one. Set successfulJobsHistoryLimit and failedJobsHistoryLimit to control how many completed Jobs are retained for log review. The defaults keep 3 successful and 1 failed Job.',
            code: `spec:
  schedule: "*/5 * * * *"    # Every 5 minutes
  concurrencyPolicy: Forbid   # Skip if previous still running
  successfulJobsHistoryLimit: 3
  failedJobsHistoryLimit: 3
  startingDeadlineSeconds: 120  # Miss window = skip

# Manually trigger a CronJob run
kubectl create job --from=cronjob/daily-backup manual-run-$(date +%s)

# List Jobs created by CronJob
kubectl get jobs -l app=daily-backup`,
            note: 'CronJob schedules are approximate — the controller has up to 10 seconds latency. Do not use CronJobs for sub-minute scheduling requirements.',
          },
          {
            heading: 'Idempotent Job Design',
            content:
              'CronJob Pods can run multiple times due to retries, missed runs being caught up, or concurrency. Design your job code to be idempotent: running it twice should produce the same result as running it once. Use database transactions, unique constraints, or checksum validation to detect and skip already-processed work. For data pipelines, track the last processed offset in an external store. Resource cleanup Jobs should use --dry-run first and log what they would delete. Always test Jobs manually with kubectl create job --from=cronjob before relying on the schedule.',
            code: `# Idempotent pattern example
spec:
  containers:
  - name: cleanup
    image: cleanup:1.0
    command:
    - /bin/sh
    - -c
    - |
      # Idempotent: only delete files older than 7 days
      find /data -mtime +7 -type f -delete
      echo "Cleanup complete: $(date)"

# Monitor CronJob history
kubectl get cronjobs
kubectl describe cronjob daily-backup`,
            warning: 'If startingDeadlineSeconds is less than 10x the schedule interval, the CronJob may enter a state where it is always considered to have missed its window and never runs.',
          },
        ],
        quiz: [
          {
            question: 'What does concurrencyPolicy: Forbid do on a CronJob?',
            options: [
              'Prevents the CronJob from running at all',
              'Runs all instances concurrently',
              'Skips a new run if the previous Job is still running',
              'Cancels the running Job and starts a new one',
            ],
            correctIndex: 2,
            explanation: 'Forbid skips the scheduled run if the previous Job has not completed, preventing overlapping executions.',
          },
          {
            question: 'What timezone does a CronJob schedule use by default?',
            options: ['Server local time', 'UTC', 'The cluster timezone', 'The Pod\'s timezone'],
            correctIndex: 1,
            explanation: 'CronJob schedules use UTC by default. The timeZone field (Kubernetes 1.27+) allows specifying a different timezone.',
          },
          {
            question: 'How do you manually trigger a CronJob run immediately?',
            options: [
              'kubectl run cronjob/daily-backup',
              'kubectl trigger cronjob/daily-backup',
              'kubectl create job --from=cronjob/daily-backup <name>',
              'kubectl apply --now=true cronjob/daily-backup',
            ],
            correctIndex: 2,
            explanation: 'kubectl create job --from=cronjob/<name> creates a Job immediately using the CronJob\'s jobTemplate, without waiting for the schedule.',
          },
        ],
      },
    ],
  },
];
