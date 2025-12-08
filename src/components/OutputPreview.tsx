'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface OutputPreviewProps {
  sampleOutput: string;
}

export default function OutputPreview({ sampleOutput }: OutputPreviewProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const displayLines = isExpanded 
    ? sampleOutput.split('\n') 
    : sampleOutput.split('\n').slice(0, 10);

  return (
    <motion.div
      className="panel-frame"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header with controls */}
      <div className="flex justify-between items-center p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <motion.div
            className="w-3 h-3 bg-red-500 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="w-3 h-3 bg-yellow-500 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
          <motion.div
            className="w-3 h-3 bg-green-500 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-xs text-text-secondary font-mono uppercase tracking-wide">
            TERMINAL OUTPUT
          </span>
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-accent-red hover:text-accent-gold transition-colors text-sm font-mono flex items-center space-x-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>{isExpanded ? 'COLLAPSE' : 'EXPAND'}</span>
            <motion.span
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              ▼
            </motion.span>
          </motion.button>
        </div>
      </div>
      
      {/* Terminal output */}
      <div className="relative bg-primary overflow-hidden">
        {/* Scan line effect */}
        <motion.div
          className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-terminal-green to-transparent opacity-30"
          animate={{ y: ['-100%', '100%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
        
        <div className="p-6 font-mono text-sm text-terminal-green overflow-x-auto">
          {displayLines.map((line, index) => (
            <motion.div
              key={index}
              className="leading-relaxed"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.3, 
                delay: index * 0.05,
                ease: 'easeOut'
              }}
            >
              {line || <span>&nbsp;</span>}
            </motion.div>
          ))}
          
          {!isExpanded && sampleOutput.split('\n').length > 10 && (
            <motion.div
              className="mt-4 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <button
                onClick={() => setIsExpanded(true)}
                className="text-accent-red hover:text-accent-gold transition-colors text-sm font-mono border border-accent-red/30 px-3 py-1 rounded"
              >
                LOAD FULL OUTPUT →
              </button>
            </motion.div>
          )}
        </div>

        {/* Terminal cursor effect */}
        <motion.div
          className="absolute bottom-4 right-4 w-2 h-4 bg-terminal-green"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </div>

      {/* Status bar */}
      <div className="bg-secondary border-t border-border px-4 py-2 flex justify-between items-center">
        <div className="flex items-center space-x-4 text-xs text-text-secondary font-mono">
          <span>LINES: {sampleOutput.split('\n').length}</span>
          <span>STATUS: ACTIVE</span>
        </div>
        <div className="flex items-center space-x-2">
          <motion.div
            className="w-1 h-1 bg-terminal-green rounded-full"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-xs text-terminal-green font-mono">READY</span>
        </div>
      </div>
    </motion.div>
  );
}