import type { DocCategory } from './types';

export const GIT_PART4C_CATEGORIES: DocCategory[] = [
  {
    id: 'git-collaboration',
    label: 'Collaboration',
    icon: '🤝',
    entries: [
      {
        id: 'git-pr-workflow',
        title: 'Pull Request Workflow',
        slug: 'git-pr-workflow',
        description: 'Create, review, update, and merge pull requests effectively.',
        difficulty: 'intermediate',
        tags: ['git', 'pull-request', 'workflow', 'review', 'merge'],
        sections: [
          {
            id: 'git-pr-workflow-create',
            title: 'Creating a Pull Request',
            content: 'Push your branch and open a PR against the target branch. Write a clear title and description explaining what changed and why. Reference related issues using keywords like `Closes #123`. Keep PRs focused and small to ease review.',
            codeExample: {
              language: 'bash',
              code: `# Push branch and create PR via CLI
git push -u origin feature/my-feature

# Using GitHub CLI
gh pr create --title "Add user auth" --body "Closes #42" --base main

# List open PRs
gh pr list`,
            },
          },
          {
            id: 'git-pr-workflow-review',
            title: 'Reviewing and Updating',
            content: 'Address reviewer feedback by pushing new commits to the same branch — the PR updates automatically. Use `git commit --fixup` to create fixup commits, then squash before merge. Respond to every comment to show it was addressed.',
            codeExample: {
              language: 'bash',
              code: `# Push updates to existing PR branch
git add .
git commit -m "fix: address review feedback"
git push

# Create a fixup commit for a specific commit
git commit --fixup=<commit-sha>

# Autosquash fixups before merge
git rebase -i --autosquash main`,
            },
          },
          {
            id: 'git-pr-workflow-merge',
            title: 'Merge Strategies',
            content: 'Choose a merge strategy that fits your workflow. Merge commit preserves history, squash merge collapses commits for a clean log, and rebase merge replays commits for a linear history. Set a default strategy in repository settings.',
            codeExample: {
              language: 'bash',
              code: `# Merge commit (preserves all commits)
gh pr merge --merge

# Squash and merge (one commit)
gh pr merge --squash

# Rebase and merge (linear history)
gh pr merge --rebase

# Delete branch after merge
gh pr merge --delete-branch`,
            },
          },
        ],
        quiz: {
          questions: [
            {
              id: 'q-pr-workflow-1',
              question: 'What keyword in a PR description automatically closes a linked issue on merge?',
              options: ['Fixes', 'Closes', 'Resolves', 'All of the above'],
              correctIndex: 3,
              explanation: '"Fixes", "Closes", and "Resolves" (and their variants) all automatically close linked issues when the PR is merged.',
            },
            {
              id: 'q-pr-workflow-2',
              question: 'Which merge strategy produces a single commit from all PR commits?',
              options: ['Merge commit', 'Squash merge', 'Rebase merge', 'Fast-forward'],
              correctIndex: 1,
              explanation: 'Squash merge collapses all commits in the PR into a single commit on the target branch.',
            },
            {
              id: 'q-pr-workflow-3',
              question: 'How do you update a pull request with new changes?',
              options: ['Open a new PR', 'Push commits to the same branch', 'Edit the PR description', 'Force push to main'],
              correctIndex: 1,
              explanation: 'Pushing new commits to the PR branch automatically updates the pull request with those changes.',
            },
          ],
        },
      },
      {
        id: 'git-code-review',
        title: 'Code Review with Git',
        slug: 'git-code-review',
        description: 'Use git diffs, comments, and suggestions to give and receive effective code reviews.',
        difficulty: 'intermediate',
        tags: ['git', 'code-review', 'diff', 'feedback', 'quality'],
        sections: [
          {
            id: 'git-code-review-diff',
            title: 'Reviewing Diffs',
            content: 'Use `git diff` to inspect changes before and during review. Compare your branch to main to see the full scope of changes. Use `--stat` for a summary and `--word-diff` to highlight inline word-level changes.',
            codeExample: {
              language: 'bash',
              code: `# Diff against main
git diff main...HEAD

# Summary of changed files
git diff main...HEAD --stat

# Word-level diff highlighting
git diff --word-diff main...HEAD

# Review a specific file
git diff main...HEAD -- src/auth.ts`,
            },
          },
          {
            id: 'git-code-review-fetch',
            title: 'Checking Out a PR Locally',
            content: 'Check out a PR locally to run tests and explore the code in your editor. GitHub CLI makes this simple. After review, return to your branch and delete the temporary checkout.',
            codeExample: {
              language: 'bash',
              code: `# Check out PR #99 locally
gh pr checkout 99

# Or manually fetch PR ref
git fetch origin pull/99/head:pr-99
git checkout pr-99

# Return to your branch
git checkout main
git branch -d pr-99`,
            },
          },
          {
            id: 'git-code-review-suggest',
            title: 'Suggestions and Approvals',
            content: 'On GitHub, use suggestion blocks in comments to propose exact code changes that authors can apply with one click. Approve or request changes using the review submission form. Require approvals from code owners before merging.',
            codeExample: {
              language: 'bash',
              code: `# In a GitHub review comment, use suggestion blocks:
# \`\`\`suggestion
# const result = items.filter(Boolean);
# \`\`\`

# Apply all suggestions via CLI
gh pr review 99 --approve --body "LGTM!"

# Request changes
gh pr review 99 --request-changes --body "Please add tests"`,
            },
          },
        ],
      },
      {
        id: 'git-codeowners',
        title: 'CODEOWNERS',
        slug: 'git-codeowners',
        description: 'Define ownership over paths, auto-assign reviewers, and enforce review requirements with CODEOWNERS.',
        difficulty: 'intermediate',
        tags: ['git', 'codeowners', 'ownership', 'teams', 'automation'],
        sections: [
          {
            id: 'git-codeowners-syntax',
            title: 'Syntax and Path Matching',
            content: 'CODEOWNERS uses gitignore-style patterns. Each line maps a path pattern to one or more owners (GitHub users or teams). Later rules override earlier ones. Place the file in `.github/`, `docs/`, or the repo root.',
            codeExample: {
              language: 'bash',
              code: `# .github/CODEOWNERS

# Default owner for everything
*                   @org/core-team

# Backend owned by backend team
/backend/           @org/backend-team

# Specific file
package.json        @org/devops

# Wildcard pattern
*.go                @alice @bob`,
            },
          },
          {
            id: 'git-codeowners-teams',
            title: 'Team Owners',
            content: 'Assign teams as owners to distribute review responsibility. Use `@org/team-name` syntax. Team members receive review requests automatically. Combine individual and team owners for redundancy — any one approval satisfies the requirement.',
            codeExample: {
              language: 'bash',
              code: `# Mix of individual and team owners
/frontend/          @org/frontend-team @alice
/backend/api/       @org/backend-team
/infra/             @org/devops @bob

# Security-sensitive paths require security team
/auth/              @org/security-team
*.pem               @org/security-team`,
            },
          },
          {
            id: 'git-codeowners-enforcement',
            title: 'Auto-Assignment and Enforcement',
            content: 'Enable "Require review from Code Owners" in branch protection rules to enforce that relevant owners approve before merging. CODEOWNERS reviews are separate from general reviewer requirements. Use CODEOWNERS to gate sensitive paths like CI config and auth code.',
            codeExample: {
              language: 'bash',
              code: `# Verify CODEOWNERS is valid
gh api repos/{owner}/{repo}/codeowners/errors

# Check which files have owners
# (GitHub shows ownership in PR file tree)

# Branch protection: require CODEOWNERS review
gh api repos/{owner}/{repo}/branches/main/protection \
  --method PUT \
  --field required_pull_request_reviews[require_code_owner_reviews]=true`,
            },
          },
        ],
      },
      {
        id: 'git-conflict-prevention',
        title: 'Preventing Conflicts',
        slug: 'git-conflict-prevention',
        description: 'Use communication, small PRs, and rebasing strategies to avoid merge conflicts before they occur.',
        difficulty: 'intermediate',
        tags: ['git', 'conflicts', 'prevention', 'communication', 'branching'],
        sections: [
          {
            id: 'git-conflict-prevention-small-prs',
            title: 'Keep PRs Small',
            content: 'Large PRs that touch many files are conflict magnets. Break work into focused, atomic PRs. Each PR should do one thing. Smaller PRs merge faster, reducing the window for divergence between branches.',
            codeExample: {
              language: 'bash',
              code: `# Check how many files your branch touches
git diff main...HEAD --stat | tail -1

# If too many files, split with git add -p
git add -p          # Interactively stage hunks

# Create focused commits
git commit -m "feat: add user model"
git commit -m "feat: add user API endpoints"`,
            },
          },
          {
            id: 'git-conflict-prevention-rebase',
            title: 'Rebase Regularly',
            content: 'Rebase your feature branch onto main frequently to absorb upstream changes in small increments. Resolving one day of changes is far easier than resolving a week. Set `pull.rebase=true` to rebase on pull by default.',
            codeExample: {
              language: 'bash',
              code: `# Rebase onto latest main
git fetch origin
git rebase origin/main

# Configure pull to rebase by default
git config --global pull.rebase true

# If conflicts occur during rebase
git status              # See conflicted files
# ... resolve conflicts ...
git add <file>
git rebase --continue`,
            },
          },
          {
            id: 'git-conflict-prevention-communication',
            title: 'Team Communication',
            content: 'Communicate before working on shared files. Use feature flags to merge incomplete work safely. Coordinate file ownership with CODEOWNERS. Avoid reformatting entire files in mixed-purpose commits — formatting PRs should stand alone.',
            codeExample: {
              language: 'bash',
              code: `# Separate formatting from logic changes
git checkout -b chore/format-utils
# Run formatter on one file
npx prettier --write src/utils.ts
git commit -m "chore: format utils.ts"

# Then do logic changes on a separate branch
git checkout -b feat/update-utils
# ... make actual changes ...
git commit -m "feat: add parseDate helper"`,
            },
          },
        ],
        quiz: {
          questions: [
            {
              id: 'q-conflict-prevention-1',
              question: 'What is the primary benefit of keeping PRs small?',
              options: ['Faster CI runs', 'Reduces the conflict window', 'Fewer commits', 'Simpler branch names'],
              correctIndex: 1,
              explanation: 'Small PRs merge quickly, reducing the time window during which other branches can diverge and cause conflicts.',
            },
            {
              id: 'q-conflict-prevention-2',
              question: 'Which git config makes `git pull` rebase instead of merge?',
              options: ['pull.strategy=rebase', 'pull.rebase=true', 'fetch.rebase=true', 'merge.rebase=true'],
              correctIndex: 1,
              explanation: '`git config --global pull.rebase true` makes git pull rebase your local commits on top of fetched changes instead of creating a merge commit.',
            },
            {
              id: 'q-conflict-prevention-3',
              question: 'Why should formatting-only changes be in separate PRs?',
              options: ['Formatters are slow', 'Formatting changes cause noisy diffs that hide logic changes and trigger conflicts', 'Linters require it', 'GitHub limits diff size'],
              correctIndex: 1,
              explanation: 'Formatting-only PRs keep logic diffs clean and avoid conflicts where two branches both reformat the same file differently.',
            },
          ],
        },
      },
      {
        id: 'git-commit-messages',
        title: 'Writing Great Commit Messages',
        slug: 'git-commit-messages',
        description: 'Apply the 50/72 rule, imperative mood, and structured body to write commit messages that serve as documentation.',
        difficulty: 'intermediate',
        tags: ['git', 'commit-messages', 'conventions', 'best-practices'],
        sections: [
          {
            id: 'git-commit-messages-subject',
            title: 'The Subject Line (50/72 Rule)',
            content: 'The subject line should be 50 characters or fewer and written in imperative mood ("Add feature" not "Added feature"). Capitalize the first word. Do not end with a period. Git log, GitHub, and most tools truncate at 72 characters, so keep subjects concise.',
            codeExample: {
              language: 'bash',
              code: `# Good subject lines
git commit -m "Add OAuth2 login support"
git commit -m "Fix null pointer in user serializer"
git commit -m "Refactor auth middleware for clarity"

# Bad subject lines
git commit -m "added some stuff"           # not imperative
git commit -m "Fixed the bug that was causing issues in production"  # too long`,
            },
          },
          {
            id: 'git-commit-messages-body',
            title: 'Writing the Body',
            content: 'Separate the subject from the body with a blank line. Wrap body lines at 72 characters. Explain the "why" not the "what" — the diff shows what changed. Use the body to describe motivation, context, and trade-offs made.',
            codeExample: {
              language: 'bash',
              code: `git commit -m "$(cat <<'EOF'
Throttle API requests to avoid rate limiting

The external payment API allows only 100 req/s. Under load,
we were hitting this limit and returning 429 errors to users.

Added a token bucket rate limiter with a 90 req/s ceiling to
leave headroom. Retries use exponential backoff (max 3 attempts).

Closes #187
EOF
)"`,
            },
          },
          {
            id: 'git-commit-messages-conventional',
            title: 'Conventional Commits',
            content: 'The Conventional Commits spec adds a structured prefix: `type(scope): subject`. Common types: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `ci`. This enables automated changelogs, semantic versioning, and consistent history navigation.',
            codeExample: {
              language: 'bash',
              code: `# Conventional commit format
git commit -m "feat(auth): add JWT refresh token rotation"
git commit -m "fix(api): return 404 when user not found"
git commit -m "chore(deps): upgrade axios to 1.6.0"
git commit -m "docs(readme): add Docker setup instructions"
git commit -m "test(auth): add unit tests for token expiry"`,
            },
          },
        ],
      },
      {
        id: 'git-blame-advanced',
        title: 'Advanced Blame',
        slug: 'git-blame-advanced',
        description: 'Use .git-blame-ignore-revs, follow renames, and whitespace flags to get meaningful blame output.',
        difficulty: 'intermediate',
        tags: ['git', 'blame', 'ignore-revs', 'investigation', 'history'],
        sections: [
          {
            id: 'git-blame-advanced-basics',
            title: 'Blame Flags',
            content: 'Beyond basic blame, use `-w` to ignore whitespace changes, `-M` to detect moved lines within a file, and `-C` to detect code copied from other files. These flags help find the true origin of code rather than blaming reformatting commits.',
            codeExample: {
              language: 'bash',
              code: `# Ignore whitespace changes
git blame -w src/auth.ts

# Detect lines moved within the file
git blame -M src/auth.ts

# Detect lines copied from other files
git blame -C src/auth.ts

# Combine all three
git blame -wMC src/auth.ts

# Blame a specific range of lines
git blame -L 20,40 src/auth.ts`,
            },
          },
          {
            id: 'git-blame-advanced-ignore-revs',
            title: '.git-blame-ignore-revs',
            content: 'Create a `.git-blame-ignore-revs` file listing bulk-change commits (reformatting, mass renaming) to skip in blame output. Configure git to use this file automatically so every developer gets clean blame results without extra flags.',
            codeExample: {
              language: 'bash',
              code: `# .git-blame-ignore-revs
# Prettier reformat — 2024-01-15
a3f8c2d1e9b7f4a2c8d3e6f1a9b2c5d8e4f7a1b3

# ESLint auto-fix — 2024-02-20
b4e9d3f2a1c8b7e6d5f4a3c2b1e9d8f7c6b5a4e3

# Configure git to use this file
git config blame.ignoreRevsFile .git-blame-ignore-revs`,
            },
          },
          {
            id: 'git-blame-advanced-follow',
            title: 'Following Renames',
            content: 'When a file is renamed, `git log --follow` traces history through the rename. Combine with `git log -p --follow` to see the full diff history. Use `git log --diff-filter=R` to find all rename events in the repo history.',
            codeExample: {
              language: 'bash',
              code: `# Follow file history through renames
git log --follow -- src/utils/auth.ts

# Show patches through renames
git log -p --follow -- src/utils/auth.ts

# Find all renames in history
git log --diff-filter=R --summary

# Blame with rename detection
git blame -C --follow src/utils/auth.ts`,
            },
          },
        ],
      },
      {
        id: 'git-security',
        title: 'Git Security',
        slug: 'git-security',
        description: 'Sign commits with GPG or SSH, configure protected branches, and prevent secrets from entering the repository.',
        difficulty: 'intermediate',
        tags: ['git', 'security', 'signing', 'protected-branches', 'secrets'],
        sections: [
          {
            id: 'git-security-signing',
            title: 'Signing Commits',
            content: 'Sign commits to prove authorship. Use GPG for traditional signing or SSH keys (supported in Git 2.34+) for simplicity. GitHub displays a "Verified" badge on signed commits. Configure `commit.gpgsign=true` to sign all commits automatically.',
            codeExample: {
              language: 'bash',
              code: `# GPG signing
git config --global user.signingkey <KEY_ID>
git config --global commit.gpgsign true
git commit -S -m "feat: signed commit"

# SSH signing (Git 2.34+)
git config --global gpg.format ssh
git config --global user.signingkey ~/.ssh/id_ed25519.pub
git config --global commit.gpgsign true

# Verify a commit's signature
git verify-commit HEAD`,
            },
          },
          {
            id: 'git-security-protected-branches',
            title: 'Protected Branches',
            content: 'Protected branches prevent direct pushes to critical branches and enforce PR requirements. Enable required status checks, required reviews, and signed commit enforcement. Dismiss stale reviews when new commits are pushed to close approval bypass gaps.',
            codeExample: {
              language: 'bash',
              code: `# Set up branch protection via GitHub CLI
gh api repos/{owner}/{repo}/branches/main/protection \
  --method PUT \
  --field required_status_checks[strict]=true \
  --field required_pull_request_reviews[required_approving_review_count]=1 \
  --field required_pull_request_reviews[dismiss_stale_reviews]=true \
  --field required_pull_request_reviews[require_code_owner_reviews]=true \
  --field enforce_admins=true`,
            },
          },
          {
            id: 'git-security-secrets',
            title: 'Preventing Secret Leaks',
            content: 'Use pre-commit hooks or tools like `git-secrets`, `gitleaks`, or `trufflehog` to block secrets before they are committed. If a secret is committed, rotate it immediately — removing from history is not sufficient since forks and clones may already have it.',
            codeExample: {
              language: 'bash',
              code: `# Install gitleaks
brew install gitleaks

# Scan the repository for secrets
gitleaks detect --source .

# Scan a specific commit range
gitleaks detect --log-opts="main..HEAD"

# Add as a pre-commit hook
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/sh
gitleaks protect --staged
EOF
chmod +x .git/hooks/pre-commit`,
            },
          },
        ],
        quiz: {
          questions: [
            {
              id: 'q-git-security-1',
              question: 'Which git config enables automatic commit signing?',
              options: ['commit.sign=true', 'commit.gpgsign=true', 'gpg.autosign=true', 'sign.commits=always'],
              correctIndex: 1,
              explanation: '`git config --global commit.gpgsign true` makes git sign every commit automatically with your configured signing key.',
            },
            {
              id: 'q-git-security-2',
              question: 'What should you do immediately after discovering a committed secret?',
              options: ['Run git rebase to remove it', 'Rotate the secret, then clean history', 'Delete the repository', 'Force push the main branch'],
              correctIndex: 1,
              explanation: 'Rotate the secret first since anyone who cloned or forked the repo may already have it. Cleaning history is still recommended but is not sufficient by itself.',
            },
            {
              id: 'q-git-security-3',
              question: 'What does "dismiss stale reviews" do in branch protection?',
              options: ['Deletes old reviews', 'Removes approval when new commits are pushed', 'Archives the PR', 'Hides outdated comments'],
              correctIndex: 1,
              explanation: 'Dismissing stale reviews invalidates existing approvals when new commits are pushed, preventing a bypass where someone adds malicious code after getting approval.',
            },
          ],
        },
      },
      {
        id: 'git-large-repos',
        title: 'Managing Large Repositories',
        slug: 'git-large-repos',
        description: 'Use shallow clones, partial clones, Git LFS, and repository splitting to keep large repos performant.',
        difficulty: 'intermediate',
        tags: ['git', 'large-repos', 'performance', 'lfs', 'shallow-clone'],
        sections: [
          {
            id: 'git-large-repos-shallow',
            title: 'Shallow and Partial Clones',
            content: 'Shallow clones fetch only recent history, dramatically reducing clone time and disk usage for large repos. Partial clones skip blobs or trees until needed, fetching them lazily. Both are ideal for CI environments where full history is unnecessary.',
            codeExample: {
              language: 'bash',
              code: `# Shallow clone (last 10 commits)
git clone --depth 10 https://github.com/org/repo.git

# Shallow clone with single branch
git clone --depth 1 --single-branch --branch main https://github.com/org/repo.git

# Partial clone (skip large blobs)
git clone --filter=blob:none https://github.com/org/repo.git

# Partial clone (skip all blobs and trees)
git clone --filter=tree:0 https://github.com/org/repo.git`,
            },
          },
          {
            id: 'git-large-repos-lfs',
            title: 'Git Large File Storage (LFS)',
            content: 'Git LFS replaces large binary files (images, videos, models) with lightweight pointers in the repository, storing the actual content on an LFS server. Track file patterns with `git lfs track` to automatically use LFS for those files going forward.',
            codeExample: {
              language: 'bash',
              code: `# Install Git LFS
git lfs install

# Track file patterns
git lfs track "*.psd"
git lfs track "*.mp4"
git lfs track "models/**/*.bin"

# Commit the tracking config
git add .gitattributes
git commit -m "chore: configure Git LFS tracking"

# List tracked patterns
git lfs track

# Check LFS status
git lfs status`,
            },
          },
          {
            id: 'git-large-repos-split',
            title: 'Splitting Large Repositories',
            content: 'When a monorepo grows too large, split it using `git filter-repo` to extract a subdirectory with full history into a new repository. Use sparse checkout to work with only a subset of a monorepo without splitting it.',
            codeExample: {
              language: 'bash',
              code: `# Install git-filter-repo
pip install git-filter-repo

# Extract a subdirectory into a new repo
git clone --no-local repo new-service-repo
cd new-service-repo
git filter-repo --subdirectory-filter services/auth

# Sparse checkout to work with subset of monorepo
git clone --no-checkout https://github.com/org/monorepo.git
cd monorepo
git sparse-checkout init --cone
git sparse-checkout set services/auth shared/utils`,
            },
          },
        ],
      },
    ],
  },
];
