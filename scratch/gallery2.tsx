import * as THREE from 'three'
import styles from "../styles/Gallery.module.css";
import { Layout } from '../components/dom/Layout'

import Arcade from "../components/Arcade";
import SyntheticVision from "../components/SyntheticVision";

import dynamic from 'next/dynamic'
import React, { useRef, useState, useEffect } from 'react'
import { Suspense } from 'react'
import { useRouter } from 'next/navigation'

import { Canvas, useFrame, ThreeElements, useThree, extend } from '@react-three/fiber'

import { useLayoutEffect, useMemo} from 'react'
import { useCursor, Image, MeshPortalMaterial, ScrollControls, useScroll, Gltf, CameraControls, Billboard, Text, Preload, Html, OrbitControls } from '@react-three/drei'


import { useRoute, useLocation } from 'wouter'
import { easing, geometry } from 'maath'
import { suspend } from 'suspend-react'

import FrameSyntheticVision from './../components/FrameSyntheticVision';

//const Scene = dynamic(() => import('./../components/canvas/Scene'), { ssr: false })


function Box(props: ThreeElements['mesh']) {
  const ref = useRef<THREE.Mesh>(null!)
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  useFrame((state, delta) => (ref.current.rotation.x += delta))
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

const View = dynamic(() =>
    import('../components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => (
    <div>
      <svg fill='none' viewBox='0 0 24 24'>
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    </div>
  ),
})

const Logo = dynamic(() => import('../components/canvas/Example').then((mod) => mod.Logo), { ssr: false })
const Dog = dynamic(
    () => import('../components/canvas/Example').then((mod) => mod.Dog),
    { ssr: false })
const Picture: any = dynamic(
    () => import('../components/canvas/Example').then((mod) => mod.Picture),
    { ssr: false })
const Duck = dynamic(() => import('../components/canvas/Example').then((mod) => mod.Duck), { ssr: false })
const Blob = dynamic(() => import('../components/canvas/Example').then((mod) => mod.Blob), { ssr: false })
const SciFiDataPadFbx = dynamic(() => import('../components/canvas/Example').then((mod) => mod.SciFiDataPadFbx), { ssr: false })

const Common = dynamic(() => import('../components/canvas/View').then((mod) => mod.Common), { ssr: false })

extend(geometry)
const regular = import('@pmndrs/assets/fonts/inter_regular.woff')
const medium = import('@pmndrs/assets/fonts/inter_medium.woff')


const FramePicture: any = dynamic(
    () => import('../components/canvas/Example').then((mod) => mod.FramePicture),
    { ssr: false })

/*const Arcade: any = dynamic(
    () => import('./../components/canvas/Example').then((mod) => mod.Arcade),
    { ssr: false })*/

export default function Page() {
   //const [, params] = useRoute('/item/:id')
  //const [, setLocation] = useLocation()
    // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef(null)

  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)

  // Subscribe this component to the render-loop, rotate the mesh every frame
  //useFrame((state, delta) => (ref.current.rotation.x += delta))

  // Return the view, these are regular Threejs elements expressed in JSX
  return (
      <div>
      <main className={styles.main}>
        {/*<Canvas>
          <ambientLight intensity={Math.PI / 2} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
          <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
          <Box position={[-1.2, 0, 0]} />
          <Box position={[1.2, 0, 0]} />
          <Duck route='/blob' scale={2} position={[0, -1.6, 0]}  />
          <Dog  route='/blob' scale={2} position={[0, -1.6, -10]} />
          <Blob  position={[0, -3, -10]} />
          <Picture  position={[-2, -3, -10]} />
           <Common color={'white'} />
        </Canvas>*/}
        <Canvas  camera={{
      fov: 45,
      near: 0.1,
      far: 2000,
      position: [-3, 1.5, 4]
    }}>
           {/**/}
            <color attach="background" args={['#0f0f0f']} />
      <ambientLight intensity={0.5} />

      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />

      <pointLight position={[-10, -10, -10]} />

      <mesh
        ref={ref}
        scale={clicked ? 1.5 : .5}
        onClick={(event) => click(!clicked)}
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}>
          <SyntheticVision />
      </mesh>





        </Canvas>
         {/* <a style={{ position: 'absolute', top: 40, left: 40, fontSize: '13px' }} href="#" onClick={() => setLocation('/')}>
          {params ? '< back' : 'double click to enter portal'}
        </a> */}
      </main>
      </div>
  )
}


function Frame({ id, name, author, bg, width = 1, height = 1.61803398875, children, ...props }) {
  const portal: any = useRef()
  const [, setLocation] = useLocation()
  const [, params] = useRoute('/item/:id')
  const [hovered, hover] = useState(false)
    const router = useRouter()
  useCursor(hovered)
  useFrame((state, dt) => easing.damp(portal.current, 'blend', params?.id === id ? 1 : 0, 0.2, dt))
  return (
    <group {...props}>
      <Text font={suspend(medium).default} fontSize={0.09} anchorY="top" anchorX="left" lineHeight={0.8} position={[-0.375, 0.715, 0.01]} material-toneMapped={false}>
        {name}
      </Text>
      <Text font={suspend(regular).default} fontSize={0.1} anchorX="right" position={[0.4, -0.659, 0.01]} material-toneMapped={false}>
        /{id}
      </Text>
      <Text font={suspend(regular).default} fontSize={0.1} anchorX="right" position={[0.0, -0.677, 0.01]} material-toneMapped={false}>
        {author}
      </Text>

        <mesh name={id} onClick={() => router.push('/live/genuary/jan-' + id)} onDoubleClick={(e) => (e.stopPropagation(), setLocation('/live/genuary/jan-' + e.object.name))} onPointerOver={(e) => hover(true)} onPointerOut={() => hover(false)}>
            <roundedPlaneGeometry args={[width, height, 0.1]} />
            <MeshPortalMaterial ref={portal} events={params?.id === id} side={THREE.DoubleSide}>
              <color attach="background" args={[bg]} />
              {children}
            </MeshPortalMaterial>
          </mesh>
    </group>
  )
}

function Rig({ position = new THREE.Vector3(0, 0, 2), focus = new THREE.Vector3(0, 0, 0) }) {
  const { controls, scene } = useThree()
  const [, params] = useRoute('/item/:id')
  useEffect(() => {
    const active = scene.getObjectByName(params?.id)
    if (active) {
      active.parent.localToWorld(position.set(0, 0.5, 0.25))
      active.parent.localToWorld(focus.set(0, 0, -2))
    }
    controls?.setLookAt(...position.toArray(), ...focus.toArray(), true)
  })
  return <CameraControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
}

function Scene({ children, ...props }) {
  const ref: any = useRef()
  const scroll = useScroll()
  const [hovered, hover]: any = useState(null)
  useFrame((state: any, delta: number) => {
    ref.current.rotation.y = -scroll.offset * (Math.PI * 2) // Rotate contents
    state.events.update() // Raycasts every frame rather than on pointer-move
    easing.damp3(state.camera.position, [-state.pointer.x * 2, state.pointer.y * 2 + 4.5, 9], 0.3, delta)
    state.camera.lookAt(0, 0, 0)
  })
  return (
    <group ref={ref} {...props}>
      <Cards category="Genuary 2025" from={0} len={1} onPointerOver={hover} onPointerOut={hover}
             data={undefined} />
      <ActiveCard hovered={hovered}></ActiveCard>
    </group>
  )
}

function Cards({ category, data, from = 0, len = Math.PI * 2, radius = 5.25, onPointerOver, onPointerOut, ...props }) {
  const [hovered, hover] = useState(null)
  const amount = 13
  const textPosition = from + (amount / 2 / amount) * len
  return (
    <group {...props}>
      <Billboard position={[Math.sin(textPosition) * radius * 1.4, 0.5, Math.cos(textPosition) * radius * 1.4]}>
        <Text fontSize={0.25} anchorX="center" color="white">
          {category}
        </Text>
      </Billboard>
      {Array.from({ length: amount - 3 /* minus 3 images at the end, creates a gap */ }, (_, i) => {
        const angle = from + (i / amount) * len
        return (
          <Card
            key={angle}
            onPointerOver={(e) => (e.stopPropagation(), hover(i), onPointerOver(i))}
            onPointerOut={() => (hover(null), onPointerOut(null))}
            position={[Math.sin(angle) * radius, 0, Math.cos(angle) * radius]}
            rotation={[0, Math.PI / 2 + angle, 0]}
            active={hovered !== null}
            hovered={hovered === i}
            url={`/img/img.png`}
          />
        )
      })}
    </group>
  )
}

function Card({ url, active, hovered, ...props }: { url: string; active: boolean; hovered: boolean }): JSX.Element  {
  const ref:any = useRef()
  useFrame((state, delta) => {
    const f: number = hovered ? 1.4 : active ? 1.25 : 1
    easing.damp3(ref.current.position, [0, hovered ? 0.25 : 0, 0], 0.1, delta)
    easing.damp3(ref.current.scale, [1.618 * f, 1 * f, 1], 0.15, delta)
  })
  return (
    <group {...props}>
      <Image ref={ref} transparent radius={0.075} url={url} scale={[1.618, 1, 1]} side={THREE.DoubleSide} />
    </group>
  )
}

function ActiveCard({ hovered, ...props }: { hovered: number }): JSX.Element {
  const ref: any = useRef()
  const name = useMemo(() => 'Genuary ', [hovered])
  useLayoutEffect(() => void (ref.current.material.zoom = 0.8), [hovered])

  useFrame((state, delta) => {
    easing.damp(ref.current.material, 'zoom', 1, 0.5, delta)
    easing.damp(ref.current.material, 'opacity', hovered !== null, 0.3, delta)
  })

  return (
    <Billboard {...props}>
      <Text fontSize={0.5} position={[2.15, 3.85, 0]} anchorX="left" color="white">
        {hovered !== null && `${name}\n${hovered}`}
      </Text>
      <Image ref={ref} transparent radius={0.3} position={[0, 1.5, 0]} scale={[3.5, 1.618 * 3.5, 0.2, 1]} url={`/img/img.png`} />
    </Billboard>
  )
}