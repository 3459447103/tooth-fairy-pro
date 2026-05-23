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
