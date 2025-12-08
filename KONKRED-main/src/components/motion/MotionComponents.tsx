'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedPanelProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedPanel({ children, className = '', delay = 0 }: AnimatedPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={`panel-frame ${className}`}
    >
      {children}
    </motion.div>
  );
}

interface CinematicCardProps {
  children: ReactNode;
  className?: string;
  whileHover?: boolean;
}

export function CinematicCard({ children, className = '', whileHover = true }: CinematicCardProps) {
  return (
    <motion.div
      className={`cinematic-card ${className}`}
      whileHover={whileHover ? {
        scale: 1.02,
        rotateX: 2,
        rotateY: -2,
        transition: { duration: 0.2 }
      } : undefined}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

interface TerminalButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export function TerminalButton({ 
  children, 
  onClick, 
  className = '', 
  disabled = false,
  loading = false,
  type = 'button'
}: TerminalButtonProps) {
  return (
    <motion.button
      type={type}
      className={`terminal-button ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={!disabled && !loading ? { scale: 1.02 } : undefined}
      whileTap={!disabled && !loading ? { scale: 1.01 } : undefined}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {loading ? (
        <span className="loading-pulse">PROCESSING...</span>
      ) : (
        children
      )}
    </motion.button>
  );
}

interface ScanLineProps {
  className?: string;
}

export function ScanLine({ className = '' }: ScanLineProps) {
  return (
    <motion.div
      className={`absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50 ${className}`}
      animate={{ y: ['-100%', '100%'] }}
      transition={{ 
        duration: 4, 
        repeat: Infinity, 
        ease: 'linear'
      }}
    />
  );
}

interface LEDIndicatorProps {
  color: 'green' | 'amber' | 'red';
  className?: string;
  label?: string;
}

export function LEDIndicator({ color, className = '', label }: LEDIndicatorProps) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <motion.div
        className={`led-indicator ${color}`}
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      {label && <span className="text-xs text-text-secondary uppercase">{label}</span>}
    </div>
  );
}

interface StaggeredGridProps {
  children: ReactNode[];
  className?: string;
}

export function StaggeredGrid({ children, className = '' }: StaggeredGridProps) {
  return (
    <div className={`grid gap-6 ${className}`}>
      {children.map((child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.3, 
            delay: index * 0.1,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}

interface GlowingTextProps {
  children: ReactNode;
  className?: string;
}

export function GlowingText({ children, className = '' }: GlowingTextProps) {
  return (
    <motion.span
      className={`glow-text ${className}`}
      animate={{ 
        textShadow: [
          '0 0 20px rgba(255, 44, 64, 0.5)',
          '0 0 30px rgba(255, 44, 64, 0.8)',
          '0 0 20px rgba(255, 44, 64, 0.5)'
        ]
      }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      {children}
    </motion.span>
  );
}

interface AnimatedUnderlineProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedUnderline({ children, className = '' }: AnimatedUnderlineProps) {
  return (
    <motion.div className={`nav-link ${className}`}>
      {children}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-accent-red"
        initial={{ width: 0 }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

interface FloatingPanelProps {
  children: ReactNode;
  className?: string;
}

export function FloatingPanel({ children, className = '' }: FloatingPanelProps) {
  return (
    <motion.div
      className={`panel-frame ${className}`}
      animate={{ 
        y: [0, -10, 0],
      }}
      transition={{ 
        duration: 4, 
        repeat: Infinity, 
        ease: 'easeInOut'
      }}
    >
      {children}
    </motion.div>
  );
}