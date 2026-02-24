import React, { useEffect, useState } from 'react'
import debounce from '../uitiltes/uitiltes'
import { useOutletContext } from 'react-router'
import { useSelector } from 'react-redux'
import Card from '../components/Card'
import UseProductActions from '../hooks/UseProductActions'
export default function SearchPage() {
    const searchText = useOutletContext()
   const [searchData , setSearchData] = useState([])
   const {handleAddToCart ,handleSave} = UseProductActions()
   const {products} = useSelector(state => state.products)
   useEffect(()=>{
   const debouncedSearch =  debounce(()=>{
      if(!searchData){
        setSearchData([])
           return
        }
       const filtered = products.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()))
     setSearchData(filtered)
   },400)

 debouncedSearch()
   }, [searchText, products])

  return (

        <div className='px-10 py-5'>
                 <h1 className="text-2xl text-center   font-bold mb-4">
        Search Results
      </h1>
      <div>
        {searchText.length === 0 ?(
         <p>No product found</p>
        ):(
            <Card products={searchData} addCart={handleAddToCart} onSave={handleSave}/>
        )}
      </div>
     
        </div>
  )
}
