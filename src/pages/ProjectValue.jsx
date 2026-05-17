import { Suspense } from 'react'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import ToothModel from '../components/ToothModel'
import ParticleBackground from '../components/ParticleBackground'
import GlassCard from '../components/Cards'
import { PageWrapper } from '../components/NavIndicator'

const stats = [
  { label: '累计服务患者', value: '12,800+', suffix: '人' },
  { label: 'AI 预测准确率', value: '97.3', suffix: '%' },
  { label: '佩戴依从提升', value: '34', suffix: '%' },
  { label: '医生效率提升', value: '5.2', suffix: '倍' },
  { label: '治疗周期缩短', value: '23', suffix: '%' },
  { label: '风险预警准确率', value: '94.8', suffix: '%' },
]

const painPoints = [
  { title: '患者依从性不可控', desc: '传统矫正中，医生无法实时了解患者佩戴情况', impact: '导致 30%+ 的治疗延期' },
  { title: '复诊效率低下', desc: '每月复诊占用大量医患时间，且信息不对称', impact: '平均每月浪费 4-6 小时' },
  { title: '风险发现滞后', desc: '问题往往在复诊时才被发现，错过最佳干预时机', impact: '严重可导致治疗失败' },
]

export default function ProjectValue() {
  return (
    <PageWrapper>
      <div style={{ padding: '40px 48px', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div style={{ fontSize: '36px', fontWeight: 700, color: '#1C1C1E', letterSpacing: '-1px' }}>
              项目价值展示
            </div>
            <div style={{ fontSize: '15px', color: '#8E8E93', marginTop: '8px' }}>
              隐形齿精灵 Pro · 重新定义牙齿矫正
            </div>
          </motion.div>
        </div>

        {/* Data achievements */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
          {stats.slice(0, 6).map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="glass"
              style={{ padding: '24px', textAlign: 'center' }}
            >
              <div style={{ fontSize: '12px', color: '#8E8E93', fontWeight: 500, marginBottom: '8px' }}>
                {stat.label}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '4px' }}>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ fontSize: '36px', fontWeight: 700, color: '#0A84FF', letterSpacing: '-1px' }}
                >
                  {stat.value}
                </motion.span>
                <span style={{ fontSize: '16px', color: '#8E8E93' }}>{stat.suffix}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
          {/* Market pain points */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="glass"
            style={{ padding: '28px' }}
          >
            <div style={{ fontSize: '18px', fontWeight: 600, color: '#1C1C1E', marginBottom: '20px' }}>
              市场痛点
            </div>
            {painPoints.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.12 }}
                style={{
                  padding: '16px', marginBottom: '12px',
                  background: 'rgba(0,0,0,0.015)', borderRadius: '12px',
                  border: '1px solid rgba(0,0,0,0.04)'
                }}
              >
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#FF6B6B', marginBottom: '4px' }}>
                  {point.title}
                </div>
                <div style={{ fontSize: '13px', color: '#636366', lineHeight: 1.5, marginBottom: '6px' }}>
                  {point.desc}
                </div>
                <div style={{
                  padding: '6px 12px', display: 'inline-block',
                  background: 'rgba(255,107,107,0.06)', borderRadius: '6px',
                  fontSize: '11px', color: '#FF6B6B', fontWeight: 500
                }}>
                  {point.impact}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Solution + Business Model */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            <GlassCard>
              <div style={{ fontSize: '16px', fontWeight: 600, color: '#1C1C1E', marginBottom: '16px' }}>
                技术架构
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { layer: '感知层', tech: '智能牙套芯片 · 微型传感器阵列', color: '#FF9F0A' },
                  { layer: '传输层', tech: '蓝牙5.2 BLE · 边缘计算节点', color: '#30C8B0' },
                  { layer: 'AI 引擎', tech: '深度神经网络 · 120万+病例训练', color: '#0A84FF' },
                  { layer: '应用层', tech: '医生工作站 · 患者App · 云端平台', color: '#636366' },
                ].map((layer, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '12px',
                      padding: '12px 16px', background: 'rgba(0,0,0,0.015)',
                      borderRadius: '10px', border: `1px solid ${layer.color}15`
                    }}
                  >
                    <div style={{
                      width: '28px', height: '28px', borderRadius: '8px',
                      background: `${layer.color}15`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '12px', fontWeight: 600, color: layer.color
                    }}>
                      {i + 1}
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: '#8E8E93', fontWeight: 500 }}>{layer.layer}</div>
                      <div style={{ fontSize: '13px', color: '#1C1C1E', fontWeight: 500 }}>{layer.tech}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>

            <GlassCard>
              <div style={{ fontSize: '16px', fontWeight: 600, color: '#1C1C1E', marginBottom: '16px' }}>
                商业模式
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {[
                  { title: 'B2B SaaS', desc: '面向口腔医疗机构年度订阅', revenue: '主要收入' },
                  { title: '硬件销售', desc: '智能牙套芯片模组', revenue: '一次性收入' },
                  { title: 'AI服务费', desc: '按AI分析次数计费', revenue: '增值收入' },
                  { title: '数据服务', desc: '脱敏数据分析报告', revenue: '生态收入' },
                ].map((model, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 + i * 0.08 }}
                    style={{
                      padding: '16px', background: 'rgba(0,0,0,0.015)',
                      borderRadius: '10px', border: '1px solid rgba(0,0,0,0.04)'
                    }}
                  >
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#1C1C1E', marginBottom: '4px' }}>
                      {model.title}
                    </div>
                    <div style={{ fontSize: '11px', color: '#8E8E93', lineHeight: 1.4, marginBottom: '6px' }}>
                      {model.desc}
                    </div>
                    <div style={{
                      fontSize: '10px', padding: '2px 8px', background: 'rgba(48,200,176,0.08)',
                      borderRadius: '4px', color: '#30C8B0', fontWeight: 500, display: 'inline-block'
                    }}>
                      {model.revenue}
                    </div>
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
          transition={{ delay: 0.8, duration: 0.6 }}
          className="glass"
          style={{
            padding: '28px', textAlign: 'center', position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{ fontSize: '18px', fontWeight: 600, color: '#1C1C1E', marginBottom: '8px' }}>
            未来已来
          </div>
          <div style={{ height: '180px' }}>
            <Canvas camera={{ position: [0, 0, 4], fov: 55 }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 5, 5]} intensity={0.6} />
              <Suspense fallback={null}>
                <ToothModel autoRotate transparent scale={1.3} />
                <ParticleBackground count={150} color="#0A84FF" />
              </Suspense>
            </Canvas>
          </div>
          <div style={{ fontSize: '14px', color: '#636366', fontWeight: 500 }}>
            让每一次牙齿移动，都被精准感知
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  )
}
