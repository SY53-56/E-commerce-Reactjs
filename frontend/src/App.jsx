import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { Toaster } from "react-hot-toast";

// ✅ NORMAL (important components)
import Layout from './Layout'
import Home from './pages/Home'
import Login from "./pages/LoginPage"
import SignupPage from './pages/SignupPage'
import OrderPage from './pages/OrderPage';

// ✅ LAZY (heavy pages)
const Cart = lazy(() => import("./pages/Cart.jsx"))
const ProductPage = lazy(() => import("./pages/ProductPage.jsx"))
const DashBoard = lazy(() => import("./pages/DashBoard.jsx"))
const SearchPage = lazy(() => import("./pages/SearchPage.jsx"))
const Products = lazy(() => import("./pages/ProductsCategoryPage.jsx"))
const SaveProductPage = lazy(() => import("./pages/SaveProductPage.jsx"))
const UpdateProduct = lazy(() => import("./pages/UpdateProduct.jsx"))
const AddProduct = lazy(() => import("./pages/AddProduct.jsx"))
const UserProfile = lazy(() => import("./pages/UserProfile.jsx"))


function App() {
  return (
    <>
      <Toaster position="top-right" />

      {/* ✅ Suspense wraps only routes */}
      <Suspense
        fallback={
          <div className="w-full h-screen flex items-center justify-center text-xl">
            Loading page...
          </div>
        }
      >
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<Home />} />

            <Route path='/cart' element={<Cart />} />
            <Route path='/product/:id' element={<ProductPage />} />
            <Route path='/products/:category' element={<Products />} />
            <Route path='/search' element={<SearchPage />} />

            <Route path='/user/:id' element={<DashBoard />} />
            <Route path='/userProfile/:id' element={<UserProfile />} />
            <Route path='/saveItem/:id' element={<SaveProductPage />} />

            <Route path='/add' element={<AddProduct />} />
            <Route path="/update/:id" element={<UpdateProduct />} />
      
            <Route  path='/product/order/:id' element={<OrderPage/>}/>
          </Route>

          {/* auth routes (not lazy for better UX) */}
          <Route path="/signup" element={<SignupPage />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App