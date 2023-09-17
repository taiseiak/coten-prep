import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import UserPage from './pages/UserPage'
import cotenLogo from '/cotenLogo.svg'

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

function App() {
  return <RouterProvider router={router} />
}

export default App

function DefaultPage() {
  return (
    <>
      <main>
        <section className="intro fixed inset-0 flex h-screen w-screen animate-slide-out-top items-center justify-center bg-white">
          <img
            src={cotenLogo}
            className="h-1/3 w-1/3 animate-slide-out-fwd-center"
            alt="Coten logo"
          />
        </section>
        <section className="bg-white dark:bg-slate-700">
          <div className="mx-auto grid max-w-screen-xl px-4 py-8">
            <div className="mr-auto place-self-center">
              <h1 className="max-w-2xl text-4xl font-extrabold leading-none text-sky-400 dark:text-slate-200">
                Yozora
              </h1>
              <p className="max-w-2xl">See a sky full of memories</p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
