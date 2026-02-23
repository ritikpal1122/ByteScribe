# FRONTEND CODEBASE GUIDE (Hinglish)

> Ye document poore frontend ka complete breakdown hai — har file kya karti hai, kaise connected hai, aur data kaise flow hota hai.

---

## TECH STACK

| Technology | Kaam kya hai |
|---|---|
| **React 18** | UI library — components, hooks, state management |
| **TypeScript** | Type safety — compile time pe errors catch |
| **Vite** | Build tool — super fast dev server + production build |
| **TanStack Query (React Query)** | Server state management — API calls, caching, refetching |
| **Zustand** | Client state management — small global stores |
| **Tailwind CSS 4** | Utility-first CSS — fast styling |
| **Framer Motion** | Animations — page transitions, scroll effects |
| **React Router v6** | Client-side routing |
| **Axios** | HTTP client — API calls |
| **Monaco Editor** | VS Code jaisa code editor (problem solving ke liye) |
| **Lucide React** | Icon library |

---

## FOLDER STRUCTURE

```
frontend/src/
├── main.tsx                  ← App ka entry point (React DOM render)
├── App.tsx                   ← Routing setup (React Router)
├── index.css                 ← Global CSS (Tailwind + custom animations)
├── vite-env.d.ts             ← Vite TypeScript declarations
│
├── api/                      ← Backend API client functions
│   ├── client.ts             ← Axios instance (base URL, auth interceptor)
│   ├── auth.ts               ← Login, register, refresh, verify
│   ├── problems.ts           ← Problems CRUD, run code, submit
│   ├── articles.ts           ← Articles CRUD, vote
│   ├── questions.ts          ← Questions CRUD, answers, vote
│   ├── comments.ts           ← Comments CRUD, reply, vote
│   ├── notes.ts              ← Notes CRUD, collaborators
│   ├── roadmaps.ts           ← Roadmaps CRUD, progress
│   ├── roadmapSteps.ts       ← Step notes, reviews, time logs
│   ├── dsaSheets.ts          ← DSA sheets CRUD, progress
│   ├── studyPlans.ts         ← Study plans CRUD, AI generate
│   ├── interviews.ts         ← Mock + peer interviews
│   ├── companies.ts          ← Companies, experiences
│   ├── contests.ts           ← Contests, join, leaderboard
│   ├── gamification.ts       ← Profile, leaderboard, streaks
│   ├── tags.ts               ← Tags list
│   ├── bookmarks.ts          ← Bookmarks CRUD
│   ├── notifications.ts      ← Notifications list, mark read
│   ├── spacedRepetition.ts   ← Spaced rep cards, review
│   ├── codeReviews.ts        ← AI code reviews
│   ├── search.ts             ← Global search
│   └── users.ts              ← User profiles, stats
│
├── hooks/                    ← Custom React hooks (React Query wrappers)
│   ├── useAuth.ts            ← Login, register, logout, current user
│   ├── useProblems.ts        ← useProblems, useRunCode, useSubmitSolution
│   ├── useArticles.ts        ← useArticles, useCreateArticle, useVote
│   ├── useQuestions.ts       ← useQuestions, useAnswers, useVote
│   ├── useComments.ts        ← useComments, useCreateComment, useVote
│   ├── useNotes.ts           ← useNotes, useCreateNote, useUpdateNote
│   ├── useRoadmaps.ts        ← useRoadmaps, useRoadmap, useUpdateProgress
│   ├── useDSASheets.ts       ← useSheets, useSheet, useToggleProgress
│   ├── useStudyPlans.ts      ← usePlans, useCreatePlan, useAIGenerate
│   ├── useInterviews.ts      ← useMockInterview, usePeerRooms
│   ├── useCompanies.ts       ← useCompanies, useCompany, useAddExperience
│   ├── useContests.ts        ← useContests, useJoinContest
│   ├── useGamification.ts    ← useLeaderboard, useStreak, useProfile
│   ├── useBookmarks.ts       ← useBookmarks, useToggleBookmark
│   ├── useNotifications.ts   ← useNotifications, useUnreadCount, useMarkRead
│   ├── useSearch.ts          ← useSearch (debounced)
│   ├── useDebounce.ts        ← Generic debounce hook
│   └── useStepTimer.ts       ← Roadmap step time tracking
│
├── stores/                   ← Zustand global state
│   ├── authStore.ts          ← User session (token, user object, isAuthenticated)
│   └── stepPanelStore.ts     ← Roadmap step detail panel state (open/close, tabs)
│
├── types/                    ← (ya types.ts) — TypeScript interfaces
│   └── index.ts              ← User, Problem, Submission, Article, etc.
│
├── lib/
│   └── utils.ts              ← Utility functions (cn() for classnames)
│
├── data/
│   └── docs/                 ← Static documentation data
│       ├── types.ts           ← DocCategory, DocEntry, LanguageConfig types
│       ├── index.ts           ← All languages export
│       ├── python.ts          ← Python config + categories
│       ├── javascript.ts      ← JavaScript config
│       ├── typescript.ts      ← TypeScript config
│       ├── rust.ts            ← Rust config
│       ├── java.ts            ← Java config
│       ├── go.ts              ← Go config
│       ├── cpp.ts             ← C++ config
│       └── _[lang]_partN.ts   ← Part files (574 entries, ~105K lines)
│
├── components/               ← Reusable UI components
│   ├── layout/
│   │   ├── Header.tsx         ← Top navbar (NAV_LINKS array, search, notifications, user menu)
│   │   ├── MainLayout.tsx     ← Page wrapper (Header + content area)
│   │   └── Footer.tsx         ← Footer
│   │
│   ├── common/               ← Shared components
│   │   ├── LoadingSpinner.tsx ← Loading indicator
│   │   ├── EmptyState.tsx     ← Empty list placeholder
│   │   ├── Pagination.tsx     ← Page navigation
│   │   ├── SearchBar.tsx      ← Search input
│   │   ├── TagBadge.tsx       ← Tag chip component
│   │   └── MarkdownRenderer.tsx ← Markdown → rendered HTML
│   │
│   ├── auth/
│   │   ├── ProtectedRoute.tsx ← Route guard (redirect if not logged in)
│   │   └── GuestRoute.tsx     ← Route guard (redirect if already logged in)
│   │
│   ├── problems/
│   │   ├── CodeEditor.tsx     ← Monaco editor wrapper
│   │   ├── TestCasePanel.tsx  ← Test case input/output display
│   │   ├── SubmissionList.tsx ← User's submissions table
│   │   └── LanguageDocsPanel.tsx ← Quick docs reference while coding
│   │
│   ├── articles/
│   │   ├── ArticleList.tsx    ← Article cards grid
│   │   └── ArticleEditor.tsx  ← Markdown editor for writing
│   │
│   ├── questions/
│   │   ├── QuestionList.tsx   ← Questions list
│   │   └── AnswerForm.tsx     ← Answer editor
│   │
│   ├── discussion/
│   │   └── CommentSection.tsx ← Nested comments component (reusable)
│   │
│   ├── roadmaps/
│   │   ├── flow/
│   │   │   ├── RoadmapVerticalView.tsx ← NEW! Vertical spine layout
│   │   │   ├── constants.ts    ← Color schemes (8 themes)
│   │   │   ├── CompletionFx.tsx ← XP toasts, combo counter, section banners
│   │   │   ├── ParticleCanvas.tsx ← Canvas particle effects
│   │   │   ├── useCompletionFx.ts ← Effects state management
│   │   │   └── sounds.ts       ← Audio feedback (Web Audio API)
│   │   │
│   │   ├── tabs/              ← StepDetailPanel ke tabs
│   │   │   ├── NotesTab.tsx    ← Step notes editor
│   │   │   ├── AIChatTab.tsx   ← AI chat for step help
│   │   │   ├── ReviewTab.tsx   ← Spaced repetition review
│   │   │   └── AnalyticsTab.tsx ← Time tracking analytics
│   │   │
│   │   └── StepDetailPanel.tsx ← Slide-in panel (fixed right side)
│   │
│   ├── gamification/
│   │   ├── XPBadge.tsx        ← User XP display
│   │   ├── StreakCounter.tsx   ← Fire streak display
│   │   └── BadgeGrid.tsx      ← User badges grid
│   │
│   ├── interviews/
│   │   ├── MockChatUI.tsx     ← AI interviewer chat interface
│   │   └── PeerRoomCard.tsx   ← Peer interview room card
│   │
│   └── ui/                    ← ShadCN-style base components
│       ├── button.tsx, input.tsx, card.tsx, etc.
│
└── pages/                    ← Route-level page components
    ├── Home.tsx               ← Landing page / dashboard
    │
    ├── auth/
    │   ├── Login.tsx          ← Login form
    │   ├── Register.tsx       ← Register form
    │   ├── VerifyEmail.tsx    ← Email verification page
    │   ├── ForgotPassword.tsx ← Forgot password form
    │   └── ResetPassword.tsx  ← Reset password form
    │
    ├── problems/
    │   ├── ProblemsIndex.tsx  ← Problem list (table with filters)
    │   └── ProblemSolve.tsx   ← Full IDE — split pane (problem + editor + output)
    │
    ├── articles/
    │   ├── ArticlesIndex.tsx  ← Articles list with search/tags
    │   ├── ArticleDetail.tsx  ← Full article view + comments
    │   └── ArticleCreate.tsx  ← Article editor page
    │
    ├── questions/
    │   ├── QuestionsIndex.tsx ← Q&A list
    │   ├── QuestionDetail.tsx ← Question + answers + comments
    │   └── QuestionCreate.tsx ← Ask question form
    │
    ├── notes/
    │   ├── NotesIndex.tsx     ← User's notes list
    │   └── NoteEditor.tsx     ← Note editor (rich text)
    │
    ├── roadmaps/
    │   ├── RoadmapsIndex.tsx  ← Roadmap cards landing page
    │   └── RoadmapDetail.tsx  ← Vertical spine view (desktop) / accordion (mobile)
    │
    ├── sheets/
    │   ├── SheetsIndex.tsx    ← DSA sheets list
    │   └── SheetDetail.tsx    ← Sheet problems with progress tracking
    │
    ├── studyPlan/
    │   ├── StudyPlansIndex.tsx ← User's study plans
    │   ├── LearningPathDetail.tsx ← Plan detail + items
    │   └── CreateLearningPath.tsx ← Create/AI generate plan
    │
    ├── companies/
    │   ├── CompaniesIndex.tsx ← Companies list
    │   └── CompanyDetail.tsx  ← Company profile + problems + experiences
    │
    ├── interviews/
    │   ├── InterviewsIndex.tsx ← Interview prep hub
    │   ├── MockInterviewSession.tsx ← AI mock interview chat
    │   └── PeerInterviewLobby.tsx ← Peer interview rooms
    │
    ├── contests/
    │   ├── ContestsIndex.tsx  ← Active contests list
    │   └── ContestDetail.tsx  ← Contest problems + leaderboard
    │
    ├── leaderboard/
    │   └── Leaderboard.tsx    ← Global XP leaderboard
    │
    ├── spacedRepetition/
    │   └── SpacedRepetition.tsx ← Flashcard review interface
    │
    ├── docs/
    │   ├── DocumentationPage.tsx ← Main docs page
    │   ├── components/         ← InteractiveCodeBlock, QuizBlock, etc.
    │   ├── hooks/              ← Docs-specific hooks
    │   └── utils/              ← Color tokens, helpers
    │
    ├── profile/
    │   └── ProfilePage.tsx    ← User profile (stats, badges, activity)
    │
    ├── search/
    │   └── SearchResults.tsx  ← Global search results page
    │
    ├── analytics/
    │   └── AnalyticsDashboard.tsx ← User analytics
    │
    └── admin/
        └── AdminPanel.tsx     ← Admin dashboard (user management, etc.)
```

---

## DATA FLOW — KAISE SAB CONNECTED HAI

### 1. API Call ka Safar (Frontend → Backend → Frontend)

```
Page Component (pages/)
    │
    ├── Custom Hook use karta hai (hooks/)
    │   │
    │   ├── React Query — useQuery / useMutation
    │   │   │
    │   │   └── API function call karta hai (api/)
    │   │       │
    │   │       └── Axios client (api/client.ts)
    │   │           │
    │   │           ├── Base URL: http://localhost:8000/api/v1
    │   │           ├── Auth header: Bearer {token} (authStore se)
    │   │           └── Response interceptor: 401 pe auto-refresh / logout
    │   │
    │   │   Response aata hai
    │   │   │
    │   │   └── React Query cache mein store
    │   │       ├── Automatic refetch on window focus
    │   │       ├── Stale time manage karta hai
    │   │       └── Cache invalidation on mutations
    │   │
    │   └── Hook return karta hai: { data, isLoading, isError, ... }
    │
    └── Component render hota hai data se
```

### 2. Authentication Flow

```
[Login]
Login.tsx page
    │
    └── useAuth().login() hook
        │
        └── api/auth.ts → POST /auth/login
            │
            Response: { access_token, refresh_token, user }
            │
            └── authStore.ts (Zustand) mein save hota hai
                ├── token → localStorage + store
                ├── user → store
                └── isAuthenticated = true
                    │
                    └── api/client.ts interceptor
                        └── Har request mein Bearer token lagta hai

[Protected Routes]
App.tsx → ProtectedRoute component
    │
    └── authStore.isAuthenticated check
        ├── true → Page render
        └── false → Redirect to /login

[Token Refresh]
api/client.ts response interceptor
    │
    └── 401 error aaye toh
        ├── api/auth.ts → POST /auth/refresh
        │   └── New access token milta hai
        │       └── authStore update + retry original request
        │
        └── Refresh bhi fail → logout + redirect /login
```

### 3. Problem Solving Flow

```
ProblemsIndex.tsx → Problem list dikhata hai
    │
    └── useProblems() hook → api/problems.ts → GET /problems
    │
    User clicks problem
    │
    ▼
ProblemSolve.tsx → Split pane IDE
    ├── Left: Problem description + test cases
    ├── Right: CodeEditor.tsx (Monaco Editor)
    │   └── Language selector, theme, font size
    │
    [Run Button Click]
    │
    └── useRunCode() hook → api/problems.ts → POST /problems/{slug}/run
        │
        └── Backend → Piston → Results back
            │
            └── TestCasePanel.tsx mein output dikhta hai
                ├── Pass/Fail per test case
                ├── stdout/stderr
                └── Execution time
    │
    [Submit Button Click]
    │
    └── useSubmitSolution() hook → api/problems.ts → POST /problems/{slug}/submit
        │
        └── Backend judges all test cases
            │
            └── Verdict dikhta hai: Accepted / Wrong Answer / TLE / etc.
                ├── SubmissionList.tsx update hota hai
                └── XP award notification
```

### 4. Roadmap Flow

```
RoadmapsIndex.tsx → Roadmap cards
    │
    └── useRoadmaps() hook → api/roadmaps.ts → GET /roadmaps
    │
    User clicks roadmap
    │
    ▼
RoadmapDetail.tsx
    ├── Header: title, description, progress bar
    │
    ├── Desktop (md+): RoadmapVerticalView.tsx
    │   ├── Vertical spine line (CSS gradient)
    │   ├── Section cards (centered, color-coded)
    │   ├── Step cards (left/right alternating)
    │   │   │
    │   │   ├── [Checkbox Click] → onToggle()
    │   │   │   ├── useUpdateProgress() → PUT /roadmaps/{id}/nodes/{nodeId}/progress
    │   │   │   ├── ParticleCanvas.burst() → Green particles
    │   │   │   ├── sounds.ts → playCompleteSound()
    │   │   │   ├── useCompletionFx → XP toast + combo counter
    │   │   │   └── Section all done? → Confetti + section banner
    │   │   │
    │   │   └── [Card Click] → stepPanelStore.openPanel()
    │   │       │
    │   │       └── StepDetailPanel.tsx (fixed right side)
    │   │           ├── NotesTab → api/roadmapSteps.ts → notes CRUD
    │   │           ├── AIChatTab → AI help for step
    │   │           ├── ReviewTab → Spaced repetition
    │   │           └── AnalyticsTab → Time tracking
    │   │
    │   └── MiniTableOfContents (xl screens pe floating sidebar)
    │
    └── Mobile (<md): SectionAccordion components
        └── Simple expandable sections with checkboxes
```

### 5. State Management — Kya Kahan Store Hota Hai

```
[Server State — React Query]
├── Problems list, details, submissions
├── Articles, Questions, Answers
├── Roadmaps, progress
├── User profiles, stats
├── Notifications, bookmarks
├── Everything that comes from backend API
│
[Client State — Zustand Stores]
├── authStore.ts
│   ├── token (access token)
│   ├── user (current user object)
│   ├── isAuthenticated (boolean)
│   └── Actions: login(), logout(), updateUser()
│
└── stepPanelStore.ts
    ├── isOpen, selectedStepId, selectedStepTitle
    ├── roadmapId, roadmapTitle
    ├── activeTab (notes/ai-chat/review/analytics)
    └── Actions: openPanel(), closePanel(), setActiveTab()
│
[Local State — useState]
├── Form inputs, filters, search queries
├── UI toggles (modals, dropdowns, accordions)
└── Page-specific temporary state
```

---

## DETAILED FILE BREAKDOWN

### `main.tsx` — Entry Point

**Kya karta hai**: React app ko DOM mein mount karta hai.

```
main.tsx
    └── React.StrictMode
        └── QueryClientProvider (TanStack Query)
            └── BrowserRouter (React Router)
                └── App.tsx
```

### `App.tsx` — Routing

**Kya karta hai**: Saare routes define karta hai React Router se.

**Structure**:
```
<Routes>
    <Route element={<MainLayout />}>   ← Header + Footer wrapper
        <Route path="/" element={<Home />} />
        <Route path="/problems" element={<ProblemsIndex />} />
        <Route path="/problems/:slug" element={<ProblemSolve />} />
        <Route path="/articles" element={<ArticlesIndex />} />
        <Route path="/articles/:slug" element={<ArticleDetail />} />
        <Route path="/roadmaps" element={<RoadmapsIndex />} />
        <Route path="/roadmaps/:slug" element={<RoadmapDetail />} />
        <Route path="/sheets" element={<SheetsIndex />} />
        <Route path="/sheets/:slug" element={<SheetDetail />} />
        <Route path="/docs" element={<DocumentationPage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        ... aur bohot saare routes
        │
        ├── <ProtectedRoute> wrapper:
        │   ├── /notes, /study-plans, /profile, /admin
        │   └── Logged in nahi hai toh /login pe redirect
        │
        └── <GuestRoute> wrapper:
            ├── /login, /register
            └── Already logged in toh / pe redirect
    </Route>
</Routes>
```

### `index.css` — Global Styles

**Kya hai**:
- Tailwind CSS import
- CSS custom properties (theme colors, radius)
- Custom keyframe animations:
  - `fadeInUp`, `slideInUp`, `scaleIn` — General UI
  - `xpFloat`, `comboPop`, `sectionBanner` — Roadmap gamification
  - `nodeGlow`, `sectionGlow` — Completed step/section effects
  - `shake` — Screen shake on completion
  - `shimmer`, `pulseGlow`, `gradientShift` — CTA effects
  - `firePulse` — Streak fire animation
- Roadmap spine + connector CSS (naya add kiya)

---

## API LAYER (`api/`)

### `client.ts` — Axios Instance

**Kya karta hai**: Base axios instance configure karta hai.

**Features**:
- `baseURL`: `http://localhost:8000/api/v1`
- Request interceptor: `authStore` se token leke `Authorization: Bearer {token}` header lagata hai
- Response interceptor: 401 pe refresh attempt → fail toh logout

**Kaun use karta hai**: Saari api/ files isko import karke use karti hain.

### Pattern — Har API File Same Hai:

```typescript
// api/problems.ts (example)
import client from "./client";

export async function getProblems(params) {
    const { data } = await client.get("/problems", { params });
    return data;
}

export async function runCode(payload) {
    const { data } = await client.post(`/problems/${id}/run`, payload);
    return data;
}
```

---

## HOOKS LAYER (`hooks/`)

> Ye React Query ke wrappers hain. Har hook ek API function ko wrap karta hai caching, loading states, aur cache invalidation ke saath.

### Pattern — Har Hook Same Hai:

```typescript
// hooks/useProblems.ts (example)

// READ — useQuery
export function useProblems(page, difficulty, search) {
    return useQuery({
        queryKey: ['problems', page, difficulty, search],
        queryFn: () => problemsApi.getProblems({ page, difficulty, search }),
        select: (res) => res.data,  // APIResponse envelope se data nikalna
    });
}

// WRITE — useMutation
export function useSubmitSolution() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload) => problemsApi.submitSolution(payload),
        onSuccess: () => {
            // Cache invalidate — fresh data fetch hoga
            queryClient.invalidateQueries({ queryKey: ['problems'] });
            queryClient.invalidateQueries({ queryKey: ['submissions'] });
        },
    });
}
```

### Hooks → API Mapping:

| Hook File | API File | Kya Features |
|---|---|---|
| `useAuth.ts` | `api/auth.ts` | login, register, logout, refresh, me |
| `useProblems.ts` | `api/problems.ts` | list, detail, runCode, submit, submissions |
| `useArticles.ts` | `api/articles.ts` | list, detail, create, update, delete, vote |
| `useQuestions.ts` | `api/questions.ts` | list, detail, create, answer, vote |
| `useComments.ts` | `api/comments.ts` | list, create, reply, vote, delete |
| `useNotes.ts` | `api/notes.ts` | list, create, update, delete, collaborators |
| `useRoadmaps.ts` | `api/roadmaps.ts` | list, detail, updateProgress |
| `useDSASheets.ts` | `api/dsaSheets.ts` | list, detail, toggleProgress |
| `useStudyPlans.ts` | `api/studyPlans.ts` | list, create, AIgenerate |
| `useInterviews.ts` | `api/interviews.ts` | mockStart, mockMessage, peerRooms |
| `useCompanies.ts` | `api/companies.ts` | list, detail, addExperience |
| `useContests.ts` | `api/contests.ts` | list, detail, join, leaderboard |
| `useGamification.ts` | `api/gamification.ts` | profile, leaderboard, streaks |
| `useBookmarks.ts` | `api/bookmarks.ts` | list, toggle |
| `useNotifications.ts` | `api/notifications.ts` | list, unreadCount, markRead |
| `useSearch.ts` | `api/search.ts` | global search (debounced) |

---

## STORES (`stores/`)

### `authStore.ts` — Authentication State

```typescript
{
    token: string | null,          // JWT access token
    user: User | null,             // Current user object
    isAuthenticated: boolean,      // Quick check

    login(token, user),            // Login ke baad call
    logout(),                      // Clear everything
    updateUser(user),              // Profile update ke baad
    setToken(token),               // Token refresh ke baad
}
```

**Kaun use karta hai**:
- `api/client.ts` — Token header ke liye
- `hooks/useAuth.ts` — Login/logout actions
- `ProtectedRoute.tsx` — Auth check
- `Header.tsx` — User menu show/hide

### `stepPanelStore.ts` — Roadmap Step Panel

```typescript
{
    isOpen: boolean,
    selectedStepId: string,
    selectedStepTitle: string,
    selectedStepDescription: string,
    roadmapId: string,
    roadmapTitle: string,
    activeTab: 'notes' | 'ai-chat' | 'review' | 'analytics',

    openPanel({ stepId, stepTitle, ... }),
    closePanel(),
    setActiveTab(tab),
}
```

**Kaun use karta hai**: `RoadmapVerticalView.tsx` (open) → `StepDetailPanel.tsx` (read + close)

---

## COMPONENTS — Feature-wise Breakdown

### Layout Components

**`Header.tsx`** — Top navigation bar
- NAV_LINKS array — saare nav items define (Problems, Articles, Roadmaps, etc.)
- Search bar (global search ke liye)
- Notification bell (unread count badge)
- User avatar menu (profile, settings, logout)
- Mobile hamburger menu

**`MainLayout.tsx`** — Page wrapper
- Header render karta hai
- `<Outlet />` (React Router) — page content yahan aata hai
- Footer render karta hai

### Common Components

| Component | Kya hai |
|---|---|
| `LoadingSpinner.tsx` | Spinning loader (size variants: sm, md, lg) |
| `EmptyState.tsx` | "Nothing found" placeholder with icon |
| `Pagination.tsx` | Page navigation buttons |
| `SearchBar.tsx` | Search input with debounce |
| `TagBadge.tsx` | Colored tag chip |
| `MarkdownRenderer.tsx` | Markdown → HTML (react-markdown + remark-gfm) |

### Roadmap Components (Most Complex)

```
RoadmapVerticalView.tsx (Main component)
    │
    ├── MiniTableOfContents ← Floating sidebar (xl screens)
    │   └── Section list with progress dots
    │
    ├── SectionCard ← Centered card on spine
    │   ├── Numbered badge (gradient)
    │   ├── Title + description
    │   ├── Progress bar
    │   └── Framer Motion whileInView animation
    │
    ├── StepCard ← Left/right branching cards
    │   ├── Checkbox (completion toggle)
    │   ├── Title + description preview
    │   ├── Resource link
    │   ├── Due-for-review badge (amber pulse)
    │   ├── CSS connector lines (::before/::after)
    │   └── Framer Motion slide-in animation
    │
    ├── SpineDot ← Colored dots on spine line
    │
    ├── ParticleCanvas ← Canvas particle effects (fixed overlay)
    │   ├── burst() — Green particles on completion
    │   ├── confetti() — Section complete celebration
    │   └── Ambient particles (floating background)
    │
    ├── CompletionFx ← UI overlays
    │   ├── XP toast ("+30 XP" float up)
    │   ├── Combo counter ("x3 Combo!")
    │   └── Section banner ("Section Complete!")
    │
    ├── sounds.ts ← Web Audio API
    │   ├── playCompleteSound() — Step complete chirp
    │   ├── playUncompleteSound() — Step uncomplete
    │   ├── playComboSound(n) — Combo chime (pitch increases)
    │   └── playSectionCompleteSound() — Section complete fanfare
    │
    └── StepDetailPanel.tsx ← Fixed right panel
        ├── NotesTab — Markdown notes editor
        ├── AIChatTab — AI assistant chat
        ├── ReviewTab — Spaced repetition
        └── AnalyticsTab — Time tracking charts
```

### Problem Solving Components

```
ProblemSolve.tsx
    ├── Problem description panel (left)
    │   ├── Title, difficulty badge
    │   ├── Description (markdown)
    │   ├── Constraints, input/output format
    │   ├── Sample test cases
    │   └── Hints, editorial (toggle)
    │
    ├── CodeEditor.tsx (right)
    │   ├── Monaco Editor (VS Code engine)
    │   ├── Language selector dropdown
    │   ├── Run button → useRunCode()
    │   └── Submit button → useSubmitSolution()
    │
    ├── TestCasePanel.tsx (bottom)
    │   ├── Input/Expected/Actual output
    │   ├── Pass/Fail indicator
    │   └── Custom input support
    │
    └── SubmissionList.tsx
        └── Table: verdict, language, runtime, memory, timestamp
```

---

## DOCUMENTATION PLATFORM (`data/docs/` + `pages/docs/`)

**Architecture**: Static data in TypeScript files, rendered dynamically.

```
data/docs/
    ├── types.ts ← DocCategory, DocEntry, DocSection, LanguageConfig
    ├── index.ts ← All languages aggregate
    ├── [language].ts ← Config + category imports
    └── _[lang]_partN.ts ← Actual content (split for bundle size)

pages/docs/
    ├── DocumentationPage.tsx ← Main docs page
    ├── components/
    │   ├── InteractiveCodeBlock.tsx ← Monaco + Piston API (run in browser!)
    │   ├── QuizBlock.tsx ← Multiple choice quizzes
    │   ├── ChallengeBlock.tsx ← Coding challenges
    │   ├── ComparisonView.tsx ← Language comparison tables
    │   └── CheatSheetView.tsx ← Quick reference cards
    ├── hooks/ ← Docs-specific hooks
    └── utils/ ← Color tokens, helpers
```

**Stats**: 574 entries, 6 languages, ~105K lines of content

---

## RESPONSIVE DESIGN STRATEGY

| Screen Size | Kya hota hai |
|---|---|
| **Mobile (<768px)** | Single column, hamburger nav, accordion roadmaps, stacked layouts |
| **Tablet (768-1023px)** | Two column where possible, roadmap spine on left edge |
| **Desktop (1024px+)** | Full layouts, roadmap 3-column alternating, side panels |
| **XL (1280px+)** | Mini TOC sidebar visible on roadmaps, wider content areas |

---

## KEY ARCHITECTURAL PATTERNS

1. **Feature-based Organization** — Pages, components, hooks, API sab feature ke naam se organized
2. **Custom Hook Pattern** — Saare API calls hooks mein wrapped (React Query)
3. **Zustand for Client State** — Minimal global state (auth + step panel)
4. **React Query for Server State** — Caching, refetching, invalidation automatic
5. **Axios Interceptors** — Auth header aur token refresh transparently handle
6. **Code Splitting** — Lazy loading for heavy pages (docs, problem editor)
7. **Static Data Files** — Docs content TypeScript mein (no backend needed)
8. **CSS-in-Tailwind** — Utility classes + custom CSS for complex animations
9. **Framer Motion** — Scroll-based animations (whileInView)
10. **Polymorphic Components** — CommentSection kisi bhi content type pe kaam karta hai

---

## FILE CONNECTION MAP (Quick Reference)

```
App.tsx (routing)
    │
    ├── MainLayout.tsx
    │   └── Header.tsx ← authStore (user menu)
    │
    ├── pages/*.tsx ← Har page apne hooks use karta hai
    │   ├── hooks/*.ts ← Har hook apni API file call karta hai
    │   │   └── api/*.ts ← Har API file client.ts use karti hai
    │   │       └── client.ts ← authStore se token, base URL config
    │   │
    │   └── components/*.tsx ← Shared components
    │
    └── stores/
        ├── authStore.ts ← client.ts + Header.tsx + ProtectedRoute.tsx
        └── stepPanelStore.ts ← RoadmapVerticalView.tsx + StepDetailPanel.tsx
```

---

## PACKAGE.JSOdb_connect.pyN KEY DEPENDENCIES

| Package | Kya kaam hai |
|---|---|
| `react` + `react-dom` | Core React |
| `react-router-dom` | Client routing |
| `@tanstack/react-query` | Server state (API caching) |
| `zustand` | Client state |
| `axios` | HTTP client |
| `framer-motion` | Animations |
| `@monaco-editor/react` | Code editor |
| `lucide-react` | Icons |
| `tailwindcss` | CSS framework |
| `react-markdown` + `remark-gfm` | Markdown rendering |
| `react-hot-toast` | Toast notifications |
| `date-fns` | Date formatting |
| `recharts` | Charts (analytics) |
