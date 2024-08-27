import "./Login.scss"
import { useReducer } from "react"
import { useNavigate } from "react-router-dom"
import { authLogin } from "./Database"

interface State {
    userName: string;
    password: string;
}

const initArgs: State = {
    userName: "",
    password: ""
}

type Payload = {
    type: string,
    content: string
}

const reducer = (state: State, payload: Payload): State => {
    switch(payload.type){
        case "username":
            return { ...state, userName: payload.content}
        case "password":
            return { ...state, password: payload.content}
        default:
            return state
    }
}

export default function Login(){
    
    const [state, dispatch] = useReducer(reducer, initArgs)

    const navigate = useNavigate()
    
    return(
        <div className="login">
            <h1>Login</h1>
            <form onSubmit={(e) => {
                e.preventDefault()

                const checkLogin = async() => {
                    const isLoggedIn = await authLogin(state.userName, state.password)
                    if(isLoggedIn){ navigate('/products') }
                }

                checkLogin()
            }}>
                <div>
                    <label htmlFor="username">Username: </label>
                    <input 
                        id="username" 
                        required={true}
                        value={state.userName}
                        onChange={(e) => {
                            dispatch({ type: e.target.id, content: e.target.value })
                        }} 
                        type="text" />
                </div><br />

                <div>
                    <label htmlFor="password">Password: </label>
                    <input 
                        id="password" 
                        required={true}
                        value={state.password} 
                        onChange={(e) => {
                            dispatch({ type: e.target.id, content: e.target.value })
                        }} 
                        type="password" />
                </div><br />

                <input type="submit" value="Login" />
            </form>
        </div>
    )
}