import "./AddProducts.scss"

import { useReducer } from "react"
import { useNavigate } from "react-router-dom"
import { addProduct } from "./Database"

interface State {
    name: string;
    price: number;
    desc: string;
}

const initArgs: State = {
    name: "",
    price: 0.0,
    desc: ""
}

type Payload = {
    type: string,
    content: string
}

const reducer = (state: State, payload: Payload): State => {
    switch(payload.type){
        case "name":
            return { ...state, name: payload.content}
        case "price":
            const value = parseFloat(payload.content)
            return value >= 0.0 ? { ...state, price: value } : state
        case "desc":
            return { ...state, desc: payload.content}
        default:
            return state
    }
}

export default function AddProduct(){

    const [state, dispatch] = useReducer(reducer, initArgs)

    const navigate = useNavigate()

    return(
        <div className="add-product-page">
            <h1>Add New Product</h1>
            <form onSubmit={async (e) => {
                e.preventDefault()
                const output = await addProduct(state.name, state.price, state.desc)
                if (output.flag == "error"){ alert("oops, something went wrong! please try again.") }
            }}>
                <div>
                    <label htmlFor="name">Name: </label>
                    <input 
                        id="name"
                        required={true}
                        value={state.name}
                        onChange={(e) => {
                            dispatch({ type: e.target.id, content: e.target.value })
                        }} 
                        type="text" />
                </div><br />

                <div>
                    <label htmlFor="price">Price: </label>
                    <input 
                        id="price"
                        required={true}
                        step="0.01"
                        value={state.price}
                        onChange={(e) => {
                            dispatch({ type: e.target.id, content: e.target.value })
                        }} 
                        type="number" />
                </div><br />

                <div>
                    <label htmlFor="desc">Description: </label>
                    <input 
                        id="desc"
                        required={true}
                        value={state.desc}
                        onChange={(e) => {
                            dispatch({ type: e.target.id, content: e.target.value })
                        }} 
                        type="text" />
                </div><br />

                <input type="submit" value="Add" /><br />
            </form>

            <button onClick={() => navigate('/products')}>Return to Products Page</button>
        </div>
    )
}