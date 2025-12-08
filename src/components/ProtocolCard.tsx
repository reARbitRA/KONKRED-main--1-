'use client';

import Link from 'next/link';
import { Protocol } from '@/lib/types';
import { motion } from 'framer-motion';
import { LEDIndicator, TerminalButton } from './motion/MotionComponents';

interface ProtocolCardProps {
  protocol: Protocol;
  showActions?: boolean;
  index?: number;
}

export default function ProtocolCard({ protocol, showActions = true, index = 0 }: ProtocolCardProps) {
  const formatPrice = (cents: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(cents / 100);
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'standard':
        return 'text-text-secondary';
      case 'advanced':
        return 'text-accent-red';
      case 'enterprise':
        return 'text-accent-gold';
      default:
        return 'text-text-secondary';
    }
  };

  const getComplexityLED = (complexity: string) => {
    switch (complexity) {
      case 'standard':
        return 'green' as const;
      case 'advanced':
        return 'amber' as const;
      case 'enterprise':
        return 'red' as const;
      default:
        return 'green' as const;
    }
  };

  return (
    <motion.div
      className="cinematic-card p-6 group"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{
        y: -5,
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
    >
      {/* Status LED */}
      <motion.div
        className="absolute top-4 right-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.1 + 0.3 }}
      >
        <LEDIndicator color={getComplexityLED(protocol.complexity)} />
      </motion.div>

      {/* Main content */}
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <motion.h3 
              className="font-heading text-lg font-semibold text-text-primary mb-2 group-hover:text-accent-red transition-colors"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.1 }}
            >
              {protocol.title}
            </motion.h3>
            <motion.p 
              className="text-text-secondary text-sm mb-3 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.2 }}
            >
              {protocol.tagline}
            </motion.p>
          </div>
        </div>

        {/* Price and Meta */}
        <motion.div 
          className="flex justify-between items-center mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.3 }}
        >
          <div className="text-right">
            <div className="text-2xl font-bold text-text-primary mb-1 group-hover:text-accent-red transition-colors">
              {formatPrice(protocol.price_cents)}
            </div>
            <div className="text-text-secondary text-xs uppercase tracking-wider">
              {protocol.industry}
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <span className={`text-xs uppercase tracking-wide font-bold ${getComplexityColor(protocol.complexity)}`}>
              {protocol.complexity}
            </span>
            <span className="text-xs text-text-secondary mt-1">
              Structured Output
            </span>
          </div>
        </motion.div>

        {/* Animated divider */}
        <motion.div
          className="h-0.5 bg-gradient-to-r from-transparent via-accent-red to-transparent mb-4 opacity-30"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
          style={{ transformOrigin: 'center' }}
        />

        {/* Actions */}
        {showActions && (
          <motion.div 
            className="flex space-x-3 mt-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.5 }}
          >
            <Link 
              href={`/protocol/${protocol.slug}`}
              className="flex-1"
            >
              <TerminalButton className="w-full text-center">
                Acquire
              </TerminalButton>
            </Link>
            <Link 
              href={`/protocol/${protocol.slug}`}
              className="flex-1"
            >
              <motion.button
                className="w-full border border-accent-red text-accent-red py-2 px-4 rounded-button font-heading text-xs uppercase tracking-wide transition-all duration-200 hover:bg-accent-red hover:text-primary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Details
              </motion.button>
            </Link>
          </motion.div>
        )}
      </div>

      {/* Corner indicators */}
      <motion.div
        className="absolute top-2 left-2 w-2 h-2 border-t border-l border-accent-red opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ scale: 0 }}
        whileHover={{ scale: 1 }}
      />
      <motion.div
        className="absolute top-2 right-2 w-2 h-2 border-t border-r border-accent-red opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ scale: 0 }}
        whileHover={{ scale: 1 }}
      />
      <motion.div
        className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-accent-red opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ scale: 0 }}
        whileHover={{ scale: 1 }}
      />
      <motion.div
        className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-accent-red opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ scale: 0 }}
        whileHover={{ scale: 1 }}
      />
    </motion.div>
  );
}