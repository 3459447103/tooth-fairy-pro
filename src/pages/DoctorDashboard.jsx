import { motion } from 'framer-motion'
import GlassCard from '../components/Cards'
import TrendChart from '../components/TrendChart'
import { PageWrapper, SectionTitle } from '../components/NavIndicator'

const patients = [
  { id: 1, name: '张小姐', stage: '8/24', compliance: 96, risk: 'low', status: '佩戴中', lastUpdate: '2分钟前', alert: false },
  { id: 2, name: '李先生', stage: '5/20', compliance: 82, risk: 'medium', status: '已摘戴', lastUpdate: '30分钟前', alert: true },
  { id: 3, name: '王小姐', stage: '12/18', compliance: 95, risk: 'low', status: '佩戴中', lastUpdate: '5分钟前', alert: false },
  { id: 4, name: '赵先生', stage: '3/30', compliance: 68, risk: 'high', status: '超时未戴', lastUpdate: '1小时前', alert: true },
  { id: 5, name: '刘小姐', stage: '15/25', compliance: 91, risk: 'low', status: '佩戴中', lastUpdate: '15分钟前', alert: false },
  { id: 6, name: '陈同学', stage: '6/22', compliance: 84, risk: 'medium', status: '已摘戴', lastUpdate: '45分钟前', alert: false },
]

const weeklyStats = [45, 48, 52, 56, 54, 58, 60]

export default function DoctorDashboard() {
  return (
    <PageWrapper>
      <div style={{ padding: '40px 48px', maxWidth: '1400px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginBottom: '28px'
          }}
        >
          <div>
            <div style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '-0.5px', color: '#1C1C1E' }}>
              医生工作站
            </div>
            <div style={{ fontSize: '14px', color: '#8E8E93', marginTop: '2px' }}>
              实时监测 · 智能预警 · 专业管理
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{
              padding: '8px 16px', background: 'rgba(10,132,255,0.06)',
              borderRadius: '20px', fontSize: '13px', color: '#0A84FF', fontWeight: 500
            }}>
              ● 在线监测中
            </div>
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: 'rgba(48,200,176,0.1)', display: 'flex',
              alignItems: 'center', justifyContent: 'center', fontSize: '18px'
            }}>
              👨‍⚕️
            </div>
          </div>
        </motion.div>

        {/* Stats overview */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
          {[
            { label: '管理患者', value: 186, change: '+12', color: '#0A84FF' },
            { label: 'AI预警', value: 3, change: '需处理', color: '#FF6B6B' },
            { label: '今日复诊', value: 8, change: '3待完成', color: '#FF9F0A' },
            { label: '本月新增', value: 24, change: '+18%', color: '#30C8B0' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="glass-sm"
              style={{ padding: '20px' }}
            >
              <div style={{ fontSize: '12px', color: '#8E8E93', fontWeight: 500, marginBottom: '6px' }}>{stat.label}</div>
              <div style={{ fontSize: '32px', fontWeight: 700, color: stat.color, letterSpacing: '-1px' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '11px', color: stat.color, marginTop: '2px', fontWeight: 500 }}>{stat.change}</div>
            </motion.div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px' }}>
          {/* Patient list */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="glass"
            style={{ padding: '24px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ fontSize: '16px', fontWeight: 600, color: '#1C1C1E' }}>患者管理列表</div>
              <div style={{ fontSize: '13px', color: '#0A84FF', fontWeight: 500 }}>筛选 ▼</div>
            </div>

            {/* Table header */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 80px 80px 80px 120px 80px',
              padding: '10px 16px', fontSize: '11px', color: '#AEAEB2', fontWeight: 500,
              borderBottom: '1px solid rgba(0,0,0,0.04)'
            }}>
              <span>患者</span><span>阶段</span><span>依从性</span><span>风险</span><span>状态</span><span>操作</span>
            </div>

            {patients.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.06 }}
                style={{
                  display: 'grid', gridTemplateColumns: '1fr 80px 80px 80px 120px 80px',
                  padding: '14px 16px', alignItems: 'center',
                  borderBottom: '1px solid rgba(0,0,0,0.03)',
                  background: p.alert ? 'rgba(255,107,107,0.02)' : 'transparent'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '34px', height: '34px', borderRadius: '10px',
                    background: 'linear-gradient(135deg, #E8F5E9, #C8E6C9)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '15px'
                  }}>
                    {p.name[0]}
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 500, color: '#1C1C1E' }}>{p.name}</div>
                    <div style={{ fontSize: '11px', color: '#AEAEB2' }}>{p.lastUpdate}</div>
                  </div>
                </div>
                <span style={{ fontSize: '12px', color: '#636366' }}>{p.stage}</span>
                <span style={{
                  fontSize: '12px', fontWeight: 600,
                  color: p.compliance >= 90 ? '#30C8B0' : p.compliance >= 75 ? '#FF9F0A' : '#FF6B6B'
                }}>
                  {p.compliance}%
                </span>
                <span style={{
                  fontSize: '11px', padding: '3px 8px', borderRadius: '6px', textAlign: 'center',
                  background: p.risk === 'low' ? 'rgba(48,200,176,0.08)' : p.risk === 'medium' ? 'rgba(255,159,10,0.08)' : 'rgba(255,107,107,0.08)',
                  color: p.risk === 'low' ? '#30C8B0' : p.risk === 'medium' ? '#FF9F0A' : '#FF6B6B',
                  fontWeight: 500
                }}>
                  {p.risk === 'low' ? '低风险' : p.risk === 'medium' ? '中风险' : '高风险'}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{
                    width: '7px', height: '7px', borderRadius: '50%',
                    background: p.status === '佩戴中' ? '#30C8B0' : p.status === '已摘戴' ? '#FF9F0A' : '#FF6B6B'
                  }} />
                  <span style={{ fontSize: '12px', color: '#636366' }}>{p.status}</span>
                </div>
                <span style={{ fontSize: '12px', color: '#0A84FF', fontWeight: 500, cursor: 'pointer' }}>
                  查看 →
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Side panel: AI Alerts + Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            {/* AI Alerts */}
            <GlassCard>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#1C1C1E', marginBottom: '14px', display: 'flex', justifyContent: 'space-between' }}>
                <span>AI 预警中心</span>
                <span style={{ fontSize: '11px', color: '#FF6B6B', fontWeight: 500 }}>3条预警</span>
              </div>
              {[
                { patient: '赵先生', issue: '佩戴依从性持续下降', severity: 'high', time: '1小时前' },
                { patient: '李先生', issue: '牙齿移动偏离预测路径', severity: 'medium', time: '3小时前' },
                { patient: '张同学', issue: '牙套佩戴时间不足18h', severity: 'medium', time: '6小时前' },
              ].map((alert, i) => (
                <div key={i} style={{
                  padding: '12px', marginTop: '8px',
                  background: alert.severity === 'high' ? 'rgba(255,107,107,0.04)' : 'rgba(255,159,10,0.04)',
                  borderRadius: '10px', border: `1px solid ${alert.severity === 'high' ? 'rgba(255,107,107,0.12)' : 'rgba(255,159,10,0.12)'}`
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#1C1C1E' }}>{alert.patient}</span>
                    <span style={{
                      fontSize: '10px', padding: '1px 6px', borderRadius: '4px',
                      background: alert.severity === 'high' ? 'rgba(255,107,107,0.15)' : 'rgba(255,159,10,0.15)',
                      color: alert.severity === 'high' ? '#FF6B6B' : '#FF9F0A'
                    }}>
                      {alert.severity === 'high' ? '高风险' : '中风险'}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#636366' }}>{alert.issue}</div>
                  <div style={{ fontSize: '10px', color: '#AEAEB2', marginTop: '4px' }}>{alert.time}</div>
                </div>
              ))}
            </GlassCard>

            {/* Stats chart */}
            <GlassCard>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#1C1C1E', marginBottom: '12px' }}>
                本周新患者趋势
              </div>
              <TrendChart data={weeklyStats} color="#0A84FF" height={100} />
              <div style={{
                display: 'flex', justifyContent: 'space-between', marginTop: '8px',
                fontSize: '11px', color: '#AEAEB2'
              }}>
                <span>Mon</span><span>Wed</span><span>Fri</span><span>Sun</span>
              </div>
            </GlassCard>

            {/* Quick stats */}
            <GlassCard>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#1C1C1E', marginBottom: '12px' }}>
                监测统计
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', color: '#8E8E93' }}>在线患者</span>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#30C8B0' }}>42人</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', color: '#8E8E93' }}>今日摘戴次数</span>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#636366' }}>128次</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', color: '#8E8E93' }}>AI分析请求</span>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#0A84FF' }}>386次</span>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  )
}
