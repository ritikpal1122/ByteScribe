import { useEffect, useRef, useState } from 'react';
import { DiagramContainer } from './diagramUtils';

let mermaidInitialized = false;

export default function MermaidDiagram({
  code,
  caption,
}: {
  code: string;
  caption?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    let cancelled = false;

    async function render() {
      try {
        const mermaid = (await import('mermaid')).default;
        if (!mermaidInitialized) {
          mermaid.initialize({
            startOnLoad: false,
            theme: document.documentElement.classList.contains('dark')
              ? 'dark'
              : 'default',
            securityLevel: 'loose',
            fontFamily: 'ui-monospace, SFMono-Regular, monospace',
            fontSize: 13,
          });
          mermaidInitialized = true;
        }

        const id = `mermaid-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        const { svg: renderedSvg } = await mermaid.render(id, code);
        if (!cancelled) {
          setSvg(renderedSvg);
          setError('');
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to render diagram');
        }
      }
    }

    render();
    return () => {
      cancelled = true;
    };
  }, [code]);

  if (error) {
    return (
      <DiagramContainer caption={caption}>
        <div className="text-sm text-red-500 font-mono p-3">
          <p className="font-semibold mb-1">Diagram Error:</p>
          <pre className="text-xs whitespace-pre-wrap">{code}</pre>
        </div>
      </DiagramContainer>
    );
  }

  if (!svg) {
    return (
      <DiagramContainer caption={caption}>
        <div className="h-32 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
        </div>
      </DiagramContainer>
    );
  }

  return (
    <DiagramContainer caption={caption}>
      <div
        ref={containerRef}
        className="flex justify-center [&>svg]:max-w-full"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </DiagramContainer>
  );
}
