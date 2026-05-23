import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import DataSphere3D from '../components/DataSphere3D'

export default function EndingPage() {
  const [showText, setShowText] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShowText(true), 800)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: '#F2F7FB', position: 'relative', overflow: 'hidden'
    }}>
      {/* Central glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px', height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(10,132,255,0.08) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      {/* Data Sphere 3D */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        style={{ width: '420px', height: '420px', position: 'relative', zIndex: 1 }}
      >
        <Canvas camera={{ position: [0, 0.1, 3.8], fov: 38 }}
          gl={{ antialias: true, alpha: true }}>
          <DataSphere3D />
        </Canvas>

        {/* Scan line effect */}
        <motion.div
          animate={{ opacity: [0, 0.4, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{
            position: 'absolute', top: '15%', left: '10%', right: '10%',
            height: '1px', background: 'linear-gradient(90deg, transparent, #0A84FF, transparent)',
            opacity: 0.3, pointerEvents: 'none'
          }}
        />
      </motion.div>

      {/* Text */}
      {showText && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          style={{ textAlign: 'center', zIndex: 1, marginTop: '20px' }}
        >
          <div style={{
            fontSize: '38px', fontWeight: 700, color: '#1C1C1E',
            letterSpacing: '-1px', marginBottom: '12px'
          }}>
            让每一次牙齿移动
          </div>
          <div style={{
            fontSize: '38px', fontWeight: 300, color: '#0A84FF',
            letterSpacing: '2px', marginBottom: '40px'
          }}>
            都被精准感知
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}
          >
            <div style={{
              padding: '12px 32px', borderRadius: '40px',
              background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(16px)',
              border: '1px solid rgba(10,132,255,0.15)',
              fontSize: '14px', color: '#0A84FF', fontWeight: 500,
              letterSpacing: '1px'
            }}>
              数智矫正
            </div>
            <div style={{ fontSize: '13px', color: '#AEAEB2', letterSpacing: '2px' }}>
              PRECISION ORTHODONTICS
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              {['AI 智能监测', '精准医疗', '云端协同'].map((tag, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2 + i * 0.2 }}
                  style={{
                    padding: '8px 20px', borderRadius: '20px',
                    background: `rgba(${i === 0 ? '10,132,255' : i === 1 ? '48,200,176' : '100,210,255'},0.06)`,
                    border: `1px solid rgba(${i === 0 ? '10,132,255' : i === 1 ? '48,200,176' : '100,210,255'},0.12)`,
                    fontSize: '13px', color: '#636366', fontWeight: 500
                  }}
                >
                  {tag}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 3, duration: 1 }}
        style={{
          position: 'absolute', bottom: '32px', fontSize: '12px',
          color: '#AEAEB2', zIndex: 1
        }}
      >
        2026 数智矫正科技 · 演示版本
      </motion.div>
    </div>
  )
}
