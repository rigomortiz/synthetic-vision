import styles from "../styles/Gallery.module.css";

import { useGLTF, Environment, PresentationControls, Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useMemo, useRef, useState } from 'react'
import { Line, useCursor, MeshDistortMaterial } from '@react-three/drei'
import { useRouter } from 'next/navigation'

export default function SynteticVision() {
  const brain = useGLTF('/gltf/crt_computer_monitor/crt_computer_monitor.glb')

  return (
	  <>
	  	<Environment preset="warehouse" />
		  <PresentationControls global >
			  <primitive object={brain.scene} position={[0, 0, 0]} scale={[7,7,7]}>
			  <Html transform scale={0.1} distanceFactor={1} position={[-.10,0,0]} className={styles.frame}>
                <iframe className={styles.frame} src={"/gallery"} />
            </Html>
			  </primitive>
		  </PresentationControls>
	  </>
  )
}