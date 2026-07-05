import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { POLAROIDS } from '../../constants/content'
import { useIsMobile } from '../../hooks/useIsMobile'

function createPolaroidTexture(caption: string, emoji: string, hue: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 640
  const ctx = canvas.getContext('2d')!

  ctx.fillStyle = '#fefefe'
  ctx.fillRect(0, 0, 512, 640)

  const grad = ctx.createLinearGradient(0, 0, 512, 512)
  grad.addColorStop(0, `hsl(${hue}, 60%, 75%)`)
  grad.addColorStop(0.5, `hsl(${hue + 30}, 50%, 65%)`)
  grad.addColorStop(1, `hsl(${hue + 60}, 40%, 55%)`)
  ctx.fillStyle = grad
  ctx.fillRect(24, 24, 464, 480)

  ctx.font = '120px serif'
  ctx.textAlign = 'center'
  ctx.fillText(emoji, 256, 280)

  ctx.fillStyle = '#333'
  ctx.font = 'italic 28px Georgia, serif'
  ctx.textAlign = 'center'
  ctx.fillText(caption, 256, 560)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

export function PolaroidScene() {
  const mountRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const width = mount.clientWidth
    const height = mount.clientHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100)
    camera.position.z = 8

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0xf472b6, 1.5, 20)
    pointLight.position.set(2, 3, 5)
    scene.add(pointLight)

    const pointLight2 = new THREE.PointLight(0xc084fc, 1, 20)
    pointLight2.position.set(-3, -1, 4)
    scene.add(pointLight2)

    const cards: THREE.Mesh[] = []
    const hues = [330, 280, 40]
    const positions = isMobile
      ? [[0, 0, 0]]
      : [
          [-2.2, 0.3, 0],
          [0, -0.2, 0.5],
          [2.2, 0.3, 0],
        ]

    POLAROIDS.slice(0, positions.length).forEach((polaroid, i) => {
      const texture = createPolaroidTexture(polaroid.caption, polaroid.emoji, hues[i])
      const geometry = new THREE.BoxGeometry(2.2, 2.8, 0.06)
      const materials = [
        new THREE.MeshStandardMaterial({ color: 0xfefefe }),
        new THREE.MeshStandardMaterial({ color: 0xfefefe }),
        new THREE.MeshStandardMaterial({ color: 0xfefefe }),
        new THREE.MeshStandardMaterial({ color: 0xfefefe }),
        new THREE.MeshStandardMaterial({ map: texture }),
        new THREE.MeshStandardMaterial({ color: 0xfefefe }),
      ]
      const mesh = new THREE.Mesh(geometry, materials)
      const [x, y, z] = positions[i]
      mesh.position.set(x, y, z)
      mesh.rotation.y = isMobile ? 0 : (i - 1) * 0.3
      mesh.rotation.x = isMobile ? 0 : 0.05
      scene.add(mesh)
      cards.push(mesh)
    })

    let mouseX = 0
    let mouseY = 0
    let targetRotX = 0
    let targetRotY = 0

    const onMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect()
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1
      targetRotY = mouseX * 0.3
      targetRotX = mouseY * 0.2
    }

    if (!isMobile) mount.addEventListener('mousemove', onMouseMove)

    let animationId = 0
    const animate = () => {
      animationId = requestAnimationFrame(animate)

      cards.forEach((card, i) => {
        const baseY = isMobile ? 0 : (i - 1) * 0.3
        card.rotation.y += (targetRotY + baseY - card.rotation.y) * 0.05
        card.rotation.x += (targetRotX - card.rotation.x) * 0.05
        card.position.y += Math.sin(Date.now() * 0.001 + i) * 0.0005
      })

      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', onResize)
      if (!isMobile) mount.removeEventListener('mousemove', onMouseMove)
      mount.removeChild(renderer.domElement)
      renderer.dispose()
      cards.forEach((card) => {
        card.geometry.dispose()
        if (Array.isArray(card.material)) {
          card.material.forEach((m) => {
            const mat = m as THREE.MeshStandardMaterial
            mat.map?.dispose()
            mat.dispose()
          })
        }
      })
    }
  }, [isMobile])

  return (
    <div
      ref={mountRef}
      className="w-full h-[60vh] min-h-[400px] max-w-5xl mx-auto rounded-3xl overflow-hidden"
    />
  )
}
