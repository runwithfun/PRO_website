import React, { useEffect, useId, useRef, useState } from 'react';

export default function MermaidDiagram({ chart, className = '' }) {
  const containerRef = useRef(null);
  const rawId = useId().replace(/:/g, '');
  const diagramId = `mermaid-${rawId}`;
  const [error, setError] = useState(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let cancelled = false;

    async function render() {
      try {
        const mermaid = (await import('mermaid')).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: 'dark',
          securityLevel: 'strict',
          fontFamily: 'DM Sans, system-ui, sans-serif',
          themeVariables: {
            darkMode: true,
            background: '#000000',
            primaryColor: '#1c1c1e',
            primaryTextColor: '#ffffff',
            primaryBorderColor: '#d42d78',
            lineColor: '#d42d78',
            secondaryColor: '#2c2c2e',
            tertiaryColor: '#0a0a0a',
            mainBkg: '#1c1c1e',
            nodeBorder: '#d42d78',
            clusterBkg: '#141414',
            titleColor: '#ffffff',
            edgeLabelBackground: '#1c1c1e',
            pie1: '#d42d78',
            pie2: '#f06aa4',
            pie3: '#3b82f6',
            pie4: '#22c55e',
            pie5: '#a855f7',
            pie6: '#f59e0b',
            pie7: '#6b7280',
          },
        });
        const { svg } = await mermaid.render(diagramId, chart);
        if (!cancelled) el.innerHTML = svg;
      } catch (e) {
        if (!cancelled) setError('Diagram preview');
      }
    }

    render();
    return () => {
      cancelled = true;
    };
  }, [chart, diagramId]);

  if (error) {
    return (
      <div className={`flex min-h-[120px] items-center justify-center rounded-xl border border-brand-pink/40 bg-[#1c1c1e] text-xs text-gray-500 ${className}`}>
        {error}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`mermaid-wrap overflow-x-auto rounded-xl border border-brand-pink/40 bg-black p-3 ${className}`}
      role="img"
      aria-label="Diagram"
    />
  );
}
