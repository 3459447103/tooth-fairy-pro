import { useRef, useMemo, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'

const BASE = import.meta.env.BASE_URL
const OBJ_PATH = `${BASE}models/teeth/f525f59b03ed509135282b5c6fe75c56.obj`
const MTL_PATH = `models/teeth/material.mtl`
const TEX_DIR = `${BASE}models/teeth/`

// Module-level caches
let sharedGroup = null
let sharedTextures = null
let loadingPromise = null
let loadError = null

function loadModel() {
  if (sharedGroup) return Promise.resolve(sharedGroup)
  if (loadError) return Promise.reject(loadError)
  if (loadingPromise) return loadingPromise

  loadingPromise = new Promise((resolve, reject) => {
    const mtlLoader = new MTLLoader()
    mtlLoader.setPath(TEX_DIR)
    mtlLoader.load(MTL_PATH, (materials) => {
      materials.preload()
      const objLoader = new OBJLoader()
      objLoader.setMaterials(materials)
      objLoader.load(OBJ_PATH,
        (group) => {
          // Extract PBR textures from material
          const matValues = Object.values(materials.materials)
          const src = matValues[0]
          if (src && !sharedTextures) {
            const texLoader = new THREE.TextureLoader()
            texLoader.setPath(TEX_DIR)
            sharedTextures = {
              map: src.map || texLoader.load('texture_pbr_20250901.webp'),
              roughnessMap: src.roughnessMap || texLoader.load('texture_pbr_20250901_roughness.webp'),
              metalnessMap: src.metalnessMap || texLoader.load('texture_pbr_20250901_metallic.webp'),
              normalMap: src.normalMap || src.bumpMap || texLoader.load('texture_pbr_20250901_normal.webp'),
            }
          }

          // Merge all meshes into one geometry
          const meshList = []
          group.traverse((child) => {
            if (child.isMesh && child.geometry.attributes.position?.count > 0) {
              if (!child.geometry.attributes.normal) {
                child.geometry.computeVertexNormals()
              }
              meshList.push(child)
            }
          })

          // Compute bounding box and auto-center/scale
          const box = new THREE.Box3().setFromObject(group)
          const size = box.getSize(new THREE.Vector3())
          const center = box.getCenter(new THREE.Vector3())
          const maxDim = Math.max(size.x, size.y, size.z, 0.1)
          const autoScale = 1.3 / maxDim

          group.updateMatrixWorld()
          const transformedGeoms = []
          for (const src of meshList) {
            const cloned = src.geometry.clone()
            cloned.applyMatrix4(src.matrixWorld)
            transformedGeoms.push(cloned)
          }

          const mergedGeom = mergeGeometries(transformedGeoms, false)
          for (const g of transformedGeoms) g.dispose()

          const posAttr = mergedGeom.attributes.position
          for (let i = 0; i < posAttr.count; i++) {
            posAttr.setXYZ(
              i,
              (posAttr.getX(i) - center.x) * autoScale,
              (posAttr.getY(i) - center.y) * autoScale,
              (posAttr.getZ(i) - center.z) * autoScale,
            )
          }
          mergedGeom.computeVertexNormals()

          const wrapper = new THREE.Group()
          const mesh = new THREE.Mesh(mergedGeom, new THREE.MeshStandardMaterial({
            map: sharedTextures?.map || null,
            roughnessMap: sharedTextures?.roughnessMap || null,
            metalnessMap: sharedTextures?.metalnessMap || null,
            normalMap: sharedTextures?.normalMap || null,
            normalScale: new THREE.Vector2(0.6, 0.6),
            roughness: 0.22,
            metalness: 0.01,
            color: new THREE.Color('#FFF5EC'),
          }))
          wrapper.add(mesh)
          wrapper.rotation.set(Math.PI / 2, Math.PI / 2, Math.PI / 2)

          sharedGroup = wrapper
          resolve(wrapper)
        },
        undefined,
        (err) => { loadError = err; loadingPromise = null; reject(err) },
      )
    }, undefined, (err) => { loadError = err; loadingPromise = null; reject(err) })
  })

  return loadingPromise
}

// Start loading immediately at module level
loadModel().catch(() => {})

function LoadingFallback() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <torusGeometry args={[0.8, 0.015, 8, 32]} />
      <meshBasicMaterial color="#0A84FF" transparent opacity={0.3} />
    </mesh>
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

export default function ToothModel({
  scale = 1.8,
  rotationY = 0,
  autoRotate = true,
  transparent = false,
  highlightZones = [],
  onReady,
}) {
  const groupRef = useRef()
  const [model, setModel] = useState(() => sharedGroup || null)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (sharedGroup) return
    loadModel()
      .then(g => setModel(g))
      .catch(() => setError(true))
  }, [])

  useEffect(() => {
    if (model && onReady) {
      const t = setTimeout(() => onReady(), 100)
      return () => clearTimeout(t)
    }
  }, [model, onReady])

  useFrame((_, delta) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += delta * 0.3
    }
  })

  if (error) {
    return <LoadingFallback />
  }

  if (!model) {
    return <LoadingFallback />
  }

  return (
    <group ref={groupRef} rotation={[0.2, rotationY, 0]} scale={scale}>
      <primitive object={model.clone()} />

      {transparent && (
        <mesh scale={0.94}>
          <sphereGeometry args={[0.65, 32, 32]} />
          <meshStandardMaterial
            color="#64D2FF"
            roughness={0.1}
            metalness={0}
            transparent
            opacity={0.06}
            emissive="#64D2FF"
            emissiveIntensity={0.1}
            depthWrite={false}
          />
        </mesh>
      )}

      {highlightZones.map((zone, i) => (
        <mesh key={i} position={zone.position} scale={0.15}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color={zone.color || '#FF6B6B'} transparent opacity={0.5} />
        </mesh>
      ))}

      <ScanRing />
    </group>
  )
}
