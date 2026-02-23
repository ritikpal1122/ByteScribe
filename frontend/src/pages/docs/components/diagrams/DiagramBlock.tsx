import { lazy, Suspense } from 'react';
import type { DiagramDefinition } from '@/data/docs';
import { DiagramContainer } from './diagramUtils';

/* Lazy-load heavy components */
const MermaidDiagram = lazy(() => import('./MermaidDiagram'));
const LinkedListDiagram = lazy(() => import('./LinkedListDiagram'));
const BinaryTreeDiagram = lazy(() => import('./BinaryTreeDiagram'));
const ArrayDiagram = lazy(() => import('./ArrayDiagram'));
const HashMapDiagram = lazy(() => import('./HashMapDiagram'));
const StackQueueDiagram = lazy(() => import('./StackQueueDiagram'));
const MemoryLayoutDiagram = lazy(() => import('./MemoryLayoutDiagram'));
const GraphDiagram = lazy(() => import('./GraphDiagram'));
const HeapDiagram = lazy(() => import('./HeapDiagram'));
const AlgorithmStepsDiagram = lazy(() => import('./AlgorithmStepsDiagram'));

function DiagramLoader() {
  return (
    <div className="h-24 flex items-center justify-center">
      <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function DiagramError({ diagram }: { diagram: DiagramDefinition }) {
  return (
    <DiagramContainer caption={diagram.caption}>
      <div className="text-sm text-red-500 font-mono p-3">
        <p className="font-semibold mb-1">Unknown diagram type</p>
        <pre className="text-xs whitespace-pre-wrap">
          {JSON.stringify(diagram, null, 2)}
        </pre>
      </div>
    </DiagramContainer>
  );
}

export default function DiagramBlock({ diagram }: { diagram: DiagramDefinition }) {
  if (diagram.kind === 'mermaid') {
    return (
      <Suspense fallback={<DiagramLoader />}>
        <MermaidDiagram code={diagram.code} caption={diagram.caption} />
      </Suspense>
    );
  }

  if (diagram.kind === 'custom') {
    const { type, data, caption } = diagram;

    const CustomComponent = (() => {
      switch (type) {
        case 'linked-list':
          return LinkedListDiagram;
        case 'binary-tree':
          return BinaryTreeDiagram;
        case 'array':
          return ArrayDiagram;
        case 'hash-map':
          return HashMapDiagram;
        case 'stack':
        case 'queue':
          return StackQueueDiagram;
        case 'memory-layout':
          return MemoryLayoutDiagram;
        case 'graph':
          return GraphDiagram;
        case 'heap':
          return HeapDiagram;
        case 'algorithm-steps':
          return AlgorithmStepsDiagram;
        default:
          return null;
      }
    })();

    if (!CustomComponent) {
      return <DiagramError diagram={diagram} />;
    }

    return (
      <Suspense fallback={<DiagramLoader />}>
        <CustomComponent data={data} caption={caption} />
      </Suspense>
    );
  }

  return <DiagramError diagram={diagram} />;
}
