const URL: string = import.meta.env.VITE_URL ?? "http://localhost:3000/"

export const authLogin = async(userName: string, password: string): Promise<boolean> => {
    const response = await fetch(URL + 'login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userName, password })
    })
    const output = await response.json()

    if (output.flag == "error"){ 
        alert(output.output)
        return false
    }

    sessionStorage.setItem('token', output.token)

    return true
}

export const authRegister = async(userName: string, password: string, firstName: string, lastName: string): Promise<boolean> => {
    const response = await fetch(URL + 'register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userName, password, firstName, lastName })
    })
    const output = await response.json()

    if (output.flag == "error"){ 
        alert(output.output)
        return false
    }

    sessionStorage.setItem('token', output.token)

    return true
}

export const authentication = async() => {
    
    const token = sessionStorage.getItem('token')
    
    if (token != null){
        const response = await fetch(URL + 'checktoken', {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        })

        const output = await response.json()

        return output
    }

    return { flag: "error" }
}

export const getProducts = async() => {

    const token = sessionStorage.getItem('token')
    
    if (token != null){
        const response = await fetch(URL, {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        })
        const parsedList = await response.json()
    
        if (parsedList.flag != "error"){ return parsedList.output }
        else(alert("something went wrong!"))
    }

    return []
}

export const addProduct = async(name: string, price: number, desc: string) => {

    const token = sessionStorage.getItem('token')

    if (token != null){
        const response = await fetch(URL + 'add', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': token
            },
            body: JSON.stringify({ name, price, desc })
        })

        const data = await response.json()
        console.log(data)
        if (data.flag != "error"){ return data.output }
        else(alert("something went wrong!"))
    }

    return []
}

export const removeProduct = async(_id: string) => {

    const token = sessionStorage.getItem('token')

    if (token != null){
        const response = await fetch(URL + 'remove', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': token
            },
            body: JSON.stringify({ _id })
        })

        const data = await response.json()

        if (data.flag != "error"){ return data.output }
        else(alert("something went wrong!"))
    }

    return []
}