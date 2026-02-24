import React, { useCallback, useMemo } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { saveProduct } from '../features/auth/authThunk'
import { addCart } from '../features/cart/cartThunk'

export default function UseProductActions() {

  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)

  // Fast lookup using Set
  const isSavedId = useMemo(() => {
    return new Set(
      user?.saveItem?.map(item =>
        typeof item === "string" ? item : item._id
      )
    )
  }, [user])

  const handleSave = useCallback((id, e) => {

    e.preventDefault()
    e.stopPropagation()

    if (!user) {
      toast.error("Please login first")
      return
    }

    const alreadySaved = isSavedId.has(id)

    dispatch(saveProduct(id))

    if (alreadySaved) {
      toast.success("Product removed from saved")
    } else {
      toast.success("Product saved successfully ❤️")
    }

  }, [dispatch, user, isSavedId])


  const handleAddCart = useCallback((id, e) => {

    e.preventDefault()
    e.stopPropagation()

    if (!user) {
      toast.error("Please login first")
      return
    }

    dispatch(addCart(id))
    toast.success("Added to cart 🛒")

  }, [dispatch, user])


  return {
    handleSave,
    handleAddCart,
    isSavedId
  }
}