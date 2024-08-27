import Login from "./Login"
import Register from "./Register"
import { useState } from "react"

export default function Home() {

    const [login, setLogin] = useState(true)
    const link = !login ? "Login" : "Register"
  
    return (
      <div className="home">
        {
          login ? <Login /> : <Register />
        }
        <a onClick={() => setLogin(prev => !prev)}>{link}</a>
      </div>
    )
}
  