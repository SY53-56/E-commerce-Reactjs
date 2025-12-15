import React, { useState } from "react";
import { Menu, Moon, Sun, Search, ShoppingCart } from "lucide-react";
import Button from "./Button";
import { useTheme } from "../context/themeContext.jsx";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenuHandler = () => setShowMenu(prev => !prev);

  return (
    <header
      className={`flex justify-between items-center px-5 py-3 border-b-2 transition-colors duration-500
        ${theme === "light" ? "bg-gray-200 text-black" : "bg-gray-950 text-white"}`}
    >
      {/* Logo + Hamburger */}
      <div className="flex items-center w-full lg:w-auto justify-between">
        <h1 className="font-bold text-3xl lg:text-2xl italic">main mart</h1>
        <Menu
          onClick={toggleMenuHandler}
          className="lg:hidden cursor-pointer"
          size={28}
        />
      </div>

      {/* Search bar */}
      <div className="hidden lg:flex items-center gap-3 border px-2 rounded-lg w-[400px] shadow-md">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-2 py-1 outline-none text-indigo-500"
        />
        <Search className="cursor-pointer" size={25} />
      </div>

      {/* Actions (Desktop) */}
      <div className="hidden lg:flex items-center gap-3">
        {/* Theme toggle */}
        <div
          onClick={toggleTheme}
          className="cursor-pointer transition-transform duration-300"
        >
          {theme === "light" ? <Moon size={24} /> : <Sun size={24} />}
        </div>

        {/* Cart */}
        <div className="relative cursor-pointer">
          <ShoppingCart size={28} />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
            0
          </span>
        </div>

        {/* Auth buttons */}
        <Button classname="bg-green-800 px-4 py-2 rounded-lg text-white" name="Login" />
        <Button classname="bg-red-500 px-4 py-2 rounded-lg text-white" name="Signup" />
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed top-0 left-0     ${theme === "light" ? "bg-gray-200 text-black" : "bg-gray-950 text-white"} z-40 h-full w-2/3  transform transition-transform duration-500 lg:hidden
          ${showMenu ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col gap-5 p-5">
          {/* Close menu button */}
          <button onClick={toggleMenuHandler} className="self-end text-2xl font-bold">
            X
          </button>

          {/* Search */}
          <div className="flex items-center gap-2 border rounded-lg px-2 py-1">
            <input
              type="text"
              placeholder="Search"
              className="w-full outline-none text-black"
            />
            <Search size={22} />
          </div>

          {/* Theme toggle */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={toggleTheme}>
            {theme === "light" ? <Moon size={22} /> : <Sun size={22} />}
            <span>Toggle Theme</span>
          </div>

          {/* Cart */}
          <div className="flex items-center gap-2">
            <ShoppingCart size={22} />
            <span>Cart (0)</span>
          </div>

          {/* Auth buttons */}
          <Button classname="bg-green-800 px-4 py-2 rounded-lg text-white w-full" name="Login" />
          <Button classname="bg-red-500 px-4 py-2 rounded-lg text-white w-full" name="Signup" />
        </div>
      </div>
    </header>
  );
}
