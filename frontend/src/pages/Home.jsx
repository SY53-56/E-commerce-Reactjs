import React from 'react'
import Poster from '../components/Poster'
import AddProduct from './addProduct'
import Button from '../components/Button'


export default function Home() {

  return (
  <>
  <div>
    <Poster/>
    <Button to="/add" className="bg-lime-700 text-white"  name="add button"/>
  </div>
  </>
  )
}
