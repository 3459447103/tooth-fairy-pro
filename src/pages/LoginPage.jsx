import { useState } from 'react'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import BrandHalo3D from '../components/BrandHalo3D'

export default function LoginPage({ onLogin }) {
  const [role, setRole] = useState('patient')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onLogin(role)
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', background: '#F2F7FB',
      alignItems: 'center', justifyContent: 'center'
    }}>
      {/* Left: Brand Halo 3D */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        minWidth: 0, position: 'relative'
      }}>
        <div style={{ width: '520px', height: '520px', pointerEvents: 'none' }}>
          <Canvas camera={{ position: [0, 0, 4.5], fov: 42 }}
            gl={{ antialias: true, alpha: true }}
            style={{ pointerEvents: 'none' }}>
            <BrandHalo3D />
          </Canvas>
        </div>

        <div style={{
          position: 'absolute', bottom: '60px', left: '50%',
          transform: 'translateX(-50%)', textAlign: 'center',
          pointerEvents: 'none'
        }}>
          <div style={{ fontSize: '42px', fontWeight: 700, color: '#1C1C1E', letterSpacing: '-1px' }}>
            数智矫正
          </div>
          <div style={{ fontSize: '16px', fontWeight: 400, color: '#636366' }}>
            PRECISION ORTHODONTICS
          </div>
        </div>
      </div>

      {/* Right: Login form */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{
          width: '440px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '48px'
        }}
      >
        <div className="glass" style={{ width: '100%', padding: '40px 36px' }}>
          <div style={{ marginBottom: '32px' }}>
            <div style={{ fontSize: '24px', fontWeight: 600, color: '#1C1C1E', marginBottom: '4px' }}>
              欢迎回来
            </div>
            <div style={{ fontSize: '14px', color: '#8E8E93' }}>
              选择身份登录您的账户
            </div>
          </div>

          <div style={{
            display: 'flex', background: 'rgba(0,0,0,0.04)', borderRadius: '10px',
            padding: '3px', marginBottom: '28px'
          }}>
            {['patient', 'doctor'].map((r) => (
              <motion.button
                key={r}
                onClick={() => setRole(r)}
                style={{
                  flex: 1, padding: '10px', border: 'none', borderRadius: '8px',
                  cursor: 'pointer', fontSize: '14px', fontWeight: 500,
                  color: role === r ? '#0A84FF' : '#8E8E93',
                  background: role === r ? '#FFFFFF' : 'transparent',
                  position: 'relative',
                  boxShadow: role === r ? '0 1px 3px rgba(0,0,0,0.08)' : 'none'
                }}
                whileTap={{ scale: 0.98 }}
              >
                {r === 'patient' ? '患者登录' : '医生登录'}
              </motion.button>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '13px', color: '#636366', marginBottom: '6px', display: 'block', fontWeight: 500 }}>
                邮箱地址
              </label>
              <input
                type="email" value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                style={{
                  width: '100%', padding: '12px 16px', borderRadius: '12px',
                  border: '1px solid rgba(0,0,0,0.08)', background: '#FFFFFF',
                  fontSize: '15px', outline: 'none'
                }}
                required
              />
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ fontSize: '13px', color: '#636366', marginBottom: '6px', display: 'block', fontWeight: 500 }}>
                密码
              </label>
              <input
                type="password" value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%', padding: '12px 16px', borderRadius: '12px',
                  border: '1px solid rgba(0,0,0,0.08)', background: '#FFFFFF',
                  fontSize: '15px', outline: 'none'
                }}
                required
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                width: '100%', padding: '14px', borderRadius: '14px',
                border: 'none', background: '#0A84FF', color: 'white',
                fontSize: '16px', fontWeight: 600, cursor: 'pointer',
                letterSpacing: '0.5px',
                boxShadow: '0 4px 20px rgba(10,132,255,0.3)'
              }}
            >
              登录系统
            </motion.button>
          </form>

          <div style={{
            textAlign: 'center', marginTop: '20px', fontSize: '13px', color: '#8E8E93',
            display: 'flex', justifyContent: 'center', gap: '20px'
          }}>
            <span style={{ cursor: 'pointer' }}>演示账号</span>
            <span style={{ cursor: 'pointer' }}>忘记密码？</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
