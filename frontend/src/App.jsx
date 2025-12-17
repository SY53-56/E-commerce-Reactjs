import { useState } from 'react'

import './App.css'
import { BrowserRouter, Route, } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import Layout from './Layout'
import Home from './pages/Home'
import UserProfile from './pages/UserProfile'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import SignupPage from './pages/signupPage'
import Login from "./pages/LoginPage"
function App() {


  return (
    <>
   
    <Routes>
      <Route element={<Layout/>}>
  <Route path='/' element={<Home/>}/> 
      <Route path='/user' element={<UserProfile/>}/>
       <Route path='/product' element={<ProductDetails/>}/>
        <Route path='/cart' element={<Cart/>}/>
    
      </Route>
          <Route path="/signup" element={<SignupPage/>} />
        <Route  path='/login' element={<Login/>}/>
    </Routes>
    </>
  )
}
//mongodb+srv://yadavsahul220_db_user:3nbDPDJJrNbxs7np@e-commerce.zdvtgge.mongodb.net/?appName=e-commerce
export default App
