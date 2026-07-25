import { useEffect, useRef } from 'react'
import { useIsMobile } from '../../hooks/useIsMobile'

interface Bloom {
  x: number
  y: number
  size: number
  petals: number
  hue: number
  phase: number
  speed: number
  sway: number
  open: number
  targetOpen: number
}

function drawFlower(
  ctx: CanvasRenderingContext2D,
  b: Bloom,
  time: number,
) {
  const swayX = Math.sin(time * 0.0012 + b.sway) * 6
  const cx = b.x + swayX
  const cy = b.y
  const open = b.open
  const r = b.size * open

  ctx.save()
  ctx.translate(cx, cy)

  // stem
  ctx.strokeStyle = `hsla(${120 + b.hue * 0.05}, 35%, 28%, ${0.35 + open * 0.35})`
  ctx.lineWidth = 1.5 + b.size * 0.04
  ctx.beginPath()
  ctx.moveTo(0, r * 0.2)
  ctx.quadraticCurveTo(-8 + swayX * 0.3, r * 1.2, swayX * 0.2, r * 2.4)
  ctx.stroke()

  // leaves
  if (open > 0.4) {
    ctx.fillStyle = `hsla(140, 40%, 32%, ${0.25 * open})`
    ctx.beginPath()
    ctx.ellipse(-10, r * 1.1, 10 * open, 4 * open, -0.6, 0, Math.PI * 2)
    ctx.ellipse(12, r * 1.5, 9 * open, 3.5 * open, 0.5, 0, Math.PI * 2)
    ctx.fill()
  }

  // glow
  const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, r * 1.8)
  glow.addColorStop(0, `hsla(${b.hue}, 70%, 72%, ${0.22 * open})`)
  glow.addColorStop(1, 'transparent')
  ctx.fillStyle = glow
  ctx.beginPath()
  ctx.arc(0, 0, r * 1.8, 0, Math.PI * 2)
  ctx.fill()

  // petals
  for (let i = 0; i < b.petals; i++) {
    const angle = (i / b.petals) * Math.PI * 2 + time * 0.00015 * b.speed
    ctx.save()
    ctx.rotate(angle)
    const grad = ctx.createRadialGradient(0, -r * 0.35, 0, 0, -r * 0.35, r)
    grad.addColorStop(0, `hsla(${b.hue + 8}, 85%, 92%, ${0.85 * open})`)
    grad.addColorStop(0.45, `hsla(${b.hue}, 70%, 72%, ${0.75 * open})`)
    grad.addColorStop(1, `hsla(${b.hue - 12}, 55%, 48%, ${0.35 * open})`)
    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.bezierCurveTo(r * 0.45, -r * 0.2, r * 0.55, -r * 0.75, 0, -r)
    ctx.bezierCurveTo(-r * 0.55, -r * 0.75, -r * 0.45, -r * 0.2, 0, 0)
    ctx.fill()
    ctx.restore()
  }

  // center
  const center = ctx.createRadialGradient(0, 0, 0, 0, 0, r * 0.28)
  center.addColorStop(0, `hsla(${b.hue + 40}, 90%, 88%, ${open})`)
  center.addColorStop(1, `hsla(${b.hue + 20}, 70%, 55%, ${0.7 * open})`)
  ctx.fillStyle = center
  ctx.beginPath()
  ctx.arc(0, 0, r * 0.22, 0, Math.PI * 2)
  ctx.fill()

  ctx.restore()
}

export function BloomGardenCanvas({
  interactive = false,
  onBloom,
}: {
  interactive?: boolean
  onBloom?: (count: number) => void
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isMobile = useIsMobile()
  const bloomsRef = useRef<Bloom[]>([])
  const countRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId = 0
    let time = 0

    const spawn = (x: number, y: number, openNow = false): Bloom => ({
      x,
      y,
      size: 18 + Math.random() * 28,
      petals: 5 + Math.floor(Math.random() * 4),
      hue: 330 + Math.random() * 40 - (Math.random() > 0.7 ? 80 : 0),
      phase: Math.random() * Math.PI * 2,
      speed: 0.6 + Math.random(),
      sway: Math.random() * Math.PI * 2,
      open: openNow ? 1 : 0,
      targetOpen: 1,
    })

    const seedAmbient = () => {
      const n = isMobile ? 7 : 12
      bloomsRef.current = Array.from({ length: n }, () =>
        spawn(
          canvas.width * (0.1 + Math.random() * 0.8),
          canvas.height * (0.35 + Math.random() * 0.5),
          true,
        ),
      )
      for (const b of bloomsRef.current) {
        b.open = 0.55 + Math.random() * 0.45
        b.targetOpen = b.open
      }
      countRef.current = bloomsRef.current.length
    }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      if (bloomsRef.current.length === 0) seedAmbient()
    }

    const animate = () => {
      time += 16
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // soft ground mist
      const mist = ctx.createLinearGradient(0, canvas.height * 0.55, 0, canvas.height)
      mist.addColorStop(0, 'transparent')
      mist.addColorStop(1, 'rgba(80, 30, 45, 0.25)')
      ctx.fillStyle = mist
      ctx.fillRect(0, canvas.height * 0.55, canvas.width, canvas.height * 0.45)

      const sorted = [...bloomsRef.current].sort((a, b) => a.y - b.y)
      for (const b of sorted) {
        b.open += (b.targetOpen - b.open) * 0.04
        drawFlower(ctx, b, time + b.phase * 200)
      }

      animationId = requestAnimationFrame(animate)
    }

    const handlePointer = (e: PointerEvent) => {
      if (!interactive) return
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const bloom = spawn(x, y, false)
      bloom.open = 0.05
      bloomsRef.current.push(bloom)
      countRef.current += 1
      onBloom?.(countRef.current)
    }

    resize()
    window.addEventListener('resize', resize)
    if (interactive) canvas.addEventListener('pointerdown', handlePointer)
    animationId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('pointerdown', handlePointer)
    }
  }, [isMobile, interactive, onBloom])

  return (
    <canvas
      ref={canvasRef}
      className={`particles-canvas ${interactive ? 'interactive-bloom' : ''}`}
      aria-hidden={!interactive}
    />
  )
}
