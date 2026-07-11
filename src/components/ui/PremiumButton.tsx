import { motion } from 'framer-motion'

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
    'relative inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 min-h-12 rounded-full font-medium text-[11px] sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase overflow-hidden transition-all duration-500'

  const variants = {
    primary:
      'text-ink border border-white/25 shadow-[0_0_40px_rgba(242,184,198,0.4)]',
    ghost: 'glass text-pearl/90 border border-white/15 hover:border-blush/40',
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
      style={
        variant === 'primary'
          ? { background: 'linear-gradient(135deg, #f7e8e0, #f2b8c6 50%, #e8d5a8)' }
          : undefined
      }
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12"
        animate={{ x: ['-200%', '200%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  )
}

export function ScrollCTA({
  onClick,
  label = 'Continue',
}: {
  onClick?: () => void
  label?: string
}) {
  return (
    <PremiumButton onClick={onClick} className="mt-12">
      {label}
      <motion.span
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 1.2, repeat: Infinity }}
        aria-hidden
      >
        ↓
      </motion.span>
    </PremiumButton>
  )
}
