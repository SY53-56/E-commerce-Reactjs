import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route } from 'react-router'
import { Routes } from 'react-router'
import Layout from './Layout'
import Home from './pages/Home'
import UserProfile from './pages/UserProfile'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   
    <Routes>
      <Route element={<Layout/>}>
  <Route path='/' element={<Home/>}/> 
      <Route path='/user' element={<UserProfile/>}/>
       <Route path='/product' element={<ProductDetails/>}/>
        <Route path='/ cart' element={<Cart/>}/>
      
        
      </Route>
    </Routes>
    </>
  )
}
//mongodb+srv://yadavsahul220_db_user:3nbDPDJJrNbxs7np@e-commerce.zdvtgge.mongodb.net/?appName=e-commerce
export default App
