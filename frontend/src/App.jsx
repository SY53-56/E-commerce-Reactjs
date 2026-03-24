import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { Toaster } from "react-hot-toast";

// ✅ NORMAL (important components)
import Layout from './Layout'
import Home from './pages/Home'
import Login from "./pages/LoginPage"
import SignupPage from './pages/signupPage'

// ✅ LAZY (heavy pages)
const Cart = lazy(() => import("./pages/Cart"))
const ProductPage = lazy(() => import("./pages/ProductPage"))
const DashBoard = lazy(() => import("./pages/DashBoard"))
const SearchPage = lazy(() => import("./pages/SearchPage"))
const Products = lazy(() => import("./pages/ProductsCategoryPage"))
const SaveProductPage = lazy(() => import("./pages/SaveProductPage"))
const UpdateProduct = lazy(() => import("./pages/UpdateProduct"))
const AddProduct = lazy(() => import("./pages/addProduct"))
const UserProfile = lazy(() => import("./pages/UserProfile"))
const ProductDiscountPage = lazy(() => import("./pages/ProductDiscountedPage"))

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
            <Route path="/product/page" element={<ProductDiscountPage />} />
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