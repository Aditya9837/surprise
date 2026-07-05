import { motion } from 'framer-motion'

const BLOBS = [
  { color: 'rgba(124, 58, 237, 0.25)', size: '40vw', x: '-10%', y: '10%', duration: 25 },
  { color: 'rgba(236, 72, 153, 0.2)', size: '35vw', x: '60%', y: '50%', duration: 30 },
  { color: 'rgba(59, 130, 246, 0.15)', size: '30vw', x: '30%', y: '-10%', duration: 22 },
  { color: 'rgba(251, 191, 36, 0.1)', size: '25vw', x: '70%', y: '70%', duration: 28 },
]

export function GlowingBlobs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {BLOBS.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-[80px]"
          style={{
            width: blob.size,
            height: blob.size,
            left: blob.x,
            top: blob.y,
            background: blob.color,
          }}
          animate={{
            x: [0, 40, -20, 30, 0],
            y: [0, -30, 20, -10, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{ duration: blob.duration, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}
