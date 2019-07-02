import {IS_AVAILABLE} from '../type/Type'

export default (state={},action={})=>{

    switch(action.type){
        case IS_AVAILABLE:return {isAvailable:action.payload}
        default : return state;
    }
}