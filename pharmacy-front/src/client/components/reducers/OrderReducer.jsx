import {PAST_ORDER,CURRENT_ORDER} from '../type/Type'

export default (state={},action={})=>{
    switch(action.type){
        case PAST_ORDER : return {currentOrder:state.currentOrder,pastOrder:action.payload};
        case CURRENT_ORDER :return {pastOrder:state.pastOrder,currentOrder:action.payload};
        default : return state;

    }
}