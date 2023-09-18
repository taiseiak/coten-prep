import { Link, RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import UserPage from './pages/UserPage'
import { Provider } from 'urql'
import { client } from './utils/createUrqlClient'
import React from 'react'

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

const Canvas = React.lazy(() => import('./components/Canvas'))

function App() {
  return (
    <Provider value={client}>
      <div className="relative h-full w-full overflow-auto touch-auto">
        <RouterProvider router={router} />
      </div>
      <Canvas />
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
