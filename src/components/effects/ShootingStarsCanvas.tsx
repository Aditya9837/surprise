import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useIsMobile } from '../../hooks/useIsMobile'

interface ShootingStar {
  x: number
  y: number
  length: number
  speed: number
  angle: number
  life: number
}

interface NameGlow {
  id: number
  x: number
  y: number
}

interface ShootingStarsCanvasProps {
  name?: string
}

export function ShootingStarsCanvas({ name = 'Mansi' }: ShootingStarsCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isMobile = useIsMobile()
  const [glows, setGlows] = useState<NameGlow[]>([])
  const idRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId = 0
    let stars: ShootingStar[] = []
    let spawnTimer = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const spawnStar = () => {
      stars.push({
        x: Math.random() * canvas.width * 0.8,
        y: Math.random() * canvas.height * 0.45,
        length: Math.random() * 80 + 60,
        speed: Math.random() * 8 + 6,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
        life: 1,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      spawnTimer++
      const spawnRate = isMobile ? 100 : 60
      if (spawnTimer > spawnRate + Math.random() * 50) {
        spawnStar()
        spawnTimer = 0
      }

      stars = stars.filter((star) => {
        star.life -= 0.015
        if (star.life <= 0) return false

        const dx = Math.cos(star.angle) * star.speed
        const dy = Math.sin(star.angle) * star.speed
        star.x += dx
        star.y += dy

        const tailX = star.x - Math.cos(star.angle) * star.length
        const tailY = star.y - Math.sin(star.angle) * star.length

        const gradient = ctx.createLinearGradient(tailX, tailY, star.x, star.y)
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0)')
        gradient.addColorStop(0.5, `rgba(242, 184, 198, ${star.life * 0.55})`)
        gradient.addColorStop(1, `rgba(255, 255, 255, ${star.life})`)

        ctx.beginPath()
        ctx.moveTo(tailX, tailY)
        ctx.lineTo(star.x, star.y)
        ctx.strokeStyle = gradient
        ctx.lineWidth = 2
        ctx.lineCap = 'round'
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(star.x, star.y, 2.2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${star.life})`
        ctx.shadowBlur = 12
        ctx.shadowColor = '#f2b8c6'
        ctx.fill()
        ctx.shadowBlur = 0

        return true
      })

      animationId = requestAnimationFrame(animate)
    }

    resize()
    window.addEventListener('resize', resize)
    animationId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [isMobile])

  const spawnName = (clientX: number, clientY: number) => {
    const id = ++idRef.current
    setGlows((prev) => [...prev, { id, x: clientX, y: clientY }])
    window.setTimeout(() => {
      setGlows((prev) => prev.filter((g) => g.id !== id))
    }, 2200)
  }

  return (
    <div className="absolute inset-0 z-[2]">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-pointer"
        style={{ pointerEvents: 'auto' }}
        onClick={(e) => spawnName(e.clientX, e.clientY)}
        onTouchEnd={(e) => {
          const t = e.changedTouches[0]
          if (t) spawnName(t.clientX, t.clientY)
        }}
        aria-label={`Tap the stars to see ${name}`}
      />

      <AnimatePresence>
        {glows.map((g) => (
          <motion.span
            key={g.id}
            className="pointer-events-none fixed z-[5] font-[family-name:var(--font-script)] text-4xl sm:text-5xl text-gradient"
            style={{
              left: g.x,
              top: g.y,
              textShadow: '0 0 28px rgba(242,184,198,0.9), 0 0 60px rgba(232,213,168,0.5)',
            }}
            initial={{ opacity: 0, scale: 0.4, x: '-50%', y: '-50%' }}
            animate={{ opacity: 1, scale: 1.15, y: '-120%' }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {name}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  )
}
