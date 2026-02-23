import { useState, useMemo } from 'react';
import {
  Search,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Lightbulb,
  Target,
  Zap,
  Code2,
  HelpCircle,
} from 'lucide-react';
import { useLanguageDocs } from '@/hooks/useLanguageDocs';
import type { LanguageDocEntry } from '@/api/languageDocs';
import type { Problem } from '@/types';

/* ------------------------------------------------------------------ */
/*  Tag → search keyword mapping                                       */
/* ------------------------------------------------------------------ */

const TAG_KEYWORDS: Record<string, string[]> = {
  'array': ['Arrays', 'Lists', 'Vector', 'Sorting'],
  'string': ['String', 'String Operations'],
  'hash table': ['Hash', 'Map', 'Dict', 'Counter', 'Set'],
  'linked list': ['Linked'],
  'stack': ['Stack', 'Deque'],
  'queue': ['Queue', 'Deque', 'BFS'],
  'tree': ['Tree', 'BFS', 'DFS'],
  'binary tree': ['Tree', 'BFS', 'DFS'],
  'binary search tree': ['Binary Search', 'Tree'],
  'graph': ['BFS', 'DFS', 'Graph'],
  'heap': ['Heap', 'Priority Queue'],
  'priority queue': ['Heap', 'Priority Queue'],
  'trie': ['Trie', 'String'],
  'dynamic programming': ['Dynamic Programming'],
  'greedy': ['Sorting', 'Two Pointers'],
  'backtracking': ['DFS', 'Recursion'],
  'binary search': ['Binary Search'],
  'two pointers': ['Two Pointers'],
  'sliding window': ['Two Pointers', 'Deque'],
  'sorting': ['Sorting'],
  'math': ['Math'],
  'bit manipulation': ['Bit'],
  'recursion': ['DFS', 'Dynamic Programming'],
  'divide and conquer': ['Binary Search', 'Sorting'],
  'union find': ['Graph', 'DFS'],
  'matrix': ['Arrays', 'BFS', 'DFS'],
  'intervals': ['Sorting', 'Two Pointers'],
  'monotonic stack': ['Stack'],
};

const LANG_LABELS: Record<string, string> = {
  javascript: 'JavaScript',
  python: 'Python',
  cpp: 'C++',
  java: 'Java',
  go: 'Go',
  rust: 'Rust',
};

/* ------------------------------------------------------------------ */
/*  DocCard                                                            */
/* ------------------------------------------------------------------ */

function DocCard({ doc }: { doc: LanguageDocEntry }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-colors">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-3 py-2.5 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="text-sm font-medium text-gray-800">{doc.title}</span>
        {expanded ? (
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0" />
        ) : (
          <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
        )}
      </button>
      {expanded && (
        <div className="px-3 pb-3 space-y-2">
          <p className="text-xs text-gray-600 leading-relaxed">{doc.content}</p>
          {doc.code_example && (
            <pre className="bg-gray-900 text-gray-100 rounded-md p-3 text-xs font-mono overflow-x-auto leading-relaxed whitespace-pre-wrap">
              {doc.code_example}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface LanguageDocsPanelProps {
  language: string;
  problem: Problem;
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function LanguageDocsPanel({ language, problem }: LanguageDocsPanelProps) {
  const [search, setSearch] = useState('');
  const [showAllDocs, setShowAllDocs] = useState(false);

  // Fetch all docs for the current language
  const { data: allDocs = [], isLoading } = useLanguageDocs(language, {
    search: search.trim() || undefined,
  });

  // Compute keywords from problem tags
  const tagKeywords = useMemo(() => {
    const keywords = new Set<string>();
    (problem.tags ?? []).forEach((tag) => {
      const mapped = TAG_KEYWORDS[tag.toLowerCase()];
      if (mapped) mapped.forEach((k) => keywords.add(k.toLowerCase()));
    });
    return keywords;
  }, [problem.tags]);

  // Filter relevant docs based on tags
  const relevantDocs = useMemo(() => {
    if (tagKeywords.size === 0) return [];
    return allDocs.filter((doc) => {
      const titleLower = doc.title.toLowerCase();
      const contentLower = doc.content.toLowerCase();
      return Array.from(tagKeywords).some(
        (kw) => titleLower.includes(kw) || contentLower.includes(kw),
      );
    });
  }, [allDocs, tagKeywords]);

  // Parse hints (newline-separated or numbered)
  const hints = useMemo(() => {
    if (!problem.hints) return [];
    return problem.hints
      .split('\n')
      .map((h) => h.replace(/^\d+\.\s*/, '').trim())
      .filter(Boolean);
  }, [problem.hints]);

  // Group remaining docs by category for "All Docs" mode
  const groupedDocs = useMemo(() => {
    const map = new Map<string, LanguageDocEntry[]>();
    const docsToShow = showAllDocs ? allDocs : relevantDocs;
    docsToShow.forEach((doc) => {
      const list = map.get(doc.category) ?? [];
      list.push(doc);
      map.set(doc.category, list);
    });
    return map;
  }, [allDocs, relevantDocs, showAllDocs]);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 border-b border-gray-100 shrink-0">
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle className="w-4 h-4 text-blue-600" />
          <h3 className="text-sm font-semibold text-gray-800">
            Help &mdash; {LANG_LABELS[language] ?? language}
          </h3>
        </div>
        <p className="text-[11px] text-gray-500 mb-3">
          Contextual docs and hints for this problem
        </p>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search all docs..."
            className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-5">
        {isLoading ? (
          <div className="flex items-center justify-center py-10 text-gray-400 text-sm">
            Loading...
          </div>
        ) : (
          <>
            {/* ── Section 1: Problem Hints ── */}
            {hints.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <span className="text-sm font-semibold text-gray-700">Hints</span>
                </div>
                <div className="space-y-2">
                  {hints.map((hint, i) => (
                    <HintCard key={i} index={i + 1} text={hint} />
                  ))}
                </div>
              </div>
            )}

            {/* ── Section 2: Related Tags ── */}
            {problem.tags.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-semibold text-gray-700">Related Topics</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {problem.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* ── Section 3: Relevant Docs (based on tags) ── */}
            {!search && relevantDocs.length > 0 && !showAllDocs && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-semibold text-gray-700">
                    Relevant {LANG_LABELS[language] ?? language} Docs
                  </span>
                  <span className="text-[10px] text-gray-400">
                    {relevantDocs.length} matched
                  </span>
                </div>
                <div className="space-y-1.5">
                  {relevantDocs.map((doc) => (
                    <DocCard key={doc.id} doc={doc} />
                  ))}
                </div>
              </div>
            )}

            {/* ── Section 4: All Docs toggle ── */}
            {!search && (
              <div>
                <button
                  onClick={() => setShowAllDocs(!showAllDocs)}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Code2 className="w-4 h-4" />
                  {showAllDocs ? 'Show relevant docs only' : `Browse all ${LANG_LABELS[language] ?? language} docs`}
                  {showAllDocs ? (
                    <ChevronDown className="w-3.5 h-3.5 ml-auto" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 ml-auto" />
                  )}
                </button>
              </div>
            )}

            {/* ── Grouped docs (when search or showAllDocs) ── */}
            {(search || showAllDocs) && (
              <div className="space-y-4">
                {groupedDocs.size === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                    <BookOpen className="w-8 h-8 mb-2" />
                    <p className="text-sm">No docs found</p>
                  </div>
                ) : (
                  Array.from(groupedDocs.entries()).map(([category, catDocs]) => (
                    <CategorySection key={category} category={category} docs={catDocs} />
                  ))
                )}
              </div>
            )}

            {/* ── Empty state ── */}
            {!search && relevantDocs.length === 0 && hints.length === 0 && !showAllDocs && (
              <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                <BookOpen className="w-8 h-8 mb-2" />
                <p className="text-sm">No contextual docs for this problem</p>
                <p className="text-xs mt-1">Try browsing all docs below</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hint Card — click to reveal                                        */
/* ------------------------------------------------------------------ */

function HintCard({ index, text }: { index: number; text: string }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div
      className={`border rounded-lg overflow-hidden transition-colors ${
        revealed ? 'border-amber-200 bg-amber-50/50' : 'border-gray-200 bg-gray-50'
      }`}
    >
      <button
        onClick={() => setRevealed(!revealed)}
        className="w-full flex items-center gap-2 px-3 py-2 text-left"
      >
        <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold flex items-center justify-center shrink-0">
          {index}
        </span>
        {revealed ? (
          <span className="text-xs text-gray-700 leading-relaxed">{text}</span>
        ) : (
          <span className="text-xs text-gray-500 italic">Click to reveal hint</span>
        )}
        {revealed ? (
          <ChevronDown className="w-3 h-3 text-gray-400 ml-auto shrink-0" />
        ) : (
          <ChevronRight className="w-3 h-3 text-gray-400 ml-auto shrink-0" />
        )}
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Category Section                                                   */
/* ------------------------------------------------------------------ */

const CATEGORY_ICONS: Record<string, typeof BookOpen> = {
  'Syntax Basics': Code2,
  'Data Structures': BookOpen,
  'Algorithms': Lightbulb,
  'Standard Library': BookOpen,
  'Tips & Tricks': Lightbulb,
};

function CategorySection({
  category,
  docs,
}: {
  category: string;
  docs: LanguageDocEntry[];
}) {
  const [open, setOpen] = useState(true);
  const Icon = CATEGORY_ICONS[category] ?? BookOpen;

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2 px-1 py-2 text-left"
      >
        <Icon className="w-4 h-4 text-blue-500 shrink-0" />
        <span className="text-sm font-semibold text-gray-700 flex-1">{category}</span>
        <span className="text-[10px] text-gray-400">{docs.length}</span>
        {open ? (
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0" />
        ) : (
          <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
        )}
      </button>
      {open && (
        <div className="space-y-1.5 ml-1">
          {docs.map((doc) => (
            <DocCard key={doc.id} doc={doc} />
          ))}
        </div>
      )}
    </div>
  );
}
