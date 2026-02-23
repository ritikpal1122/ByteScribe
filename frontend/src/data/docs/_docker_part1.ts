import type { DocCategory } from './types';

export const DOCKER_PART1_CATEGORIES: DocCategory[] = [
  {
    id: 'docker-getting-started',
    label: 'Getting Started',
    icon: '🚀',
    description: 'Introduction to Docker and containerization fundamentals',
    entries: [
      {
        id: 'docker-what-is-docker',
        title: 'What is Docker?',
        difficulty: 'beginner',
        tags: ['docker', 'containers', 'virtualization', 'devops'],
        sections: [
          {
            heading: 'Containerization Explained',
            content: 'Docker is an open-source platform that automates deploying, scaling, and managing applications inside lightweight, portable containers. A container bundles your application code together with its dependencies, libraries, and configuration files into a single runnable unit. This guarantees that the application behaves identically regardless of where it runs — on a developer laptop, a staging server, or a production cloud instance. Docker was released in 2013 and has since become the industry standard for packaging and shipping software, enabling teams to move faster and eliminate the classic "it works on my machine" problem that plagues software development.',
            tip: 'Think of a Docker container like a shipping container: it holds everything needed and works the same on any ship, truck, or port.'
          },
          {
            heading: 'Containers vs Virtual Machines',
            content: 'Virtual machines (VMs) emulate an entire operating system on top of a hypervisor, consuming gigabytes of RAM and minutes to boot. Containers, by contrast, share the host OS kernel and isolate only the user-space processes, making them orders of magnitude lighter — typically megabytes in size and milliseconds to start. A single host can run dozens of containers where it could only support a handful of VMs. Containers provide process-level isolation using Linux namespaces and cgroups, giving applications their own filesystem, network stack, and process tree without the overhead of a full OS. This efficiency makes containers ideal for microservices architectures.',
            code: `# VM: Full OS per instance (GB RAM, minutes to start)
# Container: Shared kernel (MB RAM, milliseconds to start)

docker run hello-world   # starts in ~500ms
# vs spinning up a VM: 30-120 seconds`,
            note: 'Containers are not VMs. They share the host kernel and are far more lightweight and faster to start.'
          },
          {
            heading: 'Why Docker Matters',
            content: 'Docker solves dependency hell and environment inconsistency. Before containers, deploying software meant wrestling with conflicting library versions, OS differences, and manual configuration steps. Docker packages everything into an immutable image that runs consistently across environments. For development teams, this means onboarding a new developer takes minutes instead of days — just pull the image and run. For operations, deployments become repeatable and rollbacks are trivial. Docker integrates naturally with CI/CD pipelines and orchestration platforms like Kubernetes, making it the foundational building block of modern cloud-native application delivery and DevOps practices.',
            tip: 'Docker images are immutable snapshots. You always know exactly what is running in production.'
          }
        ]
      },
      {
        id: 'docker-installation',
        title: 'Installing Docker',
        difficulty: 'beginner',
        tags: ['docker', 'installation', 'setup', 'docker-desktop'],
        sections: [
          {
            heading: 'Docker Desktop (Mac & Windows)',
            content: 'Docker Desktop is the easiest way to get Docker running on macOS and Windows. It bundles the Docker Engine, CLI, Docker Compose, and a GUI dashboard into a single installer. Download it from docker.com/products/docker-desktop, run the installer, and Docker starts automatically in your system tray. On macOS, Docker Desktop runs a lightweight Linux VM under the hood since macOS does not have a native Linux kernel. On Windows, Docker Desktop can use either WSL2 (recommended) or Hyper-V as the backend. After installation, open a terminal and verify everything works.',
            code: `# Verify installation
docker --version
# Docker version 26.x.x

docker compose version
# Docker Compose version v2.x.x

docker info
# Shows system-wide information`,
            tip: 'Always use Docker Desktop for local development on Mac/Windows — it includes everything you need in one package.'
          },
          {
            heading: 'Linux Installation',
            content: 'On Linux, install Docker Engine directly without needing Docker Desktop. The recommended method uses the official Docker repository for your distribution. After adding the repository, install docker-ce, docker-ce-cli, and containerd.io packages. Add your user to the docker group so you can run Docker commands without sudo. Log out and back in for the group change to take effect. Enable and start the Docker service with systemctl. Linux gives you the best Docker performance since containers run natively without a VM layer, making it the preferred platform for production servers and CI/CD environments.',
            code: `# Ubuntu/Debian quick install
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
newgrp docker

# Start and enable service
sudo systemctl enable --now docker

# Verify
docker run hello-world`,
            note: 'After adding yourself to the docker group, you must log out and back in (or run newgrp docker) for it to take effect.'
          },
          {
            heading: 'Post-Installation Setup',
            content: 'After installing Docker, a few configuration steps improve your experience. Configure Docker to start on boot using your OS service manager. Set resource limits in Docker Desktop preferences (CPU, memory, disk) appropriate for your machine. Consider setting up a Docker Hub account at hub.docker.com to pull and push images. For teams, configure a private registry or use Docker Hub private repositories. Review the Docker daemon configuration at /etc/docker/daemon.json for advanced settings like log drivers, registry mirrors, and storage drivers. Run the hello-world container as a final sanity check to confirm the installation works end-to-end.',
            code: `# Test your installation
docker run hello-world

# Check running containers
docker ps

# Check all containers (including stopped)
docker ps -a

# System resource usage
docker system df`,
            tip: 'Run docker system prune periodically to clean up unused images, containers, and networks to reclaim disk space.'
          }
        ],
        quiz: [
          {
            question: 'Which backend does Docker Desktop use on macOS to run Linux containers?',
            options: ['Hyper-V', 'A lightweight Linux VM', 'WSL2', 'Native kernel support'],
            answer: 1,
            explanation: 'macOS does not have a Linux kernel, so Docker Desktop runs a lightweight Linux VM (using HyperKit or Apple Virtualization Framework) to host containers.'
          },
          {
            question: 'After adding your Linux user to the docker group, what must you do?',
            options: ['Restart Docker daemon', 'Reboot the system', 'Log out and back in or run newgrp docker', 'Nothing — it takes effect immediately'],
            answer: 2,
            explanation: 'Group membership changes require a new login session. You can either log out and back in, or run "newgrp docker" in the current terminal.'
          },
          {
            question: 'What does running "docker run hello-world" verify?',
            options: ['Only that Docker CLI is installed', 'Only that the network works', 'Full end-to-end: daemon running, image pull, and container execution', 'That Docker Hub credentials are set'],
            answer: 2,
            explanation: 'hello-world tests the complete pipeline: Docker CLI communicates with the daemon, daemon pulls the image from Docker Hub, and creates/runs a container.'
          }
        ]
      },
      {
        id: 'docker-architecture',
        title: 'Docker Architecture',
        difficulty: 'beginner',
        tags: ['docker', 'architecture', 'daemon', 'client-server'],
        sections: [
          {
            heading: 'Client-Server Model',
            content: 'Docker uses a client-server architecture with three main components. The Docker client (docker CLI) is what you interact with when running commands. The Docker daemon (dockerd) is the server that does the heavy lifting — building images, running containers, and managing networks and volumes. The client and daemon communicate via REST API over a Unix socket or network. They can run on the same machine or the client can connect to a remote daemon. Docker registries store images; Docker Hub is the default public registry. When you run docker run, the client sends a request to the daemon, which pulls the image if needed and starts the container.',
            code: `# Architecture components:
# Client  ──REST API──▶  Daemon (dockerd)  ──▶  Containers
#                                           ──▶  Images
#                                           ──▶  Networks
#                                           ──▶  Volumes

# Check daemon status
sudo systemctl status docker

# Client talks to remote daemon
export DOCKER_HOST=tcp://remote-server:2376
docker ps`,
            note: 'The Docker CLI and daemon are separate processes. On Linux they communicate over /var/run/docker.sock by default.'
          },
          {
            heading: 'Architecture Diagram',
            content: 'Understanding the flow from a docker command to a running container helps you debug issues and optimize workflows. The client parses your command and sends an API call to the daemon. The daemon checks if the requested image exists locally in its image cache. If not, it contacts the configured registry (default: Docker Hub) to pull the image layers. Once the image is available, the daemon creates a container — a writable layer on top of the read-only image layers — and starts the specified process inside it using Linux namespaces and cgroups for isolation. Networking and volume mounts are set up according to your run flags.',
            code: `\`\`\`mermaid
graph LR
    CLI["Docker Client\\n(docker CLI)"] -->|REST API| Daemon["Docker Daemon\\n(dockerd)"]
    Daemon -->|pull if missing| Registry["Registry\\n(Docker Hub)"]
    Registry -->|image layers| Daemon
    Daemon -->|creates| Container["Container\\n(running process)"]
    Daemon -->|manages| Images["Local Image Cache"]
    Daemon -->|manages| Networks["Networks"]
    Daemon -->|manages| Volumes["Volumes"]
\`\`\``,
            tip: 'The daemon is the real engine. The CLI is just a thin client that translates commands to API calls.'
          },
          {
            heading: 'containerd and runc',
            content: 'Modern Docker has a layered runtime architecture. The Docker daemon delegates container lifecycle management to containerd, a high-level container runtime that manages image storage, container execution, and networking. containerd in turn calls runc, a low-level OCI-compliant runtime that actually creates containers using Linux kernel features (namespaces, cgroups). This separation enables Kubernetes to use containerd directly without Docker, and ensures containers created by different tools are interoperable. The Open Container Initiative (OCI) defines standard specs for container images and runtimes, ensuring portability across tools. Understanding this stack helps when diagnosing low-level issues.',
            code: `# Check containerd status
sudo systemctl status containerd

# Docker uses containerd as its runtime
docker info | grep -i runtime
# Default Runtime: runc
# containerd version: ...

# OCI runtime spec
# runc implements OCI Runtime Specification`,
            analogy: 'Docker daemon is like a restaurant manager, containerd is the kitchen supervisor, and runc is the chef who actually cooks (creates) the container.'
          }
        ]
      },
      {
        id: 'docker-hello-world',
        title: 'Running Your First Container',
        difficulty: 'beginner',
        tags: ['docker', 'containers', 'run', 'tutorial'],
        sections: [
          {
            heading: 'Your First docker run',
            content: 'The docker run command is your entry point to working with containers. It combines docker pull (fetching the image if not present) and docker create + docker start into a single convenient command. When you run docker run hello-world, Docker checks your local image cache, finds no hello-world image, pulls it from Docker Hub, creates a container from it, starts it, streams its output to your terminal, and the container exits when the process finishes. The entire process takes a few seconds. This simple command demonstrates the complete Docker workflow and confirms your installation is working correctly from end to end.',
            code: `# Run your first container
docker run hello-world

# Run an interactive Ubuntu container
docker run -it ubuntu bash

# Inside the container:
cat /etc/os-release
ls /
exit

# Run nginx in the background
docker run -d -p 8080:80 --name my-nginx nginx
# Visit http://localhost:8080`,
            tip: 'The -it flags mean interactive (-i) and allocate a pseudo-TTY (-t). Use them whenever you want a shell inside a container.'
          },
          {
            heading: 'Understanding run Flags',
            content: 'The docker run command accepts many flags that control container behavior. The -d flag runs the container in detached mode (background), returning control to your terminal. The -p flag maps host ports to container ports (host:container). The --name flag assigns a memorable name instead of a random one. The -e flag sets environment variables. The -v flag mounts volumes for persistent data. The --rm flag automatically removes the container when it exits, keeping your system clean. The -it combination is used for interactive sessions. Combining these flags gives you precise control over how containers run, network, store data, and interact with the host system.',
            code: `# Common flags in action
docker run \
  -d \                    # detached (background)
  -p 3000:3000 \          # host:container port
  --name my-app \         # custom name
  -e NODE_ENV=production\ # environment variable
  -v /data:/app/data \    # volume mount
  --rm \                  # remove on exit
  my-node-app:latest

# Check it's running
docker ps
docker logs my-app`,
            note: 'Use --rm during development to avoid accumulating stopped containers. Omit it in production when you want to inspect logs after exit.'
          },
          {
            heading: 'Interactive vs Detached Containers',
            content: 'Containers run in two primary modes. Interactive mode (-it) attaches your terminal to the container process, letting you type commands and see output in real time — perfect for exploring images, debugging, or running one-off commands. Detached mode (-d) runs the container as a background daemon, ideal for long-running services like web servers, databases, and queues. You can always attach to a running detached container using docker attach or execute additional commands using docker exec. Use docker logs to read output from detached containers. Understanding when to use each mode is fundamental to effective Docker usage in both development and production workflows.',
            code: `# Interactive mode
docker run -it python:3.12 python
>>> print("Hello from container!")
>>> exit()

# Detached mode
docker run -d --name redis redis:7
docker ps  # see it running

# Exec into running container
docker exec -it redis redis-cli
127.0.0.1:6379> PING
PONG

# View logs
docker logs redis
docker logs -f redis  # follow/tail`,
            tip: 'docker exec is safer than docker attach for debugging — exec starts a new process, attach connects to PID 1 and Ctrl+C will kill the container.'
          }
        ],
        quiz: [
          {
            question: 'What does the -d flag do in docker run -d nginx?',
            options: ['Deletes the container after exit', 'Runs container in detached (background) mode', 'Disables networking', 'Downloads the image only'],
            answer: 1,
            explanation: 'The -d flag runs the container in detached mode, meaning it runs in the background and returns your terminal prompt immediately.'
          },
          {
            question: 'In docker run -p 8080:80 nginx, what does 8080 refer to?',
            options: ['Container port', 'Host (your machine) port', 'The image version', 'Internal Docker network port'],
            answer: 1,
            explanation: 'The format is host:container. Port 8080 is on your host machine, and traffic is forwarded to port 80 inside the container.'
          },
          {
            question: 'What is the difference between docker exec and docker attach?',
            options: ['They are identical', 'exec starts a new process; attach connects to PID 1', 'attach starts a new process; exec connects to PID 1', 'exec only works with stopped containers'],
            answer: 1,
            explanation: 'docker exec starts a new process (like bash) in a running container. docker attach connects your terminal to PID 1; sending Ctrl+C would kill the main process.'
          }
        ]
      },
      {
        id: 'docker-basic-commands',
        title: 'Essential Docker Commands',
        difficulty: 'beginner',
        tags: ['docker', 'commands', 'cli', 'management'],
        sections: [
          {
            heading: 'Container Management',
            content: 'Docker provides a comprehensive CLI for managing container lifecycle. The core commands you will use daily are docker run (create and start), docker ps (list running containers), docker ps -a (list all containers including stopped), docker stop (gracefully stop), docker start (restart a stopped container), docker rm (remove stopped container), and docker logs (view output). The docker stop command sends SIGTERM and waits 10 seconds before sending SIGKILL. For immediate termination, use docker kill. Always name your containers with --name for easier reference. Most commands accept container names or IDs, and IDs can be abbreviated to the first few unique characters.',
            code: `docker ps                    # running containers
docker ps -a                 # all containers
docker ps -q                 # just IDs

docker stop my-container     # graceful stop
docker kill my-container     # immediate kill
docker start my-container    # restart stopped

docker rm my-container       # remove stopped
docker rm -f my-container    # force remove running

docker logs my-container     # stdout/stderr
docker logs -f --tail 100 my-container`,
            tip: 'docker rm -f is a quick way to stop and remove in one command during development, but use with caution in production.'
          },
          {
            heading: 'Image Commands',
            content: 'Managing local images is a core skill. docker images (or docker image ls) lists all locally cached images showing repository, tag, ID, creation date, and size. docker pull fetches an image from a registry without running it. docker rmi removes images — you must remove all containers using an image before you can delete it. docker image prune removes dangling images (untagged layers that waste disk space). docker image inspect gives detailed metadata about an image including its layers, environment variables, exposed ports, and entrypoint. docker history shows the layers that make up an image, useful for understanding its build process and identifying large layers.',
            code: `docker images                # list images
docker image ls              # same thing

docker pull ubuntu:22.04     # fetch image
docker pull nginx:alpine     # specific tag

docker rmi nginx:alpine      # remove image
docker image prune           # remove dangling

docker image inspect nginx   # full metadata
docker history nginx         # layer history

# Remove all unused images
docker image prune -a`,
            note: 'Images with the tag <none> are dangling images from intermediate build steps. Prune them regularly to save disk space.'
          },
          {
            heading: 'System Commands',
            content: 'Docker system commands give you visibility and control over your Docker installation. docker info shows system-wide information including number of containers, images, storage driver, and resource limits. docker system df shows disk usage broken down by images, containers, and volumes. docker system prune is the nuclear option — it removes all stopped containers, unused networks, dangling images, and build cache in one shot. docker stats streams real-time CPU, memory, and network metrics for running containers, similar to the Linux top command. docker inspect works on any Docker object (container, image, network, volume) and returns detailed JSON configuration. These commands are essential for debugging and maintenance.',
            code: `docker info              # system-wide info
docker version           # client + server versions

docker system df         # disk usage
docker system prune      # clean everything unused
docker system prune -a   # including unused images

# Real-time stats (like top)
docker stats
docker stats my-container

# Inspect any object
docker inspect my-container
docker inspect nginx:latest
docker inspect my-network`,
            tip: 'docker system prune -a is your cleanup tool. Run it weekly in development to recover gigabytes of disk space.'
          }
        ]
      },
      {
        id: 'docker-hub',
        title: 'Docker Hub',
        difficulty: 'beginner',
        tags: ['docker', 'registry', 'docker-hub', 'images'],
        sections: [
          {
            heading: 'What is Docker Hub?',
            content: 'Docker Hub is the world\'s largest container image registry and the default registry for Docker. It hosts millions of images from official sources (like nginx, postgres, python, node) and community contributors. Official images are maintained by Docker or the upstream software vendor, security-scanned regularly, and follow best practices. Verified Publisher images come from trusted software companies. Community images are contributed by individuals and organizations. Docker Hub provides free accounts with unlimited public repositories and limited private repositories. Images are identified by namespace/repository:tag format. The library namespace hosts official images, so nginx is shorthand for docker.io/library/nginx:latest.',
            code: `# Pulling official images
docker pull nginx          # official nginx
docker pull python:3.12    # specific version
docker pull node:20-alpine # Alpine-based variant

# Full registry path (these are equivalent)
docker pull nginx
docker pull docker.io/library/nginx:latest

# Search Docker Hub from CLI
docker search nginx
docker search --filter is-official=true nginx`,
            tip: 'Always specify a version tag in production (nginx:1.25) rather than latest — latest changes and can break deployments.'
          },
          {
            heading: 'Pushing Your Images',
            content: 'Publishing your own images to Docker Hub lets you share them with teammates, deploy to production servers, or contribute to the community. First, create a free account at hub.docker.com. Then tag your image with your username and repository name using docker tag. Login with docker login and push with docker push. The image is then publicly available (or private if you configure it). Use semantic versioning for tags and always push both a version tag and latest. Automate image builds by connecting Docker Hub to your GitHub repository — Docker Hub can automatically build and push images when you push code.',
            code: `# Login to Docker Hub
docker login
# Enter username and password/token

# Tag your image for Docker Hub
docker tag my-app:local yourusername/my-app:1.0.0
docker tag my-app:local yourusername/my-app:latest

# Push to Docker Hub
docker push yourusername/my-app:1.0.0
docker push yourusername/my-app:latest

# Pull it anywhere
docker pull yourusername/my-app:1.0.0`,
            note: 'Use Docker Hub access tokens instead of your password for CLI authentication — more secure and can be revoked independently.'
          },
          {
            heading: 'Image Tags and Variants',
            content: 'Image tags are version identifiers that let you select specific variants of an image. Most official images follow consistent tagging conventions. Version tags (like 3.12) pin to a specific release. slim variants strip out non-essential packages, reducing image size significantly. alpine variants use Alpine Linux as the base, producing the smallest images (often 5-10x smaller than Debian-based). The latest tag always points to the most recent stable release but is unstable for production use. bookworm/bullseye refer to Debian release names. Understanding tag conventions helps you choose the right base image balancing size, compatibility, and security for your use case.',
            code: `# Node.js image variants comparison
docker pull node:20         # Full Debian (~1GB)
docker pull node:20-slim    # Slim Debian (~200MB)
docker pull node:20-alpine  # Alpine Linux (~50MB)

# Python variants
docker pull python:3.12          # Full
docker pull python:3.12-slim     # Slim
docker pull python:3.12-alpine   # Alpine

# Check sizes
docker images | grep node`,
            tip: 'Start with the full image during development for easier debugging, then switch to alpine or slim for your production Dockerfile.'
          }
        ],
        quiz: [
          {
            question: 'What does the "latest" tag mean for a Docker image?',
            options: ['The most stable and recommended version', 'Always the most recently pushed tag', 'The most recently published stable release by convention', 'A tag that is automatically updated to any new push'],
            answer: 2,
            explanation: '"latest" is just a conventional tag pointing to the most recent stable release. It is not automatically the newest push — maintainers control what latest points to. Avoid it in production.'
          },
          {
            question: 'What is the key benefit of Alpine-based Docker images?',
            options: ['Better security features', 'Significantly smaller image size (5-10x smaller)', 'Faster runtime performance', 'Better compatibility with all packages'],
            answer: 1,
            explanation: 'Alpine Linux is a minimal distribution (~5MB base). Alpine-based Docker images are typically 5-10x smaller than Debian-based equivalents, speeding up pulls and reducing attack surface.'
          },
          {
            question: 'What is the correct format for tagging an image for Docker Hub?',
            options: ['repository:username:tag', 'username/repository:tag', 'docker.io:username/repository', 'username:repository/tag'],
            answer: 1,
            explanation: 'Docker Hub images follow the format username/repository:tag (e.g., myuser/my-app:1.0.0). The full path is docker.io/username/repository:tag.'
          }
        ]
      },
      {
        id: 'docker-lifecycle',
        title: 'Container Lifecycle',
        difficulty: 'beginner',
        tags: ['docker', 'lifecycle', 'states', 'management'],
        sections: [
          {
            heading: 'Container States',
            content: 'Every Docker container passes through a well-defined set of states during its lifetime. Created means the container exists but has never been started. Running means the container process is actively executing. Paused means the container is suspended (SIGSTOP sent to all processes) but not stopped — memory is preserved. Stopped (Exited) means the container process has finished, either normally or due to an error. Restarting means the container is being restarted by Docker\'s restart policy. Removing means it is being deleted. Understanding these states is important for debugging — docker ps -a shows all states, while docker ps shows only running containers. Exit codes (0 = success, non-zero = error) help diagnose failures.',
            code: `# View all container states
docker ps -a

# CONTAINER ID  IMAGE   STATUS
# abc123        nginx   Up 2 hours        (running)
# def456        redis   Exited (0) 1 day  (stopped, clean)
# ghi789        app     Exited (1) 3 min  (stopped, error)

# Check exit code
docker inspect my-container \
  --format='{{.State.ExitCode}}'

# Container events stream
docker events --filter container=my-container`,
            note: 'A non-zero exit code means the container process encountered an error. Check docker logs for details.'
          },
          {
            heading: 'Lifecycle State Diagram',
            content: 'Containers transition between states via explicit Docker commands or automatic restart policies. The typical happy path is: pull image → create container → start (running) → stop (exited) → remove. The docker run command compresses create+start into one step. Pausing is rarely used in practice but is available for temporarily freezing containers during backups or debugging. Restart policies (no, always, unless-stopped, on-failure) control automatic transitions from exited back to running. When the Docker daemon restarts, containers with restart policy always or unless-stopped will automatically restart. Removed containers are gone permanently — ensure you have extracted any needed data first.',
            code: `\`\`\`mermaid
stateDiagram-v2
    [*] --> Created : docker create
    Created --> Running : docker start
    Running --> Paused : docker pause
    Paused --> Running : docker unpause
    Running --> Stopped : docker stop
    Stopped --> Running : docker start
    Running --> Stopped : process exits
    Stopped --> Removed : docker rm
    Removed --> [*]
    Running --> Removed : docker rm -f
\`\`\``,
            tip: 'Use restart: unless-stopped in production to survive daemon restarts, but not always which restarts even after manual docker stop.'
          },
          {
            heading: 'Restart Policies',
            content: 'Restart policies determine what Docker does when a container exits. The no policy (default) never restarts — the container stays in exited state. The on-failure policy restarts only if the container exits with a non-zero code, optionally with a maximum retry count. The always policy restarts regardless of exit code, including after Docker daemon restarts. The unless-stopped policy is like always but respects manual docker stop — it won\'t restart a container you explicitly stopped. Set restart policies with --restart flag or in docker-compose.yml. For production services, unless-stopped is typically recommended. Combine with health checks to prevent infinite restart loops on critically broken containers.',
            code: `# Set restart policy
docker run -d \
  --restart unless-stopped \
  --name my-service \
  nginx

# Other policies
docker run --restart no nginx         # default
docker run --restart always nginx     # always restart
docker run --restart on-failure:3 app # max 3 retries

# Update restart policy on existing container
docker update --restart unless-stopped my-service

# Check restart policy
docker inspect my-service \
  --format='{{.HostConfig.RestartPolicy.Name}}'`,
            analogy: 'unless-stopped is like an employee who always shows up unless you gave them the day off. always is one who shows up even if you told them not to.'
          }
        ]
      },
      {
        id: 'docker-terminology',
        title: 'Docker Terminology',
        difficulty: 'beginner',
        tags: ['docker', 'terminology', 'concepts', 'glossary'],
        sections: [
          {
            heading: 'Core Terms: Image, Container, Registry',
            content: 'Understanding Docker terminology is foundational. An image is a read-only template containing your application code, runtime, libraries, and configuration — like a blueprint or class definition. A container is a running instance of an image — like an object instantiated from a class. You can run many containers from the same image. A registry is a server that stores and distributes images; Docker Hub is the default public registry. A repository is a collection of related images (usually different versions of the same app) within a registry. A tag is a label on an image that distinguishes versions (like :1.0, :latest, :alpine). The combination registry/repository:tag uniquely identifies any image.',
            code: `# Terminology in action:
# Image (blueprint)
docker images
# REPOSITORY    TAG       IMAGE ID
# nginx         latest    abc123
# node          20-alpine def456

# Container (running instance of image)
docker run nginx  # creates container FROM image

# Registry/Repository:Tag
docker pull docker.io/library/nginx:latest
#           ^registry  ^repository ^tag`,
            analogy: 'Image : Container = Class : Object. An image is the blueprint; a container is the live, running instance created from that blueprint.'
          },
          {
            heading: 'Layers, Volumes, and Networks',
            content: 'Docker images are composed of layers — each instruction in a Dockerfile creates a new read-only layer stacked on top of the previous. Layers are cached and shared between images, saving disk space and build time. When a container runs, Docker adds a thin writable layer on top. A volume is a persistent storage mechanism managed by Docker that exists independently of containers — data survives container removal. A bind mount maps a host directory into the container. A network is a virtual network that enables containers to communicate. Docker creates three default networks: bridge (default), host (shares host network), and none (no networking).',
            code: `# Inspect image layers
docker history nginx

# Create and use a volume
docker volume create my-data
docker run -v my-data:/app/data nginx

# Bind mount (host directory)
docker run -v $(pwd)/data:/app/data nginx

# Networks
docker network ls
docker network create my-net
docker run --network my-net nginx`,
            note: 'Volumes are the preferred mechanism for persisting data. Bind mounts are great for development (hot reload), but volumes are better for production.'
          },
          {
            heading: 'Dockerfile, Compose, and Context',
            content: 'A Dockerfile is a text file with sequential instructions for building an image — each instruction (FROM, RUN, COPY, CMD) creates a layer. Docker Compose is a tool for defining and running multi-container applications using a YAML file (docker-compose.yml or compose.yml). It lets you define services, networks, and volumes declaratively and start everything with docker compose up. The build context is the directory (and its contents) sent to the Docker daemon when building an image; it determines what files are available to COPY instructions. A .dockerignore file (like .gitignore) excludes files from the context to speed up builds and prevent secrets from being included in images.',
            code: `# Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
CMD ["node", "server.js"]

# Build with context (current directory)
docker build -t my-app .

# docker-compose.yml
services:
  web:
    build: .
    ports: ["3000:3000"]
  db:
    image: postgres:16

# Start all services
docker compose up -d`,
            tip: 'Always create a .dockerignore file excluding node_modules, .git, .env, and build artifacts to keep your build context small and fast.'
          }
        ]
      }
    ]
  },
  {
    id: 'docker-images',
    title: 'Images & Dockerfile',
    icon: '📦',
    description: 'Deep dive into Docker images, layers, and writing effective Dockerfiles',
    entries: [
      {
        id: 'docker-images-basics',
        title: 'Understanding Docker Images',
        difficulty: 'beginner',
        tags: ['docker', 'images', 'layers', 'union-filesystem'],
        sections: [
          {
            heading: 'What is a Docker Image?',
            content: 'A Docker image is an immutable, read-only filesystem snapshot that contains everything needed to run an application: code, runtime, system libraries, environment variables, and default configuration. Images are built from a Dockerfile and stored in a registry. They are composed of multiple layers stacked using a union filesystem (OverlayFS on modern Linux). Each layer represents a set of filesystem changes from a Dockerfile instruction. The layered architecture enables efficient storage and transfer — if two images share a base layer (like ubuntu:22.04), that layer is stored only once on disk and downloaded only once. Images are identified by their content hash (digest), ensuring integrity.',
            code: `# Inspect image details
docker image inspect nginx:latest

# Key fields:
# Id: sha256:abc123...    (content hash)
# RepoTags: [nginx:latest]
# Layers: [sha256:...]    (layer hashes)
# Config.Env: [PATH=...]
# Config.Cmd: [nginx, -g, daemon off;]
# Config.ExposedPorts: {80/tcp: {}}

# View layer history
docker history nginx:latest`,
            note: 'An image ID (sha256 hash) is computed from its contents, so identical content always produces the same ID regardless of where it was built.'
          },
          {
            heading: 'Layer Architecture',
            content: 'Image layers are read-only and immutable. Docker uses a union filesystem to present all layers as a single coherent filesystem. When a container runs, Docker adds a thin writable layer on top called the container layer. All file modifications happen in this writable layer — original image layers are never modified. If you delete a file from a lower layer, Docker adds a "whiteout" record in the writable layer to hide it. This copy-on-write semantics means starting hundreds of containers from the same image is extremely efficient — they all share the read-only layers and only the writable layer is unique per container. Layers are cached locally for reuse.',
            code: `# See layers that make up an image
docker history --no-trunc nginx

# IMAGE          CREATED    CREATED BY             SIZE
# sha256:abc...  3 days     CMD ["nginx"...]       0B
# sha256:def...  3 days     COPY config ...        1.2kB
# sha256:ghi...  3 days     RUN apt-get install    27MB
# sha256:jkl...  3 days     FROM debian:bookworm   74MB

# Each line = one layer
# SIZE = data added by that layer`,
            tip: 'Minimize the number of layers by chaining related RUN commands with &&. Fewer, smaller layers mean faster pulls and smaller images.'
          },
          {
            heading: 'Image Naming and Digests',
            content: 'Images have two identifiers: tags (mutable, human-readable) and digests (immutable, content-addressed). Tags like nginx:1.25 are convenient references, but the maintainer can push a new image under the same tag, changing what latest or 1.25 points to. Digests (sha256:...) are cryptographic hashes of the image manifest — they never change. For reproducible production deployments, pin images by digest: FROM nginx@sha256:abc123. The docker image ls --digests flag shows digests. Multi-platform images use a manifest list (fat manifest) that maps platform architectures to specific image digests, enabling the same tag to work on amd64, arm64, and other platforms transparently.',
            code: `# Show digests
docker images --digests nginx

# REPOSITORY  TAG     DIGEST            IMAGE ID
# nginx       latest  sha256:abc123...  def456

# Pull by digest (fully reproducible)
docker pull nginx@sha256:abc123...

# In Dockerfile (production pinning)
FROM nginx@sha256:abc123...

# Inspect manifest (multi-platform)
docker manifest inspect node:20-alpine`,
            analogy: 'Tags are like street addresses (can change as buildings are renumbered); digests are GPS coordinates (always point to the exact same spot).'
          }
        ],
        quiz: [
          {
            question: 'What happens to image layers when a container writes a file?',
            options: ['The image layer is modified in place', 'A new image is created automatically', 'The write happens in the container\'s writable layer (copy-on-write)', 'The write fails because layers are immutable'],
            answer: 2,
            explanation: 'Docker uses copy-on-write semantics. Writes happen in the container\'s thin writable layer on top of read-only image layers. Image layers are never modified.'
          },
          {
            question: 'Why are image digests preferred over tags for production deployments?',
            options: ['Digests download faster', 'Digests are shorter and easier to type', 'Digests are immutable content hashes — the same digest always refers to the exact same image', 'Digests work on more platforms'],
            answer: 2,
            explanation: 'Tags are mutable (latest can change), but digests (sha256 hashes) are immutable. Pinning by digest guarantees you always run the exact same image.'
          },
          {
            question: 'What is the benefit of sharing base layers between images?',
            options: ['Images run faster at runtime', 'Layers are stored and downloaded only once, saving disk space and network bandwidth', 'Containers start faster', 'It enables multi-platform support'],
            answer: 1,
            explanation: 'If multiple images share a base layer (e.g., ubuntu:22.04), Docker stores it only once on disk and downloads it only once. This makes pulling related images much faster.'
          }
        ]
      },
      {
        id: 'docker-pull-push',
        title: 'Pulling & Pushing Images',
        difficulty: 'beginner',
        tags: ['docker', 'registry', 'pull', 'push'],
        sections: [
          {
            heading: 'Pulling Images',
            content: 'docker pull downloads an image from a registry to your local cache. By default it pulls from Docker Hub, but you can specify any registry. Pull by tag to get a named version, or by digest for a reproducible exact version. Docker downloads only the layers you don\'t already have locally, making subsequent pulls of related images fast. The docker pull command shows progress for each layer being downloaded. Once pulled, the image is cached and docker run uses the cached version. Use docker pull explicitly when you want to update to the latest version of a mutable tag before running — docker run only pulls if the image is not present locally.',
            code: `# Pull from Docker Hub (default)
docker pull nginx:1.25
docker pull postgres:16-alpine

# Pull from other registries
docker pull gcr.io/google-containers/pause:3.9
docker pull ghcr.io/owner/repo:tag
docker pull myregistry.example.com/app:1.0

# Pull by digest
docker pull nginx@sha256:abc123...

# Pull all tags for a repository
docker pull --all-tags nginx

# Force re-pull (update mutable tag)
docker pull nginx:latest`,
            note: 'docker run does not re-pull if the image exists locally. Run docker pull explicitly to update a mutable tag like latest.'
          },
          {
            heading: 'Tagging and Pushing',
            content: 'Before pushing, tag your image with the full registry path. docker tag creates a new reference (alias) to an existing image — it doesn\'t copy data, just creates a new name pointing to the same image layers. You can tag the same image multiple times. Authenticate with docker login before pushing. docker push uploads only the layers the registry doesn\'t already have, making pushes to the same registry fast for related images. Push all relevant tags (version + latest) to ensure users pulling latest get your newest image. For private registries, configure the registry URL in your docker login command. Automate this process in CI/CD pipelines.',
            code: `# Tag image for Docker Hub
docker tag my-app:latest myuser/my-app:2.0.0
docker tag my-app:latest myuser/my-app:latest

# Tag for private registry
docker tag my-app:latest registry.example.com/team/my-app:2.0.0

# Login (Docker Hub)
docker login

# Login (private registry)
docker login registry.example.com

# Push
docker push myuser/my-app:2.0.0
docker push myuser/my-app:latest

# Logout
docker logout`,
            tip: 'Use docker login with --password-stdin to avoid your password appearing in shell history: echo $PASS | docker login -u user --password-stdin'
          },
          {
            heading: 'Saving and Loading Images',
            content: 'Sometimes you need to transfer images without a registry — to an air-gapped server, for archiving, or for quick team sharing. docker save exports one or more images to a tar archive including all layers and metadata. docker load imports a tar archive back into the local Docker cache. docker export saves a container\'s filesystem (not an image with history) to a tar file, and docker import creates a new image from that archive. save/load preserves full image metadata and history; export/import flattens to a single layer losing the build history. These commands are useful for offline environments, transferring images across incompatible registries, or creating portable snapshots.',
            code: `# Save image(s) to tar archive
docker save nginx:latest -o nginx.tar
docker save nginx:latest postgres:16 | gzip > images.tar.gz

# Load from tar archive
docker load -i nginx.tar
docker load < images.tar.gz

# Transfer to remote server
docker save my-app:1.0 | ssh user@server docker load

# Export container filesystem (no history)
docker export my-container -o container.tar
docker import container.tar my-app:imported`,
            note: 'Use save/load for images (preserves layers and history). Use export/import for containers (flattens to single layer). They are not interchangeable.'
          }
        ]
      },
      {
        id: 'docker-dockerfile-intro',
        title: 'Dockerfile Introduction',
        difficulty: 'beginner',
        tags: ['docker', 'dockerfile', 'build', 'instructions'],
        sections: [
          {
            heading: 'What is a Dockerfile?',
            content: 'A Dockerfile is a plain-text script containing sequential instructions that Docker reads to build an image. Each instruction creates a new read-only layer in the image. Dockerfiles are deterministic: given the same Dockerfile and build context, you should always get the same image. The file is typically named Dockerfile (no extension) and placed in the root of your project. You build an image from it with docker build -t name:tag .. The dot at the end specifies the build context — the directory whose contents are available to COPY instructions. Dockerfiles are the standard way to define exactly what goes into your image, replacing manual server configuration with code.',
            code: `# Minimal Dockerfile example
FROM node:20-alpine         # base image
WORKDIR /app                # set working directory
COPY package*.json ./       # copy dependency files
RUN npm ci                  # install dependencies
COPY . .                    # copy application code
EXPOSE 3000                 # document port
CMD ["node", "server.js"]   # default command

# Build the image
docker build -t my-node-app:1.0 .

# Run it
docker run -p 3000:3000 my-node-app:1.0`,
            tip: 'Name your file exactly Dockerfile (capital D, no extension) for docker build to find it automatically. Use -f flag to specify a different filename.'
          },
          {
            heading: 'Instruction Overview',
            content: 'Dockerfiles have a concise set of instructions, each serving a specific purpose. FROM sets the base image — every Dockerfile starts with this. RUN executes shell commands during build (installing packages, compiling code). COPY transfers files from the build context into the image. ADD is like COPY with extra powers (URL support, auto-extraction of tarballs). WORKDIR sets the working directory for subsequent instructions. ENV sets environment variables. ARG defines build-time variables. EXPOSE documents ports the container listens on. VOLUME declares mount points. USER switches the running user. CMD provides the default command. ENTRYPOINT configures the container to run as an executable. LABEL adds metadata.',
            code: `FROM ubuntu:22.04           # base image
ARG VERSION=1.0             # build-time variable
ENV APP_VERSION=$VERSION    # runtime env var
LABEL maintainer="team@example.com"

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

RUN useradd -m appuser
USER appuser

EXPOSE 8080
VOLUME ["/app/data"]

ENTRYPOINT ["python"]
CMD ["app.py"]`,
            note: 'EXPOSE is documentation only — it does not actually publish ports. You still need -p or -P at runtime to make ports accessible.'
          },
          {
            heading: 'Build Process and Context',
            content: 'When you run docker build, Docker packages the build context directory into a tarball and sends it to the daemon. This is why large build contexts slow down builds — even if you don\'t COPY everything, it all gets sent. Create a .dockerignore file to exclude unnecessary files (node_modules, .git, *.log, .env). The daemon reads the Dockerfile and executes each instruction sequentially, creating an intermediate layer after each step. Failed builds show which instruction failed and its output. Use --no-cache to force a fresh build without using cached layers. The --progress=plain flag shows verbose output useful for debugging slow build steps.',
            code: `# .dockerignore file
node_modules
.git
.env
*.log
dist
.DS_Store
coverage

# Build commands
docker build -t my-app .             # standard build
docker build -t my-app -f Dockerfile.prod . # custom file
docker build --no-cache -t my-app .  # skip cache
docker build --progress=plain .      # verbose output
docker build --build-arg VERSION=2.0 . # pass ARG

# Multi-platform build
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  -t my-app:latest --push .`,
            tip: 'A lean .dockerignore is as important as a lean Dockerfile. node_modules alone can be hundreds of MB that would slow every build context upload.'
          }
        ],
        quiz: [
          {
            question: 'What is the build context in docker build -t my-app .?',
            options: ['The Dockerfile only', 'The current directory and its contents (sent to the Docker daemon)', 'The Docker daemon\'s working directory', 'The base image specified in FROM'],
            answer: 1,
            explanation: 'The dot (.) specifies the build context — the directory whose contents are packaged and sent to the Docker daemon, making files available to COPY instructions.'
          },
          {
            question: 'What does the EXPOSE instruction actually do?',
            options: ['Publishes the port to the host immediately', 'Opens a firewall rule for the port', 'Documents which ports the container listens on (does not publish them)', 'Creates a network binding for the port'],
            answer: 2,
            explanation: 'EXPOSE is documentation only. It tells other developers and tools which ports the container uses, but does NOT publish ports. You must use -p at runtime to publish.'
          }
        ]
      },
      {
        id: 'docker-from',
        title: 'FROM Instruction',
        difficulty: 'beginner',
        tags: ['docker', 'dockerfile', 'FROM', 'base-image'],
        sections: [
          {
            heading: 'FROM Basics',
            content: 'FROM is the first instruction in every Dockerfile (except ARG) and sets the base image for subsequent instructions. It initializes a new build stage and provides the starting filesystem. The format is FROM image:tag or FROM image@digest. If the tag is omitted, Docker defaults to latest. Choose base images carefully — they determine your image\'s size, security surface, and available tools. Scratch is a special minimal image with nothing in it, used for building completely static binaries. Official language images (node, python, golang) come in full, slim, and alpine variants. Prefer versioned tags over latest for reproducible builds. FROM can appear multiple times in a Dockerfile for multi-stage builds.',
            code: `# Basic FROM
FROM ubuntu:22.04

# Pinned version (recommended for production)
FROM node:20.11.0-alpine3.19

# Pin by digest (maximum reproducibility)
FROM node:20-alpine@sha256:abc123...

# Scratch for static binaries
FROM scratch
COPY my-static-binary /
CMD ["/my-static-binary"]

# Use ARG before FROM (for dynamic base image)
ARG BASE_IMAGE=node:20-alpine
FROM $BASE_IMAGE`,
            tip: 'For production, pin your base image to a specific version (20.11.0-alpine3.19) not just a major version (20-alpine) to ensure builds are reproducible.'
          },
          {
            heading: 'Choosing the Right Base Image',
            content: 'The base image choice significantly impacts image size, security, and compatibility. Full images (node:20) include many development tools and are largest. Slim images (node:20-slim) remove non-essential packages, reducing size by ~70%. Alpine images (node:20-alpine) use Alpine Linux with musl libc instead of glibc — very small (~5MB base) but can cause compatibility issues with some packages compiled against glibc. Distroless images (gcr.io/distroless/nodejs20) contain only runtime libraries and your app — no shell, no package manager, minimal attack surface. For Go and Rust, compile to a static binary and use scratch. Match the base image to your production OS when possible.',
            code: `# Full Debian-based (~1GB)
FROM node:20

# Slim Debian (~230MB)
FROM node:20-slim

# Alpine Linux (~60MB)
FROM node:20-alpine

# Google Distroless (~110MB, no shell)
FROM gcr.io/distroless/nodejs20-debian12

# For Go static binary
FROM golang:1.22 AS builder
RUN CGO_ENABLED=0 go build -o app .
FROM scratch
COPY --from=builder /app /app
ENTRYPOINT ["/app"]`,
            note: 'Alpine\'s musl libc can cause subtle issues with Python native extensions, gRPC, and some databases. Test thoroughly before committing to Alpine.'
          },
          {
            heading: 'Multi-Stage FROM',
            content: 'Dockerfiles can have multiple FROM instructions, each starting a new build stage. This enables powerful multi-stage builds where you use a fat build environment (with compilers, dev dependencies) in early stages and copy only the artifacts into a lean final image. Name stages with AS for clarity. The COPY --from=stagename instruction copies files between stages. Only the final stage becomes the resulting image — all intermediate stages are discarded. This is the primary technique for keeping production images small while maintaining a rich build environment. Common patterns: build in golang/node/python then copy binary/dist to alpine or distroless; run tests in one stage, build in another.',
            code: `# Multi-stage: build then runtime
FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runtime
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
CMD ["node", "dist/server.js"]

# Build result is the runtime stage only
# builder stage is discarded`,
            analogy: 'Multi-stage builds are like using a full workshop to build furniture, then displaying only the finished piece — you don\'t ship the tools to the customer.'
          }
        ]
      },
      {
        id: 'docker-run-cmd-entrypoint',
        title: 'RUN, CMD & ENTRYPOINT',
        difficulty: 'beginner',
        tags: ['docker', 'dockerfile', 'RUN', 'CMD', 'ENTRYPOINT'],
        sections: [
          {
            heading: 'RUN Instruction',
            content: 'RUN executes commands in a new layer during the image build process. It has two forms: shell form (RUN command) runs via /bin/sh -c, and exec form (RUN ["executable", "arg1"]) runs directly without a shell. Use RUN to install packages, compile code, create directories, set permissions, and any other setup tasks. Chain multiple commands with && to keep them in a single layer, reducing image size. Clean up package manager caches in the same RUN command to avoid caching them in the layer. Changes made by RUN are permanently baked into the image layer. Unlike CMD and ENTRYPOINT, RUN instructions run at build time, not container start time.',
            code: `# Shell form (runs via /bin/sh -c)
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        curl \
        git && \
    rm -rf /var/lib/apt/lists/*

# Exec form (no shell, no variable expansion)
RUN ["apt-get", "install", "-y", "curl"]

# Python example
RUN pip install --no-cache-dir -r requirements.txt

# Create user in same layer as package install
RUN groupadd -r appuser && \
    useradd -r -g appuser appuser`,
            tip: 'Always clean up package manager caches (rm -rf /var/lib/apt/lists/*) in the same RUN command as the install — separate RUN layers cannot reduce the size of a previous layer.'
          },
          {
            heading: 'CMD vs ENTRYPOINT',
            content: 'CMD and ENTRYPOINT both define what runs when a container starts, but behave differently. CMD sets the default command that can be overridden at docker run. ENTRYPOINT sets the fixed executable — arguments passed to docker run are appended to it rather than replacing it. When used together, ENTRYPOINT is the executable and CMD provides default arguments. Both support shell form and exec form — prefer exec form (JSON array) to avoid shell signal handling issues. Shell form wraps the command in /bin/sh -c, meaning signals like SIGTERM go to sh, not your process, causing graceful shutdown problems. Exec form ensures your process is PID 1 and receives signals directly.',
            code: `# CMD only — fully overridable
CMD ["node", "server.js"]
# docker run my-app           → node server.js
# docker run my-app bash      → bash (overrides CMD)

# ENTRYPOINT only
ENTRYPOINT ["node"]
# docker run my-app server.js → node server.js
# docker run my-app --version → node --version

# ENTRYPOINT + CMD (recommended pattern)
ENTRYPOINT ["node"]
CMD ["server.js"]
# docker run my-app           → node server.js
# docker run my-app debug.js  → node debug.js`,
            note: 'Always use exec form (JSON array syntax) for CMD and ENTRYPOINT. Shell form wraps in /bin/sh -c which breaks signal handling and graceful shutdown.'
          },
          {
            heading: 'Shell vs Exec Form',
            content: 'Both RUN, CMD, and ENTRYPOINT support two syntax forms. Shell form (RUN command) runs the command through the shell, enabling variable expansion ($VAR), pipes (|), and other shell features. The process runs as a child of /bin/sh. Exec form (RUN ["cmd", "arg"]) bypasses the shell entirely, running the executable directly. This means no shell features but correct signal handling — your process becomes PID 1 and receives SIGTERM from docker stop directly. For CMD and ENTRYPOINT, always prefer exec form in production. For RUN, use shell form when you need shell features (pipes, &&, variable expansion), exec form otherwise. Mixed usage causes confusing interaction between ENTRYPOINT and CMD.',
            code: `# Signal handling comparison:

# WRONG: Shell form - /bin/sh gets SIGTERM, not node
CMD node server.js
# Process tree: sh → node (node never gets SIGTERM)

# CORRECT: Exec form - node gets SIGTERM directly
CMD ["node", "server.js"]
# Process tree: node (PID 1, receives SIGTERM)

# Shell form useful for variable expansion in RUN
RUN echo "Building version $VERSION"

# Test signal handling
docker run --init my-app  # tini as PID 1 (alternative)`,
            warning: 'Shell form CMD/ENTRYPOINT causes broken graceful shutdown. Your app never receives SIGTERM from docker stop and gets forcefully killed after the grace period.'
          }
        ],
        quiz: [
          {
            question: 'What is the main problem with shell form CMD (e.g., CMD node server.js)?',
            options: ['It is slower to start', 'It cannot use environment variables', 'The shell becomes PID 1 and your app does not receive SIGTERM signals', 'It does not support arguments'],
            answer: 2,
            explanation: 'Shell form wraps the command in /bin/sh -c. The shell becomes PID 1 and receives SIGTERM, but typically does not forward it to child processes, causing graceful shutdown to fail.'
          },
          {
            question: 'When both ENTRYPOINT and CMD are set, what happens when you pass arguments to docker run?',
            options: ['CMD overrides ENTRYPOINT', 'Arguments replace CMD but ENTRYPOINT stays fixed', 'Arguments are ignored', 'ENTRYPOINT is overridden'],
            answer: 1,
            explanation: 'ENTRYPOINT is the fixed executable. CMD provides default arguments. Arguments to docker run replace CMD but are appended to ENTRYPOINT, giving you a flexible executable with overridable defaults.'
          },
          {
            question: 'Why should you chain package install and cleanup in a single RUN command?',
            options: ['It is faster to execute', 'It reduces the number of environment variables', 'Cleanup in a separate RUN layer cannot reduce the size of the install layer', 'Docker requires it'],
            answer: 2,
            explanation: 'Each RUN creates an immutable layer. If you install packages in layer N and delete cache files in layer N+1, the layer N data still exists in the image. Only cleaning up in the same RUN instruction prevents the cache from being stored in the layer.'
          }
        ]
      },
      {
        id: 'docker-copy-add',
        title: 'COPY & ADD',
        difficulty: 'beginner',
        tags: ['docker', 'dockerfile', 'COPY', 'ADD', 'files'],
        sections: [
          {
            heading: 'COPY Instruction',
            content: 'COPY transfers files and directories from the build context into the image filesystem. Its syntax is COPY <src> <dest> where src is relative to the build context and dest is an absolute path (or relative to WORKDIR) in the image. COPY respects .dockerignore, so excluded files are never copied. Copy dependency files (package.json, requirements.txt) separately before copying source code to maximize layer caching — if dependencies don\'t change, the npm install or pip install layer stays cached even when source changes. The --chown flag sets ownership in the same layer as the copy, avoiding a separate RUN chown command that would double the layer size for large directories.',
            code: `# Basic COPY
COPY package.json ./
COPY src/ ./src/
COPY . .

# Copy with ownership (avoids extra RUN chown)
COPY --chown=appuser:appuser . .

# Pattern: copy deps first for cache optimization
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./        # only changes when deps change
RUN npm ci                   # cached unless package.json changes
COPY . .                     # invalidates only when source changes
CMD ["node", "server.js"]`,
            tip: 'The order of COPY instructions matters for caching. Copy files that change less frequently first to maximize cache hits during development.'
          },
          {
            heading: 'ADD vs COPY',
            content: 'ADD does everything COPY does plus two extra features: it can download files from URLs, and it automatically extracts tar archives (tar, gzip, bzip2, xz) into the destination directory. Despite these powers, Docker best practices recommend using COPY for most cases and ADD only when you specifically need auto-extraction. URL fetching with ADD is discouraged because it bypasses layer caching (the URL contents might change) and doesn\'t clean up properly. For URLs, use RUN curl or wget instead, which lets you clean up in the same layer. Auto-extraction is the one legitimate use case for ADD — copying a local tar archive and having it extracted automatically into the destination.',
            code: `# COPY (preferred for simple file copies)
COPY app.tar.gz /tmp/

# ADD auto-extracts local tar archives
ADD app.tar.gz /app/     # extracts directly!

# DON'T: ADD from URL (bypasses cache, leaves artifacts)
ADD https://example.com/file.tar.gz /tmp/

# DO: Use curl for URLs (clean up in same layer)
RUN curl -sSL https://example.com/file.tar.gz \
    | tar xz -C /app && \
    rm -f /tmp/*.tar.gz`,
            note: 'Prefer COPY over ADD unless you need tar auto-extraction. ADD from URLs is an anti-pattern — use RUN curl/wget so you can clean up in the same layer.'
          },
          {
            heading: 'COPY in Multi-Stage Builds',
            content: 'COPY --from is the instruction that makes multi-stage builds powerful. It copies files from a named build stage or an external image into the current stage. The source stage is discarded after building — only copied artifacts appear in the final image. This lets you compile in a full SDK environment and ship only the binary. You can also copy from arbitrary external images using COPY --from=nginx:latest /etc/nginx /etc/nginx, useful for grabbing configuration files or binaries from official images. Multiple COPY --from instructions can pull from different stages, enabling complex assembly pipelines where different stages produce different artifacts combined into one final image.',
            code: `# Multi-stage: compile then copy binary
FROM golang:1.22 AS builder
WORKDIR /src
COPY . .
RUN CGO_ENABLED=0 go build -o /app ./cmd/server

FROM alpine:3.19 AS final
RUN adduser -D -u 1000 appuser
COPY --from=builder /app /usr/local/bin/app
USER appuser
ENTRYPOINT ["app"]

# Copy from external image
FROM alpine:3.19
COPY --from=nginx:1.25 /etc/nginx/nginx.conf /etc/nginx/nginx.conf`,
            analogy: 'COPY --from is like asking a specialist to complete one part of your product, then taking only the finished component — not their entire workshop.'
          }
        ]
      },
      {
        id: 'docker-env-arg',
        title: 'ENV & ARG',
        difficulty: 'beginner',
        tags: ['docker', 'dockerfile', 'ENV', 'ARG', 'variables'],
        sections: [
          {
            heading: 'ENV Instruction',
            content: 'ENV sets environment variables that persist in the image and are available to all subsequent instructions and running containers. Containers inherit all ENV variables unless overridden at runtime with docker run -e. ENV variables are visible in docker inspect and can be overridden by the docker run -e flag or docker-compose environment section. Use ENV for runtime configuration: database URLs, API endpoints, feature flags, application settings. Avoid storing secrets (passwords, API keys) in ENV in your Dockerfile — they get baked into the image and are visible to anyone with image access. Use runtime secrets injection, Docker secrets, or environment injection from your orchestrator instead.',
            code: `# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV LOG_LEVEL=info

# Multiple vars in one instruction (Docker 1.0+)
ENV NODE_ENV=production \
    PORT=3000 \
    LOG_LEVEL=info

# Use in subsequent instructions
RUN echo "Building for $NODE_ENV"

# Override at runtime
docker run -e NODE_ENV=development my-app
docker run -e PORT=8080 my-app

# Set from file at runtime
docker run --env-file .env my-app`,
            warning: 'Never store passwords or API keys in ENV in your Dockerfile. They are baked into the image layers and visible to anyone who can pull the image.'
          },
          {
            heading: 'ARG Instruction',
            content: 'ARG defines build-time variables that can be passed to docker build with --build-arg. Unlike ENV, ARG values are not available in the running container — they exist only during the build process. ARG can be used before FROM to parameterize the base image version. After FROM, ARG variables are available to subsequent build instructions. If an ARG has the same name as an ENV, the ENV value takes precedence. ARG values are still stored in the image history (docker history), so they should not be used for secrets either — use BuildKit secret mounts for that. Common uses: version numbers, registry URLs, build timestamps, feature flags that affect build output.',
            code: `# ARG before FROM (parameterize base image)
ARG NODE_VERSION=20-alpine
FROM node:$NODE_VERSION

# ARG after FROM
ARG APP_VERSION=dev
ARG BUILD_DATE

# Use in RUN instructions
RUN echo "Building version $APP_VERSION on $BUILD_DATE"

# Set default, override at build time
ARG PORT=3000
ENV PORT=$PORT  # promote ARG to ENV for runtime

# Build with custom args
docker build \
  --build-arg NODE_VERSION=18-alpine \
  --build-arg APP_VERSION=2.0.0 \
  -t my-app .`,
            note: 'ARG values appear in docker history. For actual secrets during build (npm tokens, SSH keys), use Docker BuildKit --secret mounts which never persist in layers.'
          },
          {
            heading: 'ARG vs ENV Comparison',
            content: 'Understanding when to use ARG vs ENV is important. ARG is build-time only: available during docker build, gone in the running container. ENV is build and runtime: set during build, available to every container run from the image. Promote an ARG to ENV (ENV VAR=$ARG) when you need a value at both build and runtime. Use ARG for: version numbers used in download URLs, conditional build logic, registry addresses, build metadata. Use ENV for: application configuration, runtime behavior, connection strings, port numbers. Neither should be used for secrets — use runtime secret injection via orchestrators, vault agents, or Docker BuildKit secret mounts.',
            code: `# Pattern: ARG for build, ENV for runtime
ARG APP_VERSION=1.0.0

# Bake version into image metadata
LABEL version=$APP_VERSION

# Promote to ENV if needed at runtime
ENV APP_VERSION=$APP_VERSION

# ARG used in build, not at runtime
ARG NPMRC_TOKEN
RUN echo "//registry.npmjs.org/:_authToken=$NPMRC_TOKEN" > .npmrc && \
    npm ci && \
    rm -f .npmrc  # remove token file after install

# Summary:
# ARG: build-time, --build-arg flag, not in container
# ENV: runtime, docker run -e flag, in container`,
            tip: 'Use ARG for anything that affects the build process but should not be in the final container. Use ENV for anything your application needs at runtime.'
          }
        ]
      },
      {
        id: 'docker-expose-ports',
        title: 'EXPOSE & Port Mapping',
        difficulty: 'beginner',
        tags: ['docker', 'dockerfile', 'EXPOSE', 'ports', 'networking'],
        sections: [
          {
            heading: 'EXPOSE Instruction',
            content: 'EXPOSE documents which network ports the container listens on at runtime. It is metadata only — it does not actually publish or open any ports. Think of it as a contract between the Dockerfile author and the person running the container. EXPOSE helps docker run -P (capital P) to automatically publish all exposed ports to random host ports. It makes docker inspect and docker ps output more informative. By convention, expose the standard port for your service (80 for HTTP, 443 for HTTPS, 3000 for Node, 8080 for APIs, 5432 for PostgreSQL). Specify the protocol with /tcp or /udp suffix; TCP is assumed if omitted. You must still use -p or -P at runtime to actually make ports accessible from outside the container.',
            code: `# In Dockerfile
EXPOSE 80           # HTTP (TCP assumed)
EXPOSE 443          # HTTPS
EXPOSE 3000/tcp     # explicit TCP
EXPOSE 53/udp       # UDP (DNS)
EXPOSE 8080 8443    # multiple ports

# At runtime: -p for specific mapping
docker run -p 8080:80 nginx
#            ^host  ^container

# At runtime: -P for all EXPOSE'd ports (random host)
docker run -P nginx
docker ps  # shows random port assignments

# Check which ports are exposed
docker inspect nginx | grep -A5 ExposedPorts`,
            note: 'EXPOSE without -p or -P at runtime means the port is only accessible from within the Docker network, not from your host machine or external traffic.'
          },
          {
            heading: 'Port Mapping with -p',
            content: 'The -p flag at docker run time actually binds ports between host and container. The format is -p [host-ip:]host-port:container-port. Without a host IP, Docker binds to 0.0.0.0 (all interfaces). To bind to localhost only (more secure), use -p 127.0.0.1:8080:80. Map multiple ports with multiple -p flags. You can map to a different host port (e.g., -p 8080:80 serves the container\'s port 80 on your host\'s port 8080). Port ranges are supported with hyphen notation. For Docker Compose, use the ports key in your service definition with the same host:container format. Port mapping is handled by Docker\'s iptables rules on Linux.',
            code: `# Specific port mapping
docker run -p 8080:80 nginx      # host:container
docker run -p 3000:3000 node-app

# Bind to localhost only (secure)
docker run -p 127.0.0.1:8080:80 nginx

# Multiple ports
docker run -p 80:80 -p 443:443 nginx

# Port range
docker run -p 8000-8010:8000-8010 app

# Random host port (-P uses EXPOSE'd ports)
docker run -P nginx
docker port my-container  # see mappings

# In docker-compose.yml
ports:
  - "8080:80"
  - "127.0.0.1:3306:3306"`,
            tip: 'Bind sensitive services (databases, admin interfaces) to 127.0.0.1 instead of 0.0.0.0 to prevent accidental exposure on public network interfaces.'
          },
          {
            heading: 'Container Networking Basics',
            content: 'Docker containers connect to networks to communicate. The default bridge network lets containers on the same host communicate via IP address. User-defined bridge networks (recommended) additionally provide automatic DNS resolution by container name — containers can refer to each other by service name. The host network removes network isolation — the container shares the host\'s network stack directly, giving maximum performance but no isolation. The none network disables networking entirely. In Docker Compose, each compose project gets its own default bridge network, and all services can reach each other by service name. Overlay networks enable communication across multiple Docker hosts in Swarm mode.',
            code: `# Create custom network
docker network create my-app-net

# Run containers on same network
docker run -d --network my-app-net --name db postgres:16
docker run -d --network my-app-net --name api my-api

# Containers can use DNS names
# api container can reach db by hostname "db"

# Host network (no isolation)
docker run --network host nginx

# Inspect network
docker network inspect my-app-net

# docker-compose auto-creates network
services:
  api:
    image: my-api
  db:
    image: postgres  # api can reach at hostname "db"`,
            analogy: 'User-defined networks are like a private office intranet — everyone inside can find each other by name, but outsiders cannot access it directly.'
          }
        ],
        quiz: [
          {
            question: 'What does EXPOSE 8080 in a Dockerfile actually do?',
            options: ['Opens port 8080 on the host firewall', 'Publishes port 8080 to all host interfaces', 'Documents that the container listens on port 8080 (metadata only)', 'Binds the container to host port 8080'],
            answer: 2,
            explanation: 'EXPOSE is documentation metadata only. It tells users which ports the container uses but does not publish or open any ports. You must use -p or -P at docker run time to actually publish ports.'
          },
          {
            question: 'In docker run -p 127.0.0.1:8080:80, what is the purpose of 127.0.0.1?',
            options: ['It is the container\'s IP address', 'It binds the port only to localhost, preventing external access', 'It specifies the Docker network subnet', 'It is required when host and container ports differ'],
            answer: 1,
            explanation: 'Binding to 127.0.0.1 limits access to the local machine only. Without it, Docker binds to 0.0.0.0 (all interfaces), making the port accessible from the network — a security risk for databases and admin services.'
          },
          {
            question: 'What is the key advantage of user-defined bridge networks over the default bridge network?',
            options: ['Better performance', 'Containers can communicate across different Docker hosts', 'Automatic DNS resolution — containers can reach each other by name', 'Support for more containers'],
            answer: 2,
            explanation: 'User-defined bridge networks provide automatic DNS resolution so containers can reach each other by container/service name. The default bridge network requires IP addresses for inter-container communication.'
          }
        ]
      },
      {
        id: 'docker-multi-stage',
        title: 'Multi-Stage Builds',
        difficulty: 'intermediate',
        tags: ['docker', 'dockerfile', 'multi-stage', 'optimization'],
        sections: [
          {
            heading: 'Why Multi-Stage Builds?',
            content: 'Multi-stage builds solve the classic Docker dilemma: build environments need compilers, dev tools, and large SDKs, but production images should be minimal for security and efficiency. Before multi-stage builds, teams used separate Dockerfiles (one for dev, one for prod) or complex shell scripts to build outside Docker and copy artifacts in. Multi-stage builds integrate this into a single Dockerfile. Each FROM instruction starts a new stage. COPY --from transfers artifacts between stages. Only the final stage produces the output image — all intermediate stages are discarded. This yields production images that can be 10-100x smaller than naive single-stage builds while keeping the build process clean and reproducible.',
            code: `# Without multi-stage (bad - 1GB+ image)
FROM node:20
WORKDIR /app
COPY . .
RUN npm ci && npm run build
CMD ["node", "dist/server.js"]
# Ships with: compiler, dev deps, source, tests, etc.

# With multi-stage (good - ~100MB image)
FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS production
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
CMD ["node", "dist/server.js"]
# Ships with: only runtime + dist files`,
            tip: 'Multi-stage builds are the single most impactful optimization for reducing production image size. Always use them for compiled languages and JS/TS apps.'
          },
          {
            heading: 'Multi-Stage Build Diagram',
            content: 'Understanding the flow through build stages clarifies why the final image is lean. Each stage has access to its own filesystem and the build context. Stages can copy from each other but do not share running state. You can have as many stages as needed — testing stages, linting stages, documentation stages. Target a specific stage with docker build --target stagename to build only up to that stage, useful for CI where you want the test stage output without building the final production stage. Named stages (AS name) make COPY --from references clear and maintainable. Unnamed stages are referenced by index (0, 1, 2...) but named stages are strongly recommended.',
            code: `\`\`\`mermaid
graph TD
    Context["Build Context"] --> S1
    S1["Stage 1: deps\\nFROM node:20 AS deps\\nRUN npm ci"] --> S2
    S1 --> S3
    S2["Stage 2: test\\nFROM deps AS test\\nRUN npm test"]
    S3["Stage 3: build\\nFROM deps AS builder\\nRUN npm run build"]
    S3 --> S4
    S4["Stage 4: production\\nFROM alpine AS final\\nCOPY --from=builder /dist"]
    S4 --> Image["Final Image\\n(only final stage)"]
    S1 -. discarded .-> Trash["Discarded"]
    S2 -. discarded .-> Trash
    S3 -. discarded .-> Trash
\`\`\``,
            note: 'Use docker build --target test to stop at the test stage in CI. This validates your code without building the (slower) production stage if tests fail.'
          },
          {
            heading: 'Advanced Multi-Stage Patterns',
            content: 'Several patterns maximize multi-stage build effectiveness. The dependency caching pattern separates dependency installation from source compilation so that recompiling source does not invalidate the dep layer. The parallel stages pattern uses multiple independent build stages that can run in parallel with BuildKit. The test-gate pattern runs tests in a stage and only proceeds to production stage if tests pass. For Go, compile with CGO_ENABLED=0 to get a fully static binary that runs in scratch. For Java, use a JDK build stage and JRE runtime stage. The --build-arg and ARG combination enables building different variants (debug/release, different feature sets) from the same Dockerfile by parameterizing stage behavior.',
            code: `# Go: static binary in scratch
FROM golang:1.22 AS builder
WORKDIR /src
COPY go.* ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build \
    -ldflags="-w -s" -o /app ./cmd/server

FROM scratch
COPY --from=builder /app /app
COPY --from=builder /etc/ssl/certs/ca-certificates.crt \
    /etc/ssl/certs/
ENTRYPOINT ["/app"]
# Final image: ~5-15MB (binary only!)

# Build only test stage
docker build --target test .`,
            analogy: 'Multi-stage builds are an assembly line: raw materials go through fabrication, then quality control, then packaging. Only the packaged product ships — not the factory machinery.'
          }
        ],
        challenge: {
          prompt: 'Write a multi-stage Dockerfile for a Python FastAPI application. Stage 1 (builder): use python:3.12 as base, install dependencies from requirements.txt. Stage 2 (production): use python:3.12-slim, copy only the installed packages and app code from the builder, run as a non-root user, and expose port 8000.',
          starterCode: `# Stage 1: builder
FROM _____ AS builder
WORKDIR /install
COPY requirements.txt .
RUN pip install --prefix=/install --no-cache-dir -r requirements.txt

# Stage 2: production
FROM _____ AS production
WORKDIR /app

# Copy installed packages from builder
COPY --from=builder _____ /usr/local

# Copy application code
COPY . .

# Create and use non-root user
RUN useradd -m -u 1000 appuser
USER _____

EXPOSE _____
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]`,
          solution: `# Stage 1: builder
FROM python:3.12 AS builder
WORKDIR /install
COPY requirements.txt .
RUN pip install --prefix=/install --no-cache-dir -r requirements.txt

# Stage 2: production
FROM python:3.12-slim AS production
WORKDIR /app

# Copy installed packages from builder
COPY --from=builder /install /usr/local

# Copy application code
COPY . .

# Create and use non-root user
RUN useradd -m -u 1000 appuser
USER appuser

EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]`
        }
      },
      {
        id: 'docker-build-cache',
        title: 'Build Cache & Optimization',
        difficulty: 'intermediate',
        tags: ['docker', 'build-cache', 'optimization', 'performance'],
        sections: [
          {
            heading: 'How Build Cache Works',
            content: 'Docker\'s build cache dramatically speeds up repeated builds by reusing layers from previous builds. Each instruction creates a layer with a cache key based on: the instruction text, parent layer hash, and for COPY/ADD the file contents and metadata. If the cache key matches a previous build, Docker reuses the cached layer instead of re-executing the instruction. Once any instruction invalidates the cache (key mismatch), all subsequent instructions must re-execute even if they haven\'t changed. This is why instruction order matters critically — put instructions that change frequently (COPY . .) near the end, and instructions that change rarely (RUN npm install) near the top, after copying only their trigger files.',
            code: `# BAD: COPY . . before npm install
# Any source change forces npm install to re-run
FROM node:20-alpine
COPY . .                  # ← ANY file change invalidates this
RUN npm ci                # ← always re-runs (slow!)

# GOOD: Copy deps first, source second
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./     # ← only invalidates when deps change
RUN npm ci                # ← cached unless package.json changes
COPY . .                  # ← source changes only affect layers below
CMD ["node", "server.js"]`,
            tip: 'The golden rule of Dockerfile ordering: copy the minimum needed to run each expensive step, then run it, then copy everything else.'
          },
          {
            heading: 'Cache Invalidation and BuildKit',
            content: 'Cache invalidation happens when any cache key changes. For COPY, changing a single byte in any copied file invalidates that layer. RUN layers invalidate when the instruction text changes. ENV and ARG changes invalidate all subsequent layers. Docker BuildKit (enabled by default in recent versions) brings advanced caching: --mount=type=cache lets RUN steps use a persistent cache directory across builds (perfect for package manager caches). --mount=type=secret allows build secrets without baking them into layers. BuildKit also supports parallel stage execution, inline cache imports, and remote cache with --cache-from. Set DOCKER_BUILDKIT=1 or use docker buildx for BuildKit features.',
            code: `# BuildKit cache mounts (keep package cache between builds)
# syntax=docker/dockerfile:1
FROM python:3.12

RUN --mount=type=cache,target=/root/.cache/pip \
    pip install -r requirements.txt

FROM node:20-alpine
RUN --mount=type=cache,target=/root/.npm \
    npm ci

# Use BuildKit
DOCKER_BUILDKIT=1 docker build .
# or
docker buildx build .

# Import cache from registry
docker buildx build \
  --cache-from type=registry,ref=myapp:cache \
  --cache-to type=registry,ref=myapp:cache \
  -t myapp:latest .`,
            note: 'BuildKit cache mounts are the most impactful optimization for builds that install packages — pip, npm, cargo, and go mod downloads persist between builds.'
          },
          {
            heading: 'Measuring and Optimizing',
            content: 'Measure build times before optimizing. docker build --progress=plain shows timing per instruction. Large images often result from leaving build tools in the final image, not cleaning package caches, copying unnecessary files, or missing .dockerignore entries. Use docker images to check final image sizes and docker history to identify large layers. Tools like dive (github.com/wagoodman/dive) provide interactive layer analysis showing exactly which files each layer adds. For Go binaries, use -ldflags="-w -s" to strip debug info, often reducing binary size by 30-40%. For Node.js, use npm ci --only=production and prune devDependencies. For Python, combine pip install with --no-cache-dir.',
            code: `# Analyze build timing
docker build --progress=plain -t my-app . 2>&1 | \
  grep -E "^#[0-9]+ (CACHED|RUN|COPY)"

# Check image sizes
docker images my-app

# Analyze layers with dive (install separately)
dive my-app:latest

# Python: minimize image
RUN pip install --no-cache-dir -r requirements.txt

# Node: production deps only
RUN npm ci --only=production

# Go: strip debug symbols
RUN CGO_ENABLED=0 go build \
    -ldflags="-w -s" \
    -trimpath \
    -o /app .`,
            tip: 'Install dive (github.com/wagoodman/dive) for interactive layer analysis. It shows exactly what files each layer adds, making it easy to find bloat.'
          }
        ],
        quiz: [
          {
            question: 'Why does copying package.json before source code optimize build cache?',
            options: ['package.json is smaller so it uploads faster', 'Dependency installation is cached unless package.json changes, even when source changes', 'Docker requires dependency files first', 'It prevents security vulnerabilities'],
            answer: 1,
            explanation: 'By copying only package.json first and running npm install, that layer is cached. When you later change source code, only COPY . . and below re-execute — the slow npm install layer stays cached.'
          },
          {
            question: 'What does --mount=type=cache in BuildKit do?',
            options: ['Speeds up image pulling', 'Caches the entire layer permanently', 'Provides a persistent cache directory for the RUN command that survives between builds', 'Enables remote caching to a registry'],
            answer: 2,
            explanation: 'BuildKit --mount=type=cache mounts a persistent directory (like ~/.cache/pip or ~/.npm) that persists between builds, so package managers don\'t re-download unchanged dependencies.'
          }
        ]
      },
      {
        id: 'docker-image-management',
        title: 'Image Management',
        difficulty: 'intermediate',
        tags: ['docker', 'images', 'management', 'cleanup'],
        sections: [
          {
            heading: 'Listing and Inspecting Images',
            content: 'Effective image management keeps your Docker host clean and performant. docker images (or docker image ls) lists all locally cached images with repository, tag, ID, creation time, and size. The --filter flag narrows results by label, reference, or dangling status. docker image inspect returns detailed JSON metadata including environment variables, exposed ports, entrypoint, labels, and the full layer chain. Use --format with Go template syntax to extract specific fields without parsing raw JSON. docker image history shows the build history — each layer, its creator command, and size contribution. This is invaluable for understanding why an image is large and identifying optimization opportunities.',
            code: `# List images
docker images
docker image ls --filter dangling=true
docker image ls --filter reference="my-app:*"

# Inspect specific fields
docker image inspect nginx \
  --format='{{.Config.Cmd}}'

docker image inspect nginx \
  --format='{{range .Config.Env}}{{println .}}{{end}}'

# Layer history with sizes
docker image history nginx --no-trunc

# Image size breakdown
docker image ls --format \
  "table {{.Repository}}\t{{.Tag}}\t{{.Size}}"`,
            tip: 'docker image history is your first tool for diagnosing large images. Look for unexpectedly large layers and trace them to specific Dockerfile instructions.'
          },
          {
            heading: 'Cleaning Up Images',
            content: 'Docker images accumulate quickly. Dangling images are layers with no tag (shown as <none>:<none>) from superseded builds. Unused images are tagged but not referenced by any container. Regular cleanup prevents disk exhaustion, especially on CI servers. docker image prune removes dangling images. docker image prune -a removes all images not used by any container — more aggressive but reclaims maximum space. docker system prune combines container, image, network, and build cache cleanup. Schedule regular pruning in CI environments. In development, run docker system prune -a weekly. Be careful with prune on production machines — it removes images you might need to restart services.',
            code: `# Remove specific image
docker rmi nginx:1.24
docker image rm nginx:1.24  # same thing

# Remove by ID (can abbreviate)
docker rmi abc123

# Remove dangling images only (safe)
docker image prune

# Remove all unused images (more aggressive)
docker image prune -a

# Remove images older than 24h
docker image prune -a --filter "until=24h"

# Nuclear option (everything unused)
docker system prune -a --volumes

# Check what would be removed (dry run)
docker system df`,
            warning: 'docker system prune -a removes ALL images not currently used by a running container. On production, this could remove images needed to restart services after a crash.'
          },
          {
            heading: 'Tagging Strategies',
            content: 'A consistent tagging strategy is essential for image lifecycle management. Semantic versioning (1.2.3) communicates change severity — patches are safe, major versions may break. Git SHA tags (myapp:abc1234) provide traceability — every image links to an exact commit. Environment tags (myapp:staging, myapp:production) indicate deployment status. Combine strategies: push both version tag and git SHA, and maintain latest and environment tags as mutable pointers. Immutable tags (version, SHA) never change; mutable tags (latest, production) are updated to point to new releases. Integrate tagging into CI/CD: on merge to main, build, tag with git SHA and version, push all tags atomically.',
            code: `# Tagging strategy in CI/CD
VERSION=$(git describe --tags --always)
GIT_SHA=$(git rev-parse --short HEAD)
IMAGE="myregistry.io/myapp"

# Build once, tag multiple ways
docker build -t $IMAGE:$VERSION .
docker tag $IMAGE:$VERSION $IMAGE:$GIT_SHA
docker tag $IMAGE:$VERSION $IMAGE:latest

# Push all tags
docker push $IMAGE:$VERSION
docker push $IMAGE:$GIT_SHA
docker push $IMAGE:latest

# Production deploy uses immutable tag
docker run $IMAGE:1.2.3  # always same image
docker run $IMAGE:latest  # may change`,
            tip: 'Never overwrite immutable version tags (1.2.3). Always push both a version tag and latest. Deploy to production using the version tag for auditability.'
          }
        ]
      },
      {
        id: 'docker-best-practices-images',
        title: 'Dockerfile Best Practices',
        difficulty: 'intermediate',
        tags: ['docker', 'best-practices', 'security', 'optimization'],
        sections: [
          {
            heading: 'Security Best Practices',
            content: 'Security-focused Dockerfiles minimize attack surface and avoid running privileged processes. Always run containers as a non-root user — create a dedicated user with a fixed UID in your Dockerfile and switch with USER. Avoid storing secrets in ENV variables, ARG values, or COPY\'d files — they persist in image layers. Use multi-stage builds to ensure build tools and credentials never reach the production image. Pin base image versions (not just tags but consider digests for critical apps) to prevent supply chain attacks from tag mutation. Scan images regularly with docker scout or Trivy. Use COPY instead of ADD. Minimize installed packages (--no-install-recommends on apt). Drop capabilities with docker run --cap-drop=ALL.',
            code: `FROM node:20-alpine

# Pin specific version
# FROM node:20.11.0-alpine3.19

# Install only what's needed
RUN apk add --no-cache curl

# Create non-root user
RUN addgroup -S appgroup && \
    adduser -S -G appgroup -u 1001 appuser

WORKDIR /app
COPY --chown=appuser:appgroup package*.json ./
RUN npm ci --only=production

COPY --chown=appuser:appgroup . .

# Switch to non-root
USER appuser

EXPOSE 3000
CMD ["node", "server.js"]`,
            warning: 'Running containers as root is a serious security risk. If the app is compromised, the attacker has root access to the container and potentially the host.'
          },
          {
            heading: 'Performance and Size Optimization',
            content: 'Small, efficient images build faster, pull faster, start faster, and have a smaller security attack surface. Key techniques: order instructions from least to most frequently changing to maximize cache hits; combine related RUN commands with && and clean up in the same layer; use Alpine or slim base images; use multi-stage builds to exclude build artifacts; add a comprehensive .dockerignore; install only runtime dependencies (no dev dependencies); use --no-install-recommends with apt, --no-cache-dir with pip; compile Go binaries with CGO_ENABLED=0 and strip debug symbols. Measure before and after with docker images to confirm improvements. Aim for images under 100MB for most services.',
            code: `# Optimized Python Dockerfile
FROM python:3.12-slim AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir \
    --prefix=/install \
    -r requirements.txt

FROM python:3.12-slim
WORKDIR /app
COPY --from=builder /install /usr/local
COPY . .
RUN useradd -m -u 1000 app && chown -R app /app
USER app
EXPOSE 8000
CMD ["gunicorn", "app:app", "-b", "0.0.0.0:8000"]

# .dockerignore
# __pycache__/
# *.pyc
# .git
# .env
# tests/`,
            tip: 'After each optimization, run docker images to see the size reduction. A systematic approach — base image, deps, cleanup, multi-stage — can reduce images by 80-90%.'
          },
          {
            heading: 'Maintainability and Documentation',
            content: 'Maintainable Dockerfiles are readable, well-commented, and follow consistent conventions. Use LABEL to add metadata: maintainer, version, git commit, build date. Comment non-obvious instructions explaining why, not what. Use ARG for configurable values (versions, registry) to avoid hardcoding. Use WORKDIR to set a consistent working directory rather than cd in RUN commands. Use HEALTHCHECK to enable Docker to monitor container health — it checks that your service is actually responding, not just that the process is running. Add a healthcheck for every long-running service. Use .dockerignore to document what should not be in the build context. Keep your Dockerfile in version control alongside application code.',
            code: `# syntax=docker/dockerfile:1
FROM node:20-alpine

LABEL org.opencontainers.image.title="My API" \
      org.opencontainers.image.version="1.0.0" \
      org.opencontainers.image.source="https://github.com/org/repo"

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

WORKDIR /app

COPY package*.json ./
# Separate install step for layer caching
RUN npm ci --only=production

COPY . .

RUN adduser -D -u 1000 appuser
USER appuser

EXPOSE 3000

# Health check every 30s, 10s timeout, 3 retries
HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
  CMD wget -qO- http://localhost:3000/health || exit 1

CMD ["node", "server.js"]`,
            tip: 'Always add a HEALTHCHECK to service containers. It enables Docker and orchestrators (Swarm, Kubernetes) to detect unhealthy containers and replace them automatically.'
          }
        ],
        quiz: [
          {
            question: 'What is the primary security reason to run containers as a non-root user?',
            options: ['It makes the container start faster', 'Non-root processes cannot bind to ports below 1024', 'If the application is compromised, the attacker has limited privileges inside the container', 'Docker requires non-root for production images'],
            answer: 2,
            explanation: 'Running as root means a compromised application has root privileges inside the container. With certain escape vulnerabilities or volume mounts, this can escalate to host root. Non-root users limit blast radius.'
          },
          {
            question: 'What does HEALTHCHECK do in a Dockerfile?',
            options: ['Scans the image for vulnerabilities', 'Validates the Dockerfile syntax', 'Configures Docker to periodically test if the container is functioning correctly', 'Checks network connectivity at build time'],
            answer: 2,
            explanation: 'HEALTHCHECK configures a command Docker runs periodically inside the container to check if the service is healthy. Unhealthy containers can be detected and replaced by orchestrators automatically.'
          },
          {
            question: 'Why use --no-install-recommends with apt-get install?',
            options: ['It speeds up the apt-get command', 'It prevents installing recommended but unnecessary packages, reducing image size', 'It skips package signature verification', 'It enables offline package installation'],
            answer: 1,
            explanation: '--no-install-recommends prevents apt from installing "recommended" packages that are not strictly required. This can significantly reduce image size by avoiding dozens of unnecessary packages.'
          }
        ]
      }
    ]
  }
];
