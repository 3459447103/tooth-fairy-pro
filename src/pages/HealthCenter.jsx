import { motion } from 'framer-motion'
import GlassCard from '../components/Cards'
import TrendChart from '../components/TrendChart'
import { PageWrapper, SectionTitle } from '../components/NavIndicator'

const healthMetrics = [
  { name: '口腔清洁度', value: 92, color: '#30C8B0', icon: '🪥' },
  { name: '牙龈健康', value: 88, color: '#30C8B0', icon: '🦷' },
  { name: '牙套卫生', value: 85, color: '#0A84FF', icon: '✨' },
  { name: '牙周状态', value: 90, color: '#30C8B0', icon: '💪' },
]

const oralHealthTrend = [85, 87, 89, 88, 90, 92, 91]

const messages = [
  {
    from: '王医生', role: '主治医师',
    content: '张小姐您好，您的佩戴数据表现优秀。下周三下午方便来复诊吗？我们看看第8副牙套的效果。',
    time: '10分钟前', unread: true
  },
  {
    from: 'AI 健康助手',
    role: '智能助手',
    content: '温馨提示：建议明天上午更换第9副牙套。检测到您当前牙套已佩戴14天，到达更换标准。',
    time: '2小时前', unread: true
  },
  {
    from: '口腔护士小李',
    role: '护士',
    content: '张小姐，您之前问的牙套清洁方法我已经整理好了，记得使用专用清洁片哦~',
    time: '昨天', unread: false
  },
]

export default function HealthCenter() {
  return (
    <PageWrapper>
      <div style={{ padding: '40px 48px', maxWidth: '1400px', margin: '0 auto' }}>
        <SectionTitle title="健康中心" subtitle="口腔健康数据总览" />

        {/* Health score ring */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="glass"
          style={{
            padding: '32px', marginBottom: '24px',
            display: 'flex', alignItems: 'center', gap: '48px'
          }}
        >
          {/* Large health ring */}
          <div style={{ position: 'relative', width: '160px', height: '160px', flexShrink: 0 }}>
            <svg viewBox="0 0 160 160" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth="8" />
              <motion.circle
                cx="80" cy="80" r="70" fill="none" stroke="url(#healthGradient)" strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 70}
                initial={{ strokeDashoffset: 2 * Math.PI * 70 }}
                animate={{ strokeDashoffset: (1 - 0.89) * 2 * Math.PI * 70 }}
                transition={{ delay: 0.5, duration: 1.8, ease: 'easeOut' }}
              />
              <defs>
                <linearGradient id="healthGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0A84FF" />
                  <stop offset="100%" stopColor="#30C8B0" />
                </linearGradient>
              </defs>
            </svg>
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
            }}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                style={{ fontSize: '44px', fontWeight: 700, color: '#0A84FF', lineHeight: 1 }}
              >
                89
              </motion.div>
              <div style={{ fontSize: '13px', color: '#8E8E93' }}>口腔健康指数</div>
              <div style={{ fontSize: '11px', color: '#30C8B0', marginTop: '2px' }}>良好 ↑</div>
            </div>
          </div>

          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {healthMetrics.map((metric, i) => (
              <motion.div
                key={metric.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                style={{
                  padding: '16px', background: 'rgba(0,0,0,0.015)',
                  borderRadius: '12px', border: '1px solid rgba(0,0,0,0.04)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '20px' }}>{metric.icon}</span>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 500, color: '#1C1C1E' }}>{metric.name}</div>
                    <div style={{ fontSize: '18px', fontWeight: 600, color: metric.color }}>{metric.value}%</div>
                  </div>
                </div>
                <div style={{ height: '3px', borderRadius: '2px', background: 'rgba(0,0,0,0.05)' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${metric.value}%` }}
                    transition={{ delay: 0.6 + i * 0.1, duration: 0.8 }}
                    style={{ height: '100%', borderRadius: '2px', background: metric.color }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {/* Health trend chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="glass"
            style={{ padding: '24px' }}
          >
            <div style={{ fontSize: '16px', fontWeight: 600, color: '#1C1C1E', marginBottom: '16px' }}>
              口腔健康趋势
            </div>
            <TrendChart data={oralHealthTrend} color="#30C8B0" height={160} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '11px', color: '#AEAEB2' }}>
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </motion.div>

          {/* AI suggestions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="glass"
            style={{ padding: '24px' }}
          >
            <div style={{ fontSize: '16px', fontWeight: 600, color: '#1C1C1E', marginBottom: '16px' }}>
              AI 健康建议
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { icon: '💧', title: '保持口腔湿润', desc: '建议每天饮水 1.5L 以上，减少口干对牙套舒适度的影响' },
                { icon: '🪥', title: '清洁提醒', desc: '每天使用专用清洁片清洗牙套，避免细菌滋生' },
                { icon: '⏰', title: '佩戴时长', desc: '继续保持 22h+ 日佩戴，距下一副牙套还有 2 天' },
                { icon: '🍎', title: '饮食建议', desc: '佩戴期间避免含糖饮料和过硬食物，保护牙套涂层' },
              ].map((tip, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 + i * 0.08 }}
                  style={{
                    display: 'flex', gap: '12px', padding: '14px',
                    background: 'rgba(0,0,0,0.015)', borderRadius: '10px',
                    border: '1px solid rgba(0,0,0,0.04)'
                  }}
                >
                  <span style={{ fontSize: '22px', flexShrink: 0 }}>{tip.icon}</span>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#1C1C1E', marginBottom: '2px' }}>
                      {tip.title}
                    </div>
                    <div style={{ fontSize: '12px', color: '#8E8E93', lineHeight: 1.4 }}>{tip.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Messages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="glass"
          style={{ padding: '24px', marginTop: '24px' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ fontSize: '16px', fontWeight: 600, color: '#1C1C1E' }}>消息中心</div>
            <div style={{ fontSize: '13px', color: '#0A84FF', fontWeight: 500 }}>查看全部</div>
          </div>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.1 }}
              style={{
                display: 'flex', gap: '14px', padding: '16px 0',
                borderBottom: i < messages.length - 1 ? '1px solid rgba(0,0,0,0.04)' : 'none'
              }}
            >
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: msg.from === 'AI 健康助手' ? 'rgba(10,132,255,0.1)' : 'rgba(48,200,176,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '16px', flexShrink: 0
              }}>
                {msg.from === 'AI 健康助手' ? '🤖' : '👨‍⚕️'}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#1C1C1E' }}>{msg.from}</span>
                  <span style={{ fontSize: '10px', color: '#AEAEB2', padding: '1px 6px', background: 'rgba(0,0,0,0.03)', borderRadius: '4px' }}>
                    {msg.role}
                  </span>
                  {msg.unread && (
                    <motion.div
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0A84FF' }}
                    />
                  )}
                </div>
                <div style={{ fontSize: '13px', color: '#636366', lineHeight: 1.4 }}>{msg.content}</div>
                <div style={{ fontSize: '11px', color: '#AEAEB2', marginTop: '4px' }}>{msg.time}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </PageWrapper>
  )
}
