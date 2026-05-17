import { motion } from 'framer-motion'

export default function NavIndicator({ current, total, onNext, onPrev, labels }) {
  return (
    <div style={{
      position: 'fixed', bottom: '32px', left: '50%', transform: 'translateX(-50%)',
      display: 'flex', alignItems: 'center', gap: '16px', zIndex: 100,
      background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(16px)',
      borderRadius: '40px', padding: '8px 20px', border: '1px solid rgba(0,0,0,0.06)',
      boxShadow: '0 4px 24px rgba(0,0,0,0.04)'
    }}>
      <button
        onClick={onPrev}
        disabled={current === 0}
        style={{
          background: 'none', border: 'none', cursor: current === 0 ? 'default' : 'pointer',
          opacity: current === 0 ? 0.3 : 0.7, fontSize: '18px', color: '#1C1C1E',
          padding: '4px 8px'
        }}
      >
        ←
      </button>
      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
        {Array.from({ length: total }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              width: i === current ? 24 : 6,
              height: 6,
              borderRadius: 3,
              backgroundColor: i === current ? '#0A84FF' : i < current ? '#64D2FF' : 'rgba(0,0,0,0.12)',
            }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          />
        ))}
      </div>
      <button
        onClick={onNext}
        disabled={current === total - 1}
        style={{
          background: 'none', border: 'none', cursor: current === total - 1 ? 'default' : 'pointer',
          opacity: current === total - 1 ? 0.3 : 0.7, fontSize: '18px', color: '#1C1C1E',
          padding: '4px 8px'
        }}
      >
        →
      </button>
    </div>
  )
}

export function PageWrapper({ children, className = '' }) {
  return (
    <motion.div
      className={`min-h-screen bg-grid ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}

export function SectionTitle({ title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{ marginBottom: '24px' }}
    >
      <h2 style={{ fontSize: '24px', fontWeight: 600, letterSpacing: '-0.3px', color: '#1C1C1E' }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{ fontSize: '14px', color: '#8E8E93', marginTop: '4px' }}>{subtitle}</p>
      )}
    </motion.div>
  )
}
