import { Canvas as R3FCanvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { r3f } from '../utils/r3f'
import React from 'react'
import { Preload } from '@react-three/drei'

const StarsComponent = React.lazy(() => import('./Stars'))

export default function Canvas() {
  return (
    <R3FCanvas
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
      <color attach="background" args={['black']} />
      <Suspense fallback={null}>
        <StarsComponent />
      </Suspense>
      <r3f.Out />
      <Preload all />
    </R3FCanvas>
  )
}
