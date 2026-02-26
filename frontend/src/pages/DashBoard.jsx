import React, { useEffect } from "react";
import { LayoutDashboard, Package, Users, PlusCircle } from "lucide-react";
import MenuItem from "../components/dashboard/MenuItem";
import StateCard from "../components/dashboard/StateCard";
import {  useDispatch, useSelector } from "react-redux";
import { userData } from "../features/auth/authThunk";
import Products from "../components/dashboard/Products";
import { allProductShow } from "../features/product/productThunk";
import { useTheme } from "../context/themeContext";
export default function Dashboard() {
  const {products} = useSelector(state=>state.products)
  const {users} = useSelector(state=> state.auth)
  const dispatch= useDispatch()
  const {theme}= useTheme()
  console.log(products)
  console.log("ydtufayfdaoudysauydusadysuydusydusa",products)
 function sortProduct(products = []) {
  return [...products].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
}


const recentProducts = sortProduct(products).slice(0, 4);
 

useEffect(() => {
  if (!products?.length) {
    dispatch(allProductShow({ page: 1, limit: 5 }));
  }
  if (!users?.length) {
    dispatch(userData());
  }
}, [dispatch, products?.length , users?.length]);

  return (
    <div className="min-h-screen w-full flex lg:flex-row gap-8">
      <aside className={`w-72 border-black border hidden lg:flex lg:flex-col  px-10 py-7 ${theme === "dark"?"bg-gray-950":"bg-blue-700"}  text-white h-screen`}>
         <h1 className="text-3xl font-bold text-yellow-500">Admin Panal</h1>
         <div className="mt-10 flex flex-col items-startm gap-5 justify-center">
        <MenuItem icon={<LayoutDashboard/>}  label="DashBord"/>
        <MenuItem icon={<Package/>} label="Products" to="/"/>
        <MenuItem icon={<PlusCircle/> } label="Add products" to="/add"/>
        <MenuItem  icon={<Users/>} label="users"/>
         </div>
      </aside>
      <div className="flex-col w-full flex mt-12 gap-10 px-10 lg:px-28">
        <div className="flex justify-between">
          <h1 className="text-5xl font-bold text-amber-50">DashBoard overview</h1>
          <h1 className="hidden lg:flex">Company Data</h1>
        </div>
        <div className="flex w-full gap-6 justify-between">
          <StateCard title="products" value={products?.length ||0}/>
          <StateCard  title="users" value={users?.length || 0}/>
          <StateCard  title="orders" value="34"/>
           <StateCard  title="category" value="6"/>
        </div>

        <div className="mt-10 bg-white text-black rounded-2xl shadow p-6">
<h2 className="text-xl font-semibold mb-4">Recent Products</h2>
<Products products={recentProducts}/>
</div>
      </div>
      
    </div>
  );
}


