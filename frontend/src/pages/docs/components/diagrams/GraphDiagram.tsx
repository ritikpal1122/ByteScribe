import { DIAGRAM_COLORS, DiagramContainer } from './diagramUtils';

interface GraphNode {
  id: string;
  label?: string;
  highlight?: boolean;
}

interface GraphEdge {
  from: string;
  to: string;
  label?: string;
  directed?: boolean;
}

interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
  directed?: boolean;
  title?: string;
}

const NODE_R = 22;

// Simple circular layout
function circularLayout(nodes: GraphNode[], cx: number, cy: number, radius: number) {
  return nodes.map((node, i) => {
    const angle = (2 * Math.PI * i) / nodes.length - Math.PI / 2;
    return {
      ...node,
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    };
  });
}

export default function GraphDiagram({
  data,
  caption,
}: {
  data: Record<string, unknown>;
  caption?: string;
}) {
  const d = data as unknown as GraphData;
  const nodes = d.nodes ?? [];
  const edges = d.edges ?? [];
  const directed = d.directed ?? true;

  const radius = Math.max(60, nodes.length * 20);
  const size = radius * 2 + 80;
  const cx = size / 2;
  const cy = size / 2;

  const positioned = circularLayout(nodes, cx, cy, radius);
  const nodeMap = new Map(positioned.map((n) => [n.id, n]));

  return (
    <DiagramContainer caption={caption}>
      {d.title && (
        <p className="text-xs font-semibold text-gray-600 mb-2 text-center">
          {d.title}
        </p>
      )}
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-md mx-auto">
        <defs>
          <marker id="graph-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill={DIAGRAM_COLORS.muted} />
          </marker>
        </defs>

        {/* Edges */}
        {edges.map((edge, i) => {
          const from = nodeMap.get(edge.from);
          const to = nodeMap.get(edge.to);
          if (!from || !to) return null;

          // Shorten line to not overlap with node circle
          const dx = to.x - from.x;
          const dy = to.y - from.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const ux = dx / dist;
          const uy = dy / dist;

          return (
            <g key={i}>
              <line
                x1={from.x + ux * NODE_R}
                y1={from.y + uy * NODE_R}
                x2={to.x - ux * (NODE_R + 4)}
                y2={to.y - uy * (NODE_R + 4)}
                stroke={DIAGRAM_COLORS.muted}
                strokeWidth={1.5}
                markerEnd={directed || edge.directed ? 'url(#graph-arrow)' : undefined}
              />
              {edge.label && (
                <text
                  x={(from.x + to.x) / 2 + uy * 12}
                  y={(from.y + to.y) / 2 - ux * 12}
                  textAnchor="middle"
                  fontSize={9}
                  fill={DIAGRAM_COLORS.info}
                  fontWeight="bold"
                >
                  {edge.label}
                </text>
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {positioned.map((node) => (
          <g key={node.id}>
            <circle
              cx={node.x}
              cy={node.y}
              r={NODE_R}
              fill={node.highlight ? DIAGRAM_COLORS.highlight : DIAGRAM_COLORS.node}
              stroke={node.highlight ? DIAGRAM_COLORS.highlightBorder : DIAGRAM_COLORS.nodeBorder}
              strokeWidth={2}
            />
            <text
              x={node.x}
              y={node.y + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={12}
              fontFamily="monospace"
              fontWeight="bold"
              fill={DIAGRAM_COLORS.text}
            >
              {node.label || node.id}
            </text>
          </g>
        ))}
      </svg>
    </DiagramContainer>
  );
}
