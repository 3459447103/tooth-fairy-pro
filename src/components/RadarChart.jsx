import { motion } from 'framer-motion'

export default function RadarChart({
  data = [],
  labels = [],
  size = 240,
  color = '#0A84FF',
}) {
  const cx = size / 2
  const cy = size / 2
  const radius = size * 0.38
  const levels = 4
  const sides = data.length

  const angleStep = (Math.PI * 2) / sides
  const startAngle = -Math.PI / 2

  const getPoint = (index, value, maxValue) => {
    const angle = startAngle + index * angleStep
    const r = (value / maxValue) * radius
    return {
      x: cx + Math.cos(angle) * r,
      y: cy + Math.sin(angle) * r,
    }
  }

  // Generate polygon points string
  const polygonPoints = data.map((v, i) => {
    const pt = getPoint(i, v, 100)
    return `${pt.x},${pt.y}`
  }).join(' ')

  // Background grid
  const gridLines = Array.from({ length: levels }, (_, level) => {
    const r = ((level + 1) / levels) * radius
    return Array.from({ length: sides }, (_, i) => {
      const angle = startAngle + i * angleStep
      return { x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r }
    })
  })

  // Axis lines
  const axes = Array.from({ length: sides }, (_, i) => {
    const angle = startAngle + i * angleStep
    return { x2: cx + Math.cos(angle) * radius, y2: cy + Math.sin(angle) * radius }
  })

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Grid polygons */}
        {gridLines.map((points, level) => (
          <polygon
            key={level}
            points={points.map(p => `${p.x},${p.y}`).join(' ')}
            fill="none"
            stroke="rgba(0,0,0,0.06)"
            strokeWidth="1"
          />
        ))}

        {/* Axis lines */}
        {axes.map((axis, i) => (
          <line
            key={i}
            x1={cx} y1={cy}
            x2={axis.x2} y2={axis.y2}
            stroke="rgba(0,0,0,0.06)"
            strokeWidth="1"
          />
        ))}

        {/* Data polygon */}
        <motion.polygon
          points={polygonPoints}
          fill={`${color}15`}
          stroke={color}
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />

        {/* Data points */}
        {data.map((v, i) => {
          const pt = getPoint(i, v, 100)
          return (
            <motion.circle
              key={i}
              cx={pt.x} cy={pt.y} r="4"
              fill={color}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.1 }}
            />
          )
        })}

        {/* Labels */}
        {labels.map((label, i) => {
          const angle = startAngle + i * angleStep
          const lx = cx + Math.cos(angle) * (radius + 24)
          const ly = cy + Math.sin(angle) * (radius + 24)
          const anchor = lx < cx - 5 ? 'end' : lx > cx + 5 ? 'start' : 'middle'
          return (
            <motion.text
              key={i}
              x={lx} y={ly}
              textAnchor={anchor}
              dominantBaseline="middle"
              fontSize="11"
              fill="#636366"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.08 }}
            >
              {label}
            </motion.text>
          )
        })}
      </svg>
    </div>
  )
}
