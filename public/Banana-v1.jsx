/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 banana-v1.glb --transform 
Files: banana-v1.glb [286.19KB] > /Users/sara/dev/sara/2024/r3f/banana/public/banana-v1-transformed.glb [36.5KB] (87%)
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/banana-v1-transformed.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.banana.geometry} material={materials.skin} rotation={[-Math.PI / 2, 0, 0]} />
    </group>
  )
}

useGLTF.preload('/banana-v1-transformed.glb')
