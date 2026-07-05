import { motion } from 'framer-motion'
import { type ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  strong?: boolean
  hover?: boolean
}

export function GlassCard({ children, className = '', strong = false, hover = true }: GlassCardProps) {
  return (
    <motion.div
      className={`${strong ? 'glass-strong' : 'glass'} rounded-3xl ${className}`}
      whileHover={
        hover
          ? {
              scale: 1.02,
              boxShadow: '0 25px 80px rgba(236, 72, 153, 0.2), 0 0 60px rgba(124, 58, 237, 0.1)',
            }
          : undefined
      }
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
