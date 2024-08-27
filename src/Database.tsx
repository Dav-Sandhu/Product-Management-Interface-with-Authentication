const URL: string = import.meta.env.VITE_URL ?? "http://localhost:3000/"

export const getProducts = async() => {
    const response = await fetch(URL)
    const parsedList = await response.json()

    if (parsedList.flag != "error"){ return parsedList.output }
    else(alert("something went wrong!"))

    return []
}

export const addProduct = async(name: string, price: number, desc: string) => {
    const response = await fetch(URL + 'add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, price, desc })
    })

    const data = await response.json()

    if (data.flag != "error"){ return data.output }
    else(alert("something went wrong!"))

    return []
}

export const removeProduct = async(_id: string) => {
    const response = await fetch(URL + 'remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ _id })
    })

    const data = await response.json()

    if (data.flag != "error"){ return data.output }
    else(alert("something went wrong!"))

    return []
}