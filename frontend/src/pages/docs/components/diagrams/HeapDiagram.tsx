import { DIAGRAM_COLORS, DiagramContainer } from './diagramUtils';

interface HeapData {
  values: Array<string | number>;
  type?: 'min' | 'max';
  highlightIndex?: number;
  title?: string;
}

const NODE_R = 18;
const LEVEL_H = 55;

export default function HeapDiagram({
  data,
  caption,
}: {
  data: Record<string, unknown>;
  caption?: string;
}) {
  const d = data as unknown as HeapData;
  const values = d.values ?? [];
  if (values.length === 0) return null;

  // Calculate tree layout
  const levels = Math.ceil(Math.log2(values.length + 1));
  const maxWidth = Math.pow(2, levels - 1) * 50;
  const svgW = Math.max(maxWidth + 40, 300);
  const svgH = levels * LEVEL_H + 80;

  function getPos(index: number) {
    const level = Math.floor(Math.log2(index + 1));
    const levelStart = Math.pow(2, level) - 1;
    const posInLevel = index - levelStart;
    const nodesInLevel = Math.pow(2, level);
    const spacing = svgW / (nodesInLevel + 1);
    return {
      x: spacing * (posInLevel + 1),
      y: level * LEVEL_H + 30,
    };
  }

  return (
    <DiagramContainer caption={caption}>
      {(d.title || d.type) && (
        <p className="text-xs font-semibold text-gray-600 mb-2 text-center">
          {d.title ?? `${d.type === 'min' ? 'Min' : 'Max'} Heap`}
        </p>
      )}
      <div className="space-y-3">
        {/* Tree view */}
        <svg viewBox={`0 0 ${svgW} ${svgH - 30}`} className="w-full max-w-lg mx-auto">
          {/* Edges */}
          {values.map((_, i) => {
            if (i === 0) return null;
            const parent = Math.floor((i - 1) / 2);
            const from = getPos(parent);
            const to = getPos(i);
            return (
              <line
                key={`e-${i}`}
                x1={from.x}
                y1={from.y + NODE_R}
                x2={to.x}
                y2={to.y - NODE_R}
                stroke={DIAGRAM_COLORS.muted}
                strokeWidth={1.5}
              />
            );
          })}
          {/* Nodes */}
          {values.map((val, i) => {
            const pos = getPos(i);
            const isHighlight = d.highlightIndex === i;
            return (
              <g key={i}>
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={NODE_R}
                  fill={isHighlight ? DIAGRAM_COLORS.highlight : DIAGRAM_COLORS.node}
                  stroke={isHighlight ? DIAGRAM_COLORS.highlightBorder : DIAGRAM_COLORS.nodeBorder}
                  strokeWidth={2}
                />
                <text
                  x={pos.x}
                  y={pos.y + 1}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={12}
                  fontFamily="monospace"
                  fontWeight="bold"
                  fill={DIAGRAM_COLORS.text}
                >
                  {String(val)}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Array representation */}
        <div className="flex items-center justify-center gap-0.5 flex-wrap">
          <span className="text-xs text-gray-500 mr-1 font-mono">Array:</span>
          {values.map((val, i) => (
            <div
              key={i}
              className={`flex flex-col items-center min-w-[32px] border rounded px-1 py-0.5 ${
                d.highlightIndex === i
                  ? 'bg-yellow-100 border-yellow-400'
                  : 'bg-blue-50 border-blue-200'
              }`}
            >
              <span className="text-[10px] text-gray-400 font-mono">{i}</span>
              <span className="text-xs font-mono font-bold">{String(val)}</span>
            </div>
          ))}
        </div>
      </div>
    </DiagramContainer>
  );
}
