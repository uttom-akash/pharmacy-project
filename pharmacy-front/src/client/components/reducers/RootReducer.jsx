import {combineReducers} from 'redux'
import User from './UserReducer'
import Drugs from './DrugsReducer'
import Cart from './CartReducer'
import Var from './Reducers'

export default combineReducers(
    {
        User,
        Drugs,
        Cart,
        Var
    });