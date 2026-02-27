import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import Button from '../components/Button';
import { Package2Icon, LayoutDashboard, FormIcon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { allProductShow } from '../features/product/productThunk';
import Card from '../components/Card';
import UserDashboard from '../components/dashboard/userDashboard';
export default function UserProfile() {
const [isActiveTab ,setIsActiveTab ] = useState("product")
  const {user} = useSelector(state => state.auth)
  const { products} = useSelector(state=> state.products)
 const dispatch = useDispatch()
  console.log("user", user)
  console.log("product", products)
  const handleShowDashboard = ()=>{ 
     setIsActiveTab("dashboard")
  }
 
  const handleShowProduct= ()=>{
    setIsActiveTab("product")
  }

  return (
       <section className='w-full px-7 lg:px-20 my-10 flex gap-8'>
          <aside className='w-72 h-screen rounded-md px-6 py-9 bg-gray-950 shadow-lg shadow-gray-600'>
               <div className='flex flex-col items-center'>
                 <h1 className='text-center text-3xl bg-blue-800 rounded-full px-5 py-3'>{user.username.charAt(0)}</h1>
                 <p>{user?.username}</p>
               </div>
               <div className='flex flex-col gap-5 mt-10'>
     <div className='flex w-full gap-2 justify-center cursor-pointer bg-gray-200 py-2 rounded-md text-black hover:bg-gray-400'>
        <Package2Icon/>
          <Button onClick={handleShowProduct} className="" name="product"/>
     </div>
       <div className='flex w-full gap-2 justify-center cursor-pointer bg-gray-200 py-2 rounded-md text-black hover:bg-gray-400'>
        <LayoutDashboard/>
          <Button onClick={handleShowDashboard} className="" name="dashBoard"/>
     </div>
       
             <div className='flex w-full gap-2 justify-center cursor-pointer bg-gray-200 py-2 rounded-md text-black hover:bg-gray-400'>
        <FormIcon/>
          <Button to="/add" className="" name="Add products"/>
     </div>
               </div>
          </aside>
          {isActiveTab === "product" && (
            <main className=''>
                {products.length ===0 ?(<p>there are no product</p>):(<Card products={products} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"/>)}
          </main>
          )}
         {isActiveTab ==="dashboard" && (
           <main>
          <UserDashboard/>
          </main>
         )}
       </section>
  );
}


