import React from "react";
import { LayoutDashboard, Package, Users, PlusCircle } from "lucide-react";
import MenuItem from "../components/dashboard/MenuItem";

export default function Dashboard() {
  return (
    <div className="min-h-screen ">
      <aside className="w-72 border-black border px-10 py-7 bg-gray-950 text-white h-screen">
         <h1 className="text-3xl font-bold text-yellow-500">Admin Panal</h1>
         <div className="mt-10 flex flex-col items-startm gap-5 justify-center">
        <MenuItem icon={<LayoutDashboard/>}  label="DashBord"/>
        <MenuItem icon={<Package/>} label="Products"/>
        <MenuItem icon={<PlusCircle/> } label="Add products"/>
        <MenuItem  icon={<Users/>} label="users"/>
         </div>
      </aside>
      <div>
        <h1 className="text-3xl text-amber-50">DashBoard</h1>
      </div>
    </div>
  );
}


