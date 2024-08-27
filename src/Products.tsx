import "./Products.scss"
import { useState, useEffect } from  'react'

type Product = {
    name: String,
    price: Number,
    desc: String
}

export default function Products(){
    
    const [productsList, setProductsList] = useState<Product[]>([])

    useEffect(() => {
        setProductsList([
            {
                name: "Watch", 
                price: 20.55,
                desc: "it's a watch"
            },
            {
                name: "Camera", 
                price: 53.42,
                desc: "it's a camera"
            },
            {
                name: "Watch", 
                price: 20.55,
                desc: "it's a watch"
            },
            {
                name: "Watch", 
                price: 20.55,
                desc: "it's a watch"
            },
            {
                name: "Watch", 
                price: 20.55,
                desc: "it's a watch"
            },
            {
                name: "Watch", 
                price: 20.55,
                desc: "it's a watch"
            },
            {
                name: "Watch", 
                price: 20.55,
                desc: "it's a watch"
            },
            {
                name: "Watch", 
                price: 20.55,
                desc: "it's a watch"
            },
            {
                name: "Watch", 
                price: 20.55,
                desc: "it's a watch"
            },
        ])
    }, [])

    return(
        <div className="products-page">
            <h1>Products List</h1>
            <div className="products">
                {
                    productsList.map((p, index) => {
                        return(
                            <div className="product" key={index}>
                                <h2>{p.name}</h2>
                                <p>Price: ${p.price.toFixed(2)}</p>
                                <p>{p.desc}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}