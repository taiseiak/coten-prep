import { Stars as DreiStars } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'

export default function Stars() {
  return (
    <Canvas
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: -99,
      }}
    >
      <Suspense fallback={null}>
        <DreiStars />
      </Suspense>
    </Canvas>
  )
}
