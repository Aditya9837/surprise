import { useEffect, useRef } from 'react'
import { useIsMobile } from '../../hooks/useIsMobile'

interface Sparkle {
  x: number
  y: number
  life: number
  maxLife: number
  size: number
  hue: number
}

export function MouseSparkleTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isMobile = useIsMobile()
  const sparklesRef = useRef<Sparkle[]>([])

  useEffect(() => {
    if (isMobile) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const onMove = (e: MouseEvent) => {
      for (let i = 0; i < 3; i++) {
        sparklesRef.current.push({
          x: e.clientX + (Math.random() - 0.5) * 20,
          y: e.clientY + (Math.random() - 0.5) * 20,
          life: 1,
          maxLife: 1,
          size: Math.random() * 4 + 2,
          hue: Math.random() * 60 + 300,
        })
      }
      if (sparklesRef.current.length > 80) {
        sparklesRef.current = sparklesRef.current.slice(-80)
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      sparklesRef.current = sparklesRef.current.filter((s) => {
        s.life -= 0.025
        if (s.life <= 0) return false

        const alpha = s.life / s.maxLife
        ctx.save()
        ctx.globalAlpha = alpha
        ctx.fillStyle = `hsl(${s.hue}, 80%, 75%)`
        ctx.shadowBlur = 12
        ctx.shadowColor = `hsl(${s.hue}, 80%, 70%)`
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size * alpha, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
        return true
      })

      animationId = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove)
    animationId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [isMobile])

  if (isMobile) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9998]"
      aria-hidden="true"
    />
  )
}
