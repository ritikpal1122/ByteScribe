# LearnText — Complete Architecture Plan

## 1. Project Overview

**LearnText** is a full-stack interactive learning platform for software engineers — combining LeetCode-style coding problems, community-driven content (articles, Q&A), learning roadmaps with visual flow graphs, AI-powered tutoring, spaced repetition, mock interviews, gamification, and analytics into a single cohesive product.

### Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19 + TypeScript + Vite 6 + Tailwind CSS v4 |
| **State** | Zustand (client) + TanStack Query v5 (server) |
| **Visualizations** | XyFlow (React Flow) + Dagre layout + Framer Motion |
| **Code Editor** | Monaco Editor (VS Code engine) |
| **Backend** | FastAPI + Python 3.13 + Uvicorn |
| **ORM** | SQLAlchemy 2.0 (async) + Alembic migrations |
| **Database** | PostgreSQL 16 (asyncpg driver) |
| **Cache/Rate Limit** | Redis |
| **AI** | Anthropic Claude API (Sonnet) |
| **Code Execution** | Piston API (sandboxed multi-language runner) |
| **Auth** | JWT (access + refresh) + GitHub OAuth |
| **Email** | SMTP via aiosmtplib |

---

## 2. High-Level Architecture

```
                    ┌─────────────────────────────────────────────┐
                    │              BROWSER (SPA)                   │
                    │  React 19 + TypeScript + Tailwind + Vite    │
                    │                                             │
                    │  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
                    │  │  Zustand  │  │ TanStack │  │  Monaco   │  │
                    │  │  Stores   │  │  Query   │  │  Editor   │  │
                    │  └──────────┘  └──────────┘  └──────────┘  │
                    │  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
                    │  │ XyFlow   │  │ Framer   │  │  Radix   │  │
                    │  │ Canvas   │  │ Motion   │  │   UI     │  │
                    │  └──────────┘  └──────────┘  └──────────┘  │
                    └──────────────────┬──────────────────────────┘
                                       │ Axios (JWT auto-inject)
                                       │ /api/v1/*
                    ┌──────────────────▼──────────────────────────┐
                    │           FastAPI  (Uvicorn)                 │
                    │                                             │
                    │  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
                    │  │  Routes   │  │ Services │  │  Schemas  │  │
                    │  │ (21 files)│  │(28 files)│  │(14 files) │  │
                    │  └──────────┘  └──────────┘  └──────────┘  │
                    │  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
                    │  │ Middlewar│  │  Models   │  │  Utils   │  │
                    │  │(RateLimit│  │(21 files) │  │(3 files) │  │
                    │  └──────────┘  └──────────┘  └──────────┘  │
                    └───┬──────────────┬──────────────┬───────────┘
                        │              │              │
               ┌────────▼───┐   ┌──────▼─────┐  ┌────▼────────┐
               │ PostgreSQL  │   │   Redis     │  │  External   │
               │   (asyncpg) │   │  (sessions  │  │  Services   │
               │             │   │  rate-limit) │  │             │
               │ 21 tables   │   └────────────┘  │ - Claude AI  │
               │ 9 migrations│                    │ - Piston     │
               └─────────────┘                    │ - GitHub OAuth│
                                                  │ - SMTP       │
                                                  └──────────────┘
```

---

## 3. Backend Architecture

### 3.1 Directory Structure

```
backend/
├── app/
│   ├── main.py                  # FastAPI app factory + lifespan
│   ├── config.py                # Pydantic settings (env-driven)
│   ├── database.py              # Async engine + session factory
│   ├── dependencies.py          # FastAPI DI (auth, db)
│   ├── constants.py             # Enums (Role, Verdict, Difficulty...)
│   ├── exceptions.py            # AppException hierarchy
│   │
│   ├── models/                  # SQLAlchemy ORM (21 files)
│   │   ├── base.py              # Base + UUIDPrimaryKeyMixin + TimestampMixin
│   │   ├── user.py              # User (auth, profile, XP, reputation)
│   │   ├── article.py           # Article + ArticleVote
│   │   ├── question.py          # Question + Answer + QAVote
│   │   ├── problem.py           # Problem + TestCase + Submission
│   │   ├── note.py              # Note + NoteCollaborator
│   │   ├── roadmap.py           # Roadmap + RoadmapStep + RoadmapProgress
│   │   ├── roadmap_features.py  # RoadmapStepNote + RoadmapStepReview + RoadmapTimeLog
│   │   ├── interview.py         # MockInterviewSession + PeerInterviewRoom
│   │   ├── company.py           # Company + InterviewExperience + CompanyProblem
│   │   ├── study_plan.py        # StudyPlan + StudyPlanItem
│   │   ├── gamification.py      # DailyActivity + Badge + UserBadge + UserStreak
│   │   ├── spaced_repetition.py # SpacedRepetitionCard
│   │   ├── dsa_sheet.py         # DSASheet + DSASheetProblem + DSASheetProgress
│   │   ├── tag.py               # Tag + ContentTag
│   │   ├── comment.py           # Comment + CommentVote
│   │   ├── bookmark.py          # Bookmark
│   │   ├── notification.py      # Notification
│   │   ├── contest.py           # Contest + ContestParticipant
│   │   ├── code_review.py       # CodeReview
│   │   └── __init__.py          # Re-exports all models for Alembic
│   │
│   ├── schemas/                 # Pydantic request/response models (14 files)
│   │   ├── base.py              # APIResponse[T], PaginatedResponse[T], ErrorResponse
│   │   ├── auth.py              # Register, Login, Verify, Reset schemas
│   │   ├── user.py, article.py, question.py, problem.py, note.py,
│   │   │   roadmap.py, interview.py, company.py, study_plan.py,
│   │   │   tag.py, bookmark.py, comment.py, gamification.py
│   │
│   ├── services/                # Business logic (28 files)
│   │   ├── auth_service.py      # Register, login, JWT, OAuth, email verify
│   │   ├── user_service.py      # Profile CRUD, XP awards
│   │   ├── problem_service.py   # Problems + code execution via Piston
│   │   ├── article_service.py   # Articles CRUD + voting
│   │   ├── question_service.py  # Q&A + voting + accept answer
│   │   ├── note_service.py      # Notes CRUD + sharing
│   │   ├── roadmap_service.py   # Roadmaps + progress + review integration
│   │   ├── roadmap_step_note_service.py   # Step notes CRUD
│   │   ├── roadmap_review_service.py      # SM-2 spaced repetition for steps
│   │   ├── roadmap_time_service.py        # Time logging + analytics
│   │   ├── interview_service.py           # Mock + peer interviews
│   │   ├── company_service.py             # Companies + experiences
│   │   ├── study_plan_service.py          # Plans + AI generation
│   │   ├── gamification_service.py        # XP, badges, streaks
│   │   ├── spaced_repetition_service.py   # SM-2 for coding problems
│   │   ├── dsa_sheet_service.py           # DSA sheet progress
│   │   ├── claude_service.py     # Anthropic API (interviews, plans, reviews, chat)
│   │   ├── piston_service.py     # Code execution engine
│   │   ├── redis_service.py      # Redis wrapper (cache, rate limit)
│   │   ├── email_service.py      # SMTP email sending
│   │   ├── github_oauth_service.py # GitHub OAuth flow
│   │   ├── search_service.py     # Full-text search
│   │   ├── tag_service.py, comment_service.py, bookmark_service.py,
│   │   │   notification_service.py, contest_service.py, code_review_service.py
│   │
│   ├── api/v1/                  # FastAPI routers (21 files)
│   │   ├── auth.py              # /auth (9 endpoints)
│   │   ├── users.py             # /users (5 endpoints)
│   │   ├── problems.py          # /problems (6 endpoints)
│   │   ├── articles.py          # /articles (7 endpoints)
│   │   ├── questions.py         # /questions (7 endpoints)
│   │   ├── notes.py             # /notes (6 endpoints)
│   │   ├── roadmaps.py          # /roadmaps (3 endpoints)
│   │   ├── roadmap_steps.py     # /roadmaps/{id}/steps/* (9 endpoints)
│   │   ├── interviews.py        # /interviews (4 endpoints)
│   │   ├── companies.py         # /companies (4 endpoints)
│   │   ├── study_plans.py       # /study-plans (6 endpoints)
│   │   ├── gamification.py      # /gamification (3 endpoints)
│   │   ├── dsa_sheets.py        # /dsa-sheets (3 endpoints)
│   │   ├── contests.py          # /contests (2 endpoints)
│   │   ├── spaced_repetition.py # /spaced-repetition (3 endpoints)
│   │   ├── code_reviews.py      # /code-reviews (2 endpoints)
│   │   ├── search.py, tags.py, comments.py, bookmarks.py, notifications.py
│   │   └── router.py            # Aggregates all routers → /api/v1
│   │
│   ├── middleware/
│   │   └── rate_limit.py        # Redis-backed rate limiting (auth endpoints)
│   │
│   └── utils/
│       ├── slugify.py           # URL-safe slug + 8-char random suffix
│       ├── security.py          # Password hashing (bcrypt) + JWT encode/decode
│       └── pagination.py        # Generic async paginator
│
├── alembic/
│   ├── env.py                   # Async migration runner
│   └── versions/                # 9 sequential migrations
│       ├── fe1232696e86_initial_tables.py
│       ├── a1b2c3d4e5f6_add_roadmap_difficulty_and_hours.py
│       ├── b2c3d4e5f6a7_nullable_problem_author_and_dsa_sheets.py
│       ├── c3d4e5f6a7b8_add_contests_tables.py
│       ├── d4e5f6a7b8c9_extend_study_plans.py
│       ├── e5f6a7b8c9d0_add_spaced_repetition.py
│       ├── f6a7b8c9d0e1_add_code_reviews.py
│       ├── g7b8c9d0e1f2_add_comment_votes.py
│       ├── h8c9d0e1f2g3_add_email_verification.py
│       └── i9d0e1f2g3h4_add_roadmap_step_features.py
│
├── scripts/                     # Seed scripts (async, idempotent)
│   ├── seed_all.py              # Master runner
│   ├── seed_tags.py, seed_problems.py, seed_companies.py,
│   │   seed_roadmaps.py, seed_dsa_sheets.py, seed_badges.py,
│   │   seed_problems_data.py, seed_problems_extended.py
│
└── requirements.txt             # 25+ Python packages
```

### 3.2 Database Schema (21 Tables)

```
┌─────────────────────────────────────────────────────────────────────┐
│                         CORE ENTITIES                               │
│                                                                     │
│  ┌──────────┐    ┌───────────┐    ┌───────────┐    ┌───────────┐   │
│  │  users    │───▶│ articles  │    │ questions │    │ problems  │   │
│  │          │    │ + votes   │    │ + answers │    │ + tests   │   │
│  │ id (UUID)│    └───────────┘    │ + qa_votes│    │ + submits │   │
│  │ email    │                     └───────────┘    └───────────┘   │
│  │ username │                                                       │
│  │ xp       │    ┌───────────┐    ┌───────────┐    ┌───────────┐   │
│  │ role     │───▶│  notes    │    │ study     │    │ companies │   │
│  └──────────┘    │ + collabs │    │ plans     │    │ + exper.  │   │
│       │          └───────────┘    │ + items   │    │ + problems│   │
│       │                           └───────────┘    └───────────┘   │
│       │                                                             │
│       │          ┌───────────┐    ┌───────────┐    ┌───────────┐   │
│       ├─────────▶│ roadmaps  │    │ mock      │    │ peer      │   │
│       │          │ + steps   │    │ interview │    │ interview │   │
│       │          │ + progress│    │ sessions  │    │ rooms     │   │
│       │          └─────┬─────┘    └───────────┘    └───────────┘   │
│       │                │                                            │
│       │          ┌─────▼──────────────────────────────────┐        │
│       │          │  ROADMAP STEP FEATURES (new)            │        │
│       │          │  ┌──────────────┐ ┌──────────────┐     │        │
│       │          │  │ step_notes   │ │ step_reviews │     │        │
│       │          │  │ (markdown +  │ │ (SM-2 spaced │     │        │
│       │          │  │  code snip.) │ │  repetition) │     │        │
│       │          │  └──────────────┘ └──────────────┘     │        │
│       │          │  ┌──────────────┐                      │        │
│       │          │  │ time_logs    │                      │        │
│       │          │  │ (per-step    │                      │        │
│       │          │  │  analytics)  │                      │        │
│       │          │  └──────────────┘                      │        │
│       │          └────────────────────────────────────────┘        │
│       │                                                             │
│       │          ┌───────────┐    ┌───────────┐    ┌───────────┐   │
│       ├─────────▶│ bookmarks │    │ comments  │    │ notifs    │   │
│       │          └───────────┘    │ + votes   │    └───────────┘   │
│       │                           └───────────┘                     │
│       │          ┌───────────┐    ┌───────────┐    ┌───────────┐   │
│       └─────────▶│ badges    │    │ daily     │    │ streaks   │   │
│                  │ + user_   │    │ activity  │    │           │   │
│                  │   badges  │    └───────────┘    └───────────┘   │
│                  └───────────┘                                      │
│                                                                     │
│  ┌───────────┐    ┌───────────┐    ┌───────────┐    ┌──────────┐  │
│  │ tags      │    │ dsa_sheets│    │ spaced_   │    │ contests │  │
│  │ + content │    │ + problems│    │ repetition│    │ + partic.│  │
│  │   _tags   │    │ + progress│    │ _cards    │    └──────────┘  │
│  └───────────┘    └───────────┘    └───────────┘                   │
│                                                     ┌──────────┐  │
│                                                     │code_     │  │
│                                                     │reviews   │  │
│                                                     └──────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

### 3.3 Model Mixins

Every model inherits from:

```python
class Base(DeclarativeBase): pass                    # SQLAlchemy base
class UUIDPrimaryKeyMixin:   id = UUID (pk, uuid4)   # Auto UUID PK
class TimestampMixin:        created_at, updated_at   # Auto timestamps
```

### 3.4 API Response Envelope

Every endpoint wraps responses in:

```json
{
  "success": true,
  "data": { ... },
  "message": "Resource retrieved"
}
```

Paginated lists add:

```json
{
  "data": {
    "items": [...],
    "total": 42,
    "page": 1,
    "per_page": 20,
    "total_pages": 3,
    "has_next": true,
    "has_prev": false
  }
}
```

### 3.5 Authentication Flow

```
Register → Email verification → Login → JWT (access 30m + refresh 7d)
                                  ↓
                          GitHub OAuth (alternative)

Every request:
  Axios interceptor → attaches Bearer token
  Server → dependencies.get_current_user() → decode JWT → fetch User
  On 401 → client queues requests → refreshes token → retries
```

### 3.6 External Service Integrations

| Service | Purpose | Fallback |
|---------|---------|----------|
| **Claude API** (Anthropic) | AI study buddy, mock interviews, study plan gen, code reviews | Stub responses when `ANTHROPIC_API_KEY` unset |
| **Piston API** | Sandboxed code execution (8 languages) | Error response |
| **GitHub OAuth** | Social login/register | Standard email login |
| **SMTP** (aiosmtplib) | Email verification + password reset | Logs to console |
| **Redis** | Rate limiting + session blacklist | Silently skips |

---

## 4. Frontend Architecture

### 4.1 Directory Structure

```
frontend/src/
├── main.tsx                     # React root render
├── App.tsx                      # Router + QueryClient + Toaster
├── index.css                    # Tailwind imports + global styles
│
├── api/                         # Axios API functions (22 modules)
│   ├── client.ts                # Axios instance (JWT inject, 401 refresh queue)
│   ├── auth.ts                  # /auth endpoints
│   ├── problems.ts              # /problems endpoints
│   ├── articles.ts              # /articles endpoints
│   ├── questions.ts             # /questions endpoints
│   ├── notes.ts                 # /notes endpoints
│   ├── roadmaps.ts              # /roadmaps endpoints + types
│   ├── roadmapSteps.ts          # /roadmaps/{id}/steps/* endpoints
│   ├── dsaSheets.ts             # /dsa-sheets endpoints
│   ├── companies.ts             # /companies endpoints
│   ├── interviews.ts            # /interviews endpoints
│   ├── studyPlans.ts            # /study-plans endpoints
│   ├── contests.ts              # /contests endpoints
│   ├── spacedRepetition.ts      # /spaced-repetition endpoints
│   ├── codeReviews.ts           # /code-reviews endpoints
│   ├── gamification.ts          # /gamification endpoints
│   ├── users.ts, notifications.ts, comments.ts,
│   │   bookmarks.ts, search.ts, tags.ts
│
├── hooks/                       # TanStack Query wrappers (22 hooks)
│   ├── useAuth.ts               # Login, register, logout, fetchUser
│   ├── useProblems.ts           # Problems list, detail, run, submit
│   ├── useArticles.ts           # Articles CRUD + voting
│   ├── useRoadmaps.ts           # Roadmaps list, detail, progress
│   ├── useRoadmapSteps.ts       # Step notes, reviews, time, analytics
│   ├── useStepTimer.ts          # Auto-timer (logs on unmount)
│   ├── useDebounce.ts           # Generic debounce
│   ├── usePagination.ts         # Pagination state
│   ├── ... (18 more domain hooks)
│
├── stores/                      # Zustand client-state (4 stores)
│   ├── authStore.ts             # User + tokens + isAuthenticated
│   ├── themeStore.ts            # Light/dark/system theme
│   ├── editorStore.ts           # Monaco editor preferences
│   └── stepPanelStore.ts        # Roadmap step detail panel state
│
├── types/                       # TypeScript interfaces (9 modules)
│   ├── index.ts                 # APIResponse<T>, PaginatedResponse<T>
│   ├── user.ts                  # User, PublicUser
│   ├── article.ts               # Article, ArticleCreate, ArticleVote
│   ├── problem.ts               # Problem, TestCase, Submission, Verdict
│   ├── question.ts              # Question, Answer
│   ├── company.ts               # Company, InterviewExperience
│   ├── interview.ts             # MockInterview, PeerInterview
│   ├── gamification.ts          # Badge, Leaderboard, UserStats
│   └── dsaSheet.ts              # DSASheet, DSASheetProblem
│
├── pages/                       # Page components (45 files, 12 domains)
│   ├── Home.tsx, NotFound.tsx
│   ├── auth/                    # Login, Register, Verify, Reset (6)
│   ├── articles/                # Index, Detail, Create, Edit (4)
│   ├── problems/                # Index, Solve (2)
│   ├── questions/               # Index, Detail, Create (3)
│   ├── notes/                   # Index, Detail, Editor (3)
│   ├── roadmaps/                # Index, Detail, Create (3)
│   ├── companies/               # Index, Detail, AddExperience (3)
│   ├── interviews/              # MockSetup, MockSession, PeerLobby, PeerRoom (4)
│   ├── sheets/                  # Index, Detail (2)
│   ├── contests/                # Index, Detail (2)
│   ├── study-plan/              # MyPlan, Create, Detail (3)
│   ├── ReviewSession.tsx        # Spaced repetition
│   ├── Leaderboard.tsx, SearchResults.tsx
│   ├── analytics/               # AnalyticsDashboard (1)
│   ├── profile/                 # MyProfile, PublicProfile, Settings (3)
│   └── admin/                   # AdminPanel (1)
│
├── components/                  # Reusable UI (50+ files, 10 domains)
│   ├── layout/                  # Header, Footer, MainLayout, AuthLayout, HomeLayout, Sidebar
│   ├── auth/                    # LoginForm, RegisterForm, GitHubLoginButton
│   ├── common/                  # MarkdownEditor, MarkdownRenderer, SearchBar,
│   │                            #   LoadingSpinner, Pagination, EmptyState,
│   │                            #   TagBadge, TimeAgo, UserAvatar, VoteButtons
│   ├── articles/                # ArticleCard, ArticleList, ArticleEditor
│   ├── problems/                # CodeEditor (Monaco), ProblemDescription,
│   │                            #   ProblemList, TestCasePanel, SubmissionResult
│   ├── questions/               # QuestionCard, QuestionList, AnswerList, AnswerForm
│   ├── discussion/              # CommentCard, DiscussionSection
│   ├── gamification/            # BadgeGrid, LeaderboardTable, StreakCalendar, XPBar
│   ├── interviews/              # MockInterviewChat, PeerMatchingCard
│   ├── roadmaps/
│   │   ├── RoadmapViewer.tsx, RoadmapProgress.tsx
│   │   ├── StepDetailPanel.tsx  # Slide-out panel (4 tabs)
│   │   ├── flow/                # Flow canvas subsystem
│   │   │   ├── RoadmapFlowCanvas.tsx   # Main canvas (ReactFlow + effects)
│   │   │   ├── SectionNode.tsx         # Section header node
│   │   │   ├── StepNode.tsx            # Step node (click split, review glow)
│   │   │   ├── AnimatedFlowEdge.tsx    # Animated connections
│   │   │   ├── ParticleCanvas.tsx      # Particle burst effects
│   │   │   ├── CompletionFx.tsx        # XP toasts, combos, banners
│   │   │   ├── useRoadmapLayout.ts     # Dagre graph layout
│   │   │   ├── useCompletionFx.ts      # Completion effect logic
│   │   │   ├── constants.ts, types.ts, sounds.ts
│   │   └── tabs/                # Step detail panel tabs
│   │       ├── NotesTab.tsx     # Markdown + code snippet (auto-save)
│   │       ├── AIChatTab.tsx    # Claude study buddy chat
│   │       ├── ReviewTab.tsx    # SM-2 spaced repetition
│   │       └── AnalyticsTab.tsx # Time tracking + heatmap
│   └── ui/                      # Radix + Tailwind primitives
│
└── lib/
    ├── utils.ts                 # cn() — clsx + tailwind-merge
    └── constants.ts             # App-wide constants
```

### 4.2 Routing Architecture

```
App.tsx
├── /                           → HomeLayout → Home
├── /login                      → AuthLayout → Login
├── /register                   → AuthLayout → Register
├── /auth/github/callback       → AuthLayout → GitHubCallback
├── /verify-email               → AuthLayout → VerifyEmail
├── /forgot-password            → AuthLayout → ForgotPassword
├── /reset-password             → AuthLayout → ResetPassword
│
└── /* (MainLayout: Header + max-w-7xl content + Footer)
    ├── /articles               → ArticlesIndex
    ├── /articles/new           → ArticleCreate
    ├── /articles/:slug         → ArticleDetail
    ├── /articles/:slug/edit    → ArticleEdit
    ├── /problems               → ProblemsIndex
    ├── /problems/:slug         → ProblemSolve
    ├── /questions              → QuestionsIndex
    ├── /questions/ask          → QuestionCreate
    ├── /questions/:slug        → QuestionDetail
    ├── /notes                  → NotesIndex
    ├── /notes/new              → NoteEditor
    ├── /notes/:id              → NoteDetail
    ├── /roadmaps               → RoadmapsIndex
    ├── /roadmaps/new           → RoadmapCreate
    ├── /roadmaps/:slug         → RoadmapDetail (flow canvas + fullscreen)
    ├── /sheets                 → SheetsIndex
    ├── /sheets/:slug           → SheetDetail
    ├── /companies              → CompaniesIndex
    ├── /companies/:slug        → CompanyDetail
    ├── /companies/:slug/add-experience → AddExperience
    ├── /interviews/mock        → MockInterviewSetup
    ├── /interviews/mock/:id    → MockInterviewSession
    ├── /interviews/peer        → PeerInterviewLobby
    ├── /interviews/peer/:id    → PeerInterviewRoom
    ├── /contests               → ContestsIndex
    ├── /contests/:slug         → ContestDetail
    ├── /review                 → ReviewSession (spaced repetition)
    ├── /study-plan             → MyStudyPlan
    ├── /study-plan/new         → CreateLearningPath
    ├── /study-plan/:id         → LearningPathDetail
    ├── /analytics              → AnalyticsDashboard
    ├── /leaderboard            → Leaderboard
    ├── /search                 → SearchResults
    ├── /profile                → MyProfile
    ├── /profile/settings       → Settings
    ├── /user/:username         → PublicProfile
    └── /admin                  → AdminPanel
```

### 4.3 State Management Strategy

```
┌─────────────────────────────────────────────────────┐
│                    STATE LAYERS                       │
├─────────────────────────────────────────────────────┤
│                                                       │
│  SERVER STATE (TanStack Query)                        │
│  ┌─────────────────────────────────────────────────┐ │
│  │ queryKey: ['problems', {page, difficulty}]       │ │
│  │ queryKey: ['roadmaps', slug]                     │ │
│  │ queryKey: ['roadmap-step-note', rmId, stepId]    │ │
│  │ queryKey: ['roadmap-analytics', rmId]            │ │
│  │ ...22 hook modules wrapping API calls            │ │
│  │                                                   │ │
│  │ Config: staleTime=5min, retry=1                  │ │
│  │ Mutations invalidate related queries             │ │
│  └─────────────────────────────────────────────────┘ │
│                                                       │
│  CLIENT STATE (Zustand — 4 stores)                    │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌─────────┐ │
│  │ authStore│ │themeStore│ │editorStor│ │stepPanel│ │
│  │ user     │ │ light/   │ │ language │ │ isOpen  │ │
│  │ tokens   │ │ dark/    │ │ fontSize │ │ stepId  │ │
│  │ isAuth   │ │ system   │ │ theme    │ │ activeTab│ │
│  └──────────┘ └──────────┘ └──────────┘ └─────────┘ │
│                                                       │
│  LOCAL STATE (useState / useRef)                      │
│  ┌─────────────────────────────────────────────────┐ │
│  │ Form inputs, modals, accordions, chat messages,  │ │
│  │ timer ticks, touring state, completion effects    │ │
│  └─────────────────────────────────────────────────┘ │
│                                                       │
│  PERSISTED (localStorage)                             │
│  ┌─────────────────────────────────────────────────┐ │
│  │ access_token, refresh_token, theme preference    │ │
│  └─────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

---

## 5. Feature Domains

### 5.1 Coding Problems & Execution

```
User writes code (Monaco Editor)
    ↓
POST /problems/{id}/run  (test against samples)
    ↓
Backend → Piston API (sandboxed Docker containers)
    ↓
Returns: stdout, stderr, runtime_ms, memory_kb, test_results[]
    ↓
POST /problems/{id}/submit  (judge all test cases)
    ↓
Verdict: ACCEPTED | WRONG_ANSWER | TLE | MLE | RE | CE
    ↓
On ACCEPTED → award XP → auto-create SpacedRepetitionCard
```

**Languages:** Python, JavaScript, TypeScript, Java, C++, C, Go, Rust

### 5.2 Roadmap Flow Canvas

```
                    ┌──────────────────────────────────┐
                    │  RoadmapDetail (page)             │
                    │  ┌────────────────────────────┐   │
                    │  │ RoadmapFlowCanvas          │   │
                    │  │  ┌──────────────────────┐  │   │
                    │  │  │ ReactFlow             │  │   │
                    │  │  │  ┌──────┐  ┌──────┐  │  │   │
                    │  │  │  │Section│──│Section│  │  │   │
                    │  │  │  │ Node  │  │ Node  │  │  │   │
                    │  │  │  └──┬───┘  └──┬───┘  │  │   │
                    │  │  │   ┌─┼──┐    ┌─┼──┐   │  │   │
                    │  │  │   │Step│    │Step│   │  │   │
                    │  │  │   │Node│    │Node│   │  │   │
                    │  │  │   └────┘    └────┘   │  │   │
                    │  │  └──────────────────────┘  │   │
                    │  │  ┌──────────────────────┐  │   │
                    │  │  │ ParticleCanvas (fx)   │  │   │
                    │  │  └──────────────────────┘  │   │
                    │  │  ┌──────────────────────┐  │   │
                    │  │  │ StepDetailPanel       │  │   │
                    │  │  │ ┌──────┬──────┬─────┐│  │   │
                    │  │  │ │Notes │AI    │Revie││  │   │
                    │  │  │ │Tab   │Chat  │w Tab││  │   │
                    │  │  │ │      │Tab   │     ││  │   │
                    │  │  │ ├──────┴──────┴─────┤│  │   │
                    │  │  │ │Analytics Tab       ││  │   │
                    │  │  │ └───────────────────┘│  │   │
                    │  │  └──────────────────────┘  │   │
                    │  └────────────────────────────┘   │
                    └──────────────────────────────────┘

Click handling:
  Checkbox icon → toggle completion + particles + sound + XP
  Node body     → open StepDetailPanel (slide-out, 480px)

Visual states:
  Default       → white border
  Completed     → green glow + strikethrough
  Due for review→ amber pulse + clock badge

Fullscreen mode:
  Button above canvas → fixed overlay (z-100, inset-0)
  Compact toolbar: title + progress + ESC hint
  Canvas fills 100vh
```

### 5.3 AI Integration (Claude)

| Feature | Method | Trigger |
|---------|--------|---------|
| **Roadmap Study Buddy** | `roadmap_step_chat()` | AI Chat tab in step panel |
| **Mock Interviews** | `mock_interview_message()` | Interview session page |
| **Study Plan Generation** | `generate_study_plan()` | Create learning path |
| **Code Review** | `review_code()` | After submission |
| **Solution Explanation** | `explain_solution()` | Problem solve page |

All methods fall back to stub responses when `ANTHROPIC_API_KEY` is not set.

### 5.4 Spaced Repetition (SM-2)

Two independent SM-2 systems:

| System | Model | Trigger | Review UI |
|--------|-------|---------|-----------|
| **Coding Problems** | `SpacedRepetitionCard` | Accepted submission | `/review` page |
| **Roadmap Steps** | `RoadmapStepReview` | Step completion | Review tab in panel |

SM-2 Algorithm (both systems):

```
if quality < 3:       # Failed — reset
    repetitions = 0
    interval = 1 day
else:                  # Passed
    if reps == 0: interval = 1
    elif reps == 1: interval = 6
    else: interval = round(interval * ease_factor)
    repetitions += 1

ease_factor = max(1.3, EF + 0.1 - (5-q)*(0.08 + (5-q)*0.02))
next_review = today + interval
```

### 5.5 Gamification

```
XP Sources:
  Solve problem:    +50 XP
  Write article:    +30 XP
  Answer question:  +20 XP
  Ask question:      +5 XP
  Daily login:      +10 XP

Progression:
  XP → Levels → Reputation → Leaderboard ranking

Badges:
  Earned via milestones (problems solved, streaks, etc.)
  Displayed on profile + badge grid

Streaks:
  DailyActivity table tracks active days
  StreakCalendar visualizes 365-day activity
  Combo counter on roadmap (rapid completions)

Completion Effects (Roadmap):
  Particle bursts (green confetti)
  XP toast popups
  Combo multiplier display
  Section completion banner + confetti
  Screen shake + sound effects
```

---

## 6. API Endpoint Map

### Auth (9 endpoints)
```
POST   /api/v1/auth/register
POST   /api/v1/auth/verify-email
POST   /api/v1/auth/resend-verification
POST   /api/v1/auth/login
POST   /api/v1/auth/refresh
POST   /api/v1/auth/logout
POST   /api/v1/auth/forgot-password
POST   /api/v1/auth/reset-password
GET    /api/v1/auth/github/callback
```

### Users (5)
```
GET    /api/v1/users
GET    /api/v1/users/{user_id}
PUT    /api/v1/users/{user_id}
GET    /api/v1/users/{user_id}/stats
GET    /api/v1/users/{user_id}/achievements
```

### Problems (6)
```
GET    /api/v1/problems
POST   /api/v1/problems
GET    /api/v1/problems/{id}
POST   /api/v1/problems/{id}/run
POST   /api/v1/problems/{id}/submit
GET    /api/v1/problems/{id}/submissions
```

### Articles (7)
```
GET    /api/v1/articles
POST   /api/v1/articles
GET    /api/v1/articles/{id}
PUT    /api/v1/articles/{id}
DELETE /api/v1/articles/{id}
POST   /api/v1/articles/{id}/upvote
POST   /api/v1/articles/{id}/downvote
```

### Questions (7)
```
GET    /api/v1/questions
POST   /api/v1/questions
GET    /api/v1/questions/{id}
POST   /api/v1/questions/{id}/answers
POST   /api/v1/questions/{id}/accept-answer
POST   /api/v1/questions/{id}/upvote
POST   /api/v1/answers/{id}/upvote
```

### Roadmaps (3 + 9 step features)
```
GET    /api/v1/roadmaps
POST   /api/v1/roadmaps
GET    /api/v1/roadmaps/{slug}
POST   /api/v1/roadmaps/{slug}/progress

GET    /api/v1/roadmaps/{id}/steps/{stepId}/notes
PUT    /api/v1/roadmaps/{id}/steps/{stepId}/notes
DELETE /api/v1/roadmaps/{id}/steps/{stepId}/notes
POST   /api/v1/roadmaps/{id}/steps/{stepId}/ai-chat
GET    /api/v1/roadmaps/{id}/reviews/due
GET    /api/v1/roadmaps/{id}/steps/{stepId}/review
POST   /api/v1/roadmaps/{id}/steps/{stepId}/review
POST   /api/v1/roadmaps/{id}/steps/{stepId}/time-log
GET    /api/v1/roadmaps/{id}/analytics
```

### Other Domains
```
Notes:               6 endpoints   /api/v1/notes/*
Study Plans:         6 endpoints   /api/v1/study-plans/*
Interviews:          4 endpoints   /api/v1/interviews/*
Companies:           4 endpoints   /api/v1/companies/*
DSA Sheets:          3 endpoints   /api/v1/dsa-sheets/*
Gamification:        3 endpoints   /api/v1/gamification/*
Spaced Repetition:   3 endpoints   /api/v1/spaced-repetition/*
Contests:            2 endpoints   /api/v1/contests/*
Code Reviews:        2 endpoints   /api/v1/code-reviews/*
Search:              1 endpoint    /api/v1/search
Tags:                3 endpoints   /api/v1/tags/*
Comments:            3 endpoints   /api/v1/comments/*
Bookmarks:           3 endpoints   /api/v1/bookmarks/*
Notifications:       3 endpoints   /api/v1/notifications/*
Health:              1 endpoint    /api/health
```

**Total: ~85 API endpoints**

---

## 7. Data Flow Patterns

### 7.1 Read Flow (Query)

```
Component mount
  ↓
useQuery({ queryKey: ['roadmaps', slug], queryFn: getRoadmap(slug) })
  ↓
TanStack Query checks cache (staleTime: 5min)
  ↓ (cache miss or stale)
api/roadmaps.ts → client.get('/roadmaps/{slug}')
  ↓
Axios interceptor injects Authorization: Bearer {token}
  ↓
FastAPI route → Depends(get_current_user_optional) → service function
  ↓
SQLAlchemy async query → PostgreSQL
  ↓
Service builds response dict → APIResponse envelope
  ↓
Axios response → TanStack cache → select(res => res.data) → component re-renders
```

### 7.2 Write Flow (Mutation)

```
User action (click, submit)
  ↓
useMutation({ mutationFn: updateProgress(rmId, nodeId, true) })
  ↓
api/roadmaps.ts → client.put('/roadmaps/{id}/nodes/{nodeId}/progress')
  ↓
FastAPI route → Depends(get_current_user) → service function
  ↓
Service: upsert progress → auto_create_review (if completed) → flush
  ↓
Session auto-commits (get_db dependency)
  ↓
onSuccess → queryClient.invalidateQueries(['roadmaps'])
  ↓
Cache invalidated → refetch → UI updates
```

---

## 8. Security Architecture

| Layer | Mechanism |
|-------|-----------|
| **Authentication** | JWT access tokens (30min) + refresh tokens (7d) |
| **Password Storage** | bcrypt via passlib |
| **CORS** | Whitelist: localhost:5173, configurable FRONTEND_URL |
| **Rate Limiting** | Redis-backed: login=10/min, register=5/min, refresh=20/min |
| **Input Validation** | Pydantic schemas on all request bodies |
| **SQL Injection** | SQLAlchemy parameterized queries (no raw SQL) |
| **XSS** | React auto-escapes JSX; Markdown rendered via react-markdown |
| **Code Execution** | Sandboxed via Piston (Docker containers, time/memory limits) |
| **Email Verification** | JWT-signed verification tokens (24h expiry) |
| **Password Reset** | JWT-signed reset tokens (1h expiry) |
| **Token Blacklist** | Redis stores invalidated refresh tokens |

---

## 9. Infrastructure & Deployment

### 9.1 Development Setup

```bash
# Backend
cd backend
pip install -r requirements.txt
alembic upgrade head                    # Run migrations
python -m scripts.seed_all              # Seed test data
uvicorn app.main:app --reload --port 8000

# Frontend
cd frontend
npm install
npm run dev                             # Vite on :5173

# Dependencies
docker run -d -p 5432:5432 postgres     # PostgreSQL
docker run -d -p 6379:6379 redis        # Redis
docker run -d -p 2000:2000 ghcr.io/engineer-man/piston  # Code execution
```

### 9.2 Environment Variables

```env
# Database
DATABASE_URL=postgresql+asyncpg://learntext:learntext_secret@localhost:5432/learntext
REDIS_URL=redis://localhost:6379/0

# Security
SECRET_KEY=<random-256-bit-key>
FRONTEND_URL=http://localhost:5173

# AI
ANTHROPIC_API_KEY=sk-ant-...

# Code Execution
PISTON_URL=http://localhost:2000

# OAuth
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
GITHUB_REDIRECT_URI=http://localhost:5173/auth/github/callback

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=...
SMTP_PASSWORD=...
```

---

## 10. Metrics Summary

| Metric | Count |
|--------|-------|
| **Backend files** | ~90 Python files |
| **Frontend files** | ~120 TypeScript/TSX files |
| **Database tables** | 21 |
| **Alembic migrations** | 9 |
| **API endpoints** | ~85 |
| **React pages** | 45 |
| **React components** | 50+ |
| **Custom hooks** | 22 |
| **Zustand stores** | 4 |
| **API modules** | 22 |
| **Service modules** | 28 |
| **Pydantic schemas** | 14 modules |
| **Seed scripts** | 10 |
| **Supported languages** | 8 (code execution) |
| **AI-powered features** | 5 |
| **NPM dependencies** | 30+ |
| **Python dependencies** | 25+ |
