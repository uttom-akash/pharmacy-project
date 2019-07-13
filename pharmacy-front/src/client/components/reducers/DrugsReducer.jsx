import {FILTER_PARAM,DRUG,CATOVERVIEW,BRANDOVERVIEW,CATEGORY,BRAND,FILTER} from '../type/Type'

export default (state={},action={})=>{

    switch(action.type){
        case CATOVERVIEW : return action.payload;
        case CATEGORY:return action.payload;
        case BRANDOVERVIEW : return action.payload
        case BRAND :  return action.payload;
        case FILTER :return action.payload;
        case FILTER_PARAM:return {Param:action.payload};
        case DRUG :return {Drug:action.payload};
        default : return state;
    }
}