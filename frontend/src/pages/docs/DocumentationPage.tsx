import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  BookOpen,
  ExternalLink,
  X,
  Maximize2,
  Minimize2,
  Menu,
  ArrowLeft,
  GitCompare,
  FileText,
} from 'lucide-react';
import { ALL_LANGUAGES, getLanguage } from '@/data/docs';
import { getColors } from './utils/colorTokens';
import { findEntryById } from './utils/docHelpers';
import { useDocProgress } from './hooks/useDocProgress';
import { useDocSearch } from './hooks/useDocSearch';
import { useDocNavigation } from './hooks/useDocNavigation';
import { useDocTheme } from './hooks/useDocTheme';
import DocLeftSidebar from './components/DocLeftSidebar';
import DocRightSidebar from './components/DocRightSidebar';
import DocCenterContent from './components/DocCenterContent';
import DocMobileSidebar from './components/DocMobileSidebar';
import DocMobileBottomBar from './components/DocMobileBottomBar';
import DocSearchOverlay from './components/DocSearchOverlay';
import ComparisonView from './components/ComparisonView';
import CheatSheetView from './components/CheatSheetView';

type ViewMode = 'docs' | 'compare' | 'cheatsheet';

export default function DocumentationPage() {
  /* ---- State ---- */
  const [selectedLangId, setSelectedLangId] = useState('python');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('docs');

  /* ---- Refs ---- */
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  /* ---- Derived ---- */
  const lang = getLanguage(selectedLangId) ?? ALL_LANGUAGES[0]!;
  const colors = getColors(lang.id);

  /* ---- Hooks ---- */
  const { markCompleted, isCompleted, getCompletedCount, getLastVisited } =
    useDocProgress();
  const searchResults = useDocSearch(searchQuery);
  const {
    selectedEntryId,
    setSelectedEntryId,
    activeSectionId,
    scrollProgress,
    collapsedCategories,
    contentRef,
    handleSelectEntry,
    handleToggleCategory,
    handleScrollToSection,
  } = useDocNavigation(lang);

  useDocTheme();

  /* ---- Entry completion callbacks ---- */
  const isEntryCompleted = useCallback(
    (entryId: string) => isCompleted(selectedLangId, entryId),
    [isCompleted, selectedLangId],
  );

  const handleMarkCompleted = useCallback(
    (entryId: string) => markCompleted(selectedLangId, entryId),
    [markCompleted, selectedLangId],
  );

  const completedCount = getCompletedCount(selectedLangId);
  const lastVisitedId = getLastVisited(selectedLangId);

  /* ---- Reset on language change ---- */
  useEffect(() => {
    setSearchQuery('');
    setSearchOpen(false);
    if (viewMode !== 'compare') setViewMode('docs');
  }, [selectedLangId]);

  /* ---- Keyboard shortcuts ---- */
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
        searchInputRef.current?.focus();
        return;
      }
      if (e.key === 'Escape') {
        if (searchOpen) {
          setSearchOpen(false);
          setSearchQuery('');
          searchInputRef.current?.blur();
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen]);

  /* ---- Close search on outside click ---- */
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setSearchOpen(false);
      }
    }
    if (searchOpen) {
      document.addEventListener('mousedown', handleClick);
      return () => document.removeEventListener('mousedown', handleClick);
    }
  }, [searchOpen]);

  /* ---- Fullscreen toggle ---- */
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    function onFsChange() {
      setIsFullscreen(!!document.fullscreenElement);
    }
    document.addEventListener('fullscreenchange', onFsChange);
    return () =>
      document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  /* ---- Search select handler ---- */
  const handleSearchSelect = useCallback(
    (langId: string, entryId: string) => {
      if (langId !== selectedLangId) {
        setSelectedLangId(langId);
      }
      setTimeout(() => {
        setSelectedEntryId(entryId);
        setSearchOpen(false);
        setSearchQuery('');
        setViewMode('docs');
        setTimeout(() => {
          contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
        }, 50);
      }, 10);
    },
    [selectedLangId, setSelectedEntryId, contentRef],
  );

  const handleLangChange = useCallback((id: string) => {
    setSelectedLangId(id);
  }, []);

  const handleCheatSheetSelectEntry = useCallback(
    (entryId: string) => {
      setViewMode('docs');
      handleSelectEntry(entryId);
    },
    [handleSelectEntry],
  );

  /* ---- Current entry for TOC ---- */
  const currentEntryData = selectedEntryId
    ? findEntryById(lang.categories, selectedEntryId)
    : null;

  /* ================================================================ */
  /*  Render                                                           */
  /* ================================================================ */

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-white transition-colors">
      {/* ============================================================ */}
      {/*  Top Bar                                                      */}
      {/* ============================================================ */}
      <header className="h-12 shrink-0 flex items-center gap-3 px-3 sm:px-4 border-b border-gray-200 bg-white z-30 transition-colors">
        {/* Left: Hamburger (mobile) + Back + Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="p-1.5 rounded-md hover:bg-gray-100 transition-colors lg:hidden"
          >
            <Menu className="w-4 h-4 text-gray-600" />
          </button>

          <Link
            to="/"
            className="flex items-center gap-1.5 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-bold hidden sm:inline">
              LearnText
            </span>
          </Link>
        </div>

        {/* Center: Language tabs */}
        <div className="flex-1 flex items-center justify-center gap-1 overflow-x-auto scrollbar-none mx-2">
          {ALL_LANGUAGES.map((l) => {
            const lc = getColors(l.id);
            const isActive = selectedLangId === l.id;
            return (
              <button
                key={l.id}
                onClick={() => handleLangChange(l.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 whitespace-nowrap shrink-0 ${
                  isActive
                    ? `${lc.tabActive} border shadow-sm`
                    : 'bg-transparent text-gray-500 border-transparent hover:bg-gray-50 hover:text-gray-700'
                }`}
              >
                <span className="text-sm">{l.icon}</span>
                <span className="hidden sm:inline">{l.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right: View mode toggles + Theme + Search + Fullscreen + Official docs */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Compare toggle */}
          <button
            onClick={() =>
              setViewMode(viewMode === 'compare' ? 'docs' : 'compare')
            }
            className={`p-1.5 rounded-md transition-colors hidden sm:flex ${
              viewMode === 'compare'
                ? 'bg-blue-100 text-blue-600'
                : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
            }`}
            title="Compare languages"
          >
            <GitCompare className="w-3.5 h-3.5" />
          </button>

          {/* Cheat Sheet toggle */}
          <button
            onClick={() =>
              setViewMode(viewMode === 'cheatsheet' ? 'docs' : 'cheatsheet')
            }
            className={`p-1.5 rounded-md transition-colors hidden sm:flex ${
              viewMode === 'cheatsheet'
                ? 'bg-blue-100 text-blue-600'
                : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
            }`}
            title="Cheat Sheet"
          >
            <FileText className="w-3.5 h-3.5" />
          </button>

          {/* Search */}
          <div ref={searchContainerRef} className="relative">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value) setSearchOpen(true);
                }}
                onFocus={() => {
                  if (searchQuery) setSearchOpen(true);
                }}
                placeholder="Search..."
                className="w-36 sm:w-48 pl-8 pr-8 py-1.5 text-xs border border-gray-200 rounded-lg bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 focus:bg-white transition-all"
              />
              {searchQuery ? (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSearchOpen(false);
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3 h-3" />
                </button>
              ) : (
                <kbd className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] text-gray-400 font-mono bg-gray-100 px-1 py-0.5 rounded border border-gray-200 hidden sm:inline">
                  {'\u2318'}K
                </kbd>
              )}
            </div>

            {searchOpen && searchQuery.trim() && (
              <DocSearchOverlay
                query={searchQuery}
                results={searchResults}
                onSelect={handleSearchSelect}
              />
            )}
          </div>

          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors hidden sm:flex"
            title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? (
              <Minimize2 className="w-3.5 h-3.5" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5" />
            )}
          </button>

          <a
            href={lang.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
            title="Official docs"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      {/* ============================================================ */}
      {/*  Main Content Area                                            */}
      {/* ============================================================ */}
      {viewMode === 'compare' ? (
        <ComparisonView
          initialLangA={selectedLangId}
          initialLangB={selectedLangId === 'python' ? 'javascript' : 'python'}
          onBack={() => setViewMode('docs')}
        />
      ) : viewMode === 'cheatsheet' ? (
        <div className="flex-1 overflow-hidden">
          <CheatSheetView
            lang={lang}
            colors={colors}
            onSelectEntry={handleCheatSheetSelectEntry}
          />
        </div>
      ) : (
        <div className="flex-1 flex overflow-hidden">
          {/* Left sidebar (desktop) */}
          <div className="hidden lg:flex">
            <DocLeftSidebar
              lang={lang}
              colors={colors}
              selectedEntryId={selectedEntryId}
              onSelectEntry={handleSelectEntry}
              collapsedCategories={collapsedCategories}
              onToggleCategory={handleToggleCategory}
              isEntryCompleted={isEntryCompleted}
              completedCount={completedCount}
            />
          </div>

          {/* Center content */}
          <DocCenterContent
            lang={lang}
            colors={colors}
            selectedEntryId={selectedEntryId}
            contentRef={contentRef}
            onSelectEntry={handleSelectEntry}
            scrollProgress={scrollProgress}
            isEntryCompleted={isEntryCompleted}
            onMarkCompleted={handleMarkCompleted}
            completedCount={completedCount}
            lastVisitedId={lastVisitedId}
          />

          {/* Right sidebar / TOC (desktop only, xl) */}
          {currentEntryData && (
            <DocRightSidebar
              entry={currentEntryData.entry}
              activeSectionId={activeSectionId}
              onScrollTo={handleScrollToSection}
              colors={colors}
            />
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/*  Mobile Sidebar Drawer                                        */}
      {/* ============================================================ */}
      <DocMobileSidebar
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
        lang={lang}
        colors={colors}
        selectedEntryId={selectedEntryId}
        onSelectEntry={handleSelectEntry}
        collapsedCategories={collapsedCategories}
        onToggleCategory={handleToggleCategory}
        isEntryCompleted={isEntryCompleted}
        completedCount={completedCount}
      />

      {/* ============================================================ */}
      {/*  Mobile Bottom Bar                                            */}
      {/* ============================================================ */}
      <DocMobileBottomBar
        onBack={() => {
          if (selectedEntryId) {
            setSelectedEntryId(null);
          }
        }}
        onToggleToc={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        onOpenSearch={() => {
          setSearchOpen(true);
          searchInputRef.current?.focus();
        }}
      />
    </div>
  );
}
