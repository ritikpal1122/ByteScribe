import { DIAGRAM_COLORS, DiagramContainer } from './diagramUtils';

interface ArrayData {
  values: Array<string | number>;
  labels?: string[];
  highlightIndices?: number[];
  showIndices?: boolean;
  title?: string;
}

const CELL_W = 56;
const CELL_H = 40;

export default function ArrayDiagram({
  data,
  caption,
}: {
  data: Record<string, unknown>;
  caption?: string;
}) {
  const d = data as unknown as ArrayData;
  const values = d.values ?? [];
  const showIndices = d.showIndices !== false;
  const highlightSet = new Set(d.highlightIndices ?? []);
  const totalW = values.length * CELL_W + 20;
  const svgH = showIndices ? 90 : 60;

  return (
    <DiagramContainer caption={caption}>
      {d.title && (
        <p className="text-xs font-semibold text-gray-600 mb-2 text-center">
          {d.title}
        </p>
      )}
      <svg viewBox={`0 0 ${Math.max(totalW, 200)} ${svgH}`} className="w-full max-w-2xl mx-auto">
        {values.map((val, i) => {
          const x = i * CELL_W + 10;
          const y = 10;
          const isHighlight = highlightSet.has(i);

          return (
            <g key={i}>
              {/* Cell */}
              <rect
                x={x}
                y={y}
                width={CELL_W}
                height={CELL_H}
                fill={isHighlight ? DIAGRAM_COLORS.highlight : DIAGRAM_COLORS.node}
                stroke={isHighlight ? DIAGRAM_COLORS.highlightBorder : DIAGRAM_COLORS.nodeBorder}
                strokeWidth={1.5}
                rx={i === 0 ? 6 : i === values.length - 1 ? 6 : 0}
              />
              {/* Value */}
              <text
                x={x + CELL_W / 2}
                y={y + CELL_H / 2 + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={13}
                fontFamily="monospace"
                fontWeight="bold"
                fill={DIAGRAM_COLORS.text}
              >
                {String(val)}
              </text>
              {/* Index below */}
              {showIndices && (
                <text
                  x={x + CELL_W / 2}
                  y={y + CELL_H + 16}
                  textAnchor="middle"
                  fontSize={10}
                  fontFamily="monospace"
                  fill={isHighlight ? DIAGRAM_COLORS.primary : DIAGRAM_COLORS.muted}
                >
                  [{i}]
                </text>
              )}
              {/* Custom label */}
              {d.labels?.[i] && (
                <text
                  x={x + CELL_W / 2}
                  y={y + CELL_H + (showIndices ? 30 : 16)}
                  textAnchor="middle"
                  fontSize={9}
                  fill={DIAGRAM_COLORS.info}
                >
                  {d.labels[i]}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </DiagramContainer>
  );
}
