import { useEffect, useRef } from 'react'
import { useIsMobile } from '../../hooks/useIsMobile'

interface Petal {
  x: number
  y: number
  size: number
  speed: number
  rotation: number
  rotationSpeed: number
  opacity: number
  sway: number
  swaySpeed: number
}

export function FallingPetals() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId = 0
    let petals: Petal[] = []
    let time = 0

    const createPetal = (): Petal => ({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * canvas.height,
      size: Math.random() * 12 + 8,
      speed: Math.random() * 1.5 + 0.8,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.04,
      opacity: Math.random() * 0.5 + 0.4,
      sway: Math.random() * Math.PI * 2,
      swaySpeed: Math.random() * 0.02 + 0.01,
    })

    const drawPetal = (p: Petal) => {
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rotation)
      ctx.globalAlpha = p.opacity

      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size)
      gradient.addColorStop(0, '#fda4af')
      gradient.addColorStop(0.5, '#f472b6')
      gradient.addColorStop(1, '#ec4899')

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.moveTo(0, -p.size)
      ctx.bezierCurveTo(p.size * 0.8, -p.size * 0.5, p.size, p.size * 0.3, 0, p.size)
      ctx.bezierCurveTo(-p.size, p.size * 0.3, -p.size * 0.8, -p.size * 0.5, 0, -p.size)
      ctx.fill()
      ctx.restore()
    }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      const count = isMobile ? 25 : 45
      petals = Array.from({ length: count }, createPetal)
    }

    const animate = () => {
      time += 1
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of petals) {
        p.y += p.speed
        p.x += Math.sin(time * p.swaySpeed + p.sway) * 0.8
        p.rotation += p.rotationSpeed

        if (p.y > canvas.height + 30) {
          Object.assign(p, createPetal())
          p.y = -20
        }

        drawPetal(p)
      }

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

  return <canvas ref={canvasRef} className="particles-canvas" aria-hidden="true" />
}
