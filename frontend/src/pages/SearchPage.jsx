import React, { useEffect, useState } from 'react'
import debounce from '../uitiltes/uitiltes'
import { useOutletContext } from 'react-router'
import { useSelector } from 'react-redux'
import Card from '../components/Card'
import UseProductActions from '../hooks/UseProductActions'
import SearchInput from '../components/SearchInput'
export default function SearchPage() {
    const {searchText }= useOutletContext()
   const [searchData , setSearchData] = useState([])
   const {handleAddToCart ,handleSave} = UseProductActions()
   const products = useSelector(state => state.products.products)
   console.log(searchText)
   console.log(typeof searchText, searchText)
   useEffect(()=>{
   const debouncedSearch =  debounce(()=>{
      if(!searchText){
        setSearchData([])
           return
        }
       const filtered = products.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()))
     setSearchData(filtered)
   },400)

 debouncedSearch()
   }, [searchText,products])

  return (


        <div className='px-10 py-5'>
           <SearchInput/>
                 <h1 className="text-2xl text-center mt-1.5  font-bold mb-4">
        Search Results
      </h1>
      <div>
        {searchText.length === 0 ?(
         <p>No product found</p>
        ):(
           <div className='w-full'>
             <Card products={searchData} addCart={handleAddToCart} onSave={handleSave}/>
           </div>
        )}
      </div>
     
        </div>
  )
}
