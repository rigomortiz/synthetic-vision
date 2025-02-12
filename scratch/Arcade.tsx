import styles from "../styles/Gallery.module.css";

import { useGLTF, Environment, PresentationControls, Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useMemo, useRef, useState } from 'react'
import { Line, useCursor, MeshDistortMaterial } from '@react-three/drei'
import { useRouter } from 'next/navigation'

export default function Arcade() {
  const arcade = useGLTF('/gltf/wallcomputer/scene.gltf')
	const height = window.innerHeight

  return (
	  <>
	  	<Environment preset="warehouse" />
		  <PresentationControls global polar={[-.4, .2]} azimuth={[-0.4, 0.2]}>
			  <primitive object={arcade.scene} position={[0, 0, 0]}>
			  <Html transform scale={0.5} distanceFactor={1} position={[0,1.5,-2.0]} className={styles.frame}>
                <iframe src={"/live/genuary/jan-01"} scrolling={"no"}/>
            </Html>
			  </primitive>
		  </PresentationControls>
	  </>
  )
}