import { Image, Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Group } from 'three'

type TextAndImageProps = {
  publicUrl: string
  description: string
}

// TODO(taiseiklasen) stop prop drillilng.
export default function TextAndImage({
  publicUrl,
  description,
}: TextAndImageProps) {
  const groupRef = useRef<Group>(null!)
  const randomRotationYStart = Math.random() * Math.PI

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    groupRef.current.rotation.set(
      0,
      Math.sin(time * 0.5 + randomRotationYStart) * 0.3,
      0
    )
  })

  return (
    <group ref={groupRef}>
      <Image
        position-y={1}
        position-z={-2}
        transparent
        url={publicUrl}
        scale={4}
      />
      <Text
        position-y={-1}
        color="CornflowerBlue"
        outlineWidth={0.02}
        outlineColor="Khaki"
        anchorX="center"
        anchorY="middle"
        fontSize={0.3}
        maxWidth={3}
      >
        {description}
      </Text>
    </group>
  )
}
