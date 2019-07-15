import {REMOVE_FROM_ORDER,ADD_TO_ORDER} from '../type/Type'

export default (state=[],action={})=>{
    switch(action.type){
        case ADD_TO_ORDER : return state.concat(action.payload);
        case REMOVE_FROM_ORDER:return action.payload
        default : return state;

    }
}