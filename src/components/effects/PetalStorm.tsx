import { useEffect, useRef } from 'react'
import { useIsMobile } from '../../hooks/useIsMobile'

type Species = 'rose' | 'peony' | 'lily' | 'cherry'

interface Petal {
  x: number
  y: number
  z: number
  size: number
  speed: number
  rotation: number
  rotationSpeed: number
  sway: number
  swaySpeed: number
  species: Species
  spin: number
}

const SPECIES: Species[] = ['rose', 'peony', 'lily', 'cherry']

function palette(species: Species): [string, string, string] {
  switch (species) {
    case 'rose':
      return ['#ffe4ec', '#f2b8c6', '#c45c74']
    case 'peony':
      return ['#fff5f7', '#f9a8c0', '#db7093']
    case 'lily':
      return ['#fff8e7', '#e8d5a8', '#d4b56a']
    case 'cherry':
      return ['#ffe0eb', '#fda4af', '#e11d8a']
  }
}

export function PetalStorm({ density = 1 }: { density?: number }) {
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

    const create = (fromTop = true): Petal => {
      const z = Math.random()
      return {
        x: Math.random() * canvas.width,
        y: fromTop ? -40 - Math.random() * canvas.height * 0.4 : Math.random() * canvas.height,
        z,
        size: (8 + z * 18) * (0.85 + density * 0.15),
        speed: 0.45 + z * 1.8,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.05,
        sway: Math.random() * Math.PI * 2,
        swaySpeed: 0.008 + Math.random() * 0.02,
        species: SPECIES[Math.floor(Math.random() * SPECIES.length)],
        spin: Math.random() * Math.PI * 2,
      }
    }

    const drawPetal = (p: Petal) => {
      const [c0, c1, c2] = palette(p.species)
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rotation)
      ctx.scale(1, 0.55 + Math.sin(p.spin) * 0.15)
      ctx.globalAlpha = 0.35 + p.z * 0.55

      const g = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size)
      g.addColorStop(0, c0)
      g.addColorStop(0.55, c1)
      g.addColorStop(1, c2)
      ctx.fillStyle = g

      ctx.beginPath()
      ctx.moveTo(0, -p.size)
      ctx.bezierCurveTo(p.size * 0.9, -p.size * 0.4, p.size * 1.05, p.size * 0.35, 0, p.size)
      ctx.bezierCurveTo(-p.size * 1.05, p.size * 0.35, -p.size * 0.9, -p.size * 0.4, 0, -p.size)
      ctx.fill()

      ctx.globalAlpha *= 0.35
      ctx.strokeStyle = c0
      ctx.lineWidth = 0.6
      ctx.beginPath()
      ctx.moveTo(0, -p.size * 0.7)
      ctx.quadraticCurveTo(p.size * 0.15, 0, 0, p.size * 0.75)
      ctx.stroke()

      ctx.restore()
    }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      const base = isMobile ? 38 : 72
      petals = Array.from({ length: Math.floor(base * density) }, () => create(false))
    }

    const animate = () => {
      time += 1
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of petals) {
        p.y += p.speed
        p.x += Math.sin(time * p.swaySpeed + p.sway) * (0.6 + p.z)
        p.rotation += p.rotationSpeed
        p.spin += 0.02 + p.z * 0.02

        if (p.y > canvas.height + 40) {
          Object.assign(p, create(true))
          p.y = -30
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
  }, [isMobile, density])

  return <canvas ref={canvasRef} className="particles-canvas" aria-hidden="true" />
}
