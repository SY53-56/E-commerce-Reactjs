import React from 'react'
import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import FilterProduct from '../components/FilterProduct'

export default function Products() {
  const { products = [] } = useSelector(state => state.products)
  const { category } = useParams()
  const navigate = useNavigate()

  const categories = ["clothes", "food", "electronics", "game", "others"]

  const activeCategory = category || 'all'

  const filteredProducts =
    activeCategory === 'all'
      ? products
      : products.filter(p => p.category === activeCategory)

  const handleCategoryChange = (cat) => {
    if (cat === 'all') {
      navigate('/products')
    } else {
      navigate(`/products/${cat}`)
    }
  }
console.log("sggshghdagfdfka",filteredProducts)
  return (
    <div className="px-10 flex gap-11">
      <div className='mt-7'>
        <FilterProduct
        category={categories}
        onSelect={handleCategoryChange}
      />
      </div>
      <Card products={filteredProducts}/>
      
    </div>
  )
}
