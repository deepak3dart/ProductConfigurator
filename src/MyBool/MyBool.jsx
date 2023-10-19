import { useGLTF } from '@react-three/drei'
import { useMemo, useRef, useState } from 'react'
import MaterialMenu from './MaterialMenu'
import { Select } from "@react-three/postprocessing"
import { useControls, folder  } from 'leva'

export default function MyBool() {
    const ref = useRef()
    const [selected, setSelected] = useState(0)  

    const { nodes, materials } = useGLTF(process.env.PUBLIC_URL+'/assets/newcycle.gltf')
    const materialOverrides = useMemo(() => {
        return {
            0: materials.Material_red,
            1: materials.Material_blue,
            2: materials.Material_yellow,
            3: materials.Material_green
        }
    }, [materials])
   
    const config = useControls({
        parts: folder(
          {
              handel: { value: false },
              trolly: { value: false },          
          },
          { collapsed: false },
      ),
  })
    return (
        <>
            <group ref={ref}  dispose={null} >
                <group scale={1}>
                <Select visible={config['all parts']}>
                
                    <mesh  geometry={nodes.Cycle.geometry} material={materialOverrides[selected]} castShadow receiveShadow position={[0, -0.2, 0.2]} />             
                    <Select name="handel" visible={config.handel}>
                        <mesh  geometry={nodes.Handel.geometry} material={materialOverrides[selected]} castShadow receiveShadow position={[0, -0.2, 0.2]} />  
                    </Select>
                    <Select name="trolly" visible={config.trolly}>
                        <mesh  geometry={nodes.Trolly.geometry} material={materialOverrides[selected]} castShadow receiveShadow position={[0, -0.2, 0.2]} />  
                    </Select>
                </Select>
                </group>
            </group>
            <MaterialMenu setSelected={setSelected} />
        </>
    )
}
