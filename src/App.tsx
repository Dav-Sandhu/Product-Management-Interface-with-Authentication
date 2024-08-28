import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './Home'
import Products from './Products'
import AddProduct from './AddProduct'
import { authentication } from './Database'
import { useEffect, useState, ComponentType, FC } from 'react'
import UserProvider, { useUserInfo } from './UserProvider'
import { useNavigate } from 'react-router-dom'

type AuthProps = { component: ComponentType }

const Auth: FC<AuthProps> = ({ component: Component }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const user = useUserInfo()
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = async () => {
      const output = await authentication()

      if (output.flag != "error"){
        user?.setUserInfo({ 
          firstName: output.firstName, 
          lastName: output.lastName, 
          password: output.password, 
          userName: output.userName 
        })

        !isLoggedIn ? setIsLoggedIn(true) : null
      }else{ navigate('/') }
    }

    checkAuth()
  }, [])

  return isLoggedIn ? <Component /> : <Home />
}

function App() {

  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/products" element={<Auth component={Products} />}/>
          <Route path="/add-product" element={<Auth component={AddProduct} />}/>
          <Route path="*" element={<Home />}/>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App
