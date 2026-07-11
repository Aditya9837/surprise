import { motion } from 'framer-motion'
import { useIsMobile } from '../../hooks/useIsMobile'

export function FloatingHearts({ active }: { active: boolean }) {
  const isMobile = useIsMobile()
  if (!active) return null

  const count = isMobile ? 12 : 20
  const hearts = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 4 + Math.random() * 4,
    size: 12 + Math.random() * 20,
  }))

  return (
    <div className="fixed inset-0 pointer-events-none z-[2] overflow-hidden" aria-hidden="true">
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute bottom-0"
          style={{ left: `${h.x}%` }}
          initial={{ y: 0, opacity: 0, scale: 0 }}
          animate={{
            y: '-110vh',
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1, 0.5],
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        >
          <svg width={h.size} height={h.size} viewBox="0 0 24 24">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill={`hsl(${320 + Math.random() * 40}, 80%, 70%)`}
              opacity="0.7"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  )
}
