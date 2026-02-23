import type { DocCategory } from './types';

export const DOCKER_PART4B_CATEGORIES: DocCategory[] = [
  {
    id: 'docker-security',
    label: 'Security & Best Practices',
    icon: '🔒',
    entries: [
      {
        id: 'docker-security-overview',
        title: 'Docker Security Overview',
        description: 'Attack surface, defense in depth, and CIS Docker Benchmark fundamentals.',
        difficulty: 'intermediate',
        tags: ['docker', 'security', 'overview', 'defense-in-depth', 'cis'],
        sections: [
          {
            title: 'Attack Surface',
            content: 'Docker introduces multiple attack surfaces: the host OS kernel, the Docker daemon (root-privileged by default), container images pulled from registries, the container runtime, inter-container networking, and mounted volumes. Understanding each layer is the first step toward a secure deployment. Attackers may exploit misconfigured daemons, vulnerable base images, or overly permissive network policies to pivot from a container to the host.',
          },
          {
            title: 'Defense in Depth',
            content: 'Apply layered controls so no single failure compromises the entire system. Key layers: harden the host (patching, SELinux/AppArmor), restrict the daemon (TLS, no TCP socket), use minimal base images, drop Linux capabilities, enforce read-only filesystems, segment container networks, and scan images in CI. Each layer independently limits blast radius, ensuring a compromised container cannot trivially escalate to host-level access.',
            diagram: {
              kind: 'mermaid',
              code: 'graph TD\n  A[Host Security] --> B[Docker Daemon]\n  B --> C[Image Security]\n  C --> D[Container Runtime]\n  D --> E[Network Security]\n  E --> F[Data Security]\n  style A fill:#e53935,color:#fff\n  style F fill:#43a047,color:#fff',
              caption: 'Docker security layers',
            },
          },
          {
            title: 'CIS Docker Benchmark',
            content: 'The Center for Internet Security (CIS) publishes a Docker Benchmark with scored and unscored recommendations covering host configuration, Docker daemon settings, container images, runtime settings, and network/security options. Run `docker-bench-security` to audit your environment automatically. Prioritize scored items; address critical findings such as disabling the unauthenticated TCP daemon socket and enabling user namespace remapping before moving to lower-severity items.',
          },
        ],
        quiz: {
          questions: [
            {
              question: 'Which component represents the largest attack surface in a default Docker installation?',
              options: ['Container filesystem', 'Docker daemon running as root', 'Bridge network', 'Docker Hub registry'],
              correctIndex: 1,
              explanation: 'The Docker daemon runs as root by default and listens on a Unix socket. Compromise of the daemon grants host-level root access.',
            },
            {
              question: 'What does CIS Docker Benchmark provide?',
              options: ['A container orchestration framework', 'Scored security recommendations for Docker deployments', 'A replacement for AppArmor profiles', 'An image signing specification'],
              correctIndex: 1,
              explanation: 'CIS Benchmark provides scored and unscored security recommendations covering host, daemon, image, runtime, and network layers.',
            },
            {
              question: 'Which tool automates CIS Docker Benchmark auditing?',
              options: ['docker scan', 'trivy', 'docker-bench-security', 'grype'],
              correctIndex: 2,
              explanation: 'docker-bench-security is the official script that checks a live Docker installation against CIS benchmark items.',
            },
          ],
        },
      },
      {
        id: 'docker-rootless',
        title: 'Rootless Docker',
        description: 'Running the Docker daemon as a non-root user with user namespace remapping.',
        difficulty: 'advanced',
        tags: ['docker', 'rootless', 'security', 'userns', 'daemon'],
        sections: [
          {
            title: 'Setup',
            content: 'Rootless mode runs both the Docker daemon and containers inside a user namespace, eliminating the need for root privileges on the host. Install with `dockerd-rootless-setuptool.sh install` after ensuring `uidmap` and `newuidmap` are available. The daemon socket moves to `$XDG_RUNTIME_DIR/docker.sock`. Set `DOCKER_HOST=unix://$XDG_RUNTIME_DIR/docker.sock` in your shell profile. Systemd user units start the daemon on login via `systemctl --user enable docker`.',
          },
          {
            title: 'User Namespace Remapping',
            content: 'Rootless Docker uses `newuidmap`/`newgidmap` to map container UIDs to unprivileged host UIDs defined in `/etc/subuid` and `/etc/subgid`. A container process running as UID 0 maps to, say, UID 100000 on the host, drastically reducing privilege escalation risk. The subordinate ID ranges must be allocated per-user; verify with `cat /etc/subuid`. Overlapping ranges between users can cause unexpected sharing.',
          },
          {
            title: 'Limitations',
            content: 'Rootless Docker has feature constraints: no support for `--privileged` containers that truly require host capabilities, limited overlay2 storage (requires `fuse-overlayfs` on older kernels), no binding to privileged ports < 1024 without `net.ipv4.ip_unprivileged_port_start` sysctl adjustment, and some networking modes unavailable. AppArmor and seccomp profiles still apply. Performance overhead from FUSE is measurable under heavy I/O workloads.',
          },
        ],
      },
      {
        id: 'docker-non-root',
        title: 'Running as Non-Root',
        description: 'Using the USER instruction, gosu, and managing file permissions safely.',
        difficulty: 'intermediate',
        tags: ['docker', 'non-root', 'user', 'permissions', 'security'],
        sections: [
          {
            title: 'USER Instruction',
            content: 'Add a dedicated system user in your Dockerfile and switch to it before the final CMD or ENTRYPOINT. Example:\n```dockerfile\nRUN addgroup --system app && adduser --system --ingroup app app\nUSER app\nCMD ["./server"]\n```\nThe process runs without root privileges, limiting damage from application vulnerabilities. Avoid numeric UIDs that conflict with host system users unless you explicitly coordinate UID mapping across environments.',
          },
          {
            title: 'gosu for Entrypoint Step-Down',
            content: 'When an entrypoint script must run setup steps as root before dropping privileges, use `gosu` (a minimal `su` replacement that avoids TTY issues and signal forwarding problems with `sudo`). Pattern:\n```bash\n#!/bin/sh\nchown -R app:app /data\nexec gosu app "$@"\n```\n`exec` replaces the shell so the application becomes PID 1 and receives signals directly. Install gosu from its official GitHub release with checksum verification.',
          },
          {
            title: 'File Permission Management',
            content: 'Non-root containers need read access to application files and write access only to specific directories (logs, temp, uploads). Set ownership during the build: `COPY --chown=app:app . /app`. For runtime-writable paths, declare named volumes or use `tmpfs`. Avoid broad `chmod 777`; instead grant the minimum necessary permissions. When using bind mounts in development, match the host UID to the container UID to prevent permission conflicts.',
          },
        ],
      },
      {
        id: 'docker-capabilities',
        title: 'Linux Capabilities',
        description: 'Dropping and adding capabilities, and applying seccomp and AppArmor profiles.',
        difficulty: 'advanced',
        tags: ['docker', 'capabilities', 'seccomp', 'apparmor', 'privileges'],
        sections: [
          {
            title: 'Dropping Capabilities',
            content: 'Docker grants containers a default set of ~14 Linux capabilities (e.g., `NET_BIND_SERVICE`, `CHOWN`, `SETUID`). Drop all and re-add only what is required:\n```bash\ndocker run --cap-drop ALL --cap-add NET_BIND_SERVICE myapp\n```\nIn Compose:\n```yaml\ncap_drop: [ALL]\ncap_add: [NET_BIND_SERVICE]\n```\nMost web services need no extra capabilities. Audit running containers with `docker inspect --format "{{.HostConfig.CapAdd}}" <id>`.',
          },
          {
            title: 'seccomp Profiles',
            content: 'seccomp (secure computing) filters syscalls a container process can invoke. Docker ships a default seccomp profile blocking ~44 dangerous syscalls (e.g., `ptrace`, `reboot`, `kexec_load`). Supply a custom profile with `--security-opt seccomp=/path/profile.json`. For maximum restriction use `--security-opt seccomp=unconfined` only in trusted environments. Generate custom profiles by tracing syscalls with `strace` or `sysdig` during normal operation, then deny everything else.',
          },
          {
            title: 'AppArmor Profiles',
            content: 'AppArmor enforces mandatory access control (MAC) via kernel profiles that constrain file, network, and capability access. Docker applies the `docker-default` AppArmor profile to all containers on supported hosts. Create custom profiles with `aa-genprof` or write manually, load with `apparmor_parser -r profile`, then apply: `--security-opt apparmor=my-profile`. Combined with seccomp and capability drops, AppArmor provides defense-in-depth at the kernel level independent of application logic.',
          },
        ],
        quiz: {
          questions: [
            {
              question: 'What is the recommended capability strategy for hardened containers?',
              options: ['Add only needed capabilities', 'Drop ALL then add only required capabilities', 'Keep defaults and add extras', 'Use --privileged for simplicity'],
              correctIndex: 1,
              explanation: 'Drop ALL first to establish a zero-trust baseline, then explicitly add only the capabilities your application actually requires.',
            },
            {
              question: 'What does Docker\'s default seccomp profile do?',
              options: ['Allows all syscalls', 'Blocks all syscalls', 'Blocks ~44 dangerous syscalls', 'Only allows network syscalls'],
              correctIndex: 2,
              explanation: 'Docker\'s default seccomp profile blocks approximately 44 dangerous syscalls like ptrace and reboot while permitting normal application syscalls.',
            },
            {
              question: 'Which flag disables seccomp filtering for a container?',
              options: ['--security-opt seccomp=off', '--security-opt seccomp=none', '--security-opt seccomp=unconfined', '--no-seccomp'],
              correctIndex: 2,
              explanation: 'Use --security-opt seccomp=unconfined to disable seccomp filtering; only appropriate in trusted, controlled environments.',
            },
          ],
        },
      },
      {
        id: 'docker-secrets',
        title: 'Managing Secrets',
        description: 'Docker secrets, build-time secrets, and avoiding environment variable anti-patterns.',
        difficulty: 'intermediate',
        tags: ['docker', 'secrets', 'security', 'env-vars', 'vault'],
        sections: [
          {
            title: 'Environment Variable Anti-Pattern',
            content: 'Storing secrets in environment variables is convenient but risky: they appear in `docker inspect`, are visible to all processes in the container, leak into child processes, and may be logged by application frameworks. Never bake secrets into images via `ENV` instructions or `.env` files committed to source control. A compromised container or image layer exposes all env-var secrets instantly. Use purpose-built secret management instead.',
          },
          {
            title: 'Docker Swarm Secrets',
            content: 'Docker Swarm provides encrypted secrets stored in the Raft log and mounted into containers as files under `/run/secrets/<name>` with mode 0400. Create: `echo "mysecret" | docker secret create db_password -`. Reference in stack files:\n```yaml\nsecrets:\n  db_password:\n    external: true\nservices:\n  app:\n    secrets: [db_password]\n```\nApplications read `/run/secrets/db_password` at runtime. Secrets never appear in environment variables or image layers.',
          },
          {
            title: 'Build-Time Secrets',
            content: 'For secrets needed only during `docker build` (e.g., private npm token, SSH key), use BuildKit secret mounts that are never stored in image layers:\n```dockerfile\nRUN --mount=type=secret,id=npm_token \\\n    NPM_TOKEN=$(cat /run/secrets/npm_token) npm install\n```\nPass at build time: `docker build --secret id=npm_token,src=.npmtoken .`. For SSH: `--mount=type=ssh`. For production runtimes, integrate with HashiCorp Vault, AWS Secrets Manager, or Kubernetes Secrets via init containers.',
          },
        ],
      },
      {
        id: 'docker-readonly',
        title: 'Read-Only Containers',
        description: 'Using --read-only and tmpfs mounts for immutable container filesystems.',
        difficulty: 'intermediate',
        tags: ['docker', 'readonly', 'immutable', 'tmpfs', 'security'],
        sections: [
          {
            title: '--read-only Flag',
            content: 'Launch containers with `--read-only` to mount the container\'s root filesystem as read-only. Any write attempt outside explicitly writable mounts raises a "Read-only file system" error. This prevents attackers from modifying binaries, planting backdoors, or writing malicious scripts post-exploitation. It also enforces immutability: if an application needs to write, the write path must be intentionally declared, making data flow explicit and auditable.',
          },
          {
            title: 'tmpfs for Writable Paths',
            content: 'Applications typically need to write to `/tmp`, `/var/run`, or `/var/cache`. Provide writable in-memory mounts:\n```bash\ndocker run --read-only \\\n  --tmpfs /tmp:rw,noexec,nosuid,size=64m \\\n  --tmpfs /var/run:rw,noexec,nosuid \\\n  myapp\n```\nIn Compose:\n```yaml\nread_only: true\ntmpfs:\n  - /tmp\n  - /var/run\n```\n`noexec` prevents executing binaries from tmpfs; `nosuid` blocks setuid bits, limiting privilege escalation through writable memory paths.',
          },
          {
            title: 'Named Volumes for Persistent Data',
            content: 'For data that must survive container restarts (uploads, databases, logs), use named volumes rather than container filesystem writes. Named volumes are managed by Docker outside the container layer and are unaffected by `--read-only`. Combine: `--read-only --tmpfs /tmp -v app-data:/data`. This produces a container where the application layer is fully immutable, temporary scratch space is in-memory, and only intentional persistent paths are writable via volume mounts.',
          },
        ],
      },
      {
        id: 'docker-resource-protection',
        title: 'Resource Protection',
        description: 'Using cgroups, ulimits, PID limits, and OOM killer configuration to protect hosts.',
        difficulty: 'intermediate',
        tags: ['docker', 'cgroups', 'ulimits', 'resources', 'protection'],
        sections: [
          {
            title: 'Memory and CPU Limits',
            content: 'Without limits, a single container can exhaust host resources (noisy neighbor or DoS). Set hard limits:\n```bash\ndocker run \\\n  --memory=512m \\\n  --memory-swap=512m \\\n  --cpus=1.5 \\\n  --cpu-shares=512 \\\n  myapp\n```\n`--memory-swap` equal to `--memory` disables swap. `--cpus` sets an absolute CPU quota. In Compose use `deploy.resources.limits`. Monitor with `docker stats` and alert on containers approaching configured limits.',
          },
          {
            title: 'PID Limits and ulimits',
            content: 'A fork bomb can exhaust host PIDs bringing down all containers. Limit PIDs with `--pids-limit=200`. Apply ulimits for file descriptors and process counts:\n```bash\ndocker run \\\n  --pids-limit=200 \\\n  --ulimit nofile=1024:1024 \\\n  --ulimit nproc=128:128 \\\n  myapp\n```\nSet daemon-wide defaults in `/etc/docker/daemon.json`:\n```json\n{"default-ulimits": {"nofile": {"Hard": 64000, "Name": "nofile", "Soft": 64000}}}\n```',
          },
          {
            title: 'OOM Killer Configuration',
            content: 'When a container exceeds its memory limit the Linux OOM killer terminates processes. Control behavior with `--oom-kill-disable` (dangerous: can freeze host if host memory is exhausted) or `--oom-score-adj` to tune kill priority (-1000 to 1000; higher = more likely killed). Prefer keeping OOM kill enabled and setting `--memory` limits appropriately. Monitor OOM events via `dmesg` or container runtime logs. Alert on repeated OOM kills as a signal to right-size resource limits.',
          },
        ],
      },
      {
        id: 'docker-image-hardening',
        title: 'Image Hardening',
        description: 'Using distroless, Alpine, scratch base images, and removing unnecessary tooling.',
        difficulty: 'advanced',
        tags: ['docker', 'hardening', 'distroless', 'alpine', 'scratch'],
        sections: [
          {
            title: 'Minimal Base Images',
            content: 'Large base images (Ubuntu, Debian) contain hundreds of packages: shells, package managers, compilers — none needed at runtime. Each unnecessary package is a potential CVE. Use minimal bases: `alpine` (~5MB, musl libc, BusyBox shell), `gcr.io/distroless/static` (no shell, no package manager, statically-linked binaries only), or `scratch` (empty filesystem for Go/Rust binaries). Fewer packages means smaller attack surface, faster pulls, and fewer vulnerabilities reported by scanners.',
          },
          {
            title: 'Distroless Images',
            content: 'Google\'s distroless images contain only the application runtime and its dependencies — no shell, no `apt`, no `curl`. This prevents attackers from using common post-exploitation tools even if they gain code execution. Use with multi-stage builds:\n```dockerfile\nFROM golang:1.22 AS builder\nRUN CGO_ENABLED=0 go build -o /app .\n\nFROM gcr.io/distroless/static-debian12\nCOPY --from=builder /app /app\nENTRYPOINT [\"/app\"]\n```\nAvailable for Go, Java, Python, Node.js, and .NET runtimes.',
          },
          {
            title: 'Removing Shells and Debug Tools',
            content: 'Even when starting from Alpine or slim images, remove unneeded tools in the final stage. Delete package managers: `RUN apk del apk-tools`. Remove shells if your entrypoint is a compiled binary: use the exec form `CMD ["/app"]` which invokes the binary directly without a shell. Never include `curl`, `wget`, `nc`, or compilers in production images. Regularly scan with Trivy or Grype and track vulnerability trends. Set a maximum acceptable CVE severity policy in CI to block promotions.',
          },
        ],
        quiz: {
          questions: [
            {
              question: 'What distinguishes distroless images from Alpine images?',
              options: ['Distroless images are larger', 'Distroless images contain no shell or package manager', 'Alpine images have no shell', 'Distroless uses musl libc'],
              correctIndex: 1,
              explanation: 'Distroless images contain only the application runtime with no shell, package manager, or debugging tools, minimizing attack surface further than Alpine.',
            },
            {
              question: 'Which base image is appropriate for a statically compiled Go binary?',
              options: ['ubuntu:22.04', 'debian:slim', 'scratch', 'node:alpine'],
              correctIndex: 2,
              explanation: 'A statically compiled Go binary with no external dependencies can run in scratch, an empty filesystem with zero additional attack surface.',
            },
            {
              question: 'What is the primary security benefit of multi-stage builds?',
              options: ['Faster build times', 'Smaller layer count', 'Build tools and secrets never appear in the final image', 'Better cache utilization'],
              correctIndex: 2,
              explanation: 'Multi-stage builds ensure compilers, build secrets, source code, and dev dependencies are discarded, appearing only in intermediate stages that are never shipped.',
            },
          ],
        },
      },
      {
        id: 'docker-supply-chain',
        title: 'Supply Chain Security',
        description: 'Image provenance, SBOM generation, attestations, and reproducible builds.',
        difficulty: 'advanced',
        tags: ['docker', 'supply-chain', 'sbom', 'provenance', 'attestation'],
        sections: [
          {
            title: 'Provenance and Attestations',
            content: 'Supply chain attacks (e.g., SolarWinds, Log4Shell exploitation via transitive deps) target the build pipeline. Docker BuildKit 0.11+ generates SLSA provenance attestations recording what was built, from which source commit, on which builder, using which Dockerfile. Build with: `docker buildx build --provenance=max --push .`. Verify attestations with `docker buildx imagetools inspect image:tag --format "{{json .Provenance}}"`. Provenance helps detect tampering between source code and published image.',
          },
          {
            title: 'SBOM Generation',
            content: 'A Software Bill of Materials (SBOM) lists every package and library in an image. Generate during build:\n```bash\ndocker buildx build --sbom=true --push .\n```\nOr post-build with Syft: `syft image:tag -o spdx-json > sbom.json`. Store SBOMs alongside images in registries. Use Grype against the SBOM for vulnerability scanning without pulling the full image: `grype sbom:sbom.json`. SBOM-based scanning in CI gates deployments on known CVE severity thresholds.',
          },
          {
            title: 'Image Signing and Verification',
            content: 'Sign images with Cosign (part of Sigstore) to cryptographically bind an identity to a published image:\n```bash\ncosign sign --key cosign.key registry/image:tag\ncosign verify --key cosign.pub registry/image:tag\n```\nKeyless signing uses OIDC (GitHub Actions, GCP, etc.) for identity without long-lived keys. Enforce verification in Kubernetes via policy engines (Kyverno, OPA Gatekeeper) that reject unsigned or unverifiable images. Combine signing with provenance and SBOM attestations for a complete supply chain posture.',
          },
        ],
      },
      {
        id: 'docker-audit-compliance',
        title: 'Audit & Compliance',
        description: 'Docker Bench Security, CIS benchmarks, audit logging, and runtime monitoring.',
        difficulty: 'advanced',
        tags: ['docker', 'audit', 'compliance', 'cis-benchmark', 'monitoring'],
        sections: [
          {
            title: 'Docker Bench Security',
            content: 'Docker Bench for Security is an open-source script implementing CIS Docker Benchmark checks. Run it as a container with host access:\n```bash\ndocker run --rm \\\n  -v /var/lib:/var/lib \\\n  -v /etc:/etc:ro \\\n  -v /var/run/docker.sock:/var/run/docker.sock \\\n  docker/docker-bench-security\n```\nOutput categorizes findings as PASS, WARN, or INFO. Prioritize WARN items. Re-run after configuration changes to verify remediation. Integrate into scheduled CI jobs or as a cron job on production hosts for continuous compliance verification.',
          },
          {
            title: 'Audit Logging',
            content: 'Enable kernel-level audit logging for Docker daemon socket access using `auditd`:\n```\n-w /usr/bin/docker -p rwxa -k docker\n-w /var/lib/docker -p rwxa -k docker\n-w /etc/docker -p rwxa -k docker\n-w /var/run/docker.sock -p rwxa -k docker\n```\nConfigure Docker daemon logging driver for container stdout/stderr: `"log-driver": "json-file"` with `"log-opts": {"max-size": "10m", "max-file": "3"}`. Ship logs to a centralized SIEM (Splunk, ELK, Datadog). Retain audit logs per compliance requirements (PCI-DSS: 1 year, HIPAA: 6 years).',
          },
          {
            title: 'Runtime Security Monitoring',
            content: 'Static hardening is insufficient; monitor container behavior at runtime. Falco (CNCF) detects anomalous syscalls (e.g., shell spawned in container, unexpected network connection, sensitive file read). Deploy Falco as a DaemonSet or kernel module. Define rules matching your threat model. Complement with network monitoring (Cilium Hubble, Calico flow logs) to detect lateral movement. Feed alerts into on-call workflows. Regularly review and tune rules to minimize false positives while maintaining detection fidelity.',
          },
        ],
      },
    ],
  },
];
