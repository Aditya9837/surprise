import { motion } from 'framer-motion'

export function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <motion.div
        className="absolute -top-1/2 -left-1/4 w-[150%] h-[120%] opacity-55"
        style={{
          background:
            'radial-gradient(ellipse at 30% 20%, rgba(196, 92, 116, 0.4) 0%, transparent 50%), radial-gradient(ellipse at 70% 30%, rgba(242, 184, 198, 0.28) 0%, transparent 45%), radial-gradient(ellipse at 50% 80%, rgba(212, 181, 106, 0.15) 0%, transparent 50%)',
        }}
        animate={{
          x: ['-5%', '5%', '-5%'],
          y: ['-3%', '3%', '-3%'],
          rotate: [-2, 2, -2],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1/2"
        style={{
          background:
            'linear-gradient(to top, rgba(10, 6, 8, 1) 0%, rgba(10, 6, 8, 0.6) 40%, transparent 100%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, rgba(196, 92, 116, 0.06) 50%, rgba(212, 181, 106, 0.08) 100%)',
        }}
      />
    </div>
  )
}
