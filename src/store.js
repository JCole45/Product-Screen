import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import {addToCartReducer} from './reducers/productReducers'
import thunk from 'redux-thunk';

const reducer = combineReducers({
    addToCart: addToCartReducer,
})

const cartItemsFromStorage = localStorage.getItem('storeCartItems') ? JSON.parse(localStorage.getItem('storeCartItems')) : []

const initialState = {addToCart: {cartItems: cartItemsFromStorage}}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(
    applyMiddleware(...middleware)
))

export default store
