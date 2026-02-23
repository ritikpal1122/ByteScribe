import type { DocCategory } from './types';

export const GIT_PART3_CATEGORIES: DocCategory[] = [
  {
    id: 'git-undoing',
    title: 'Undoing Changes',
    icon: '↩️',
    entries: [
      {
        id: 'git-restore',
        title: 'git restore',
        difficulty: 'intermediate',
        tags: ['git', 'restore', 'working-tree', 'staged', 'undo', 'checkout'],
        sections: [
          {
            heading: 'Restoring Working Tree Files',
            content:
              'The `git restore` command was introduced in Git 2.23 as a more intuitive alternative to the overloaded `git checkout` command for restoring files. When you modify a tracked file in your working directory and want to discard those changes, `git restore` provides a clear, explicit way to do so. Unlike the older `git checkout -- <file>` syntax, `git restore` is purpose-built for file restoration, making your intent unambiguous. By default, `git restore <file>` restores a file in your working tree from the staging area (index). If the file has been staged, the working copy will match the staged version. If no staged changes exist, it restores from HEAD. This separation of concerns makes the Git command set much more approachable for newcomers and reduces the risk of accidentally switching branches when you meant to restore files.',
            code: `# Discard changes in a single file
git restore app.js

# Discard changes in multiple files
git restore src/index.ts src/utils.ts

# Restore all files in the current directory
git restore .

# Restore a specific path pattern
git restore '*.css'`,
            tip: 'Use `git restore .` as a safer replacement for `git checkout -- .` to discard all working tree changes.',
          },
          {
            heading: 'Unstaging Files with --staged',
            content:
              'One of the most common Git tasks is unstaging a file that was added with `git add`. Previously, you had to use the confusing `git reset HEAD <file>` command. With `git restore --staged <file>`, the intent is crystal clear: you are restoring the staging area, effectively removing the file from the next commit without touching your working directory changes. This is a non-destructive operation; your local modifications remain intact. You can combine `--staged` with `--worktree` (or use the shorthand `-SW`) to simultaneously unstage and discard working tree changes. This is the nuclear option for a particular file, returning it to the exact state of HEAD. Understanding the difference between restoring the working tree and restoring the staging area is fundamental to mastering Git workflows efficiently and safely.',
            code: `# Unstage a file (keep working tree changes)
git restore --staged config.yaml

# Unstage all files
git restore --staged .

# Unstage AND discard working tree changes
git restore --staged --worktree app.js
# Shorthand
git restore -SW app.js`,
            note: 'The `--staged` flag only affects the index (staging area). Your working directory files remain unchanged unless you also pass `--worktree`.',
          },
          {
            heading: 'Restoring from a Specific Source',
            content:
              'The `--source` flag lets you restore files from any commit, branch, or tree-ish reference, not just from HEAD or the staging area. This is incredibly powerful for retrieving a file as it existed at a particular point in history. For instance, if you know a file was correct two commits ago, you can restore it from `HEAD~2` directly. You can also restore from a specific branch, which is useful when you want to grab a file from another branch without merging. When you specify a source, the file is placed in your working tree (and optionally staged) from that source. The `--source` flag replaces the older `git checkout <commit> -- <file>` pattern and provides much better readability. Combined with `--staged`, you can restore both the index and working tree from any historical state in a single command.',
            code: `# Restore a file from 2 commits ago
git restore --source HEAD~2 src/config.ts

# Restore from a specific commit hash
git restore --source a1b2c3d package.json

# Restore from another branch
git restore --source feature/auth src/auth.ts

# Restore from source into both staging area and working tree
git restore --source HEAD~3 --staged --worktree src/app.ts`,
            tip: 'Combine `--source` with `--staged --worktree` to fully revert a file to its historical state, ready to commit.',
          },
        ],
        quiz: [
          {
            question: 'What does `git restore --staged <file>` do?',
            options: [
              'Deletes the file from the repository',
              'Unstages the file while keeping working tree changes',
              'Discards all changes to the file',
              'Restores the file from the remote',
            ],
            correctIndex: 1,
            explanation:
              'The `--staged` flag removes the file from the staging area (index) but leaves your working directory modifications intact.',
          },
          {
            question: 'Which command restores a file from a specific commit?',
            options: [
              'git restore --from <commit> <file>',
              'git restore --ref <commit> <file>',
              'git restore --source <commit> <file>',
              'git restore --commit <commit> <file>',
            ],
            correctIndex: 2,
            explanation:
              'The `--source` flag specifies which commit, branch, or tree-ish to restore the file from.',
          },
          {
            question: 'What replaced `git checkout -- <file>` for discarding working tree changes?',
            options: [
              'git undo <file>',
              'git discard <file>',
              'git restore <file>',
              'git reset <file>',
            ],
            correctIndex: 2,
            explanation:
              'Git 2.23 introduced `git restore` as the dedicated command for restoring working tree files, replacing the overloaded `git checkout` usage.',
          },
        ],
      },
      {
        id: 'git-reset',
        title: 'git reset',
        difficulty: 'intermediate',
        tags: ['git', 'reset', 'soft', 'mixed', 'hard', 'undo'],
        sections: [
          {
            heading: 'Understanding the Three Reset Modes',
            content:
              'The `git reset` command moves the current branch pointer (HEAD) to a specified commit and optionally modifies the staging area and working directory. It operates in three distinct modes: `--soft`, `--mixed` (default), and `--hard`. Each mode determines how aggressively changes are discarded. With `--soft`, only the branch pointer moves; all changes remain staged and ready to commit. With `--mixed`, the branch pointer moves and the staging area is updated to match the target commit, but your working directory is untouched. With `--hard`, everything is reset: the branch pointer, staging area, and working directory all match the target commit. Understanding these three modes is essential because choosing the wrong one can lead to data loss. The `--hard` flag is particularly dangerous as it permanently discards uncommitted working directory changes that cannot be recovered.',
            code: `# Soft reset: move HEAD, keep changes staged
git reset --soft HEAD~1

# Mixed reset (default): move HEAD, unstage changes
git reset --mixed HEAD~1
# Or simply:
git reset HEAD~1

# Hard reset: move HEAD, discard ALL changes
git reset --hard HEAD~1

# Reset to a specific commit
git reset --soft a1b2c3d`,
            warning: 'The `--hard` flag permanently destroys uncommitted changes in your working directory. Always use `git stash` first if you might need those changes later.',
            diagram: {
              kind: 'mermaid' as const,
              code: `graph TD
    A["git reset --soft HEAD~1"] -->|"Moves HEAD only"| B["Changes remain STAGED"]
    C["git reset --mixed HEAD~1"] -->|"Moves HEAD + resets index"| D["Changes become UNSTAGED"]
    E["git reset --hard HEAD~1"] -->|"Moves HEAD + resets index + working tree"| F["Changes DISCARDED"]
    style A fill:#4ade80,color:#000
    style B fill:#4ade80,color:#000
    style C fill:#facc15,color:#000
    style D fill:#facc15,color:#000
    style E fill:#f87171,color:#000
    style F fill:#f87171,color:#000`,
              caption: 'The three modes of git reset and what they affect',
            },
          },
          {
            heading: 'Practical Reset Scenarios',
            content:
              'Resets are commonly used to undo recent commits while preserving your work. A `--soft` reset is perfect when you want to combine multiple commits into one: reset back several commits and then make a single new commit with all the accumulated changes. A `--mixed` reset is useful when you staged files accidentally or want to restructure what goes into the next commit. You might also use it to undo a commit but review the changes before re-staging them selectively. The `--hard` reset is typically used to completely abandon recent work and return to a known good state. Another common pattern is `git reset HEAD <file>` to unstage a specific file, though `git restore --staged` is now preferred for this. When working with shared branches, prefer `git revert` over `git reset` because reset rewrites history, which causes problems for collaborators who have already pulled the commits you are removing.',
            code: `# Squash last 3 commits into one
git reset --soft HEAD~3
git commit -m "Combined feature implementation"

# Unstage a specific file (older method)
git reset HEAD src/config.ts

# Abandon all work since last commit
git reset --hard HEAD

# Reset to match remote branch exactly
git reset --hard origin/main`,
            tip: 'Use `git reset --soft HEAD~N` followed by a single commit to squash N commits into one without using interactive rebase.',
          },
          {
            heading: 'Reset with Paths and Safety',
            content:
              'When you provide a file path to `git reset`, it behaves differently: it does not move HEAD at all. Instead, it copies the specified version of the file into the staging area. This is essentially the opposite of `git add`. For example, `git reset HEAD -- file.txt` copies the HEAD version of file.txt into the index, effectively unstaging it. You can also reset from other commits: `git reset abc123 -- file.txt` copies that commit version into the staging area. This path-based reset only supports the `--mixed` mode conceptually since it only affects the index. To protect yourself from destructive resets, always check `git log` and `git status` before running a hard reset. Remember that `git reflog` can save you if you accidentally reset too far, since it records where HEAD pointed before the reset. You can use `git reset --hard HEAD@{1}` to undo a reset operation itself.',
            code: `# Reset a single file in staging area from HEAD
git reset HEAD -- src/utils.ts

# Reset a file from a specific commit into staging
git reset abc1234 -- package.json

# Undo a reset using reflog
git reflog
# Find the entry before the reset, e.g., HEAD@{1}
git reset --hard HEAD@{1}

# Safer workflow: stash before hard reset
git stash
git reset --hard origin/main`,
            note: 'Path-based `git reset` never moves HEAD. It only modifies the staging area for the specified files.',
          },
        ],
        quiz: [
          {
            question: 'What is the default mode of `git reset`?',
            options: ['--soft', '--mixed', '--hard', '--keep'],
            correctIndex: 1,
            explanation:
              'When no mode is specified, `git reset` defaults to `--mixed`, which moves HEAD and resets the staging area but leaves the working directory unchanged.',
          },
          {
            question: 'Which reset mode keeps changes staged?',
            options: ['--hard', '--mixed', '--soft', '--patch'],
            correctIndex: 2,
            explanation:
              'The `--soft` mode only moves the HEAD pointer. All changes from the reset commits remain in the staging area, ready to be committed.',
          },
          {
            question: 'What happens when you run `git reset HEAD -- file.txt`?',
            options: [
              'HEAD moves to the previous commit',
              'The file is deleted from the repository',
              'The file is unstaged (removed from the index)',
              'The file is restored in the working directory',
            ],
            correctIndex: 2,
            explanation:
              'Path-based reset does not move HEAD. It copies the specified version of the file into the staging area, effectively unstaging it.',
          },
        ],
      },
      {
        id: 'git-revert',
        title: 'git revert',
        difficulty: 'intermediate',
        tags: ['git', 'revert', 'undo', 'safe', 'merge-commit'],
        sections: [
          {
            heading: 'Safe Undo with git revert',
            content:
              'Unlike `git reset`, which rewrites history by removing commits, `git revert` creates a new commit that undoes the changes introduced by a previous commit. This makes it the safe choice for undoing changes on shared branches because it preserves the commit history. When you run `git revert <commit>`, Git calculates the inverse of the changes made in that commit and applies them as a new commit. For example, if a commit added a line, the revert commit removes it. If a commit deleted a function, the revert commit adds it back. The original commit remains in the history, and the revert commit is appended on top. This approach is transparent to all collaborators: they can see exactly what was done and what was undone. It is the standard practice for rolling back changes in production branches, CI/CD pipelines, and any branch that others may have already pulled from.',
            code: `# Revert the most recent commit
git revert HEAD

# Revert a specific commit by hash
git revert a1b2c3d

# Revert without auto-committing (stage changes only)
git revert --no-commit a1b2c3d
# or shorthand
git revert -n a1b2c3d

# Revert multiple commits (creates one revert commit per original)
git revert HEAD~3..HEAD`,
            tip: 'Use `--no-commit` when reverting multiple commits so you can combine all reversions into a single clean revert commit.',
          },
          {
            heading: 'Reverting Merge Commits',
            content:
              'Reverting merge commits requires special attention because a merge commit has two (or more) parent commits, and Git needs to know which parent represents the mainline to determine what changes to undo. You specify the parent with the `-m` flag followed by the parent number. Parent 1 is the branch you were on when you ran `git merge`, and parent 2 is the branch that was merged in. In most workflows, `-m 1` is what you want: it undoes the changes introduced by the feature branch while preserving the mainline history. Be aware that reverting a merge commit has a critical side-effect: if you later try to merge that same branch again, Git considers those changes already applied (and reverted). To re-merge, you must first revert the revert commit. This is a common source of confusion in teams and worth understanding thoroughly before working with merge reverts in production.',
            code: `# Revert a merge commit, keeping parent 1 (mainline)
git revert -m 1 <merge-commit-hash>

# Example workflow: revert a bad merge on main
git log --oneline --graph  # identify the merge commit
git revert -m 1 abc1234

# Later, to re-merge the same branch:
# First revert the revert
git revert <revert-commit-hash>
# Then merge again or cherry-pick new changes
git merge feature/fixed-branch`,
            warning: 'After reverting a merge, re-merging the same branch will not bring back the original changes. You must revert the revert commit first.',
          },
          {
            heading: 'Advanced Revert Strategies',
            content:
              'For complex scenarios, you can revert a range of commits, handle conflicts during reverts, and use revert in combination with other Git commands for sophisticated undo workflows. When reverting a range, Git processes each commit individually in reverse chronological order, creating a revert commit for each. Using `--no-commit` with a range lets you squash all reversions into a single commit for a cleaner history. Conflicts during a revert are handled just like merge conflicts: edit the files, stage the resolutions, and continue with `git revert --continue`. You can abort a problematic revert with `git revert --abort`. A powerful pattern is using revert for feature flags: merge a feature, and if it causes issues, revert it quickly. Once fixed, revert the revert and the feature is back. This pattern is used extensively in large-scale continuous deployment environments where speed of rollback is critical.',
            code: `# Revert a range without committing, then commit once
git revert --no-commit HEAD~5..HEAD
git commit -m "Revert last 5 commits"

# Handle conflicts during revert
git revert a1b2c3d
# ... resolve conflicts in editor ...
git add .
git revert --continue

# Abort a revert in progress
git revert --abort

# Feature flag pattern: quick rollback and re-deploy
git revert -m 1 <merge-hash>         # rollback
# ... fix the feature branch ...
git revert <revert-hash>              # revert the revert
git merge feature/fixed               # merge fixes`,
            analogy: 'Think of `git revert` like using correction tape on a document: the original text is still there underneath, but the correction covers it up. Everyone can see both the original and the correction.',
          },
        ],
        challenge: {
          prompt:
            'You have a repository where the last 3 commits introduced bugs. Revert all three changes into a single clean revert commit with the message "Revert buggy changes".',
          starterCode: `# The last 3 commits are buggy. Create a single revert commit.
# Hint: use --no-commit to batch them

`,
          solutionCode: `git revert --no-commit HEAD~3..HEAD
git commit -m "Revert buggy changes"`,
          hints: [
            'Use --no-commit (or -n) to prevent individual revert commits',
            'The range HEAD~3..HEAD covers the last 3 commits',
            'After reverting without committing, use git commit to create a single revert',
          ],
        },
      },
      {
        id: 'git-reflog',
        title: 'git reflog',
        difficulty: 'intermediate',
        tags: ['git', 'reflog', 'recovery', 'HEAD', 'reference-log'],
        sections: [
          {
            heading: 'Understanding the Reference Log',
            content:
              'The reference log (reflog) is Git\'s safety net. It records every time HEAD or a branch reference changes in your local repository. Unlike the commit log, which shows the project history, the reflog shows your personal history of Git operations. Every commit, reset, rebase, checkout, merge, pull, and amend operation is recorded. Each entry has a reference like `HEAD@{0}` (current position), `HEAD@{1}` (previous position), and so on. The reflog is local to your repository and is not shared with remotes. Entries expire after 90 days by default (30 days for unreachable entries). This is your primary recovery mechanism when things go wrong. Even if you run `git reset --hard` and think you have lost work, the reflog remembers where HEAD was before the reset, allowing you to recover. It is often described as Git\'s undo history, and understanding it transforms potentially catastrophic mistakes into minor inconveniences.',
            code: `# Show the reflog for HEAD
git reflog

# Show reflog with dates
git reflog --date=relative

# Show reflog for a specific branch
git reflog show feature/auth

# Show reflog with full commit details
git reflog --format='%C(auto)%h %gd %gs %s'

# Show last 10 reflog entries
git reflog -n 10`,
            analogy: 'The reflog is like a security camera for your repository. Even if someone rearranges the furniture (resets, rebases), the camera recorded every move so you can always go back and see what happened.',
          },
          {
            heading: 'Recovering Lost Commits with Reflog',
            content:
              'The most valuable use of the reflog is recovering from destructive operations. If you accidentally run `git reset --hard` and lose commits, the reflog still has references to those commits. You can find the commit hash in the reflog and either reset back to it or cherry-pick it onto your current branch. Similarly, if an interactive rebase goes wrong, the reflog records the pre-rebase state, letting you restore your branch to its original form. The key insight is that Git almost never truly deletes objects immediately. Even after a reset or rebase, the old commits exist in the object database until garbage collection runs (typically after the reflog entries expire). This means you usually have a generous window to recover lost work. The reflog is also invaluable for finding commits that were on detached HEAD states or branches that were deleted, as long as the reflog entries have not expired.',
            code: `# Recover from accidental hard reset
git reflog
# Find the commit before the reset, e.g., HEAD@{2}
git reset --hard HEAD@{2}

# Recover from bad rebase
git reflog
# Find the pre-rebase entry
git reset --hard HEAD@{5}

# Cherry-pick a lost commit back
git reflog
git cherry-pick abc1234

# Recover a deleted branch
git reflog
# Find the last commit of the deleted branch
git checkout -b recovered-branch HEAD@{3}`,
            tip: 'After a destructive operation, immediately check `git reflog` before doing anything else. The entry you need is usually just a few positions back.',
          },
          {
            heading: 'Reflog Maintenance and Advanced Usage',
            content:
              'The reflog has configurable expiration times and can be managed for optimal performance. By default, reachable reflog entries expire after 90 days, and unreachable entries expire after 30 days. You can adjust these with `gc.reflogExpire` and `gc.reflogExpireUnreachable`. The `git reflog expire` command manually prunes old entries, and `git reflog delete` removes specific entries. For debugging complex Git workflows, you can use the reflog to trace exactly what operations were performed and in what order. The `HEAD@{n}` syntax can be used anywhere a commit reference is accepted: in `git diff`, `git log`, `git show`, and more. You can also use time-based references like `HEAD@{yesterday}`, `HEAD@{2.hours.ago}`, or `HEAD@{2024-01-15}`. These time-based references are particularly useful for finding the state of your repository at a specific point in time without needing to remember exact commit hashes.',
            code: `# Time-based reflog references
git diff HEAD@{yesterday} HEAD
git show HEAD@{2.hours.ago}
git log HEAD@{2024-01-15}..HEAD

# Configure reflog expiration
git config gc.reflogExpire 180
git config gc.reflogExpireUnreachable 60

# Manually expire old entries
git reflog expire --expire=30.days --all

# Delete a specific reflog entry
git reflog delete HEAD@{5}

# Use reflog in diff and log
git diff HEAD@{3} HEAD
git log HEAD@{10}..HEAD --oneline`,
            note: 'Reflog entries are local and never pushed to remotes. If you clone a repository, the reflog starts fresh.',
          },
        ],
        quiz: [
          {
            question: 'What does the reflog record?',
            options: [
              'Only commit operations',
              'Every change to HEAD and branch references locally',
              'All changes pushed to the remote',
              'File modifications in the working tree',
            ],
            correctIndex: 1,
            explanation:
              'The reflog records every local change to HEAD and branch references, including commits, resets, rebases, checkouts, and more. It is local-only.',
          },
          {
            question: 'How long do reachable reflog entries last by default?',
            options: ['30 days', '60 days', '90 days', 'Forever'],
            correctIndex: 2,
            explanation:
              'By default, reachable reflog entries expire after 90 days. Unreachable entries expire after 30 days.',
          },
          {
            question: 'Which reference shows where HEAD was before the last operation?',
            options: ['HEAD@{0}', 'HEAD@{1}', 'HEAD~1', 'ORIG_HEAD'],
            correctIndex: 1,
            explanation:
              '`HEAD@{1}` refers to the previous position of HEAD in the reflog. `HEAD@{0}` is the current position.',
          },
        ],
      },
      {
        id: 'git-clean',
        title: 'git clean',
        difficulty: 'intermediate',
        tags: ['git', 'clean', 'untracked', 'dry-run', 'force'],
        sections: [
          {
            heading: 'Removing Untracked Files',
            content:
              'The `git clean` command removes untracked files from your working directory. Untracked files are those that have never been staged or committed, and they accumulate as build artifacts, temporary files, log files, or files created by experimentation. While `git restore` and `git reset` deal with tracked files, `git clean` handles the untracked ones. By default, Git refuses to run `git clean` without the `-f` (force) flag as a safety measure, because this operation is destructive and the files cannot be recovered through Git since they were never tracked. Before running `git clean -f`, always use `git clean -n` (dry run) to preview which files would be deleted. This two-step workflow of dry run followed by force is a best practice that prevents accidental deletion of important files that happen to be untracked, such as configuration files, IDE settings, or data files that should have been committed.',
            code: `# Dry run: show what would be removed
git clean -n

# Force remove untracked files
git clean -f

# Remove untracked directories too
git clean -fd

# Remove ignored files as well
git clean -fx

# Remove ONLY ignored files (great for build artifacts)
git clean -fX

# Interactive mode: choose what to clean
git clean -i`,
            warning: 'Files removed by `git clean` are permanently deleted. They cannot be recovered with git reflog or any other Git command because they were never tracked.',
          },
          {
            heading: 'Cleaning Strategies and Patterns',
            content:
              'Different flags combine to create powerful cleaning strategies. The `-d` flag includes untracked directories in the cleanup, not just files. The `-x` flag removes ignored files in addition to untracked ones, which is useful for a truly clean build environment. The `-X` flag (capital X) removes only ignored files, preserving untracked files that are not in `.gitignore`. This is perfect for cleaning build artifacts while keeping configuration files. You can also use the `-e` (exclude) flag to protect specific patterns during a clean operation. For instance, `git clean -fd -e "*.env"` removes all untracked files and directories except `.env` files. The interactive mode (`-i`) provides a menu-driven interface where you can selectively choose which files to remove, filter by pattern, or ask for confirmation on each file. Combining dry run with specific flags helps you understand exactly what each combination will do before committing to the operation.',
            code: `# Clean build artifacts only (ignored files)
git clean -fX

# Clean everything except .env files
git clean -fdx -e "*.env" -e "*.local"

# Clean a specific subdirectory
git clean -fd src/generated/

# Full project clean (build from scratch)
git clean -fdx
git checkout -- .

# Interactive clean with previews
git clean -id`,
            tip: 'Use `git clean -fX` after switching branches to remove build artifacts from the previous branch without touching untracked source files.',
          },
          {
            heading: 'Integration with Build Workflows',
            content:
              'In CI/CD pipelines and build systems, `git clean` is essential for ensuring reproducible builds. A common pattern is running `git clean -fdx` before every build to guarantee a pristine working directory. This removes all untracked and ignored files, ensuring no stale artifacts from previous builds interfere with the current one. Some build systems generate numerous temporary files, caches, and intermediate artifacts that accumulate over time and can cause subtle, hard-to-debug build failures. Combining `git clean` with `git reset --hard` gives you a completely pristine checkout: `git reset --hard HEAD && git clean -fdx`. In monorepo environments, you might want to clean only specific project directories to avoid unnecessarily rebuilding other projects. The `git clean` command respects the path argument, so `git clean -fdx services/api/` only cleans that subdirectory. Always document your clean strategy in build scripts so team members understand what gets removed.',
            code: `# Full pristine checkout for CI/CD
git reset --hard HEAD
git clean -fdx

# Clean specific project in monorepo
git clean -fdx services/api/
git clean -fdx packages/shared/

# Build script example
#!/bin/bash
echo "Cleaning workspace..."
git clean -fXd  # remove ignored files/dirs
echo "Building..."
npm ci
npm run build

# Verify what is untracked before cleaning
git status --porcelain | grep "^??"`,
            note: 'In CI environments, `git clean -fdx` combined with `git reset --hard` ensures every build starts from an identical state, eliminating "works on my machine" issues.',
          },
        ],
        challenge: {
          prompt:
            'Your project has accumulated build artifacts (in the `dist/` and `node_modules/` directories, both gitignored) and some untracked test data files. Write commands to: 1) Preview what ignored files would be removed, 2) Remove only the ignored files and directories, 3) Verify the result.',
          starterCode: `# Step 1: Preview ignored files that would be cleaned

# Step 2: Remove only ignored files and directories

# Step 3: Check remaining status
`,
          solutionCode: `# Step 1: Preview ignored files that would be cleaned
git clean -nXd

# Step 2: Remove only ignored files and directories
git clean -fXd

# Step 3: Check remaining status
git status`,
          hints: [
            'Capital -X removes only ignored files, lowercase -x removes ignored AND untracked',
            'Use -n for dry run before -f for force',
            'The -d flag includes directories in the clean operation',
          ],
        },
      },
      {
        id: 'git-bisect',
        title: 'git bisect',
        difficulty: 'advanced',
        tags: ['git', 'bisect', 'debug', 'binary-search', 'regression'],
        sections: [
          {
            heading: 'Binary Search for Bugs',
            content:
              'The `git bisect` command performs a binary search through your commit history to find the exact commit that introduced a bug. Instead of manually checking out commits one by one, bisect efficiently narrows down the problematic commit by halving the search space with each step. You start by marking a known bad commit (usually HEAD) and a known good commit (where the bug did not exist). Git then checks out the midpoint commit, and you test whether the bug is present. If the bug exists, you mark it as bad; if not, mark it as good. Git continues bisecting until it identifies the exact first bad commit. For a history with 1000 commits, bisect finds the culprit in about 10 steps instead of potentially hundreds. This logarithmic efficiency makes bisect invaluable for large codebases with long histories where bugs may have been introduced weeks or months ago without immediate detection.',
            code: `# Start bisecting
git bisect start

# Mark current commit as bad (has the bug)
git bisect bad

# Mark a known good commit
git bisect good v2.0.0
# or with a hash
git bisect good a1b2c3d

# Git checks out the midpoint. Test and mark:
git bisect good   # if bug is NOT present
# or
git bisect bad    # if bug IS present

# Repeat until Git finds the first bad commit
# When done, reset to original HEAD
git bisect reset`,
            analogy: 'Bisect is like the number guessing game where someone says "higher" or "lower." Instead of guessing each number sequentially, you always guess the middle, cutting the possibilities in half each time.',
          },
          {
            heading: 'Automated Bisect with Scripts',
            content:
              'The true power of `git bisect` emerges when combined with `bisect run`, which automates the entire process by running a test script at each step. The script should exit with code 0 for good commits and any non-zero code (typically 1) for bad commits. A special exit code of 125 tells bisect to skip the current commit (useful for commits that cannot be tested, such as those with build failures). You can use any executable as the test script: a shell script, a test runner, a compilation check, or even a one-liner. For compiled projects, ensure your script handles the build step as well. The `bisect run` approach eliminates human error in the marking process and can run unattended, making it practical to bisect through thousands of commits overnight. Combined with a good test suite, you can find the exact commit that broke any testable behavior automatically.',
            code: `# Automated bisect with a test script
git bisect start
git bisect bad HEAD
git bisect good v1.0.0
git bisect run ./test_bug.sh

# Example test script (test_bug.sh):
#!/bin/bash
# Exit 0 = good, Exit 1 = bad, Exit 125 = skip
make build || exit 125  # skip if build fails
./run_test --specific-test || exit 1
exit 0

# One-liner bisect with npm test
git bisect start HEAD v1.0.0
git bisect run npm test

# Bisect with pytest
git bisect start HEAD abc1234
git bisect run pytest tests/test_login.py -x

# Skip a commit that cannot be tested
git bisect skip`,
            tip: 'Write your bisect test script to be self-contained: it should build the project, run the specific test, and return the correct exit code without manual intervention.',
          },
          {
            heading: 'Advanced Bisect Techniques',
            content:
              'Beyond basic usage, bisect supports several advanced features. You can provide terms other than "good" and "bad" using `git bisect start --term-old=slow --term-new=fast` for finding performance regressions or other non-bug changes. The `git bisect log` command shows the bisection history, and `git bisect replay` can replay a logged bisection session. You can visualize the remaining suspects with `git bisect visualize`, which opens gitk or a log view of the commits still under consideration. If you accidentally mark a commit incorrectly, use `git bisect log > bisect.log`, edit the log to fix the mistake, then `git bisect reset` and `git bisect replay bisect.log`. For merge-heavy histories, bisect automatically handles following the first parent by default. You can limit the bisect to specific paths with `git bisect start -- <path>`, which is useful in monorepos where a bug is known to be in a specific directory.',
            code: `# Use custom terms for non-bug bisection
git bisect start --term-old=slow --term-new=fast
git bisect fast HEAD
git bisect slow v1.0.0

# Limit bisect to specific path
git bisect start -- src/auth/

# Save and replay bisect session
git bisect log > bisect.log
git bisect reset
# Edit bisect.log if needed, then:
git bisect replay bisect.log

# Visualize remaining suspects
git bisect visualize --oneline

# View the current bisect status
git bisect view`,
            note: 'Custom terms (`--term-old`/`--term-new`) make bisect useful beyond bugs: find when a feature was added, when performance changed, or when a file was introduced.',
          },
        ],
        quiz: [
          {
            question: 'What is the time complexity of git bisect?',
            options: ['O(n)', 'O(n/2)', 'O(log n)', 'O(1)'],
            correctIndex: 2,
            explanation:
              'Git bisect uses binary search, which has O(log n) complexity. For 1000 commits, it takes about 10 steps.',
          },
          {
            question: 'What exit code should a bisect run script return to skip a commit?',
            options: ['0', '1', '125', '255'],
            correctIndex: 2,
            explanation:
              'Exit code 125 tells git bisect to skip the current commit. Code 0 means good, and any other non-zero (except 125) means bad.',
          },
          {
            question: 'How do you start an automated bisect?',
            options: [
              'git bisect auto <script>',
              'git bisect run <script>',
              'git bisect test <script>',
              'git bisect exec <script>',
            ],
            correctIndex: 1,
            explanation:
              '`git bisect run <script>` automates the bisection by running the given script at each step and using its exit code to mark commits.',
          },
        ],
      },
      {
        id: 'git-amend',
        title: 'Amending Commits',
        difficulty: 'intermediate',
        tags: ['git', 'amend', 'commit', 'fix', 'message'],
        sections: [
          {
            heading: 'Fixing the Last Commit',
            content:
              'The `git commit --amend` command lets you modify the most recent commit. It replaces the tip of the current branch with a new commit that combines the existing commit with any staged changes and/or a new commit message. This is incredibly useful for fixing typos in commit messages, adding files you forgot to include, or making small corrections right after committing. Technically, amend does not modify the existing commit (commits are immutable in Git). Instead, it creates a new commit with a new SHA hash and points the branch to this new commit. The old commit becomes unreachable but remains in the object database until garbage collection removes it (accessible via reflog in the meantime). Because amend changes the commit hash, you should avoid amending commits that have already been pushed to a shared remote branch unless you coordinate with your team.',
            code: `# Fix the commit message
git commit --amend -m "Correct commit message"

# Open editor to modify the message
git commit --amend

# Add a forgotten file to the last commit
git add forgotten_file.ts
git commit --amend --no-edit

# Change the author of the last commit
git commit --amend --author="Name <email@example.com>"

# Amend with a new date
git commit --amend --date="2024-06-15T10:00:00"`,
            tip: 'Use `--no-edit` when you want to add files to the last commit without changing its message.',
          },
          {
            heading: 'Amending Staged Changes',
            content:
              'A common workflow is to realize immediately after committing that you forgot to include a file or need to make a small fix. Instead of creating a new commit for this minor change, you stage the additional changes with `git add` and then run `git commit --amend`. The amended commit will contain all the original changes plus your newly staged changes, and the commit message can optionally be updated. This keeps your commit history clean by avoiding unnecessary "oops, forgot this file" commits. You can also use `--amend` to remove files from a commit: use `git rm --cached <file>` to unstage a file, then amend. Another pattern is using `git reset HEAD~1 --soft` as an alternative to amend when you need more flexibility. This uncommits the last commit but keeps everything staged, letting you make arbitrary changes before recommitting. However, for simple additions and message fixes, `--amend` is more straightforward and expressive.',
            code: `# Add forgotten files and amend
git add src/utils.ts src/helpers.ts
git commit --amend --no-edit

# Remove a file that should not have been committed
git rm --cached secrets.env
git commit --amend --no-edit

# Amend to include all tracked changes
git add -u
git commit --amend

# Alternative: soft reset and recommit
git reset --soft HEAD~1
# Make changes, stage them
git add .
git commit -m "Revised commit message"`,
            warning: 'Never amend commits that have been pushed to a shared branch without coordinating with your team, as it rewrites history and causes divergence.',
          },
          {
            heading: 'Amending Older Commits',
            content:
              'While `--amend` only works on the most recent commit, you can fix older commits using interactive rebase. The workflow involves starting an interactive rebase that includes the target commit, marking it with the `edit` action, making your changes, amending that commit, and then continuing the rebase. Git also provides the `fixup` and `squash` workflow for this: create a new commit with the fix, then use interactive rebase to combine it with the original. The `--fixup` flag simplifies this by creating a specially named commit that interactive rebase automatically matches with its target. Running `git rebase -i --autosquash` then handles the reordering and squashing automatically. For frequent use, you can set `rebase.autoSquash=true` in your Git config so that fixup commits are always handled automatically during interactive rebases. This pattern is extremely popular in code review workflows where reviewers request changes to specific commits in a branch.',
            code: `# Create a fixup commit for an older commit
git add fixed_file.ts
git commit --fixup=abc1234

# Autosquash during interactive rebase
git rebase -i --autosquash main

# Manual approach: edit an older commit
git rebase -i HEAD~5
# In the editor, change 'pick' to 'edit' for the target commit
# Make your changes, then:
git add .
git commit --amend --no-edit
git rebase --continue

# Enable autosquash by default
git config --global rebase.autoSquash true`,
            note: 'The `--fixup` and `--autosquash` workflow is the cleanest way to fix older commits. It is widely used in code review processes to address review feedback.',
          },
        ],
        challenge: {
          prompt:
            'You just made a commit but realized you forgot to add the file `src/validation.ts` and the commit message has a typo. Fix both issues in a single amend operation.',
          starterCode: `# The file src/validation.ts exists but was not included in the last commit
# The commit message currently reads "Add user athentication"
# Fix both the missing file and the typo in one amend

`,
          solutionCode: `git add src/validation.ts
git commit --amend -m "Add user authentication"`,
          hints: [
            'First stage the forgotten file with git add',
            'Use git commit --amend with -m to change the message',
            'Both the staged file and new message are applied in one amend',
          ],
        },
      },
      {
        id: 'git-recovery',
        title: 'Recovering Lost Work',
        difficulty: 'advanced',
        tags: ['git', 'recovery', 'dangling', 'fsck', 'ORIG_HEAD', 'lost-found'],
        sections: [
          {
            heading: 'ORIG_HEAD and Recovery References',
            content:
              'Git maintains several special references that aid in recovery. `ORIG_HEAD` is set automatically before dangerous operations like `merge`, `rebase`, and `reset`. It points to where HEAD was before the operation, providing an immediate undo path. After a bad merge, `git reset --hard ORIG_HEAD` instantly returns you to the pre-merge state. Similarly, `MERGE_HEAD` points to the commit being merged during a merge operation, and `REBASE_HEAD` points to the current commit being applied during a rebase. The `FETCH_HEAD` reference records the remote branch tips from the last fetch. These special references are stored as files in the `.git/` directory and are overwritten by subsequent operations, so you should use them promptly. For more persistent recovery, the reflog (as discussed earlier) maintains a history of all HEAD movements. Understanding these references gives you confidence to perform complex operations knowing you always have a way back.',
            code: `# Undo a merge using ORIG_HEAD
git merge feature/complex
# Something went wrong...
git reset --hard ORIG_HEAD

# Undo a rebase
git rebase main
# Rebase went wrong...
git reset --hard ORIG_HEAD

# Check what ORIG_HEAD points to
git log -1 ORIG_HEAD

# View all special references
ls .git/ORIG_HEAD .git/MERGE_HEAD .git/FETCH_HEAD 2>/dev/null

# Diff against pre-operation state
git diff ORIG_HEAD HEAD`,
            tip: 'Immediately after a problematic merge or rebase, use `git reset --hard ORIG_HEAD` before performing any other operations, as ORIG_HEAD gets overwritten by the next dangerous operation.',
          },
          {
            heading: 'Finding Dangling Commits with fsck',
            content:
              'When commits become unreachable (no branch or tag points to them), they become "dangling" objects in Git\'s object database. The `git fsck` command (file system check) inspects the repository and reports dangling commits, blobs, and trees. This is your last resort when the reflog has expired or been cleared. Dangling commits survive until garbage collection runs with `git gc`. A common scenario is recovering work from a deleted branch whose reflog entries have expired. Running `git fsck --lost-found` writes dangling commit objects into the `.git/lost-found/commit/` directory, making them easier to inspect. You can then examine each with `git show` or `git log` to find the one you need. For dangling blobs (individual file versions), they appear in `.git/lost-found/other/`. This technique has saved countless developers from losing important work that seemed permanently gone after aggressive repository cleanups or botched rebases.',
            code: `# Find dangling objects
git fsck --no-reflogs

# Find and save dangling objects to lost-found
git fsck --lost-found

# List dangling commits
git fsck --lost-found 2>&1 | grep "dangling commit"

# Inspect a dangling commit
git show <dangling-commit-hash>
git log --oneline <dangling-commit-hash>

# Recover a dangling commit to a new branch
git branch recovered-work <dangling-commit-hash>

# Inspect lost-found directory
ls .git/lost-found/commit/
ls .git/lost-found/other/`,
            warning: 'Dangling objects are removed by `git gc`. If you suspect lost work, avoid running garbage collection until you have recovered what you need.',
          },
          {
            heading: 'Advanced Recovery Techniques',
            content:
              'For deeply buried recovery scenarios, Git provides several additional techniques. If you know a file\'s content but not which commit it belonged to, you can search through all objects: `git log --all --full-history -- <path>` finds every commit that touched a file, even on deleted branches. The `git cat-file` command lets you inspect raw Git objects when you have a hash but are not sure what it is. If you need to recover from a corrupted repository, `git fsck --full` performs a comprehensive integrity check. For recovering stashed work that was accidentally dropped, `git fsck --no-reflogs | grep "dangling commit"` often reveals the stash commits since they become dangling when dropped. You can also search commit messages across all refs including the reflog: `git log --all --reflog --grep="keyword"`. In extreme cases, if you know even a fragment of the content, you can search the Git object database directly by examining pack files, though this is rarely necessary.',
            code: `# Find all commits that touched a file (including deleted branches)
git log --all --full-history -- path/to/file.ts

# Search all objects for specific content
git log --all --reflog --grep="feature keyword"

# Inspect a raw Git object
git cat-file -t <hash>   # show type (commit, tree, blob)
git cat-file -p <hash>   # print content

# Recover a dropped stash
git fsck --no-reflogs | grep "dangling commit"
# Check each for stash-like content:
git show <hash>
# Recover it:
git stash apply <hash>

# Full integrity check
git fsck --full --strict

# Find commits by date range across all refs
git log --all --reflog --after="2024-01-01" --before="2024-01-15"`,
            analogy: 'Git\'s object database is like a warehouse where nothing is truly thrown away until the cleanup crew (garbage collection) arrives. Even items removed from the shelves (branches) are still sitting on the floor (dangling objects) waiting to be found.',
          },
        ],
        quiz: [
          {
            question: 'When is ORIG_HEAD set?',
            options: [
              'After every commit',
              'Before dangerous operations like merge, rebase, and reset',
              'Only during interactive rebase',
              'When pushing to remote',
            ],
            correctIndex: 1,
            explanation:
              'ORIG_HEAD is automatically set before operations that move HEAD significantly, such as merge, rebase, and reset, providing an easy undo path.',
          },
          {
            question: 'What command finds dangling (unreachable) commits?',
            options: [
              'git log --dangling',
              'git reflog --lost',
              'git fsck --lost-found',
              'git status --orphaned',
            ],
            correctIndex: 2,
            explanation:
              '`git fsck --lost-found` inspects the object database for unreachable objects and saves them to `.git/lost-found/` for easy recovery.',
          },
          {
            question: 'What removes dangling objects permanently?',
            options: [
              'git clean -f',
              'git gc (garbage collection)',
              'git reset --hard',
              'git prune --dry-run',
            ],
            correctIndex: 1,
            explanation:
              '`git gc` (garbage collection) permanently removes unreachable objects whose reflog entries have expired. Until then, dangling objects persist in the database.',
          },
        ],
      },
    ],
  },
  {
    id: 'git-advanced',
    title: 'Advanced Git',
    icon: '🔧',
    entries: [
      {
        id: 'git-interactive-rebase',
        title: 'Interactive Rebase',
        difficulty: 'advanced',
        tags: ['git', 'rebase', 'interactive', 'squash', 'fixup', 'history'],
        sections: [
          {
            heading: 'Interactive Rebase Fundamentals',
            content:
              'Interactive rebase (`git rebase -i`) is one of Git\'s most powerful features for crafting clean, meaningful commit histories. It opens an editor showing a list of commits with action keywords, allowing you to reorder, squash, edit, drop, or reword commits before they are replayed onto a base. Each line represents a commit with an action prefix: `pick` keeps the commit as-is, `reword` lets you change the message, `edit` pauses to let you amend the commit, `squash` combines with the previous commit (prompting for a new message), `fixup` combines like squash but discards the message, and `drop` removes the commit entirely. The commits are listed oldest to newest (opposite of `git log`), and they are replayed in that order. Interactive rebase is essential for preparing feature branches before merging, transforming a messy development history into a logical sequence of well-described changes.',
            code: `# Interactive rebase of the last 5 commits
git rebase -i HEAD~5

# Interactive rebase onto main
git rebase -i main

# Example editor content:
# pick a1b2c3d Add user model
# squash d4e5f6a Fix typo in user model
# pick b7c8d9e Add authentication service
# reword e0f1a2b Add login endpoint
# drop c3d4e5f WIP: debugging
# fixup f6a7b8c Fix linting errors

# After saving, Git replays the commits with your changes`,
            warning: 'Never rebase commits that have been pushed to a shared branch. Rewriting shared history causes divergence and confusion for collaborators.',
          },
          {
            heading: 'Squash, Fixup, and Reword',
            content:
              'The most common interactive rebase actions are squash, fixup, and reword. Squashing combines multiple commits into one, prompting you to write a new combined message. This is ideal for collapsing a series of incremental "WIP" commits into a single meaningful commit. Fixup is like squash but automatically discards the fixup commit\'s message, keeping only the target commit\'s message. This is perfect for small corrections that do not need their own description. Reword changes only the commit message without altering the commit\'s content, useful for fixing typos or improving descriptions. A powerful pattern is the fixup workflow: as you develop, create commits with `git commit --fixup=<hash>` naming the target commit. When ready to clean up, run `git rebase -i --autosquash`, and Git automatically reorders the fixup commits next to their targets and marks them as fixup. This workflow is especially popular in code review processes where you need to address feedback on specific commits.',
            code: `# Squash last 3 commits interactively
git rebase -i HEAD~3
# Change 'pick' to 'squash' (or 's') for commits to combine

# Create fixup commits during development
git add .
git commit --fixup=abc1234

# Auto-squash fixup commits
git rebase -i --autosquash main

# Reword a commit message
git rebase -i HEAD~3
# Change 'pick' to 'reword' (or 'r') for the target commit

# Enable autosquash globally
git config --global rebase.autoSquash true`,
            tip: 'Set `rebase.autoSquash=true` globally so that fixup and squash commits are automatically matched during every interactive rebase.',
          },
          {
            heading: 'Splitting and Editing Commits',
            content:
              'The `edit` action in interactive rebase pauses the rebase at a specific commit, allowing you to make arbitrary changes. The most sophisticated use is splitting a commit into multiple smaller commits. When Git pauses at the edited commit, run `git reset HEAD~1` to uncommit the changes while keeping them in the working directory. Then selectively stage and commit portions of the changes to create multiple focused commits. When finished, run `git rebase --continue` to proceed. You can also use `edit` to add, remove, or modify files within a historical commit. For reordering commits, simply rearrange the lines in the interactive rebase editor. Be aware that reordering can cause conflicts if later commits depend on earlier ones. If conflicts arise during a rebase, resolve them, stage the resolutions, and run `git rebase --continue`. To abort a problematic rebase at any point, use `git rebase --abort` to return to the pre-rebase state.',
            code: `# Split a commit into multiple commits
git rebase -i HEAD~4
# Mark the commit with 'edit'
# When Git pauses:
git reset HEAD~1
git add src/models/user.ts
git commit -m "Add User model"
git add src/services/auth.ts
git commit -m "Add authentication service"
git rebase --continue

# Handle conflicts during rebase
# After resolving conflicts:
git add resolved_file.ts
git rebase --continue

# Abort a rebase
git rebase --abort

# Skip a problematic commit during rebase
git rebase --skip`,
            note: 'When splitting commits, use `git add -p` for partial staging to create precise, atomic commits from a single large changeset.',
          },
        ],
        quiz: [
          {
            question: 'What does the `fixup` action do in interactive rebase?',
            options: [
              'Fixes syntax errors in the commit',
              'Combines with the previous commit, keeping only the previous commit message',
              'Skips the commit entirely',
              'Pauses to let you edit the commit',
            ],
            correctIndex: 1,
            explanation:
              'Fixup combines the commit with the preceding one and automatically discards the fixup commit\'s message, keeping only the target commit\'s message.',
          },
          {
            question: 'In what order are commits listed in the interactive rebase editor?',
            options: [
              'Newest first (like git log)',
              'Oldest first (chronological)',
              'Alphabetical by message',
              'Random order',
            ],
            correctIndex: 1,
            explanation:
              'Interactive rebase lists commits from oldest to newest (chronological order), which is the opposite of `git log`.',
          },
          {
            question: 'How do you split a commit during interactive rebase?',
            options: [
              'Use the "split" action keyword',
              'Use "edit", then reset HEAD~1, and create new commits',
              'Use "break" to pause and manually split',
              'Use "divide" followed by the number of parts',
            ],
            correctIndex: 1,
            explanation:
              'Mark the commit with "edit", then when paused, use `git reset HEAD~1` to uncommit changes, and create multiple new commits from the working directory.',
          },
        ],
      },
      {
        id: 'git-rerere',
        title: 'git rerere',
        difficulty: 'advanced',
        tags: ['git', 'rerere', 'conflict', 'resolution', 'reuse'],
        sections: [
          {
            heading: 'Reuse Recorded Resolution',
            content:
              'The `git rerere` (reuse recorded resolution) feature teaches Git to remember how you resolved merge conflicts so it can automatically apply the same resolution if the same conflict occurs again. This is particularly useful when you frequently rebase long-running feature branches, when you maintain topic branches that are regularly merged into an integration branch, or when you are resolving the same conflicts during repeated merge and revert cycles. When enabled, Git records the pre-merge state of conflicting files and the resolution you apply. The next time the exact same conflict arises, Git automatically resolves it using the recorded resolution. This happens transparently during merge, rebase, and cherry-pick operations. The feature stores its data in `.git/rr-cache/`, which contains the conflict fingerprints and their resolutions. Enabling rerere does not change any default behavior; it simply adds automatic conflict resolution on top of normal Git operations.',
            code: `# Enable rerere globally
git config --global rerere.enabled true

# Enable for current repo only
git config rerere.enabled true

# Check rerere status
git rerere status

# Show what rerere has recorded
git rerere diff

# Manually record current resolution
git rerere

# Forget a specific resolution
git rerere forget path/to/file.ts

# Clear all recorded resolutions
git rerere clear`,
            tip: 'Enable rerere globally with `git config --global rerere.enabled true`. It has no downside and can save significant time on long-lived branches.',
          },
          {
            heading: 'Rerere in Practice',
            content:
              'Consider a workflow where you maintain a feature branch that you regularly rebase onto main. Each rebase might produce the same conflicts that you have resolved before. Without rerere, you would need to resolve them manually every time. With rerere enabled, Git remembers your resolutions and applies them automatically. Another common scenario is the "merge-and-revert" pattern used for testing: you merge feature branches into an integration branch for testing, then revert the merges. When the features are ready, you merge them again, and rerere resolves the previously seen conflicts automatically. Rerere also shines when cherry-picking commits across branches, where the same conflicts tend to recur. The recorded resolutions are stored locally and are not shared between repositories by default. However, you can share them by copying the `.git/rr-cache/` directory or by using third-party tools designed for this purpose.',
            code: `# Typical rerere workflow
git config rerere.enabled true

# First time: merge and resolve conflicts manually
git merge feature/auth
# Resolve conflicts...
git add .
git commit  # rerere records the resolution

# Later: revert the merge for now
git revert -m 1 HEAD

# Even later: merge again - rerere auto-resolves!
git merge feature/auth
# "Resolved 'src/auth.ts' using previous resolution."

# During rebase: auto-resolves recurring conflicts
git rebase main
# rerere applies stored resolutions automatically

# Check what was auto-resolved
git rerere status
git diff  # verify the resolution`,
            note: 'Even with rerere, always review auto-resolved files before committing. The resolution might need updating if the surrounding code has changed significantly.',
          },
          {
            heading: 'Managing the Rerere Cache',
            content:
              'The rerere cache is stored in `.git/rr-cache/` and can be managed manually. Each recorded conflict gets a unique hash based on the conflict content, and the resolution is stored alongside it. Over time, this cache can grow if your repository has many recurring conflicts. The `git rerere gc` command cleans up old entries: resolutions older than 60 days (for resolved conflicts) or 15 days (for unresolved conflicts) are removed by default. You can customize these timeframes with `gc.rerereResolved` and `gc.rerereUnresolved` configuration options. If a recorded resolution produces incorrect results, use `git rerere forget <path>` to remove that specific resolution so you can re-resolve it correctly next time. The `git rerere clear` command removes all recorded resolutions, useful when starting fresh. For teams wanting to share resolutions, the `.git/rr-cache/` directory can be committed to a separate shared repository, though this practice is uncommon and requires careful coordination.',
            code: `# View the rerere cache
ls .git/rr-cache/

# Run garbage collection on rerere cache
git rerere gc

# Configure rerere cache retention
git config gc.rerereResolved 90   # days for resolved
git config gc.rerereUnresolved 30  # days for unresolved

# Forget a bad resolution for a specific file
git rerere forget src/config.ts

# Clear all recorded resolutions
git rerere clear

# Share rerere cache (advanced)
# In a shared-rr-cache repo:
cp -r .git/rr-cache/* /path/to/shared-rr-cache/
# On another machine:
cp -r /path/to/shared-rr-cache/* .git/rr-cache/`,
            analogy: 'Rerere is like a conflict resolution journal. The first time you solve a dispute, you write down the solution. The next time the same dispute arises, you just look up your notes instead of thinking through the problem again.',
          },
        ],
      },
      {
        id: 'git-filter-repo',
        title: 'Rewriting History',
        difficulty: 'advanced',
        tags: ['git', 'filter-repo', 'BFG', 'sensitive-data', 'history-rewrite'],
        sections: [
          {
            heading: 'Why Rewrite History',
            content:
              'Sometimes you need to fundamentally alter the repository history: removing accidentally committed sensitive data (passwords, API keys, private keys), removing large binary files that bloat the repository, changing author information across many commits, or restructuring the repository. Unlike interactive rebase, which works on recent commits, history rewriting tools can modify every commit in the repository. The modern tool for this is `git-filter-repo`, which replaced the older `git filter-branch` command. The `git-filter-repo` tool is significantly faster, safer, and easier to use than `filter-branch`. GitHub and GitLab both recommend it. Another popular tool is BFG Repo-Cleaner, which specializes in removing large files and sensitive data with a simple interface. History rewriting is a serious operation that affects every collaborator, so it should be coordinated carefully and everyone must re-clone or force-update their local repositories afterward.',
            code: `# Install git-filter-repo
pip install git-filter-repo

# Remove a file from all history
git filter-repo --path secrets.env --invert-paths

# Remove a directory from all history
git filter-repo --path node_modules/ --invert-paths

# Replace sensitive strings in all files across history
git filter-repo --replace-text expressions.txt
# expressions.txt contains lines like:
# PASSWORD123==>***REMOVED***
# regex:API_KEY=[A-Za-z0-9]+==>[REDACTED]

# Using BFG (alternative tool)
java -jar bfg.jar --delete-files secrets.env
java -jar bfg.jar --replace-text passwords.txt`,
            warning: 'History rewriting changes every commit hash. All collaborators must re-clone the repository or use `git fetch --all && git reset --hard origin/main` after a force push.',
          },
          {
            heading: 'Removing Large Files and Sensitive Data',
            content:
              'Large binary files committed accidentally can permanently bloat a Git repository because Git stores the full content of every version. Even deleting the file in a later commit does not reclaim space since the old version persists in history. The `git-filter-repo` tool can remove these files from all history, dramatically shrinking the repository. For sensitive data like API keys or passwords, speed is critical: rotate the credentials immediately (they are compromised the moment they were pushed), then scrub the repository history. GitHub provides a guide for this process and can also invalidate cached views of the sensitive data. After running filter-repo, you need to force push the rewritten history and have all collaborators sync. The `--strip-blobs-bigger-than` flag is particularly useful for removing all files above a certain size without needing to know their names. Combined with `--analyze`, you can first review what filter-repo would change before committing to the operation.',
            code: `# Analyze repository before rewriting
git filter-repo --analyze
# Review .git/filter-repo/analysis/

# Remove all files larger than 10MB from history
git filter-repo --strip-blobs-bigger-than 10M

# Remove specific large files
git filter-repo --path data/huge-dataset.csv --invert-paths

# Remove sensitive data with replacement
echo 'my_secret_key==>REDACTED' > replacements.txt
git filter-repo --replace-text replacements.txt

# After rewriting, force push
git remote add origin https://github.com/user/repo.git
git push origin --force --all
git push origin --force --tags

# BFG: remove files bigger than 50M
java -jar bfg.jar --strip-blobs-bigger-than 50M`,
            tip: 'Always run `git filter-repo --analyze` first to understand the size impact of different files and directories before deciding what to remove.',
          },
          {
            heading: 'Changing Author Information and Advanced Rewrites',
            content:
              'Another common history rewrite task is fixing author information, such as when you committed with the wrong email address or need to update an old email. The `git-filter-repo` tool provides a `--mailmap` option that uses a standard mailmap file to remap author and committer information. You can also use callback functions for arbitrary transformations of commit metadata. The `--commit-callback` option accepts a Python function that can modify any aspect of a commit: its message, author, committer, parents, and more. For path-based transformations, `--path-rename` lets you move files and directories across all history, useful when restructuring a project. The `--subdirectory-filter` extracts a subdirectory into its own repository, preserving only the commits that affected it. These advanced features make filter-repo a Swiss Army knife for repository maintenance, but each operation rewrites all subsequent commits, so plan your transformations carefully to minimize disruption.',
            code: `# Fix author information using mailmap
echo "New Name <new@email.com> <old@email.com>" > mailmap
git filter-repo --mailmap mailmap

# Rename a directory across all history
git filter-repo --path-rename old-dir/:new-dir/

# Extract a subdirectory into its own repo
git filter-repo --subdirectory-filter packages/core/

# Custom commit callback (Python)
git filter-repo --commit-callback '
  if b"WIP" in commit.message:
    commit.message = commit.message.replace(b"WIP: ", b"")
'

# Combine multiple operations
git filter-repo \\
  --path secrets/ --invert-paths \\
  --path-rename lib/:src/lib/ \\
  --mailmap mailmap`,
            note: 'The `git-filter-repo` tool requires a fresh clone to operate. It refuses to run on a repository with uncommitted changes or existing remotes (use `--force` to override).',
          },
        ],
        challenge: {
          prompt:
            'Your repository accidentally has a file called `credentials.json` committed in its history. Write the commands to: 1) Analyze the repository, 2) Remove the file from all history, 3) Force push the cleaned history.',
          starterCode: `# Step 1: Analyze the repository to see the impact

# Step 2: Remove credentials.json from all history

# Step 3: Re-add the remote and force push
`,
          solutionCode: `# Step 1: Analyze the repository to see the impact
git filter-repo --analyze

# Step 2: Remove credentials.json from all history
git filter-repo --path credentials.json --invert-paths

# Step 3: Re-add the remote and force push
git remote add origin https://github.com/user/repo.git
git push origin --force --all
git push origin --force --tags`,
          hints: [
            'git filter-repo removes the remote after running, so you need to re-add it',
            'Use --invert-paths to exclude (remove) the specified path',
            'Force push both branches (--all) and tags (--tags)',
          ],
        },
      },
      {
        id: 'git-sparse-checkout',
        title: 'Sparse Checkout',
        difficulty: 'advanced',
        tags: ['git', 'sparse-checkout', 'monorepo', 'partial-clone', 'cone-mode'],
        sections: [
          {
            heading: 'Sparse Checkout Fundamentals',
            content:
              'Sparse checkout allows you to check out only a subset of files from a repository, which is invaluable for large monorepos where you only need specific directories. Instead of downloading and populating your working directory with the entire repository, sparse checkout materializes only the paths you specify. This significantly reduces disk usage and improves performance for repositories with millions of files. Git 2.25 introduced the `git sparse-checkout` command with "cone mode," which provides a simpler and faster pattern matching system based on directory paths rather than arbitrary gitignore-style patterns. In cone mode, you specify directories to include, and Git handles the rest. The feature works by modifying the skip-worktree bit on index entries, telling Git not to populate those files in the working directory. The repository still has the full history, but your working tree only contains the files you need.',
            code: `# Initialize sparse checkout in cone mode
git clone --no-checkout https://github.com/org/monorepo.git
cd monorepo
git sparse-checkout init --cone

# Add directories to checkout
git sparse-checkout set packages/frontend packages/shared
git checkout main

# Add more directories
git sparse-checkout add packages/backend

# List current sparse checkout paths
git sparse-checkout list

# Disable sparse checkout (get all files back)
git sparse-checkout disable`,
            tip: 'Always use cone mode (`--cone`) for sparse checkout. It is significantly faster than the legacy non-cone mode and covers the vast majority of use cases.',
          },
          {
            heading: 'Partial Clone with Sparse Checkout',
            content:
              'Sparse checkout is even more powerful when combined with partial clone, which avoids downloading Git objects you do not need. A standard clone downloads every blob (file version) in the repository history. A blobless partial clone (`--filter=blob:none`) downloads commits and trees but fetches blobs on demand. A treeless partial clone (`--filter=tree:0`) goes further, only downloading commit objects initially. When combined with sparse checkout, this means you only download the content for the directories you are actually working on, and Git fetches additional blobs as needed. This can reduce clone time from hours to seconds for massive repositories. The tradeoff is that some operations (like `git log -p` on files outside your sparse paths) trigger network requests. For CI/CD pipelines that only need specific directories, the combination of `--depth=1` (shallow clone), `--filter=blob:none`, and sparse checkout minimizes both time and bandwidth.',
            code: `# Blobless partial clone + sparse checkout
git clone --filter=blob:none --sparse \\
  https://github.com/org/monorepo.git
cd monorepo
git sparse-checkout set services/api/

# Treeless partial clone (even less data)
git clone --filter=tree:0 --sparse \\
  https://github.com/org/monorepo.git

# CI-optimized: shallow + partial + sparse
git clone --depth=1 --filter=blob:none --sparse \\
  https://github.com/org/monorepo.git
cd monorepo
git sparse-checkout set packages/my-service/

# Check what objects are local vs. lazy
git count-objects -v`,
            note: 'Partial clone requires server support. GitHub, GitLab, and Bitbucket all support partial clone. Self-hosted Git servers may need configuration.',
          },
          {
            heading: 'Monorepo Workflows with Sparse Checkout',
            content:
              'In monorepo environments, sparse checkout enables teams to work efficiently on their specific services or packages without being impacted by the rest of the repository. A typical setup involves each team defining their sparse checkout paths in a setup script or documentation. The root-level files (package.json, CI config, shared tooling) are always included in cone mode, and teams add their specific directories on top. When switching between projects, you can adjust sparse paths dynamically. One challenge is that build tools and IDEs may not fully understand sparse checkouts, so you might need to configure them to ignore missing references. For cross-team changes that touch multiple services, developers temporarily expand their sparse checkout, make the changes, and then revert to their focused checkout. Git commands like `git log`, `git diff`, and `git blame` work correctly even for files outside the sparse checkout since the data is in the object database, though it may trigger lazy fetches with partial clones.',
            code: `# Team-specific setup script
#!/bin/bash
SERVICE=$1
git sparse-checkout set \\
  "services/$SERVICE/" \\
  "packages/shared/" \\
  "configs/" \\
  "scripts/"

# Temporarily expand for cross-team work
git sparse-checkout add services/other-team/

# Remove a directory from checkout
git sparse-checkout set services/my-service/ packages/shared/

# Work with files outside sparse checkout
git log -- services/other/file.ts  # works (history)
git show HEAD:services/other/file.ts  # works (content)

# CI pipeline with sparse checkout
git clone --depth=1 --filter=blob:none --sparse $REPO_URL
cd repo
git sparse-checkout set "services/$SERVICE_NAME/" "packages/shared/"
npm install
npm test`,
            tip: 'Create a `.sparse-checkout-profiles/` directory in your monorepo with predefined sparse checkout configurations for each team, making onboarding faster.',
          },
        ],
        quiz: [
          {
            question: 'What does cone mode in sparse checkout restrict patterns to?',
            options: [
              'Arbitrary gitignore patterns',
              'Directory-based paths only',
              'File extensions only',
              'Regex patterns',
            ],
            correctIndex: 1,
            explanation:
              'Cone mode restricts sparse checkout patterns to directory-based paths, which is simpler and significantly faster than arbitrary gitignore-style patterns.',
          },
          {
            question: 'What does `--filter=blob:none` do during clone?',
            options: [
              'Removes all blobs from the repository',
              'Downloads commits and trees but fetches blobs lazily on demand',
              'Only downloads the latest version of each file',
              'Compresses blobs for faster download',
            ],
            correctIndex: 1,
            explanation:
              'A blobless partial clone downloads the commit and tree objects but defers downloading file contents (blobs) until they are actually needed.',
          },
          {
            question: 'Which command lists the current sparse checkout paths?',
            options: [
              'git sparse-checkout show',
              'git sparse-checkout paths',
              'git sparse-checkout list',
              'git sparse-checkout status',
            ],
            correctIndex: 2,
            explanation:
              '`git sparse-checkout list` displays the directories currently included in the sparse checkout configuration.',
          },
        ],
      },
      {
        id: 'git-patches',
        title: 'Working with Patches',
        difficulty: 'advanced',
        tags: ['git', 'patches', 'format-patch', 'am', 'apply'],
        sections: [
          {
            heading: 'Creating Patches with format-patch',
            content:
              'The `git format-patch` command creates email-formatted patch files from commits, which can be sent to others and applied to their repositories. Each patch file contains the commit metadata (author, date, message) plus the diff. This is the traditional way of sharing changes in open-source projects that use mailing-list-based workflows, notably the Linux kernel. Each commit generates one `.patch` file, numbered sequentially. The patches are self-contained and can be applied in order to reproduce the exact same commits. The format-patch command accepts the same revision range syntax as `git log`, so you can create patches for specific commits, ranges, or branches. Patches are human-readable text files that can be reviewed, emailed, stored, or even edited before application. They provide a way to transfer changes between repositories that have no direct connection, making them useful for air-gapped environments, cross-fork contributions, and situations where push access is not available.',
            code: `# Create patches for the last 3 commits
git format-patch -3

# Create patches for commits since main
git format-patch main

# Create patches for a specific range
git format-patch abc1234..def5678

# Output to a specific directory
git format-patch -o patches/ main

# Create a single combined patch file
git format-patch main --stdout > feature.patch

# Include a cover letter
git format-patch main --cover-letter
# Edit the generated 0000-cover-letter.patch

# Add a prefix for version tracking
git format-patch main --subject-prefix="PATCH v2"`,
            tip: 'Use `--cover-letter` when sending a patch series to provide an overview explaining the purpose and context of the entire series.',
          },
          {
            heading: 'Applying Patches with am and apply',
            content:
              'Git provides two commands for applying patches: `git am` and `git apply`. The `git am` (apply mailbox) command is designed for format-patch output and creates commits with the original author information, date, and commit message preserved. It is the counterpart to `git format-patch` and maintains the full commit metadata. The `git apply` command is simpler: it applies a diff to the working directory without creating a commit, similar to the Unix `patch` command but Git-aware. Use `git am` for format-patch output and `git apply` for raw diffs. When `git am` encounters conflicts, it stops and lets you resolve them, similar to a rebase conflict. After resolving, use `git am --continue` to proceed. You can abort with `git am --abort`. The `--3way` flag enables three-way merge conflict resolution, which often produces better results than the default two-way application.',
            code: `# Apply patch files with git am (preserves commit info)
git am patches/*.patch

# Apply with 3-way merge for better conflict resolution
git am --3way feature.patch

# Apply a single patch
git am 0001-Add-user-model.patch

# Handle conflicts during am
git am 0001-patch.patch
# ... resolve conflicts ...
git add resolved_file.ts
git am --continue

# Abort a failed am
git am --abort

# Apply a raw diff (no commit created)
git apply changes.diff

# Check if a patch applies cleanly
git apply --check feature.patch

# Apply in reverse (undo a patch)
git apply -R feature.patch`,
            note: 'Use `git am` for format-patch output (preserves commits), and `git apply` for raw diffs (only modifies working tree). They serve different purposes.',
          },
          {
            heading: 'Patch Workflows and Email',
            content:
              'The patch-based workflow predates platforms like GitHub and remains the standard for projects like the Linux kernel, Git itself, and many other major open-source projects. In this workflow, developers create patches with `format-patch`, send them via email using `git send-email`, and maintainers apply them with `git am`. The `git send-email` command integrates with SMTP servers to send properly formatted patch emails. Each patch becomes an email in a thread, with the cover letter as the thread starter. Reviewers reply inline to the email, discussing specific changes. This workflow scales exceptionally well for large distributed projects and does not require centralized platforms. For non-email use, patches work well for code reviews through other channels, transferring changes between disconnected systems, creating reproducible change bundles for deployment, and archiving specific changes. The patch format is also useful for creating backports: apply a patch from the development branch to the stable branch when cherry-pick is not straightforward.',
            code: `# Configure git send-email
git config sendemail.smtpServer smtp.example.com
git config sendemail.smtpServerPort 587
git config sendemail.smtpEncryption tls

# Send patches via email
git send-email --to=maintainer@example.com patches/*.patch

# Send with cover letter
git format-patch main --cover-letter -o patches/
# Edit patches/0000-cover-letter.patch
git send-email --to=list@project.org patches/

# Create a patch from staged changes (no commit needed)
git diff --cached > staged-changes.patch

# Create a patch from working tree changes
git diff > working-changes.patch

# Apply patches from stdin (piped from email)
cat email.mbox | git am`,
            analogy: 'Patches are like written letters containing instructions for changes. You can mail them to anyone, they can read and review them, and then follow the instructions to make the same changes in their copy of the project.',
          },
        ],
      },
      {
        id: 'git-notes',
        title: 'git notes',
        difficulty: 'advanced',
        tags: ['git', 'notes', 'metadata', 'annotations', 'SHA'],
        sections: [
          {
            heading: 'Adding Metadata Without Changing History',
            content:
              'Git notes allow you to attach arbitrary metadata to commits without modifying the commits themselves. Since notes are stored separately from the commit objects, they do not change the commit SHA hash. This makes them ideal for adding information after the fact: code review comments, CI/CD build results, deployment records, bug tracker references, or any annotation that should be associated with a commit but was not part of the original message. Notes are stored in a special `refs/notes/` namespace and are displayed automatically by `git log` when present. Each commit can have multiple notes under different namespaces (called "refs"). The default namespace is `refs/notes/commits`, but you can create custom namespaces like `refs/notes/review` or `refs/notes/deploy`. This separation of concerns is powerful: the commit history remains immutable while rich metadata accumulates alongside it over time.',
            code: `# Add a note to the latest commit
git notes add -m "Reviewed by: Jane, approved for production"

# Add a note to a specific commit
git notes add -m "Build #1234 passed" abc1234

# View notes on a commit
git log --show-notes

# Edit an existing note
git notes edit abc1234

# Add multiline note from editor
git notes add abc1234
# Opens editor for note content

# Append to an existing note (instead of replacing)
git notes append -m "Deployed to staging 2024-06-15" abc1234`,
            tip: 'Use `git notes append` instead of `git notes add` when you want to add information to an existing note without overwriting it.',
          },
          {
            heading: 'Note Namespaces and Organization',
            content:
              'Namespaces let you categorize notes by purpose. Instead of putting all metadata into the default notes ref, you can create dedicated namespaces for different types of annotations. For example, `refs/notes/review` for code review notes, `refs/notes/deploy` for deployment information, and `refs/notes/perf` for performance benchmarks. Each namespace is independent, so a commit can have notes in multiple namespaces simultaneously. You specify the namespace with the `--ref` flag. When viewing notes, you can show specific namespaces or all namespaces at once. This organizational structure keeps metadata clean and queryable. Automated systems can write to their own namespaces without interfering with human-added notes. For example, your CI system might automatically add build status notes, your deployment tool might add deployment timestamps, and developers might add review comments, all on the same commits but in separate namespaces.',
            code: `# Add note in a custom namespace
git notes --ref=review add -m "LGTM - approved" HEAD
git notes --ref=deploy add -m "Deployed to prod 2024-06-15" HEAD
git notes --ref=perf add -m "Benchmark: 150ms avg response" HEAD

# View notes from a specific namespace
git log --show-notes=review

# View notes from all namespaces
git log --show-notes="*"

# List all note refs
git for-each-ref refs/notes/

# Remove a note from a specific namespace
git notes --ref=review remove abc1234

# Copy notes from one commit to another
git notes copy abc1234 def5678`,
            note: 'Each namespace stores notes independently. A note in `refs/notes/review` does not affect or appear in `refs/notes/commits` (the default namespace).',
          },
          {
            heading: 'Sharing and Syncing Notes',
            content:
              'By default, Git does not push or fetch notes automatically. You must explicitly push and fetch note refs. This is intentional since notes are often local annotations that should not clutter the shared repository. However, for team-shared metadata like code review notes or CI results, you can configure Git to sync notes automatically. The `remote.origin.fetch` config can be extended to include notes refs, and pushes can be configured similarly. When notes are shared, merge conflicts can occur if two people annotate the same commit. Git handles note merges with strategies similar to branch merges. The `notes.mergeStrategy` config can be set to `union` (combine both notes), `ours`, `theirs`, or `cat_sort_uniq`. For automated systems that push notes, the `union` strategy works well since it appends new information without losing existing notes. Be mindful of repository size when extensively using notes, as each note is a Git object that contributes to the repository footprint.',
            code: `# Push notes to remote
git push origin refs/notes/commits
git push origin "refs/notes/*"

# Fetch notes from remote
git fetch origin refs/notes/commits:refs/notes/commits
git fetch origin "refs/notes/*:refs/notes/*"

# Configure auto-fetch of notes
git config --add remote.origin.fetch "+refs/notes/*:refs/notes/*"

# Configure note merge strategy
git config notes.mergeStrategy union

# Merge notes from another ref
git notes merge refs/notes/review

# Prune notes for deleted commits
git notes prune

# Push notes in CI pipeline
#!/bin/bash
git notes --ref=ci add -m "Build $BUILD_ID: $STATUS" HEAD
git push origin refs/notes/ci`,
            tip: 'Add `"+refs/notes/*:refs/notes/*"` to your fetch refspec to automatically receive notes from collaborators on every fetch.',
          },
        ],
      },
      {
        id: 'git-attributes',
        title: '.gitattributes',
        difficulty: 'advanced',
        tags: ['git', 'gitattributes', 'line-endings', 'diff', 'merge-strategy'],
        sections: [
          {
            heading: 'Controlling Line Endings',
            content:
              'The `.gitattributes` file configures how Git handles specific file types in your repository. One of its most critical roles is managing line endings across different operating systems. Windows uses CRLF (carriage return + line feed), while Unix/macOS uses LF (line feed only). Without proper configuration, cross-platform teams encounter constant line-ending changes that clutter diffs and create merge conflicts. The `text` attribute tells Git to normalize line endings: convert to LF in the repository and convert to the OS-native format on checkout. Setting `text=auto` lets Git detect text files automatically. For specific file types, you can force behavior: `text eol=lf` ensures Unix-style endings everywhere (common for shell scripts), while `text eol=crlf` forces Windows-style endings (for batch files). Binary files should be marked with the `binary` attribute to prevent Git from attempting text transformations or merge conflict markers that would corrupt them.',
            code: `# .gitattributes file for a typical project

# Auto-detect text files and normalize line endings
* text=auto

# Force LF for specific files
*.sh text eol=lf
*.py text eol=lf
*.js text eol=lf
*.ts text eol=lf
*.json text eol=lf
*.yml text eol=lf
*.md text eol=lf

# Force CRLF for Windows-specific files
*.bat text eol=crlf
*.cmd text eol=crlf
*.ps1 text eol=crlf

# Binary files - do not modify
*.png binary
*.jpg binary
*.gif binary
*.ico binary
*.woff binary
*.woff2 binary
*.ttf binary
*.pdf binary`,
            tip: 'Always commit a `.gitattributes` file early in your project to prevent line-ending issues. Run `git add --renormalize .` to fix existing files after adding the file.',
          },
          {
            heading: 'Custom Diff and Merge Drivers',
            content:
              'Gitattributes can configure custom diff drivers that tell Git how to display differences for specific file types. For example, you can make `git diff` show meaningful diffs for images, PDFs, or binary formats by specifying an external diff tool. The `diff` attribute can also disable diffing for generated files or large files that produce unreadable diffs. Similarly, the `merge` attribute controls how Git merges specific files. Setting `merge=ours` on a file means your version always wins during merges, which is useful for lock files, generated files, or files that should not be auto-merged. You can define custom merge drivers in `.gitconfig` that invoke specific tools or scripts for merging particular file types. The `linguist-*` attributes control how GitHub\'s linguist tool classifies files: `linguist-generated` marks files as generated (excluded from stats), `linguist-vendored` marks vendored dependencies, and `linguist-language` overrides the detected language for repository statistics.',
            code: `# Custom diff driver for images
# In .gitattributes:
*.png diff=exif

# In .gitconfig:
# [diff "exif"]
#   textconv = exiftool

# Disable diff for generated files
dist/** -diff
*.min.js -diff
*.min.css -diff

# Custom merge strategy: always keep ours
package-lock.json merge=ours
yarn.lock merge=ours

# GitHub linguist attributes
docs/** linguist-documentation
vendor/** linguist-vendored
*.generated.ts linguist-generated
*.proto linguist-language=Protobuf

# Configure merge driver in .gitconfig:
# [merge "ours"]
#   driver = true`,
            note: 'Custom diff drivers defined in `.gitattributes` require corresponding configuration in `.gitconfig`. The attributes file declares what to use; the config file defines how it works.',
          },
          {
            heading: 'Export and Archive Control',
            content:
              'The `export-ignore` attribute excludes files from `git archive` output, ensuring that development-only files like tests, CI configuration, documentation sources, and build scripts are not included in release tarballs or zip files. This is essential for producing clean distribution packages. Similarly, `export-subst` enables keyword substitution in exported files: Git replaces `$Format:...$` placeholders with actual values during archive creation. This lets you embed the commit hash, tag name, or date into distributed files without keeping them updated in the repository. Other useful attributes include `filter` for clean/smudge filters that transform file content on checkout and commit (useful for expanding templates or stripping secrets), `whitespace` for controlling whitespace error detection, and `encoding` for specifying text file encoding. The `.gitattributes` file can be placed in any directory to affect files in that directory, and entries in subdirectories override parent settings, similar to `.gitignore` scoping.',
            code: `# Exclude from git archive
.gitignore export-ignore
.gitattributes export-ignore
.github/ export-ignore
tests/ export-ignore
docs/ export-ignore
*.test.ts export-ignore
jest.config.js export-ignore
.eslintrc.js export-ignore
Makefile export-ignore

# Enable keyword substitution in archive
version.txt export-subst

# version.txt content:
# Version: $Format:%H$
# Date: $Format:%ci$
# Tag: $Format:%D$

# Whitespace handling
*.py whitespace=indent-with-non-tab,trailing-space
*.go whitespace=tab-in-indent

# Create archive (respects export-ignore)
git archive --format=tar.gz --prefix=myproject-v1.0/ \\
  -o release.tar.gz v1.0`,
            tip: 'Use `export-ignore` liberally in libraries and packages to keep release archives clean and professional, only including files end users need.',
          },
        ],
        challenge: {
          prompt:
            'Create a `.gitattributes` file for a TypeScript/Node.js project that: 1) Normalizes line endings for all text files, 2) Forces LF for JS/TS/JSON/YAML files, 3) Marks images as binary, 4) Excludes test and CI files from archives, 5) Marks lockfiles to use "ours" merge strategy.',
          starterCode: `# Write a .gitattributes file
# Include line ending normalization, binary handling, archive exclusion, and merge strategy

`,
          solutionCode: `# Auto-detect and normalize line endings
* text=auto

# Force LF for source files
*.js text eol=lf
*.ts text eol=lf
*.tsx text eol=lf
*.json text eol=lf
*.yml text eol=lf
*.yaml text eol=lf

# Binary files
*.png binary
*.jpg binary
*.jpeg binary
*.gif binary
*.svg binary
*.ico binary
*.woff binary
*.woff2 binary

# Exclude from archives
.github/ export-ignore
tests/ export-ignore
__tests__/ export-ignore
*.test.ts export-ignore
*.spec.ts export-ignore
jest.config.* export-ignore
.eslintrc.* export-ignore
tsconfig.test.json export-ignore

# Lockfile merge strategy
package-lock.json merge=ours
yarn.lock merge=ours`,
          hints: [
            'Use * text=auto for automatic line ending normalization',
            'Mark image formats with the binary attribute',
            'Use export-ignore for files that should not be in releases',
            'Set merge=ours for lockfiles to avoid merge conflicts',
          ],
        },
      },
      {
        id: 'git-archive',
        title: 'git archive',
        difficulty: 'advanced',
        tags: ['git', 'archive', 'tarball', 'zip', 'release'],
        sections: [
          {
            heading: 'Creating Archives from Repositories',
            content:
              'The `git archive` command creates a tar or zip archive of files from a repository at a specific commit, branch, or tag. Unlike simply zipping the working directory, `git archive` produces a clean export that excludes the `.git` directory, respects `export-ignore` attributes, and processes `export-subst` keywords. This makes it the proper tool for creating release distributions, source tarballs, and clean project snapshots. The command operates directly on the Git object database, so it works even on bare repositories and does not require a working directory. You can specify any tree-ish reference: a branch name, tag, commit hash, or even a path within a tree. The `--prefix` option is essential for creating well-structured archives where all files are contained within a named directory, following the standard convention for source distributions. Archives are reproducible: the same commit always produces the same archive content, though timestamps may vary unless you use `--prefix` consistently.',
            code: `# Create a tar.gz archive from a tag
git archive --format=tar.gz --prefix=myapp-v1.0/ \\
  -o myapp-v1.0.tar.gz v1.0

# Create a zip archive from HEAD
git archive --format=zip --prefix=myapp/ \\
  -o myapp-latest.zip HEAD

# Archive a specific branch
git archive --format=tar --prefix=myapp/ main | gzip > myapp.tar.gz

# Archive a subdirectory only
git archive --format=zip HEAD:src/ -o src-only.zip

# Archive with a specific commit
git archive --format=tar.gz --prefix=hotfix/ \\
  -o hotfix.tar.gz abc1234`,
            tip: 'Always use `--prefix=name/` (with trailing slash) to wrap archived files in a directory, following the standard convention for source distributions.',
          },
          {
            heading: 'Remote Archives and CI Integration',
            content:
              'The `git archive` command can create archives from remote repositories without cloning them first, using the `--remote` option. This is useful in CI/CD pipelines where you need a clean source snapshot without a full clone. However, note that many Git hosting services (including GitHub) disable the remote archive feature for security reasons. For GitHub, you can use the releases API or download source archives directly from the web interface instead. In CI pipelines, `git archive` is commonly used to create deployment packages that include only the files needed in production. By combining it with `.gitattributes` export-ignore rules, you ensure that test files, documentation source, CI configuration, and development tooling are excluded from the deployment package. This produces smaller, cleaner deployment artifacts. The archive command also supports the `--worktree-attributes` flag, which uses `.gitattributes` from the working tree instead of the index, useful when you are testing attribute changes before committing them.',
            code: `# Archive from a remote repository (if supported)
git archive --remote=git@github.com:org/repo.git \\
  --format=tar.gz --prefix=project/ v2.0 > project.tar.gz

# CI pipeline: create deployment package
#!/bin/bash
VERSION=$(git describe --tags --always)
git archive --format=tar.gz \\
  --prefix="deploy-$VERSION/" \\
  -o "deploy-$VERSION.tar.gz" HEAD

# Use worktree attributes (for testing)
git archive --worktree-attributes --format=zip \\
  -o release.zip HEAD

# Pipe to a remote server
git archive --format=tar HEAD | ssh server "tar -xf - -C /deploy/"

# Extract specific paths from archive
git archive HEAD -- src/ lib/ package.json | tar -xf -`,
            note: 'GitHub disables `--remote` for security. Use their API or web interface to download source archives from GitHub-hosted repositories.',
          },
          {
            heading: 'Advanced Archive Techniques',
            content:
              'Beyond basic usage, `git archive` supports several advanced features for sophisticated distribution workflows. You can archive only specific paths within the repository by listing them after the tree-ish reference, producing a focused archive. The `--output` flag auto-detects the format from the file extension, so `-o release.zip` automatically creates a zip archive. For reproducible builds, combine `git archive` with commit timestamps to ensure bit-for-bit identical archives. The `export-subst` attribute in `.gitattributes` enables powerful template expansion: when `git archive` encounters files with this attribute, it replaces `$Format:...$` placeholders with formatted commit information. This lets you embed version hashes, dates, and tag names into distributed files automatically. For projects that need multiple archive formats, scripting `git archive` with different formats and options is straightforward. Many package managers and build systems integrate with Git archives for reproducible dependency resolution.',
            code: `# Archive specific paths only
git archive --format=tar.gz HEAD -- src/ package.json README.md \\
  -o source-only.tar.gz

# Auto-detect format from extension
git archive -o release.tar.gz HEAD
git archive -o release.zip HEAD
git archive -o release.tar HEAD

# Release script with version embedding
#!/bin/bash
TAG=$(git describe --tags --abbrev=0)
HASH=$(git rev-parse --short HEAD)
echo "Creating release archive for $TAG ($HASH)"
git archive --format=tar.gz \\
  --prefix="myapp-$TAG/" \\
  -o "releases/myapp-$TAG.tar.gz" "$TAG"
# Generate checksum
sha256sum "releases/myapp-$TAG.tar.gz" > "releases/myapp-$TAG.sha256"

# Create archives for multiple formats
for fmt in tar.gz zip; do
  git archive --format=$(echo $fmt | cut -d. -f1) \\
    --prefix="myapp-v1.0/" HEAD | \\
    if [ "$fmt" = "tar.gz" ]; then gzip; else cat; fi \\
    > "myapp-v1.0.$fmt"
done`,
            tip: 'Combine `git archive` with `sha256sum` to generate checksums alongside releases, enabling users to verify download integrity.',
          },
        ],
      },
      {
        id: 'git-bundle',
        title: 'git bundle',
        difficulty: 'advanced',
        tags: ['git', 'bundle', 'offline', 'transfer', 'sneakernet'],
        sections: [
          {
            heading: 'Offline Repository Transfer',
            content:
              'Git bundles provide a way to transfer Git objects between repositories without a network connection. A bundle file is a single file that contains packed Git objects along with reference information, essentially a portable repository snapshot. This is invaluable in air-gapped environments (secure facilities without internet), situations with unreliable network connectivity, transferring repositories via USB drives or email, and creating reliable offline backups. Unlike `git archive`, which only exports file content at a specific point, `git bundle` contains the full Git history (or a subset), allowing the recipient to clone from it or fetch new commits. A bundle file is a valid Git remote: you can clone from it, add it as a remote, and fetch from it. This makes bundles a complete replacement for network-based Git operations when direct connectivity is not possible. The bundle format is also more efficient than alternatives like tarring the `.git` directory.',
            code: `# Create a bundle of the entire repository
git bundle create repo.bundle --all

# Create a bundle of a specific branch
git bundle create feature.bundle main

# Create a bundle with all branches and tags
git bundle create full-backup.bundle --all

# Clone from a bundle
git clone repo.bundle my-project
cd my-project

# Verify a bundle file
git bundle verify repo.bundle

# List references in a bundle
git bundle list-heads repo.bundle`,
            analogy: 'A Git bundle is like putting your entire repository into an envelope. You can mail it, carry it on a USB drive, or leave it on a shared file server. The recipient opens the envelope and has a complete working copy.',
          },
          {
            heading: 'Incremental Bundles',
            content:
              'For ongoing offline synchronization, creating full repository bundles each time is wasteful. Incremental bundles contain only the new commits since a specific point, significantly reducing transfer size. You specify the basis (what the recipient already has) and the new content to include. This creates a workflow similar to push/pull but using files as the transport mechanism. The sender creates incremental bundles based on what they last transferred, and the recipient fetches from these bundles to update their repository. The `--since` flag creates time-based incremental bundles, and commit ranges allow precise control over what is included. For maximum safety, the `git bundle verify` command checks that the recipient has the prerequisite commits before applying. This prevents applying an incremental bundle to a repository that missed an earlier bundle. Incremental bundles are the backbone of "sneakernet" Git workflows used in classified environments and remote field offices.',
            code: `# Create incremental bundle since a tag
git bundle create update.bundle v1.0..main

# Create incremental bundle since a specific commit
git bundle create incremental.bundle abc1234..HEAD

# Time-based incremental bundle
git bundle create weekly-update.bundle --since=1.week main

# Recipient: fetch from incremental bundle
git fetch update.bundle main:refs/remotes/bundle/main
git merge bundle/main

# Verify bundle has required prerequisites
git bundle verify update.bundle

# Full incremental workflow:
# Sender (first time):
git bundle create initial.bundle --all
# Sender (subsequent):
git bundle create update-1.bundle last-sent-tag..main
git tag last-sent-tag main

# Recipient:
git clone initial.bundle project
cd project
git fetch ../update-1.bundle main:refs/remotes/bundle/main`,
            tip: 'Tag the last bundled commit with a marker tag (like `last-bundle`) so you can easily create the next incremental bundle with `last-bundle..main`.',
          },
          {
            heading: 'Bundle Workflows and Best Practices',
            content:
              'Establishing a reliable bundle workflow requires planning. For regular offline sync between two sites, set up a schedule: daily or weekly bundles transferred via a secure medium. Use a naming convention that includes dates and sequence numbers for easy tracking. Always verify bundles before applying them to catch corruption during transfer. For one-time repository transfers, a full bundle plus a README explaining how to clone from it is the simplest approach. When transferring between environments with different access levels (like development to production in a secure facility), bundles can be reviewed and scanned before crossing the boundary. For backup purposes, creating regular full bundles provides a more portable backup than copying the `.git` directory since bundles are a standardized format. Store bundles alongside your regular backups and verify them periodically. Consider encrypting bundles when transferring sensitive repositories through insecure channels. Combine bundles with checksums to verify integrity after transfer.',
            code: `# Automated bundle backup script
#!/bin/bash
REPO_DIR="/path/to/repo"
BACKUP_DIR="/path/to/backups"
DATE=$(date +%Y%m%d)

cd "$REPO_DIR"
BUNDLE_FILE="$BACKUP_DIR/repo-$DATE.bundle"

# Create full bundle
git bundle create "$BUNDLE_FILE" --all

# Verify the bundle
git bundle verify "$BUNDLE_FILE"

# Generate checksum
sha256sum "$BUNDLE_FILE" > "$BUNDLE_FILE.sha256"

echo "Bundle created: $BUNDLE_FILE"
echo "Size: $(du -h "$BUNDLE_FILE" | cut -f1)"

# Clean old bundles (keep last 30 days)
find "$BACKUP_DIR" -name "*.bundle" -mtime +30 -delete

# Encrypted transfer
gpg --encrypt --recipient team@example.com repo.bundle
# Produces repo.bundle.gpg for secure transfer`,
            note: 'Always run `git bundle verify` after receiving a bundle to ensure it is not corrupted and that your repository has the required prerequisite commits.',
          },
        ],
        quiz: [
          {
            question: 'What is the primary use case for git bundles?',
            options: [
              'Compressing repository size',
              'Transferring Git objects without network connectivity',
              'Creating release archives',
              'Backing up the working directory',
            ],
            correctIndex: 1,
            explanation:
              'Git bundles are designed for offline repository transfer, allowing you to move Git objects between repositories using files instead of network connections.',
          },
          {
            question: 'How do you create an incremental bundle?',
            options: [
              'git bundle create file.bundle --incremental',
              'git bundle create file.bundle old-ref..new-ref',
              'git bundle create file.bundle --delta',
              'git bundle create file.bundle --partial',
            ],
            correctIndex: 1,
            explanation:
              'Incremental bundles use the range syntax (old..new) to include only commits between the two references, avoiding the need to transfer the entire history.',
          },
          {
            question: 'Can you clone directly from a bundle file?',
            options: [
              'No, bundles can only be fetched from',
              'Yes, using git clone <bundle-file>',
              'Only if the bundle contains all branches',
              'Only with the --bundle flag',
            ],
            correctIndex: 1,
            explanation:
              'Git bundles are valid remotes. You can `git clone repo.bundle` directly, and Git treats the bundle file as a remote repository.',
          },
        ],
      },
      {
        id: 'git-replace',
        title: 'git replace',
        difficulty: 'advanced',
        tags: ['git', 'replace', 'grafts', 'transparent', 'object-replacement'],
        sections: [
          {
            heading: 'Transparent Object Replacement',
            content:
              'The `git replace` command creates transparent replacement references for Git objects. When a replacement exists, Git automatically uses the replacement object whenever it encounters the original. This happens seamlessly across all Git commands: `log`, `diff`, `blame`, `bisect`, and more. The most common use case is grafting repository histories together. When you split a repository or truncate its history (using shallow clones or filter-repo), the replacement mechanism lets you reconnect the histories without rewriting any commits. Another use case is fixing commit metadata (author, message) without changing the commit hash that everyone knows. The replacement creates a new commit object with the corrected data and tells Git to use it whenever the original is referenced. Replacements are stored in `refs/replace/` and can be shared by pushing this ref namespace. They provide a non-destructive way to modify repository history that can be easily reverted by removing the replacement reference.',
            code: `# Replace one commit with another
git replace <original-hash> <replacement-hash>

# Create a replacement commit with a fixed message
git commit-tree <tree-hash> -p <parent-hash> \\
  -m "Corrected commit message" > /tmp/new-hash
git replace <original-hash> $(cat /tmp/new-hash)

# List all replacements
git replace -l

# Delete a replacement
git replace -d <original-hash>

# View the original (bypassing replacement)
git --no-replace-objects log

# Push replacements to remote
git push origin 'refs/replace/*'

# Fetch replacements from remote
git fetch origin 'refs/replace/*:refs/replace/*'`,
            note: 'Replacements are transparent but optional. Use `git --no-replace-objects` to bypass all replacements and see the original objects.',
          },
          {
            heading: 'Grafting Histories Together',
            content:
              'One of the most powerful applications of `git replace` is grafting separate repository histories into a unified timeline. This is useful when a project was migrated from one version control system to another, when a repository was split and later needs to be conceptually reconnected, or when you truncated history with a shallow clone and later want to reattach the full history. The process involves identifying the oldest commit in the current history, identifying the newest commit in the historical repository, creating a replacement that makes the current root commit appear to have the historical commit as its parent. This does not modify any actual commits; it simply tells Git to show a different parent relationship. The result is that `git log` seamlessly traverses from current history into the old history, `git blame` can trace lines back to their original introduction, and `git bisect` can search across the full combined history.',
            code: `# Scenario: reconnect truncated history
# 1. Find the root commit of current repo
ROOT=$(git rev-list --max-parents=0 HEAD)

# 2. Add the old repo as a remote
git remote add old-history /path/to/old-repo
git fetch old-history

# 3. Find the connecting commit in old history
OLD_TIP=$(git rev-parse old-history/main)

# 4. Create a graft: make root's parent be old-tip
# First, create a new commit object identical to ROOT but with parent
git cat-file -p $ROOT > /tmp/commit-info
TREE=$(git cat-file -p $ROOT | head -1 | awk '{print $2}')
NEW_ROOT=$(git commit-tree $TREE -p $OLD_TIP -m "$(git log -1 --format=%B $ROOT)")
git replace $ROOT $NEW_ROOT

# 5. Verify the grafted history
git log --oneline  # should show continuous history`,
            analogy: 'Git replace is like putting a transparent overlay on a photo. Everyone sees the modified version, but the original is preserved underneath and can be revealed at any time by lifting the overlay.',
          },
          {
            heading: 'Advanced Replace Patterns',
            content:
              'Beyond simple commit replacement, `git replace` works with any Git object type: trees, blobs, and tags. Replacing a tree object changes the directory listing for a commit without altering the commit itself. Replacing a blob changes a specific file\'s content at a specific point in history. These capabilities enable sophisticated history corrections without rewriting commits. For teams, replacements should be shared by configuring fetch and push refspecs for `refs/replace/*`. However, be cautious: replacements can confuse tools that compare object hashes directly, since the replacement hash differs from what other repositories expect. Some workflows use replacements temporarily (to fix a display issue during a code review) and remove them afterward. The `git replace --graft` shorthand simplifies the common grafting operation by automatically creating the replacement commit with specified parents. For permanent history corrections, you can "bake in" replacements using `git filter-repo`, which rewrites the actual objects to match the replacements and then removes the replacement refs.',
            code: `# Simplified graft syntax
git replace --graft <commit> <new-parent1> <new-parent2>

# Make a commit appear to have no parents (become a root)
git replace --graft <commit>

# Replace a specific blob (file content)
echo "corrected content" | git hash-object -w --stdin
# Returns new blob hash
git replace <old-blob-hash> <new-blob-hash>

# Bake replacements into actual history
git filter-repo --force

# Edit a replacement
git replace --edit <commit>

# Share replacements with team
git push origin 'refs/replace/*'
# Team members fetch:
git fetch origin 'refs/replace/*:refs/replace/*'

# Configure auto-fetch of replacements
git config --add remote.origin.fetch \\
  '+refs/replace/*:refs/replace/*'`,
            warning: 'Replacements can cause confusion when developers have different replacement refs. Ensure all team members sync replacements, or use them only temporarily.',
          },
        ],
      },
    ],
  },
];
