import Home from "./components/Home.jsx";

const App = () => {
  return(
      <div className='bg-light min-vh-100 w-100 d-flex flex-column justify-content-center align-items-center'>
          <nav className="navbar bg-body-tertiary fixed-top">
              <div className="container-fluid">
                  <span className="navbar-brand mb-0 h1">Translate</span>
              </div>
          </nav>
        <Home/>
      </div>
  )
}
export default App