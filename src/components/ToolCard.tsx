'use client';

import Link from 'next/link';
import { Tool } from '@/lib/types';
import { motion } from 'framer-motion';
import { LEDIndicator, TerminalButton } from './motion/MotionComponents';

interface ToolCardProps {
  tool: Tool;
  index?: number;
}

export default function ToolCard({ tool, index = 0 }: ToolCardProps) {
  const getAccessBadgeColor = (accessLevel: string) => {
    switch (accessLevel) {
      case 'Free':
        return 'bg-green-900/30 text-green-400 border-green-800';
      case 'Pro':
        return 'bg-accent-red/10 text-accent-red border-accent-red/30';
      default:
        return 'bg-secondary text-text-secondary border-border';
    }
  };

  const getAccessLED = (accessLevel: string) => {
    switch (accessLevel) {
      case 'Free':
        return 'green' as const;
      case 'Pro':
        return 'amber' as const;
      default:
        return 'red' as const;
    }
  };

  return (
    <motion.div
      className="panel-frame p-6 group relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{
        scale: 1.02,
        rotateY: 5,
        transition: { duration: 0.3 }
      }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Module frame decoration */}
      <div className="absolute inset-0 border border-accent-red/20 rounded-panel pointer-events-none" />
      
      {/* Top status bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent-red to-transparent opacity-50"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
        style={{ transformOrigin: 'center' }}
      />

      {/* Status LED and access level */}
      <motion.div
        className="flex justify-between items-start mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.15 + 0.1 }}
      >
        <div className="flex items-center space-x-3">
          <LEDIndicator color={getAccessLED(tool.accessLevel)} />
          <span className={`text-xs px-2 py-1 border rounded ${getAccessBadgeColor(tool.accessLevel)} uppercase tracking-wide font-mono`}>
            {tool.accessLevel}
          </span>
        </div>
        
        {/* Module indicator lights */}
        <div className="flex space-x-1">
          <motion.div
            className="w-1 h-1 bg-accent-red rounded-full"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
          />
          <motion.div
            className="w-1 h-1 bg-accent-gold rounded-full"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 + 0.5 }}
          />
          <motion.div
            className="w-1 h-1 bg-text-secondary rounded-full"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 + 1 }}
          />
        </div>
      </motion.div>

      {/* Tool name */}
      <motion.h3 
        className="font-heading text-xl font-bold text-text-primary mb-3 group-hover:text-accent-red transition-colors"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.15 + 0.2 }}
      >
        {tool.name}
      </motion.h3>

      {/* Tool description */}
      <motion.p 
        className="text-text-secondary text-sm mb-6 leading-relaxed font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.15 + 0.3 }}
      >
        {tool.description}
      </motion.p>

      {/* Console-style status display */}
      <motion.div
        className="bg-primary/50 border border-border/50 rounded p-3 mb-6 font-mono text-xs"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.15 + 0.4 }}
      >
        <div className="flex justify-between items-center">
          <span className="text-terminal-green">STATUS:</span>
          <motion.span
            className="text-accent-red"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            ● ACTIVE
          </motion.span>
        </div>
        <div className="flex justify-between items-center mt-1">
          <span className="text-terminal-green">MODE:</span>
          <span className="text-text-secondary">
            {tool.accessLevel === 'Free' ? 'PUBLIC' : 'PREMIUM'}
          </span>
        </div>
      </motion.div>

      {/* Access button */}
      <motion.div
        className="mt-auto"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.15 + 0.5 }}
      >
        <Link 
          href={tool.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          <TerminalButton className="w-full text-center relative overflow-hidden group/btn">
            <span className="relative z-10">Access</span>
            <motion.div
              className="absolute inset-0 bg-accent-red/20"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
            />
            <motion.div
              className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0"
              whileHover={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              →
            </motion.div>
          </TerminalButton>
        </Link>
      </motion.div>

      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-panel"
        whileHover={{
          boxShadow: '0 0 30px rgba(255, 44, 64, 0.3), inset 0 0 20px rgba(255, 44, 64, 0.1)'
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Bottom frame decoration */}
      <motion.div
        className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-accent-red to-transparent opacity-30"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
        style={{ transformOrigin: 'center' }}
      />
    </motion.div>
  );
}