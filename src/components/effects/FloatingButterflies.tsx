import { motion } from 'framer-motion'
import { useIsMobile } from '../../hooks/useIsMobile'

const BUTTERFLIES = [
  { id: 1, x: '10%', y: '20%', delay: 0, size: 28, duration: 18 },
  { id: 2, x: '85%', y: '35%', delay: 2, size: 22, duration: 22 },
  { id: 3, x: '25%', y: '70%', delay: 4, size: 26, duration: 20 },
  { id: 4, x: '70%', y: '15%', delay: 1, size: 20, duration: 24 },
  { id: 5, x: '50%', y: '85%', delay: 3, size: 24, duration: 19 },
]

function Butterfly({ size, duration, delay }: { size: number; duration: number; delay: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      animate={{
        x: [0, 80, -40, 60, 0],
        y: [0, -60, 40, -30, 0],
        rotate: [0, 10, -10, 5, 0],
      }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        animate={{ scaleX: [1, 0.3, 1] }}
        transition={{ duration: 0.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ellipse cx="12" cy="18" rx="10" ry="14" fill="rgba(244, 114, 182, 0.5)" />
        <ellipse cx="28" cy="18" rx="10" ry="14" fill="rgba(192, 132, 252, 0.5)" />
        <ellipse cx="20" cy="24" rx="3" ry="10" fill="rgba(251, 191, 36, 0.6)" />
      </motion.svg>
    </motion.div>
  )
}

export function FloatingButterflies() {
  const isMobile = useIsMobile()
  const count = isMobile ? 2 : BUTTERFLIES.length

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[2]" aria-hidden="true">
      {BUTTERFLIES.slice(0, count).map((b) => (
        <div key={b.id} className="absolute" style={{ left: b.x, top: b.y }}>
          <Butterfly size={b.size} duration={b.duration} delay={b.delay} />
        </div>
      ))}
    </div>
  )
}
