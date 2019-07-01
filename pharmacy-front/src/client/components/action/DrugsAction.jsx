import api from '../api/Api'
import {ADD_TO_CART,DRUG,CATOVERVIEW,BRANDOVERVIEW,CATEGORY,BRAND,FILTER} from '../type/Type'


// action
export const drugAction=(data)=>({
    payload:data,
    type:DRUG
})

export const catOverviewAction=(data)=>({
    payload:data,
    type:CATOVERVIEW
})

export const categoryDrugAction=(data)=>({
    payload:data,
    type:CATEGORY
})


export const brandOverviewAction=(data)=>({
    payload:data,
    type:BRANDOVERVIEW
})

export const brandDrugAction=(data)=>({
    payload:data,
    type:BRAND
})

export const filterAction=(data)=>({
    payload:data,
    type:FILTER
})


export const addCartAction=(data)=>({
    payload:data,
    type:ADD_TO_CART
})



// async action
export const getCategoryDrugsOverview=()=>dispatch=>api.getCategoryDrugsOverview().then(drugs=>dispatch(catOverviewAction(drugs)))
export const getCategoryDrugs=(data)=>dispatch=>api.getCategoryDrugs(data).then(drugs=>dispatch(categoryDrugAction(drugs)))
export const getBrandDrugsOverview=()=>dispatch=>api.getBrandDrugsOverview().then(drugs=>dispatch(brandOverviewAction(drugs)))
export const getBrandDrugs=(data)=>dispatch=>api.getBrandDrugs(data).then(drugs=>dispatch(brandDrugAction(drugs)))
export const getFilterSearchDrugs=(data)=>dispatch=>api.getFilterSearch(data).then(drugs=>dispatch(filterAction(drugs)))
export const getDrug=(data)=>dispatch=>api.getDrug(data).then(drug=>dispatch(drugAction(drug)))
