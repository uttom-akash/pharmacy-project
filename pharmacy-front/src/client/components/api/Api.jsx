import axios from 'axios'

const api={
    login:(data)=>axios.post("/api/login",data).then(res=>{sessionStorage.number=res.data.user.USER_ID;return res.data.user}),
    register:(data)=>axios.post("/api/register",data).then(res=>{sessionStorage.number=res.data.user.USER_ID;return res.data.user}),
    fetchUser:(data)=>axios.post("/api/fetch_user",data).then(res=>{sessionStorage.number=res.data.user.USER_ID;return res.data.user}),
    
    getCategoryDrugsOverview:()=>axios.get('/api/categories_overview').then(res=>res.data),
    getCategoryDrugs:(data)=>axios.post("/api/category_drugs",data).then(res=>res.data),
    
    getBrandDrugsOverview:()=>axios.get('/api/brand_overview').then(res=>res.data),
    getBrandDrugs:(data)=>axios.post('/api/brand_drugs',data).then(res=>res.data),
    
    getFilterSearch:(data)=>axios.post('/api/filter_search',data).then(res=>res.data),
    
    getDrug:(data)=>axios.post("/api/drug",data).then(res=>res.data.drug),
    
    getCategories:(data)=>axios.post('/api/categories',data).then(res=>res.data),
    getBrands:(data)=>axios.post('/api/brands',data).then(res=>res.data),
    
    addToCart:(data)=>axios.post('/api/add-cart',data).then(res=>res.data),
    removeFromCart:(data)=>axios.post('/api/remove-cart',data).then(res=>res.data),
    getCart:(data)=>axios.post('/api/get-cart',data).then(res=>res.data),
    
    
    isAvailable:(data)=>axios.post('/api/is-available',data).then(res=>res.data['available']),
    increment:(data)=>axios.post('/api/increment',data).then(res=>res.data),
    decrement:(data)=>axios.post('/api/decrement',data).then(res=>res.data),

    newOrderInit:(data)=>axios.post('/api/new-order-init',data).then(res=>res.data),
    cancelOrder:(data)=>axios.post('/api/cancel-order',data).then(res=>res.data),
    confirmOrder:(data)=>axios.post('/api/confirm-order',data).then(res=>res.data),

    getCurrentOrders:(data)=>axios.post('/api/current-order',data).then(res=>res.data),
    getPastOrders:(data)=>axios.post('/api/past-order',data).then(res=>res.data),
    orderRecieved:(data)=>axios.post('/api/order-recieved',data).then(res=>res.data),
    viewOrderDetails:(data)=>axios.post('/api/order-details',data).then(res=>res.data),
    
    salesOrder:(data)=>axios.post('/api/sales-order',data),

    search:(query)=>axios.post('/api/search',query).then(res=>res.data)
}


export default api;