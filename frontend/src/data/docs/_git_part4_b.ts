import type { DocCategory } from './types';

export const GIT_PART4B_CATEGORIES: DocCategory[] = [
  {
    id: 'git-internals',
    label: 'Git Internals & Workflows',
    icon: '🔍',
    entries: [
      {
        id: 'git-objects',
        title: 'Git Objects',
        description: 'Blobs, trees, commits, tags, and content-addressable storage.',
        tags: ['git', 'objects', 'blobs', 'trees', 'internals'],
        isAdvanced: true,
        sections: [
          {
            title: 'Content-Addressable Storage',
            content: 'Git stores everything as objects identified by SHA-1 hashes of their content. There are four object types: blobs (file content), trees (directory listings), commits (snapshots with metadata), and tags (named references). Each object is stored under `.git/objects/` using the first two hex chars as the directory name.',
            code: `# Inspect any object
git cat-file -t <sha>       # type: blob, tree, commit, tag
git cat-file -p <sha>       # pretty-print contents

# Create a blob manually
echo "hello" | git hash-object --stdin -w
# Returns a SHA like: ce013625...`,
          },
          {
            title: 'Blobs and Trees',
            content: 'A blob holds raw file content with no filename metadata. A tree object maps filenames and modes to blob SHAs (or nested tree SHAs). Running `git write-tree` hashes the current index into a tree object. Trees are recursive: subdirectories become nested tree objects pointed to by the parent tree.',
            code: `# View a tree object
git cat-file -p HEAD^{tree}
# 100644 blob a8c3... README.md
# 100644 blob 9f2a... main.go
# 040000 tree b1c2... src

# Write current index as a tree
git write-tree`,
          },
          {
            title: 'Commit Objects',
            content: 'A commit object references a top-level tree SHA, one or more parent commit SHAs, author/committer metadata, and a message. The SHA of a commit changes if any field changes, making Git history tamper-evident. Tags can be lightweight (a ref to a commit) or annotated (a full object with its own SHA).',
            code: `# Show raw commit object
git cat-file -p HEAD
# tree 4b825dc642cb...
# parent 1a2b3c4d...
# author  Alice <a@b.com> 1700000000 +0000
# committer Alice <a@b.com> 1700000000 +0000
#
# Initial commit`,
          },
        ],
        diagram: {
          kind: 'mermaid',
          code: 'graph TD\n  C[Commit] --> T[Tree]\n  T --> B1[Blob: file1]\n  T --> B2[Blob: file2]\n  T --> T2[Tree: subdir]\n  T2 --> B3[Blob: file3]\n  style C fill:#7986cb,color:#fff\n  style T fill:#4db6ac,color:#fff',
          caption: 'Git object model: commits point to trees, trees point to blobs and other trees',
        },
        quiz: {
          questions: [
            {
              question: 'What does a Git blob object store?',
              options: ['File name and content', 'Raw file content only', 'Directory listing', 'Commit metadata'],
              correctIndex: 1,
              explanation: 'A blob stores raw file content without any filename information. The filename is stored in the tree object that references the blob.',
            },
            {
              question: 'How does Git identify objects?',
              options: ['Sequential IDs', 'SHA-1 of content', 'Timestamps', 'File paths'],
              correctIndex: 1,
              explanation: 'Git uses SHA-1 hashes of the object content as identifiers, making storage content-addressable and tamper-evident.',
            },
            {
              question: 'Which command shows the type of a Git object?',
              options: ['git cat-file -p', 'git cat-file -t', 'git show --type', 'git log --format=%T'],
              correctIndex: 1,
              explanation: '`git cat-file -t <sha>` prints the type of the object (blob, tree, commit, or tag).',
            },
          ],
        },
      },
      {
        id: 'git-refs',
        title: 'References',
        description: 'Branches as refs, HEAD, symbolic refs, and packed-refs.',
        tags: ['git', 'refs', 'HEAD', 'branches', 'internals'],
        isAdvanced: true,
        sections: [
          {
            title: 'Refs and Branches',
            content: 'A branch is simply a file under `.git/refs/heads/` containing a commit SHA. When you commit, Git updates that file to the new SHA. Tags live in `.git/refs/tags/`. Remote-tracking branches are stored in `.git/refs/remotes/`. All refs are just named pointers into the object graph.',
            code: `# Read a branch ref directly
cat .git/refs/heads/main
# a1b2c3d4e5f6...

# List all refs
git show-ref

# Verify a specific ref
git rev-parse refs/heads/main`,
          },
          {
            title: 'HEAD and Symbolic Refs',
            content: 'HEAD is a special symbolic ref stored in `.git/HEAD`. Normally it reads `ref: refs/heads/main`, pointing to the current branch. In detached HEAD state it contains a raw commit SHA. Symbolic refs let one ref point to another, enabling HEAD to follow branch updates automatically.',
            code: `# Inspect HEAD
cat .git/HEAD
# ref: refs/heads/main

# Create a symbolic ref
git symbolic-ref MY_HEAD refs/heads/feature

# Detach HEAD to a commit
git checkout --detach HEAD~3`,
          },
          {
            title: 'packed-refs',
            content: 'When there are many refs, Git consolidates loose ref files into `.git/packed-refs` for performance. Each line is `<sha> <refname>`. Git checks packed-refs when a loose ref file is absent. Running `git pack-refs --all` forces all refs into this file. Deleting a ref removes its packed-refs line.',
            code: `# View packed refs
cat .git/packed-refs
# # pack-refs with: peeled fully-peeled sorted
# a1b2c3 refs/heads/main
# d4e5f6 refs/tags/v1.0

# Pack all refs
git pack-refs --all`,
          },
        ],
      },
      {
        id: 'git-packfiles',
        title: 'Packfiles & Compression',
        description: 'Delta compression, gc, and pack-objects for efficient storage.',
        tags: ['git', 'packfiles', 'compression', 'delta', 'storage'],
        isAdvanced: true,
        sections: [
          {
            title: 'Loose Objects vs Packfiles',
            content: 'Initially Git stores each object as a compressed zlib file (loose object). As the repository grows, Git packs objects into packfiles: binary files containing many objects plus a `.idx` index for fast lookup. Packfiles reduce disk usage dramatically by using delta compression between similar objects.',
            code: `# Count loose objects vs pack files
git count-objects -v
# count: 12          (loose objects)
# size: 48           (KB)
# in-pack: 4503
# packs: 2

ls .git/objects/pack/
# pack-abc123.idx  pack-abc123.pack`,
          },
          {
            title: 'Delta Compression',
            content: 'Pack-objects finds similar objects (e.g., successive versions of a file) and stores them as a base object plus a binary diff (delta). The delta chain can be several levels deep. Git limits chain depth to balance decompression speed vs. storage savings. `git verify-pack` shows delta relationships.',
            code: `# Manually trigger packing
git pack-objects --all-progress .git/objects/pack/pack

# Show delta chain info
git verify-pack -v .git/objects/pack/pack-*.idx | sort -k3 -n | tail -10

# Repack for maximum compression
git repack -a -d --depth=50 --window=250`,
          },
          {
            title: 'Running gc and pack-objects',
            content: 'Git automatically runs `git gc --auto` after certain operations. You can trigger it manually to pack loose objects, prune unreachable objects, and consolidate packfiles. Use `--aggressive` for thorough recompression at the cost of time. This is critical for large repositories to stay performant.',
            code: `# Standard garbage collection
git gc

# Aggressive repack (slower but smaller)
git gc --aggressive --prune=now

# Background maintenance (Git 2.29+)
git maintenance start   # schedules automatic tasks
git maintenance run --task=gc`,
          },
        ],
      },
      {
        id: 'git-plumbing',
        title: 'Plumbing Commands',
        description: 'cat-file, hash-object, update-ref, write-tree, and other low-level tools.',
        tags: ['git', 'plumbing', 'cat-file', 'hash-object', 'internals'],
        isAdvanced: true,
        sections: [
          {
            title: 'Hashing and Storing Objects',
            content: 'Plumbing commands are the low-level building blocks that porcelain commands (commit, checkout) use internally. `hash-object` computes a SHA and optionally writes the object to the store. `cat-file` reads objects back. Together they let you manipulate the object database without any higher-level abstractions.',
            code: `# Hash and store a blob
echo "Hello, Git" | git hash-object --stdin -w
# 8ab686eafeb1f44702738c8b0f24f2567c36da6d

# Read it back
git cat-file -p 8ab686ea
# Hello, Git

# Hash without writing
git hash-object myfile.txt`,
          },
          {
            title: 'Staging Area Plumbing',
            content: 'The index (staging area) is a binary file at `.git/index`. `update-index` adds files to the index, `write-tree` converts the index to a tree object, and `read-tree` loads a tree into the index. These commands power the normal staging workflow behind the scenes.',
            code: `# Stage a file at a specific blob SHA
git update-index --add --cacheinfo 100644 <blob-sha> path/to/file

# Write index to a tree object
TREE=$(git write-tree)

# Create a commit from a tree
COMMIT=$(echo "Manual commit" | git commit-tree $TREE -p HEAD)
git update-ref refs/heads/main $COMMIT`,
          },
          {
            title: 'Manipulating Refs with update-ref',
            content: '`update-ref` safely updates ref files, writing the new SHA and optionally checking the old value atomically. It is the preferred way to move branches programmatically because it handles packed-refs and performs safety checks. `symbolic-ref` reads and writes symbolic references like HEAD.',
            code: `# Move a branch to a specific commit
git update-ref refs/heads/feature <new-sha>

# Conditional update (fails if current SHA differs)
git update-ref refs/heads/main <new-sha> <expected-old-sha>

# Read/set symbolic ref
git symbolic-ref HEAD refs/heads/main
git symbolic-ref HEAD   # prints: refs/heads/main`,
          },
        ],
        quiz: {
          questions: [
            {
              question: 'What does `git hash-object -w` do?',
              options: ['Hashes without storing', 'Hashes and writes to object store', 'Updates a ref', 'Writes the index'],
              correctIndex: 1,
              explanation: 'The `-w` flag tells `hash-object` to actually write the object into the Git object database, not just print the SHA.',
            },
            {
              question: 'Which command converts the current index to a tree object?',
              options: ['git commit-tree', 'git update-index', 'git write-tree', 'git pack-objects'],
              correctIndex: 2,
              explanation: '`git write-tree` hashes the current index contents and writes the resulting tree object, returning its SHA.',
            },
            {
              question: 'What is the safest way to move a branch programmatically?',
              options: ['Editing .git/refs/heads/ directly', 'git update-ref', 'git branch -f', 'Editing packed-refs'],
              correctIndex: 1,
              explanation: '`git update-ref` handles packed-refs, performs atomic updates, and supports old-value checking, making it safer than direct file editing.',
            },
          ],
        },
      },
      {
        id: 'git-dag',
        title: 'The Git DAG',
        description: 'Directed acyclic graph of commits, parent relationships, and reachability.',
        tags: ['git', 'dag', 'graph', 'commits', 'history'],
        isAdvanced: true,
        sections: [
          {
            title: 'Commits as a DAG',
            content: 'Git history is a directed acyclic graph (DAG) where each commit points to its parent(s). Edges go backwards in time (child to parent). A merge commit has two or more parents. Because it is acyclic, there are no circular dependencies. This structure enables efficient ancestry queries and branch divergence detection.',
            code: `# Visualize the DAG
git log --graph --oneline --all

# Show commit with multiple parents
git cat-file -p <merge-commit-sha>
# tree ...
# parent <sha1>
# parent <sha2>
# ...`,
          },
          {
            title: 'Reachability',
            content: 'A commit is "reachable" from a ref if you can traverse parent edges from that ref to reach it. Git uses reachability to determine what is safe to prune: unreachable objects have no ref pointing to them (directly or via ancestors). Commands like `git log A..B` list commits reachable from B but not from A.',
            code: `# Commits reachable from main but not feature
git log feature..main --oneline

# Commits not reachable from any ref
git fsck --unreachable

# Common ancestor (merge base)
git merge-base main feature`,
          },
          {
            title: 'Traversal and Ranges',
            content: 'Git provides range syntax for DAG traversal. `A..B` means "ancestors of B minus ancestors of A". `A...B` (triple dot) means symmetric difference: commits reachable from either but not both. `^A` excludes A and its ancestors. These power `log`, `diff`, `cherry`, and many other commands.',
            code: `# All commits since branch point
git log main..feature

# Symmetric difference (divergence)
git log main...feature --left-right --oneline

# Exclude multiple ancestors
git log ^main ^release feature --oneline

# Count commits ahead/behind
git rev-list --count main..feature`,
          },
        ],
      },
      {
        id: 'git-transfer-protocols',
        title: 'Transfer Protocols',
        description: 'Smart HTTP, SSH, and the Git protocol for remote operations.',
        tags: ['git', 'protocols', 'ssh', 'http', 'transfer'],
        isAdvanced: true,
        sections: [
          {
            title: 'Smart HTTP Protocol',
            content: 'The smart HTTP protocol (used by GitHub, GitLab) conducts a capability negotiation before transferring objects. The client POSTs a want/have list; the server computes and streams a minimal packfile. HTTPS provides authentication and encryption. It works through firewalls and proxies that allow port 443.',
            code: `# Clone over HTTPS
git clone https://github.com/user/repo.git

# Store credentials (for automation)
git config credential.helper store

# Use a credential manager
git config --global credential.helper osxkeychain  # macOS
git config --global credential.helper manager       # Windows`,
          },
          {
            title: 'SSH Protocol',
            content: 'SSH transport invokes `git-upload-pack` (fetch) or `git-receive-pack` (push) on the remote via an SSH connection. Authentication uses SSH keys, avoiding password prompts. SSH is commonly preferred for write access. Multiplexing with `ControlMaster` speeds up repeated operations by reusing connections.',
            code: `# Clone over SSH
git clone git@github.com:user/repo.git

# SSH multiplexing config (~/.ssh/config)
# Host github.com
#   ControlMaster auto
#   ControlPath ~/.ssh/cm-%r@%h:%p
#   ControlPersist 600

# Test SSH connectivity
ssh -T git@github.com`,
          },
          {
            title: 'Git Protocol and Local Transport',
            content: 'The native Git protocol (port 9418) is fast but unauthenticated and read-only, suitable for public mirrors. Git over SSH is authenticated Git protocol. Local transport (`file://` or bare paths) copies or hard-links objects directly, making it the fastest option for on-disk clones and backup scripts.',
            code: `# Local clone (hard-links objects, fast)
git clone /path/to/repo.git

# Force copy, no hard-links
git clone --no-local /path/to/repo.git

# Anonymous git:// (read-only)
git clone git://git.kernel.org/pub/scm/git/git.git

# Check remote URL protocol
git remote -v`,
          },
        ],
      },
      {
        id: 'git-gc',
        title: 'Garbage Collection',
        description: 'gc, prune, fsck, repack, and maintenance for repository health.',
        tags: ['git', 'gc', 'garbage-collection', 'prune', 'maintenance'],
        isAdvanced: true,
        sections: [
          {
            title: 'What git gc Does',
            content: 'Running `git gc` packs loose objects, consolidates multiple packfiles into one, removes objects unreachable from any ref older than the grace period (default 2 weeks), and compresses ref files. It is triggered automatically by many porcelain commands when loose object counts exceed thresholds.',
            code: `# Run standard GC
git gc

# GC with pruning of all unreachable objects now
git gc --prune=now

# Verbose output
git gc --verbose

# Check if auto-GC would trigger
git gc --auto --verbose`,
          },
          {
            title: 'fsck and prune',
            content: '`git fsck` verifies the integrity of the object database, reporting missing objects, broken links, and unreachable commits. `git prune` removes loose unreachable objects (usually called by gc). Use `git prune --dry-run` to preview what would be deleted without actually removing anything.',
            code: `# Full integrity check
git fsck --full

# Show unreachable objects
git fsck --unreachable

# Preview what prune would delete
git prune --dry-run --verbose

# Expire old reflogs first, then prune
git reflog expire --expire=30.days --all
git prune --expire=30.days`,
          },
          {
            title: 'Scheduled Maintenance',
            content: 'Git 2.29+ introduced `git maintenance` for background scheduled tasks: prefetching remotes, packing refs, incrementally repacking, and writing commit-graph files for faster traversal. Enabling maintenance improves responsiveness of large repositories by spreading work across idle time.',
            code: `# Enable background maintenance
git maintenance start

# Run all tasks once
git maintenance run

# Run specific tasks
git maintenance run --task=prefetch
git maintenance run --task=commit-graph
git maintenance run --task=incremental-repack

# Disable scheduled maintenance
git maintenance stop`,
          },
        ],
        quiz: {
          questions: [
            {
              question: 'What is the default grace period before `git gc` prunes unreachable objects?',
              options: ['1 day', '7 days', '2 weeks', '30 days'],
              correctIndex: 2,
              explanation: 'By default, `git gc` only prunes objects older than 2 weeks, giving you time to recover accidentally lost commits via the reflog.',
            },
            {
              question: 'Which command checks the integrity of the Git object database?',
              options: ['git verify-pack', 'git fsck', 'git check-ref-format', 'git gc --check'],
              correctIndex: 1,
              explanation: '`git fsck` traverses the object graph and reports any corrupted, missing, or dangling objects.',
            },
            {
              question: 'What does `git maintenance start` do?',
              options: ['Runs gc immediately', 'Schedules background maintenance tasks', 'Starts the git daemon', 'Enables gc auto-trigger'],
              correctIndex: 1,
              explanation: '`git maintenance start` registers the repository with the system scheduler to run maintenance tasks (prefetch, repack, etc.) automatically in the background.',
            },
          ],
        },
      },
      {
        id: 'git-monorepo',
        title: 'Monorepo Strategies',
        description: 'Sparse checkout, shallow clones, and build tools for large mono-repositories.',
        tags: ['git', 'monorepo', 'sparse-checkout', 'scale', 'organization'],
        isAdvanced: true,
        sections: [
          {
            title: 'Sparse Checkout',
            content: 'Sparse checkout lets you check out only a subset of the repository tree, reducing working directory size for large monorepos. The cone mode (Git 2.26+) is faster and more predictable, operating on directory prefixes rather than arbitrary glob patterns. It dramatically speeds up status and checkout in repos with thousands of files.',
            code: `# Initialize sparse checkout (cone mode)
git clone --filter=blob:none --sparse https://github.com/org/monorepo.git
cd monorepo
git sparse-checkout init --cone

# Add directories to check out
git sparse-checkout set packages/api packages/shared

# List current sparse patterns
git sparse-checkout list`,
          },
          {
            title: 'Shallow and Partial Clones',
            content: 'Shallow clones (`--depth`) truncate history, fetching only recent commits. Partial clones (`--filter`) avoid downloading unreferenced blobs or trees until needed, using lazy fetching. Combining both gives fast CI checkouts of large monorepos. You can later deepen a shallow clone with `git fetch --deepen`.',
            code: `# Shallow clone (last 50 commits)
git clone --depth=50 https://github.com/org/monorepo.git

# Partial clone: no blobs until checked out
git clone --filter=blob:none https://github.com/org/monorepo.git

# Deepen an existing shallow clone
git fetch --deepen=100

# Convert shallow to full clone
git fetch --unshallow`,
          },
          {
            title: 'Monorepo Tooling',
            content: 'Tools like Nx, Turborepo, Bazel, and Buck layer on top of Git to provide affected-change detection, caching, and task orchestration. They query `git diff` output to determine which packages changed and run only necessary builds/tests. Combined with sparse checkout, they make monorepos viable at large scale.',
            code: `# Nx: run only affected tests
npx nx affected:test --base=main --head=HEAD

# Turborepo: build changed packages
npx turbo run build --filter=...[main]

# Find changed files between branches
git diff --name-only main...HEAD

# List changed packages (example script)
git diff --name-only main...HEAD | cut -d/ -f1-2 | sort -u`,
          },
        ],
      },
      {
        id: 'git-conventional-commits',
        title: 'Conventional Commits',
        description: 'Specification, types, breaking changes, and tooling for structured commit messages.',
        tags: ['git', 'conventional-commits', 'specification', 'changelog', 'semver'],
        isAdvanced: true,
        sections: [
          {
            title: 'The Specification',
            content: 'Conventional Commits defines a structured commit message format: `<type>[optional scope]: <description>`. Types include `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, and `ci`. A `!` after the type or a `BREAKING CHANGE:` footer signals a breaking API change that requires a semver major bump.',
            code: `# Feature commit
git commit -m "feat(auth): add OAuth2 login support"

# Bug fix
git commit -m "fix(api): handle null user ID in request"

# Breaking change (two ways)
git commit -m "feat!: remove deprecated v1 endpoints"
git commit -m "refactor(db): rename users table

BREAKING CHANGE: column 'username' renamed to 'user_name'"`,
          },
          {
            title: 'Types and Scopes',
            content: 'The type conveys intent: `feat` adds functionality (minor semver bump), `fix` patches a bug (patch bump), breaking changes trigger major bumps. Scope is an optional noun describing the affected area in parentheses. `docs`, `style`, `refactor`, `test`, and `chore` types do not affect the production version number.',
            code: `# With scope
git commit -m "feat(cart): add discount code support"
git commit -m "fix(cart): correct tax rounding error"
git commit -m "test(cart): add integration tests for checkout"
git commit -m "docs(api): document rate limit headers"
git commit -m "ci(github): add caching to workflow"
git commit -m "perf(search): cache frequent queries"`,
          },
          {
            title: 'Tooling: commitlint and commitizen',
            content: 'Commitlint enforces the convention in CI or as a Git hook. Commitizen provides an interactive CLI prompt to build valid commit messages. Standard-version and semantic-release automate changelog generation and version bumping by parsing commit history. These tools close the loop between commit messages and release automation.',
            code: `# Install commitlint
npm install --save-dev @commitlint/{cli,config-conventional}
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js

# Add as commit-msg hook (with husky)
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'

# Interactive commit with commitizen
npx cz`,
          },
        ],
        quiz: {
          questions: [
            {
              question: 'Which conventional commit type triggers a semver MINOR bump?',
              options: ['fix', 'feat', 'refactor', 'chore'],
              correctIndex: 1,
              explanation: '`feat` indicates a new feature and maps to a semver MINOR version increment. `fix` maps to PATCH, and breaking changes map to MAJOR.',
            },
            {
              question: 'How do you signal a breaking change in a conventional commit?',
              options: ['Use `break:` type', 'Add `!` after the type or include `BREAKING CHANGE:` footer', 'Use `major:` type', 'Add `[breaking]` in scope'],
              correctIndex: 1,
              explanation: 'Breaking changes are indicated by appending `!` to the type (e.g., `feat!:`) or including a `BREAKING CHANGE:` footer in the commit body.',
            },
            {
              question: 'What does commitlint do?',
              options: ['Generates changelogs', 'Bumps version numbers', 'Enforces commit message format', 'Runs tests on commits'],
              correctIndex: 2,
              explanation: 'Commitlint validates that commit messages conform to a defined convention (e.g., Conventional Commits), typically run as a Git hook or in CI.',
            },
          ],
        },
      },
      {
        id: 'git-release-workflow',
        title: 'Release Management',
        description: 'Semantic versioning, tagging releases, changelogs, and GitHub releases.',
        tags: ['git', 'releases', 'semver', 'changelog', 'workflow'],
        isAdvanced: true,
        sections: [
          {
            title: 'Semantic Versioning with Tags',
            content: 'Releases are marked with annotated Git tags following semver (MAJOR.MINOR.PATCH). MAJOR bumps for breaking changes, MINOR for new features, PATCH for bug fixes. Annotated tags (`-a`) store a tagger, date, and message in the object database and can be GPG-signed for authenticity verification.',
            code: `# Create an annotated release tag
git tag -a v2.1.0 -m "Release v2.1.0: add OAuth and fix cart rounding"

# Sign with GPG
git tag -s v2.1.0 -m "Signed release v2.1.0"

# Push tags to remote
git push origin v2.1.0
git push origin --tags   # push all tags

# List tags matching a pattern
git tag -l "v2.*"`,
          },
          {
            title: 'Generating Changelogs',
            content: 'Changelogs can be generated automatically from commit history. `git log` with format strings extracts messages between tags. Tools like `conventional-changelog`, `standard-version`, or `semantic-release` parse Conventional Commit messages to build formatted CHANGELOG.md files and determine the next version number.',
            code: `# Manual changelog: commits since last tag
git log $(git describe --tags --abbrev=0)..HEAD --oneline

# standard-version: auto bump + changelog
npx standard-version

# semantic-release: fully automated
npx semantic-release

# conventional-changelog
npx conventional-changelog -p angular -i CHANGELOG.md -s`,
          },
          {
            title: 'GitHub Releases with gh CLI',
            content: 'GitHub Releases attach release notes, binary assets, and source archives to a tag. The `gh` CLI can create releases directly from the terminal, optionally generating notes from pull request titles and labels merged since the last release. Drafts and pre-releases support staged rollout workflows.',
            code: `# Create a release from a tag
gh release create v2.1.0 --title "v2.1.0" --notes "See CHANGELOG.md"

# Auto-generate notes from merged PRs
gh release create v2.1.0 --generate-notes

# Create a draft release
gh release create v2.1.0 --draft --notes "Draft for review"

# Upload binary assets
gh release upload v2.1.0 dist/app-linux-amd64 dist/app-darwin-amd64`,
          },
        ],
      },
    ],
  },
];
