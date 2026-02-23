import { DIAGRAM_COLORS, ArrowMarker, DiagramContainer } from './diagramUtils';

interface BucketEntry {
  key: string;
  value: string;
}

interface HashMapData {
  buckets: Array<BucketEntry[] | null>;
  capacity?: number;
  highlightBucket?: number;
  title?: string;
}

const BUCKET_W = 60;
const BUCKET_H = 36;
const ENTRY_W = 100;
const ENTRY_H = 32;
const ENTRY_GAP = 30;

export default function HashMapDiagram({
  data,
  caption,
}: {
  data: Record<string, unknown>;
  caption?: string;
}) {
  const d = data as unknown as HashMapData;
  const buckets = d.buckets ?? [];

  // Calculate max chain length
  const maxChain = Math.max(1, ...buckets.map((b) => b?.length ?? 0));
  const totalW = BUCKET_W + 40 + maxChain * (ENTRY_W + ENTRY_GAP);
  const totalH = buckets.length * (BUCKET_H + 8) + 30;

  return (
    <DiagramContainer caption={caption}>
      {d.title && (
        <p className="text-xs font-semibold text-gray-600 mb-2 text-center">
          {d.title}
        </p>
      )}
      <svg viewBox={`0 0 ${Math.max(totalW, 300)} ${Math.max(totalH, 100)}`} className="w-full max-w-3xl mx-auto">
        <ArrowMarker />
        {buckets.map((bucket, i) => {
          const y = i * (BUCKET_H + 8) + 15;
          const isHighlight = d.highlightBucket === i;

          return (
            <g key={i}>
              {/* Bucket index */}
              <rect
                x={5}
                y={y}
                width={BUCKET_W}
                height={BUCKET_H}
                rx={4}
                fill={isHighlight ? DIAGRAM_COLORS.highlight : '#f1f5f9'}
                stroke={isHighlight ? DIAGRAM_COLORS.highlightBorder : '#cbd5e1'}
                strokeWidth={1.5}
              />
              <text
                x={5 + BUCKET_W / 2}
                y={y + BUCKET_H / 2 + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={11}
                fontFamily="monospace"
                fontWeight="bold"
                fill={DIAGRAM_COLORS.text}
              >
                [{i}]
              </text>

              {/* Chain entries */}
              {bucket && bucket.length > 0 ? (
                bucket.map((entry, j) => {
                  const ex = BUCKET_W + 35 + j * (ENTRY_W + ENTRY_GAP);

                  return (
                    <g key={j}>
                      {/* Arrow from previous */}
                      <line
                        x1={j === 0 ? BUCKET_W + 5 : ex - ENTRY_GAP + 2}
                        y1={y + BUCKET_H / 2}
                        x2={ex - 2}
                        y2={y + BUCKET_H / 2}
                        stroke={DIAGRAM_COLORS.pointer}
                        strokeWidth={1.5}
                        markerEnd="url(#arrow)"
                      />
                      {/* Entry box */}
                      <rect
                        x={ex}
                        y={y + 2}
                        width={ENTRY_W}
                        height={ENTRY_H}
                        rx={4}
                        fill={DIAGRAM_COLORS.node}
                        stroke={DIAGRAM_COLORS.nodeBorder}
                        strokeWidth={1.5}
                      />
                      <text
                        x={ex + ENTRY_W / 2}
                        y={y + 2 + ENTRY_H / 2 + 1}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize={10}
                        fontFamily="monospace"
                        fill={DIAGRAM_COLORS.text}
                      >
                        {entry.key}: {entry.value}
                      </text>
                    </g>
                  );
                })
              ) : (
                <text
                  x={BUCKET_W + 20}
                  y={y + BUCKET_H / 2 + 1}
                  fontSize={10}
                  fill={DIAGRAM_COLORS.muted}
                  fontStyle="italic"
                >
                  empty
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </DiagramContainer>
  );
}
