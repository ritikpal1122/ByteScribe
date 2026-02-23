import { DIAGRAM_COLORS, ArrowMarker, DiagramContainer } from './diagramUtils';

interface LinkedListData {
  nodes: Array<{ value: string; label?: string; highlight?: boolean }>;
  highlightIndex?: number;
  showNull?: boolean;
}

const NODE_W = 80;
const NODE_H = 40;
const GAP = 50;

export default function LinkedListDiagram({
  data,
  caption,
}: {
  data: Record<string, unknown>;
  caption?: string;
}) {
  const d = data as unknown as LinkedListData;
  const nodes = d.nodes ?? [];
  const showNull = d.showNull !== false;
  const totalW = nodes.length * (NODE_W + GAP) + (showNull ? 60 : 0);
  const svgH = 80;

  return (
    <DiagramContainer caption={caption}>
      <svg viewBox={`0 0 ${Math.max(totalW, 200)} ${svgH}`} className="w-full max-w-2xl mx-auto">
        <ArrowMarker />
        {nodes.map((node, i) => {
          const x = i * (NODE_W + GAP) + 10;
          const y = 15;
          const isHighlight = node.highlight || d.highlightIndex === i;

          return (
            <g key={i}>
              {/* Node box */}
              <rect
                x={x}
                y={y}
                width={NODE_W}
                height={NODE_H}
                rx={6}
                fill={isHighlight ? DIAGRAM_COLORS.highlight : DIAGRAM_COLORS.node}
                stroke={isHighlight ? DIAGRAM_COLORS.highlightBorder : DIAGRAM_COLORS.nodeBorder}
                strokeWidth={2}
              />
              {/* Value */}
              <text
                x={x + NODE_W / 2}
                y={y + NODE_H / 2 + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={14}
                fontFamily="monospace"
                fontWeight="bold"
                fill={DIAGRAM_COLORS.text}
              >
                {node.value}
              </text>
              {/* Label below */}
              {node.label && (
                <text
                  x={x + NODE_W / 2}
                  y={y + NODE_H + 16}
                  textAnchor="middle"
                  fontSize={10}
                  fill={DIAGRAM_COLORS.muted}
                >
                  {node.label}
                </text>
              )}
              {/* Arrow to next */}
              {i < nodes.length - 1 && (
                <line
                  x1={x + NODE_W}
                  y1={y + NODE_H / 2}
                  x2={x + NODE_W + GAP - 2}
                  y2={y + NODE_H / 2}
                  stroke={DIAGRAM_COLORS.pointer}
                  strokeWidth={2}
                  markerEnd="url(#arrow)"
                />
              )}
            </g>
          );
        })}
        {/* Null terminator */}
        {showNull && nodes.length > 0 && (
          <g>
            <line
              x1={(nodes.length - 1) * (NODE_W + GAP) + 10 + NODE_W}
              y1={15 + NODE_H / 2}
              x2={(nodes.length - 1) * (NODE_W + GAP) + 10 + NODE_W + GAP - 10}
              y2={15 + NODE_H / 2}
              stroke={DIAGRAM_COLORS.pointer}
              strokeWidth={2}
              markerEnd="url(#arrow)"
            />
            <rect
              x={nodes.length * (NODE_W + GAP) + 2}
              y={20}
              width={40}
              height={30}
              rx={4}
              fill={DIAGRAM_COLORS.null}
              stroke={DIAGRAM_COLORS.nullBorder}
              strokeWidth={1.5}
            />
            <text
              x={nodes.length * (NODE_W + GAP) + 22}
              y={39}
              textAnchor="middle"
              fontSize={11}
              fontFamily="monospace"
              fontWeight="bold"
              fill={DIAGRAM_COLORS.danger}
            >
              null
            </text>
          </g>
        )}
      </svg>
    </DiagramContainer>
  );
}
