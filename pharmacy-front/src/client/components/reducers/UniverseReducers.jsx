import {IS_AVAILABLE,CHECKOUT,LOGIN_UI_OPEN} from '../type/Type'

export default (state={},action={})=>{

    switch(action.type){
        case IS_AVAILABLE:return {...state,isAvailable:action.payload}
        case CHECKOUT:return {...state,checkout:!state.checkout}
        case LOGIN_UI_OPEN:return {...state,loginOpen:!state.loginOpen}
        default : return state;
    }
}