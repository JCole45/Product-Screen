import { ADD_TO_CART, EDIT_CART_ITEM, DELETE_CART_ITEM, APPLY_COUPON_TO_CART } from '../constants/productContants'


export const addToCartReducer = (state = { cartItems: [], coupon: null }, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return { ...state, cartItems: [...state.cartItems, action.payload] }

        case EDIT_CART_ITEM:
            return state = {
                cartItems: state.cartItems.map(item => (
                    item._id === action.payload._id ?
                        action.payload : item
                ))
            }

        case DELETE_CART_ITEM:
            return state = { cartItems: state.cartItems.filter(item => item._id !== action.payload.id) }
            
        case APPLY_COUPON_TO_CART:
            return { ...state, coupon: action.payload }
        default:
            return state
    }
}




export const removeProductFromCartReducer = () => {

}