'use client';

import { useState } from 'react';

interface OutputPreviewProps {
  sampleOutput: string;
}

export default function OutputPreview({ sampleOutput }: OutputPreviewProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const lines = sampleOutput.split('\n');
  const displayLines = isExpanded ? lines : lines.slice(0, 12);
  const hasMore = lines.length > 12;

  return (
    <div className="relative shadow-stack">
      <div className="relative bg-[#0a0a0a] border-2 border-[#2a2a2a] overflow-hidden">
        
        {/* Header bar */}
        <div className="h-10 bg-[#0f0f0f] border-b border-[#2a2a2a] flex items-center justify-between px-4 texture-scanlines">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-[#ff2a2a]" />
              <div className="w-2 h-2 bg-[#ff6b00]" />
              <div className="w-2 h-2 bg-[#00ff41]" />
            </div>
            <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#606060]">
              TERMINAL OUTPUT
            </span>
          </div>
          
          {hasMore && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center space-x-2 text-[#ff2a2a] hover:text-[#ff6b00] transition-colors text-xs font-mono uppercase tracking-wider"
            >
              <span>{isExpanded ? 'COLLAPSE' : 'EXPAND'}</span>
              <span className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}>▼</span>
            </button>
          )}
        </div>
        
        {/* Output content */}
        <div className="relative p-6 bg-[#050505] texture-scanlines overflow-x-auto">
          {/* Scan line effect */}
          <div className="scan-line opacity-30" />
          
          <pre className="font-mono text-sm text-[#00ff41] leading-relaxed relative z-10">
            {displayLines.map((line, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 30}ms` }}>
                {line || ' '}
              </div>
            ))}
          </pre>
          
          {/* Expand prompt */}
          {!isExpanded && hasMore && (
            <div className="mt-4 pt-4 border-t border-[#2a2a2a]">
              <button
                onClick={() => setIsExpanded(true)}
                className="text-[#ff2a2a] hover:text-[#ff6b00] transition-colors text-xs font-mono uppercase tracking-wider"
              >
                + {lines.length - 12} MORE LINES
              </button>
            </div>
          )}
          
          {/* Cursor */}
          <div className="inline-block w-2 h-4 bg-[#00ff41] ml-1 animate-pulse" />
        </div>
        
        {/* Status bar */}
        <div className="h-8 bg-[#0f0f0f] border-t border-[#2a2a2a] flex items-center justify-between px-4">
          <span className="text-[9px] font-mono text-[#404040] uppercase tracking-wider">
            LINES: {lines.length}
          </span>
          <div className="flex items-center space-x-2">
            <div className="led led-sm led-green led-static" />
            <span className="text-[9px] font-mono text-[#00ff41]">READY</span>
          </div>
        </div>
      </div>
    </div>
  );
}