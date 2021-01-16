import {ADD_TO_CART, DELETE_CART_ITEM, EDIT_CART_ITEM, APPLY_COUPON_TO_CART} from '../constants/productContants'

export const addProductToCart = (product) => (dispatch, getState) => {
    dispatch({
        type: ADD_TO_CART,
        payload: product
    })

    localStorage.setItem('storeCartItems', JSON.stringify(getState().addToCart.cartItems))
}

export const editProductInCart = (product) => (dispatch, getState) => {
   dispatch({
       type: EDIT_CART_ITEM,
       payload: product
   })

   localStorage.setItem('storeCartItems', JSON.stringify(getState().addToCart.cartItems))
}

export const deleteCartItem = (id) => (dispatch, getState) => {
    dispatch({
        type: DELETE_CART_ITEM,
        payload: id
    })

    localStorage.setItem('storeCartItems', JSON.stringify(getState().addToCart.cartItems))
}

export const applyCoupon = (coupon) => (dispatch) => {
    dispatch({
        type: APPLY_COUPON_TO_CART,
        payload: coupon
    })
}