# BACKEND CODEBASE GUIDE (Hinglish)

> Ye document poore backend ka complete breakdown hai — har file kya karti hai, kaise connected hai, aur overall architecture kaise kaam karta hai.

---

## TECH STACK

| Technology | Kaam kya hai |
|---|---|
| **FastAPI** | Main web framework — routes, middleware, dependency injection |
| **SQLAlchemy 2.0 (async)** | ORM — database models aur queries (async mode mein) |
| **Alembic** | Database migrations — schema changes track karna |
| **PostgreSQL** | Primary database |
| **Redis** | Caching, rate limiting, token storage |
| **Piston API** | Code execution engine (Docker container mein run hota hai) |
| **Anthropic Claude** | AI features — code reviews, mock interviews, study plans |
| **PyJWT + Passlib** | Authentication — JWT tokens + bcrypt password hashing |
| **aiosmtplib** | Async email sending |

---

## FOLDER STRUCTURE

```
backend/
├── app/
│   ├── main.py              ← App ka entry point (FastAPI app banta hai yahan)
│   ├── config.py             ← Saari settings (.env se load hoti hain)
│   ├── database.py           ← DB engine + session factory
│   ├── dependencies.py       ← Auth dependencies (get_current_user)
│   ├── exceptions.py         ← Custom exceptions + handlers
│   ├── constants.py          ← Enums (UserRole, Difficulty, Verdict, etc.)
│   │
│   ├── models/               ← Database tables (SQLAlchemy models)
│   │   ├── __init__.py       ← IMPORTANT: Saare models yahan import hote hain (Alembic ke liye)
│   │   ├── base.py           ← Mixins (UUIDPrimaryKeyMixin, TimestampMixin)
│   │   ├── user.py           ← User table
│   │   ├── problem.py        ← Problems, TestCases, Submissions
│   │   ├── article.py        ← Articles, ArticleVotes
│   │   ├── question.py       ← Questions, Answers, QAVotes
│   │   ├── comment.py        ← Comments, CommentVotes (polymorphic)
│   │   ├── note.py           ← Notes, NoteCollaborators
│   │   ├── roadmap.py        ← Roadmaps, RoadmapSteps, RoadmapProgress
│   │   ├── roadmap_features.py ← RoadmapStepNotes, StepReviews, TimeLogs
│   │   ├── gamification.py   ← DailyActivity, Badges, UserBadges, UserStreaks
│   │   ├── dsa_sheet.py      ← DSASheets, DSASheetProblems, DSASheetProgress
│   │   ├── study_plan.py     ← StudyPlans, StudyPlanItems
│   │   ├── company.py        ← Companies, InterviewExperiences, CompanyProblems
│   │   ├── interview.py      ← MockInterviewSessions, PeerInterviewRooms
│   │   ├── contest.py        ← Contests, ContestParticipants
│   │   ├── spaced_repetition.py ← SpacedRepetitionCards
│   │   ├── code_review.py    ← CodeReviews
│   │   ├── tag.py            ← Tags, ContentTags (polymorphic)
│   │   ├── bookmark.py       ← Bookmarks (polymorphic)
│   │   ├── notification.py   ← Notifications
│   │   └── language_doc.py   ← LanguageDocs
│   │
│   ├── schemas/              ← Pydantic models (request/response validation)
│   │   ├── base.py           ← APIResponse, PaginatedResponse, ErrorResponse
│   │   ├── auth.py           ← Register, Login, ForgotPassword requests
│   │   ├── user.py           ← UserResponse, UserUpdate, PublicUserResponse
│   │   └── problem.py        ← ProblemCreate, RunCodeRequest, SubmissionCreate
│   │
│   ├── api/                  ← API routes
│   │   ├── router.py         ← Master router (saare v1 routes register hote hain)
│   │   └── v1/               ← Version 1 endpoints
│   │       ├── auth.py       ← /auth/* (login, register, verify-email, etc.)
│   │       ├── users.py      ← /users/* (profile, stats, badges)
│   │       ├── problems.py   ← /problems/* (CRUD, run, submit)
│   │       ├── articles.py   ← /articles/* (CRUD, vote)
│   │       ├── questions.py  ← /questions/* (CRUD, answers, vote)
│   │       ├── comments.py   ← /comments/* (CRUD, reply, vote)
│   │       ├── notes.py      ← /notes/* (CRUD, collaborators)
│   │       ├── roadmaps.py   ← /roadmaps/* (CRUD, follow/unfollow)
│   │       ├── roadmap_steps.py ← /roadmaps/{id}/steps/* (notes, reviews, time)
│   │       ├── dsa_sheets.py ← /dsa-sheets/* (CRUD, problems add/remove)
│   │       ├── study_plans.py ← /study-plans/* (CRUD, AI generate)
│   │       ├── interviews.py ← /interviews/* (mock AI + peer rooms)
│   │       ├── companies.py  ← /companies/* (profiles, experiences)
│   │       ├── contests.py   ← /contests/* (join, leaderboard)
│   │       ├── gamification.py ← /gamification/* (profile, leaderboard, streaks)
│   │       ├── tags.py       ← /tags/*
│   │       ├── bookmarks.py  ← /bookmarks/*
│   │       ├── notifications.py ← /notifications/*
│   │       ├── spaced_repetition.py ← /spaced-repetition/*
│   │       ├── code_reviews.py ← /code-reviews/*
│   │       ├── language_docs.py ← /language-docs/*
│   │       └── search.py     ← /search (global search)
│   │
│   ├── services/             ← Business logic layer
│   │   ├── auth_service.py   ← Registration, login, JWT, email verify, password reset
│   │   ├── problem_service.py ← Problem CRUD, code execution, judging
│   │   ├── piston_service.py ← Piston API wrapper (code run karta hai)
│   │   ├── claude_service.py ← Anthropic Claude wrapper (AI features)
│   │   ├── redis_service.py  ← Redis async client wrapper
│   │   ├── email_service.py  ← SMTP email sending
│   │   ├── gamification_service.py ← XP, streaks, badges, leaderboard
│   │   ├── article_service.py ← Article CRUD, votes, views
│   │   ├── question_service.py ← Q&A CRUD, answer ranking
│   │   ├── comment_service.py ← Nested comments, votes
│   │   ├── note_service.py   ← Notes, collaboration
│   │   ├── roadmap_service.py ← Roadmap CRUD, progress tracking
│   │   ├── study_plan_service.py ← Study plans (manual + AI)
│   │   ├── dsa_sheet_service.py ← DSA sheet management
│   │   ├── interview_service.py ← Mock interviews (Claude AI), peer rooms
│   │   ├── company_service.py ← Companies, interview experiences
│   │   ├── spaced_repetition_service.py ← SM-2 algorithm
│   │   ├── code_review_service.py ← AI code review (Claude)
│   │   ├── user_service.py   ← User profile, stats
│   │   ├── search_service.py ← Full-text search
│   │   ├── bookmark_service.py ← Bookmarks CRUD
│   │   ├── notification_service.py ← Notification creation
│   │   └── tag_service.py    ← Tag management
│   │
│   ├── middleware/
│   │   └── rate_limit.py     ← Rate limiting middleware (Redis based)
│   │
│   ├── utils/
│   │   ├── security.py       ← JWT create/decode, bcrypt hash/verify
│   │   ├── pagination.py     ← Reusable pagination helper
│   │   └── slugify.py        ← URL-safe slug generator (8-char random suffix)
│   │
│   └── websockets/
│       └── peer_interview.py ← Real-time peer interview WebSocket handler
│
├── alembic/                  ← Database migrations
│   ├── env.py                ← Alembic config (imports all models)
│   └── versions/             ← Migration files (11 migrations)
│
├── scripts/                  ← Seed scripts
│   ├── seed_all.py           ← Master seed (saare seeds ek saath)
│   ├── seed_badges.py        ← Gamification badges
│   ├── seed_companies.py     ← Company profiles
│   ├── seed_problems.py      ← Basic problems
│   ├── seed_problems_data.py ← Extended problem dataset
│   ├── seed_problems_extended.py ← More problems
│   ├── seed_dsa_sheets.py    ← DSA learning sheets
│   ├── seed_roadmaps.py      ← Learning roadmaps
│   ├── seed_tags.py          ← Content tags
│   └── seed_language_docs.py ← Language documentation
│
├── Dockerfile                ← Backend Docker image
├── requirements.txt          ← Python dependencies
└── .env.example              ← Environment variables template
```

---

## HAR FILE KAISE CONNECTED HAI (Data Flow)

### 1. Request Lifecycle (Ek API call ka safar)

```
Client Request
    │
    ▼
main.py (FastAPI app)
    │
    ├── middleware/rate_limit.py ← Pehle rate limit check hota hai
    │
    ▼
api/router.py ← Correct route match hota hai
    │
    ▼
api/v1/[feature].py ← Specific endpoint handler
    │
    ├── dependencies.py ← get_current_user (JWT verify karta hai)
    │   └── services/auth_service.py ← Token decode
    │       └── utils/security.py ← JWT decode + validate
    │
    ├── database.py ← get_db (DB session milta hai)
    │
    ▼
services/[feature]_service.py ← Business logic execute hota hai
    │
    ├── models/[feature].py ← Database queries (SQLAlchemy)
    ├── services/redis_service.py ← Caching / rate limiting
    ├── services/piston_service.py ← Code execution (agar code run ho raha hai)
    └── services/claude_service.py ← AI features (agar AI use ho raha hai)
    │
    ▼
schemas/base.py ← APIResponse mein wrap hoke response jaata hai
    │
    ▼
Client Response (JSON)
```

### 2. Database Connection Chain

```
config.py (DATABASE_URL load hota hai .env se)
    │
    ▼
database.py (create_async_engine + async_sessionmaker)
    │
    ▼
dependencies.py (get_db → har request ko session deta hai)
    │
    ▼
api/v1/*.py (Depends(get_db) se DB session inject hota hai)
    │
    ▼
services/*.py (session use karke queries run karta hai)
    │
    ▼
models/*.py (SQLAlchemy models → actual DB tables)
```

### 3. Authentication Flow

```
[Register]
api/v1/auth.py → services/auth_service.py
    ├── utils/security.py → hash_password (bcrypt)
    ├── models/user.py → User create
    └── services/email_service.py → verification email bhejta hai

[Login]
api/v1/auth.py → services/auth_service.py
    ├── utils/security.py → verify_password
    ├── utils/security.py → create_access_token + create_refresh_token
    └── services/redis_service.py → refresh token store

[Protected Route]
api/v1/*.py → Depends(get_current_user)
    └── dependencies.py → get_current_user
        └── services/auth_service.py → get_current_user_from_token
            └── utils/security.py → decode_token (JWT verify)
```

### 4. Code Execution Flow

```
Frontend se code submit hota hai
    │
    ▼
api/v1/problems.py → POST /{slug}/run ya POST /{slug}/submit
    │
    ▼
services/problem_service.py
    ├── Rate limit check → services/redis_service.py
    ├── Problem + test cases fetch → models/problem.py
    │
    ▼
services/piston_service.py → HTTP POST to Piston API
    │
    ▼
Piston Docker Container (port 2000)
    ├── Code compile hota hai (agar compiled language hai)
    ├── Code run hota hai (10 sec timeout)
    └── stdout/stderr/exit_code return hota hai
    │
    ▼
services/problem_service.py
    ├── Output compare hota hai expected output se
    ├── Verdict decide hota hai (Accepted, Wrong Answer, TLE, etc.)
    ├── Submission save hota hai models/problem.py (Submission table)
    └── XP award hota hai services/gamification_service.py
```

### 5. AI Features Flow

```
services/claude_service.py (Anthropic Claude API wrapper)
    │
    ├── Code Review: services/code_review_service.py
    │   └── User code + problem → Claude → strengths, improvements, rating
    │
    ├── Mock Interview: services/interview_service.py
    │   └── Topic + difficulty → Claude → interview questions + feedback
    │
    └── Study Plan: services/study_plan_service.py
        └── Target role + duration → Claude → structured learning plan
```

---

## DETAILED FILE BREAKDOWN

### `app/main.py` — Entry Point

**Kya karta hai**: FastAPI app create karta hai, middleware lagata hai, routes mount karta hai, startup/shutdown events handle karta hai.

**Connections**:
- `config.py` se settings import
- `database.py` se engine (startup pe check karta hai)
- `api/router.py` se `api_router` mount karta hai at `/api/v1`
- `middleware/rate_limit.py` se `RateLimitMiddleware` add karta hai
- `exceptions.py` se custom exception handlers register karta hai
- `services/redis_service.py` se Redis connect/disconnect on startup/shutdown
- CORS middleware lagata hai (frontend se requests allow karne ke liye)

---

### `app/config.py` — Settings

**Kya karta hai**: `.env` file se saari configuration load karta hai Pydantic Settings use karke.

**Key Settings**:
- `DATABASE_URL` — PostgreSQL connection string
- `REDIS_URL` — Redis connection string
- `SECRET_KEY` — JWT signing key
- `PISTON_URL` — Code execution API (default: `http://localhost:2000`)
- `ANTHROPIC_API_KEY` — Claude AI key
- `SMTP_*` — Email server settings
- `GITHUB_CLIENT_ID/SECRET` — OAuth
- `FRONTEND_URL` — CORS allowed origin
- `XP_*` — Gamification reward amounts
- `ACCESS_TOKEN_EXPIRE_MINUTES` — JWT expiry (30 min)
- `REFRESH_TOKEN_EXPIRE_DAYS` — Refresh token expiry (7 days)
- `SUBMISSION_RATE_LIMIT` — Max submissions per minute (10)

**Kaun use karta hai**: Literally har service file, middleware, utils — sabko settings chahiye.

---

### `app/database.py` — Database Setup

**Kya karta hai**: SQLAlchemy async engine aur session factory create karta hai.

**Exports**:
- `engine` — Async DB engine
- `async_session` — Session maker
- `get_db()` — Async generator (dependency injection ke liye)

**Kaun use karta hai**: `dependencies.py`, `main.py`, seed scripts

---

### `app/dependencies.py` — Auth Dependencies

**Kya karta hai**: FastAPI Depends ke through current user inject karta hai protected routes mein.

**Exports**:
- `get_current_user` — JWT token se user fetch karta hai (required)
- `get_current_user_optional` — Same but optional (public routes ke liye)

**Connections**: `auth_service.py` → `security.py` → JWT decode → DB se User fetch

---

### `app/exceptions.py` — Error Handling

**Kya karta hai**: Custom exception classes + FastAPI exception handlers.

**Exception Types**:
- `AppException` (base)
- `NotFoundException` (404)
- `BadRequestException` (400)
- `UnauthorizedException` (401)
- `ForbiddenException` (403)
- `ConflictException` (409)
- `RateLimitException` (429)

**Kaun use karta hai**: Saari services — jab bhi error hota hai, ye exceptions raise hote hain.

---

### `app/constants.py` — Enums

**Kya karta hai**: Type-safe enumerations define karta hai.

**Enums**:
- `UserRole` — user, moderator, admin
- `ContentType` — problem, article, question, note
- `Difficulty` — easy, medium, hard
- `Verdict` — accepted, wrong_answer, time_limit_exceeded, etc.
- `ArticleStatus` — draft, published
- `QuestionStatus` — open, closed

---

## MODELS (`app/models/`) — Database Tables

> **IMPORTANT**: `models/__init__.py` mein SAARE models import hone chahiye warna Alembic migrations detect nahi kar paayega.

### `base.py` — Mixins

**Kya karta hai**: Reusable mixins jo har model mein use hote hain.

- `UUIDPrimaryKeyMixin` — Auto UUID primary key
- `TimestampMixin` — `created_at`, `updated_at` auto-managed timestamps

### `user.py` — Users Table

**Fields**: id, email (unique), username (unique), display_name, hashed_password, avatar_url, bio, role, xp, reputation, is_verified, problems_solved, articles_count, etc.

**Kiske saath connected hai**:
- Problems ke submissions → `problem.py`
- Articles, Questions, Answers → author ke through
- Gamification → `gamification.py` (streaks, badges, daily activity)
- Roadmap progress → `roadmap.py`
- Notes → `note.py`
- Study Plans → `study_plan.py`

### `problem.py` — Problems, TestCases, Submissions

**Tables**: `problems` (DSA problems), `test_cases` (input/output pairs), `submissions` (user solutions)

**Flow**: User submits code → Piston runs it → test cases ke against check → Submission create with verdict

### `roadmap.py` + `roadmap_features.py` — Learning Roadmaps

**Tables**: `roadmaps`, `roadmap_steps`, `roadmap_progress`, `roadmap_step_notes`, `roadmap_step_reviews`, `roadmap_time_logs`

**Flow**: User follows roadmap → steps complete karta hai → progress track hota hai → spaced repetition reviews → time logging

### `gamification.py` — XP & Streak System

**Tables**: `daily_activity`, `badges`, `user_badges`, `user_streaks`

**Flow**: User activity hoti hai → daily_activity update → streak check → badge criteria check → badge award

### Baaki Models (same pattern):

| Model File | Tables | Kya hai |
|---|---|---|
| `article.py` | articles, article_votes | Blog posts + upvote/downvote |
| `question.py` | questions, answers, qa_votes | Stack Overflow jaisa Q&A |
| `comment.py` | comments, comment_votes | Nested comments (polymorphic — kisi bhi content pe) |
| `note.py` | notes, note_collaborators | Private notes + sharing |
| `dsa_sheet.py` | dsa_sheets, dsa_sheet_problems, dsa_sheet_progress | Striver/NeetCode jaisi curated lists |
| `study_plan.py` | study_plans, study_plan_items | Personalized study schedules |
| `company.py` | companies, interview_experiences, company_problems | Company profiles + interview data |
| `interview.py` | mock_interview_sessions, peer_interview_rooms | AI mock + peer-to-peer interviews |
| `contest.py` | contests, contest_participants | Competitive programming contests |
| `spaced_repetition.py` | spaced_repetition_cards | SM-2 algorithm flashcards |
| `code_review.py` | code_reviews | AI-powered code analysis |
| `tag.py` | tags, content_tags | Polymorphic tagging system |
| `bookmark.py` | bookmarks | Content bookmarking |
| `notification.py` | notifications | User notifications |
| `language_doc.py` | language_docs | Programming language documentation |

**Total Tables: 32**

---

## SERVICES (`app/services/`) — Business Logic

> Services mein actual logic hota hai. Routes sirf request validate karke services ko call karte hain.

### `auth_service.py` — Sabse Important

**Functions**:
- `register()` — User create + verification email
- `login()` — Password verify + JWT tokens generate
- `verify_email()` — Email token validate + user activate
- `refresh_token()` — New access token issue karna
- `forgot_password()` / `reset_password()` — Password reset flow
- `get_current_user_from_token()` — JWT se user fetch

**Uses**: `security.py`, `email_service.py`, `redis_service.py`, `models/user.py`

### `problem_service.py` — Code Execution Engine

**Functions**:
- `create_problem()` / `get_problems()` / `get_problem()` — CRUD
- `run_code()` — Test run (submission nahi banta)
- `submit_code()` — Full judging + submission create + XP award
- `get_user_submissions()` — User ki submissions

**Uses**: `piston_service.py` (code execute), `redis_service.py` (rate limit), `gamification_service.py` (XP)

### `piston_service.py` — Sandboxed Code Runner

**Kya karta hai**: Piston API ko HTTP call karta hai code execute karne ke liye.

**Supported Languages**: Python, JavaScript, TypeScript, Java, C++, C, Go, Rust

**Config**: 10s compile timeout, 10s run timeout

**Response**: `{ stdout, stderr, exit_code }`

### `claude_service.py` — AI Brain

**Kya karta hai**: Anthropic Claude API ko call karta hai.

**Used by**:
- `code_review_service.py` — Code analyze karta hai
- `interview_service.py` — Mock interview conduct karta hai
- `study_plan_service.py` — AI study plan generate karta hai

### `gamification_service.py` — XP & Rewards

**Functions**:
- `log_activity()` — Daily activity record
- `_update_streak()` — Streak calculate
- `check_and_award_badges()` — Badge criteria check + award
- `get_leaderboard()` — XP leaderboard

### `redis_service.py` — Caching Layer

**Functions**: `get()`, `set()`, `delete()`, `incr()`, `expire()`, `exists()`

**Used for**: Rate limiting, token storage, caching

---

## API ROUTES (`app/api/v1/`) — Endpoints

> Har route file ek feature ke endpoints define karti hai.

### Connection Pattern (Sab same hai):
```
route file
    ├── Depends(get_db) → DB session
    ├── Depends(get_current_user) → Authenticated user
    ├── Request schema validate (Pydantic)
    ├── Service function call
    └── APIResponse return
```

### Major Endpoints:

**Auth** (`/api/v1/auth/`):
- `POST /register`, `POST /login`, `POST /refresh`
- `POST /verify-email`, `POST /forgot-password`, `POST /reset-password`
- `GET /me` — Current user profile

**Problems** (`/api/v1/problems/`):
- `GET /` — List (paginated, filterable)
- `POST /{slug}/run` — Code test karo
- `POST /{slug}/submit` — Solution submit karo (judged)
- `GET /{slug}/submissions` — Submissions dekho

**Roadmaps** (`/api/v1/roadmaps/`):
- `GET /`, `POST /`, `GET /{id}` — CRUD
- `PUT /{id}/nodes/{nodeId}/progress` — Step complete/uncomplete

**Gamification** (`/api/v1/gamification/`):
- `GET /leaderboard` — XP rankings
- `GET /streaks/{userId}` — Streak data
- `GET /profile/{userId}` — Full gamification profile

---

## MIDDLEWARE

### `rate_limit.py`

**Kya karta hai**: Auth endpoints pe rate limiting lagata hai.

**Limits**:
- `/auth/login` — 10 requests/minute
- `/auth/register` — 5 requests/minute
- `/auth/refresh` — 20 requests/minute

**Kaise kaam karta hai**: Redis mein IP-based counter rakhta hai, limit exceed hone pe 429 return karta hai.

---

## UTILS

### `security.py`
- `hash_password()` — Bcrypt hash
- `verify_password()` — Bcrypt verify
- `create_access_token()` — JWT (30 min expiry)
- `create_refresh_token()` — JWT (7 day expiry)
- `decode_token()` — JWT validate + decode

### `pagination.py`
- `paginate()` — Reusable paginated query helper
- Har list endpoint isko use karta hai

### `slugify.py`
- `generate_slug()` — Title se URL-safe slug + random 8-char suffix

---

## SEED SCRIPTS (`scripts/`)

**Pattern**: Saare scripts async hain, idempotent hain (duplicate create nahi karte — slug se check karte hain), direct engine/session use karte hain (`get_db` nahi).

| Script | Kya seed karta hai |
|---|---|
| `seed_all.py` | Saare seeds ek saath run karta hai |
| `seed_badges.py` | 20+ gamification badges |
| `seed_problems.py` | DSA problems + test cases |
| `seed_roadmaps.py` | Learning roadmaps with steps |
| `seed_companies.py` | Company profiles |
| `seed_dsa_sheets.py` | Striver-style curated sheets |
| `seed_tags.py` | Content tags |
| `seed_language_docs.py` | Programming language docs |

---

## ALEMBIC MIGRATIONS

**Total**: 11 migrations

| Migration | Description |
|---|---|
| `fe1232696e86` | Initial tables (saare base tables) |
| `a1b2c3d4e5f6` | Roadmap difficulty + estimated hours |
| `b2c3d4e5f6a7` | DSA sheets + nullable problem author |
| `c3d4e5f6a7b8` | Contests tables |
| `d4e5f6a7b8c9` | Extended study plans |
| `e5f6a7b8c9d0` | Spaced repetition cards |
| `f6a7b8c9d0e1` | Code reviews table |
| `g7b8c9d0e1f2` | Comment votes |
| `h8c9d0e1f2g3` | Email verification fields |
| `i9d0e1f2g3h4` | Roadmap step features (notes, reviews, time logs) |
| `j0e1f2g3h4i5` | Language docs table |

**Run kaise karein**: `alembic upgrade head`

---

## DOCKER SETUP

```yaml
# docker-compose.yml mein 4 services hain:

postgres:      # PostgreSQL database (port 5432)
redis:         # Redis cache (port 6379)
piston:        # Code execution engine (port 2000)
backend:       # FastAPI app (port 8000)
```

**Backend Dockerfile**: Python 3.11, requirements install, uvicorn se run.

---

## KEY ARCHITECTURAL PATTERNS

1. **Async Everything** — DB, Redis, HTTP calls — sab async hai
2. **Service Layer Pattern** — Routes → Services → Models (clean separation)
3. **Dependency Injection** — FastAPI Depends se DB session aur user inject hota hai
4. **Polymorphic Models** — Comments, Tags, Bookmarks kisi bhi content type pe kaam karte hain
5. **Mixin Pattern** — UUID + Timestamps har model mein reuse
6. **Envelope Response** — Saare responses `APIResponse` mein wrapped
7. **Idempotent Seeds** — Seeds dobara run karo toh duplicate nahi banenge
8. **SM-2 Algorithm** — Spaced repetition ke liye scientifically proven algorithm
9. **Rate Limiting** — Redis-based, IP-level + user-level dono
10. **JWT + Refresh** — Stateless auth with refresh token rotation
