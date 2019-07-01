import {REMOVE_FROM_CART,GET_TO_CART,ADD_TO_CART} from '../type/Type'

export default (state=[],action={})=>{
    console.log(state);
    
    switch(action.type){
        case ADD_TO_CART : return state.concat(action.payload);
        case GET_TO_CART :return action.payload;
        case REMOVE_FROM_CART:return action.payload
        default : return state;

    }
}