import { useEffect, useRef } from 'react'
import { useIsMobile } from '../../hooks/useIsMobile'

interface ShootingStar {
  x: number
  y: number
  length: number
  speed: number
  angle: number
  opacity: number
  life: number
}

export function ShootingStarsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isMobile = useIsMobile()

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
        y: Math.random() * canvas.height * 0.4,
        length: Math.random() * 80 + 60,
        speed: Math.random() * 8 + 6,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
        opacity: 1,
        life: 1,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      spawnTimer++
      const spawnRate = isMobile ? 120 : 70
      if (spawnTimer > spawnRate + Math.random() * 60) {
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
        gradient.addColorStop(0.5, `rgba(200, 220, 255, ${star.life * 0.6})`)
        gradient.addColorStop(1, `rgba(255, 255, 255, ${star.life})`)

        ctx.beginPath()
        ctx.moveTo(tailX, tailY)
        ctx.lineTo(star.x, star.y)
        ctx.strokeStyle = gradient
        ctx.lineWidth = 2
        ctx.lineCap = 'round'
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(star.x, star.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${star.life})`
        ctx.shadowBlur = 10
        ctx.shadowColor = '#fff'
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

  return <canvas ref={canvasRef} className="particles-canvas" aria-hidden="true" />
}
