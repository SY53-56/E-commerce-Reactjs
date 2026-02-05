import React from 'react'

export default function Products({products}) {
  return (
   <table className="w-full text-left">
<thead>
<tr className="border-b">
<th className="py-2">Name</th>
<th>Price</th>
<th>Stock</th>
<th>Category</th>
</tr>
</thead>
<tbody>
{products.map((i) => (
<tr key={i} className="border-b text-sm">
<td className="py-2">{i.name}</td>
<td>₹{i.price}</td>
<td>{i.stock}</td>
<td>{i.category}</td>
</tr>
))}
</tbody>
</table>
  )
}
