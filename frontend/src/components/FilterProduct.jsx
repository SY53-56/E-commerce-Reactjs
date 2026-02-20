import React from 'react'
import Button from './Button'

export default function FilterProduct({ category = [], onSelect }) {
  if (!Array.isArray(category)) return null

  
  return (
    <aside className='w-80 h-auto bg-gray-900 px-9 py-4 rounded-3xl'>
           <h1 className='text-2xl text-center font-bold text-white'>category of product</h1>
           <div className='flex flex-col gap-5 mt-10'>
            {category.map(item => (<Button onClick={()=>onSelect(item)} className=" py-2 rounded-lg bg-gray-300 hover:bg-gray-400" name={item}/>))}
           </div>
    </aside>
  )
}
