import {ADD_TO_CART} from '../type/Type'

export default (state=[],action={})=>{
    console.log(state);
    
    switch(action.type){
        case ADD_TO_CART : return state.concat(action.payload);
        default : return state;
    }
}