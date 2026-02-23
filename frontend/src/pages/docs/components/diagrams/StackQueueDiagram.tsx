import { DIAGRAM_COLORS, ArrowMarker, DiagramContainer } from './diagramUtils';

interface StackQueueData {
  type: 'stack' | 'queue';
  items: Array<{ value: string; highlight?: boolean }>;
  operation?: string;
  operationSide?: 'top' | 'bottom' | 'front' | 'back';
}

const CELL_W = 80;
const CELL_H = 36;

export default function StackQueueDiagram({
  data,
  caption,
}: {
  data: Record<string, unknown>;
  caption?: string;
}) {
  const d = data as unknown as StackQueueData;
  const items = d.items ?? [];
  const isStack = d.type === 'stack';

  if (isStack) {
    // Vertical stack — top at top
    const totalH = items.length * CELL_H + 50;
    return (
      <DiagramContainer caption={caption}>
        <svg viewBox={`0 0 180 ${Math.max(totalH, 80)}`} className="w-full max-w-xs mx-auto">
          <ArrowMarker />
          {/* Top label */}
          <text x={90} y={14} textAnchor="middle" fontSize={10} fill={DIAGRAM_COLORS.info} fontWeight="bold">
            TOP {d.operation ? `(${d.operation})` : ''}
          </text>
          {/* Arrow pointing to top */}
          {d.operation && (
            <line x1={145} y1={30} x2={145} y2={25 + CELL_H / 2} stroke={DIAGRAM_COLORS.success} strokeWidth={2} markerEnd="url(#arrow)" />
          )}
          {items.map((item, i) => {
            const y = 22 + i * CELL_H;
            return (
              <g key={i}>
                <rect
                  x={50}
                  y={y}
                  width={CELL_W}
                  height={CELL_H}
                  fill={item.highlight ? DIAGRAM_COLORS.highlight : DIAGRAM_COLORS.node}
                  stroke={item.highlight ? DIAGRAM_COLORS.highlightBorder : DIAGRAM_COLORS.nodeBorder}
                  strokeWidth={1.5}
                  rx={3}
                />
                <text
                  x={50 + CELL_W / 2}
                  y={y + CELL_H / 2 + 1}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={13}
                  fontFamily="monospace"
                  fontWeight="bold"
                  fill={DIAGRAM_COLORS.text}
                >
                  {item.value}
                </text>
              </g>
            );
          })}
        </svg>
      </DiagramContainer>
    );
  }

  // Horizontal queue — front on left, back on right
  const totalW = items.length * (CELL_W + 4) + 80;
  return (
    <DiagramContainer caption={caption}>
      <svg viewBox={`0 0 ${Math.max(totalW, 200)} 80`} className="w-full max-w-2xl mx-auto">
        <ArrowMarker />
        {/* Labels */}
        <text x={10} y={15} fontSize={10} fill={DIAGRAM_COLORS.success} fontWeight="bold">
          FRONT (dequeue)
        </text>
        <text x={items.length * (CELL_W + 4) + 30} y={15} fontSize={10} fill={DIAGRAM_COLORS.info} fontWeight="bold" textAnchor="end">
          BACK (enqueue)
        </text>
        {items.map((item, i) => {
          const x = 10 + i * (CELL_W + 4);
          return (
            <g key={i}>
              <rect
                x={x}
                y={25}
                width={CELL_W}
                height={CELL_H}
                fill={item.highlight ? DIAGRAM_COLORS.highlight : DIAGRAM_COLORS.node}
                stroke={item.highlight ? DIAGRAM_COLORS.highlightBorder : DIAGRAM_COLORS.nodeBorder}
                strokeWidth={1.5}
                rx={3}
              />
              <text
                x={x + CELL_W / 2}
                y={25 + CELL_H / 2 + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={13}
                fontFamily="monospace"
                fontWeight="bold"
                fill={DIAGRAM_COLORS.text}
              >
                {item.value}
              </text>
            </g>
          );
        })}
      </svg>
    </DiagramContainer>
  );
}
