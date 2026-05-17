import { Suspense } from 'react'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import ToothModel from '../components/ToothModel'
import ParticleBackground from '../components/ParticleBackground'
import GlassCard from '../components/Cards'
import TrendChart from '../components/TrendChart'
import { PageWrapper } from '../components/NavIndicator'

const complianceHistory = [94, 92, 90, 88, 85, 82, 80, 78, 75, 72, 70, 68]
const dailyHours = [22, 21.5, 20, 19, 18.5, 18, 17.5, 17, 16.5, 16, 15.5, 15]

export default function PatientDetail() {
  return (
    <PageWrapper>
      <div style={{ padding: '40px 48px', maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginBottom: '24px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '14px',
              background: 'linear-gradient(135deg, #E3F2FD, #BBDEFB)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '22px'
            }}>
              🧑
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#1C1C1E' }}>赵先生</div>
              <div style={{ fontSize: '13px', color: '#8E8E93' }}>患者ID: P2024-0186 · 第 3/30 副 · 开始日期 2025.11</div>
            </div>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '8px 16px', background: 'rgba(255,107,107,0.06)',
            borderRadius: '20px'
          }}>
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FF6B6B' }}
            />
            <span style={{ fontSize: '13px', color: '#FF6B6B', fontWeight: 500 }}>高风险预警</span>
          </div>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '24px' }}>
          {/* Left: 3D Tooth + Trends */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="glass"
            style={{ padding: '24px', minHeight: '460px', position: 'relative' }}
          >
            <div style={{ fontSize: '16px', fontWeight: 600, color: '#1C1C1E', marginBottom: '8px' }}>
              3D 牙齿模型 · 问题区域标注
            </div>
            <div style={{ height: '340px' }}>
              <Canvas camera={{ position: [0, 0.2, 2.5], fov: 40 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={0.7} />
                <directionalLight position={[-3, 2, 2]} intensity={0.35} color="#64D2FF" />
                <pointLight position={[0, 0, 3]} intensity={0.3} color="#FF6B6B" />
                <Suspense fallback={null}>
                  <ToothModel
                    autoRotate
                    scale={1.7}
                    highlightZones={[
                      { position: [0.25, 0.15, 0.15], color: '#FF6B6B' },
                      { position: [-0.2, -0.1, 0.2], color: '#FF9F0A' },
                    ]}
                  />
                  <Environment preset="studio" />
                </Suspense>
              </Canvas>
            </div>

            {/* Trend charts */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
              <div>
                <div style={{ fontSize: '12px', color: '#8E8E93', marginBottom: '8px', fontWeight: 500 }}>
                  依从性趋势（近12周）
                </div>
                <TrendChart data={complianceHistory} color="#FF6B6B" height={80} />
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#8E8E93', marginBottom: '8px', fontWeight: 500 }}>
                  日佩戴时长趋势
                </div>
                <TrendChart data={dailyHours} color="#FF9F0A" height={80} />
              </div>
            </div>
          </motion.div>

          {/* Right: AI Diagnosis Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            <GlassCard glow>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#1C1C1E', marginBottom: '14px' }}>
                AI 诊断建议
              </div>

              <div style={{
                padding: '14px', background: 'rgba(255,107,107,0.04)',
                borderRadius: '10px', border: '1px solid rgba(255,107,107,0.12)',
                marginBottom: '12px'
              }}>
                <div style={{ fontSize: '13px', color: '#FF6B6B', fontWeight: 600, marginBottom: '4px' }}>
                  ⚠ 高风险发现
                </div>
                <div style={{ fontSize: '12px', color: '#636366', lineHeight: 1.5 }}>
                  患者佩戴依从性持续下降 (68%)，近4周日均佩戴时长已低于18小时。AI预测若不干预，治疗周期将延长 6-8 周。
                </div>
              </div>

              <div style={{
                padding: '14px', background: 'rgba(255,159,10,0.04)',
                borderRadius: '10px', border: '1px solid rgba(255,159,10,0.12)',
                marginBottom: '12px'
              }}>
                <div style={{ fontSize: '13px', color: '#FF9F0A', fontWeight: 600, marginBottom: '4px' }}>
                  ⚡ 需关注
                </div>
                <div style={{ fontSize: '12px', color: '#636366', lineHeight: 1.5 }}>
                  右上颌侧切牙（#12）移动轨迹轻微偏离预期路径。建议下次复诊时重点评估该区域。
                </div>
              </div>

              <div style={{
                padding: '14px', background: 'rgba(10,132,255,0.04)',
                borderRadius: '10px', border: '1px solid rgba(10,132,255,0.1)'
              }}>
                <div style={{ fontSize: '13px', color: '#0A84FF', fontWeight: 600, marginBottom: '4px' }}>
                  💡 AI 干预建议
                </div>
                <div style={{ fontSize: '12px', color: '#636366', lineHeight: 1.5 }}>
                  建议立即联系患者，安排复诊。推荐方案：强化佩戴宣教 + 必要时调整牙套更换频率 + 启用佩戴提醒功能。
                </div>
              </div>
            </GlassCard>

            {/* Patient info cards */}
            <GlassCard>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#1C1C1E', marginBottom: '12px' }}>
                患者信息
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { label: '年龄', value: '28岁' },
                  { label: '矫正方案', value: '全口隐形矫正' },
                  { label: '牙套总数', value: '30副' },
                  { label: '上次复诊', value: '2025.12.15' },
                  { label: '下次复诊', value: '待安排 ⚠' },
                  { label: '主治医生', value: '王医生' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '12px', color: '#8E8E93' }}>{item.label}</span>
                    <span style={{ fontSize: '12px', fontWeight: 500, color: '#1C1C1E' }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#1C1C1E', marginBottom: '12px' }}>
                快速操作
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['发送提醒', '安排复诊', '调整方案', '导出报告'].map((action, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      width: '100%', padding: '10px', borderRadius: '10px',
                      border: '1px solid rgba(0,0,0,0.06)',
                      background: i === 0 ? '#0A84FF' : 'rgba(0,0,0,0.02)',
                      color: i === 0 ? 'white' : '#636366',
                      fontSize: '13px', fontWeight: 500, cursor: 'pointer'
                    }}
                  >
                    {action}
                  </motion.button>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  )
}
