/** Draw a romantic memory card and trigger download */
export function downloadMemoryCard(opts: {
  herName: string
  dateLabel: string
  title?: string
  subtitle?: string
}) {
  const {
    herName,
    dateLabel,
    title = 'I Love You',
    subtitle = 'A day to remember forever',
  } = opts

  const w = 1080
  const h = 1350
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const bg = ctx.createLinearGradient(0, 0, w, h)
  bg.addColorStop(0, '#1a0c12')
  bg.addColorStop(0.45, '#2a1420')
  bg.addColorStop(1, '#140a10')
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, w, h)

  // soft glow orbs
  const orb = (x: number, y: number, r: number, color: string) => {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r)
    g.addColorStop(0, color)
    g.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = g
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
  }
  orb(w * 0.3, h * 0.25, 320, 'rgba(196,92,116,0.35)')
  orb(w * 0.75, h * 0.7, 280, 'rgba(212,181,106,0.22)')

  // border
  ctx.strokeStyle = 'rgba(242,184,198,0.35)'
  ctx.lineWidth = 3
  ctx.strokeRect(48, 48, w - 96, h - 96)

  ctx.fillStyle = 'rgba(242,184,198,0.55)'
  ctx.font = '28px Georgia, serif'
  ctx.textAlign = 'center'
  ctx.fillText('FOR ' + herName.toUpperCase(), w / 2, 160)

  ctx.fillStyle = '#f7e8e0'
  ctx.font = 'italic 120px Georgia, serif'
  ctx.fillText(title, w / 2, h * 0.42)

  ctx.fillStyle = 'rgba(232,213,168,0.85)'
  ctx.font = '36px Georgia, serif'
  ctx.fillText(dateLabel, w / 2, h * 0.52)

  ctx.fillStyle = 'rgba(247,240,235,0.55)'
  ctx.font = 'italic 32px Georgia, serif'
  ctx.fillText(subtitle, w / 2, h * 0.6)

  ctx.fillStyle = 'rgba(242,184,198,0.7)'
  ctx.font = '28px Georgia, serif'
  ctx.fillText('Forever starts with you', w / 2, h * 0.78)

  ctx.fillStyle = 'rgba(247,240,235,0.28)'
  ctx.font = '22px sans-serif'
  ctx.fillText('Our weeks · a lifetime archive', w / 2, h - 100)

  canvas.toBlob((blob) => {
    if (!blob) return
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `mansi-${dateLabel.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}-memory.png`
    a.click()
    URL.revokeObjectURL(url)
  }, 'image/png')
}
