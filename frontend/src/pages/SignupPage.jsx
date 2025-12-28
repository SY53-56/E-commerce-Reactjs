import React, { useState } from "react";
import { useTheme } from "../context/themeContext.jsx";
import Button from "../components/Button.jsx"
import { Link, useNavigate } from "react-router-dom";

  import { signupUSer } from "../features/auth/authThunk.js";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";

export default function SignupPage() {
  const [form ,setForm]= useState({
    username:"",
    email:"",
    password:"",
    role:"user",
    phone:""
  })
  const dispatch= useDispatch()
  const { theme } = useTheme();
const navigate= useNavigate()
const {loading, error}= useSelector(state=>state.auth)

   function formHandle(e){
     const {name,value}= e.target
     setForm((prev)=> ({...prev,[name]:value, ...(name ==="role" && value === "user"? {phone:""}:{})}))
   }
  
 

   const formSubmit = useCallback((e)=>{
e.preventDefault(); 
     if (form.role === "admin" && !form.phone) {
    alert("Phone number is required for seller");
    return;
  }
    console.log("form",form)
 dispatch(signupUSer(form)).unwrap()
 .then(()=>  navigate("/"))
 .catch((err) => {
      console.error("Signup failed", err);
    });
   },[form, dispatch, navigate])
 
  

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
            Please signup to your account
          </p>
        </div>
             {loading && <p>loading....</p>}
        {/* Username */}
        <div className="flex flex-col gap-1">
          <label htmlFor="username" className="text-sm font-medium">
            Username
          </label>
          <input
          value={form.username}
           onChange={formHandle}
            id="username"
            type="text"
            name="username"
            placeholder="Enter your username"
            className="rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
          />
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
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            className="rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
          />
        </div>
       <div className="flex flex-col gap-1">
  <label htmlFor="role" className="text-sm font-medium">
    Select Role
  </label>
  <select
    id="role"
    name="role"
    value={form.role}
    onChange={formHandle}
    className="rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition" >
    <option value="user">User</option>
    <option value="admin">Seller</option>
  </select>
   {form.role ==="admin"&&(
      <div className="flex flex-col gap-1">
          <label htmlFor="Number" className="text-sm font-medium">
         [phone NO]
          </label>
          <input
          value={form.phone}
           onChange={formHandle}
            id="Number"
            name="phone"
            type="number"
            placeholder="Enter your phone no"
            className="rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
          />
        </div>
   )}
</div>

      

        {/* Button */}
        <Button type="submit" className="w-full py-2.5 rounded-lg bg-green-600 hover:bg-green-700 transition text-white font-semibold" name={"submit"}/>
          
         {error && <p>{error}</p>}

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          Don’t have an account?{" "}
         <Link to="/login">
          <span className="text-green-600 cursor-pointer hover:underline">
            login
          </span>
         </Link>
        </p>
      </form>
    </div>
  );
}