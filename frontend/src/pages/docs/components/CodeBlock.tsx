import { useMemo, useState } from 'react';
import { Copy, Check, Play, Terminal, ChevronDown, ChevronUp } from 'lucide-react';
import { PLAYGROUND_URLS } from '../utils/colorTokens';
import { useShikiHighlighter } from '../hooks/useShikiHighlighter';

/* ------------------------------------------------------------------ */
/*  Language badge color mapping                                       */
/* ------------------------------------------------------------------ */
const LANG_BADGE_COLORS: Record<string, { text: string; dot: string }> = {
  python: { text: 'text-yellow-400', dot: 'bg-yellow-400' },
  javascript: { text: 'text-amber-400', dot: 'bg-amber-400' },
  typescript: { text: 'text-sky-400', dot: 'bg-sky-400' },
  cpp: { text: 'text-blue-400', dot: 'bg-blue-400' },
  java: { text: 'text-red-400', dot: 'bg-red-400' },
  go: { text: 'text-cyan-400', dot: 'bg-cyan-400' },
  rust: { text: 'text-orange-400', dot: 'bg-orange-400' },
};

const DEFAULT_BADGE_COLOR = { text: 'text-gray-400', dot: 'bg-gray-400' };

function getLangBadgeColor(langId: string) {
  return LANG_BADGE_COLORS[langId] ?? DEFAULT_BADGE_COLOR;
}

/* ------------------------------------------------------------------ */
/*  Mac-style window dots                                             */
/* ------------------------------------------------------------------ */
function WindowDots() {
  return (
    <div className="flex items-center gap-1.5">
      <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
      <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
      <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Language pill badge                                                */
/* ------------------------------------------------------------------ */
function LanguageBadge({ langId }: { langId: string }) {
  const colors = getLangBadgeColor(langId);
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1c2333] text-[10px] font-semibold font-mono uppercase tracking-wider ${colors.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
      {langId}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Copy button                                                       */
/* ------------------------------------------------------------------ */
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-1.5 rounded-md text-gray-400 hover:text-gray-200 hover:bg-[#30363d] transition-all"
      title="Copy code"
    >
      {copied ? (
        <Check className="w-3.5 h-3.5 text-green-400" />
      ) : (
        <Copy className="w-3.5 h-3.5" />
      )}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Line numbers gutter                                               */
/* ------------------------------------------------------------------ */
function LineNumbers({
  count,
  highlightLines,
}: {
  count: number;
  highlightLines?: number[];
}) {
  const lines = useMemo(
    () => Array.from({ length: count }, (_, i) => i + 1),
    [count],
  );
  const highlightSet = useMemo(
    () => new Set(highlightLines ?? []),
    [highlightLines],
  );

  return (
    <div
      aria-hidden="true"
      className="select-none sticky left-0 shrink-0 pr-4 pl-4 py-5 text-right border-r border-[#30363d]/60 bg-[#0d1117] text-gray-600 text-[13px] leading-[1.7] font-mono"
    >
      {lines.map((n) => (
        <div
          key={n}
          className={
            highlightSet.has(n)
              ? 'text-yellow-400 font-bold'
              : ''
          }
        >
          {n}
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Output block                                                      */
/* ------------------------------------------------------------------ */
export function OutputBlock({ output }: { output: string }) {
  const outputLines = output.split('\n');

  return (
    <div className="bg-[#161b22] rounded-b-xl border border-[#30363d]/50 border-t-0 overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-[#30363d]/50 bg-[#1c2128]">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
        </span>
        <Terminal className="w-3 h-3 text-gray-500" />
        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider font-semibold">
          Output
        </span>
        <span className="text-[10px] font-mono text-gray-600 ml-auto">
          {outputLines.length} {outputLines.length === 1 ? 'line' : 'lines'}
        </span>
      </div>
      <pre className="px-5 py-3 text-[13px] leading-[1.7] font-mono text-green-400/90 overflow-x-auto whitespace-pre">
        <code>
          {outputLines.map((line, i) => (
            <div key={i} className="hover:bg-green-500/5 transition-colors">
              {line}
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Toolbar (header bar)                                              */
/* ------------------------------------------------------------------ */
function Toolbar({
  langId,
  playgroundUrl,
  code,
  hasOutput,
  isCollapsed,
  canCollapse,
  onToggleCollapse,
}: {
  langId?: string;
  playgroundUrl?: string;
  code: string;
  hasOutput: boolean;
  isCollapsed: boolean;
  canCollapse: boolean;
  onToggleCollapse: () => void;
}) {
  return (
    <div
      className={`flex items-center justify-between px-4 py-2 bg-[#161b22] border border-[#30363d]/50 ${
        hasOutput ? '' : 'border-b-0'
      } rounded-t-xl`}
    >
      {/* Left side: window dots + language badge */}
      <div className="flex items-center gap-3">
        <WindowDots />
        {langId && <LanguageBadge langId={langId} />}
      </div>

      {/* Right side: action buttons */}
      <div className="flex items-center gap-1">
        {canCollapse && (
          <button
            onClick={onToggleCollapse}
            className="p-1.5 rounded-md text-gray-400 hover:text-gray-200 hover:bg-[#30363d] transition-all"
            title={isCollapsed ? 'Expand code' : 'Collapse code'}
          >
            {isCollapsed ? (
              <ChevronDown className="w-3.5 h-3.5" />
            ) : (
              <ChevronUp className="w-3.5 h-3.5" />
            )}
          </button>
        )}
        {playgroundUrl && (
          <a
            href={playgroundUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-md text-gray-400 hover:text-green-400 hover:bg-[#30363d] transition-all"
            title="Try it in playground"
          >
            <Play className="w-3.5 h-3.5" />
          </a>
        )}
        <CopyButton text={code} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Shiki-highlighted code area                                       */
/* ------------------------------------------------------------------ */
function HighlightedCode({
  code,
  langId,
  highlightLines,
}: {
  code: string;
  langId: string;
  highlightLines?: number[];
}) {
  const { html, loading } = useShikiHighlighter(code, langId);
  const highlightSet = useMemo(
    () => new Set(highlightLines ?? []),
    [highlightLines],
  );
  const hasHighlights = highlightSet.size > 0;

  if (loading || !html) {
    // Fallback: plain text while shiki loads
    return (
      <pre className="flex-1 py-5 px-5 text-[13px] leading-[1.7] font-mono text-[#e6edf3] whitespace-pre overflow-x-auto">
        <code>{code}</code>
      </pre>
    );
  }

  // If we have line highlights, we need to add highlight styling per-line
  if (hasHighlights) {
    const lines = code.split('\n');
    return (
      <div className="flex-1 py-5 px-5 overflow-x-auto shiki-code-wrapper">
        <style>{`
          .shiki-code-wrapper .shiki { background: transparent !important; }
          .shiki-code-wrapper pre { background: transparent !important; margin: 0; padding: 0; }
          .shiki-code-wrapper code { font-size: 13px; line-height: 1.7; }
          .shiki-line-highlight { background: rgba(250, 204, 21, 0.08); border-left: 2px solid #facc15; margin-left: -20px; padding-left: 18px; margin-right: -20px; padding-right: 20px; }
        `}</style>
        <div dangerouslySetInnerHTML={{ __html: html }} />
        {/* Overlay for line highlights */}
        <div className="absolute inset-0 pointer-events-none py-5" style={{ left: 0, right: 0 }}>
          {lines.map((_, i) => {
            const lineNum = i + 1;
            if (!highlightSet.has(lineNum)) return null;
            return (
              <div
                key={lineNum}
                className="shiki-line-highlight"
                style={{
                  height: '1.7em',
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: `calc(1.25rem + ${i} * 1.7em)`,
                }}
              />
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 py-5 px-5 overflow-x-auto shiki-code-wrapper">
      <style>{`
        .shiki-code-wrapper .shiki { background: transparent !important; }
        .shiki-code-wrapper pre { background: transparent !important; margin: 0; padding: 0; }
        .shiki-code-wrapper code { font-size: 13px; line-height: 1.7; }
      `}</style>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main CodeBlock component                                          */
/* ------------------------------------------------------------------ */
const COLLAPSE_THRESHOLD = 25;

export default function CodeBlock({
  code,
  langId,
  output,
  highlightLines,
}: {
  code: string;
  langId?: string;
  output?: string;
  highlightLines?: number[];
}) {
  const playgroundUrl = langId ? PLAYGROUND_URLS[langId] : undefined;
  const hasOutput = !!output;
  const lineCount = code.split('\n').length;
  const canCollapse = lineCount > COLLAPSE_THRESHOLD;
  const [isCollapsed, setIsCollapsed] = useState(canCollapse);

  const displayedCode = isCollapsed
    ? code.split('\n').slice(0, COLLAPSE_THRESHOLD).join('\n')
    : code;
  const displayedLineCount = displayedCode.split('\n').length;

  return (
    <div className="relative my-4 shadow-lg rounded-xl overflow-hidden">
      {/* Toolbar header */}
      <Toolbar
        langId={langId}
        playgroundUrl={playgroundUrl}
        code={code}
        hasOutput={hasOutput}
        isCollapsed={isCollapsed}
        canCollapse={canCollapse}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
      />

      {/* Code area with line numbers + syntax highlighting */}
      <div
        className={`relative flex bg-[#0d1117] border-x border-[#30363d]/50 ${
          isCollapsed
            ? ''
            : hasOutput
              ? 'border-b-0'
              : 'border-b rounded-b-xl'
        } overflow-x-auto transition-all duration-300`}
      >
        <LineNumbers count={displayedLineCount} highlightLines={highlightLines} />
        {langId ? (
          <HighlightedCode
            code={displayedCode}
            langId={langId}
            highlightLines={highlightLines}
          />
        ) : (
          <pre className="flex-1 py-5 px-5 text-[13px] leading-[1.7] font-mono text-[#e6edf3] whitespace-pre overflow-x-auto">
            <code>{displayedCode}</code>
          </pre>
        )}
      </div>

      {/* Collapsed indicator */}
      {isCollapsed && (
        <button
          onClick={() => setIsCollapsed(false)}
          className="w-full flex items-center justify-center gap-2 py-2 bg-[#161b22] border-x border-b border-[#30363d]/50 rounded-b-xl text-xs text-gray-400 hover:text-gray-200 hover:bg-[#1c2333] transition-all"
        >
          <ChevronDown className="w-3.5 h-3.5" />
          Show {lineCount - COLLAPSE_THRESHOLD} more lines
        </button>
      )}

      {/* Output block */}
      {output && !isCollapsed && <OutputBlock output={output} />}
    </div>
  );
}

export { CopyButton };
