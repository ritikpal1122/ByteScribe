import type { DocCategory } from './types';

export const DOCKER_PART2_CATEGORIES: DocCategory[] = [
  {
    id: 'docker-containers',
    title: 'Container Operations',
    icon: '📟',
    entries: [
      {
        id: 'docker-run-deep',
        title: 'docker run Deep Dive',
        difficulty: 'beginner',
        tags: ['docker', 'run', 'containers', 'flags', 'resource-limits', 'restart-policy'],
        sections: [
          {
            heading: 'Understanding docker run Flags',
            content:
              'The `docker run` command is the most fundamental command in the Docker ecosystem. It creates a new container from a specified image and starts it immediately. The command accepts a wide variety of flags that control how the container operates. The `-d` flag runs the container in detached mode, meaning it runs in the background and returns the container ID. The `-it` flags are often combined: `-i` keeps STDIN open for interactive processes, while `-t` allocates a pseudo-TTY. The `--name` flag assigns a human-readable name to the container instead of a randomly generated one, making it easier to reference later. The `--rm` flag automatically removes the container when it exits, which is extremely useful for one-off tasks and prevents accumulation of stopped containers on your system.',
            code: `# Run in detached mode with a name
docker run -d --name my-web-server nginx:latest

# Run interactively with a TTY
docker run -it --name my-ubuntu ubuntu:22.04 /bin/bash

# Auto-remove on exit
docker run --rm alpine echo "Hello and goodbye"

# Combine flags for interactive session that cleans up
docker run -it --rm --name temp-session python:3.11 python`,
            tip: 'Always use --name for long-running containers so you can easily reference them with docker stop, docker logs, and docker exec instead of relying on container IDs.',
          },
          {
            heading: 'Restart Policies',
            content:
              'Docker provides several restart policies that determine what happens when a container stops. The `--restart` flag controls this behavior and is essential for production deployments. The `no` policy is the default and means the container will not be restarted automatically. The `on-failure` policy restarts the container only if it exits with a non-zero exit code, and you can optionally specify a maximum retry count. The `always` policy restarts the container regardless of the exit status, and it also starts the container on daemon startup. The `unless-stopped` policy behaves like `always` except it does not restart the container if it was explicitly stopped before the Docker daemon was restarted. Understanding these policies is critical for building resilient containerized applications.',
            code: `# Never restart (default)
docker run -d --restart no nginx

# Restart on failure with max 5 retries
docker run -d --restart on-failure:5 my-app

# Always restart
docker run -d --restart always --name persistent-app redis:7

# Unless manually stopped
docker run -d --restart unless-stopped --name my-db postgres:15`,
            warning: 'Using --restart always with --rm is conflicting and Docker will return an error. Choose one or the other based on whether you want persistence or cleanup.',
          },
          {
            heading: 'Resource Limits on docker run',
            content:
              'You can control how many system resources a container is allowed to use directly from the `docker run` command. Memory limits are set with `--memory` (or `-m`) and you can specify values in bytes, kilobytes, megabytes, or gigabytes. The `--memory-swap` flag sets the total memory plus swap the container can use. CPU limits can be set with `--cpus` to specify a decimal number of CPUs, or `--cpu-shares` for relative weighting. The `--cpuset-cpus` flag pins the container to specific CPU cores. Storage limits can be set with `--storage-opt` on supported storage drivers. These resource constraints are enforced by Linux cgroups and ensure that a misbehaving container cannot consume all host resources and affect other containers or the host system itself.',
            code: `# Limit memory to 512MB
docker run -d --memory 512m --name limited-app my-app

# Limit to 1.5 CPUs and 1GB memory
docker run -d --cpus 1.5 --memory 1g --name constrained nginx

# Pin to specific CPU cores
docker run -d --cpuset-cpus "0,1" --name pinned-app my-app

# Set memory and swap limits
docker run -d --memory 256m --memory-swap 512m my-app

# View resource usage
docker stats --no-stream`,
            note: 'If you set --memory without --memory-swap, the swap limit defaults to twice the memory limit. Set them equal to disable swap entirely.',
          },
        ],
        quiz: [
          {
            question: 'What does the --rm flag do in docker run?',
            options: [
              'Removes the image after running',
              'Automatically removes the container when it exits',
              'Removes all stopped containers',
              'Restarts the container after removal',
            ],
            correctIndex: 1,
            explanation: 'The --rm flag tells Docker to automatically remove the container filesystem when the container exits, preventing accumulation of stopped containers.',
          },
          {
            question: 'Which restart policy restarts the container unless it was manually stopped?',
            options: ['always', 'on-failure', 'unless-stopped', 'no'],
            correctIndex: 2,
            explanation: 'The unless-stopped policy behaves like always but will not restart the container if it was explicitly stopped before the Docker daemon was restarted.',
          },
          {
            question: 'What flag limits a container to use at most 2 CPU cores?',
            options: ['--cpu-shares 2', '--cpus 2', '--cpu-limit 2', '--max-cpu 2'],
            correctIndex: 1,
            explanation: 'The --cpus flag sets the number of CPUs a container can use. --cpus 2 limits the container to at most 2 CPU cores worth of processing time.',
          },
        ],
      },
      {
        id: 'docker-exec',
        title: 'docker exec',
        difficulty: 'beginner',
        tags: ['docker', 'exec', 'containers', 'debugging', 'shell-access'],
        sections: [
          {
            heading: 'Running Commands in Running Containers',
            content:
              'The `docker exec` command allows you to run a new command inside an already running container. This is one of the most frequently used Docker commands for debugging, administration, and inspection of running containers. Unlike `docker run`, which creates a new container, `docker exec` targets an existing container and spawns an additional process within its namespace. The command requires at least the container name or ID and the command to execute. It is important to understand that the process started by `docker exec` runs alongside the main container process and shares the same filesystem, network namespace, and environment. When the exec process finishes, it does not affect the main container process. This makes it safe to use for inspection and debugging without risking the container lifecycle.',
            code: `# Run a simple command
docker exec my-container ls -la /app

# Open an interactive bash shell
docker exec -it my-container /bin/bash

# Run as a specific user
docker exec -u root my-container apt-get update

# Set working directory
docker exec -w /app/src my-container cat config.json

# Set environment variables
docker exec -e DEBUG=true my-container python debug.py

# Combine flags for root interactive shell
docker exec -it -u root -w /var/log my-container /bin/sh`,
            tip: 'If bash is not available in the container, try /bin/sh instead. Many minimal images like Alpine use sh as their default shell.',
          },
          {
            heading: 'Advanced exec Usage',
            content:
              'Beyond basic command execution, `docker exec` supports several advanced use cases that are invaluable for container management. You can use the `-d` flag to run the exec command in detached mode, which is useful for starting background processes. The `--privileged` flag gives extended privileges to the exec command, which can be necessary for certain debugging operations. You can also pass environment variables with the `-e` flag, which is helpful for running commands that need specific configuration without modifying the container environment permanently. Combining `-it` with a shell command is the most common pattern for interactive debugging sessions. It is important to note that any changes made through exec are ephemeral if they only affect the container filesystem, meaning they will be lost when the container is removed unless volumes are being used.',
            code: `# Run detached background process
docker exec -d my-container tail -f /var/log/app.log

# Execute with privileges
docker exec --privileged my-container mount /dev/sda1 /mnt

# Pipe commands through exec
echo "SELECT 1;" | docker exec -i my-db psql -U postgres

# Multiple environment variables
docker exec -e DB_HOST=localhost -e DB_PORT=5432 my-app python migrate.py

# Check running processes inside container
docker exec my-container ps aux`,
            warning: 'Using --privileged with docker exec grants the process nearly full host access. Only use it when absolutely necessary and never in production environments.',
          },
          {
            heading: 'Common exec Patterns and Troubleshooting',
            content:
              'There are several patterns that experienced Docker users rely on frequently when working with `docker exec`. One of the most common is opening a shell to inspect the filesystem, check environment variables, or verify network connectivity. Another pattern is running database migrations or management commands inside application containers. When troubleshooting, you might exec into a container to check if a configuration file was mounted correctly, verify DNS resolution, or test network connectivity to other services. If `docker exec` fails with an error that the container is not running, you need to start the container first with `docker start`. If the command is not found, the binary might not be installed in the container image. Understanding these patterns and their limitations will make you significantly more productive when working with Docker containers in development and production environments.',
            code: `# Check environment variables
docker exec my-app env | sort

# Verify DNS resolution
docker exec my-app nslookup api-service

# Test connectivity
docker exec my-app curl -s http://backend:8080/health

# Check file permissions
docker exec my-app ls -la /app/data/

# View container network config
docker exec my-app cat /etc/hosts

# Run database migration
docker exec my-app python -m alembic upgrade head`,
            analogy: 'Think of docker exec like SSH-ing into a server, except the connection is local and instantaneous. You get a window into the running container without disrupting the main application process.',
          },
        ],
        quiz: [
          {
            question: 'What is the difference between docker run and docker exec?',
            options: [
              'docker run is faster than docker exec',
              'docker run creates a new container; docker exec runs a command in an existing one',
              'docker exec can only run shell commands',
              'docker run requires root; docker exec does not',
            ],
            correctIndex: 1,
            explanation: 'docker run creates and starts a new container from an image, while docker exec runs a new command inside an already running container.',
          },
          {
            question: 'What does the -u flag do with docker exec?',
            options: [
              'Sets the container uptime',
              'Runs the command as the specified user',
              'Updates the container image',
              'Enables UDP networking',
            ],
            correctIndex: 1,
            explanation: 'The -u flag specifies which user the command should run as inside the container, for example -u root or -u 1000.',
          },
          {
            question: 'What happens if you try to docker exec into a stopped container?',
            options: [
              'The container automatically starts',
              'The command runs and the container stops again',
              'An error is returned because the container is not running',
              'The command is queued until the container starts',
            ],
            correctIndex: 2,
            explanation: 'docker exec only works on running containers. If the container is stopped, Docker returns an error. You need to start it first with docker start.',
          },
        ],
      },
      {
        id: 'docker-logs',
        title: 'docker logs',
        difficulty: 'beginner',
        tags: ['docker', 'logs', 'monitoring', 'debugging', 'log-drivers'],
        sections: [
          {
            heading: 'Viewing Container Logs',
            content:
              'The `docker logs` command fetches the logs of a container, displaying its standard output (stdout) and standard error (stderr) streams. This is one of the primary tools for understanding what is happening inside a container without needing to exec into it. By default, `docker logs` displays all the logs that have been captured since the container started. For long-running containers, this can produce an overwhelming amount of output. The command works with both running and stopped containers, which makes it useful for post-mortem analysis when a container has exited unexpectedly. Docker captures these logs through the configured logging driver, and the default json-file driver stores them as JSON-formatted files on the host filesystem. Understanding how to effectively use docker logs is essential for troubleshooting issues and monitoring container behavior.',
            code: `# View all logs from a container
docker logs my-container

# Follow log output in real-time
docker logs -f my-container

# Show last 100 lines
docker logs --tail 100 my-container

# Show logs since a specific time
docker logs --since 2024-01-15T10:00:00 my-container

# Show logs from last 30 minutes
docker logs --since 30m my-container

# Show timestamps with each log line
docker logs -t my-container

# Combine: follow with timestamps, last 50 lines
docker logs -f -t --tail 50 my-container`,
            tip: 'Use --tail with -f (follow) to avoid printing the entire log history before starting to stream new entries.',
          },
          {
            heading: 'Log Drivers',
            content:
              'Docker supports multiple logging drivers that control where container logs are sent and how they are stored. The default `json-file` driver stores logs as JSON on the host and is the only driver that supports `docker logs` by default. The `local` driver is optimized for performance and uses a custom binary format with automatic log rotation. The `syslog` driver sends logs to a syslog server, which is useful for centralized logging in traditional infrastructure. The `journald` driver integrates with systemd journal. The `fluentd` and `gelf` drivers send logs to Fluentd and Graylog respectively, enabling integration with popular log aggregation platforms. The `awslogs` driver sends logs directly to Amazon CloudWatch. You can configure the default logging driver in the Docker daemon configuration or override it per container using the `--log-driver` flag on `docker run`.',
            code: `# Run with a specific log driver
docker run -d --log-driver json-file --log-opt max-size=10m --log-opt max-file=3 nginx

# Use syslog driver
docker run -d --log-driver syslog --log-opt syslog-address=udp://logserver:514 my-app

# Use fluentd driver
docker run -d --log-driver fluentd --log-opt fluentd-address=localhost:24224 my-app

# Disable logging entirely
docker run -d --log-driver none my-app

# Check current log driver for a container
docker inspect --format '{{.HostConfig.LogConfig.Type}}' my-container

# View daemon default log driver
docker info --format '{{.LoggingDriver}}'`,
            warning: 'When using non-default log drivers like syslog or fluentd, the docker logs command may not work. Plan your log access strategy accordingly.',
          },
          {
            heading: 'Log Management Best Practices',
            content:
              'Effective log management is crucial for operating containers in production. Without log rotation, container logs can grow indefinitely and consume all available disk space, which is one of the most common causes of production outages in Docker environments. Always configure log rotation using the `max-size` and `max-file` options when using the json-file or local log driver. A common configuration is to set max-size to 10 or 50 megabytes and max-file to 3 or 5 files. You can set these globally in the Docker daemon configuration file at `/etc/docker/daemon.json`. For applications that produce structured logs, consider using JSON format for log output inside your application, which makes them easier to parse and search. When running multiple containers, use labels or container names consistently so you can filter and aggregate logs effectively in your monitoring stack.',
            code: `# Set global defaults in /etc/docker/daemon.json
# {
#   "log-driver": "json-file",
#   "log-opts": {
#     "max-size": "50m",
#     "max-file": "3"
#   }
# }

# Check log file location on host
docker inspect --format='{{.LogPath}}' my-container

# View log file size
ls -lh $(docker inspect --format='{{.LogPath}}' my-container)

# Clear container logs (careful in production)
truncate -s 0 $(docker inspect --format='{{.LogPath}}' my-container)

# Application-level structured logging example
docker run -d --name structured-app \\
  --log-opt max-size=20m \\
  --log-opt max-file=5 \\
  my-app`,
            note: 'Setting log rotation globally in daemon.json only applies to newly created containers. Existing containers will continue using the settings from when they were created.',
          },
        ],
        challenge: {
          prompt: 'Set up a container with json-file logging, limited to 5MB per file with 3 rotated files. Then retrieve only the logs from the last 5 minutes with timestamps.',
          starterCode: `# Start an nginx container with log rotation settings
docker run -d --name log-demo \\
  # ADD LOG OPTIONS HERE
  nginx:latest

# View logs from last 5 minutes with timestamps
# ADD COMMAND HERE`,
          solutionCode: `# Start an nginx container with log rotation settings
docker run -d --name log-demo \\
  --log-opt max-size=5m \\
  --log-opt max-file=3 \\
  nginx:latest

# View logs from last 5 minutes with timestamps
docker logs --since 5m -t log-demo`,
          hints: [
            'Use --log-opt max-size=5m for file size limit',
            'Use --log-opt max-file=3 for rotation count',
            'Use --since 5m and -t flags for time filtering with timestamps',
          ],
        },
      },
      {
        id: 'docker-inspect',
        title: 'docker inspect',
        difficulty: 'intermediate',
        tags: ['docker', 'inspect', 'metadata', 'go-templates', 'debugging'],
        sections: [
          {
            heading: 'Container and Image Inspection',
            content:
              'The `docker inspect` command returns detailed low-level information about Docker objects including containers, images, volumes, and networks. The output is a JSON array containing comprehensive metadata about the specified object. For containers, this includes the full configuration, state information, network settings, mount points, and more. For images, it shows layers, environment variables, entrypoint, exposed ports, and labels. This command is indispensable for debugging and understanding the exact configuration of any Docker object. The information returned by inspect is far more detailed than what you see from commands like `docker ps` or `docker images`. By default, the output is unformatted JSON, but you can pipe it through `jq` or use the built-in Go template formatting to extract specific fields efficiently.',
            code: `# Inspect a container (full JSON output)
docker inspect my-container

# Inspect an image
docker inspect nginx:latest

# Inspect a volume
docker volume inspect my-volume

# Inspect a network
docker network inspect bridge

# Pipe through jq for readability
docker inspect my-container | jq '.[0].State'

# Inspect multiple objects
docker inspect container1 container2`,
            tip: 'Pipe the output through jq for human-readable formatting and powerful JSON querying. Install jq if it is not already available on your system.',
          },
          {
            heading: 'Go Template Formatting',
            content:
              'Docker inspect supports Go template syntax through the `--format` flag, allowing you to extract specific pieces of information without external tools. This is incredibly powerful for scripting and automation. The template syntax uses double curly braces and can access nested JSON fields using dot notation. You can use conditionals, loops, and various built-in functions. The `json` function is particularly useful for outputting nested structures in JSON format. The `index` function lets you access map entries by key. Range loops allow you to iterate over lists and maps. Understanding Go templates takes some practice, but it pays off enormously when you need to extract specific data from Docker inspect output in shell scripts or CI/CD pipelines where installing jq might not be desirable or possible.',
            code: `# Get container IP address
docker inspect --format '{{.NetworkSettings.IPAddress}}' my-container

# Get container status
docker inspect --format '{{.State.Status}}' my-container

# Get all environment variables
docker inspect --format '{{range .Config.Env}}{{println .}}{{end}}' my-container

# Get all port mappings
docker inspect --format '{{json .NetworkSettings.Ports}}' my-container | jq

# Get mount points
docker inspect --format '{{range .Mounts}}{{.Source}} -> {{.Destination}}{{println}}{{end}}' my-container

# Get restart count
docker inspect --format '{{.RestartCount}}' my-container

# Get image ID used by container
docker inspect --format '{{.Image}}' my-container`,
            note: 'Go template field names are case-sensitive and match the JSON output keys exactly. If a field does not exist, the template will output an empty string or zero value.',
          },
          {
            heading: 'Practical inspect Recipes',
            content:
              'Experienced Docker users maintain a collection of commonly used inspect commands for rapid troubleshooting. Knowing the exact IP address of a container is essential when debugging network issues between containers. Checking the PID allows you to use host-level tools like `nsenter` to enter the container namespace. Viewing the exact command and entrypoint helps when a container is not behaving as expected. The health check status fields show whether the container is healthy, unhealthy, or if health checks are not configured. The `FinishedAt` and exit code fields are critical for understanding why a container stopped. Combining inspect with shell scripting enables powerful automation patterns, such as waiting for a container to be healthy before proceeding, or dynamically configuring reverse proxies based on container metadata.',
            code: `# Get container PID on host
docker inspect --format '{{.State.Pid}}' my-container

# Get container start time
docker inspect --format '{{.State.StartedAt}}' my-container

# Get exit code of stopped container
docker inspect --format '{{.State.ExitCode}}' my-container

# Check health status
docker inspect --format '{{.State.Health.Status}}' my-container

# Get all linked network names
docker inspect --format '{{range $k, $v := .NetworkSettings.Networks}}{{$k}} {{end}}' my-container

# Script: wait until container is healthy
while [ "$(docker inspect --format '{{.State.Health.Status}}' my-container)" != "healthy" ]; do
  sleep 2
done
echo "Container is healthy!"`,
            analogy: 'Think of docker inspect as an X-ray machine for your containers. While docker ps gives you a surface-level view, inspect reveals the complete internal structure and configuration of any Docker object.',
          },
        ],
        quiz: [
          {
            question: 'What format does docker inspect output by default?',
            options: ['YAML', 'XML', 'JSON', 'Plain text'],
            correctIndex: 2,
            explanation: 'docker inspect outputs a JSON array by default containing detailed metadata about the specified Docker object.',
          },
          {
            question: 'Which flag is used to apply Go templates to docker inspect output?',
            options: ['--template', '--format', '--output', '--filter'],
            correctIndex: 1,
            explanation: 'The --format flag accepts a Go template string to extract specific fields from the inspect output.',
          },
          {
            question: 'What does {{json .NetworkSettings.Ports}} do in a Go template?',
            options: [
              'Validates the ports configuration',
              'Outputs the Ports field as a JSON string',
              'Converts ports to integers',
              'Filters only open ports',
            ],
            correctIndex: 1,
            explanation: 'The json function in Go templates serializes the specified field to a JSON string, which is useful for nested structures.',
          },
        ],
      },
      {
        id: 'docker-cp',
        title: 'docker cp',
        difficulty: 'beginner',
        tags: ['docker', 'cp', 'copy', 'files', 'containers'],
        sections: [
          {
            heading: 'Copying Files Between Host and Container',
            content:
              'The `docker cp` command copies files and directories between a container and the local filesystem. It works with both running and stopped containers, which makes it versatile for various scenarios. The syntax follows the pattern of the standard Unix `cp` command, with the container path specified using the format `container:path`. You can copy files from the host to the container or from the container to the host. When copying directories, the behavior depends on whether the destination path exists. If the destination directory exists, the source directory is copied inside it. If it does not exist, the source directory is renamed to the destination path. The command does not support copying between two containers directly, but you can achieve this by copying to the host as an intermediate step.',
            code: `# Copy file from host to container
docker cp ./config.json my-container:/app/config.json

# Copy file from container to host
docker cp my-container:/app/output.log ./output.log

# Copy entire directory from host to container
docker cp ./src/ my-container:/app/src/

# Copy directory from container to host
docker cp my-container:/var/log/ ./container-logs/

# Copy from a stopped container
docker cp stopped-container:/app/data.db ./backup/data.db

# Copy using container ID
docker cp abc123def456:/etc/nginx/nginx.conf ./nginx.conf`,
            tip: 'docker cp works on stopped containers too, making it ideal for extracting crash dumps, log files, or data from containers that have exited.',
          },
          {
            heading: 'File Ownership and Permissions',
            content:
              'When copying files with `docker cp`, understanding how ownership and permissions are handled is important. By default, files copied into a container are owned by the UID and GID of the root user (0:0), regardless of who owns the file on the host. You can use the `--archive` or `-a` flag to preserve the original ownership and permissions from the source. However, the UIDs and GIDs are preserved numerically, meaning the user with UID 1000 on the host may correspond to a different user inside the container. When copying files out of a container to the host, the files are written with the ownership of the user running the docker cp command. Symbolic links in the source are always copied as the actual files or directories they point to, not as links themselves. Understanding these nuances prevents permission issues that can cause applications to fail.',
            code: `# Copy preserving ownership and permissions
docker cp -a ./app-data/ my-container:/app/data/

# Copy a file and then fix ownership inside container
docker cp ./config.yml my-container:/app/config.yml
docker exec my-container chown appuser:appgroup /app/config.yml

# Extract files and check permissions
docker cp my-container:/app/data/ ./extracted/
ls -la ./extracted/

# Copy and set specific permissions
docker cp ./script.sh my-container:/usr/local/bin/script.sh
docker exec my-container chmod +x /usr/local/bin/script.sh`,
            warning: 'Files copied into a container are owned by root (UID 0) by default. If your application runs as a non-root user, you must fix permissions after copying.',
          },
          {
            heading: 'Practical Use Cases for docker cp',
            content:
              'The `docker cp` command has several practical use cases in daily Docker workflows. One common use case is extracting log files or crash reports from containers that have failed and cannot be restarted. Another is injecting configuration files into running containers during development without rebuilding the image. For database containers, you might copy SQL dump files in for import or copy database backup files out for safekeeping. During development, you can copy build artifacts out of builder containers. The command is also useful for troubleshooting: you can copy diagnostic tools or scripts into a minimal container that lacks the tools you need. However, for production environments, it is better to use volumes or bind mounts for persistent data and to bake configuration into images rather than relying on docker cp.',
            code: `# Extract crash dump from failed container
docker cp crashed-app:/app/core-dump ./diagnostics/

# Inject SQL file for database import
docker cp ./seed-data.sql my-postgres:/tmp/seed-data.sql
docker exec my-postgres psql -U postgres -f /tmp/seed-data.sql

# Copy build artifacts from builder container
docker create --name builder my-build-image
docker cp builder:/app/dist/ ./build-output/
docker rm builder

# Hot-reload config during development
docker cp ./nginx-dev.conf my-nginx:/etc/nginx/conf.d/default.conf
docker exec my-nginx nginx -s reload

# Copy diagnostic tools into minimal container
docker cp /usr/bin/curl my-container:/usr/local/bin/curl`,
            note: 'For development workflows, prefer using bind mounts (-v) instead of docker cp, as bind mounts automatically reflect file changes without needing to copy manually.',
          },
        ],
      },
      {
        id: 'docker-start-stop',
        title: 'Start, Stop & Restart',
        difficulty: 'beginner',
        tags: ['docker', 'lifecycle', 'start', 'stop', 'restart', 'signals'],
        sections: [
          {
            heading: 'Container Lifecycle Commands',
            content:
              'Docker provides several commands to control the lifecycle of containers after they have been created. The `docker start` command starts one or more stopped containers, resuming their main process. The `docker stop` command sends a SIGTERM signal to the main process, giving it a grace period to shut down cleanly. If the process does not exit within the grace period (10 seconds by default), Docker sends a SIGKILL to force termination. The `docker restart` command is equivalent to running stop followed by start. The `docker pause` command suspends all processes in the container using the cgroups freezer, and `docker unpause` resumes them. The `docker kill` command sends a signal to the main process immediately without any grace period. Understanding these commands and their differences is essential for properly managing container lifecycles.',
            code: `# Start a stopped container
docker start my-container

# Start multiple containers
docker start web-app db-server cache

# Stop a container (graceful, 10s timeout)
docker stop my-container

# Stop with custom timeout (30 seconds)
docker stop -t 30 my-container

# Restart a container
docker restart my-container

# Pause and unpause
docker pause my-container
docker unpause my-container

# Force kill immediately
docker kill my-container

# Stop all running containers
docker stop $(docker ps -q)`,
            tip: 'Use docker stop for graceful shutdowns that allow your application to clean up resources, close connections, and save state before exiting.',
          },
          {
            heading: 'Signals and Graceful Shutdown',
            content:
              'Understanding how Docker handles process signals is critical for building reliable applications. When you run `docker stop`, Docker sends SIGTERM to process PID 1 inside the container. Your application should handle SIGTERM to perform cleanup operations like closing database connections, finishing in-progress requests, and flushing caches. The `docker kill` command sends SIGKILL by default, which immediately terminates the process without giving it a chance to clean up. You can use `docker kill --signal` to send any valid Unix signal. The STOPSIGNAL instruction in a Dockerfile allows you to override the default signal sent by `docker stop`. For applications running as PID 1, signal handling may behave differently than expected because PID 1 has special signal handling in Linux. Using an init system like `tini` can help normalize signal behavior.',
            code: `# Send specific signal
docker kill --signal SIGHUP my-container
docker kill --signal SIGUSR1 my-container

# Use tini as init process (in Dockerfile)
# FROM python:3.11
# RUN apt-get update && apt-get install -y tini
# ENTRYPOINT ["tini", "--"]
# CMD ["python", "app.py"]

# Or use Docker's built-in init
docker run --init -d my-app

# Set stop signal in Dockerfile
# STOPSIGNAL SIGQUIT

# Check if container stopped cleanly
docker inspect --format '{{.State.ExitCode}}' my-container
# 0 = clean exit, 137 = SIGKILL, 143 = SIGTERM`,
            warning: 'If your application does not handle SIGTERM, Docker will wait the full grace period and then SIGKILL it. This can lead to data corruption or incomplete operations.',
          },
          {
            heading: 'Bulk Operations and Automation',
            content:
              'In real-world environments, you often need to manage multiple containers simultaneously. Docker supports passing multiple container names or IDs to start, stop, and restart commands. You can combine these with shell commands and docker ps filters to create powerful bulk operations. The `docker ps -q` command outputs only container IDs, making it easy to pipe into other commands. Filters like `--filter` allow you to target containers by name, label, status, or other attributes. For orchestrated environments, Docker Compose provides a higher-level interface for managing multiple related containers. However, understanding these lower-level bulk operations is important for scripting, automation, and emergency management scenarios where you need direct control over the Docker daemon.',
            code: `# Stop all containers with a specific label
docker stop $(docker ps -q --filter "label=env=staging")

# Restart all containers in a project
docker restart $(docker ps -q --filter "name=myproject")

# Start all stopped containers
docker start $(docker ps -aq --filter "status=exited")

# Gracefully stop everything with 60s timeout
docker stop -t 60 $(docker ps -q)

# Remove all stopped containers
docker container prune -f

# Stop containers created from a specific image
docker stop $(docker ps -q --filter "ancestor=nginx")

# Rolling restart script
for container in web-1 web-2 web-3; do
  docker restart "$container"
  sleep 10  # Wait between restarts
done`,
            analogy: 'Container lifecycle management is like managing a fleet of vehicles. docker start turns on the engine, docker stop is a gentle brake allowing passengers to exit safely, and docker kill is the emergency brake used only when necessary.',
          },
        ],
        quiz: [
          {
            question: 'What signal does docker stop send to a container by default?',
            options: ['SIGKILL', 'SIGTERM', 'SIGHUP', 'SIGINT'],
            correctIndex: 1,
            explanation: 'docker stop sends SIGTERM first, giving the process a grace period to shut down cleanly. If it does not exit in time, SIGKILL is sent.',
          },
          {
            question: 'What is the default grace period for docker stop before sending SIGKILL?',
            options: ['5 seconds', '10 seconds', '30 seconds', '60 seconds'],
            correctIndex: 1,
            explanation: 'The default timeout is 10 seconds. You can change it with the -t flag, for example docker stop -t 30 for 30 seconds.',
          },
          {
            question: 'What does docker pause do?',
            options: [
              'Stops the container gracefully',
              'Suspends all processes using the cgroups freezer',
              'Saves container state to disk',
              'Puts the container in maintenance mode',
            ],
            correctIndex: 1,
            explanation: 'docker pause suspends all processes in a container using the cgroups freezer. The processes are frozen in place and resume exactly where they left off with docker unpause.',
          },
        ],
      },
      {
        id: 'docker-resource-limits',
        title: 'Resource Constraints',
        difficulty: 'intermediate',
        tags: ['docker', 'resources', 'memory', 'cpu', 'cgroups', 'performance'],
        sections: [
          {
            heading: 'Memory Limits and Reservations',
            content:
              'Docker uses Linux cgroups to enforce resource constraints on containers. Memory limits are one of the most important constraints to set in production environments. The `--memory` flag sets a hard limit on the amount of memory a container can use. When a container exceeds this limit, the Linux OOM (Out of Memory) killer will terminate processes within the container. The `--memory-reservation` flag sets a soft limit that Docker tries to maintain when memory contention occurs on the host, but it does not guarantee the container will stay under this limit. The `--memory-swap` flag controls the total amount of memory plus swap space available. Setting `--memory-swap` equal to `--memory` effectively disables swap for that container. The `--oom-kill-disable` flag prevents the OOM killer from terminating the container, but use this with extreme caution as it can cause the host to become unresponsive.',
            code: `# Set hard memory limit to 512MB
docker run -d --memory 512m --name limited-app my-app

# Set memory limit and reservation
docker run -d --memory 1g --memory-reservation 256m my-app

# Disable swap (set swap equal to memory)
docker run -d --memory 512m --memory-swap 512m my-app

# Set kernel memory limit
docker run -d --memory 512m --kernel-memory 50m my-app

# Disable OOM killer (use with caution)
docker run -d --memory 512m --oom-kill-disable my-app

# Update memory on running container
docker update --memory 1g --memory-swap 2g my-container

# Check current memory usage
docker stats --no-stream --format "table {{.Name}}\t{{.MemUsage}}\t{{.MemPerc}}"`,
            warning: 'Never use --oom-kill-disable without setting a memory limit. This can cause the host system to run out of memory and become completely unresponsive.',
          },
          {
            heading: 'CPU Constraints',
            content:
              'Docker provides several mechanisms to control CPU allocation for containers. The `--cpus` flag is the simplest way to limit CPU usage, specifying a decimal number representing the number of CPU cores. For example, `--cpus 1.5` means the container can use at most one and a half CPU cores. The `--cpu-shares` flag sets relative CPU weight among containers, with the default being 1024. This only has effect when CPU cycles are constrained; when there is no contention, a container can use all available CPU regardless of its shares. The `--cpuset-cpus` flag pins a container to specific CPU cores, which is useful for performance-sensitive workloads that benefit from CPU cache locality. The `--cpu-period` and `--cpu-quota` flags provide fine-grained control over the CFS (Completely Fair Scheduler) settings. These CPU controls are all enforced through Linux cgroups and have minimal performance overhead.',
            code: `# Limit to 2 CPUs
docker run -d --cpus 2 my-app

# Set relative CPU shares (default 1024)
docker run -d --cpu-shares 512 low-priority-app
docker run -d --cpu-shares 2048 high-priority-app

# Pin to specific CPU cores (0 and 1)
docker run -d --cpuset-cpus "0,1" my-app

# Pin to a range of CPU cores
docker run -d --cpuset-cpus "0-3" my-app

# Fine-grained CFS settings (50% of one CPU)
docker run -d --cpu-period 100000 --cpu-quota 50000 my-app

# Update CPU limits on running container
docker update --cpus 4 my-container

# View CPU usage
docker stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}"`,
            note: 'CPU shares are relative weights only. A container with 512 shares gets half the CPU time of a container with 1024 shares, but only when both are competing for CPU cycles.',
          },
          {
            heading: 'Monitoring Resource Usage',
            content:
              'Monitoring resource usage is essential for right-sizing your container resource limits. The `docker stats` command provides a live stream of container resource usage statistics including CPU percentage, memory usage and limit, network I/O, and block I/O. The `--no-stream` flag shows a single snapshot instead of a continuous stream. You can use the `--format` flag with Go templates to customize the output, which is useful for scripting and dashboards. For production environments, you should integrate with monitoring solutions like Prometheus with cAdvisor, Grafana, or Datadog that provide historical data, alerting, and visualization. Setting resource limits too low causes unnecessary OOM kills and CPU throttling, while setting them too high wastes resources. The key is to monitor actual usage patterns and adjust limits based on real data rather than guessing.',
            code: `# Live resource monitoring
docker stats

# Single snapshot
docker stats --no-stream

# Custom format output
docker stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}\t{{.BlockIO}}"

# Monitor specific containers
docker stats web-app db-server cache

# Check if container was OOM killed
docker inspect --format '{{.State.OOMKilled}}' my-container

# View cgroup limits directly
docker exec my-container cat /sys/fs/cgroup/memory/memory.limit_in_bytes
docker exec my-container cat /sys/fs/cgroup/cpu/cpu.cfs_quota_us

# JSON output for scripting
docker stats --no-stream --format '{"name":"{{.Name}}","cpu":"{{.CPUPerc}}","mem":"{{.MemPerc}}"}'`,
            tip: 'Start with generous resource limits, monitor actual usage for a few days, then tighten the limits to around 150% of observed peak usage to provide headroom for spikes.',
          },
        ],
        challenge: {
          prompt: 'Create a container with 256MB memory limit, no swap, pinned to CPU cores 0 and 1, and then verify the resource limits using docker inspect.',
          starterCode: `# Run a container with resource constraints
docker run -d --name resource-test \\
  # ADD MEMORY, SWAP, AND CPU CONSTRAINTS
  nginx:latest

# Verify memory limit
docker inspect --format '{{.HostConfig.Memory}}' resource-test

# Verify CPU pinning
# ADD INSPECT COMMAND`,
          solutionCode: `# Run a container with resource constraints
docker run -d --name resource-test \\
  --memory 256m \\
  --memory-swap 256m \\
  --cpuset-cpus "0,1" \\
  nginx:latest

# Verify memory limit (268435456 bytes = 256MB)
docker inspect --format '{{.HostConfig.Memory}}' resource-test

# Verify CPU pinning
docker inspect --format '{{.HostConfig.CpusetCpus}}' resource-test`,
          hints: [
            'Use --memory 256m for the memory limit',
            'Set --memory-swap equal to --memory to disable swap',
            'Use --cpuset-cpus "0,1" to pin to cores 0 and 1',
            'Use HostConfig fields in inspect format strings',
          ],
        },
      },
      {
        id: 'docker-healthcheck',
        title: 'Health Checks',
        difficulty: 'intermediate',
        tags: ['docker', 'healthcheck', 'monitoring', 'reliability', 'production'],
        sections: [
          {
            heading: 'Defining Health Checks in Dockerfiles',
            content:
              'Docker health checks provide a built-in mechanism to verify that a container is not just running but actually functional and ready to serve traffic. The `HEALTHCHECK` instruction in a Dockerfile defines a command that Docker runs periodically to test the container health. The health check command should return exit code 0 for healthy, 1 for unhealthy, or 2 for reserved (not currently used). Docker tracks the results and updates the container health status accordingly: starting (during the initial period), healthy (consecutive successes), or unhealthy (consecutive failures). The health check runs inside the container, so any tools it needs must be available in the container image. Common health check commands include HTTP requests with curl or wget, database connection tests, and file existence checks. Health checks are especially important in orchestrated environments where schedulers use health status to make routing and scaling decisions.',
            code: `# Basic HTTP health check in Dockerfile
FROM nginx:latest
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \\
  CMD curl -f http://localhost/ || exit 1

# Health check for a Node.js app
FROM node:18
COPY . /app
WORKDIR /app
HEALTHCHECK --interval=15s --timeout=5s --retries=3 \\
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => { process.exit(r.statusCode === 200 ? 0 : 1); })"

# Health check for PostgreSQL
FROM postgres:15
HEALTHCHECK --interval=10s --timeout=5s --retries=5 \\
  CMD pg_isready -U postgres || exit 1

# Disable inherited health check
HEALTHCHECK NONE`,
            tip: 'Always set a start-period that is long enough for your application to fully initialize. This prevents the container from being marked unhealthy during startup.',
          },
          {
            heading: 'Runtime Health Check Configuration',
            content:
              'Health checks can also be configured at runtime using the `docker run` command, which overrides any HEALTHCHECK defined in the Dockerfile. This flexibility allows you to customize health check behavior for different environments without modifying the image. The `--health-cmd` flag specifies the command to run. The `--health-interval` flag sets the time between checks, defaulting to 30 seconds. The `--health-timeout` flag sets the maximum time a check can take before being considered failed. The `--health-retries` flag sets how many consecutive failures are needed to mark the container as unhealthy. The `--health-start-period` flag provides a grace period during startup where failures do not count toward the retry limit. You can also disable health checks with `--no-healthcheck`. These runtime options provide the same functionality as the Dockerfile instruction but offer greater flexibility for deployment-specific configurations.',
            code: `# Runtime health check configuration
docker run -d --name my-web \\
  --health-cmd "curl -f http://localhost:8080/health || exit 1" \\
  --health-interval 15s \\
  --health-timeout 5s \\
  --health-retries 3 \\
  --health-start-period 30s \\
  my-app

# Disable health check at runtime
docker run -d --no-healthcheck my-app

# Check health status
docker inspect --format '{{.State.Health.Status}}' my-web

# View health check logs
docker inspect --format '{{range .State.Health.Log}}{{.Output}}{{end}}' my-web

# Check last health check result
docker inspect --format '{{json .State.Health}}' my-web | jq`,
            warning: 'Health check commands run inside the container. Make sure any tools like curl, wget, or pg_isready are installed in your image.',
          },
          {
            heading: 'Health Check Patterns and Best Practices',
            content:
              'Effective health checks go beyond simple process monitoring to verify actual application functionality. A good health check tests the critical path of your application. For web servers, this means making an HTTP request to a health endpoint. For databases, it means verifying the ability to execute a query. For message queue consumers, it might mean checking that the consumer is connected and processing messages. Avoid health checks that are too expensive or slow, as they run frequently and consume resources. Create a dedicated lightweight health endpoint in your application that checks essential dependencies without performing heavy operations. In Docker Compose, health checks integrate with the `depends_on` condition feature, allowing you to delay starting dependent services until their dependencies are healthy. In Swarm mode and Kubernetes, health status directly affects load balancing and container replacement decisions.',
            code: `# Docker Compose with health check dependency
# docker-compose.yml
# services:
#   db:
#     image: postgres:15
#     healthcheck:
#       test: ["CMD-SHELL", "pg_isready -U postgres"]
#       interval: 10s
#       timeout: 5s
#       retries: 5
#   app:
#     build: .
#     depends_on:
#       db:
#         condition: service_healthy

# Multi-dependency health check script
# healthcheck.sh
#!/bin/bash
# Check web server
curl -sf http://localhost:8080/health > /dev/null || exit 1
# Check database connection
pg_isready -h db -U app > /dev/null 2>&1 || exit 1
# Check cache connection
redis-cli -h cache ping > /dev/null 2>&1 || exit 1
echo "All checks passed"
exit 0

# List containers with health status
docker ps --format "table {{.Names}}\t{{.Status}}"`,
            analogy: 'Health checks are like a doctor taking vital signs. A running container is like a patient with a heartbeat. But just because the heart is beating does not mean the patient is well. Health checks test actual functionality to determine if the container is truly operational.',
          },
        ],
        quiz: [
          {
            question: 'What exit code should a health check command return to indicate the container is healthy?',
            options: ['1', '0', '2', '-1'],
            correctIndex: 1,
            explanation: 'Exit code 0 indicates healthy, exit code 1 indicates unhealthy, and exit code 2 is reserved for future use.',
          },
          {
            question: 'What are the three health states a container can be in?',
            options: [
              'running, stopped, paused',
              'starting, healthy, unhealthy',
              'up, down, degraded',
              'active, inactive, failed',
            ],
            correctIndex: 1,
            explanation: 'Docker containers with health checks cycle through starting (during start-period), healthy (consecutive successes), and unhealthy (consecutive failures reaching retries).',
          },
          {
            question: 'What does the --health-start-period flag do?',
            options: [
              'Sets the delay before the first health check runs',
              'Provides a grace period where failures do not count toward retries',
              'Determines how quickly the container should start',
              'Sets the interval between health checks during startup',
            ],
            correctIndex: 1,
            explanation: 'The start-period provides a grace period for container initialization during which health check failures do not count toward the maximum retries.',
          },
        ],
      },
      {
        id: 'docker-commit-export',
        title: 'docker commit & export',
        difficulty: 'intermediate',
        tags: ['docker', 'commit', 'export', 'import', 'image-creation'],
        sections: [
          {
            heading: 'Creating Images with docker commit',
            content:
              'The `docker commit` command creates a new image from a container\'s changes. When you modify a running or stopped container by installing software, creating files, or making configuration changes, those modifications exist only in the container\'s writable layer. The `docker commit` command captures these changes into a new image layer. This can be useful for quick prototyping, debugging, or saving the state of a container after manual configuration. However, committing containers is generally discouraged for production use because it creates opaque, unreproducible images. Unlike Dockerfiles, committed images do not have a clear record of what changes were made, making them difficult to audit, update, and maintain. The command supports options for setting the author, commit message, and modifying the image configuration such as the CMD, ENTRYPOINT, and environment variables.',
            code: `# Basic commit
docker commit my-container my-new-image:v1

# Commit with author and message
docker commit -a "John Doe" -m "Added Python packages" my-container my-app:configured

# Commit with configuration changes
docker commit --change 'CMD ["python", "app.py"]' my-container my-app:v2

# Commit with multiple changes
docker commit \\
  --change 'ENV APP_ENV=production' \\
  --change 'EXPOSE 8080' \\
  --change 'CMD ["./start.sh"]' \\
  my-container my-app:v3

# Pause container during commit (default)
docker commit --pause=true my-container snapshot:latest

# View commit history
docker history my-new-image:v1`,
            warning: 'Avoid using docker commit for production images. Always use Dockerfiles for reproducible, auditable, and maintainable image builds.',
          },
          {
            heading: 'Exporting and Importing Containers',
            content:
              'Docker provides export and import commands for transferring container filesystems as tar archives. The `docker export` command exports a container\'s entire filesystem as a flat tar archive, which can then be imported as a new image with `docker import`. This is different from `docker save` and `docker load`, which work with images and preserve all layers and metadata. The export/import workflow flattens all layers into a single layer, losing the layer history, metadata, and Dockerfile instructions. This can be useful for reducing image size by eliminating intermediate layers, or for transferring container content to systems that are not Docker. The exported tar contains the complete filesystem of the container at the time of export. You can also use `docker import` to create images from any tar archive, not just those created by `docker export`, which can be useful for creating base images from existing filesystem archives.',
            code: `# Export container filesystem to tar
docker export my-container > container-fs.tar

# Export to a specific file
docker export -o backup.tar my-container

# Import as a new image
docker import container-fs.tar my-imported-image:v1

# Import with changes
docker import --change 'CMD ["/bin/bash"]' container-fs.tar my-base:v1

# Compare with save/load (image-level)
docker save -o image-backup.tar my-image:latest
docker load -i image-backup.tar

# Flatten image layers using export/import
docker create --name temp my-multi-layer-image
docker export temp | docker import - my-flat-image:v1
docker rm temp`,
            note: 'docker export/import works with containers and flattens layers. docker save/load works with images and preserves layers. Choose based on whether you need layer history.',
          },
          {
            heading: 'Save and Load for Image Transfer',
            content:
              'While `docker export` works with containers, `docker save` and `docker load` work with images and are the preferred method for transferring complete images between Docker hosts. The `docker save` command creates a tar archive containing all layers, tags, and metadata of one or more images. This is essential for air-gapped environments where you cannot pull images from a registry, or for moving images between Docker hosts without a shared registry. The `docker load` command restores images from a tar archive created by `docker save`, preserving the complete layer structure and all tags. You can save multiple images into a single archive and compress the archive with gzip for more efficient transfer. For large-scale image distribution, a private registry is more practical, but save/load remains invaluable for specific scenarios like initial provisioning or transferring images across network boundaries.',
            code: `# Save an image to tar
docker save -o nginx-backup.tar nginx:latest

# Save multiple images
docker save -o app-stack.tar nginx:latest redis:7 postgres:15

# Compress while saving
docker save my-app:v1 | gzip > my-app-v1.tar.gz

# Load an image from tar
docker load -i nginx-backup.tar

# Load from compressed archive
docker load < my-app-v1.tar.gz

# Transfer image between hosts via SSH
docker save my-app:v1 | ssh user@remote-host docker load

# List images in a tar file
tar -tf nginx-backup.tar | head -20`,
            tip: 'Use docker save/load instead of export/import when you need to preserve image layers, history, and tags. This is the correct method for transferring images between hosts.',
          },
        ],
      },
      {
        id: 'docker-debugging',
        title: 'Debugging Containers',
        difficulty: 'intermediate',
        tags: ['docker', 'debugging', 'troubleshooting', 'logs', 'events', 'stats'],
        sections: [
          {
            heading: 'Systematic Debugging Approach',
            content:
              'Debugging containerized applications requires a systematic approach that leverages Docker\'s built-in tools. Start by checking the container status with `docker ps -a` to see if the container is running, exited, or in a restart loop. If the container exited, check the exit code with `docker inspect` to understand why. Common exit codes include 0 for normal exit, 1 for application error, 137 for OOM kill or SIGKILL, and 143 for SIGTERM. Next, examine the logs with `docker logs` to look for error messages or stack traces. If the container is running but misbehaving, use `docker exec` to open a shell and investigate the filesystem, processes, and network connectivity from inside the container. The `docker events` command shows a real-time stream of Docker daemon events, which can reveal issues with container creation, network attachment, or volume mounting that are not visible through other commands.',
            code: `# Step 1: Check container status
docker ps -a --filter "name=my-app"

# Step 2: Check exit code and state
docker inspect --format '{{.State.Status}} (Exit: {{.State.ExitCode}})' my-app

# Step 3: View recent logs
docker logs --tail 100 my-app

# Step 4: Check for OOM kill
docker inspect --format '{{.State.OOMKilled}}' my-app

# Step 5: View Docker events
docker events --since 1h --filter container=my-app

# Step 6: If running, exec in for investigation
docker exec -it my-app /bin/sh

# Step 7: Check processes inside container
docker exec my-app ps aux
docker top my-app`,
            tip: 'Exit code 137 means the container was killed with SIGKILL, which often indicates an OOM kill. Always check OOMKilled flag when you see this exit code.',
          },
          {
            heading: 'Network and Connectivity Debugging',
            content:
              'Network issues are among the most common problems in containerized environments. Docker provides several tools and techniques for diagnosing network connectivity. Start by checking which networks the container is attached to using `docker inspect`. Verify that DNS resolution is working by running `nslookup` or `dig` inside the container. Test connectivity between containers using `ping`, `curl`, or `wget`. If you need lower-level network debugging, you can use `tcpdump` or `nmap` either inside the container or on the host. The `docker network inspect` command shows all containers connected to a network along with their IP addresses. Check iptables rules on the host to verify that Docker has correctly configured port forwarding. For containers that cannot reach the outside world, verify that IP forwarding is enabled on the host and that the default bridge network has the correct gateway configuration.',
            code: `# Check container networks
docker inspect --format '{{json .NetworkSettings.Networks}}' my-app | jq

# Test DNS resolution from inside container
docker exec my-app nslookup api-server
docker exec my-app getent hosts api-server

# Test connectivity
docker exec my-app ping -c 3 other-container
docker exec my-app curl -s http://backend:8080/health

# Install debugging tools in running container
docker exec -u root my-app apt-get update && apt-get install -y iputils-ping dnsutils curl

# Inspect network details
docker network inspect bridge

# Check port bindings
docker port my-app

# Use a debug container on the same network
docker run -it --rm --network container:my-app nicolaka/netshoot`,
            warning: 'The nicolaka/netshoot image is a purpose-built debugging container with networking tools pre-installed. Never install debugging tools in production images.',
          },
          {
            heading: 'Advanced Debugging Techniques',
            content:
              'When standard debugging approaches are insufficient, Docker offers advanced techniques for deeper investigation. The `docker diff` command shows filesystem changes made to a container compared to its image, which is useful for detecting unexpected file modifications. The `docker stats` command provides real-time resource usage metrics. For lower-level debugging, you can use the container PID to access its namespace from the host using `nsenter`. Docker events can be filtered by event type, container, image, and other attributes to narrow down specific issues. The `docker system df` command shows Docker disk usage, which helps diagnose disk space issues. For debugging image build issues, use `docker build` with `--progress plain` for verbose output. In scenarios where a container crashes immediately on start, try overriding the entrypoint with a shell to investigate the environment before the application starts.',
            code: `# View filesystem changes
docker diff my-container

# Resource usage snapshot
docker stats --no-stream my-container

# Override entrypoint for debugging
docker run -it --entrypoint /bin/sh my-crashing-image

# Access container namespace from host
PID=$(docker inspect --format '{{.State.Pid}}' my-container)
nsenter -t $PID -n ip addr

# Docker system disk usage
docker system df -v

# Filter events by type
docker events --filter event=die --filter event=oom

# Inspect image layers
docker history --no-trunc my-image:latest

# Check Docker daemon logs
journalctl -u docker.service --since "1 hour ago"

# Trace system calls (requires privileges)
docker run --rm -it --pid=container:my-app --cap-add SYS_PTRACE ubuntu strace -p 1`,
            analogy: 'Debugging containers is like detective work. You gather evidence from multiple sources: logs tell you what the application reported, inspect reveals the configuration, events show system-level activity, and exec lets you investigate the crime scene firsthand.',
          },
        ],
        challenge: {
          prompt: 'A container named "broken-app" keeps restarting. Write the commands to diagnose the issue step by step: check its status, inspect exit code, check for OOM kill, view logs, and check Docker events.',
          starterCode: `# Step 1: Check container status and restart count
# ADD COMMAND

# Step 2: Get the exit code
# ADD COMMAND

# Step 3: Check if OOM killed
# ADD COMMAND

# Step 4: View the last 50 log lines
# ADD COMMAND

# Step 5: Check Docker events for this container in last hour
# ADD COMMAND`,
          solutionCode: `# Step 1: Check container status and restart count
docker inspect --format 'Status: {{.State.Status}}, Restarts: {{.RestartCount}}' broken-app

# Step 2: Get the exit code
docker inspect --format 'Exit Code: {{.State.ExitCode}}' broken-app

# Step 3: Check if OOM killed
docker inspect --format 'OOM Killed: {{.State.OOMKilled}}' broken-app

# Step 4: View the last 50 log lines
docker logs --tail 50 broken-app

# Step 5: Check Docker events for this container in last hour
docker events --since 1h --filter container=broken-app`,
          hints: [
            'Use docker inspect with --format to extract specific fields',
            'The State object contains Status, ExitCode, OOMKilled, and RestartCount',
            'Use docker logs --tail N to limit output',
            'Use docker events --since and --filter for targeted event viewing',
          ],
        },
      },
    ],
  },
  {
    id: 'docker-networking',
    title: 'Networking',
    icon: '🌐',
    entries: [
      {
        id: 'docker-network-overview',
        title: 'Docker Networking Overview',
        difficulty: 'intermediate',
        tags: ['docker', 'networking', 'bridge', 'overlay', 'host', 'macvlan'],
        sections: [
          {
            heading: 'Docker Network Drivers',
            content:
              'Docker implements a pluggable networking architecture through network drivers. Each driver provides different capabilities and trade-offs suited to different use cases. The `bridge` driver is the default and creates an isolated network on the Docker host using a Linux bridge. The `host` driver removes network isolation and the container shares the host\'s network stack directly. The `overlay` driver creates a distributed network across multiple Docker daemon hosts, essential for Docker Swarm services. The `macvlan` driver assigns a MAC address to each container, making it appear as a physical device on the network. The `none` driver disables all networking for a container. Understanding when to use each driver is fundamental to designing Docker-based architectures. Most standalone applications use bridge networks, while multi-host deployments use overlay networks for inter-service communication.',
            code: `# List available networks
docker network ls

# Create a bridge network
docker network create my-app-network

# Create with specific subnet
docker network create --subnet 172.20.0.0/16 custom-net

# Inspect a network
docker network inspect bridge

# Run container on specific network
docker run -d --network my-app-network --name web nginx

# Connect running container to a network
docker network connect my-app-network existing-container

# Disconnect from a network
docker network disconnect bridge my-container

# Remove a network
docker network rm my-app-network`,
            note: 'You cannot remove a network while containers are connected to it. Disconnect or stop all containers first.',
          },
          {
            heading: 'Network Architecture Overview',
            content:
              'Docker networking is built on top of several Linux kernel features including network namespaces, virtual ethernet pairs (veth), Linux bridges, and iptables rules. When Docker starts, it creates a default bridge network called `bridge` (also known as `docker0`). Each container gets its own network namespace with a virtual ethernet interface that is connected to the bridge through a veth pair. The bridge acts as a virtual switch, allowing containers on the same bridge to communicate. For external connectivity, Docker configures iptables rules for NAT (Network Address Translation) and port forwarding. Understanding this architecture helps you troubleshoot network issues and design appropriate network topologies. Docker also runs an embedded DNS server on user-defined networks that resolves container names to IP addresses, enabling service discovery without external tools.',
            code: `# View the docker0 bridge on the host
ip addr show docker0

# List veth pairs
ip link show type veth

# View iptables rules created by Docker
sudo iptables -t nat -L -n -v

# View container network namespace
docker inspect --format '{{.NetworkSettings.SandboxKey}}' my-container

# Check Docker network configuration
docker info | grep -i network

# Create network with custom driver options
docker network create \\
  --driver bridge \\
  --opt com.docker.network.bridge.name=custom-br0 \\
  --opt com.docker.network.bridge.enable_icc=true \\
  custom-bridge`,
            tip: 'Use user-defined bridge networks instead of the default bridge. They provide automatic DNS resolution, better isolation, and can be connected/disconnected from running containers.',
          },
          {
            heading: 'Choosing the Right Network Driver',
            content:
              'Selecting the appropriate network driver depends on your deployment requirements. For single-host development and production, user-defined bridge networks are the best choice. They provide container name resolution, network isolation between application stacks, and easy configuration. For applications that need maximum network performance and do not require isolation, the host network driver eliminates the overhead of NAT and bridging. For multi-host deployments using Docker Swarm, overlay networks enable seamless communication between services running on different nodes. Macvlan networks are useful when containers need to appear as physical hosts on the network, which is common in legacy application migration scenarios. The none driver is used for containers that should have no network access at all, which is a security measure for certain batch processing workloads. You can also connect a container to multiple networks simultaneously, which enables complex network topologies.',
            code: `# Bridge: standard isolated networking
docker network create --driver bridge app-net
docker run -d --network app-net --name api my-api

# Host: share host network stack
docker run -d --network host --name fast-app my-app

# None: no networking
docker run -d --network none --name isolated my-batch-job

# Connect container to multiple networks
docker network create frontend
docker network create backend
docker run -d --network frontend --name api my-api
docker network connect backend api

# Overlay: multi-host (requires Swarm)
docker network create --driver overlay --attachable my-overlay`,
            analogy: 'Docker network drivers are like different types of roads. Bridge networks are like local streets connecting houses in a neighborhood. Host networking is like living directly on a highway with no driveway. Overlay networks are like interstate highways connecting different cities. Macvlan is like having your own private road directly to the main highway.',
          },
        ],
        diagram: {
          kind: 'mermaid' as const,
          code: `graph TB
    subgraph Host["Docker Host"]
        subgraph Bridge["Bridge Network (docker0)"]
            C1["Container A<br/>172.17.0.2"]
            C2["Container B<br/>172.17.0.3"]
        end
        subgraph UserBridge["User-Defined Bridge"]
            C3["Container C<br/>172.18.0.2"]
            C4["Container D<br/>172.18.0.3"]
        end
        subgraph HostNet["Host Network"]
            C5["Container E<br/>Host IP"]
        end
        ETH["eth0 (Host NIC)"]
    end
    Bridge --> ETH
    UserBridge --> ETH
    C5 --> ETH
    ETH --> Internet["Internet"]`,
          caption: 'Docker network drivers: default bridge, user-defined bridge, and host networking',
        },
        quiz: [
          {
            question: 'Which network driver is the default in Docker?',
            options: ['host', 'overlay', 'bridge', 'macvlan'],
            correctIndex: 2,
            explanation: 'The bridge driver is the default network driver in Docker. When you run a container without specifying a network, it connects to the default bridge network.',
          },
          {
            question: 'Which network driver is required for multi-host communication in Docker Swarm?',
            options: ['bridge', 'host', 'macvlan', 'overlay'],
            correctIndex: 3,
            explanation: 'The overlay driver creates a distributed network across multiple Docker daemon hosts, enabling containers on different nodes to communicate as if they were on the same network.',
          },
          {
            question: 'What advantage do user-defined bridge networks have over the default bridge?',
            options: [
              'They are faster',
              'They provide automatic DNS resolution between containers',
              'They support more containers',
              'They use less memory',
            ],
            correctIndex: 1,
            explanation: 'User-defined bridge networks provide automatic DNS resolution, allowing containers to resolve each other by name. The default bridge only supports IP addresses or legacy --link.',
          },
        ],
      },
      {
        id: 'docker-bridge-network',
        title: 'Bridge Networks',
        difficulty: 'intermediate',
        tags: ['docker', 'bridge', 'networking', 'dns', 'isolation'],
        sections: [
          {
            heading: 'Default vs User-Defined Bridge Networks',
            content:
              'Docker provides two types of bridge networks: the default bridge and user-defined bridges. The default bridge network (named `bridge`) is created automatically when Docker starts. While functional, it has several limitations compared to user-defined bridges. On the default bridge, containers can only communicate via IP addresses unless you use the legacy `--link` flag. There is no automatic DNS resolution between containers. All containers on the default bridge can communicate with each other, which reduces isolation. User-defined bridge networks solve all of these problems. Containers on a user-defined bridge can resolve each other by container name. They provide better isolation because only containers explicitly connected to the network can communicate. Containers can be connected and disconnected from user-defined networks without restarting them. For these reasons, Docker recommends always using user-defined bridges for application networking.',
            code: `# Default bridge - containers use IP addresses
docker run -d --name db-default postgres:15
docker run -d --name app-default my-app
# app-default must use IP to reach db-default

# User-defined bridge - containers use names
docker network create app-net
docker run -d --network app-net --name db postgres:15
docker run -d --network app-net --name app my-app
# app can reach db using hostname "db"

# Verify DNS resolution
docker exec app ping -c 2 db

# Compare network settings
docker inspect bridge | jq '.[0].Options'
docker inspect app-net | jq '.[0].Options'`,
            tip: 'Never rely on the default bridge network for inter-container communication. Always create a user-defined bridge and connect your containers to it.',
          },
          {
            heading: 'Configuring Bridge Networks',
            content:
              'User-defined bridge networks support extensive configuration options that control IP addressing, gateway settings, and network behavior. You can specify custom subnets and gateways using the `--subnet` and `--gateway` flags. The `--ip-range` flag limits the pool of IPs assigned to containers, useful when you need some addresses reserved for static assignment. You can assign static IP addresses to containers using the `--ip` flag when running them on a user-defined network. Network-level options can be set with `--opt`, including the bridge name, MTU, and inter-container connectivity. Labels help organize and manage networks in larger deployments. You can also configure the network to use an existing Linux bridge with the `com.docker.network.bridge.name` option. These configuration options give you fine-grained control over network topology and addressing.',
            code: `# Create network with custom subnet
docker network create \\
  --subnet 10.10.0.0/24 \\
  --gateway 10.10.0.1 \\
  --ip-range 10.10.0.128/25 \\
  my-custom-net

# Run container with static IP
docker run -d --network my-custom-net --ip 10.10.0.10 --name static-web nginx

# Create with custom MTU
docker network create --opt com.docker.network.bridge.mtu=9000 jumbo-net

# Create with labels
docker network create --label project=myapp --label env=dev dev-net

# List networks with filters
docker network ls --filter label=project=myapp

# Inspect subnet configuration
docker network inspect --format '{{range .IPAM.Config}}{{.Subnet}}{{end}}' my-custom-net`,
            note: 'Static IP assignment only works on user-defined networks, not on the default bridge. Plan your subnet size to accommodate all expected containers.',
          },
          {
            heading: 'Multi-Network Container Architectures',
            content:
              'Containers can be connected to multiple networks simultaneously, which enables sophisticated network architectures. A common pattern is to create separate frontend and backend networks. Web-facing containers connect to the frontend network for public access and to the backend network for communicating with databases and internal services. The database containers connect only to the backend network, making them unreachable from the frontend. This provides network-level segmentation without firewall rules. Another pattern is to create a shared network for common services like logging and monitoring, with application-specific networks for individual stacks. When a container is connected to multiple networks, Docker creates separate network interfaces inside the container, one for each network. The container can resolve hostnames and communicate with other containers on any of its attached networks independently.',
            code: `# Create frontend and backend networks
docker network create frontend
docker network create backend

# Database only on backend
docker run -d --network backend --name db postgres:15

# API server on both networks
docker run -d --network backend --name api my-api
docker network connect frontend api

# Web server only on frontend
docker run -d --network frontend --name web nginx

# Verify: web can reach api but NOT db
docker exec web ping -c 1 api     # succeeds
docker exec web ping -c 1 db      # fails

# Verify: api can reach both
docker exec api ping -c 1 db      # succeeds
docker exec api ping -c 1 web     # succeeds

# View all networks for a container
docker inspect --format '{{range $k, $v := .NetworkSettings.Networks}}{{$k}} {{end}}' api`,
            analogy: 'Multi-network architectures are like building zones in a city. The frontend network is the public commercial zone where customers can visit. The backend network is the restricted industrial zone. The API server sits at the boundary like a reception desk, accessible from both zones, while the database stays securely in the restricted zone.',
          },
        ],
        quiz: [
          {
            question: 'Can containers on the default bridge network resolve each other by name?',
            options: [
              'Yes, always',
              'No, only user-defined bridges support DNS resolution',
              'Yes, but only if you enable DNS',
              'Yes, using the --dns flag',
            ],
            correctIndex: 1,
            explanation: 'The default bridge network does not provide automatic DNS resolution. Containers must use IP addresses or the legacy --link flag. User-defined bridges provide DNS resolution by container name.',
          },
          {
            question: 'What happens when you connect a container to a second network?',
            options: [
              'It disconnects from the first network',
              'An error is thrown',
              'A new network interface is created in the container',
              'The container restarts',
            ],
            correctIndex: 2,
            explanation: 'When connecting to a second network, Docker creates an additional network interface inside the container. The container maintains connections to both networks simultaneously.',
          },
          {
            question: 'Which flag assigns a static IP to a container on a user-defined network?',
            options: ['--static-ip', '--ip', '--address', '--ipv4'],
            correctIndex: 1,
            explanation: 'The --ip flag assigns a specific IPv4 address to a container when running it on a user-defined network.',
          },
        ],
      },
      {
        id: 'docker-host-network',
        title: 'Host Networking',
        difficulty: 'intermediate',
        tags: ['docker', 'host-network', 'performance', 'networking'],
        sections: [
          {
            heading: 'Understanding Host Network Mode',
            content:
              'The host network mode removes network isolation between the container and the Docker host. When a container uses `--network host`, it shares the host\'s network namespace directly, meaning it uses the host\'s IP address and port space. There is no NAT, no bridge, and no virtual ethernet pair. The container\'s network stack is identical to the host\'s. This means if your application listens on port 8080, it is directly accessible on the host\'s port 8080 without any port mapping. The `-p` flag is ignored in host network mode because the container already shares the host\'s ports. Host networking provides the best network performance because it eliminates all the overhead of network virtualization. However, it comes with significant trade-offs: reduced isolation, potential port conflicts, and reduced portability. Host networking is only available on Linux; on Docker Desktop for Mac and Windows, host networking behaves differently due to the Linux VM layer.',
            code: `# Run container with host networking
docker run -d --network host --name fast-web nginx

# No port mapping needed - nginx listens on host port 80
curl http://localhost:80

# -p flag is ignored with host network
docker run -d --network host -p 9090:80 nginx
# Warning: port mapping is ignored in host mode

# Verify the container shares host network
docker exec fast-web hostname -I
# Shows the same IPs as the host

# Check network mode
docker inspect --format '{{.HostConfig.NetworkMode}}' fast-web
# Output: host

# Compare network interfaces
docker exec fast-web ip addr
# Shows the same interfaces as the host`,
            warning: 'Host networking bypasses Docker network isolation entirely. The container can see and access all host network interfaces, services, and ports. Use with caution in production.',
          },
          {
            heading: 'Performance Benefits and Trade-offs',
            content:
              'The primary advantage of host networking is performance. By eliminating the network bridge, NAT translation, and veth pair overhead, host networking can provide significantly lower latency and higher throughput compared to bridge networking. This makes it suitable for applications that are extremely sensitive to network performance, such as high-frequency trading systems, real-time streaming servers, or network monitoring tools that need to capture traffic on host interfaces. The performance difference is most noticeable for high-throughput, low-latency workloads with many small packets. For typical web applications, the performance difference may be negligible. The trade-offs include loss of network isolation, port conflicts between containers and host services, inability to use Docker DNS for service discovery, and reduced portability since the application depends on the host network configuration.',
            code: `# Performance-sensitive application
docker run -d --network host --name metrics-collector prometheus

# Network monitoring tool
docker run -d --network host --name monitor tcpdump -i eth0

# Benchmark comparison: bridge vs host
# Bridge network
docker run -d --name bench-bridge -p 8080:80 nginx
# Host network
docker run -d --network host --name bench-host nginx

# Check latency difference
time curl -s http://localhost:8080 > /dev/null  # bridge
time curl -s http://localhost:80 > /dev/null    # host

# Typical use cases
docker run -d --network host --name load-balancer haproxy
docker run -d --network host --name dns-server coredns`,
            note: 'On Docker Desktop for Mac and Windows, host networking connects to the Linux VM network, not the actual host network. This limits its usefulness on non-Linux platforms.',
          },
          {
            heading: 'Managing Port Conflicts in Host Mode',
            content:
              'Since containers in host network mode share the host port space, port conflicts are a significant concern. If two containers try to bind to the same port, the second one will fail to start. You must carefully plan port assignments when using host networking. Unlike bridge mode where each container has its own port space and you map specific ports, host mode requires that every service uses a unique port. This also means you cannot run multiple instances of the same application on the same host unless the application supports configuring its listening port. To mitigate port conflicts, use environment variables to configure application ports, document all port assignments, and consider using bridge networking for applications where port isolation is more important than performance. For applications that need to listen on many ports dynamically, host networking avoids the overhead of managing large port mapping configurations.',
            code: `# Port conflict example
docker run -d --network host --name web1 nginx  # Uses port 80
docker run -d --network host --name web2 nginx  # FAILS - port 80 in use

# Solution: configure different ports
docker run -d --network host -e NGINX_PORT=8080 --name web1 my-nginx
docker run -d --network host -e NGINX_PORT=8081 --name web2 my-nginx

# Check what ports are in use on host
ss -tlnp

# Find which container uses a port
docker ps --format '{{.Names}}: {{.Ports}}'

# Use bridge when you need multiple instances
docker run -d -p 8080:80 --name web1 nginx
docker run -d -p 8081:80 --name web2 nginx
docker run -d -p 8082:80 --name web3 nginx`,
            tip: 'Use host networking only when performance is critical and you can guarantee port uniqueness. For most applications, user-defined bridge networks with port mapping provide a better balance of performance and isolation.',
          },
        ],
      },
      {
        id: 'docker-overlay-network',
        title: 'Overlay Networks',
        difficulty: 'advanced',
        tags: ['docker', 'overlay', 'swarm', 'multi-host', 'distributed'],
        sections: [
          {
            heading: 'Multi-Host Networking with Overlay',
            content:
              'Overlay networks enable communication between containers running on different Docker hosts, which is essential for distributed applications. The overlay driver creates a distributed network that sits on top of the host-specific networks, using VXLAN (Virtual Extensible LAN) encapsulation to tunnel container traffic between hosts. Each overlay network creates its own virtual subnet, and containers on the overlay can communicate using container names regardless of which host they are running on. Overlay networks require a key-value store for distributed state management, which is provided automatically by Docker Swarm. When using Docker Swarm, overlay network creation and management is handled transparently. For standalone containers that are not part of a Swarm service, you must create the overlay with the `--attachable` flag to allow them to connect. Overlay networking adds some latency due to encapsulation overhead, but it provides seamless multi-host connectivity.',
            code: `# Initialize Docker Swarm (required for overlay)
docker swarm init

# Create an overlay network
docker network create --driver overlay my-overlay

# Create attachable overlay (for standalone containers)
docker network create --driver overlay --attachable my-attachable-overlay

# Deploy a service on the overlay
docker service create --name web --network my-overlay --replicas 3 nginx

# Create overlay with custom settings
docker network create \\
  --driver overlay \\
  --subnet 10.0.9.0/24 \\
  --gateway 10.0.9.1 \\
  --opt encrypted \\
  secure-overlay

# Inspect overlay network
docker network inspect my-overlay

# List services on a network
docker network inspect --format '{{range .Services}}{{.Name}} {{end}}' my-overlay`,
            note: 'Overlay networks require Docker Swarm mode to be enabled. Initialize a Swarm with docker swarm init before creating overlay networks.',
          },
          {
            heading: 'Overlay Network Encryption and Security',
            content:
              'By default, overlay network traffic between hosts is not encrypted, which means it could potentially be intercepted. Docker supports IPsec encryption for overlay networks using the `--opt encrypted` flag. When encryption is enabled, Docker automatically manages IPsec tunnels between all nodes participating in the overlay network. This ensures that all data in transit between Docker hosts is encrypted, which is critical for sensitive workloads and compliance requirements. The encryption adds some CPU overhead and latency, so it should be used when security requirements warrant it. You can also control which nodes can join the overlay network through Swarm join tokens and TLS certificates. Docker Swarm uses mutual TLS for control plane communication between nodes, and the encryption option extends this protection to the data plane. For maximum security, combine overlay encryption with application-level encryption.',
            code: `# Create encrypted overlay network
docker network create --driver overlay --opt encrypted secure-net

# Deploy service on encrypted network
docker service create \\
  --name secure-api \\
  --network secure-net \\
  --replicas 3 \\
  my-api:latest

# Rotate Swarm encryption keys
docker swarm update --autolock-managers

# View Swarm CA certificate info
docker swarm ca --rotate

# Check if encryption is enabled
docker network inspect --format '{{.Options}}' secure-net

# Use multiple overlay networks for segmentation
docker network create --driver overlay --opt encrypted frontend-overlay
docker network create --driver overlay --opt encrypted backend-overlay`,
            warning: 'Overlay encryption uses IPsec which adds CPU overhead. Benchmark your workloads to ensure acceptable performance before enabling in production.',
          },
          {
            heading: 'Service Discovery in Overlay Networks',
            content:
              'Docker Swarm provides built-in service discovery and load balancing for services deployed on overlay networks. When you create a Swarm service, Docker assigns it a virtual IP (VIP) that is stable across the service lifetime. DNS queries for the service name resolve to this VIP, and Docker load-balances requests across all healthy tasks of the service. This is called VIP-based routing. Alternatively, you can use DNS round-robin mode with `--endpoint-mode dnsrr`, where DNS queries return the individual IP addresses of all tasks. The ingress network is a special overlay network that handles external traffic routing to services through the Swarm routing mesh. Any node in the Swarm can accept traffic for any published port, and the routing mesh forwards it to a node running the service. This eliminates the need for external load balancers in many scenarios and simplifies service deployment significantly.',
            code: `# Create service with VIP load balancing (default)
docker service create --name api --network my-overlay --replicas 5 my-api

# Create service with DNS round-robin
docker service create --name workers \\
  --network my-overlay \\
  --endpoint-mode dnsrr \\
  --replicas 10 \\
  my-worker

# Test service discovery
docker exec <container-id> nslookup api
# Returns the VIP address

docker exec <container-id> nslookup tasks.api
# Returns individual task IPs

# Publish port through routing mesh
docker service create --name web --publish 80:80 --replicas 3 nginx

# Bypass routing mesh (host mode publishing)
docker service create --name web \\
  --publish mode=host,target=80,published=80 \\
  --mode global \\
  nginx`,
            tip: 'Use tasks.<service-name> to resolve individual task IPs instead of the VIP. This is useful for debugging and for applications that need to connect to specific instances.',
          },
        ],
        challenge: {
          prompt: 'Set up a Docker Swarm with an encrypted overlay network and deploy two services (web and api) on it. The web service should be accessible on port 80 and have 3 replicas.',
          starterCode: `# Initialize Swarm
# ADD COMMAND

# Create encrypted overlay network
# ADD COMMAND

# Deploy api service (2 replicas)
# ADD COMMAND

# Deploy web service (3 replicas, published on port 80)
# ADD COMMAND

# Verify services and network
# ADD COMMANDS`,
          solutionCode: `# Initialize Swarm
docker swarm init

# Create encrypted overlay network
docker network create --driver overlay --opt encrypted app-overlay

# Deploy api service (2 replicas)
docker service create --name api --network app-overlay --replicas 2 my-api

# Deploy web service (3 replicas, published on port 80)
docker service create --name web --network app-overlay --replicas 3 --publish 80:80 nginx

# Verify services and network
docker service ls
docker network inspect app-overlay
docker service ps web`,
          hints: [
            'Initialize Swarm first with docker swarm init',
            'Use --opt encrypted on the overlay network',
            'Use --publish 80:80 to expose the web service',
            'Both services must be on the same overlay network',
          ],
        },
      },
      {
        id: 'docker-dns',
        title: 'Docker DNS',
        difficulty: 'intermediate',
        tags: ['docker', 'dns', 'service-discovery', 'hostname', 'networking'],
        sections: [
          {
            heading: 'Docker Embedded DNS Server',
            content:
              'Docker includes an embedded DNS server that provides automatic service discovery for containers on user-defined networks. This DNS server runs at the special IP address 127.0.0.11 inside each container. When a container makes a DNS query, it first goes to the embedded DNS server, which resolves container names, service names, and network aliases. If the embedded DNS cannot resolve the query, it forwards the request to the external DNS servers configured for the container. This automatic DNS resolution is one of the most important features of user-defined networks and is the primary reason to use them over the default bridge network. Container names, network aliases, and Swarm service names are all resolvable through this mechanism. The embedded DNS server supports both forward and reverse lookups, and responses include appropriate TTL values to handle containers that are frequently created and destroyed.',
            code: `# DNS is automatic on user-defined networks
docker network create app-net
docker run -d --network app-net --name database postgres:15
docker run -d --network app-net --name api my-api

# api can resolve "database" by name
docker exec api nslookup database
# Server:    127.0.0.11
# Address:   127.0.0.11#53
# Name:      database
# Address:   172.18.0.2

# Check DNS server address inside container
docker exec api cat /etc/resolv.conf
# nameserver 127.0.0.11

# DNS does NOT work on default bridge
docker run -d --name test1 nginx
docker run -d --name test2 nginx
docker exec test2 nslookup test1  # FAILS`,
            tip: 'The embedded DNS server at 127.0.0.11 only works on user-defined networks. On the default bridge network, /etc/resolv.conf points to the host DNS servers instead.',
          },
          {
            heading: 'Network Aliases and Custom Hostnames',
            content:
              'Docker provides several ways to customize how containers are discovered via DNS. Network aliases allow a container to be reachable by multiple names on a specific network. This is useful for creating abstract service names that decouple container naming from service discovery. The `--hostname` flag sets the container\'s internal hostname, which is returned by the `hostname` command inside the container. The `--domainname` flag sets the container\'s domain name, forming a fully qualified domain name. Multiple containers can share the same network alias, in which case DNS queries return all their IP addresses in round-robin fashion, providing basic load balancing. The `--dns` flag adds custom DNS servers, and `--dns-search` adds search domains. These customization options provide flexible service discovery that adapts to various architectural patterns and naming conventions.',
            code: `# Set network alias
docker run -d --network app-net --network-alias db-primary --name postgres1 postgres:15

# Multiple aliases
docker run -d --network app-net \\
  --network-alias cache \\
  --network-alias session-store \\
  --name redis1 redis:7

# Multiple containers sharing an alias (round-robin DNS)
docker run -d --network app-net --network-alias web-pool --name web1 nginx
docker run -d --network app-net --network-alias web-pool --name web2 nginx
docker run -d --network app-net --network-alias web-pool --name web3 nginx

# Resolve shared alias - returns multiple IPs
docker exec api nslookup web-pool

# Set hostname and domain
docker run -d --hostname api-server --domainname example.com --name api my-api
docker exec api hostname -f
# api-server.example.com

# Custom DNS servers
docker run -d --dns 8.8.8.8 --dns 8.8.4.4 --dns-search example.com my-app`,
            note: 'Network aliases are scoped to a specific network. A container can have different aliases on different networks it is connected to.',
          },
          {
            heading: 'DNS Configuration and Troubleshooting',
            content:
              'When DNS resolution issues occur in Docker environments, a systematic troubleshooting approach is essential. Start by verifying that the container is on a user-defined network, as DNS resolution does not work on the default bridge. Check `/etc/resolv.conf` inside the container to confirm that the nameserver is 127.0.0.11. Use `nslookup` or `dig` to test resolution of container names. If external DNS is not working, verify that the container can reach external DNS servers and that the host firewall is not blocking DNS traffic. Docker daemon DNS configuration in `/etc/docker/daemon.json` allows you to set default DNS servers for all containers. The `--dns` and `--dns-opt` flags on `docker run` can override these defaults per container. For custom DNS configurations, you can add extra hosts with `--add-host` which adds entries to `/etc/hosts` inside the container, bypassing DNS entirely for specific hostnames.',
            code: `# Check DNS configuration inside container
docker exec my-app cat /etc/resolv.conf

# Test DNS resolution
docker exec my-app nslookup google.com
docker exec my-app nslookup other-container

# Add custom host entries
docker run -d --add-host myhost:192.168.1.100 \\
  --add-host api.internal:10.0.0.5 \\
  my-app

# Verify /etc/hosts entries
docker exec my-app cat /etc/hosts

# Configure daemon-level DNS (/etc/docker/daemon.json)
# {
#   "dns": ["8.8.8.8", "8.8.4.4"],
#   "dns-search": ["example.com"]
# }

# Debug DNS with verbose dig
docker exec my-app dig +trace google.com

# Check if DNS port is accessible
docker exec my-app nc -zv 127.0.0.11 53`,
            warning: 'Changes to /etc/docker/daemon.json require restarting the Docker daemon to take effect. This will restart all running containers unless live-restore is enabled.',
          },
        ],
        quiz: [
          {
            question: 'What IP address does Docker embedded DNS server listen on?',
            options: ['127.0.0.1', '127.0.0.11', '172.17.0.1', '10.0.0.1'],
            correctIndex: 1,
            explanation: 'Docker embedded DNS server listens on 127.0.0.11 inside each container on user-defined networks. This is a special address reserved by Docker.',
          },
          {
            question: 'What happens when multiple containers share the same network alias?',
            options: [
              'An error is thrown',
              'Only the last container gets the alias',
              'DNS returns all their IPs in round-robin fashion',
              'The first container gets priority',
            ],
            correctIndex: 2,
            explanation: 'When multiple containers share a network alias, DNS queries return all their IP addresses in round-robin fashion, providing basic load balancing.',
          },
          {
            question: 'How do you add a custom entry to a container /etc/hosts file?',
            options: ['--dns', '--hostname', '--add-host', '--extra-hosts'],
            correctIndex: 2,
            explanation: 'The --add-host flag adds entries to the container /etc/hosts file in the format hostname:IP, bypassing DNS for those specific hostnames.',
          },
        ],
      },
      {
        id: 'docker-port-mapping',
        title: 'Port Mapping Deep Dive',
        difficulty: 'intermediate',
        tags: ['docker', 'ports', 'mapping', 'iptables', 'networking', 'publishing'],
        sections: [
          {
            heading: 'Port Publishing Syntax',
            content:
              'Port mapping (or port publishing) is how Docker makes container services accessible from outside the container network. The `-p` or `--publish` flag maps a port on the host to a port in the container. The basic syntax is `-p hostPort:containerPort`. Docker supports several variations of this syntax for different use cases. You can specify the host IP to bind to with `-p hostIP:hostPort:containerPort`, which is important for multi-homed hosts or for restricting access. Omitting the host port with `-p containerPort` tells Docker to assign a random available host port. You can also specify the protocol with `-p hostPort:containerPort/udp` for UDP ports. The `--publish-all` or `-P` flag publishes all ports that are exposed in the Dockerfile\'s EXPOSE instruction, mapping each to a random host port. Understanding these variations gives you precise control over how your containerized services are accessible.',
            code: `# Basic port mapping
docker run -d -p 8080:80 nginx
# Access at http://localhost:8080

# Map to specific host IP
docker run -d -p 127.0.0.1:8080:80 nginx
# Only accessible from localhost

# Random host port
docker run -d -p 80 nginx
docker port $(docker ps -q -l) 80
# Shows assigned random port

# Map multiple ports
docker run -d -p 8080:80 -p 8443:443 nginx

# UDP port mapping
docker run -d -p 53:53/udp my-dns-server

# Both TCP and UDP
docker run -d -p 53:53/tcp -p 53:53/udp my-dns-server

# Publish all exposed ports
docker run -d -P nginx

# Map a range of ports
docker run -d -p 8000-8010:8000-8010 my-app`,
            tip: 'Bind to 127.0.0.1 when a port should only be accessible locally. By default, Docker binds to 0.0.0.0, making the port accessible from any network interface.',
          },
          {
            heading: 'How Port Mapping Works Internally',
            content:
              'Under the hood, Docker implements port mapping using iptables rules on Linux. When you publish a port, Docker adds NAT rules in the PREROUTING and OUTPUT chains to redirect incoming traffic on the host port to the container IP and port. Docker also adds rules in the DOCKER chain to accept traffic destined for the container. The `docker-proxy` process is also started for each published port, providing a userland fallback for traffic that does not go through the kernel iptables path, such as traffic from the host to the container via 127.0.0.1. Understanding this mechanism helps you troubleshoot port mapping issues and understand the security implications. The iptables rules are managed dynamically by Docker and should not be manually modified. If you need custom firewall rules, configure them to work alongside Docker\'s rules rather than replacing them. Docker also supports disabling the docker-proxy with the `userland-proxy` option in daemon configuration.',
            code: `# View iptables NAT rules
sudo iptables -t nat -L -n -v

# View Docker-specific chains
sudo iptables -t nat -L DOCKER -n -v

# Check docker-proxy processes
ps aux | grep docker-proxy

# View port mappings for a container
docker port my-container

# View all port mappings
docker ps --format "table {{.Names}}\t{{.Ports}}"

# Disable userland proxy in daemon.json
# {
#   "userland-proxy": false
# }

# Check which process is using a port
ss -tlnp | grep 8080`,
            note: 'Docker modifies iptables rules automatically. If you run a firewall like ufw or firewalld alongside Docker, be aware that Docker may bypass your firewall rules through its own iptables chains.',
          },
          {
            heading: 'Advanced Port Mapping Patterns',
            content:
              'In production environments, port mapping strategies become more nuanced. For microservices architectures, you might use a reverse proxy container that handles all incoming traffic on ports 80 and 443, then routes to backend services on the Docker network without publishing their ports. This pattern improves security by limiting the attack surface. For development environments, mapping to a range of ports allows running multiple instances of the same service. The `EXPOSE` instruction in a Dockerfile documents which ports the container listens on, but it does not actually publish them. It serves as documentation and is used by the `-P` flag. When deploying with Docker Compose, port mapping is defined in the `ports` section of each service. For IPv6 support, use the bracket notation like `[::1]:8080:80`. Remember that each published port consumes a docker-proxy process and iptables rules, so publish only the ports that need external access.',
            code: `# Reverse proxy pattern (only proxy published)
docker network create web-internal
docker run -d --network web-internal --name api1 my-api
docker run -d --network web-internal --name api2 my-api
docker run -d --network web-internal -p 80:80 -p 443:443 --name proxy nginx

# Check EXPOSE ports of an image
docker inspect --format '{{json .Config.ExposedPorts}}' nginx | jq

# Docker Compose port mapping
# services:
#   web:
#     image: nginx
#     ports:
#       - "80:80"
#       - "443:443"
#   api:
#     image: my-api
#     # No ports published - only accessible internally

# IPv6 port binding
docker run -d -p "[::1]:8080:80" nginx

# Long form port syntax
docker run -d --publish target=80,published=8080,protocol=tcp nginx`,
            analogy: 'Port mapping is like a mail forwarding service. The host port is the public mailbox address that anyone can send to. Docker acts as the postal worker, receiving mail at the public address and delivering it to the correct apartment (container port) inside the building (Docker host).',
          },
        ],
        challenge: {
          prompt: 'Set up an nginx container that listens on port 80 inside the container, is mapped to host port 8080 but only accessible from localhost (127.0.0.1), and also maps port 443 to a random host port. Then find the assigned random port.',
          starterCode: `# Run nginx with specific port mapping requirements
docker run -d --name secure-nginx \\
  # ADD PORT MAPPINGS
  nginx:latest

# Find the random port assigned to container port 443
# ADD COMMAND`,
          solutionCode: `# Run nginx with specific port mapping requirements
docker run -d --name secure-nginx \\
  -p 127.0.0.1:8080:80 \\
  -p 443 \\
  nginx:latest

# Find the random port assigned to container port 443
docker port secure-nginx 443`,
          hints: [
            'Use 127.0.0.1:8080:80 to bind port 80 to localhost only',
            'Use just the container port (443) without a host port for random assignment',
            'Use docker port <container> <port> to find the assigned port',
          ],
        },
      },
      {
        id: 'docker-network-security',
        title: 'Network Security',
        difficulty: 'advanced',
        tags: ['docker', 'security', 'isolation', 'networking', 'iptables', 'icc'],
        sections: [
          {
            heading: 'Network Isolation Strategies',
            content:
              'Network security in Docker starts with proper isolation. By default, all containers on the same bridge network can communicate freely with each other and with the outside world. This default behavior may not be suitable for production environments where you need to restrict communication between services. The primary isolation mechanism is using separate user-defined bridge networks for different application tiers or services. Containers on different networks cannot communicate unless explicitly connected. You can also create internal networks that have no external connectivity, which is useful for backend services that should only be reachable from other containers. The `--internal` flag on network creation prevents containers from reaching the outside world, while still allowing inter-container communication within the network. Combining multiple networks with careful container placement provides defense in depth, ensuring that a compromise of one container does not automatically give access to all other services.',
            code: `# Create an internal network (no external access)
docker network create --internal backend-only

# Containers on internal network cannot reach internet
docker run -d --network backend-only --name db postgres:15
docker exec db ping -c 1 google.com  # FAILS

# But can communicate with other containers on same network
docker run -d --network backend-only --name app my-app
docker exec app ping -c 1 db  # SUCCEEDS

# Isolate different application stacks
docker network create app1-net
docker network create app2-net

# app1 containers cannot talk to app2 containers
docker run -d --network app1-net --name app1-web nginx
docker run -d --network app2-net --name app2-web nginx

# Verify isolation
docker exec app1-web ping -c 1 app2-web  # FAILS`,
            tip: 'Follow the principle of least privilege for networking. Only connect containers to the networks they absolutely need, and use internal networks for services that should not have internet access.',
          },
          {
            heading: 'Inter-Container Communication Control',
            content:
              'Docker provides the `--icc` (Inter-Container Communication) option at the daemon level that controls whether containers on the default bridge can communicate with each other. When ICC is set to false, containers on the default bridge cannot communicate unless explicitly linked. This adds a layer of security by requiring explicit connections. However, ICC only affects the default bridge network and is becoming less relevant as the recommended practice is to use user-defined networks with explicit container placement. For more granular control, you can use iptables rules to filter traffic between containers. Docker also supports network plugins that provide advanced network policies, including Calico and Weave, which can enforce pod-level network policies similar to Kubernetes NetworkPolicies. In Docker Swarm, you can control traffic flow by placing services on appropriate overlay networks and using internal networks for services that should not be externally accessible.',
            code: `# Disable ICC on the daemon (in /etc/docker/daemon.json)
# {
#   "icc": false,
#   "iptables": true
# }

# With ICC disabled, use --link for explicit communication
docker run -d --name db postgres:15
docker run -d --name app --link db:database my-app

# Better approach: user-defined networks with explicit placement
docker network create --internal db-net
docker network create app-net

docker run -d --network db-net --name db postgres:15
docker run -d --network app-net --name app my-app
docker network connect db-net app
# Only 'app' can reach 'db'

# Add custom iptables rules for fine-grained control
sudo iptables -I DOCKER-USER -s 172.18.0.2 -d 172.18.0.3 -j DROP`,
            warning: 'Modifying iptables rules directly can break Docker networking. Always use the DOCKER-USER chain for custom rules, as Docker manages other chains automatically.',
          },
          {
            heading: 'Securing Published Ports and External Access',
            content:
              'When you publish a port, Docker adds iptables rules that may bypass your host firewall. This is a common source of security surprises: even if you have UFW or firewalld configured to block a port, Docker\'s iptables rules can override them. To mitigate this, bind published ports to specific interfaces using the IP binding syntax, such as `-p 127.0.0.1:8080:80`. This ensures the port is only accessible from localhost. For production environments, consider placing a reverse proxy in front of your containers and only publishing the proxy ports. You can also configure Docker to not manipulate iptables by setting `"iptables": false` in the daemon configuration, but this means you must manage all networking rules yourself. A better approach is to use the DOCKER-USER iptables chain, which Docker evaluates before its own rules, allowing you to add custom firewall rules that are respected by Docker. Always audit your published ports and minimize the number of services directly accessible from the network.',
            code: `# Bind to localhost only
docker run -d -p 127.0.0.1:5432:5432 postgres:15

# Add rules to DOCKER-USER chain
# Allow only specific IP to access published port
sudo iptables -I DOCKER-USER -i eth0 -p tcp --dport 8080 ! -s 10.0.0.0/8 -j DROP

# Block all external access except from specific subnet
sudo iptables -I DOCKER-USER -i eth0 -s 192.168.1.0/24 -j RETURN
sudo iptables -A DOCKER-USER -i eth0 -j DROP

# Audit published ports
docker ps --format "table {{.Names}}\t{{.Ports}}" | grep "0.0.0.0"

# Use none network for maximum isolation
docker run -d --network none --name isolated-job my-batch-app

# Drop capabilities for network security
docker run -d --cap-drop NET_RAW --cap-drop NET_ADMIN my-app`,
            note: 'Docker bypasses UFW and firewalld rules by default. Always verify your published ports are properly secured, especially on internet-facing hosts.',
          },
        ],
        quiz: [
          {
            question: 'What does the --internal flag do when creating a Docker network?',
            options: [
              'Makes the network faster',
              'Prevents containers from accessing external networks',
              'Requires authentication to join',
              'Makes the network invisible to docker network ls',
            ],
            correctIndex: 1,
            explanation: 'The --internal flag creates a network where containers can communicate with each other but cannot access external networks or the internet.',
          },
          {
            question: 'Why might Docker bypass UFW firewall rules?',
            options: [
              'Docker does not use iptables',
              'Docker adds its own iptables rules that are evaluated before UFW rules',
              'UFW is incompatible with Docker',
              'Docker disables UFW automatically',
            ],
            correctIndex: 1,
            explanation: 'Docker manages its own iptables chains and rules for port publishing. These rules can be evaluated before UFW rules, effectively bypassing the firewall.',
          },
          {
            question: 'Which iptables chain should you use for custom Docker firewall rules?',
            options: ['INPUT', 'FORWARD', 'DOCKER', 'DOCKER-USER'],
            correctIndex: 3,
            explanation: 'The DOCKER-USER chain is specifically designed for custom rules. Docker evaluates it before its own chains and never modifies it, so your rules persist across Docker restarts.',
          },
        ],
      },
      {
        id: 'docker-network-troubleshooting',
        title: 'Network Troubleshooting',
        difficulty: 'advanced',
        tags: ['docker', 'troubleshooting', 'networking', 'debugging', 'tcpdump'],
        sections: [
          {
            heading: 'Diagnosing Network Connectivity Issues',
            content:
              'Network troubleshooting in Docker requires understanding both Docker-level and OS-level networking concepts. The first step is always to verify that containers are on the correct networks using `docker network inspect`. Check if containers can resolve each other by name using DNS tools. Then test basic connectivity with `ping` and application-level connectivity with `curl` or `wget`. If DNS resolution fails, ensure you are using a user-defined network and not the default bridge. If connectivity works by IP but not by name, there might be a DNS caching issue or a naming conflict. For port mapping issues, verify that the port is published correctly with `docker port` and that no other process on the host is using the same port. Check the container logs for application-level errors that might indicate the service is not listening on the expected port. A systematic approach that works from the bottom up through the network stack saves time and prevents missing subtle issues.',
            code: `# Step 1: Verify network attachment
docker inspect --format '{{json .NetworkSettings.Networks}}' my-container | jq

# Step 2: Check DNS resolution
docker exec my-container nslookup target-service

# Step 3: Test connectivity
docker exec my-container ping -c 3 target-service
docker exec my-container curl -v http://target-service:8080/health

# Step 4: Check listening ports inside container
docker exec my-container ss -tlnp
docker exec my-container netstat -tlnp

# Step 5: Verify port mapping
docker port my-container

# Step 6: Check if host port is in use
ss -tlnp | grep 8080

# Step 7: Test from host
curl -v http://localhost:8080

# Step 8: Check container IP directly
CONTAINER_IP=$(docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' my-container)
curl -v http://$CONTAINER_IP:80`,
            tip: 'When troubleshooting, always test connectivity from inside the container first. If it works internally but fails externally, the issue is likely with port mapping or host firewall rules.',
          },
          {
            heading: 'Using Network Debug Containers',
            content:
              'Many production container images are minimal and lack networking tools like `ping`, `nslookup`, `curl`, or `netstat`. Rather than installing these tools in production images (which increases attack surface and image size), use purpose-built debug containers. The `nicolaka/netshoot` image is a popular choice that comes pre-loaded with networking tools including `tcpdump`, `nmap`, `iperf`, `dig`, `nslookup`, `curl`, `ping`, `traceroute`, `iftop`, and many more. You can run it on the same network as your containers, or use `--network container:<name>` to share the exact network namespace of a specific container. This latter approach is extremely powerful because the debug container sees exactly the same network configuration, IP addresses, and interfaces as the target container, allowing you to diagnose issues from the container\'s exact perspective without modifying the target container at all.',
            code: `# Run netshoot on the same network
docker run -it --rm --network app-net nicolaka/netshoot

# Share network namespace with a specific container
docker run -it --rm --network container:my-app nicolaka/netshoot

# Inside netshoot: full network debugging toolkit
# tcpdump - capture packets
tcpdump -i eth0 -n port 80

# nmap - port scanning
nmap -sT target-service

# iperf3 - bandwidth testing
# Server: iperf3 -s
# Client: iperf3 -c target-service

# dig - DNS debugging
dig target-service
dig @127.0.0.11 target-service

# traceroute - path analysis
traceroute target-service

# ss - socket statistics
ss -tlnp

# ip - interface and routing info
ip addr
ip route`,
            note: 'The --network container:<name> flag shares the network namespace, meaning the debug container has the exact same IP, ports, and network view as the target container.',
          },
          {
            heading: 'Packet Capture and Deep Network Analysis',
            content:
              'For complex network issues that cannot be diagnosed with simple connectivity tests, packet capture provides the deepest level of insight. You can use `tcpdump` either inside a container (if available) or from the host by targeting the container\'s virtual ethernet interface. On the host, Docker containers connect through veth pairs, and you can identify the correct veth interface using the container PID and the `nsenter` command. Wireshark can be used to analyze captured packets offline. For performance issues, `iperf3` can measure bandwidth between containers. The `docker events` command can reveal network-related events like container connect and disconnect operations. When debugging overlay network issues in Swarm, check the VXLAN interface and ensure that the required ports (4789 UDP, 7946 TCP/UDP, 2377 TCP) are open between all Swarm nodes. Combining these deep analysis techniques with systematic troubleshooting leads to resolution of even the most complex network issues.',
            code: `# Capture packets on container interface from host
PID=$(docker inspect -f '{{.State.Pid}}' my-container)
nsenter -t $PID -n tcpdump -i eth0 -w capture.pcap

# Capture specific traffic
docker exec my-container tcpdump -i eth0 -n 'port 80 and host 172.18.0.3'

# Find veth pair on host
VETH=$(ip link | grep -A1 "$(docker exec my-container cat /sys/class/net/eth0/iflink)" | head -1 | awk -F: '{print $2}' | tr -d ' ')

# Bandwidth testing between containers
docker run -d --network app-net --name iperf-server nicolaka/netshoot iperf3 -s
docker run -it --rm --network app-net nicolaka/netshoot iperf3 -c iperf-server

# Monitor network events
docker events --filter type=network

# Check Swarm networking ports
# Port 2377/tcp - cluster management
# Port 7946/tcp+udp - node communication
# Port 4789/udp - overlay traffic (VXLAN)

# View overlay network details
docker network inspect --format '{{json .Peers}}' my-overlay | jq`,
            warning: 'Packet captures may contain sensitive data including passwords and tokens sent in plain text. Handle capture files with the same security as production data.',
          },
        ],
        challenge: {
          prompt: 'You have two containers (web and api) on the same user-defined network but web cannot reach api on port 3000. Write the step-by-step debugging commands to diagnose the issue.',
          starterCode: `# Step 1: Verify both containers are on the same network
# ADD COMMAND

# Step 2: Test DNS resolution from web
# ADD COMMAND

# Step 3: Test connectivity
# ADD COMMAND

# Step 4: Check if api is actually listening on port 3000
# ADD COMMAND

# Step 5: Use a debug container to capture traffic
# ADD COMMAND`,
          solutionCode: `# Step 1: Verify both containers are on the same network
docker network inspect app-net --format '{{range .Containers}}{{.Name}} {{end}}'

# Step 2: Test DNS resolution from web
docker exec web nslookup api

# Step 3: Test connectivity
docker exec web curl -v http://api:3000

# Step 4: Check if api is actually listening on port 3000
docker exec api ss -tlnp | grep 3000

# Step 5: Use a debug container to capture traffic
docker run -it --rm --network container:api nicolaka/netshoot tcpdump -i eth0 port 3000`,
          hints: [
            'Use docker network inspect to verify container membership',
            'Use nslookup to verify DNS works before testing HTTP',
            'Check if the port is actually bound inside the api container with ss or netstat',
            'Use --network container:api to share the network namespace for packet capture',
          ],
        },
      },
    ],
  },
];
