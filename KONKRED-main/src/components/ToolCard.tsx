'use client';

import Link from 'next/link';
import { Tool } from '@/lib/types';

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const isFree = tool.accessLevel === 'Free';
  
  return (
    <div className="group relative shadow-stack shadow-brutal-cyan h-full">
      {/* Main card */}
      <div className="relative bg-[#0a0a0a] border-2 border-[#2a2a2a] transition-all duration-300 group-hover:border-[#00f0ff] overflow-hidden h-full flex flex-col texture-crosshatch">
        
        {/* Top laser line - cyan */}
        <div className="absolute top-0 left-0 right-0 h-[1px] overflow-hidden">
          <div 
            className="h-full w-[60%] opacity-0 group-hover:opacity-100 transition-opacity"
            style={{
              background: 'linear-gradient(90deg, transparent, #00f0ff, #fff, #00f0ff, transparent)',
              boxShadow: '0 0 10px #00f0ff, 0 0 20px #00f0ff',
              animation: 'laser-horizontal 3s ease-in-out infinite'
            }}
          />
        </div>
        
        {/* Left vertical laser */}
        <div className="laser-left opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-8 h-[2px] bg-[#00f0ff] group-hover:shadow-[0_0_10px_#00f0ff] transition-shadow" />
        <div className="absolute top-0 left-0 w-[2px] h-8 bg-[#00f0ff] group-hover:shadow-[0_0_10px_#00f0ff] transition-shadow" />
        <div className="absolute bottom-0 right-0 w-8 h-[2px] bg-[#00f0ff] opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-0 right-0 w-[2px] h-8 bg-[#00f0ff] opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Status bar */}
        <div className="h-10 bg-[#0f0f0f] border-b border-[#2a2a2a] flex items-center justify-between px-4 texture-scanlines">
          <div className="flex items-center space-x-3">
            <div className={`led led-sm ${isFree ? 'led-green' : 'led-orange'}`} />
            <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#606060]">
              {isFree ? 'PUBLIC ACCESS' : 'PRO MODULE'}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="led led-sm led-cyan" />
            <span className="text-[9px] font-mono text-[#00f0ff]">ONLINE</span>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 flex-1 flex flex-col relative">
          {/* Grid overlay */}
          <div className="absolute inset-0 texture-grid opacity-30 pointer-events-none" />
          
          {/* Tool name */}
          <h3 
            className="font-mono text-xl font-bold text-white mb-4 tracking-tight group-hover:text-[#00f0ff] transition-colors relative z-10 glitch-text"
            data-text={tool.name}
          >
            {tool.name}
          </h3>
          
          {/* Description */}
          <p className="text-[#a0a0a0] text-sm font-mono leading-relaxed mb-6 flex-1 relative z-10">
            {tool.description}
          </p>
          
          {/* Access badge */}
          <div className="relative z-10">
            <span className={`
              inline-block text-[10px] font-mono uppercase tracking-[0.15em] px-3 py-2 border-2
              ${isFree 
                ? 'text-[#00ff41] border-[#00ff41]/50 bg-[#00ff41]/5' 
                : 'text-[#ff6b00] border-[#ff6b00]/50 bg-[#ff6b00]/5'
              }
            `}>
              {tool.accessLevel}
            </span>
          </div>
        </div>
        
        {/* Action */}
        <Link 
          href={tool.href}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-4 text-center font-mono text-sm uppercase tracking-[0.15em] border-t-2 border-[#2a2a2a] bg-[#0f0f0f] text-[#00f0ff] hover:bg-[#00f0ff] hover:text-black transition-all font-bold relative overflow-hidden group/btn"
        >
          {/* Sweep effect */}
          <div className="absolute inset-0 bg-[#00f0ff]/10 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-500" />
          <span className="relative z-10 flex items-center justify-center space-x-2">
            <span>Access Module</span>
            <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
          </span>
        </Link>
      </div>
    </div>
  );
}