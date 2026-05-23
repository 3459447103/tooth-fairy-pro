import { motion } from 'framer-motion'

export default function SkeletonLoader() {
  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: '20px'
    }}>
      {/* Pulsing ring */}
      <motion.div
        animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: '120px', height: '120px', borderRadius: '50%',
          border: '2px solid rgba(10,132,255,0.15)',
          borderTopColor: '#0A84FF',
          position: 'relative'
        }}
      />

      {/* Loading text */}
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          fontSize: '14px', color: '#0A84FF', fontWeight: 500,
          letterSpacing: '0.5px'
        }}
      >
        正在加载牙齿模型...
      </motion.div>

      {/* Subtle dots */}
      <div style={{ display: 'flex', gap: '6px' }}>
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
            style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#0A84FF' }}
          />
        ))}
      </div>
    </div>
  )
}
