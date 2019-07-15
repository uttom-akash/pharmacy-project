import {SEEN_NOTIFICATION, GET_NOTIFICATION_COUNT} from '../type/Type'


export default (state={},action={})=>{

    switch(action.type){
        case GET_NOTIFICATION_COUNT:return {count:action.payload};
        case SEEN_NOTIFICATION:return {count:state.count-1}
        default:return state
    }
}