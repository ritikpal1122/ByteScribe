import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

import MainLayout from './components/layout/MainLayout';
import HomeLayout from './components/layout/HomeLayout';
import AuthLayout from './components/layout/AuthLayout';

// Pages
import Home from './pages/Home';
import NotFound from './pages/NotFound';

// Auth
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import GitHubCallback from './pages/auth/GitHubCallback';
import VerifyEmail from './pages/auth/VerifyEmail';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';

// Articles
import ArticlesIndex from './pages/articles/ArticlesIndex';
import ArticleDetail from './pages/articles/ArticleDetail';
import ArticleCreate from './pages/articles/ArticleCreate';
import ArticleEdit from './pages/articles/ArticleEdit';

// Notes
import NotesIndex from './pages/notes/NotesIndex';
import NoteDetail from './pages/notes/NoteDetail';
import NoteEditor from './pages/notes/NoteEditor';

// Roadmaps
import RoadmapsIndex from './pages/roadmaps/RoadmapsIndex';
import RoadmapDetail from './pages/roadmaps/RoadmapDetail';

// Problems
import ProblemsIndex from './pages/problems/ProblemsIndex';
import ProblemSolve from './pages/problems/ProblemSolve';

// Companies
import CompaniesIndex from './pages/companies/CompaniesIndex';
import CompanyDetail from './pages/companies/CompanyDetail';
import AddExperience from './pages/companies/AddExperience';

// Interviews
import MockInterviewSetup from './pages/interviews/MockInterviewSetup';
import MockInterviewSession from './pages/interviews/MockInterviewSession';
import PeerInterviewLobby from './pages/interviews/PeerInterviewLobby';
import PeerInterviewRoom from './pages/interviews/PeerInterviewRoom';

// Profile
import MyProfile from './pages/profile/MyProfile';
import PublicProfile from './pages/profile/PublicProfile';
import Settings from './pages/profile/Settings';

// Sheets
import SheetsIndex from './pages/sheets/SheetsIndex';
import SheetDetail from './pages/sheets/SheetDetail';

// Contests
import ContestsIndex from './pages/contests/ContestsIndex';
import ContestDetail from './pages/contests/ContestDetail';

// Spaced Repetition
import ReviewSession from './pages/spacedRepetition/ReviewSession';

// Analytics & Admin
import AnalyticsDashboard from './pages/analytics/AnalyticsDashboard';
import AdminPanel from './pages/admin/AdminPanel';

// Study Plan
import MyStudyPlan from './pages/studyPlan/MyStudyPlan';
import CreateLearningPath from './pages/studyPlan/CreateLearningPath';
import LearningPathDetail from './pages/studyPlan/LearningPathDetail';
import Leaderboard from './pages/leaderboard/Leaderboard';
import SearchResults from './pages/search/SearchResults';
import DocumentationPage from './pages/docs/DocumentationPage';
import InterviewPrepPage from './pages/interview-prep/InterviewPrepPage';

// Footer pages
import About from './pages/About';
import Legal from './pages/Legal';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Auth pages with minimal layout */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/auth/github/callback" element={<GitHubCallback />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>

          {/* Home page with full-width layout */}
          <Route element={<HomeLayout />}>
            <Route path="/" element={<Home />} />
          </Route>

          {/* Full-screen documentation */}
          <Route path="/docs" element={<DocumentationPage />} />

          {/* Main app with constrained layout */}
          <Route element={<MainLayout />}>

            {/* Articles */}
            <Route path="/articles" element={<ArticlesIndex />} />
            <Route path="/articles/new" element={<ArticleCreate />} />
            <Route path="/articles/:slug" element={<ArticleDetail />} />
            <Route path="/articles/:slug/edit" element={<ArticleEdit />} />

            {/* Notes */}
            <Route path="/notes" element={<NotesIndex />} />
            <Route path="/notes/new" element={<NoteEditor />} />
            <Route path="/notes/:id" element={<NoteDetail />} />

            {/* Roadmaps */}
            <Route path="/roadmaps" element={<RoadmapsIndex />} />
            <Route path="/roadmaps/:slug" element={<RoadmapDetail />} />

            {/* Problems */}
            <Route path="/problems" element={<ProblemsIndex />} />
            <Route path="/problems/:slug" element={<ProblemSolve />} />

            {/* Sheets */}
            <Route path="/sheets" element={<SheetsIndex />} />
            <Route path="/sheets/:slug" element={<SheetDetail />} />

            {/* Companies */}
            <Route path="/companies" element={<CompaniesIndex />} />
            <Route path="/companies/:slug" element={<CompanyDetail />} />
            <Route path="/companies/:slug/experiences/new" element={<AddExperience />} />

            {/* Interviews */}
            <Route path="/interviews/mock" element={<MockInterviewSetup />} />
            <Route path="/interviews/mock/:id" element={<MockInterviewSession />} />
            <Route path="/interviews/peer" element={<PeerInterviewLobby />} />
            <Route path="/interviews/peer/:code" element={<PeerInterviewRoom />} />

            {/* Contests */}
            <Route path="/contests" element={<ContestsIndex />} />
            <Route path="/contests/:slug" element={<ContestDetail />} />

            {/* Spaced Repetition */}
            <Route path="/review" element={<ReviewSession />} />

            {/* Interview Prep */}
            <Route path="/interview-prep" element={<InterviewPrepPage />} />

            {/* Study Plan */}
            <Route path="/study-plan" element={<MyStudyPlan />} />
            <Route path="/study-plan/create" element={<CreateLearningPath />} />
            <Route path="/study-plan/:id" element={<LearningPathDetail />} />

            {/* Analytics & Admin */}
            <Route path="/analytics" element={<AnalyticsDashboard />} />
            <Route path="/admin" element={<AdminPanel />} />

            {/* Profile */}
            <Route path="/profile/me" element={<MyProfile />} />
            <Route path="/profile/:username" element={<PublicProfile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/search" element={<SearchResults />} />

            {/* Footer pages */}
            <Route path="/about" element={<About />} />
            <Route path="/legal" element={<Legal />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'var(--color-background)',
            color: 'var(--color-foreground)',
            border: '1px solid var(--color-border)',
          },
        }}
      />
    </QueryClientProvider>
  );
}
