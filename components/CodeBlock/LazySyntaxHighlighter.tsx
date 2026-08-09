import React, { useState, useEffect, useRef } from 'react';

interface LazySyntaxHighlighterProps {
  code: string;
  language?: string;
  customStyle?: React.CSSProperties;
  showLineNumbers?: boolean;
  lineNumberStyle?: React.CSSProperties;
  wrapLines?: boolean;
  wrapLongLines?: boolean;
  className?: string;
}

interface LoadedHighlighter {
  SyntaxHighlighter: any;
  vscDarkPlus: any;
}

let highlighterPromise: Promise<LoadedHighlighter> | null = null;
let loadedHighlighterCache: LoadedHighlighter | null = null;

function getOrLoadHighlighter(): Promise<LoadedHighlighter> {
  if (loadedHighlighterCache) {
    return Promise.resolve(loadedHighlighterCache);
  }
  if (!highlighterPromise) {
    highlighterPromise = Promise.all([
      import('react-syntax-highlighter'),
      import('react-syntax-highlighter/dist/esm/styles/prism')
    ])
      .then(([shModule, styleModule]) => {
        const SyntaxHighlighter = shModule.Prism || (shModule as any).default?.Prism || (shModule as any).default;
        const vscDarkPlus = styleModule.vscDarkPlus || (styleModule as any).default?.vscDarkPlus || (styleModule as any).default;

        if (!SyntaxHighlighter || !vscDarkPlus) {
          throw new Error('Failed to load syntax highlighter components');
        }

        const loaded = { SyntaxHighlighter, vscDarkPlus };
        loadedHighlighterCache = loaded;
        return loaded;
      })
      .catch((err) => {
        highlighterPromise = null;
        throw err;
      });
  }
  return highlighterPromise;
}

export const LazySyntaxHighlighter: React.FC<LazySyntaxHighlighterProps> = ({
  code,
  language = 'bash',
  customStyle,
  showLineNumbers = false,
  lineNumberStyle,
  wrapLines = true,
  wrapLongLines = true,
  className
}) => {
  const [highlighter, setHighlighter] = useState<LoadedHighlighter | null>(loadedHighlighterCache);
  const [loadFailed, setLoadFailed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (highlighter || loadFailed) return;

    let isMounted = true;

    const triggerLoad = () => {
      getOrLoadHighlighter()
        .then((loaded) => {
          if (isMounted) {
            setHighlighter(loaded);
          }
        })
        .catch((err) => {
          console.warn('LazySyntaxHighlighter failed to load:', err);
          if (isMounted) {
            setLoadFailed(true);
          }
        });
    };

    if (typeof IntersectionObserver !== 'undefined' && containerRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting) {
            triggerLoad();
            observer.disconnect();
          }
        },
        { rootMargin: '400px 0px' }
      );

      observer.observe(containerRef.current);

      return () => {
        isMounted = false;
        observer.disconnect();
      };
    } else {
      triggerLoad();
      return () => {
        isMounted = false;
      };
    }
  }, [highlighter, loadFailed]);

  if (highlighter && !loadFailed) {
    const { SyntaxHighlighter, vscDarkPlus } = highlighter;
    return (
      <div ref={containerRef}>
        <SyntaxHighlighter
          language={(language || 'bash').toLowerCase()}
          style={vscDarkPlus}
          customStyle={customStyle}
          showLineNumbers={showLineNumbers}
          lineNumberStyle={lineNumberStyle}
          wrapLines={wrapLines}
          wrapLongLines={wrapLongLines}
          className={className}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    );
  }

  const fallbackStyle: React.CSSProperties = {
    margin: 0,
    padding: customStyle?.padding || '1.25rem',
    background: 'transparent',
    fontSize: customStyle?.fontSize || '13px',
    lineHeight: customStyle?.lineHeight || '1.6',
    fontFamily: customStyle?.fontFamily || 'Menlo, Monaco, Consolas, monospace',
    whiteSpace: wrapLongLines || wrapLines ? 'pre-wrap' : 'pre',
    wordBreak: wrapLongLines || wrapLines ? 'break-word' : 'normal',
    color: '#d4d4d4',
    ...customStyle
  };

  return (
    <div ref={containerRef}>
      <pre style={fallbackStyle} className={className}>
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default LazySyntaxHighlighter;
