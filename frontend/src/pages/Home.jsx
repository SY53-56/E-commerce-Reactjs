import React from 'react'
import Poster from '../components/Poster'
import AddProduct from './addProduct'
import Button from '../components/Button'
import Card from '../components/Card'



export default function Home() {


  


  return (
  <>
     <div>
        <Poster />
   <Card/>
      </div>

    <Button to="/add" className="bg-lime-700 text-white"  name="add button"/>

  </>
  )
}
