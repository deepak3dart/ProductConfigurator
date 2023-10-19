import { Hud, OrthographicCamera, Environment } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import Button from '../Button'

export default function MaterialMenu({ setSelected }) {
  const texture = useLoader(TextureLoader, [
    process.env.PUBLIC_URL+'/assets/Cycle_Red-Cycle_Opacity.png',
     process.env.PUBLIC_URL+'/assets/Cycle_BaseColor-Cycle_Opacity.png',
     process.env.PUBLIC_URL+'/assets/Cycle_Yellow-Cycle_Opacity.png',
     process.env.PUBLIC_URL+'/assets/Cycle_Green-Cycle_Opacity.png',
  ])
  return (
    <Hud>
      <OrthographicCamera makeDefault position={[0, 3, 2]} zoom={50} />
      <Environment preset="forest" />
      <Button id={0} color={0xff0000} position={[-5, -4.5, 0]} roughness={0.2}  setSelected={setSelected} />
      <Button id={1} color={0x0000ff} position={[-2.5, -4.5, 0]} roughness={0.2} setSelected={setSelected} />
      <Button id={2} color={0xffff00} position={[-0, -4.5, 0]} roughness={0.2} setSelected={setSelected} />
      <Button id={3} color={0x00ff33} position={[2.5, -4.5, 0]} roughness={0.2} setSelected={setSelected} />
            
    </Hud>
  )
}