import { Stars as DreiStars } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { ScrollTicker } from './Scroll'

export default function Stars() {
  return (
    <Canvas
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: -99,
      }}
    >
      <ScrollTicker />
      <Suspense fallback={null}>
        <DreiStars />
      </Suspense>
    </Canvas>
  )
}
