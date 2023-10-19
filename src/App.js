import './App.css';
import { Canvas, } from '@react-three/fiber';
import { AccumulativeShadows, RandomizedLight, Environment, CameraControls, Grid, Html, Center } from "@react-three/drei";
//import { EffectComposer, SSAO, SMAA, Selection, Outline } from "@react-three/postprocessing";
import { Suspense,useRef, memo,  useState } from 'react'
import { useControls, button } from 'leva'
import MyBool from './MyBool/MyBool'
import annotations from './annotations.json'

export default function App() {

  const ref = useRef()
  const [lerping, setLerping] = useState(false)
  const [to, setTo] = useState()
  const [target, setTarget] = useState()
  const [selected, setSelected] = useState(-1)
  function gotoAnnotation(idx) {
    setTo(annotations[idx].camPos)
    setTarget(annotations[idx].lookAt)
    setSelected(idx)
    setLerping(true)
  }
  return (
     <Suspense fallback={null}>
      <Canvas id="mycanvas" shadows camera={{ position: [1.2, -.15, 0.55], fov: 70, near: .1, far: 20 }}>
        <Scene />
      </Canvas>
      <Buttons gotoAnnotation={gotoAnnotation} />
    </Suspense>
  )
}

function Scene() {
  const cameraControlsRef = useRef()
  const { enabled } = useControls({
    'camera reset': button(() => cameraControlsRef.current?.reset(true)),
    enabled: { value: true, label: 'controls on' }

  })

  return (
    <>
      
      <group position-y={-0.5}>
        <Center top>
          <MyBool />       
        </Center>
        <Ground />
        <Shadows />
        <CameraControls
          ref={cameraControlsRef}
          enabled={enabled}
        />
        <Environment preset="city" />
      </group>

    </>
  )
}


function Ground() {
  const gridConfig = {
    cellSize: 0.5,
    cellThickness: 0.5,
    cellColor: '#6f6f6f',
    sectionSize: 3,
    sectionThickness: 1,
    sectionColor: '#9d4b4b',
    fadeDistance: 30,
    fadeStrength: 1,
    followCamera: false,
    infiniteGrid: true
  }
  return <Grid position={[0, -0.01, 0]} args={[10.5, 10.5]} {...gridConfig} />
}

const Shadows = memo(() => (
  <AccumulativeShadows temporal frames={100} color="#9d4b4b" colorBlend={0.5} alphaTest={0.9} scale={20}>
    <RandomizedLight amount={8} radius={4} position={[5, 5, -10]} />
  </AccumulativeShadows>
))

function Buttons({ gotoAnnotation }) {
  return (
    <div id="annotationsPanel">
      <ul>
        {annotations.map((a, i) => {
          return (
            <li key={i}>
              <button key={i} className="annotationButton" onClick={() => gotoAnnotation(i)}>
                {a.title}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
function Annotations({ selected, gotoAnnotation }) {
  return (
    <>
      {annotations.map((a, i) => {
        return (
          <Html key={i} position={[a.lookAt.x, a.lookAt.y, a.lookAt.z]}>
            <svg height="34" width="34" transform="translate(-16 -16)" style={{ cursor: 'pointer' }}>
              <circle cx="17" cy="17" r="16" stroke="white" strokeWidth="2" fill="rgba(0,0,0,.66)" onClick={() => gotoAnnotation(i)} />
              <text x="12" y="22" fill="white" fontSize={17} fontFamily="monospace" style={{ pointerEvents: 'none' }}>
                {i + 1}
              </text>
            </svg>
            {a.description && i === selected && (
              <div id={'desc_' + i} className="annotationDescription" dangerouslySetInnerHTML={{ __html: a.description }} />
            )}
          </Html>
        )
      })}
    </>
  )
}