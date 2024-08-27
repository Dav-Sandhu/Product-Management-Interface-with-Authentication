import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './Home'
import Products from './Products'
import AddProduct from './AddProduct'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/products" element={<Products />}/>
        <Route path="/add-product" element={<AddProduct />}/>
        <Route path="*" element={<Home />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
