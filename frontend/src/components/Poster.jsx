import React from 'react'
import { Link } from 'react-router'

export default function Poster() {
  return (
    <div className='h-[300px] w-full z-0  relative  mt-10  py-2 px-3 lg:px-16 rounded-md  '>
      <div className='w-[90%] border m-auto  h-[280px] rounded-md shadow-2xl'>
   <Link to="/product/page">
         <img className='w-full cursor-pointer h-full object-fill' src="https://cdn.create.vista.com/downloads/1c285f63-5ad9-481e-8c6e-dfc113f6c8cc_1024.jpeg" alt="" />
   </Link>
      </div>
    </div>
  )
}
