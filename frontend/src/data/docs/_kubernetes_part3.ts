import type { DocCategory } from './types';

export const K8S_PART3_CATEGORIES: DocCategory[] = [
  {
    id: 'k8s-networking',
    label: 'Networking',
    icon: '🌐',
    entries: [
      {
        id: 'k8s-networking-model',
        title: 'Kubernetes Networking Model',
        difficulty: 'intermediate',
        tags: ['kubernetes', 'networking', 'pods', 'flat-network', 'CNI', 'cluster'],
        sections: [
          {
            heading: 'The Flat Network Model',
            content:
              'Kubernetes implements a flat networking model where every Pod gets its own unique IP address within the cluster. This means that all Pods can communicate with each other directly without the need for Network Address Translation (NAT). The fundamental requirements of the Kubernetes networking model are straightforward but powerful: every Pod can communicate with every other Pod across nodes, agents on a node can communicate with all Pods on that node, and Pods in the host network of a node can reach all Pods on all nodes. This flat structure eliminates the complexity of port mapping that plagues traditional container networking. Container Network Interface (CNI) plugins such as Calico, Flannel, Cilium, and Weave Net implement these requirements using various strategies including overlay networks, BGP routing, and eBPF-based data planes. The choice of CNI plugin significantly affects performance, security capabilities, and operational complexity of your cluster.',
            code: `# Check the CNI plugin installed in the cluster
kubectl get pods -n kube-system | grep -E 'calico|flannel|cilium|weave'

# View pod IP addresses across the cluster
kubectl get pods -o wide --all-namespaces

# Verify pod-to-pod connectivity
kubectl exec -it pod-a -- ping <pod-b-ip>

# Inspect CNI configuration on a node
ls /etc/cni/net.d/
cat /etc/cni/net.d/10-calico.conflist`,
            tip: 'Use Cilium with eBPF for high-performance networking. It bypasses iptables entirely and provides deep visibility into network traffic with Hubble.',
          },
          {
            heading: 'Pod-to-Pod Communication',
            content:
              'Pod-to-pod communication is the backbone of Kubernetes networking. When a Pod sends traffic to another Pod on the same node, the packets traverse through a virtual ethernet bridge (typically cbr0 or cni0) without leaving the host. For cross-node communication, the CNI plugin must ensure that packets are routed correctly between nodes. Overlay networks like VXLAN encapsulate Pod traffic inside UDP packets, adding a small overhead but simplifying network configuration. Direct routing approaches like BGP peering advertise Pod CIDR ranges to the underlying network infrastructure, providing better performance at the cost of requiring cooperation from the network team. Each node is assigned a Pod CIDR range from the cluster CIDR block, and the CNI plugin manages IP address allocation within that range. Understanding these networking fundamentals is critical for troubleshooting connectivity issues, optimizing performance, and designing network policies that secure your workloads effectively.',
            code: `# View the cluster CIDR configuration
kubectl cluster-info dump | grep -m 1 cluster-cidr

# Check node pod CIDR allocations
kubectl get nodes -o jsonpath='{range .items[*]}{.metadata.name}{": "}{.spec.podCIDR}{"\\n"}{end}'

# Trace network path between pods
kubectl exec -it debug-pod -- traceroute <target-pod-ip>

# Check bridge interfaces on a node
kubectl debug node/worker-1 -it --image=nicolaka/netshoot -- brctl show`,
            analogy: 'Think of the Kubernetes network like a large office building with a flat internal phone system. Every desk (Pod) has its own extension number (IP), and anyone can dial any extension directly without going through an operator (NAT). The phone wiring (CNI plugin) handles connecting floors (nodes) seamlessly.',
          },
          {
            heading: 'Pod-to-Service Communication',
            content:
              'While pod-to-pod communication uses direct IP addresses, Kubernetes Services provide a stable virtual IP (ClusterIP) that load-balances traffic across a set of Pods. When a Pod sends traffic to a Service ClusterIP, kube-proxy intercepts the packet and rewrites the destination to one of the backend Pod IPs. This happens transparently using either iptables rules, IPVS virtual servers, or eBPF programs depending on the kube-proxy mode. Services decouple consumers from producers, allowing Pods to be created and destroyed without affecting clients. The Service abstraction also integrates with CoreDNS to provide DNS-based service discovery. Every Service gets a DNS entry in the format service-name.namespace.svc.cluster.local that resolves to the ClusterIP. Headless Services (those with clusterIP set to None) return the individual Pod IPs instead, which is useful for stateful applications that need to address specific instances. Understanding how packets flow from Pod to Service to backend Pod is essential for debugging latency issues and connection failures.',
            code: `# Create a ClusterIP service
kubectl expose deployment nginx --port=80 --target-port=8080

# View iptables rules for a service
sudo iptables -t nat -L KUBE-SERVICES -n | grep my-service

# Check endpoints for a service
kubectl get endpoints my-service

# DNS lookup from within a pod
kubectl exec -it busybox -- nslookup my-service.default.svc.cluster.local`,
            note: 'ClusterIP is only reachable from within the cluster. If you need external access, use NodePort, LoadBalancer, or Ingress resources.',
          },
        ],
        diagram: {
          kind: 'mermaid' as const,
          code: `graph TB
    subgraph Node1["Node 1 (10.0.1.0/24)"]
        PA[Pod A<br/>10.0.1.2] --> Bridge1[cbr0 Bridge]
        PB[Pod B<br/>10.0.1.3] --> Bridge1
    end
    subgraph Node2["Node 2 (10.0.2.0/24)"]
        PC[Pod C<br/>10.0.2.2] --> Bridge2[cbr0 Bridge]
        PD[Pod D<br/>10.0.2.3] --> Bridge2
    end
    Bridge1 <-->|CNI Plugin<br/>Overlay/BGP| Bridge2
    SVC[Service ClusterIP<br/>10.96.0.10] -->|kube-proxy| PA
    SVC -->|kube-proxy| PC
    DNS[CoreDNS] -->|Resolves| SVC`,
          caption: 'Kubernetes flat networking model showing pod-to-pod and pod-to-service communication across nodes',
        },
        quiz: [
          {
            question: 'What is a fundamental requirement of the Kubernetes networking model?',
            options: [
              'All Pods must use NAT to communicate across nodes',
              'Every Pod can communicate with every other Pod without NAT',
              'Pods on different nodes must use NodePort services',
              'Only Pods in the same namespace can communicate directly',
            ],
            correctIndex: 1,
            explanation:
              'The Kubernetes networking model requires that all Pods can communicate with all other Pods across nodes without NAT. Each Pod gets a unique IP address in the flat network.',
          },
          {
            question: 'What is the role of a CNI plugin in Kubernetes?',
            options: [
              'It manages container images and registries',
              'It implements the networking model and manages Pod IP allocation',
              'It handles authentication between Pods',
              'It schedules Pods to appropriate nodes',
            ],
            correctIndex: 1,
            explanation:
              'CNI (Container Network Interface) plugins implement the Kubernetes networking model by managing Pod IP allocation, configuring network interfaces, and ensuring connectivity between Pods across nodes.',
          },
          {
            question: 'How does a headless Service differ from a standard ClusterIP Service?',
            options: [
              'It does not have any endpoints',
              'It sets clusterIP to None and returns individual Pod IPs in DNS',
              'It only works with StatefulSets',
              'It bypasses kube-proxy entirely for all traffic',
            ],
            correctIndex: 1,
            explanation:
              'A headless Service sets clusterIP to None, which causes DNS queries to return the IP addresses of individual backing Pods rather than a single virtual IP. This is useful for stateful workloads needing direct Pod addressing.',
          },
        ],
      },
      {
        id: 'k8s-services-deep',
        title: 'Services Deep Dive',
        difficulty: 'advanced',
        tags: ['kubernetes', 'services', 'kube-proxy', 'iptables', 'IPVS', 'session-affinity'],
        sections: [
          {
            heading: 'iptables vs IPVS Mode',
            content:
              'Kube-proxy is the component responsible for implementing the Service abstraction in Kubernetes. It watches the API server for Service and Endpoint changes and configures the underlying packet forwarding mechanism. In iptables mode, kube-proxy programs iptables rules in the NAT table to intercept traffic destined for Service ClusterIPs and redirect it to one of the backend Pods. While iptables mode is simple and reliable, it has significant scalability limitations: every Service and endpoint adds rules to a chain that must be traversed linearly, resulting in O(n) lookup time. For clusters with thousands of Services, this can cause noticeable latency. IPVS mode addresses this by using the Linux IP Virtual Server subsystem, which is specifically designed for load balancing. IPVS uses hash tables for O(1) lookup time and supports multiple load balancing algorithms including round-robin, least connections, destination hashing, and source hashing. Switching to IPVS mode can dramatically improve performance in large clusters.',
            code: `# Check current kube-proxy mode
kubectl get configmap kube-proxy -n kube-system -o yaml | grep mode

# Switch kube-proxy to IPVS mode
kubectl edit configmap kube-proxy -n kube-system
# Set mode: "ipvs"

# Restart kube-proxy to apply changes
kubectl rollout restart daemonset kube-proxy -n kube-system

# Verify IPVS rules
kubectl exec -it kube-proxy-xxxx -n kube-system -- ipvsadm -Ln

# View iptables rules for a specific service
sudo iptables -t nat -L KUBE-SVC-XXXX -n --line-numbers`,
            warning: 'Before switching to IPVS mode, ensure that the IPVS kernel modules (ip_vs, ip_vs_rr, ip_vs_wrr, ip_vs_sh, nf_conntrack) are loaded on all nodes. Missing modules will cause kube-proxy to fall back to iptables silently.',
          },
          {
            heading: 'kube-proxy Internals and Connection Tracking',
            content:
              'Understanding kube-proxy internals is essential for debugging complex networking issues. When a connection is established to a Service ClusterIP, kube-proxy (via iptables or IPVS) performs DNAT to rewrite the destination address to a selected backend Pod IP. The Linux conntrack subsystem tracks these translations so that return packets are correctly reverse-NATed back to the original ClusterIP. Problems arise when the conntrack table fills up, causing connection drops and timeouts. In high-traffic clusters, you may need to increase the nf_conntrack_max kernel parameter. Another common issue is conntrack race conditions during UDP communication, where simultaneous connections from multiple Pods to the same Service can result in packets being sent to the wrong backend. Kube-proxy also maintains its own internal state that can become stale if the API server connection is interrupted. Monitoring kube-proxy metrics (available on port 10249 by default) helps detect issues like sync failures, rule programming latency, and conntrack table utilization before they impact application traffic.',
            code: `# Check conntrack table size and current usage
sysctl net.netfilter.nf_conntrack_max
sysctl net.netfilter.nf_conntrack_count

# Increase conntrack table size
sysctl -w net.netfilter.nf_conntrack_max=262144

# View conntrack entries for a service
conntrack -L -d 10.96.0.10

# Monitor kube-proxy metrics
curl http://localhost:10249/metrics | grep kubeproxy

# Check for conntrack table full errors
dmesg | grep conntrack`,
            tip: 'For UDP-heavy workloads, consider using IPVS mode with source hashing to ensure consistent backend selection and avoid conntrack race conditions.',
          },
          {
            heading: 'Session Affinity and Service Configuration',
            content:
              'Session affinity in Kubernetes Services ensures that requests from the same client are consistently routed to the same backend Pod. This is configured using the sessionAffinity field set to ClientIP, which uses the source IP address to determine the backend selection. The sessionAffinityConfig allows you to set a timeout (default 10800 seconds, or 3 hours) after which the affinity expires. Session affinity is crucial for stateful applications that store session data in memory, legacy applications not designed for distributed environments, and WebSocket connections that must maintain persistent backends. However, relying on session affinity can lead to uneven load distribution, especially when traffic comes through a shared proxy or NAT gateway. In such cases, all requests appear to originate from the same IP and are pinned to a single Pod. For production applications, consider using external session stores like Redis instead of relying on session affinity. ExternalTrafficPolicy is another important Service configuration that controls how external traffic is routed: setting it to Local preserves the client source IP but may cause uneven distribution, while Cluster distributes evenly but masks the original client IP through SNAT.',
            code: `# Service with session affinity
apiVersion: v1
kind: Service
metadata:
  name: my-app
spec:
  selector:
    app: my-app
  ports:
    - port: 80
      targetPort: 8080
  sessionAffinity: ClientIP
  sessionAffinityConfig:
    clientIP:
      timeoutSeconds: 3600
  externalTrafficPolicy: Local
  type: LoadBalancer`,
            note: 'When externalTrafficPolicy is set to Local, traffic is only sent to Pods on the node that received the request. Nodes without matching Pods will fail health checks and be removed from the load balancer, ensuring no extra hop.',
          },
        ],
        quiz: [
          {
            question: 'Why is IPVS mode preferred over iptables mode for large clusters?',
            options: [
              'IPVS supports more Service types',
              'IPVS uses hash tables for O(1) lookup vs iptables linear O(n) chain traversal',
              'IPVS does not require kernel modules',
              'IPVS automatically scales the conntrack table',
            ],
            correctIndex: 1,
            explanation:
              'IPVS uses hash tables for O(1) lookup time, whereas iptables rules are traversed linearly in chains, resulting in O(n) complexity. This makes IPVS significantly faster for clusters with thousands of Services.',
          },
          {
            question: 'What happens when the conntrack table is full?',
            options: [
              'New connections are queued until space is available',
              'Kube-proxy automatically increases the table size',
              'New connections may be dropped, causing timeouts',
              'Traffic falls back to direct Pod-to-Pod routing',
            ],
            correctIndex: 2,
            explanation:
              'When the conntrack table is full, the kernel cannot track new connections, leading to packet drops and connection timeouts. Monitoring and increasing nf_conntrack_max is essential for high-traffic clusters.',
          },
          {
            question: 'What does externalTrafficPolicy: Local do?',
            options: [
              'Routes external traffic only to Pods on the receiving node, preserving client IP',
              'Encrypts external traffic before routing to Pods',
              'Restricts traffic to the local namespace only',
              'Disables load balancing for external connections',
            ],
            correctIndex: 0,
            explanation:
              'Setting externalTrafficPolicy to Local ensures traffic is only sent to Pods running on the node that received the external request. This preserves the client source IP but may cause uneven distribution.',
          },
        ],
      },
      {
        id: 'k8s-ingress',
        title: 'Ingress',
        difficulty: 'intermediate',
        tags: ['kubernetes', 'ingress', 'TLS', 'routing', 'HTTP', 'paths'],
        sections: [
          {
            heading: 'Ingress Rules, Hosts, and Paths',
            content:
              'An Ingress resource in Kubernetes defines rules for routing external HTTP and HTTPS traffic to internal Services. Each Ingress rule specifies a host (domain name), one or more paths, and the backend Service to route matching requests to. Host-based routing allows a single Ingress controller to serve multiple domains, while path-based routing enables different URL paths to be served by different Services. Path types control matching behavior: Exact requires a precise match, Prefix matches URL path prefixes, and ImplementationSpecific delegates the interpretation to the Ingress controller. When multiple rules match a request, the longest matching path takes precedence, and if paths are equal, the most specific host wins. A default backend can be specified to handle requests that do not match any rule, acting as a catch-all for unmatched traffic. Ingress resources are purely declarative and require an Ingress controller to actually implement the routing logic. Without a running controller, Ingress resources have no effect on cluster networking.',
            code: `# Multi-host, multi-path Ingress
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: app-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  ingressClassName: nginx
  rules:
    - host: app.example.com
      http:
        paths:
          - path: /api
            pathType: Prefix
            backend:
              service:
                name: api-service
                port:
                  number: 80
          - path: /
            pathType: Prefix
            backend:
              service:
                name: frontend-service
                port:
                  number: 80
    - host: admin.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: admin-service
                port:
                  number: 80
  defaultBackend:
    service:
      name: default-service
      port:
        number: 80`,
            tip: 'Always set ingressClassName explicitly to avoid ambiguity when multiple Ingress controllers are deployed in the same cluster. Relying on a default class can lead to unexpected routing behavior.',
          },
          {
            heading: 'TLS Termination',
            content:
              'Ingress resources support TLS termination, allowing HTTPS traffic to be decrypted at the Ingress controller before being forwarded to backend Services as plain HTTP. TLS configuration requires creating a Kubernetes Secret of type kubernetes.io/tls containing the certificate and private key, then referencing it in the Ingress spec. Each TLS entry can specify one or more hostnames that the certificate covers, supporting both single-domain and wildcard certificates. For production environments, cert-manager is the standard tool for automating certificate issuance and renewal from Let\'s Encrypt or other certificate authorities. Cert-manager watches Ingress resources with specific annotations and automatically creates and manages Certificate resources, storing the resulting TLS certificates in Kubernetes Secrets. You can also configure TLS passthrough, where the Ingress controller forwards encrypted traffic directly to the backend without terminating TLS, which is necessary when the backend application needs to handle its own TLS or when using mutual TLS (mTLS) between client and server. TLS configuration is critical for compliance requirements and protecting sensitive data in transit.',
            code: `# Create a TLS secret
kubectl create secret tls app-tls \\
  --cert=tls.crt \\
  --key=tls.key

# Ingress with TLS
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: tls-ingress
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  ingressClassName: nginx
  tls:
    - hosts:
        - app.example.com
        - "*.example.com"
      secretName: app-tls
  rules:
    - host: app.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: app-service
                port:
                  number: 80`,
            warning: 'Never commit TLS private keys to version control. Use sealed-secrets, external-secrets, or a secrets management tool to securely deliver TLS Secrets to your cluster.',
          },
          {
            heading: 'Ingress Classes and Advanced Configuration',
            content:
              'Ingress classes allow multiple Ingress controllers to coexist in a single cluster, each handling different Ingress resources. The IngressClass resource specifies which controller should implement a given Ingress, and the ingressClassName field on the Ingress resource selects the appropriate class. One IngressClass can be marked as the default using the ingressclass.kubernetes.io/is-default-class annotation, which will be used when no class is explicitly specified. Advanced Ingress configuration is typically done through annotations that are specific to the Ingress controller being used. Common annotations include rate limiting, CORS configuration, custom headers, proxy buffer sizes, connection timeouts, and redirect rules. These annotations provide a powerful way to fine-tune routing behavior without modifying application code. For scenarios requiring more expressive routing than Ingress supports, such as header-based routing, traffic splitting, or request mirroring, the newer Gateway API is recommended as a more capable and portable alternative to the Ingress resource.',
            code: `# IngressClass resource
apiVersion: networking.k8s.io/v1
kind: IngressClass
metadata:
  name: nginx
  annotations:
    ingressclass.kubernetes.io/is-default-class: "true"
spec:
  controller: k8s.io/ingress-nginx

# Ingress with advanced annotations
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: advanced-ingress
  annotations:
    nginx.ingress.kubernetes.io/rate-limit: "10"
    nginx.ingress.kubernetes.io/rate-limit-window: "1m"
    nginx.ingress.kubernetes.io/cors-allow-origin: "https://app.example.com"
    nginx.ingress.kubernetes.io/proxy-body-size: "50m"
    nginx.ingress.kubernetes.io/proxy-read-timeout: "60"
spec:
  ingressClassName: nginx
  rules:
    - host: app.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: app-service
                port:
                  number: 80`,
            note: 'Annotations are controller-specific and not portable. If you switch Ingress controllers, you will need to update annotations accordingly. Gateway API aims to solve this portability problem.',
          },
        ],
        challenge: {
          prompt:
            'Create an Ingress resource that routes traffic for two domains: api.myapp.com (path /v1 to api-v1-svc on port 8080, path /v2 to api-v2-svc on port 8080) and web.myapp.com (path / to web-svc on port 3000). Include TLS for both domains using a secret named myapp-tls.',
          starterCode: `apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: myapp-ingress
spec:
  # Add your configuration here`,
          solutionCode: `apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: myapp-ingress
spec:
  ingressClassName: nginx
  tls:
    - hosts:
        - api.myapp.com
        - web.myapp.com
      secretName: myapp-tls
  rules:
    - host: api.myapp.com
      http:
        paths:
          - path: /v1
            pathType: Prefix
            backend:
              service:
                name: api-v1-svc
                port:
                  number: 8080
          - path: /v2
            pathType: Prefix
            backend:
              service:
                name: api-v2-svc
                port:
                  number: 8080
    - host: web.myapp.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: web-svc
                port:
                  number: 3000`,
          hints: [
            'Use the tls section to specify both hostnames and the secret name',
            'Each host gets its own rule entry with http.paths',
            'Remember to set pathType for each path entry',
          ],
        },
      },
      {
        id: 'k8s-ingress-controllers',
        title: 'Ingress Controllers',
        difficulty: 'intermediate',
        tags: ['kubernetes', 'ingress-controller', 'nginx', 'traefik', 'HAProxy', 'ALB'],
        sections: [
          {
            heading: 'NGINX Ingress Controller',
            content:
              'The NGINX Ingress Controller is the most widely deployed Ingress controller in the Kubernetes ecosystem. Maintained by the Kubernetes community, it uses NGINX as the reverse proxy and load balancer, dynamically generating NGINX configuration from Ingress resources. It supports a rich set of annotations for customizing behavior including rate limiting, authentication, URL rewriting, SSL redirect, proxy buffering, and WebSocket upgrades. The controller runs as a Deployment or DaemonSet within the cluster and exposes itself via a Service of type LoadBalancer or NodePort. Configuration changes are applied by regenerating the NGINX config and performing a graceful reload, which preserves existing connections. For advanced use cases, you can embed custom NGINX snippets using the server-snippet and configuration-snippet annotations, though this carries security risks and should be used carefully. The controller also provides Prometheus metrics for monitoring request rates, latency, and error percentages. When deploying in production, it is critical to configure appropriate resource requests and limits, enable access logging, and set up health checks to ensure reliable operation.',
            code: `# Install NGINX Ingress Controller via Helm
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update

helm install ingress-nginx ingress-nginx/ingress-nginx \\
  --namespace ingress-nginx \\
  --create-namespace \\
  --set controller.replicaCount=2 \\
  --set controller.resources.requests.cpu=100m \\
  --set controller.resources.requests.memory=128Mi \\
  --set controller.metrics.enabled=true

# Verify the controller is running
kubectl get pods -n ingress-nginx
kubectl get svc -n ingress-nginx`,
            tip: 'Deploy the NGINX Ingress Controller as a DaemonSet with hostNetwork: true in bare-metal environments for optimal performance, avoiding the extra hop through a NodePort or LoadBalancer service.',
          },
          {
            heading: 'Traefik and HAProxy Controllers',
            content:
              'Traefik is a modern Ingress controller that natively integrates with Kubernetes using both standard Ingress resources and its own IngressRoute custom resource definitions (CRDs). Traefik excels at automatic service discovery, built-in Let\'s Encrypt integration, middleware chains for request transformation, and a comprehensive dashboard for monitoring. It supports TCP, UDP, and gRPC routing out of the box, making it versatile for non-HTTP workloads. Traefik\'s middleware concept allows you to compose request processing pipelines with components like rate limiting, circuit breaking, authentication, compression, and header manipulation. HAProxy Ingress Controller, on the other hand, brings the battle-tested HAProxy load balancer to Kubernetes. Known for its exceptional performance and low resource consumption, HAProxy is ideal for latency-sensitive workloads. It supports advanced features like connection draining, backend health checking, stick tables for rate limiting, and detailed traffic statistics via the stats page. HAProxy also supports the HAProxy Runtime API for dynamic configuration changes without reloads, minimizing disruption during endpoint updates.',
            code: `# Install Traefik via Helm
helm repo add traefik https://traefik.github.io/charts
helm install traefik traefik/traefik \\
  --namespace traefik \\
  --create-namespace

# Traefik IngressRoute CRD
apiVersion: traefik.io/v1alpha1
kind: IngressRoute
metadata:
  name: my-app-route
spec:
  entryPoints:
    - websecure
  routes:
    - match: Host(\`app.example.com\`) && PathPrefix(\`/api\`)
      kind: Rule
      services:
        - name: api-service
          port: 80
      middlewares:
        - name: rate-limit
  tls:
    certResolver: letsencrypt

# Install HAProxy Ingress Controller
helm repo add haproxytech https://haproxytech.github.io/helm-charts
helm install haproxy haproxytech/kubernetes-ingress \\
  --namespace haproxy \\
  --create-namespace`,
            note: 'Traefik IngressRoute CRDs offer more routing flexibility than standard Ingress resources but reduce portability since they are Traefik-specific.',
          },
          {
            heading: 'AWS ALB Ingress Controller',
            content:
              'The AWS Load Balancer Controller (formerly ALB Ingress Controller) provisions AWS Application Load Balancers (ALB) and Network Load Balancers (NLB) in response to Kubernetes Ingress and Service resources. Unlike other Ingress controllers that run the proxy within the cluster, the ALB controller creates cloud-native load balancers outside the cluster that route traffic directly to Pods using IP mode or to node ports using instance mode. IP mode registers Pod IPs directly as targets in ALB target groups, reducing network hops and improving latency. The controller supports advanced ALB features including path-based and host-based routing, SSL/TLS termination with ACM certificates, authentication with Cognito or OIDC, WAF integration, and target group health checks. Each Ingress resource typically creates a dedicated ALB, but you can use the group.name annotation to consolidate multiple Ingress resources into a single ALB, reducing costs. For gRPC and WebSocket workloads, ALB provides native protocol support. The controller requires IAM permissions configured via IRSA (IAM Roles for Service Accounts) to create and manage AWS resources on behalf of the cluster.',
            code: `# Install AWS Load Balancer Controller
helm repo add eks https://aws.github.io/eks-charts
helm install aws-load-balancer-controller eks/aws-load-balancer-controller \\
  --namespace kube-system \\
  --set clusterName=my-cluster \\
  --set serviceAccount.create=false \\
  --set serviceAccount.name=aws-load-balancer-controller

# ALB Ingress with annotations
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: app-ingress
  annotations:
    kubernetes.io/ingress.class: alb
    alb.ingress.kubernetes.io/scheme: internet-facing
    alb.ingress.kubernetes.io/target-type: ip
    alb.ingress.kubernetes.io/certificate-arn: arn:aws:acm:...
    alb.ingress.kubernetes.io/group.name: my-app-group
    alb.ingress.kubernetes.io/listen-ports: '[{"HTTPS":443}]'
    alb.ingress.kubernetes.io/ssl-redirect: "443"
spec:
  rules:
    - host: app.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: app-service
                port:
                  number: 80`,
            warning: 'The ALB controller requires proper IAM permissions. Without IRSA configured, the controller cannot create or manage ALB resources, and Ingress resources will remain in a pending state.',
          },
        ],
        quiz: [
          {
            question: 'How does the NGINX Ingress Controller apply configuration changes?',
            options: [
              'It restarts the NGINX process completely',
              'It regenerates the NGINX config and performs a graceful reload',
              'It uses NGINX Plus API for dynamic reconfiguration',
              'It patches the running config in memory without any reload',
            ],
            correctIndex: 1,
            explanation:
              'The NGINX Ingress Controller generates a new NGINX configuration from the current state of Ingress resources and performs a graceful reload, which applies changes while preserving existing connections.',
          },
          {
            question: 'What advantage does the ALB controller IP mode have over instance mode?',
            options: [
              'It supports more concurrent connections',
              'It registers Pod IPs directly as targets, reducing network hops',
              'It does not require IAM permissions',
              'It automatically provisions SSL certificates',
            ],
            correctIndex: 1,
            explanation:
              'In IP mode, the ALB controller registers Pod IP addresses directly as targets in the ALB target group, bypassing NodePort services and reducing network hops, which improves latency.',
          },
          {
            question: 'What unique capability does Traefik offer over standard Ingress resources?',
            options: [
              'Automatic TLS termination',
              'Middleware chains for composable request processing pipelines',
              'Multi-node clustering',
              'Kernel-level packet filtering',
            ],
            correctIndex: 1,
            explanation:
              'Traefik supports middleware chains that let you compose request processing pipelines with components like rate limiting, circuit breaking, authentication, and header manipulation, offering more flexibility than standard Ingress annotations.',
          },
        ],
      },
      {
        id: 'k8s-network-policies',
        title: 'Network Policies',
        difficulty: 'intermediate',
        tags: ['kubernetes', 'network-policy', 'security', 'ingress-egress', 'podSelector', 'namespaceSelector'],
        sections: [
          {
            heading: 'Understanding Network Policies',
            content:
              'Network Policies are Kubernetes resources that control traffic flow at the IP address or port level for Pods. By default, Kubernetes allows all traffic between Pods, which is a significant security concern in multi-tenant or compliance-sensitive environments. Network Policies implement a whitelist model: once a policy selects a Pod, only explicitly allowed traffic is permitted and all other traffic is denied. A NetworkPolicy uses a podSelector to select the Pods it applies to, and defines ingress (incoming) and egress (outgoing) rules that specify allowed sources and destinations. If no Network Policies select a Pod, all traffic is allowed to and from that Pod. However, once any policy selects a Pod, only the traffic explicitly allowed by all applicable policies is permitted. This means Network Policies are additive and cannot override each other to deny traffic that another policy allows. It is important to note that Network Policies require a CNI plugin that supports them, such as Calico, Cilium, or Weave Net. Using a CNI that does not support policies means the resources will be created but have no effect on traffic.',
            code: `# Default deny all ingress traffic in a namespace
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-ingress
  namespace: production
spec:
  podSelector: {}
  policyTypes:
    - Ingress

# Default deny all egress traffic in a namespace
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-egress
  namespace: production
spec:
  podSelector: {}
  policyTypes:
    - Egress

# Verify network policies
kubectl get networkpolicies -n production`,
            warning: 'Flannel does not support Network Policies. If you create policies in a cluster using Flannel as the CNI, they will have no effect. Switch to Calico or Cilium for policy enforcement.',
          },
          {
            heading: 'Ingress and Egress Rules with Selectors',
            content:
              'Network Policy rules use selectors to define allowed traffic sources and destinations. The podSelector matches Pods by their labels within the same namespace, while namespaceSelector matches entire namespaces. Combining both selectors creates AND logic, allowing traffic only from specific Pods in specific namespaces. The ipBlock selector allows or blocks traffic from specific CIDR ranges, which is useful for controlling access to and from external services. Each rule can also specify ports and protocols to further restrict traffic. For ingress rules, you define which sources can send traffic to the selected Pods. For egress rules, you define which destinations the selected Pods can send traffic to. A common best practice is to start with a default-deny policy for both ingress and egress in each namespace, then selectively open up required communication paths. This zero-trust approach ensures that any new workload deployed to the namespace is isolated by default until explicit policies are created. When designing policies, consider that DNS resolution requires egress access to CoreDNS (typically on port 53 UDP and TCP in the kube-system namespace), which must be explicitly allowed if egress is denied by default.',
            code: `# Allow frontend to communicate with backend
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-frontend-to-backend
  namespace: production
spec:
  podSelector:
    matchLabels:
      app: backend
  policyTypes:
    - Ingress
  ingress:
    - from:
        - podSelector:
            matchLabels:
              app: frontend
        - namespaceSelector:
            matchLabels:
              env: production
      ports:
        - protocol: TCP
          port: 8080

# Allow egress to DNS and specific external service
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-dns-and-api
  namespace: production
spec:
  podSelector:
    matchLabels:
      app: backend
  policyTypes:
    - Egress
  egress:
    - to:
        - namespaceSelector: {}
          podSelector:
            matchLabels:
              k8s-app: kube-dns
      ports:
        - protocol: UDP
          port: 53
        - protocol: TCP
          port: 53
    - to:
        - ipBlock:
            cidr: 203.0.113.0/24
      ports:
        - protocol: TCP
          port: 443`,
            tip: 'Always allow DNS egress when applying default-deny egress policies. Without DNS access, Pods cannot resolve Service names, breaking virtually all application communication.',
          },
          {
            heading: 'Advanced Policy Patterns',
            content:
              'Real-world network policy implementations often follow established patterns. The namespace isolation pattern applies a default-deny policy across all namespaces and then creates allow policies for known communication paths. The database protection pattern restricts database Pod access to only the application Pods that need it, preventing lateral movement in case of a compromise. The external access pattern uses ipBlock selectors to control which Pods can communicate with external APIs or receive traffic from specific IP ranges. When troubleshooting Network Policies, use tools like kubectl describe networkpolicy to view the resolved selectors, and network debugging Pods (like nicolaka/netshoot) to test connectivity. Cilium provides a Network Policy Editor UI and Hubble for real-time traffic flow visualization, making it easier to design and validate policies. For advanced use cases beyond what standard NetworkPolicy supports, Cilium offers CiliumNetworkPolicy CRDs that support DNS-based policies (allow egress only to specific domains), L7 policies (filter by HTTP method and path), and identity-based policies that work across clusters in a multi-cluster setup.',
            code: `# Database isolation policy
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: db-isolation
  namespace: production
spec:
  podSelector:
    matchLabels:
      app: postgres
  policyTypes:
    - Ingress
    - Egress
  ingress:
    - from:
        - podSelector:
            matchLabels:
              access: database
      ports:
        - protocol: TCP
          port: 5432
  egress: []

# Debug connectivity
kubectl run netshoot --rm -it --image=nicolaka/netshoot -- bash
# Inside the pod:
curl -v telnet://backend-service:8080
nslookup backend-service.production.svc.cluster.local`,
            analogy: 'Network Policies work like a building security system. By default, all doors are open (no policies). Once you install the system (add a policy), all doors lock (default deny), and you hand out specific keycards (rules) to allow authorized people (Pods) to access specific rooms (other Pods) through designated entrances (ports).',
          },
        ],
        diagram: {
          kind: 'mermaid' as const,
          code: `graph LR
    subgraph Namespace: Production
        FE[Frontend Pods<br/>app=frontend] -->|Allowed on :8080| BE[Backend Pods<br/>app=backend]
        BE -->|Allowed on :5432| DB[Database Pods<br/>app=postgres]
        FE -.->|Denied| DB
    end
    subgraph External
        EXT[External API<br/>203.0.113.0/24]
    end
    BE -->|Allowed on :443| EXT
    DNS[CoreDNS<br/>kube-system] <-->|Allowed :53| BE
    DENY[All Other Traffic] -.->|Denied| BE`,
          caption: 'Network Policy flow showing allowed and denied traffic paths between frontend, backend, database, and external services',
        },
        quiz: [
          {
            question: 'What happens when no Network Policy selects a Pod?',
            options: [
              'All traffic to and from the Pod is denied',
              'Only DNS traffic is allowed',
              'All traffic to and from the Pod is allowed',
              'The Pod is isolated to its namespace',
            ],
            correctIndex: 2,
            explanation:
              'By default, if no Network Policy selects a Pod, all ingress and egress traffic is allowed. Network Policies implement a whitelist model that only takes effect once a Pod is selected by at least one policy.',
          },
          {
            question: 'Why must you explicitly allow DNS egress when using default-deny egress policies?',
            options: [
              'DNS is a special protocol that requires dedicated rules',
              'Without DNS access, Pods cannot resolve Service names, breaking communication',
              'CoreDNS requires authentication from client Pods',
              'DNS traffic is always encrypted and needs TLS exceptions',
            ],
            correctIndex: 1,
            explanation:
              'When egress is denied by default, Pods cannot reach CoreDNS to resolve Service names to IP addresses. Since nearly all application communication relies on DNS resolution, this breaks virtually all connectivity.',
          },
          {
            question: 'How are multiple Network Policies that select the same Pod combined?',
            options: [
              'The most restrictive policy wins',
              'The last applied policy overrides previous ones',
              'They are additive; the union of all allowed traffic is permitted',
              'Conflicting policies generate an error',
            ],
            correctIndex: 2,
            explanation:
              'Network Policies are additive. When multiple policies select the same Pod, the union of all allowed ingress and egress rules applies. Policies cannot deny traffic that another policy explicitly allows.',
          },
        ],
      },
      {
        id: 'k8s-dns',
        title: 'DNS in Kubernetes',
        difficulty: 'intermediate',
        tags: ['kubernetes', 'DNS', 'CoreDNS', 'service-discovery', 'headless', 'resolution'],
        sections: [
          {
            heading: 'CoreDNS Architecture and Configuration',
            content:
              'CoreDNS is the default DNS server in Kubernetes, deployed as a Deployment in the kube-system namespace with a Service named kube-dns. Every Pod in the cluster is automatically configured to use kube-dns as its nameserver through the kubelet, which injects DNS configuration into each Pod resolv.conf file. CoreDNS watches the Kubernetes API server for Service and Endpoint changes and maintains an in-memory DNS zone. When a Pod queries a Service name, CoreDNS resolves it to the appropriate ClusterIP or, for headless Services, to the set of Pod IPs. CoreDNS configuration is stored in a ConfigMap named coredns in the kube-system namespace, using a Corefile syntax that defines plugins in a pipeline. Key plugins include the kubernetes plugin for cluster DNS, the forward plugin for upstream DNS resolution, the cache plugin for reducing query latency, and the health and ready plugins for liveness and readiness probes. Customizing CoreDNS allows you to add custom DNS entries, forward specific domains to external DNS servers, and implement DNS-based traffic steering.',
            code: `# View CoreDNS configuration
kubectl get configmap coredns -n kube-system -o yaml

# Example Corefile with custom forwarding
apiVersion: v1
kind: ConfigMap
metadata:
  name: coredns
  namespace: kube-system
data:
  Corefile: |
    .:53 {
        errors
        health { lameduck 5s }
        ready
        kubernetes cluster.local in-addr.arpa ip6.arpa {
            pods insecure
            fallthrough in-addr.arpa ip6.arpa
            ttl 30
        }
        forward . /etc/resolv.conf { max_concurrent 1000 }
        cache 30
        loop
        reload
        loadbalance
    }
    consul.local:53 {
        forward . 10.0.0.100
        cache 30
    }

# Test DNS resolution from a pod
kubectl run dnsutils --rm -it --image=registry.k8s.io/e2e-test-images/jessie-dnsutils -- nslookup kubernetes.default`,
            tip: 'Add a separate server block in the Corefile to forward queries for internal corporate domains (e.g., corp.local) to your on-premises DNS servers, keeping cluster DNS resolution fast for Kubernetes services.',
          },
          {
            heading: 'Service Discovery and DNS Records',
            content:
              'Kubernetes DNS creates predictable DNS records for Services and Pods that enable service discovery without external tooling. A standard ClusterIP Service gets an A record in the format service-name.namespace.svc.cluster.local that resolves to its ClusterIP. SRV records are also created for named ports, following the format _port-name._protocol.service-name.namespace.svc.cluster.local, which is useful for applications that need to discover both the address and port of a service dynamically. Headless Services (clusterIP: None) receive A records that return the IP addresses of all ready Pods instead of a single ClusterIP, enabling direct Pod addressing for stateful workloads. For StatefulSets with a headless Service, each Pod gets its own DNS entry in the format pod-name.service-name.namespace.svc.cluster.local, providing stable network identities that survive Pod rescheduling. Pods also get DNS records based on their IP address, formatted as pod-ip-with-dashes.namespace.pod.cluster.local. Understanding these DNS naming conventions is essential for configuring inter-service communication, setting up database replication, and designing distributed systems on Kubernetes.',
            code: `# Standard service DNS resolution
kubectl exec -it busybox -- nslookup my-service.default.svc.cluster.local

# SRV record lookup for named ports
kubectl exec -it busybox -- nslookup -type=SRV _http._tcp.my-service.default.svc.cluster.local

# Headless service with StatefulSet DNS
apiVersion: v1
kind: Service
metadata:
  name: postgres
spec:
  clusterIP: None
  selector:
    app: postgres
  ports:
    - port: 5432
      name: tcp-postgres
---
# Each StatefulSet pod gets: postgres-0.postgres.default.svc.cluster.local
# Each StatefulSet pod gets: postgres-1.postgres.default.svc.cluster.local

# Check Pod DNS entry
kubectl exec -it busybox -- nslookup 10-244-1-5.default.pod.cluster.local`,
            note: 'DNS queries within the same namespace can use short names like my-service. Cross-namespace queries need at minimum service-name.namespace. The full FQDN ending with cluster.local is only required when ndots configuration causes issues.',
          },
          {
            heading: 'DNS Troubleshooting and Performance',
            content:
              'DNS issues are among the most common networking problems in Kubernetes. Symptoms include intermittent connection timeouts, slow application startup, and name resolution failures. The ndots setting in Pod resolv.conf (default is 5) controls when a query is treated as absolute versus relative. With ndots:5, any name with fewer than 5 dots triggers a search through the DNS search domains before querying the name as-is. This means a query for api.example.com generates up to 6 DNS queries: api.example.com.default.svc.cluster.local, api.example.com.svc.cluster.local, api.example.com.cluster.local, and others before finally trying api.example.com. For applications making many external DNS queries, this amplification significantly increases latency and CoreDNS load. Setting ndots to a lower value or appending a trailing dot to FQDNs eliminates unnecessary search domain queries. NodeLocal DNSCache runs a DNS caching agent on each node as a DaemonSet, reducing CoreDNS load and improving DNS latency by serving cached responses locally. Monitoring CoreDNS metrics including cache hit rates, query latency, and error rates helps identify performance bottlenecks before they impact application reliability.',
            code: `# Check Pod DNS configuration
kubectl exec -it my-pod -- cat /etc/resolv.conf
# Output: nameserver 10.96.0.10
#         search default.svc.cluster.local svc.cluster.local cluster.local
#         options ndots:5

# Reduce ndots for a Pod
apiVersion: v1
kind: Pod
metadata:
  name: optimized-dns
spec:
  dnsConfig:
    options:
      - name: ndots
        value: "2"
  containers:
    - name: app
      image: my-app:latest

# Install NodeLocal DNSCache
kubectl apply -f https://raw.githubusercontent.com/kubernetes/kubernetes/master/cluster/addons/dns/nodelocaldns/nodelocaldns.yaml

# Monitor CoreDNS metrics
kubectl port-forward -n kube-system deployment/coredns 9153:9153
curl http://localhost:9153/metrics | grep coredns_dns_requests_total`,
            warning: 'A common DNS pitfall: if your application makes frequent external API calls, the default ndots:5 causes massive DNS query amplification. Always set ndots:2 or lower for workloads that primarily communicate with external services.',
          },
        ],
        quiz: [
          {
            question: 'What DNS record format does a headless Service create?',
            options: [
              'A single A record pointing to the ClusterIP',
              'A records for each ready Pod IP address',
              'A CNAME record pointing to the Service name',
              'No DNS records are created for headless Services',
            ],
            correctIndex: 1,
            explanation:
              'Headless Services (clusterIP: None) create A records that return the IP addresses of all ready backing Pods, instead of a single ClusterIP. This enables direct Pod addressing for stateful workloads.',
          },
          {
            question: 'Why does the default ndots:5 cause DNS query amplification?',
            options: [
              'It forces all queries through TCP instead of UDP',
              'Names with fewer than 5 dots trigger searches through all search domains before the absolute query',
              'It disables DNS caching for short names',
              'It requires multiple CoreDNS replicas to process queries',
            ],
            correctIndex: 1,
            explanation:
              'With ndots:5, any name with fewer than 5 dots is first appended with each search domain suffix. A query for api.example.com (2 dots) generates up to 6 queries through the search domains before trying the name as-is.',
          },
          {
            question: 'What does NodeLocal DNSCache do?',
            options: [
              'Replaces CoreDNS entirely with a distributed cache',
              'Runs a DNS caching agent on each node to reduce CoreDNS load and improve latency',
              'Encrypts all DNS queries with DNS-over-HTTPS',
              'Provides DNS-based load balancing for external traffic',
            ],
            correctIndex: 1,
            explanation:
              'NodeLocal DNSCache runs a DaemonSet that provides a local DNS cache on each node. Pods query the local cache first, and only cache misses are forwarded to CoreDNS, reducing latency and CoreDNS load significantly.',
          },
        ],
      },
      {
        id: 'k8s-gateway-api',
        title: 'Gateway API',
        difficulty: 'advanced',
        tags: ['kubernetes', 'gateway-api', 'HTTPRoute', 'GRPCRoute', 'routing', 'ingress-replacement'],
        sections: [
          {
            heading: 'Gateway API Overview',
            content:
              'The Gateway API is the next generation of Kubernetes networking APIs, designed to be expressive, extensible, and role-oriented as a successor to the Ingress resource. Unlike Ingress, which combines infrastructure provisioning and routing rules into a single resource, Gateway API separates concerns across multiple resources: GatewayClass defines the type of infrastructure (similar to IngressClass), Gateway provisions the actual load balancer or proxy with specific listeners and protocols, and Route resources (HTTPRoute, GRPCRoute, TCPRoute, TLSRoute) define how traffic is routed to backend Services. This separation enables a clear operational model where cluster operators manage GatewayClass and Gateway resources while application developers create Route resources that attach to existing Gateways. Gateway API is officially part of the Kubernetes project and has reached GA status for HTTPRoute, making it production-ready. Major Ingress controllers including NGINX, Traefik, Istio, Cilium, and Envoy Gateway already support Gateway API, providing a portable API that works consistently across implementations.',
            code: `# Install Gateway API CRDs
kubectl apply -f https://github.com/kubernetes-sigs/gateway-api/releases/download/v1.1.0/standard-install.yaml

# GatewayClass resource
apiVersion: gateway.networking.k8s.io/v1
kind: GatewayClass
metadata:
  name: envoy-gateway
spec:
  controllerName: gateway.envoyproxy.io/gatewayclass-controller

# Gateway resource
apiVersion: gateway.networking.k8s.io/v1
kind: Gateway
metadata:
  name: main-gateway
  namespace: infra
spec:
  gatewayClassName: envoy-gateway
  listeners:
    - name: http
      protocol: HTTP
      port: 80
    - name: https
      protocol: HTTPS
      port: 443
      tls:
        mode: Terminate
        certificateRefs:
          - name: app-cert`,
            tip: 'Start migrating from Ingress to Gateway API now. Most controllers support both simultaneously, so you can run them side by side during the transition period without disruption.',
          },
          {
            heading: 'HTTPRoute and Traffic Management',
            content:
              'HTTPRoute is the most commonly used Route resource in Gateway API, providing powerful HTTP traffic routing capabilities that far exceed what Ingress offers. HTTPRoutes can match requests based on hostnames, URL paths, headers, query parameters, and HTTP methods, enabling sophisticated routing logic without controller-specific annotations. Traffic splitting allows you to send a percentage of traffic to different backend Services, enabling canary deployments and A/B testing natively. Request and response header modification lets you add, set, or remove headers as traffic passes through the gateway. URL rewrites transform the request path or hostname before forwarding to the backend. Request mirroring duplicates traffic to a secondary backend for testing without affecting the primary traffic flow. HTTPRoutes support multiple parent Gateway references, allowing a single route to be exposed on multiple gateways simultaneously. The backendRefs field supports weighted routing where each backend gets a proportion of traffic based on its weight value. These capabilities make Gateway API a compelling replacement for both Ingress resources and many service mesh features for HTTP workloads.',
            code: `# HTTPRoute with advanced matching and traffic splitting
apiVersion: gateway.networking.k8s.io/v1
kind: HTTPRoute
metadata:
  name: app-route
  namespace: production
spec:
  parentRefs:
    - name: main-gateway
      namespace: infra
  hostnames:
    - "app.example.com"
  rules:
    - matches:
        - path:
            type: PathPrefix
            value: /api/v2
          headers:
            - name: X-Canary
              value: "true"
      backendRefs:
        - name: api-v2-canary
          port: 8080
    - matches:
        - path:
            type: PathPrefix
            value: /api/v2
      backendRefs:
        - name: api-v2-stable
          port: 8080
          weight: 90
        - name: api-v2-canary
          port: 8080
          weight: 10
    - matches:
        - path:
            type: PathPrefix
            value: /
      backendRefs:
        - name: frontend
          port: 3000
      filters:
        - type: ResponseHeaderModifier
          responseHeaderModifier:
            add:
              - name: X-Frame-Options
                value: DENY`,
            note: 'HTTPRoute weights are relative, not percentages. Weights of 90 and 10 produce a 90/10 split, but so would weights of 9 and 1. The proportion matters, not the absolute value.',
          },
          {
            heading: 'GRPCRoute and Cross-Namespace Routing',
            content:
              'GRPCRoute provides native gRPC routing support in Gateway API, understanding gRPC semantics like service and method names rather than treating gRPC as plain HTTP/2. GRPCRoutes match on gRPC service names and methods, enabling fine-grained traffic management for gRPC microservice architectures. This is a significant improvement over Ingress, which has no native gRPC awareness and requires controller-specific annotations for basic gRPC support. Cross-namespace routing is another powerful Gateway API feature that enables Routes in one namespace to attach to Gateways in another namespace, controlled by the allowedRoutes field on the Gateway listener. This enables a model where a platform team manages the Gateway infrastructure in a dedicated namespace while application teams create Routes in their own namespaces. ReferenceGrant resources provide an additional security layer by explicitly allowing cross-namespace references, preventing unauthorized route attachment. The combination of role-oriented design, cross-namespace routing, and fine-grained access control makes Gateway API suitable for large multi-team organizations where different groups need to manage their own routing configurations while sharing common infrastructure.',
            code: `# GRPCRoute for gRPC services
apiVersion: gateway.networking.k8s.io/v1
kind: GRPCRoute
metadata:
  name: grpc-route
  namespace: production
spec:
  parentRefs:
    - name: main-gateway
      namespace: infra
  hostnames:
    - "grpc.example.com"
  rules:
    - matches:
        - method:
            service: myapp.UserService
            method: GetUser
      backendRefs:
        - name: user-service
          port: 50051
    - matches:
        - method:
            service: myapp.OrderService
      backendRefs:
        - name: order-service
          port: 50051

# ReferenceGrant allowing cross-namespace routing
apiVersion: gateway.networking.k8s.io/v1beta1
kind: ReferenceGrant
metadata:
  name: allow-infra-gateway
  namespace: production
spec:
  from:
    - group: gateway.networking.k8s.io
      kind: HTTPRoute
      namespace: infra
  to:
    - group: ""
      kind: Service`,
            analogy: 'Think of Gateway API like a well-organized airport. The GatewayClass is the type of airport (international, domestic). The Gateway is the actual terminal building with its gates (listeners). HTTPRoutes and GRPCRoutes are the flight routing tables that direct passengers (traffic) to the right airlines (Services). ReferenceGrants are the inter-terminal transfer agreements that allow passengers to move between terminals (namespaces).',
          },
        ],
        challenge: {
          prompt:
            'Create a Gateway with HTTP and HTTPS listeners, plus an HTTPRoute that performs canary deployment: route 95% of traffic to stable-svc and 5% to canary-svc on host api.myapp.com with path prefix /api. Add a rule that sends all traffic with header X-Test: true to canary-svc regardless of weights.',
          starterCode: `apiVersion: gateway.networking.k8s.io/v1
kind: Gateway
metadata:
  name: my-gateway
spec:
  # Add gateway config

---
apiVersion: gateway.networking.k8s.io/v1
kind: HTTPRoute
metadata:
  name: canary-route
spec:
  # Add route config`,
          solutionCode: `apiVersion: gateway.networking.k8s.io/v1
kind: Gateway
metadata:
  name: my-gateway
spec:
  gatewayClassName: envoy-gateway
  listeners:
    - name: http
      protocol: HTTP
      port: 80
    - name: https
      protocol: HTTPS
      port: 443
      tls:
        mode: Terminate
        certificateRefs:
          - name: myapp-cert
---
apiVersion: gateway.networking.k8s.io/v1
kind: HTTPRoute
metadata:
  name: canary-route
spec:
  parentRefs:
    - name: my-gateway
  hostnames:
    - "api.myapp.com"
  rules:
    - matches:
        - path:
            type: PathPrefix
            value: /api
          headers:
            - name: X-Test
              value: "true"
      backendRefs:
        - name: canary-svc
          port: 8080
    - matches:
        - path:
            type: PathPrefix
            value: /api
      backendRefs:
        - name: stable-svc
          port: 8080
          weight: 95
        - name: canary-svc
          port: 8080
          weight: 5`,
          hints: [
            'Put the header-match rule before the weighted rule so it takes priority',
            'Use backendRefs with weight fields for traffic splitting',
            'The Gateway needs gatewayClassName and at least one listener',
          ],
        },
      },
      {
        id: 'k8s-service-mesh',
        title: 'Service Mesh',
        difficulty: 'advanced',
        tags: ['kubernetes', 'service-mesh', 'istio', 'linkerd', 'envoy', 'mTLS'],
        sections: [
          {
            heading: 'Service Mesh Concepts and Architecture',
            content:
              'A service mesh is a dedicated infrastructure layer for managing service-to-service communication within a Kubernetes cluster. It works by injecting a sidecar proxy (typically Envoy) alongside each application container, forming a data plane that intercepts all network traffic. The control plane manages configuration, certificate distribution, and policy enforcement across all sidecar proxies. Service meshes provide critical capabilities that are difficult to implement at the application level: mutual TLS (mTLS) encrypts all communication between services and verifies identity, removing the need for application-level TLS configuration. Traffic management enables sophisticated routing patterns like canary deployments, traffic mirroring, and fault injection. Observability features provide detailed metrics, distributed traces, and access logs for every request without instrumenting application code. Resilience features include automatic retries, circuit breaking, and timeout configuration. The main trade-off is operational complexity and resource overhead, as each Pod now runs an additional proxy container that consumes CPU and memory. For organizations running dozens of microservices, the benefits typically outweigh the costs.',
            code: `# Install Istio using istioctl
curl -L https://istio.io/downloadIstio | sh -
istioctl install --set profile=demo

# Enable automatic sidecar injection for a namespace
kubectl label namespace production istio-injection=enabled

# Verify sidecar injection
kubectl get pods -n production -o jsonpath='{range .items[*]}{.metadata.name}{": "}{range .spec.containers[*]}{.name}{" "}{end}{"\\n"}{end}'

# Install Linkerd
curl --proto '=https' --tlsv1.2 -sSfL https://run.linkerd.io/install | sh
linkerd install --crds | kubectl apply -f -
linkerd install | kubectl apply -f -
linkerd check`,
            analogy: 'A service mesh is like adding a personal assistant to every employee in a company. Instead of employees managing their own phone calls, security badges, and meeting schedules, the assistants (sidecar proxies) handle all communication logistics. The office manager (control plane) coordinates all the assistants with consistent policies.',
          },
          {
            heading: 'mTLS and Security Policies',
            content:
              'Mutual TLS is the cornerstone security feature of service meshes, automatically encrypting all service-to-service traffic and providing cryptographic identity verification. In Istio, mTLS is configured through PeerAuthentication policies that can operate in STRICT mode (requiring mTLS for all connections), PERMISSIVE mode (accepting both plaintext and mTLS), or DISABLE mode. PeerAuthentication can be applied globally, per-namespace, or per-workload. Istio manages the entire certificate lifecycle automatically: the istiod control plane acts as a certificate authority, issuing short-lived certificates to each sidecar proxy and rotating them before expiration. AuthorizationPolicy resources provide fine-grained access control, allowing you to specify which services can communicate based on source identity, HTTP method, path, headers, and more. This implements a zero-trust security model where every request is authenticated and authorized regardless of network location. Linkerd takes a simpler approach with automatic mTLS enabled by default for all meshed services, using its own identity system based on per-proxy TLS certificates with 24-hour rotation. Both systems eliminate the need for network-level policies as the primary security mechanism.',
            code: `# Istio PeerAuthentication for strict mTLS
apiVersion: security.istio.io/v1beta1
kind: PeerAuthentication
metadata:
  name: default
  namespace: production
spec:
  mtls:
    mode: STRICT

# Istio AuthorizationPolicy
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: allow-frontend
  namespace: production
spec:
  selector:
    matchLabels:
      app: backend
  action: ALLOW
  rules:
    - from:
        - source:
            principals: ["cluster.local/ns/production/sa/frontend"]
      to:
        - operation:
            methods: ["GET", "POST"]
            paths: ["/api/*"]

# Verify mTLS status
istioctl x describe pod backend-pod-name.production`,
            warning: 'When enabling STRICT mTLS, ensure all services in the namespace are part of the mesh. Non-meshed services cannot communicate with strictly-mTLS services, causing connection failures.',
          },
          {
            heading: 'Traffic Management and Observability',
            content:
              'Service meshes provide sophisticated traffic management capabilities through custom resources. Istio VirtualService resources define routing rules including traffic splitting, header-based routing, fault injection, and request timeouts. DestinationRule resources configure load balancing algorithms, connection pool settings, and outlier detection for circuit breaking. These resources work together to enable advanced deployment patterns: canary releases gradually shift traffic to new versions based on configurable weights, fault injection tests application resilience by introducing delays or errors, and traffic mirroring copies live traffic to a test service for shadow testing. On the observability side, service meshes automatically collect RED metrics (Rate, Errors, Duration) for every service interaction. Istio integrates with Prometheus for metrics, Jaeger or Zipkin for distributed tracing, and Kiali for service graph visualization. Linkerd provides its own dashboard with golden metrics and integrates with Grafana for detailed visualization. Access logs capture every request flowing through the mesh, providing an audit trail for debugging and compliance purposes.',
            code: `# Istio VirtualService for canary with fault injection
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: backend
  namespace: production
spec:
  hosts:
    - backend
  http:
    - fault:
        delay:
          percentage:
            value: 5.0
          fixedDelay: 3s
      route:
        - destination:
            host: backend
            subset: stable
          weight: 90
        - destination:
            host: backend
            subset: canary
          weight: 10
---
apiVersion: networking.istio.io/v1beta1
kind: DestinationRule
metadata:
  name: backend
  namespace: production
spec:
  host: backend
  trafficPolicy:
    connectionPool:
      tcp:
        maxConnections: 100
      http:
        h2UpgradePolicy: DEFAULT
    outlierDetection:
      consecutive5xxErrors: 5
      interval: 30s
      baseEjectionTime: 30s
  subsets:
    - name: stable
      labels:
        version: v1
    - name: canary
      labels:
        version: v2

# View service mesh metrics
istioctl dashboard kiali
linkerd viz dashboard`,
            tip: 'Start with Linkerd if you want a lightweight mesh focused on security and observability. Choose Istio for more advanced traffic management features like fault injection, traffic mirroring, and complex routing.',
          },
        ],
        quiz: [
          {
            question: 'What is the primary function of sidecar proxies in a service mesh?',
            options: [
              'To replace the application container with a proxy',
              'To intercept all network traffic for the Pod and apply mesh policies',
              'To provide persistent storage for the application',
              'To schedule Pods to appropriate nodes',
            ],
            correctIndex: 1,
            explanation:
              'Sidecar proxies intercept all inbound and outbound network traffic for the Pod, enabling the mesh to apply mTLS, routing rules, retries, observability, and access control without application changes.',
          },
          {
            question: 'What does STRICT mTLS mode in Istio enforce?',
            options: [
              'Only encrypted external traffic is accepted',
              'All service-to-service connections must use mutual TLS',
              'TLS certificates must be manually provisioned',
              'Only services with specific annotations can communicate',
            ],
            correctIndex: 1,
            explanation:
              'STRICT mTLS mode requires that all connections to selected workloads use mutual TLS, rejecting any plaintext connections. This ensures all traffic is encrypted and authenticated.',
          },
          {
            question: 'What does outlier detection in a DestinationRule provide?',
            options: [
              'DNS-based load balancing',
              'Circuit breaking by ejecting unhealthy endpoints',
              'Automatic scaling of backend Pods',
              'SSL certificate rotation',
            ],
            correctIndex: 1,
            explanation:
              'Outlier detection implements circuit breaking by monitoring error rates for individual endpoints and ejecting those exceeding the threshold from the load balancing pool for a configured duration.',
          },
        ],
      },
      {
        id: 'k8s-load-balancing',
        title: 'Load Balancing',
        difficulty: 'intermediate',
        tags: ['kubernetes', 'load-balancing', 'MetalLB', 'external', 'internal', 'cross-zone'],
        sections: [
          {
            heading: 'Internal Load Balancing',
            content:
              'Kubernetes provides internal load balancing through ClusterIP Services, which distribute traffic across backend Pods using kube-proxy. The default load balancing algorithm depends on the kube-proxy mode: iptables mode uses random selection with equal probability based on the statistic module, while IPVS mode supports configurable algorithms including round-robin, least connections, destination hashing, source hashing, and shortest expected delay. Internal load balancing is critical for distributing requests evenly across microservice replicas and preventing individual Pods from becoming overwhelmed. For gRPC and HTTP/2 workloads, standard Kubernetes load balancing can be problematic because these protocols multiplex multiple requests over a single long-lived TCP connection. Once a connection is established to a specific Pod, all subsequent requests on that connection go to the same Pod, leading to severe imbalances. Service meshes solve this by performing L7 load balancing at the request level rather than the connection level. Another approach is to use client-side load balancing, where the client maintains connections to multiple backend Pods and distributes requests across them. Understanding these nuances is essential for ensuring even traffic distribution in production environments.',
            code: `# Service with IPVS load balancing (configured at kube-proxy level)
# Edit kube-proxy ConfigMap to set algorithm
apiVersion: v1
kind: ConfigMap
metadata:
  name: kube-proxy
  namespace: kube-system
data:
  config.conf: |
    mode: "ipvs"
    ipvs:
      scheduler: "lc"  # least connections

# Internal load balancer Service (cloud-specific)
apiVersion: v1
kind: Service
metadata:
  name: internal-api
  annotations:
    networking.gke.io/load-balancer-type: "Internal"
    # or for AWS:
    # service.beta.kubernetes.io/aws-load-balancer-internal: "true"
spec:
  type: LoadBalancer
  selector:
    app: api
  ports:
    - port: 80
      targetPort: 8080

# Verify load distribution
for i in $(seq 1 100); do kubectl exec client-pod -- curl -s http://my-service/hostname; done | sort | uniq -c`,
            tip: 'For gRPC workloads, use a service mesh like Linkerd or Istio that performs L7 request-level balancing, or configure your gRPC clients to use DNS-based load balancing with a headless Service.',
          },
          {
            heading: 'External Load Balancing and MetalLB',
            content:
              'External load balancing in Kubernetes is provided by Services of type LoadBalancer, which provisions a cloud provider load balancer that routes external traffic to cluster nodes. In cloud environments like AWS, GCP, and Azure, this is handled automatically by the cloud controller manager. However, in bare-metal or on-premises environments, no built-in load balancer provisioner exists. MetalLB fills this gap by providing a software load balancer implementation for bare-metal clusters. MetalLB operates in two modes: Layer 2 mode, where one node attracts all traffic for a Service IP using ARP (IPv4) or NDP (IPv6) and distributes it locally, and BGP mode, where MetalLB peers with network routers to advertise Service IPs, enabling true load distribution across nodes. Layer 2 mode is simpler to set up but has a single point of failure since only one node handles traffic at a time. BGP mode provides better availability and scalability but requires router cooperation. MetalLB uses IPAddressPool resources to define the range of external IPs available for allocation and L2Advertisement or BGPAdvertisement resources to configure how those IPs are announced to the network.',
            code: `# Install MetalLB
kubectl apply -f https://raw.githubusercontent.com/metallb/metallb/v0.14.5/config/manifests/metallb-native.yaml

# Configure IP address pool
apiVersion: metallb.io/v1beta1
kind: IPAddressPool
metadata:
  name: production-pool
  namespace: metallb-system
spec:
  addresses:
    - 192.168.1.240-192.168.1.250

# L2 Advertisement
apiVersion: metallb.io/v1beta1
kind: L2Advertisement
metadata:
  name: l2-advert
  namespace: metallb-system
spec:
  ipAddressPools:
    - production-pool

# BGP Advertisement (for BGP mode)
apiVersion: metallb.io/v1beta1
kind: BGPAdvertisement
metadata:
  name: bgp-advert
  namespace: metallb-system
spec:
  ipAddressPools:
    - production-pool

# Create a LoadBalancer Service (MetalLB assigns IP automatically)
kubectl expose deployment web --type=LoadBalancer --port=80`,
            note: 'MetalLB in Layer 2 mode provides failover but not true load balancing across nodes. All traffic for a given IP goes to a single node. For multi-node distribution, use BGP mode with ECMP on your router.',
          },
          {
            heading: 'Cross-Zone and Global Load Balancing',
            content:
              'In multi-zone Kubernetes clusters, cross-zone load balancing determines whether traffic is routed to Pods in the same availability zone as the receiving node or distributed across all zones. By default, kube-proxy distributes traffic to all healthy endpoints regardless of zone, which can result in significant cross-zone network charges and increased latency. Topology-aware routing (formerly Topology Aware Hints) addresses this by preferring endpoints in the same zone when sufficient capacity exists. When enabled via the service.kubernetes.io/topology-mode annotation, EndpointSlices are annotated with topology hints that kube-proxy uses to prefer local-zone endpoints. This reduces cross-zone traffic costs and improves latency, but may cause uneven load distribution if zones have different numbers of Pods. For global load balancing across multiple clusters, solutions like Google Cloud Multi-Cluster Ingress, AWS Global Accelerator, or Cloudflare Load Balancing distribute traffic across geographically distributed clusters based on latency, health, and geographic proximity. Submariner and Cilium ClusterMesh enable cross-cluster service discovery and load balancing for multi-cluster architectures.',
            code: `# Enable topology-aware routing on a Service
apiVersion: v1
kind: Service
metadata:
  name: my-service
  annotations:
    service.kubernetes.io/topology-mode: Auto
spec:
  selector:
    app: my-app
  ports:
    - port: 80
      targetPort: 8080

# Check EndpointSlice topology hints
kubectl get endpointslices -l kubernetes.io/service-name=my-service -o yaml

# Verify zone distribution of pods
kubectl get pods -l app=my-app -o custom-columns=NAME:.metadata.name,NODE:.spec.nodeName,ZONE:.metadata.labels.topology\\.kubernetes\\.io/zone

# Ensure pods are spread across zones
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 6
  template:
    spec:
      topologySpreadConstraints:
        - maxSkew: 1
          topologyKey: topology.kubernetes.io/zone
          whenUnsatisfiable: DoNotSchedule
          labelSelector:
            matchLabels:
              app: my-app`,
            warning: 'Topology-aware routing requires at least 3 endpoints per zone to activate. With fewer endpoints, hints are not generated and traffic falls back to cluster-wide distribution to avoid overloading a single zone.',
          },
        ],
        challenge: {
          prompt:
            'Set up MetalLB in Layer 2 mode for a bare-metal cluster. Create an IPAddressPool with the range 10.0.0.200-10.0.0.210, an L2Advertisement that uses this pool, and a LoadBalancer Service for a deployment named web-app on port 80 targeting port 3000.',
          starterCode: `# Create MetalLB configuration and Service
# IPAddressPool:

# L2Advertisement:

# Service:`,
          solutionCode: `apiVersion: metallb.io/v1beta1
kind: IPAddressPool
metadata:
  name: web-pool
  namespace: metallb-system
spec:
  addresses:
    - 10.0.0.200-10.0.0.210
---
apiVersion: metallb.io/v1beta1
kind: L2Advertisement
metadata:
  name: web-l2-advert
  namespace: metallb-system
spec:
  ipAddressPools:
    - web-pool
---
apiVersion: v1
kind: Service
metadata:
  name: web-app-lb
spec:
  type: LoadBalancer
  selector:
    app: web-app
  ports:
    - port: 80
      targetPort: 3000`,
          hints: [
            'IPAddressPool and L2Advertisement must be in the metallb-system namespace',
            'The L2Advertisement references the pool by name in ipAddressPools',
            'Service type must be LoadBalancer to trigger MetalLB allocation',
          ],
        },
      },
      {
        id: 'k8s-endpoint-slices',
        title: 'EndpointSlices',
        difficulty: 'advanced',
        tags: ['kubernetes', 'endpoint-slices', 'scalability', 'dual-stack', 'topology', 'kube-proxy'],
        sections: [
          {
            heading: 'EndpointSlices Overview',
            content:
              'EndpointSlices are a scalable replacement for the legacy Endpoints resource in Kubernetes. While the Endpoints resource stores all IP addresses for a Service in a single object, EndpointSlices distribute endpoints across multiple smaller objects, each containing up to 100 endpoints by default. This design addresses critical scalability issues that arise in large clusters: when a Service has thousands of endpoints, every change to any endpoint requires the entire Endpoints object to be transmitted to all watching nodes. With EndpointSlices, only the affected slice needs to be updated and distributed, dramatically reducing API server load and network bandwidth. EndpointSlices also carry richer information than Endpoints, including topology data (zone, hostname), serving conditions (ready, serving, terminating), and support for dual-stack networking with both IPv4 and IPv6 addresses. The EndpointSlice controller automatically creates and manages slices based on the Pods selected by a Service. Kube-proxy and Ingress controllers consume EndpointSlices to program their forwarding rules. In clusters with hundreds of Services each backing thousands of Pods, the difference in API server and network overhead between Endpoints and EndpointSlices can be orders of magnitude.',
            code: `# View EndpointSlices for a service
kubectl get endpointslices -l kubernetes.io/service-name=my-service

# Detailed EndpointSlice information
kubectl get endpointslice my-service-abc12 -o yaml

# Example EndpointSlice structure
apiVersion: discovery.k8s.io/v1
kind: EndpointSlice
metadata:
  name: my-service-abc12
  labels:
    kubernetes.io/service-name: my-service
addressType: IPv4
ports:
  - name: http
    protocol: TCP
    port: 8080
endpoints:
  - addresses:
      - "10.244.1.5"
    conditions:
      ready: true
      serving: true
      terminating: false
    nodeName: worker-1
    zone: us-east-1a
  - addresses:
      - "10.244.2.8"
    conditions:
      ready: true
      serving: true
      terminating: false
    nodeName: worker-2
    zone: us-east-1b`,
            tip: 'Monitor the number of EndpointSlices per Service using kubectl get endpointslices -l kubernetes.io/service-name=<name> --no-headers | wc -l. A high number may indicate a very large Service that could benefit from traffic splitting.',
          },
          {
            heading: 'Dual-Stack and Topology Hints',
            content:
              'EndpointSlices natively support dual-stack networking by creating separate slices for IPv4 and IPv6 addresses. Each EndpointSlice has an addressType field set to either IPv4 or IPv6, and the controller creates appropriate slices for each address family based on the cluster configuration. This enables Services to be reachable over both IPv4 and IPv6 without additional configuration, supporting the gradual migration to IPv6 in enterprise environments. Topology hints are metadata added to EndpointSlice endpoints that guide kube-proxy to prefer endpoints in the same zone as the requesting Pod. When the Service has topology-mode set to Auto, the EndpointSlice controller calculates allocation hints based on the distribution of endpoints across zones, the CPU capacity of nodes in each zone, and the proportion of traffic expected from each zone. These hints enable topology-aware routing that reduces cross-zone traffic and latency while maintaining reasonable load distribution. Topology hints are only generated when the conditions are suitable: if endpoints are unevenly distributed across zones or if a zone has insufficient capacity, hints may be omitted to prevent overload.',
            code: `# Dual-stack Service configuration
apiVersion: v1
kind: Service
metadata:
  name: dual-stack-svc
spec:
  ipFamilyPolicy: PreferDualStack
  ipFamilies:
    - IPv4
    - IPv6
  selector:
    app: my-app
  ports:
    - port: 80
      targetPort: 8080

# Check dual-stack EndpointSlices
kubectl get endpointslices -l kubernetes.io/service-name=dual-stack-svc

# View topology hints in EndpointSlice
kubectl get endpointslice my-service-abc12 -o jsonpath='{range .endpoints[*]}{.addresses[0]}{" zone="}{.zone}{" hints="}{.hints.forZones[*].name}{"\\n"}{end}'

# EndpointSlice with topology hints
endpoints:
  - addresses: ["10.244.1.5"]
    zone: us-east-1a
    hints:
      forZones:
        - name: us-east-1a
  - addresses: ["10.244.2.8"]
    zone: us-east-1b
    hints:
      forZones:
        - name: us-east-1b`,
            note: 'Dual-stack requires cluster-level support: the cluster network, CNI plugin, and nodes must all support both IPv4 and IPv6. Verify with kubectl get nodes -o jsonpath to check node addresses for both families.',
          },
          {
            heading: 'Custom EndpointSlices and Scalability',
            content:
              'While the EndpointSlice controller automatically manages slices for standard Services, you can also create custom EndpointSlices for advanced use cases. Services without selectors do not get automatic EndpointSlice management, requiring you to create and maintain slices manually. This pattern is useful for representing external services (databases, APIs) as Kubernetes Services, enabling the same service discovery and DNS mechanisms for external endpoints. Custom EndpointSlices must include the kubernetes.io/service-name label matching the owning Service and must not have the endpointslice.kubernetes.io/managed-by label set to endpointslice-controller.k8s.io (which would cause the controller to overwrite your changes). For scalability planning, consider that each EndpointSlice defaults to 100 endpoints, so a Service with 10,000 Pods creates approximately 100 EndpointSlice objects. The maximum configurable size is 1000 endpoints per slice. Monitoring EndpointSlice metrics including the count of slices, endpoints per slice, and update frequency helps ensure your cluster networking scales effectively as workloads grow.',
            code: `# Service without selector (for external service)
apiVersion: v1
kind: Service
metadata:
  name: external-db
spec:
  ports:
    - port: 5432
      targetPort: 5432
---
# Custom EndpointSlice for external database
apiVersion: discovery.k8s.io/v1
kind: EndpointSlice
metadata:
  name: external-db-1
  labels:
    kubernetes.io/service-name: external-db
addressType: IPv4
ports:
  - name: tcp-postgres
    protocol: TCP
    port: 5432
endpoints:
  - addresses:
      - "10.200.0.10"
    conditions:
      ready: true
  - addresses:
      - "10.200.0.11"
    conditions:
      ready: true

# Monitor EndpointSlice counts
kubectl get endpointslices --all-namespaces --no-headers | wc -l

# Watch EndpointSlice changes for a service
kubectl get endpointslices -l kubernetes.io/service-name=my-service -w`,
            warning: 'When creating custom EndpointSlices, ensure you update endpoint conditions (ready, serving, terminating) accurately. Stale or incorrect conditions will cause kube-proxy to route traffic to unhealthy backends.',
          },
        ],
        quiz: [
          {
            question: 'Why are EndpointSlices more scalable than Endpoints?',
            options: [
              'They use less memory per endpoint',
              'They split endpoints across multiple objects so only affected slices are updated',
              'They bypass the API server for updates',
              'They use UDP instead of TCP for updates',
            ],
            correctIndex: 1,
            explanation:
              'EndpointSlices distribute endpoints across multiple objects (max 100 per slice). When an endpoint changes, only the affected slice needs to be updated and distributed, reducing API server load and network bandwidth compared to updating the entire Endpoints object.',
          },
          {
            question: 'How does dual-stack support work in EndpointSlices?',
            options: [
              'A single EndpointSlice contains both IPv4 and IPv6 addresses',
              'Separate EndpointSlices are created for IPv4 and IPv6 with different addressTypes',
              'IPv6 addresses are embedded inside IPv4 EndpointSlices',
              'Dual-stack is handled at the Service level, not EndpointSlices',
            ],
            correctIndex: 1,
            explanation:
              'Each EndpointSlice has a single addressType (IPv4 or IPv6). For dual-stack Services, the controller creates separate EndpointSlice objects for each address family, enabling native support for both IPv4 and IPv6.',
          },
          {
            question: 'When are topology hints NOT generated for EndpointSlices?',
            options: [
              'When the Service has more than 3 endpoints',
              'When endpoints are unevenly distributed or zones have insufficient capacity',
              'When the cluster uses IPVS mode',
              'When the Service type is ClusterIP',
            ],
            correctIndex: 1,
            explanation:
              'Topology hints are omitted when conditions are unsuitable, such as uneven endpoint distribution across zones or insufficient capacity in a zone. This prevents overloading a single zone with disproportionate traffic.',
          },
        ],
      },
    ],
  },
  {
    id: 'k8s-workloads',
    label: 'Workloads',
    icon: '⚡',
    entries: [
      {
        id: 'k8s-deployment-strategies',
        title: 'Deployment Strategies',
        difficulty: 'intermediate',
        tags: ['kubernetes', 'deployment', 'rolling-update', 'blue-green', 'canary', 'recreate'],
        sections: [
          {
            heading: 'Rolling Updates and Recreate Strategy',
            content:
              'Kubernetes Deployments support two built-in strategies for updating Pods: RollingUpdate and Recreate. The RollingUpdate strategy is the default and gradually replaces old Pods with new ones, ensuring that some Pods are always available during the update. Two key parameters control rolling update behavior: maxSurge specifies how many Pods can be created above the desired replica count (allowing new Pods to start before old ones terminate), and maxUnavailable specifies how many Pods can be unavailable during the update. Setting maxSurge to a higher value speeds up deployments but temporarily uses more resources, while setting maxUnavailable to zero ensures full availability at all times (at the cost of requiring additional resources for the surge). The Recreate strategy terminates all existing Pods before creating new ones, resulting in downtime but ensuring a clean cutover with no version mixing. Recreate is appropriate for applications that cannot tolerate running multiple versions simultaneously, such as those with incompatible database schema changes or singleton processes that must not run in parallel. Choosing the right strategy depends on application requirements for availability, resource constraints, and compatibility between versions.',
            code: `# Rolling update deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
spec:
  replicas: 10
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 2
      maxUnavailable: 1
  selector:
    matchLabels:
      app: web-app
  template:
    metadata:
      labels:
        app: web-app
    spec:
      containers:
        - name: web
          image: web-app:v2
          readinessProbe:
            httpGet:
              path: /healthz
              port: 8080
            initialDelaySeconds: 5
            periodSeconds: 5

# Recreate strategy
apiVersion: apps/v1
kind: Deployment
metadata:
  name: singleton-app
spec:
  replicas: 1
  strategy:
    type: Recreate
  selector:
    matchLabels:
      app: singleton
  template:
    metadata:
      labels:
        app: singleton
    spec:
      containers:
        - name: app
          image: singleton-app:v2`,
            tip: 'Always configure readiness probes when using RollingUpdate. Without them, Kubernetes cannot distinguish between a Pod that is still starting and one that is ready to serve traffic, potentially routing requests to unready Pods.',
          },
          {
            heading: 'Blue-Green Deployments',
            content:
              'Blue-green deployment is a release strategy that runs two identical production environments: blue (current) and green (new). Traffic is switched from blue to green atomically by updating the Kubernetes Service selector. This approach provides instant rollback by simply switching the selector back to the blue Deployment. While Kubernetes does not natively support blue-green deployments as a built-in strategy, they can be implemented using two Deployments with different labels and a Service that selects one at a time. The process involves deploying the green version alongside the blue version, running smoke tests against the green Deployment directly, and then updating the Service selector to point to green. The blue Deployment remains running for a configurable period as a rollback target before being scaled down or deleted. Blue-green deployments require double the resources during the transition period since both versions run simultaneously. This strategy is ideal for applications that require zero-downtime releases with instant rollback capability, testing the full production configuration before switching traffic, and compliance requirements that demand explicit release approval gates.',
            code: `# Blue deployment (current production)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app-blue
spec:
  replicas: 5
  selector:
    matchLabels:
      app: my-app
      version: blue
  template:
    metadata:
      labels:
        app: my-app
        version: blue
    spec:
      containers:
        - name: app
          image: my-app:v1
---
# Green deployment (new version)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app-green
spec:
  replicas: 5
  selector:
    matchLabels:
      app: my-app
      version: green
  template:
    metadata:
      labels:
        app: my-app
        version: green
    spec:
      containers:
        - name: app
          image: my-app:v2
---
# Service pointing to blue
apiVersion: v1
kind: Service
metadata:
  name: my-app
spec:
  selector:
    app: my-app
    version: blue  # Switch to 'green' to cut over
  ports:
    - port: 80
      targetPort: 8080

# Switch traffic to green
kubectl patch service my-app -p '{"spec":{"selector":{"version":"green"}}}'

# Rollback to blue
kubectl patch service my-app -p '{"spec":{"selector":{"version":"blue"}}}'`,
            analogy: 'Blue-green deployment is like a theater with two identical stages. While the audience watches the show on the blue stage, the crew sets up the new show on the green stage. When ready, the curtain simply shifts to reveal the green stage. If anything goes wrong, the curtain shifts back to blue instantly.',
          },
          {
            heading: 'Canary Deployments',
            content:
              'Canary deployment is a progressive delivery strategy that gradually shifts traffic from the old version to the new version while monitoring for errors. The name comes from the mining practice of using canary birds to detect toxic gases. In Kubernetes, a basic canary deployment can be achieved by running a small Deployment of the new version alongside the existing Deployment, with both selected by the same Service. The traffic split is proportional to the number of Pods: if you have 9 replicas of v1 and 1 replica of v2, roughly 10% of traffic goes to the canary. For more precise traffic control, use a service mesh (Istio VirtualService) or Gateway API (HTTPRoute with weighted backends) to define exact traffic percentages independent of replica count. The canary process typically involves deploying 1-5% of traffic to the new version, monitoring error rates, latency, and business metrics, gradually increasing traffic if metrics are healthy, and rolling back immediately if anomalies are detected. Automated canary analysis tools like Flagger and Argo Rollouts integrate with Prometheus metrics to automate the progressive traffic shift and trigger automatic rollbacks when metrics exceed defined thresholds.',
            code: `# Canary deployment using replica ratio
# Main deployment (v1) - 9 replicas
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app-stable
spec:
  replicas: 9
  selector:
    matchLabels:
      app: my-app
      track: stable
  template:
    metadata:
      labels:
        app: my-app
        track: stable
    spec:
      containers:
        - name: app
          image: my-app:v1
---
# Canary deployment (v2) - 1 replica
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app-canary
spec:
  replicas: 1
  selector:
    matchLabels:
      app: my-app
      track: canary
  template:
    metadata:
      labels:
        app: my-app
        track: canary
    spec:
      containers:
        - name: app
          image: my-app:v2
---
# Service selects both by 'app' label
apiVersion: v1
kind: Service
metadata:
  name: my-app
spec:
  selector:
    app: my-app  # Matches both stable and canary
  ports:
    - port: 80
      targetPort: 8080

# Scale canary up, stable down progressively
kubectl scale deployment app-canary --replicas=3
kubectl scale deployment app-stable --replicas=7`,
            warning: 'Basic canary with replica ratios only provides approximate traffic splitting. For precise percentages (e.g., exactly 1% to canary), use Istio VirtualService, Gateway API HTTPRoute, or Argo Rollouts with a traffic management provider.',
          },
        ],
        quiz: [
          {
            question: 'What do maxSurge and maxUnavailable control in a RollingUpdate strategy?',
            options: [
              'The maximum CPU and memory limits during update',
              'The number of extra Pods created and Pods that can be down simultaneously',
              'The timeout and retry count for the update',
              'The minimum and maximum replica count',
            ],
            correctIndex: 1,
            explanation:
              'maxSurge controls how many Pods above the desired count can exist during the update, while maxUnavailable controls how many Pods can be unavailable. Together they determine the speed and availability guarantees of the rolling update.',
          },
          {
            question: 'How is traffic switched in a blue-green deployment?',
            options: [
              'By gradually scaling up green and scaling down blue',
              'By updating the Service selector to point to the green Deployment',
              'By deleting the blue Deployment and creating green',
              'By modifying the Ingress rules to route to the green Service',
            ],
            correctIndex: 1,
            explanation:
              'In a blue-green deployment, both Deployments run simultaneously and traffic is switched atomically by patching the Service selector from blue to green. This provides instant cutover and rollback capability.',
          },
          {
            question: 'What is the main limitation of canary deployments using replica ratios?',
            options: [
              'They cannot be rolled back',
              'They only work with StatefulSets',
              'Traffic splitting is only approximate and tied to replica count',
              'They require a service mesh to function',
            ],
            correctIndex: 2,
            explanation:
              'When using replica ratios for canary, traffic is distributed proportionally to the number of Pods. This provides only approximate splitting and requires changing replica counts for different percentages. Service meshes and Gateway API offer precise weight-based splitting.',
          },
        ],
      },
      {
        id: 'k8s-rollouts',
        title: 'Rollouts & Rollbacks',
        difficulty: 'intermediate',
        tags: ['kubernetes', 'rollout', 'rollback', 'argo-rollouts', 'revision', 'history'],
        sections: [
          {
            heading: 'Rollout Status and History',
            content:
              'Kubernetes tracks the rollout status of Deployments, providing visibility into the progress and health of updates. The kubectl rollout status command watches a Deployment until it completes or fails, reporting on the number of updated, available, and unavailable replicas. Each Deployment update that changes the Pod template creates a new ReplicaSet, and Kubernetes maintains a configurable history of these revisions. The revisionHistoryLimit field (default 10) controls how many old ReplicaSets are retained for rollback purposes. Each revision stores the complete Pod template specification, allowing exact restoration of any previous version. The kubectl rollout history command displays the revision history with change causes (recorded via the kubernetes.io/change-cause annotation). Understanding rollout mechanics is essential for managing production deployments: a rollout is considered complete when all replicas have been updated and are available, the old ReplicaSet has been scaled to zero, and the Deployment status conditions indicate success. Rollouts can stall due to insufficient resources, failed readiness probes, image pull errors, or resource quota limits, and the progressDeadlineSeconds field (default 600 seconds) determines when a stalled rollout is marked as failed.',
            code: `# Watch rollout progress
kubectl rollout status deployment/web-app

# View rollout history
kubectl rollout history deployment/web-app

# View specific revision details
kubectl rollout history deployment/web-app --revision=3

# Add change-cause annotation for tracking
kubectl annotate deployment/web-app kubernetes.io/change-cause="Updated to v2.1 for bug fix"

# Set revision history limit
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
spec:
  revisionHistoryLimit: 5
  progressDeadlineSeconds: 300
  selector:
    matchLabels:
      app: web-app
  template:
    metadata:
      labels:
        app: web-app
    spec:
      containers:
        - name: web
          image: web-app:v2.1`,
            tip: 'Always set the kubernetes.io/change-cause annotation when updating Deployments so that rollout history shows meaningful descriptions instead of just revision numbers.',
          },
          {
            heading: 'Rollback Operations',
            content:
              'Rollback is the process of reverting a Deployment to a previous revision, and Kubernetes makes this operation simple and fast. The kubectl rollout undo command rolls back to the previous revision by scaling up the old ReplicaSet and scaling down the current one. You can also roll back to a specific revision using the --to-revision flag, which is useful when multiple revisions have been deployed and you need to go back further than just the previous version. Importantly, a rollback creates a new revision number rather than reverting to the old one, maintaining a clear audit trail of all changes. Kubernetes also provides automatic rollback behavior through the combination of readiness probes and the RollingUpdate strategy: if new Pods fail readiness checks, the rollout stalls and does not complete, leaving the old Pods running and serving traffic. This provides a safety net against deploying broken versions, though it does not automatically roll back; it merely pauses the rollout. For fully automated rollback, tools like Argo Rollouts and Flagger monitor application metrics and automatically roll back when error rates or latency exceed configured thresholds. Pause and resume commands allow you to halt a rollout partway through for manual verification before continuing.',
            code: `# Rollback to previous revision
kubectl rollout undo deployment/web-app

# Rollback to a specific revision
kubectl rollout undo deployment/web-app --to-revision=2

# Pause a rollout for manual verification
kubectl rollout pause deployment/web-app

# Resume a paused rollout
kubectl rollout resume deployment/web-app

# Check if rollout is stalled
kubectl get deployment web-app -o jsonpath='{.status.conditions[?(@.type=="Progressing")].reason}'

# View ReplicaSets to see current and old versions
kubectl get replicasets -l app=web-app --sort-by=.metadata.creationTimestamp`,
            note: 'A rollback is equivalent to updating the Deployment to a previous Pod template. It creates a new revision, so revision numbers always increase. Rolling back from revision 5 to revision 3 creates revision 6 with the same spec as revision 3.',
          },
          {
            heading: 'Argo Rollouts for Progressive Delivery',
            content:
              'Argo Rollouts extends Kubernetes with advanced deployment strategies that go beyond what native Deployments offer. It introduces a Rollout custom resource that replaces the Deployment resource and supports blue-green deployments with automated promotion, canary deployments with configurable traffic shifting steps, experiment-based analysis with Prometheus, Datadog, or custom metrics, and integration with service meshes and Ingress controllers for traffic management. A Rollout spec defines steps that include setWeight (change traffic percentage), pause (wait for manual approval or a duration), and analysis (run automated metric checks). AnalysisTemplate resources define the metrics to evaluate, the success criteria, and the failure thresholds. When an analysis fails, Argo Rollouts automatically rolls back the canary to the stable version. The Argo Rollouts controller manages the entire lifecycle: creating canary ReplicaSets, adjusting traffic weights through the configured traffic provider (Istio, NGINX, ALB, etc.), running analysis at each step, and promoting or rolling back based on results. This provides a fully automated progressive delivery pipeline that catches regressions before they affect all users.',
            code: `# Install Argo Rollouts
kubectl create namespace argo-rollouts
kubectl apply -n argo-rollouts -f https://github.com/argoproj/argo-rollouts/releases/latest/download/install.yaml

# Argo Rollout with canary strategy
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: web-app
spec:
  replicas: 10
  selector:
    matchLabels:
      app: web-app
  template:
    metadata:
      labels:
        app: web-app
    spec:
      containers:
        - name: web
          image: web-app:v2
  strategy:
    canary:
      steps:
        - setWeight: 5
        - pause: { duration: 5m }
        - analysis:
            templates:
              - templateName: success-rate
        - setWeight: 25
        - pause: { duration: 5m }
        - setWeight: 50
        - pause: { duration: 5m }
        - setWeight: 100
      trafficRouting:
        istio:
          virtualServices:
            - name: web-app-vsvc
              routes:
                - primary
---
# AnalysisTemplate
apiVersion: argoproj.io/v1alpha1
kind: AnalysisTemplate
metadata:
  name: success-rate
spec:
  metrics:
    - name: success-rate
      interval: 60s
      successCondition: result[0] > 0.95
      provider:
        prometheus:
          address: http://prometheus:9090
          query: |
            sum(rate(http_requests_total{status=~"2.*",app="web-app",version="canary"}[5m]))
            /
            sum(rate(http_requests_total{app="web-app",version="canary"}[5m]))

# Monitor rollout progress
kubectl argo rollouts get rollout web-app --watch`,
            warning: 'Argo Rollouts Rollout resources are not the same as Kubernetes Deployments. You cannot use kubectl rollout commands on them. Use kubectl argo rollouts commands instead.',
          },
        ],
        challenge: {
          prompt:
            'Create an Argo Rollout with a canary strategy that progressively shifts traffic: 10% for 2 minutes, 30% for 5 minutes, 60% for 5 minutes, then 100%. Include an AnalysisTemplate that checks if the error rate stays below 5% using a Prometheus query.',
          starterCode: `apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: api-rollout
spec:
  # Add rollout config

---
apiVersion: argoproj.io/v1alpha1
kind: AnalysisTemplate
metadata:
  name: error-rate-check
spec:
  # Add analysis config`,
          solutionCode: `apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: api-rollout
spec:
  replicas: 10
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
          image: api:v2
          ports:
            - containerPort: 8080
  strategy:
    canary:
      steps:
        - setWeight: 10
        - pause: { duration: 2m }
        - analysis:
            templates:
              - templateName: error-rate-check
        - setWeight: 30
        - pause: { duration: 5m }
        - analysis:
            templates:
              - templateName: error-rate-check
        - setWeight: 60
        - pause: { duration: 5m }
        - analysis:
            templates:
              - templateName: error-rate-check
        - setWeight: 100
---
apiVersion: argoproj.io/v1alpha1
kind: AnalysisTemplate
metadata:
  name: error-rate-check
spec:
  metrics:
    - name: error-rate
      interval: 30s
      count: 5
      successCondition: result[0] < 0.05
      failureLimit: 2
      provider:
        prometheus:
          address: http://prometheus:9090
          query: |
            sum(rate(http_requests_total{status=~"5.*",app="api",version="canary"}[5m]))
            /
            sum(rate(http_requests_total{app="api",version="canary"}[5m]))`,
          hints: [
            'Use setWeight steps followed by pause steps with duration',
            'Insert analysis steps between weight changes to validate each level',
            'The successCondition should check that error rate is less than 0.05 (5%)',
          ],
        },
      },
      {
        id: 'k8s-horizontal-pod-autoscaler',
        title: 'Horizontal Pod Autoscaler (HPA)',
        difficulty: 'intermediate',
        tags: ['kubernetes', 'HPA', 'autoscaling', 'metrics-server', 'custom-metrics', 'scaling'],
        sections: [
          {
            heading: 'HPA Fundamentals and Metrics Server',
            content:
              'The Horizontal Pod Autoscaler (HPA) automatically adjusts the number of Pod replicas in a Deployment, ReplicaSet, or StatefulSet based on observed metrics. HPA periodically queries metrics (default every 15 seconds), calculates the desired replica count using the formula desiredReplicas = ceil(currentReplicas * currentMetricValue / desiredMetricValue), and scales the workload accordingly. The most common metrics are CPU and memory utilization, which require the Metrics Server to be installed in the cluster. Metrics Server collects resource metrics from kubelet on each node and exposes them through the Kubernetes metrics API. HPA supports multiple metric types: Resource metrics (CPU, memory) use the metrics.k8s.io API, custom metrics (application-specific like requests per second) use the custom.metrics.k8s.io API, and external metrics (from outside the cluster like queue depth) use the external.metrics.k8s.io API. The HPA algorithm includes stabilization windows to prevent flapping: by default, scale-up happens within 15 seconds of the metric threshold being exceeded, while scale-down is delayed by 5 minutes to avoid premature scale-in after traffic spikes.',
            code: `# Install Metrics Server
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

# Create HPA with CPU target
kubectl autoscale deployment web-app --cpu-percent=70 --min=2 --max=20

# HPA manifest with multiple metrics
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: web-app-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: web-app
  minReplicas: 2
  maxReplicas: 20
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: 80

# Check HPA status
kubectl get hpa web-app-hpa
kubectl describe hpa web-app-hpa

# View current resource usage
kubectl top pods -l app=web-app`,
            tip: 'Always set resource requests on containers when using HPA with CPU/memory metrics. HPA calculates utilization as a percentage of the requested resources. Without requests, HPA cannot compute utilization and will not scale.',
          },
          {
            heading: 'Custom and External Metrics',
            content:
              'While CPU and memory metrics work well for compute-bound workloads, many applications need to scale based on application-specific or external metrics. Custom metrics represent application-level measurements like HTTP requests per second, queue length, or active connections. To use custom metrics with HPA, you need a metrics adapter that implements the custom.metrics.k8s.io API. Popular adapters include Prometheus Adapter (the most common), which maps Prometheus metrics to the custom metrics API, and KEDA (Kubernetes Event-Driven Autoscaling), which supports over 60 event sources. External metrics represent values from outside the cluster, such as cloud queue depth, SaaS API response times, or database connection counts. These use the external.metrics.k8s.io API and require an adapter that can fetch the external data. KEDA is particularly powerful for event-driven scaling because it can scale to zero replicas when no events are pending and scale up from zero when events arrive, which is not possible with standard HPA. When using multiple metrics, HPA evaluates all metrics and uses the one that results in the highest replica count, ensuring that scaling responds to whichever resource is the bottleneck.',
            code: `# HPA with custom Prometheus metric
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: api-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: api-server
  minReplicas: 3
  maxReplicas: 50
  metrics:
    - type: Pods
      pods:
        metric:
          name: http_requests_per_second
        target:
          type: AverageValue
          averageValue: "100"
    - type: External
      external:
        metric:
          name: sqs_queue_length
          selector:
            matchLabels:
              queue: "orders"
        target:
          type: Value
          value: "50"

# KEDA ScaledObject for event-driven scaling
apiVersion: keda.sh/v1alpha1
kind: ScaledObject
metadata:
  name: worker-scaler
spec:
  scaleTargetRef:
    name: worker
  minReplicaCount: 0
  maxReplicaCount: 100
  triggers:
    - type: rabbitmq
      metadata:
        queueName: tasks
        host: amqp://rabbitmq.default.svc.cluster.local
        queueLength: "10"`,
            note: 'When HPA uses multiple metrics, it takes the maximum desired replica count across all metrics. This means a single metric exceeding its threshold will trigger scaling, even if other metrics are within normal range.',
          },
          {
            heading: 'HPA Behavior and Fine-Tuning',
            content:
              'HPA v2 introduced the behavior field for fine-grained control over scaling speed and stabilization. The scaleUp and scaleDown sections each support policies that define the maximum change allowed within a time window. For example, you can allow adding at most 4 Pods per minute during scale-up, or removing at most 10% of Pods per minute during scale-down. The stabilizationWindowSeconds field prevents rapid oscillation by considering the highest (for scale-down) or lowest (for scale-up) recommendation over the specified window. The selectPolicy field determines how multiple policies interact: Max takes the highest change allowed by any policy, Min takes the lowest, and Disabled prevents scaling in that direction entirely. Proper HPA tuning requires understanding your application traffic patterns. For workloads with predictable daily patterns, combine HPA with scheduled scaling using CronJobs that pre-scale before expected traffic increases. For bursty workloads, configure aggressive scale-up policies with conservative scale-down policies to handle spikes quickly while avoiding premature scale-in. Monitoring HPA decisions through the kubernetes_hpa_status_desired_replicas and kubernetes_hpa_status_current_replicas metrics helps identify tuning opportunities.',
            code: `# HPA with fine-tuned scaling behavior
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: web-app-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: web-app
  minReplicas: 5
  maxReplicas: 100
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
  behavior:
    scaleUp:
      stabilizationWindowSeconds: 0
      policies:
        - type: Pods
          value: 10
          periodSeconds: 60
        - type: Percent
          value: 100
          periodSeconds: 60
      selectPolicy: Max
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
        - type: Percent
          value: 10
          periodSeconds: 60
      selectPolicy: Min

# Scheduled pre-scaling with CronJob
apiVersion: batch/v1
kind: CronJob
metadata:
  name: prescale-morning
spec:
  schedule: "0 7 * * 1-5"
  jobTemplate:
    spec:
      template:
        spec:
          containers:
            - name: scaler
              image: bitnami/kubectl
              command:
                - kubectl
                - scale
                - deployment/web-app
                - --replicas=20
          restartPolicy: OnFailure`,
            warning: 'Setting scaleDown stabilizationWindowSeconds too low (or to 0) can cause rapid oscillation where HPA scales down immediately after a spike, then scales up again as load returns. A 5-minute window is a good starting point.',
          },
        ],
        quiz: [
          {
            question: 'What happens when HPA evaluates multiple metrics?',
            options: [
              'It averages the desired replica counts from all metrics',
              'It uses the metric that results in the highest replica count',
              'It uses the first metric that exceeds its threshold',
              'It requires all metrics to exceed thresholds before scaling',
            ],
            correctIndex: 1,
            explanation:
              'When multiple metrics are configured, HPA calculates the desired replica count for each metric independently and uses the maximum value. This ensures scaling responds to whichever resource is the current bottleneck.',
          },
          {
            question: 'Why must containers have resource requests set for HPA CPU metrics to work?',
            options: [
              'HPA uses requests to calculate the cost of scaling',
              'HPA computes utilization as a percentage of requested resources',
              'Resource requests are required for Pod scheduling',
              'The Metrics Server only collects data from Pods with requests',
            ],
            correctIndex: 1,
            explanation:
              'HPA calculates CPU utilization as (current usage / requested amount) * 100. Without resource requests, this percentage cannot be computed and HPA will report "unknown" for the metric.',
          },
          {
            question: 'What unique capability does KEDA provide over standard HPA?',
            options: [
              'Support for CPU and memory metrics',
              'Scaling to and from zero replicas based on event sources',
              'Faster scaling response times',
              'Integration with cloud load balancers',
            ],
            correctIndex: 1,
            explanation:
              'KEDA can scale workloads to zero replicas when no events are pending and scale up from zero when events arrive. Standard HPA requires a minimum of 1 replica and cannot scale to zero.',
          },
        ],
      },
    ],
  },
];
