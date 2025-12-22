
    import React, { useState } from "react";
    import { useTheme } from "../context/themeContext.jsx";
    import Button from "../components/Button.jsx"
import { Link, useNavigate } from "react-router-dom";

import { useDispatch} from "react-redux";
import { loginUSer } from "../features/auth/authThunk.js";
    

    export default function LoginPage() {
      const { theme } = useTheme();
    
  const [form,setForm]= useState({
    email:"",
    password:""
  })
  const navigate= useNavigate()
  const dispatch=useDispatch()
    const formHandle=(e)=>{
     const {name,value} =e.target
      setForm(prev=>({...prev,[name]:value}))
    }
    const formSubmit=(e)=>{
       e.preventDefault()
       if(!form)return 
       dispatch(loginUSer(form)).unwrap()
       .then(()=> navigate("/"))
   .catch((err) => {
      console.error("login failed", err);
    });

    }
      const themeStyles =
        theme === "light"
          ? "bg-white text-gray-800 border-gray-200"
          : "bg-gray-900 text-white border-gray-700";
    
      return (
        <div className="min-h-screen flex items-center justify-center px-4">
          <form onSubmit={formSubmit}
            className={`w-full max-w-md rounded-2xl border shadow-lg p-6 sm:p-8 space-y-6 transition-colors duration-300 ${themeStyles}`}
          >
            {/* Heading */}
            <div className="text-center space-y-2">
              <h1 className="text-3xl sm:text-4xl font-bold">Welcome Back</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Please login to your account
              </p>
            </div>
    
         
    
            {/* Email */}
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
              value={form.email}
              onChange={formHandle}
              name="email"
                id="email"
                type="email"
                placeholder="Enter your email"
                className="rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              />
            </div>
    
            {/* Password */}
            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <input
              value={form.password}
              onChange={formHandle}
              name="password"
                id="password"
                type="password"
                placeholder="Enter your password"
                className="rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              />
            </div>
    
            {/* Button */}
            <Button type="submit" className="w-full py-2.5 rounded-lg bg-green-600 hover:bg-green-700 transition text-white font-semibold" name={"submit"} />
              
            
    
            {/* Footer */}
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              Don’t have an account?{" "}
             <Link to="/signup">
              <span className="text-green-600 cursor-pointer hover:underline">
                Sign up
              </span>
             </Link>
            </p>
          </form>
        </div>
      );
    }

