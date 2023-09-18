import { Preload } from '@react-three/drei'
import { Canvas as R3FCanvas } from '@react-three/fiber'
import { default as React, Suspense, useRef } from 'react'
import { Link, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from 'urql'
import { r3f } from './utils/r3f'
import './App.css'
import UserPage from './pages/UserPage'
import { client } from './utils/createUrqlClient'

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultPage />,
  },
  {
    path: ':userId',
    element: <UserPage />,
  },
])

const StarsComponent = React.lazy(() => import('./components/Stars'))

function App() {
  const ref = useRef(null!)
  return (
    <Provider value={client}>
      <div
        ref={ref}
        className="relative h-full w-full overflow-auto touch-auto"
      >
        <RouterProvider router={router} />
      </div>
      <Suspense fallback={null}>
        <StarsComponent />
      </Suspense>
      <R3FCanvas
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: -90,
        }}
        eventSource={ref}
        eventPrefix="client"
      >
        <Suspense fallback={null}>
          <r3f.Out />
          <Preload all />
        </Suspense>
      </R3FCanvas>
    </Provider>
  )
}

export default App

function DefaultPage() {
  return (
    <>
      <main>
        <section className="intro fixed inset-0 flex h-screen w-screen animate-slide-out-top items-center justify-center bg-black">
          <h1 className="animate-slide-out-fwd-center max-w-2xl text-4xl font-extrabold leading-none text-slate-200">
            Yozora
          </h1>
        </section>
        <section>
          <div className="mx-auto grid max-w-screen-xl px-4 py-8">
            <div className="mr-auto place-self-center">
              <h1 className="max-w-2xl text-4xl font-extrabold leading-none text-slate-200">
                Yozora
              </h1>
              <p className="max-w-2xl text-slate-200">
                See a sky full of memories
              </p>
              <Link to="/taisei" className="max-w-2xl text-sky-400">
                To Taisei's page
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
