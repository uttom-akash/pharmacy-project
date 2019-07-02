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
    
    getCategories:()=>axios.get('/api/categories').then(res=>res.data),
    getBrands:()=>axios.get('/api/brands').then(res=>res.data),
    
    addToCart:(data)=>axios.post('/api/add-cart',data).then(res=>res.data),
    removeFromCart:(data)=>axios.post('/api/remove-cart',data).then(res=>res.data),
    getCart:(data)=>axios.post('/api/get-cart',data).then(res=>res.data),
    
    
    isAvailable:(data)=>axios.post('/api/is-available',data).then(res=>res.data),
    increment:(data)=>axios.post('/api/increment',data).then(res=>res.data),
    decrement:(data)=>axios.post('/api/decrement',data).then(res=>res.data),
    
}


export default api;