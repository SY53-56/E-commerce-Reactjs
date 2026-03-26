import React from 'react'
import { useNavigate, useOutletContext } from 'react-router'
import { SearchIcon } from 'lucide-react'
export default function SearchInput() {
    const {searchText , setSearchText}  = useOutletContext()
   
    const navigate = useNavigate()
       const handleInput  = (e)=>{
       const data = e.target.value
         navigate("/search")
       console.log(data)
       setSearchText(data)

  }
 
  return (
     <div className=" w-full flex lg:hidden items-center justify-center mt-4 px-4">
         <div className="border w-full flex items-center justify-center rounded-lg px-2 py-1">
           <input type="text"placeholder="search..." value={searchText} onChange={handleInput}  className="border-none w-full px-2 py-1 outline-none text-white" />
          <SearchIcon/>
         </div>
        </div>
  )
}
