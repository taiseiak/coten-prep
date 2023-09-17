import cotenLogo from "/cotenLogo.svg"
import "./App.css"

function App() {
  return (
    <>
      <div className="intro flex items-center justify-center h-screen w-screen bg-white fixed inset-0">
        <img
          src={cotenLogo}
          className="h-1/3 w-1/3 animate-slide-out-fwd-center"
          alt="Coten logo"
        />
      </div>
    </>
  )
}

export default App
