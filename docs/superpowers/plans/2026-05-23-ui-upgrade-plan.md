# 数智矫正 UI 升级实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 替换 7 个页面中的 3D 牙齿模型为抽象科技元素和 SVG 数据可视化，删除 ProjectValue 页面，优化 PatientHome 加载体验。

**Architecture:** 新增 5 个独立组件，每个职责单一、体积小（1-5KB）。两个 3D 组件 (BrandHalo3D, DataSphere3D) 使用 Three.js 程序化几何体无需外部模型文件。两个 SVG 组件 (RadarChart, PipelineFlow) 纯客户端渲染即时显示。SkeletonLoader 提供加载骨架屏。所有组件保持与现有页面的接口兼容。

**Tech Stack:** React 19.2 + Three.js 0.184.0 + @react-three/fiber + framer-motion 12.38

---

### Task 1: BrandHalo3D — 品牌光环 + 粒子漩涡

**Files:**
- Create: `src/components/BrandHalo3D.jsx`

- [ ] **Step 1: Create BrandHalo3D component**

```jsx
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function HaloRings() {
  const groupRef = useRef()
  const rings = useMemo(() => [0, 1, 2, 3], [])

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.z += delta * 0.15
      groupRef.current.rotation.x += delta * 0.08
      groupRef.current.rotation.y += delta * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      {rings.map((i) => {
        const radius = 1.1 + i * 0.18
        const opacity = 0.6 - i * 0.12
        const hue = i % 2 === 0 ? '#0A84FF' : '#FFD4A8'
        return (
          <mesh key={i} rotation={[Math.PI / 2 + i * 0.3, i * 0.25, 0]}>
            <torusGeometry args={[radius, 0.008 + i * 0.002, 8, 80]} />
            <meshBasicMaterial
              color={hue}
              transparent
              opacity={opacity}
              depthWrite={false}
            />
          </mesh>
        )
      })}
    </group>
  )
}

function ParticleVortex({ count = 200 }) {
  const ref = useRef()
  const data = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const t = i / count
      const angle = t * Math.PI * 6
      const radius = 0.3 + t * 1.6
      pos[i * 3] = Math.cos(angle) * radius
      pos[i * 3 + 1] = (t - 0.5) * 2.2
      pos[i * 3 + 2] = Math.sin(angle) * radius
    }
    return pos
  }, [count])

  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.3
    const arr = ref.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += delta * 0.15
      if (arr[i * 3 + 1] > 1.2) arr[i * 3 + 1] = -1.2
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={data}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#0A84FF"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

function CenterGlow() {
  const ref = useRef()
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.scale.setScalar(1 + Math.sin(Date.now() * 0.002) * 0.05)
      ref.current.material.opacity = 0.25 + Math.sin(Date.now() * 0.003) * 0.1
    }
  })
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.22, 32, 32]} />
      <meshBasicMaterial color="#0A84FF" transparent opacity={0.25} depthWrite={false} />
    </mesh>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#0A84FF" distance={6} />
      <HaloRings />
      <ParticleVortex count={200} />
      <CenterGlow />
    </>
  )
}

export { Scene }
export default Scene
```

- [ ] **Step 2: Verify file created**

```bash
node -e "const fs=require('fs'); console.log(fs.existsSync('C:/Users/Administrator/tooth-fairy-pro/src/components/BrandHalo3D.jsx') ? 'OK' : 'MISSING')"
```

- [ ] **Step 3: Commit**

```bash
git add src/components/BrandHalo3D.jsx
git commit -m "feat: add BrandHalo3D component - brand halo rings + particle vortex"
```

---

### Task 2: LoginPage — 替换牙模为 BrandHalo3D

**Files:**
- Modify: `src/pages/LoginPage.jsx`

- [ ] **Step 1: Rewrite LoginPage left section to use BrandHalo3D**

Replace the entire file content:

```jsx
import { useState, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import BrandHalo3D from '../components/BrandHalo3D'
import ParticleBackground from '../components/ParticleBackground'

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
      minHeight: '100vh', display: 'flex', background: '#F2F7FB', position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background particles */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.4 }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <Suspense fallback={null}>
            <ParticleBackground count={80} color="#0A84FF" />
          </Suspense>
        </Canvas>
      </div>

      {/* Left: Brand Halo 3D */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        style={{
          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', minWidth: 0
        }}
      >
        <div style={{ width: '520px', height: '520px' }}>
          <Canvas camera={{ position: [0, 0, 4.5], fov: 42 }}
            gl={{ antialias: true, alpha: true }}>
            <Suspense fallback={null}>
              <BrandHalo3D />
            </Suspense>
          </Canvas>
        </div>

        {/* Branding overlay */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          style={{
            position: 'absolute', bottom: '60px', left: '50%', transform: 'translateX(-50%)',
            color: '#1C1C1E', fontSize: '28px', fontWeight: 600, letterSpacing: '-0.5px',
            textAlign: 'center', zIndex: 20, pointerEvents: 'none'
          }}
        >
          <div style={{ fontSize: '42px', fontWeight: 700, marginBottom: '8px', letterSpacing: '-1px' }}>
            数智矫正
          </div>
          <div style={{ fontSize: '16px', fontWeight: 400, color: '#636366' }}>
            PRECISION ORTHODONTICS
          </div>
        </motion.div>

        {/* Glow background */}
        <motion.div
          animate={{ opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(circle at 50% 50%, rgba(10,132,255,0.08) 0%, transparent 60%)',
            pointerEvents: 'none'
          }}
        />
      </motion.div>

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

          {/* Role toggle */}
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
                  border: '1px solid rgba(0,0,0,0.08)', background: 'rgba(0,0,0,0.02)',
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
                  border: '1px solid rgba(0,0,0,0.08)', background: 'rgba(0,0,0,0.02)',
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
```

Key changes from original:
- Import: `ToothModel` → `BrandHalo3D`, remove `Environment` import
- Left section: `DentalShowcase` → `Canvas + BrandHalo3D`, remove old HUD overlay text
- Remove `AnimatePresence` import (not used in this page)
- Keep: right-side login form completely unchanged
- Keep: ParticleBackground as background
- Remove emojis from button labels (cleaner look)

- [ ] **Step 2: Verify the build succeeds**

Run: `npm run build`
Expected: Build succeeds with no errors

- [ ] **Step 3: Commit**

```bash
git add src/pages/LoginPage.jsx
git commit -m "feat: replace tooth model with BrandHalo3D on LoginPage"
```

---

### Task 3: DataSphere3D — 数据球体 + 雷达扫描

**Files:**
- Create: `src/components/DataSphere3D.jsx`

- [ ] **Step 1: Create DataSphere3D component**

```jsx
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function WireframeGlobe() {
  const ref = useRef()

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.2
      ref.current.rotation.x += delta * 0.05
    }
  })

  const geo = useMemo(() => {
    const sphere = new THREE.SphereGeometry(1.2, 32, 24)
    return new THREE.WireframeGeometry(sphere)
  }, [])

  return (
    <mesh ref={ref} geometry={geo}>
      <meshBasicMaterial color="#0A84FF" transparent opacity={0.15} depthWrite={false} />
    </mesh>
  )
}

function RadarRing() {
  const ref = useRef()

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.4
      ref.current.rotation.y += delta * 0.35
      const op = 0.4 + Math.sin(Date.now() * 0.003) * 0.2
      ref.current.material.opacity = op
    }
  })

  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[1.35, 0.012, 8, 64]} />
      <meshBasicMaterial color="#0A84FF" transparent opacity={0.5} depthWrite={false} />
    </mesh>
  )
}

function SurfaceDots({ count = 80 }) {
  const ref = useRef()
  const data = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(2 * Math.random() - 1)
      const theta = Math.random() * Math.PI * 2
      const r = 1.22
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    return pos
  }, [count])

  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.15
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={data} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#FFE0C0" transparent opacity={0.6}
        blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[2, 1, 2]} intensity={2} color="#0A84FF" distance={8} />
      <WireframeGlobe />
      <RadarRing />
      <SurfaceDots count={80} />
    </>
  )
}

export { Scene }
export default Scene
```

- [ ] **Step 2: Verify file created and commit**

```bash
git add src/components/DataSphere3D.jsx
git commit -m "feat: add DataSphere3D component - wireframe globe + radar scan"
```

---

### Task 4: EndingPage — 替换牙模为 DataSphere3D

**Files:**
- Modify: `src/pages/EndingPage.jsx`

- [ ] **Step 1: Rewrite EndingPage to use DataSphere3D**

```jsx
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import DataSphere3D from '../components/DataSphere3D'

export default function EndingPage() {
  const [showText, setShowText] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShowText(true), 800)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: '#F2F7FB', position: 'relative', overflow: 'hidden'
    }}>
      {/* Central glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px', height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(10,132,255,0.08) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      {/* Data Sphere 3D */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        style={{ width: '420px', height: '420px', position: 'relative', zIndex: 1 }}
      >
        <Canvas camera={{ position: [0, 0.1, 3.8], fov: 38 }}
          gl={{ antialias: true, alpha: true }}>
          <DataSphere3D />
        </Canvas>

        {/* Scan line effect */}
        <motion.div
          animate={{ opacity: [0, 0.4, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{
            position: 'absolute', top: '15%', left: '10%', right: '10%',
            height: '1px', background: 'linear-gradient(90deg, transparent, #0A84FF, transparent)',
            opacity: 0.3, pointerEvents: 'none'
          }}
        />
      </motion.div>

      {/* Text */}
      {showText && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          style={{ textAlign: 'center', zIndex: 1, marginTop: '20px' }}
        >
          <div style={{
            fontSize: '38px', fontWeight: 700, color: '#1C1C1E',
            letterSpacing: '-1px', marginBottom: '12px'
          }}>
            让每一次牙齿移动
          </div>
          <div style={{
            fontSize: '38px', fontWeight: 300, color: '#0A84FF',
            letterSpacing: '2px', marginBottom: '40px'
          }}>
            都被精准感知
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}
          >
            <div style={{
              padding: '12px 32px', borderRadius: '40px',
              background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(16px)',
              border: '1px solid rgba(10,132,255,0.15)',
              fontSize: '14px', color: '#0A84FF', fontWeight: 500,
              letterSpacing: '1px'
            }}>
              数智矫正
            </div>
            <div style={{ fontSize: '13px', color: '#AEAEB2', letterSpacing: '2px' }}>
              PRECISION ORTHODONTICS
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              {['AI 智能监测', '精准医疗', '云端协同'].map((tag, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2 + i * 0.2 }}
                  style={{
                    padding: '8px 20px', borderRadius: '20px',
                    background: `rgba(${i === 0 ? '10,132,255' : i === 1 ? '48,200,176' : '100,210,255'},0.06)`,
                    border: `1px solid rgba(${i === 0 ? '10,132,255' : i === 1 ? '48,200,176' : '100,210,255'},0.12)`,
                    fontSize: '13px', color: '#636366', fontWeight: 500
                  }}
                >
                  {tag}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 3, duration: 1 }}
        style={{
          position: 'absolute', bottom: '32px', fontSize: '12px',
          color: '#AEAEB2', zIndex: 1
        }}
      >
        2026 数智矫正科技 · 演示版本
      </motion.div>
    </div>
  )
}
```

Changes:
- Import: remove `ToothModel`, `ParticleBackground`, `Environment`, `Suspense`; add `DataSphere3D`
- 3D area: replace Canvas+ToothModel with Canvas+DataSphere3D
- Brand text: change "隐形齿精灵 Pro" to "数智矫正"
- Footer: update copyright text

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/pages/EndingPage.jsx
git commit -m "feat: replace tooth model with DataSphere3D on EndingPage"
```

---

### Task 5: RadarChart — SVG 六维健康雷达图

**Files:**
- Create: `src/components/RadarChart.jsx`

- [ ] **Step 1: Create RadarChart component**

```jsx
import { motion } from 'framer-motion'

export default function RadarChart({
  data = [],
  labels = [],
  size = 240,
  color = '#0A84FF',
}) {
  const cx = size / 2
  const cy = size / 2
  const radius = size * 0.38
  const levels = 4
  const sides = data.length

  const angleStep = (Math.PI * 2) / sides
  const startAngle = -Math.PI / 2

  const getPoint = (index, value, maxValue) => {
    const angle = startAngle + index * angleStep
    const r = (value / maxValue) * radius
    return {
      x: cx + Math.cos(angle) * r,
      y: cy + Math.sin(angle) * r,
    }
  }

  // Generate polygon points string
  const polygonPoints = data.map((v, i) => {
    const pt = getPoint(i, v, 100)
    return `${pt.x},${pt.y}`
  }).join(' ')

  // Background grid
  const gridLines = Array.from({ length: levels }, (_, level) => {
    const r = ((level + 1) / levels) * radius
    return Array.from({ length: sides }, (_, i) => {
      const angle = startAngle + i * angleStep
      return { x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r }
    })
  })

  // Axis lines
  const axes = Array.from({ length: sides }, (_, i) => {
    const angle = startAngle + i * angleStep
    return { x2: cx + Math.cos(angle) * radius, y2: cy + Math.sin(angle) * radius }
  })

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Grid polygons */}
        {gridLines.map((points, level) => (
          <polygon
            key={level}
            points={points.map(p => `${p.x},${p.y}`).join(' ')}
            fill="none"
            stroke="rgba(0,0,0,0.06)"
            strokeWidth="1"
          />
        ))}

        {/* Axis lines */}
        {axes.map((axis, i) => (
          <line
            key={i}
            x1={cx} y1={cy}
            x2={axis.x2} y2={axis.y2}
            stroke="rgba(0,0,0,0.06)"
            strokeWidth="1"
          />
        ))}

        {/* Data polygon */}
        <motion.polygon
          points={polygonPoints}
          fill={`${color}15`}
          stroke={color}
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />

        {/* Data points */}
        {data.map((v, i) => {
          const pt = getPoint(i, v, 100)
          return (
            <motion.circle
              key={i}
              cx={pt.x} cy={pt.y} r="4"
              fill={color}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.1 }}
            />
          )
        })}

        {/* Labels */}
        {labels.map((label, i) => {
          const angle = startAngle + i * angleStep
          const lx = cx + Math.cos(angle) * (radius + 24)
          const ly = cy + Math.sin(angle) * (radius + 24)
          const anchor = lx < cx - 5 ? 'end' : lx > cx + 5 ? 'start' : 'middle'
          return (
            <motion.text
              key={i}
              x={lx} y={ly}
              textAnchor={anchor}
              dominantBaseline="middle"
              fontSize="11"
              fill="#636366"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.08 }}
            >
              {label}
            </motion.text>
          )
        })}
      </svg>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/RadarChart.jsx
git commit -m "feat: add RadarChart SVG component - hexagonal health radar"
```

---

### Task 6: AIAnalysisPage — 替换牙模为 RadarChart

**Files:**
- Modify: `src/pages/AIAnalysisPage.jsx`

- [ ] **Step 1: Replace bottom Canvas+ToothModel section with RadarChart**

In `AIAnalysisPage.jsx`, replace lines 97-123 (the Canvas + ToothModel + heatmap legend section) with:

```jsx
            {/* Radar chart replacing tooth model */}
            <div style={{ marginTop: '16px' }}>
              <RadarChart
                data={riskFactors.map(r => r.value)}
                labels={riskFactors.map(r => r.label)}
                size={260}
                color="#0A84FF"
              />
            </div>
```

Also update imports: remove `ToothModel`, `ParticleBackground`, `Canvas`, `Environment`, `Suspense`; add `RadarChart`.

Remove unused imports: `import { Canvas } from '@react-three/fiber'`, `import { Environment } from '@react-three/drei'`, `import ToothModel`, `import ParticleBackground`.

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/pages/AIAnalysisPage.jsx
git commit -m "feat: replace tooth model with RadarChart on AIAnalysisPage"
```

---

### Task 7: PipelineFlow — AI 决策流水线动画

**Files:**
- Create: `src/components/PipelineFlow.jsx`

- [ ] **Step 1: Create PipelineFlow component**

```jsx
import { motion } from 'framer-motion'

const defaultSteps = [
  { icon: '📡', title: '数据采集', desc: 'IoT传感器实时监测', color: '#0A84FF' },
  { icon: '🔬', title: '特征提取', desc: '128维牙移动特征向量', color: '#30C8B0' },
  { icon: '🧠', title: '模型推理', desc: 'DeepOrtho 深度网络', color: '#FF9F0A' },
  { icon: '📋', title: '决策输出', desc: '治疗方案 + 置信度评分', color: '#0A84FF' },
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/PipelineFlow.jsx
git commit -m "feat: add PipelineFlow component - AI decision pipeline animation"
```

---

### Task 8: AIDecisionCenter — 替换底部牙模为 PipelineFlow

**Files:**
- Modify: `src/pages/AIDecisionCenter.jsx`

- [ ] **Step 1: Replace bottom Canvas section with PipelineFlow**

Replace lines 245-269 (the bottom "医患数据流可视化" section with Canvas+ToothModel+ParticleBackground) with:

```jsx
        {/* AI Decision Pipeline replacing tooth model */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="glass"
          style={{ padding: '24px' }}
        >
          <div style={{ fontSize: '14px', fontWeight: 600, color: '#1C1C1E', marginBottom: '4px' }}>
            AI 决策流水线
          </div>
          <div style={{ fontSize: '12px', color: '#8E8E93', marginBottom: '8px' }}>
            端到端智能诊疗决策引擎
          </div>
          <PipelineFlow />
        </motion.div>
```

Update imports: remove `ToothModel`, `ParticleBackground`, `Canvas`, `Environment`; add `PipelineFlow`. Remove unused `Suspense` import.

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/pages/AIDecisionCenter.jsx
git commit -m "feat: replace tooth model with PipelineFlow on AIDecisionCenter"
```

---

### Task 9: TreatmentProgress — 替换牙模为环形进度

**Files:**
- Modify: `src/pages/TreatmentProgress.jsx`

- [ ] **Step 1: Replace Canvas+ToothModel section with circular progress visualization**

Replace lines 87-159 (the "3D 牙齿对比" GlassCard section with Canvas+ToothModel) with:

```jsx
          {/* Treatment progress visualization replacing tooth model */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="glass"
            style={{ padding: '28px', minHeight: '380px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
          >
            {/* Circular progress */}
            <div style={{ position: 'relative', width: '180px', height: '180px', marginBottom: '28px' }}>
              <svg viewBox="0 0 180 180" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="90" cy="90" r="80" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="8" />
                <motion.circle
                  cx="90" cy="90" r="80" fill="none" stroke="#0A84FF" strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 80}
                  initial={{ strokeDashoffset: 2 * Math.PI * 80 }}
                  animate={{ strokeDashoffset: (1 - 0.42) * 2 * Math.PI * 80 }}
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
                  transition={{ delay: 1 }}
                  style={{ fontSize: '48px', fontWeight: 700, color: '#0A84FF', lineHeight: 1 }}
                >
                  42<span style={{ fontSize: '22px', color: '#8E8E93' }}>%</span>
                </motion.div>
                <div style={{ fontSize: '13px', color: '#8E8E93', marginTop: '4px' }}>整体进度</div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#1C1C1E', marginTop: '8px' }}>
                  第 8/24 副
                </div>
              </div>
            </div>

            {/* Data indicators */}
            <div style={{ display: 'flex', gap: '32px', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '11px', color: '#8E8E93', marginBottom: '2px' }}>前牙拥挤度</div>
                <div style={{ fontSize: '18px', fontWeight: 600, color: '#0A84FF' }}>1.8mm</div>
                <div style={{ fontSize: '10px', color: '#30C8B0', marginTop: '2px' }}>↓ 改善 62%</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '11px', color: '#8E8E93', marginBottom: '2px' }}>覆合改善</div>
                <div style={{ fontSize: '18px', fontWeight: 600, color: '#30C8B0' }}>显著</div>
                <div style={{ fontSize: '10px', color: '#30C8B0', marginTop: '2px' }}>目标达成</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '11px', color: '#8E8E93', marginBottom: '2px' }}>已移动距离</div>
                <div style={{ fontSize: '18px', fontWeight: 600, color: '#636366' }}>3.2mm</div>
                <div style={{ fontSize: '10px', color: '#8E8E93', marginTop: '2px' }}>预计 8.2mm</div>
              </div>
            </div>
          </motion.div>
```

Update imports: remove `ToothModel`, `Canvas`, `Environment`, `Suspense`; remove `useState` (no longer need compareMode). Keep `GlassCard`, `PageWrapper`, `SectionTitle` imports.

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/pages/TreatmentProgress.jsx
git commit -m "feat: replace tooth model with circular progress on TreatmentProgress"
```

---

### Task 10: PatientDetail — 替换牙模为指标卡片

**Files:**
- Modify: `src/pages/PatientDetail.jsx`

- [ ] **Step 1: Replace Canvas+ToothModel section with data cards**

Replace lines 56-103 (the left-side GlassCard with Canvas+ToothModel+trends) with:

```jsx
          {/* Left: Key metrics overview replacing tooth model */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            {/* Alert banner */}
            <div style={{
              padding: '20px 24px',
              background: 'rgba(255,107,107,0.04)',
              borderRadius: '16px',
              border: '1px solid rgba(255,107,107,0.12)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <motion.div
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FF6B6B', flexShrink: 0 }}
                />
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 600, color: '#FF6B6B', marginBottom: '2px' }}>
                    需重点关注：依从性持续下降
                  </div>
                  <div style={{ fontSize: '12px', color: '#636366' }}>
                    近4周日均佩戴不足18小时 · AI预测可能延长治疗6-8周
                  </div>
                </div>
              </div>
            </div>

            {/* 4-up metrics grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {[
                { label: '依从性评分', value: '68', suffix: '%', color: '#FF6B6B', trend: '↓ 持续下降' },
                { label: '日均佩戴', value: '16.5', suffix: 'h', color: '#FF9F0A', trend: '目标 ≥ 22h' },
                { label: '牙齿移动', value: '2.8', suffix: 'mm', color: '#0A84FF', trend: '偏离预期 12%' },
                { label: '矫治进度', value: '10', suffix: '%', color: '#8E8E93', trend: '第 3/30 副' },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="glass-sm"
                  style={{ padding: '18px 20px' }}
                >
                  <div style={{ fontSize: '12px', color: '#8E8E93', fontWeight: 500, marginBottom: '6px' }}>
                    {card.label}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                    <span style={{ fontSize: '32px', fontWeight: 700, color: card.color, letterSpacing: '-1px' }}>
                      {card.value}
                    </span>
                    <span style={{ fontSize: '14px', color: '#AEAEB2', fontWeight: 500 }}>{card.suffix}</span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#AEAEB2', marginTop: '2px' }}>{card.trend}</div>
                </motion.div>
              ))}
            </div>

            {/* Trend charts */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="glass-sm" style={{ padding: '16px' }}>
                <div style={{ fontSize: '12px', color: '#8E8E93', marginBottom: '8px', fontWeight: 500 }}>
                  依从性趋势（近12周）
                </div>
                <TrendChart data={complianceHistory} color="#FF6B6B" height={80} />
              </div>
              <div className="glass-sm" style={{ padding: '16px' }}>
                <div style={{ fontSize: '12px', color: '#8E8E93', marginBottom: '8px', fontWeight: 500 }}>
                  日佩戴时长趋势
                </div>
                <TrendChart data={dailyHours} color="#FF9F0A" height={80} />
              </div>
            </div>
          </motion.div>
```

Update imports: remove `ToothModel`, `Canvas`, `Environment`, `Suspense`, `ParticleBackground`.

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/pages/PatientDetail.jsx
git commit -m "feat: replace tooth model with metrics cards on PatientDetail"
```

---

### Task 11: SkeletonLoader — 牙模加载骨架屏

**Files:**
- Create: `src/components/SkeletonLoader.jsx`

- [ ] **Step 1: Create SkeletonLoader component**

```jsx
import { motion } from 'framer-motion'

export default function SkeletonLoader() {
  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: '20px'
    }}>
      {/* Pulsing ring */}
      <motion.div
        animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: '120px', height: '120px', borderRadius: '50%',
          border: '2px solid rgba(10,132,255,0.15)',
          borderTopColor: '#0A84FF',
          position: 'relative'
        }}
      />

      {/* Loading text */}
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          fontSize: '14px', color: '#0A84FF', fontWeight: 500,
          letterSpacing: '0.5px'
        }}
      >
        正在加载牙齿模型...
      </motion.div>

      {/* Subtle dots */}
      <div style={{ display: 'flex', gap: '6px' }}>
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
            style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#0A84FF' }}
          />
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/SkeletonLoader.jsx
git commit -m "feat: add SkeletonLoader component for tooth model loading state"
```

---

### Task 12: PatientHome — 添加骨架屏加载

**Files:**
- Modify: `src/pages/PatientHome.jsx`

- [ ] **Step 1: Wrap ToothModel area with loading state**

In `PatientHome.jsx`:
- Add `import { useState } from 'react'` and `import SkeletonLoader from '../components/SkeletonLoader'`
- In the component, add `const [modelReady, setModelReady] = useState(false)`
- Wrap the center Canvas area (lines 134-144) with conditional rendering:

Replace the center section (lines 124-153) with:

```jsx
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
```

Also remove the ParticleBackground overlay Canvas (the separate 3D canvas with particles), since we'll keep the page cleaner.

And add `onReady` callback support to ToothModel. Edit `ToothModel.jsx`:

Add after the existing props: in the existing ToothModel, wrap the return in a useEffect that calls `onReady`:

In ToothModel.jsx, add at line 6: add a useEffect that calls `onReady` when model is loaded:

```jsx
// In ToothModel, add to useEffect for model loading:
useEffect(() => {
  if (model && onReady) {
    // Small delay to ensure the mesh is rendered
    const t = setTimeout(() => onReady(), 100)
    return () => clearTimeout(t)
  }
}, [model, onReady])
```

And add `onReady` to the destructured props:
```jsx
export default function ToothModel({
  scale = 1.8,
  rotationY = 0,
  autoRotate = true,
  transparent = false,
  highlightZones = [],
  onReady,  // <-- add this
}) {
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/pages/PatientHome.jsx src/components/ToothModel.jsx src/components/SkeletonLoader.jsx
git commit -m "feat: add skeleton loader to PatientHome tooth model"
```

---

### Task 13: 删除 ProjectValue + 更新 App.jsx

**Files:**
- Delete: `src/pages/ProjectValue.jsx`
- Modify: `src/App.jsx`

- [ ] **Step 1: Delete ProjectValue and update App.jsx**

Delete the file:
```bash
rm src/pages/ProjectValue.jsx
```

Update App.jsx:
- Remove `import ProjectValue from './pages/ProjectValue'` (line 11)
- Remove lines 72-74 (the `if (pageIndex === totalPages - 2)` check for ProjectValue)
- Update `totalPages` calculation to remove the extra +1 for ProjectValue:
  - Change `PATIENT_PAGES.length + DOCTOR_PAGES.length + 3` → `PATIENT_PAGES.length + DOCTOR_PAGES.length + 2`
  - Change `DOCTOR_PAGES.length + PATIENT_PAGES.length + 3` → `DOCTOR_PAGES.length + PATIENT_PAGES.length + 2`
- Update `getMaxPages`:
  - `return PATIENT_PAGES.length + 2` → `return PATIENT_PAGES.length + 1`
  - `return DOCTOR_PAGES.length + 2` → `return DOCTOR_PAGES.length + 1`

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds with no errors, total pages = 9 (was 10)

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: remove ProjectValue page, update App.jsx routing"
```

---

### Task 14: 完整构建 + 部署

**Files:**
- Build: `dist/` (all assets)
- Deploy: gh-pages branch

- [ ] **Step 1: Clean build**

```bash
npm run build
```

Verify: dist/index.html uses `/tooth-fairy-pro/` base path and no errors.

- [ ] **Step 2: Deploy to gh-pages**

```bash
python -c "
import os, shutil
clone = r'C:\Users\Administrator\AppData\Local\Temp\gh-pages-clone'
dist = r'C:\Users\Administrator\tooth-fairy-pro\dist'
for item in os.listdir(clone):
    if item != '.git':
        p = os.path.join(clone, item)
        if os.path.isdir(p): shutil.rmtree(p)
        else: os.remove(p)
for item in os.listdir(dist):
    s = os.path.join(dist, item)
    d = os.path.join(clone, item)
    if os.path.isdir(s): shutil.copytree(s, d)
    else: shutil.copy2(s, d)
print('Done')
"
```

```bash
git -C "C:\Users\Administrator\AppData\Local\Temp\gh-pages-clone" add -A
git -C "C:\Users\Administrator\AppData\Local\Temp\gh-pages-clone" commit -m "deploy: UI upgrade - abstract 3D elements, SVG charts, remove ProjectValue"
git -C "C:\Users\Administrator\AppData\Local\Temp\gh-pages-clone" push origin gh-pages
```

- [ ] **Step 3: Push master with source changes**

```bash
git -C "C:\Users\Administrator\tooth-fairy-pro" push origin master
```

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "chore: final build and deploy for UI upgrade"
```
