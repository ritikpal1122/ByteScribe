import type { DocCategory } from './types';

export const DOCKER_PART3_CATEGORIES: DocCategory[] = [
  {
    id: 'docker-storage',
    label: 'Storage & Volumes',
    icon: '💾',
    entries: [
      {
        id: 'docker-storage-overview',
        title: 'Docker Storage Overview',
        difficulty: 'intermediate',
        tags: ['storage', 'volumes', 'copy-on-write', 'layers', 'persistence'],
        sections: [
          {
            heading: 'How Docker Stores Data',
            content: 'Docker uses a layered filesystem. Each image consists of read-only layers stacked on top of each other. When a container starts, Docker adds a thin writable layer on top called the container layer. All changes — new files, modifications, deletions — happen in this writable layer. When the container is removed, the writable layer is destroyed and data is lost. This is why persistent storage requires volumes or bind mounts. The underlying mechanism is copy-on-write (CoW): data is only copied when modified, making containers lightweight and fast to start.',
            code: `# Inspect container layers
docker inspect <container> | grep -A 10 GraphDriver

# View container filesystem changes
docker diff <container>

# Example output:
# C /etc
# A /etc/custom.conf
# D /tmp/removed-file`,
            tip: 'The writable container layer is deleted when the container is removed. Always use volumes for data you want to keep.'
          },
          {
            heading: 'Copy-on-Write Strategy',
            content: 'Copy-on-write (CoW) is the strategy Docker uses to keep images and containers efficient. When multiple containers share the same image, they all read from the same read-only layers. Only when a container modifies a file is that file copied into the container\'s writable layer. This means starting many containers from the same image uses minimal extra disk space. CoW applies at the block level in most storage drivers. Understanding CoW helps explain why Docker is so space-efficient compared to traditional virtual machines that copy entire disk images.',
            code: `# See how much space containers use vs shared layers
docker system df -v

# Output shows:
# Images: shared base layers
# Containers: only writable layer size
# Volumes: separate from CoW system`,
            note: 'CoW explains why 10 containers from the same image barely use more disk than 1 container.'
          },
          {
            heading: 'Storage Architecture Diagram',
            content: 'Docker offers three types of mounts for persisting or sharing data. Volumes are managed by Docker and stored in a Docker-controlled area of the host filesystem. Bind mounts map a host path directly into the container. tmpfs mounts store data in host memory only, never on disk. Each type suits different use cases: volumes for application data, bind mounts for development source code sharing, and tmpfs for sensitive ephemeral data like secrets or tokens that should never touch disk.',
            code: `\`\`\`mermaid
graph TD
    C[Container] --> V[Volume Mount<br>/var/lib/docker/volumes/]
    C --> B[Bind Mount<br>Host filesystem path]
    C --> T[tmpfs Mount<br>Host memory only]
    V --> D[(Persistent Data)]
    B --> H[Host Directory]
    T --> M[RAM - No disk write]
\`\`\``,
            analogy: 'Think of volumes as Docker\'s own filing cabinet, bind mounts as pointing to your desk, and tmpfs as sticky notes you throw away.'
          }
        ]
      },
      {
        id: 'docker-volumes',
        title: 'Docker Volumes',
        difficulty: 'intermediate',
        tags: ['volumes', 'persistence', 'create', 'inspect', 'storage'],
        sections: [
          {
            heading: 'Creating and Managing Volumes',
            content: 'Docker volumes are the preferred mechanism for persisting data generated and used by containers. Unlike bind mounts, volumes are completely managed by Docker. They exist independently of any container lifecycle — creating or removing a container does not affect its volumes. Volumes can be created explicitly before use or created automatically when a container references a named volume that does not yet exist. They are stored in a Docker-managed directory on the host and work consistently across different host operating systems.',
            code: `# Create a named volume
docker volume create mydata

# List all volumes
docker volume ls

# Inspect a volume
docker volume inspect mydata

# Remove a volume
docker volume rm mydata

# Remove all unused volumes
docker volume prune`,
            tip: 'Always name your volumes explicitly. Anonymous volumes (auto-created) are harder to manage and share between containers.'
          },
          {
            heading: 'Mounting Volumes in Containers',
            content: 'Volumes are mounted into containers at runtime using either the -v flag or the more explicit --mount flag. The --mount syntax is preferred for clarity and offers more options. When you mount a volume into a container, the container can read and write data there, and that data persists after the container stops. Multiple containers can mount the same volume simultaneously, enabling data sharing. Volume mounts are specified as part of docker run or defined in docker-compose.yml files.',
            code: `# Mount with -v (shorthand)
docker run -v mydata:/app/data nginx

# Mount with --mount (explicit)
docker run --mount source=mydata,target=/app/data nginx

# Read-only volume mount
docker run --mount source=mydata,target=/app/data,readonly nginx

# Mount volume in multiple containers
docker run -v sharedvol:/shared container1
docker run -v sharedvol:/shared container2`,
            note: 'The --mount flag gives clearer error messages than -v when syntax is wrong. Prefer it in scripts.'
          },
          {
            heading: 'Volume Backup and Restore',
            content: 'Backing up Docker volumes requires temporarily mounting them in a utility container alongside a host bind mount to extract data. This pattern works for any volume regardless of its driver. Restoration is the reverse: mount a fresh volume and copy data back in. This approach is portable and works in CI/CD pipelines. For databases, prefer database-native backup tools (pg_dump, mysqldump) over raw volume snapshots to ensure consistency and avoid backing up data mid-write.',
            code: `# Backup volume to tar archive
docker run --rm \
  -v mydata:/source:ro \
  -v $(pwd):/backup \
  alpine tar czf /backup/mydata.tar.gz -C /source .

# Restore from backup
docker run --rm \
  -v mydata:/target \
  -v $(pwd):/backup \
  alpine tar xzf /backup/mydata.tar.gz -C /target`,
            tip: 'Use --rm on backup containers so they clean up automatically after the backup completes.'
          }
        ],
        quiz: {
          questions: [
            {
              question: 'What happens to a Docker volume when the container using it is removed?',
              options: ['The volume is automatically deleted', 'The volume persists independently', 'The volume is archived', 'The volume becomes read-only'],
              correctIndex: 1,
              explanation: 'Docker volumes exist independently of container lifecycles. Removing a container does not remove its volumes.'
            },
            {
              question: 'Which flag syntax is preferred for volume mounts?',
              options: ['-v', '--volume', '--mount', '--bind'],
              correctIndex: 2,
              explanation: '--mount is the preferred syntax as it is more explicit and provides clearer error messages.'
            },
            {
              question: 'Where does Docker store managed volumes on the host?',
              options: ['/tmp/docker', '/home/docker', '/var/lib/docker/volumes/', '/etc/docker/volumes/'],
              correctIndex: 2,
              explanation: 'Docker stores volumes in /var/lib/docker/volumes/ on Linux hosts, managed entirely by Docker.'
            }
          ]
        }
      },
      {
        id: 'docker-bind-mounts',
        title: 'Bind Mounts',
        difficulty: 'intermediate',
        tags: ['bind-mounts', 'development', 'host-filesystem', 'volumes', 'read-only'],
        sections: [
          {
            heading: 'Bind Mounts vs Volumes',
            content: 'Bind mounts map a specific path on the host machine directly into a container. Unlike volumes, the file or directory does not need to exist on the Docker host before mounting — Docker will create it if needed. Bind mounts give containers full access to your host filesystem at the specified path. This makes them ideal for development workflows where you want code changes on the host to immediately reflect inside the container without rebuilding. However, bind mounts are host-dependent and less portable than volumes across different machines.',
            code: `# Bind mount with -v (absolute host path required)
docker run -v /host/path:/container/path nginx

# Bind mount with --mount (explicit type)
docker run --mount type=bind,source=/host/path,target=/container/path nginx

# Using $(pwd) for current directory
docker run -v $(pwd):/app node:18

# Read-only bind mount
docker run -v $(pwd)/config:/app/config:ro nginx`,
            tip: 'Always use absolute paths for bind mounts. Relative paths only work in docker-compose, not with docker run.'
          },
          {
            heading: 'Development Workflow with Bind Mounts',
            content: 'Bind mounts shine in local development. By mounting your source code directory into a container running your application, edits made on the host are instantly visible inside the container. This enables hot-reload workflows without rebuilding Docker images on every code change. Most frameworks — Node.js with nodemon, Python with uvicorn --reload, or Go with air — support file-watching that triggers restarts when mounted source files change. This workflow combines the isolation benefits of containers with the convenience of editing directly on your host machine.',
            code: `# Node.js development with hot reload
docker run -d \
  -v $(pwd):/app \
  -v /app/node_modules \
  -p 3000:3000 \
  node:18 npm run dev

# Python FastAPI with reload
docker run -d \
  -v $(pwd):/app \
  -p 8000:8000 \
  python:3.11 \
  uvicorn main:app --reload --host 0.0.0.0`,
            note: 'The -v /app/node_modules pattern prevents the host node_modules from overwriting the container\'s installed dependencies.'
          },
          {
            heading: 'Read-Only Bind Mounts',
            content: 'Making a bind mount read-only prevents containers from modifying host files, which is important for security and config management. Configuration files, SSL certificates, and secrets should be mounted read-only so containers can use them but cannot alter them. This protects your host configuration from bugs or malicious processes inside a container. Read-only mounts are specified with the :ro suffix in -v syntax or readonly option in --mount syntax. Combining read-only mounts with non-root container users provides strong defense in depth.',
            code: `# Read-only config mount
docker run -d \
  -v /etc/myapp/config.json:/app/config.json:ro \
  -v /etc/ssl/certs:/certs:ro \
  myapp:latest

# With --mount syntax
docker run -d \
  --mount type=bind,source=/etc/myapp,target=/config,readonly \
  myapp:latest

# Verify mount options
docker inspect <container> | grep -A 5 Mounts`,
            warning: 'Even read-only mounts grant read access to host files. Never bind-mount sensitive directories like /etc or ~ into untrusted containers.'
          }
        ]
      },
      {
        id: 'docker-tmpfs',
        title: 'tmpfs Mounts',
        difficulty: 'intermediate',
        tags: ['tmpfs', 'memory', 'security', 'sensitive-data', 'ephemeral'],
        sections: [
          {
            heading: 'What is tmpfs?',
            content: 'A tmpfs mount stores data in the host machine\'s memory rather than on disk. When the container stops, the tmpfs mount is removed and files written there are not persisted. This makes tmpfs ideal for storing sensitive data that should never touch disk — passwords, API tokens, session data, or cryptographic keys. Unlike volumes and bind mounts, tmpfs mounts are private to a single container and cannot be shared between containers. They are only available on Linux hosts and provide fast, secure ephemeral storage.',
            code: `# Create a tmpfs mount
docker run -d \
  --tmpfs /app/secrets \
  myapp:latest

# With size and mode options
docker run -d \
  --tmpfs /app/temp:rw,size=100m,mode=1777 \
  myapp:latest

# Using --mount syntax
docker run -d \
  --mount type=tmpfs,destination=/app/secrets,tmpfs-size=50m \
  myapp:latest`,
            tip: 'Use tmpfs for /tmp directories in containers where temporary files should not persist or accumulate on disk.'
          },
          {
            heading: 'Security Use Cases',
            content: 'tmpfs mounts prevent sensitive data from being written to disk where it could be recovered from disk forensics or log shipping. Secret values injected at runtime, session tokens, and private keys benefit from tmpfs storage. Docker Swarm secrets and Kubernetes secrets often use tmpfs-backed mounts under the hood for the same reason. When combined with memory limits, tmpfs also prevents a container from using swap space for sensitive data. In compliance-regulated environments (PCI-DSS, HIPAA), tmpfs helps satisfy requirements around not storing credentials on disk.',
            code: `# Inject secrets via environment and write to tmpfs
docker run -d \
  -e DB_PASSWORD=secret \
  --tmpfs /run/secrets \
  myapp sh -c 'echo $DB_PASSWORD > /run/secrets/db_pass && app'

# Limit tmpfs size to prevent memory exhaustion
docker run -d \
  --tmpfs /tmp:size=64m \
  --memory=512m \
  myapp:latest`,
            warning: 'tmpfs data is still in process memory and readable via /proc on the host by root. It is not encrypted at rest in memory.'
          },
          {
            heading: 'tmpfs Options and Limits',
            content: 'tmpfs mounts support several options to control their behavior. The size option limits maximum bytes the tmpfs can use, preventing a single container from exhausting host memory. The mode option sets filesystem permissions using octal notation. The uid and gid options set ownership. Without a size limit, a tmpfs mount can consume all available host memory, causing system-wide issues. Always set explicit size limits in production. Use docker stats to monitor container memory usage and account for tmpfs in your memory planning.',
            code: `# tmpfs with all options
docker run -d \
  --mount type=tmpfs,destination=/tmp,\
tmpfs-size=128m,tmpfs-mode=1777 \
  myapp:latest

# Check tmpfs usage inside container
docker exec <container> df -h /tmp

# Monitor memory usage including tmpfs
docker stats --format \
  "table {{.Name}}\t{{.MemUsage}}"`,
            note: 'tmpfs size counts against the container\'s memory limit. If container memory limit is 256MB and tmpfs is 128MB, your app only has 128MB left.'
          }
        ]
      },
      {
        id: 'docker-volume-drivers',
        title: 'Volume Drivers',
        difficulty: 'intermediate',
        tags: ['volume-drivers', 'NFS', 'cloud', 'plugins', 'distributed-storage'],
        sections: [
          {
            heading: 'Volume Driver Architecture',
            content: 'Docker\'s volume driver plugin system allows volumes to be backed by storage systems beyond the local filesystem. The default driver is local, which stores volumes on the host running the container. Third-party drivers enable volumes backed by NFS shares, cloud block storage (AWS EBS, Azure Disk, GCP PD), or distributed filesystems like GlusterFS and Ceph. Volume drivers are installed as Docker plugins. When a volume is created with a specific driver, Docker delegates all storage operations to that plugin, making the volume transparent to containers.',
            code: `# Create volume with specific driver
docker volume create --driver local myvolume

# Install a volume plugin (example: NFS)
docker plugin install --grant-all-permissions \
  trajano/nfs-volume-plugin

# Create NFS-backed volume
docker volume create \
  --driver trajano/nfs-volume-plugin \
  --opt server=nfs.example.com \
  --opt share=/exports/data \
  nfsdata`,
            tip: 'Check Docker Hub for volume plugins. Major cloud providers offer official plugins for their storage services.'
          },
          {
            heading: 'Local Driver Options',
            content: 'Even the built-in local driver supports options that extend its capabilities significantly. You can configure it to mount NFS shares, use specific filesystem types, or pass custom mount options. This avoids needing a third-party plugin for simple NFS use cases. The local driver accepts the same options as the Linux mount command. This is useful for mounting existing NFS exports or creating volumes on specific host paths outside the default Docker volume directory. Available options vary by host OS and kernel support.',
            code: `# Local driver with NFS options
docker volume create \
  --driver local \
  --opt type=nfs \
  --opt o=addr=192.168.1.10,rw \
  --opt device=:/exports/data \
  nfs-volume

# Local driver with tmpfs
docker volume create \
  --driver local \
  --opt type=tmpfs \
  --opt device=tmpfs \
  --opt o=size=100m \
  tmpfs-volume

# Use in container
docker run -v nfs-volume:/data myapp`,
            note: 'The local NFS driver requires nfs-utils installed on the Docker host and network access to the NFS server.'
          },
          {
            heading: 'Cloud Volume Drivers',
            content: 'Cloud-specific volume drivers allow containers to use managed cloud block storage as Docker volumes. AWS provides the rexray/ebs driver for EBS volumes. Azure has the azurefile driver built into Docker for Azure File shares. GCP offers the gcepd driver for Persistent Disks. These drivers handle volume lifecycle management including provisioning, attaching, detaching, and formatting. In Kubernetes, this functionality is handled by the CSI (Container Storage Interface) instead. For pure Docker deployments on cloud VMs, these drivers enable stateful workloads with cloud-native storage durability.',
            code: `# AWS EBS volume driver example
docker plugin install rexray/ebs \
  EBS_ACCESSKEY=AKIA... \
  EBS_SECRETKEY=...

docker volume create \
  --driver rexray/ebs \
  --opt size=20 \
  --opt volumetype=gp3 \
  ebs-data

# List installed plugins
docker plugin ls

# Inspect plugin details
docker plugin inspect rexray/ebs`,
            warning: 'Cloud volume drivers require proper IAM permissions on the host instance. Misconfigured permissions are the most common cause of driver failures.'
          }
        ]
      },
      {
        id: 'docker-data-persistence',
        title: 'Data Persistence Patterns',
        difficulty: 'intermediate',
        tags: ['persistence', 'databases', 'backup', 'restore', 'patterns'],
        sections: [
          {
            heading: 'Database Persistence Pattern',
            content: 'Running databases in containers requires careful volume management. The database data directory must be mounted as a named volume to survive container restarts and updates. Without a volume, every container restart means starting fresh with an empty database. Named volumes persist data between container upgrades — you can stop the old database container, start a new version, and mount the same volume. The database picks up where it left off. Always initialize volumes before the first run and document which volume path the database engine uses for data storage.',
            code: `# PostgreSQL with named volume
docker run -d \
  --name postgres \
  -e POSTGRES_PASSWORD=secret \
  -e POSTGRES_DB=myapp \
  -v pgdata:/var/lib/postgresql/data \
  postgres:15

# MySQL with named volume
docker run -d \
  --name mysql \
  -e MYSQL_ROOT_PASSWORD=secret \
  -v mysqldata:/var/lib/mysql \
  mysql:8

# Redis with persistence
docker run -d \
  --name redis \
  -v redisdata:/data \
  redis:7 redis-server --appendonly yes`,
            tip: 'Check the official image documentation for the correct data directory path. It differs between database engines and versions.'
          },
          {
            heading: 'Backup and Restore Strategies',
            content: 'Two approaches exist for backing up containerized databases: volume-level backups and application-level backups. Volume-level backups copy the raw data files — fast but risky if the database is writing during backup. Application-level backups use database tools to create consistent dumps. Application-level backups are strongly preferred because they guarantee consistency, are portable across database versions, and can be restored to a different database engine version. Schedule backups as separate containers that mount the same volume read-only and ship dumps to object storage.',
            code: `# PostgreSQL application-level backup
docker exec postgres pg_dump -U postgres myapp \
  > backup_$(date +%Y%m%d).sql

# Restore PostgreSQL backup
cat backup.sql | docker exec -i postgres \
  psql -U postgres myapp

# MySQL backup
docker exec mysql mysqldump -u root \
  -psecret myapp > backup.sql

# Ship backup to S3
docker exec postgres pg_dump -U postgres myapp | \
  gzip | aws s3 cp - s3://mybucket/backup.sql.gz`,
            note: 'Test your restore procedure regularly. A backup you\'ve never restored is not a backup — it\'s a hope.'
          },
          {
            heading: 'Data Migration Patterns',
            content: 'When updating database schemas or migrating data between versions, containers enable safe patterns. Blue-green volume migration: run the new database version against a copy of the volume, apply migrations, verify, then switch traffic. The init container pattern runs migrations as a separate container that exits before the main app starts. In docker-compose, use depends_on with condition: service_completed_successfully to ensure migrations finish before the app boots. Never run schema migrations and normal app traffic in the same container — separation enables rollback.',
            code: `# Run migrations before app start
docker run --rm \
  -v pgdata:/var/lib/postgresql/data \
  -e DATABASE_URL=postgresql://... \
  myapp:latest python manage.py migrate

# Copy volume for safe migration testing
docker run --rm \
  -v pgdata:/source:ro \
  -v pgdata-test:/dest \
  alpine sh -c 'cp -r /source/. /dest/'

# Then test migration against copy
docker run --rm \
  -v pgdata-test:/var/lib/postgresql/data \
  myapp:latest python manage.py migrate`,
            warning: 'Never run migrations automatically on app startup in production. A failed migration during a rolling deploy can corrupt data.'
          }
        ],
        quiz: {
          questions: [
            {
              question: 'What is the safest type of database backup for containerized databases?',
              options: ['Volume-level file copy', 'Application-level dump using database tools', 'Docker commit', 'Memory snapshot'],
              correctIndex: 1,
              explanation: 'Application-level backups (pg_dump, mysqldump) guarantee consistency and are portable across database versions.'
            },
            {
              question: 'Why should schema migrations be separate from the main application container?',
              options: ['For better performance', 'To enable rollback and prevent data corruption on failed deploys', 'Because Docker requires it', 'To save disk space'],
              correctIndex: 1,
              explanation: 'Separating migrations enables rollback and prevents issues with rolling deploys where multiple app instances might run migrations simultaneously.'
            },
            {
              question: 'What happens to database data if you run a database container without a named volume?',
              options: ['Data is saved to the host automatically', 'Data is lost when the container is removed', 'Data is saved in Docker\'s cache', 'Data is compressed and archived'],
              correctIndex: 1,
              explanation: 'Without a volume, data lives in the container\'s writable layer and is destroyed when the container is removed.'
            }
          ]
        }
      },
      {
        id: 'docker-storage-drivers',
        title: 'Storage Drivers',
        difficulty: 'intermediate',
        tags: ['storage-drivers', 'overlay2', 'devicemapper', 'performance', 'kernel'],
        sections: [
          {
            heading: 'Storage Driver Overview',
            content: 'Docker storage drivers implement the layered image filesystem. They handle how image layers are stored on disk and how the copy-on-write mechanism works. The most common driver is overlay2, which uses Linux\'s OverlayFS kernel feature. Other drivers include devicemapper (used in older RHEL environments), btrfs, and zfs. The choice of storage driver affects performance characteristics, disk space efficiency, and compatibility with your kernel version. Modern Linux systems should use overlay2. Docker automatically selects the best available driver but you can override this in daemon configuration.',
            code: `# Check current storage driver
docker info | grep Storage

# Inspect driver in detail
docker info --format '{{.Driver}}'

# View daemon config
cat /etc/docker/daemon.json

# Set storage driver (requires daemon restart)
# /etc/docker/daemon.json
{
  "storage-driver": "overlay2"
}`,
            tip: 'overlay2 is the recommended storage driver for all modern Linux distributions with kernel 4.0 or newer.'
          },
          {
            heading: 'overlay2 Deep Dive',
            content: 'overlay2 uses Linux OverlayFS to present a unified filesystem view by merging multiple directories. It has four key directories: lowerdir (read-only image layers), upperdir (writable container layer), workdir (OverlayFS scratch space), and merged (the unified view containers see). overlay2 is efficient because unchanged files from lower layers are not copied — they appear in the merged view directly. It performs well for read-heavy workloads. Write performance for large files can be slower due to copy-on-write, making it unsuitable as the storage backing for databases (use volumes instead).',
            code: `# Inspect overlay2 layers for a container
docker inspect <container> | \
  python3 -m json.tool | grep -A 10 GraphDriver

# View overlay2 directory structure
ls /var/lib/docker/overlay2/

# Check OverlayFS kernel support
grep overlay /proc/filesystems

# View merged filesystem mount
mount | grep overlay`,
            note: 'Running databases on overlay2-backed container filesystems degrades performance significantly. Always use volumes for database data directories.'
          },
          {
            heading: 'Storage Driver Selection',
            content: 'Choosing the right storage driver depends on your Linux distribution, kernel version, and workload. overlay2 works on all modern distributions and is the correct default choice. devicemapper in direct-lvm mode was used on older RHEL/CentOS systems but is now deprecated. btrfs and zfs offer advanced features like snapshotting at the filesystem level but require those filesystems on the host. When running Docker on a host that already uses btrfs or zfs as its filesystem, Docker will automatically use the matching driver. Performance testing with your specific workload is the only reliable way to compare drivers.',
            code: `# Check recommended drivers per distro
# Ubuntu/Debian: overlay2
# RHEL 8+: overlay2
# Amazon Linux 2: overlay2

# View storage info
docker system df

# Detailed storage breakdown
docker system df -v

# daemon.json options
{
  "storage-driver": "overlay2",
  "storage-opts": [
    "overlay2.override_kernel_check=true"
  ]
}`,
            warning: 'Changing the storage driver after Docker is in use requires wiping /var/lib/docker. All local images and volumes stored there will be lost.'
          }
        ]
      },
      {
        id: 'docker-volume-best-practices',
        title: 'Volume Best Practices',
        difficulty: 'intermediate',
        tags: ['best-practices', 'volumes', 'security', 'performance', 'operations'],
        sections: [
          {
            heading: 'Naming and Organization',
            content: 'Consistent volume naming conventions prevent confusion in environments with many volumes. Prefix volume names with project or application names to group related volumes. Use descriptive names that indicate the content type and environment. Avoid relying on anonymous volumes created automatically by Docker — they generate opaque hash names that are impossible to manage at scale. Document which volumes each service requires in your project README or docker-compose.yml. Periodically audit volumes with docker volume ls to identify and remove volumes orphaned by removed containers.',
            code: `# Good naming conventions
docker volume create myapp-postgres-prod
docker volume create myapp-redis-prod
docker volume create myapp-uploads-prod

# List volumes with labels
docker volume create \
  --label app=myapp \
  --label env=production \
  --label service=database \
  myapp-postgres-prod

# Filter volumes by label
docker volume ls \
  --filter label=app=myapp \
  --filter label=env=production`,
            tip: 'Use labels on volumes just like you do on containers. Labels enable filtering, auditing, and automated cleanup scripts.'
          },
          {
            heading: 'Security Considerations',
            content: 'Volumes run with the permissions of the files inside them, which can cause issues when containers run as non-root users. Set correct ownership inside Dockerfiles using chown so non-root container processes can write to mounted volumes. Be cautious when mounting volumes from untrusted sources — a malicious volume could contain setuid binaries or symlinks pointing to sensitive host paths. In production, audit which containers have volume mounts to sensitive directories. Avoid mounting the Docker socket (/var/run/docker.sock) as a volume unless absolutely necessary — it grants full Docker daemon control.',
            code: `# Fix volume permissions in Dockerfile
FROM node:18
RUN mkdir -p /app/data && \
    chown -R node:node /app/data
USER node
VOLUME /app/data

# Fix permissions at runtime
docker run -v myvolume:/data \
  --user root \
  alpine chown -R 1000:1000 /data

# Never do this in production
docker run -v /var/run/docker.sock:/var/run/docker.sock ...`,
            warning: 'Mounting /var/run/docker.sock gives the container root-equivalent access to the entire Docker daemon and all containers on the host.'
          },
          {
            heading: 'Performance Optimization',
            content: 'Volume I/O performance varies based on mount type, storage driver, and host filesystem. For I/O intensive workloads like databases, always use named volumes rather than bind mounts — volumes bypass many OS-level filesystem abstractions. On Docker Desktop (Mac/Windows), bind mounts are significantly slower than on Linux due to filesystem virtualization overhead. For development on Mac, use Docker\'s Mutagen file sync or native containers where possible. Monitor volume I/O with docker stats and host-level tools. Consider volume drivers that use faster underlying storage (NVMe, SSD-backed EBS) for performance-critical workloads.',
            code: `# Monitor container I/O including volumes
docker stats --format \
  "table {{.Name}}\t{{.BlockIO}}\t{{.MemUsage}}"

# On Docker Desktop Mac: enable VirtioFS for better performance
# Settings > General > Use VirtioFS

# For databases: prefer named volumes
# SLOW: bind mount for database
docker run -v $(pwd)/pgdata:/var/lib/postgresql/data postgres

# FAST: named volume for database
docker volume create pgdata
docker run -v pgdata:/var/lib/postgresql/data postgres`,
            note: 'On Docker Desktop for Mac, database containers using bind mounts can be 10-50x slower than using named volumes due to filesystem translation.'
          }
        ]
      }
    ]
  },
  {
    id: 'docker-compose',
    label: 'Docker Compose',
    icon: '🎼',
    entries: [
      {
        id: 'docker-compose-intro',
        title: 'Introduction to Docker Compose',
        difficulty: 'beginner',
        tags: ['compose', 'multi-container', 'orchestration', 'yaml', 'services'],
        sections: [
          {
            heading: 'What is Docker Compose?',
            content: 'Docker Compose is a tool for defining and running multi-container Docker applications. With a single YAML file, you describe your entire application stack — services, networks, volumes, and configuration. A single command brings the entire stack up or tears it down. Compose is ideal for development environments, automated testing, and single-host production deployments. It eliminates the need to remember long docker run commands with many flags. Compose V2 is now the standard, integrated directly into the Docker CLI as the docker compose subcommand (no hyphen in newer versions).',
            code: `# Compose V2 commands (integrated in Docker CLI)
docker compose up -d
docker compose down
docker compose ps
docker compose logs

# Check Compose version
docker compose version

# Compose V1 (legacy, being phased out)
docker-compose up -d  # hyphenated, separate binary`,
            tip: 'If you see docker-compose (with hyphen) in tutorials, that is the older V1 standalone binary. Modern Docker uses docker compose (no hyphen).'
          },
          {
            heading: 'Architecture Diagram',
            content: 'A Docker Compose application consists of multiple services defined in docker-compose.yml. Each service becomes one or more containers. Compose automatically creates a default network connecting all services, allowing them to reach each other by service name. Volumes defined at the top level persist data and can be shared across services. The Compose file is the single source of truth for your entire local environment. You can run multiple isolated Compose projects on the same host — they get separate networks and their service names don\'t conflict.',
            code: `\`\`\`mermaid
graph TD
    CF[docker-compose.yml] --> S1[Service: web]
    CF --> S2[Service: api]
    CF --> S3[Service: db]
    CF --> N[Default Network]
    CF --> V[Named Volumes]
    S1 --> N
    S2 --> N
    S3 --> N
    S3 --> V
    N --> DNS[DNS: service name resolution]
\`\`\``,
            note: 'Services communicate using their service name as the hostname. Your API container can reach the database at the hostname "db".'
          },
          {
            heading: 'Your First Compose File',
            content: 'A minimal Compose file requires only the services key with at least one service definition. Each service needs an image or build context. Ports map host ports to container ports. The environment key sets environment variables. The depends_on key controls startup order — though it only waits for the container to start, not the application inside it to be ready. For production readiness checks, combine depends_on with condition: service_healthy and health checks. Keep your first Compose files simple and add complexity only when needed.',
            code: `# docker-compose.yml - minimal example
services:
  web:
    image: nginx:alpine
    ports:
      - "80:80"

  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: secret
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:`,
            analogy: 'A docker-compose.yml is like a recipe for your entire development environment — one file describes all the ingredients and how they fit together.'
          }
        ],
        quiz: {
          questions: [
            {
              question: 'What is the modern way to run Docker Compose in Docker CLI V2?',
              options: ['docker-compose up', 'docker compose up', 'docker run compose', 'docker stack up'],
              correctIndex: 1,
              explanation: 'Docker Compose V2 is integrated into the Docker CLI as "docker compose" (no hyphen). The old docker-compose binary is legacy.'
            },
            {
              question: 'How do services in a Compose network reach each other?',
              options: ['By IP address only', 'By service name as hostname', 'By container ID', 'By port number only'],
              correctIndex: 1,
              explanation: 'Compose creates a default network where each service is reachable by its service name as a DNS hostname.'
            },
            {
              question: 'What does depends_on guarantee?',
              options: ['The dependency app is fully ready to accept requests', 'The dependency container has started', 'The dependency has passed health checks', 'The dependency network is configured'],
              correctIndex: 1,
              explanation: 'depends_on only waits for the container to start, not for the application inside it to be ready to accept connections.'
            }
          ]
        },
        challenge: {
          title: 'Create a Web + Database Stack',
          description: 'Write a docker-compose.yml that runs a web application connected to a PostgreSQL database with proper volume configuration.',
          starterCode: `# docker-compose.yml
# TODO: Define these services:
# 1. postgres service with:
#    - postgres:15 image
#    - POSTGRES_PASSWORD=mypassword env var
#    - Named volume for /var/lib/postgresql/data
# 2. web service with:
#    - nginx:alpine image
#    - Port 8080:80 mapping
#    - depends_on postgres
# 3. Define the named volume at top level

services:
  # Add your services here

volumes:
  # Add your volumes here`,
          solution: `services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: mypassword
    volumes:
      - pgdata:/var/lib/postgresql/data

  web:
    image: nginx:alpine
    ports:
      - "8080:80"
    depends_on:
      - postgres

volumes:
  pgdata:`
        }
      },
      {
        id: 'docker-compose-file',
        title: 'Compose File Structure',
        difficulty: 'beginner',
        tags: ['compose', 'yaml', 'structure', 'syntax', 'version'],
        sections: [
          {
            heading: 'File Format and Version',
            content: 'Docker Compose files use YAML format and are typically named docker-compose.yml or compose.yml (the newer preferred name). Modern Compose files do not require a version key — it was used historically to specify compatibility but is now optional and ignored by current versions. The top-level keys in a Compose file are: services (required), networks (optional), volumes (optional), configs (optional, Swarm), and secrets (optional, Swarm). YAML indentation is significant — use spaces, never tabs. Two-space indentation is the convention for Compose files.',
            code: `# Modern compose.yml structure (no version key needed)
services:
  service-name:
    # service configuration

networks:
  network-name:
    # network configuration

volumes:
  volume-name:
    # volume configuration

# Legacy format (version key still works but is ignored)
version: "3.9"
services:
  ...`,
            note: 'The "version" key is officially deprecated as of Compose V2. You can safely remove it from all your Compose files.'
          },
          {
            heading: 'Service Configuration Keys',
            content: 'Each service block supports many configuration options that mirror docker run flags. The most commonly used keys are: image (which image to use), build (path to Dockerfile), ports (port mappings), volumes (mount configuration), environment (env vars), env_file (load from file), depends_on (startup ordering), networks (network membership), restart (restart policy), healthcheck (readiness probe), command (override CMD), and entrypoint (override ENTRYPOINT). You rarely need all of these — start with the subset relevant to your service and add more as needed.',
            code: `services:
  myapp:
    image: myapp:latest         # or use build:
    build: ./app                # path to Dockerfile
    ports:
      - "3000:3000"
    volumes:
      - ./src:/app/src          # bind mount
      - appdata:/app/data       # named volume
    environment:
      NODE_ENV: production
    env_file:
      - .env
    depends_on:
      db:
        condition: service_healthy
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3`,
            tip: 'Use condition: service_healthy in depends_on (instead of bare service name) to wait for health checks to pass before starting dependent services.'
          },
          {
            heading: 'YAML Syntax Tips',
            content: 'YAML has multiple ways to express the same data. Understanding YAML syntax prevents common Compose file mistakes. Lists can use block style (dash prefix) or flow style (square brackets). Strings don\'t need quotes unless they contain special characters. Environment variables can be key-value strings or mapping style. Port mappings must be quoted when they start with numbers to avoid YAML interpreting them as floats. Boolean values (true/false) don\'t need quotes but strings like "true" should be quoted if you mean the literal string, not the boolean.',
            code: `services:
  app:
    # List block style (preferred)
    environment:
      - KEY=value
      - ANOTHER=value

    # Mapping style (also valid)
    environment:
      KEY: value
      ANOTHER: value

    # Ports MUST be quoted
    ports:
      - "8080:80"    # correct
      - 8080:80      # YAML may parse as float!

    # Multi-line strings
    command: >
      python manage.py
      runserver 0.0.0.0:8000`,
            warning: 'Port mappings like 8080:80 without quotes can be misinterpreted by YAML parsers as the number 101. Always quote port mappings.'
          }
        ]
      },
      {
        id: 'docker-compose-services',
        title: 'Defining Services',
        difficulty: 'beginner',
        tags: ['services', 'build', 'image', 'restart', 'healthcheck'],
        sections: [
          {
            heading: 'Build vs Image',
            content: 'Services can start from a pre-built image or build from a Dockerfile. Using image pulls from a registry — ideal for databases and third-party services. Using build compiles your application from source — ideal for your own code. The build key accepts a path to the directory containing the Dockerfile, or an object with context and dockerfile keys for more control. During development, use build. For CI/CD and production, build the image separately, push to a registry, and then reference it with the image key for consistent, cached deployments.',
            code: `services:
  # Use pre-built image
  db:
    image: postgres:15-alpine

  # Build from Dockerfile in same directory
  api:
    build: .

  # Build with custom Dockerfile and context
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.dev
      args:
        NODE_VERSION: 18
        BUILD_ENV: development

  # Build and tag
  worker:
    build: .
    image: myapp-worker:latest`,
            tip: 'Specify exact image tags (postgres:15-alpine) rather than latest to ensure reproducible builds across different machines.'
          },
          {
            heading: 'Restart Policies',
            content: 'Restart policies control what happens when a container exits. The no policy (default) never restarts. The always policy always restarts regardless of exit code — use this for services that must stay up but can cause restart loops if misconfigured. The on-failure policy restarts only on non-zero exit codes, useful for one-off tasks. The unless-stopped policy restarts always except when explicitly stopped — the most common choice for production services. Restart policies apply at the container level and do not wait for health checks before considering a service healthy.',
            code: `services:
  # Never restart (default)
  migration:
    image: myapp
    command: python manage.py migrate
    restart: "no"

  # Restart on failure only
  worker:
    image: myapp
    restart: on-failure

  # Always restart (even after docker restart)
  api:
    image: myapp
    restart: always

  # Restart unless manually stopped
  nginx:
    image: nginx
    restart: unless-stopped`,
            note: 'For development, omit restart or use "no". Restart loops during debugging make it hard to inspect failed containers.'
          },
          {
            heading: 'Health Checks',
            content: 'Health checks allow Compose and Docker to determine if a service is truly ready to handle requests, not just started. A health check is a command run inside the container periodically. If it exits 0, the container is healthy. Non-zero exits mark it unhealthy. Other services can use depends_on with condition: service_healthy to wait for health. Health check parameters include test (the command), interval (how often), timeout (max time to wait), retries (failures before unhealthy), and start_period (grace period after start during which failures don\'t count).',
            code: `services:
  api:
    image: myapp
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/health"]
      interval: 30s
      timeout: 5s
      retries: 3
      start_period: 10s

  db:
    image: postgres:15
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

  web:
    image: myapp-web
    depends_on:
      api:
        condition: service_healthy
      db:
        condition: service_healthy`,
            tip: 'Always define health checks for databases and add depends_on with service_healthy for apps that need the database ready before starting.'
          }
        ]
      },
      {
        id: 'docker-compose-commands',
        title: 'Compose Commands',
        difficulty: 'beginner',
        tags: ['commands', 'up', 'down', 'logs', 'exec', 'build'],
        sections: [
          {
            heading: 'Starting and Stopping',
            content: 'The core Compose workflow revolves around a few key commands. docker compose up starts all services defined in the Compose file. The -d flag runs them in detached (background) mode. docker compose down stops and removes containers, networks, and default volumes, but preserves named volumes by default. Add -v to also remove named volumes (destructive — use with care). docker compose start and stop operate on existing containers without recreating them. docker compose restart restarts running services without rebuilding. These commands operate on the entire project unless you specify service names.',
            code: `# Start all services in background
docker compose up -d

# Start specific services only
docker compose up -d api db

# Rebuild images and start
docker compose up -d --build

# Stop and remove containers + networks
docker compose down

# Also remove named volumes (DESTRUCTIVE)
docker compose down -v

# Stop without removing
docker compose stop

# Restart specific service
docker compose restart api`,
            tip: 'Use docker compose up -d --build during development to ensure you are always running the latest built version of your code.'
          },
          {
            heading: 'Monitoring and Debugging',
            content: 'Several commands help monitor and debug running Compose applications. docker compose ps shows the status of all services. docker compose logs shows output from all services, with -f for live following and service names to filter. docker compose exec runs a command inside a running container — ideal for database shells or debugging. docker compose top shows running processes inside each container. docker compose stats (or docker stats) shows real-time resource usage. These tools replace the need to manually look up container IDs and use docker exec with long IDs.',
            code: `# Show service status
docker compose ps

# View logs for all services
docker compose logs

# Follow logs in real-time
docker compose logs -f

# View logs for specific service
docker compose logs -f api

# Execute command in running service
docker compose exec db psql -U postgres
docker compose exec api bash

# Show running processes
docker compose top

# Real-time resource usage
docker stats`,
            note: 'docker compose logs --tail=50 -f shows only the last 50 lines before following, avoiding huge log dumps on busy services.'
          },
          {
            heading: 'Build and Lifecycle Commands',
            content: 'Beyond up and down, Compose provides commands for managing individual phases of the container lifecycle. docker compose build builds or rebuilds service images without starting containers. docker compose pull fetches the latest versions of all images from registries. docker compose push pushes built images to registries. docker compose run starts a new one-off container for a service — useful for running database migrations or one-time scripts without affecting running services. docker compose config validates and displays the resolved Compose configuration with all variables substituted.',
            code: `# Build all images
docker compose build

# Build specific service
docker compose build api

# Pull latest images
docker compose pull

# Validate compose file
docker compose config

# Run one-off command in new container
docker compose run --rm api python manage.py migrate

# Run with different entrypoint
docker compose run --rm --entrypoint sh api

# Scale a service (multiple replicas)
docker compose up -d --scale worker=3`,
            tip: 'docker compose run --rm is the cleanest way to run database migrations — it starts a fresh container and removes it when done.'
          }
        ],
        quiz: {
          questions: [
            {
              question: 'Which flag removes named volumes when running docker compose down?',
              options: ['-r', '--remove', '-v', '--volumes-rm'],
              correctIndex: 2,
              explanation: 'docker compose down -v removes named volumes in addition to containers and networks. This is destructive and deletes persistent data.'
            },
            {
              question: 'What is the difference between docker compose stop and docker compose down?',
              options: [
                'They are identical',
                'stop pauses containers, down terminates them',
                'stop keeps containers, down removes them',
                'down is faster than stop'
              ],
              correctIndex: 2,
              explanation: 'docker compose stop stops running containers but leaves them intact. docker compose down stops AND removes containers and networks.'
            },
            {
              question: 'How do you run a one-off command in a Compose service without affecting running instances?',
              options: ['docker compose exec', 'docker compose run', 'docker compose start', 'docker compose create'],
              correctIndex: 1,
              explanation: 'docker compose run starts a NEW container for the service. docker compose exec runs a command in an EXISTING running container.'
            }
          ]
        }
      },
      {
        id: 'docker-compose-networking',
        title: 'Compose Networking',
        difficulty: 'intermediate',
        tags: ['networking', 'dns', 'networks', 'ports', 'isolation'],
        sections: [
          {
            heading: 'Default Network Behavior',
            content: 'When you run docker compose up, Compose creates a default bridge network for your project. All services join this network automatically and can communicate using their service name as a DNS hostname. The project name (usually the directory name) is used to prefix the network name, preventing conflicts between different Compose projects on the same host. Services on the default network cannot be reached from outside Docker unless you explicitly map ports with the ports key. This default isolation is a security feature — internal services like databases should not expose ports.',
            code: `# Services communicate by service name
# api can reach db at hostname "db"
services:
  api:
    image: myapp
    environment:
      DB_HOST: db  # service name as hostname
      DB_PORT: 5432

  db:
    image: postgres:15
    # No ports: key = not accessible from host
    # Still reachable by other services as "db"

# Check the auto-created network
docker network ls
# Shows: myproject_default`,
            tip: 'Never expose database ports to the host in production. Leave the ports key off the database service — only your app needs to reach it internally.'
          },
          {
            heading: 'Custom Networks',
            content: 'Defining custom networks gives you fine-grained control over service isolation. You can create multiple networks and assign services to specific ones, preventing services from communicating that do not need to. A common pattern is a frontend network (web server + app) and a backend network (app + database). The app service joins both networks and bridges them. Services on only the frontend network cannot reach the database directly. Network aliases allow services to be reached by multiple names. This network segmentation improves security and mirrors production firewall topologies.',
            code: `services:
  nginx:
    image: nginx
    networks:
      - frontend

  api:
    image: myapp
    networks:
      - frontend
      - backend

  db:
    image: postgres:15
    networks:
      - backend

networks:
  frontend:
    driver: bridge
  backend:
    driver: bridge
    internal: true  # no external access`,
            note: 'Setting internal: true on a network prevents containers on it from accessing the internet — useful for database networks.'
          },
          {
            heading: 'Port Mapping and External Access',
            content: 'The ports key maps host ports to container ports, making services accessible from outside Docker. The format is "host_port:container_port". You can bind to specific host interfaces by prefixing with an IP address. Exposing only the ports you need follows the principle of least access. The expose key (distinct from ports) documents which ports a container listens on internally but does not bind them to the host — it is documentation only and mainly relevant for automated tooling. For production deployments, only the reverse proxy (nginx, traefik) should have host port bindings.',
            code: `services:
  nginx:
    image: nginx
    ports:
      - "80:80"           # all interfaces
      - "443:443"
      - "127.0.0.1:8080:80"  # localhost only

  api:
    image: myapp
    expose:
      - "3000"  # internal only, no host binding
    # No ports: key

  db:
    image: postgres:15
    # No ports, no expose — only internal access`,
            warning: 'Binding database ports (5432, 3306) to 0.0.0.0 exposes them to all network interfaces including external networks. Always bind to 127.0.0.1 or omit ports entirely.'
          }
        ]
      },
      {
        id: 'docker-compose-volumes',
        title: 'Compose Volumes',
        difficulty: 'intermediate',
        tags: ['volumes', 'compose', 'persistence', 'bind-mounts', 'named-volumes'],
        sections: [
          {
            heading: 'Volume Definitions in Compose',
            content: 'Compose supports all three volume types: named volumes, bind mounts, and tmpfs. Named volumes are declared in the top-level volumes section and referenced in service volume configurations. This creates Docker-managed volumes that persist between docker compose down and up cycles. Volumes are only deleted when you run docker compose down -v or docker volume rm explicitly. The top-level declaration is required for named volumes shared across services. Bind mounts and tmpfs mounts do not need top-level declarations.',
            code: `services:
  db:
    image: postgres:15
    volumes:
      - pgdata:/var/lib/postgresql/data  # named volume
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql  # bind mount
      - type: tmpfs
        target: /tmp

  api:
    image: myapp
    volumes:
      - pgdata:/readonly-data:ro  # shared, read-only
      - uploads:/app/uploads

# Top-level volume declarations
volumes:
  pgdata:
  uploads:
    driver: local`,
            tip: 'Named volumes in Compose persist across down/up cycles. Only docker compose down -v destroys them. This is the intended behavior for database data.'
          },
          {
            heading: 'Volume Configuration Options',
            content: 'Top-level volume definitions in Compose support driver options, labels, and external references. The external: true option tells Compose the volume already exists and was created outside of Compose — Compose will not create it and will error if it does not exist. This is useful for production where volumes are pre-created by provisioning tools. The driver_opts key passes options to the volume driver, equivalent to docker volume create --opt. Labels on volumes follow the same conventions as container labels and enable filtering and automation.',
            code: `volumes:
  # Simple named volume (Compose creates it)
  appdata:

  # Volume with driver options
  nfsdata:
    driver: local
    driver_opts:
      type: nfs
      o: addr=10.0.0.1,rw
      device: ":/exports/data"

  # Pre-existing external volume
  production-db:
    external: true

  # Volume with labels
  uploads:
    labels:
      app: myapp
      env: production`,
            note: 'With external: true, docker compose up will fail if the volume does not exist. Create it first with docker volume create.'
          },
          {
            heading: 'Development Volume Patterns',
            content: 'For development, bind mounts enable live code reloading by syncing host source files into containers. A common pattern mounts source code as a bind mount while using an anonymous volume to prevent the host node_modules from overwriting the container\'s installed packages. This is the "node_modules trick": mount the working directory but then mount an empty anonymous volume over the node_modules subdirectory. The anonymous volume takes precedence and preserves the container-installed dependencies. The same pattern applies to Python\'s .venv or Go\'s vendor directory.',
            code: `services:
  # Node.js development pattern
  frontend:
    build: ./frontend
    volumes:
      - ./frontend:/app         # bind: sync source code
      - /app/node_modules       # anonymous: preserve node_modules
    command: npm run dev

  # Python development pattern
  api:
    build: ./backend
    volumes:
      - ./backend:/app          # bind: sync source code
      - /app/.venv              # anonymous: preserve virtualenv
    command: uvicorn main:app --reload`,
            tip: 'The anonymous volume /app/node_modules has no name and will be recreated fresh each time you run docker compose up. This is intentional — it prevents stale installs.'
          }
        ]
      },
      {
        id: 'docker-compose-env',
        title: 'Environment Variables',
        difficulty: 'beginner',
        tags: ['environment', 'env-file', 'secrets', 'configuration', 'variables'],
        sections: [
          {
            heading: 'Setting Environment Variables',
            content: 'Docker Compose provides several ways to pass environment variables to containers. The environment key in a service block sets variables directly. You can use key=value strings in a list or a mapping format. Variable substitution from the shell is supported: KEY=${SHELL_VAR} uses the current shell\'s value of SHELL_VAR. You can also pass through variables without a value (just KEY), which inherits the variable from the shell environment. This is useful for passing CI/CD secrets without hardcoding them in the Compose file.',
            code: `services:
  api:
    image: myapp
    environment:
      # Hardcoded value
      NODE_ENV: production
      PORT: 3000
      # Inherited from shell
      AWS_ACCESS_KEY_ID:
      AWS_SECRET_ACCESS_KEY:
      # Substituted from shell with default
      LOG_LEVEL: \${LOG_LEVEL:-info}
      # List format
    environment:
      - NODE_ENV=production
      - PORT=3000`,
            tip: 'Never hardcode secrets in docker-compose.yml if the file is committed to version control. Use env_file or shell variable pass-through instead.'
          },
          {
            heading: '.env Files',
            content: 'Compose automatically loads a .env file from the directory where docker compose is run. Variables in .env are available for substitution in the Compose file using ${VAR} syntax but are not automatically passed to containers. To pass them to containers, reference them in the environment key. This separation allows the .env file to set Compose-level configuration (like image tags or project name) separately from container runtime variables. The .env file should be in .gitignore. Use .env.example (committed) to document required variables.',
            code: `# .env file (not committed to git)
POSTGRES_VERSION=15
APP_IMAGE_TAG=1.2.3
DB_PASSWORD=supersecret
LOG_LEVEL=debug

# docker-compose.yml uses .env for substitution
services:
  db:
    image: postgres:\${POSTGRES_VERSION}  # from .env

  api:
    image: myapp:\${APP_IMAGE_TAG}        # from .env
    environment:
      DB_PASSWORD: \${DB_PASSWORD}        # passed to container
      LOG_LEVEL: \${LOG_LEVEL}`,
            warning: 'Add .env to .gitignore immediately. A committed .env file with real credentials is a security incident waiting to happen.'
          },
          {
            heading: 'env_file and Multiple Environments',
            content: 'The env_file key loads variables from a file and passes them all directly to the container. Unlike .env (which is for Compose variable substitution), env_file variables go directly into the container environment. You can specify multiple env_file entries — later files override earlier ones. This enables composing base configuration with environment-specific overrides. A common pattern is a base.env for shared config and a dev.env or prod.env for environment-specific overrides. Combine with Compose profiles or override files for a complete multi-environment strategy.',
            code: `# base.env
APP_NAME=myapp
LOG_FORMAT=json
MAX_CONNECTIONS=100

# development.env
LOG_LEVEL=debug
DATABASE_URL=postgresql://localhost/myapp_dev

# docker-compose.yml
services:
  api:
    image: myapp
    env_file:
      - base.env
      - development.env  # overrides base.env vars

# Load different env file
docker compose \
  --env-file production.env up -d`,
            note: 'Variables in env_file are passed to the container. Variables in .env are used for Compose file substitution. They serve different purposes.'
          }
        ],
        quiz: {
          questions: [
            {
              question: 'What is the purpose of the .env file in Docker Compose?',
              options: [
                'It is automatically loaded into all containers',
                'It provides variable substitution for the Compose file itself',
                'It replaces the env_file option',
                'It sets Docker daemon environment variables'
              ],
              correctIndex: 1,
              explanation: 'The .env file provides variables for substitution in the Compose file (${VAR} syntax). It does not automatically inject variables into containers.'
            },
            {
              question: 'How do you pass a shell environment variable to a container without hardcoding its value?',
              options: [
                'Use environment: KEY=value',
                'Use environment: KEY (without value)',
                'Use env_file: shell',
                'Use build.args'
              ],
              correctIndex: 1,
              explanation: 'Listing just the key name (environment: - MY_VAR) without a value causes Compose to inherit the variable from the shell environment.'
            },
            {
              question: 'What is the difference between environment: and env_file:?',
              options: [
                'env_file supports more variable types',
                'environment sets individual vars, env_file loads all vars from a file',
                'They are identical in function',
                'environment is for containers, env_file is for Compose'
              ],
              correctIndex: 1,
              explanation: 'environment sets specific named variables in the Compose file. env_file loads all key=value pairs from an external file into the container.'
            }
          ]
        }
      },
      {
        id: 'docker-compose-override',
        title: 'Compose Overrides',
        difficulty: 'intermediate',
        tags: ['override', 'profiles', 'extend', 'environments', 'configuration'],
        sections: [
          {
            heading: 'docker-compose.override.yml',
            content: 'Compose automatically merges docker-compose.override.yml with docker-compose.yml when both exist in the same directory. The override file is applied on top of the base file, with override values winning conflicts. This enables keeping a production-ready base file and an override file for development settings — additional port bindings, volume mounts for source code, debug environment variables, or development-only services like mail catchers or database admin UIs. Commit docker-compose.yml, add docker-compose.override.yml to .gitignore, and provide a docker-compose.override.yml.example for documentation.',
            code: `# docker-compose.yml (committed, production-ready)
services:
  api:
    image: myapp:\${IMAGE_TAG:-latest}
    restart: unless-stopped

# docker-compose.override.yml (gitignored, dev settings)
services:
  api:
    build: .              # override: build locally
    volumes:
      - .:/app            # override: live code reload
    environment:
      DEBUG: "true"
    ports:
      - "8000:8000"       # override: expose for local access

# Compose merges both automatically
docker compose up`,
            tip: 'The override pattern is perfect for "no friction" developer onboarding: clone repo, copy .override.yml.example, and docker compose up.'
          },
          {
            heading: 'Multiple Override Files',
            content: 'You can specify multiple Compose files explicitly using the -f flag. Compose merges them left to right with later files overriding earlier ones. This enables layered configurations: base + environment-specific overrides. Useful for CI (use a test-specific override) or for maintaining separate staging and production configurations from the same base. The order of -f flags matters — last file wins conflicts. You can also use the COMPOSE_FILE environment variable to set a colon-separated list of files to merge automatically without typing -f every time.',
            code: `# Use specific files
docker compose -f docker-compose.yml \
               -f docker-compose.prod.yml up -d

# CI configuration
docker compose -f docker-compose.yml \
               -f docker-compose.test.yml \
               run --rm tests

# COMPOSE_FILE env var alternative
export COMPOSE_FILE=docker-compose.yml:docker-compose.dev.yml
docker compose up  # uses both files automatically

# List merged config
docker compose -f docker-compose.yml \
               -f docker-compose.prod.yml config`,
            note: 'docker compose config shows the fully merged configuration. Use it to verify that your overrides are being applied correctly.'
          },
          {
            heading: 'Profiles',
            content: 'Compose profiles allow you to selectively start subsets of services. Assign profiles to optional services using the profiles key. Services without a profile key are always started. Services with profiles are only started when that profile is explicitly activated with --profile or COMPOSE_PROFILES. Common use cases include optional development tools (database admin UI, mail catcher, mock server), debug services, or load testing tools that should not start in normal development but are available when needed. Multiple profiles can be assigned to a single service.',
            code: `services:
  # Always started (no profile)
  api:
    image: myapp

  db:
    image: postgres:15

  # Only with 'tools' profile
  adminer:
    image: adminer
    profiles: ["tools"]
    ports:
      - "8080:8080"

  # Only with 'debug' profile
  mailhog:
    image: mailhog/mailhog
    profiles: ["debug", "tools"]

# Activate profiles
docker compose --profile tools up -d
docker compose --profile debug --profile tools up`,
            tip: 'Profiles are great for optional services that pollute the development environment when always running. Teams can opt in to what they need.'
          }
        ]
      },
      {
        id: 'docker-compose-production',
        title: 'Compose in Production',
        difficulty: 'intermediate',
        tags: ['production', 'deployment', 'security', 'resources', 'scaling'],
        sections: [
          {
            heading: 'Production Compose Considerations',
            content: 'Docker Compose can be used in production for single-host deployments, though Kubernetes or Docker Swarm are better for multi-host scaling. When using Compose in production, remove development-specific configurations: no build keys (use pre-built images), no source code bind mounts, no debug ports. Set explicit image tags (never latest in production). Configure restart policies, resource limits, and health checks. Use Docker secrets or a secrets manager rather than environment variables for credentials. Ensure your Compose file is idempotent — re-running docker compose up should be safe and not cause downtime.',
            code: `# Production-ready service configuration
services:
  api:
    image: myapp:1.4.2        # pinned tag, not latest
    restart: unless-stopped
    deploy:
      resources:
        limits:
          cpus: "1.0"
          memory: 512M
        reservations:
          cpus: "0.25"
          memory: 128M
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/health"]
      interval: 30s
      retries: 3
    logging:
      driver: json-file
      options:
        max-size: "10m"
        max-file: "3"`,
            tip: 'Pin exact image digests (image@sha256:...) in production for truly immutable deployments, not just tags which can be overwritten.'
          },
          {
            heading: 'Resource Limits and Logging',
            content: 'Setting resource limits prevents a single service from consuming all host resources. The deploy.resources section sets CPU and memory limits and reservations. Without limits, a memory leak in one service can crash the entire host. Configure logging drivers to prevent log files from filling disk. The json-file driver with max-size and max-file provides simple log rotation. For centralized logging, use the syslog or fluentd driver to ship logs to a log aggregation service. Always set logging configuration in production — default Docker logging keeps logs forever.',
            code: `services:
  api:
    image: myapp:1.4.2
    deploy:
      resources:
        limits:
          cpus: "2"
          memory: 1G
    logging:
      driver: "json-file"
      options:
        max-size: "50m"
        max-file: "5"

  # Syslog for centralized logging
  worker:
    image: myapp:1.4.2
    logging:
      driver: syslog
      options:
        syslog-address: "udp://logs.example.com:514"
        tag: "myapp-worker"`,
            warning: 'Without log rotation (max-size/max-file), Docker containers running for months can fill entire disks with log files.'
          },
          {
            heading: 'Zero-Downtime Deployments',
            content: 'Docker Compose alone does not support true zero-downtime deployments for single-service updates. A workaround is running the new version alongside the old and updating a reverse proxy. For simple cases, Compose can do rolling-style updates: pull the new image, then docker compose up -d which recreates only changed services. During the brief restart, the service is down. For true zero-downtime on a single host, place services behind nginx or Traefik and update them one replica at a time. For production zero-downtime, consider Docker Swarm\'s rolling update feature or Kubernetes.',
            code: `# Simple production update workflow
# 1. Pull new image
docker compose pull api

# 2. Recreate only changed services
docker compose up -d --no-deps api

# 3. Verify health
docker compose ps
docker compose logs api --tail=50

# Rollback if needed
# (requires keeping previous image tag)
docker compose up -d --no-deps \
  --no-build api

# With explicit image downgrade
IMAGE_TAG=1.4.1 docker compose up -d api`,
            note: '--no-deps prevents Compose from also recreating dependency services when updating a specific service.'
          }
        ]
      },
      {
        id: 'docker-compose-advanced',
        title: 'Advanced Compose Features',
        difficulty: 'advanced',
        tags: ['extends', 'anchors', 'watch', 'merge', 'advanced'],
        sections: [
          {
            heading: 'YAML Anchors and Aliases',
            content: 'YAML anchors (&) and aliases (*) reduce repetition in Compose files by letting you define a block once and reference it multiple times. Define a common configuration block with & anchor-name, then use *anchor-name wherever you want to include it. The << merge key combines the anchored block into the current mapping. This is useful for sharing common environment variables, labels, logging configuration, or deploy constraints across multiple services. Anchors are a YAML feature and are processed before Compose reads the file — they have no Compose-specific behavior.',
            code: `# Define reusable blocks with anchors
x-common: &common-config
  restart: unless-stopped
  logging:
    driver: json-file
    options:
      max-size: "10m"

x-app-env: &app-env
  NODE_ENV: production
  LOG_LEVEL: info

services:
  api:
    <<: *common-config   # merge anchor
    image: myapp-api:1.0
    environment:
      <<: *app-env
      PORT: 3000

  worker:
    <<: *common-config   # reuse same config
    image: myapp-worker:1.0
    environment:
      <<: *app-env
      QUEUE: default`,
            tip: 'The x- prefix on top-level keys (x-common, x-app-env) is Compose\'s extension mechanism — these keys are ignored by Compose but valid YAML.'
          },
          {
            heading: 'Compose Watch',
            content: 'Docker Compose Watch (introduced in Compose 2.22) provides smart file synchronization between your host and containers during development. Unlike simple bind mounts, Watch understands your project structure and can sync only changed files, trigger rebuilds for Dockerfile changes, or ignore certain paths. The watch configuration is defined per-service under the develop.watch key. Three actions are supported: sync (copy changed files to container), rebuild (rebuild image on change), and sync+restart (sync and restart container). Watch is more efficient than full volume mounts for large projects.',
            code: `services:
  api:
    build: ./api
    develop:
      watch:
        # Sync source changes without restart
        - action: sync
          path: ./api/src
          target: /app/src
          ignore:
            - node_modules/
        # Rebuild on dependency changes
        - action: rebuild
          path: ./api/package.json
        # Sync config and restart
        - action: sync+restart
          path: ./api/config
          target: /app/config

# Start with watch enabled
docker compose watch`,
            note: 'Compose Watch requires Compose version 2.22 or later. Check with docker compose version before using develop.watch in your team.'
          },
          {
            heading: 'Extends and Service Templates',
            content: 'The extends key allows one service to inherit configuration from another service, either in the same file or a different file. This is useful for creating a base service template and extending it for different environments or variants. The extends key specifies the file and service to inherit from. Extended services inherit most configuration keys but not depends_on, volumes_from, or links (these require context about the specific environment). Combine extends with override files and profiles to build a flexible multi-environment configuration system that minimizes duplication.',
            code: `# base-services.yml - shared templates
services:
  base-app:
    image: myapp:\${TAG:-latest}
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/health"]
      interval: 30s

# docker-compose.yml - extends base
services:
  api:
    extends:
      file: base-services.yml
      service: base-app
    ports:
      - "8000:8000"
    environment:
      ROLE: api

  worker:
    extends:
      file: base-services.yml
      service: base-app  # same base, different role
    environment:
      ROLE: worker`,
            tip: 'extends works well for microservices that share a base image but differ in command, ports, or environment variables.'
          }
        ],
        quiz: {
          questions: [
            {
              question: 'What does the << merge key do in YAML?',
              options: [
                'Redirects output to a file',
                'Merges an anchored mapping into the current mapping',
                'Creates a new YAML document',
                'Defines a YAML anchor'
              ],
              correctIndex: 1,
              explanation: 'The << merge key (merge key) combined with a YAML alias (*anchor) merges all key-value pairs from the anchored mapping into the current mapping.'
            },
            {
              question: 'What does the Compose Watch "sync" action do?',
              options: [
                'Rebuilds the Docker image',
                'Copies changed host files into the running container',
                'Restarts the container',
                'Pulls the latest image from registry'
              ],
              correctIndex: 1,
              explanation: 'The sync action copies changed files from the host path to the container target path without rebuilding or restarting the container.'
            },
            {
              question: 'Which configuration keys are NOT inherited when using extends?',
              options: [
                'environment and ports',
                'restart and healthcheck',
                'depends_on and volumes_from',
                'image and command'
              ],
              correctIndex: 2,
              explanation: 'depends_on and volumes_from are not inherited via extends because they reference other services that may not exist in the extending context.'
            }
          ]
        },
        challenge: {
          title: 'Build a Full-Stack Compose File with Anchors',
          description: 'Create a docker-compose.yml using YAML anchors for shared configuration, with profiles for optional development tools.',
          starterCode: `# TODO: Create a docker-compose.yml with:
# 1. A YAML anchor x-logging for json-file logging (max-size: 10m)
# 2. A postgres service using the logging anchor
# 3. An api service using the logging anchor, with healthcheck
# 4. An adminer service in a "tools" profile
# 5. A named volume pgdata

# Hints:
# - Use x-logging: &logging to define anchor
# - Use <<: *logging to merge into services
# - adminer image: adminer, port 8080:8080

services:
  # Your services here

volumes:
  # Your volumes here`,
          solution: `x-logging: &logging
  logging:
    driver: json-file
    options:
      max-size: "10m"
      max-file: "3"

services:
  postgres:
    image: postgres:15
    <<: *logging
    environment:
      POSTGRES_PASSWORD: secret
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      retries: 5

  api:
    image: myapp:latest
    <<: *logging
    ports:
      - "8000:8000"
    depends_on:
      postgres:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/health"]
      interval: 30s

  adminer:
    image: adminer
    <<: *logging
    profiles: ["tools"]
    ports:
      - "8080:8080"

volumes:
  pgdata:`
        }
      }
    ]
  }
];
