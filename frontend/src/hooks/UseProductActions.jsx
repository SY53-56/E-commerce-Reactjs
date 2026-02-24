import React, { useCallback } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { saveProduct } from '../features/auth/authThunk'
import { addCart } from '../features/cart/cartThunk'

export default function UseProductActions() {
    const dispatch= useDispatch()
    const {user } = useSelector(state => state.auth)

const handleSave = useCallback((id , e)=>{
     e.preventDefault();
        e.stopPropagation();
    if(!user) return  toast.error("Please login first");
     dispatch(saveProduct(id))
     toast.success(`product saved`)
}, [dispatch , user])

  const handleAddToCart = useCallback(
    async (id) => {
      if (!user) return toast.error("Please login first");

      try {
        await dispatch(addCart({ productId: id })).unwrap();
        toast.success("Added to cart 🛒");
      } catch (err) {
        toast.error("Something went wrong",err);
      }
    },
    [dispatch, user]
  );

  return {handleSave ,handleAddToCart}
}
