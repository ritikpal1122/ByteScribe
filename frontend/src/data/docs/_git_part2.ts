import type { DocCategory } from './types';

export const GIT_PART2_CATEGORIES: DocCategory[] = [
  {
    id: 'git-branching',
    title: 'Branching & Merging',
    icon: '🌿',
    entries: [
      {
        id: 'git-branch',
        title: 'git branch',
        difficulty: 'beginner',
        tags: ['git', 'branch', 'create', 'delete', 'rename', 'list'],
        sections: [
          {
            heading: 'Creating and Listing Branches',
            content:
              'The git branch command is one of the most fundamental tools in Git for managing parallel lines of development. When you create a branch, Git simply creates a new pointer to the current commit rather than copying any files, making branch creation nearly instantaneous regardless of repository size. Listing branches with git branch shows all local branches, while git branch -r shows remote-tracking branches and git branch -a shows all branches combined. The current branch is indicated with an asterisk. Understanding branches is essential for any collaborative workflow because they allow multiple developers to work on separate features without interfering with each other. Branches also provide a safety net: if an experiment goes wrong, you can simply delete the branch and return to a stable state without affecting the main codebase.',
            code: `# List all local branches
git branch

# List remote-tracking branches
git branch -r

# List all branches (local + remote)
git branch -a

# Create a new branch (does NOT switch to it)
git branch feature/login

# Create a branch from a specific commit
git branch hotfix/bug-123 abc1234

# Show branches with last commit info
git branch -v

# Show branches merged into current branch
git branch --merged`,
            tip: 'Use git branch -v to quickly see the last commit on each branch, helping you identify stale branches that may need cleanup.',
          },
          {
            heading: 'Renaming and Deleting Branches',
            content:
              'Renaming branches is a common operation when naming conventions change or when a branch name no longer reflects its purpose. The -m flag renames the current branch, while -M forces the rename even if the target name already exists. Deleting branches with -d is a safe operation because Git will refuse to delete a branch that has unmerged changes. If you truly want to force-delete a branch regardless of its merge status, use the -D flag instead. When working in teams, it is important to clean up branches after they have been merged to keep the repository tidy. Many teams adopt a practice of deleting feature branches immediately after merging them into the main branch. This helps reduce clutter and makes it easier to find active work among the remaining branches in the repository.',
            code: `# Rename the current branch
git branch -m new-name

# Rename a specific branch
git branch -m old-name new-name

# Force rename (even if target name exists)
git branch -M old-name new-name

# Delete a merged branch (safe)
git branch -d feature/login

# Force delete a branch (even if unmerged)
git branch -D experiment/broken

# Delete a remote branch
git push origin --delete feature/login

# Clean up stale remote-tracking branches
git remote prune origin`,
            warning: 'Using -D to force delete a branch with unmerged commits means those commits may become unreachable and eventually be garbage collected. Always double-check before force deleting.',
          },
          {
            heading: 'Branch Management Best Practices',
            content:
              'Effective branch management becomes increasingly important as projects grow in size and contributor count. A well-organized branch structure makes it easier to track ongoing work, review changes, and coordinate releases. Adopt a consistent naming convention such as feature/, bugfix/, hotfix/, or release/ prefixes so that anyone can quickly understand the purpose of a branch at a glance. Regularly pruning merged branches keeps the branch list manageable and reduces confusion about which branches are still active. You can automate this cleanup with scripts or CI/CD hooks that delete branches after their pull requests are merged. Additionally, use git branch --no-merged to identify branches that still have pending work, ensuring nothing falls through the cracks during busy development periods. These practices contribute to a healthy and navigable repository.',
            code: `# List branches not yet merged into main
git branch --no-merged main

# List branches already merged into main
git branch --merged main

# Delete all merged branches except main and develop
git branch --merged main | grep -v "main\\|develop" | xargs git branch -d

# Show branches containing a specific commit
git branch --contains abc1234

# Sort branches by committer date
git branch --sort=-committerdate

# Set upstream for current branch
git branch --set-upstream-to=origin/main`,
            note: 'The --contains flag is invaluable when you need to determine which branches include a specific bug fix or feature commit.',
          },
        ],
        quiz: [
          {
            question: 'What does git branch -d do if the branch has unmerged changes?',
            options: ['Deletes the branch anyway', 'Refuses to delete and shows an error', 'Merges the branch first then deletes', 'Creates a backup before deleting'],
            correctAnswer: 1,
            explanation: 'The -d flag is the safe delete option. Git will refuse to delete a branch with unmerged changes to prevent accidental data loss. Use -D to force delete.',
          },
          {
            question: 'What does creating a branch in Git actually do internally?',
            options: ['Copies all files to a new directory', 'Creates a snapshot of the working tree', 'Creates a new pointer to the current commit', 'Forks the repository'],
            correctAnswer: 2,
            explanation: 'A Git branch is simply a lightweight movable pointer to a commit. Creating a branch is nearly instantaneous because no files are copied.',
          },
          {
            question: 'Which command shows branches that have NOT been merged into main?',
            options: ['git branch --merged main', 'git branch --no-merged main', 'git branch -a main', 'git branch --unmerged main'],
            correctAnswer: 1,
            explanation: 'git branch --no-merged main lists all branches with commits not yet merged into the main branch.',
          },
        ],
      },
      {
        id: 'git-checkout',
        title: 'git checkout',
        difficulty: 'beginner',
        tags: ['git', 'checkout', 'switch', 'detached-head', 'branches'],
        sections: [
          {
            heading: 'Switching Branches with Checkout',
            content:
              'The git checkout command is a versatile tool that has been part of Git since its earliest days. Its primary use is switching between branches, which updates the files in your working directory to match the version stored in the target branch. When you checkout a branch, Git moves the HEAD pointer to the tip of that branch and updates your working directory accordingly. If you have uncommitted changes that conflict with the target branch, Git will abort the checkout and warn you to commit or stash your changes first. The checkout command can also create and switch to a new branch simultaneously with the -b flag, which is a convenient shorthand used extensively in everyday workflows. Although git switch has partially replaced checkout for branch switching, understanding checkout remains essential because of its prevalence in existing documentation and scripts.',
            code: `# Switch to an existing branch
git checkout main

# Create and switch to a new branch
git checkout -b feature/dashboard

# Create a branch from a specific commit
git checkout -b hotfix/crash abc1234

# Create a branch tracking a remote branch
git checkout -b feature/api origin/feature/api

# Shorthand: track remote branch with same name
git checkout --track origin/feature/api

# Discard changes in a specific file
git checkout -- path/to/file.txt

# Checkout a file from another branch
git checkout main -- src/config.ts`,
            tip: 'The -- separator before file paths prevents ambiguity between branch names and file paths. Always use it when restoring files to avoid unexpected behavior.',
          },
          {
            heading: 'Detached HEAD State',
            content:
              'A detached HEAD state occurs when you checkout a specific commit, tag, or remote branch directly rather than a local branch. In this state, HEAD points to a specific commit instead of a branch reference. Any new commits you make in detached HEAD state are not associated with any branch and will become unreachable once you switch away unless you create a branch to preserve them. This state is useful for inspecting historical commits, running tests against old versions, or experimenting without affecting any branch. Git will display a warning message when you enter detached HEAD state to ensure you understand the implications. If you decide to keep work done in detached HEAD, simply create a new branch from that position before switching away. Understanding this concept prevents confusion and potential loss of work when navigating commit history.',
            code: `# Checkout a specific commit (enters detached HEAD)
git checkout abc1234

# Checkout a tag
git checkout v2.0.0

# See where HEAD is pointing
git log --oneline -1

# Create a branch to save detached HEAD work
git checkout -b save-my-work

# Return to the previous branch
git checkout -

# Checkout a remote branch (detached HEAD)
git checkout origin/feature/api`,
            warning: 'Commits made in detached HEAD state are not on any branch. If you switch away without creating a branch, those commits may be lost after garbage collection.',
          },
          {
            heading: 'Checkout for File Operations',
            content:
              'Beyond branch switching, git checkout can operate on individual files or directories. When given a file path, checkout replaces the working directory version of that file with the version from the specified commit or branch. This is useful for selectively reverting changes or pulling specific files from other branches without performing a full merge. You can checkout files from any commit in the history, making it a powerful tool for recovering lost code or comparing implementations across branches. Note that checking out files this way stages the changes automatically, so they are ready to commit. In modern Git, the git restore command has taken over this file-restoration role with clearer semantics, but the checkout syntax remains widely used in existing codebases, scripts, and documentation that you will encounter throughout your career as a developer.',
            code: `# Restore a file from the last commit
git checkout HEAD -- path/to/file.txt

# Restore a file from a specific commit
git checkout abc1234 -- src/utils.ts

# Restore an entire directory from another branch
git checkout feature/api -- src/api/

# Restore all files to last committed state
git checkout HEAD -- .

# Interactive patch checkout (select hunks)
git checkout -p main -- src/config.ts

# Checkout file from stash
git checkout stash@{0} -- src/helper.ts`,
            note: 'In Git 2.23+, git restore is the recommended replacement for file-level checkout operations. It provides clearer intent and avoids the overloaded nature of git checkout.',
          },
        ],
        quiz: [
          {
            question: 'What happens when you git checkout a specific commit hash?',
            options: ['A new branch is created', 'You enter detached HEAD state', 'The commit is deleted', 'Nothing happens'],
            correctAnswer: 1,
            explanation: 'Checking out a specific commit puts you in detached HEAD state where HEAD points directly to a commit instead of a branch reference.',
          },
          {
            question: 'What does git checkout -b feature/new do?',
            options: ['Deletes the feature/new branch', 'Switches to feature/new if it exists', 'Creates and switches to feature/new', 'Lists branches matching feature/'],
            correctAnswer: 2,
            explanation: 'The -b flag creates a new branch with the given name and immediately switches to it in a single command.',
          },
          {
            question: 'How can you preserve commits made in detached HEAD state?',
            options: ['They are automatically preserved', 'Run git commit --save', 'Create a branch before switching away', 'Run git stash'],
            correctAnswer: 2,
            explanation: 'Creating a branch while in detached HEAD gives those commits a branch reference, preventing them from becoming unreachable.',
          },
        ],
      },
      {
        id: 'git-switch',
        title: 'git switch',
        difficulty: 'beginner',
        tags: ['git', 'switch', 'branch', 'modern', 'checkout-alternative'],
        sections: [
          {
            heading: 'Introduction to git switch',
            content:
              'Git switch was introduced in Git version 2.23 as a more focused alternative to git checkout for branch-related operations. While git checkout is an overloaded command that handles both branch switching and file restoration, git switch has a single clear purpose: switching between branches. This separation of concerns makes Git easier to learn and reduces the chance of accidentally performing the wrong operation. The git switch command provides better error messages and safer defaults compared to checkout. For instance, if you have uncommitted changes that would conflict with the target branch, git switch clearly explains the situation and suggests solutions. Adopting git switch in your workflow is recommended by the Git project itself, and it integrates seamlessly with the companion git restore command for file-level operations that checkout also used to handle.',
            code: `# Switch to an existing branch
git switch main

# Create and switch to a new branch
git switch -c feature/search

# Create a branch from a specific starting point
git switch -c hotfix/crash abc1234

# Switch to the previous branch
git switch -

# Force switch (discarding local changes)
git switch -f main

# Create a branch tracking a remote
git switch -c feature/api --track origin/feature/api`,
            tip: 'Use git switch -c as a modern replacement for git checkout -b. The -c stands for "create", which is more intuitive than -b for "branch".',
          },
          {
            heading: 'Detached HEAD with git switch',
            content:
              'Unlike git checkout, git switch does not allow you to enter detached HEAD state by default. If you try to switch to a specific commit hash, git switch will refuse and display an error. This is a deliberate safety measure to prevent users from accidentally ending up in detached HEAD and potentially losing commits. When you genuinely need to inspect a specific commit in detached HEAD mode, you must explicitly pass the --detach flag. This forces you to consciously acknowledge that you are entering a potentially risky state, significantly reducing accidental use. This design philosophy reflects the broader trend in modern Git toward safer, more explicit commands that minimize surprising behavior. The explicit nature of git switch --detach makes code reviews and documentation easier to understand because the intent is always clear from the command itself.',
            code: `# This will FAIL (safety measure)
# git switch abc1234

# Explicitly enter detached HEAD
git switch --detach abc1234

# Detach at a tag
git switch --detach v2.0.0

# Detach at a remote branch
git switch --detach origin/main

# Return to a branch after detached HEAD
git switch main

# Create branch from detached HEAD to save work
git switch -c saved-experiment`,
            warning: 'Even with --detach, remember to create a branch before switching away if you make commits you want to keep.',
          },
          {
            heading: 'Migrating from checkout to switch',
            content:
              'Migrating from git checkout to git switch is straightforward because the commands map almost one-to-one for branch operations. The main differences are flag names: -b becomes -c for creating branches, and detached HEAD requires --detach. For file restoration operations that checkout also handled, use git restore instead. This migration improves your workflow clarity and helps team members understand intent at a glance. Many organizations are updating their documentation, CI scripts, and aliases to use the newer commands. While git checkout is not deprecated and will continue to work indefinitely, new users benefit from learning switch and restore first because the separation of concerns reduces cognitive load. Existing users can gradually adopt the new commands as they become comfortable with the syntax. The Git project recommends the newer commands in their official documentation for new workflows.',
            code: `# Old way vs new way comparison

# Switch branches
# Old: git checkout main
# New: git switch main

# Create and switch
# Old: git checkout -b feature/new
# New: git switch -c feature/new

# Detached HEAD
# Old: git checkout abc1234
# New: git switch --detach abc1234

# Restore file (no longer part of switch)
# Old: git checkout -- file.txt
# New: git restore file.txt

# Restore file from branch
# Old: git checkout main -- file.txt
# New: git restore --source main file.txt`,
            note: 'git switch and git restore together replace all functionality of git checkout with clearer semantics. Neither command is deprecated; use whichever you prefer.',
          },
        ],
        challenge: {
          title: 'Practice git switch',
          description: 'Practice using git switch to manage branches in a repository.',
          steps: [
            'Initialize a new repository and make an initial commit',
            'Use git switch -c to create and switch to a feature branch',
            'Make a commit on the feature branch',
            'Use git switch to go back to main',
            'Use git switch --detach to inspect a specific commit',
            'Create a new branch from detached HEAD using git switch -c',
          ],
          hints: [
            'Use git switch -c branch-name to create and switch',
            'Use git switch - to toggle between the last two branches',
            'Remember --detach is required for commit hashes',
          ],
        },
      },
      {
        id: 'git-merge',
        title: 'git merge',
        difficulty: 'intermediate',
        tags: ['git', 'merge', 'fast-forward', 'squash', 'no-ff', 'integration'],
        sections: [
          {
            heading: 'Fast-Forward and Three-Way Merges',
            content:
              'Git merge integrates changes from one branch into another. There are two primary merge strategies: fast-forward and three-way merge. A fast-forward merge occurs when the target branch has no new commits since the source branch diverged; Git simply moves the branch pointer forward. A three-way merge happens when both branches have diverged with new commits; Git creates a new merge commit that has two parent commits. Understanding the difference is critical for maintaining a clean project history. Fast-forward merges produce a linear history that is easy to read but can obscure when features were developed in parallel. Three-way merges preserve the branching structure, making it clear when work happened on separate branches. The choice between these strategies depends on your team preferences and the type of project history you want to maintain for future reference and debugging.',
            code: `# Fast-forward merge (default when possible)
git switch main
git merge feature/login

# Force a merge commit even when ff is possible
git merge --no-ff feature/login

# Squash all commits into one before merging
git merge --squash feature/login
git commit -m "Add login feature"

# Abort a merge in progress
git merge --abort

# Continue merge after resolving conflicts
git merge --continue

# Merge with a custom commit message
git merge feature/api -m "Merge API feature into main"`,
            tip: 'Many teams enforce --no-ff merges on main branches to preserve feature branch history, making it easier to revert entire features if needed.',
          },
          {
            heading: 'Merge Strategies and Options',
            content:
              'Git provides several merge strategies to handle different scenarios. The default recursive strategy works well for most cases, handling complex merge scenarios with multiple common ancestors. The ours strategy keeps the current branch version for all conflicts, useful when you want to record a merge without incorporating changes. The octopus strategy can merge more than two branches simultaneously. Beyond strategies, merge options like --squash condense all feature branch commits into a single commit on the target branch, producing a cleaner history at the cost of losing individual commit granularity. The --no-commit flag performs the merge but stops before creating the merge commit, allowing you to inspect or modify the result. These options give you fine-grained control over how changes are integrated and how your project history reads, which is particularly valuable in large teams with many concurrent feature branches.',
            code: `# Use the ours strategy (keep current branch for conflicts)
git merge -s ours feature/old-approach

# Use recursive strategy with patience diff
git merge -s recursive -X patience feature/api

# Prefer our side in conflicts automatically
git merge -X ours feature/experiment

# Prefer their side in conflicts automatically
git merge -X theirs feature/update

# Merge without auto-commit
git merge --no-commit feature/ui

# Verify signatures on merge
git merge --verify-signatures feature/secure

# Octopus merge (multiple branches)
git merge feature/a feature/b feature/c`,
            note: 'The -X ours and -X theirs options only affect conflicting sections. Non-conflicting changes from both branches are always included.',
          },
          {
            heading: 'Squash Merges and History Management',
            content:
              'Squash merging is a popular technique that takes all the commits from a feature branch and compresses them into a single commit on the target branch. This approach produces a very clean and readable main branch history where each commit represents a complete feature or fix. However, it discards the individual development history and makes it harder to use tools like git bisect for debugging. After a squash merge, the original feature branch still appears unmerged from Git perspective because no merge commit links the branches together, so you must delete the feature branch manually. Teams should establish clear guidelines about when to use regular merges versus squash merges based on the nature of changes and the desired history granularity. Many teams squash for small features and use regular merges for larger efforts where preserving intermediate commits has value for understanding the development process.',
            code: `# Squash merge workflow
git switch main
git merge --squash feature/login

# Check what was squashed
git status
git diff --cached

# Commit the squashed changes
git commit -m "feat: add login system with OAuth support"

# Delete the feature branch (required after squash)
git branch -d feature/login

# Squash merge with conflict resolution
git merge --squash feature/complex
# Fix conflicts, then:
git add .
git commit -m "feat: integrate complex feature"`,
            analogy: 'A squash merge is like summarizing a chapter of detailed notes into a single paragraph for the table of contents, keeping the conclusion while condensing the journey.',
          },
        ],
        diagram: {
          kind: 'mermaid' as const,
          code: `gitGraph
  commit id: "A"
  commit id: "B"
  branch feature
  commit id: "C"
  commit id: "D"
  checkout main
  commit id: "E"
  merge feature id: "M" tag: "merge commit"
  commit id: "F"`,
          caption: 'A three-way merge creates a merge commit (M) that combines diverged branches, preserving the full branching history.',
        },
        quiz: [
          {
            question: 'When does a fast-forward merge occur?',
            options: ['When there are conflicts', 'When the target branch has no new commits since divergence', 'When you use --no-ff', 'When merging more than two branches'],
            correctAnswer: 1,
            explanation: 'A fast-forward merge happens when the current branch can simply move its pointer forward because it has no new commits since the source branch was created.',
          },
          {
            question: 'What does git merge --squash do?',
            options: ['Deletes the source branch', 'Combines all source commits into one staged change', 'Rejects the merge', 'Creates multiple merge commits'],
            correctAnswer: 1,
            explanation: '--squash takes all changes from the source branch, stages them, but does not create a commit or merge reference. You then manually commit.',
          },
          {
            question: 'What is the purpose of --no-ff?',
            options: ['Prevents merging', 'Forces a merge commit even when fast-forward is possible', 'Skips conflict detection', 'Merges without commit messages'],
            correctAnswer: 1,
            explanation: '--no-ff creates a merge commit even when Git could fast-forward, preserving the branch topology in the history.',
          },
        ],
      },
      {
        id: 'git-merge-conflicts',
        title: 'Resolving Merge Conflicts',
        difficulty: 'intermediate',
        tags: ['git', 'merge', 'conflicts', 'resolution', 'diff3'],
        sections: [
          {
            heading: 'Understanding Merge Conflicts',
            content:
              'Merge conflicts occur when Git cannot automatically reconcile differences between two branches. This typically happens when the same lines in a file have been modified differently in each branch, or when one branch deletes a file that the other branch modifies. When a conflict occurs, Git pauses the merge and marks the conflicting areas in the affected files with special conflict markers. The markers divide the conflicting content into sections: the current branch changes appear between <<<<<<< HEAD and =======, while the incoming branch changes appear between ======= and >>>>>>> branch-name. Understanding how to read these markers is the first step toward confident conflict resolution. Conflicts are a normal part of collaborative development and should not be feared. With practice, resolving conflicts becomes routine and even provides an opportunity to review and improve the code being integrated.',
            code: `# Start a merge that has conflicts
git merge feature/api
# Output: CONFLICT (content): Merge conflict in src/app.ts

# View which files have conflicts
git status

# View the conflict markers in a file
# <<<<<<< HEAD
# const port = 3000;
# =======
# const port = 8080;
# >>>>>>> feature/api

# Use diff3 style for more context (shows common ancestor)
git config merge.conflictstyle diff3

# View conflicts in diff format
git diff

# List all unmerged files
git diff --name-only --diff-filter=U`,
            tip: 'Enable diff3 conflict style with git config merge.conflictstyle diff3 to see the common ancestor version alongside both changes, making it easier to understand what changed.',
          },
          {
            heading: 'Resolving Conflicts Manually',
            content:
              'To resolve a conflict, you must edit the conflicted files to contain the desired final content, removing all conflict markers in the process. You can choose to keep one side entirely, combine both changes, or write completely new code. After editing, stage the resolved files with git add and then complete the merge with git commit. If you realize the merge is too complex or was started by mistake, use git merge --abort to return to the pre-merge state. For files where you want to keep one version entirely, you can use git checkout --ours or git checkout --theirs to accept one side without manual editing. When dealing with many conflicts, a merge tool can be invaluable. Git integrates with various visual merge tools that present conflicts in a side-by-side view, making complex resolutions much more manageable and reducing the chance of mistakes.',
            code: `# After editing the conflicted file to resolve it:
git add src/app.ts

# Complete the merge
git commit

# Or abort the merge entirely
git merge --abort

# Accept current branch version for a file
git checkout --ours src/config.ts
git add src/config.ts

# Accept incoming branch version for a file
git checkout --theirs src/config.ts
git add src/config.ts

# Use a visual merge tool
git mergetool

# Configure a default merge tool
git config merge.tool vimdiff
git config merge.tool vscode`,
            warning: 'Always review the full file after resolving conflicts, not just the marked sections. Sometimes the combined result has logical errors even when each side was correct individually.',
          },
          {
            heading: 'Preventing and Managing Conflicts',
            content:
              'While conflicts cannot be entirely avoided in collaborative work, several practices can minimize their frequency and severity. Regularly pulling from the shared branch keeps your feature branch up to date and reduces the scope of eventual conflicts. Keeping feature branches short-lived limits the amount of divergence. Modularizing code so that different features touch different files naturally reduces overlap. When you know a large refactoring is coming, coordinate with your team so that multiple people are not editing the same areas simultaneously. The rerere (reuse recorded resolution) feature tells Git to remember how you resolved a conflict so it can automatically apply the same resolution if the same conflict arises again, which is particularly useful during long-running rebase operations. Communication remains the most effective conflict prevention tool in any development team.',
            code: `# Enable rerere (reuse recorded resolution)
git config rerere.enabled true

# Keep feature branch updated with main
git switch feature/dashboard
git merge main

# Or rebase onto main to reduce future conflicts
git rebase main

# Check for potential conflicts before merging
git merge --no-commit --no-ff feature/api
git merge --abort  # if you just wanted to check

# Show the common ancestor of two branches
git merge-base main feature/api

# View the merge log
git log --merges --oneline

# Resolve all conflicts by keeping ours
git checkout --ours .
git add .`,
            note: 'The rerere feature is especially helpful when rebasing: if you resolve the same conflict during an interactive rebase, rerere can auto-apply your previous resolution.',
          },
        ],
        quiz: [
          {
            question: 'What do conflict markers <<<<<<< HEAD and >>>>>>> branch indicate?',
            options: ['Files to be deleted', 'The current branch changes vs incoming branch changes', 'Merge was successful', 'Branch has been deleted'],
            correctAnswer: 1,
            explanation: 'The markers delineate the conflicting sections: HEAD shows current branch content and the branch name shows incoming changes.',
          },
          {
            question: 'What does git merge --abort do?',
            options: ['Deletes the branch', 'Returns the repository to the pre-merge state', 'Forces the merge to complete', 'Keeps only conflicted files'],
            correctAnswer: 1,
            explanation: 'git merge --abort cancels the in-progress merge and restores the working directory and index to the state before the merge began.',
          },
          {
            question: 'What is the purpose of git rerere?',
            options: ['To redo the last merge', 'To reuse recorded conflict resolutions automatically', 'To revert a merge commit', 'To resolve all conflicts as ours'],
            correctAnswer: 1,
            explanation: 'rerere (reuse recorded resolution) remembers how you resolved specific conflicts and can automatically apply those resolutions when the same conflicts occur again.',
          },
        ],
      },
      {
        id: 'git-rebase',
        title: 'git rebase',
        difficulty: 'advanced',
        tags: ['git', 'rebase', 'interactive', 'onto', 'history', 'rewrite'],
        sections: [
          {
            heading: 'Basic Rebasing',
            content:
              'Git rebase is a powerful command that moves or re-applies commits from one branch onto another base. Unlike merging, which creates a merge commit and preserves the exact branching history, rebasing rewrites the commit history to produce a linear sequence of commits. When you rebase a feature branch onto main, Git takes each commit from your feature branch, temporarily removes it, updates the branch to the tip of main, and then re-applies each commit on top. This creates brand new commit objects with different hashes but the same changes. The result is a clean, linear history that reads as though all development happened sequentially. Rebasing is particularly valued in open-source projects where maintainers want a clean history that is easy to follow and bisect. However, because rebasing rewrites history, it should never be used on public branches that others have based work on.',
            code: `# Rebase current branch onto main
git switch feature/api
git rebase main

# Rebase onto a specific branch
git rebase develop

# Continue after resolving a rebase conflict
git rebase --continue

# Skip the current conflicting commit
git rebase --skip

# Abort the rebase and return to original state
git rebase --abort

# Rebase only the last 5 commits
git rebase -i HEAD~5

# Preserve merge commits during rebase
git rebase --rebase-merges main`,
            warning: 'Never rebase commits that have been pushed to a shared remote branch. Rewriting shared history causes serious problems for everyone who has based work on those commits.',
          },
          {
            heading: 'Interactive Rebase',
            content:
              'Interactive rebase is one of the most powerful features in Git, allowing you to rewrite commit history by reordering, editing, squashing, or dropping commits. When you run git rebase -i, Git opens your editor with a list of commits and actions. Each line represents a commit with an action keyword: pick to keep it as-is, reword to change its message, edit to pause and amend it, squash to merge it into the previous commit while combining messages, fixup to merge it silently into the previous commit, and drop to remove it entirely. You can also reorder lines to change commit sequence. Interactive rebase is invaluable for cleaning up a feature branch before merging by combining work-in-progress commits, fixing typos in messages, and organizing changes logically. This produces a professional, readable history that helps future developers understand the evolution of the codebase.',
            code: `# Interactive rebase of last 4 commits
git rebase -i HEAD~4

# Example editor content:
# pick abc1234 Add user model
# squash def5678 Fix typo in user model
# pick ghi9012 Add user API endpoints
# reword jkl3456 Add user tests

# Available commands in interactive rebase:
# p, pick   = use commit
# r, reword = use commit, but edit the commit message
# e, edit   = use commit, but stop for amending
# s, squash = use commit, but meld into previous commit
# f, fixup  = like squash, but discard this commit message
# d, drop   = remove commit
# x, exec   = run command using shell

# Autosquash: create fixup commits that auto-arrange
git commit --fixup=abc1234
git rebase -i --autosquash main`,
            tip: 'Use git commit --fixup=<hash> to create fixup commits, then git rebase -i --autosquash to automatically place them in the correct order during interactive rebase.',
          },
          {
            heading: 'Rebase --onto for Advanced Scenarios',
            content:
              'The --onto flag provides precise control over which commits are replayed and where they land. The full syntax is git rebase --onto newbase upstream branch. This is useful when you want to transplant a range of commits from one base to another. A common scenario is when you created a feature branch off another feature branch, and the first feature was merged or abandoned. You can use --onto to move your work directly onto main without including the intermediate branch commits. Another use case is removing a range of commits from a branch by rebasing everything after the unwanted commits onto the commit before them. Understanding --onto transforms rebase from a simple tool into a surgical instrument for history manipulation. While the syntax can be confusing at first, drawing the commit graph before and after helps visualize the intended transformation.',
            code: `# Rebase a sub-branch onto main
# Before: main -> feature-a -> feature-b
# After:  main -> feature-b
git rebase --onto main feature-a feature-b

# Remove commits between A and B
# Before: ... -> A -> X -> Y -> B -> ...
# After:  ... -> A -> B -> ...
git rebase --onto A B

# Move commits to a different starting point
git rebase --onto v2.0 v1.0 feature/migrate

# Rebase only specific range of commits
git rebase --onto main HEAD~3 HEAD

# Practical example: fix branching mistake
# You branched from develop but should have branched from main
git rebase --onto main develop feature/oops`,
            analogy: 'Rebase --onto is like cutting a section from a paper chain and gluing it onto a different chain. You choose exactly where to cut and where to attach.',
          },
        ],
        diagram: {
          kind: 'mermaid' as const,
          code: `gitGraph
  commit id: "A"
  commit id: "B"
  branch feature
  commit id: "C"
  commit id: "D"
  checkout main
  commit id: "E"
  checkout feature
  commit id: "C'" type: HIGHLIGHT
  commit id: "D'" type: HIGHLIGHT`,
          caption: 'After rebasing, commits C and D are replayed as C\' and D\' on top of commit E, creating a linear history without merge commits.',
        },
        quiz: [
          {
            question: 'What does rebasing do to commit hashes?',
            options: ['Keeps them the same', 'Creates new hashes for replayed commits', 'Deletes old hashes', 'Merges hashes together'],
            correctAnswer: 1,
            explanation: 'Rebasing creates entirely new commit objects with different hashes because the parent commits change, even though the content changes are the same.',
          },
          {
            question: 'What does "fixup" do in interactive rebase?',
            options: ['Fixes syntax errors', 'Merges commit into previous and discards its message', 'Pauses for manual editing', 'Reverts the commit'],
            correctAnswer: 1,
            explanation: 'fixup combines the commit changes into the previous commit while discarding the fixup commit message, keeping only the previous message.',
          },
          {
            question: 'When should you NOT rebase?',
            options: ['On local feature branches', 'Before pushing to remote', 'On shared branches others have based work on', 'During interactive sessions'],
            correctAnswer: 2,
            explanation: 'Rebasing rewrites history. If others have based work on the original commits, rewriting them causes divergence and confusion.',
          },
        ],
      },
      {
        id: 'git-cherry-pick',
        title: 'git cherry-pick',
        difficulty: 'intermediate',
        tags: ['git', 'cherry-pick', 'commits', 'selective', 'backport'],
        sections: [
          {
            heading: 'Basic Cherry-Picking',
            content:
              'Git cherry-pick allows you to apply the changes introduced by one or more existing commits onto your current branch. Unlike merge or rebase, which integrate entire branch histories, cherry-pick selectively copies individual commits. This is invaluable when you need a specific bug fix from a development branch applied to a release branch, or when a commit was accidentally made on the wrong branch. When you cherry-pick a commit, Git creates a new commit on the current branch with the same changes and message but a different hash. The original commit remains untouched on its source branch. Cherry-picking maintains the authorship information of the original commit, and by default adds a line noting which commit was cherry-picked. This makes it easy to trace the origin of backported fixes and understand the relationship between branches in your repository history.',
            code: `# Cherry-pick a single commit
git cherry-pick abc1234

# Cherry-pick multiple commits
git cherry-pick abc1234 def5678

# Cherry-pick a range of commits (exclusive start)
git cherry-pick abc1234..ghi9012

# Cherry-pick a range (inclusive start)
git cherry-pick abc1234^..ghi9012

# Cherry-pick without committing (stage only)
git cherry-pick --no-commit abc1234

# Cherry-pick and edit the commit message
git cherry-pick -e abc1234

# Append cherry-pick source info to message
git cherry-pick -x abc1234`,
            tip: 'Always use -x flag when cherry-picking across branches. It appends "(cherry picked from commit ...)" to the message, making it easy to trace the origin of backported changes.',
          },
          {
            heading: 'Handling Cherry-Pick Conflicts',
            content:
              'Cherry-pick conflicts occur when the changes in the picked commit cannot be cleanly applied to the current branch. This typically happens when the surrounding code has diverged significantly between branches. When a conflict occurs, Git pauses the cherry-pick and marks the conflicting files just like during a merge conflict. You can then resolve the conflicts manually, stage the resolved files, and continue with git cherry-pick --continue. Alternatively, you can abort the operation entirely with git cherry-pick --abort to return to the pre-cherry-pick state. If you are cherry-picking multiple commits and want to skip a problematic one, use git cherry-pick --skip. When cherry-picking across branches with very different codebases, consider using --no-commit to stage all changes first, allowing you to review and adjust before committing. This approach gives you maximum control over the final result.',
            code: `# Cherry-pick results in conflict
git cherry-pick abc1234
# CONFLICT: fix the files manually

# Stage resolved files
git add src/fixed-file.ts

# Continue the cherry-pick
git cherry-pick --continue

# Or abort the cherry-pick
git cherry-pick --abort

# Skip the current commit during multi-pick
git cherry-pick --skip

# Cherry-pick with merge strategy options
git cherry-pick -X theirs abc1234

# Stage changes without committing for review
git cherry-pick --no-commit abc1234 def5678
git diff --cached  # review all changes
git commit -m "Backport: fixes from develop"`,
            warning: 'Cherry-picking creates duplicate commits with different hashes. If both branches are later merged, Git may flag these as conflicts since it sees the same changes introduced twice.',
          },
          {
            heading: 'Cherry-Pick Use Cases and Best Practices',
            content:
              'Cherry-picking is particularly useful in release management workflows. When a critical bug is discovered and fixed on the development branch, the fix often needs to be applied to one or more release branches as well. Rather than merging the entire development branch, you cherry-pick just the specific fix commits. This keeps release branches stable while still incorporating essential fixes. Another common use case is when a developer commits to the wrong branch by mistake; cherry-pick the commit to the correct branch and then reset the original. However, cherry-picking should be used sparingly. Excessive cherry-picking can lead to duplicate changes scattered across branches, making history harder to understand and increasing the likelihood of subtle bugs. If you find yourself cherry-picking many commits regularly, consider whether your branching strategy needs adjustment to better support your workflow.',
            code: `# Backport a fix to a release branch
git switch release/2.0
git cherry-pick -x abc1234

# Fix wrong-branch mistake
git switch correct-branch
git cherry-pick abc1234
git switch wrong-branch
git reset --hard HEAD~1

# Cherry-pick from a different remote
git fetch upstream
git cherry-pick upstream/main~3

# Cherry-pick a merge commit (specify parent)
git cherry-pick -m 1 merge-commit-hash

# View what a cherry-pick would change (dry run)
git cherry-pick --no-commit abc1234
git diff --cached
git cherry-pick --abort  # undo if just checking`,
            note: 'When cherry-picking a merge commit, you must specify -m with the parent number (usually 1 for the branch that was merged into). Without -m, Git does not know which parent to diff against.',
          },
        ],
        challenge: {
          title: 'Cherry-Pick Backport Exercise',
          description: 'Practice cherry-picking commits between branches to simulate a backport workflow.',
          steps: [
            'Create a repository with main and develop branches',
            'Make 5 commits on develop with different features',
            'Switch to main and cherry-pick only the 2nd and 4th commits',
            'Verify the changes are correct with git log and git diff',
            'Practice resolving a cherry-pick conflict by modifying the same file on both branches',
          ],
          hints: [
            'Use git log --oneline develop to see commit hashes',
            'Use -x flag to track cherry-pick origins',
            'Use --no-commit to stage and review before committing',
          ],
        },
      },
      {
        id: 'git-branch-strategies',
        title: 'Branch Strategies',
        difficulty: 'intermediate',
        tags: ['git', 'git-flow', 'github-flow', 'trunk-based', 'workflow', 'strategy'],
        sections: [
          {
            heading: 'Git Flow',
            content:
              'Git Flow is a branching model introduced by Vincent Driessen that defines a strict structure for managing releases. It uses two main long-lived branches: main (or master) for production-ready code, and develop for integration of features. Feature branches are created from develop and merged back into develop when complete. When a release is ready, a release branch is created from develop for final testing and bug fixes before being merged into both main and develop. Hotfix branches are created from main for urgent production fixes and merged into both main and develop. This model works well for projects with scheduled releases and clear version numbers, such as mobile apps or installable software. However, it can be overly complex for web applications with continuous deployment where the overhead of managing multiple long-lived branches outweighs the benefits of the structured release process.',
            code: `# Initialize Git Flow
git flow init

# Start a feature
git flow feature start user-auth
# Work on feature...
git flow feature finish user-auth

# Start a release
git flow release start 2.0.0
# Test and fix bugs...
git flow release finish 2.0.0

# Start a hotfix
git flow hotfix start critical-bug
# Fix the bug...
git flow hotfix finish critical-bug

# Manual Git Flow (without git-flow tool)
git switch develop
git switch -c feature/user-auth
# Work...
git switch develop
git merge --no-ff feature/user-auth
git branch -d feature/user-auth`,
            note: 'Git Flow is best suited for projects with explicit version releases. For continuous deployment workflows, simpler models like GitHub Flow may be more appropriate.',
          },
          {
            heading: 'GitHub Flow and Trunk-Based Development',
            content:
              'GitHub Flow is a simpler alternative designed around continuous deployment. It has a single main branch that is always deployable. Developers create feature branches from main, push them to the remote, open pull requests for review, and merge back into main after approval. After merging, the code is deployed immediately. This model works well for web applications and services where continuous delivery is the norm. Trunk-Based Development takes simplicity even further by having developers commit directly to the main branch, or use very short-lived feature branches that are merged within a day or two. This approach requires strong automated testing and CI/CD pipelines to catch issues quickly. Trunk-Based Development is favored by high-performing engineering organizations like Google because it minimizes integration complexity and keeps the entire team synchronized. The choice between these strategies depends on team size, release cadence, and testing maturity.',
            code: `# GitHub Flow workflow
git switch main
git pull origin main
git switch -c feature/new-search

# Develop and commit
git add .
git commit -m "feat: add search functionality"
git push -u origin feature/new-search

# Create PR (using GitHub CLI)
gh pr create --title "Add search" --body "Implements search feature"

# After review and approval, merge via GitHub UI or CLI
gh pr merge --squash

# Trunk-Based Development
git switch main
git pull --rebase origin main
# Make small changes
git add .
git commit -m "feat: add search input"
git push origin main

# Or with short-lived branches (< 1 day)
git switch -c small-change
git commit -am "refactor: extract helper"
git switch main
git merge small-change
git branch -d small-change
git push origin main`,
            tip: 'Trunk-Based Development requires strong CI/CD and feature flags to deploy incomplete features safely. Invest in automated testing before adopting this approach.',
          },
          {
            heading: 'Choosing the Right Strategy',
            content:
              'Selecting a branching strategy should be based on your team size, deployment frequency, and project requirements rather than blindly following trends. Small teams working on web applications often thrive with GitHub Flow because its simplicity reduces overhead and accelerates delivery. Larger teams with formal release cycles may benefit from Git Flow structured approach, especially when supporting multiple production versions simultaneously. Trunk-Based Development suits mature engineering organizations with comprehensive test suites and robust CI/CD pipelines. Some teams adopt hybrid approaches, combining elements from multiple strategies. For example, using GitHub Flow for daily development but adding release branches when preparing major versions. The key principle across all strategies is to keep branches short-lived to minimize merge complexity. Whatever strategy you choose, document it clearly and ensure every team member understands the workflow. Consistency matters more than the specific strategy chosen.',
            code: `# Decision checklist in practice:

# Small team + continuous deploy = GitHub Flow
git switch main
git switch -c feature/quick-fix
# ... small focused change ...
git push -u origin feature/quick-fix
# Open PR, review, merge, deploy

# Versioned releases = Git Flow
git flow release start 3.0.0
# ... stabilize ...
git flow release finish 3.0.0

# Large team + continuous deploy = Trunk-Based
git switch main
git pull --rebase
# ... small change with feature flag ...
git push

# Hybrid approach
# Use GitHub Flow + release branches
git switch main
git switch -c release/Q1-2025
# Cherry-pick specific commits for release
git cherry-pick abc1234`,
            analogy: 'Choosing a branching strategy is like choosing a road system for a city. A simple grid works for small towns, but larger cities need highways and interchanges for managing traffic flow.',
          },
        ],
        quiz: [
          {
            question: 'What are the two long-lived branches in Git Flow?',
            options: ['main and feature', 'develop and release', 'main and develop', 'staging and production'],
            correctAnswer: 2,
            explanation: 'Git Flow uses main (for production) and develop (for integration) as its two permanent branches. All other branches are temporary.',
          },
          {
            question: 'Which strategy is best for continuous deployment of web apps?',
            options: ['Git Flow', 'GitHub Flow', 'Release branching', 'Manual deployment'],
            correctAnswer: 1,
            explanation: 'GitHub Flow is designed for continuous deployment with a single main branch that is always deployable, making it ideal for web applications.',
          },
          {
            question: 'What does Trunk-Based Development minimize?',
            options: ['Testing', 'Code reviews', 'Long-lived branches and integration complexity', 'Deployments'],
            correctAnswer: 2,
            explanation: 'Trunk-Based Development keeps all developers working close to main, minimizing branch divergence and the integration complexity that comes with long-lived branches.',
          },
        ],
      },
      {
        id: 'git-merge-vs-rebase',
        title: 'Merge vs Rebase',
        difficulty: 'intermediate',
        tags: ['git', 'merge', 'rebase', 'comparison', 'workflow', 'history'],
        sections: [
          {
            heading: 'Merge: Preserving History',
            content:
              'Merging preserves the complete history of how branches diverged and came back together. When you merge a feature branch into main, Git creates a merge commit that has two parent commits, one from each branch. This merge commit serves as a clear record that a parallel line of development existed and was integrated at this point. The entire commit history of the feature branch is preserved exactly as it happened, including the order and timing of commits. This approach is favored by teams who value a complete and accurate historical record over a clean linear history. Merge commits also make it easy to revert an entire feature by reverting the single merge commit, which undoes all changes introduced by the feature branch. The downside is that the history can become complex with many merge commits, especially in active repositories where branches are merged frequently, making the commit graph harder to read visually.',
            code: `# Standard merge workflow
git switch main
git pull origin main
git merge feature/dashboard

# Always create merge commit
git merge --no-ff feature/dashboard

# View merge history
git log --graph --oneline --all

# Revert an entire merged feature
git revert -m 1 <merge-commit-hash>

# Find all merge commits
git log --merges --oneline

# View what a merge introduced
git diff <merge-commit>^1 <merge-commit>`,
            tip: 'Use git log --graph --oneline to visualize the branching and merging history. Tools like gitk or GitLens provide graphical representations that make complex histories easier to understand.',
          },
          {
            heading: 'Rebase: Clean Linear History',
            content:
              'Rebasing creates a linear history by replaying commits on top of the target branch, as if the feature branch was started from the current tip of main. The resulting history reads like a straight line of sequential commits with no merge commits or branch indicators. This makes it significantly easier to use tools like git log, git bisect, and git blame because every commit follows logically from the previous one. Rebase is popular in open-source projects where maintainers want a clean, easy-to-follow history. The trade-off is that rebase rewrites commit history, changing commit hashes and obscuring when parallel development occurred. This makes it unsuitable for shared branches because other developers working on the same branch will have conflicting histories after a rebase. The golden rule is to never rebase commits that have been pushed to a shared remote branch, only rebase your local work before sharing it with others.',
            code: `# Rebase workflow
git switch feature/dashboard
git rebase main
git switch main
git merge feature/dashboard  # fast-forward

# Interactive rebase to clean up commits
git rebase -i main

# Pull with rebase instead of merge
git pull --rebase origin main

# Configure pull to always rebase
git config pull.rebase true

# View linear history after rebase
git log --oneline

# Rebase and autosquash fixup commits
git rebase -i --autosquash main`,
            warning: 'The golden rule of rebasing: never rebase commits that exist on a public branch. Only rebase your local, unpushed work.',
          },
          {
            heading: 'Choosing Between Merge and Rebase',
            content:
              'The merge vs rebase debate ultimately comes down to team preference and what you value in your commit history. Many successful teams use a hybrid approach: rebase locally to clean up feature branch commits, then merge into main with --no-ff to preserve the feature boundary. This gives you the best of both worlds: a clean feature history with clear integration points. Some teams adopt a strict rebase-only policy for feature branches, requiring developers to rebase onto main before creating a pull request. Others prefer merge-only workflows for their simplicity and safety. The key factors to consider are team size, developer experience with Git, deployment strategy, and debugging practices. Larger teams may benefit from merge commits that clearly show integration points, while smaller teams may prefer the simplicity of a linear rebase history. Whatever you choose, enforce it consistently across the team to avoid a confusing mix of styles.',
            code: `# Hybrid approach: rebase then merge --no-ff
git switch feature/api
git rebase main              # clean up history
git switch main
git merge --no-ff feature/api  # preserve feature boundary

# Rebase-based PR workflow
git switch feature/search
git fetch origin
git rebase origin/main       # update with latest main
git push --force-with-lease   # safe force push

# Merge-based workflow with squash
git switch main
git merge --squash feature/search
git commit -m "feat: add search"

# Team configuration for consistency
git config pull.rebase true
git config branch.autosetuprebase always

# Compare histories
# After merge:  A-B-C-M (with merge commit)
# After rebase: A-B-C-D-E (linear)`,
            analogy: 'Merge is like keeping a detailed journal with all cross-references intact. Rebase is like rewriting notes into a clean, sequential narrative. Both tell the story, but in different ways.',
          },
        ],
        challenge: {
          title: 'Merge vs Rebase Comparison',
          description: 'Experience the difference between merge and rebase by performing both on identical repositories.',
          steps: [
            'Create two identical repositories with the same branching structure',
            'In repo 1, merge the feature branch into main',
            'In repo 2, rebase the feature branch onto main then fast-forward merge',
            'Compare the git log --graph output of both repositories',
            'Try reverting the feature in each repo and note the differences',
          ],
          hints: [
            'Use git log --graph --oneline --all to visualize both histories',
            'In the merge repo, you can revert the merge commit with -m 1',
            'In the rebase repo, you need to revert individual commits or use reset',
          ],
        },
      },
      {
        id: 'git-worktree',
        title: 'git worktree',
        difficulty: 'advanced',
        tags: ['git', 'worktree', 'multiple', 'directories', 'parallel', 'development'],
        sections: [
          {
            heading: 'Introduction to Git Worktrees',
            content:
              'Git worktree allows you to check out multiple branches simultaneously in separate directories, all linked to the same repository. Instead of stashing or committing incomplete work to switch branches, you can create a new worktree that provides a completely independent working directory for another branch. All worktrees share the same Git history and object database, so changes committed in one worktree are immediately visible to the others via standard Git commands. This feature is particularly valuable when you need to review a pull request while working on a feature, fix a bug on a release branch without losing your place on a development branch, or run tests on one branch while continuing development on another. Worktrees are lightweight because they share the object database rather than cloning the entire repository, making them fast to create and efficient with disk space.',
            code: `# Create a new worktree for a branch
git worktree add ../project-hotfix hotfix/critical

# Create a worktree with a new branch
git worktree add -b feature/new ../project-feature main

# List all worktrees
git worktree list

# Remove a worktree
git worktree remove ../project-hotfix

# Prune stale worktree info
git worktree prune

# Move a worktree to a different location
git worktree move ../project-hotfix ../hotfix-dir

# Lock a worktree to prevent removal
git worktree lock ../project-feature`,
            tip: 'Place worktrees as siblings of your main directory rather than inside it. For example, if your project is at ~/code/myapp, create worktrees at ~/code/myapp-hotfix.',
          },
          {
            heading: 'Practical Worktree Workflows',
            content:
              'The most common worktree use case is context switching without disruption. Imagine you are deep into a complex feature when an urgent bug report comes in. Without worktrees, you would need to stash or commit your work-in-progress, switch branches, fix the bug, switch back, and restore your state. With worktrees, you simply create a new worktree for the hotfix branch, fix the bug in that directory, push the fix, and return to your feature directory where everything is exactly as you left it. Another powerful use case is running long-running tests or builds on one branch while continuing development on another. Since each worktree has its own working directory and index, operations in one do not affect the other. Worktrees are also excellent for code reviews: create a worktree for the branch under review so you can navigate and test the code without disturbing your current work.',
            code: `# Scenario: urgent hotfix while working on feature
# Currently working in ~/code/myapp on feature/dashboard

# Create worktree for hotfix
git worktree add ~/code/myapp-hotfix hotfix/urgent-fix

# Fix the bug in the new worktree
cd ~/code/myapp-hotfix
# ... make fixes ...
git add .
git commit -m "fix: resolve critical crash"
git push origin hotfix/urgent-fix

# Return to original work (untouched)
cd ~/code/myapp
# Continue working on feature/dashboard

# Clean up when done
git worktree remove ~/code/myapp-hotfix

# Review a PR in a separate worktree
git fetch origin
git worktree add ~/code/myapp-review origin/feature/api
cd ~/code/myapp-review
# ... review and test ...
git worktree remove ~/code/myapp-review`,
            note: 'Each worktree must have a unique branch checked out. You cannot check out the same branch in two worktrees simultaneously.',
          },
          {
            heading: 'Advanced Worktree Management',
            content:
              'As you adopt worktrees in your workflow, managing them efficiently becomes important. The git worktree list command shows all active worktrees with their paths and checked-out branches. If a worktree directory is manually deleted without using git worktree remove, run git worktree prune to clean up the stale references. Locked worktrees are protected from accidental removal, which is useful for long-running worktrees that should persist. When working with bare repositories, worktrees become especially powerful because the bare repo serves as a pure object store while all actual work happens in worktrees. This pattern is popular for managing multiple branches of infrastructure code or documentation where you need instant access to several versions simultaneously. Combining worktrees with tmux or terminal multiplexers lets you keep multiple branches visible and active, dramatically improving multitasking efficiency during complex release management scenarios.',
            code: `# Bare repo with worktree pattern
git clone --bare git@github.com:user/repo.git repo.git
cd repo.git

# Create worktrees for each needed branch
git worktree add ../repo-main main
git worktree add ../repo-develop develop
git worktree add ../repo-release release/2.0

# List all worktrees with details
git worktree list --porcelain

# Lock a worktree with a reason
git worktree lock --reason "Long-running release testing" ../repo-release

# Unlock when done
git worktree unlock ../repo-release

# Check worktree status
git -C ../repo-main status
git -C ../repo-develop status

# Remove all worktrees
git worktree list | tail -n +2 | awk '{print $1}' | xargs -I {} git worktree remove {}`,
            analogy: 'Git worktrees are like having multiple desks in your office, each with a different project spread out. You can walk between desks without having to clean up and reorganize each time you switch tasks.',
          },
        ],
        quiz: [
          {
            question: 'What do all git worktrees share?',
            options: ['Working directory', 'The same branch', 'The Git object database and history', 'Nothing, they are independent clones'],
            correctAnswer: 2,
            explanation: 'All worktrees linked to the same repository share the same object database and history. This makes them lightweight and ensures commits are visible across all worktrees.',
          },
          {
            question: 'Can you check out the same branch in two worktrees?',
            options: ['Yes, always', 'No, each worktree must have a unique branch', 'Only with --force flag', 'Only for the main branch'],
            correctAnswer: 1,
            explanation: 'Git requires each worktree to have a unique branch checked out to prevent conflicts from concurrent modifications to the same branch.',
          },
          {
            question: 'What command cleans up stale worktree references?',
            options: ['git worktree clean', 'git worktree prune', 'git worktree gc', 'git worktree refresh'],
            correctAnswer: 1,
            explanation: 'git worktree prune removes stale worktree metadata when the worktree directory has been manually deleted without using git worktree remove.',
          },
        ],
      },
    ],
  },
  {
    id: 'git-remote-ops',
    title: 'Remote Operations',
    icon: '🌐',
    entries: [
      {
        id: 'git-remote',
        title: 'git remote',
        difficulty: 'beginner',
        tags: ['git', 'remote', 'origin', 'upstream', 'url'],
        sections: [
          {
            heading: 'Managing Remote Repositories',
            content:
              'Git remotes are references to remote repositories that your local repository can communicate with. When you clone a repository, Git automatically creates a remote called origin that points to the source URL. You can add multiple remotes to work with different copies of the repository, which is common in fork-based workflows where you maintain a connection to both your fork (origin) and the original repository (upstream). The git remote command manages these connections by allowing you to add, rename, remove, and inspect remote repositories. Each remote has a name and a URL, and you can configure different URLs for fetching and pushing. Understanding remotes is essential for any collaborative Git workflow because they define how your local repository communicates with the rest of the world, enabling you to share code, receive updates, and collaborate effectively with other developers.',
            code: `# List all remotes
git remote

# List remotes with URLs
git remote -v

# Add a new remote
git remote add upstream https://github.com/original/repo.git

# Add a remote with a custom name
git remote add staging git@staging.example.com:repo.git

# Show detailed info about a remote
git remote show origin

# Rename a remote
git remote rename origin old-origin

# Remove a remote
git remote remove staging

# Change a remote URL
git remote set-url origin git@github.com:user/repo.git`,
            tip: 'Use git remote -v regularly to verify your remote configuration, especially after setting up fork workflows where both origin and upstream must be correctly configured.',
          },
          {
            heading: 'Multiple Remotes and Fork Workflow',
            content:
              'Working with multiple remotes is a cornerstone of the fork-based contribution model used in open source. In this workflow, you fork a repository on GitHub, clone your fork locally (origin), and add the original repository as a second remote called upstream. This allows you to push changes to your fork while keeping it synchronized with the original project. When you want to contribute, you fetch the latest changes from upstream, create a feature branch, make your changes, push to origin, and then create a pull request from your fork to the upstream repository. Managing multiple remotes also enables advanced workflows like deploying to different environments by pushing to different remotes, or maintaining private forks of open-source projects. Understanding the relationship between fetch and push URLs is important because some workflows require reading from one URL and writing to another.',
            code: `# Fork workflow setup
git clone https://github.com/your-user/forked-repo.git
cd forked-repo
git remote add upstream https://github.com/original/repo.git

# Verify both remotes
git remote -v
# origin    https://github.com/your-user/forked-repo.git (fetch)
# origin    https://github.com/your-user/forked-repo.git (push)
# upstream  https://github.com/original/repo.git (fetch)
# upstream  https://github.com/original/repo.git (push)

# Sync fork with upstream
git fetch upstream
git switch main
git merge upstream/main
git push origin main

# Set different push URL (e.g., SSH for push)
git remote set-url --push origin git@github.com:user/repo.git

# Prune deleted remote branches
git remote prune origin`,
            note: 'Convention dictates using "origin" for your fork and "upstream" for the original repository, but these are just names. Choose whatever makes sense for your team.',
          },
          {
            heading: 'Remote Inspection and Troubleshooting',
            content:
              'Understanding the state of your remotes is crucial for debugging connectivity and synchronization issues. The git remote show command provides detailed information about a remote, including the fetch and push URLs, the remote branches being tracked, and which local branches are configured to push to which remote branches. This information is invaluable when diagnosing issues like pushes going to the wrong branch or fetches not retrieving expected updates. Network issues can prevent communication with remotes; you can test connectivity with git ls-remote to list remote references without downloading any data. If a remote URL changes, perhaps due to a repository transfer or server migration, use git remote set-url to update the configuration. Regularly auditing your remote configuration helps prevent mistakes and ensures your workflow remains smooth, especially in complex setups with multiple remotes or when transitioning between SSH and HTTPS authentication methods.',
            code: `# Detailed remote information
git remote show origin

# List remote references (test connectivity)
git ls-remote origin

# List only remote heads
git ls-remote --heads origin

# List only remote tags
git ls-remote --tags origin

# Get the URL of a remote
git remote get-url origin

# Get push URL specifically
git remote get-url --push origin

# Update remote references
git remote update

# Update a specific remote only
git remote update upstream

# Verbose output for debugging
GIT_TRACE=1 git fetch origin`,
            warning: 'If git remote show origin hangs, it may indicate network or authentication issues. Use git remote get-url origin first to verify the URL is correct.',
          },
        ],
        quiz: [
          {
            question: 'What is the default name for the remote created by git clone?',
            options: ['upstream', 'main', 'origin', 'remote'],
            correctAnswer: 2,
            explanation: 'Git automatically names the remote "origin" when you clone a repository. This is a convention, not a requirement.',
          },
          {
            question: 'How do you add a second remote for the original repository in a fork workflow?',
            options: ['git remote add origin URL', 'git remote add upstream URL', 'git clone URL upstream', 'git fork add URL'],
            correctAnswer: 1,
            explanation: 'git remote add upstream URL adds a new remote named "upstream" pointing to the original repository URL.',
          },
          {
            question: 'What does git ls-remote do?',
            options: ['Lists local branches', 'Lists remote references without downloading data', 'Removes remote branches', 'Syncs local and remote'],
            correctAnswer: 1,
            explanation: 'git ls-remote queries a remote repository and lists its references (branches, tags) without downloading any objects, useful for testing connectivity.',
          },
        ],
      },
      {
        id: 'git-fetch',
        title: 'git fetch',
        difficulty: 'beginner',
        tags: ['git', 'fetch', 'remote', 'download', 'update'],
        sections: [
          {
            heading: 'Understanding git fetch',
            content:
              'Git fetch downloads commits, files, and references from a remote repository into your local repository without modifying your working directory or current branch. This makes fetch a safe operation that you can run at any time without risk of disrupting your work. When you fetch, Git updates your remote-tracking branches (like origin/main) to reflect the current state of the remote repository. These remote-tracking branches act as bookmarks showing where each branch was on the remote the last time you communicated with it. Fetch is the first step in understanding what changes exist on the remote before deciding how to integrate them. By separating the download step from the integration step, fetch gives you complete control over when and how remote changes are incorporated into your local branches. This is especially important in complex projects where you want to review incoming changes before merging them.',
            code: `# Fetch all branches from origin
git fetch origin

# Fetch from all remotes
git fetch --all

# Fetch a specific branch
git fetch origin main

# Fetch and prune deleted remote branches
git fetch --prune

# Fetch with tags
git fetch --tags

# Fetch without tags
git fetch --no-tags

# Fetch and show what changed
git fetch --verbose

# Short form (fetches from default remote)
git fetch`,
            tip: 'Run git fetch --prune regularly to clean up local references to remote branches that have been deleted. You can make this automatic with git config fetch.prune true.',
          },
          {
            heading: 'Inspecting Fetched Changes',
            content:
              'After fetching, you have updated remote-tracking branches that show the state of the remote repository. The next step is to inspect what changed before integrating it into your local branches. You can use git log to see new commits, git diff to see code changes, and git branch -r to see the state of remote branches. Comparing your local branch with its remote-tracking counterpart shows you exactly what has happened on the remote since your last integration. This review step is what makes fetch plus merge preferred over pull in many workflows, because it gives you a chance to understand changes, run tests, or adjust your integration strategy before committing to it. If the remote changes conflict with your local work, you can plan your resolution strategy in advance rather than being surprised by conflicts during a pull operation. This deliberate approach reduces mistakes and gives you confidence in every integration.',
            code: `# See what was fetched (new commits on remote main)
git log main..origin/main --oneline

# See the diff between local and remote
git diff main origin/main

# See a summary of changes
git diff --stat main origin/main

# See all remote-tracking branches
git branch -r

# See if local branch is behind remote
git status  # shows "Your branch is behind 'origin/main' by N commits"

# Compare any local branch with remote counterpart
git log --left-right --oneline main...origin/main

# Fetch and view changes in one workflow
git fetch origin
git log --graph --oneline main origin/main

# Show commits that exist on remote but not locally
git log HEAD..origin/main --oneline`,
            note: 'The double-dot notation (main..origin/main) shows commits reachable from origin/main but not from main. The triple-dot (...) shows commits reachable from either but not both.',
          },
          {
            heading: 'Fetch vs Pull and Best Practices',
            content:
              'The relationship between fetch and pull is straightforward: git pull is essentially git fetch followed by git merge. While pull is convenient for quick updates, fetch provides more control and safety. Many experienced developers prefer the fetch-then-merge workflow because it separates downloading from integrating, giving you a chance to review changes and choose an integration strategy. You might decide to merge, rebase, or cherry-pick based on what you see after fetching. Running fetch frequently keeps your remote-tracking branches current without affecting your work. Some developers set up automatic fetching in their IDE or terminal to always have up-to-date remote tracking information. In CI/CD pipelines, fetch is preferred because it provides precise control over which changes are incorporated into the build. Additionally, fetch --depth can limit the download to recent history, which is useful for large repositories in automated environments where full history is unnecessary.',
            code: `# Fetch then merge (equivalent to pull)
git fetch origin
git merge origin/main

# Fetch then rebase (equivalent to pull --rebase)
git fetch origin
git rebase origin/main

# Shallow fetch (only recent history)
git fetch --depth=1 origin main

# Deepen a shallow fetch
git fetch --deepen=10

# Fetch a specific commit (if server allows)
git fetch origin abc1234

# Refspec: fetch specific branch to specific local ref
git fetch origin main:refs/remotes/origin/main

# Auto-fetch configuration
git config fetch.prune true
git config fetch.pruneTags true

# Fetch in background (useful in scripts)
git fetch --quiet origin`,
            analogy: 'git fetch is like checking your mailbox without opening the letters. You know what arrived, but you have not committed to reading or acting on anything yet.',
          },
        ],
        challenge: {
          title: 'Fetch and Inspect Workflow',
          description: 'Practice the fetch-inspect-merge workflow instead of using git pull.',
          steps: [
            'Clone a repository and create a second clone to simulate a collaborator',
            'Make changes and push from the second clone',
            'In the first clone, use git fetch to download without integrating',
            'Inspect the changes with git log and git diff',
            'Merge the changes after review',
          ],
          hints: [
            'Use git log main..origin/main to see incoming commits',
            'Use git diff --stat main origin/main for a summary',
            'Merge only after you understand the incoming changes',
          ],
        },
      },
      {
        id: 'git-pull',
        title: 'git pull',
        difficulty: 'beginner',
        tags: ['git', 'pull', 'fetch', 'merge', 'rebase', 'update'],
        sections: [
          {
            heading: 'Understanding git pull',
            content:
              'Git pull is a convenience command that combines two operations: git fetch to download remote changes, followed by git merge to integrate them into your current branch. This makes it the simplest way to update your local branch with remote changes. When you run git pull, Git fetches the latest commits from the remote-tracking branch associated with your current branch and then merges those changes. If the merge is a fast-forward (no local commits since your last pull), the operation is seamless. If both the local and remote branches have new commits, a merge commit is created. While pull is convenient for straightforward updates, understanding its two-step nature helps you troubleshoot issues and choose appropriate options. Many developers configure pull to use rebase instead of merge to maintain a linear history, which avoids creating merge commits for routine synchronization. The behavior of git pull can be customized extensively through configuration options.',
            code: `# Pull from the tracked remote branch
git pull

# Pull from a specific remote and branch
git pull origin main

# Pull with rebase instead of merge
git pull --rebase

# Pull with rebase preserving merges
git pull --rebase=merges

# Pull and allow unrelated histories
git pull --allow-unrelated-histories

# Pull with fast-forward only (fails if not possible)
git pull --ff-only

# Pull and autostash (stash and pop automatically)
git pull --autostash

# Configure default pull behavior
git config pull.rebase true
git config pull.ff only`,
            tip: 'Configure git config pull.rebase true to always rebase on pull, keeping your history linear. Add --autostash to handle uncommitted changes automatically.',
          },
          {
            heading: 'Pull Strategies and Conflicts',
            content:
              'Git provides several pull strategies to handle different scenarios. The default strategy creates a merge commit when histories have diverged. Using --rebase replays your local commits on top of the fetched changes, creating a linear history. The --ff-only strategy only succeeds if a fast-forward is possible, aborting if histories have diverged, which is useful in automated scripts where you want to fail explicitly rather than create unexpected merge commits. When pull encounters conflicts, the behavior depends on whether you are merging or rebasing. With merge, you get a standard merge conflict to resolve in one step. With rebase, you may need to resolve conflicts for each commit being replayed, which can be more work but produces a cleaner history. The --autostash option automatically stashes uncommitted changes before the pull and reapplies them afterward, which is convenient when you have work in progress but need to update your branch quickly.',
            code: `# Pull with merge (default)
git pull origin main
# If conflicts: resolve, git add, git commit

# Pull with rebase
git pull --rebase origin main
# If conflicts: resolve, git add, git rebase --continue

# Fast-forward only (safe for scripts)
git pull --ff-only origin main

# Auto-stash workflow
git pull --rebase --autostash

# Handle diverged branches
git pull --no-rebase  # explicitly merge
# or
git pull --rebase     # explicitly rebase

# Set per-branch pull strategy
git config branch.main.rebase true
git config branch.develop.rebase false

# Global pull configuration
git config --global pull.rebase true
git config --global pull.ff only`,
            warning: 'Using git pull without configuring a strategy in Git 2.27+ produces a warning. Set pull.rebase or pull.ff to make your preference explicit.',
          },
          {
            heading: 'Pull Best Practices',
            content:
              'Establishing good pull habits prevents common issues like unnecessary merge commits, unexpected conflicts, and lost work. Always commit or stash your changes before pulling to avoid complications with dirty working directories. Many teams standardize on a pull strategy to maintain consistent history across all developers. Using --rebase for regular pulls keeps the history clean, while reserving merge-based pulls for intentional integration of major branches. In automated environments like CI/CD pipelines, use --ff-only to ensure builds only proceed with clean fast-forward updates. If a fast-forward is not possible, the script can alert the developer to rebase their branch. Consider setting up a pre-pull hook or alias that shows the incoming changes before integrating them, combining the safety of the fetch-inspect-merge workflow with the convenience of pull. Regularly pulling from the upstream branch reduces the scope of conflicts and keeps your branch close to the mainline development.',
            code: `# Recommended pull alias
git config --global alias.up 'pull --rebase --autostash'

# Use the alias
git up

# Pull with verbose output
git pull --verbose

# Pull specific branch into current branch
git pull origin feature/api

# Pull and update submodules
git pull --recurse-submodules

# Safe pull workflow
git stash
git pull --rebase
git stash pop

# Check before pulling
git fetch origin
git log --oneline HEAD..origin/main
# If looks good:
git pull --rebase`,
            note: 'The alias git up (pull --rebase --autostash) is a popular convention that combines rebasing with automatic stash management for a smooth update experience.',
          },
        ],
        quiz: [
          {
            question: 'What two operations does git pull combine?',
            options: ['add and commit', 'fetch and merge', 'push and pull', 'clone and checkout'],
            correctAnswer: 1,
            explanation: 'git pull is equivalent to git fetch followed by git merge (or git rebase if configured).',
          },
          {
            question: 'What does git pull --ff-only do when fast-forward is not possible?',
            options: ['Creates a merge commit', 'Forces a fast-forward', 'Aborts with an error', 'Rebases automatically'],
            correctAnswer: 2,
            explanation: '--ff-only refuses to pull if a fast-forward merge is not possible, aborting with an error instead of creating a merge commit.',
          },
          {
            question: 'What does --autostash do during a pull?',
            options: ['Deletes uncommitted changes', 'Stashes changes before pull and reapplies after', 'Creates an automatic commit', 'Ignores local changes'],
            correctAnswer: 1,
            explanation: '--autostash automatically runs git stash before the pull and git stash pop after, handling uncommitted changes transparently.',
          },
        ],
      },
      {
        id: 'git-push',
        title: 'git push',
        difficulty: 'beginner',
        tags: ['git', 'push', 'remote', 'upload', 'publish'],
        sections: [
          {
            heading: 'Basic Pushing',
            content:
              'Git push uploads your local commits to a remote repository, making your work available to others. When you push, Git transfers commits from your local branch to the corresponding remote branch, updating the remote reference to point to the latest commit. If the remote branch has new commits that your local branch does not have, Git will reject the push to prevent overwriting others work. In this case, you need to pull and integrate the remote changes first, then push again. The first time you push a new local branch, use the -u flag to set up tracking, which creates a relationship between your local branch and the remote branch. After tracking is set up, subsequent pushes only require git push without additional arguments. Understanding push is essential because it is the primary mechanism for sharing your work with teammates and triggering CI/CD pipelines that may run tests and deployments.',
            code: `# Push to tracked remote branch
git push

# Push to a specific remote and branch
git push origin main

# Push and set upstream tracking
git push -u origin feature/login

# Push all branches
git push --all

# Push tags
git push --tags

# Push a specific tag
git push origin v2.0.0

# Delete a remote branch
git push origin --delete feature/old

# Dry run (show what would be pushed)
git push --dry-run

# Push with verbose output
git push --verbose`,
            tip: 'Always use -u (--set-upstream) on the first push of a new branch. This configures tracking so future push and pull commands work without specifying the remote and branch name.',
          },
          {
            heading: 'Force Pushing Safely',
            content:
              'Force pushing overwrites the remote branch with your local version, regardless of what the remote currently contains. This is necessary after rebasing or amending commits that have already been pushed, because the rewritten commits have different hashes. However, force pushing is dangerous because it can overwrite teammates commits. The --force-with-lease flag provides a safer alternative: it only succeeds if the remote branch is at the commit you expect, failing if someone else has pushed new commits since your last fetch. This prevents accidentally overwriting work you have not seen. Always prefer --force-with-lease over --force in collaborative environments. Some teams protect important branches like main with server-side rules that reject all force pushes, ensuring that the mainline history is never accidentally rewritten. Understanding when force pushing is appropriate and using the safe variant is a critical skill for maintaining trust and code integrity in team environments.',
            code: `# Force push (dangerous - overwrites remote)
git push --force origin feature/rebased

# Safe force push (only if remote is where you expect)
git push --force-with-lease origin feature/rebased

# Force push with lease and specify expected remote ref
git push --force-with-lease=feature/rebased:abc1234

# After interactive rebase, force push your feature branch
git rebase -i main
git push --force-with-lease origin feature/clean

# After amending a commit
git commit --amend -m "Better message"
git push --force-with-lease

# Configure alias for safe force push
git config --global alias.pushf 'push --force-with-lease'`,
            warning: 'Never force push to shared branches like main or develop. Even --force-with-lease can overwrite work if you have fetched recently. Communicate with your team before force pushing.',
          },
          {
            heading: 'Advanced Push Configuration',
            content:
              'Git push behavior can be extensively configured to match your workflow. The push.default setting controls what happens when you run git push without arguments. The simple setting (default since Git 2.0) pushes the current branch to its upstream tracking branch, which is the safest option. The matching setting pushes all branches with matching remote names, which can be surprising. Refspecs provide fine-grained control over what is pushed and where, using the format local-ref:remote-ref. Push hooks on the server side can enforce policies like requiring passing CI checks or code review before accepting pushes. The --no-verify flag skips local pre-push hooks, useful when you know the hooks are not relevant. Mirror pushing replicates your entire local repository to the remote, including all branches and tags, which is useful for maintaining backup mirrors or migrating between hosting services.',
            code: `# Configure default push behavior
git config push.default simple     # only current branch (safe)
git config push.default current    # push to same-named remote branch

# Push using refspec
git push origin local-branch:remote-branch

# Push local branch to differently named remote branch
git push origin feature/local:feature/remote

# Mirror push (replicate everything)
git push --mirror backup-remote

# Push and create pull request (GitHub CLI)
git push -u origin feature/new && gh pr create

# Atomic push (all refs succeed or none do)
git push --atomic origin main v2.0.0

# Skip pre-push hooks
git push --no-verify

# Configure push to auto-setup remote tracking
git config --global push.autoSetupRemote true`,
            note: 'Git 2.37+ added push.autoSetupRemote which automatically creates the upstream tracking relationship on first push, eliminating the need for -u.',
          },
        ],
        challenge: {
          title: 'Push Workflow Practice',
          description: 'Practice different push scenarios including force push safety.',
          steps: [
            'Create a local repository and add a remote',
            'Push a feature branch with -u flag',
            'Amend a pushed commit and try pushing (observe the rejection)',
            'Use --force-with-lease to safely update the remote',
            'Try --dry-run to preview what would be pushed',
          ],
          hints: [
            'Use git push --dry-run to see what would happen without actually pushing',
            'After amending, git status shows your branch has diverged',
            '--force-with-lease is the safe alternative to --force',
          ],
        },
      },
      {
        id: 'git-remote-tracking',
        title: 'Remote Tracking Branches',
        difficulty: 'intermediate',
        tags: ['git', 'remote-tracking', 'upstream', 'branch', 'origin'],
        sections: [
          {
            heading: 'Understanding Remote-Tracking Branches',
            content:
              'Remote-tracking branches are local references that represent the state of branches on remote repositories. They follow the naming convention remote/branch, such as origin/main or upstream/develop. These branches are read-only from your perspective; you cannot commit directly to them. They are updated automatically when you run git fetch or git pull, acting as snapshots of where remote branches were the last time you communicated with the remote. Remote-tracking branches serve as the crucial link between your local work and the remote repository, enabling Git to tell you how far ahead or behind your local branches are relative to the remote. Understanding these branches eliminates the mystery of how Git tracks distributed changes and gives you confidence when integrating remote work. They also provide a safe reference point: you can always diff against or merge from a remote-tracking branch without affecting anything.',
            code: `# List remote-tracking branches
git branch -r

# List all branches (local + remote-tracking)
git branch -a

# See tracking relationships
git branch -vv

# View the log of a remote-tracking branch
git log origin/main --oneline

# Diff local vs remote-tracking branch
git diff main origin/main

# View where remote-tracking branches point
git for-each-ref refs/remotes/

# Create a local branch from remote-tracking
git switch -c feature/api origin/feature/api

# Update remote-tracking branches
git fetch --all`,
            tip: 'Run git branch -vv to see all local branches with their tracking information and how many commits ahead or behind they are from their upstream.',
          },
          {
            heading: 'Setting Up Tracking Relationships',
            content:
              'A tracking relationship links a local branch to a remote-tracking branch, called its upstream. When this relationship exists, Git can show you how many commits ahead or behind you are, and commands like git push and git pull work without specifying remote and branch names. Tracking is set up automatically when you clone a repository (main tracks origin/main) or when you create a branch from a remote-tracking branch. You can also manually set tracking with git branch --set-upstream-to. If you want to change which remote branch your local branch tracks, or if the tracking information was lost, you can re-establish it at any time. The tracking relationship is stored in your Git configuration and persists across sessions. Understanding tracking relationships is essential for making push and pull commands work smoothly and for getting accurate ahead/behind information that helps you stay synchronized with your team.',
            code: `# Set upstream for current branch
git branch --set-upstream-to=origin/main

# Set upstream for a specific branch
git branch --set-upstream-to=origin/develop develop

# Push and set upstream simultaneously
git push -u origin feature/search

# Remove tracking relationship
git branch --unset-upstream

# Create branch tracking a remote branch
git switch -c local-name --track origin/remote-name

# View tracking configuration
git config --get-regexp branch

# Check ahead/behind status
git status
# "Your branch is ahead of 'origin/main' by 3 commits"

# Show ahead/behind counts for all branches
git for-each-ref --format='%(refname:short) %(upstream:track)' refs/heads`,
            note: 'When you see "Your branch is ahead by N commits" in git status, it is comparing your local branch to its remote-tracking branch, which may be outdated. Run git fetch first for accurate information.',
          },
          {
            heading: 'Pruning and Maintenance',
            content:
              'Over time, remote branches get deleted as features are merged and completed. However, your local remote-tracking references persist until explicitly removed. This leads to stale remote-tracking branches that no longer correspond to actual branches on the remote. The git fetch --prune command removes these stale references, keeping your local view of the remote accurate. You can make pruning automatic by configuring fetch.prune to true, so every fetch also cleans up. Similarly, git remote prune origin removes stale references for a specific remote. Identifying stale branches helps with repository hygiene and prevents confusion about which branches still exist on the remote. The git branch -r command combined with git remote prune shows the difference between current and stale remote branches. Regular maintenance of remote-tracking branches is particularly important in active repositories with many contributors where branches are created and deleted frequently.',
            code: `# Prune stale remote-tracking branches during fetch
git fetch --prune

# Prune for a specific remote
git remote prune origin

# See what would be pruned (dry run)
git remote prune --dry-run origin

# Make prune automatic on every fetch
git config fetch.prune true
git config --global fetch.prune true

# Also prune tags
git config fetch.pruneTags true

# List stale remote-tracking branches
git branch -r --list 'origin/*'

# Delete a specific remote-tracking branch
git branch -rd origin/old-feature

# Show which remote branches are gone
git branch -vv | grep ': gone]'

# Delete local branches whose remote is gone
git branch -vv | grep ': gone]' | awk '{print $1}' | xargs git branch -d`,
            analogy: 'Remote-tracking branches are like a directory listing that was printed out. It shows what was there when you printed it, but the actual directory may have changed since then. Fetching is like reprinting the directory, and pruning is like removing entries for files that no longer exist.',
          },
        ],
        quiz: [
          {
            question: 'What does origin/main represent?',
            options: ['Your local main branch', 'The remote-tracking branch for main on origin', 'A branch you created called origin/main', 'The main branch on GitHub'],
            correctAnswer: 1,
            explanation: 'origin/main is a remote-tracking branch that represents the last known state of the main branch on the origin remote.',
          },
          {
            question: 'How is the tracking relationship for git push/pull established?',
            options: ['Automatically for all branches', 'By running git branch --set-upstream-to or pushing with -u', 'It cannot be configured', 'Only during git clone'],
            correctAnswer: 1,
            explanation: 'Tracking is set with git branch --set-upstream-to, git push -u, or automatically when creating a branch from a remote-tracking branch.',
          },
          {
            question: 'What does git fetch --prune do?',
            options: ['Deletes local branches', 'Removes stale remote-tracking branches', 'Prunes commit history', 'Cleans the working directory'],
            correctAnswer: 1,
            explanation: 'git fetch --prune removes local remote-tracking references that correspond to branches that no longer exist on the remote.',
          },
        ],
      },
      {
        id: 'git-fork-workflow',
        title: 'Fork & Pull Request Workflow',
        difficulty: 'intermediate',
        tags: ['git', 'fork', 'pull-request', 'open-source', 'collaboration', 'github'],
        sections: [
          {
            heading: 'Forking and Setting Up',
            content:
              'The fork and pull request workflow is the standard collaboration model for open-source projects and many enterprise teams. It starts by forking the original repository on the hosting platform, which creates your own copy under your account. You then clone your fork locally, which becomes the origin remote. You add the original repository as a second remote called upstream to stay synchronized with the project. This setup allows you to work freely on your fork without needing write access to the original repository. When your changes are ready, you push them to your fork and create a pull request asking the maintainers to incorporate your changes. This model provides a natural code review process because all changes must go through a pull request before reaching the main repository. It scales well to any number of contributors because each person works on their own fork independently while the main repository remains controlled by its maintainers.',
            code: `# 1. Fork the repo on GitHub (via web UI or CLI)
gh repo fork original-owner/repo --clone

# 2. Or manually clone your fork
git clone https://github.com/your-user/repo.git
cd repo

# 3. Add upstream remote
git remote add upstream https://github.com/original-owner/repo.git

# 4. Verify remotes
git remote -v

# 5. Fetch upstream branches
git fetch upstream

# 6. Keep main synced with upstream
git switch main
git merge upstream/main
git push origin main

# 7. Create a feature branch
git switch -c feature/improve-search

# 8. Make changes and push to your fork
git add .
git commit -m "feat: improve search algorithm"
git push -u origin feature/improve-search`,
            tip: 'The GitHub CLI (gh) can fork and clone in a single command with gh repo fork --clone, automatically setting up both origin and upstream remotes.',
          },
          {
            heading: 'Creating and Managing Pull Requests',
            content:
              'A pull request is a formal proposal to merge changes from your fork into the original repository. When creating a PR, write a clear title summarizing the change and a detailed description explaining what, why, and how. Reference any related issues using keywords like "Fixes #123" to automatically link and close issues when the PR is merged. Reviewers will examine your changes, leave comments, and may request modifications. You can update your PR by pushing additional commits to the same branch on your fork; the PR automatically updates. Some projects require that you keep your PR up to date with the base branch by rebasing or merging. If the maintainers use squash merging, your individual commits will be condensed into one, so focus on making the overall change correct rather than having a perfect commit history. Engaging constructively with reviewers and addressing feedback promptly increases the likelihood of your contribution being accepted.',
            code: `# Create a pull request using GitHub CLI
gh pr create \\
  --title "feat: improve search algorithm" \\
  --body "Fixes #42. Improved search performance by 3x using inverted index."

# Create PR with specific base branch
gh pr create --base develop

# View PR status
gh pr status

# View a specific PR
gh pr view 123

# Check PR CI status
gh pr checks 123

# Update PR after review feedback
git add .
git commit -m "address review: add input validation"
git push origin feature/improve-search

# Rebase PR on latest upstream main
git fetch upstream
git rebase upstream/main
git push --force-with-lease origin feature/improve-search

# Request reviewers
gh pr edit 123 --add-reviewer username1,username2`,
            warning: 'When rebasing a PR branch, use --force-with-lease to push. Coordinate with reviewers first, as force pushing invalidates their review context.',
          },
          {
            heading: 'Keeping Forks Synchronized',
            content:
              'Maintaining synchronization between your fork and the upstream repository is essential for productive contributions. If your fork falls behind, your pull requests will have more conflicts and your local development may be based on outdated code. Establish a routine of regularly fetching from upstream and updating your main branch. Before starting any new work, always sync main with upstream first, then create your feature branch from the updated main. This minimizes divergence and makes conflict resolution simpler when your PR is reviewed. For long-running feature branches, periodically rebase onto the latest upstream main to stay current. GitHub also provides a "Sync fork" button on the web interface that can update your fork main branch. After syncing, push to your origin to keep your remote fork current as well. This discipline of regular synchronization is what separates smooth contribution experiences from frustrating ones filled with avoidable conflicts.',
            code: `# Sync workflow (do this regularly)
git fetch upstream
git switch main
git merge upstream/main
git push origin main

# Sync and update a feature branch
git fetch upstream
git switch feature/my-work
git rebase upstream/main
git push --force-with-lease origin feature/my-work

# Sync using GitHub CLI
gh repo sync your-user/repo

# Sync via GitHub web (also available)
# Click "Sync fork" button on your fork page

# Script to sync all local branches
git fetch upstream
for branch in $(git branch --format='%(refname:short)'); do
  git switch "$branch"
  git merge upstream/main || git merge --abort
done
git switch main

# Clean up merged PR branches
gh pr list --state merged --author @me | \\
  awk '{print $NF}' | xargs -I {} git push origin --delete {}`,
            note: 'If your fork is severely out of date, consider deleting it and re-forking rather than attempting a complex merge of diverged histories.',
          },
        ],
        diagram: {
          kind: 'mermaid' as const,
          code: `sequenceDiagram
    participant U as Upstream Repo
    participant F as Your Fork (origin)
    participant L as Local Clone
    U->>F: 1. Fork on GitHub
    F->>L: 2. git clone
    L->>L: 3. git remote add upstream
    U->>L: 4. git fetch upstream
    L->>L: 5. Create feature branch
    L->>L: 6. Make commits
    L->>F: 7. git push origin
    F->>U: 8. Create Pull Request
    U->>U: 9. Review & Merge`,
          caption: 'The fork and pull request workflow: fork the upstream, clone locally, develop on branches, push to your fork, and submit a pull request to upstream.',
        },
        challenge: {
          title: 'Complete Fork Workflow',
          description: 'Practice the full fork and pull request workflow from start to finish.',
          steps: [
            'Fork a practice repository on GitHub using gh repo fork',
            'Clone your fork and add the upstream remote',
            'Create a feature branch and make changes',
            'Push your branch and create a pull request with gh pr create',
            'Simulate reviewer feedback by making additional commits',
            'Sync your fork with upstream and rebase your PR branch',
          ],
          hints: [
            'Use gh repo fork --clone for the quickest setup',
            'Always work on feature branches, never directly on main',
            'Rebase onto upstream/main before pushing updates to keep the PR clean',
          ],
        },
      },
      {
        id: 'git-ssh-https',
        title: 'SSH vs HTTPS',
        difficulty: 'beginner',
        tags: ['git', 'ssh', 'https', 'authentication', 'security'],
        sections: [
          {
            heading: 'HTTPS Authentication',
            content:
              'HTTPS is the default protocol for cloning Git repositories and works through standard web ports, making it accessible even behind restrictive firewalls. When you clone via HTTPS, Git prompts for your username and password for each push and pull operation. Since most hosting platforms have deprecated password authentication, you typically use a personal access token instead of your password. To avoid entering credentials repeatedly, Git provides credential helpers that cache your credentials securely. On macOS, the osxkeychain helper stores credentials in the system keychain. On Windows, the manager-core helper uses the Windows Credential Manager. On Linux, you can use the store helper to save credentials in a file or the cache helper for temporary in-memory storage. HTTPS is the recommended starting point for beginners because it requires no additional setup beyond generating a token, and it works in all network environments without firewall configuration.',
            code: `# Clone via HTTPS
git clone https://github.com/user/repo.git

# Set HTTPS remote
git remote set-url origin https://github.com/user/repo.git

# Configure credential caching (macOS)
git config --global credential.helper osxkeychain

# Configure credential caching (Linux - temporary)
git config --global credential.helper 'cache --timeout=3600'

# Configure credential caching (Linux - permanent file)
git config --global credential.helper store

# Configure credential caching (Windows)
git config --global credential.helper manager-core

# Generate a personal access token on GitHub
# Settings > Developer settings > Personal access tokens

# Use token as password when prompted
# Username: your-github-username
# Password: ghp_your_personal_access_token

# Store credentials in .netrc (alternative)
# echo "machine github.com login user password token" >> ~/.netrc`,
            tip: 'When using personal access tokens, generate them with the minimum required scopes. For standard Git operations, the "repo" scope is sufficient.',
          },
          {
            heading: 'SSH Authentication',
            content:
              'SSH authentication uses a cryptographic key pair instead of passwords or tokens. You generate a key pair (private and public), add the public key to your hosting platform, and Git uses the private key to authenticate automatically on every push and pull. SSH is preferred by many developers because it eliminates credential prompts entirely and provides strong security through public-key cryptography. The setup involves generating an SSH key, adding it to your SSH agent for key management, and registering the public key with your Git hosting service. Once configured, SSH authentication is seamless and works across all repositories on the platform without any additional credential management. SSH keys can also be protected with a passphrase that is unlocked once per session through the SSH agent, providing an additional layer of security. For organizations, SSH keys can be managed and audited, providing better security governance than shared tokens.',
            code: `# Generate an SSH key pair
ssh-keygen -t ed25519 -C "your_email@example.com"

# Start the SSH agent
eval "$(ssh-agent -s)"

# Add your private key to the agent
ssh-add ~/.ssh/id_ed25519

# On macOS, add to keychain
ssh-add --apple-use-keychain ~/.ssh/id_ed25519

# Copy public key to clipboard (macOS)
pbcopy < ~/.ssh/id_ed25519.pub

# Copy public key to clipboard (Linux)
xclip -sel clipboard < ~/.ssh/id_ed25519.pub

# Add the public key to GitHub
# Settings > SSH and GPG keys > New SSH key

# Test SSH connection
ssh -T git@github.com

# Clone via SSH
git clone git@github.com:user/repo.git

# Switch remote from HTTPS to SSH
git remote set-url origin git@github.com:user/repo.git`,
            note: 'The ed25519 key type is recommended over RSA for new keys. It provides better security with shorter keys and faster operations.',
          },
          {
            heading: 'Choosing Between SSH and HTTPS',
            content:
              'The choice between SSH and HTTPS depends on your environment and workflow needs. HTTPS works everywhere, passes through firewalls without issues, and requires no special setup beyond credential caching. It is ideal for beginners, temporary environments, CI/CD systems, and situations where SSH ports may be blocked. SSH provides a smoother developer experience after initial setup, with automatic authentication and no credential management. It is preferred for daily development work and by developers who work with multiple repositories frequently. Some developers use both: SSH for their primary machines and HTTPS for temporary or shared environments. GitHub and other platforms support both protocols for all operations, so you can switch between them at any time by changing the remote URL. For organizations, HTTPS with fine-grained personal access tokens provides more granular permission control, while SSH keys offer simpler management for individual developers who need full repository access.',
            code: `# Check current protocol
git remote -v

# Switch from HTTPS to SSH
git remote set-url origin git@github.com:user/repo.git

# Switch from SSH to HTTPS
git remote set-url origin https://github.com/user/repo.git

# Configure SSH for multiple GitHub accounts
# ~/.ssh/config
# Host github-personal
#   HostName github.com
#   User git
#   IdentityFile ~/.ssh/id_ed25519_personal
#
# Host github-work
#   HostName github.com
#   User git
#   IdentityFile ~/.ssh/id_ed25519_work

# Clone using custom SSH host
git clone git@github-work:company/repo.git

# Use SSH over HTTPS port (bypass firewall)
# ~/.ssh/config
# Host github.com
#   HostName ssh.github.com
#   Port 443
#   User git

# Test which protocol you're using
git remote -v | head -1`,
            analogy: 'HTTPS is like showing your ID badge at the door each time you enter. SSH is like having a biometric scanner that recognizes you automatically. Both get you in, but one requires less effort once set up.',
          },
        ],
      },
      {
        id: 'git-submodules',
        title: 'Git Submodules',
        difficulty: 'advanced',
        tags: ['git', 'submodules', 'dependencies', 'nested', 'repositories'],
        sections: [
          {
            heading: 'Introduction to Submodules',
            content:
              'Git submodules allow you to include one Git repository inside another as a subdirectory while maintaining their separate histories. This is useful for incorporating shared libraries, frameworks, or components that have their own release cycles and repositories. When you add a submodule, Git records the specific commit of the external repository that your project depends on, ensuring reproducible builds. The parent repository does not track the contents of the submodule directory; instead, it tracks just the commit hash, similar to a pointer. This means the submodule can be updated independently, and the parent repository explicitly chooses when to adopt new versions by updating the tracked commit. Submodules are particularly valuable in monorepo alternatives where teams want to share code across projects while maintaining independent version control and release processes. However, they add complexity to the workflow and require all developers to understand the submodule commands.',
            code: `# Add a submodule
git submodule add https://github.com/lib/awesome-lib.git libs/awesome

# Clone a repo with submodules
git clone --recurse-submodules https://github.com/user/project.git

# Initialize submodules after regular clone
git submodule init
git submodule update

# Or combine both
git submodule update --init

# Initialize nested submodules recursively
git submodule update --init --recursive

# View submodule status
git submodule status

# View submodule configuration
cat .gitmodules`,
            tip: 'Always use --recurse-submodules when cloning a repository with submodules to ensure all submodule contents are downloaded. Without it, submodule directories will be empty.',
          },
          {
            heading: 'Updating and Managing Submodules',
            content:
              'Updating submodules involves fetching new commits from the submodule remote and updating the parent repository to track a new commit. The git submodule update command checks out the exact commit that the parent repository has recorded. To update a submodule to its latest version, you enter the submodule directory, fetch and checkout the desired version, then return to the parent and commit the updated reference. Alternatively, git submodule update --remote fetches the latest commit from the configured branch of each submodule. Managing submodules across a team requires discipline: every developer must run submodule update after pulling changes that modify the tracked submodule commit. Forgetting this step leads to a dirty working directory and potential confusion about which version of the submodule code is active. Many teams add post-merge and post-checkout hooks that automatically update submodules to minimize this friction.',
            code: `# Update submodule to the commit tracked by parent
git submodule update

# Update submodule to latest remote commit
git submodule update --remote

# Update a specific submodule
git submodule update --remote libs/awesome

# Enter submodule and update manually
cd libs/awesome
git fetch
git checkout v2.0.0
cd ../..
git add libs/awesome
git commit -m "Update awesome-lib to v2.0.0"

# Configure submodule to track a branch
git config -f .gitmodules submodule.libs/awesome.branch main

# Pull with submodule update
git pull --recurse-submodules

# Push ensuring submodule changes are pushed first
git push --recurse-submodules=on-demand

# Run a command in all submodules
git submodule foreach 'git status'`,
            warning: 'Forgetting to commit the submodule reference update in the parent repository after updating a submodule is a common mistake that leads to inconsistent states for other developers.',
          },
          {
            heading: 'Removing Submodules and Troubleshooting',
            content:
              'Removing a submodule from a repository is not as straightforward as adding one because Git stores submodule information in multiple locations. You need to deinitialize the submodule, remove the directory, and clean up the configuration entries. The git submodule deinit command unregisters the submodule and clears its working directory. Then git rm removes the submodule entry from the index and working directory. Finally, you should manually remove the submodule directory from .git/modules/ to clean up completely. Common troubleshooting scenarios include submodule directories being empty after clone (run git submodule update --init), detached HEAD in submodules (normal behavior since submodules check out specific commits), and merge conflicts in submodule references (resolve by choosing the correct commit hash). Despite their complexity, submodules remain a valuable tool for managing dependencies between repositories when used with proper team discipline and automation.',
            code: `# Remove a submodule (modern Git)
git submodule deinit libs/awesome
git rm libs/awesome
rm -rf .git/modules/libs/awesome
git commit -m "Remove awesome-lib submodule"

# Fix empty submodule directory
git submodule update --init --recursive

# Reset submodule to tracked commit
git submodule update --force

# Resolve submodule conflict during merge
git checkout --theirs libs/awesome
git add libs/awesome

# Check submodule commit mismatch
git diff --submodule

# Show detailed submodule diff
git diff --submodule=diff

# Auto-update hooks (add to .githooks/post-merge)
#!/bin/bash
# git submodule update --init --recursive

# Troubleshoot submodule issues
git submodule sync --recursive
git submodule update --init --recursive`,
            note: 'If submodules cause too much friction in your workflow, consider alternatives like Git subtree, package managers (npm, pip), or a monorepo approach.',
          },
        ],
        quiz: [
          {
            question: 'What does a parent repository actually track about a submodule?',
            options: ['All the submodule files', 'The submodule branch name', 'A specific commit hash', 'The submodule tags'],
            correctAnswer: 2,
            explanation: 'The parent repository tracks only the specific commit hash of the submodule, not its contents. This ensures exact version reproducibility.',
          },
          {
            question: 'What happens if you clone a repo with submodules without --recurse-submodules?',
            options: ['The clone fails', 'Submodule directories exist but are empty', 'Submodules are cloned automatically', 'Git warns and exits'],
            correctAnswer: 1,
            explanation: 'Without --recurse-submodules, the submodule directories are created but empty. You must run git submodule update --init to populate them.',
          },
          {
            question: 'Why does a submodule typically have a detached HEAD?',
            options: ['It is a bug', 'Because it checks out a specific commit, not a branch', 'Because submodules do not support branches', 'Because the remote is unavailable'],
            correctAnswer: 1,
            explanation: 'Submodules are checked out at the specific commit the parent tracks, not at a branch tip, which naturally results in a detached HEAD.',
          },
        ],
      },
      {
        id: 'git-subtree',
        title: 'Git Subtree',
        difficulty: 'advanced',
        tags: ['git', 'subtree', 'merge', 'split', 'alternative', 'dependencies'],
        sections: [
          {
            heading: 'Introduction to Git Subtree',
            content:
              'Git subtree is an alternative to submodules for including external repositories within your project. Unlike submodules, which maintain a pointer to an external repository, subtree merges the external repository contents directly into your project as regular files and commits. This means anyone cloning your repository gets all the code immediately without needing special submodule commands. The external code becomes part of your commit history, and developers can work with it using standard Git commands without knowing it originated from another repository. This simplicity is the primary advantage of subtree over submodules. The trade-off is that your repository becomes larger because it contains the full contents of the included project, and pushing changes back to the original repository requires additional steps. Subtree is well-suited for including libraries or components that you might want to customize or that change infrequently, especially in teams where not all developers are comfortable with submodule workflows.',
            code: `# Add a subtree
git subtree add --prefix=libs/awesome \\
  https://github.com/lib/awesome.git main --squash

# The --squash flag condenses external history into one commit
# Without --squash, full history is merged

# Add using a named remote (recommended)
git remote add awesome https://github.com/lib/awesome.git
git subtree add --prefix=libs/awesome awesome main --squash

# View the subtree contents
ls libs/awesome/

# The files are regular tracked files
git status
git log --oneline libs/awesome/`,
            tip: 'Always use --squash when adding a subtree to avoid flooding your project history with the entire external repository history.',
          },
          {
            heading: 'Updating and Contributing Back',
            content:
              'Updating a subtree to incorporate upstream changes is done with git subtree pull, which fetches and merges new commits from the external repository into the subtree directory. The --squash option condenses the update into a single merge commit, keeping your history clean. Contributing changes back to the original repository is done with git subtree push, which extracts commits affecting the subtree directory and pushes them to the external repository. Git subtree split can also extract the subtree into a separate branch, which is useful for creating standalone versions of code that was developed within a larger project. The bidirectional nature of subtree makes it suitable for shared libraries that are developed both within the consuming project and independently. However, the push operation can be slow for large repositories because Git must examine the entire project history to extract relevant commits for the subtree.',
            code: `# Pull updates from the external repo
git subtree pull --prefix=libs/awesome awesome main --squash

# Push local changes back to the external repo
git subtree push --prefix=libs/awesome awesome main

# Split subtree into a separate branch
git subtree split --prefix=libs/awesome -b awesome-standalone

# Push the split branch to a remote
git push awesome awesome-standalone:main

# Merge specific external branch
git subtree pull --prefix=libs/awesome awesome feature/v2 --squash

# View subtree merge history
git log --oneline --first-parent`,
            note: 'git subtree push can be slow on large repositories because it traverses the entire commit history. The split command is more efficient for frequent push operations.',
          },
          {
            heading: 'Subtree vs Submodule Comparison',
            content:
              'Choosing between subtree and submodule depends on your specific needs and team dynamics. Submodules maintain a clean separation between repositories, making it clear which code is external and preserving the original repository structure. They are better when you need to track specific versions precisely and when the external code is large or changes frequently. Subtrees embed the external code directly, making the project self-contained and easier for contributors who are not familiar with submodule commands. They are better for smaller dependencies, infrequently updated code, or when you want to customize the included code. Some organizations use both approaches for different purposes: subtrees for small utility libraries and submodules for large shared components. The key consideration is developer experience: if your team struggles with submodule commands and frequently has empty submodule directories, subtree might be a better fit. If version tracking precision and clear code boundaries are priorities, submodules are the better choice.',
            code: `# Subtree advantages in practice
# Simple clone - everything is included
git clone https://github.com/user/project.git
# All subtree code is immediately available

# vs Submodule requires extra steps
git clone https://github.com/user/project.git
git submodule update --init --recursive

# Subtree workflow
git subtree add --prefix=vendor/lib remote main --squash
# Edit files in vendor/lib/ normally
git add vendor/lib/file.txt
git commit -m "Fix bug in vendored lib"
# Push fix upstream
git subtree push --prefix=vendor/lib remote main

# Check if directory is a subtree
git log --oneline --ancestry-path HEAD -- libs/awesome | head -5

# Remove a subtree (just delete the directory)
git rm -r libs/awesome
git commit -m "Remove awesome library subtree"`,
            analogy: 'A submodule is like a symlink to another library on your shelf. A subtree is like photocopying the book and putting the pages in your binder. Both give you access to the content, but with different trade-offs in maintenance and portability.',
          },
        ],
        challenge: {
          title: 'Subtree Integration Exercise',
          description: 'Practice adding, updating, and contributing back with git subtree.',
          steps: [
            'Create two separate repositories (main project and library)',
            'Add the library as a subtree in the main project with --squash',
            'Make changes to the subtree files in the main project',
            'Pull updates from the library repository using subtree pull',
            'Push your subtree changes back to the library repository',
          ],
          hints: [
            'Use --prefix to specify where the subtree lives in your project',
            'Always use --squash to keep history clean',
            'Use git subtree split to create a clean branch for pushing back',
          ],
        },
      },
      {
        id: 'git-lfs',
        title: 'Git LFS',
        difficulty: 'intermediate',
        tags: ['git', 'lfs', 'large-files', 'binary', 'storage', 'media'],
        sections: [
          {
            heading: 'Introduction to Git LFS',
            content:
              'Git Large File Storage (LFS) is an extension that replaces large files in your repository with lightweight pointer files while storing the actual file contents on a separate server. This solves a fundamental problem with Git: repositories that contain large binary files like images, videos, datasets, or compiled artifacts become extremely slow to clone and fetch because Git stores every version of every file. With LFS, only the pointer files are stored in the Git history, and the actual large files are downloaded on demand. This dramatically reduces clone and fetch times, especially for repositories with media assets or machine learning datasets. LFS integrates seamlessly with Git commands, so after initial setup, you work normally while LFS handles the storage details transparently. Most major Git hosting platforms including GitHub, GitLab, and Bitbucket support LFS, though they may impose storage limits or require paid plans for large amounts of LFS storage.',
            code: `# Install Git LFS
git lfs install

# Track specific file types with LFS
git lfs track "*.psd"
git lfs track "*.zip"
git lfs track "*.mp4"
git lfs track "*.bin"

# Track files in a specific directory
git lfs track "assets/**"

# View tracked patterns
git lfs track

# The tracking rules are stored in .gitattributes
cat .gitattributes

# IMPORTANT: commit .gitattributes first
git add .gitattributes
git commit -m "Configure LFS tracking"

# Then add your large files
git add assets/video.mp4
git commit -m "Add video asset"
git push`,
            tip: 'Always commit .gitattributes before adding large files to ensure LFS tracking is active. Files added before tracking is configured will be stored normally in Git.',
          },
          {
            heading: 'Working with LFS Files',
            content:
              'Once LFS is configured, most Git operations work transparently. When you push, LFS intercepts large files matching the tracked patterns, uploads them to the LFS server, and stores a pointer file in Git. When you pull or checkout, LFS downloads the actual files and replaces the pointers in your working directory. You can view the status of LFS files with git lfs status and see which files are managed by LFS with git lfs ls-files. If you need to download all LFS files explicitly, use git lfs pull. For CI/CD environments where you might not need the actual large files, you can configure a partial clone with GIT_LFS_SKIP_SMUDGE to skip downloading LFS contents, speeding up the build process. Understanding the pointer file format is helpful for debugging: each pointer contains the SHA-256 hash and size of the actual file, which LFS uses to locate the content on the server.',
            code: `# View LFS-managed files
git lfs ls-files

# Check LFS status
git lfs status

# Pull all LFS files
git lfs pull

# Fetch LFS files without checking out
git lfs fetch

# Fetch LFS files for specific branches
git lfs fetch --all

# View a pointer file contents
git lfs pointer --file=assets/video.mp4

# Clone without downloading LFS files
GIT_LFS_SKIP_SMUDGE=1 git clone https://github.com/user/repo.git

# Later download LFS files selectively
cd repo
git lfs pull --include="assets/images/*"
git lfs pull --exclude="assets/videos/*"

# Migrate existing large files to LFS
git lfs migrate import --include="*.psd"`,
            warning: 'Changing LFS tracking patterns does not retroactively move files already in Git history. Use git lfs migrate to convert existing files to LFS storage.',
          },
          {
            heading: 'LFS Administration and Best Practices',
            content:
              'Managing Git LFS effectively requires understanding storage quotas, bandwidth limits, and cleanup procedures. Most hosting platforms charge for LFS storage and bandwidth beyond free tier limits, so tracking only truly large or binary files is important. Text files, even large ones, should generally remain in regular Git because Git compresses and diffs them efficiently. Use .gitattributes patterns carefully to avoid tracking files that do not need LFS. The git lfs prune command removes old LFS files from your local cache that are no longer referenced by recent commits, freeing disk space. For migration scenarios, git lfs migrate can convert existing repository history to use LFS for specified file types, though this rewrites history and requires coordination with your team. Regularly audit your LFS usage with git lfs env to check server configuration and git lfs ls-files to verify which files are managed. Proper LFS hygiene keeps your repository performant and your hosting costs reasonable.',
            code: `# View LFS environment and configuration
git lfs env

# Prune old LFS files from local cache
git lfs prune

# Dry run prune to see what would be removed
git lfs prune --dry-run

# View LFS storage usage (GitHub)
gh api /repos/{owner}/{repo} --jq '.size'

# Migrate existing files to LFS
git lfs migrate import --include="*.png,*.jpg" --everything

# Migrate only specific branches
git lfs migrate import --include="*.bin" --include-ref=main

# Untrack a file type
git lfs untrack "*.zip"

# Lock an LFS file (prevent concurrent edits)
git lfs lock assets/design.psd
git lfs unlock assets/design.psd

# View locked files
git lfs locks

# Set custom LFS server
git config lfs.url https://lfs.example.com/user/repo`,
            note: 'File locking is useful for binary files that cannot be merged, such as Photoshop files or Unity scenes. Locks prevent concurrent edits that would result in one developer overwriting the other.',
          },
        ],
        quiz: [
          {
            question: 'What does Git LFS store in the Git repository?',
            options: ['The full large file', 'A compressed version of the file', 'A lightweight pointer file', 'Nothing'],
            correctAnswer: 2,
            explanation: 'Git LFS replaces large files with small pointer files in the Git repository. The actual file content is stored on a separate LFS server.',
          },
          {
            question: 'What file should you commit FIRST when setting up LFS tracking?',
            options: ['The large files', '.gitignore', '.gitattributes', 'LFS config'],
            correctAnswer: 2,
            explanation: 'The .gitattributes file contains LFS tracking rules and must be committed before adding large files to ensure LFS intercepts them correctly.',
          },
          {
            question: 'How can you skip downloading LFS files during clone?',
            options: ['git clone --no-lfs', 'git clone --shallow', 'Set GIT_LFS_SKIP_SMUDGE=1 before cloning', 'git clone --depth=1'],
            correctAnswer: 2,
            explanation: 'Setting the GIT_LFS_SKIP_SMUDGE=1 environment variable tells LFS not to download file contents during clone or checkout, leaving pointer files in place.',
          },
        ],
      },
    ],
  },
];
