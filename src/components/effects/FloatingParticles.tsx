import Particles, { ParticlesProvider } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import { useMemo } from 'react'
import type { ISourceOptions } from '@tsparticles/engine'
import { useIsMobile } from '../../hooks/useIsMobile'

function ParticleField() {
  const isMobile = useIsMobile()

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: false,
      background: { color: { value: 'transparent' } },
      fpsLimit: 60,
      particles: {
        number: { value: isMobile ? 40 : 80, density: { enable: true } },
        color: { value: ['#f472b6', '#c084fc', '#fbbf24', '#fda4af'] },
        shape: { type: 'circle' },
        opacity: {
          value: { min: 0.2, max: 0.8 },
          animation: { enable: true, speed: 0.5, sync: false },
        },
        size: { value: { min: 1, max: 4 } },
        move: {
          enable: true,
          speed: 0.6,
          direction: 'none',
          random: true,
          outModes: { default: 'out' },
        },
      },
      interactivity: {
        detectsOn: 'canvas',
        events: {
          onHover: { enable: !isMobile, mode: 'bubble' },
        },
        modes: {
          bubble: { distance: 120, size: 6, duration: 2, opacity: 1 },
        },
      },
      detectRetina: true,
    }),
    [isMobile],
  )

  return (
    <Particles
      id="floating-particles"
      className="absolute inset-0 z-[1]"
      options={options}
    />
  )
}

export function FloatingParticles() {
  return (
    <ParticlesProvider init={loadSlim}>
      <ParticleField />
    </ParticlesProvider>
  )
}
