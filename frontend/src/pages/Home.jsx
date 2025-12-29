
import Poster from '../components/Poster'

import Button from '../components/Button'
import Card from '../components/Card'

import { useOutletContext } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, } from 'react'
import { allProductShow } from '../features/product/productThunk'
import FilterProduct from '../components/FilterProduct'



export default function Home() {

  const {products} = useSelector((state)=>state.products)
  const dispatch = useDispatch()
let searchText = useOutletContext()
  
  useEffect(()=>{
  dispatch(allProductShow())

  },[dispatch])

  return (
  <>
     <div>
        <Poster  />
   <Card searchText={searchText} products={products}/>
      </div>
<FilterProduct products={products} h1="Food"/>
    <Button to="/add" className="bg-lime-700 text-white"  name="add button"/>

  </>
  )
}
