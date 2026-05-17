import { Suspense } from 'react'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import ToothModel from '../components/ToothModel'
import ParticleBackground from '../components/ParticleBackground'
import GlassCard from '../components/Cards'
import { PageWrapper, SectionTitle } from '../components/NavIndicator'

const riskFactors = [
  { label: '牙套贴合度', value: 98, color: '#30C8B0', status: '优秀' },
  { label: '佩戴时长依从', value: 95, color: '#30C8B0', status: '优秀' },
  { label: '牙齿移动速率', value: 88, color: '#0A84FF', status: '良好' },
  { label: '根尖吸收风险', value: 12, color: '#FF9F0A', status: '关注' },
  { label: '邻面去釉风险', value: 8, color: '#30C8B0', status: '极低' },
  { label: '口腔卫生', value: 91, color: '#0A84FF', status: '良好' },
]

const predictionData = [
  { week: 1, actual: 5, predicted: 5 },
  { week: 2, actual: 10, predicted: 10 },
  { week: 3, actual: 14, predicted: 15 },
  { week: 4, actual: 20, predicted: 20 },
  { week: 5, actual: 25, predicted: 25 },
  { week: 6, actual: 31, predicted: 30 },
  { week: 7, actual: 36, predicted: 35 },
  { week: 8, actual: 42, predicted: 40 },
  { week: 9, predicted: 46 },
  { week: 10, predicted: 51 },
  { week: 11, predicted: 57 },
  { week: 12, predicted: 62 },
]

export default function AIAnalysisPage() {
  return (
    <PageWrapper>
      <div style={{ padding: '40px 48px', maxWidth: '1400px', margin: '0 auto' }}>
        <SectionTitle title="AI 智能分析" subtitle="基于深度学习的实时口腔健康评估系统" />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
          {/* Left: AI Score + 3D */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="glass"
            style={{ padding: '28px', position: 'relative', overflow: 'hidden', minHeight: '420px' }}
          >
            {/* Score ring */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '32px', marginBottom: '20px' }}>
              <div style={{ position: 'relative', width: '120px', height: '120px' }}>
                <svg viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth="6" />
                  <motion.circle
                    cx="60" cy="60" r="52" fill="none" stroke="#0A84FF" strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 52}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 52 }}
                    animate={{ strokeDashoffset: (1 - 0.94) * 2 * Math.PI * 52 }}
                    transition={{ delay: 0.5, duration: 1.5, ease: 'easeOut' }}
                  />
                </svg>
                <div style={{
                  position: 'absolute', inset: 0, display: 'flex',
                  flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                }}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    style={{ fontSize: '40px', fontWeight: 700, color: '#0A84FF', lineHeight: 1 }}
                  >
                    94
                  </motion.div>
                  <div style={{ fontSize: '12px', color: '#8E8E93' }}>AI 评分</div>
                </div>
              </div>

              <div>
                <div style={{ fontSize: '18px', fontWeight: 600, color: '#1C1C1E', marginBottom: '4px' }}>
                  综合健康评分
                </div>
                <div style={{ fontSize: '13px', color: '#8E8E93', lineHeight: 1.5 }}>
                  基于佩戴数据、牙齿移动轨迹和口腔健康指标的综合AI评估
                </div>
                <div style={{
                  marginTop: '12px', padding: '8px 14px', background: 'rgba(48,200,176,0.08)',
                  borderRadius: '8px', display: 'inline-block'
                }}>
                  <span style={{ fontSize: '13px', color: '#30C8B0', fontWeight: 500 }}>
                    ● 优于 92% 同阶段患者
                  </span>
                </div>
              </div>
            </div>

            {/* 3D heatmap tooth */}
            <div style={{ height: '200px', position: 'relative', marginTop: '8px' }}>
              <Canvas camera={{ position: [0, 0.5, 3], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={0.6} />
                <Suspense fallback={null}>
                  <ToothModel autoRotate transparent />
                </Suspense>
              </Canvas>
              <div style={{
                position: 'absolute', bottom: '8px', left: '50%', transform: 'translateX(-50%)',
                display: 'flex', alignItems: 'center', gap: '10px', fontSize: '11px', color: '#8E8E93'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#30C8B0' }} />
                  正常
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#FF9F0A' }} />
                  关注
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#FF6B6B' }} />
                  风险
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Risk analysis tree */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="glass"
            style={{ padding: '28px' }}
          >
            <div style={{ fontSize: '16px', fontWeight: 600, color: '#1C1C1E', marginBottom: '20px' }}>
              AI 风险分析树
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {riskFactors.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '12px 16px', background: 'rgba(0,0,0,0.015)',
                    borderRadius: '10px', border: '1px solid rgba(0,0,0,0.04)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '6px', height: '6px', borderRadius: '50%',
                      background: item.color === '#FF9F0A' ? '#FF9F0A' : '#30C8B0',
                      boxShadow: `0 0 8px ${item.color === '#FF9F0A' ? '#FF9F0A' : '#30C8B0'}44`
                    }} />
                    <span style={{ fontSize: '13px', color: '#1C1C1E' }}>{item.label}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: item.color }}>
                      {item.value}%
                    </span>
                    <span style={{
                      fontSize: '11px', padding: '2px 8px', borderRadius: '6px',
                      background: `${item.color}12`, color: item.color, fontWeight: 500
                    }}>
                      {item.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div style={{
              marginTop: '16px', padding: '14px', background: 'rgba(255,159,10,0.06)',
              borderRadius: '10px', border: '1px solid rgba(255,159,10,0.15)'
            }}>
              <div style={{ fontSize: '13px', color: '#FF9F0A', fontWeight: 600, marginBottom: '4px' }}>
                ⚠ AI 预警
              </div>
              <div style={{ fontSize: '12px', color: '#636366', lineHeight: 1.5 }}>
                根尖吸收指标略高于标准值。建议下次复诊时重点检查。当前风险可控，无需立即干预。
              </div>
            </div>
          </motion.div>
        </div>

        {/* Prediction curve */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="glass"
          style={{ padding: '28px' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 600, color: '#1C1C1E' }}>AI 预测曲线</div>
              <div style={{ fontSize: '13px', color: '#8E8E93', marginTop: '2px' }}>牙齿移动进度预测 vs 实际</div>
            </div>
            <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: '#8E8E93' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '16px', height: '2px', background: '#0A84FF', borderRadius: '1px' }} />
                实际
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '16px', height: '2px', background: '#AEAEB2', borderRadius: '1px', borderStyle: 'dashed' }} />
                AI预测
              </div>
            </div>
          </div>

          <div style={{ position: 'relative', height: '200px', display: 'flex', alignItems: 'flex-end' }}>
            {/* Grid lines */}
            {[25, 50, 75, 100].map(v => (
              <div key={v} style={{
                position: 'absolute', bottom: `${v}%`, left: 0, right: 0,
                borderTop: '1px solid rgba(0,0,0,0.04)', height: 0
              }}>
                <span style={{ position: 'absolute', left: '-36px', top: '-8px', fontSize: '10px', color: '#AEAEB2' }}>
                  {v}%
                </span>
              </div>
            ))}

            <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: '12px', paddingLeft: '30px' }}>
              {predictionData.map((d, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                  {/* Actual bar */}
                  {d.actual !== undefined && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${d.actual}%` }}
                      transition={{ delay: 0.6 + i * 0.05, duration: 0.6 }}
                      style={{
                        width: '12px', background: '#0A84FF', borderRadius: '4px 4px 0 0',
                        minHeight: '2px', position: 'absolute', bottom: 0
                      }}
                    />
                  )}
                  {/* Predicted line/dot */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: d.actual === undefined ? 1 : 0 }}
                    transition={{ delay: 0.8 + i * 0.05 }}
                    style={{
                      position: 'absolute', bottom: `${d.predicted}%`,
                      width: '6px', height: '6px', borderRadius: '50%',
                      background: d.actual === undefined ? '#0A84FF' : 'transparent',
                      border: d.actual === undefined ? '2px solid rgba(10,132,255,0.5)' : 'none',
                      opacity: d.actual === undefined ? 1 : 0
                    }}
                  />
                  <span style={{ fontSize: '10px', color: '#AEAEB2', marginTop: '4px' }}>
                    W{i + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            marginTop: '16px', padding: '12px 16px',
            background: 'rgba(10,132,255,0.04)', borderRadius: '10px',
            fontSize: '12px', color: '#0A84FF', textAlign: 'center', fontWeight: 500
          }}>
            AI模型预测完成时间：<strong>第 12 周</strong> · 置信度 94.2%
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  )
}
