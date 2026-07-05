import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  color: string
  size: number
  life: number
  rotation: number
  rotationSpeed: number
  shape: 'rect' | 'circle'
}

const COLORS = ['#f472b6', '#c084fc', '#fbbf24', '#fda4af', '#818cf8', '#fff']

export function ConfettiBurst({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const firedRef = useRef(false)

  useEffect(() => {
    if (!active || firedRef.current) return
    firedRef.current = true

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const cx = canvas.width / 2
    const cy = canvas.height / 2

    for (let i = 0; i < 200; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = Math.random() * 12 + 4
      particlesRef.current.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 5,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: Math.random() * 8 + 4,
        life: 1,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.2,
        shape: Math.random() > 0.5 ? 'rect' : 'circle',
      })
    }

    let animationId = 0
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current = particlesRef.current.filter((p) => {
        p.vy += 0.15
        p.vx *= 0.99
        p.x += p.vx
        p.y += p.vy
        p.rotation += p.rotationSpeed
        p.life -= 0.008

        if (p.life <= 0) return false

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rotation)
        ctx.globalAlpha = p.life

        if (p.shape === 'rect') {
          ctx.fillStyle = p.color
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2)
        } else {
          ctx.beginPath()
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2)
          ctx.fillStyle = p.color
          ctx.fill()
        }

        ctx.restore()
        return true
      })

      if (particlesRef.current.length > 0) {
        animationId = requestAnimationFrame(animate)
      }
    }

    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [active])

  if (!active) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[8000]"
      aria-hidden="true"
    />
  )
}
