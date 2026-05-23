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
