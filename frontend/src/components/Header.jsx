import { SearchIcon } from 'lucide-react'
import React from 'react'
import Button from "./Button"
export default function Header() {
  return (
    <>
      <div className='flex justify-between px-5 py-3 bg-cyan-600 '>
        <div >
            <h1 className='text-2xl font-bold'><i>main mart</i></h1>
        </div>
        <div className='flex justify-between gap-3.5 items-center border px-2 rounded-lg w-[400px]'>
            <input className='border rounded px-2 outline-none border-none' type="text" name="" id="" placeholder='Search' />
<SearchIcon className='font-bold cursor-pointer'size={25}/>
        </div>
        <div className='flex gap-3'>
          <Button classname="bg-green-800 px-4 py-2 rounded-lg text-white border-none" name="login"/>
            <Button classname="bg-red-500 px-4 py-2 rounded-lg text-white border-none" name="login"/>
        </div>
      </div>
    </>
  )
}
