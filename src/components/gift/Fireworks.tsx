import { useEffect, useRef } from 'react'

interface Firework {
  x: number
  y: number
  particles: {
    x: number
    y: number
    vx: number
    vy: number
    color: string
    life: number
  }[]
}

const FW_COLORS = ['#f2b8c6', '#e89aab', '#d4b56a', '#e8d5a8', '#f7e8e0', '#fff']

export function Fireworks({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fireworksRef = useRef<Firework[]>([])
  const spawnRef = useRef(0)

  useEffect(() => {
    if (!active) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const spawnFirework = () => {
      const x = Math.random() * canvas.width * 0.8 + canvas.width * 0.1
      const y = Math.random() * canvas.height * 0.5 + canvas.height * 0.1
      const color = FW_COLORS[Math.floor(Math.random() * FW_COLORS.length)]
      const count = 40

      fireworksRef.current.push({
        x,
        y,
        particles: Array.from({ length: count }, (_, i) => {
          const angle = (i / count) * Math.PI * 2
          const speed = Math.random() * 3 + 2
          return {
            x,
            y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            color,
            life: 1,
          }
        }),
      })
    }

    let animationId = 0
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      spawnRef.current++
      if (spawnRef.current % 40 === 0) spawnFirework()

      fireworksRef.current = fireworksRef.current.filter((fw) => {
        let alive = false
        for (const p of fw.particles) {
          p.x += p.vx
          p.y += p.vy
          p.vy += 0.02
          p.vx *= 0.98
          p.life -= 0.015

          if (p.life <= 0) continue
          alive = true

          ctx.beginPath()
          ctx.arc(p.x, p.y, 2 * p.life, 0, Math.PI * 2)
          ctx.fillStyle = p.color
          ctx.globalAlpha = p.life
          ctx.shadowBlur = 8
          ctx.shadowColor = p.color
          ctx.fill()
          ctx.shadowBlur = 0
          ctx.globalAlpha = 1
        }
        return alive
      })

      animationId = requestAnimationFrame(animate)
    }

    spawnFirework()
    spawnFirework()
    animationId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationId)
  }, [active])

  if (!active) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[2]"
      aria-hidden="true"
    />
  )
}
