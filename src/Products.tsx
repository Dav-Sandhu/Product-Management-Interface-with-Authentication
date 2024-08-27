import "./Products.scss"
import { useState, useEffect } from  'react'
import { getProducts, removeProduct } from "./Database"

type Product = {
    _id: string,
    name: string,
    price: number,
    desc: string
}

export default function Products(){
    
    const [productsList, setProductsList] = useState<Product[]>([])

    const updateProducts = async() => {
        const output = await getProducts()
        setProductsList(output)
    }

    useEffect(() => {
        updateProducts()
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
                                <button onClick={async () => {
                                    const output = await removeProduct(p._id)
                                    setProductsList(output)
                                }}>Delete</button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}