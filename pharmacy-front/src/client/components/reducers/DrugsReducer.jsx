import {DRUG,CATOVERVIEW,BRANDOVERVIEW,CATEGORY,BRAND,FILTER} from '../type/Type'

export default (state={},action={})=>{

    switch(action.type){
        case CATOVERVIEW : return {CategoryOverview:action.payload};
        case CATEGORY:return {Category:action.payload};
        case BRANDOVERVIEW : return {BrandOverview:action.payload}
        case BRAND :  return {Brand:action.payload};
        case FILTER :return {Filter:action.payload};
        case DRUG :return {Drug:action.payload}
        default : return state;
    }
}