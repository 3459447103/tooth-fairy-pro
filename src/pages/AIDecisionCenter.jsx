import { Suspense, useState } from 'react'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import ToothModel from '../components/ToothModel'
import ParticleBackground from '../components/ParticleBackground'
import GlassCard from '../components/Cards'
import { PageWrapper, SectionTitle } from '../components/NavIndicator'

export default function AIDecisionCenter() {
  const [syncAnim, setSyncAnim] = useState(false)

  return (
    <PageWrapper>
      <div style={{ padding: '40px 48px', maxWidth: '1400px', margin: '0 auto' }}>
        <SectionTitle title="AI 决策中心" subtitle="智能辅助 · 精准决策 · 云端同步" />

        {/* Main AI Suggestions */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
          {/* Left: AI Recommendation engine */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="glass"
            style={{ padding: '28px' }}
          >
            <div style={{ fontSize: '16px', fontWeight: 600, color: '#1C1C1E', marginBottom: '6px' }}>
              AI 治疗建议引擎
            </div>
            <div style={{ fontSize: '13px', color: '#8E8E93', marginBottom: '20px' }}>
              基于120万+病例训练的深度学习模型
            </div>

            {/* Confidence meter */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '16px',
              padding: '16px', background: 'rgba(10,132,255,0.03)',
              borderRadius: '12px', marginBottom: '20px'
            }}>
              <div style={{ position: 'relative', width: '64px', height: '64px', flexShrink: 0 }}>
                <svg viewBox="0 0 64 64" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth="4" />
                  <motion.circle
                    cx="32" cy="32" r="28" fill="none" stroke="#0A84FF" strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 28}
                    initial={{ strokeDashoffset: 2 * Math.PI * 28 }}
                    animate={{ strokeDashoffset: (1 - 0.97) * 2 * Math.PI * 28 }}
                    transition={{ delay: 0.5, duration: 1.5, ease: 'easeOut' }}
                  />
                </svg>
                <div style={{
                  position: 'absolute', inset: 0, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  fontSize: '16px', fontWeight: 700, color: '#0A84FF'
                }}>
                  97%
                </div>
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#1C1C1E' }}>AI 决策置信度</div>
                <div style={{ fontSize: '11px', color: '#8E8E93', marginTop: '2px' }}>
                  基于当前患者数据和历史病例匹配
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                {
                  title: '治疗方案调整建议',
                  desc: '建议将赵先生的牙套更换频率从14天调整为10天，配合远程监督以提升依从性。',
                  confidence: '96%',
                  type: 'primary'
                },
                {
                  title: '提前复诊建议',
                  desc: 'AI检测到#12牙齿移动偏移超过安全阈值，建议本周内安排复诊进行评估。',
                  confidence: '94%',
                  type: 'warning'
                },
                {
                  title: '行为干预方案',
                  desc: '启动自动佩戴提醒+奖励机制。数据显示同类患者干预后依从性提升34%。',
                  confidence: '91%',
                  type: 'success'
                },
              ].map((rec, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  style={{
                    padding: '16px',
                    background: rec.type === 'warning' ? 'rgba(255,159,10,0.03)' :
                      rec.type === 'success' ? 'rgba(48,200,176,0.03)' : 'rgba(10,132,255,0.03)',
                    borderRadius: '12px',
                    border: `1px solid ${rec.type === 'warning' ? 'rgba(255,159,10,0.1)' :
                      rec.type === 'success' ? 'rgba(48,200,176,0.1)' : 'rgba(10,132,255,0.1)'}`
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#1C1C1E' }}>{rec.title}</span>
                    <span style={{
                      fontSize: '10px', padding: '2px 6px', borderRadius: '4px',
                      background: 'rgba(10,132,255,0.08)', color: '#0A84FF', fontWeight: 500
                    }}>
                      {rec.confidence}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#636366', lineHeight: 1.5 }}>{rec.desc}</div>
                  <div style={{ marginTop: '10px', display: 'flex', gap: '8px' }}>
                    <button style={{
                      padding: '6px 14px', borderRadius: '8px', border: 'none',
                      background: '#0A84FF', color: 'white', fontSize: '11px',
                      fontWeight: 500, cursor: 'pointer'
                    }}>
                      采纳
                    </button>
                    <button style={{
                      padding: '6px 14px', borderRadius: '8px',
                      border: '1px solid rgba(0,0,0,0.08)', background: 'white',
                      color: '#8E8E93', fontSize: '11px', cursor: 'pointer'
                    }}>
                      稍后
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Cloud sync + Data flow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            {/* Cloud sync animation */}
            <GlassCard glow>
              <div style={{ fontSize: '16px', fontWeight: 600, color: '#1C1C1E', marginBottom: '16px' }}>
                云端同步引擎
              </div>
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <motion.button
                  onClick={() => setSyncAnim(!syncAnim)}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: '14px 32px', borderRadius: '14px', border: 'none',
                    background: syncAnim ? '#30C8B0' : '#0A84FF',
                    color: 'white', fontSize: '15px', fontWeight: 600, cursor: 'pointer',
                    boxShadow: syncAnim
                      ? '0 4px 24px rgba(48,200,176,0.35)'
                      : '0 4px 24px rgba(10,132,255,0.3)'
                  }}
                >
                  {syncAnim ? '✓ 同步完成' : '↻ 触发云端同步'}
                </motion.button>

                {/* Sync animation nodes */}
                <div style={{
                  display: 'flex', justifyContent: 'center', gap: '40px',
                  marginTop: '24px', fontSize: '13px', color: '#8E8E93'
                }}>
                  {['患者数据', 'AI引擎', '医生终端'].map((node, i) => (
                    <motion.div
                      key={i}
                      animate={syncAnim ? { scale: [1, 1.1, 1], opacity: [1, 0.6, 1] } : {}}
                      transition={{ duration: 1.5, repeat: syncAnim ? Infinity : 0 }}
                      style={{
                        padding: '14px 20px', borderRadius: '10px',
                        background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)',
                        textAlign: 'center'
                      }}
                    >
                      <div style={{ fontSize: '24px', marginBottom: '4px' }}>
                        {i === 0 ? '🦷' : i === 1 ? '🧠' : '👨‍⚕️'}
                      </div>
                      {node}
                    </motion.div>
                  ))}
                </div>

                {/* Data flow lines */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '12px' }}>
                  {[0, 1].map(i => (
                    <motion.div
                      key={i}
                      animate={syncAnim ? {
                        opacity: [0.2, 1, 0.2],
                        x: i === 0 ? [0, 8, 0] : [0, -8, 0]
                      } : {}}
                      transition={{ duration: 1.2, repeat: syncAnim ? Infinity : 0, delay: i * 0.3 }}
                      style={{ fontSize: '14px', color: '#0A84FF' }}
                    >
                      ⇄
                    </motion.div>
                  ))}
                </div>
              </div>
            </GlassCard>

            {/* Data stream */}
            <GlassCard>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#1C1C1E', marginBottom: '12px' }}>
                实时数据流
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { text: '赵先生 · 佩戴状态更新', time: '刚刚', type: 'update' },
                  { text: 'AI模型 · 风险评分计算完成', time: '1分钟前', type: 'ai' },
                  { text: '云端备份 · 牙套数据同步', time: '3分钟前', type: 'sync' },
                  { text: '王医生 · 治疗方案已确认', time: '5分钟前', type: 'action' },
                ].map((event, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.08 }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      padding: '10px 12px', background: 'rgba(0,0,0,0.015)',
                      borderRadius: '8px', border: '1px solid rgba(0,0,0,0.03)'
                    }}
                  >
                    <div style={{
                      width: '6px', height: '6px', borderRadius: '50%',
                      background: event.type === 'ai' ? '#0A84FF' :
                        event.type === 'sync' ? '#30C8B0' :
                        event.type === 'action' ? '#FF9F0A' : '#AEAEB2'
                    }} />
                    <span style={{ fontSize: '12px', color: '#1C1C1E', flex: 1 }}>{event.text}</span>
                    <span style={{ fontSize: '10px', color: '#AEAEB2' }}>{event.time}</span>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* 3D visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="glass"
          style={{ padding: '24px', textAlign: 'center' }}
        >
          <div style={{ fontSize: '14px', fontWeight: 600, color: '#1C1C1E', marginBottom: '8px' }}>
            医患数据流可视化
          </div>
          <div style={{ height: '200px', position: 'relative' }}>
            <Canvas camera={{ position: [0, 0, 4], fov: 55 }}>
              <ambientLight intensity={0.4} />
              <directionalLight position={[5, 5, 5]} intensity={0.5} />
              <Suspense fallback={null}>
                <ToothModel autoRotate transparent scale={1.4} />
                <ParticleBackground count={100} color="#0A84FF" />
              </Suspense>
            </Canvas>
          </div>
          <div style={{ fontSize: '12px', color: '#8E8E93' }}>
            128个数据节点实时互联 · 延迟 &lt; 50ms
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  )
}
