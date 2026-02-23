# 📚 LearnText — Interactive Text-Based Learning Platform

## Complete Startup Plan for Solo Founder

---

## 1. The Problem

The online education market is drowning in video courses. Udemy alone has 250,000+ courses. YouTube has millions of tutorials. Yet learners — especially developers — face real problems with video-based learning:

- **Video is slow**: A 10-minute video might contain 2 minutes of useful content. You can't skim, search, or copy-paste from a video.
- **Tutorial hell**: Learners watch 40 hours of video and still can't build anything on their own.
- **Not hands-on**: You watch someone code instead of coding yourself.
- **Outdated quickly**: Re-filming a video for a framework update takes weeks. Updating text takes minutes.
- **Inaccessible**: Video fails for people in low-bandwidth areas, non-native speakers (reading > listening), people with hearing impairments, and anyone in a quiet environment (library, office).
- **Can't reference back**: Try finding that one line of code from a 3-hour Udemy course. Text is instantly searchable.

Meanwhile, the best learning resources in tech have always been text-based — official documentation, MDN Web Docs, The Odin Project, Rust Book, Go Tour. But they lack interactivity, progress tracking, and modern UX.

**There is no platform that combines beautiful interactive text + embedded code playgrounds + AI tutoring + structured progress tracking.**

---

## 2. The Solution — LearnText

An interactive text-based learning platform where:

- Lessons are **rich text with embedded runnable code editors** — learn by reading AND doing
- An **AI tutor** answers questions about the specific lesson you're on — not generic ChatGPT
- **Progress tracking**, streaks, and certificates keep learners engaged
- **Creators write text courses** instead of filming videos — 10x cheaper and faster to produce
- **Microlearning format**: 5–10 minute lessons, not 8-hour marathons
- Everything is **searchable, copy-pasteable, works offline** — everything video can't do

**One-liner pitch**: "Duolingo meets MDN Docs — interactive text-based learning with AI tutoring."

---

## 3. Target Audience

### Primary (Launch)
- **Self-taught developers** (ages 18–35) who are tired of video tutorial hell
- **Working developers** who need to learn new tech fast (they read docs, not watch videos)
- **Students in low-bandwidth regions** (India, Southeast Asia, Africa) where video streaming is unreliable

### Secondary (Scale)
- **Course creators** who want to teach without filming/editing video
- **Tech companies** who need internal training (onboarding docs + interactive exercises)
- **Bootcamps** looking for supplementary text-based curriculum

### Persona: Arjun, 23, Bangalore
> "I'm learning React. I bought a Udemy course but the instructor spends 20 minutes on setup I already know. I can't skip to the exact thing I need. I end up on the React docs anyway, but they have no exercises. I wish there was something in between."

---

## 4. Core Features (MVP)

### Phase 1 — MVP (Weeks 1–8)

| Feature | Description | Priority |
|---------|-------------|----------|
| **Text Lessons** | Rich markdown-based lessons with syntax highlighting, diagrams, callouts | P0 |
| **Embedded Code Editor** | Runnable code sandbox in every lesson (Monaco editor + server-side execution) | P0 |
| **Course Structure** | Modules → Lessons → Exercises hierarchy | P0 |
| **Progress Tracking** | Mark lessons complete, track % completion per course | P0 |
| **User Auth** | Sign up / login (email + GitHub OAuth) | P0 |
| **3 Launch Courses** | JavaScript Fundamentals, Python Basics, HTML/CSS (written by you) | P0 |
| **Mobile Responsive** | Text-first = naturally mobile-friendly | P0 |
| **Search** | Full-text search across all lesson content | P1 |

### Phase 2 — Growth (Months 3–6)

| Feature | Description | Priority |
|---------|-------------|----------|
| **AI Tutor** | Chat assistant scoped to the current lesson context | P0 |
| **Exercises & Quizzes** | Code challenges with auto-grading + MCQs | P0 |
| **Streaks & Gamification** | Daily streaks, XP points, level badges | P1 |
| **Creator Platform** | Let external experts write and publish courses | P1 |
| **Certificates** | Completion certificates (shareable on LinkedIn) | P1 |
| **Bookmarks & Notes** | Personal annotations on any lesson | P2 |
| **Community Q&A** | Per-lesson discussion threads | P2 |

### Phase 3 — Scale (Months 6–12)

| Feature | Description | Priority |
|---------|-------------|----------|
| **Team/Enterprise Plans** | Org accounts, admin dashboard, assign courses | P0 |
| **Learning Paths** | Curated multi-course paths ("Become a Backend Dev") | P1 |
| **Offline Mode** | Download courses as PWA for offline reading | P1 |
| **Analytics for Creators** | Completion rates, drop-off points, earnings | P1 |
| **API & Embeds** | Let companies embed LearnText lessons in their docs | P2 |
| **Spaced Repetition** | AI-powered review system for key concepts | P2 |

---

## 5. Technical Architecture

### System Overview

```
┌──────────────────────────────────────────────────────────┐
│                      FRONTEND                            │
│               React (Vite) + TailwindCSS                 │
│      Monaco Editor (code) + react-markdown (content)     │
└──────────────────────┬───────────────────────────────────┘
                       │ REST API + WebSocket
┌──────────────────────▼───────────────────────────────────┐
│                     BACKEND API                          │
│              Python + FastAPI (async)                     │
│     Auth · Courses · Progress · AI · Code Execution      │
└───────┬──────────┬──────────┬──────────┬─────────────────┘
        │          │          │          │
   ┌────▼───┐ ┌───▼────┐ ┌──▼───┐ ┌───▼──────────┐
   │PostgreSQL│ │ Redis  │ │ S3   │ │Code Sandbox  │
   │ (data)  │ │(cache, │ │(media│ │(Docker/Piston│
   │         │ │sessions│ │files)│ │  API)        │
   └─────────┘ │streaks)│ └──────┘ └──────────────┘
               └────────┘
```

### Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Frontend** | React 18+ (Vite) | Fast dev server, lightweight, huge ecosystem |
| **Routing** | React Router v7 | Client-side routing, nested layouts |
| **Styling** | TailwindCSS + shadcn/ui | Clean, fast, consistent UI |
| **Content Rendering** | react-markdown + rehype/remark plugins | Render markdown with custom components |
| **Code Editor** | Monaco Editor (@monaco-editor/react) | Industry-standard code editing |
| **State Management** | Zustand or TanStack Query | Lightweight, server-state caching |
| **Backend** | Python 3.12+ FastAPI | Async, auto-docs (Swagger), type-safe, fast |
| **ORM** | SQLAlchemy 2.0 + Alembic (migrations) | Async support, mature, battle-tested |
| **Database** | PostgreSQL | Reliable, full-text search built-in |
| **Cache** | Redis (via redis-py async) | Sessions, streaks, rate limiting |
| **Auth** | FastAPI + python-jose (JWT) + passlib | Custom JWT auth, full control |
| **Code Execution** | Piston API (self-hosted) | Sandboxed execution for 50+ languages |
| **AI Tutor** | Anthropic Python SDK (Claude API) | Best for teaching/explanation tasks |
| **File Storage** | S3 / Cloudflare R2 (via boto3) | Course images, assets |
| **Hosting** | Vercel/Netlify (frontend) + Railway/Fly.io (backend) | Cheap, scales easily |
| **Search** | PostgreSQL full-text search (later: Meilisearch) | Start simple, upgrade later |
| **Task Queue** | Celery + Redis (background jobs) | Email sending, analytics processing |
| **Testing** | pytest + httpx (backend), Vitest (frontend) | Fast, async test support |

### Project Structure

```
learntext/
├── backend/                    # Python FastAPI
│   ├── app/
│   │   ├── main.py             # FastAPI app entry point
│   │   ├── config.py           # Settings (pydantic-settings)
│   │   ├── database.py         # Async SQLAlchemy engine + session
│   │   ├── models/             # SQLAlchemy ORM models
│   │   │   ├── user.py
│   │   │   ├── course.py
│   │   │   ├── lesson.py
│   │   │   ├── exercise.py
│   │   │   └── progress.py
│   │   ├── schemas/            # Pydantic request/response schemas
│   │   │   ├── user.py
│   │   │   ├── course.py
│   │   │   ├── lesson.py
│   │   │   └── progress.py
│   │   ├── routers/            # API route handlers
│   │   │   ├── auth.py
│   │   │   ├── courses.py
│   │   │   ├── lessons.py
│   │   │   ├── progress.py
│   │   │   ├── exercises.py
│   │   │   ├── ai_tutor.py
│   │   │   └── code_executor.py
│   │   ├── services/           # Business logic layer
│   │   │   ├── auth_service.py
│   │   │   ├── course_service.py
│   │   │   ├── ai_service.py
│   │   │   └── code_service.py
│   │   ├── middleware/         # Auth, CORS, rate limiting
│   │   │   ├── auth.py
│   │   │   └── rate_limit.py
│   │   └── utils/
│   │       ├── security.py     # Password hashing, JWT
│   │       └── helpers.py
│   ├── alembic/                # DB migrations
│   │   └── versions/
│   ├── alembic.ini
│   ├── requirements.txt
│   ├── Dockerfile
│   └── tests/
│       ├── test_auth.py
│       ├── test_courses.py
│       └── conftest.py
│
├── frontend/                   # React (Vite)
│   ├── src/
│   │   ├── main.jsx
│   │   ├── App.jsx
│   │   ├── api/               # API client (axios/fetch)
│   │   │   └── client.js
│   │   ├── components/        # Reusable UI components
│   │   │   ├── CodeEditor.jsx
│   │   │   ├── LessonRenderer.jsx
│   │   │   ├── ProgressBar.jsx
│   │   │   ├── AITutor.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── pages/             # Route pages
│   │   │   ├── Home.jsx
│   │   │   ├── CourseCatalog.jsx
│   │   │   ├── LessonPage.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   ├── hooks/             # Custom React hooks
│   │   │   ├── useAuth.js
│   │   │   └── useProgress.js
│   │   ├── stores/            # Zustand stores
│   │   │   └── authStore.js
│   │   └── styles/
│   │       └── globals.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── docker-compose.yml          # PostgreSQL + Redis + Piston
└── README.md
```

### Backend Code Examples

**FastAPI Main App (app/main.py)**
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, courses, lessons, progress, exercises, ai_tutor, code_executor
from app.database import engine
from app.config import settings

app = FastAPI(
    title="LearnText API",
    version="1.0.0",
    docs_url="/api/docs"  # Swagger UI auto-generated
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(auth.router,          prefix="/api/auth",      tags=["Auth"])
app.include_router(courses.router,       prefix="/api/courses",   tags=["Courses"])
app.include_router(lessons.router,       prefix="/api/lessons",   tags=["Lessons"])
app.include_router(progress.router,      prefix="/api/progress",  tags=["Progress"])
app.include_router(exercises.router,     prefix="/api/exercises", tags=["Exercises"])
app.include_router(ai_tutor.router,      prefix="/api/ai",        tags=["AI Tutor"])
app.include_router(code_executor.router, prefix="/api/execute",   tags=["Code"])
```

**SQLAlchemy Model Example (app/models/course.py)**
```python
from sqlalchemy import Column, String, Boolean, Integer, Text, ForeignKey, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid
from app.database import Base

class Course(Base):
    __tablename__ = "courses"

    id            = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    creator_id    = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    title         = Column(String(255), nullable=False)
    slug          = Column(String(255), unique=True, nullable=False)
    description   = Column(Text)
    thumbnail_url = Column(Text)
    difficulty    = Column(String(20))  # beginner, intermediate, advanced
    language      = Column(String(50))  # javascript, python, etc.
    is_published  = Column(Boolean, default=False)
    is_free       = Column(Boolean, default=False)
    price_cents   = Column(Integer, default=0)
    total_lessons = Column(Integer, default=0)
    created_at    = Column(DateTime(timezone=True), server_default=func.now())
    updated_at    = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    creator = relationship("User", back_populates="courses")
    modules = relationship("Module", back_populates="course", cascade="all, delete")
```

**Pydantic Schema Example (app/schemas/course.py)**
```python
from pydantic import BaseModel, Field
from uuid import UUID
from datetime import datetime
from typing import Optional

class CourseCreate(BaseModel):
    title: str = Field(..., min_length=3, max_length=255)
    description: Optional[str] = None
    difficulty: str = Field(..., pattern="^(beginner|intermediate|advanced)$")
    language: str
    is_free: bool = False
    price_cents: int = 0

class CourseResponse(BaseModel):
    id: UUID
    title: str
    slug: str
    description: Optional[str]
    difficulty: str
    language: str
    is_free: bool
    total_lessons: int
    created_at: datetime

    class Config:
        from_attributes = True

class CourseWithModules(CourseResponse):
    modules: list["ModuleResponse"] = []
```

**Router Example (app/routers/courses.py)**
```python
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.schemas.course import CourseCreate, CourseResponse, CourseWithModules
from app.services.course_service import CourseService
from app.middleware.auth import get_current_user

router = APIRouter()

@router.get("/", response_model=list[CourseResponse])
async def list_courses(
    difficulty: str | None = None,
    language: str | None = None,
    search: str | None = None,
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db)
):
    return await CourseService.list_courses(db, difficulty, language, search, page, limit)

@router.get("/{slug}", response_model=CourseWithModules)
async def get_course(slug: str, db: AsyncSession = Depends(get_db)):
    course = await CourseService.get_by_slug(db, slug)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course

@router.post("/", response_model=CourseResponse, status_code=201)
async def create_course(
    data: CourseCreate,
    user = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    return await CourseService.create(db, data, user.id)
```

**AI Tutor Router (app/routers/ai_tutor.py)**
```python
from fastapi import APIRouter, Depends
from anthropic import AsyncAnthropic
from app.config import settings
from app.middleware.auth import get_current_user
from pydantic import BaseModel

router = APIRouter()
client = AsyncAnthropic(api_key=settings.ANTHROPIC_API_KEY)

class ChatRequest(BaseModel):
    lesson_id: str
    message: str
    lesson_context: str  # current lesson content (sent from frontend)
    history: list[dict] = []

class ChatResponse(BaseModel):
    reply: str

@router.post("/chat", response_model=ChatResponse)
async def chat_with_tutor(
    data: ChatRequest,
    user = Depends(get_current_user)
):
    system_prompt = f"""You are an expert programming tutor on LearnText.
    The student is currently reading this lesson:
    ---
    {data.lesson_context}
    ---
    Answer their question based on this lesson context.
    Be concise, use code examples, and encourage them to try things in the editor.
    Never give full solutions — guide them to discover the answer."""

    messages = data.history + [{"role": "user", "content": data.message}]

    response = await client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=1024,
        system=system_prompt,
        messages=messages
    )
    return ChatResponse(reply=response.content[0].text)
```

**requirements.txt**
```
fastapi==0.115.*
uvicorn[standard]==0.34.*
sqlalchemy[asyncio]==2.0.*
asyncpg==0.30.*
alembic==1.14.*
pydantic==2.10.*
pydantic-settings==2.7.*
python-jose[cryptography]==3.3.*
passlib[bcrypt]==1.7.*
redis==5.2.*
anthropic==0.42.*
httpx==0.28.*
python-multipart==0.0.*
celery==5.4.*
boto3==1.36.*
pytest==8.3.*
pytest-asyncio==0.24.*
```

**docker-compose.yml**
```yaml
version: "3.9"
services:
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: learntext
      POSTGRES_USER: learntext
      POSTGRES_PASSWORD: localdev123
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  piston:
    image: ghcr.io/engineer-man/piston
    ports:
      - "2000:2000"
    tmpfs:
      - /piston/jobs

volumes:
  pgdata:
```

### Database Schema (Core)

```sql
-- Users
CREATE TABLE users (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email         VARCHAR(255) UNIQUE NOT NULL,
    name          VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255),
    github_id     VARCHAR(100),
    avatar_url    TEXT,
    role          VARCHAR(20) DEFAULT 'learner', -- learner, creator, admin
    streak_count  INTEGER DEFAULT 0,
    xp_points     INTEGER DEFAULT 0,
    created_at    TIMESTAMPTZ DEFAULT NOW(),
    updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Courses
CREATE TABLE courses (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    creator_id    UUID REFERENCES users(id),
    title         VARCHAR(255) NOT NULL,
    slug          VARCHAR(255) UNIQUE NOT NULL,
    description   TEXT,
    thumbnail_url TEXT,
    difficulty    VARCHAR(20), -- beginner, intermediate, advanced
    language      VARCHAR(50), -- javascript, python, etc.
    is_published  BOOLEAN DEFAULT FALSE,
    is_free       BOOLEAN DEFAULT FALSE,
    price_cents   INTEGER DEFAULT 0,
    total_lessons INTEGER DEFAULT 0,
    created_at    TIMESTAMPTZ DEFAULT NOW(),
    updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Modules (sections within a course)
CREATE TABLE modules (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id     UUID REFERENCES courses(id) ON DELETE CASCADE,
    title         VARCHAR(255) NOT NULL,
    sort_order    INTEGER NOT NULL,
    created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Lessons
CREATE TABLE lessons (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_id     UUID REFERENCES modules(id) ON DELETE CASCADE,
    title         VARCHAR(255) NOT NULL,
    slug          VARCHAR(255) NOT NULL,
    content_mdx   TEXT NOT NULL,          -- MDX content (text + code blocks)
    estimated_min INTEGER DEFAULT 5,      -- estimated reading time
    sort_order    INTEGER NOT NULL,
    created_at    TIMESTAMPTZ DEFAULT NOW(),
    updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Exercises (attached to lessons)
CREATE TABLE exercises (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lesson_id       UUID REFERENCES lessons(id) ON DELETE CASCADE,
    type            VARCHAR(20) NOT NULL, -- code_challenge, mcq, fill_blank
    prompt          TEXT NOT NULL,
    starter_code    TEXT,
    solution_code   TEXT,
    test_cases      JSONB,                -- [{input: "...", expected: "..."}]
    sort_order      INTEGER NOT NULL,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- User Progress
CREATE TABLE user_progress (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id       UUID REFERENCES users(id) ON DELETE CASCADE,
    lesson_id     UUID REFERENCES lessons(id) ON DELETE CASCADE,
    status        VARCHAR(20) DEFAULT 'not_started', -- not_started, in_progress, completed
    completed_at  TIMESTAMPTZ,
    time_spent_s  INTEGER DEFAULT 0,
    UNIQUE(user_id, lesson_id)
);

-- User Enrollments
CREATE TABLE enrollments (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id       UUID REFERENCES users(id) ON DELETE CASCADE,
    course_id     UUID REFERENCES courses(id) ON DELETE CASCADE,
    enrolled_at   TIMESTAMPTZ DEFAULT NOW(),
    completed_at  TIMESTAMPTZ,
    UNIQUE(user_id, course_id)
);

-- AI Chat History (per lesson)
CREATE TABLE ai_conversations (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id       UUID REFERENCES users(id) ON DELETE CASCADE,
    lesson_id     UUID REFERENCES lessons(id) ON DELETE CASCADE,
    messages      JSONB NOT NULL, -- [{role: "user", content: "..."}, ...]
    created_at    TIMESTAMPTZ DEFAULT NOW(),
    updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Daily Streaks
CREATE TABLE daily_activity (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id       UUID REFERENCES users(id) ON DELETE CASCADE,
    activity_date DATE NOT NULL,
    lessons_done  INTEGER DEFAULT 0,
    xp_earned     INTEGER DEFAULT 0,
    UNIQUE(user_id, activity_date)
);
```

### API Endpoints (Core)

```
AUTH
  POST   /api/auth/register          - Create account
  POST   /api/auth/login             - Login (email/password)
  GET    /api/auth/github             - GitHub OAuth
  POST   /api/auth/logout            - Logout

COURSES
  GET    /api/courses                 - List all courses (with filters)
  GET    /api/courses/:slug           - Get course details + modules + lessons
  POST   /api/courses                 - Create course (creator only)
  PUT    /api/courses/:id             - Update course (creator only)

LESSONS
  GET    /api/lessons/:slug           - Get lesson content (MDX)
  GET    /api/lessons/:id/next        - Get next lesson in sequence

PROGRESS
  POST   /api/progress/:lessonId      - Mark lesson complete
  GET    /api/progress/course/:id     - Get user progress for a course
  GET    /api/progress/stats          - Get user stats (streak, XP, etc.)

CODE EXECUTION
  POST   /api/execute                 - Run code in sandbox
                                        Body: { language, code, testCases }

AI TUTOR
  POST   /api/ai/chat                - Send message to AI tutor
                                        Body: { lessonId, message, history }

EXERCISES
  POST   /api/exercises/:id/submit   - Submit exercise solution
  GET    /api/exercises/:id/hint     - Get AI-generated hint

SEARCH
  GET    /api/search?q=              - Full-text search across lessons
```

### SEO Strategy (Important for React SPA)

Since we're using React (Vite) instead of Next.js, lesson pages won't be server-rendered by default. Here's the SEO plan:

| Approach | When to Use |
|----------|------------|
| **Landing page as static HTML** | Build marketing/landing page as plain HTML or Astro for perfect SEO |
| **Prerender lesson pages** | Use `vite-plugin-ssr` or `react-snap` to prerender lesson URLs at build time |
| **Separate blog with Astro/Hugo** | Write SEO blog posts that link into the React app |
| **Sitemap generation** | FastAPI endpoint that generates sitemap.xml from all published lesson slugs |
| **Later: migrate to Next.js** | If SEO becomes critical at scale, migrate frontend to Next.js for full SSR |

For MVP, prerendering + a static landing page is more than enough. Optimize for SEO after you have product-market fit.

---

## 6. Content Strategy

### Launch Courses (Write These Yourself)

| # | Course | Lessons | Est. Time |
|---|--------|---------|-----------|
| 1 | **JavaScript Fundamentals** | 25 lessons | 2 weeks to write |
| 2 | **Python for Beginners** | 20 lessons | 2 weeks to write |
| 3 | **HTML & CSS from Scratch** | 20 lessons | 1.5 weeks to write |

### Lesson Format (Template)

Each lesson follows this structure:
1. **Concept** (2-3 paragraphs explaining the idea simply)
2. **Code Example** (runnable code block with explanation)
3. **Try It Yourself** (modify the code, see what happens)
4. **Exercise** (solve a small challenge)
5. **Key Takeaways** (3-5 bullet summary)

### Why Text Content Wins

| | Video Course | Text Course (LearnText) |
|---|---|---|
| **Creation time** | 40–80 hours | 8–15 hours |
| **Update time** | Re-film entire section | Edit a paragraph |
| **Creation cost** | $2,000–$10,000 (equipment, editing) | $0 (just write) |
| **SEO value** | Zero (Google can't index video) | Every lesson is indexable |
| **Accessibility** | Requires good bandwidth | Works anywhere |
| **Searchability** | None | Full-text search |
| **Copy-paste code** | Watch → pause → type | Click → copy → done |

---

## 7. Revenue Model

### Pricing Tiers

| Tier | Price | What's Included |
|------|-------|----------------|
| **Free** | $0 | 3 free courses, no AI tutor, basic progress |
| **Pro** | $15/month or $120/year | All courses, AI tutor, certificates, streaks |
| **Team** | $29/seat/month | Everything in Pro + team dashboard, analytics, assign courses |
| **Enterprise** | Custom ($99–$499/month) | SSO, custom courses, API access, dedicated support |

### Creator Revenue Share

- Creators earn **70% of revenue** from their paid courses
- Platform keeps 30%
- Free courses earn based on a **reading-time revenue pool** (like Medium)

### Revenue Projections (Conservative)

| Month | Free Users | Pro Users | MRR |
|-------|-----------|-----------|-----|
| 3 | 1,000 | 30 | $450 |
| 6 | 5,000 | 200 | $3,000 |
| 9 | 15,000 | 600 | $9,000 |
| 12 | 40,000 | 1,500 | $22,500 |
| 18 | 100,000 | 4,000 | $60,000 |

**Break-even**: ~$500/month (hosting + AI API costs). Hit by Month 3–4.

---

## 8. Go-to-Market Strategy

### Pre-Launch (Weeks 1–4)

- [ ] Build landing page with email waitlist
- [ ] Write 5 high-quality blog posts about "why text > video for learning code"
- [ ] Post on dev.to, Hashnode, HackerNews, Reddit (r/learnprogramming, r/webdev)
- [ ] Create Twitter/X account, share daily "micro-lessons" as threads
- [ ] Build in public — share progress on Twitter, Indie Hackers

### Launch (Week 8)

- [ ] Launch on Product Hunt (aim for top 5 of the day)
- [ ] Post on Hacker News (Show HN)
- [ ] Share on Reddit communities (r/learnprogramming has 3.8M+ members)
- [ ] Submit to dev.to, Hashnode, and Medium
- [ ] Reach out to tech newsletters (TLDR, Bytes, JavaScript Weekly)

### Growth (Months 3–12)

- [ ] **SEO**: Every lesson becomes a Google-indexable page (massive organic traffic)
- [ ] **Content marketing**: Publish free mini-lessons as blog posts → funnel to platform
- [ ] **Creator partnerships**: Invite popular tech bloggers to create courses
- [ ] **Community**: Build Discord server for learners
- [ ] **Referral program**: "Gift a friend 1 month free" when you subscribe
- [ ] **YouTube strategy**: Short videos (60s) saying "Read the full interactive lesson at LearnText"

### Key Channels Ranked

| Channel | Cost | Effort | Expected Impact |
|---------|------|--------|----------------|
| SEO (lesson pages) | Free | High initially | ⭐⭐⭐⭐⭐ (long-term winner) |
| Reddit / HN | Free | Medium | ⭐⭐⭐⭐ (launch spike) |
| Twitter build-in-public | Free | Low-Medium | ⭐⭐⭐ (community) |
| Product Hunt launch | Free | Medium | ⭐⭐⭐⭐ (one-time spike) |
| Dev.to / Hashnode blogs | Free | Medium | ⭐⭐⭐ (steady) |
| Newsletter sponsors | $200-$500 | Low | ⭐⭐⭐ (targeted) |

---

## 9. Competitive Landscape

| Competitor | What They Do | Where They Fall Short |
|-----------|-------------|---------------------|
| **Udemy / Coursera** | Video courses marketplace | 100% video, no interactivity, outdated content |
| **FreeCodeCamp** | Free text-based curriculum | No AI, no creator platform, limited courses, non-profit |
| **Educative.io** | Text-based dev courses | Expensive ($59/mo), narrow focus, no creator ecosystem |
| **Codecademy** | Interactive code exercises | Thin explanations, gamification > depth, limited languages |
| **The Odin Project** | Free text curriculum for web dev | Only web dev, no AI, no mobile, volunteer-run |
| **Scrimba** | Interactive video (pause and edit code) | Still video-based, limited catalog |

### Your Moat (What They Can't Easily Copy)

1. **AI tutor scoped per lesson** — not generic AI, it knows exactly what you're learning
2. **Creator ecosystem for text** — no one is building this (everyone builds for video)
3. **SEO advantage** — every text lesson is a Google-indexed page (video courses get zero SEO)
4. **Speed of content updates** — text can be updated in minutes, video takes weeks
5. **Low-bandwidth markets** — massive advantage in India, Africa, Southeast Asia ($400B eLearning market)

---

## 10. Week-by-Week MVP Build Plan (8 Weeks)

### Week 1: Foundation
- [ ] Set up React project with Vite + TailwindCSS + shadcn/ui
- [ ] Set up Python FastAPI backend with project structure
- [ ] Set up PostgreSQL database + Alembic migrations
- [ ] Create SQLAlchemy models for users, courses, lessons
- [ ] Configure JWT auth (register + login + GitHub OAuth)
- [ ] Set up docker-compose (PostgreSQL + Redis + Piston)
- [ ] Deploy skeleton to Vercel (frontend) + Railway (backend)

### Week 2: Content Engine
- [ ] Build markdown rendering with react-markdown + rehype plugins
- [ ] Add syntax highlighting (rehype-highlight or Shiki)
- [ ] Build custom markdown components (callout, tip, warning, code-playground)
- [ ] Create course → module → lesson navigation structure
- [ ] Build sidebar navigation + breadcrumbs component
- [ ] Set up React Router with nested layouts

### Week 3: Code Playground
- [ ] Integrate @monaco-editor/react into lesson pages
- [ ] Connect to Piston API (self-hosted via docker-compose) for code execution
- [ ] Build FastAPI `/api/execute` endpoint with httpx → Piston
- [ ] Support JavaScript, Python, HTML/CSS execution
- [ ] Add "Run Code" button with output panel + loading state
- [ ] Handle errors gracefully with helpful messages

### Week 4: Progress System
- [ ] Build FastAPI progress endpoints (mark complete, get stats)
- [ ] Build progress tracking UI with TanStack Query (server-state caching)
- [ ] Course completion percentage bar component
- [ ] Build user dashboard (enrolled courses, progress, stats)
- [ ] Add streaks system (daily activity tracking with Redis)
- [ ] Store and resume last position in a course (Zustand local state)

### Week 5: Content Writing Sprint
- [ ] Write JavaScript Fundamentals course (25 lessons)
- [ ] Write exercises for each lesson (at least 1 per lesson)
- [ ] Create course thumbnails and metadata
- [ ] Test all code examples run correctly
- [ ] Internal QA: read through every lesson for clarity

### Week 6: Content Writing Sprint 2
- [ ] Write Python for Beginners course (20 lessons)
- [ ] Write HTML & CSS course (20 lessons)
- [ ] Create all exercises and test cases
- [ ] Add "Try It Yourself" interactive blocks
- [ ] Final content review and polish

### Week 7: Polish & Search
- [ ] Build full-text search endpoint in FastAPI (PostgreSQL tsvector)
- [ ] Build search UI with debounced input + results page
- [ ] Add responsive design polish for mobile
- [ ] Build landing page (can be a separate static page for SEO)
- [ ] Add react-helmet-async for meta tags + OG images
- [ ] Performance optimization (React.lazy, code splitting, API caching)

### Week 8: Launch Prep
- [ ] Set up Stripe for Pro subscriptions
- [ ] Build pricing page and checkout flow
- [ ] Set up email system (welcome email, streak reminders)
- [ ] Write Product Hunt listing
- [ ] Prepare Reddit/HN launch posts
- [ ] **LAUNCH** 🚀

---

## 11. Cost Breakdown (Monthly)

### MVP Phase (Months 1–3)

| Item | Cost | Notes |
|------|------|-------|
| Vercel (frontend) | $0 | Free tier is enough |
| Railway (backend + DB) | $10 | Starter plan |
| Piston API (code execution) | $5–$10 | Self-hosted on small VPS |
| Domain | $12/year | .com domain |
| Claude API (AI tutor) | $20–$50 | Pay per usage |
| Email (Resend) | $0 | Free tier (3,000/month) |
| **Total** | **~$40–$70/month** | |

### Growth Phase (Months 6–12)

| Item | Cost | Notes |
|------|------|-------|
| Vercel Pro | $20 | More bandwidth |
| Railway (scaled) | $50–$100 | Bigger DB + backend |
| Piston (scaled) | $20–$40 | More concurrent executions |
| Claude API | $100–$300 | More users using AI tutor |
| Meilisearch | $30 | Better search |
| Monitoring (Sentry) | $0 | Free tier |
| **Total** | **~$220–$490/month** | |

---

## 12. Key Metrics to Track

| Metric | Target (Month 6) | Why It Matters |
|--------|------------------|---------------|
| **Monthly Active Users** | 5,000 | Core growth indicator |
| **Lesson Completion Rate** | >60% | Content quality signal |
| **Free → Pro Conversion** | 4–5% | Revenue health |
| **Monthly Churn (Pro)** | <8% | Retention / value |
| **Avg. Lessons/User/Week** | 5+ | Engagement |
| **DAU/MAU Ratio** | >25% | Stickiness |
| **SEO Organic Traffic** | 20% of total | Long-term sustainability |
| **NPS Score** | >50 | User satisfaction |

---

## 13. Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|-----------|------------|
| "Nobody wants text-based learning" | High | Low | Validate with landing page waitlist + Reddit polls before building. Dev community is vocal about preferring docs over video. |
| AI costs spike with usage | Medium | Medium | Cache common questions, set per-user daily AI limits on free tier, optimize prompts. |
| Hard to attract content creators | Medium | Medium | Write first 5–10 courses yourself. Prove the model works before opening to creators. |
| Educative.io copies your features | Medium | Low | They're focused on enterprise ($59/mo). You win on price, AI, and creator ecosystem. |
| Code execution security | High | Medium | Use Piston API with strict sandboxing, resource limits, and timeouts. Never execute on main server. |
| Low initial traffic | Medium | High | SEO is slow (3–6 months). Bridge with Reddit, HN, Twitter, Product Hunt launches. |

---

## 14. Future Vision (12–24 Months)

Once the core platform is working and growing:

1. **Mobile App** — PWA first, then native (React Native). Text-based learning is perfect for mobile commutes.
2. **AI Course Generator** — Creators provide an outline, AI drafts the first version, creator edits and polishes.
3. **Collaborative Learning** — Study groups, pair exercises, code reviews between learners.
4. **Beyond Coding** — Expand to data science, DevOps, system design, cloud (any topic that benefits from text + interactive).
5. **B2B / Enterprise** — Companies use LearnText for internal developer onboarding. Custom course creation. LMS integration.
6. **Marketplace** — Full creator economy where anyone can publish and earn from text courses.
7. **Open Source Core** — Open-source the content format so anyone can write LearnText-compatible lessons.

---

## 15. Why Now? Why You?

### Why Now
- Video course market is **oversaturated** — buyers have fatigue
- AI makes text interactive in ways that were impossible 2 years ago
- Microlearning is the fastest-growing segment (CAGR ~15%)
- eLearning market hits **$400B by 2026** — text-based is a massive underserved slice
- Low-bandwidth markets (India, Africa, SEA) are the fastest-growing learner populations and text works best there

### Why a Solo Founder Can Win
- Content creation is free (just write — no filming, editing, equipment)
- Tech stack is clean and proven (React + FastAPI + PostgreSQL)
- FastAPI gives you auto-generated Swagger docs, async performance, and type safety out of the box
- Python ecosystem = easy AI integration (Anthropic SDK, LangChain if needed later)
- MVP can be built in 8 weeks with one person
- Operating costs start under $100/month
- SEO compounds over time — every lesson you write is a permanent traffic asset
- You don't need venture capital to start. Bootstrap → prove → raise if needed.

---

## 16. First 7 Days Action Plan

| Day | Action |
|-----|--------|
| **Day 1** | Buy domain. Set up GitHub repo (monorepo). Init React+Vite frontend + FastAPI backend. Set up docker-compose (Postgres + Redis). |
| **Day 2** | Create SQLAlchemy models + Alembic migrations. Build `/api/auth/register` and `/api/auth/login` endpoints with JWT. |
| **Day 3** | Build markdown rendering in React (react-markdown + rehype-highlight). Create LessonPage component layout. |
| **Day 4** | Integrate @monaco-editor/react. Build FastAPI `/api/execute` endpoint connecting to Piston API. |
| **Day 5** | Build course navigation (sidebar + breadcrumbs + next/prev). Set up React Router nested layouts. |
| **Day 6** | Write your first complete lesson: "JavaScript Variables & Types". Store in DB, render on frontend. |
| **Day 7** | Deploy: frontend to Vercel, backend to Railway. Share progress on Twitter. |

After Day 7, you have a working prototype. The rest is content + polish + launch.

---

## TL;DR

> **Build an interactive text-based learning platform that combines the depth of documentation with the engagement of Duolingo.** Start with 3 coding courses you write yourself. Monetize with a $15/month Pro plan. Launch on Product Hunt and Reddit. Let SEO do the rest. Total cost to start: under $100/month. Time to MVP: 8 weeks. One person can do this.

**The world has enough video courses. Build the thing developers actually want: beautiful, interactive, searchable text that teaches you by making you DO, not watch.**