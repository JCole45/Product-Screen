import {ADD_TO_CART, DELETE_CART_ITEM, EDIT_CART_ITEM, APPLY_COUPON_TO_CART} from '../constants/productContants'

export const addProductToCart = (product) => (dispatch) => {
    dispatch({
        type: ADD_TO_CART,
        payload: product
    })
}

export const editProductInCart = (product) => (dispatch) => {
   dispatch({
       type: EDIT_CART_ITEM,
       payload: product
   })
}

export const deleteCartItem = (id) => (dispatch) => {
    dispatch({
        type: DELETE_CART_ITEM,
        payload: id
    })
}

export const applyCoupon = (coupon) => (dispatch) => {
    dispatch({
        type: APPLY_COUPON_TO_CART,
        payload: coupon
    })
}