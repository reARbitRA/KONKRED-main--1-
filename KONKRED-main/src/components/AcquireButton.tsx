'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface AcquireButtonProps {
  protocolId: string;
  protocolSlug: string;
  isAcquired?: boolean;
  fileUrl?: string;
}

export default function AcquireButton({ 
  protocolId, 
  protocolSlug, 
  isAcquired = false, 
  fileUrl 
}: AcquireButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAcquire = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          protocolId: protocolId,
        }),
      });

      if (!response.ok) {
        throw new Error('Payment initiation failed');
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (fileUrl) {
      window.open(fileUrl, '_blank');
    }
  };

  if (isAcquired) {
    return (
      <div className="flex items-center space-x-4">
        {/* Status badge */}
        <div className="flex items-center space-x-2 px-3 py-2 border border-[#00ff41]/30 bg-[#00ff41]/5">
          <div className="led led-sm led-green led-static" />
          <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-[#00ff41]">
            IN VAULT
          </span>
        </div>
        
        {/* Download button */}
        <button
          onClick={handleDownload}
          disabled={!fileUrl}
          className="relative px-6 py-3 border-2 border-[#d4a012] text-[#d4a012] font-mono text-sm uppercase tracking-[0.15em] font-bold hover:bg-[#d4a012] hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
        >
          <div className="absolute inset-0 bg-[#d4a012]/10 -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
          <span className="relative z-10">Download</span>
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={handleAcquire}
        disabled={loading}
        className="relative px-8 py-4 border-2 border-[#ff2a2a] bg-[#ff2a2a] text-black font-mono text-sm uppercase tracking-[0.15em] font-bold hover:bg-transparent hover:text-[#ff2a2a] transition-all disabled:opacity-50 overflow-hidden group"
      >
        {/* Loading effect */}
        {loading && (
          <div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            style={{ animation: 'laser-horizontal 1s ease-in-out infinite' }}
          />
        )}
        
        {/* Sweep effect */}
        <div className="absolute inset-0 bg-black/20 -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
        
        <span className="relative z-10">
          {loading ? 'INITIATING...' : 'Acquire'}
        </span>
      </button>
      
      {/* Payment method */}
      <p className="text-[10px] font-mono text-[#606060] mt-2 uppercase tracking-wider text-center">
        CRYPTO PAYMENT • USDT
      </p>
    </div>
  );
}