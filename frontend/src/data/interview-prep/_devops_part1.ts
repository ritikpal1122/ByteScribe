import type { InterviewTopic } from './types';

export const DEVOPS_PART1_TOPICS: InterviewTopic[] = [
  // ─────────────────────────────────────────────
  // 1. CI/CD
  // ─────────────────────────────────────────────
  {
    id: 'do-cicd',
    label: 'CI/CD',
    icon: 'GitBranch',
    description:
      'Continuous integration, delivery, deployment strategies, and pipeline tooling.',
    questions: [
      {
        id: 'do-cicd-what-is-ci',
        title: 'What is Continuous Integration?',
        difficulty: 'beginner',
        answer:
          'Continuous Integration is the practice of merging all developer working copies into a shared mainline multiple times per day, with each merge validated by an automated build and test run. It catches integration bugs early by ensuring that code from different developers is combined and tested frequently rather than in painful big-bang merges.',
        tags: ['ci', 'automation', 'testing'],
        keyTakeaway:
          'CI merges and tests code frequently to detect integration issues early.',
      },
      {
        id: 'do-cicd-cd-vs-cd',
        title: 'What is the difference between Continuous Delivery and Continuous Deployment?',
        difficulty: 'beginner',
        answer:
          'Continuous Delivery ensures every commit that passes the pipeline is releasable to production but requires a manual approval step before the actual deploy. Continuous Deployment removes that gate entirely, automatically pushing every passing change all the way to production without human intervention.',
        tags: ['cd', 'delivery', 'deployment'],
        keyTakeaway:
          'Delivery needs a manual approval gate; deployment is fully automatic to production.',
      },
      {
        id: 'do-cicd-jenkins',
        title: 'How does Jenkins work as a CI/CD tool?',
        difficulty: 'intermediate',
        answer:
          'Jenkins is a self-hosted, plugin-driven automation server that defines pipelines in a Jenkinsfile using Groovy DSL. It supports declarative and scripted pipeline syntax, with over 1800 plugins for integrations ranging from Docker to Slack. The trade-off is full infrastructure control at the cost of server maintenance and plugin management.',
        tags: ['jenkins', 'groovy', 'self-hosted'],
        keyTakeaway:
          'Jenkins offers maximum extensibility through plugins but requires teams to own and maintain the build infrastructure.',
      },
      {
        id: 'do-cicd-github-actions',
        title: 'How do GitHub Actions workflows function?',
        difficulty: 'beginner',
        answer:
          'GitHub Actions uses YAML workflow files in .github/workflows/ that trigger on events like push, pull_request, or schedule. Each workflow defines jobs that run on hosted or self-hosted runners, with steps that either execute shell commands or invoke reusable marketplace actions. It is tightly integrated with GitHub, requiring zero infrastructure setup.',
        tags: ['github-actions', 'yaml', 'managed'],
        keyTakeaway:
          'GitHub Actions is an event-driven, YAML-based CI/CD service built directly into GitHub repositories.',
      },
      {
        id: 'do-cicd-pipeline-stages',
        title: 'What are the typical stages in a CI/CD pipeline?',
        difficulty: 'beginner',
        answer:
          'A standard pipeline flows through source checkout, dependency installation, linting and static analysis, unit tests, build/compile, integration tests, artifact publishing, and deployment to staging then production. Each stage acts as a quality gate where failures halt the pipeline and prevent bad code from progressing further.',
        tags: ['pipeline', 'stages', 'quality-gates'],
        keyTakeaway:
          'Pipeline stages form sequential quality gates from source to production, failing fast on any issue.',
      },
      {
        id: 'do-cicd-artifacts',
        title: 'What are CI/CD artifacts and how should they be managed?',
        difficulty: 'intermediate',
        answer:
          'Artifacts are the versioned outputs of a build such as Docker images, binaries, or bundles, stored in registries like ECR, Artifactory, or GitHub Packages. They should be tagged with immutable identifiers like the Git SHA, promoted across environments rather than rebuilt, and scanned for vulnerabilities before deployment. Retention policies prevent unbounded storage growth.',
        tags: ['artifacts', 'registry', 'versioning'],
        keyTakeaway:
          'Build once, tag immutably, scan, and promote the same artifact through every environment.',
      },
      {
        id: 'do-cicd-env-promotion',
        title: 'How does environment promotion work in CI/CD?',
        difficulty: 'intermediate',
        answer:
          'Environment promotion moves a single tested artifact through progressively more production-like environments such as dev, staging, and production, rather than rebuilding for each. Promotion gates can include automated test suites, manual approval steps, or metric-based checks. This ensures the exact artifact validated in staging is what runs in production, eliminating non-deterministic build differences.',
        tags: ['promotion', 'environments', 'pipeline'],
        keyTakeaway:
          'Promote the same artifact through environments to guarantee what you tested is what you deploy.',
      },
      {
        id: 'do-cicd-rollback',
        title: 'What rollback strategies exist in CI/CD?',
        difficulty: 'intermediate',
        answer:
          'Common rollback strategies include redeploying a previous known-good artifact from the registry, reverting the Git commit and triggering a new build, or switching load-balancer targets at the infrastructure level. Database rollbacks are the hardest part and benefit from forward-compatible migrations and the expand-contract pattern. Feature flags offer a logical rollback that disables new behavior without redeployment.',
        tags: ['rollback', 'deployment', 'feature-flags'],
        keyTakeaway:
          'Effective rollback relies on immutable artifacts, forward-compatible migrations, and decoupling deployment from release.',
      },
      {
        id: 'do-cicd-canary',
        title: 'How do canary releases work?',
        difficulty: 'advanced',
        answer:
          'A canary release deploys the new version alongside the stable one and routes a small percentage of traffic, such as five percent, to it while monitoring error rates, latency, and business metrics. If thresholds pass, traffic is progressively shifted until the canary handles all traffic; if anomalies appear, traffic reverts to the stable version. Tools like Argo Rollouts, Flagger, and AWS CodeDeploy automate this weighted traffic shifting.',
        tags: ['canary', 'progressive-delivery', 'traffic-splitting'],
        keyTakeaway:
          'Canary releases minimize blast radius by exposing a new version to a small traffic slice before full rollout.',
      },
      {
        id: 'do-cicd-blue-green',
        title: 'What is a blue-green deployment?',
        difficulty: 'intermediate',
        answer:
          'Blue-green deployment maintains two identical production environments where blue is live and green runs the new version. After validating green with smoke tests, traffic is switched at the load-balancer or DNS level, and if issues arise, switching back to blue provides near-instant rollback. The trade-off is doubled infrastructure cost during the transition window, though ephemeral compute like Fargate mitigates this.',
        tags: ['blue-green', 'zero-downtime', 'deployment'],
        keyTakeaway:
          'Blue-green trades infrastructure cost for deployment simplicity and near-instant rollback via traffic switching.',
      },
      {
        id: 'do-cicd-feature-flags',
        title: 'How do feature flags support CI/CD?',
        difficulty: 'intermediate',
        answer:
          'Feature flags decouple deployment from release by wrapping new functionality in conditional toggles that can be enabled or disabled at runtime without redeployment. This allows trunk-based development where incomplete features are merged behind flags, enables targeted rollouts to specific user segments, and provides an instant kill switch if a feature causes issues. Tools like LaunchDarkly, Unleash, and Flagsmith manage flags at scale.',
        tags: ['feature-flags', 'release', 'trunk-based'],
        keyTakeaway:
          'Feature flags separate deployment from release, enabling safe trunk-based development and instant rollback without redeployment.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 2. Containers
  // ─────────────────────────────────────────────
  {
    id: 'do-containers',
    label: 'Containers',
    icon: 'Box',
    description:
      'Docker fundamentals, image building, networking, volumes, and container security.',
    questions: [
      {
        id: 'do-containers-basics',
        title: 'What is a container and how does it differ from a VM?',
        difficulty: 'beginner',
        answer:
          'A container is an isolated process on the host kernel that uses Linux namespaces for resource isolation and cgroups for resource limitation, unlike a VM which runs a full guest operating system on a hypervisor. Containers share the host kernel, making them start in milliseconds and use far less memory than VMs. This makes them ideal for microservices, but means a host kernel vulnerability can affect all containers.',
        tags: ['containers', 'docker', 'virtualization'],
        keyTakeaway:
          'Containers isolate processes using namespaces and cgroups on a shared kernel, unlike VMs which run separate OS instances.',
      },
      {
        id: 'do-containers-dockerfile',
        title: 'What are Dockerfile best practices?',
        difficulty: 'intermediate',
        answer:
          'Use minimal base images like Alpine or distroless, order instructions from least to most frequently changing for optimal layer caching, combine related RUN commands with double ampersand to reduce layers, and always include a .dockerignore file. Run processes as a non-root user with the USER directive, and avoid installing unnecessary packages or leaving package manager caches in the final image.',
        tags: ['dockerfile', 'best-practices', 'optimization'],
        keyTakeaway:
          'Good Dockerfiles use minimal bases, optimize layer caching, clean up caches, and run as non-root.',
      },
      {
        id: 'do-containers-multi-stage',
        title: 'What are multi-stage Docker builds?',
        difficulty: 'intermediate',
        answer:
          'Multi-stage builds use multiple FROM statements in a single Dockerfile, where you compile or build in a full SDK image and then copy only the final binary or bundle into a minimal runtime image using COPY --from. This produces production images that are ten to fifty times smaller than the build environment, reducing pull time, attack surface, and storage cost. Name stages with AS for clarity and targetability.',
        tags: ['multi-stage', 'docker', 'image-size'],
        keyTakeaway:
          'Multi-stage builds separate build tooling from the runtime image, producing small and secure production images.',
      },
      {
        id: 'do-containers-layers',
        title: 'How do Docker image layers work?',
        difficulty: 'intermediate',
        answer:
          'Each instruction in a Dockerfile creates a read-only layer that is stacked using a union filesystem like OverlayFS, with a thin writable layer added at runtime for the container. Layers are cached and shared between images, so pulling a new image version only downloads changed layers. Ordering instructions from stable to volatile maximizes cache hits, and combining commands in a single RUN prevents intermediate bloat.',
        tags: ['layers', 'overlayfs', 'caching'],
        keyTakeaway:
          'Docker layers are stacked, cached, and shared, so instruction ordering directly impacts build speed and image size.',
      },
      {
        id: 'do-containers-compose',
        title: 'What is Docker Compose and when should you use it?',
        difficulty: 'beginner',
        answer:
          'Docker Compose defines multi-container applications in a single YAML file where you declare services, networks, and volumes, then bring everything up with docker compose up. It is ideal for local development and integration testing since services discover each other by name via an isolated bridge network. For production multi-host orchestration, Kubernetes or Docker Swarm replace Compose.',
        tags: ['docker-compose', 'local-dev', 'multi-container'],
        keyTakeaway:
          'Docker Compose declaratively manages multi-container stacks for local development and testing in a single YAML file.',
      },
      {
        id: 'do-containers-networking',
        title: 'How does Docker container networking work?',
        difficulty: 'intermediate',
        answer:
          'Docker provides several network drivers: bridge creates a virtual ethernet bridge for isolated container communication, host removes network isolation entirely, overlay spans multiple hosts, and macvlan assigns real MAC addresses. Containers on user-defined bridge networks can resolve each other by name via Docker embedded DNS, while port mapping with the -p flag creates iptables rules forwarding host traffic. Always use user-defined bridges over the default bridge which lacks DNS discovery.',
        tags: ['networking', 'bridge', 'dns', 'docker'],
        keyTakeaway:
          'User-defined bridge networks enable DNS-based service discovery between containers on the same host.',
      },
      {
        id: 'do-containers-volumes',
        title: 'How do Docker volumes work?',
        difficulty: 'beginner',
        answer:
          'Docker volumes are managed storage that persists data beyond the container lifecycle, stored in /var/lib/docker/volumes/ and distinct from bind mounts that map specific host paths. Named volumes survive container removal, can be shared between containers, and support remote backends via volume drivers. Use named volumes for production data persistence and bind mounts only for development hot-reloading.',
        tags: ['volumes', 'persistence', 'storage'],
        keyTakeaway:
          'Volumes decouple persistent data from the container lifecycle, surviving container removal and supporting shared access.',
      },
      {
        id: 'do-containers-registries',
        title: 'What is a container registry and how is it used?',
        difficulty: 'beginner',
        answer:
          'A container registry is a storage and distribution service for container images, with options ranging from public registries like Docker Hub to managed private registries like ECR, GCR, and ACR. Images are pushed after building and pulled during deployment, identified by repository name and tag or digest. Private registries provide access control, vulnerability scanning, and image signing to secure the software supply chain.',
        tags: ['registry', 'ecr', 'docker-hub'],
        keyTakeaway:
          'Container registries store and distribute images with access control, scanning, and signing for supply chain security.',
      },
      {
        id: 'do-containers-scanning',
        title: 'Why is container image scanning important?',
        difficulty: 'intermediate',
        answer:
          'Image scanning tools like Trivy, Grype, and Snyk analyze each layer of a container image for known CVEs in OS packages and application dependencies before the image reaches production. Scanning should be integrated into CI pipelines as a quality gate that blocks promotion of images with critical or high-severity vulnerabilities. Continuous scanning of already-deployed images catches newly disclosed CVEs in running workloads.',
        tags: ['scanning', 'security', 'trivy', 'cve'],
        keyTakeaway:
          'Scan images in CI to block vulnerable artifacts and continuously scan running images for newly disclosed CVEs.',
      },
      {
        id: 'do-containers-rootless',
        title: 'What are rootless containers?',
        difficulty: 'advanced',
        answer:
          'Rootless containers run the entire container runtime as a non-root user on the host, not just the process inside the container, using the USER namespace to map container UID 0 to an unprivileged host UID. If an attacker escapes the container, they land as an unprivileged user on the host, drastically reducing blast radius. Podman is rootless by default while Docker supports rootless mode since version 20.10.',
        tags: ['rootless', 'security', 'podman'],
        keyTakeaway:
          'Rootless mode runs the entire runtime unprivileged, so container escapes land as a non-root host user.',
      },
      {
        id: 'do-containers-buildkit',
        title: 'What is BuildKit and what advantages does it offer?',
        difficulty: 'advanced',
        answer:
          'BuildKit is the modern build engine for Docker that replaces the legacy builder, offering parallel build stage execution, improved caching with cache mounts for package managers, secret mounts that never persist in layers, and SSH forwarding for private repository access. It supports building images for multiple architectures with docker buildx and outputs to various formats beyond just Docker images. Enable it with DOCKER_BUILDKIT=1 or use docker buildx build.',
        tags: ['buildkit', 'docker', 'buildx', 'performance'],
        keyTakeaway:
          'BuildKit improves build speed through parallelism and advanced caching, and adds secret mounts and multi-arch support.',
      },
      {
        id: 'do-containers-containerd',
        title: 'What is containerd and how does it relate to Docker?',
        difficulty: 'advanced',
        answer:
          'containerd is the industry-standard container runtime that manages the complete container lifecycle including image pull, storage, execution via runc, and networking. Docker uses containerd under the hood, but Kubernetes switched from dockershim to containerd directly via the CRI interface, meaning Docker is no longer required on Kubernetes nodes. containerd is lighter and more focused than the full Docker daemon, handling only runtime concerns without build or compose features.',
        tags: ['containerd', 'runtime', 'cri', 'kubernetes'],
        keyTakeaway:
          'containerd is the core runtime behind Docker and Kubernetes, managing container lifecycle without the full Docker daemon overhead.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 3. Kubernetes
  // ─────────────────────────────────────────────
  {
    id: 'do-k8s',
    label: 'Kubernetes',
    icon: 'Boxes',
    description:
      'Container orchestration with Kubernetes covering core resources, scaling, security, and operational patterns.',
    questions: [
      {
        id: 'do-k8s-pods-deployments-services',
        title: 'Explain the relationship between Pods, Deployments, and Services.',
        difficulty: 'beginner',
        answer:
          'A Pod is the smallest deployable unit containing one or more tightly coupled containers, a Deployment manages Pod replicas and rolling updates via ReplicaSets, and a Service provides a stable network endpoint routing traffic to Pods matched by label selectors. Pods are ephemeral and get new IPs on recreation, so Services provide the stable DNS name and IP that other workloads use. These three resources form the backbone of most Kubernetes applications.',
        tags: ['pods', 'deployments', 'services'],
        keyTakeaway:
          'Deployments manage Pod lifecycle, Services provide stable networking, and together they form the foundation of Kubernetes apps.',
      },
      {
        id: 'do-k8s-configmaps-secrets',
        title: 'How do ConfigMaps and Secrets work?',
        difficulty: 'beginner',
        answer:
          'ConfigMaps store non-sensitive configuration as key-value pairs injected into Pods as environment variables or mounted files, while Secrets are structurally identical but intended for sensitive data with base64 encoding that is not encryption. Volume-mounted ConfigMaps and Secrets update automatically, but environment variables require a Pod restart to reflect changes. For production, enable etcd encryption at rest and use External Secrets Operator to pull from a proper vault.',
        tags: ['configmaps', 'secrets', 'configuration'],
        keyTakeaway:
          'ConfigMaps and Secrets decouple configuration from images; Secrets need etcd encryption and RBAC to be truly secure.',
      },
      {
        id: 'do-k8s-ingress',
        title: 'What is a Kubernetes Ingress?',
        difficulty: 'intermediate',
        answer:
          'An Ingress resource defines rules for routing external HTTP/HTTPS traffic to internal Services based on hostnames and URL paths, but requires an Ingress controller like NGINX or Traefik to actually implement the routing. The controller watches for Ingress resources, generates reverse-proxy configuration, and handles TLS termination and load balancing. The newer Gateway API is graduating as a more expressive, role-oriented successor to Ingress.',
        tags: ['ingress', 'routing', 'tls', 'gateway-api'],
        keyTakeaway:
          'Ingress resources define HTTP routing rules that an Ingress controller implements as a reverse proxy.',
      },
      {
        id: 'do-k8s-namespaces',
        title: 'What are Kubernetes namespaces and why use them?',
        difficulty: 'beginner',
        answer:
          'Namespaces are virtual clusters within a physical Kubernetes cluster that provide scope for resource names, enable resource quota enforcement, and allow RBAC policies to be applied per team or environment. They help organize workloads by team, environment, or application, preventing naming collisions and enabling multi-tenancy. Common patterns include per-environment namespaces like dev, staging, and production, or per-team namespaces.',
        tags: ['namespaces', 'multi-tenancy', 'organization'],
        keyTakeaway:
          'Namespaces provide logical isolation, resource quotas, and scoped RBAC within a single cluster.',
      },
      {
        id: 'do-k8s-hpa',
        title: 'How does the Horizontal Pod Autoscaler work?',
        difficulty: 'intermediate',
        answer:
          'The HPA automatically adjusts Pod replica count based on observed metrics like CPU utilization, memory, or custom metrics such as queue depth, using the formula desiredReplicas equals ceil of currentReplicas times currentMetric divided by targetMetric. It requires the Metrics Server for CPU and memory metrics, and resource requests must be set on containers for percentage-based scaling to function. The behavior field in autoscaling/v2 controls scale-up and scale-down rates to prevent flapping.',
        tags: ['hpa', 'autoscaling', 'metrics'],
        keyTakeaway:
          'HPA dynamically adjusts replica count based on resource or custom metrics with configurable scaling behavior.',
      },
      {
        id: 'do-k8s-resource-limits',
        title: 'How do resource requests and limits work in Kubernetes?',
        difficulty: 'intermediate',
        answer:
          'Resource requests tell the scheduler how much CPU and memory a container needs for placement decisions, while limits set the maximum a container can consume before being throttled on CPU or OOM-killed on memory. Setting requests without limits allows bursting on underutilized nodes, while setting both equal guarantees QoS class of Guaranteed. Always set requests to enable proper scheduling and HPA functionality, and set memory limits to prevent runaway containers from starving neighbors.',
        tags: ['resources', 'limits', 'requests', 'qos'],
        keyTakeaway:
          'Requests guide scheduling and limits cap consumption; set both to prevent resource contention and enable autoscaling.',
      },
      {
        id: 'do-k8s-probes',
        title: 'What are liveness, readiness, and startup probes?',
        difficulty: 'intermediate',
        answer:
          'Liveness probes detect stuck or deadlocked containers and trigger restarts, readiness probes control whether a Pod receives traffic by adding or removing it from Service endpoints, and startup probes protect slow-starting applications by disabling other probes until initialization completes. Each supports HTTP GET, TCP socket, gRPC, or exec check mechanisms with tunable timing parameters. Liveness should only check internal process health and never depend on external services to avoid cascading restarts.',
        tags: ['probes', 'liveness', 'readiness', 'health-check'],
        keyTakeaway:
          'Liveness restarts broken containers, readiness controls traffic routing, and startup protects slow-starting apps.',
      },
      {
        id: 'do-k8s-statefulsets',
        title: 'When should you use a StatefulSet?',
        difficulty: 'advanced',
        answer:
          'StatefulSets are for workloads needing stable unique network identities with sequential Pod names like db-0 and db-1, persistent storage per replica via volumeClaimTemplates, and ordered graceful deployment and scaling. They require a headless Service for stable DNS entries and are ideal for databases like PostgreSQL, distributed systems like Kafka, and any workload where pod identity matters. Prefer Deployments for stateless workloads since they offer simpler rolling updates and faster scaling.',
        tags: ['statefulset', 'databases', 'persistent-storage'],
        keyTakeaway:
          'StatefulSets provide stable identities, ordered operations, and per-replica storage for stateful workloads.',
      },
      {
        id: 'do-k8s-daemonsets',
        title: 'What is a DaemonSet and when is it used?',
        difficulty: 'intermediate',
        answer:
          'A DaemonSet ensures that a copy of a specific Pod runs on every node in the cluster, or on a subset of nodes selected by node selectors or affinities. Common use cases include log collectors like Fluentd, monitoring agents like the Prometheus node exporter, network plugins like Calico, and storage daemons. When new nodes are added to the cluster, the DaemonSet automatically schedules the Pod on them.',
        tags: ['daemonset', 'node-level', 'monitoring', 'logging'],
        keyTakeaway:
          'DaemonSets run one Pod per node for cluster-wide infrastructure tasks like logging, monitoring, and networking.',
      },
      {
        id: 'do-k8s-rbac',
        title: 'How does RBAC work in Kubernetes?',
        difficulty: 'advanced',
        answer:
          'RBAC controls who can perform which actions on which resources through four resource types: Role and ClusterRole define permissions with API groups, resources, and verbs, while RoleBinding and ClusterRoleBinding assign those permissions to users, groups, or ServiceAccounts. Roles are namespace-scoped and ClusterRoles are cluster-wide, following the principle of least privilege. Always create dedicated ServiceAccounts per workload rather than using the default account which may accumulate excess permissions.',
        tags: ['rbac', 'security', 'authorization'],
        keyTakeaway:
          'RBAC uses Roles for permissions and Bindings for assignment, scoped to namespaces or cluster-wide.',
      },
      {
        id: 'do-k8s-helm',
        title: 'What is Helm and how do charts work?',
        difficulty: 'intermediate',
        answer:
          'Helm is the Kubernetes package manager that defines applications as charts containing Go-templated manifests, a values.yaml for defaults, and Chart.yaml for metadata. Users override defaults with custom values files or set flags, and Helm tracks versioned release history enabling rollback to any prior revision. Helm 3 removed the server-side Tiller component so all operations are client-side, improving security.',
        tags: ['helm', 'charts', 'package-manager'],
        keyTakeaway:
          'Helm charts package templated Kubernetes manifests with versioned releases, making deployment repeatable and rollbackable.',
      },
      {
        id: 'do-k8s-operators',
        title: 'What is the Kubernetes Operator pattern?',
        difficulty: 'advanced',
        answer:
          'An Operator extends Kubernetes by encoding domain-specific operational knowledge into a custom controller that watches Custom Resource Definitions and reconciles the actual state to the desired state. This automates complex lifecycle management tasks like database backup and restore, failover, scaling, and upgrades that would otherwise require manual intervention. Popular examples include the Prometheus Operator, CloudNativePG, and Strimzi for Kafka.',
        tags: ['operators', 'crd', 'automation', 'controllers'],
        keyTakeaway:
          'Operators encode human operational knowledge into controllers that automate complex application lifecycle management.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 4. Cloud Platforms
  // ─────────────────────────────────────────────
  {
    id: 'do-cloud',
    label: 'Cloud Platforms',
    icon: 'Cloud',
    description:
      'AWS, GCP, and Azure core services, networking, security, and cost optimization.',
    questions: [
      {
        id: 'do-cloud-overview',
        title: 'How do AWS, GCP, and Azure compare at a high level?',
        difficulty: 'beginner',
        answer:
          'AWS is the market leader with the broadest service catalog and largest community, GCP excels in data analytics, machine learning, and Kubernetes via GKE, and Azure integrates deeply with the Microsoft ecosystem including Active Directory and Office 365. All three offer equivalent core services for compute, storage, networking, and databases with pay-as-you-go pricing. The choice often depends on existing organizational investments, specific service strengths, and compliance requirements.',
        tags: ['aws', 'gcp', 'azure', 'comparison'],
        keyTakeaway:
          'AWS leads in breadth, GCP in data and Kubernetes, Azure in Microsoft integration; core services are largely equivalent.',
      },
      {
        id: 'do-cloud-vpc',
        title: 'What is a VPC and why is it important?',
        difficulty: 'intermediate',
        answer:
          'A Virtual Private Cloud is a logically isolated section of the cloud where you define your own IP address range, subnets, route tables, and network gateways, controlling exactly how traffic flows between resources and the internet. Public subnets have routes to an internet gateway for externally accessible resources, while private subnets use NAT gateways for outbound-only internet access. VPCs are the foundational networking primitive for security isolation, and resources in different VPCs cannot communicate unless explicitly peered or connected via transit gateway.',
        tags: ['vpc', 'networking', 'subnets', 'isolation'],
        keyTakeaway:
          'VPCs provide isolated network environments with fine-grained control over traffic flow and security boundaries.',
      },
      {
        id: 'do-cloud-iam',
        title: 'How does cloud IAM work?',
        difficulty: 'intermediate',
        answer:
          'Cloud IAM controls who can do what on which resources through policies that attach permissions to identities like users, groups, and roles, following the principle of least privilege. AWS uses JSON policies attached to IAM entities, GCP uses role bindings on resources, and Azure uses role assignments with scopes. Service accounts and instance profiles allow applications to assume roles with temporary credentials rather than using long-lived access keys.',
        tags: ['iam', 'security', 'permissions', 'roles'],
        keyTakeaway:
          'Cloud IAM enforces least-privilege access through policies binding permissions to identities with temporary credentials preferred.',
      },
      {
        id: 'do-cloud-compute',
        title: 'What are the main cloud compute options?',
        difficulty: 'beginner',
        answer:
          'Cloud compute spans from full control with virtual machines like EC2, Compute Engine, and Azure VMs to managed containers with ECS, GKE, and AKS, and fully serverless with Lambda, Cloud Functions, and Azure Functions. VMs offer maximum control but require OS patching, managed container services handle orchestration, and serverless eliminates all infrastructure management with per-invocation billing. Choose based on the trade-off between operational control and management overhead.',
        tags: ['ec2', 'compute', 'serverless', 'containers'],
        keyTakeaway:
          'Cloud compute ranges from VMs with full control to serverless with zero management, trading control for convenience.',
      },
      {
        id: 'do-cloud-object-storage',
        title: 'How does cloud object storage work?',
        difficulty: 'beginner',
        answer:
          'Object storage services like S3, Cloud Storage, and Azure Blob store unstructured data as objects in flat-namespace buckets with virtually unlimited capacity and eleven nines of durability. Objects are accessed via HTTP APIs, support versioning and lifecycle policies, and can be tiered across storage classes from frequent access to archival for cost optimization. Access is controlled through bucket policies, ACLs, and IAM permissions, with encryption at rest available by default or via customer-managed keys.',
        tags: ['s3', 'object-storage', 'durability'],
        keyTakeaway:
          'Object storage offers unlimited, highly durable storage with tiered pricing and HTTP-based access.',
      },
      {
        id: 'do-cloud-managed-db',
        title: 'What are managed database services?',
        difficulty: 'intermediate',
        answer:
          'Managed database services like RDS, Cloud SQL, and Azure SQL Database handle provisioning, patching, backups, replication, and failover for relational databases, freeing teams from undifferentiated operational work. They support engines like PostgreSQL, MySQL, and SQL Server with read replicas for scaling reads and multi-AZ deployments for high availability. The trade-off is less control over database internals and higher cost compared to self-managed instances on VMs.',
        tags: ['rds', 'managed-database', 'high-availability'],
        keyTakeaway:
          'Managed databases automate operations like backups and failover, trading some control for reduced operational burden.',
      },
      {
        id: 'do-cloud-serverless',
        title: 'How does serverless computing work?',
        difficulty: 'intermediate',
        answer:
          'Serverless platforms like AWS Lambda, Cloud Functions, and Azure Functions execute code in response to events without provisioning or managing servers, scaling automatically from zero to thousands of concurrent invocations. Billing is per invocation and execution duration, making it cost-effective for sporadic or event-driven workloads. Limitations include cold start latency, execution time limits typically fifteen minutes, and the need to design for statelessness since function instances are ephemeral.',
        tags: ['serverless', 'lambda', 'event-driven'],
        keyTakeaway:
          'Serverless runs code on-demand with automatic scaling and per-invocation billing, ideal for event-driven workloads.',
      },
      {
        id: 'do-cloud-iac-services',
        title: 'What are CloudFormation and CDK?',
        difficulty: 'intermediate',
        answer:
          'CloudFormation is AWS native infrastructure as code that defines resources in declarative JSON or YAML templates, while CDK lets you define the same infrastructure using familiar programming languages like TypeScript or Python that synthesize into CloudFormation templates. CDK provides higher-level constructs with sensible defaults, loops, and conditionals that are cumbersome in raw CloudFormation. GCP has Deployment Manager and Azure has ARM templates and Bicep as their native equivalents.',
        tags: ['cloudformation', 'cdk', 'iac'],
        keyTakeaway:
          'CloudFormation uses declarative YAML while CDK uses programming languages, both generating the same underlying resource definitions.',
      },
      {
        id: 'do-cloud-cost',
        title: 'How do you optimize cloud costs?',
        difficulty: 'advanced',
        answer:
          'Cost optimization starts with right-sizing instances based on actual utilization metrics, using reserved instances or savings plans for predictable workloads at sixty to seventy percent discounts, and spot instances for fault-tolerant batch workloads. Implement tagging strategies to attribute costs to teams, use storage lifecycle policies to tier infrequently accessed data, and shut down non-production environments outside business hours. Tools like AWS Cost Explorer, GCP Billing, and third-party platforms like Infracost provide visibility and recommendations.',
        tags: ['cost-optimization', 'reserved-instances', 'right-sizing'],
        keyTakeaway:
          'Optimize cloud costs through right-sizing, commitment discounts, spot instances, lifecycle policies, and cost attribution tagging.',
      },
      {
        id: 'do-cloud-multi-cloud',
        title: 'When does a multi-cloud strategy make sense?',
        difficulty: 'advanced',
        answer:
          'Multi-cloud makes sense for avoiding vendor lock-in, meeting regulatory requirements for data residency, leveraging best-of-breed services from different providers, or ensuring resilience against provider-level outages. The trade-off is significantly increased operational complexity, as teams must maintain expertise across multiple platforms, manage cross-cloud networking, and use abstraction layers like Terraform or Kubernetes. Most organizations benefit more from a primary cloud strategy with selective multi-cloud for specific workloads rather than running everything everywhere.',
        tags: ['multi-cloud', 'strategy', 'vendor-lock-in'],
        keyTakeaway:
          'Multi-cloud adds resilience and flexibility but at significant operational complexity; use it selectively rather than universally.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 5. Infrastructure as Code
  // ─────────────────────────────────────────────
  {
    id: 'do-iac',
    label: 'Infrastructure as Code',
    icon: 'FileCode',
    description:
      'Terraform, Pulumi, Ansible, and practices for managing infrastructure declaratively.',
    questions: [
      {
        id: 'do-iac-terraform',
        title: 'What is Terraform and how does it work?',
        difficulty: 'beginner',
        answer:
          'Terraform is a declarative infrastructure as code tool that uses HCL to define desired cloud resources, then calculates a plan showing what will be created, modified, or destroyed before applying changes via provider APIs. It maintains a state file that maps declared resources to real-world infrastructure, enabling it to detect drift and manage the full lifecycle. Terraform is cloud-agnostic with providers for AWS, GCP, Azure, Kubernetes, and hundreds of other services.',
        tags: ['terraform', 'hcl', 'declarative'],
        keyTakeaway:
          'Terraform uses declarative HCL and a state file to plan and apply infrastructure changes across any cloud provider.',
      },
      {
        id: 'do-iac-pulumi',
        title: 'How does Pulumi differ from Terraform?',
        difficulty: 'intermediate',
        answer:
          'Pulumi lets you define infrastructure using general-purpose programming languages like TypeScript, Python, Go, and C# instead of a domain-specific language, enabling loops, conditionals, abstractions, and unit testing with familiar tools. It manages state similarly to Terraform but defaults to a managed backend service rather than local files. The trade-off is a smaller community and ecosystem compared to Terraform, but the ability to use standard software engineering practices for infrastructure is a significant advantage for development teams.',
        tags: ['pulumi', 'typescript', 'programming-languages'],
        keyTakeaway:
          'Pulumi uses general-purpose languages instead of HCL, enabling standard software engineering practices for infrastructure.',
      },
      {
        id: 'do-iac-ansible',
        title: 'What is Ansible and when should you use it?',
        difficulty: 'beginner',
        answer:
          'Ansible is an agentless configuration management and automation tool that connects to servers via SSH and executes idempotent tasks defined in YAML playbooks, making it ideal for provisioning, configuration, and application deployment. Unlike Terraform which manages infrastructure lifecycle, Ansible excels at configuring what runs on that infrastructure such as installing packages, managing services, and deploying applications. It uses an inventory of hosts and can be combined with Terraform in a complementary workflow where Terraform provisions infrastructure and Ansible configures it.',
        tags: ['ansible', 'configuration-management', 'agentless'],
        keyTakeaway:
          'Ansible is agentless configuration management via SSH that complements Terraform by configuring what runs on provisioned infrastructure.',
      },
      {
        id: 'do-iac-state',
        title: 'How should Terraform state be managed?',
        difficulty: 'intermediate',
        answer:
          'Terraform state should be stored in a remote backend like S3 with DynamoDB locking, GCS, or Terraform Cloud rather than locally, enabling team collaboration and preventing concurrent modification conflicts through state locking. State contains sensitive values so the backend must be encrypted at rest with restricted access controls. Splitting state across workspaces or separate state files per environment and component reduces blast radius and speeds up plan and apply operations.',
        tags: ['state', 'remote-backend', 'locking'],
        keyTakeaway:
          'Store state remotely with locking and encryption, split by environment to reduce blast radius and enable team collaboration.',
      },
      {
        id: 'do-iac-modules',
        title: 'What are Terraform modules and why use them?',
        difficulty: 'intermediate',
        answer:
          'Modules are reusable, composable packages of Terraform configuration that encapsulate a set of related resources behind a clean interface of input variables and outputs. They promote DRY principles by letting teams standardize patterns like VPC creation or EKS cluster setup and reuse them across projects with different configurations. Modules can be sourced from local directories, Git repositories, or the Terraform Registry, and should be versioned to prevent breaking changes from propagating unexpectedly.',
        tags: ['modules', 'reusability', 'terraform-registry'],
        keyTakeaway:
          'Modules encapsulate reusable infrastructure patterns with versioned interfaces, enabling standardization and DRY configuration.',
      },
      {
        id: 'do-iac-drift',
        title: 'What is infrastructure drift and how do you detect it?',
        difficulty: 'intermediate',
        answer:
          'Infrastructure drift occurs when the actual state of cloud resources diverges from the declared configuration, typically due to manual console changes, out-of-band scripts, or another tool modifying the same resources. Terraform plan detects drift by comparing state with real-world resources and showing what would change to bring them back in alignment. Prevent drift by enforcing all changes through IaC pipelines, using SCP or organization policies to restrict console access, and running scheduled drift detection scans.',
        tags: ['drift', 'detection', 'compliance'],
        keyTakeaway:
          'Drift happens when reality diverges from code; detect it with terraform plan and prevent it by enforcing all changes through IaC pipelines.',
      },
      {
        id: 'do-iac-immutable',
        title: 'What is immutable infrastructure?',
        difficulty: 'advanced',
        answer:
          'Immutable infrastructure treats servers as disposable units that are replaced entirely rather than updated in place, using machine images like AMIs or container images as the deployment artifact. When a change is needed, a new image is built, tested, and deployed while the old instances are terminated, eliminating configuration drift and snowflake servers. This pairs naturally with auto-scaling groups, blue-green deployments, and container orchestration where rolling replacements are the standard update mechanism.',
        tags: ['immutable', 'ami', 'replacement-over-update'],
        keyTakeaway:
          'Immutable infrastructure replaces servers entirely instead of updating them, eliminating drift and snowflake configurations.',
      },
      {
        id: 'do-iac-gitops',
        title: 'How does GitOps apply to infrastructure as code?',
        difficulty: 'advanced',
        answer:
          'GitOps for IaC uses Git as the single source of truth where all infrastructure changes go through pull requests with reviews and CI validation, and a reconciliation agent like Atlantis or Terraform Cloud automatically applies approved changes. This provides a complete audit trail of who changed what and when, enables easy rollback by reverting commits, and enforces policy checks before any infrastructure modification. The pattern extends naturally to Kubernetes with tools like ArgoCD and Flux that continuously reconcile cluster state against Git.',
        tags: ['gitops', 'atlantis', 'pull-request', 'reconciliation'],
        keyTakeaway:
          'GitOps uses Git as the source of truth with automated reconciliation, providing audit trails and review-gated infrastructure changes.',
      },
    ],
  },
];
