import type { DocCategory } from './types';

export const GIT_PART1_CATEGORIES: DocCategory[] = [
  {
    id: 'git-getting-started',
    label: 'Getting Started',
    icon: '📦',
    entries: [
      {
        id: 'git-what-is-git',
        title: 'What is Git?',
        difficulty: 'beginner',
        tags: ['git', 'version-control', 'introduction', 'basics', 'dvcs'],
        sections: [
          {
            heading: 'Introduction to Version Control',
            content:
              'Git is a distributed version control system (DVCS) created by Linus Torvalds in 2005 for the development of the Linux kernel. Version control is a system that records changes to files over time so that you can recall specific versions later. Git allows multiple developers to work on the same project simultaneously without overwriting each other\'s changes. Unlike centralized version control systems such as SVN, Git gives every developer a full copy of the entire repository history on their local machine. This means you can work offline, commit changes, create branches, and perform most operations without needing a network connection. Git tracks content rather than files, making it extremely efficient at handling large projects. It uses a snapshot-based model where each commit captures the full state of your project at that point in time, rather than storing diffs between versions. This architectural decision makes branching and merging remarkably fast compared to other version control systems.',
            code: `# Check if Git is installed
git --version
# Output: git version 2.42.0

# View Git's built-in help
git help

# See a summary of common commands
git help -a`,
            note: 'Git is the most widely used version control system in the world. Over 90% of developers use Git according to Stack Overflow surveys.',
          },
          {
            heading: 'Distributed vs Centralized Version Control',
            content:
              'In a centralized version control system (CVCS) like SVN or Perforce, there is a single central server that contains all the versioned files, and clients check out files from that central place. If that server goes down, nobody can collaborate or save versioned changes. In contrast, Git is distributed, meaning every clone is a full backup of all the data. If any server dies, any of the client repositories can be copied back to the server to restore it. Every clone is a full mirror of the repository including its complete history. This distributed nature provides several key advantages: you can work offline and commit changes locally, operations are faster because most are performed locally, you have multiple backups of the repository, and you can use various collaboration workflows like feature branches and pull requests. Git also has a staging area (also called the index) that allows you to craft your commits precisely before recording them permanently. This gives you fine-grained control over what goes into each commit.',
            code: `# Centralized VCS (like SVN):
# Developer -> Central Server -> Developer
# If server is down, no one can commit

# Distributed VCS (like Git):
# Developer <-> Local Repo <-> Remote Repo <-> Developer
# Each developer has full history locally

# Example: viewing your local repository's full history
git log --oneline
# Shows all commits even when offline`,
            analogy: 'Think of Git like a multiplayer game where every player has a complete save file of the entire game world. If the main server crashes, any player can restore the full world from their local save.',
          },
          {
            heading: 'Key Concepts in Git',
            content:
              'Understanding Git requires familiarity with a few core concepts. A repository (repo) is a directory that Git is tracking, containing all your project files plus the hidden .git directory that stores Git\'s metadata. A commit is a snapshot of your project at a point in time, identified by a unique SHA-1 hash. A branch is a lightweight movable pointer to a commit, allowing parallel lines of development. The HEAD is a special pointer that indicates which branch and commit you are currently on. The working directory (or working tree) is where you modify your files. The staging area (or index) is an intermediate area where you prepare changes before committing. A remote is a version of your repository hosted on a server (like GitHub or GitLab). Understanding the three states of Git files is essential: modified means you have changed the file but not staged it, staged means you have marked a modified file to go into your next commit, and committed means the data is safely stored in your local database.',
            code: `# The three states of Git:
# 1. Modified  - Changed but not staged
# 2. Staged    - Marked for next commit
# 3. Committed - Safely stored in repo

# See the state of your files
git status

# The .git directory structure
ls .git/
# HEAD        - Points to current branch
# config      - Repository configuration
# objects/    - All content (blobs, trees, commits)
# refs/       - Pointers to commits (branches, tags)`,
            tip: 'The .git directory is the heart of your repository. Never manually modify files inside .git unless you know exactly what you are doing.',
          },
        ],
        quiz: [
          {
            question: 'What type of version control system is Git?',
            options: ['Centralized', 'Distributed', 'Linear', 'Hierarchical'],
            correctAnswer: 1,
            explanation: 'Git is a distributed version control system where every developer has a full copy of the repository history.',
          },
          {
            question: 'Who created Git and in what year?',
            options: ['Bill Gates in 2000', 'Linus Torvalds in 2005', 'Guido van Rossum in 2003', 'James Gosling in 2007'],
            correctAnswer: 1,
            explanation: 'Git was created by Linus Torvalds in 2005 for Linux kernel development.',
          },
          {
            question: 'What are the three states of files in Git?',
            options: ['Created, Updated, Deleted', 'Modified, Staged, Committed', 'New, Changed, Saved', 'Draft, Review, Final'],
            correctAnswer: 1,
            explanation: 'Files in Git go through three states: modified (changed), staged (marked for commit), and committed (stored in the database).',
          },
        ],
      },
      {
        id: 'git-installation',
        title: 'Installing Git',
        difficulty: 'beginner',
        tags: ['git', 'installation', 'setup', 'beginner'],
        sections: [
          {
            heading: 'Installing Git on Different Operating Systems',
            content:
              'Git can be installed on all major operating systems. On macOS, the easiest way is to install the Xcode Command Line Tools by running "xcode-select --install" in your terminal, which includes Git. Alternatively, you can install it via Homebrew with "brew install git". On Ubuntu or Debian Linux, use the package manager with "sudo apt-get install git". For Fedora, use "sudo dnf install git". On Windows, download the installer from the official Git website (git-scm.com) which provides Git Bash, a Unix-like command-line environment. Windows users can also install Git through the Windows Subsystem for Linux (WSL), winget with "winget install --id Git.Git", or Chocolatey with "choco install git". After installation, verify Git is working by running "git --version" in your terminal. It is recommended to always use the latest stable version of Git to benefit from security patches and new features.',
            code: `# macOS (via Homebrew)
brew install git

# macOS (via Xcode Command Line Tools)
xcode-select --install

# Ubuntu / Debian
sudo apt-get update
sudo apt-get install git

# Fedora
sudo dnf install git

# Windows (via winget)
winget install --id Git.Git -e --source winget

# Verify installation
git --version
# git version 2.42.0`,
            tip: 'On macOS, if you install Homebrew, running "brew install git" gives you a more up-to-date version than the one bundled with Xcode Command Line Tools.',
          },
          {
            heading: 'Verifying and Updating Git',
            content:
              'After installing Git, it is important to verify that the installation was successful and that Git is accessible from your terminal or command prompt. Simply run "git --version" and you should see the installed version number. If you receive a "command not found" error, the Git binary may not be in your system PATH. On Windows, make sure to restart your terminal after installation. You should periodically update Git to get the latest features and security fixes. On macOS with Homebrew, run "brew upgrade git". On Linux, use your package manager\'s update command. On Windows, Git versions 2.16.1 and later include a built-in command "git update-git-for-windows" to update itself. You can also check for the latest version on the official Git website. Keeping Git updated ensures compatibility with remote hosting services like GitHub and GitLab, which may require newer protocol versions or authentication methods.',
            code: `# Verify installation
git --version

# Update Git on macOS (Homebrew)
brew upgrade git

# Update Git on Ubuntu/Debian
sudo apt-get update && sudo apt-get upgrade git

# Update Git on Windows (Git 2.16.1+)
git update-git-for-windows

# Check where Git is installed
which git    # macOS/Linux
where git    # Windows`,
            note: 'If you have multiple versions of Git installed, "which git" (macOS/Linux) or "where git" (Windows) helps you identify which one is being used.',
          },
          {
            heading: 'Git GUI Clients',
            content:
              'While Git is primarily a command-line tool, several graphical user interface (GUI) clients are available for those who prefer a visual approach. Popular options include GitHub Desktop (free, works well with GitHub), GitKraken (cross-platform with a visual commit graph), Sourcetree (free from Atlassian, integrates well with Bitbucket), and VS Code\'s built-in Git integration. Most IDEs like IntelliJ IDEA, Visual Studio, and Eclipse also have built-in Git support. However, learning Git from the command line is strongly recommended because it gives you a deeper understanding of how Git works, the CLI provides access to all Git features while GUIs may only expose a subset, most tutorials and documentation use CLI commands, and when something goes wrong, the command line is the most reliable way to fix issues. GUI clients are great for visualizing branch history, resolving merge conflicts, and staging individual lines of code, but the command line remains the most powerful and flexible way to use Git.',
            code: `# Popular Git GUI clients:
# - GitHub Desktop    (Free, macOS/Windows)
# - GitKraken         (Cross-platform)
# - Sourcetree        (Free, macOS/Windows)
# - VS Code           (Built-in Git panel)
# - lazygit           (Terminal UI)

# Install lazygit (terminal-based UI)
# macOS
brew install lazygit
# Ubuntu
sudo apt install lazygit

# VS Code Git from command line
code --diff file1.txt file2.txt`,
            tip: 'Even if you use a GUI client daily, invest time learning the Git command line. It will save you when the GUI cannot handle an edge case.',
          },
        ],
      },
      {
        id: 'git-configuration',
        title: 'Git Configuration',
        difficulty: 'beginner',
        tags: ['git', 'configuration', 'setup', 'config', 'identity'],
        sections: [
          {
            heading: 'Setting Up Your Identity',
            content:
              'The first thing you should do after installing Git is set your user name and email address. This is important because every Git commit uses this information, and it is immutably baked into the commits you create. Git configuration works on three levels: system (applies to all users on the machine), global (applies to your user account), and local (applies to a specific repository). The global configuration is stored in your home directory in a file called .gitconfig, while the local configuration is stored in the .git/config file of each repository. Local settings override global ones, which override system ones. Setting your identity is required because Git needs to know who is making each commit. When you push commits to a remote service like GitHub, the email you configure should match the email associated with your account so that your commits are properly attributed to you. You can verify your settings at any time using "git config --list" to see all active configuration values.',
            code: `# Set your identity (global - applies to all repos)
git config --global user.name "Your Name"
git config --global user.email "you@example.com"

# Set identity for a specific repo (local)
git config user.name "Work Name"
git config user.email "you@company.com"

# View all configuration
git config --list

# View specific setting
git config user.name

# See where each setting is defined
git config --list --show-origin`,
            note: 'Use the same email for Git config and your GitHub/GitLab account so your commits get linked to your profile.',
          },
          {
            heading: 'Essential Configuration Options',
            content:
              'Beyond identity, there are several important configuration options you should set up. The default branch name can be changed from "master" to "main" using "git config --global init.defaultBranch main". Setting your preferred text editor is crucial for writing commit messages; common choices include VS Code, Vim, and Nano. You should configure line ending handling to avoid issues when collaborating across different operating systems: on Windows, set "core.autocrlf" to true, and on macOS/Linux, set it to input. Color output makes Git\'s terminal output much easier to read and should be enabled. Pull strategy configuration determines how Git reconciles divergent branches; "pull.rebase false" uses merge (the default), while "pull.rebase true" uses rebase. Credential caching stores your authentication credentials temporarily so you do not need to enter them repeatedly. These settings significantly improve your day-to-day Git experience and prevent common cross-platform collaboration issues.',
            code: `# Set default branch name
git config --global init.defaultBranch main

# Set default editor
git config --global core.editor "code --wait"   # VS Code
git config --global core.editor "vim"            # Vim
git config --global core.editor "nano"           # Nano

# Line endings
git config --global core.autocrlf true   # Windows
git config --global core.autocrlf input  # macOS/Linux

# Enable colored output
git config --global color.ui auto

# Set pull strategy
git config --global pull.rebase false  # merge (default)

# Credential caching (15 min)
git config --global credential.helper cache

# macOS Keychain
git config --global credential.helper osxkeychain`,
            tip: 'Using "code --wait" as your editor tells Git to wait until you close the VS Code editor tab before proceeding.',
          },
          {
            heading: 'Git Aliases for Productivity',
            content:
              'Git aliases let you create shortcuts for frequently used commands, saving you keystrokes and improving your workflow. An alias maps a short name to a longer Git command. For example, instead of typing "git status" every time, you can create an alias "git st" that does the same thing. You can create aliases using the "git config" command or by editing your .gitconfig file directly. Aliases can include flags and even chain multiple commands together using shell commands by prefixing with an exclamation mark. Some of the most useful aliases include a short status ("st" for "status -sb"), a pretty log graph ("lg" for a formatted log with branch graph), and an amend shortcut ("amend" for "commit --amend --no-edit"). Power users often build up extensive alias libraries over time. Aliases are stored in the [alias] section of your .gitconfig file and can be shared with your team by documenting them or distributing a shared config file.',
            code: `# Create common aliases
git config --global alias.st "status -sb"
git config --global alias.co "checkout"
git config --global alias.br "branch"
git config --global alias.ci "commit"
git config --global alias.unstage "reset HEAD --"
git config --global alias.last "log -1 HEAD"
git config --global alias.lg "log --oneline --graph --decorate --all"
git config --global alias.amend "commit --amend --no-edit"

# Usage
git st          # Short status
git lg          # Pretty log graph
git last        # Show last commit
git unstage file.txt  # Unstage a file

# List all aliases
git config --get-regexp alias`,
            tip: 'Start with a few basic aliases and add more as you discover commands you use frequently. The "lg" alias for a pretty log graph is one of the most popular.',
          },
        ],
        quiz: [
          {
            question: 'What are the three levels of Git configuration?',
            options: ['Low, Medium, High', 'System, Global, Local', 'User, Project, File', 'Root, Home, Repo'],
            correctAnswer: 1,
            explanation: 'Git configuration has three levels: system (all users), global (your user account), and local (specific repository). Local overrides global, which overrides system.',
          },
          {
            question: 'Which command sets your Git username globally?',
            options: ['git set user.name "Name"', 'git config --global user.name "Name"', 'git user --name "Name"', 'git setup name "Name"'],
            correctAnswer: 1,
            explanation: 'The command "git config --global user.name" sets the username for all repositories under your user account.',
          },
          {
            question: 'What does core.autocrlf handle?',
            options: ['Color output', 'Line ending conversions', 'Auto-commit messages', 'Credential caching'],
            correctAnswer: 1,
            explanation: 'core.autocrlf handles line ending conversions between operating systems (CRLF on Windows vs LF on macOS/Linux).',
          },
        ],
      },
      {
        id: 'git-init',
        title: 'Initializing a Repository',
        difficulty: 'beginner',
        tags: ['git', 'init', 'repository', 'setup', 'basics'],
        sections: [
          {
            heading: 'Creating a New Repository with git init',
            content:
              'The "git init" command creates a new Git repository. It is used to convert an existing project directory into a Git repository, or to create a new empty repository. When you run "git init", Git creates a hidden .git subdirectory in the current folder. This .git directory contains all the necessary metadata and object database for your repository, including subdirectories for objects, refs, and template files. Running "git init" in an existing repository is safe; it will not overwrite things that are already there. You can also specify a directory name as an argument to create a new directory and initialize it as a Git repository in one step. After initialization, you are on the default branch (usually "main" or "master" depending on your configuration). No files are tracked yet; you need to explicitly add files using "git add" and create your first commit. The repository is entirely local at this point and has no connection to any remote server until you add one.',
            code: `# Initialize a new repo in current directory
git init

# Initialize a new repo in a specific directory
git init my-project

# Initialize with a specific default branch name
git init --initial-branch=main my-project
# or equivalently
git init -b main my-project

# What git init creates:
ls -la .git/
# drwxr-xr-x  HEAD
# drwxr-xr-x  config
# drwxr-xr-x  description
# drwxr-xr-x  hooks/
# drwxr-xr-x  info/
# drwxr-xr-x  objects/
# drwxr-xr-x  refs/`,
            note: 'Running "git init" is a one-time operation. You only need to do it once per project to set up the repository.',
          },
          {
            heading: 'Understanding the .git Directory',
            content:
              'The .git directory is the backbone of your Git repository. Understanding its structure helps you understand how Git works internally. The HEAD file points to the currently checked-out branch. The config file contains repository-specific configuration. The objects directory stores all the content for your database, including blobs (file content), trees (directory listings), and commits (snapshots). The refs directory holds pointers to commit objects, organized into heads (branches), tags, and remotes. The index file (created after your first "git add") acts as the staging area. The hooks directory contains client-side and server-side hook scripts that can automate tasks before or after Git operations. The description file is only used by the GitWeb program. This directory is what makes your project a Git repository; if you delete it, you lose all version history. Git uses a content-addressable storage system where every object is identified by its SHA-1 hash, ensuring data integrity and enabling efficient storage through deduplication.',
            code: `# View the .git directory structure
tree .git/ -L 1

# View what HEAD points to
cat .git/HEAD
# ref: refs/heads/main

# View the config file
cat .git/config
# [core]
#     repositoryformatversion = 0
#     filemode = true
#     bare = false

# List available hooks
ls .git/hooks/
# pre-commit.sample
# pre-push.sample
# commit-msg.sample
# ...`,
            warning: 'Never manually delete or modify files in the .git directory unless you fully understand the consequences. Corrupting this directory means losing your entire repository history.',
          },
          {
            heading: 'Bare Repositories',
            content:
              'A bare repository is a Git repository without a working directory. It only contains the .git directory contents at the top level. Bare repositories are used as central shared repositories that developers push to and pull from; they are the standard format for remote repositories on servers. You create a bare repository with "git init --bare". Since there is no working directory, you cannot directly edit files or make commits in a bare repository. It serves purely as a storage and synchronization point. Services like GitHub, GitLab, and Bitbucket store bare repositories on their servers. When you push code to a remote, you are updating a bare repository. Bare repositories have a slightly different structure: the files that would normally be inside .git are instead at the top level of the directory. The convention is to name bare repositories with a .git suffix (e.g., "my-project.git"). Understanding the difference between bare and non-bare repositories is important when setting up your own Git server or understanding how hosting services work.',
            code: `# Create a bare repository
git init --bare my-project.git

# List contents of a bare repository
ls my-project.git/
# HEAD  config  description  hooks/  info/  objects/  refs/

# Convert an existing repo to bare (for server use)
git clone --bare my-project my-project.git

# Clone from a bare repository
git clone /path/to/my-project.git

# Use bare repo as a remote
git remote add origin /path/to/my-project.git
git push -u origin main`,
            tip: 'When setting up a shared server repository, always use --bare. Non-bare repositories on servers can cause issues when people push to them.',
          },
        ],
        quiz: [
          {
            question: 'What does "git init" create in your project directory?',
            options: ['A README file', 'A .git hidden directory', 'A .gitignore file', 'A remote connection'],
            correctAnswer: 1,
            explanation: 'git init creates a .git hidden subdirectory containing all the metadata and object database for the repository.',
          },
          {
            question: 'What is a bare repository?',
            options: ['An empty repository with no commits', 'A repository without a .git directory', 'A repository without a working directory', 'A repository with no branches'],
            correctAnswer: 2,
            explanation: 'A bare repository has no working directory; it only contains the Git database. It is used for shared/server repositories.',
          },
          {
            question: 'Is it safe to run "git init" in an existing Git repository?',
            options: ['No, it will delete all history', 'No, it will corrupt the repo', 'Yes, it will not overwrite existing data', 'Yes, but only if the repo is empty'],
            correctAnswer: 2,
            explanation: 'Running git init in an existing repository is safe. It will not overwrite things that are already there.',
          },
        ],
      },
      {
        id: 'git-clone',
        title: 'Cloning Repositories',
        difficulty: 'beginner',
        tags: ['git', 'clone', 'remote', 'download', 'repository'],
        sections: [
          {
            heading: 'Cloning a Repository with git clone',
            content:
              'The "git clone" command creates a copy of an existing Git repository. When you clone a repository, Git downloads the entire history and all branches, creating a complete local copy on your machine. By default, Git automatically creates a remote connection called "origin" pointing back to the original repository and sets up your local "main" branch to track the remote "main" branch. This makes it easy to push and pull changes later. Cloning is the most common way to get a copy of a project. You can clone using HTTPS (requires username and password or token) or SSH (requires setting up SSH keys). HTTPS is easier to set up initially, but SSH is more convenient for frequent access because it does not require entering credentials each time. When you clone a repository, the directory is named after the repository by default, but you can specify a custom directory name as a second argument. Git clone supports several protocols including HTTPS, SSH, Git protocol, and local file paths.',
            code: `# Clone via HTTPS
git clone https://github.com/user/repo.git

# Clone via SSH
git clone git@github.com:user/repo.git

# Clone into a specific directory
git clone https://github.com/user/repo.git my-folder

# Clone and see what happens
git clone https://github.com/user/repo.git
# Cloning into 'repo'...
# remote: Enumerating objects: 100, done.
# remote: Counting objects: 100% (100/100), done.
# remote: Compressing objects: 100% (80/80), done.
# Receiving objects: 100% (100/100), 50.00 KiB, done.
# Resolving deltas: 100% (40/40), done.`,
            note: 'After cloning, the "origin" remote is automatically set up pointing to the repository you cloned from.',
          },
          {
            heading: 'Shallow and Partial Clones',
            content:
              'For large repositories, cloning the entire history can take a long time and consume significant disk space. Git provides options to create partial copies. A shallow clone uses "--depth" to limit the number of commits downloaded. For example, "--depth 1" gives you only the latest commit, dramatically reducing clone time and size. This is useful for CI/CD pipelines where you only need the latest code to build. You can later "unshallow" a shallow clone to get the full history with "git fetch --unshallow". Partial clones, available since Git 2.22, use "--filter" to exclude large files from the initial download, fetching them on demand when needed. This is useful for repositories with large binary files. Single-branch cloning with "--single-branch" only downloads the history for one branch instead of all branches. You can combine these options: "git clone --depth 1 --single-branch" gives you the absolute minimum needed to start working with the latest code on a single branch.',
            code: `# Shallow clone (last commit only)
git clone --depth 1 https://github.com/user/repo.git

# Shallow clone with N commits
git clone --depth 10 https://github.com/user/repo.git

# Convert shallow to full clone
git fetch --unshallow

# Clone single branch only
git clone --single-branch --branch main https://github.com/user/repo.git

# Partial clone (exclude blobs, fetch on demand)
git clone --filter=blob:none https://github.com/user/repo.git

# Partial clone (exclude large blobs)
git clone --filter=blob:limit=1m https://github.com/user/repo.git

# Combine options for fastest clone
git clone --depth 1 --single-branch https://github.com/user/repo.git`,
            tip: 'Use "git clone --depth 1" in CI/CD pipelines to speed up builds. You rarely need full history in automated environments.',
          },
          {
            heading: 'Cloning with Submodules and Mirrors',
            content:
              'Some repositories use Git submodules to include other repositories as dependencies. When you clone such a repository, the submodule directories will be empty by default. To automatically initialize and update submodules during the clone, use "--recurse-submodules" or "--recursive". If you forgot to use this flag, you can initialize submodules after cloning with "git submodule update --init --recursive". For creating an exact copy of a repository (including all refs, hooks, and configuration), use "git clone --mirror". A mirror clone is a bare repository that is an exact replica of the source, including all branches, tags, and other refs. This is useful for creating backups or migrating repositories between hosting services. Unlike a regular clone, a mirror clone includes hidden refs and is set up so that a "git remote update" will re-fetch everything from the origin. When migrating, you can push the mirror to a new remote using "git push --mirror". Be careful with mirror pushes as they will overwrite everything at the destination.',
            code: `# Clone with submodules
git clone --recurse-submodules https://github.com/user/repo.git

# Initialize submodules after regular clone
git submodule update --init --recursive

# Create a mirror (exact backup)
git clone --mirror https://github.com/user/repo.git

# Migrate repository to new host
git clone --mirror https://old-host.com/user/repo.git
cd repo.git
git remote set-url origin https://new-host.com/user/repo.git
git push --mirror

# Clone from local path
git clone /path/to/local/repo new-copy

# Clone with specific SSH key
GIT_SSH_COMMAND="ssh -i ~/.ssh/specific_key" git clone git@github.com:user/repo.git`,
            warning: 'Using "git push --mirror" to a remote will overwrite ALL refs (branches, tags) at the destination. Use with extreme caution on repositories others are working on.',
          },
        ],
        challenge: {
          title: 'Clone and Explore',
          description: 'Practice different cloning strategies by cloning a public repository using various options.',
          steps: [
            'Clone any public GitHub repository with full history',
            'Check the size of the .git directory with "du -sh .git"',
            'Delete the clone and re-clone with --depth 1',
            'Compare the .git directory sizes between full and shallow clones',
            'Run "git log" in both to see the difference in available history',
          ],
          expectedOutput: 'The shallow clone should have a significantly smaller .git directory and show only one commit in git log.',
        },
      },
      {
        id: 'git-basic-workflow',
        title: 'Basic Git Workflow',
        difficulty: 'beginner',
        tags: ['git', 'workflow', 'basics', 'staging', 'commit', 'working-directory'],
        sections: [
          {
            heading: 'The Three-Tree Architecture',
            content:
              'Git uses a three-tree architecture that is fundamental to understanding how it works. The three trees are the Working Directory, the Staging Area (Index), and the Repository (HEAD). The Working Directory is where you modify files; it is the actual files on your filesystem. The Staging Area is an intermediate area where you prepare the next commit; it holds a snapshot of what will go into the next commit. The Repository stores the committed snapshots permanently. The basic workflow follows this pattern: you edit files in your working directory, stage the changes you want to include in the next commit using "git add", then permanently record the staged snapshot using "git commit". This two-step process (stage then commit) gives you precise control over what goes into each commit. You can stage parts of your changes while leaving other modifications in the working directory for a future commit. Understanding this flow is critical to mastering Git, as almost every operation involves moving data between these three areas.',
            code: `# The basic workflow:

# 1. Edit files in working directory
echo "Hello World" > hello.txt

# 2. Stage changes (working dir -> staging area)
git add hello.txt

# 3. Commit (staging area -> repository)
git commit -m "Add hello.txt"

# Check status at each step
git status
# On branch main
# Changes to be committed:
#   (use "git restore --staged <file>..." to unstage)
#     new file:   hello.txt`,
            diagram: {
              kind: 'mermaid',
              code: 'graph LR\n    WD["Working Directory<br/>(edit files)"] -->|git add| SA["Staging Area<br/>(prepare commit)"]\n    SA -->|git commit| REPO["Repository<br/>(permanent history)"]\n    REPO -->|git checkout| WD\n    SA -->|git restore --staged| WD\n    style WD fill:#f9d71c,stroke:#333,color:#000\n    style SA fill:#4ecdc4,stroke:#333,color:#000\n    style REPO fill:#ff6b6b,stroke:#333,color:#fff',
              caption: 'The Git three-tree architecture: files flow from Working Directory to Staging Area to Repository',
            },
          },
          {
            heading: 'A Complete Workflow Example',
            content:
              'Let us walk through a complete Git workflow from start to finish. First, you create or clone a repository. Then you begin making changes to files in your working directory. As you complete logical units of work, you stage those changes with "git add". You can use "git status" at any time to see which files are modified, staged, or untracked. When you have staged everything you want to include, you create a commit with "git commit -m" followed by a descriptive message. Each commit should represent a single logical change such as fixing a bug, adding a feature, or refactoring code. Good commit messages explain why the change was made, not just what was changed. After committing locally, you push your changes to a remote repository with "git push" to share your work with others. You can also pull changes from the remote with "git pull" to stay up to date. This edit-stage-commit-push cycle is the daily rhythm of working with Git. Mastering this flow is the foundation for all advanced Git operations.',
            code: `# Complete workflow example
mkdir my-project && cd my-project
git init

# Create some files
echo "# My Project" > README.md
echo "console.log('hello');" > index.js

# Check status - files are untracked
git status
# Untracked files:
#   README.md
#   index.js

# Stage all files
git add .

# Check status - files are staged
git status
# Changes to be committed:
#   new file:   README.md
#   new file:   index.js

# Commit
git commit -m "Initial commit with README and index"

# Make more changes
echo "console.log('goodbye');" >> index.js

# Stage and commit
git add index.js
git commit -m "Add goodbye message to index"

# View history
git log --oneline
# a1b2c3d Add goodbye message to index
# e4f5g6h Initial commit with README and index`,
            note: 'Use "git add ." to stage all changes in the current directory, or specify individual files for more precise control.',
          },
          {
            heading: 'Undoing Changes at Each Stage',
            content:
              'Knowing how to undo changes at each stage of the workflow is essential. If you have modified a file in the working directory but want to discard the changes, use "git restore <file>" (or the older "git checkout -- <file>"). If you have staged a file but want to unstage it (move it back to just modified in working directory), use "git restore --staged <file>" (or the older "git reset HEAD <file>"). If you have committed but want to undo the commit, "git revert" creates a new commit that undoes the changes from a previous commit, which is safe for shared history. For local-only changes, "git reset --soft HEAD~1" moves the HEAD back one commit but keeps changes staged, "git reset --mixed HEAD~1" (the default) keeps changes in the working directory but unstaged, and "git reset --hard HEAD~1" discards all changes completely. The "restore" command was introduced in Git 2.23 to provide clearer, more intuitive commands for these common operations, replacing the overloaded "checkout" and "reset" commands for these use cases.',
            code: `# Discard changes in working directory
git restore file.txt

# Unstage a staged file
git restore --staged file.txt

# Undo last commit (keep changes staged)
git reset --soft HEAD~1

# Undo last commit (keep changes unstaged)
git reset HEAD~1

# Undo last commit (discard all changes) - DANGEROUS
git reset --hard HEAD~1

# Safely undo a published commit
git revert abc123

# Discard all unstaged changes - DANGEROUS
git restore .

# See what would be restored
git diff          # unstaged changes
git diff --staged # staged changes`,
            warning: 'Commands with --hard permanently delete changes. Always double-check with "git status" and "git diff" before using --hard.',
          },
        ],
        quiz: [
          {
            question: 'What are the three "trees" in Git\'s architecture?',
            options: ['Branch, Tag, Remote', 'Working Directory, Staging Area, Repository', 'Local, Remote, Origin', 'Main, Develop, Feature'],
            correctAnswer: 1,
            explanation: 'Git uses three trees: Working Directory (your files), Staging Area (prepared changes), and Repository (committed history).',
          },
          {
            question: 'Which command moves changes from working directory to staging area?',
            options: ['git commit', 'git push', 'git add', 'git stage'],
            correctAnswer: 2,
            explanation: 'The "git add" command stages changes, moving them from the working directory to the staging area.',
          },
          {
            question: 'How do you undo the last commit but keep changes staged?',
            options: ['git revert HEAD', 'git reset --hard HEAD~1', 'git reset --soft HEAD~1', 'git restore HEAD'],
            correctAnswer: 2,
            explanation: 'git reset --soft HEAD~1 moves HEAD back one commit but keeps all changes in the staging area.',
          },
        ],
      },
      {
        id: 'git-help',
        title: 'Getting Help',
        difficulty: 'beginner',
        tags: ['git', 'help', 'documentation', 'man-pages'],
        sections: [
          {
            heading: 'Using Git Help Commands',
            content:
              'Git has a comprehensive built-in help system that you can access directly from the command line. There are three equivalent ways to get the full manual page for any Git command: "git help <command>", "git <command> --help", or "man git-<command>". These open the full documentation in your default pager or web browser. For a quick refresher, use "git <command> -h" (lowercase h), which prints a concise usage summary directly in the terminal without opening a separate page. This is extremely useful when you just need to remember the syntax or available flags. Running "git help" with no arguments shows a list of the most common Git commands organized by category. Running "git help -a" shows all available commands, and "git help -g" lists available concept guides. The Git documentation is thorough and well-written, making it an invaluable resource for learning and reference. Most help pages include a description, synopsis showing the command syntax, detailed options, examples, and cross-references to related commands.',
            code: `# Full manual page for a command
git help commit
git commit --help
man git-commit

# Quick summary (prints in terminal)
git commit -h

# List common commands
git help

# List ALL available commands
git help -a

# List concept guides
git help -g

# Read a specific guide
git help tutorial
git help everyday
git help workflows
git help glossary`,
            tip: 'Use "git <command> -h" (lowercase h) for a quick terminal summary, and "git help <command>" for the full manual page.',
          },
          {
            heading: 'Online Documentation and Resources',
            content:
              'Beyond the built-in help, there are excellent online resources for learning Git. The official Git documentation at git-scm.com/doc includes the complete reference manual, the free "Pro Git" book by Scott Chacon and Ben Straub, and tutorial videos. The Pro Git book is widely considered the definitive guide to Git and covers everything from basics to advanced internals. GitHub provides its own learning resources at docs.github.com and the interactive GitHub Skills courses. Stack Overflow has a vast collection of Git questions and answers, making it invaluable for troubleshooting specific problems. The "git help tutorial" command opens a step-by-step introduction to Git, while "git help everyday" shows the most useful subset of commands for daily work. For visual learners, sites like "Explain Git with D3" provide interactive visualizations of Git operations, and "Learn Git Branching" (learngitbranching.js.org) offers an interactive tutorial that teaches branching through visual exercises. Building fluency with Git help commands will make you self-sufficient in solving Git challenges.',
            code: `# Open Git reference in browser
git help --web commit

# Key online resources:
# - git-scm.com/doc            (Official docs)
# - git-scm.com/book           (Pro Git book - free)
# - docs.github.com            (GitHub docs)
# - learngitbranching.js.org   (Interactive tutorial)
# - ohshitgit.com              (Common mistake fixes)

# Useful concept guides
git help revisions    # How to specify revisions
git help gitignore    # .gitignore patterns
git help gitattributes # File attributes
git help gitmodules   # Submodule configuration

# Search git help for a keyword
git help -a | grep "branch"`,
            note: 'The Pro Git book at git-scm.com/book is free and considered the gold standard resource for learning Git in depth.',
          },
          {
            heading: 'Debugging Git Problems',
            content:
              'When things go wrong with Git (and they will), knowing how to debug and recover is essential. The "git status" command is your first stop; it tells you the current state of your repository and often suggests what to do next. The "git reflog" command shows a log of all the recent HEAD movements and is your safety net for recovering from mistakes, as it records every action even those that "git log" does not show. You can use "git reflog" to find a previous state and "git reset" or "git checkout" to return to it. For understanding what happened in a specific commit, "git show <commit>" displays the changes. Setting the GIT_TRACE environment variable makes Git output debugging information about the commands it runs internally. For network issues, GIT_CURL_VERBOSE=1 shows detailed HTTP communication. The "git fsck" command verifies the integrity of your repository\'s object database, which is useful if you suspect corruption. Remember that Git almost never permanently deletes data; even after a "git reset --hard", objects typically remain in the repository for at least 30 days before garbage collection removes them.',
            code: `# Check repository status (always start here)
git status

# View reflog - your safety net
git reflog
# a1b2c3d HEAD@{0}: commit: Add feature
# e4f5g6h HEAD@{1}: checkout: moving from dev to main
# i7j8k9l HEAD@{2}: commit: Fix bug

# Recover from mistakes using reflog
git reset --hard HEAD@{2}  # Go back to state 2

# Enable Git tracing for debugging
GIT_TRACE=1 git status
GIT_TRACE=1 git push

# Debug network issues
GIT_CURL_VERBOSE=1 git fetch

# Verify repository integrity
git fsck

# Find dangling (unreachable) objects
git fsck --unreachable`,
            tip: 'When you think you have lost commits, always check "git reflog" first. It keeps a record of every HEAD position change for the last 90 days by default.',
          },
        ],
      },
      {
        id: 'git-gitignore',
        title: 'The .gitignore File',
        difficulty: 'beginner',
        tags: ['git', 'gitignore', 'ignore', 'patterns', 'configuration'],
        sections: [
          {
            heading: 'Understanding .gitignore',
            content:
              'The .gitignore file tells Git which files and directories to ignore, meaning Git will not track them or include them in commits. This is essential for keeping your repository clean by excluding files that should not be version-controlled, such as compiled binaries, dependency directories (like node_modules), operating system files (like .DS_Store on macOS), IDE configuration files, environment files containing secrets (.env), and build output directories. The .gitignore file should be committed to the repository so that all team members share the same ignore rules. You can have a .gitignore file in any directory of your repository; patterns in it apply relative to that directory. There is also a global .gitignore file for patterns you want to ignore across all your repositories, configured with "git config --global core.excludesFile ~/.gitignore_global". The .gitignore file uses glob patterns for matching. Each line specifies a pattern, blank lines are ignored, and lines starting with # are comments. It is a best practice to create the .gitignore file at the start of your project before the first commit.',
            code: `# Create a .gitignore file
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
vendor/

# Build output
dist/
build/
*.o
*.pyc

# Environment files
.env
.env.local
.env.*.local

# IDE files
.idea/
.vscode/
*.swp
*.swo

# OS files
.DS_Store
Thumbs.db

# Logs
*.log
logs/
EOF

# Set up a global gitignore
git config --global core.excludesFile ~/.gitignore_global`,
            note: 'Always create a .gitignore file before your first commit. It is much harder to untrack files that have already been committed.',
          },
          {
            heading: 'Gitignore Pattern Syntax',
            content:
              'The .gitignore file supports a rich pattern syntax for matching files and directories. A simple filename like "debug.log" matches that file in any directory. A directory name followed by a slash like "logs/" matches only directories with that name and everything inside them. The asterisk (*) matches any string of characters except a slash, so "*.log" matches all log files. The double asterisk (**) matches any number of directories, so "**/logs" matches "logs" at any depth, and "logs/**" matches everything inside a logs directory. A question mark (?) matches any single character. Square brackets ([]) match a single character from a set, like "[abc]" or a range "[0-9]". A leading exclamation mark (!) negates the pattern, meaning it re-includes a file that was previously excluded. A leading slash (/) anchors the pattern to the directory where the .gitignore resides. Patterns are evaluated from top to bottom, with later patterns overriding earlier ones. Understanding these patterns lets you write precise and maintainable ignore rules.',
            code: `# Pattern examples in .gitignore

# Ignore all .log files
*.log

# But track important.log
!important.log

# Ignore build directory in root only
/build/

# Ignore build directory at any depth
**/build/

# Ignore all files in any temp directory
**/temp/**

# Ignore all .txt files in doc/ (not recursive)
doc/*.txt

# Ignore all .pdf files in doc/ (recursive)
doc/**/*.pdf

# Ignore files with specific extensions
*.[oa]          # .o and .a files
*.py[cod]       # .pyc, .pyo, .pyd files

# Ignore everything in a folder except one file
build/*
!build/.gitkeep`,
            tip: 'Use "git check-ignore -v <file>" to debug why a file is being ignored and which pattern matches it.',
          },
          {
            heading: 'Working with Already-Tracked Files',
            content:
              'A common issue arises when you add a pattern to .gitignore for a file that is already being tracked by Git. The .gitignore file only prevents untracked files from being added; it does not affect files that are already tracked. To stop tracking a file that is already committed, you need to remove it from Git\'s index (staging area) with "git rm --cached <file>". The --cached flag removes the file from the index only, leaving the actual file on your disk. Without --cached, git rm would delete the file from both the index and the working directory. After removing the file from the index and adding the appropriate pattern to .gitignore, commit both changes. For directories, use "git rm -r --cached <directory>". A common scenario is accidentally committing a node_modules directory or .env file. You would add the pattern to .gitignore, run "git rm -r --cached node_modules/" to untrack it, then commit. Note that the files will still exist in the repository\'s history unless you use tools like "git filter-branch" or BFG Repo-Cleaner to rewrite history, which is important for accidentally committed secrets.',
            code: `# Stop tracking a file (keep on disk)
git rm --cached secret.env
echo "secret.env" >> .gitignore
git commit -m "Stop tracking secret.env"

# Stop tracking a directory
git rm -r --cached node_modules/
echo "node_modules/" >> .gitignore
git commit -m "Stop tracking node_modules"

# Check if a file is ignored
git check-ignore -v myfile.log
# .gitignore:3:*.log    myfile.log

# List all ignored files
git status --ignored

# List all tracked files (to find what should be ignored)
git ls-files

# Force add an ignored file (override .gitignore)
git add -f important-but-ignored.log

# Templates at github.com/github/gitignore
# Use for quick project setup`,
            warning: 'If you accidentally committed sensitive data like passwords or API keys, simply adding the file to .gitignore is NOT enough. The data remains in Git history. You must rotate the credentials immediately and consider rewriting history with BFG Repo-Cleaner.',
          },
        ],
        quiz: [
          {
            question: 'What does a .gitignore pattern "*.log" match?',
            options: ['Only files named .log', 'All files ending in .log in the root directory only', 'All files ending in .log in any directory', 'All directories named log'],
            correctAnswer: 2,
            explanation: 'The pattern "*.log" matches any file ending with .log in any directory of the repository.',
          },
          {
            question: 'How do you stop tracking a file that is already committed?',
            options: ['Just add it to .gitignore', 'git rm --cached <file>', 'git ignore <file>', 'Delete the file and commit'],
            correctAnswer: 1,
            explanation: '"git rm --cached <file>" removes the file from Git\'s index while keeping it on disk. Then add it to .gitignore.',
          },
          {
            question: 'What does the "!" prefix do in a .gitignore pattern?',
            options: ['Comments out the line', 'Deletes matching files', 'Negates the pattern (re-includes the file)', 'Marks the pattern as required'],
            correctAnswer: 2,
            explanation: 'The "!" prefix negates a pattern, re-including a file that was previously excluded by an earlier pattern.',
          },
        ],
      },
    ],
  },
  {
    id: 'git-basic-commands',
    label: 'Basic Commands',
    icon: '⌨️',
    entries: [
      {
        id: 'git-add',
        title: 'git add',
        difficulty: 'beginner',
        tags: ['git', 'add', 'staging', 'index', 'track'],
        sections: [
          {
            heading: 'Staging Changes with git add',
            content:
              'The "git add" command adds changes from the working directory to the staging area (also called the index). It tells Git that you want to include updates to particular files in the next commit. The staging area is a key concept in Git that acts as a buffer between your working directory and the repository. You can think of it as a preview of your next commit. This two-step process (add then commit) gives you fine-grained control over what goes into each commit, allowing you to group related changes together even if you modified many files. "git add" does not actually record the changes permanently; that happens when you run "git commit". You can stage individual files, specific directories, or all changes at once. Git add is also used to mark merge conflicts as resolved after you have manually fixed the conflicting files. Understanding git add thoroughly is essential because it is one of the most frequently used Git commands in your daily workflow.',
            code: `# Add a specific file
git add README.md

# Add multiple specific files
git add file1.txt file2.txt file3.txt

# Add all files in a directory
git add src/

# Add all changes in current directory (recursively)
git add .

# Add all tracked and untracked files in entire repo
git add -A
# or
git add --all

# Stage only tracked files (not new untracked files)
git add -u

# Check what would be staged (dry run)
git add --dry-run .`,
            note: 'The "git add ." command stages changes from the current directory down, while "git add -A" stages changes from the entire repository regardless of your current directory.',
          },
          {
            heading: 'Interactive and Patch Staging',
            content:
              'Git add supports patch mode with the "-p" or "--patch" flag, which is one of the most powerful features for creating clean, focused commits. In patch mode, Git shows you each change (hunk) in your modified files one at a time and asks whether you want to stage it. You can answer "y" to stage the hunk, "n" to skip it, "s" to split the hunk into smaller pieces, "e" to manually edit the hunk, or "q" to quit. This allows you to stage only part of a file, which is invaluable when you have made multiple unrelated changes to the same file and want to separate them into different commits. For example, if you fixed a bug and added a feature in the same file, you can stage the bug fix hunks in one commit and the feature hunks in another. This results in a much cleaner and more meaningful commit history. While it requires more effort upfront, disciplined use of patch staging makes code review, bisecting, and reverting much easier in the long run.',
            code: `# Stage changes interactively (hunk by hunk)
git add -p
# or
git add --patch

# Patch mode options:
# y - stage this hunk
# n - do not stage this hunk
# s - split into smaller hunks
# e - manually edit the hunk
# q - quit (already staged hunks remain staged)
# a - stage this hunk and all remaining
# d - do not stage this hunk or any remaining

# Stage specific hunks from a specific file
git add -p myfile.js

# Example output:
# @@ -1,4 +1,5 @@
#  line 1
# +new line added
#  line 2
#  line 3
# Stage this hunk [y,n,q,a,d,s,e,?]?`,
            tip: 'Use "git add -p" regularly to review your changes before staging. It catches accidental debug statements and helps you write focused commits.',
          },
          {
            heading: 'Common Patterns and Gotchas',
            content:
              'There are several important behaviors of git add to understand. When you stage a file and then modify it again before committing, the staging area contains the version from when you ran git add, not the latest version. You need to run "git add" again to stage the newer changes. This is because git add takes a snapshot of the file at the time it is run. Another common pattern is using .gitignore in combination with git add; git add will refuse to add files matched by .gitignore unless you use the "-f" (force) flag. When resolving merge conflicts, after editing the conflicted files to resolve the issues, you use "git add" to mark them as resolved. The "git add -A" command stages all changes including new files, modifications, and deletions across the entire repository. The "git add -u" command stages modifications and deletions of tracked files only, not new untracked files. Knowing the difference between these commands helps you stage exactly what you intend.',
            code: `# Staging order matters!
echo "version 1" > file.txt
git add file.txt            # stages "version 1"
echo "version 2" > file.txt # modify again

git status
# Changes to be committed:
#   new file:   file.txt      (contains "version 1")
# Changes not staged:
#   modified:   file.txt      (contains "version 2")

git add file.txt            # re-stage with "version 2"

# Force-add an ignored file
git add -f build/output.js

# Stage deletions
git add -u    # stages modified + deleted (tracked only)
git add -A    # stages new + modified + deleted (all)

# Unstage after adding
git restore --staged file.txt
# or (older syntax)
git reset HEAD file.txt`,
            warning: 'If you modify a file after staging it, the staged version is the OLD version. You must run "git add" again to stage the latest changes.',
          },
        ],
        quiz: [
          {
            question: 'What does "git add -p" do?',
            options: ['Adds all Python files', 'Opens patch/interactive staging mode', 'Pushes changes to remote', 'Adds files in parallel'],
            correctAnswer: 1,
            explanation: '"git add -p" (patch mode) lets you interactively select which hunks (portions of changes) to stage, giving fine-grained control over commits.',
          },
          {
            question: 'What is the difference between "git add ." and "git add -A"?',
            options: ['No difference', '"git add ." only adds current directory; "-A" adds entire repo', '"git add ." is faster', '"git add -A" only adds new files'],
            correctAnswer: 1,
            explanation: '"git add ." stages changes from the current directory down, while "git add -A" stages all changes from the entire repository.',
          },
          {
            question: 'If you modify a file after staging it, what is in the staging area?',
            options: ['The latest version', 'The version from when you ran git add', 'Both versions', 'Nothing, the staging is cleared'],
            correctAnswer: 1,
            explanation: 'The staging area contains the snapshot from when you ran git add. You must run git add again to stage the newer version.',
          },
        ],
      },
      {
        id: 'git-commit',
        title: 'git commit',
        difficulty: 'beginner',
        tags: ['git', 'commit', 'history', 'snapshot', 'message'],
        sections: [
          {
            heading: 'Creating Commits',
            content:
              'The "git commit" command records the staged changes as a new snapshot in the repository history. Each commit creates a permanent checkpoint that you can return to later. A commit contains the staged content, a commit message describing the changes, author information (name and email from your config), a timestamp, and a pointer to the parent commit(s). Every commit is identified by a unique 40-character SHA-1 hash, though you typically only need the first 7 characters to reference it. Running "git commit" without the -m flag opens your configured text editor where you can write a multi-line commit message. The -m flag lets you specify the message inline. The -a flag automatically stages all tracked modified files before committing, combining git add and git commit for convenience (but it does not stage new untracked files). Commits are the fundamental unit of change in Git and form a directed acyclic graph (DAG) that represents your project\'s history.',
            code: `# Commit staged changes with inline message
git commit -m "Add user authentication feature"

# Commit with multi-line message (opens editor)
git commit

# Stage tracked files and commit in one step
git commit -a -m "Fix typo in README"
# or
git commit -am "Fix typo in README"

# Commit with detailed message
git commit -m "Add user login endpoint

- Implement POST /api/login
- Add JWT token generation
- Include rate limiting (5 req/min)

Closes #42"

# View the last commit
git log -1

# View full details of last commit
git show HEAD`,
            note: 'Each commit stores a full snapshot of your project, not just the differences. Git optimizes storage internally through compression and deduplication.',
          },
          {
            heading: 'Writing Good Commit Messages',
            content:
              'Writing clear, meaningful commit messages is one of the most important Git practices. A good commit message explains why a change was made, not just what was changed (the diff already shows that). The widely adopted convention is to write a subject line of 50 characters or less in imperative mood ("Add feature" not "Added feature" or "Adds feature"), followed by a blank line, then a detailed body wrapping at 72 characters. The subject line should complete the sentence "If applied, this commit will..." (your subject line here). In the body, explain the motivation for the change, how it differs from the previous implementation, and any side effects or consequences. Reference issue numbers or ticket IDs when applicable. Avoid vague messages like "fix bug", "update code", or "misc changes". Instead, be specific: "Fix null pointer exception when user has no profile photo". Teams often adopt conventions like Conventional Commits (feat:, fix:, docs:, refactor:, test:) to standardize messages and enable automated changelog generation.',
            code: `# BAD commit messages
git commit -m "fix"
git commit -m "update stuff"
git commit -m "WIP"
git commit -m "asdfgh"

# GOOD commit messages
git commit -m "Fix login timeout for users with 2FA enabled"
git commit -m "Add pagination to user list API endpoint"

# Conventional Commits format
git commit -m "feat: add dark mode toggle to settings page"
git commit -m "fix: resolve race condition in payment processing"
git commit -m "docs: update API authentication examples"
git commit -m "refactor: extract email validation into utility"
git commit -m "test: add integration tests for checkout flow"

# Multi-line with body (using editor)
# Subject: Fix cart total calculation for discounted items
#
# The previous calculation applied discount after tax,
# resulting in incorrect totals. This fix applies the
# discount before tax calculation, matching the spec
# in JIRA-1234.
#
# Closes #89`,
            tip: 'Write commit messages in imperative mood: "Add feature" not "Added feature". Think: "If applied, this commit will [your message]."',
          },
          {
            heading: 'Amending and Managing Commits',
            content:
              'Sometimes you need to modify the last commit, whether to fix a typo in the commit message, add a forgotten file, or adjust the committed changes. The "--amend" flag replaces the last commit with a new one that combines the previous commit\'s changes with any newly staged changes. If you just want to fix the commit message, use "git commit --amend -m" with the new message. If you want to add a forgotten file, stage it with "git add" then run "git commit --amend --no-edit" to include it without changing the message. The "--no-edit" flag keeps the existing commit message. Important: amending rewrites history by replacing the old commit with a new one (different SHA hash). Never amend commits that have already been pushed to a shared repository unless you coordinate with your team, as it will cause problems for anyone who has based work on the original commit. For creating empty commits (useful for triggering CI pipelines), use "--allow-empty". The "--fixup" and "--squash" flags create commits that are marked to be automatically squashed during an interactive rebase.',
            code: `# Amend the last commit message
git commit --amend -m "Corrected commit message"

# Add forgotten file to last commit
git add forgotten-file.txt
git commit --amend --no-edit

# Amend both message and content
git add extra-changes.txt
git commit --amend -m "Updated message with extra changes"

# Create an empty commit (trigger CI)
git commit --allow-empty -m "Trigger CI pipeline"

# Create a fixup commit (for later squashing)
git commit --fixup=abc1234

# View the amended commit
git log -1
git show HEAD

# DANGER: Never amend already-pushed commits
# unless you are the only one working on the branch`,
            warning: 'Never amend commits that have been pushed to a shared branch. Amending changes the commit hash, which can cause serious problems for collaborators.',
          },
        ],
        challenge: {
          title: 'Commit Message Workshop',
          description: 'Practice writing clean, focused commits with good messages by building a small project.',
          steps: [
            'Create a new directory and initialize a Git repo',
            'Create an index.html file with basic HTML structure and commit with a descriptive message',
            'Add a styles.css file linked from the HTML and commit separately',
            'Add a script.js file and make a change to index.html in the same session',
            'Use "git add -p" to stage and commit the JS file and HTML changes separately',
            'Practice amending the last commit to fix a typo in the message',
          ],
          expectedOutput: 'You should have 4+ commits, each with a clear message describing a single logical change.',
        },
      },
      {
        id: 'git-status',
        title: 'git status',
        difficulty: 'beginner',
        tags: ['git', 'status', 'working-directory', 'staging', 'tracking'],
        sections: [
          {
            heading: 'Understanding git status Output',
            content:
              'The "git status" command displays the state of the working directory and the staging area. It shows which changes have been staged for the next commit, which changes exist in the working directory but are not staged, and which files are not being tracked by Git at all. This is one of the most frequently used Git commands and is essential for understanding what Git sees before you make a commit. The output is organized into several sections: the current branch name and its tracking relationship with the remote, staged changes (listed under "Changes to be committed"), unstaged modifications (listed under "Changes not staged for commit"), and untracked files. Git status also provides helpful hints about what commands to use next, such as suggesting "git add" for untracked files or "git restore" to discard changes. Running git status frequently helps you stay aware of the state of your repository and prevents accidental commits of unintended changes.',
            code: `# Basic status
git status
# On branch main
# Your branch is up to date with 'origin/main'.
#
# Changes to be committed:
#   (use "git restore --staged <file>..." to unstage)
#     modified:   app.js
#
# Changes not staged for commit:
#   (use "git add <file>..." to update what will be committed)
#   (use "git restore <file>..." to discard changes)
#     modified:   index.html
#
# Untracked files:
#   (use "git add <file>..." to include in what will be committed)
#     new-file.txt

# Short status format
git status -s
# M  app.js       (staged modification)
#  M index.html   (unstaged modification)
# ?? new-file.txt (untracked)`,
            note: 'In the short format (-s), the left column shows the staging area status and the right column shows the working directory status.',
          },
          {
            heading: 'Short Status and Branch Information',
            content:
              'The short status format ("git status -s" or "git status --short") provides a more compact view that is easier to scan quickly. Each file is shown on one line with a two-character status code. The first character represents the staging area status and the second represents the working directory status. Common codes include: M for modified, A for added (new file staged), D for deleted, R for renamed, C for copied, and ?? for untracked. A space means no change in that column. For example, "M " means modified and staged, " M" means modified but not staged, "MM" means modified, staged, then modified again, "A " means newly added file staged, and "??" means untracked. Adding the "-b" flag shows the branch name and tracking information at the top. You can combine these: "git status -sb" gives you a compact but informative overview. This short format is preferred by many developers who check status frequently and want quick, scannable output without the verbose explanations.',
            code: `# Short format with branch info
git status -sb
# ## main...origin/main
#  M README.md
# M  src/app.js
# MM src/utils.js
# A  src/new-feature.js
# D  old-file.txt
# ?? untracked.txt
# R  old-name.js -> new-name.js

# Status codes explained:
# XY  where X=staging, Y=working directory
#  M  = modified in working dir (not staged)
# M   = modified and staged
# MM  = staged then modified again
# A   = new file, staged
# D   = deleted
# R   = renamed
# ??  = untracked
# !!  = ignored

# Show ignored files too
git status --ignored

# Show status for specific path
git status src/`,
            tip: 'Add "alias gs=\'git status -sb\'" to your shell profile for a quick status check you can run dozens of times a day.',
          },
          {
            heading: 'Using Status in Scripts and Workflows',
            content:
              'Git status is useful beyond just manual checking. The "--porcelain" flag produces output in a stable, script-friendly format that is guaranteed not to change between Git versions, making it ideal for shell scripts and automation. The porcelain format is similar to the short format but more strictly defined. You can use this to build scripts that react to repository state, such as preventing deployment if there are uncommitted changes, automatically staging files that match certain patterns, or creating custom prompts that show Git status information. Many developers customize their terminal prompt to show the current branch and a summary of the repository state. Tools like oh-my-zsh, Starship, and Powerlevel10k use git status internally to display this information. The "--branch" flag in porcelain mode shows branch tracking information in a parseable format. Combining git status with other commands in shell scripts lets you create powerful custom workflows tailored to your project needs.',
            code: `# Porcelain format (stable, for scripts)
git status --porcelain
# M  app.js
#  M index.html
# ?? new-file.txt

# Porcelain v2 (more detailed)
git status --porcelain=v2

# Check if repo is clean (useful in scripts)
if [ -z "$(git status --porcelain)" ]; then
  echo "Working directory is clean"
else
  echo "There are uncommitted changes"
fi

# Count modified files
git status --porcelain | wc -l

# List only staged files
git diff --name-only --cached

# List only unstaged modified files
git diff --name-only

# Custom prompt example (bash)
# PS1='\\w $(git branch --show-current 2>/dev/null) $ '`,
            tip: 'Use "--porcelain" in scripts because its format is guaranteed stable across Git versions, unlike the human-readable output which may change.',
          },
        ],
      },
      {
        id: 'git-log',
        title: 'git log',
        difficulty: 'beginner',
        tags: ['git', 'log', 'history', 'commits', 'search'],
        sections: [
          {
            heading: 'Viewing Commit History',
            content:
              'The "git log" command displays the commit history of the repository, showing commits in reverse chronological order (newest first). By default, it shows each commit with its SHA-1 hash, author name and email, date, and commit message. This is your primary tool for exploring the project\'s history and understanding how the codebase evolved over time. Git log is highly customizable with numerous formatting options and filters. The basic "git log" output can be verbose for large projects, so most developers use formatting options to make it more useful. The "--oneline" flag condenses each commit to a single line showing the abbreviated hash and subject line, which is great for quick overviews. The "-n" flag (or "-<number>") limits the number of commits shown. The "--graph" flag draws a text-based graph of the branch structure alongside the log. These options can be combined to create powerful views of your repository history.',
            code: `# Basic log
git log

# Compact one-line format
git log --oneline

# Show last N commits
git log -5
git log -n 5

# Show graph with branch structure
git log --oneline --graph --all

# Pretty graph with colors
git log --oneline --graph --decorate --all

# Show stats (files changed, insertions, deletions)
git log --stat

# Show full diff for each commit
git log -p

# Show log for a specific file
git log -- path/to/file.js

# Show log with date format
git log --format="%h %ad %s" --date=short`,
            note: 'The "--all" flag shows commits from all branches, not just the current one. This is useful for seeing the full project history.',
          },
          {
            heading: 'Filtering and Searching History',
            content:
              'Git log provides powerful filtering options to find specific commits in your history. You can filter by author with "--author", by date range with "--since" and "--until" (or "--after" and "--before"), by commit message content with "--grep", and by changes to specific code with "-S" (the pickaxe option) or "-G" (regex search in diffs). The "--author" filter supports partial matching and regex. Date filters accept formats like "2024-01-01", "2 weeks ago", "yesterday", and "last Monday". The "-S" flag finds commits that added or removed a specific string, which is incredibly useful for finding when a particular function or variable was introduced or removed. The "-G" flag is similar but searches for a regex pattern in the diff. You can also filter by file path to see only commits that affected specific files. Multiple filters can be combined, and "--all-match" requires all criteria to be met (by default, filters are OR\'d). These filtering capabilities make Git log an essential tool for code archaeology and debugging.',
            code: `# Filter by author
git log --author="John"
git log --author="john@example.com"

# Filter by date
git log --since="2024-01-01"
git log --since="2 weeks ago"
git log --until="yesterday"
git log --since="2024-01-01" --until="2024-06-30"

# Search commit messages
git log --grep="fix" --oneline
git log --grep="bug" -i  # case insensitive

# Find commits that added/removed a string (pickaxe)
git log -S "function calculateTotal"

# Find commits with regex in diff
git log -G "TODO|FIXME"

# Filter by file
git log -- src/app.js
git log --oneline -- "*.py"

# Combine filters
git log --author="John" --since="1 month ago" --grep="fix"

# All match (AND instead of OR)
git log --author="John" --grep="fix" --all-match`,
            tip: 'Use "git log -S" (the pickaxe) to find when a specific piece of code was added or removed. This is invaluable for debugging.',
          },
          {
            heading: 'Custom Log Formats',
            content:
              'Git log\'s "--format" (or "--pretty=format:") option lets you create completely custom output formats using format placeholders. This is useful for generating reports, feeding data into other tools, or creating your preferred log view. Common placeholders include %H (full hash), %h (abbreviated hash), %an (author name), %ae (author email), %ad (author date), %s (subject), %b (body), %d (ref names/decorations), and %Cred/%Cgreen/%Creset for colors. You can combine these with literal text and separators to create any format you need. Many developers define their preferred format as a Git alias for quick access. The "--format" option also supports built-in named formats: oneline, short, medium, full, fuller, and email. For machine-readable output, "--format=tformat:" adds a terminator (newline) after each entry, while "--format=format:" adds a separator between entries. Custom formats are especially powerful when combined with filtering options for creating specific reports about your project history.',
            code: `# Custom format examples
git log --format="%h - %an, %ar : %s"
# a1b2c3d - John Doe, 2 hours ago : Fix login bug

# Colored custom format
git log --format="%C(yellow)%h%Creset %C(blue)%an%Creset %s %C(green)(%ar)%Creset"

# Format with full date
git log --format="%h %ad %s" --date=format:"%Y-%m-%d %H:%M"

# Show commit stats in custom format
git log --format="%h %s" --shortstat

# Built-in formats
git log --pretty=oneline
git log --pretty=short
git log --pretty=full

# Useful alias: pretty log graph
# git config --global alias.lg "log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
git lg

# Export log to CSV-like format
git log --format='"%h","%an","%ad","%s"' --date=short

# Common format placeholders:
# %H  - Full hash      %h  - Short hash
# %an - Author name    %ae - Author email
# %ad - Author date    %ar - Relative date
# %s  - Subject        %b  - Body
# %d  - Decorations    %D  - Decorations (no wrapping)`,
            tip: 'Save your favorite log format as a Git alias. A well-crafted "git lg" alias is one of the most useful additions to your Git config.',
          },
        ],
        quiz: [
          {
            question: 'What does "git log -S" (the pickaxe) do?',
            options: ['Sorts commits by size', 'Shows commits in short format', 'Finds commits that added or removed a specific string', 'Searches for a commit by SHA'],
            correctAnswer: 2,
            explanation: 'The -S flag (pickaxe) searches for commits that introduced or removed a specific string of code, useful for finding when code was added or deleted.',
          },
          {
            question: 'Which flag shows a text-based branch graph alongside the log?',
            options: ['--tree', '--branches', '--graph', '--visual'],
            correctAnswer: 2,
            explanation: 'The --graph flag draws a text-based graphical representation of the commit history and branch structure.',
          },
          {
            question: 'How do you show only the last 5 commits?',
            options: ['git log --last 5', 'git log -5', 'git log --count 5', 'git log --top 5'],
            correctAnswer: 1,
            explanation: 'Use "git log -5" or "git log -n 5" to limit the output to the last 5 commits.',
          },
        ],
      },
      {
        id: 'git-diff',
        title: 'git diff',
        difficulty: 'intermediate',
        tags: ['git', 'diff', 'changes', 'comparison', 'review'],
        sections: [
          {
            heading: 'Comparing Changes with git diff',
            content:
              'The "git diff" command shows the differences between various states in your Git repository. Without any arguments, "git diff" shows unstaged changes in your working directory compared to the staging area (index). This means it shows what you have changed but not yet staged. Adding the "--staged" flag (or "--cached", which is synonymous) shows the differences between the staging area and the last commit, i.e., what will be included in the next commit. Understanding these two views is essential: "git diff" answers "what have I changed but not yet staged?" while "git diff --staged" answers "what have I staged and will commit?" You can also compare any two commits, branches, or tags using "git diff <ref1> <ref2>". The output uses the unified diff format showing lines added (prefixed with +) and removed (prefixed with -), with surrounding context lines for reference. The diff output also includes header information showing the files being compared and the line ranges of the changes.',
            code: `# Show unstaged changes (working dir vs staging area)
git diff

# Show staged changes (staging area vs last commit)
git diff --staged
# or
git diff --cached

# Show ALL changes (working dir vs last commit)
git diff HEAD

# Diff specific file
git diff -- path/to/file.js

# Diff between two commits
git diff abc1234 def5678

# Diff between two branches
git diff main..feature-branch
git diff main...feature-branch  # since divergence

# Diff between HEAD and N commits ago
git diff HEAD~3

# Just show file names that changed
git diff --name-only

# Show file names with status
git diff --name-status`,
            note: 'The two-dot (..) syntax compares the tips of two branches directly. The three-dot (...) syntax shows changes since the branches diverged, which is usually more useful for reviewing feature branch changes.',
          },
          {
            heading: 'Diff Output Options',
            content:
              'Git diff provides many options to customize the output format and focus on specific aspects of the changes. The "--stat" flag shows a summary of changes per file with a histogram, similar to what you see after a merge. The "--shortstat" flag gives just the total number of files changed, insertions, and deletions. The "--word-diff" flag shows changes at the word level instead of line level, which is especially useful for prose or documentation changes. The "--color-words" flag is similar but uses colors instead of markup. You can control the number of context lines with "-U<n>" or "--unified=<n>"; the default is 3 lines of context. The "--no-index" flag lets you compare two files outside of any Git repository, using Git\'s diff engine. For binary files, Git normally just reports that they differ, but you can configure textconv filters to show meaningful diffs for specific binary formats. The "--diff-filter" option lets you show only files with specific types of changes (added, modified, deleted, renamed, etc.).',
            code: `# Summary statistics
git diff --stat
#  src/app.js    | 15 +++++++++------
#  src/utils.js  |  3 ++-
#  2 files changed, 11 insertions(+), 7 deletions(-)

# Short statistics
git diff --shortstat
#  2 files changed, 11 insertions(+), 7 deletions(-)

# Word-level diff (great for prose)
git diff --word-diff
# The [-old-]{+new+} text was changed.

# Color words (inline coloring)
git diff --color-words

# Change context lines (default is 3)
git diff -U5  # Show 5 lines of context
git diff -U0  # Show no context (just changes)

# Filter by change type
git diff --diff-filter=M   # Only modified files
git diff --diff-filter=A   # Only added files
git diff --diff-filter=D   # Only deleted files

# Compare two files (not in git)
git diff --no-index file1.txt file2.txt

# Ignore whitespace changes
git diff -w
git diff --ignore-all-space`,
            tip: 'Use "git diff --word-diff" when reviewing changes to documentation or prose. Line-based diffs can be hard to read when only a few words changed.',
          },
          {
            heading: 'Advanced Diff Techniques',
            content:
              'Git diff has several advanced features for specific use cases. The "--check" flag warns about whitespace issues like trailing whitespace and mixed tabs/spaces, which is useful as a pre-commit check. The "--dirstat" flag shows the distribution of changes across directories, giving you a high-level overview of which parts of the project were affected. You can use "-S" or "-G" with diff to find specific string changes, similar to their use in git log. The "--histogram" algorithm can sometimes produce more readable diffs than the default Myers algorithm. External diff tools like Beyond Compare, KDiff3, or VS Code can be configured with "git difftool" for a graphical diff experience. The "--diff-algorithm" option lets you choose between myers (default), minimal, patience, and histogram algorithms; patience diff often produces better output for code by matching unique lines first. When comparing branches for code review, "git diff main...HEAD" is particularly useful as it shows only the changes introduced by the current branch since it diverged from main.',
            code: `# Check for whitespace issues
git diff --check

# Directory-level statistics
git diff --dirstat
# 45.0% src/components/
# 30.0% src/utils/
# 25.0% tests/

# Use patience algorithm (better for code)
git diff --patience
git diff --diff-algorithm=histogram

# Use external diff tool
git difftool
git difftool --tool=vscode

# Configure VS Code as diff tool
# git config --global diff.tool vscode
# git config --global difftool.vscode.cmd 'code --wait --diff $LOCAL $REMOTE'

# Generate a patch file
git diff > my-changes.patch
git diff --staged > staged-changes.patch

# Apply a patch
git apply my-changes.patch

# Diff of specific commit
git diff HEAD~1..HEAD
git diff HEAD^..HEAD  # same thing

# Show changes between stash and current
git diff stash@{0}`,
            tip: 'Use "git diff --patience" or "--histogram" for more readable diffs, especially when code blocks have been moved or when there are many similar lines.',
          },
        ],
      },
      {
        id: 'git-rm',
        title: 'git rm',
        difficulty: 'beginner',
        tags: ['git', 'rm', 'remove', 'delete', 'untrack'],
        sections: [
          {
            heading: 'Removing Files with git rm',
            content:
              'The "git rm" command removes files from both the working directory and the staging area. It is the Git-aware way to delete files, as it stages the removal for the next commit in one step. If you simply delete a file using your operating system\'s delete command or "rm" in the terminal, the file is removed from the working directory but the deletion is not staged. You would then need to run "git add" to stage the deletion. Using "git rm" combines both steps. The removed files will show as "deleted" in git status under "Changes to be committed". You still need to run "git commit" to permanently record the deletion in the repository history. Note that the file will still exist in previous commits; Git preserves history. If you need to remove a file from Git tracking but keep it on your filesystem, use the "--cached" flag. This is commonly used when you realize a file should have been in .gitignore, such as configuration files with secrets or build artifacts that were accidentally committed.',
            code: `# Remove a file (deletes from disk AND stages removal)
git rm unwanted-file.txt

# Remove multiple files
git rm file1.txt file2.txt

# Remove all .log files
git rm "*.log"

# Remove files in a directory
git rm -r old-directory/

# Remove from Git but KEEP on disk
git rm --cached secret-config.env

# Remove from Git but keep entire directory
git rm -r --cached build/

# After git rm, commit the deletion
git commit -m "Remove unnecessary files"

# Force remove a modified/staged file
git rm -f modified-file.txt

# Dry run (show what would be removed)
git rm --dry-run "*.tmp"`,
            note: 'The "--cached" flag is your best friend when you need to stop tracking a file without deleting it from your filesystem.',
          },
          {
            heading: 'Common Patterns and Recovery',
            content:
              'A common workflow is realizing that a file was accidentally committed and needs to be removed from tracking. For example, if someone committed node_modules or a .env file, you would first add the appropriate pattern to .gitignore, then run "git rm -r --cached" to remove it from tracking while keeping it locally. Another common pattern is removing all files that match a pattern, such as "git rm --cached *.pyc" to stop tracking compiled Python files. When working with glob patterns, wrap them in quotes to prevent your shell from expanding them before Git sees them. If you accidentally remove a file with "git rm" and have not committed yet, you can restore it with "git restore --staged <file>" followed by "git restore <file>". If you have already committed the removal, you can restore the file from the previous commit with "git checkout HEAD~1 -- <file>". Remember that git rm only affects the current and future state; the file remains accessible in the commit history through checkout or show commands.',
            code: `# Accidentally committed node_modules
echo "node_modules/" >> .gitignore
git rm -r --cached node_modules/
git commit -m "Remove node_modules from tracking"

# Remove all .pyc files from tracking
git rm --cached "*.pyc"
echo "*.pyc" >> .gitignore
git commit -m "Stop tracking compiled Python files"

# Recover a file removed with git rm (not yet committed)
git restore --staged accidentally-deleted.txt
git restore accidentally-deleted.txt

# Recover a file after committing the removal
git checkout HEAD~1 -- restored-file.txt
# or
git restore --source=HEAD~1 restored-file.txt

# View the file from a past commit
git show HEAD~1:path/to/deleted-file.txt

# Find when a file was deleted
git log --all --full-history -- path/to/file.txt`,
            warning: 'If you committed a file with sensitive data like passwords, removing it with git rm does NOT erase it from history. Use BFG Repo-Cleaner or git filter-repo to purge it from all commits.',
          },
          {
            heading: 'git rm vs Other Deletion Methods',
            content:
              'Understanding the differences between various ways to remove files in Git helps you choose the right approach. Simply using the system "rm" command deletes the file from the working directory but leaves Git unaware of the change; you need to separately stage the deletion with "git add" or "git rm". Using "git rm" both deletes the file and stages the deletion in one step, which is cleaner. Using "git rm --cached" removes the file from Git tracking without touching the working directory, keeping the file on disk. This is different from removing and re-adding to .gitignore. If a file has local modifications, Git will refuse to remove it to protect your work unless you use the "-f" (force) flag. The "git clean" command, while not the same as git rm, removes untracked files from the working directory and is useful for cleaning up build artifacts or generated files that are not tracked by Git. It requires the "-f" flag for safety and supports "-n" for a dry run. Understanding these distinctions helps you manage your files precisely and avoid accidental data loss.',
            code: `# Method 1: System rm + git add
rm file.txt
git add file.txt    # or git add -u

# Method 2: git rm (preferred)
git rm file.txt     # deletes + stages in one step

# Method 3: git rm --cached (keep file)
git rm --cached file.txt  # untrack only

# Force remove modified file
git rm -f modified-file.txt

# Clean untracked files (not git rm, but related)
git clean -n      # dry run - show what would be removed
git clean -f      # force remove untracked files
git clean -fd     # remove untracked files AND directories
git clean -fX     # remove only ignored files
git clean -fx     # remove ignored AND untracked files

# Comparison summary:
# rm file         -> deletes file, need "git add" to stage
# git rm file     -> deletes file + stages deletion
# git rm --cached -> untracks file, keeps on disk
# git clean       -> removes untracked files from disk`,
            tip: 'Use "git clean -n" (dry run) before "git clean -f" to preview what will be deleted. The -f flag is required as a safety measure.',
          },
        ],
      },
      {
        id: 'git-mv',
        title: 'git mv',
        difficulty: 'beginner',
        tags: ['git', 'mv', 'move', 'rename', 'reorganize'],
        sections: [
          {
            heading: 'Moving and Renaming Files',
            content:
              'The "git mv" command moves or renames a file, directory, or symlink, and automatically stages the change. It is essentially a convenience command that combines three operations: renaming the file on disk, running "git rm" on the old path, and running "git add" on the new path. While Git does not explicitly track renames (it detects them after the fact by comparing content), using "git mv" makes the intent clear and handles everything in one step. This is the recommended way to rename or move files in a Git repository because it is less error-prone than doing the steps manually. Git\'s rename detection is quite sophisticated; it uses similarity index to detect renames even when some content has changed. By default, Git considers a file renamed if the content is at least 50% similar. You can adjust this threshold with the "-M" flag in commands like "git log" and "git diff". Properly renaming files preserves the ability to track file history across renames.',
            code: `# Rename a file
git mv old-name.js new-name.js

# Move a file to a different directory
git mv src/utils.js src/helpers/utils.js

# Move multiple files to a directory
git mv file1.js file2.js src/

# Rename a directory
git mv old-directory/ new-directory/

# Force move (overwrite existing file)
git mv -f source.js destination.js

# After git mv, commit the change
git commit -m "Rename utils.js to helpers.js"

# The equivalent manual steps:
mv old-name.js new-name.js
git rm old-name.js
git add new-name.js
# git mv does all three in one command`,
            note: 'Git detects renames by comparing file content similarity. Even if you use "mv" instead of "git mv", Git will likely detect the rename if the content is similar enough.',
          },
          {
            heading: 'Tracking History Across Renames',
            content:
              'One concern when renaming files is whether the commit history follows the file to its new name. By default, "git log" only shows history since the file was renamed. To follow the file\'s history across renames, use the "--follow" flag: "git log --follow new-name.js". This tells Git to use its rename detection to trace the file back to its original name and show the full history. The "--follow" flag works by checking each commit for rename operations and following them backward. You can also use "git log -M" to show renames in the log output, where -M optionally takes a similarity threshold percentage. For example, "-M90%" requires 90% similarity to consider it a rename. When using "git diff" or "git log --stat", renames are shown with a similarity percentage like "old.js => new.js (95%)". It is a good practice to make rename-only commits (rename the file in one commit, then modify it in the next) to make the history cleaner and rename detection more reliable. Combining renames with content changes can sometimes confuse the rename detection if the content changes are too significant.',
            code: `# View history following renames
git log --follow new-name.js

# Show renames in diff output
git diff -M HEAD~1
# rename old.js => new.js (95%)

# Show renames in log
git log --stat -M

# Adjust rename detection threshold
git log -M90% --follow file.js

# Find renames with diff
git diff --find-renames HEAD~1
git diff --find-renames=80% HEAD~1  # 80% threshold

# Best practice: separate rename from edits
# Step 1: Rename only
git mv old.js new.js
git commit -m "Rename old.js to new.js"

# Step 2: Edit content
# (make your changes to new.js)
git add new.js
git commit -m "Refactor new.js with updated logic"

# Find copies (not just renames)
git log --find-copies-harder --stat`,
            tip: 'For cleanest history, commit renames separately from content changes. This makes rename detection more reliable and diffs easier to review.',
          },
          {
            heading: 'Bulk Renames and Reorganization',
            content:
              'When reorganizing a project, you might need to rename or move many files at once. Git mv works for individual moves, but for bulk operations you might need to combine shell commands with Git. For example, you can use a shell loop to rename all files matching a pattern. When doing bulk renames, it helps to use "git status" after the operation to verify that Git correctly detected all the renames. If you move files using your IDE\'s refactoring tools, Git should still detect the renames as long as the file content remains similar enough. Most modern IDEs are Git-aware and will use git mv behind the scenes. For very large reorganizations, consider using a dedicated tool or script to perform the moves, then verify the result with "git diff --stat -M" to confirm all renames were detected. Keep in mind that moving many files in a single commit can make that commit harder to review, so consider breaking large reorganizations into logical groups. Some teams prefer to use separate PRs for file reorganization and code changes to keep reviews manageable.',
            code: `# Bulk rename using a shell loop
for f in *.txt; do
  git mv "$f" "\${f%.txt}.md"
done

# Move all JS files to a subdirectory
mkdir -p src/scripts
git mv *.js src/scripts/

# Rename with find and git mv
find . -name "*.test.js" -exec sh -c '
  git mv "$1" "$(echo "$1" | sed "s/.test.js/.spec.js/")"
' _ {} \;

# Verify Git detected the renames
git status
git diff --staged --stat -M

# Check rename detection
git diff --staged -M --diff-filter=R
# Shows only renames with similarity %

# Undo all staged renames (if something went wrong)
git restore --staged .
git restore .

# Case-sensitive rename on case-insensitive FS
git mv MyFile.js myfile.js      # may fail on macOS/Windows
git mv MyFile.js temp.js && git mv temp.js myfile.js  # workaround`,
            warning: 'On case-insensitive file systems (macOS, Windows), renaming a file to change only its case requires a two-step rename through a temporary name.',
          },
        ],
      },
      {
        id: 'git-show',
        title: 'git show',
        difficulty: 'intermediate',
        tags: ['git', 'show', 'inspect', 'commit', 'details'],
        sections: [
          {
            heading: 'Inspecting Objects with git show',
            content:
              'The "git show" command displays detailed information about Git objects, most commonly commits. When given a commit reference (hash, branch name, tag, or HEAD), it shows the commit metadata (author, date, message) along with the full diff of changes introduced by that commit. This makes it your go-to command for examining exactly what a specific commit changed. Without any arguments, "git show" displays the most recent commit (HEAD). You can reference commits in many ways: by their full or abbreviated SHA hash, by branch or tag names, by relative references like HEAD~2 (two commits before HEAD), or by reflog entries like HEAD@{2}. Git show can also display other Git objects: blobs (file content), trees (directory listings), and tags (annotated tag info). It is particularly useful during code review, debugging, and understanding the history of changes. Unlike "git log -p" which shows diffs for multiple commits, "git show" focuses on a single object, making it ideal for targeted inspection.',
            code: `# Show the latest commit
git show

# Show a specific commit by hash
git show abc1234

# Show a commit by relative reference
git show HEAD~2     # 2 commits before HEAD
git show main~3     # 3 commits before main

# Show only the commit message (no diff)
git show --stat abc1234

# Show specific file at a commit
git show HEAD:src/app.js

# Show file from N commits ago
git show HEAD~3:README.md

# Show a tag
git show v1.0.0

# Show only names of changed files
git show --name-only abc1234

# Show names with change status
git show --name-status abc1234

# Show with word diff
git show --word-diff abc1234`,
            note: 'The syntax "git show HEAD:path/to/file" is incredibly useful for viewing a file as it existed at a specific commit without checking out that commit.',
          },
          {
            heading: 'Exploring Different Git Objects',
            content:
              'Git has four types of objects: blobs (file content), trees (directory structure), commits, and annotated tags. The "git show" command can inspect any of these. When you show a blob, it displays the raw file content. When you show a tree, it displays the directory listing. This is useful for understanding Git internals and for accessing specific file versions without checking them out. You can use the commit:path syntax to access any file at any point in history. For example, "git show v1.0:config.json" shows the config file as it was in version 1.0. You can also redirect this output to create a copy of a historical file version with "git show HEAD~5:file.txt > old-version.txt". For annotated tags, git show displays the tag metadata (tagger, date, message) followed by the commit it points to. When working with merge commits, "git show" shows a combined diff by default; use "--first-parent" to see only the changes relative to the first parent, or "-m" to see separate diffs against each parent.',
            code: `# Show a blob (file content)
git show HEAD:src/index.js

# Save a historical file version
git show HEAD~5:config.json > old-config.json

# Show a tree (directory listing)
git show HEAD:src/
# tree HEAD:src/
# app.js
# utils.js
# components/

# Show annotated tag details
git show v2.0.0
# tag v2.0.0
# Tagger: John <john@example.com>
# Date:   Mon Jan 1 12:00:00 2024
# Release version 2.0.0
# (followed by the tagged commit)

# Show merge commit diffs
git show --first-parent abc1234   # diff vs first parent
git show -m abc1234               # separate diffs vs each parent

# Show in specific format
git show --format="%H %an %s" abc1234

# Show range of commits
git show HEAD~3..HEAD --stat

# Use with specific diff options
git show --color-words abc1234
git show -w abc1234  # ignore whitespace`,
            tip: 'Use "git show HEAD:path/to/file > backup.txt" to quickly extract a file from a previous version without switching branches or checking out old commits.',
          },
          {
            heading: 'Practical Use Cases for git show',
            content:
              'There are many practical scenarios where git show is the ideal tool. During code review, use it to examine specific commits referenced in a pull request: "git show <commit-hash>" gives you the complete picture of what changed. When debugging, if git bisect identifies a bad commit, use "git show" to see exactly what it introduced. For comparing file versions, "git show branch:file" lets you view how a file looks on another branch without switching to it. When resolving conflicts during a merge, you can use "git show :1:file" (common ancestor), "git show :2:file" (ours), and "git show :3:file" (theirs) to see the three versions involved in the conflict. For release management, showing annotated tags with "git show v1.0" gives you the release notes and the exact commit. You can also use git show in scripts to extract specific information from commits, such as getting the author of a commit or the files it changed. The versatility of git show makes it an essential tool in your Git toolkit for any situation requiring detailed inspection of repository objects.',
            code: `# Code review: examine a specific commit
git show abc1234 --stat  # overview first
git show abc1234          # then full diff

# Debugging: after git bisect finds the bad commit
git bisect bad
# abc1234 is the first bad commit
git show abc1234

# View file on another branch (without switching)
git show feature-branch:src/app.js

# During merge conflict, see all three versions
git show :1:conflicted-file.js  # common ancestor
git show :2:conflicted-file.js  # ours (current branch)
git show :3:conflicted-file.js  # theirs (incoming branch)

# Get commit info in scripts
git show -s --format="%an" HEAD      # author name
git show -s --format="%ae" HEAD      # author email
git show -s --format="%ai" HEAD      # author date
git show -s --format="%s" HEAD       # subject line

# Show only specific file's changes in a commit
git show abc1234 -- path/to/file.js

# Compare same file across commits
diff <(git show HEAD~5:app.js) <(git show HEAD:app.js)`,
            tip: 'During merge conflicts, "git show :1:file", ":2:file", ":3:file" shows the base, ours, and theirs versions respectively. This is invaluable for understanding complex conflicts.',
          },
        ],
      },
      {
        id: 'git-blame',
        title: 'git blame',
        difficulty: 'intermediate',
        tags: ['git', 'blame', 'annotate', 'history', 'investigation', 'debugging'],
        sections: [
          {
            heading: 'Annotating Files with git blame',
            content:
              'The "git blame" command shows what revision and author last modified each line of a file. It annotates each line with the commit hash, author name, and timestamp of the most recent change. Despite its accusatory name, git blame is an essential tool for understanding code history rather than assigning fault. It helps answer questions like "who wrote this code and when?" and "what commit introduced this change?". Each line of output shows the abbreviated commit hash, the author, the date, the line number, and the line content. This information is invaluable for understanding the context behind code decisions, finding the right person to ask about a specific piece of code, and identifying when a bug was introduced. Many IDEs and code editors integrate git blame directly, showing annotations in the gutter. GitHub, GitLab, and other platforms also provide blame views in their web interfaces, making it easy to explore without the command line.',
            code: `# Blame an entire file
git blame src/app.js

# Output format:
# a1b2c3d4 (John Doe 2024-01-15 10:30:00 +0000  1) const app = express();
# e5f6g7h8 (Jane Smith 2024-02-20 14:15:00 +0000  2) const port = 3000;
# a1b2c3d4 (John Doe 2024-01-15 10:30:00 +0000  3)
# i9j0k1l2 (Bob Lee 2024-03-05 09:45:00 +0000  4) app.use(cors());

# Blame specific line range
git blame -L 10,20 src/app.js

# Blame from line 10 to end of file
git blame -L 10, src/app.js

# Blame with email instead of name
git blame -e src/app.js

# Show the full commit hash
git blame -l src/app.js

# Suppress author and date (just hashes)
git blame -s src/app.js`,
            note: 'Git blame shows who last modified each line, not necessarily who originally wrote it. A formatting change or code move will show the most recent committer.',
          },
          {
            heading: 'Advanced Blame Options',
            content:
              'Git blame has several advanced options that make it more useful for investigation. The "-w" flag ignores whitespace changes, which is helpful when someone reformatted the code but you want to find who wrote the actual logic. The "-M" flag detects lines that were moved or copied within the same file, showing the original commit instead of the move commit. The "-C" flag extends this to detect lines that were copied from other files, which is powerful when code has been refactored or extracted into new files. You can combine "-C" multiple times ("-CCC") to search more aggressively. The "--since" flag limits blame to changes after a certain date, and the "--ignore-rev" flag ignores specific commits (useful for ignoring bulk formatting changes). You can create a file listing commits to ignore with ".git-blame-ignore-revs" and configure Git to use it automatically. The "-L" flag with a function name ("-L :functionName:file") blames only the lines of a specific function, which requires Git to understand the language syntax.',
            code: `# Ignore whitespace changes
git blame -w src/app.js

# Detect moved lines within file
git blame -M src/app.js

# Detect lines copied from other files
git blame -C src/app.js
git blame -CCC src/app.js  # more aggressive search

# Blame a specific function
git blame -L :handleSubmit:src/form.js

# Ignore a specific commit (e.g., formatting)
git blame --ignore-rev abc1234 src/app.js

# Ignore multiple commits from a file
echo "abc1234  # Prettier formatting" >> .git-blame-ignore-revs
echo "def5678  # ESLint auto-fix" >> .git-blame-ignore-revs
git config blame.ignoreRevsFile .git-blame-ignore-revs

# Now git blame automatically ignores those commits
git blame src/app.js

# Blame with date format
git blame --date=short src/app.js
git blame --date=relative src/app.js

# Show original filename if renamed
git blame -C --show-name src/new-app.js`,
            tip: 'Create a ".git-blame-ignore-revs" file in your repo to ignore bulk formatting commits. GitHub also recognizes this file and uses it in its blame view.',
          },
          {
            heading: 'Using Blame for Debugging',
            content:
              'Git blame is a powerful debugging tool when used effectively. When you find a bug, you can use blame to identify the commit that introduced the problematic code, then use "git show" to see the full context of that commit. This often reveals the intent behind the code and may reference an issue tracker or pull request with more context. For deeper investigation, you can blame a file at a specific commit with "git blame <commit> -- <file>" to see what the blame looked like before certain changes. Using "git blame -L" with line ranges lets you focus on the specific area of interest. A powerful technique is combining blame with log: after finding the commit hash from blame, run "git log --all --oneline <hash>..HEAD -- <file>" to see all subsequent changes. For regression debugging, git blame combined with git bisect creates a powerful workflow: bisect finds the bad commit, then blame shows exactly which lines changed. Remember that blame shows the last modification; for the full history of a specific line, use "git log -L" which shows every commit that touched a given line range.',
            code: `# Debugging workflow with blame

# Step 1: Find who last changed the buggy line
git blame -L 42,42 src/calculator.js
# abc1234 (Jane 2024-03-01) return total * tax;

# Step 2: See the full commit context
git show abc1234

# Step 3: See blame BEFORE that commit
git blame abc1234~1 -- src/calculator.js

# Track full history of specific lines
git log -L 40,45:src/calculator.js

# Track history of a function
git log -L :calculateTotal:src/calculator.js

# Blame at a specific point in time
git blame HEAD~20 -- src/calculator.js

# Combine with grep to find specific patterns
git blame src/app.js | grep "TODO"
git blame src/app.js | grep "2024-01"

# Find commits between blame result and now
git log --oneline abc1234..HEAD -- src/calculator.js

# Reverse blame (show when lines were last present)
git blame --reverse HEAD~20..HEAD -- src/app.js`,
            tip: 'Use "git log -L :functionName:file" to see the complete evolution of a specific function over time. This is often more useful than blame for understanding how code evolved.',
          },
        ],
        quiz: [
          {
            question: 'What does "git blame -w" do?',
            options: ['Shows blame in a web browser', 'Ignores whitespace changes', 'Writes blame output to a file', 'Warns about suspicious code'],
            correctAnswer: 1,
            explanation: 'The -w flag makes git blame ignore whitespace changes, showing who wrote the actual logic rather than who reformatted the code.',
          },
          {
            question: 'How can you ignore bulk formatting commits in git blame?',
            options: ['You cannot', 'Use --skip-format flag', 'Use --ignore-rev or .git-blame-ignore-revs file', 'Use --no-format flag'],
            correctAnswer: 2,
            explanation: 'The --ignore-rev flag ignores specific commits, and .git-blame-ignore-revs can list multiple commits to always ignore in blame.',
          },
          {
            question: 'What does git blame show for each line?',
            options: ['Only the author name', 'The commit hash, author, date, and line content', 'Only the date of last change', 'The file creation date'],
            correctAnswer: 1,
            explanation: 'Git blame annotates each line with the commit hash, author, timestamp, line number, and the actual line content.',
          },
        ],
      },
      {
        id: 'git-stash',
        title: 'git stash',
        difficulty: 'intermediate',
        tags: ['git', 'stash', 'save', 'temporary', 'workflow', 'context-switch'],
        sections: [
          {
            heading: 'Temporarily Saving Changes with git stash',
            content:
              'The "git stash" command temporarily saves your uncommitted changes (both staged and unstaged) and reverts your working directory to match the HEAD commit. This is invaluable when you need to switch context quickly, such as when you are in the middle of a feature and need to fix an urgent bug on another branch. Without stash, Git would either refuse to switch branches (if there are conflicts) or carry your uncommitted changes to the new branch. Stash acts like a stack (last in, first out) where you can push multiple sets of changes and pop them off later. When you run "git stash" (or "git stash push"), your working directory becomes clean, allowing you to switch branches freely. When you return to your work, "git stash pop" restores the stashed changes and removes the stash entry. Alternatively, "git stash apply" restores the changes but keeps the stash entry for potential reuse. By default, git stash only saves tracked files; untracked files and ignored files are not included unless you specify additional flags.',
            code: `# Save current changes to stash
git stash

# Stash with a descriptive message
git stash push -m "WIP: user authentication feature"

# List all stashes
git stash list
# stash@{0}: On main: WIP: user authentication feature
# stash@{1}: WIP on main: abc1234 Previous stash

# Restore most recent stash (and remove from stack)
git stash pop

# Restore most recent stash (keep in stack)
git stash apply

# Restore a specific stash
git stash pop stash@{1}
git stash apply stash@{2}

# Include untracked files
git stash -u
# or
git stash --include-untracked

# Include everything (untracked + ignored)
git stash -a
# or
git stash --all`,
            note: 'Use "git stash push -m" with a descriptive message to remember what each stash contains. Without a message, it can be hard to identify stashes later.',
          },
          {
            heading: 'Managing Multiple Stashes',
            content:
              'The stash is a stack, so you can have multiple stashes at the same time. Each stash is numbered with "stash@{0}" being the most recent, "stash@{1}" being the next, and so on. You can list all stashes with "git stash list" and show the contents of a specific stash with "git stash show" (summary) or "git stash show -p" (full diff). To drop a stash without applying it, use "git stash drop stash@{n}". To clear all stashes, use "git stash clear", but be careful as this is irreversible. You can create a new branch from a stash with "git stash branch <branchname>", which creates a new branch from the commit where the stash was created, applies the stash, and drops it. This is useful when your stashed changes conflict with the current branch state. Git stash also supports partial stashing with "git stash push -p" (patch mode), which lets you interactively select which changes to stash, similar to "git add -p". This is useful when you want to stash only some of your changes while keeping others in the working directory.',
            code: `# List stashes with details
git stash list

# Show summary of a stash
git stash show
git stash show stash@{1}

# Show full diff of a stash
git stash show -p
git stash show -p stash@{2}

# Drop a specific stash
git stash drop stash@{0}

# Clear ALL stashes (irreversible!)
git stash clear

# Create a branch from a stash
git stash branch new-feature stash@{0}

# Interactive/partial stash
git stash push -p -m "Stash only the bugfix changes"

# Stash specific files only
git stash push -m "Stash config changes" config.json settings.yml

# Apply stash to different branch
git checkout other-branch
git stash apply stash@{0}`,
            tip: 'Use "git stash branch" when your stash conflicts with the current branch. It creates a branch from where the stash was originally made, avoiding conflicts.',
          },
          {
            heading: 'Stash Best Practices and Alternatives',
            content:
              'While git stash is convenient, it has some limitations and pitfalls to be aware of. Stashes are local only and not shared with others. Long-lived stashes tend to accumulate and become hard to remember, so treat stash as short-term storage. If you find yourself stashing for long periods, consider creating a proper branch and commit instead. Stash can sometimes cause merge conflicts when you pop, especially if the codebase has changed significantly since you stashed. In that case, "git stash branch" is your friend. An alternative to stash for context switching is to use Git worktrees, which let you have multiple working directories for the same repository. This means you can have one directory on your feature branch and another on main, switching between them without any stash operations. Another alternative is simply committing your work-in-progress with a "WIP" message, then later using "git reset --soft HEAD~1" to undo the commit and continue working. Some developers prefer this approach because commits are more visible and less likely to be forgotten than stashes.',
            code: `# Alternative 1: WIP commit instead of stash
git add -A
git commit -m "WIP: halfway through feature X"
# ... switch branches, do other work ...
git checkout feature-branch
git reset --soft HEAD~1  # undo WIP commit, keep changes

# Alternative 2: Git worktrees
git worktree add ../hotfix-dir main
# Now you have two working directories:
# ./               -> feature branch
# ../hotfix-dir/   -> main branch

# Clean up worktree when done
git worktree remove ../hotfix-dir

# Best practices:
# 1. Always use descriptive messages with stash
git stash push -m "WIP: refactoring auth module"

# 2. Check stash list regularly
git stash list

# 3. Clean up old stashes
git stash drop stash@{5}  # drop specific old stash

# 4. Prefer branches for anything lasting > 1 hour
git checkout -b wip/feature-experiment
git add -A && git commit -m "WIP: experimental approach"

# 5. Check stash contents before applying
git stash show -p stash@{0}  # review before pop`,
            tip: 'For long-running context switches, prefer creating a WIP branch and commit over stashing. Branches are more visible, more shareable, and less likely to be forgotten.',
          },
        ],
        challenge: {
          title: 'Stash Juggling',
          description: 'Practice using stash to manage multiple sets of changes across branches.',
          steps: [
            'Create a repo with a main branch and two files',
            'Make changes to file1 and stash with the message "changes to file1"',
            'Make different changes to file2 and stash with message "changes to file2"',
            'List stashes and verify both appear',
            'Apply the FIRST stash (file1 changes) using stash@{1}',
            'Pop the remaining stash (file2 changes)',
            'Verify both sets of changes are present in the working directory',
          ],
          expectedOutput: 'Both files should have their modifications restored, and "git stash list" should be empty after popping all stashes.',
        },
      },
    ],
  },
];
