# LearnText

**All-in-One Knowledge Sharing & Interview Prep Platform.**

A full-stack coding interview preparation platform — combining the best of LeetCode, Dev.to, InterviewBit, Pramp, and Glassdoor into one free, open, community-driven platform.

---

## Why Build This When LeetCode Exists?

**This is NOT a competitor to LeetCode.** It's an **engineering portfolio project** that demonstrates full-stack system design — authentication, real-time features, AI integration, gamification, code execution, and scalable architecture — all in one codebase.

I chose a domain I deeply understand (interview prep) so I could focus on **engineering quality** rather than figuring out the product.

**Why it still makes sense:**

1. **No single platform does all of this** — LeetCode has problems but no articles/Q&A. GFG has articles but weak problems. Pramp has interviews but nothing else. This combines everything with one login, one progress tracker.

2. **It demonstrates real trade-offs** — UUID vs auto-increment (security vs performance), Redis sessions (centralized revocation), JSONB for contests (read optimization), async I/O (concurrent external calls). These are what interviewers actually care about.

3. **Every major company's engineers built "things that already exist"** — Netflix built internal tools that duplicate existing products. The point is proving you can design and build complex systems, not inventing a new product category.

| Feature | LeetCode | GFG | StackOverflow | Pramp | **LearnText** |
|---------|----------|-----|---------------|-------|--------------|
| DSA Problems | Yes | Yes | No | No | **Yes** |
| Articles | No | Yes | No | No | **Yes** |
| Q&A Forum | Discuss | No | Yes | No | **Yes** |
| AI Mock Interviews | No | No | No | Human only | **Yes (Claude)** |
| Peer Interviews | No | No | No | Yes | **Yes** |
| DSA Sheets (6) | No | Some | No | No | **Yes** |
| AI Study Plans | No | No | No | No | **Yes** |
| Gamification | Some | Some | Yes | No | **Yes (full)** |
| Contests | Yes | Yes | No | No | **Yes** |

---

## Architecture

```
┌─────────────────┐           ┌──────────────────┐           ┌──────────────┐
│    Frontend      │   HTTP    │     Backend       │           │  PostgreSQL  │
│    (React +      │◄────────►│    (FastAPI +      │◄────────►│  (Database)  │
│    TypeScript)   │   JSON    │    SQLAlchemy)     │    SQL    │  Port 5432   │
│    Port 5173     │           │    Port 8000       │           └──────────────┘
└─────────────────┘           └────────┬───────────┘
                                       │
                            ┌──────────┼──────────┐
                            ▼          ▼          ▼
                       ┌────────┐ ┌────────┐ ┌────────┐
                       │ Redis  │ │ Claude │ │ Piston │
                       │(Cache +│ │ (AI    │ │ (Code  │
                       │Sessions│ │  API)  │ │ Runner)│
                       │  6379) │ │        │ │  2000) │
                       └────────┘ └────────┘ └────────┘
```

**In one sentence:** React talks to FastAPI, FastAPI talks to PostgreSQL for data, Redis for caching/sessions, Claude for AI features, and Piston for running user code in a sandbox.

### Request Flow Example — User Submits Code

```
User clicks "Submit" on a problem
        │
        ▼
   ┌─────────┐
   │  React   │── POST /api/v1/problems/{slug}/submit ──►┐
   └─────────┘                                            │
                                                          ▼
                                                   ┌────────────┐
                                                   │  FastAPI    │
                                                   │  (Router)   │
                                                   └──────┬─────┘
                                                          │
                              ┌────────────────────────────┤
                              ▼                            ▼
                        ┌──────────┐               ┌─────────────┐
                        │  Redis   │               │   Piston    │
                        │(Check JWT│               │(Execute code│
                        │ + Rate   │               │ in sandbox) │
                        │  Limit)  │               └──────┬──────┘
                        └──────────┘                      │
                                                          ▼
                                                   ┌─────────────┐
                                                   │ PostgreSQL  │
                                                   │(Save result,│
                                                   │ update XP,  │
                                                   │ check badges│
                                                   └─────────────┘
                                                          │
                              ◄───────────────────────────┘
                              │
                        ┌─────────┐
                        │  React  │ ◄── { verdict: "accepted", runtime_ms: 12 }
                        │(Update  │
                        │  UI via │
                        │  Query  │
                        │  Cache) │
                        └─────────┘
```

---

## Tech Stack — Why Each Choice

| Layer | Technology | Why |
|-------|-----------|-----|
| **Frontend** | React + TypeScript | Industry standard. TypeScript catches bugs at compile time. |
| **Styling** | Tailwind CSS | Utility-first — fast to build, no CSS files to manage, consistent design. |
| **State/Data** | TanStack Query + Zustand | Query handles server state (caching, refetching). Zustand handles client state (auth). No Redux boilerplate. |
| **Build Tool** | Vite | 10-100x faster than Webpack. Instant HMR during development. |
| **Backend** | FastAPI (Python) | Async by default, auto-generates Swagger docs, type-safe with Pydantic. Fastest Python framework. |
| **ORM** | SQLAlchemy 2.0 (async) | Industry-standard ORM. Async version doesn't block the event loop — handles many concurrent users. |
| **Database** | PostgreSQL | Relational DB with JSONB support (best of SQL + NoSQL). Used by most production apps. |
| **Cache/Sessions** | Redis | In-memory store for JWT sessions, rate limiting, and caching. Sub-millisecond reads. |
| **Migrations** | Alembic | Version control for database schema. Deploy changes safely and roll back if needed. |
| **Code Execution** | Piston API | Sandboxed code runner in Docker containers. Users run code without any risk to our server. |
| **AI** | Anthropic Claude API | Powers mock interviews and AI-generated study plans. Best reasoning for coding contexts. |
| **Auth** | JWT + GitHub OAuth | Stateless auth with access/refresh token rotation. GitHub OAuth for one-click sign-in. |

---

## Features

### Core Features
- **Coding Problems** — 75+ DSA problems with online judge, test cases, and multi-language support (Python, JavaScript, Java, C++)
- **DSA Sheets** — Pre-built sheets (Blind 75, NeetCode 150, Grind 75, Striver SDE, Love Babbar) with progress tracking
- **Articles & Guides** — Community-written tutorials with voting, comments, and bookmarks
- **Q&A Forum** — Ask and answer questions with voting and accepted answers

### AI Features
- **Mock Interviews** — AI-powered interview practice with real-time conversation
- **Study Plans** — AI-generated personalized study plans based on target role and company
- **Daily Challenge** — Deterministic problem-of-the-day selection

### Competitive Features
- **Contests** — Timed coding competitions with live leaderboards
- **Gamification** — XP system, streaks, badges (bronze/silver/gold/platinum), and global leaderboard
- **Analytics Dashboard** — Activity heatmap, streak tracking, progress visualization

### Social Features
- **Peer Interviews** — Real-time peer-to-peer interview rooms with unique room codes
- **Public Profiles** — User profiles with badges, activity heatmap, and stats
- **Company Insights** — Interview experiences tagged by company
- **Notifications** — Real-time notification system with unread counts

### Platform Features
- **Rate Limiting** — Redis-based per-IP throttling on auth endpoints
- **GitHub OAuth** — One-click sign-in with GitHub
- **Admin Panel** — Content moderation and user management interface
- **Search** — Full-text search across problems, articles, and questions

---

## Key Design Patterns

| Pattern | Where | Why |
|---------|-------|-----|
| **API Envelope** | All responses wrapped in `{ success, data, message }` | Consistent response format for frontend |
| **Service Layer** | `app/services/` | API routes are thin, business logic lives in services (separation of concerns) |
| **UUID Primary Keys** | All models | No sequential IDs exposed (security + distributed-friendly) |
| **Polymorphic Tagging** | `ContentTag` table | One table tags problems, articles, questions — DRY |
| **Mixin-Based Models** | `UUIDPrimaryKeyMixin` + `TimestampMixin` | Reusable ID and timestamp fields across all models |
| **Idempotent Seeds** | Seed scripts check by slug | Safe to re-run without duplicating data |
| **JWT Rotation** | Access token (short) + Refresh token (Redis) | Refresh tokens rotated on use, stored server-side |
| **Rate Limiting** | Redis-based middleware | Per-IP throttling on `/auth/*` endpoints prevents brute force |
| **Batch Queries** | Problem list endpoint | Fetches tags and solved status for all problems in 2 queries, not N+1 |
| **Deterministic Selection** | Daily challenge | MD5 hash of date picks the same problem for all users on a given day |

---

## Project Structure

```
learntext/
├── docker-compose.yml
├── README.md
│
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI app entry, CORS, middleware
│   │   ├── config.py            # Settings (env vars, secrets)
│   │   ├── database.py          # Async SQLAlchemy engine + session
│   │   ├── constants.py         # Enums (Difficulty, Verdict, etc.)
│   │   ├── dependencies.py      # Auth dependency injection
│   │   ├── exceptions.py        # Custom HTTP exceptions
│   │   │
│   │   ├── models/              # SQLAlchemy models (30+ tables)
│   │   │   ├── base.py          #   UUIDPrimaryKeyMixin, TimestampMixin
│   │   │   ├── user.py          #   User (with gamification fields)
│   │   │   ├── problem.py       #   Problem, TestCase, Submission
│   │   │   ├── dsa_sheet.py     #   DSASheet, DSASheetProblem, Progress
│   │   │   ├── contest.py       #   Contest, ContestParticipant
│   │   │   ├── gamification.py  #   DailyActivity, Badge, UserStreak
│   │   │   ├── notification.py  #   Notification
│   │   │   └── ...              #   Article, Question, Note, Tag, etc.
│   │   │
│   │   ├── schemas/             # Pydantic request/response schemas
│   │   │   └── base.py          #   APIResponse envelope
│   │   │
│   │   ├── api/
│   │   │   ├── router.py        # Central router (registers all v1 routes)
│   │   │   └── v1/              # Versioned API endpoints
│   │   │       ├── auth.py      #   Login, Register, GitHub OAuth, /me
│   │   │       ├── problems.py  #   CRUD, Submit, Run, Daily Challenge
│   │   │       ├── contests.py  #   List, Detail, Register, Leaderboard
│   │   │       ├── notifications.py  # List, Read, Mark All
│   │   │       └── ...          #   15+ more route modules
│   │   │
│   │   ├── services/            # Business logic layer
│   │   │   ├── auth_service.py  #   JWT, GitHub OAuth, token rotation
│   │   │   ├── problem_service.py   # Problem CRUD, code execution
│   │   │   ├── contest_service.py   # Contest lifecycle
│   │   │   ├── claude_service.py    # AI mock interviews, study plans
│   │   │   └── ...
│   │   │
│   │   ├── middleware/
│   │   │   └── rate_limit.py    # Redis-based rate limiting
│   │   │
│   │   └── utils/
│   │       ├── pagination.py    # Generic async pagination
│   │       └── slugify.py       # Slug generation
│   │
│   ├── alembic/                 # Database migrations
│   │   └── versions/            # Migration files (3 migrations)
│   │
│   └── scripts/                 # Seed scripts
│       ├── seed_all.py          #   Master seed (runs all in order)
│       ├── seed_tags.py         #   30 DSA tags
│       ├── seed_problems.py     #   75 problems + test cases
│       ├── seed_dsa_sheets.py   #   6 DSA sheets
│       └── seed_badges.py       #   25 badges
│
└── frontend/
    └── src/
        ├── App.tsx              # Router + QueryClient setup
        ├── api/                 # Axios API client layer (19 modules)
        │   ├── client.ts        #   Axios instance + JWT interceptor
        │   ├── problems.ts      #   Problem API calls
        │   ├── contests.ts      #   Contest API calls
        │   └── ...
        │
        ├── hooks/               # TanStack Query hooks (17 modules)
        │   ├── useProblems.ts   #   useProblems, useProblem, useSubmit...
        │   ├── useContests.ts   #   useContests, useContestDetail
        │   └── ...
        │
        ├── stores/
        │   └── authStore.ts     # Zustand auth state
        │
        ├── components/
        │   ├── layout/          #   Header, MainLayout, Footer
        │   └── common/          #   LoadingSpinner, UserAvatar, etc.
        │
        ├── pages/               # 30+ page components
        │   ├── problems/        #   ProblemsIndex, ProblemSolve
        │   ├── contests/        #   ContestsIndex, ContestDetail
        │   ├── sheets/          #   SheetsIndex, SheetDetail
        │   ├── profile/         #   MyProfile, PublicProfile, Settings
        │   ├── analytics/       #   AnalyticsDashboard
        │   ├── admin/           #   AdminPanel
        │   └── ...
        │
        └── types/               # TypeScript interfaces
            ├── index.ts         #   APIResponse, PaginatedResponse
            ├── user.ts          #   User, PublicUser
            └── gamification.ts  #   Badge, Streak, etc.
```

---

## Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 20+
- Python 3.12+

### Run with Docker

```bash
docker compose up -d
```

This starts PostgreSQL (5432), Redis (6379), Piston (2000), Backend (8000), Frontend (5173).

### Run Locally (Development)

**Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env          # Edit with your DB/Redis/API keys

alembic upgrade head           # Run migrations
python scripts/seed_all.py     # Seed tags, problems, sheets, badges
uvicorn app.main:app --reload  # Start on :8000
```

**Frontend:**
```bash
cd frontend
npm install
cp .env.example .env
npm run dev                    # Start on :5173
```

### API Documentation

Once the backend is running:
- **Swagger UI**: http://localhost:8000/api/docs
- **ReDoc**: http://localhost:8000/api/redoc

---

## Database Schema (Key Tables)

```
users ──────────┐
   │            │
   ├── submissions ──── problems ──── test_cases
   │                       │
   ├── user_badges         ├── content_tags ──── tags
   │                       │
   ├── user_streaks        ├── dsa_sheet_problems ──── dsa_sheets
   │                       │
   ├── daily_activity      └── contest (problem_ids JSONB)
   │                              │
   ├── notifications              └── contest_participants
   │
   ├── study_plans ──── study_plan_items
   │
   ├── articles ──── comments ──── votes
   │
   └── questions ──── answers
```

---

## Testing

```bash
# Backend
cd backend && pytest -v

# Frontend (type check + build)
cd frontend && npm run build
```

---

## License

MIT
