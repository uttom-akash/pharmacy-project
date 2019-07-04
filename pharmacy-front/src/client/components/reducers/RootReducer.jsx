import {combineReducers} from 'redux'
import User from './UserReducer'
import Drugs from './DrugsReducer'
import Cart from './CartReducer'
import Var from './Reducers'
import Order from './OrderReducer'

export default combineReducers(
    {
        User,
        Drugs,
        Cart,
        Var,
        Order
    });