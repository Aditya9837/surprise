import { motion } from 'framer-motion'
import { HiArrowDown } from 'react-icons/hi2'
import { CTA } from '../../constants/content'

interface PremiumButtonProps {
  onClick?: () => void
  children: React.ReactNode
  variant?: 'primary' | 'ghost'
  className?: string
}

export function PremiumButton({
  onClick,
  children,
  variant = 'primary',
  className = '',
}: PremiumButtonProps) {
  const base =
    'relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-medium text-sm tracking-[0.2em] uppercase overflow-hidden transition-all duration-500'

  const variants = {
    primary:
      'bg-gradient-to-r from-pink-500/90 via-purple-600/90 to-pink-500/90 text-white shadow-[0_0_40px_rgba(236,72,153,0.4)] border border-white/20',
    ghost: 'glass text-white/90 border border-white/15 hover:border-pink-400/40',
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
        animate={{ x: ['-200%', '200%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  )
}

export function ScrollCTA({ onClick }: { onClick?: () => void }) {
  return (
    <PremiumButton onClick={onClick} className="mt-12">
      {CTA.landing}
      <HiArrowDown className="animate-bounce" />
    </PremiumButton>
  )
}
