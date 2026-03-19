
import StateCard from './StateCard'

export default function UserDashboard({  products, cart}) {
  const totalQuantity = cart.items.reduce((total , item)=> total+item.quantity, 0)
  console.log(  "sahul yadav cart",totalQuantity)
  console.log("ite,s" , cart)
  return (
    <div className='flex flex-col gap-3.5'>
     <div> <h1>DashBoard</h1></div>
     <div className='flex gap-5 mt-6'>
  <StateCard title="products" value={products?.length}/>
    <StateCard title="pending product" value={cart?.item?.length}/>
      <StateCard title="pending totalQuantity" value={totalQuantity}/>

     </div>
    </div>
  )
}
