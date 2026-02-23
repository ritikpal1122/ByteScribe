import { DIAGRAM_COLORS, DiagramContainer } from './diagramUtils';

interface MemoryRegion {
  label: string;
  values?: Array<{ name: string; value: string; highlight?: boolean }>;
  type: 'stack' | 'heap' | 'static' | 'code';
}

interface MemoryLayoutData {
  regions: MemoryRegion[];
  title?: string;
  pointers?: Array<{ from: string; to: string }>;
}

const REGION_W = 260;
const ROW_H = 28;
const REGION_GAP = 12;

const REGION_STYLES: Record<string, { fill: string; border: string; label: string }> = {
  stack: { fill: DIAGRAM_COLORS.stack, border: DIAGRAM_COLORS.stackBorder, label: 'Stack' },
  heap: { fill: DIAGRAM_COLORS.heap, border: DIAGRAM_COLORS.heapBorder, label: 'Heap' },
  static: { fill: '#fef3c7', border: '#fcd34d', label: 'Static' },
  code: { fill: '#f3e8ff', border: '#c4b5fd', label: 'Code' },
};

export default function MemoryLayoutDiagram({
  data,
  caption,
}: {
  data: Record<string, unknown>;
  caption?: string;
}) {
  const d = data as unknown as MemoryLayoutData;
  const regions = d.regions ?? [];

  let totalH = 30;
  const regionPositions: Array<{ y: number; h: number }> = [];
  for (const region of regions) {
    const rows = region.values?.length ?? 0;
    const h = Math.max(ROW_H, rows * ROW_H + 30);
    regionPositions.push({ y: totalH, h });
    totalH += h + REGION_GAP;
  }
  totalH += 10;

  return (
    <DiagramContainer caption={caption}>
      {d.title && (
        <p className="text-xs font-semibold text-gray-600 mb-2 text-center">
          {d.title}
        </p>
      )}
      <svg viewBox={`0 0 ${REGION_W + 40} ${Math.max(totalH, 80)}`} className="w-full max-w-sm mx-auto">
        {/* Address indicator */}
        <text x={REGION_W / 2 + 20} y={16} textAnchor="middle" fontSize={9} fill={DIAGRAM_COLORS.muted}>
          Memory Layout (High → Low Address)
        </text>

        {regions.map((region, i) => {
          const pos = regionPositions[i]!;
          const style = REGION_STYLES[region.type] ?? REGION_STYLES.stack!;

          return (
            <g key={i}>
              {/* Region box */}
              <rect
                x={20}
                y={pos.y}
                width={REGION_W}
                height={pos.h}
                rx={6}
                fill={style.fill}
                stroke={style.border}
                strokeWidth={1.5}
              />
              {/* Region label */}
              <text
                x={30}
                y={pos.y + 16}
                fontSize={10}
                fontWeight="bold"
                fill={DIAGRAM_COLORS.text}
              >
                {region.label || style.label}
              </text>

              {/* Values */}
              {region.values?.map((val, j) => {
                const rowY = pos.y + 26 + j * ROW_H;
                return (
                  <g key={j}>
                    {val.highlight && (
                      <rect
                        x={25}
                        y={rowY - 2}
                        width={REGION_W - 10}
                        height={ROW_H - 2}
                        rx={3}
                        fill={DIAGRAM_COLORS.highlight}
                        opacity={0.5}
                      />
                    )}
                    <text
                      x={35}
                      y={rowY + 14}
                      fontSize={11}
                      fontFamily="monospace"
                      fill={DIAGRAM_COLORS.text}
                    >
                      {val.name}
                    </text>
                    <text
                      x={REGION_W - 10}
                      y={rowY + 14}
                      textAnchor="end"
                      fontSize={11}
                      fontFamily="monospace"
                      fill={DIAGRAM_COLORS.primary}
                      fontWeight="bold"
                    >
                      {val.value}
                    </text>
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>
    </DiagramContainer>
  );
}
