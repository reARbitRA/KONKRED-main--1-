'use client';

import Link from 'next/link';
import { Protocol } from '@/lib/types';

interface ProtocolCardProps {
  protocol: Protocol;
  showActions?: boolean;
}

export default function ProtocolCard({ protocol, showActions = true }: ProtocolCardProps) {
  const formatPrice = (cents: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(cents / 100);
  };

  return (
    <div className="group relative shadow-stack">
      {/* Main card */}
      <div className="relative bg-[#0a0a0a] border-2 border-[#2a2a2a] transition-all duration-300 group-hover:border-[#ff2a2a] overflow-hidden texture-grid">
        
        {/* Top laser line */}
        <div className="laser-top" />
        
        {/* Ray burst on hover */}
        <div className="ray-burst opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
        
        {/* Scan line on hover */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="scan-line" />
        </div>
        
        {/* Corner brackets */}
        <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#ff2a2a] opacity-0 group-hover:opacity-100 transition-all duration-300" />
        <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[#ff2a2a] opacity-0 group-hover:opacity-100 transition-all duration-300" />
        <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-[#ff2a2a] opacity-0 group-hover:opacity-100 transition-all duration-300" />
        <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-[#ff2a2a] opacity-0 group-hover:opacity-100 transition-all duration-300" />
        
        {/* Industry bar - top */}
        <div className="h-8 bg-[#0f0f0f] border-b border-[#2a2a2a] flex items-center justify-between px-4 texture-scanlines">
          <div className="flex items-center space-x-3">
            <div className={`led led-sm ${
              protocol.complexity === 'standard' ? 'led-green' : 
              protocol.complexity === 'advanced' ? 'led-orange' : 'led-red'
            }`} />
            <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#606060]">
              {protocol.industry}
            </span>
          </div>
          <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-[#ff2a2a]">
            {protocol.complexity}
          </span>
        </div>
        
        {/* Content */}
        <div className="p-6 relative">
          {/* Title */}
          <h3 
            className="font-mono text-lg font-bold text-white mb-3 tracking-tight group-hover:text-[#ff2a2a] transition-colors glitch-text cursor-default"
            data-text={protocol.title}
          >
            {protocol.title}
          </h3>
          
          {/* Tagline */}
          <p className="text-[#a0a0a0] text-sm font-mono leading-relaxed mb-6">
            {protocol.tagline}
          </p>
          
          {/* Divider with accent */}
          <div className="h-[1px] bg-gradient-to-r from-transparent via-[#2a2a2a] to-transparent mb-6 relative">
            <div className="absolute left-1/2 -translate-x-1/2 -top-[3px] w-2 h-2 bg-[#ff2a2a] opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          
          {/* Price block */}
          <div className="panel-inset p-4 texture-dots">
            <div className="flex justify-between items-end">
              <div>
                <div className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#606060] mb-1">
                  ACQUISITION
                </div>
                <div className="text-2xl font-mono font-bold text-[#d4a012] text-glow-gold">
                  {formatPrice(protocol.price_cents)}
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center justify-end space-x-2 mb-1">
                  <div className="led led-sm led-green led-static" />
                  <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-[#00ff41]">
                    VERIFIED
                  </span>
                </div>
                <div className="text-[9px] font-mono text-[#606060] uppercase tracking-wider">
                  Structured Output
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Actions */}
        {showActions && (
          <div className="border-t-2 border-[#2a2a2a] grid grid-cols-2">
            <Link 
              href={`/protocol/${protocol.slug}`}
              className="p-4 text-center font-mono text-xs uppercase tracking-[0.15em] text-[#a0a0a0] hover:text-white hover:bg-[#0f0f0f] transition-all border-r border-[#2a2a2a] relative overflow-hidden"
            >
              <span className="relative z-10">Details</span>
            </Link>
            <Link 
              href={`/protocol/${protocol.slug}`}
              className="p-4 text-center font-mono text-xs uppercase tracking-[0.15em] text-[#ff2a2a] hover:bg-[#ff2a2a] hover:text-black transition-all font-bold relative overflow-hidden group/btn"
            >
              {/* Sweep effect */}
              <div className="absolute inset-0 bg-[#ff2a2a]/20 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-500" />
              <span className="relative z-10">Acquire →</span>
            </Link>
          </div>
        )}
        
        {/* Corner cut */}
        <div className="absolute top-0 right-0 w-6 h-6 bg-[#020202] border-l border-b border-[#2a2a2a]" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />
      </div>
    </div>
  );
}