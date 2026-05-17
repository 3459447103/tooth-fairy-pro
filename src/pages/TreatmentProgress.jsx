import { Suspense, useState } from 'react'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import ToothModel from '../components/ToothModel'
import GlassCard from '../components/Cards'
import { PageWrapper, SectionTitle } from '../components/NavIndicator'

const stages = [
  { id: 1, name: '第 1-3 副', status: 'completed', desc: '初步排齐', date: '2025.10 - 2025.12' },
  { id: 2, name: '第 4-6 副', status: 'completed', desc: '关闭间隙', date: '2025.12 - 2026.02' },
  { id: 3, name: '第 7-8 副', status: 'active', desc: '精细调整', date: '2026.02 - 当前' },
  { id: 4, name: '第 9-16 副', status: 'upcoming', desc: '咬合优化', date: '2026.04 - 2026.08' },
  { id: 5, name: '第 17-24 副', status: 'upcoming', desc: '稳定保持', date: '2026.08 - 2026.12' },
]

export default function TreatmentProgress() {
  const [compareMode, setCompareMode] = useState(false)

  return (
    <PageWrapper>
      <div style={{ padding: '40px 48px', maxWidth: '1400px', margin: '0 auto' }}>
        <SectionTitle title="疗程进度" subtitle="第 8/24 副 · 整体进度 42%" />

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="glass"
          style={{ padding: '32px', marginBottom: '24px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
            {/* Progress line */}
            <div style={{
              position: 'absolute', top: '16px', left: '60px', right: '60px',
              height: '2px', background: 'rgba(0,0,0,0.06)', zIndex: 0
            }} />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '42%' }}
              transition={{ delay: 0.5, duration: 1.2 }}
              style={{
                position: 'absolute', top: '16px', left: '60px',
                height: '2px', background: '#0A84FF', zIndex: 0
              }}
            />

            {stages.map((stage, i) => (
              <div key={stage.id} style={{ flex: 1, textAlign: 'center', zIndex: 1 }}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.12, type: 'spring' }}
                  style={{
                    width: '32px', height: '32px', borderRadius: '50%',
                    margin: '0 auto 12px',
                    background: stage.status === 'completed' ? '#30C8B0' :
                      stage.status === 'active' ? '#0A84FF' : 'rgba(0,0,0,0.06)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: stage.status === 'active' ? '0 0 20px rgba(10,132,255,0.3)' : 'none'
                  }}
                >
                  {stage.status === 'completed' && (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="white">
                      <path d="M3 7l3 3 5-6" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
                    </svg>
                  )}
                  {stage.status === 'active' && (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'white' }}
                    />
                  )}
                </motion.div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: stage.status === 'active' ? '#0A84FF' : '#1C1C1E' }}>
                  {stage.name}
                </div>
                <div style={{ fontSize: '11px', color: '#8E8E93', marginTop: '2px' }}>{stage.desc}</div>
                <div style={{ fontSize: '10px', color: '#AEAEB2', marginTop: '2px' }}>{stage.date}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 3D Compare + Current status */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {/* 3D Before/After compare */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="glass"
            style={{ padding: '24px', minHeight: '380px', position: 'relative' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ fontSize: '16px', fontWeight: 600, color: '#1C1C1E' }}>
                3D 牙齿对比
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  onClick={() => setCompareMode(false)}
                  style={{
                    padding: '6px 14px', borderRadius: '8px', border: 'none',
                    background: !compareMode ? '#0A84FF' : 'rgba(0,0,0,0.04)',
                    color: !compareMode ? 'white' : '#8E8E93',
                    fontSize: '12px', fontWeight: 500, cursor: 'pointer'
                  }}
                >
                  当前
                </button>
                <button
                  onClick={() => setCompareMode(true)}
                  style={{
                    padding: '6px 14px', borderRadius: '8px', border: 'none',
                    background: compareMode ? '#30C8B0' : 'rgba(0,0,0,0.04)',
                    color: compareMode ? 'white' : '#8E8E93',
                    fontSize: '12px', fontWeight: 500, cursor: 'pointer'
                  }}
                >
                  AI预测
                </button>
              </div>
            </div>

            <div style={{ height: '260px' }}>
              <Canvas camera={{ position: [0, 0.3, 3], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={0.6} />
                <Suspense fallback={null}>
                  <ToothModel autoRotate scale={1.6} transparent={compareMode} />
                </Suspense>
              </Canvas>
            </div>

            <div style={{
              display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '8px'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '11px', color: '#8E8E93' }}>前牙拥挤度</div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#0A84FF' }}>
                  {compareMode ? '0.2mm →' : '1.8mm'}
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '11px', color: '#8E8E93' }}>覆合改善</div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#30C8B0' }}>
                  {compareMode ? '完美 →' : '改善中'}
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '11px', color: '#8E8E93' }}>牙齿移动</div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#636366' }}>
                  3.2mm
                </div>
              </div>
            </div>
          </motion.div>

          {/* Current stage details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            <GlassCard>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#1C1C1E', marginBottom: '12px' }}>
                当前阶段详情
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '13px', color: '#8E8E93' }}>阶段</span>
                  <span style={{ fontSize: '13px', fontWeight: 500, color: '#1C1C1E' }}>精细调整 (第 7-8 副)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '13px', color: '#8E8E93' }}>当前牙套</span>
                  <span style={{ fontSize: '13px', fontWeight: 500, color: '#0A84FF' }}>第 8 副 / 24</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '13px', color: '#8E8E93' }}>预计完成</span>
                  <span style={{ fontSize: '13px', fontWeight: 500, color: '#1C1C1E' }}>2026年12月</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '13px', color: '#8E8E93' }}>已移动距离</span>
                  <span style={{ fontSize: '13px', fontWeight: 500, color: '#30C8B0' }}>3.2mm</span>
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#1C1C1E', marginBottom: '12px' }}>
                AI 预测结果
              </div>
              <div style={{
                padding: '14px', background: 'rgba(48,200,176,0.05)',
                borderRadius: '10px', border: '1px solid rgba(48,200,176,0.1)'
              }}>
                <div style={{ fontSize: '13px', color: '#30C8B0', fontWeight: 500, marginBottom: '6px' }}>
                  预计按时完成
                </div>
                <div style={{ fontSize: '12px', color: '#636366', lineHeight: 1.5 }}>
                  基于当前佩戴数据和移动速率，AI预测您将在2026年12月完成全部疗程。
                  建议继续维持 22h/日 佩戴时长。
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '12px' }}>
                <div style={{ textAlign: 'center', padding: '12px', background: 'rgba(0,0,0,0.015)', borderRadius: '10px' }}>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: '#0A84FF' }}>16</div>
                  <div style={{ fontSize: '11px', color: '#8E8E93' }}>剩余牙套数</div>
                </div>
                <div style={{ textAlign: 'center', padding: '12px', background: 'rgba(0,0,0,0.015)', borderRadius: '10px' }}>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: '#30C8B0' }}>8.2</div>
                  <div style={{ fontSize: '11px', color: '#8E8E93' }}>预计剩余月数</div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  )
}
