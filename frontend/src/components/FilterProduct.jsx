import React from 'react'

export default function FilterProduct({ category = [], onSelect }) {
  if (!Array.isArray(category)) return null
const categoryColors = {
  clothes: 'bg-blue-400',
  food: 'bg-green-400',
  electronics: 'bg-purple-400',
  game: 'bg-red-400',
  others: 'bg-gray-400',
}

  
  return (
    <div className="flex  justify-center mt-10 gap-4 mb-6 flex-wrap">
      <button onClick={() => onSelect('all')}>
        All
      </button>

      {category.map(cat => (
        <button className={` px-4 ${categoryColors[cat]} py-1 rounded-md`} key={cat} onClick={() => onSelect(cat)}>
          {cat}
        </button>
      ))}
    </div>
  )
}
