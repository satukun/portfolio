"use client";
import { useEffect, useRef, useState } from 'react';

interface CodeSphereProps {
  width?: number;
  height?: number;
}

const terminalContent = [
  // Terminal commands
  '$ npm install react',
  '$ yarn add next',
  '$ git commit -m "feat: add new feature"',
  '$ npm run build',
  '$ yarn dev',
  '$ git push origin main',
  '$ npm test',
  '$ yarn start',
  '$ git status',
  '$ npm run lint',
  '$ git add .',
  '$ yarn build',
  '$ npm run dev',
  '$ git log --oneline',
  '$ yarn install',
  '$ npm run test:watch',
  '$ git checkout -b feature/new',
  '$ yarn add -D typescript',
  '$ npm run storybook',
  '$ git merge main',
  '$ npm audit fix',
  '$ yarn upgrade',
  '$ git pull origin main',
  '$ npm run deploy',
  '$ yarn test:coverage',
  '$ git reset --hard HEAD',
  '$ npm run format',
  '$ yarn add @types/node',
  '$ git branch -d feature',
  '$ npm run analyze',
  
  // Terminal outputs
  '> Building application...',
  '> Compiled successfully!',
  '> Ready on http://localhost:3000',
  '> Found 0 errors',
  '> Linting complete',
  '> Tests passed',
  '> Deployment successful',
  '> Bundle size: 2.4MB',
  '> Performance: 98/100',
  '> Accessibility: 100/100',
  '✓ All tests passed',
  '✓ Build completed',
  '✓ No lint errors',
  '✓ Type check passed',
  '⚠ Warning: Deprecated API',
  '❌ Build failed',
  '🚀 Deploying to production...',
  '📦 Installing dependencies...',
  '🔧 Running build scripts...',
  '✨ Optimizing bundle...',
  
  // Code snippets
  'const [state, setState] = useState();',
  'useEffect(() => {',
  '  fetchData();',
  '}, [dependency]);',
  'export default function Component() {',
  '  return <div>Hello World</div>;',
  '}',
  'interface Props {',
  '  title: string;',
  '  onClick: () => void;',
  '}',
  'import React from "react";',
  'import { NextPage } from "next";',
  'const router = useRouter();',
  'await fetch("/api/data");',
  'const response = await res.json();',
  'if (error) throw new Error();',
  'try {',
  '  await processData();',
  '} catch (err) {',
  '  console.error(err);',
  '}',
  'const handleClick = useCallback(() => {',
  '  setCount(prev => prev + 1);',
  '}, []);',
  'return (',
  '  <button onClick={handleClick}>',
  '    Click me',
  '  </button>',
  ');',
  '.container {',
  '  display: flex;',
  '  justify-content: center;',
  '  align-items: center;',
  '}',
  '@media (max-width: 768px) {',
  '  .responsive { width: 100%; }',
  '}',
  'animation: fadeIn 0.3s ease;',
  'transform: translateY(-4px);',
  'box-shadow: 0 4px 12px rgba(0,0,0,0.1);',
  'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);',
  'const theme = {',
  '  colors: {',
  '    primary: "#2563eb",',
  '    secondary: "#10b981"',
  '  }',
  '};',
  'git add . && git commit -m "update"',
  'npm run build && npm run start',
  'yarn install --frozen-lockfile',
  'docker build -t app .',
  'kubectl apply -f deployment.yaml',
  'terraform plan && terraform apply'
];

// テキストの色分け関数
const getTextColor = (text: string): string => {
  // Terminal commands
  if (text.startsWith('$')) return '#58a6ff';
  
  // Terminal outputs
  if (text.startsWith('>')) return '#79c0ff';
  
  // Status indicators
  if (text.startsWith('✓')) return '#3fb950';
  if (text.startsWith('⚠')) return '#d29922';
  if (text.startsWith('❌')) return '#f85149';
  if (text.includes('🚀') || text.includes('📦') || text.includes('🔧') || text.includes('✨')) return '#a5a5a5';
  
  // Code syntax highlighting
  if (text.includes('const ') || text.includes('let ') || text.includes('var ')) return '#ff7b72';
  if (text.includes('function ') || text.includes('export ') || text.includes('import ')) return '#d2a8ff';
  if (text.includes('useState') || text.includes('useEffect') || text.includes('useCallback')) return '#79c0ff';
  if (text.includes('interface ') || text.includes('type ')) return '#ffa657';
  if (text.includes('return ') || text.includes('if ') || text.includes('try ') || text.includes('catch ')) return '#ff7b72';
  if (text.includes('"') || text.includes("'") || text.includes('`')) return '#a5d6ff';
  if (text.includes('{') || text.includes('}') || text.includes('(') || text.includes(')')) return '#c9d1d9';
  if (text.includes('.') && (text.includes('container') || text.includes('flex') || text.includes('center'))) return '#79c0ff';
  if (text.includes('@media') || text.includes('animation:') || text.includes('transform:')) return '#d2a8ff';
  if (text.includes('#') && text.length > 3) return '#a5d6ff'; // CSS colors
  
  // Default
  return '#c9d1d9';
};

export default function CodeSphere({ width = 400, height = 300 }: CodeSphereProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<Array<{
    id: number;
    text: string;
    x: number;
    y: number;
    opacity: number;
    speed: number;
  }>>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 初期ラインを生成
    const initialLines = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      text: terminalContent[Math.floor(Math.random() * terminalContent.length)],
      x: Math.random() * width,
      y: Math.random() * height,
      opacity: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.5 + 0.2
    }));

    setLines(initialLines);

    // アニメーションループ
    const animate = () => {
      setLines(prevLines => 
        prevLines.map(line => {
          let newY = line.y + line.speed;
          let newText = line.text;
          let newOpacity = line.opacity;

          // 画面下部に到達したらリセット
          if (newY > height + 50) {
            newY = -50;
            newText = terminalContent[Math.floor(Math.random() * terminalContent.length)];
            newOpacity = Math.random() * 0.8 + 0.2;
          }

          return {
            ...line,
            y: newY,
            text: newText,
            opacity: newOpacity
          };
        })
      );
    };

    const intervalId = setInterval(animate, 50);

    return () => clearInterval(intervalId);
  }, [width, height]);

  return (
    <div 
      ref={containerRef}
      className="terminal-sphere"
      style={{
        width,
        height,
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0d1117 0%, #161b22 50%, #21262d 100%)',
        borderRadius: '20px',
        border: '1px solid rgba(48, 54, 61, 0.8)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        fontFamily: '"SF Mono", "Monaco", "Inconsolata", "Roboto Mono", "Source Code Pro", monospace'
      }}
    >
      {/* ターミナルヘッダー */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '28px',
        background: 'rgba(48, 54, 61, 0.9)',
        borderBottom: '1px solid rgba(48, 54, 61, 0.8)',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '12px',
        gap: '8px',
        borderRadius: '20px 20px 0 0'
      }}>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
        <span style={{ 
          fontSize: '11px', 
          color: '#8b949e', 
          marginLeft: '8px',
          fontWeight: 500
        }}>
          terminal
        </span>
      </div>

      {/* スクロールするコマンド */}
      <div style={{
        position: 'absolute',
        top: '28px',
        left: 0,
        right: 0,
        bottom: 0,
        padding: '16px',
        overflow: 'hidden'
      }}>
        {lines.map((line) => (
          <div
            key={line.id}
            style={{
              position: 'absolute',
              left: `${Math.min(line.x, width - 200)}px`,
              top: `${line.y}px`,
              fontSize: '11px',
              color: getTextColor(line.text),
              opacity: line.opacity,
              whiteSpace: 'nowrap',
              fontWeight: line.text.startsWith('$') ? 600 : 400,
              textShadow: line.text.startsWith('$') ? '0 0 8px rgba(88, 166, 255, 0.3)' : 'none',
              transition: 'opacity 0.3s ease'
            }}
          >
            {line.text}
          </div>
        ))}
      </div>

      {/* グラデーションオーバーレイ */}
      <div style={{
        position: 'absolute',
        top: '28px',
        left: 0,
        right: 0,
        height: '40px',
        background: 'linear-gradient(to bottom, rgba(13, 17, 23, 0.8), transparent)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '40px',
        background: 'linear-gradient(to top, rgba(13, 17, 23, 0.8), transparent)',
        pointerEvents: 'none'
      }} />

      {/* カーソル点滅 */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        fontSize: '11px',
        color: '#58a6ff',
        display: 'flex',
        alignItems: 'center',
        gap: '4px'
      }}>
        <span>$</span>
        <div style={{
          width: '8px',
          height: '14px',
          background: '#58a6ff',
          animation: 'blink 1s infinite',
          opacity: 0.8
        }} />
      </div>

      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}