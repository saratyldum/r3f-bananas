import * as THREE from 'three'
import { useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useGLTF, Environment } from '@react-three/drei'
import { EffectComposer, DepthOfField } from '@react-three/postprocessing'

function Banana( { z }) {
  const ref = useRef()
  const { nodes, materials } = useGLTF('/banana-v1-transformed.glb')

  const {viewport, camera } = useThree()
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0 , z])

  const [data] = useState({
    x: THREE.MathUtils.randFloatSpread(2),
    y: THREE.MathUtils.randFloatSpread(height),
    rX: Math.random() * Math.PI,
    rY: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI,
  })

  useFrame((state) => {
    ref.current.rotation.set((data.rX += 0.001), (data.rY += 0.002), (data.rZ += 0.002))
    ref.current.position.set((data.x * width), (data.y += 0.025), z)
    if (data.y > height) data.y = -height 
    
  })

  return (
    <mesh 
      ref={ref}
      geometry={nodes.banana.geometry} 
      material={materials.skin} 
      material-emissive="orange"/>
    )
}

export default function App( { count = 200, depth = 80}) {
  return (
    <Canvas camera={{near: 0.01, far: 110, fov: 30}}>
      <color attach="background" args={["#ffbf40"]} />
      <ambientLight intensity={1} />
      <spotLight intensity={60} position={[1, 1, 5]} />
      <Environment preset="sunset" />
      {Array.from({ length: count }, (_, i) => (
        <Banana key={i} z={-(i / count) * depth - 20} />
      ))}
      <EffectComposer>
        <DepthOfField
          target={[0, 0, depth/2]}
          focalLength={0.5}
          bokehScale={7}
          height={700}
        />
      </EffectComposer>
    </Canvas>
  )
}