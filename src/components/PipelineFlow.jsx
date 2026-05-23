import { motion } from 'framer-motion'

const defaultSteps = [
  { icon: '\u{1F4E1}', title: '数据采集', desc: 'IoT传感器实时监测', color: '#0A84FF' },
  { icon: '\u{1F52C}', title: '特征提取', desc: '128维牙移动特征向量', color: '#30C8B0' },
  { icon: '\u{1F9E0}', title: '模型推理', desc: 'DeepOrtho 深度网络', color: '#FF9F0A' },
  { icon: '\u{1F4CB}', title: '决策输出', desc: '治疗方案 + 置信度评分', color: '#0A84FF' },
]

export default function PipelineFlow({ steps = defaultSteps }) {
  return (
    <div style={{ padding: '16px 0' }}>
      <div style={{
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        gap: '0', position: 'relative'
      }}>
        {steps.map((step, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
            {/* Step card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.12, duration: 0.5 }}
              style={{
                padding: '18px 16px',
                background: 'rgba(255,255,255,0.8)',
                backdropFilter: 'blur(8px)',
                borderRadius: '14px',
                border: `1px solid ${step.color}20`,
                minWidth: '150px',
                textAlign: 'center',
                position: 'relative',
                boxShadow: `0 2px 12px ${step.color}08`,
              }}
            >
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{step.icon}</div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#1C1C1E', marginBottom: '4px' }}>
                {step.title}
              </div>
              <div style={{ fontSize: '11px', color: '#8E8E93' }}>{step.desc}</div>
            </motion.div>

            {/* Connector arrow */}
            {i < steps.length - 1 && (
              <div style={{ width: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="48" height="20" viewBox="0 0 48 20">
                  <motion.line
                    x1="4" y1="10" x2="36" y2="10"
                    stroke="#0A84FF" strokeWidth="1.5" strokeDasharray="4 3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.5 + i * 0.15, duration: 0.8 }}
                  />
                  <motion.polygon
                    points="38,6 44,10 38,14"
                    fill="#0A84FF"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 + i * 0.15 }}
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        style={{
          display: 'flex', justifyContent: 'center', gap: '32px',
          marginTop: '20px', fontSize: '12px', color: '#8E8E93'
        }}
      >
        <span>延迟: &lt;50ms</span>
        <span>节点: 128</span>
        <span>准确率: 97.2%</span>
        <span>更新时间: 刚刚</span>
      </motion.div>
    </div>
  )
}
