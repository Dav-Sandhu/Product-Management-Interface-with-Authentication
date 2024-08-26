import { useReducer } from "react"

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
    
    return(
        <div className="login">
            <form onSubmit={(e) => {
                e.preventDefault()
            }}>
                <label htmlFor="username">Username: </label>
                <input 
                    id="username" 
                    value={state.userName}
                    onChange={(e) => {
                        dispatch({ type: "username", content: e.target.value })
                    }} 
                    type="text" />

                <label htmlFor="password">Password: </label>
                <input 
                    id="password" 
                    value={state.password} 
                    onChange={(e) => {
                        dispatch({ type: "password", content: e.target.value })
                    }} 
                    type="password" />

                <input type="submit" value="Login" />
            </form>
        </div>
    )
}