import {FILTER} from '../type/Type'

export default (state={},action={})=>{

    switch(action.type){
        case FILTER :  return action.payload;
        default : return state;
    }
}