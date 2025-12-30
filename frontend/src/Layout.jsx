import React,{useState} from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { Outlet } from 'react-router'

export default function Layout() {
  let [searchText,setSearchText] = useState("")
  return (
    <div>
       <Header searchText={searchText} setSearchText={setSearchText}/>
       <Outlet searchText={searchText}/>
       <Footer/>          
        </div>
  )
}
