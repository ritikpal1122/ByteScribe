import type { DocCategory } from './types';

export const DOCKER_PART4A_CATEGORIES: DocCategory[] = [
  {
    id: 'docker-registry',
    label: 'Registry & Distribution',
    icon: '🏪',
    entries: [
      {
        id: 'docker-registry-overview',
        title: 'Container Registries',
        description: 'Overview of Docker Hub, ECR, GCR, ACR, GHCR, and self-hosted registries.',
        difficulty: 'intermediate',
        tags: ['docker', 'registry', 'hub', 'ecr', 'gcr', 'distribution'],
        sections: [
          {
            title: 'Popular Public Registries',
            content: 'Container registries store and distribute Docker images. Docker Hub is the default public registry. AWS ECR, Google GCR, Azure ACR, and GitHub GHCR are cloud-native options with tight platform integration. Each offers private repositories, access controls, and geographic replication. Choose based on your cloud provider to minimize latency and egress costs.',
            code: `# Docker Hub
docker pull nginx:latest
docker push myuser/myapp:1.0.0

# AWS ECR
aws ecr get-login-password --region us-east-1 | \\
  docker login --username AWS --password-stdin \\
  123456789.dkr.ecr.us-east-1.amazonaws.com

# GitHub Container Registry
echo $GITHUB_TOKEN | docker login ghcr.io -u USERNAME --password-stdin
docker pull ghcr.io/owner/image:tag`,
          },
          {
            title: 'Pulling from Multiple Registries',
            content: 'Docker can pull from any registry by prefixing the image name with the registry hostname. Unqualified names default to Docker Hub. Mirror registries can be configured in the Docker daemon to cache upstream images locally, reducing bandwidth and improving reliability in CI environments.',
            code: `# Google Container Registry
docker pull gcr.io/google-containers/pause:3.9

# Azure Container Registry
docker pull myregistry.azurecr.io/myapp:latest

# Self-hosted (localhost)
docker pull localhost:5000/myapp:dev

# Configure daemon mirrors (/etc/docker/daemon.json)
# { "registry-mirrors": ["https://mirror.example.com"] }`,
          },
          {
            title: 'Authenticating and Managing Credentials',
            content: 'Use docker login to authenticate with any registry. Credentials are stored in ~/.docker/config.json. For CI/CD, use credential helpers or environment-based secrets. Docker credential helpers (docker-credential-ecr-login, docker-credential-gcr) automatically refresh tokens and avoid storing plaintext passwords.',
            code: `# Login / logout
docker login
docker login registry.example.com
docker logout registry.example.com

# View stored credentials
cat ~/.docker/config.json

# Use credential helper for ECR
apt-get install amazon-ecr-credential-helper
# In ~/.docker/config.json:
# { "credHelpers": { "123456789.dkr.ecr.us-east-1.amazonaws.com": "ecr-login" } }`,
          },
        ],
        quiz: {
          questions: [
            {
              question: 'Which registry is the default when no hostname is specified in a docker pull command?',
              options: ['ghcr.io', 'gcr.io', 'Docker Hub (docker.io)', 'quay.io'],
              correctIndex: 2,
              explanation: 'Docker Hub (docker.io) is the default registry. Unqualified image names like nginx:latest resolve to docker.io/library/nginx:latest.',
            },
            {
              question: 'What does a Docker registry mirror do?',
              options: [
                'Pushes images to multiple registries simultaneously',
                'Caches upstream images locally to reduce bandwidth',
                'Mirrors image metadata without storing layers',
                'Replicates only tagged images',
              ],
              correctIndex: 1,
              explanation: 'A registry mirror caches images pulled from an upstream registry, reducing bandwidth usage and improving pull speeds in CI environments.',
            },
            {
              question: 'Which tool automatically refreshes ECR authentication tokens?',
              options: ['docker-credential-pass', 'docker-credential-ecr-login', 'aws-vault', 'docker-credential-osxkeychain'],
              correctIndex: 1,
              explanation: 'docker-credential-ecr-login is a credential helper that automatically calls aws ecr get-login-password to refresh short-lived ECR tokens.',
            },
          ],
        },
      },
      {
        id: 'docker-private-registry',
        title: 'Private Registry',
        description: 'Deploy a self-hosted registry with TLS, authentication, and configurable storage backends.',
        difficulty: 'advanced',
        tags: ['docker', 'private-registry', 'tls', 'authentication', 'self-hosted'],
        sections: [
          {
            title: 'Running registry:2',
            content: 'The official registry:2 image implements the OCI Distribution Specification. Deploy it as a container with a persistent volume for image storage. By default it listens on port 5000 without TLS. For production use always enable TLS and authentication. The registry supports multiple storage backends including filesystem, S3, GCS, and Azure Blob.',
            code: `# Basic local registry
docker run -d -p 5000:5000 --name registry \\
  -v registry-data:/var/lib/registry \\
  registry:2

# Push/pull to local registry
docker tag myapp:latest localhost:5000/myapp:latest
docker push localhost:5000/myapp:latest
docker pull localhost:5000/myapp:latest

# List repositories via API
curl http://localhost:5000/v2/_catalog`,
          },
          {
            title: 'Enabling TLS',
            content: 'Production registries must use TLS. Generate or obtain a certificate and key, then mount them into the registry container. Configure the REGISTRY_HTTP_TLS_CERTIFICATE and REGISTRY_HTTP_TLS_KEY environment variables. Clients connecting to a registry with a self-signed certificate must add it to their system trust store or configure Docker with insecure-registries.',
            code: `# Generate self-signed cert (testing only)
openssl req -newkey rsa:4096 -nodes -keyout domain.key \\
  -x509 -days 365 -out domain.crt

# Run registry with TLS
docker run -d -p 443:443 --name registry \\
  -v $(pwd)/certs:/certs \\
  -v registry-data:/var/lib/registry \\
  -e REGISTRY_HTTP_ADDR=0.0.0.0:443 \\
  -e REGISTRY_HTTP_TLS_CERTIFICATE=/certs/domain.crt \\
  -e REGISTRY_HTTP_TLS_KEY=/certs/domain.key \\
  registry:2`,
          },
          {
            title: 'Authentication and Storage Backends',
            content: 'Enable htpasswd-based basic authentication by generating a password file with bcrypt hashing. For enterprise use, configure token-based auth with an external identity provider. Storage backends are configured via environment variables or a config.yml file. S3 backend requires AWS credentials and a bucket name; it supports server-side encryption and cross-region replication.',
            code: `# Create htpasswd file (bcrypt required)
docker run --rm --entrypoint htpasswd httpd:2 \\
  -Bbn admin secretpassword > htpasswd

# Run with auth + S3 storage
docker run -d -p 443:443 --name registry \\
  -v $(pwd)/certs:/certs \\
  -v $(pwd)/htpasswd:/htpasswd \\
  -e REGISTRY_AUTH=htpasswd \\
  -e REGISTRY_AUTH_HTPASSWD_REALM="Registry Realm" \\
  -e REGISTRY_AUTH_HTPASSWD_PATH=/htpasswd \\
  -e REGISTRY_STORAGE=s3 \\
  -e REGISTRY_STORAGE_S3_BUCKET=my-registry-bucket \\
  -e REGISTRY_STORAGE_S3_REGION=us-east-1 \\
  registry:2`,
          },
        ],
      },
      {
        id: 'docker-tagging-strategy',
        title: 'Image Tagging Strategy',
        description: 'Semantic versioning, latest tag pitfalls, SHA pinning, and date-based tags for reproducible builds.',
        difficulty: 'intermediate',
        tags: ['docker', 'tagging', 'semver', 'versioning', 'best-practices'],
        sections: [
          {
            title: 'Semantic Versioning Tags',
            content: 'Semantic versioning (MAJOR.MINOR.PATCH) is the most common tagging strategy. Push multiple tags per release: the full semver, a minor alias, and a major alias. This lets consumers pin at varying granularity. Automate tag generation in CI using the Git tag or commit metadata. Never rely solely on latest for production deployments.',
            code: `# Tag with semver aliases
VERSION=2.4.1
docker build -t myapp:\${VERSION} .
docker tag myapp:\${VERSION} myapp:2.4
docker tag myapp:\${VERSION} myapp:2
docker tag myapp:\${VERSION} myapp:latest

# Push all tags
docker push myapp:\${VERSION}
docker push myapp:2.4
docker push myapp:2
docker push myapp:latest

# In CI from Git tag
VERSION=$(git describe --tags --abbrev=0)`,
          },
          {
            title: 'The latest Tag Pitfall',
            content: 'The latest tag is mutable and gives no indication of which version is running. Deployments using latest can silently upgrade or break when the image is updated. In production, always pin to an immutable tag. Reserve latest for development convenience only. Document your tagging policy in a CONTRIBUTING guide so all team members follow the same convention.',
            code: `# BAD: mutable, non-reproducible
FROM node:latest
# image may change without notice

# GOOD: pinned minor version
FROM node:20.11

# BEST: pinned by digest (immutable)
FROM node:20.11@sha256:abc123def456...

# Date-based tag for nightly builds
DATE=$(date +%Y%m%d)
docker tag myapp:dev myapp:nightly-\${DATE}`,
          },
          {
            title: 'SHA Digest Pinning',
            content: 'Digest pinning references an image by its content-addressable SHA256 hash, guaranteeing bit-for-bit reproducibility regardless of tag mutations. Use docker inspect or the registry API to retrieve digests. In Dockerfiles and Kubernetes manifests, append @sha256:<digest> after the image name. Automate digest updates with tools like Dependabot or Renovate.',
            code: `# Get digest of a pulled image
docker inspect --format='{{index .RepoDigests 0}}' nginx:1.25

# Pull by digest
docker pull nginx@sha256:a4c6b1f...

# Use digest in Dockerfile
FROM nginx:1.25@sha256:a4c6b1f...

# List all digests for an image
docker images --digests nginx`,
          },
        ],
        quiz: {
          questions: [
            {
              question: 'What is the main risk of using the latest tag in production?',
              options: [
                'It pulls the oldest available image',
                'It prevents multi-stage builds',
                'It is mutable and can silently change the running version',
                'It disables layer caching',
              ],
              correctIndex: 2,
              explanation: 'The latest tag is mutable — it can point to a different image digest after a new push, causing unexpected version changes in production deployments.',
            },
            {
              question: 'Which tagging method provides the strongest reproducibility guarantee?',
              options: [
                'Semantic version tag (e.g., 2.4.1)',
                'Date-based tag (e.g., 20240101)',
                'SHA256 digest pin',
                'Branch name tag',
              ],
              correctIndex: 2,
              explanation: 'SHA256 digest pinning references the exact image content hash, making it impossible for the reference to silently change even if the tag is overwritten.',
            },
            {
              question: 'When pushing semver aliases (2.4.1, 2.4, 2), what benefit does this provide consumers?',
              options: [
                'Smaller image size through deduplication',
                'Flexibility to pin at their desired update granularity',
                'Automatic security patching',
                'Faster pull speeds via parallel layers',
              ],
              correctIndex: 1,
              explanation: 'Multiple semver aliases let consumers choose their update granularity: pin to 2.4.1 for exact builds, 2.4 to receive patches, or 2 to receive minor updates automatically.',
            },
          ],
        },
      },
      {
        id: 'docker-manifest',
        title: 'Multi-Architecture Images',
        description: 'Build and push manifest lists with buildx to support amd64, arm64, and other platforms.',
        difficulty: 'advanced',
        tags: ['docker', 'manifest', 'multi-arch', 'buildx', 'platform'],
        sections: [
          {
            title: 'Manifest Lists and OCI Index',
            content: 'A manifest list (OCI image index) is a registry object that maps platform descriptors to individual image manifests. When a client pulls an image, the registry returns the manifest matching the client platform automatically. This enables a single image reference to serve amd64, arm64, arm/v7, and other architectures transparently without consumer-side changes.',
            code: `# Inspect manifest list
docker manifest inspect nginx:latest

# Create manifest list manually (legacy approach)
docker manifest create myapp:1.0 \\
  myapp:1.0-amd64 \\
  myapp:1.0-arm64

docker manifest annotate myapp:1.0 myapp:1.0-arm64 \\
  --os linux --arch arm64

docker manifest push myapp:1.0

# Inspect specific platform
docker manifest inspect --verbose myapp:1.0`,
          },
          {
            title: 'Building with buildx',
            content: 'Docker Buildx extends the build command with BuildKit backends that support cross-compilation and multi-platform builds in a single step. Create a builder instance with the docker-container driver to enable multi-platform support. The --platform flag accepts a comma-separated list of target platforms. Use --push to build and push all platform images plus the manifest list atomically.',
            code: `# Create and use a multi-platform builder
docker buildx create --name multiarch --use
docker buildx inspect --bootstrap

# Build for multiple platforms and push
docker buildx build \\
  --platform linux/amd64,linux/arm64,linux/arm/v7 \\
  --tag myregistry.io/myapp:1.0 \\
  --push .

# Build locally for single platform (no push)
docker buildx build \\
  --platform linux/arm64 \\
  --load \\
  -t myapp:arm64-test .`,
          },
          {
            title: 'Cross-Compilation in Dockerfiles',
            content: 'Buildx uses QEMU for emulation when a native builder is unavailable. For better performance, use cross-compilation. BuildKit provides BUILDPLATFORM, TARGETPLATFORM, TARGETOS, and TARGETARCH build arguments automatically. Use the --platform=$BUILDPLATFORM directive on build stages to run tools natively, then copy artifacts to the target-platform final stage.',
            code: `# Dockerfile with cross-compilation
# syntax=docker/dockerfile:1
ARG BUILDPLATFORM
ARG TARGETPLATFORM
ARG TARGETOS
ARG TARGETARCH

FROM --platform=$BUILDPLATFORM golang:1.22 AS builder
ARG TARGETOS TARGETARCH
WORKDIR /app
COPY . .
RUN GOOS=$TARGETOS GOARCH=$TARGETARCH \\
    go build -o /app/server .

FROM --platform=$TARGETPLATFORM alpine:3.19
COPY --from=builder /app/server /server
ENTRYPOINT ["/server"]`,
          },
        ],
      },
      {
        id: 'docker-image-signing',
        title: 'Image Signing & Trust',
        description: 'Ensure image integrity with Docker Content Trust, Notary v2, cosign, and SBOM attestations.',
        difficulty: 'advanced',
        tags: ['docker', 'signing', 'trust', 'notary', 'cosign'],
        sections: [
          {
            title: 'Docker Content Trust (DCT)',
            content: 'Docker Content Trust uses The Update Framework (TUF) and Notary to cryptographically sign and verify image tags. When DCT is enabled, docker pull refuses unsigned images. DCT signs at the tag level, generating a root key and repository key. Store root keys offline in a secure location. DCT is suitable for controlled environments but has limitations with multi-arch manifests.',
            code: `# Enable Docker Content Trust
export DOCKER_CONTENT_TRUST=1

# Sign and push (prompts for passphrase)
docker push myregistry.io/myapp:1.0

# Pull — refuses unsigned images
docker pull myregistry.io/myapp:1.0

# Inspect trust data
docker trust inspect --pretty myregistry.io/myapp:1.0

# Add a signer
docker trust signer add --key cert.pem alice \\
  myregistry.io/myapp`,
          },
          {
            title: 'cosign for Keyless Signing',
            content: 'cosign (from Sigstore) provides modern image signing with keyless OIDC-based signatures and traditional key-based signing. Keyless signing uses ephemeral keys bound to an OIDC identity (GitHub Actions, Google, etc.) and records signatures in the Rekor transparency log. Signatures are stored as OCI artifacts in the same registry, no separate infrastructure required.',
            code: `# Install cosign
brew install cosign

# Key-based signing
cosign generate-key-pair
cosign sign --key cosign.key myregistry.io/myapp:1.0@sha256:<digest>

# Keyless signing (in GitHub Actions / Google Cloud)
cosign sign myregistry.io/myapp:1.0@sha256:<digest>

# Verify signature
cosign verify \\
  --certificate-identity user@example.com \\
  --certificate-oidc-issuer https://accounts.google.com \\
  myregistry.io/myapp:1.0`,
          },
          {
            title: 'SBOM Attestations',
            content: 'A Software Bill of Materials (SBOM) lists all components, dependencies, and licenses in an image. cosign can attach SBOM attestations as OCI artifacts. Syft generates SBOMs in CycloneDX or SPDX format. Grype consumes SBOMs for vulnerability scanning. SBOM attestations enable policy engines like OPA or Kyverno to enforce supply chain policies at admission time.',
            code: `# Generate SBOM with Syft
syft myregistry.io/myapp:1.0 -o spdx-json > sbom.spdx.json

# Attest SBOM with cosign
cosign attest --key cosign.key \\
  --predicate sbom.spdx.json \\
  --type spdxjson \\
  myregistry.io/myapp:1.0@sha256:<digest>

# Verify attestation
cosign verify-attestation \\
  --key cosign.pub \\
  --type spdxjson \\
  myregistry.io/myapp:1.0

# buildx native SBOM generation
docker buildx build --sbom=true --push -t myapp:1.0 .`,
          },
        ],
      },
      {
        id: 'docker-scanning',
        title: 'Image Scanning',
        description: 'Detect vulnerabilities in images using Trivy, Snyk, Docker Scout, and CI/CD pipeline integration.',
        difficulty: 'intermediate',
        tags: ['docker', 'scanning', 'vulnerabilities', 'trivy', 'security'],
        sections: [
          {
            title: 'Scanning with Trivy',
            content: 'Trivy is an open-source vulnerability scanner that checks OS packages, language dependencies, misconfigurations, and secrets. It supports Docker images, filesystems, Git repos, and Kubernetes manifests. Trivy databases are updated daily with CVE data from multiple feeds. Run Trivy locally during development and in CI to catch vulnerabilities before images reach production registries.',
            code: `# Install Trivy
brew install aquasecurity/trivy/trivy

# Scan a local image
trivy image myapp:latest

# Scan with severity filter
trivy image --severity HIGH,CRITICAL myapp:latest

# Scan and output as JSON
trivy image --format json -o results.json myapp:latest

# Scan and fail CI on CRITICAL
trivy image --exit-code 1 --severity CRITICAL myapp:latest

# Scan a Dockerfile for misconfigurations
trivy config Dockerfile`,
          },
          {
            title: 'Docker Scout and Snyk',
            content: 'Docker Scout (built into Docker Desktop and CLI) provides CVE analysis, base image upgrade recommendations, and policy evaluation. Snyk integrates deeply with CI/CD pipelines and developer IDEs, offering remediation advice and automatic PR fixes. Both tools maintain curated vulnerability databases and can block CI pipelines when vulnerabilities exceed a defined threshold.',
            code: `# Docker Scout (requires Docker subscription)
docker scout cves myapp:latest
docker scout recommendations myapp:latest
docker scout compare myapp:1.0 --to myapp:1.1

# Snyk CLI
npm install -g snyk
snyk auth
snyk container test myapp:latest
snyk container test myapp:latest \\
  --file=Dockerfile \\
  --severity-threshold=high

# Monitor image in Snyk dashboard
snyk container monitor myapp:latest`,
          },
          {
            title: 'CI Integration',
            content: 'Integrate scanning into CI pipelines to enforce security gates before pushing to production registries. Use exit codes to fail builds on critical findings. Cache Trivy vulnerability databases between runs to reduce scan time. For GitHub Actions, use the official aquasecurity/trivy-action. Upload results as SARIF to GitHub Security tab for centralized visibility.',
            code: `# GitHub Actions workflow snippet
# - name: Scan image with Trivy
#   uses: aquasecurity/trivy-action@master
#   with:
#     image-ref: myapp:\${{ github.sha }}
#     format: sarif
#     output: trivy-results.sarif
#     severity: CRITICAL,HIGH
#     exit-code: '1'
#
# - name: Upload SARIF
#   uses: github/codeql-action/upload-sarif@v3
#   with:
#     sarif_file: trivy-results.sarif

# GitLab CI snippet
# scan:
#   image: aquasec/trivy:latest
#   script:
#     - trivy image --exit-code 1 --severity CRITICAL $IMAGE`,
          },
        ],
        quiz: {
          questions: [
            {
              question: 'Which Trivy flag causes the CLI to exit with a non-zero code when vulnerabilities are found?',
              options: ['--fail', '--exit-code 1', '--block', '--error-on-vuln'],
              correctIndex: 1,
              explanation: 'The --exit-code flag sets the exit code Trivy returns when vulnerabilities matching the severity filter are found, enabling CI systems to fail the build.',
            },
            {
              question: 'What does Docker Scout\'s "recommendations" command provide?',
              options: [
                'A list of deprecated Dockerfile instructions',
                'Base image upgrade suggestions to reduce vulnerabilities',
                'Network security group recommendations',
                'CPU and memory resource recommendations',
              ],
              correctIndex: 1,
              explanation: 'docker scout recommendations analyzes the image and suggests updated base images that would reduce the number of known vulnerabilities.',
            },
            {
              question: 'What format does Trivy use to upload results to GitHub Security tab?',
              options: ['JUnit XML', 'SARIF', 'JSON', 'CSV'],
              correctIndex: 1,
              explanation: 'SARIF (Static Analysis Results Interchange Format) is the standard format used to upload security scan results to GitHub\'s Security tab via the codeql-action/upload-sarif action.',
            },
          ],
        },
      },
    ],
  },
];
