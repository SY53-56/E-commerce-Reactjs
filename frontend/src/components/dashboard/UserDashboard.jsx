import StateCard from './StateCard'

export default function UserDashboard({ products, cart }) {

  const totalQuantity = cart?.items?.reduce(
    (total, item) => total + item.quantity,
    0
  ) || 0;

  return (
    <div className='flex flex-col gap-3.5'>
      
      <div>
        <h1>DashBoard</h1>
      </div>

      <div className='grid gap-5 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3'>
        
        <StateCard title="products" value={products?.length || 0}/>
        
        <StateCard title="pending product" value={cart?.items?.length || 0}/>
        
        <StateCard title="totalQuantity" value={totalQuantity}/>

      </div>

    </div>
  )
}