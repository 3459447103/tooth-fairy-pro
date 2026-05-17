import { useEffect, useRef } from 'react'

export default function TrendChart({ data, color = "#0A84FF", height = 120, animated = true }) {
  const canvasRef = useRef()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = height * dpr
    ctx.scale(dpr, dpr)

    const w = rect.width
    const h = height
    const padding = 8
    const max = Math.max(...data, 1)
    const min = Math.min(...data, 0)

    // Gradient fill
    const gradient = ctx.createLinearGradient(0, 0, 0, h)
    gradient.addColorStop(0, `${color}20`)
    gradient.addColorStop(1, `${color}02`)

    // Draw line
    const points = data.map((v, i) => ({
      x: padding + (i / (data.length - 1)) * (w - padding * 2),
      y: h - padding - ((v - min) / (max - min || 1)) * (h - padding * 2),
    }))

    // Fill area
    ctx.beginPath()
    ctx.moveTo(points[0].x, h)
    points.forEach(p => ctx.lineTo(p.x, p.y))
    ctx.lineTo(points[points.length - 1].x, h)
    ctx.closePath()
    ctx.fillStyle = gradient
    ctx.fill()

    // Line
    ctx.beginPath()
    ctx.moveTo(points[0].x, points[0].y)
    for (let i = 1; i < points.length; i++) {
      const cp1x = points[i - 1].x + (points[i].x - points[i - 1].x) / 3
      const cp2x = points[i].x - (points[i].x - points[i - 1].x) / 3
      ctx.bezierCurveTo(cp1x, points[i - 1].y, cp2x, points[i].y, points[i].x, points[i].y)
    }
    ctx.strokeStyle = color
    ctx.lineWidth = 2
    ctx.stroke()

    // Glow
    ctx.shadowColor = color
    ctx.shadowBlur = 8
    ctx.stroke()
    ctx.shadowBlur = 0

    // Dots
    points.forEach((p, i) => {
      if (i % Math.ceil(points.length / 7) === 0 || i === points.length - 1) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.fill()
        ctx.beginPath()
        ctx.arc(p.x, p.y, 5.5, 0, Math.PI * 2)
        ctx.fillStyle = `${color}22`
        ctx.fill()
      }
    })

    // Min/Max labels
    ctx.fillStyle = '#8E8E93'
    ctx.font = '10px system-ui'
    ctx.fillText(Math.round(max), 2, padding + 10)
    ctx.fillText(Math.round(min), 2, h - 2)
  }, [data, color, height])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: `${height}px` }}
    />
  )
}
