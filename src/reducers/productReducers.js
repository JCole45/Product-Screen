import { ADD_TO_CART, EDIT_CART_ITEM, DELETE_CART_ITEM, APPLY_COUPON_TO_CART } from '../constants/productContants'


function checkItemsForDuplicates(cartItem, newItem) {
    let a = Object.getOwnPropertyNames(cartItem)
    let newItemProperties = Object.getOwnPropertyNames(newItem)

    let cartItemProperties = a.filter(e => e !== '_id').filter(e => e !== 'images').filter(e => e !== 'quantity')
    for (var i = 0; i < cartItemProperties.length; i++) {
        let property = cartItemProperties[i]
        if (cartItem[property] !== newItem[property]) {
            return false
        }
    }
    return true
}

export const addToCartReducer = (state = { cartItems: [], coupon: null }, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            for (var i = 0; i < state.cartItems.length; i++) {
                if (checkItemsForDuplicates(state.cartItems[i], action.payload)) {
                    return state = {
                        cartItems: state.cartItems.map(item => (
                            item._id === state.cartItems[i]._id ?
                                { ...state.cartItems[i], quantity: state.cartItems[i].quantity + action.payload.quantity } : item
                        ))
                        , coupon: state.coupon
                    }
                }
            }
            return { ...state, cartItems: [...state.cartItems, action.payload] }

        case EDIT_CART_ITEM:
            return state = {
                cartItems: state.cartItems.map(item => (
                    item._id === action.payload._id ?
                        action.payload : item
                ))
                , coupon: state.coupon
            }

        case DELETE_CART_ITEM:
            return state = { cartItems: state.cartItems.filter(item => item._id !== action.payload.id) }

        case APPLY_COUPON_TO_CART:
            return { ...state, coupon: action.payload }
        default:
            return state
    }
}
