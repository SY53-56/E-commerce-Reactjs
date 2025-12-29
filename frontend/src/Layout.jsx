import React,{useState} from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { Outlet } from 'react-router'

export default function Layout() {
  let [searchText,SetsearchText] = useState("")
  return (
    <div>
       <Header searchText={searchText} SetsearchText={SetsearchText}/>
       <Outlet searchText={searchText}/>
       <Footer/>          
        </div>
  )
}
