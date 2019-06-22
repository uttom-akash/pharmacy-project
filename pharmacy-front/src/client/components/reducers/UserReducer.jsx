import {LOGIN,REGISTER,FETCH_USER, LOG_OUT} from '../type/Type'

export default (state={},action={})=>{
    switch(action.type){
        case LOGIN : return action.payload;
        case REGISTER : return action.payload;
        case FETCH_USER : return action.payload;
        case LOG_OUT :return action.payload;
        default : return state;
    }
}