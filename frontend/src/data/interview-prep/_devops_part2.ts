import type { InterviewTopic } from './types';

export const DEVOPS_PART2_TOPICS: InterviewTopic[] = [
  // ─── 1. Monitoring ───────────────────────────────────────────────────
  {
    id: 'do-monitoring',
    label: 'Monitoring',
    icon: 'BarChart3',
    description:
      'Prometheus, Grafana, alerting strategies, SLIs/SLOs/SLAs, APM tools, and on-call practices for production observability.',
    questions: [
      {
        id: 'do-monitoring-prometheus',
        title: 'What is Prometheus and how does it collect metrics?',
        difficulty: 'beginner',
        answer:
          'Prometheus is an open-source monitoring system that uses a pull-based model to scrape metrics from instrumented targets at configurable intervals. It stores time-series data locally with a custom TSDB and provides PromQL for querying. Service discovery mechanisms automatically find scrape targets in dynamic environments like Kubernetes.',
        tags: ['prometheus', 'metrics', 'time-series'],
        keyTakeaway: 'Prometheus pulls metrics from targets on a schedule and stores them as time-series data queryable via PromQL.',
      },
      {
        id: 'do-monitoring-grafana',
        title: 'How does Grafana integrate with monitoring backends?',
        difficulty: 'beginner',
        answer:
          'Grafana is a visualization platform that connects to data sources like Prometheus, Loki, Elasticsearch, and CloudWatch through plugin-based datasource drivers. It renders dashboards with panels that execute queries against these backends in real time. Teams share dashboards as JSON models stored in version control or a built-in database.',
        tags: ['grafana', 'dashboards', 'visualization'],
        keyTakeaway: 'Grafana provides a unified visualization layer that queries multiple monitoring backends through pluggable data sources.',
      },
      {
        id: 'do-monitoring-metric-types',
        title: 'What are the four Prometheus metric types?',
        difficulty: 'intermediate',
        answer:
          'Counter is a monotonically increasing value used for request counts or errors. Gauge represents a value that can go up or down, like memory usage or temperature. Histogram samples observations into configurable buckets for measuring distributions like request latency, while Summary calculates configurable quantiles over a sliding time window on the client side.',
        tags: ['prometheus', 'metrics', 'instrumentation'],
        keyTakeaway: 'Counters only increase, gauges fluctuate, histograms bucket observations server-side, and summaries compute quantiles client-side.',
      },
      {
        id: 'do-monitoring-alerting',
        title: 'How do you design effective alerting rules?',
        difficulty: 'intermediate',
        answer:
          'Effective alerts fire on symptoms that impact users rather than on low-level causes, using multi-window burn-rate calculations to reduce noise. Each alert must be actionable with a clear runbook link, severity level, and owning team. Grouping, inhibition, and silencing in Alertmanager prevent alert storms during known maintenance or cascading failures.',
        tags: ['alerting', 'alertmanager', 'on-call'],
        keyTakeaway: 'Alert on user-facing symptoms with clear runbooks and severity levels, not on every internal metric fluctuation.',
      },
      {
        id: 'do-monitoring-sli-slo-sla',
        title: 'What is the difference between SLI, SLO, and SLA?',
        difficulty: 'intermediate',
        answer:
          'An SLI (Service Level Indicator) is a quantitative metric measuring service behavior, such as request latency at the 99th percentile or error rate. An SLO (Service Level Objective) is an internal target range for an SLI, like 99.9% of requests succeed within 200ms. An SLA (Service Level Agreement) is a contractual commitment with financial penalties if the SLO is breached.',
        tags: ['sre', 'reliability', 'slo', 'sla'],
        keyTakeaway: 'SLIs measure behavior, SLOs set internal targets for those measurements, and SLAs attach contractual consequences to them.',
      },
      {
        id: 'do-monitoring-apm',
        title: 'What do APM tools provide beyond basic metrics?',
        difficulty: 'advanced',
        answer:
          'Application Performance Monitoring tools like Datadog, New Relic, and Dynatrace provide distributed tracing across service boundaries, automatic service dependency maps, and code-level profiling. They correlate traces with logs and metrics in a single pane, enabling root-cause analysis by showing exactly which service, function, or database query caused a latency spike. Most APM tools also support real-user monitoring for frontend performance.',
        tags: ['apm', 'tracing', 'observability'],
        keyTakeaway: 'APM tools correlate distributed traces, logs, and metrics to pinpoint the exact service and code path causing performance degradation.',
      },
      {
        id: 'do-monitoring-dashboards',
        title: 'What are best practices for building monitoring dashboards?',
        difficulty: 'intermediate',
        answer:
          'Dashboards should follow the USE method (Utilization, Saturation, Errors) for infrastructure and the RED method (Rate, Errors, Duration) for services, organized in a top-down hierarchy from business KPIs to system internals. Each dashboard should serve a single audience and purpose, with no more than 8-12 panels to prevent cognitive overload. Template variables enable a single dashboard definition to work across environments and services.',
        tags: ['dashboards', 'grafana', 'observability'],
        keyTakeaway: 'Structure dashboards around USE for infrastructure and RED for services, keeping panels focused on a single audience.',
      },
      {
        id: 'do-monitoring-oncall',
        title: 'How should on-call rotations and incident response be structured?',
        difficulty: 'advanced',
        answer:
          'On-call rotations should have primary and secondary responders with automatic escalation paths and a maximum shift length of one week to prevent burnout. Every alert that pages an engineer must be documented with a runbook, and post-incident reviews should be blameless, focusing on systemic improvements. Error budgets derived from SLOs determine when to freeze feature work and prioritize reliability investments.',
        tags: ['on-call', 'incident-response', 'sre'],
        keyTakeaway: 'Sustainable on-call requires clear escalation paths, runbooks for every alert, blameless postmortems, and error-budget-driven prioritization.',
      },
    ],
  },

  // ─── 2. Logging ──────────────────────────────────────────────────────
  {
    id: 'do-logging',
    label: 'Logging',
    icon: 'FileText',
    description:
      'ELK stack, Fluentd, structured logging, log rotation, centralized logging architectures, and log level strategies.',
    questions: [
      {
        id: 'do-logging-elk',
        title: 'What is the ELK stack and how do its components work together?',
        difficulty: 'beginner',
        answer:
          'ELK stands for Elasticsearch, Logstash, and Kibana. Logstash ingests logs from multiple sources, parses and transforms them with filter plugins, then ships structured documents to Elasticsearch for indexing and full-text search. Kibana provides a web UI for searching, visualizing, and building dashboards over the indexed log data.',
        tags: ['elk', 'elasticsearch', 'kibana'],
        keyTakeaway: 'Logstash collects and transforms logs, Elasticsearch indexes them for search, and Kibana visualizes the results.',
      },
      {
        id: 'do-logging-fluentd',
        title: 'How does Fluentd differ from Logstash?',
        difficulty: 'intermediate',
        answer:
          'Fluentd is a CNCF graduated project that uses a lightweight, pluggable architecture with a unified logging layer built on tagged event routing. It has a smaller memory footprint than Logstash and is the de facto log collector in Kubernetes environments via Fluent Bit as a DaemonSet. Fluentd routes logs by matching tags to output plugins, while Logstash uses a pipeline of input, filter, and output stages.',
        tags: ['fluentd', 'fluent-bit', 'kubernetes'],
        keyTakeaway: 'Fluentd is lighter weight than Logstash and is the standard Kubernetes log collector through its Fluent Bit variant.',
      },
      {
        id: 'do-logging-structured',
        title: 'Why is structured logging important?',
        difficulty: 'beginner',
        answer:
          'Structured logging emits log entries as key-value pairs or JSON objects instead of free-form text strings, making them machine-parseable without fragile regex extraction. This enables efficient filtering, aggregation, and correlation across services by fields like request_id, user_id, or trace_id. Structured logs integrate directly with log analytics platforms without custom parsing pipelines.',
        tags: ['structured-logging', 'json', 'observability'],
        keyTakeaway: 'Structured logs use key-value fields instead of free text, enabling reliable machine parsing and cross-service correlation.',
      },
      {
        id: 'do-logging-rotation',
        title: 'How does log rotation work and why is it necessary?',
        difficulty: 'beginner',
        answer:
          'Log rotation compresses and archives old log files on a schedule or when they reach a size threshold, preventing disk exhaustion that would crash applications. Tools like logrotate on Linux manage rotation policies including maximum file count, compression, and post-rotation hooks. In containerized environments, stdout-based logging with a DaemonSet collector replaces file-based rotation entirely.',
        tags: ['logrotate', 'disk-management', 'linux'],
        keyTakeaway: 'Log rotation prevents disk exhaustion by archiving and compressing old logs on a size or time-based schedule.',
      },
      {
        id: 'do-logging-centralized',
        title: 'What are the benefits of centralized logging?',
        difficulty: 'intermediate',
        answer:
          'Centralized logging aggregates logs from all services, servers, and containers into a single searchable platform, eliminating the need to SSH into individual machines for debugging. It enables cross-service correlation using shared identifiers like trace IDs, supports access control and audit compliance, and provides retention policies independent of individual host lifecycles. This is essential for ephemeral infrastructure like containers and serverless functions.',
        tags: ['centralized-logging', 'aggregation', 'compliance'],
        keyTakeaway: 'Centralized logging eliminates per-host debugging by aggregating all logs into one searchable, access-controlled platform.',
      },
      {
        id: 'do-logging-levels',
        title: 'How should log levels be used across environments?',
        difficulty: 'beginner',
        answer:
          'Log levels from most to least severe are FATAL, ERROR, WARN, INFO, DEBUG, and TRACE. Production environments should run at INFO level to balance observability with volume and cost, with the ability to dynamically increase to DEBUG for specific services during incident investigation. DEBUG and TRACE levels are reserved for development and troubleshooting, as they generate orders of magnitude more data.',
        tags: ['log-levels', 'debugging', 'best-practices'],
        keyTakeaway: 'Run production at INFO level and dynamically enable DEBUG only for targeted troubleshooting to control log volume.',
      },
    ],
  },

  // ─── 3. Linux Administration ─────────────────────────────────────────
  {
    id: 'do-linux',
    label: 'Linux Administration',
    icon: 'Terminal',
    description:
      'File permissions, process management, systemd, cron, disk management, package managers, and troubleshooting tools.',
    questions: [
      {
        id: 'do-linux-permissions',
        title: 'How do Linux file permissions work?',
        difficulty: 'beginner',
        answer:
          'Linux file permissions use a three-tier model of owner, group, and others, each with read (4), write (2), and execute (1) bits represented as octal values like 755. The setuid, setgid, and sticky bits provide additional controls for privilege escalation and shared directory behavior. The chmod command modifies permissions while chown changes ownership.',
        tags: ['permissions', 'chmod', 'security'],
        keyTakeaway: 'File permissions assign read, write, and execute rights independently to the owner, group, and all other users.',
      },
      {
        id: 'do-linux-process-mgmt',
        title: 'How do you manage processes in Linux?',
        difficulty: 'beginner',
        answer:
          'Processes are viewed with ps, top, or htop and identified by their PID. Signals like SIGTERM (15) request graceful shutdown while SIGKILL (9) forces immediate termination via the kill command. Background processes are managed with jobs, bg, fg, and nohup, while nice and renice adjust CPU scheduling priority.',
        tags: ['processes', 'signals', 'linux'],
        keyTakeaway: 'Use SIGTERM for graceful shutdown and SIGKILL as a last resort, and manage priorities with nice values.',
      },
      {
        id: 'do-linux-systemd',
        title: 'What is systemd and how do you manage services with it?',
        difficulty: 'intermediate',
        answer:
          'Systemd is the init system and service manager for most modern Linux distributions, using unit files to define service configuration, dependencies, and restart policies. Commands like systemctl start, stop, enable, and status control service lifecycle, while journalctl accesses structured logs. Unit files support dependency ordering, resource limits via cgroups, and socket activation for on-demand startup.',
        tags: ['systemd', 'services', 'init-system'],
        keyTakeaway: 'Systemd manages service lifecycle through declarative unit files with dependency ordering, restart policies, and cgroup resource limits.',
      },
      {
        id: 'do-linux-cron',
        title: 'How do cron jobs work in Linux?',
        difficulty: 'beginner',
        answer:
          'Cron is a time-based job scheduler that executes commands on a defined schedule using five fields: minute, hour, day-of-month, month, and day-of-week. Users edit their crontab with crontab -e, while system-wide jobs live in /etc/cron.d or /etc/crontab. Cron does not capture output by default, so jobs should redirect stdout and stderr to log files or a logging service.',
        tags: ['cron', 'scheduling', 'automation'],
        keyTakeaway: 'Cron runs scheduled commands based on a five-field time expression and requires explicit output redirection for logging.',
      },
      {
        id: 'do-linux-disk',
        title: 'How do you manage disk space and filesystems?',
        difficulty: 'intermediate',
        answer:
          'The df command shows filesystem usage while du measures directory sizes, and lsblk lists block devices. LVM (Logical Volume Manager) provides flexible volume management with the ability to resize volumes online. Filesystem creation uses mkfs, mounting uses mount and /etc/fstab for persistence, and tools like ncdu help identify space-consuming directories interactively.',
        tags: ['disk', 'lvm', 'filesystem'],
        keyTakeaway: 'Use df for filesystem overview, du for directory sizes, and LVM for flexible volume management with online resizing.',
      },
      {
        id: 'do-linux-package-managers',
        title: 'What is the difference between apt and yum/dnf?',
        difficulty: 'beginner',
        answer:
          'Apt is the package manager for Debian-based distributions like Ubuntu, using .deb packages from repositories defined in /etc/apt/sources.list. Yum and its successor dnf serve Red Hat-based distributions like RHEL and Fedora, using .rpm packages. Both resolve dependencies automatically, but they use different repository formats, configuration paths, and underlying libraries.',
        tags: ['apt', 'yum', 'packages'],
        keyTakeaway: 'Apt manages .deb packages on Debian systems while yum/dnf manages .rpm packages on Red Hat systems, both with automatic dependency resolution.',
      },
      {
        id: 'do-linux-user-mgmt',
        title: 'How do you manage users and groups in Linux?',
        difficulty: 'beginner',
        answer:
          'Users are created with useradd, modified with usermod, and removed with userdel, with information stored in /etc/passwd and /etc/shadow. Groups are managed with groupadd and groupmod, and users are assigned to supplementary groups via usermod -aG. The sudo mechanism in /etc/sudoers grants specific users elevated privileges without sharing the root password.',
        tags: ['users', 'groups', 'sudo'],
        keyTakeaway: 'Manage users with useradd/usermod, assign group memberships with usermod -aG, and grant privileges through sudo rules.',
      },
      {
        id: 'do-linux-kernel',
        title: 'What are the basics of the Linux kernel you should know as a DevOps engineer?',
        difficulty: 'advanced',
        answer:
          'The kernel manages hardware resources, process scheduling, memory via virtual address spaces, and I/O through device drivers. Key tunable parameters live in /proc/sys and are configured with sysctl for settings like network buffer sizes, file descriptor limits, and virtual memory behavior. Kernel modules are loaded dynamically with modprobe, and understanding cgroups and namespaces is essential since they underpin containers.',
        tags: ['kernel', 'sysctl', 'cgroups'],
        keyTakeaway: 'The kernel manages scheduling, memory, and I/O, with sysctl tunables and cgroups/namespaces being critical for container infrastructure.',
      },
      {
        id: 'do-linux-performance',
        title: 'How do you tune Linux performance?',
        difficulty: 'advanced',
        answer:
          'Performance tuning starts with identifying bottlenecks across CPU, memory, disk I/O, and network using tools like vmstat, iostat, and sar. Sysctl parameters adjust kernel behavior for network throughput (tcp buffer sizes, somaxconn), file handle limits, and VM swappiness. CPU governor settings, I/O scheduler selection (mq-deadline vs kyber for NVMe), and NUMA-aware process pinning provide further optimization for specific workloads.',
        tags: ['performance', 'tuning', 'sysctl'],
        keyTakeaway: 'Identify bottlenecks with vmstat/iostat/sar, then tune sysctl parameters, I/O schedulers, and CPU governors to match the workload.',
      },
      {
        id: 'do-linux-troubleshooting',
        title: 'What tools do you use for Linux troubleshooting?',
        difficulty: 'intermediate',
        answer:
          'Top and htop show real-time process resource consumption, while strace traces system calls for debugging application behavior. Dmesg reveals kernel ring buffer messages for hardware and driver issues. Tcpdump and ss diagnose network problems, lsof shows open files and sockets per process, and iotop identifies processes causing disk I/O bottlenecks.',
        tags: ['troubleshooting', 'strace', 'debugging'],
        keyTakeaway: 'Use top/htop for CPU and memory, strace for syscall tracing, dmesg for kernel messages, and tcpdump/ss for network issues.',
      },
    ],
  },

  // ─── 4. Networking ───────────────────────────────────────────────────
  {
    id: 'do-networking',
    label: 'Networking',
    icon: 'Network',
    description:
      'OSI model, TCP/UDP, DNS, HTTP/HTTPS, firewalls, VPN, load balancers, CDN, SSL/TLS, and network troubleshooting.',
    questions: [
      {
        id: 'do-networking-osi',
        title: 'What are the seven layers of the OSI model?',
        difficulty: 'beginner',
        answer:
          'The OSI model defines seven layers from bottom to top: Physical (bits over wire), Data Link (MAC frames), Network (IP routing), Transport (TCP/UDP segments), Session (connection management), Presentation (encryption and encoding), and Application (HTTP, DNS, SMTP). In practice, the TCP/IP model collapses these into four layers, but the OSI model remains the standard framework for describing where network issues occur.',
        tags: ['osi', 'networking-fundamentals', 'tcp-ip'],
        keyTakeaway: 'The OSI model provides a seven-layer framework for describing network communication, though TCP/IP uses a simplified four-layer model.',
      },
      {
        id: 'do-networking-tcp-udp',
        title: 'What is the difference between TCP and UDP?',
        difficulty: 'beginner',
        answer:
          'TCP is a connection-oriented protocol that guarantees ordered, reliable delivery through a three-way handshake, sequence numbers, acknowledgments, and retransmission. UDP is connectionless and provides no delivery guarantees, making it faster with lower overhead for use cases like DNS queries, video streaming, and gaming. TCP adds latency from connection setup and congestion control, while UDP sacrifices reliability for speed.',
        tags: ['tcp', 'udp', 'transport-layer'],
        keyTakeaway: 'TCP guarantees reliable ordered delivery with higher overhead, while UDP trades reliability for speed and lower latency.',
      },
      {
        id: 'do-networking-dns',
        title: 'How does DNS resolution work?',
        difficulty: 'intermediate',
        answer:
          'When a client requests a domain, it first checks its local cache, then queries a recursive resolver which traverses the DNS hierarchy from root servers to TLD servers to authoritative nameservers. The authoritative server returns the final IP address, and each layer caches the result according to the TTL value. Record types include A (IPv4), AAAA (IPv6), CNAME (alias), MX (mail), and TXT (verification and SPF/DKIM).',
        tags: ['dns', 'resolution', 'records'],
        keyTakeaway: 'DNS resolves domains by recursively querying root, TLD, and authoritative nameservers, caching results based on TTL values.',
      },
      {
        id: 'do-networking-http-https',
        title: 'How does HTTPS secure HTTP communication?',
        difficulty: 'intermediate',
        answer:
          'HTTPS wraps HTTP inside a TLS connection that provides encryption, authentication, and integrity. During the TLS handshake, the server presents a certificate signed by a trusted CA, the client verifies it, and both negotiate a symmetric session key using asymmetric cryptography. TLS 1.3 reduces the handshake to one round-trip and removes legacy insecure cipher suites, making it both faster and more secure than TLS 1.2.',
        tags: ['https', 'tls', 'encryption'],
        keyTakeaway: 'HTTPS uses TLS to encrypt traffic and authenticate servers via certificates, with TLS 1.3 completing the handshake in a single round-trip.',
      },
      {
        id: 'do-networking-firewalls',
        title: 'How do iptables and nftables manage firewall rules?',
        difficulty: 'intermediate',
        answer:
          'Iptables is the traditional Linux packet filtering framework that organizes rules into chains (INPUT, OUTPUT, FORWARD) within tables (filter, nat, mangle). Nftables is its modern replacement with a unified syntax, better performance through set-based matching, and atomic rule updates. Both filter packets based on source/destination IP, port, protocol, and connection state, with rules evaluated top-down until a match is found.',
        tags: ['firewall', 'iptables', 'nftables'],
        keyTakeaway: 'Iptables and nftables filter packets using chains of rules matched top-down, with nftables offering better performance and unified syntax.',
      },
      {
        id: 'do-networking-vpn',
        title: 'What is a VPN and what protocols does it use?',
        difficulty: 'intermediate',
        answer:
          'A VPN creates an encrypted tunnel between two endpoints over an untrusted network, providing confidentiality and simulating direct network connectivity. Common protocols include IPSec (site-to-site and remote access), OpenVPN (SSL/TLS-based, highly portable), and WireGuard (modern, minimal codebase, kernel-level performance). Site-to-site VPNs connect entire networks while client VPNs provide individual remote access.',
        tags: ['vpn', 'wireguard', 'ipsec'],
        keyTakeaway: 'VPNs encrypt traffic through tunnels using protocols like IPSec, OpenVPN, or WireGuard for secure network connectivity.',
      },
      {
        id: 'do-networking-load-balancers',
        title: 'What are the different types of load balancers?',
        difficulty: 'intermediate',
        answer:
          'Layer 4 (transport) load balancers route based on IP and TCP/UDP port without inspecting payload, offering high throughput with minimal latency. Layer 7 (application) load balancers inspect HTTP headers, URLs, and cookies to make content-aware routing decisions like path-based routing or sticky sessions. Common implementations include HAProxy, NGINX, AWS ALB/NLB, and cloud-native service meshes like Envoy.',
        tags: ['load-balancer', 'l4', 'l7', 'haproxy'],
        keyTakeaway: 'Layer 4 load balancers route by IP and port for raw speed, while Layer 7 balancers inspect HTTP content for intelligent routing.',
      },
      {
        id: 'do-networking-cdn',
        title: 'How does a CDN improve application performance?',
        difficulty: 'beginner',
        answer:
          'A CDN caches content at geographically distributed edge servers so users are served from the nearest location, reducing latency from hundreds of milliseconds to single digits. CDNs also absorb traffic spikes and DDoS attacks, offload bandwidth from origin servers, and can optimize content delivery with compression and protocol upgrades like HTTP/3. Popular CDNs include CloudFront, Cloudflare, Fastly, and Akamai.',
        tags: ['cdn', 'caching', 'performance'],
        keyTakeaway: 'CDNs cache content at global edge locations to minimize latency, absorb traffic spikes, and offload origin server bandwidth.',
      },
      {
        id: 'do-networking-ssl-tls',
        title: 'How do SSL/TLS certificates work?',
        difficulty: 'intermediate',
        answer:
          'TLS certificates bind a public key to a domain identity, signed by a Certificate Authority that browsers trust. The server presents its certificate during the TLS handshake, and the client validates the signature chain up to a trusted root CA. Certificates can be obtained from commercial CAs or free via Let\'s Encrypt with automated renewal, and wildcard certificates cover all subdomains of a domain.',
        tags: ['ssl', 'tls', 'certificates', 'pki'],
        keyTakeaway: 'TLS certificates authenticate server identity through a CA trust chain and enable encrypted communication via public key cryptography.',
      },
      {
        id: 'do-networking-troubleshooting',
        title: 'What tools do you use for network troubleshooting?',
        difficulty: 'beginner',
        answer:
          'Ping tests basic ICMP connectivity and latency, traceroute shows the hop-by-hop path packets take, and netstat or ss display active connections and listening ports. Dig and nslookup diagnose DNS resolution issues, curl tests HTTP endpoints with detailed timing, and tcpdump or Wireshark capture packets for deep protocol analysis. MTR combines ping and traceroute into a continuous diagnostic view.',
        tags: ['troubleshooting', 'ping', 'traceroute', 'tcpdump'],
        keyTakeaway: 'Use ping for connectivity, traceroute for path analysis, ss for connection state, dig for DNS, and tcpdump for packet-level debugging.',
      },
    ],
  },

  // ─── 5. GitOps ───────────────────────────────────────────────────────
  {
    id: 'do-gitops',
    label: 'GitOps',
    icon: 'GitMerge',
    description:
      'ArgoCD, Flux, declarative infrastructure, pull-based deployment, drift reconciliation, and GitOps principles.',
    questions: [
      {
        id: 'do-gitops-principles',
        title: 'What are the core principles of GitOps?',
        difficulty: 'beginner',
        answer:
          'GitOps uses Git as the single source of truth for declarative infrastructure and application configuration, with all changes made through pull requests. An automated agent continuously reconciles the live system state to match the desired state defined in Git. This provides a complete audit trail, easy rollbacks via git revert, and eliminates manual kubectl or CLI-based deployments.',
        tags: ['gitops', 'declarative', 'iac'],
        keyTakeaway: 'GitOps declares desired state in Git and uses automated agents to continuously reconcile live systems to match that state.',
      },
      {
        id: 'do-gitops-argocd',
        title: 'How does ArgoCD implement GitOps for Kubernetes?',
        difficulty: 'intermediate',
        answer:
          'ArgoCD is a declarative Kubernetes-native continuous delivery tool that watches Git repositories for changes and syncs them to target clusters. It provides a web UI and CLI for visualizing application state, sync status, and resource health across clusters. ArgoCD supports Helm, Kustomize, and plain YAML manifests, with configurable sync policies for automatic or manual promotion.',
        tags: ['argocd', 'kubernetes', 'continuous-delivery'],
        keyTakeaway: 'ArgoCD watches Git repos and automatically syncs Kubernetes manifests to clusters with visual state tracking and multi-format support.',
      },
      {
        id: 'do-gitops-flux',
        title: 'How does Flux differ from ArgoCD?',
        difficulty: 'intermediate',
        answer:
          'Flux is a CNCF graduated GitOps toolkit that takes a modular, controller-based approach where each component (source, kustomize, helm, notification) runs independently. Unlike ArgoCD\'s centralized web UI, Flux is fully CLI and API driven, making it lighter weight and more composable. Flux also natively supports image automation to update Git manifests when new container images are published.',
        tags: ['flux', 'cncf', 'gitops'],
        keyTakeaway: 'Flux uses modular controllers without a web UI, offering lighter weight GitOps with native image update automation.',
      },
      {
        id: 'do-gitops-declarative',
        title: 'Why is declarative infrastructure preferred in GitOps?',
        difficulty: 'beginner',
        answer:
          'Declarative infrastructure describes the desired end state rather than the steps to achieve it, enabling idempotent application and automatic drift correction. This means the system can be reliably reproduced from the declaration alone, regardless of the current state. Imperative scripts depend on execution order and current state, making them fragile to partial failures and difficult to audit or diff.',
        tags: ['declarative', 'idempotent', 'infrastructure'],
        keyTakeaway: 'Declarative infrastructure defines desired state for idempotent, reproducible application rather than fragile step-by-step scripts.',
      },
      {
        id: 'do-gitops-pull-based',
        title: 'What is pull-based deployment and why is it more secure?',
        difficulty: 'intermediate',
        answer:
          'In pull-based deployment, an agent running inside the cluster pulls the desired state from Git rather than an external CI system pushing changes in. This eliminates the need to expose cluster credentials to CI pipelines or the internet, reducing the attack surface. The agent has read-only access to Git and write access only within its cluster, following the principle of least privilege.',
        tags: ['pull-based', 'security', 'deployment'],
        keyTakeaway: 'Pull-based deployment keeps cluster credentials inside the cluster instead of exposing them to external CI systems.',
      },
      {
        id: 'do-gitops-drift',
        title: 'How does drift reconciliation work in GitOps?',
        difficulty: 'advanced',
        answer:
          'The GitOps agent periodically compares the live cluster state against the desired state in Git, and automatically corrects any differences caused by manual changes, failed deployments, or external modifications. This continuous reconciliation loop ensures the cluster always converges toward the Git-defined state. Drift detection intervals are configurable, and alerts can notify teams when manual overrides are detected and reverted.',
        tags: ['drift', 'reconciliation', 'compliance'],
        keyTakeaway: 'GitOps agents continuously detect and correct differences between live cluster state and the desired state declared in Git.',
      },
    ],
  },

  // ─── 6. DevSecOps ────────────────────────────────────────────────────
  {
    id: 'do-security',
    label: 'DevSecOps',
    icon: 'Shield',
    description:
      'SAST/DAST, dependency scanning, secrets management, container security, network policies, compliance as code, and zero trust.',
    questions: [
      {
        id: 'do-security-sast-dast',
        title: 'What is the difference between SAST and DAST?',
        difficulty: 'beginner',
        answer:
          'SAST (Static Application Security Testing) analyzes source code or binaries without executing them, catching vulnerabilities like SQL injection and hardcoded secrets early in the development cycle. DAST (Dynamic Application Security Testing) tests running applications by sending malicious requests to find runtime vulnerabilities like XSS and authentication flaws. Both are complementary and should be integrated into the CI/CD pipeline at different stages.',
        tags: ['sast', 'dast', 'application-security'],
        keyTakeaway: 'SAST scans code without running it for early detection while DAST probes running applications for runtime vulnerabilities.',
      },
      {
        id: 'do-security-dependency-scanning',
        title: 'How does dependency scanning protect your supply chain?',
        difficulty: 'intermediate',
        answer:
          'Dependency scanners like Snyk, Trivy, and Dependabot analyze project manifests and lock files against vulnerability databases like the NVD and GitHub Advisory Database. They identify known CVEs in transitive dependencies that developers may not even be aware of and can automatically create pull requests with patched versions. Scanning should run on every commit and periodically on main branches to catch newly disclosed vulnerabilities.',
        tags: ['dependency-scanning', 'snyk', 'cve'],
        keyTakeaway: 'Dependency scanners identify known CVEs in direct and transitive dependencies, with automated PR-based remediation.',
      },
      {
        id: 'do-security-vault',
        title: 'How does HashiCorp Vault manage secrets?',
        difficulty: 'intermediate',
        answer:
          'Vault provides centralized secrets management with dynamic credential generation, automatic rotation, and fine-grained access policies. Applications authenticate via methods like Kubernetes service accounts or AWS IAM roles, then receive short-lived, scoped tokens to access secrets. Vault can generate on-demand database credentials that are automatically revoked after a TTL, eliminating long-lived static passwords entirely.',
        tags: ['vault', 'secrets', 'dynamic-credentials'],
        keyTakeaway: 'Vault provides dynamic, short-lived secrets with automatic rotation, replacing static credentials with policy-controlled access.',
      },
      {
        id: 'do-security-container',
        title: 'What are container security best practices?',
        difficulty: 'intermediate',
        answer:
          'Container security starts with minimal base images like distroless or Alpine to reduce attack surface, scanning images for CVEs in CI with tools like Trivy before they reach a registry. Containers should run as non-root users with read-only filesystems, dropped Linux capabilities, and no privilege escalation. Runtime security tools like Falco monitor for anomalous behavior such as unexpected process execution or network connections inside containers.',
        tags: ['container-security', 'trivy', 'distroless'],
        keyTakeaway: 'Use minimal base images, scan for CVEs in CI, run as non-root with dropped capabilities, and monitor runtime behavior.',
      },
      {
        id: 'do-security-network-policies',
        title: 'How do Kubernetes network policies enforce segmentation?',
        difficulty: 'advanced',
        answer:
          'Kubernetes NetworkPolicy resources define allowlists for pod-to-pod and pod-to-external traffic based on labels, namespaces, and CIDR blocks. By default pods can communicate with all other pods, so a deny-all default policy must be applied first, then specific ingress and egress rules opened per service. A CNI plugin like Calico or Cilium must be installed to actually enforce these policies since the default kubenet does not.',
        tags: ['network-policies', 'kubernetes', 'segmentation'],
        keyTakeaway: 'Network policies create pod-level firewall rules requiring a deny-all default and a compatible CNI plugin for enforcement.',
      },
      {
        id: 'do-security-compliance',
        title: 'What is compliance as code?',
        difficulty: 'advanced',
        answer:
          'Compliance as code expresses regulatory requirements and organizational policies as automated, version-controlled checks that run in CI/CD pipelines. Tools like Open Policy Agent (OPA), Checkov, and AWS Config Rules evaluate infrastructure definitions against policy libraries before deployment. This replaces manual audit spreadsheets with continuous, enforceable guardrails that produce machine-readable compliance evidence.',
        tags: ['compliance', 'opa', 'policy-as-code'],
        keyTakeaway: 'Compliance as code automates regulatory checks in CI/CD pipelines using tools like OPA, replacing manual audits with continuous enforcement.',
      },
      {
        id: 'do-security-supply-chain',
        title: 'What is software supply chain security?',
        difficulty: 'advanced',
        answer:
          'Supply chain security ensures the integrity of every component from source code to deployed artifact through measures like signed commits, SLSA build provenance, container image signing with cosign/Sigstore, and SBOMs (Software Bill of Materials). Frameworks like SLSA define maturity levels for build integrity, and admission controllers can reject unsigned or unverified images at deployment time. This protects against compromised dependencies, build systems, and registries.',
        tags: ['supply-chain', 'slsa', 'sigstore'],
        keyTakeaway: 'Supply chain security verifies artifact integrity from source to deployment using signatures, provenance attestations, and SBOMs.',
      },
      {
        id: 'do-security-zero-trust',
        title: 'What is zero trust architecture?',
        difficulty: 'advanced',
        answer:
          'Zero trust eliminates implicit trust based on network location, requiring every request to be authenticated, authorized, and encrypted regardless of whether it originates inside or outside the network perimeter. It relies on strong identity verification, device health checks, least-privilege access policies, and continuous validation rather than a single firewall boundary. Service meshes like Istio implement zero trust between microservices through mutual TLS and fine-grained authorization policies.',
        tags: ['zero-trust', 'mtls', 'identity'],
        keyTakeaway: 'Zero trust authenticates and authorizes every request regardless of network location, replacing perimeter-based security with continuous verification.',
      },
    ],
  },

  // ─── 7. Shell Scripting ──────────────────────────────────────────────
  {
    id: 'do-shell',
    label: 'Shell Scripting',
    icon: 'Terminal',
    description:
      'Bash fundamentals, variables, loops, pipes, sed/awk, process substitution, error handling, and script debugging.',
    questions: [
      {
        id: 'do-shell-basics',
        title: 'What are the fundamentals of a Bash script?',
        difficulty: 'beginner',
        answer:
          'A Bash script starts with a shebang line (#!/usr/bin/env bash) that tells the kernel which interpreter to use. Scripts should begin with set -euo pipefail to exit on errors, undefined variables, and pipe failures, providing a safe default execution mode. The script must be marked executable with chmod +x before it can be run directly.',
        tags: ['bash', 'shebang', 'scripting'],
        keyTakeaway: 'Start scripts with a shebang and set -euo pipefail to catch errors, undefined variables, and broken pipes early.',
      },
      {
        id: 'do-shell-variables-loops',
        title: 'How do variables, loops, and conditionals work in Bash?',
        difficulty: 'beginner',
        answer:
          'Variables are assigned without spaces around the equals sign and referenced with a dollar sign prefix, using curly braces for clarity. For loops iterate over lists or command output, while loops repeat until a condition fails, and if/elif/else blocks use test expressions in square brackets. Double brackets provide extended pattern matching and safer string comparison than single brackets.',
        tags: ['variables', 'loops', 'conditionals'],
        keyTakeaway: 'Bash uses no-space assignment, dollar-sign references, for/while loops, and double-bracket conditionals for safe comparisons.',
      },
      {
        id: 'do-shell-pipes-redirection',
        title: 'How do pipes and redirection work?',
        difficulty: 'beginner',
        answer:
          'Pipes connect the stdout of one command to the stdin of the next using the pipe character, enabling composable command chains. Output redirection sends stdout to a file with > (overwrite) or >> (append), while 2> redirects stderr and &> redirects both. Input redirection with < feeds file contents to a command\'s stdin, and here-documents with << provide inline multi-line input.',
        tags: ['pipes', 'redirection', 'stdin-stdout'],
        keyTakeaway: 'Pipes chain command output to input, while >, >>, 2>, and &> redirect stdout and stderr to files or combine them.',
      },
      {
        id: 'do-shell-sed-awk',
        title: 'What are sed and awk used for?',
        difficulty: 'intermediate',
        answer:
          'Sed is a stream editor for performing text transformations like find-and-replace, line deletion, and insertion on a per-line basis using regular expressions. Awk is a pattern-scanning language that excels at column-based data extraction and transformation, treating each line as a record with whitespace-delimited fields. Together they form the backbone of text processing in shell pipelines for tasks like log parsing and report generation.',
        tags: ['sed', 'awk', 'text-processing'],
        keyTakeaway: 'Sed performs regex-based stream editing per line while awk processes column-oriented data with field-based pattern matching.',
      },
      {
        id: 'do-shell-process-substitution',
        title: 'What is process substitution in Bash?',
        difficulty: 'advanced',
        answer:
          'Process substitution using <(command) or >(command) creates a temporary file descriptor that contains command output, allowing commands that expect file arguments to read from process output. This enables comparing two command outputs with diff <(cmd1) <(cmd2) without creating temporary files. It differs from pipes because it provides a file-like path rather than piping stdin, allowing multiple simultaneous input streams.',
        tags: ['process-substitution', 'bash', 'advanced'],
        keyTakeaway: 'Process substitution provides command output as a file descriptor, enabling file-expecting commands to read from dynamic sources.',
      },
      {
        id: 'do-shell-error-handling',
        title: 'How do you handle errors robustly in Bash scripts?',
        difficulty: 'intermediate',
        answer:
          'Beyond set -euo pipefail, robust error handling uses trap to catch EXIT, ERR, and INT signals for cleanup operations like removing temporary files or releasing locks. Functions should return meaningful exit codes, and critical operations should use explicit if-then checks rather than relying solely on set -e which has subtle edge cases with subshells and compound commands. The $? variable captures the exit status of the last command.',
        tags: ['error-handling', 'trap', 'exit-codes'],
        keyTakeaway: 'Use set -euo pipefail as a baseline, trap for cleanup on exit, and explicit if-checks for critical operations.',
      },
      {
        id: 'do-shell-cron-expressions',
        title: 'How do you write and debug cron expressions?',
        difficulty: 'intermediate',
        answer:
          'Cron expressions use five fields (minute 0-59, hour 0-23, day 1-31, month 1-12, weekday 0-7) with asterisks for any value, commas for lists, hyphens for ranges, and slashes for intervals. Common patterns include */5 * * * * for every five minutes and 0 2 * * 1 for 2 AM every Monday. Debugging requires checking cron daemon logs, ensuring the PATH is set explicitly since cron runs with a minimal environment, and testing scripts standalone first.',
        tags: ['cron', 'scheduling', 'expressions'],
        keyTakeaway: 'Cron uses five time fields with wildcards, ranges, and intervals, requiring explicit PATH settings since cron has a minimal environment.',
      },
      {
        id: 'do-shell-debugging',
        title: 'How do you debug Bash scripts?',
        difficulty: 'intermediate',
        answer:
          'Running a script with bash -x enables trace mode that prints each command before execution with expanded variables, while set -x and set +x toggle tracing within specific sections. The PS4 variable customizes the trace prefix to include line numbers and function names for better readability. For complex scripts, shellcheck performs static analysis to catch common pitfalls like unquoted variables, deprecated syntax, and POSIX compatibility issues.',
        tags: ['debugging', 'shellcheck', 'trace'],
        keyTakeaway: 'Use bash -x for execution tracing, PS4 for readable trace output, and shellcheck for static analysis of common scripting pitfalls.',
      },
    ],
  },
];
