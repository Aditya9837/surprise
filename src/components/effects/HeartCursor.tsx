import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useIsMobile } from '../../hooks/useIsMobile'

export function HeartCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [visible, setVisible] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    if (isMobile) return

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      setVisible(true)
    }
    const onLeave = () => setVisible(false)

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [isMobile])

  if (isMobile) return null

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-screen"
      animate={{
        x: pos.x - 12,
        y: pos.y - 12,
        scale: visible ? 1 : 0,
        opacity: visible ? 1 : 0,
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          fill="url(#cursorHeartGrad)"
        />
        <defs>
          <linearGradient id="cursorHeartGrad" x1="2" y1="3" x2="22" y2="21">
            <stop stopColor="#f2b8c6" />
            <stop offset="1" stopColor="#d4b56a" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  )
}
