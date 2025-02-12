import * as THREE from 'three'
import styles from "../styles/Gallery.module.css";
import React, { Suspense, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, Environment, useGLTF, ContactShadows, OrbitControls } from '@react-three/drei'
import Hydra from 'hydra-synth'

import GalleryPage from "../pages/gallery";

function Model(props) {
  const group = useRef()
  // Load model
  const { nodes, materials } = useGLTF('/gltf/surveillance_room-transformed.glb')
  // Make it float
  /*useFrame((state) => {
    const t = state.clock.getElapsedTime()
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, Math.cos(t / 2) / 20 + 0.25, 0.1)
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, Math.sin(t / 4) / 20, 0.1)
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, Math.sin(t / 8) / 20, 0.1)
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, (-2 + Math.sin(t / 2)) / 2, 0.1)
  })*/
  // @ts-ignore
    return (
    <group ref={group} {...props} dispose={null}>
      <group rotation-x={0} position={[0, 0, 0]}>
          <group position={[0, 0, 0]} rotation={[0, 0, 0]}>
              <mesh geometry={nodes.Object_4.geometry} material={materials.material} position={[2.09, -0.853, 2.109]} scale={0.192} />
              <mesh geometry={nodes.Object_6.geometry} material={materials.Shading2_cables} position={[2.09, -0.853, 2.109]} scale={0.192} />
              <mesh geometry={nodes.Object_10.geometry} material={materials.Shading1} position={[2.09, -0.853, 2.109]} scale={0.192} />
              <mesh geometry={nodes.Object_13.geometry} material={materials.Lumires} position={[2.09, -0.853, 2.109]} scale={0.192} />
{/*
        <group position={[0, -5, 0]} rotation={[0, 0, 0]}>
            <mesh geometry={nodes.CRT_Monitor_monitor_glass_0.geometry}
                  material={materials.monitor_glass}
                position={[0, 0,0]}
                scale={[1, 1, 1]}
                rotation={[Math.PI / 2, 0, 0]}>
                <Html className={styles.content} rotation-x={-Math.PI / 2} position={[0, 0, -7]} transform occlude>
                  <div className={styles.wrapper} onPointerDown={(e) => e.stopPropagation()}>
                    <GalleryPage/>
                  </div>
                </Html>
            </mesh>
            <mesh geometry={nodes.CRT_Monitor_monitor_plastic_0.geometry}
                  material={materials.monitor_plastic}
                  scale={[7, 7, 7]}
                  position={[0, 0, 0]}
                  rotation={[-Math.PI / 2, 0, 0]} />
        </group>
*/}
          </group>
      </group>
    </group>
  )
}

export default function Page() {

  return (
      <div>
      <main className={styles.main}>
        <Canvas camera={{ position: [0, -10, 0], }}>
            <pointLight position={[10, 10, 10]} intensity={1.5} />
            <Suspense fallback={null}>
            <group rotation={[0, 0, 0]} position={[0, 0, 0]}>
                <Model />
            </group>
            <Environment preset="city" />
            </Suspense>
            <ContactShadows position={[0, -4.5, 0]} scale={20} blur={2} far={4.5} />
            <OrbitControls enablePan={false} enableZoom={true} minPolarAngle={Math.PI / 2.2} maxPolarAngle={Math.PI / 2.2} />
        </Canvas>
      </main>
      </div>
  )
}

