import { useEffect, useRef } from 'react'

interface Spark {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  max: number
  size: number
  hue: number
  rot: number
  spin: number
}

export function BloomBurst({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fired = useRef(false)

  useEffect(() => {
    if (!active || fired.current) return
    fired.current = true

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const cx = canvas.width / 2
    const cy = canvas.height * 0.42
    const sparks: Spark[] = []

    for (let i = 0; i < 90; i++) {
      const a = Math.random() * Math.PI * 2
      const sp = 2 + Math.random() * 7
      sparks.push({
        x: cx,
        y: cy,
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp - 2,
        life: 1,
        max: 0.7 + Math.random() * 0.6,
        size: 6 + Math.random() * 14,
        hue: 320 + Math.random() * 50,
        rot: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.2,
      })
    }

    let id = 0
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      let alive = false

      for (const s of sparks) {
        if (s.life <= 0) continue
        alive = true
        s.life -= 0.012
        s.x += s.vx
        s.y += s.vy
        s.vy += 0.08
        s.vx *= 0.99
        s.rot += s.spin

        const a = Math.max(0, s.life / s.max)
        ctx.save()
        ctx.translate(s.x, s.y)
        ctx.rotate(s.rot)
        ctx.globalAlpha = a
        const g = ctx.createRadialGradient(0, 0, 0, 0, 0, s.size)
        g.addColorStop(0, `hsla(${s.hue}, 90%, 92%, 1)`)
        g.addColorStop(0.5, `hsla(${s.hue}, 75%, 68%, 0.9)`)
        g.addColorStop(1, `hsla(${s.hue}, 60%, 45%, 0)`)
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.moveTo(0, -s.size)
        ctx.bezierCurveTo(s.size * 0.8, -s.size * 0.3, s.size, s.size * 0.4, 0, s.size)
        ctx.bezierCurveTo(-s.size, s.size * 0.4, -s.size * 0.8, -s.size * 0.3, 0, -s.size)
        ctx.fill()
        ctx.restore()
      }

      if (alive) id = requestAnimationFrame(animate)
    }

    id = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(id)
  }, [active])

  if (!active) return null
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[5]"
      aria-hidden="true"
    />
  )
}
