import type { DocCategory } from './types';

export const K8S_PART2_CATEGORIES: DocCategory[] = [
  {
    id: 'k8s-configuration',
    label: 'Configuration',
    icon: '⚙️',
    entries: [
      {
        id: 'k8s-resource-requests-limits',
        title: 'Resource Requests & Limits',
        difficulty: 'intermediate',
        tags: ['kubernetes', 'resources', 'cpu', 'memory', 'qos', 'limits'],
        sections: [
          {
            heading: 'Understanding Resource Requests and Limits',
            content:
              'Kubernetes allows you to specify resource requests and limits for each container in a Pod. Resource requests tell the scheduler how much CPU and memory a container needs to run, while limits define the maximum resources a container can consume. The scheduler uses requests to decide which node to place a Pod on, ensuring the node has enough capacity. If a container exceeds its memory limit, it is terminated with an OOMKilled status. If it exceeds its CPU limit, it is throttled but not killed. Properly configuring these values is critical for cluster stability and efficient resource utilization. Under-requesting leads to resource contention and poor performance, while over-requesting wastes cluster capacity and increases costs. You should always set both requests and limits for production workloads to ensure predictable behavior and prevent noisy neighbor problems across your cluster.',
            code: `apiVersion: v1
kind: Pod
metadata:
  name: resource-demo
spec:
  containers:
  - name: app
    image: nginx:1.25
    resources:
      requests:
        cpu: "250m"
        memory: "128Mi"
      limits:
        cpu: "500m"
        memory: "256Mi"`,
            tip: 'Start with generous limits during development, then tighten them based on actual usage observed through metrics.',
          },
          {
            heading: 'Quality of Service (QoS) Classes',
            content:
              'Kubernetes assigns a QoS class to every Pod based on how resource requests and limits are configured. There are three QoS classes: Guaranteed, Burstable, and BestEffort. A Pod receives Guaranteed QoS when every container has both CPU and memory requests and limits set, and they are equal. Burstable QoS is assigned when at least one container has a request or limit set, but they are not all equal. BestEffort is assigned when no container specifies any requests or limits. When a node runs out of resources, Kubernetes evicts BestEffort Pods first, then Burstable, and finally Guaranteed Pods. Understanding QoS classes helps you prioritize critical workloads and ensure they survive resource pressure situations. For mission-critical services, always aim for Guaranteed QoS by setting requests equal to limits for both CPU and memory.',
            code: `# Guaranteed QoS - requests equal limits
apiVersion: v1
kind: Pod
metadata:
  name: guaranteed-pod
spec:
  containers:
  - name: app
    image: myapp:v1
    resources:
      requests:
        cpu: "500m"
        memory: "256Mi"
      limits:
        cpu: "500m"
        memory: "256Mi"`,
            note: 'BestEffort Pods are evicted first during resource pressure. Always set requests and limits for production workloads.',
          },
          {
            heading: 'LimitRange for Namespace Defaults',
            content:
              'A LimitRange object allows cluster administrators to set default resource requests and limits for containers within a namespace. This is especially useful when developers forget to specify resource constraints. Without a LimitRange, containers can consume unlimited resources, potentially starving other workloads. LimitRange can also enforce minimum and maximum constraints, ensuring that no single container requests too many or too few resources. You can set defaults for both containers and Pods, and you can also constrain PersistentVolumeClaim sizes. When a container is created without resource specifications, the LimitRange defaults are automatically applied. This provides a safety net for the entire namespace and helps maintain consistent resource management policies across teams.',
            code: `apiVersion: v1
kind: LimitRange
metadata:
  name: default-limits
  namespace: production
spec:
  limits:
  - type: Container
    default:
      cpu: "500m"
      memory: "256Mi"
    defaultRequest:
      cpu: "250m"
      memory: "128Mi"
    max:
      cpu: "2"
      memory: "1Gi"
    min:
      cpu: "100m"
      memory: "64Mi"`,
            warning: 'LimitRange only applies to new Pods. Existing Pods are not affected when you create or update a LimitRange.',
          },
        ],
        quiz: [
          {
            question: 'What happens when a container exceeds its memory limit in Kubernetes?',
            options: [
              'The container is throttled',
              'The container is terminated with OOMKilled',
              'The Pod is rescheduled to another node',
              'Nothing happens',
            ],
            correctIndex: 1,
            explanation:
              'When a container exceeds its memory limit, Kubernetes terminates it with an OOMKilled status. CPU overuse causes throttling, but memory overuse causes termination.',
          },
          {
            question: 'Which QoS class is assigned when requests equal limits for all containers?',
            options: ['BestEffort', 'Burstable', 'Guaranteed', 'Critical'],
            correctIndex: 2,
            explanation:
              'Guaranteed QoS is assigned when every container in a Pod has both CPU and memory requests and limits set, and they are equal.',
          },
          {
            question: 'What does a LimitRange do?',
            options: [
              'Limits the number of Pods in a namespace',
              'Sets default resource requests and limits for containers in a namespace',
              'Restricts network bandwidth per Pod',
              'Controls the number of replicas in a Deployment',
            ],
            correctIndex: 1,
            explanation:
              'A LimitRange sets default resource requests and limits for containers within a namespace, and can also enforce minimum and maximum constraints.',
          },
        ],
      },
      {
        id: 'k8s-env-variables',
        title: 'Environment Variables',
        difficulty: 'intermediate',
        tags: ['kubernetes', 'env', 'configmap', 'secret', 'fieldref'],
        sections: [
          {
            heading: 'Static Environment Variables',
            content:
              'Environment variables are one of the simplest ways to pass configuration data to containers running in Kubernetes Pods. You can define static environment variables directly in the Pod specification using the env field. Each variable has a name and a value. These values are set when the container starts and remain constant throughout the container lifecycle. Static environment variables are suitable for simple, non-sensitive configuration that does not change frequently. However, hardcoding values in Pod specs makes it difficult to manage configuration across multiple environments such as development, staging, and production. For more flexible configuration management, Kubernetes provides ConfigMaps and Secrets, which decouple configuration from the Pod specification and allow reuse across multiple Pods and Deployments.',
            code: `apiVersion: v1
kind: Pod
metadata:
  name: env-demo
spec:
  containers:
  - name: app
    image: myapp:v1
    env:
    - name: APP_ENV
      value: "production"
    - name: LOG_LEVEL
      value: "info"
    - name: MAX_CONNECTIONS
      value: "100"`,
            tip: 'Use static env variables only for values that truly never change. For everything else, use ConfigMaps or Secrets.',
          },
          {
            heading: 'ConfigMap and Secret References',
            content:
              'Instead of hardcoding environment variable values, you can reference ConfigMaps and Secrets. Using valueFrom with configMapKeyRef, you can inject individual keys from a ConfigMap into a container environment variable. Similarly, secretKeyRef injects values from a Secret. You can also use envFrom to inject all key-value pairs from a ConfigMap or Secret as environment variables at once. ConfigMaps are designed for non-sensitive data like application settings, feature flags, and endpoint URLs. Secrets are designed for sensitive data like passwords, API keys, and certificates, and their values are base64-encoded. This separation allows you to update configuration without rebuilding container images, and you can manage sensitive and non-sensitive data with appropriate access controls.',
            code: `apiVersion: v1
kind: Pod
metadata:
  name: configref-demo
spec:
  containers:
  - name: app
    image: myapp:v1
    env:
    - name: DATABASE_URL
      valueFrom:
        configMapKeyRef:
          name: app-config
          key: database_url
    - name: DB_PASSWORD
      valueFrom:
        secretKeyRef:
          name: db-credentials
          key: password
    envFrom:
    - configMapRef:
        name: app-config
    - secretRef:
        name: app-secrets`,
            warning: 'Secrets are only base64-encoded, not encrypted. Use external secret management solutions like Vault or Sealed Secrets for true encryption at rest.',
          },
          {
            heading: 'Field References and Resource Field References',
            content:
              'Kubernetes supports injecting Pod and container metadata as environment variables using the Downward API via fieldRef and resourceFieldRef. With fieldRef, you can expose Pod fields such as the Pod name, namespace, IP address, service account name, and node name. With resourceFieldRef, you can expose container resource limits and requests as environment variables. This is useful for applications that need to know their own identity or resource allocation without hardcoding values. For example, a logging agent might need the Pod name to tag log entries, or an application might adjust its thread pool size based on its CPU limit. The Downward API avoids coupling your application to Kubernetes-specific APIs while still giving it access to runtime metadata.',
            code: `apiVersion: v1
kind: Pod
metadata:
  name: fieldref-demo
spec:
  containers:
  - name: app
    image: myapp:v1
    env:
    - name: POD_NAME
      valueFrom:
        fieldRef:
          fieldPath: metadata.name
    - name: POD_NAMESPACE
      valueFrom:
        fieldRef:
          fieldPath: metadata.namespace
    - name: NODE_NAME
      valueFrom:
        fieldRef:
          fieldPath: spec.nodeName
    - name: CPU_LIMIT
      valueFrom:
        resourceFieldRef:
          containerName: app
          resource: limits.cpu`,
            note: 'fieldRef supports metadata.name, metadata.namespace, metadata.uid, metadata.labels, metadata.annotations, spec.nodeName, spec.serviceAccountName, status.podIP, and status.hostIP.',
          },
        ],
        challenge: {
          prompt:
            'Create a Pod that uses environment variables from a ConfigMap, a Secret, and the Downward API to expose the Pod name.',
          starterCode: `apiVersion: v1
kind: ConfigMap
metadata:
  name: challenge-config
data:
  APP_MODE: "production"
---
apiVersion: v1
kind: Secret
metadata:
  name: challenge-secret
type: Opaque
data:
  API_KEY: c2VjcmV0a2V5MTIz
---
apiVersion: v1
kind: Pod
metadata:
  name: challenge-pod
spec:
  containers:
  - name: app
    image: busybox
    command: ["env"]
    # Add environment variables here`,
          solutionCode: `apiVersion: v1
kind: ConfigMap
metadata:
  name: challenge-config
data:
  APP_MODE: "production"
---
apiVersion: v1
kind: Secret
metadata:
  name: challenge-secret
type: Opaque
data:
  API_KEY: c2VjcmV0a2V5MTIz
---
apiVersion: v1
kind: Pod
metadata:
  name: challenge-pod
spec:
  containers:
  - name: app
    image: busybox
    command: ["env"]
    env:
    - name: APP_MODE
      valueFrom:
        configMapKeyRef:
          name: challenge-config
          key: APP_MODE
    - name: API_KEY
      valueFrom:
        secretKeyRef:
          name: challenge-secret
          key: API_KEY
    - name: POD_NAME
      valueFrom:
        fieldRef:
          fieldPath: metadata.name`,
          hints: [
            'Use valueFrom.configMapKeyRef to reference ConfigMap keys',
            'Use valueFrom.secretKeyRef to reference Secret keys',
            'Use valueFrom.fieldRef with fieldPath: metadata.name for the Pod name',
          ],
        },
      },
      {
        id: 'k8s-probes',
        title: 'Health Probes',
        difficulty: 'intermediate',
        tags: ['kubernetes', 'probes', 'liveness', 'readiness', 'startup', 'health'],
        sections: [
          {
            heading: 'Liveness, Readiness, and Startup Probes',
            content:
              'Kubernetes provides three types of health probes to monitor and manage container health: liveness, readiness, and startup probes. Liveness probes detect when a container has entered a broken state and needs to be restarted. If a liveness probe fails, the kubelet kills the container and restarts it according to the Pod restart policy. Readiness probes determine whether a container is ready to accept traffic. If a readiness probe fails, the container is removed from Service endpoints, so it stops receiving network traffic until it recovers. Startup probes are used for containers that take a long time to start. While a startup probe is running, liveness and readiness probes are disabled. This prevents slow-starting containers from being killed before they finish initialization. Combining all three probes gives you fine-grained control over container lifecycle management.',
            code: `apiVersion: v1
kind: Pod
metadata:
  name: probe-demo
spec:
  containers:
  - name: app
    image: myapp:v1
    ports:
    - containerPort: 8080
    startupProbe:
      httpGet:
        path: /healthz
        port: 8080
      failureThreshold: 30
      periodSeconds: 10
    livenessProbe:
      httpGet:
        path: /healthz
        port: 8080
      initialDelaySeconds: 0
      periodSeconds: 10
      failureThreshold: 3
    readinessProbe:
      httpGet:
        path: /ready
        port: 8080
      initialDelaySeconds: 5
      periodSeconds: 5
      failureThreshold: 3`,
            tip: 'Use startup probes for slow-starting apps like Java applications. This prevents liveness probes from killing the container during initialization.',
          },
          {
            heading: 'Probe Types: HTTP, TCP, and Exec',
            content:
              'Kubernetes supports three probe mechanisms: HTTP GET, TCP socket, and exec command. HTTP GET probes send an HTTP request to a specified path and port. The probe succeeds if the response status code is between 200 and 399. This is the most common probe type for web applications. TCP socket probes attempt to open a TCP connection to a specified port. If the connection is established, the probe succeeds. This is useful for non-HTTP services like databases or message brokers. Exec probes run a command inside the container. If the command exits with status code 0, the probe succeeds. This is the most flexible option and can be used for custom health check scripts. You can also configure additional parameters like initialDelaySeconds, periodSeconds, timeoutSeconds, successThreshold, and failureThreshold to fine-tune probe behavior for your specific application needs.',
            code: `# TCP probe for a database
livenessProbe:
  tcpSocket:
    port: 5432
  initialDelaySeconds: 15
  periodSeconds: 20
---
# Exec probe with custom script
livenessProbe:
  exec:
    command:
    - /bin/sh
    - -c
    - pg_isready -U postgres
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 5
---
# gRPC probe (Kubernetes 1.24+)
livenessProbe:
  grpc:
    port: 50051
    service: my.health.v1.Health
  initialDelaySeconds: 10`,
            note: 'gRPC health probes are available as a stable feature starting from Kubernetes 1.27. They require the application to implement the gRPC Health Checking Protocol.',
          },
          {
            heading: 'Probe Configuration Best Practices',
            content:
              'Proper probe configuration is essential for application reliability. A common mistake is setting liveness probes that are too aggressive, causing unnecessary container restarts during temporary load spikes. Set failureThreshold to at least 3 and use reasonable timeoutSeconds values to tolerate transient failures. Readiness probes should check actual application readiness, including downstream dependencies like databases. However, be careful not to create cascading failures where one failing dependency causes all Pods to become unready. For liveness probes, only check the application process itself, not external dependencies. If your application has a slow startup, use a startup probe instead of increasing initialDelaySeconds on the liveness probe. This gives you fast failure detection after startup while still allowing time for initialization. Always test your probe endpoints under load to ensure they respond within the configured timeout.',
            code: `# Test probe endpoint response time
kubectl exec probe-demo -- curl -s -o /dev/null -w "%{time_total}" http://localhost:8080/healthz

# Check probe status in Pod events
kubectl describe pod probe-demo | grep -A 5 "Events"

# Watch probe failures in real-time
kubectl get events --field-selector reason=Unhealthy --watch

# Debug failing probes
kubectl logs probe-demo --previous`,
            warning: 'Never check external dependencies in liveness probes. A database outage should not cause all your application Pods to restart in a loop.',
          },
        ],
        diagram: {
          kind: 'mermaid' as const,
          code: `graph TD
    A[Container Starts] --> B{Startup Probe\\nConfigured?}
    B -->|Yes| C[Run Startup Probe]
    B -->|No| E[Run Liveness + Readiness]
    C -->|Success| E
    C -->|Failure| D[Restart Container]
    E --> F{Liveness Probe}
    E --> G{Readiness Probe}
    F -->|Success| H[Container Running]
    F -->|Failure| D
    G -->|Success| I[Added to Service Endpoints]
    G -->|Failure| J[Removed from Service Endpoints]
    H --> F
    I --> G
    J --> G`,
          caption: 'Kubernetes probe lifecycle: startup probe gates liveness and readiness probes, which then run independently.',
        },
        quiz: [
          {
            question: 'What happens when a liveness probe fails?',
            options: [
              'The Pod is removed from Service endpoints',
              'The container is restarted',
              'The Pod is rescheduled to another node',
              'A warning event is logged but nothing else happens',
            ],
            correctIndex: 1,
            explanation:
              'When a liveness probe fails (after the configured failureThreshold), the kubelet kills the container and restarts it according to the Pod restart policy.',
          },
          {
            question: 'Why should you use startup probes for slow-starting containers?',
            options: [
              'They are faster than liveness probes',
              'They prevent liveness probes from killing the container during initialization',
              'They automatically scale the container resources',
              'They skip the readiness check entirely',
            ],
            correctIndex: 1,
            explanation:
              'Startup probes disable liveness and readiness probes until the container has started. This prevents slow-starting containers from being killed before they finish initialization.',
          },
          {
            question: 'Which probe type should NOT check external dependencies?',
            options: [
              'Readiness probe',
              'Startup probe',
              'Liveness probe',
              'All probes should check external dependencies',
            ],
            correctIndex: 2,
            explanation:
              'Liveness probes should only check the application process health. Checking external dependencies in liveness probes can cause cascading restarts when a dependency is temporarily unavailable.',
          },
        ],
      },
      {
        id: 'k8s-init-containers',
        title: 'Init Containers',
        difficulty: 'intermediate',
        tags: ['kubernetes', 'init-containers', 'initialization', 'sequential', 'volumes'],
        sections: [
          {
            heading: 'What Are Init Containers',
            content:
              'Init containers are specialized containers that run before the main application containers in a Pod. They run to completion sequentially, meaning each init container must finish successfully before the next one starts. If any init container fails, Kubernetes restarts the Pod according to the restart policy. Init containers are defined in the initContainers field of the Pod spec and have the same structure as regular containers, but they do not support readiness probes because they must run to completion. Init containers are useful for setup tasks like waiting for a dependent service to become available, populating shared volumes with configuration data, running database migrations, or downloading application assets. They separate initialization logic from the main application, keeping your application container focused on its primary purpose and reducing image bloat.',
            code: `apiVersion: v1
kind: Pod
metadata:
  name: init-demo
spec:
  initContainers:
  - name: wait-for-db
    image: busybox:1.36
    command: ['sh', '-c', 'until nc -z postgres-svc 5432; do echo waiting; sleep 2; done']
  - name: init-schema
    image: myapp-migrate:v1
    command: ['./migrate', '--up']
    env:
    - name: DATABASE_URL
      valueFrom:
        secretKeyRef:
          name: db-secret
          key: url
  containers:
  - name: app
    image: myapp:v1
    ports:
    - containerPort: 8080`,
            analogy: 'Think of init containers like the opening acts at a concert. Each performer finishes before the next one starts, and the main act (your application container) only goes on stage once all opening acts have completed.',
          },
          {
            heading: 'Sharing Data Between Init and App Containers',
            content:
              'Init containers and application containers can share data through volumes. A common pattern is to use an emptyDir volume that an init container populates with data, configuration, or downloaded assets. The application container then mounts the same volume and reads the prepared data. This is particularly useful for cloning git repositories, downloading configuration from external services, or generating certificates. Since init containers run to completion before app containers start, you can be sure the data is ready when your application needs it. You can also use this pattern to keep your application image small by offloading heavy setup tools to init container images that are only used during initialization and then discarded.',
            code: `apiVersion: v1
kind: Pod
metadata:
  name: shared-volume-demo
spec:
  initContainers:
  - name: git-clone
    image: alpine/git:2.40
    command: ['git', 'clone', 'https://github.com/example/config.git', '/data/config']
    volumeMounts:
    - name: config-volume
      mountPath: /data
  - name: render-templates
    image: hairyhenderson/gomplate:v3
    command: ['gomplate', '-d', 'config=/data/config/values.yaml', '-f', '/data/config/app.tmpl', '-o', '/data/app.conf']
    volumeMounts:
    - name: config-volume
      mountPath: /data
  containers:
  - name: app
    image: nginx:1.25
    volumeMounts:
    - name: config-volume
      mountPath: /etc/app
      subPath: app.conf
  volumes:
  - name: config-volume
    emptyDir: {}`,
            tip: 'Use subPath when mounting shared volumes to avoid overwriting the entire directory in the application container.',
          },
          {
            heading: 'Init Container Use Cases and Patterns',
            content:
              'Init containers have several common use cases in production environments. The most frequent pattern is waiting for dependent services. Before starting your application, an init container can poll for database readiness, check that an API endpoint is responding, or verify that a required ConfigMap exists. Another pattern is permission fixing, where an init container sets correct file ownership and permissions on mounted volumes. This is necessary when persistent volumes are provisioned with root ownership but the application runs as a non-root user. Security-related initialization is also common, such as downloading and validating TLS certificates from a certificate authority or fetching secrets from HashiCorp Vault. Network configuration init containers can set up iptables rules or configure sidecar proxies before the application starts, which is how service meshes like Istio inject their proxy configuration.',
            code: `# Permission fixing init container
initContainers:
- name: fix-permissions
  image: busybox:1.36
  command: ['sh', '-c', 'chown -R 1000:1000 /data']
  volumeMounts:
  - name: data-volume
    mountPath: /data
  securityContext:
    runAsUser: 0
---
# Vault secret fetching init container
initContainers:
- name: vault-init
  image: hashicorp/vault:1.15
  command: ['sh', '-c']
  args:
  - |
    vault login -method=kubernetes role=myapp
    vault kv get -format=json secret/myapp > /secrets/config.json
  volumeMounts:
  - name: secrets
    mountPath: /secrets`,
            warning: 'Init containers share the same resource pool as the Pod. If your init container requires significant CPU or memory, include those requirements in the Pod resource calculations.',
          },
        ],
        quiz: [
          {
            question: 'In what order do init containers execute?',
            options: [
              'In parallel for faster startup',
              'Sequentially, one after another',
              'In reverse order of definition',
              'The scheduler decides the order',
            ],
            correctIndex: 1,
            explanation:
              'Init containers run sequentially in the order they are defined. Each must complete successfully before the next one starts.',
          },
          {
            question: 'What happens if an init container fails?',
            options: [
              'The Pod continues with the remaining init containers',
              'Only the failed init container is retried',
              'The Pod is restarted according to the restart policy',
              'The main containers start regardless',
            ],
            correctIndex: 2,
            explanation:
              'If any init container fails, Kubernetes restarts the entire Pod according to the restart policy, re-running all init containers from the beginning.',
          },
          {
            question: 'How can init containers share data with application containers?',
            options: [
              'Through environment variables only',
              'Through shared volumes like emptyDir',
              'Through Kubernetes API calls',
              'They cannot share data',
            ],
            correctIndex: 1,
            explanation:
              'Init containers and application containers can share data through volumes. An emptyDir volume mounted in both containers is the most common approach.',
          },
        ],
      },
      {
        id: 'k8s-sidecar-containers',
        title: 'Sidecar Containers',
        difficulty: 'intermediate',
        tags: ['kubernetes', 'sidecar', 'logging', 'proxy', 'patterns', 'native-sidecar'],
        sections: [
          {
            heading: 'Sidecar Pattern in Kubernetes',
            content:
              'The sidecar pattern is a Pod design pattern where a helper container runs alongside the main application container to provide supplementary functionality. Sidecar containers extend the behavior of the primary container without modifying it, enabling separation of concerns and reusable components. Common sidecar use cases include log collection and forwarding, where a sidecar tails log files written by the main container and ships them to a centralized logging system. Network proxies are another popular sidecar, handling TLS termination, service mesh functionality, or traffic management transparently. Other examples include configuration reloaders that watch for ConfigMap changes, metrics exporters that convert application metrics to Prometheus format, and security sidecars that handle authentication. The sidecar pattern keeps each container focused on a single responsibility, making applications more modular, maintainable, and easier to update independently.',
            code: `apiVersion: v1
kind: Pod
metadata:
  name: sidecar-logging
spec:
  containers:
  - name: app
    image: myapp:v1
    volumeMounts:
    - name: logs
      mountPath: /var/log/app
  - name: log-forwarder
    image: fluent/fluent-bit:2.2
    volumeMounts:
    - name: logs
      mountPath: /var/log/app
      readOnly: true
    - name: fluent-config
      mountPath: /fluent-bit/etc
  volumes:
  - name: logs
    emptyDir: {}
  - name: fluent-config
    configMap:
      name: fluent-bit-config`,
            analogy: 'A sidecar container is like a motorcycle sidecar: it travels alongside the main vehicle, provides additional capacity, but does not interfere with the motorcycle operation. The sidecar can carry passengers or cargo that the motorcycle alone cannot.',
          },
          {
            heading: 'Native Sidecar Containers (Kubernetes 1.28+)',
            content:
              'Kubernetes 1.28 introduced native sidecar containers as a beta feature using the restartPolicy: Always field on init containers. Before this, sidecar containers were just regular containers in the Pod spec with no guaranteed startup order. Native sidecars solve the ordering problem: they start before regular containers and shut down after them. This is critical for service meshes and log forwarders that need to be running before the application starts sending traffic or writing logs. Native sidecars are defined in the initContainers section with restartPolicy: Always, which tells Kubernetes to keep them running like regular containers rather than running them to completion. They participate in Pod lifecycle management, receiving termination signals after all regular containers have stopped. This feature addresses long-standing issues with sidecar container lifecycle management that previously required complex workarounds.',
            code: `apiVersion: v1
kind: Pod
metadata:
  name: native-sidecar-demo
spec:
  initContainers:
  # Native sidecar - starts before app, stops after app
  - name: istio-proxy
    image: istio/proxyv2:1.20
    restartPolicy: Always
    ports:
    - containerPort: 15090
      name: http-envoy-prom
    resources:
      requests:
        cpu: 100m
        memory: 128Mi
  - name: log-agent
    image: fluent/fluent-bit:2.2
    restartPolicy: Always
    volumeMounts:
    - name: logs
      mountPath: /var/log/app
  containers:
  - name: app
    image: myapp:v1
    volumeMounts:
    - name: logs
      mountPath: /var/log/app
  volumes:
  - name: logs
    emptyDir: {}`,
            note: 'Native sidecar containers require Kubernetes 1.28+ with the SidecarContainers feature gate enabled. It became stable in Kubernetes 1.29.',
          },
          {
            heading: 'Proxy Sidecar Pattern',
            content:
              'The proxy sidecar pattern places a network proxy container alongside the application to handle cross-cutting concerns like mutual TLS, traffic routing, circuit breaking, rate limiting, and observability. Service meshes like Istio and Linkerd use this pattern extensively, injecting an Envoy proxy sidecar into every Pod. The proxy intercepts all incoming and outgoing network traffic transparently using iptables rules configured by an init container. This means the application does not need any code changes to participate in the service mesh. The proxy handles encryption, authentication, retry logic, and telemetry collection. You can also implement simpler proxy sidecars for specific use cases, such as a local reverse proxy that adds authentication headers, a caching proxy that reduces external API calls, or a connection pooler that manages database connections more efficiently than the application itself.',
            code: `apiVersion: v1
kind: Pod
metadata:
  name: proxy-sidecar-demo
spec:
  initContainers:
  - name: iptables-init
    image: istio/proxyv2:1.20
    command: ['istio-iptables', '-p', '15001', '-z', '15006']
    securityContext:
      capabilities:
        add: ['NET_ADMIN']
      runAsUser: 0
  containers:
  - name: app
    image: myapp:v1
    ports:
    - containerPort: 8080
  - name: envoy-proxy
    image: envoyproxy/envoy:v1.28
    ports:
    - containerPort: 15001
    volumeMounts:
    - name: envoy-config
      mountPath: /etc/envoy
  volumes:
  - name: envoy-config
    configMap:
      name: envoy-config`,
            tip: 'For service mesh adoption, start with a single namespace and gradually expand. Use the mesh sidecar injection annotation to control which Pods get proxies.',
          },
        ],
        challenge: {
          prompt:
            'Create a Pod with a native sidecar log collector that reads logs from a shared emptyDir volume. The main app writes to /var/log/app/output.log.',
          starterCode: `apiVersion: v1
kind: Pod
metadata:
  name: sidecar-challenge
spec:
  # Define a native sidecar for log collection
  # and a main application container
  # Use an emptyDir volume shared between them
  containers:
  - name: app
    image: busybox
    command: ['sh', '-c', 'while true; do echo "$(date) - log entry" >> /var/log/app/output.log; sleep 5; done']`,
          solutionCode: `apiVersion: v1
kind: Pod
metadata:
  name: sidecar-challenge
spec:
  initContainers:
  - name: log-collector
    image: busybox
    restartPolicy: Always
    command: ['sh', '-c', 'tail -F /var/log/app/output.log']
    volumeMounts:
    - name: log-volume
      mountPath: /var/log/app
      readOnly: true
  containers:
  - name: app
    image: busybox
    command: ['sh', '-c', 'while true; do echo "$(date) - log entry" >> /var/log/app/output.log; sleep 5; done']
    volumeMounts:
    - name: log-volume
      mountPath: /var/log/app
  volumes:
  - name: log-volume
    emptyDir: {}`,
          hints: [
            'Define the sidecar in initContainers with restartPolicy: Always',
            'Use an emptyDir volume shared between both containers',
            'The sidecar should use tail -F to follow the log file',
          ],
        },
      },
      {
        id: 'k8s-pod-disruption-budgets',
        title: 'Pod Disruption Budgets',
        difficulty: 'intermediate',
        tags: ['kubernetes', 'pdb', 'availability', 'disruption', 'drain', 'maintenance'],
        sections: [
          {
            heading: 'Understanding Pod Disruption Budgets',
            content:
              'Pod Disruption Budgets (PDBs) protect your applications during voluntary disruptions such as node drains, cluster upgrades, and autoscaler scale-downs. A PDB limits the number of Pods that can be simultaneously unavailable for a selected application. Without PDBs, a node drain could take down all replicas of your application at once, causing downtime. PDBs ensure that a minimum number of Pods remain available during disruptions. You can specify the budget using either minAvailable, which sets the minimum number or percentage of Pods that must remain running, or maxUnavailable, which sets the maximum number or percentage of Pods that can be down at any time. PDBs only apply to voluntary disruptions initiated by the cluster administrator or automation. They do not protect against involuntary disruptions like hardware failures or kernel panics, which require other mechanisms like Pod anti-affinity and multi-zone deployments.',
            code: `apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: app-pdb
  namespace: production
spec:
  minAvailable: 2
  selector:
    matchLabels:
      app: web-frontend
---
# Percentage-based PDB
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: api-pdb
spec:
  maxUnavailable: "25%"
  selector:
    matchLabels:
      app: api-server`,
            tip: 'Use maxUnavailable instead of minAvailable when you want the PDB to scale automatically with your Deployment replicas.',
          },
          {
            heading: 'Node Draining with PDB Enforcement',
            content:
              'When you drain a node using kubectl drain, Kubernetes evicts Pods while respecting PDB constraints. The drain process sends eviction requests for each Pod on the node. If evicting a Pod would violate a PDB, the eviction is blocked and the drain process waits until it is safe to proceed. This ensures rolling availability during maintenance windows. The drain command has a timeout flag that controls how long to wait for PDB constraints to be satisfied. If the timeout expires, you can choose to force the drain, which bypasses PDB checks. However, force draining should only be used as a last resort because it can cause application downtime. During cluster upgrades, node pools are typically drained one at a time, and PDBs ensure that applications remain available throughout the upgrade process. PDBs work with the Kubernetes eviction API, which respects budget constraints.',
            code: `# Drain a node respecting PDBs
kubectl drain node-1 --ignore-daemonsets --delete-emptydir-data

# Drain with timeout
kubectl drain node-1 --ignore-daemonsets --timeout=300s

# Check PDB status
kubectl get pdb -n production

# Detailed PDB info showing allowed disruptions
kubectl describe pdb app-pdb -n production

# Check current disruptions allowed
kubectl get pdb app-pdb -o jsonpath='{.status.disruptionsAllowed}'

# Uncordon node after maintenance
kubectl uncordon node-1`,
            warning: 'A PDB with minAvailable equal to the current replica count will block all voluntary evictions. Ensure your PDB allows at least one disruption.',
          },
          {
            heading: 'PDB Best Practices and Strategies',
            content:
              'When configuring PDBs, consider your application availability requirements and deployment topology. For stateless applications with many replicas, maxUnavailable of 25% to 50% allows fast node drains while maintaining capacity. For stateful applications like databases, minAvailable should be set to maintain quorum, for example, 2 out of 3 replicas for an etcd cluster. Avoid setting minAvailable equal to the total replica count, as this blocks all voluntary evictions and prevents node maintenance. Always create PDBs for production workloads that require high availability. Use percentage-based budgets for Deployments that scale frequently, as they automatically adjust with the replica count. For applications with a single replica, a PDB is less useful because any eviction takes down the only instance. Instead, consider running at least two replicas with a PDB. Remember that PDBs only cover voluntary disruptions, so combine them with Pod topology spread constraints and anti-affinity rules for comprehensive availability.',
            code: `# PDB for a 3-node database cluster (maintain quorum)
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: db-pdb
spec:
  minAvailable: 2
  selector:
    matchLabels:
      app: postgres
      role: replica
---
# Unhealthy pod eviction policy (Kubernetes 1.27+)
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: advanced-pdb
spec:
  maxUnavailable: 1
  selector:
    matchLabels:
      app: web
  unhealthyPodEvictionPolicy: AlwaysAllow`,
            note: 'The unhealthyPodEvictionPolicy: AlwaysAllow setting allows eviction of unhealthy Pods even when PDB budget is exhausted, preventing stuck evictions caused by misbehaving Pods.',
          },
        ],
        quiz: [
          {
            question: 'What does a PodDisruptionBudget protect against?',
            options: [
              'Hardware failures and kernel panics',
              'Voluntary disruptions like node drains and upgrades',
              'Network partitions',
              'Container OOMKill events',
            ],
            correctIndex: 1,
            explanation:
              'PDBs protect against voluntary disruptions such as node drains, cluster upgrades, and autoscaler scale-downs. They do not protect against involuntary disruptions like hardware failures.',
          },
          {
            question: 'What happens when a node drain would violate a PDB?',
            options: [
              'The PDB is ignored',
              'The Pod is forcefully evicted',
              'The eviction is blocked and the drain waits',
              'The Pod is rescheduled immediately',
            ],
            correctIndex: 2,
            explanation:
              'When evicting a Pod would violate its PDB, the eviction request is blocked and the drain process waits until the PDB allows the eviction to proceed.',
          },
          {
            question: 'Why is maxUnavailable preferred over minAvailable for scaling Deployments?',
            options: [
              'It is faster to process',
              'It automatically adjusts with the replica count',
              'It provides stronger guarantees',
              'It works with StatefulSets only',
            ],
            correctIndex: 1,
            explanation:
              'Percentage-based maxUnavailable automatically scales with the replica count, so you do not need to update the PDB every time you scale your Deployment.',
          },
        ],
      },
      {
        id: 'k8s-priority-preemption',
        title: 'Priority & Preemption',
        difficulty: 'intermediate',
        tags: ['kubernetes', 'priority', 'preemption', 'scheduling', 'priorityclass'],
        sections: [
          {
            heading: 'PriorityClass Resources',
            content:
              'Kubernetes uses PriorityClass resources to assign scheduling priority to Pods. A PriorityClass is a cluster-scoped resource that defines a priority value (an integer) and an optional description. Higher values mean higher priority. When the scheduler cannot find a node with enough resources for a pending Pod, it checks if the Pod has a higher priority than any running Pods. If so, it can preempt (evict) lower-priority Pods to make room. PriorityClasses allow you to ensure that critical workloads like payment processors and monitoring systems are always scheduled, even during resource contention. Kubernetes ships with two built-in PriorityClasses: system-cluster-critical with a value of 2000000000, and system-node-critical with a value of 2000001000. These are reserved for system components. You should create custom PriorityClasses for your application workloads with values well below the system range.',
            code: `apiVersion: scheduling.k8s.io/v1
kind: PriorityClass
metadata:
  name: high-priority
value: 1000000
globalDefault: false
description: "Used for critical production services"
---
apiVersion: scheduling.k8s.io/v1
kind: PriorityClass
metadata:
  name: medium-priority
value: 500000
globalDefault: true
description: "Default priority for standard workloads"
---
apiVersion: scheduling.k8s.io/v1
kind: PriorityClass
metadata:
  name: low-priority
value: 100000
globalDefault: false
description: "Used for batch jobs and development workloads"`,
            tip: 'Set one PriorityClass as globalDefault: true to apply it to all Pods that do not specify a priority. Only one PriorityClass can be the global default.',
          },
          {
            heading: 'Using Priority in Pods and Deployments',
            content:
              'To assign a priority to a Pod, set the priorityClassName field in the Pod spec to the name of a PriorityClass. This works in Pod specs, Deployment templates, StatefulSet templates, and any other workload resource that creates Pods. When the cluster is under resource pressure, the scheduler uses priority values to decide which Pods to schedule first. Higher-priority Pods are placed in the scheduling queue ahead of lower-priority Pods. If no node has sufficient resources, the scheduler considers preempting lower-priority Pods. The preemption process respects PodDisruptionBudgets, so even low-priority Pods have some protection. However, if preemption is blocked by a PDB, the high-priority Pod remains pending until resources become available through other means, such as cluster autoscaling or natural Pod termination. Priority does not affect already-running Pods unless preemption is triggered by a new higher-priority Pod.',
            code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: payment-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: payment
  template:
    metadata:
      labels:
        app: payment
    spec:
      priorityClassName: high-priority
      containers:
      - name: payment
        image: payment-svc:v2
        resources:
          requests:
            cpu: "500m"
            memory: "512Mi"
---
apiVersion: batch/v1
kind: Job
metadata:
  name: data-analysis
spec:
  template:
    spec:
      priorityClassName: low-priority
      restartPolicy: OnFailure
      containers:
      - name: analyzer
        image: data-analyzer:v1`,
            note: 'When a Pod is preempted, it receives a SIGTERM signal and has a grace period (terminationGracePeriodSeconds) to shut down cleanly before being forcefully killed.',
          },
          {
            heading: 'Preemption Policies and Controls',
            content:
              'Kubernetes supports two preemption policies: PreemptLowerPriority (the default) and Never. When a PriorityClass has preemptionPolicy set to Never, Pods using that class will not trigger preemption of other Pods. Instead, they wait in the scheduling queue until resources become naturally available. This is useful for workloads that are important enough to schedule ahead of other pending Pods but should not disrupt running workloads. For example, a data analytics job might be high priority for scheduling order but should not preempt production services. You can combine preemption policies with resource quotas to create a tiered scheduling system. Resource quotas per namespace ensure that high-priority workloads cannot consume the entire cluster. Additionally, you can use Pod priority along with cluster autoscaler priority-based expander to influence which node groups scale up first when new capacity is needed.',
            code: `# PriorityClass that does not preempt other Pods
apiVersion: scheduling.k8s.io/v1
kind: PriorityClass
metadata:
  name: high-priority-no-preempt
value: 900000
preemptionPolicy: Never
description: "High scheduling priority without preemption"
---
# Resource quota to limit high-priority usage
apiVersion: v1
kind: ResourceQuota
metadata:
  name: high-priority-quota
  namespace: production
spec:
  hard:
    pods: "20"
    requests.cpu: "10"
    requests.memory: "20Gi"
  scopeSelector:
    matchExpressions:
    - operator: In
      scopeName: PriorityClass
      values: ["high-priority"]`,
            warning: 'Be cautious with preemption in production. A misconfigured high-priority Deployment that scales aggressively can preempt critical workloads across the cluster.',
          },
        ],
      },
      {
        id: 'k8s-runtime-class',
        title: 'RuntimeClass',
        difficulty: 'intermediate',
        tags: ['kubernetes', 'runtimeclass', 'gvisor', 'kata', 'container-runtime', 'security'],
        sections: [
          {
            heading: 'Understanding RuntimeClass',
            content:
              'RuntimeClass is a Kubernetes resource that allows you to select the container runtime used to run containers in a Pod. By default, all containers use the default container runtime configured on the node, typically runc with containerd or CRI-O. However, some workloads require stronger isolation guarantees than standard Linux containers provide. RuntimeClass enables you to run specific Pods with alternative runtimes like gVisor (which provides a user-space kernel for sandboxed execution) or Kata Containers (which runs containers inside lightweight virtual machines). This is particularly important for multi-tenant clusters where untrusted workloads need additional isolation, or for compliance requirements that mandate VM-level separation. RuntimeClass was introduced in Kubernetes 1.12 and became stable in Kubernetes 1.20. It works by mapping a handler name to the container runtime configuration on the node, allowing heterogeneous runtime environments within a single cluster.',
            code: `# RuntimeClass for gVisor
apiVersion: node.k8s.io/v1
kind: RuntimeClass
metadata:
  name: gvisor
handler: runsc
overhead:
  podFixed:
    cpu: "100m"
    memory: "64Mi"
scheduling:
  nodeSelector:
    runtime.kubernetes.io/gvisor: "true"
---
# RuntimeClass for Kata Containers
apiVersion: node.k8s.io/v1
kind: RuntimeClass
metadata:
  name: kata-containers
handler: kata
overhead:
  podFixed:
    cpu: "250m"
    memory: "160Mi"
scheduling:
  nodeSelector:
    runtime.kubernetes.io/kata: "true"`,
            analogy: 'Think of RuntimeClass like choosing between different types of building construction. Standard containers are like open-plan offices with cubicle dividers (namespace isolation). gVisor adds soundproof walls (user-space kernel). Kata Containers puts each office in a separate building (VM isolation).',
          },
          {
            heading: 'Using RuntimeClass in Pods',
            content:
              'To use a specific RuntimeClass, set the runtimeClassName field in the Pod spec. When the kubelet receives the Pod, it uses the handler specified in the RuntimeClass to configure the appropriate container runtime. If the RuntimeClass does not exist or the handler is not available on the node, the Pod fails to start. The overhead field in RuntimeClass specifies additional resources consumed by the runtime itself, separate from the container resource requests. Kubernetes adds this overhead to the Pod resource calculations for scheduling and quota enforcement. The scheduling field can include nodeSelector and tolerations to ensure Pods using this RuntimeClass are only scheduled on nodes that have the required runtime installed. This prevents scheduling failures when only some nodes support alternative runtimes.',
            code: `# Pod using gVisor runtime
apiVersion: v1
kind: Pod
metadata:
  name: sandboxed-app
spec:
  runtimeClassName: gvisor
  containers:
  - name: untrusted-app
    image: user-submitted-code:latest
    resources:
      requests:
        cpu: "200m"
        memory: "128Mi"
      limits:
        cpu: "500m"
        memory: "256Mi"
---
# Deployment with Kata Containers
apiVersion: apps/v1
kind: Deployment
metadata:
  name: secure-workload
spec:
  replicas: 2
  selector:
    matchLabels:
      app: secure-app
  template:
    metadata:
      labels:
        app: secure-app
    spec:
      runtimeClassName: kata-containers
      containers:
      - name: app
        image: secure-app:v1`,
            note: 'The overhead specified in RuntimeClass is automatically added to Pod resource calculations. A Pod requesting 200m CPU with a runtime overhead of 100m CPU will be scheduled as needing 300m CPU.',
          },
          {
            heading: 'Choosing Container Runtimes',
            content:
              'Selecting the right container runtime depends on your security requirements, performance needs, and operational complexity. The default runc runtime provides good performance with standard Linux container isolation using namespaces and cgroups. It is suitable for trusted workloads in single-tenant environments. gVisor intercepts system calls and processes them in a user-space kernel, providing an additional layer of isolation without the overhead of full virtualization. It is ideal for running untrusted code, such as user-submitted functions in a FaaS platform. However, gVisor does not support all Linux system calls, so some applications may not work correctly. Kata Containers provides the strongest isolation by running each container inside a lightweight virtual machine. This gives you VM-level security boundaries while maintaining container-like speed and resource efficiency. The trade-off is higher resource overhead and slower startup times. You can mix runtimes in the same cluster, using the default runtime for trusted workloads and sandboxed runtimes for untrusted or sensitive workloads.',
            code: `# Install gVisor (runsc) on a node
curl -fsSL https://gvisor.dev/archive.key | sudo gpg --dearmor -o /usr/share/keyrings/gvisor.gpg
echo "deb [signed-by=/usr/share/keyrings/gvisor.gpg] https://storage.googleapis.com/gvisor/releases release main" | sudo tee /etc/apt/sources.list.d/gvisor.list
sudo apt-get update && sudo apt-get install -y runsc

# Configure containerd for gVisor
# Add to /etc/containerd/config.toml:
# [plugins."io.containerd.grpc.v1.cri".containerd.runtimes.runsc]
#   runtime_type = "io.containerd.runsc.v1"
sudo systemctl restart containerd

# Verify RuntimeClass
kubectl get runtimeclass
kubectl describe runtimeclass gvisor

# Label nodes that support gVisor
kubectl label node worker-1 runtime.kubernetes.io/gvisor=true`,
            tip: 'Use RuntimeClass overhead to account for the additional memory and CPU consumed by sandboxed runtimes. Without overhead, the scheduler may overcommit nodes.',
          },
        ],
        challenge: {
          prompt:
            'Create a RuntimeClass for gVisor and a Pod that uses it with appropriate resource settings.',
          starterCode: `# Create a RuntimeClass named "gvisor-sandbox"
# Then create a Pod that uses it
apiVersion: node.k8s.io/v1
kind: RuntimeClass
metadata:
  name: gvisor-sandbox
# Complete the RuntimeClass spec
---
apiVersion: v1
kind: Pod
metadata:
  name: sandboxed-pod
# Complete the Pod spec to use the RuntimeClass`,
          solutionCode: `apiVersion: node.k8s.io/v1
kind: RuntimeClass
metadata:
  name: gvisor-sandbox
handler: runsc
overhead:
  podFixed:
    cpu: "100m"
    memory: "64Mi"
scheduling:
  nodeSelector:
    runtime.kubernetes.io/gvisor: "true"
---
apiVersion: v1
kind: Pod
metadata:
  name: sandboxed-pod
spec:
  runtimeClassName: gvisor-sandbox
  containers:
  - name: app
    image: nginx:1.25
    resources:
      requests:
        cpu: "200m"
        memory: "128Mi"
      limits:
        cpu: "500m"
        memory: "256Mi"`,
          hints: [
            'Set the handler to "runsc" for gVisor',
            'Include overhead.podFixed for CPU and memory consumed by the runtime',
            'Use runtimeClassName in the Pod spec to reference the RuntimeClass',
          ],
        },
      },
    ],
  },
  {
    id: 'k8s-storage',
    title: 'Storage',
    icon: '💾',
    entries: [
      {
        id: 'k8s-volumes',
        title: 'Volumes',
        difficulty: 'intermediate',
        tags: ['kubernetes', 'volumes', 'emptydir', 'hostpath', 'projected', 'downwardapi'],
        sections: [
          {
            heading: 'Volume Types: emptyDir and hostPath',
            content:
              'Kubernetes volumes provide a way for containers to access and share storage within a Pod. An emptyDir volume is created when a Pod is assigned to a node and exists as long as the Pod runs on that node. All containers in the Pod can read and write to the same emptyDir volume, making it ideal for sharing temporary data between containers. When the Pod is removed from the node, the data in emptyDir is permanently deleted. You can optionally set emptyDir to use the node memory as the backing medium for ultra-fast temporary storage using the medium: Memory option. hostPath volumes mount a file or directory from the host node filesystem into the Pod. While hostPath provides access to node-level data, it is generally discouraged in production because it ties the Pod to a specific node and creates security risks. hostPath is primarily used by DaemonSets that need to access node-level logs or system information.',
            code: `apiVersion: v1
kind: Pod
metadata:
  name: volume-demo
spec:
  containers:
  - name: writer
    image: busybox
    command: ['sh', '-c', 'echo "shared data" > /data/message.txt; sleep 3600']
    volumeMounts:
    - name: shared-data
      mountPath: /data
  - name: reader
    image: busybox
    command: ['sh', '-c', 'cat /data/message.txt; sleep 3600']
    volumeMounts:
    - name: shared-data
      mountPath: /data
      readOnly: true
  volumes:
  - name: shared-data
    emptyDir: {}
  - name: fast-cache
    emptyDir:
      medium: Memory
      sizeLimit: 256Mi`,
            warning: 'hostPath volumes bypass Pod security boundaries and can expose the host filesystem. Avoid hostPath except for DaemonSets that specifically need host access.',
          },
          {
            heading: 'Projected Volumes',
            content:
              'Projected volumes allow you to combine several volume sources into a single directory. You can project data from Secrets, ConfigMaps, the Downward API, and ServiceAccount tokens into one mount point. This is useful when an application expects all its configuration in a single directory rather than scattered across multiple mount points. Each source can specify individual items to include and their mount paths within the projected volume. The Downward API projection lets you expose Pod metadata like labels, annotations, and resource limits as files. ServiceAccount token projection is used by Kubernetes to mount bound service account tokens with configurable expiry and audience, replacing the older non-expiring tokens. Projected volumes simplify the container filesystem layout and reduce the number of volumeMounts needed in the Pod spec, making Pod definitions cleaner and more maintainable.',
            code: `apiVersion: v1
kind: Pod
metadata:
  name: projected-demo
  labels:
    app: myapp
    version: v2
spec:
  containers:
  - name: app
    image: myapp:v1
    volumeMounts:
    - name: all-config
      mountPath: /etc/app
      readOnly: true
  volumes:
  - name: all-config
    projected:
      sources:
      - configMap:
          name: app-config
          items:
          - key: settings.yaml
            path: settings.yaml
      - secret:
          name: app-secret
          items:
          - key: tls.crt
            path: certs/tls.crt
          - key: tls.key
            path: certs/tls.key
      - downwardAPI:
          items:
          - path: labels
            fieldRef:
              fieldPath: metadata.labels
      - serviceAccountToken:
          path: token
          expirationSeconds: 3600
          audience: api-server`,
            tip: 'Projected volumes support setting default file permissions using defaultMode. Individual items can override this with their own mode setting.',
          },
          {
            heading: 'Downward API Volumes',
            content:
              'The Downward API allows Pods to access information about themselves without calling the Kubernetes API server. You can expose Pod and container metadata as either environment variables or volume files. When using volumes, the Downward API creates files in the mounted directory containing the requested information. Unlike environment variables which are set at container start and never change, Downward API volume files are updated dynamically when the underlying data changes. For example, if you update a Pod label, the corresponding file in the Downward API volume reflects the change after a brief delay. This makes Downward API volumes suitable for applications that need to react to metadata changes. Common use cases include exposing Pod labels for service discovery, annotations for configuration, resource limits for application tuning, and Pod identity information for logging and debugging purposes.',
            code: `apiVersion: v1
kind: Pod
metadata:
  name: downward-demo
  labels:
    app: myapp
    tier: backend
  annotations:
    build: "1234"
    team: "platform"
spec:
  containers:
  - name: app
    image: myapp:v1
    resources:
      requests:
        cpu: "250m"
        memory: "128Mi"
      limits:
        cpu: "500m"
        memory: "256Mi"
    volumeMounts:
    - name: podinfo
      mountPath: /etc/podinfo
  volumes:
  - name: podinfo
    downwardAPI:
      items:
      - path: "labels"
        fieldRef:
          fieldPath: metadata.labels
      - path: "annotations"
        fieldRef:
          fieldPath: metadata.annotations
      - path: "cpu_limit"
        resourceFieldRef:
          containerName: app
          resource: limits.cpu
      - path: "mem_limit"
        resourceFieldRef:
          containerName: app
          resource: limits.memory`,
            note: 'Downward API volume files are updated periodically by the kubelet. The update interval is controlled by the kubelet sync period, which defaults to approximately one minute.',
          },
        ],
        quiz: [
          {
            question: 'What happens to emptyDir data when a Pod is deleted?',
            options: [
              'It is persisted to the node disk',
              'It is permanently deleted',
              'It is moved to a PersistentVolume',
              'It is backed up automatically',
            ],
            correctIndex: 1,
            explanation:
              'emptyDir volumes are tied to the Pod lifecycle. When the Pod is removed from the node for any reason, the data in emptyDir is permanently deleted.',
          },
          {
            question: 'What advantage do Downward API volumes have over environment variables?',
            options: [
              'They are faster to read',
              'They are encrypted at rest',
              'They update dynamically when metadata changes',
              'They support more data types',
            ],
            correctIndex: 2,
            explanation:
              'Downward API volume files are updated dynamically when the underlying data changes, unlike environment variables which are set once at container startup and never change.',
          },
          {
            question: 'What does a projected volume allow you to do?',
            options: [
              'Project network traffic to other Pods',
              'Combine multiple volume sources into a single directory',
              'Create snapshots of existing volumes',
              'Encrypt volume data at rest',
            ],
            correctIndex: 1,
            explanation:
              'Projected volumes combine data from Secrets, ConfigMaps, Downward API, and ServiceAccount tokens into a single mount point.',
          },
        ],
      },
      {
        id: 'k8s-persistent-volumes',
        title: 'Persistent Volumes',
        difficulty: 'intermediate',
        tags: ['kubernetes', 'pv', 'pvc', 'persistent-storage', 'access-modes', 'reclaim'],
        sections: [
          {
            heading: 'Persistent Volumes and Claims',
            content:
              'Persistent Volumes (PVs) and Persistent Volume Claims (PVCs) decouple storage provisioning from Pod lifecycle. A PV is a cluster-scoped storage resource provisioned by an administrator or dynamically by a StorageClass. A PVC is a namespace-scoped request for storage made by a user. When a PVC is created, Kubernetes binds it to a matching PV based on capacity, access modes, and StorageClass. Once bound, the PVC can be mounted in Pods as a volume. This abstraction allows developers to request storage without knowing the underlying infrastructure details. PVs persist beyond Pod and PVC lifecycle depending on the reclaim policy. The Retain policy keeps the PV and its data after the PVC is deleted, requiring manual cleanup. The Delete policy automatically deletes the PV and the underlying storage when the PVC is removed. The Recycle policy is deprecated in favor of dynamic provisioning with StorageClasses.',
            code: `# PersistentVolume
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv-data
spec:
  capacity:
    storage: 10Gi
  accessModes:
  - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
  storageClassName: standard
  hostPath:
    path: /mnt/data
---
# PersistentVolumeClaim
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: data-claim
  namespace: production
spec:
  accessModes:
  - ReadWriteOnce
  resources:
    requests:
      storage: 5Gi
  storageClassName: standard
---
# Pod using the PVC
apiVersion: v1
kind: Pod
metadata:
  name: pv-pod
  namespace: production
spec:
  containers:
  - name: app
    image: myapp:v1
    volumeMounts:
    - name: data
      mountPath: /app/data
  volumes:
  - name: data
    persistentVolumeClaim:
      claimName: data-claim`,
            tip: 'Use the Retain reclaim policy for important data. This ensures the PV and its data survive PVC deletion, giving you time to back up data before manual cleanup.',
          },
          {
            heading: 'Access Modes and Binding',
            content:
              'PersistentVolumes support three access modes that define how the volume can be mounted. ReadWriteOnce (RWO) allows the volume to be mounted as read-write by a single node. Multiple Pods on the same node can share the volume, but Pods on different nodes cannot. ReadOnlyMany (ROX) allows the volume to be mounted as read-only by many nodes simultaneously. This is useful for sharing static data like configuration or reference datasets. ReadWriteMany (RWX) allows the volume to be mounted as read-write by many nodes, which is required for shared data across multiple Pods on different nodes. Not all storage providers support all access modes; for example, most block storage only supports RWO. Network file systems like NFS, Amazon EFS, and Azure Files support RWX. Kubernetes 1.22 introduced ReadWriteOncePod (RWOP) which restricts the volume to a single Pod, providing even stricter access control than RWO.',
            code: `# ReadWriteMany PV using NFS
apiVersion: v1
kind: PersistentVolume
metadata:
  name: nfs-shared
spec:
  capacity:
    storage: 50Gi
  accessModes:
  - ReadWriteMany
  nfs:
    server: nfs-server.example.com
    path: /exports/shared
  persistentVolumeReclaimPolicy: Retain
---
# ReadWriteOncePod PVC (K8s 1.22+)
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: exclusive-claim
spec:
  accessModes:
  - ReadWriteOncePod
  resources:
    requests:
      storage: 20Gi
  storageClassName: fast-ssd`,
            note: 'ReadWriteOncePod (RWOP) ensures only one Pod in the entire cluster can write to the volume. This is stronger than ReadWriteOnce (RWO) which allows multiple Pods on the same node.',
          },
          {
            heading: 'PV Lifecycle and Reclaim Policies',
            content:
              'The lifecycle of a PersistentVolume goes through several phases: Available, Bound, Released, and Failed. A newly created PV starts in the Available state, waiting for a PVC to bind to it. Once a matching PVC is found, the PV transitions to Bound. When the PVC is deleted, the PV becomes Released. At this point, the reclaim policy determines what happens next. With the Retain policy, the PV stays in Released state with its data intact. An administrator must manually clean up the data and either delete the PV or make it available for reuse by removing the claimRef. With the Delete policy, the PV and its underlying storage are automatically deleted. The Failed state indicates that the PV reclaim process failed. You can change the reclaim policy of an existing PV using kubectl patch. For production databases and stateful workloads, always use Retain to prevent accidental data loss when PVCs are inadvertently deleted.',
            code: `# List PersistentVolumes and their status
kubectl get pv

# Check PVC binding status
kubectl get pvc -n production

# Change reclaim policy on existing PV
kubectl patch pv pv-data -p '{"spec":{"persistentVolumeReclaimPolicy":"Retain"}}'

# Manually reclaim a Released PV
kubectl patch pv pv-data -p '{"spec":{"claimRef":null}}'

# Describe PV for detailed info
kubectl describe pv pv-data

# Check events related to PV binding
kubectl get events --field-selector involvedObject.kind=PersistentVolumeClaim -n production`,
            warning: 'The Delete reclaim policy permanently destroys the underlying storage. Always verify the reclaim policy before deleting a PVC, especially for production data.',
          },
        ],
        diagram: {
          kind: 'mermaid' as const,
          code: `graph LR
    A[Administrator] -->|Creates| B[PersistentVolume]
    C[Developer] -->|Creates| D[PersistentVolumeClaim]
    B -->|Binding| E{Match Found?}
    D -->|Binding| E
    E -->|Yes| F[Bound PV-PVC Pair]
    E -->|No| G[PVC Pending]
    F -->|Mount| H[Pod Uses Volume]
    H -->|PVC Deleted| I{Reclaim Policy}
    I -->|Retain| J[PV Released - Data Kept]
    I -->|Delete| K[PV Deleted - Data Gone]
    J -->|Manual Cleanup| B`,
          caption: 'PersistentVolume lifecycle: provisioning, binding, usage, and reclaim based on policy.',
        },
        quiz: [
          {
            question: 'What is the difference between ReadWriteOnce and ReadWriteOncePod?',
            options: [
              'There is no difference',
              'RWO allows multiple Pods on one node; RWOP allows only one Pod cluster-wide',
              'RWOP is faster than RWO',
              'RWO is deprecated in favor of RWOP',
            ],
            correctIndex: 1,
            explanation:
              'ReadWriteOnce (RWO) allows multiple Pods on the same node to access the volume. ReadWriteOncePod (RWOP) restricts access to a single Pod across the entire cluster.',
          },
          {
            question: 'What happens to a PV with Retain policy when its PVC is deleted?',
            options: [
              'The PV and data are deleted',
              'The PV enters Released state with data intact',
              'The PV is automatically bound to a new PVC',
              'The PV enters Failed state',
            ],
            correctIndex: 1,
            explanation:
              'With the Retain policy, the PV transitions to Released state and its data remains intact. An administrator must manually clean up or reclaim the PV.',
          },
          {
            question: 'Which access mode is needed for shared storage across multiple nodes?',
            options: [
              'ReadWriteOnce',
              'ReadWriteOncePod',
              'ReadWriteMany',
              'ReadOnlyOnce',
            ],
            correctIndex: 2,
            explanation:
              'ReadWriteMany (RWX) allows the volume to be mounted as read-write by multiple nodes simultaneously, which is required for shared storage across different nodes.',
          },
        ],
      },
      {
        id: 'k8s-storage-classes',
        title: 'Storage Classes',
        difficulty: 'intermediate',
        tags: ['kubernetes', 'storageclass', 'provisioner', 'volume-binding', 'parameters'],
        sections: [
          {
            heading: 'StorageClass Resources',
            content:
              'A StorageClass provides a way for administrators to describe the classes of storage they offer. Different classes might map to quality-of-service levels, backup policies, or arbitrary policies determined by the cluster administrators. Kubernetes does not have an opinion on what classes represent. Each StorageClass has a provisioner, parameters, and a reclaimPolicy. The provisioner determines which volume plugin is used for provisioning PVs. Cloud providers have their own provisioners like kubernetes.io/aws-ebs for AWS EBS volumes, kubernetes.io/gce-pd for Google Cloud Persistent Disks, and kubernetes.io/azure-disk for Azure Managed Disks. The parameters field is passed to the provisioner and is specific to each provisioner implementation. For example, AWS EBS parameters include type (gp3, io2), iopsPerGB, and encrypted. StorageClasses enable dynamic provisioning, eliminating the need for administrators to pre-create PersistentVolumes for every storage request.',
            code: `# Standard SSD StorageClass
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: fast-ssd
  annotations:
    storageclass.kubernetes.io/is-default-class: "true"
provisioner: ebs.csi.aws.com
parameters:
  type: gp3
  iops: "3000"
  throughput: "125"
  encrypted: "true"
  fsType: ext4
reclaimPolicy: Delete
allowVolumeExpansion: true
volumeBindingMode: WaitForFirstConsumer
---
# High IOPS StorageClass
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: high-iops
provisioner: ebs.csi.aws.com
parameters:
  type: io2
  iops: "10000"
  encrypted: "true"
reclaimPolicy: Retain
allowVolumeExpansion: true
volumeBindingMode: WaitForFirstConsumer`,
            tip: 'Set allowVolumeExpansion: true on StorageClasses to allow PVCs to be resized without recreating them. Not all provisioners support volume expansion.',
          },
          {
            heading: 'Volume Binding Modes',
            content:
              'StorageClasses have two volume binding modes: Immediate and WaitForFirstConsumer. With Immediate mode, a PV is provisioned as soon as the PVC is created, regardless of whether any Pod is using it. This can lead to scheduling issues in multi-zone clusters because the PV might be provisioned in a zone where no node meets the Pod scheduling constraints. WaitForFirstConsumer mode delays PV provisioning until a Pod using the PVC is scheduled. The scheduler considers the Pod scheduling constraints (node affinity, topology spread, resource requirements) and provisions the PV in the same zone as the selected node. This mode is essential for topology-aware storage backends and is recommended as the default for all production StorageClasses. It prevents zone mismatch issues where a PVC is provisioned in zone-a but the Pod needs to run in zone-b due to other constraints, which would cause the Pod to be stuck in Pending state permanently.',
            code: `# WaitForFirstConsumer - recommended
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: zone-aware-storage
provisioner: ebs.csi.aws.com
parameters:
  type: gp3
  encrypted: "true"
volumeBindingMode: WaitForFirstConsumer
allowedTopologies:
- matchLabelExpressions:
  - key: topology.ebs.csi.aws.com/zone
    values:
    - us-east-1a
    - us-east-1b
    - us-east-1c
---
# Immediate binding - use only when topology doesn't matter
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: replicated-storage
provisioner: rook-ceph.rbd.csi.ceph.com
parameters:
  pool: replicated-pool
  clusterID: my-ceph-cluster
volumeBindingMode: Immediate`,
            warning: 'Using Immediate binding mode with zonal storage can cause Pods to be permanently stuck in Pending state if the PV is provisioned in the wrong zone.',
          },
          {
            heading: 'Managing StorageClasses',
            content:
              'Every cluster should have a default StorageClass annotated with storageclass.kubernetes.io/is-default-class: true. PVCs that do not specify a storageClassName use the default StorageClass. If no default is set, PVCs without a storageClassName remain unbound. You can have multiple StorageClasses to offer different tiers of storage. For example, a standard tier using gp3 volumes for general workloads, a performance tier using io2 volumes for databases, and an archival tier using sc1 volumes for infrequently accessed data. StorageClasses cannot be updated after creation; you must delete and recreate them to change parameters. However, changing a StorageClass does not affect existing PVCs or PVs. To migrate workloads between StorageClasses, create a new PVC with the desired StorageClass, copy the data, and update the workload to use the new PVC.',
            code: `# List all StorageClasses
kubectl get storageclass

# Check which is the default StorageClass
kubectl get sc -o jsonpath='{range .items[?(@.metadata.annotations.storageclass\.kubernetes\.io/is-default-class=="true")]}{.metadata.name}{end}'

# Set a StorageClass as default
kubectl patch storageclass fast-ssd -p '{"metadata":{"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}'

# Remove default annotation from old StorageClass
kubectl patch storageclass standard -p '{"metadata":{"annotations":{"storageclass.kubernetes.io/is-default-class":"false"}}}'

# Describe StorageClass for details
kubectl describe sc fast-ssd

# Check PVCs using a specific StorageClass
kubectl get pvc --all-namespaces -o jsonpath='{range .items[?(@.spec.storageClassName=="fast-ssd")]}{.metadata.namespace}/{.metadata.name}{"\n"}{end}'`,
            note: 'Only one StorageClass should be marked as default. If multiple are marked as default, PVCs without a storageClassName will fail to provision.',
          },
        ],
        challenge: {
          prompt:
            'Create two StorageClasses: a default "standard" class using gp3 with WaitForFirstConsumer binding, and a "high-performance" class using io2 with Retain reclaim policy.',
          starterCode: `# Create a default "standard" StorageClass
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: standard
# Complete the spec
---
# Create a "high-performance" StorageClass
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: high-performance
# Complete the spec`,
          solutionCode: `apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: standard
  annotations:
    storageclass.kubernetes.io/is-default-class: "true"
provisioner: ebs.csi.aws.com
parameters:
  type: gp3
  encrypted: "true"
reclaimPolicy: Delete
allowVolumeExpansion: true
volumeBindingMode: WaitForFirstConsumer
---
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: high-performance
provisioner: ebs.csi.aws.com
parameters:
  type: io2
  iops: "10000"
  encrypted: "true"
reclaimPolicy: Retain
allowVolumeExpansion: true
volumeBindingMode: WaitForFirstConsumer`,
          hints: [
            'Use the annotation storageclass.kubernetes.io/is-default-class: "true" for the default class',
            'Set volumeBindingMode: WaitForFirstConsumer for zone-aware provisioning',
            'Use reclaimPolicy: Retain for high-performance to protect valuable data',
          ],
        },
      },
      {
        id: 'k8s-dynamic-provisioning',
        title: 'Dynamic Provisioning',
        difficulty: 'intermediate',
        tags: ['kubernetes', 'dynamic-provisioning', 'csi', 'storage', 'automation'],
        sections: [
          {
            heading: 'How Dynamic Provisioning Works',
            content:
              'Dynamic provisioning eliminates the need for cluster administrators to pre-create PersistentVolumes. Instead, storage is automatically provisioned when a PersistentVolumeClaim is created. The process works as follows: a developer creates a PVC specifying the desired storage size, access mode, and StorageClass. The StorageClass provisioner plugin communicates with the underlying storage backend to create the actual storage volume. Kubernetes then creates a PV object that represents this newly provisioned storage and binds it to the PVC. The entire process is automatic and requires no administrator intervention. Dynamic provisioning scales seamlessly because new storage is created on demand rather than from a finite pool of pre-created volumes. This model works particularly well in cloud environments where storage backends like AWS EBS, Google Persistent Disk, and Azure Disk support programmatic volume creation. On-premises clusters can achieve dynamic provisioning using CSI drivers for storage systems like Ceph, NetApp, or Pure Storage.',
            code: `# StorageClass enables dynamic provisioning
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: auto-provision
provisioner: ebs.csi.aws.com
parameters:
  type: gp3
  encrypted: "true"
volumeBindingMode: WaitForFirstConsumer
---
# PVC triggers automatic PV creation
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: app-data
spec:
  accessModes:
  - ReadWriteOnce
  storageClassName: auto-provision
  resources:
    requests:
      storage: 20Gi
---
# Pod uses the dynamically provisioned volume
apiVersion: v1
kind: Pod
metadata:
  name: dynamic-pv-pod
spec:
  containers:
  - name: app
    image: myapp:v1
    volumeMounts:
    - name: data
      mountPath: /data
  volumes:
  - name: data
    persistentVolumeClaim:
      claimName: app-data`,
            analogy: 'Dynamic provisioning is like a parking garage with unlimited floors. Instead of pre-allocating a fixed number of parking spots (static PVs), the garage automatically builds a new floor whenever someone needs to park (PVC created). The garage grows to meet demand.',
          },
          {
            heading: 'CSI Drivers for Dynamic Provisioning',
            content:
              'Container Storage Interface (CSI) drivers are the standard mechanism for connecting Kubernetes to external storage systems. Each storage vendor provides a CSI driver that implements the provisioning, attaching, mounting, and snapshotting of volumes. CSI drivers run as a set of Pods in the cluster: a controller component that handles provisioning and snapshotting, and a node component (DaemonSet) that handles mounting and unmounting volumes on each node. Popular CSI drivers include aws-ebs-csi-driver for Amazon EBS, gcp-pd-csi-driver for Google Persistent Disk, azuredisk-csi-driver for Azure Managed Disks, ceph-csi for Ceph RBD and CephFS, and nfs-subdir-external-provisioner for NFS shares. CSI drivers are typically installed using Helm charts or operator-based installations. They register themselves with the kubelet and the CSI controller, making their capabilities available to the StorageClass provisioner field.',
            code: `# Install AWS EBS CSI driver with Helm
helm repo add aws-ebs-csi-driver https://kubernetes-sigs.github.io/aws-ebs-csi-driver
helm install aws-ebs-csi-driver aws-ebs-csi-driver/aws-ebs-csi-driver \
  --namespace kube-system \
  --set enableVolumeScheduling=true \
  --set enableVolumeResizing=true \
  --set enableVolumeSnapshot=true

# Check CSI driver Pods
kubectl get pods -n kube-system -l app.kubernetes.io/name=aws-ebs-csi-driver

# List installed CSI drivers
kubectl get csidrivers

# Check CSI node info
kubectl get csinodes

# Verify provisioner is working
kubectl get events --field-selector reason=ProvisioningSucceeded`,
            tip: 'Always check the CSI driver documentation for supported features. Not all drivers support volume expansion, snapshots, or cloning.',
          },
          {
            heading: 'Volume Expansion and Resizing',
            content:
              'Dynamic provisioning also supports volume expansion, allowing you to resize PVCs after creation. To enable this, the StorageClass must have allowVolumeExpansion: true, and the CSI driver must support the ControllerExpandVolume and NodeExpandVolume capabilities. To resize a PVC, simply edit the spec.resources.requests.storage field to a larger value. The CSI driver expands the underlying storage volume, and the filesystem is resized the next time the volume is mounted (or immediately if the volume is already mounted, depending on the driver). You cannot shrink a PVC; only expansion is supported. Volume expansion works for most cloud block storage and some network file systems. For file systems like ext4 and xfs, the resize happens online without downtime. Some storage backends may require the Pod to be restarted for the expansion to take effect, in which case you will see a FileSystemResizePending condition on the PVC.',
            code: `# Check if StorageClass allows expansion
kubectl get sc fast-ssd -o jsonpath='{.allowVolumeExpansion}'

# Resize a PVC (increase only)
kubectl patch pvc app-data -p '{"spec":{"resources":{"requests":{"storage":"50Gi"}}}}'

# Monitor resize progress
kubectl get pvc app-data -o jsonpath='{.status.conditions[*].type}'

# Check PVC events for resize status
kubectl describe pvc app-data | grep -A 5 Events

# Verify new size after expansion
kubectl get pvc app-data -o jsonpath='{.status.capacity.storage}'

# If FileSystemResizePending, restart the Pod
kubectl delete pod dynamic-pv-pod
# Pod recreation triggers filesystem resize on mount`,
            note: 'Volume expansion is a one-way operation. You cannot shrink a PVC back to its original size. Always plan your initial storage size with some headroom.',
          },
        ],
        quiz: [
          {
            question: 'What triggers dynamic volume provisioning?',
            options: [
              'Creating a StorageClass',
              'Creating a PersistentVolumeClaim',
              'Creating a Pod with a volume',
              'Running kubectl provision command',
            ],
            correctIndex: 1,
            explanation:
              'Dynamic provisioning is triggered when a PersistentVolumeClaim is created that references a StorageClass with a provisioner. The provisioner automatically creates the underlying storage and a PV.',
          },
          {
            question: 'What is required to enable PVC resizing?',
            options: [
              'A special resize controller',
              'allowVolumeExpansion: true on the StorageClass',
              'Admin approval through RBAC',
              'Deleting and recreating the PVC',
            ],
            correctIndex: 1,
            explanation:
              'The StorageClass must have allowVolumeExpansion set to true, and the CSI driver must support volume expansion capabilities.',
          },
          {
            question: 'Where do CSI driver node components run?',
            options: [
              'On the control plane only',
              'As a single replica Deployment',
              'As a DaemonSet on every node',
              'Outside the cluster',
            ],
            correctIndex: 2,
            explanation:
              'CSI driver node components run as a DaemonSet on every node to handle mounting and unmounting volumes on that specific node.',
          },
        ],
      },
      {
        id: 'k8s-csi',
        title: 'Container Storage Interface',
        difficulty: 'advanced',
        tags: ['kubernetes', 'csi', 'drivers', 'volumesnapshot', 'cloning', 'storage'],
        sections: [
          {
            heading: 'CSI Architecture and Components',
            content:
              'The Container Storage Interface (CSI) is a standard that defines how container orchestrators like Kubernetes interact with storage systems. Before CSI, storage plugins were compiled into the Kubernetes binary, making it difficult to add new storage backends. CSI decouples storage plugins from Kubernetes, allowing storage vendors to develop and release their drivers independently. A CSI driver consists of two main components: the controller plugin and the node plugin. The controller plugin runs as a Deployment and handles cluster-level operations like creating volumes, deleting volumes, creating snapshots, and expanding volumes. The node plugin runs as a DaemonSet on every node and handles node-level operations like staging volumes (attaching to the node), publishing volumes (mounting in the container), and collecting node capabilities. Kubernetes communicates with CSI drivers through gRPC over Unix domain sockets. Several sidecar containers provided by the Kubernetes community handle the translation between Kubernetes API objects and CSI gRPC calls.',
            code: `# CSI Driver registration
apiVersion: storage.k8s.io/v1
kind: CSIDriver
metadata:
  name: ebs.csi.aws.com
spec:
  attachRequired: true
  podInfoOnMount: false
  volumeLifecycleModes:
  - Persistent
  - Ephemeral
  fsGroupPolicy: File
  storageCapacity: true
---
# CSI controller deployment (simplified)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ebs-csi-controller
  namespace: kube-system
spec:
  replicas: 2
  selector:
    matchLabels:
      app: ebs-csi-controller
  template:
    spec:
      containers:
      - name: ebs-plugin
        image: public.ecr.aws/ebs-csi-driver/aws-ebs-csi-driver:v1.25
      - name: csi-provisioner
        image: registry.k8s.io/sig-storage/csi-provisioner:v3.6
      - name: csi-attacher
        image: registry.k8s.io/sig-storage/csi-attacher:v4.4
      - name: csi-snapshotter
        image: registry.k8s.io/sig-storage/csi-snapshotter:v6.3
      - name: csi-resizer
        image: registry.k8s.io/sig-storage/csi-resizer:v1.9`,
            note: 'CSI sidecar containers (provisioner, attacher, snapshotter, resizer) are maintained by the Kubernetes community and translate between Kubernetes APIs and CSI gRPC calls.',
          },
          {
            heading: 'Volume Snapshots with CSI',
            content:
              'CSI enables volume snapshot functionality, allowing you to create point-in-time copies of PersistentVolumes. Three resources are involved: VolumeSnapshotClass defines the snapshot provider and parameters (similar to StorageClass for PVCs), VolumeSnapshot represents a request to create a snapshot (similar to PVC), and VolumeSnapshotContent represents the actual snapshot (similar to PV). To use snapshots, the CSI driver must support the CREATE_DELETE_SNAPSHOT capability, and the snapshot controller and CRDs must be installed in the cluster. Snapshots can be used for backups, cloning data to new environments, and rollback scenarios. You can restore a snapshot by creating a new PVC with a dataSource that references the VolumeSnapshot. The provisioner creates a new volume pre-populated with the snapshot data. Snapshots are incremental in most storage backends, meaning subsequent snapshots only store changes since the last snapshot, making them storage-efficient.',
            code: `# VolumeSnapshotClass
apiVersion: snapshot.storage.k8s.io/v1
kind: VolumeSnapshotClass
metadata:
  name: ebs-snapshot-class
driver: ebs.csi.aws.com
deletionPolicy: Retain
parameters:
  tagSpecification_1: "Backup=true"
---
# Create a snapshot
apiVersion: snapshot.storage.k8s.io/v1
kind: VolumeSnapshot
metadata:
  name: db-snapshot-20240115
spec:
  volumeSnapshotClassName: ebs-snapshot-class
  source:
    persistentVolumeClaimName: postgres-data
---
# Restore from snapshot
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: postgres-data-restored
spec:
  accessModes:
  - ReadWriteOnce
  storageClassName: fast-ssd
  resources:
    requests:
      storage: 50Gi
  dataSource:
    name: db-snapshot-20240115
    kind: VolumeSnapshot
    apiGroup: snapshot.storage.k8s.io`,
            tip: 'Use the Retain deletion policy on VolumeSnapshotClass for backup snapshots. This prevents snapshots from being deleted when VolumeSnapshot objects are removed.',
          },
          {
            heading: 'Volume Cloning',
            content:
              'CSI volume cloning creates a duplicate of an existing PersistentVolumeClaim. Unlike snapshots, cloning creates a new independent volume that is a direct copy of the source volume at the time of cloning. Cloning is useful for creating test environments from production data, provisioning new replicas with pre-populated data, or duplicating a database for analytics workloads. To clone a volume, create a new PVC with a dataSource pointing to the existing PVC. The source and destination PVCs must be in the same namespace and must use the same StorageClass. The new PVC must request at least the same amount of storage as the source. Volume cloning is more efficient than copying data manually because most storage backends perform the clone at the storage layer using copy-on-write or similar mechanisms. The CSI driver must support the CLONE_VOLUME capability for this feature to work.',
            code: `# Clone from existing PVC
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: db-clone-for-testing
spec:
  accessModes:
  - ReadWriteOnce
  storageClassName: fast-ssd
  resources:
    requests:
      storage: 50Gi
  dataSource:
    name: postgres-data
    kind: PersistentVolumeClaim
---
# Use the cloned volume in a test Pod
apiVersion: v1
kind: Pod
metadata:
  name: db-test
spec:
  containers:
  - name: postgres
    image: postgres:16
    env:
    - name: PGDATA
      value: /var/lib/postgresql/data/pgdata
    volumeMounts:
    - name: data
      mountPath: /var/lib/postgresql/data
  volumes:
  - name: data
    persistentVolumeClaim:
      claimName: db-clone-for-testing`,
            warning: 'Volume clones must use the same StorageClass as the source PVC and must be in the same namespace. Cross-namespace cloning is not supported.',
          },
        ],
        challenge: {
          prompt:
            'Create a VolumeSnapshotClass and take a snapshot of an existing PVC named "app-data", then restore it to a new PVC.',
          starterCode: `# Step 1: Create a VolumeSnapshotClass
apiVersion: snapshot.storage.k8s.io/v1
kind: VolumeSnapshotClass
metadata:
  name: my-snapshot-class
# Complete the spec
---
# Step 2: Create a VolumeSnapshot of "app-data" PVC
# Complete this resource
---
# Step 3: Restore the snapshot to a new PVC
# Complete this resource`,
          solutionCode: `apiVersion: snapshot.storage.k8s.io/v1
kind: VolumeSnapshotClass
metadata:
  name: my-snapshot-class
driver: ebs.csi.aws.com
deletionPolicy: Retain
---
apiVersion: snapshot.storage.k8s.io/v1
kind: VolumeSnapshot
metadata:
  name: app-data-snapshot
spec:
  volumeSnapshotClassName: my-snapshot-class
  source:
    persistentVolumeClaimName: app-data
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: app-data-restored
spec:
  accessModes:
  - ReadWriteOnce
  storageClassName: fast-ssd
  resources:
    requests:
      storage: 20Gi
  dataSource:
    name: app-data-snapshot
    kind: VolumeSnapshot
    apiGroup: snapshot.storage.k8s.io`,
          hints: [
            'VolumeSnapshotClass needs a driver field matching your CSI driver',
            'VolumeSnapshot source references the PVC name with persistentVolumeClaimName',
            'Restore by creating a PVC with dataSource pointing to the VolumeSnapshot',
          ],
        },
      },
      {
        id: 'k8s-ephemeral-volumes',
        title: 'Ephemeral Volumes',
        difficulty: 'intermediate',
        tags: ['kubernetes', 'ephemeral', 'emptydir', 'csi-ephemeral', 'generic-ephemeral'],
        sections: [
          {
            heading: 'Types of Ephemeral Volumes',
            content:
              'Ephemeral volumes are designed for temporary storage that does not need to persist beyond the Pod lifecycle. Kubernetes supports several types of ephemeral volumes, each suited for different use cases. The most basic is emptyDir, which creates an empty directory on the node when the Pod starts and deletes it when the Pod terminates. Generic ephemeral volumes use the same provisioning infrastructure as PersistentVolumeClaims but are owned by the Pod, so they are automatically deleted when the Pod is removed. CSI ephemeral volumes are provided directly by CSI drivers and are useful for injecting node-specific data like certificates or encryption keys. ConfigMap and Secret volumes are also ephemeral, mounting their data as read-only files. Each type offers different capabilities: emptyDir is simplest but limited to local storage, generic ephemeral volumes support any StorageClass provisioner, and CSI ephemeral volumes provide vendor-specific functionality.',
            code: `# emptyDir with memory backing
apiVersion: v1
kind: Pod
metadata:
  name: ephemeral-demo
spec:
  containers:
  - name: app
    image: myapp:v1
    volumeMounts:
    - name: cache
      mountPath: /cache
    - name: tmp
      mountPath: /tmp
  volumes:
  - name: cache
    emptyDir:
      sizeLimit: 500Mi
  - name: tmp
    emptyDir:
      medium: Memory
      sizeLimit: 100Mi`,
            note: 'Memory-backed emptyDir volumes count against the container memory limit. If the volume exceeds sizeLimit, the Pod is evicted.',
          },
          {
            heading: 'Generic Ephemeral Volumes',
            content:
              'Generic ephemeral volumes combine the flexibility of PersistentVolumeClaims with ephemeral lifecycle semantics. They are defined inline in the Pod spec using the ephemeral volume source, which contains a PVC template. When the Pod is created, Kubernetes automatically creates a PVC from the template, and the PVC is bound to a dynamically provisioned PV. When the Pod is deleted, the PVC (and its PV) are automatically cleaned up. This is powerful because it allows ephemeral workloads to use any storage backend that has a StorageClass, including high-performance SSDs, network-attached storage, or cloud block storage. Generic ephemeral volumes are ideal for batch jobs that need fast scratch space, CI/CD pipelines that need large temporary storage, and data processing workloads that need high-IOPS temporary volumes that exceed what emptyDir can provide on the node.',
            code: `apiVersion: v1
kind: Pod
metadata:
  name: generic-ephemeral-demo
spec:
  containers:
  - name: data-processor
    image: spark-worker:v3
    volumeMounts:
    - name: scratch
      mountPath: /scratch
  volumes:
  - name: scratch
    ephemeral:
      volumeClaimTemplate:
        metadata:
          labels:
            type: ephemeral-scratch
        spec:
          accessModes:
          - ReadWriteOnce
          storageClassName: fast-ssd
          resources:
            requests:
              storage: 100Gi
---
# Batch job with ephemeral high-IOPS volume
apiVersion: batch/v1
kind: Job
metadata:
  name: ml-training
spec:
  template:
    spec:
      restartPolicy: Never
      containers:
      - name: trainer
        image: ml-trainer:v2
        volumeMounts:
        - name: training-data
          mountPath: /data
      volumes:
      - name: training-data
        ephemeral:
          volumeClaimTemplate:
            spec:
              accessModes: ["ReadWriteOnce"]
              storageClassName: high-iops
              resources:
                requests:
                  storage: 500Gi`,
            tip: 'Generic ephemeral volumes automatically generate PVC names in the format pod-name-volume-name. Check PVC list to debug provisioning issues.',
          },
          {
            heading: 'CSI Ephemeral Volumes',
            content:
              'CSI ephemeral volumes are provided directly by CSI drivers without going through the PVC provisioning process. They are defined inline in the Pod spec using the csi volume source with a driver name and optional volumeAttributes. The CSI driver receives the volume request directly and provides the volume content. This mechanism is used by specialized CSI drivers that inject node-specific or cluster-specific data into Pods. Common examples include the Secrets Store CSI driver which mounts external secrets from providers like HashiCorp Vault, AWS Secrets Manager, or Azure Key Vault as files. Another example is the cert-manager CSI driver which provides TLS certificates directly as volume mounts. CSI ephemeral volumes are lightweight because they bypass the full PV/PVC lifecycle, but they are limited to what the specific CSI driver supports and do not support features like snapshots or resizing.',
            code: `# Secrets Store CSI driver - mount Vault secrets
apiVersion: v1
kind: Pod
metadata:
  name: csi-ephemeral-demo
spec:
  serviceAccountName: app-sa
  containers:
  - name: app
    image: myapp:v1
    volumeMounts:
    - name: secrets
      mountPath: /mnt/secrets
      readOnly: true
  volumes:
  - name: secrets
    csi:
      driver: secrets-store.csi.k8s.io
      readOnly: true
      volumeAttributes:
        secretProviderClass: vault-secrets
---
# SecretProviderClass for Vault
apiVersion: secrets-store.csi.x-k8s.io/v1
kind: SecretProviderClass
metadata:
  name: vault-secrets
spec:
  provider: vault
  parameters:
    vaultAddress: "https://vault.example.com:8200"
    roleName: "app-role"
    objects: |
      - objectName: "db-password"
        secretPath: "secret/data/myapp"
        secretKey: "password"`,
            warning: 'CSI ephemeral volumes require the CSI driver to be installed and properly configured on the cluster. The Pod will fail to start if the driver is not available.',
          },
        ],
        quiz: [
          {
            question: 'What happens to a generic ephemeral volume when the Pod is deleted?',
            options: [
              'The volume persists and can be reused',
              'The PVC and PV are automatically deleted',
              'Only the PVC is deleted, the PV is retained',
              'The volume data is moved to a backup',
            ],
            correctIndex: 1,
            explanation:
              'Generic ephemeral volumes are owned by the Pod. When the Pod is deleted, the automatically created PVC and its PV are cleaned up.',
          },
          {
            question: 'What is a common use case for CSI ephemeral volumes?',
            options: [
              'Long-term data storage',
              'Database persistence',
              'Mounting external secrets from Vault',
              'Cross-Pod data sharing',
            ],
            correctIndex: 2,
            explanation:
              'CSI ephemeral volumes are commonly used with the Secrets Store CSI driver to mount secrets from external providers like HashiCorp Vault, AWS Secrets Manager, or Azure Key Vault.',
          },
          {
            question: 'What counts against container memory limits when using emptyDir?',
            options: [
              'All emptyDir volumes',
              'Only emptyDir volumes with sizeLimit',
              'Only emptyDir volumes with medium: Memory',
              'emptyDir volumes never count against memory limits',
            ],
            correctIndex: 2,
            explanation:
              'Memory-backed emptyDir volumes (medium: Memory) count against the container memory limit. Disk-backed emptyDir volumes do not count against memory limits.',
          },
        ],
      },
      {
        id: 'k8s-volume-snapshots',
        title: 'Volume Snapshots',
        difficulty: 'advanced',
        tags: ['kubernetes', 'snapshots', 'backup', 'restore', 'volumesnapshotclass'],
        sections: [
          {
            heading: 'VolumeSnapshot Architecture',
            content:
              'Kubernetes Volume Snapshots provide a standardized way to create point-in-time copies of persistent volumes. The snapshot feature follows the same pattern as PV/PVC: VolumeSnapshotContent is the cluster-level resource representing the actual snapshot (like PV), VolumeSnapshot is the namespace-scoped user request (like PVC), and VolumeSnapshotClass defines the snapshot provider and parameters (like StorageClass). The snapshot controller watches for VolumeSnapshot objects and coordinates with the CSI driver to create snapshots on the storage backend. Snapshots are typically incremental, meaning the storage system only stores blocks that changed since the last snapshot, making them space-efficient. The snapshot feature requires the snapshot controller deployment, the snapshot CRDs (Custom Resource Definitions), and a CSI driver that supports the CREATE_DELETE_SNAPSHOT capability. Most cloud CSI drivers support snapshots, including AWS EBS, Google PD, and Azure Disk.',
            code: `# Install snapshot CRDs (cluster admin)
# kubectl apply -f https://raw.githubusercontent.com/kubernetes-csi/external-snapshotter/v7.0.0/client/config/crd/snapshot.storage.k8s.io_volumesnapshotclasses.yaml
# kubectl apply -f https://raw.githubusercontent.com/kubernetes-csi/external-snapshotter/v7.0.0/client/config/crd/snapshot.storage.k8s.io_volumesnapshots.yaml
# kubectl apply -f https://raw.githubusercontent.com/kubernetes-csi/external-snapshotter/v7.0.0/client/config/crd/snapshot.storage.k8s.io_volumesnapshotcontents.yaml

# VolumeSnapshotClass
apiVersion: snapshot.storage.k8s.io/v1
kind: VolumeSnapshotClass
metadata:
  name: csi-ebs-snapclass
  annotations:
    snapshot.storage.kubernetes.io/is-default-class: "true"
driver: ebs.csi.aws.com
deletionPolicy: Retain
parameters:
  tagSpecification_1: "Environment=production"
  tagSpecification_2: "ManagedBy=kubernetes"`,
            note: 'The snapshot controller and CRDs must be installed separately. They are not included in default Kubernetes installations. Check your cluster distribution documentation for installation instructions.',
          },
          {
            heading: 'Creating and Managing Snapshots',
            content:
              'Creating a volume snapshot is straightforward: define a VolumeSnapshot resource that references the source PVC and a VolumeSnapshotClass. The snapshot controller creates a VolumeSnapshotContent object and triggers the CSI driver to take the snapshot. You can monitor the snapshot status through the VolumeSnapshot status field, which shows readyToUse: true when the snapshot is complete. Snapshots can be scheduled using CronJobs or dedicated backup tools like Velero. For database workloads, you should ensure the database is in a consistent state before taking a snapshot. Some databases support consistent snapshots through freeze/thaw mechanisms, while others require quiescing writes. You can use pre-snapshot hooks to flush database buffers and create a consistent snapshot point. The deletionPolicy on VolumeSnapshotClass controls what happens when a VolumeSnapshot is deleted: Delete removes the underlying storage snapshot, while Retain keeps the storage snapshot for manual management.',
            code: `# Create a snapshot
apiVersion: snapshot.storage.k8s.io/v1
kind: VolumeSnapshot
metadata:
  name: daily-backup-20240115
  labels:
    backup-type: daily
    app: postgres
spec:
  volumeSnapshotClassName: csi-ebs-snapclass
  source:
    persistentVolumeClaimName: postgres-data
---
# CronJob for scheduled snapshots
apiVersion: batch/v1
kind: CronJob
metadata:
  name: snapshot-scheduler
spec:
  schedule: "0 2 * * *"
  jobTemplate:
    spec:
      template:
        spec:
          serviceAccountName: snapshot-admin
          restartPolicy: OnFailure
          containers:
          - name: snapshot-creator
            image: bitnami/kubectl:1.28
            command:
            - /bin/sh
            - -c
            - |
              DATE=$(date +%Y%m%d)
              kubectl apply -f - <<SNAP
              apiVersion: snapshot.storage.k8s.io/v1
              kind: VolumeSnapshot
              metadata:
                name: db-snapshot-$DATE
              spec:
                volumeSnapshotClassName: csi-ebs-snapclass
                source:
                  persistentVolumeClaimName: postgres-data
              SNAP`,
            tip: 'Label your snapshots with metadata like date, source PVC, and backup type. This makes it easy to find and manage snapshots when you need to restore.',
          },
          {
            heading: 'Restoring and Backup Strategies',
            content:
              'Restoring from a snapshot creates a new PersistentVolumeClaim pre-populated with the snapshot data. The new PVC is specified with a dataSource field pointing to the VolumeSnapshot. The CSI driver creates a new volume from the snapshot, which may be a full copy or a copy-on-write clone depending on the storage backend. Restoring is useful for disaster recovery, creating test environments from production data, and rolling back to a known good state. For a comprehensive backup strategy, combine snapshots with cross-region replication. Take regular snapshots locally for fast restore, and periodically copy snapshots to another region for disaster recovery. Implement snapshot rotation to manage costs by deleting old snapshots. Retention policies might keep daily snapshots for 7 days, weekly snapshots for 4 weeks, and monthly snapshots for 12 months. Always test your restore process regularly to ensure snapshots are usable and the restored data is consistent.',
            code: `# List all snapshots
kubectl get volumesnapshot

# Check snapshot status
kubectl get volumesnapshot daily-backup-20240115 -o jsonpath='{.status.readyToUse}'

# Describe snapshot for details
kubectl describe volumesnapshot daily-backup-20240115

# List snapshot contents
kubectl get volumesnapshotcontent

# Delete old snapshots (rotation)
kubectl get volumesnapshot -l backup-type=daily --sort-by=.metadata.creationTimestamp \
  -o jsonpath='{range .items[*]}{.metadata.name}{"\n"}{end}' | head -n -7 | xargs kubectl delete volumesnapshot

# Verify restored PVC is bound
kubectl get pvc postgres-data-restored -o jsonpath='{.status.phase}'`,
            warning: 'Always test your restore process before you need it. A snapshot that cannot be restored is worthless as a backup.',
          },
        ],
        quiz: [
          {
            question: 'What is the relationship between VolumeSnapshot and VolumeSnapshotContent?',
            options: [
              'They are the same resource',
              'VolumeSnapshot is the user request, VolumeSnapshotContent is the actual snapshot',
              'VolumeSnapshotContent is a namespace resource',
              'VolumeSnapshot directly stores the data',
            ],
            correctIndex: 1,
            explanation:
              'VolumeSnapshot is a namespace-scoped user request (like PVC), while VolumeSnapshotContent is the cluster-scoped resource representing the actual snapshot on the storage backend (like PV).',
          },
          {
            question: 'What does Retain deletionPolicy on VolumeSnapshotClass mean?',
            options: [
              'The VolumeSnapshot object is retained',
              'The underlying storage snapshot is kept when VolumeSnapshot is deleted',
              'The source PVC data is retained',
              'The Pod is retained during snapshot',
            ],
            correctIndex: 1,
            explanation:
              'With Retain policy, deleting a VolumeSnapshot does not delete the underlying storage snapshot. The VolumeSnapshotContent and the storage-level snapshot must be manually cleaned up.',
          },
          {
            question: 'How do you restore data from a VolumeSnapshot?',
            options: [
              'Use kubectl restore command',
              'Mount the VolumeSnapshot directly in a Pod',
              'Create a new PVC with dataSource referencing the VolumeSnapshot',
              'Copy data from the snapshot using SSH',
            ],
            correctIndex: 2,
            explanation:
              'To restore from a snapshot, create a new PVC with a dataSource field that references the VolumeSnapshot. The CSI driver provisions a new volume pre-populated with the snapshot data.',
          },
        ],
      },
      {
        id: 'k8s-storage-best-practices',
        title: 'Storage Best Practices',
        difficulty: 'advanced',
        tags: ['kubernetes', 'storage', 'best-practices', 'performance', 'migration', 'access-modes'],
        sections: [
          {
            heading: 'Choosing Access Modes and Storage Types',
            content:
              'Selecting the right access mode and storage type is crucial for application performance and reliability. For single-instance databases like PostgreSQL or MySQL, ReadWriteOnce (RWO) with high-IOPS block storage is the best choice. For distributed databases like Cassandra or CockroachDB, each replica should have its own RWO volume managed by a StatefulSet. For shared file storage needed by multiple Pods across nodes, use ReadWriteMany (RWX) with network file systems like NFS, Amazon EFS, or Azure Files. However, RWX volumes typically have higher latency than block storage, so avoid them for latency-sensitive workloads. For scenarios where only one specific Pod should access a volume, ReadWriteOncePod (RWOP) provides the strongest isolation. Always use WaitForFirstConsumer binding mode to avoid topology mismatches. Match your storage performance tier to your workload requirements: use standard SSD for general workloads, provisioned IOPS for databases, and throughput-optimized storage for sequential read/write workloads.',
            code: `# StatefulSet with per-replica storage
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgres
spec:
  serviceName: postgres
  replicas: 3
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
      - name: postgres
        image: postgres:16
        volumeMounts:
        - name: data
          mountPath: /var/lib/postgresql/data
        resources:
          requests:
            cpu: "500m"
            memory: "1Gi"
  volumeClaimTemplates:
  - metadata:
      name: data
    spec:
      accessModes: ["ReadWriteOnce"]
      storageClassName: high-iops
      resources:
        requests:
          storage: 100Gi`,
            tip: 'Use volumeClaimTemplates in StatefulSets for per-replica storage. Each replica gets its own PVC, ensuring data isolation and independent lifecycle.',
          },
          {
            heading: 'Performance Optimization',
            content:
              'Storage performance in Kubernetes depends on several factors: the underlying storage technology, the file system type, the volume access pattern, and the Pod resource configuration. For high-performance workloads, use provisioned IOPS storage classes like io2 or io2 Block Express on AWS. Ensure your file system matches your workload: ext4 is a good general-purpose choice, while XFS performs better for large files and parallel I/O. Avoid using network file systems for latency-sensitive operations. When possible, use local SSDs or NVMe storage for caching and temporary data. Monitor storage performance using Prometheus metrics from the kubelet and CSI drivers. Key metrics include volume IOPS, throughput, latency, and queue depth. Set appropriate resource requests and limits for Pods that perform heavy I/O to prevent noisy neighbor issues. Consider using separate StorageClasses for different performance tiers, so developers can choose the right storage for their workload without needing to understand the underlying infrastructure.',
            code: `# High-performance StorageClass with tuned parameters
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: ultra-fast
provisioner: ebs.csi.aws.com
parameters:
  type: io2
  iops: "64000"
  encrypted: "true"
  fsType: xfs
reclaimPolicy: Retain
allowVolumeExpansion: true
volumeBindingMode: WaitForFirstConsumer
---
# Local SSD StorageClass for caching
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: local-ssd
provisioner: kubernetes.io/no-provisioner
volumeBindingMode: WaitForFirstConsumer
---
# Local PV for NVMe storage
apiVersion: v1
kind: PersistentVolume
metadata:
  name: local-nvme-node1
spec:
  capacity:
    storage: 1Ti
  accessModes:
  - ReadWriteOnce
  storageClassName: local-ssd
  local:
    path: /mnt/nvme0
  nodeAffinity:
    required:
      nodeSelectorTerms:
      - matchExpressions:
        - key: kubernetes.io/hostname
          operator: In
          values:
          - worker-node-1`,
            warning: 'Local volumes are tied to a specific node. If the node fails, the data is lost. Only use local volumes for caching or workloads that replicate data at the application level.',
          },
          {
            heading: 'Data Migration and Lifecycle Management',
            content:
              'Data migration between storage classes or clusters requires careful planning. The simplest approach is application-level migration: stop the application, copy data from the old volume to a new volume using a Job with both PVCs mounted, then update the workload to use the new PVC. For zero-downtime migration, use the application replication mechanism: add a new replica pointing to the new storage, let it sync data, then remove the old replica. Volume snapshots can also facilitate migration by creating a snapshot and restoring it to a PVC with a different StorageClass. For cross-cluster migration, use backup tools like Velero that can snapshot volumes, store them in object storage, and restore them in a different cluster. Implement lifecycle management by monitoring PVC usage and setting alerts for volumes approaching capacity. Use ResourceQuotas to prevent teams from over-provisioning storage. Regularly audit unused PVCs and clean up orphaned volumes to reduce costs.',
            code: `# Data migration Job
apiVersion: batch/v1
kind: Job
metadata:
  name: storage-migration
spec:
  template:
    spec:
      restartPolicy: Never
      containers:
      - name: migrate
        image: alpine:3.19
        command:
        - /bin/sh
        - -c
        - |
          echo "Starting migration..."
          cp -av /source/* /destination/
          echo "Migration complete. Verifying..."
          diff -r /source /destination
          echo "Verification done."
        volumeMounts:
        - name: source
          mountPath: /source
          readOnly: true
        - name: destination
          mountPath: /destination
      volumes:
      - name: source
        persistentVolumeClaim:
          claimName: old-pvc
      - name: destination
        persistentVolumeClaim:
          claimName: new-pvc
---
# ResourceQuota for storage
apiVersion: v1
kind: ResourceQuota
metadata:
  name: storage-quota
  namespace: production
spec:
  hard:
    requests.storage: "500Gi"
    persistentvolumeclaims: "20"
    fast-ssd.storageclass.storage.k8s.io/requests.storage: "200Gi"`,
            note: 'Velero supports both file-level backups (using Restic/Kopia) and volume snapshots. File-level backups work with any storage type but are slower for large volumes.',
          },
        ],
        challenge: {
          prompt:
            'Create a data migration Job that copies data from an old PVC (old-data) to a new PVC (new-data) and verifies the copy integrity.',
          starterCode: `apiVersion: batch/v1
kind: Job
metadata:
  name: data-migration-job
spec:
  template:
    spec:
      restartPolicy: Never
      containers:
      - name: migrator
        image: alpine:3.19
        # Add the migration command and volume mounts`,
          solutionCode: `apiVersion: batch/v1
kind: Job
metadata:
  name: data-migration-job
spec:
  backoffLimit: 2
  template:
    spec:
      restartPolicy: Never
      containers:
      - name: migrator
        image: alpine:3.19
        command:
        - /bin/sh
        - -c
        - |
          echo "Starting data migration..."
          cp -av /source/* /destination/
          echo "Calculating checksums..."
          cd /source && find . -type f -exec md5sum {} \\; | sort > /tmp/source.md5
          cd /destination && find . -type f -exec md5sum {} \\; | sort > /tmp/dest.md5
          if diff /tmp/source.md5 /tmp/dest.md5; then
            echo "Migration verified successfully!"
          else
            echo "Verification FAILED!"
            exit 1
          fi
        volumeMounts:
        - name: source
          mountPath: /source
          readOnly: true
        - name: destination
          mountPath: /destination
      volumes:
      - name: source
        persistentVolumeClaim:
          claimName: old-data
      - name: destination
        persistentVolumeClaim:
          claimName: new-data`,
          hints: [
            'Mount the source PVC as readOnly to prevent accidental modifications',
            'Use cp -av to preserve file attributes and show progress',
            'Verify integrity with checksums using md5sum or sha256sum',
            'Exit with code 1 on verification failure so the Job reports failure',
          ],
        },
      },
    ],
  },
];
