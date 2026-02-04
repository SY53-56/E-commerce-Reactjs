import React from "react";
import { LayoutDashboard, Package, Users, PlusCircle } from "lucide-react";
import MenuItem from "../components/dashboard/MenuItem";
import StateCard from "../components/dashboard/StateCard";

export default function Dashboard() {
  return (
    <div className="min-h-screen w-full flex gap-8">
      <aside className="w-72 border-black border px-10 py-7 bg-gray-950 text-white h-screen">
         <h1 className="text-3xl font-bold text-yellow-500">Admin Panal</h1>
         <div className="mt-10 flex flex-col items-startm gap-5 justify-center">
        <MenuItem icon={<LayoutDashboard/>}  label="DashBord"/>
        <MenuItem icon={<Package/>} label="Products" to="/"/>
        <MenuItem icon={<PlusCircle/> } label="Add products" to="/add"/>
        <MenuItem  icon={<Users/>} label="users"/>
         </div>
      </aside>
      <div className="flex-col w-full flex mt-12 gap-10 px-28">
        <div className="flex justify-between">
          <h1 className="text-5xl font-bold text-amber-50">DashBoard overview</h1>
          <h1>Company Data</h1>
        </div>
        <div className="flex w-full gap-6 justify-between">
          <StateCard title="products" value="67"/>
          <StateCard  title="users" value="78"/>
          <StateCard  title="orders" value="34"/>
           <StateCard  title="category" value="34"/>
        </div>

        <div className="mt-10 bg-white text-black rounded-2xl shadow p-6">
<h2 className="text-xl font-semibold mb-4">Recent Products</h2>
<table className="w-full text-left">
<thead>
<tr className="border-b">
<th className="py-2">Name</th>
<th>Price</th>
<th>Stock</th>
<th>Category</th>
</tr>
</thead>
<tbody>
{[1,2,3].map((i) => (
<tr key={i} className="border-b text-sm">
<td className="py-2">Sample Product</td>
<td>₹499</td>
<td>12</td>
<td>Electronics</td>
</tr>
))}
</tbody>
</table>
</div>
      </div>
      
    </div>
  );
}


