import { DIAGRAM_COLORS, DiagramContainer } from './diagramUtils';

interface TreeNode {
  value: string;
  left?: TreeNode | null;
  right?: TreeNode | null;
  highlight?: boolean;
}

interface BinaryTreeData {
  root: TreeNode;
  title?: string;
}

interface LayoutNode {
  value: string;
  x: number;
  y: number;
  highlight?: boolean;
  left?: LayoutNode | null;
  right?: LayoutNode | null;
}

const NODE_R = 20;
const LEVEL_H = 60;

function layoutTree(node: TreeNode | null | undefined, x: number, y: number, spread: number): LayoutNode | null {
  if (!node) return null;
  const layout: LayoutNode = {
    value: node.value,
    x,
    y,
    highlight: node.highlight,
    left: layoutTree(node.left, x - spread, y + LEVEL_H, spread * 0.55),
    right: layoutTree(node.right, x + spread, y + LEVEL_H, spread * 0.55),
  };
  return layout;
}

function getExtents(node: LayoutNode | null, ext: { minX: number; maxX: number; maxY: number }) {
  if (!node) return;
  ext.minX = Math.min(ext.minX, node.x - NODE_R);
  ext.maxX = Math.max(ext.maxX, node.x + NODE_R);
  ext.maxY = Math.max(ext.maxY, node.y + NODE_R);
  getExtents(node.left, ext);
  getExtents(node.right, ext);
}

function renderNode(node: LayoutNode | null): React.ReactNode[] {
  if (!node) return [];
  const elements: React.ReactNode[] = [];

  // Edges to children
  if (node.left) {
    elements.push(
      <line
        key={`e-l-${node.x}-${node.y}`}
        x1={node.x}
        y1={node.y + NODE_R}
        x2={node.left.x}
        y2={node.left.y - NODE_R}
        stroke={DIAGRAM_COLORS.muted}
        strokeWidth={1.5}
      />,
    );
  }
  if (node.right) {
    elements.push(
      <line
        key={`e-r-${node.x}-${node.y}`}
        x1={node.x}
        y1={node.y + NODE_R}
        x2={node.right.x}
        y2={node.right.y - NODE_R}
        stroke={DIAGRAM_COLORS.muted}
        strokeWidth={1.5}
      />,
    );
  }

  // Node circle
  elements.push(
    <circle
      key={`n-${node.x}-${node.y}`}
      cx={node.x}
      cy={node.y}
      r={NODE_R}
      fill={node.highlight ? DIAGRAM_COLORS.highlight : DIAGRAM_COLORS.node}
      stroke={node.highlight ? DIAGRAM_COLORS.highlightBorder : DIAGRAM_COLORS.nodeBorder}
      strokeWidth={2}
    />,
  );

  // Node text
  elements.push(
    <text
      key={`t-${node.x}-${node.y}`}
      x={node.x}
      y={node.y + 1}
      textAnchor="middle"
      dominantBaseline="middle"
      fontSize={12}
      fontFamily="monospace"
      fontWeight="bold"
      fill={DIAGRAM_COLORS.text}
    >
      {node.value}
    </text>,
  );

  // Recurse
  elements.push(...renderNode(node.left));
  elements.push(...renderNode(node.right));

  return elements;
}

export default function BinaryTreeDiagram({
  data,
  caption,
}: {
  data: Record<string, unknown>;
  caption?: string;
}) {
  const d = data as unknown as BinaryTreeData;
  if (!d.root) return null;

  const layout = layoutTree(d.root, 200, 30, 120);
  if (!layout) return null;

  const ext = { minX: Infinity, maxX: -Infinity, maxY: 0 };
  getExtents(layout, ext);

  const padding = 20;
  const viewW = ext.maxX - ext.minX + padding * 2;
  const viewH = ext.maxY + padding;
  const offsetX = -ext.minX + padding;

  return (
    <DiagramContainer caption={caption}>
      {d.title && (
        <p className="text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2 text-center">
          {d.title}
        </p>
      )}
      <svg viewBox={`0 0 ${viewW} ${viewH}`} className="w-full max-w-lg mx-auto">
        <g transform={`translate(${offsetX}, 0)`}>{renderNode(layout)}</g>
      </svg>
    </DiagramContainer>
  );
}
