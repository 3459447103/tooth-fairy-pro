import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function ToothGeometry() {
  const shape = useMemo(() => {
    const points = []
    // Crown profile - tooth shape
    for (let i = 0; i <= 32; i++) {
      const t = i / 32
      const angle = t * Math.PI * 2
      // Create tooth-like cross section with varied radius
      let r
      const a = angle % (Math.PI * 2)
      if (a < Math.PI * 0.4) r = 0.45 + Math.sin(a * 2.5) * 0.08
      else if (a < Math.PI * 0.8) r = 0.48 + Math.sin(a * 3) * 0.06
      else if (a < Math.PI * 1.3) r = 0.44 + Math.cos(a * 2.8) * 0.07
      else if (a < Math.PI * 1.7) r = 0.47 + Math.sin(a * 3.2) * 0.05
      else r = 0.46 + Math.cos(a * 2.6) * 0.06
      points.push(new THREE.Vector2(Math.cos(angle) * r, Math.sin(angle) * r))
    }

    const curvePath = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -0.55, 0),
      new THREE.Vector3(0, -0.35, 0),
      new THREE.Vector3(0, -0.1, 0),
      new THREE.Vector3(0, 0.05, 0),
      new THREE.Vector3(0, 0.2, 0),
      new THREE.Vector3(0, 0.4, 0),
      new THREE.Vector3(0, 0.55, 0),
    ])

    const spine = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -0.55, 0),
      new THREE.Vector3(0.04, -0.3, 0.02),
      new THREE.Vector3(0.02, 0, 0.01),
      new THREE.Vector3(-0.02, 0.3, -0.01),
      new THREE.Vector3(0, 0.55, 0),
    ])

    const geometry = new THREE.BufferGeometry()
    const segments = 48
    const rings = 40
    const vertices = []
    const normals = []
    const indices = []

    // Scale function: crown (upper part) is wider, root (lower) tapers
    const getScale = (y) => {
      const t = (y + 0.55) / 1.1 // 0 at bottom, 1 at top
      if (t < 0.25) return 0.35 + t * 1.2 // root
      if (t < 0.5) return 0.65 + (t - 0.25) * 3.2 // transition
      if (t < 0.75) return 1.05 + Math.sin((t - 0.5) * Math.PI * 2) * 0.08 // crown
      return 0.9 - (t - 0.75) * 1.6 // tip
    }

    for (let ring = 0; ring <= rings; ring++) {
      const ringT = ring / rings
      const y = -0.55 + ringT * 1.1
      const spinePt = spine.getPointAt(ringT)
      const scale = getScale(y)

      for (let seg = 0; seg <= segments; seg++) {
        const segT = seg / segments
        const angle = segT * Math.PI * 2
        const px = Math.cos(angle) * scale * 0.5
        const pz = Math.sin(angle) * scale * 0.5

        vertices.push(spinePt.x + px, y, spinePt.z + pz)
        normals.push(Math.cos(angle), 0.15, Math.sin(angle))
      }
    }

    for (let ring = 0; ring < rings; ring++) {
      for (let seg = 0; seg < segments; seg++) {
        const a = ring * (segments + 1) + seg
        const b = a + segments + 1
        indices.push(a, b, a + 1)
        indices.push(b, b + 1, a + 1)
      }
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3))
    geometry.setIndex(indices)
    geometry.computeVertexNormals()

    return geometry
  }, [])

  return <primitive object={shape} attach="geometry" />
}

export default function ToothModel({ scale = 1.8, rotationY = 0, autoRotate = true, transparent = false, highlightZones = [] }) {
  const groupRef = useRef()

  useFrame((_, delta) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += delta * 0.3
    }
  })

  return (
    <group ref={groupRef} rotation={[0.2, rotationY, 0]} scale={scale}>
      {/* Main tooth body */}
      <mesh>
        <ToothGeometry />
        <meshPhysicalMaterial
          color={transparent ? "#ffffff" : "#f8fafc"}
          roughness={transparent ? 0.05 : 0.18}
          metalness={0.02}
          clearcoat={0.3}
          clearcoatRoughness={0.2}
          transparent={transparent}
          opacity={transparent ? 0.35 : 1}
          envMapIntensity={0.5}
        />
      </mesh>

      {/* Inner glow layer */}
      <mesh scale={0.94}>
        <ToothGeometry />
        <meshPhysicalMaterial
          color="#64D2FF"
          roughness={0.1}
          metalness={0}
          transparent
          opacity={0.08}
          emissive="#64D2FF"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Highlight zones */}
      {highlightZones.map((zone, i) => (
        <mesh key={i} position={zone.position} scale={0.15}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color={zone.color || "#FF6B6B"} transparent opacity={0.5} />
        </mesh>
      ))}

      {/* Scanning ring */}
      <ScanRing />
    </group>
  )
}

function ScanRing() {
  const ringRef = useRef()

  useFrame((_, delta) => {
    if (ringRef.current) {
      ringRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.5
      ringRef.current.material.opacity = 0.3 + Math.sin(Date.now() * 0.003) * 0.2
    }
  })

  return (
    <mesh ref={ringRef} position={[0, 0, 0]}>
      <torusGeometry args={[0.56, 0.008, 16, 64]} />
      <meshBasicMaterial color="#0A84FF" transparent opacity={0.4} />
    </mesh>
  )
}
