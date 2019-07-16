import {combineReducers} from 'redux'
import User from './UserReducer'
import Drugs from './DrugsReducer'
import Cart from './CartReducer'
import Universe from './UniverseReducers'
import Order from './OrderReducer'
import OrderDrugs from './OrderDrugs'
import Notifications from './NotificationReducer'

export default combineReducers(
    {
        User,
        Drugs,
        Cart,
        Universe,
        Order,
        OrderDrugs,
        Notifications
    });