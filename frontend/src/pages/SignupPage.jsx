import React, { useState } from "react";
import { useTheme } from "../context/themeContext.jsx";
import Button from "../components/Button.jsx"
import { Link, useNavigate } from "react-router-dom";

  import { signupUSer } from "../features/auth/authThunk.js";
import { useDispatch, useSelector } from "react-redux";
export default function SignupPage() {
  const [form ,setForm]= useState({
    username:"",
    email:"",
    password:""
  })
  const dispatch= useDispatch()
  const { theme } = useTheme();

const navigate= useNavigate()

   function formHandle(e){
     const {name,value}= e.target
     setForm((prev)=> ({...prev,[name]:value}))
   }
  
  function formSubmit(e){
   e.preventDefault(); 
 dispatch(signupUSer(form)).unwrap()
 .then(()=>  navigate("/"))
 .catch((err) => {
      console.error("Signup failed", err);
    });

  console.log("register")

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
            Please signup to your account
          </p>
        </div>

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

        {/* Button */}
        <Button type="submit" className="w-full py-2.5 rounded-lg bg-green-600 hover:bg-green-700 transition text-white font-semibold" name={"submit"}/>
          
        

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