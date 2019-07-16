import api from '../api/Api'
import {REMOVE_FROM_ORDER,ADD_TO_ORDER,FILTER_PARAM,CURRENT_ORDER,PAST_ORDER,IS_AVAILABLE,GET_TO_CART,ADD_TO_CART,DRUG,CATOVERVIEW,BRANDOVERVIEW,CATEGORY,BRAND,FILTER, REMOVE_FROM_CART} from '../type/Type'


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

export const getCartAction=(data)=>({
    payload:data,
    type:GET_TO_CART
})

export const removeCartAction=(data)=>({
    payload:data,
    type:REMOVE_FROM_CART
})


// export const removeCartAction=(data)=>({
//     payload:data,
//     type:REMOVE_FROM_CART
// })

export const getChooseItemAction=(data)=>({
    payload:data,
    type:REMOVE_FROM_CART
})

export const isAvailableAction=(data)=>({
    payload:data,
    type:IS_AVAILABLE
})

// 
export const currentOrderAction=(data)=>({
    payload:data,
    type:CURRENT_ORDER
})

export const pastOrderAction=(data)=>({
    payload:data,
    type:PAST_ORDER
})

export const setFilterAction=(data)=>({
    payload:data,
    type:FILTER_PARAM
})


export const addToOrderAction=(data)=>({
    payload:data,
    type:ADD_TO_ORDER
})

export const removeFromOrderAction=(data)=>({
    payload:data,
    type:REMOVE_FROM_ORDER
})


// async action
export const getCategoryDrugsOverview=()=>dispatch=>api.getCategoryDrugsOverview().then(drugs=>dispatch(catOverviewAction(drugs)))
export const getCategoryDrugs=(data)=>dispatch=>api.getCategoryDrugs(data).then(drugs=>dispatch(categoryDrugAction(drugs)))
export const getBrandDrugsOverview=()=>dispatch=>api.getBrandDrugsOverview().then(drugs=>dispatch(brandOverviewAction(drugs)))
export const getBrandDrugs=(data)=>dispatch=>api.getBrandDrugs(data).then(drugs=>dispatch(brandDrugAction(drugs)))
export const getFilterSearchDrugs=(data)=>dispatch=>api.getFilterSearch(data).then(drugs=>dispatch(filterAction(drugs)))
export const getDrug=(data)=>dispatch=>api.getDrug(data).then(drug=>dispatch(drugAction(drug)))


export const getCart=(data)=>dispatch=>api.getCart(data).then(drug=>dispatch(getCartAction(drug)))
export const removeCart=(data)=>dispatch=>api.removeFromCart(data).then(drug=>dispatch(removeCartAction(drug)))
export const addCart=(data)=>dispatch=>api.addToCart({userID:data['userID'],drugID:data['drugID']}).then(res=>dispatch(addCartAction(data['drug'])))

export const isAvailable=(data)=>api.isAvailable(data).then(res=>res['available'])

export const getCurrentOrders=data=>dispatch=>api.getCurrentOrders(data).then(res=>dispatch(currentOrderAction(res)))
export const getPastOrders=data=>dispatch=>api.getPastOrders(data).then(res=>dispatch(pastOrderAction(res)))
