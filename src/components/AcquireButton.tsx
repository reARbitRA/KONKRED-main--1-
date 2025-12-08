'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { TerminalButton } from './motion/MotionComponents';

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
      console.error('Error creating payment:', error);
      // You could show an error toast here
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
        <motion.div
          className="flex items-center space-x-2 text-text-secondary text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="w-2 h-2 bg-green-500 rounded-full"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="font-mono uppercase tracking-wide">In Your Vault</span>
        </motion.div>
        
        <motion.button
          onClick={handleDownload}
          disabled={!fileUrl}
          className="relative overflow-hidden group"
          whileHover={!fileUrl ? {} : { scale: 1.02 }}
          whileTap={!fileUrl ? {} : { scale: 0.98 }}
        >
          <TerminalButton disabled={!fileUrl} className="relative">
            <span className="relative z-10">Download</span>
            <motion.div
              className="absolute inset-0 bg-accent-gold/20"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
            />
          </TerminalButton>
        </motion.button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <TerminalButton
        onClick={handleAcquire}
        disabled={loading}
        loading={loading}
        className="relative overflow-hidden group"
      >
        <span className="relative z-10">
          {loading ? 'INITIATING PAYMENT...' : 'Acquire'}
        </span>
        
        {/* Hover effect */}
        <motion.div
          className="absolute inset-0 bg-accent-red/20"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Loading state */}
        {loading && (
          <motion.div
            className="absolute inset-0 bg-accent-red/10"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}
        
        {/* Crypto payment indicator */}
        <motion.div
          className="absolute right-2 top-1/2 -translate-y-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <motion.span
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            ₮
          </motion.span>
        </motion.div>
      </TerminalButton>
      
      {/* Payment method indicator */}
      <motion.p
        className="text-xs text-text-secondary mt-2 text-center font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        USDT CRYPTO PAYMENT
      </motion.p>
    </motion.div>
  );
}