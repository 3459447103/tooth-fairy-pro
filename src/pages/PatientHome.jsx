import { Suspense, useState } from 'react'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import ToothModel from '../components/ToothModel'
import SkeletonLoader from '../components/SkeletonLoader'
import GlassCard from '../components/Cards'
import TrendChart from '../components/TrendChart'
import { PageWrapper } from '../components/NavIndicator'

const weeklyData = [18.5, 19.2, 20.1, 21.0, 20.8, 21.5, 22.0]
const complianceData = [92, 94, 91, 95, 93, 96, 95]

export default function PatientHome() {
  const [modelReady, setModelReady] = useState(false)

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
            marginBottom: '32px'
          }}
        >
          <div>
            <div style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '-0.5px', color: '#1C1C1E' }}>
              你好，张小姐
            </div>
            <div style={{ fontSize: '14px', color: '#8E8E93', marginTop: '2px' }}>
              数智矫正 · 第 8/24 副牙套
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            {['首页', 'AI分析', '疗程进度', '健康中心'].map((tab, i) => (
              <div key={tab} style={{
                padding: '8px 18px', borderRadius: '20px',
                background: i === 0 ? 'rgba(10,132,255,0.08)' : 'transparent',
                color: i === 0 ? '#0A84FF' : '#8E8E93',
                fontSize: '13px', fontWeight: 500, cursor: 'pointer'
              }}>
                {tab}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Main content: 3 columns */}
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr 320px', gap: '24px', height: 'calc(100vh - 160px)' }}>
          {/* Left: Data cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            <GlassCard glow>
              <div style={{ fontSize: '13px', color: '#8E8E93', fontWeight: 500, marginBottom: '8px' }}>
                今日佩戴时长
              </div>
              <div style={{ fontSize: '36px', fontWeight: 700, color: '#0A84FF', letterSpacing: '-1px' }}>
                21.5<span style={{ fontSize: '18px', color: '#8E8E93' }}>h</span>
              </div>
              <div style={{ fontSize: '12px', color: '#30C8B0', marginTop: '4px' }}>
                ↑ 超出目标 6%
              </div>
              <div style={{ marginTop: '12px', height: '4px', borderRadius: '2px', background: 'rgba(0,0,0,0.06)' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '90%' }}
                  transition={{ delay: 0.5, duration: 1 }}
                  style={{ height: '100%', borderRadius: '2px', background: '#0A84FF' }}
                />
              </div>
            </GlassCard>

            <GlassCard>
              <div style={{ fontSize: '13px', color: '#8E8E93', fontWeight: 500, marginBottom: '8px' }}>
                AI 依从性评分
              </div>
              <div style={{ fontSize: '36px', fontWeight: 700, color: '#30C8B0', letterSpacing: '-1px' }}>
                96<span style={{ fontSize: '18px', color: '#8E8E93' }}>/100</span>
              </div>
              <div style={{ fontSize: '12px', color: '#8E8E93', marginTop: '4px' }}>
                优秀 · 继续保持
              </div>
            </GlassCard>

            <GlassCard>
              <div style={{ fontSize: '13px', color: '#8E8E93', fontWeight: 500, marginBottom: '8px' }}>
                当前佩戴状态
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px' }}>
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{
                    width: '10px', height: '10px', borderRadius: '50%',
                    background: '#30C8B0', boxShadow: '0 0 12px rgba(48,200,176,0.4)'
                  }}
                />
                <span style={{ fontSize: '18px', fontWeight: 600, color: '#30C8B0' }}>佩戴中</span>
              </div>
              <div style={{ fontSize: '12px', color: '#8E8E93', marginTop: '8px' }}>
                已连续佩戴 4.2 小时
              </div>
            </GlassCard>

            <GlassCard>
              <div style={{ fontSize: '13px', color: '#8E8E93', fontWeight: 500, marginBottom: '8px' }}>
                摘戴次数
              </div>
              <div style={{ fontSize: '28px', fontWeight: 600, color: '#1C1C1E' }}>
                3 <span style={{ fontSize: '14px', color: '#8E8E93' }}>次</span>
              </div>
              <div style={{ fontSize: '12px', color: '#0A84FF', marginTop: '4px' }}>
                建议 ≤ 4 次/日
              </div>
            </GlassCard>
          </motion.div>

          {/* Center: 3D Tooth with skeleton loader */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative'
            }}
          >
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
              {!modelReady && (
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  zIndex: 5
                }}>
                  <SkeletonLoader />
                </div>
              )}

              <div style={{ opacity: modelReady ? 1 : 0, transition: 'opacity 0.6s ease-in' }}>
                <Canvas camera={{ position: [0, 0.2, 2.8], fov: 40 }}>
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[5, 5, 5]} intensity={0.7} />
                  <directionalLight position={[-3, 2, 2]} intensity={0.35} color="#64D2FF" />
                  <pointLight position={[0, 1, 3]} intensity={0.4} color="#30C8B0" />
                  <Suspense fallback={null}>
                    <ToothModel scale={2.0} onReady={() => setModelReady(true)} />
                    <Environment preset="studio" />
                  </Suspense>
                </Canvas>
              </div>

              {/* HUD labels */}
              {modelReady && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  style={{
                    position: 'absolute', top: '15%', right: '10%',
                    background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(8px)',
                    borderRadius: '8px', padding: '6px 12px', fontSize: '11px',
                    color: '#0A84FF', fontWeight: 500, border: '1px solid rgba(10,132,255,0.12)'
                  }}
                >
                  AI 检测区域 · 佩戴正常
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Right: AI Panel + Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            <GlassCard glow>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#1C1C1E' }}>AI 分析面板</div>
                <div style={{ fontSize: '11px', color: '#30C8B0', fontWeight: 500 }}>● 实时</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '13px', color: '#8E8E93' }}>牙套贴合度</span>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#30C8B0' }}>98%</span>
                </div>
                <div style={{ height: '3px', borderRadius: '2px', background: 'rgba(0,0,0,0.06)' }}>
                  <div style={{ height: '100%', borderRadius: '2px', background: '#30C8B0', width: '98%' }} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                  <span style={{ fontSize: '13px', color: '#8E8E93' }}>牙齿移动进度</span>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#0A84FF' }}>68%</span>
                </div>
                <div style={{ height: '3px', borderRadius: '2px', background: 'rgba(0,0,0,0.06)' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '68%' }}
                    transition={{ delay: 0.8, duration: 1.2 }}
                    style={{ height: '100%', borderRadius: '2px', background: '#0A84FF' }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                  <span style={{ fontSize: '13px', color: '#8E8E93' }}>AI 风险等级</span>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#30C8B0' }}>低风险</span>
                </div>

                <div style={{
                  marginTop: '8px', padding: '12px', background: 'rgba(48,200,176,0.06)',
                  borderRadius: '10px', border: '1px solid rgba(48,200,176,0.12)'
                }}>
                  <div style={{ fontSize: '12px', color: '#30C8B0', fontWeight: 600, marginBottom: '4px' }}>
                    AI 建议
                  </div>
                  <div style={{ fontSize: '12px', color: '#636366', lineHeight: '1.5' }}>
                    当前佩戴状况良好。建议继续保持每日 22h+ 佩戴时长，预计可按计划完成治疗。
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#1C1C1E', marginBottom: '12px' }}>
                佩戴趋势 · 近7天
              </div>
              <TrendChart data={weeklyData} color="#0A84FF" height={100} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '11px', color: '#AEAEB2' }}>
                <span>周一</span><span>周三</span><span>周五</span><span>周日</span>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  )
}
