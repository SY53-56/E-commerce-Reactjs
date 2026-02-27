import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import Button from '../components/Button';
import { Package2Icon, LayoutDashboard, PlusCircle, UserCircle } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { allProductShow } from '../features/product/productThunk';
import Card from '../components/Card';
import UserDashboard from '../components/dashboard/userDashboard';

export default function UserProfile() {
  const [isActiveTab, setIsActiveTab] = useState("product")
  const { user } = useSelector(state => state.auth)
  const { products } = useSelector(state => state.products)

  const userProducts = products.filter(item => item.userAdmin?._id === user?.id)

  // Function to determine styles for the nav wrapper
  const getNavWrapperClass = (tab) => `
    flex items-center w-full gap-3 px-4 py-2 rounded-lg cursor-pointer transition-all duration-300
    ${isActiveTab === tab 
      ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
      : 'bg-transparent text-gray-400 hover:bg-gray-800 hover:text-gray-100'}
  `;

  return (
    <section className='min-h-screen w-full flex bg-[#0f1115] text-gray-100'>
      {/* Sidebar */}
      <aside className='w-80 border-r border-gray-800 bg-gray-950 px-6 py-10 flex flex-col'>
        
        {/* User Profile Header */}
        <div className='flex flex-col items-center mb-12'>
          <div className='w-20 h-20 flex items-center justify-center text-3xl font-bold bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-xl mb-4 border border-blue-400/20'>
            {user?.username?.charAt(0).toUpperCase()}
          </div>
          <h2 className='text-xl font-semibold tracking-tight'>{user?.username}</h2>
          <p className='text-sm text-gray-500'>Seller Account</p>
        </div>

        {/* Navigation */}
        <nav className='flex flex-col gap-4 flex-1'>
          
          <div className={getNavWrapperClass("product")} onClick={() => setIsActiveTab("product")}>
            <Package2Icon size={20} />
            <Button 
               className="bg-transparent border-none p-0 hover:bg-transparent text-inherit font-medium capitalize" 
               name="My Products" 
            />
          </div>

          <div className={getNavWrapperClass("dashboard")} onClick={() => setIsActiveTab("dashboard")}>
            <LayoutDashboard size={20} />
            <Button 
               className="bg-transparent border-none p-0 hover:bg-transparent text-inherit font-medium capitalize" 
               name="Dashboard" 
            />
          </div>

          <div className="mt-4 pt-4 border-t border-gray-800">
            <Link to="/add" className='flex items-center gap-3 px-4 py-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-all'>
              <PlusCircle size={20} />
              <span className='font-medium'>Add New Product</span>
            </Link>
          </div>
        </nav>

        {/* Bottom decorative element */}
        <div className='bg-blue-600/10 p-4 rounded-xl border border-blue-500/20'>
          <p className='text-xs text-blue-400 text-center font-medium'>Logged in as Admin</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className='flex-1 p-10 bg-gray-900/50 overflow-y-auto'>
        <div className='max-w-6xl mx-auto'>
          <header className='mb-10'>
             <h1 className='text-4xl font-bold mb-2'>
               {isActiveTab === "product" ? "Product Inventory" : "Account Analytics"}
             </h1>
             <div className='h-1 w-20 bg-blue-600 rounded-full'></div>
          </header>

          <div className='bg-gray-950/50 border border-gray-800 rounded-3xl p-8 min-h-[60vh]'>
            {isActiveTab === "product" && (
              <div>
                {userProducts.length === 0 ? (
                  <div className='flex flex-col items-center justify-center py-20 text-gray-600'>
                    <Package2Icon size={60} strokeWidth={1} className='mb-4 opacity-20' />
                    <p className='text-xl'>Your shop is currently empty.</p>
                  </div>
                ) : (
                  <Card 
                    products={userProducts} 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  />
                )}
              </div>
            )}

            {isActiveTab === "dashboard" && <UserDashboard />}
          </div>
        </div>
      </main>
    </section>
  )
}