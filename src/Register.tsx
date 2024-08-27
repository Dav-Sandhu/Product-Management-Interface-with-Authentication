import "./Register.scss"
import { useReducer } from "react"

interface State {
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    reenter: string;
}

const initArgs: State = {
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    reenter: ""
}

type Payload = {
    type: string,
    content: string
}

const reducer = (state: State, payload: Payload): State => {
    switch(payload.type){
        case "firstname":
            return { ...state, firstName: payload.content}
        case "lastname":
            return { ...state, lastName: payload.content}
        case "username":
            return { ...state, userName: payload.content}
        case "password":
            return { ...state, password: payload.content}
        case "reenter":
            return { ...state, reenter: payload.content}
        default:
            return state
    }
}

export default function Register(){

    const [state, dispatch] = useReducer(reducer, initArgs)

    return(
        <div className="register">

            <h1>Register</h1>

            <form onSubmit={(e) => {
                e.preventDefault()
            }}>

                <div>
                    <label htmlFor="firstname">First Name: </label>
                    <input 
                        id="firstname"
                        required={true}
                        value={state.firstName}
                        onChange={(e) => {
                            dispatch({ type: e.target.id, content: e.target.value })
                        }} 
                        type="text" />
                </div><br />

                <div>
                    <label htmlFor="lastname">Last Name: </label>
                    <input 
                        id="lastname"
                        required={true}
                        value={state.lastName}
                        onChange={(e) => {
                            dispatch({ type: e.target.id, content: e.target.value })
                        }} 
                        type="text" />
                </div><br />

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

                <div>
                    <label htmlFor="reenter">Re-Enter Password: </label>
                    <input 
                        id="reenter"
                        required={true} 
                        value={state.reenter} 
                        onChange={(e) => {
                            dispatch({ type: e.target.id, content: e.target.value })
                        }} 
                        type="password" />
                </div><br />

                <input type="submit" value="Register" /><br />
            </form>
        </div>
    )

}