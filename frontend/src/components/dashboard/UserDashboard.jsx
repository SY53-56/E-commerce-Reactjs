
import StateCard from './StateCard'

export default function UserDashboard({users , products}) {
  
  return (
    <div className='flex flex-col gap-3.5'>
     <div> <h1>DashBoard</h1></div>
     <div className='flex gap-5 mt-6'>
  <StateCard title="product" value="67"/>
    <StateCard title="sell prodcut" value="20"/>
      <StateCard title="pending product" value="12"/>

     </div>
    </div>
  )
}
