import React from 'react'
import StateCard from './StateCard'

export default function UserDashboard() {
  return (
    <div className='flex flex-col'>
     <div> <h1>DashBoard</h1></div>
     <div className='flex gap-5'>
  <StateCard title="product" value="67"/>
    <StateCard title="sell prodcut" value="20"/>
      <StateCard title="pending" value="12"/>
     </div>
    </div>
  )
}
