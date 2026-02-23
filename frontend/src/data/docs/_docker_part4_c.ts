import type { DocCategory } from './types';

export const DOCKER_PART4C_CATEGORIES: DocCategory[] = [
  {
    id: 'docker-production',
    label: 'Production Patterns',
    icon: '🏭',
    entries: [
      {
        id: 'docker-logging',
        title: 'Logging Strategies',
        description: 'Configure log drivers and implement 12-factor logging for production containers.',
        level: 'advanced',
        tags: ['docker', 'logging', 'log-drivers', 'fluentd', '12-factor'],
        sections: [
          {
            title: 'Log Drivers Overview',
            content: 'Docker supports multiple log drivers: json-file (default), syslog, journald, fluentd, awslogs, and splunk. The 12-factor app methodology recommends treating logs as event streams written to stdout. Configure the default driver in daemon.json or per-container with --log-driver.',
            codeExample: `# Set log driver globally in /etc/docker/daemon.json
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  }
}

# Per-container log driver
docker run --log-driver=syslog --log-opt syslog-address=udp://localhost:514 nginx`,
            language: 'bash'
          },
          {
            title: 'Fluentd Log Driver',
            content: 'Fluentd provides a unified logging layer. Configure containers to send logs to a Fluentd aggregator, which can forward to Elasticsearch, S3, or other backends. Use the fluentd log driver with appropriate tags for routing.',
            codeExample: `# Run Fluentd collector
docker run -d -p 24224:24224 -v /fluentd/conf:/fluentd/etc fluent/fluentd

# Send container logs to Fluentd
docker run --log-driver=fluentd \
  --log-opt fluentd-address=localhost:24224 \
  --log-opt tag="docker.{{.Name}}" \
  nginx

# docker-compose with fluentd
services:
  app:
    image: myapp
    logging:
      driver: fluentd
      options:
        fluentd-address: localhost:24224
        tag: app.logs`,
            language: 'bash'
          },
          {
            title: 'Log Aggregation with ELK',
            content: 'Ship container logs to an ELK stack (Elasticsearch, Logstash, Kibana) for centralized log management. Use Filebeat as a lightweight shipper or configure the logstash log driver directly.',
            codeExample: `# Logstash log driver
docker run --log-driver=gelf \
  --log-opt gelf-address=udp://logstash:12201 \
  myapp

# Filebeat config for Docker logs
filebeat.inputs:
- type: container
  paths:
    - /var/lib/docker/containers/*/*.log
  processors:
    - add_docker_metadata:
        host: "unix:///var/run/docker.sock"

output.elasticsearch:
  hosts: ["elasticsearch:9200"]`,
            language: 'bash'
          }
        ],
        quiz: {
          questions: [
            {
              id: 'q-logging-1',
              question: 'Which log driver does Docker use by default?',
              options: ['syslog', 'json-file', 'fluentd', 'journald'],
              correctIndex: 1,
              explanation: 'Docker uses json-file as the default log driver, storing logs as JSON in /var/lib/docker/containers/.'
            },
            {
              id: 'q-logging-2',
              question: 'Where does the 12-factor methodology recommend writing logs?',
              options: ['Log files', 'Syslog', 'stdout', 'Database'],
              correctIndex: 2,
              explanation: 'The 12-factor app methodology treats logs as event streams written to stdout, letting the execution environment capture and route them.'
            },
            {
              id: 'q-logging-3',
              question: 'Which option limits json-file log size?',
              options: ['--log-size', '--max-size', 'max-size log-opt', '--limit'],
              correctIndex: 2,
              explanation: 'Use --log-opt max-size=10m and --log-opt max-file=3 to limit json-file log rotation.'
            }
          ]
        }
      },
      {
        id: 'docker-monitoring',
        title: 'Monitoring Containers',
        description: 'Monitor Docker containers with docker stats, Prometheus, cAdvisor, and Grafana dashboards.',
        level: 'advanced',
        tags: ['docker', 'monitoring', 'prometheus', 'cadvisor', 'grafana'],
        sections: [
          {
            title: 'Docker Stats and Built-in Metrics',
            content: 'Docker provides basic monitoring via docker stats, exposing CPU, memory, network I/O, and block I/O. The Docker daemon exposes a metrics endpoint compatible with Prometheus. Enable it in daemon.json for production monitoring.',
            codeExample: `# Live container stats
docker stats
docker stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}"

# Enable Prometheus metrics endpoint in daemon.json
{
  "metrics-addr": "0.0.0.0:9323",
  "experimental": true
}

# Query Docker metrics
curl http://localhost:9323/metrics | grep container_`,
            language: 'bash'
          },
          {
            title: 'cAdvisor for Container Metrics',
            content: 'cAdvisor (Container Advisor) provides detailed resource usage and performance metrics for running containers. It exposes a Prometheus-compatible endpoint and integrates with Grafana for visualization.',
            codeExample: `# Run cAdvisor
docker run -d \
  --name cadvisor \
  --volume=/:/rootfs:ro \
  --volume=/var/run:/var/run:ro \
  --volume=/sys:/sys:ro \
  --volume=/var/lib/docker/:/var/lib/docker:ro \
  --publish=8080:8080 \
  --privileged \
  gcr.io/cadvisor/cadvisor:latest

# Prometheus scrape config
scrape_configs:
  - job_name: cadvisor
    static_configs:
      - targets: ['cadvisor:8080']`,
            language: 'bash'
          },
          {
            title: 'Grafana Dashboard Setup',
            content: 'Connect Grafana to Prometheus to visualize cAdvisor and Docker metrics. Use pre-built dashboards (ID 193 for Docker) or create custom panels for CPU, memory, network, and container counts.',
            codeExample: `# Full monitoring stack with docker-compose
version: '3.8'
services:
  prometheus:
    image: prom/prometheus
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    ports:
      - "9090:9090"

  cadvisor:
    image: gcr.io/cadvisor/cadvisor
    volumes:
      - /:/rootfs:ro
      - /var/run:/var/run:ro
      - /var/lib/docker/:/var/lib/docker:ro
    privileged: true
    ports:
      - "8080:8080"

  grafana:
    image: grafana/grafana
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=secret`,
            language: 'bash'
          }
        ]
      },
      {
        id: 'docker-ci-cd',
        title: 'Docker in CI/CD',
        description: 'Integrate Docker into CI/CD pipelines with build caching, multi-stage builds, and registry pushes.',
        level: 'advanced',
        tags: ['docker', 'ci-cd', 'github-actions', 'build-cache', 'pipeline'],
        sections: [
          {
            title: 'GitHub Actions Docker Workflow',
            content: 'GitHub Actions provides native Docker support with docker/build-push-action. Use GHCR or Docker Hub as registries. Enable BuildKit cache with cache-from and cache-to for faster pipeline builds.',
            codeExample: `# .github/workflows/docker.yml
name: Docker Build and Push
on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Login to GHCR
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}

      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          push: true
          tags: ghcr.io/\${{ github.repository }}:latest
          cache-from: type=gha
          cache-to: type=gha,mode=max`,
            language: 'bash'
          },
          {
            title: 'Build Cache Strategies',
            content: 'Effective cache usage dramatically reduces CI build times. Use inline cache for simple cases, registry cache for shared caches across workers, and GitHub Actions cache for ephemeral runners.',
            codeExample: `# Inline cache (embedded in image)
docker buildx build \
  --cache-from type=registry,ref=myregistry/myapp:cache \
  --cache-to type=registry,ref=myregistry/myapp:cache,mode=max \
  --push -t myregistry/myapp:latest .

# Local cache for single-host CI
docker buildx build \
  --cache-from type=local,src=/tmp/docker-cache \
  --cache-to type=local,dest=/tmp/docker-cache,mode=max \
  -t myapp .

# Maximize cache with --mount in Dockerfile
RUN --mount=type=cache,target=/root/.cache/pip \
    pip install -r requirements.txt`,
            language: 'bash'
          },
          {
            title: 'Multi-Stage in CI Pipelines',
            content: 'Use multi-stage builds in CI to separate test, build, and production stages. Target specific stages for parallel test execution and lean final images.',
            codeExample: `# Dockerfile with CI-friendly stages
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM deps AS test
COPY . .
RUN npm test

FROM deps AS build
COPY . .
RUN npm run build

FROM nginx:alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html

# Run only test stage in CI
docker buildx build --target test --load -t myapp:test .

# Run tests
docker run --rm myapp:test npm test`,
            language: 'bash'
          }
        ],
        quiz: {
          questions: [
            {
              id: 'q-cicd-1',
              question: 'Which GitHub Actions action sets up Docker Buildx?',
              options: ['docker/buildx-action', 'docker/setup-buildx-action', 'actions/docker-setup', 'docker/build-action'],
              correctIndex: 1,
              explanation: 'docker/setup-buildx-action@v3 configures Docker Buildx for advanced build features including multi-platform and cache support.'
            },
            {
              id: 'q-cicd-2',
              question: 'What cache type is optimal for GitHub Actions ephemeral runners?',
              options: ['type=local', 'type=inline', 'type=gha', 'type=registry'],
              correctIndex: 2,
              explanation: 'type=gha uses the GitHub Actions cache backend, which persists between runs and is optimized for the GitHub Actions environment.'
            },
            {
              id: 'q-cicd-3',
              question: 'Which Dockerfile instruction enables mount caching for package managers?',
              options: ['CACHE --mount', 'RUN --mount=type=cache', 'VOLUME cache', 'ARG BUILDKIT_INLINE_CACHE'],
              correctIndex: 1,
              explanation: 'RUN --mount=type=cache,target=/path mounts a persistent cache directory for the build step, speeding up package installs.'
            }
          ]
        }
      },
      {
        id: 'docker-swarm-intro',
        title: 'Docker Swarm Overview',
        description: 'Orchestrate containers at scale with Docker Swarm: init, join tokens, services, and stacks.',
        level: 'advanced',
        tags: ['docker', 'swarm', 'orchestration', 'services', 'stacks'],
        sections: [
          {
            title: 'Initializing a Swarm Cluster',
            content: 'Docker Swarm turns a Docker host into a manager node. Additional nodes join as managers or workers using tokens. The overlay network enables cross-host container communication. Swarm mode is built into Docker Engine.',
            codeExample: `# Initialize swarm on manager node
docker swarm init --advertise-addr 192.168.1.10

# Get join tokens
docker swarm join-token worker
docker swarm join-token manager

# Join as worker (run on worker nodes)
docker swarm join \
  --token SWMTKN-1-xxx \
  192.168.1.10:2377

# List nodes
docker node ls

# Promote worker to manager
docker node promote worker-node-1`,
            language: 'bash'
          },
          {
            title: 'Deploying Services',
            content: 'Swarm services replace docker run for orchestrated deployments. Services support replicas, rolling updates, rollback, placement constraints, and resource limits. The swarm scheduler distributes tasks across available nodes.',
            codeExample: `# Create a replicated service
docker service create \
  --name webapp \
  --replicas 3 \
  --publish 80:80 \
  --update-delay 10s \
  --update-failure-action rollback \
  nginx:alpine

# Scale the service
docker service scale webapp=5

# Rolling update
docker service update --image nginx:1.25 webapp

# Rollback on failure
docker service rollback webapp

# Service status
docker service ps webapp`,
            language: 'bash'
          },
          {
            title: 'Stacks with Compose Files',
            content: 'Docker stacks deploy multi-service applications using Compose files. Use deploy keys for swarm-specific configuration including replicas, update config, placement constraints, and resource limits.',
            codeExample: `# docker-compose.prod.yml
version: '3.8'
services:
  web:
    image: myapp:latest
    deploy:
      replicas: 3
      update_config:
        parallelism: 1
        delay: 10s
        failure_action: rollback
      placement:
        constraints:
          - node.role == worker
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
    ports:
      - "80:8000"

# Deploy the stack
docker stack deploy -c docker-compose.prod.yml mystack

# List stack services
docker stack services mystack
docker stack ps mystack`,
            language: 'bash'
          }
        ]
      },
      {
        id: 'docker-buildkit',
        title: 'BuildKit Advanced',
        description: 'Leverage BuildKit features: inline cache, remote cache, multi-platform builds, and SSH mounts.',
        level: 'advanced',
        tags: ['docker', 'buildkit', 'cache', 'multi-platform', 'build'],
        sections: [
          {
            title: 'Enabling and Configuring BuildKit',
            content: 'BuildKit is the modern Docker build engine with parallelism, cache exports, and secret mounts. Enable it via DOCKER_BUILDKIT=1 or by using docker buildx. BuildKit automatically parallelizes independent build stages.',
            codeExample: `# Enable BuildKit for a single build
DOCKER_BUILDKIT=1 docker build -t myapp .

# Enable permanently in daemon.json
{
  "features": {
    "buildkit": true
  }
}

# Create and use a buildx builder
docker buildx create --name mybuilder --use
docker buildx inspect --bootstrap

# Check BuildKit version
docker buildx version`,
            language: 'bash'
          },
          {
            title: 'Multi-Platform Builds',
            content: 'BuildKit with QEMU emulation enables building images for multiple CPU architectures (amd64, arm64, arm/v7) from a single host. Use --platform flag and push multi-arch manifests to registries.',
            codeExample: `# Set up QEMU for cross-platform emulation
docker run --privileged --rm tonistiigi/binfmt --install all

# Build for multiple platforms
docker buildx build \
  --platform linux/amd64,linux/arm64,linux/arm/v7 \
  --push \
  -t myregistry/myapp:latest .

# Build for specific platform locally
docker buildx build \
  --platform linux/arm64 \
  --load \
  -t myapp:arm64 .

# Inspect manifest
docker buildx imagetools inspect myregistry/myapp:latest`,
            language: 'bash'
          },
          {
            title: 'SSH and Secret Mounts',
            content: 'BuildKit secret mounts expose credentials during build without embedding them in layers. SSH mounts forward the host SSH agent for private repository access, keeping keys out of the image.',
            codeExample: `# Dockerfile with secret mount
# syntax=docker/dockerfile:1
FROM python:3.11-slim
RUN --mount=type=secret,id=pip_token \
    pip install \
      --index-url https://\$(cat /run/secrets/pip_token)@private.pypi.org/simple \
      private-package

# Build with secret
echo "mytoken" | docker buildx build \
  --secret id=pip_token \
  -t myapp .

# SSH mount for private repos
FROM node:20
RUN --mount=type=ssh \
    git clone git@github.com:private/repo.git

# Build with SSH forwarding
docker buildx build --ssh default -t myapp .`,
            language: 'bash'
          }
        ]
      },
      {
        id: 'docker-optimization',
        title: 'Image Size Optimization',
        description: 'Minimize Docker image sizes using multi-stage builds, Alpine, distroless images, and the dive tool.',
        level: 'advanced',
        tags: ['docker', 'optimization', 'image-size', 'dive', 'layers'],
        sections: [
          {
            title: 'Multi-Stage Build Optimization',
            content: 'Multi-stage builds eliminate build tools from final images. Copy only compiled artifacts to a minimal runtime image. Order stages to maximize cache reuse by placing rarely-changing steps first.',
            codeExample: `# Optimized Go multi-stage build
FROM golang:1.21-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o app .

# Distroless runtime (no shell, minimal attack surface)
FROM gcr.io/distroless/static-debian12
COPY --from=builder /app/app /app
ENTRYPOINT ["/app"]

# Compare sizes
# golang:1.21 base:  ~800MB
# With distroless:   ~10MB`,
            language: 'bash'
          },
          {
            title: 'Alpine and Slim Base Images',
            content: 'Use language-specific slim or Alpine variants to reduce base image size. Alpine Linux uses musl libc and is around 5MB. Slim variants strip documentation and locales. Always pin specific versions for reproducibility.',
            codeExample: `# Size comparison of Python bases
# python:3.11          ~900MB
# python:3.11-slim     ~130MB
# python:3.11-alpine   ~50MB

FROM python:3.11-alpine
WORKDIR /app
COPY requirements.txt .
# Install build deps, install packages, remove build deps
RUN apk add --no-cache --virtual .build-deps gcc musl-dev \
    && pip install --no-cache-dir -r requirements.txt \
    && apk del .build-deps
COPY . .
CMD ["python", "app.py"]

# Use .dockerignore to exclude unnecessary files
# .dockerignore
.git
__pycache__
*.pyc
.pytest_cache
node_modules`,
            language: 'bash'
          },
          {
            title: 'Analyzing Layers with Dive',
            content: 'Dive is a tool for exploring Docker image layers, identifying wasted space from files added then deleted. It shows per-layer changes and calculates image efficiency scores.',
            codeExample: `# Install dive
brew install dive  # macOS
# or
docker pull wagoodman/dive

# Analyze an image interactively
dive myapp:latest

# CI mode - fail if efficiency below threshold
docker run --rm \
  -v /var/run/docker.sock:/var/run/docker.sock \
  wagoodman/dive myapp:latest \
  --ci --lowestEfficiency=0.95

# Check image layer history
docker history --human --format "{{.Size}}\t{{.CreatedBy}}" myapp:latest

# Flatten image to single layer (use sparingly)
docker export \$(docker create myapp) | docker import - myapp:flat`,
            language: 'bash'
          }
        ]
      },
      {
        id: 'docker-debugging-prod',
        title: 'Production Debugging',
        description: 'Debug production containers using docker debug, ephemeral debug containers, and nsenter.',
        level: 'advanced',
        tags: ['docker', 'debugging', 'production', 'nsenter', 'troubleshooting'],
        sections: [
          {
            title: 'Docker Debug and Exec',
            content: 'Docker 4.27+ includes docker debug for attaching a debug toolkit to any container including distroless images. For earlier versions, docker exec into running containers or use docker cp to extract files for analysis.',
            codeExample: `# Docker debug (Docker Desktop 4.27+)
# Attaches busybox shell to any container
docker debug my-distroless-container

# Standard exec for containers with shell
docker exec -it mycontainer /bin/sh
docker exec -it mycontainer bash -c "env | sort"

# Copy files from container for analysis
docker cp mycontainer:/app/logs/error.log /tmp/

# Inspect container details
docker inspect mycontainer | jq '.[0].State'
docker inspect mycontainer | jq '.[0].NetworkSettings'

# View real-time events
docker events --filter container=mycontainer`,
            language: 'bash'
          },
          {
            title: 'Ephemeral Debug Containers',
            content: 'Kubernetes-style ephemeral containers can be approximated in Docker by sharing namespaces. Run a debug container in the same network and PID namespace as the target to inspect processes and network state.',
            codeExample: `# Share namespaces with a running container
docker run -it --rm \
  --pid=container:myapp \
  --network=container:myapp \
  --cap-add SYS_PTRACE \
  nicolaka/netshoot

# Inside netshoot: inspect processes
ps aux
netstat -tlnp
ss -tlnp

# Trace syscalls of a container process
docker run -it --rm \
  --pid=container:myapp \
  --cap-add SYS_PTRACE \
  ubuntu strace -p 1

# Check DNS from container network context
docker run -it --rm \
  --network=container:myapp \
  busybox nslookup myservice`,
            language: 'bash'
          },
          {
            title: 'nsenter for Low-Level Debugging',
            content: 'nsenter enters Linux namespaces of running processes for low-level debugging. Access a container namespace directly from the host without requiring a shell inside the container.',
            codeExample: `# Get container PID
PID=\$(docker inspect --format '{{.State.Pid}}' mycontainer)

# Enter container namespaces from host
nsenter -t \$PID -n -u -i -p -- /bin/bash

# Enter only network namespace
nsenter -t \$PID --net -- ip addr show
nsenter -t \$PID --net -- netstat -tlnp
nsenter -t \$PID --net -- tcpdump -i eth0

# Check open files in container
nsenter -t \$PID -m -u -i -p -- lsof -p 1

# Run strace on container process
nsenter -t \$PID -m -u -i -n -p -- strace -p 1 -e trace=network`,
            language: 'bash'
          }
        ]
      },
      {
        id: 'docker-migration',
        title: 'Migration Patterns',
        description: 'Migrate applications from VMs to containers using lift-and-shift and 12-factor principles.',
        level: 'advanced',
        tags: ['docker', 'migration', 'vm', 'containerization', '12-factor'],
        sections: [
          {
            title: 'Lift-and-Shift Strategy',
            content: 'Lift-and-shift containerizes existing applications with minimal changes. Start by packaging the app as-is into a container, then incrementally refactor toward 12-factor principles. Identify process boundaries and external dependencies first.',
            codeExample: `# Phase 1: Containerize existing app as-is
# Analyze current app dependencies
ldd /usr/bin/myapp
rpm -qa  # or dpkg -l

# Create initial Dockerfile from VM state
FROM ubuntu:22.04
RUN apt-get update && apt-get install -y \
    libpq5 openssl ca-certificates \
    && rm -rf /var/lib/apt/lists/*
COPY --chown=app:app ./myapp /usr/local/bin/myapp
COPY ./config /etc/myapp/config
EXPOSE 8080
USER app
CMD ["/usr/local/bin/myapp", "--config", "/etc/myapp/config"]

# Test with same environment variables as VM
docker run --env-file vm.env myapp:v1`,
            language: 'bash'
          },
          {
            title: '12-Factor Refactoring',
            content: 'After lift-and-shift, apply 12-factor principles: externalize config via environment variables, write logs to stdout, make the app stateless (move state to external stores), and implement health check endpoints.',
            codeExample: `# Phase 2: Externalize configuration
# Before: config files baked into image
# After: environment-based config

FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .

# Use env vars instead of config files
ENV DATABASE_URL=""
ENV REDIS_URL=""
ENV LOG_LEVEL="INFO"
ENV SECRET_KEY=""

# Health check for orchestration
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD curl -f http://localhost:8000/health || exit 1

CMD ["gunicorn", "app:create_app()", \
     "--bind", "0.0.0.0:8000", \
     "--workers", "4", \
     "--access-logfile", "-"]`,
            language: 'bash'
          },
          {
            title: 'Data Migration Considerations',
            content: 'Migrating stateful services requires careful planning. Use Docker volumes for persistent data, run database migrations as init containers, and implement blue-green deployments for zero-downtime cutover from VMs to containers.',
            codeExample: `# Migrate VM database to containerized Postgres
# 1. Export from VM
pg_dump -h vm-host -U myuser mydb > mydb_backup.sql

# 2. Start containerized Postgres
docker run -d \
  --name postgres \
  -e POSTGRES_PASSWORD=secret \
  -v postgres-data:/var/lib/postgresql/data \
  -v \$(pwd)/mydb_backup.sql:/docker-entrypoint-initdb.d/init.sql \
  postgres:15

# 3. Blue-green cutover with nginx upstream switch
upstream backend {
  # server vm-app:8080;   # Old VM (comment out)
  server container:8080;   # New container
}

# 4. Verify data integrity
docker exec postgres psql -U myuser mydb -c "SELECT COUNT(*) FROM users;"`,
            language: 'bash'
          }
        ]
      }
    ]
  }
];
