import React, { useEffect, useState } from "react";
import { Menu, Moon, Sun, Search, ShoppingCart, LayoutDashboardIcon, LayoutDashboard, FormIcon , EllipsisVerticalIcon, SaveAllIcon } from "lucide-react";
import Button from "./Button";
import { useTheme } from "../context/themeContext.jsx";
import { NavLink,Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice.js";
import { getCart } from "../features/cart/cartThunk.js";
import Input from "./Input.jsx";

export default function Header({ searchText, setSearchText }) {
  const { theme, toggleTheme } = useTheme();
  const [showMenu, setShowMenu] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const {products} = useSelector((state)=> state.products)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [showItem , setShowItem] = useState(false)
console.log("cart",cart)
console.log("userdata",user)
  const toggleMenuHandler = () => setShowMenu(prev => !prev);

  async function logoutApi() {
    dispatch(logout());
  }

  useEffect(() => {
    if (user) dispatch(getCart());
  }, [dispatch, user]);
  
 const handleItem = ()=>{
  setShowItem(prev => !prev)
 }

  const handleNavigate = ()=>{
    navigate("/search")
  }
  return (
    <header
      className={`flex z-50 justify-between items-center   py-5 px-3 lg:px-20 sticky  border-b transition-colors duration-500
        ${theme === "light" ? "bg-indigo-600 text-white" : "bg-gray-900 text-gray-100"}`}
    >
      {/* Logo + Hamburger */}
      <div className="flex items-center w-full lg:w-auto justify-between">
        <h1 className="font-bold text-3xl lg:text-2xl italic">main mart</h1>
        <Menu onClick={toggleMenuHandler} className="lg:hidden cursor-pointer" size={28} />
      </div>

      {/* Search bar */}
      <div className="hidden lg:flex items-center gap-3 border rounded-lg px-3 py-1 shadow-md w-[400px]">
        <input
          type="text"
          value={searchText}
          name="search"
          onChange={(e) => setSearchText(e.target.value)}
          onClick={handleNavigate}
          placeholder="Search product..."
          className="w-full outline-none px-2 py-1 text-amber-50"
        />
        <Search className="cursor-pointer" size={25} />
      </div>
    
      {/* Actions (Desktop) */}
      <div className="hidden lg:flex items-center gap-4">
        {/* Theme toggle */}
      
        <div onClick={toggleTheme} className="cursor-pointer">

          
          {theme === "light" ? <Moon size={24} /> : <Sun size={24} />}
        </div>
     

      
        {/* Cart + Auth */}
        {user ? (
          <div className="flex items-center gap-4">
  
         
            <NavLink to="/cart" className="relative">
              <ShoppingCart size={28} />
              <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs px-1 rounded-full">
                {cart?.items?.length || 0}
              </span>
            </NavLink>
            <p>{user.username}</p>
            <Button
              onClick={logoutApi}
              className="bg-red-500 px-3 py-1 rounded-lg text-white"
              name="Logout"
            />
          </div>
        ) : (
          <>
            <Button to="/login" className="bg-green-500 px-4 py-2 rounded-lg text-white" name="Login" />
            <Button to="/signup" className="bg-pink-500 px-4 py-2 rounded-lg text-white" name="Signup" />
          </>
        )}
        <  EllipsisVerticalIcon onClick={handleItem}  className="cursor-pointer relative"/>
        {showItem &&
         <div className="border absolute top-20  right-18 w-52 bg-white shadow-2xl  z-[999] rounded-md  h-auto">
    {user && (
      <div className="flex flex-col px-6 py-5"> 
        {user.role ==="admin" &&(<div className="flex flex-col gap-4 text-black"><Link className="flex gap-2 hover:bg-gray-300 px-4 py-1 transition-all duration-500 rounded-lg" to="/add"><FormIcon/> add project</Link>  
             <Link to={`/user/${user.id}`} className="flex gap-2 hover:bg-gray-300 px-4 py-1 rounded-lg transition-all duration-500"> <LayoutDashboardIcon/> Dashboard</Link>
             <Link to={`/saveItem/${user.id}`} className="flex gap-2 hover:bg-gray-300 px-4 py-1 rounded-lg transition-all duration-500" ><SaveAllIcon/> SaveProduct  </Link>
             </div>
             
            )
               
             }
             
             </div>
             
    )}
         </div>
        }
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-2/3 z-40 transform transition-transform duration-500 lg:hidden
          ${showMenu ? "translate-x-0" : "-translate-x-full"}
          ${theme === "light" ? "bg-indigo-600 text-white" : "bg-gray-900 text-gray-100"}
        `}
      >
        <div className="flex flex-col gap-6 p-5">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold">main mart</h1>
          <button onClick={toggleMenuHandler} className="self-end text-2xl font-bold">X</button>
          </div>
     
          <div className="flex items-center gap-2 border rounded-lg bg-white px-2 py-1">
        <Input type="text" name="search" placeholder="search..."    value={searchText}
  onChange={(e) => setSearchText(e.target.value)} className="w-full text-black text-gray-900 focus:ring-gray-900   bg-white fou border-none outline-0 outline-none px-3"/>
            <Search className="text-black" size={22} />
          </div>
        {user &&  <p className="text-2xl font-bold">{user.username}</p>}
          <div className="flex items-center gap-2 cursor-pointer  hover:bg-gray-300  rounded-lg transition-all duration-500" onClick={toggleTheme}>
            {theme === "light" ? <Moon size={22} /> : <Sun size={22} />}
            <span>Toggle Theme</span>
          </div>

       
            <Link to={`/cart`} className="flex items-center gap-2 cursor-pointer  hover:bg-gray-300  rounded-lg transition-all duration-500">
            <ShoppingCart size={22} />
            <span>Cart: {cart?.items?.length || 0}</span>
            </Link>
       
          
          {user ? (
            
            <div className="flex flex-col gap-4">
             
              <Link to={`/user/${user.id}`}  className="flex items-center gap-2  hover:bg-gray-300  rounded-lg transition-all duration-500">
                 <LayoutDashboard size={22}/>
                <p>DashBord</p>
              </Link>
           
           <Link to={"/add"} className="flex items-center gap-2  hover:bg-gray-300  rounded-lg transition-all duration-500">
           <FormIcon/>
           <p>Add product</p>
          
           </Link>
                        <Link to={`/saveItem/${user.id}`} className="flex items-center gap-2 hover:bg-gray-300  rounded-lg transition-all duration-500" ><SaveAllIcon/> SaveProduct  </Link>
              
              <Button onClick={logoutApi} className="bg-red-500 px-4 py-2 rounded-lg text-white" name="Logout" />
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Button to="/login" className="bg-green-500 px-4 py-2 rounded-lg text-white w-full" name="Login" />
              <Button to="/signup" className="bg-pink-500 px-4 py-2 rounded-lg text-white w-full" name="Signup" />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
