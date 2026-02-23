/* ================================================================== */
/*  Shared Diagram Utilities                                           */
/* ================================================================== */

export const DIAGRAM_COLORS = {
  primary: '#3b82f6',
  secondary: '#8b5cf6',
  success: '#22c55e',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#06b6d4',
  muted: '#94a3b8',
  bg: '#f8fafc',
  bgDark: '#1e293b',
  border: '#e2e8f0',
  borderDark: '#334155',
  text: '#1e293b',
  textDark: '#f1f5f9',
  node: '#dbeafe',
  nodeBorder: '#93c5fd',
  highlight: '#fef08a',
  highlightBorder: '#facc15',
  null: '#fecaca',
  nullBorder: '#f87171',
  pointer: '#3b82f6',
  heap: '#dcfce7',
  heapBorder: '#86efac',
  stack: '#e0e7ff',
  stackBorder: '#a5b4fc',
};

/* SVG arrow marker definition — reuse across diagrams */
export function ArrowMarker({ id = 'arrow', color = DIAGRAM_COLORS.primary }: { id?: string; color?: string }) {
  return (
    <defs>
      <marker
        id={id}
        markerWidth="10"
        markerHeight="7"
        refX="9"
        refY="3.5"
        orient="auto"
      >
        <polygon points="0 0, 10 3.5, 0 7" fill={color} />
      </marker>
    </defs>
  );
}

/* Caption below diagrams */
export function DiagramCaption({ caption }: { caption?: string }) {
  if (!caption) return null;
  return (
    <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-2 italic">
      {caption}
    </p>
  );
}

/* Responsive SVG container */
export function DiagramContainer({
  children,
  caption,
  className = '',
}: {
  children: React.ReactNode;
  caption?: string;
  className?: string;
}) {
  return (
    <div className={`my-5 ${className}`}>
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 p-4 overflow-x-auto">
        {children}
      </div>
      <DiagramCaption caption={caption} />
    </div>
  );
}
