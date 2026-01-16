import React,{useState} from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { Outlet } from 'react-router'
import { useTheme } from './context/themeContext'

export default function Layout() {
  const {theme} = useTheme()
  let [searchText,setSearchText] = useState("")
  return (
    <div  className={`min-h-screen ${
          theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
        } transition-colors duration-500`}>
       <Header searchText={searchText} setSearchText={setSearchText}/>
       <Outlet searchText={searchText}/>
       <Footer/>          
        </div>
  )
}
