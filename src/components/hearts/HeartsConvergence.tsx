import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useInView } from '../../hooks/useInView'
import { useIsMobile } from '../../hooks/useIsMobile'

interface MiniHeart {
  el: HTMLDivElement
  startX: number
  startY: number
  size: number
}

export function HeartsConvergence() {
  const containerRef = useRef<HTMLDivElement>(null)
  const giantHeartRef = useRef<HTMLDivElement>(null)
  const [sectionRef, inView] = useInView<HTMLDivElement>({ threshold: 0.3 })
  const isMobile = useIsMobile()
  const animatedRef = useRef(false)

  useEffect(() => {
    if (!inView || animatedRef.current || !containerRef.current || !giantHeartRef.current) return
    animatedRef.current = true

    const container = containerRef.current
    const giantHeart = giantHeartRef.current
    const count = isMobile ? 80 : 200
    const hearts: MiniHeart[] = []

    for (let i = 0; i < count; i++) {
      const el = document.createElement('div')
      el.className = 'absolute pointer-events-none'
      const size = Math.random() * 10 + 6
      el.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="hsl(${320 + Math.random() * 40}, 80%, ${60 + Math.random() * 20}%)" opacity="${0.5 + Math.random() * 0.5}"/></svg>`

      const startX = Math.random() * window.innerWidth
      const startY = Math.random() * window.innerHeight
      el.style.left = `${startX}px`
      el.style.top = `${startY}px`
      container.appendChild(el)
      hearts.push({ el, startX, startY, size })
    }

    gsap.set(giantHeart, { scale: 0, opacity: 0 })

    const rect = container.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const tl = gsap.timeline({ delay: 0.5 })

    hearts.forEach((heart, i) => {
      tl.to(
        heart.el,
        {
          left: centerX - heart.size / 2,
          top: centerY - heart.size / 2,
          scale: 0.3,
          opacity: 0,
          duration: 2 + Math.random(),
          ease: 'power2.inOut',
        },
        i * 0.008,
      )
    })

    tl.to(
      giantHeart,
      {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: 'elastic.out(1, 0.5)',
      },
      '-=0.8',
    )

    tl.to(giantHeart, {
      boxShadow: '0 0 80px rgba(236, 72, 153, 0.6), 0 0 120px rgba(124, 58, 237, 0.4)',
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    return () => {
      tl.kill()
      hearts.forEach((h) => h.el.remove())
    }
  }, [inView, isMobile])

  return (
    <div ref={sectionRef} className="relative w-full h-[70vh] min-h-[400px]">
      <div ref={containerRef} className="absolute inset-0 overflow-hidden" />
      <div
        ref={giantHeartRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
      >
        <svg
          width={isMobile ? 160 : 240}
          height={isMobile ? 160 : 240}
          viewBox="0 0 24 24"
          className="drop-shadow-2xl"
        >
          <defs>
            <linearGradient id="giantHeartGrad" x1="0" y1="0" x2="24" y2="24">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="50%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="url(#giantHeartGrad)"
            filter="url(#glow)"
          />
        </svg>
      </div>
    </div>
  )
}
