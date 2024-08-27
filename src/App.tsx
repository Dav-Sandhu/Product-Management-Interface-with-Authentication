import Login from "./Login"
import Register from "./Register"
import { useState } from "react"

function App() {

  const [login, setLogin] = useState(true)
  const link = !login ? "Login" : "Register"

  return (
    <div className="app">
      {
        login ? <Login /> : <Register />
      }
      <a onClick={() => setLogin(prev => !prev)}>{link}</a>
    </div>
  )
}

export default App
