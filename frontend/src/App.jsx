

import './App.css'
import { BrowserRouter, Route, } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import Layout from './Layout'
import Home from './pages/Home'
import UserProfile from './pages/UserProfile'

import Cart from './pages/Cart'
import SignupPage from './pages/signupPage'
import Login from "./pages/LoginPage"
import AddProduct from './pages/addProduct'
import UpdateProduct from './pages/UpdateProduct'
import ProductPage from './pages/ProductPage'
import { Toaster } from "react-hot-toast";

import Products from './pages/ProductsCategoryPage'
import DashBoard from './pages/DashBoard'
import SaveProductPage from './pages/SaveProductPage'
import ProdcutDiscountPage from './pages/ProductDiscountedPage'
import SearchPage from './pages/SearchPage'

function App() {



  return (
    <>
      <Toaster position="top-right" />
    <Routes>
      <Route element={<Layout/>}>
       
  <Route path='/' element={<Home/>}/> 
      <Route path='/user' element={<UserProfile/>}/>
        <Route path='/cart' element={<Cart/>}/>
          <Route path='/add' element={<AddProduct/>}/>
          <Route path="/update/:id" element={<UpdateProduct/>}/>
          <Route path="/product/:id" element={<ProductPage/>} />
          <Route path="/product/page" element={<ProdcutDiscountPage/>}/>
          <Route path='/userProfile/:id' element={<UserProfile/>} />
          <Route path='/products/:category' element={<Products/>} />
          <Route path="/user/:id"  element={<DashBoard/>}/>
          <Route path="/saveItem/:id" element={<SaveProductPage/>}/>
          <Route path="/search" element={<SearchPage/>}/>
      </Route>  
          <Route path="/signup" element={<SignupPage/>} />
        <Route  path='/login' element={<Login/>}/>
    </Routes>
    </>
  )
}

export default App
