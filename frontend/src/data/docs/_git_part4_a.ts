import type { DocCategory } from './types';

export const GIT_PART4A_CATEGORIES: DocCategory[] = [
  {
    id: 'git-tags-hooks',
    label: 'Tags, Hooks & Automation',
    icon: '🏷️',
    entries: [
      {
        id: 'git-tags',
        title: 'Git Tags',
        description: 'Lightweight vs annotated tags, create, list, delete, and push tags for releases.',
        difficulty: 'intermediate',
        tags: ['git', 'tags', 'annotated', 'lightweight', 'release'],
        sections: [
          {
            id: 'git-tags-types',
            title: 'Lightweight vs Annotated Tags',
            content: 'Lightweight tags are simple pointers to a commit — just a name. Annotated tags store extra metadata: tagger name, email, date, and a message. Use annotated tags for releases since they include full context. Lightweight tags suit temporary or local bookmarks.',
            code: '# Lightweight tag\ngit tag v1.0.0\n\n# Annotated tag\ngit tag -a v1.0.0 -m "Release version 1.0.0"\n\n# Tag a specific commit\ngit tag -a v0.9.0 abc1234 -m "Beta release"',
          },
          {
            id: 'git-tags-list-delete',
            title: 'List and Delete Tags',
            content: 'List all tags or filter by pattern. Delete local tags with `-d` and remote tags by pushing an empty ref. Tags are not pushed automatically with commits — you must push them explicitly.',
            code: '# List all tags\ngit tag\n\n# Filter tags by pattern\ngit tag -l "v1.*"\n\n# Show tag details\ngit show v1.0.0\n\n# Delete local tag\ngit tag -d v1.0.0\n\n# Delete remote tag\ngit push origin --delete v1.0.0',
          },
          {
            id: 'git-tags-push',
            title: 'Pushing Tags',
            content: 'Push a single tag or all tags to the remote. The `--follow-tags` flag pushes only annotated tags reachable from pushed commits, which is the recommended approach for releases.',
            code: '# Push a specific tag\ngit push origin v1.0.0\n\n# Push all local tags\ngit push origin --tags\n\n# Push commits and reachable annotated tags\ngit push --follow-tags\n\n# Fetch remote tags\ngit fetch --tags',
          },
        ],
        quiz: {
          questions: [
            {
              id: 'q-tags-1',
              question: 'Which tag type stores tagger metadata and supports a message?',
              options: ['Lightweight tag', 'Annotated tag', 'Signed tag', 'Remote tag'],
              correctIndex: 1,
              explanation: 'Annotated tags store the tagger name, email, date, and a message, making them ideal for release tracking.',
            },
            {
              id: 'q-tags-2',
              question: 'How do you push all local tags to the remote?',
              options: ['git push origin', 'git push --tags', 'git push origin --all', 'git tag --push'],
              correctIndex: 1,
              explanation: '`git push origin --tags` pushes all local tags to the remote repository.',
            },
            {
              id: 'q-tags-3',
              question: 'Which flag pushes only annotated tags reachable from pushed commits?',
              options: ['--tags', '--annotated', '--follow-tags', '--push-tags'],
              correctIndex: 2,
              explanation: '`--follow-tags` pushes only annotated tags that are reachable from the commits being pushed.',
            },
          ],
        },
      },
      {
        id: 'git-tag-signing',
        title: 'Signing Tags & Commits',
        description: 'Use GPG to sign tags and commits for cryptographic verification of author identity.',
        difficulty: 'advanced',
        tags: ['git', 'gpg', 'signing', 'security', 'verify'],
        sections: [
          {
            id: 'git-tag-signing-setup',
            title: 'GPG Key Setup',
            content: 'To sign Git objects, generate a GPG key pair and configure Git to use it. List your keys, copy the key ID, and set `user.signingkey` in your Git config. GitHub and GitLab can display verified badges when your public key is uploaded.',
            code: '# List GPG keys\ngpg --list-secret-keys --keyid-format=long\n\n# Set signing key in Git\ngit config --global user.signingkey <KEY_ID>\n\n# Export public key for GitHub/GitLab\ngpg --armor --export <KEY_ID>',
          },
          {
            id: 'git-tag-signing-sign',
            title: 'Signing Tags and Commits',
            content: 'Use `-s` to sign an annotated tag with GPG. Use `-S` when committing to sign the commit. You can configure Git to always sign commits automatically, ensuring every commit carries your cryptographic signature.',
            code: '# Sign an annotated tag\ngit tag -s v1.0.0 -m "Signed release v1.0.0"\n\n# Sign a commit\ngit commit -S -m "feat: add signed feature"\n\n# Always sign commits automatically\ngit config --global commit.gpgsign true',
          },
          {
            id: 'git-tag-signing-verify',
            title: 'Verifying Signatures',
            content: 'Verify a signed tag with `git tag -v` or use `git log --show-signature` to inspect commit signatures inline. The GPG output confirms the signature is valid and identifies the signing key.',
            code: '# Verify a signed tag\ngit tag -v v1.0.0\n\n# Show signatures in log\ngit log --show-signature\n\n# Verify a specific commit\ngit verify-commit HEAD',
          },
        ],
      },
      {
        id: 'git-hooks-intro',
        title: 'Git Hooks Overview',
        description: 'Client-side and server-side hooks stored in .git/hooks/ that automate actions at key Git events.',
        difficulty: 'intermediate',
        tags: ['git', 'hooks', 'automation', 'client-side', 'server-side'],
        sections: [
          {
            id: 'git-hooks-what',
            title: 'What Are Git Hooks?',
            content: 'Git hooks are executable scripts in `.git/hooks/` that run automatically at specific events — before a commit, after a push, on the server when receiving commits, etc. They automate enforcement of policies, linting, and notifications without requiring developer action.',
            code: '# List available hook samples\nls .git/hooks/\n\n# Enable a hook (remove .sample extension)\ncp .git/hooks/pre-commit.sample .git/hooks/pre-commit\nchmod +x .git/hooks/pre-commit',
          },
          {
            id: 'git-hooks-client-server',
            title: 'Client-Side vs Server-Side',
            content: 'Client-side hooks run on the developer\'s machine during operations like commit and push. Server-side hooks run on the remote repository server during receive operations. Client hooks enforce local quality; server hooks enforce repository-wide policies.',
            code: '# Common client-side hooks\n# pre-commit      - runs before commit is created\n# commit-msg      - validates commit message\n# pre-push        - runs before push to remote\n\n# Common server-side hooks\n# pre-receive     - runs before refs are updated\n# update          - runs per-branch during receive\n# post-receive    - runs after all refs are updated',
          },
          {
            id: 'git-hooks-lifecycle',
            title: 'Hook Lifecycle for Commits',
            content: 'During a commit, Git runs hooks in a defined sequence. If any hook exits with a non-zero status, the operation is aborted. This allows enforcement of code quality gates before a commit is recorded.',
            diagram: {
              kind: 'mermaid',
              code: 'graph LR\n  A[pre-commit] --> B[prepare-commit-msg]\n  B --> C[commit-msg]\n  C --> D[post-commit]\n  D --> E[pre-push]\n  style A fill:#f9a825\n  style E fill:#43a047,color:#fff',
              caption: 'Git hook lifecycle for commits',
            },
          },
        ],
        quiz: {
          questions: [
            {
              id: 'q-hooks-1',
              question: 'Where are Git hook scripts stored by default?',
              options: ['.githooks/', '.git/hooks/', 'hooks/', '.git/config/hooks/'],
              correctIndex: 1,
              explanation: 'Git hooks are stored in the `.git/hooks/` directory as executable scripts.',
            },
            {
              id: 'q-hooks-2',
              question: 'What happens when a hook script exits with a non-zero status?',
              options: ['The hook is skipped', 'Git aborts the operation', 'A warning is shown but Git continues', 'The script runs again'],
              correctIndex: 1,
              explanation: 'A non-zero exit code from a hook causes Git to abort the current operation.',
            },
            {
              id: 'q-hooks-3',
              question: 'Which hook runs first during a `git commit`?',
              options: ['commit-msg', 'prepare-commit-msg', 'pre-commit', 'post-commit'],
              correctIndex: 2,
              explanation: 'The `pre-commit` hook is the first hook to run when creating a commit.',
            },
          ],
        },
      },
      {
        id: 'git-pre-commit',
        title: 'pre-commit Hook',
        description: 'Enforce linting and formatting automatically before commits using husky and lint-staged.',
        difficulty: 'intermediate',
        tags: ['git', 'hooks', 'pre-commit', 'husky', 'lint-staged'],
        sections: [
          {
            id: 'git-pre-commit-manual',
            title: 'Writing a Manual pre-commit Hook',
            content: 'A basic pre-commit hook can run a linter and abort the commit if issues are found. The script must be executable and reside at `.git/hooks/pre-commit`. Exit code 0 allows the commit; any other code blocks it.',
            code: '#!/bin/sh\n# .git/hooks/pre-commit\n\nnpm run lint\nif [ $? -ne 0 ]; then\n  echo "Linting failed. Commit aborted."\n  exit 1\nfi\n\nexport default 0',
          },
          {
            id: 'git-pre-commit-husky',
            title: 'Using Husky',
            content: 'Husky is a Node.js tool that manages Git hooks via `package.json`, allowing hooks to be version-controlled and shared across the team. Install it, initialize, then add hooks. Hooks live in `.husky/` instead of `.git/hooks/`.',
            code: '# Install and initialize husky\nnpm install --save-dev husky\nnpx husky init\n\n# Add a pre-commit hook\necho "npm run lint" > .husky/pre-commit\n\n# Verify hook file\ncat .husky/pre-commit',
          },
          {
            id: 'git-pre-commit-lint-staged',
            title: 'lint-staged for Targeted Checks',
            content: 'lint-staged runs linters only on staged files, making pre-commit checks fast even in large repos. Configure it in `package.json` to run ESLint on JS/TS files and Prettier on all files before each commit.',
            code: '// package.json\n{\n  "lint-staged": {\n    "*.{js,ts,tsx}": ["eslint --fix", "git add"],\n    "*.{json,css,md}": ["prettier --write", "git add"]\n  },\n  "scripts": {\n    "prepare": "husky"\n  }\n}',
          },
        ],
      },
      {
        id: 'git-commit-msg',
        title: 'commit-msg Hook',
        description: 'Enforce conventional commit message format automatically using the commit-msg hook.',
        difficulty: 'intermediate',
        tags: ['git', 'hooks', 'commit-msg', 'conventional-commits'],
        sections: [
          {
            id: 'git-commit-msg-format',
            title: 'Conventional Commits Format',
            content: 'Conventional Commits is a specification for structured commit messages: `<type>(<scope>): <description>`. Types include `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, and `ci`. Following this standard enables automatic changelog generation.',
            code: '# Valid conventional commit messages\ngit commit -m "feat(auth): add OAuth2 login"\ngit commit -m "fix(api): handle null response from endpoint"\ngit commit -m "docs: update README with setup steps"\ngit commit -m "chore: upgrade dependencies"',
          },
          {
            id: 'git-commit-msg-hook',
            title: 'Writing the commit-msg Hook',
            content: 'The `commit-msg` hook receives the commit message file path as its first argument. Read the message and validate it against a regex pattern. If it fails, print an error and exit with code 1 to abort the commit.',
            code: '#!/bin/sh\n# .git/hooks/commit-msg\nMSG=$(cat "$1")\nPATTERN="^(feat|fix|docs|style|refactor|test|chore)(\\(.+\\))?: .{1,72}"\n\nif ! echo "$MSG" | grep -qE "$PATTERN"; then\n  echo "ERROR: Commit message must follow Conventional Commits."\n  echo "  Example: feat(scope): description"\n  exit 1\nfi',
          },
          {
            id: 'git-commit-msg-commitlint',
            title: 'commitlint for Automated Enforcement',
            content: 'commitlint automates commit message linting with a shareable config. Combine it with husky to enforce the conventional commits standard across the team without maintaining a custom shell script.',
            code: '# Install commitlint\nnpm install --save-dev @commitlint/cli @commitlint/config-conventional\n\n# Create config file\necho "module.exports = { extends: [\'@commitlint/config-conventional\'] };" > commitlint.config.js\n\n# Add husky hook\necho "npx --no -- commitlint --edit $1" > .husky/commit-msg',
          },
        ],
      },
      {
        id: 'git-server-hooks',
        title: 'Server-Side Hooks',
        description: 'Enforce repository policies on the server using pre-receive, update, and post-receive hooks.',
        difficulty: 'advanced',
        tags: ['git', 'hooks', 'server', 'pre-receive', 'post-receive'],
        sections: [
          {
            id: 'git-server-hooks-pre-receive',
            title: 'pre-receive Hook',
            content: 'The `pre-receive` hook runs on the server before any refs are updated. It receives old and new SHA and the ref name on stdin. Rejecting here blocks the entire push. Used to enforce branch naming policies or require signed commits.',
            code: '#!/bin/sh\n# hooks/pre-receive (server)\nwhile read oldrev newrev refname; do\n  # Block direct pushes to main\n  if [ "$refname" = "refs/heads/main" ]; then\n    echo "ERROR: Direct pushes to main are not allowed."\n    exit 1\n  fi\ndone\nexit 0',
          },
          {
            id: 'git-server-hooks-update',
            title: 'update Hook',
            content: 'The `update` hook is called once per branch being updated. It receives the ref name, old SHA, and new SHA as arguments. Unlike `pre-receive`, it runs per-ref so you can allow some branches and reject others independently.',
            code: '#!/bin/sh\n# hooks/update (server)\nREFNAME=$1\nOLDREV=$2\nNEWREV=$3\n\n# Enforce protected branch list\nif [ "$REFNAME" = "refs/heads/production" ]; then\n  echo "Branch \'production\' is protected."\n  exit 1\nfi\nexit 0',
          },
          {
            id: 'git-server-hooks-post-receive',
            title: 'post-receive Hook',
            content: 'The `post-receive` hook runs after all refs are updated successfully. Use it to trigger CI/CD pipelines, send notifications, or update deployment systems. Since the push already completed, exiting with non-zero has no effect on the push.',
            code: '#!/bin/sh\n# hooks/post-receive (server)\nwhile read oldrev newrev refname; do\n  BRANCH=$(echo "$refname" | sed "s|refs/heads/||")\n  if [ "$BRANCH" = "main" ]; then\n    echo "Triggering deployment for main..."\n    curl -X POST https://ci.example.com/deploy/main\n  fi\ndone',
          },
        ],
        quiz: {
          questions: [
            {
              id: 'q-server-hooks-1',
              question: 'Which server-side hook runs before any refs are updated and can reject the entire push?',
              options: ['update', 'post-receive', 'pre-receive', 'pre-push'],
              correctIndex: 2,
              explanation: '`pre-receive` runs before any refs are updated and can block the entire push by exiting non-zero.',
            },
            {
              id: 'q-server-hooks-2',
              question: 'The `update` hook differs from `pre-receive` because it runs:',
              options: ['Once per push', 'Once per branch being updated', 'After all refs are updated', 'Only on the default branch'],
              correctIndex: 1,
              explanation: 'The `update` hook runs once per branch (ref) being updated, allowing fine-grained per-branch control.',
            },
            {
              id: 'q-server-hooks-3',
              question: 'What is a common use case for the post-receive hook?',
              options: ['Rejecting invalid commit messages', 'Blocking force pushes', 'Triggering CI/CD pipelines', 'Validating branch names'],
              correctIndex: 2,
              explanation: '`post-receive` is ideal for triggering deployments or CI notifications after a successful push.',
            },
          ],
        },
      },
      {
        id: 'git-ci-cd',
        title: 'Git in CI/CD',
        description: 'Optimize Git usage in pipelines with shallow clones, caching strategies, and changelog generation.',
        difficulty: 'intermediate',
        tags: ['git', 'ci-cd', 'automation', 'pipeline', 'changelog'],
        sections: [
          {
            id: 'git-ci-cd-shallow',
            title: 'Shallow Clones for Speed',
            content: 'Shallow clones (`--depth`) fetch only the most recent commits, drastically reducing clone time and disk usage in CI pipelines. Use `--no-single-branch` when you need access to multiple branches for merging or comparison.',
            code: '# Shallow clone for CI (last 1 commit)\ngit clone --depth=1 https://github.com/org/repo.git\n\n# Shallow clone with branch\ngit clone --depth=1 --branch main https://github.com/org/repo.git\n\n# Unshallow when full history is needed\ngit fetch --unshallow',
          },
          {
            id: 'git-ci-cd-caching',
            title: 'Caching Git in Pipelines',
            content: 'Cache the `.git` directory or use `git fetch` with `--update-shallow` on subsequent runs to avoid re-cloning. Most CI platforms support cache keys based on `package-lock.json` or `yarn.lock` to restore node_modules efficiently.',
            code: '# GitHub Actions example\n- uses: actions/checkout@v4\n  with:\n    fetch-depth: 0  # Full history for changelog\n\n- uses: actions/cache@v3\n  with:\n    path: ~/.npm\n    key: ${{ runner.os }}-node-${{ hashFiles(\'**/package-lock.json\') }}',
          },
          {
            id: 'git-ci-cd-changelog',
            title: 'Automated Changelog Generation',
            content: 'Tools like `conventional-changelog` and `semantic-release` parse conventional commit history to generate changelogs and bump versions automatically. This integrates with tags to produce release notes on each CI run.',
            code: '# Install conventional-changelog\nnpm install --save-dev conventional-changelog-cli\n\n# Generate changelog from commits\nnpx conventional-changelog -p angular -i CHANGELOG.md -s\n\n# Full automated release with semantic-release\nnpx semantic-release',
          },
        ],
        quiz: {
          questions: [
            {
              id: 'q-cicd-1',
              question: 'What does `git clone --depth=1` do?',
              options: ['Clones only one branch', 'Fetches only the most recent commit', 'Disables LFS', 'Clones without submodules'],
              correctIndex: 1,
              explanation: '`--depth=1` creates a shallow clone with only the most recent commit, speeding up CI pipelines.',
            },
            {
              id: 'q-cicd-2',
              question: 'Which command converts a shallow clone to a full clone?',
              options: ['git fetch --all', 'git pull --depth=0', 'git fetch --unshallow', 'git clone --full'],
              correctIndex: 2,
              explanation: '`git fetch --unshallow` retrieves the full commit history, converting a shallow clone to a complete one.',
            },
            {
              id: 'q-cicd-3',
              question: 'Which tool automates versioning and changelog generation from conventional commits?',
              options: ['husky', 'commitlint', 'semantic-release', 'lint-staged'],
              correctIndex: 2,
              explanation: '`semantic-release` automates versioning, changelog generation, and publishing based on conventional commit messages.',
            },
          ],
        },
      },
      {
        id: 'git-aliases',
        title: 'Git Aliases',
        description: 'Create useful Git and shell aliases to speed up common workflows and reduce typing.',
        difficulty: 'beginner',
        tags: ['git', 'aliases', 'productivity', 'shortcuts'],
        sections: [
          {
            id: 'git-aliases-basic',
            title: 'Creating Git Aliases',
            content: 'Git aliases are shortcuts for longer commands configured via `git config`. They are stored in `~/.gitconfig` under the `[alias]` section. Use them to shorten frequently typed commands like `status`, `log`, and `checkout`.',
            code: '# Add aliases via git config\ngit config --global alias.st status\ngit config --global alias.co checkout\ngit config --global alias.br branch\ngit config --global alias.ci commit\ngit config --global alias.unstage "reset HEAD --"',
          },
          {
            id: 'git-aliases-advanced',
            title: 'Useful Log and Diff Aliases',
            content: 'Power-user aliases combine multiple flags into memorable shortcuts. The `lg` alias produces a colorful, compact log with branch graph. The `last` alias shows the most recent commit details quickly.',
            code: '# Pretty graph log\ngit config --global alias.lg "log --oneline --graph --decorate --all"\n\n# Show last commit\ngit config --global alias.last "log -1 HEAD --stat"\n\n# List all aliases\ngit config --global alias.aliases "config --get-regexp alias"',
          },
          {
            id: 'git-aliases-shell',
            title: 'Shell-Level Git Aliases',
            content: 'Beyond Git config aliases, add shell aliases in `~/.bashrc` or `~/.zshrc` for even faster access. These allow you to type `gs` instead of `git status` and chain with other shell tools seamlessly.',
            code: '# Add to ~/.bashrc or ~/.zshrc\nalias gs="git status"\nalias ga="git add"\nalias gc="git commit"\nalias gp="git push"\nalias gl="git pull"\nalias gd="git diff"\nalias gco="git checkout"\n\n# Reload shell config\nsource ~/.zshrc',
          },
        ],
      },
    ],
  },
];
