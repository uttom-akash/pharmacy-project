import axios from 'axios'

export default {
       isSupplier:(data)=>axios.post('/api/supplier-available',data).then(res=>res.data),
       addSupplier:(data)=>axios.post('/api/add-supplier',data).then(res=>res.data),
       isDrug:(data)=>axios.post('/api/drug-available',data).then(res=>res.data),
       newSupply:(data)=>axios.post('/api/new-supply',data).then(res=>res.data),
       newDrug:(data)=>axios.post('/api/new-drug',data).then(res=>res.data),
    
       addUser:(data)=>axios.post('/api/add-user',data).then(res=>res.data),
       addAdmin:(data)=>axios.post('/api/add-admin',data).then(res=>res.data),
       addEmployee:(data)=>axios.post('/api/add-employee',data).then(res=>res.data),
       
       addManufecturer:(data)=>axios.post('/api/add-manufecturer',data).then(res=>res.data),

       getUser:(data)=>axios.post('/api/get-user',data).then(res=>res.data),
       getAdmin:(data)=>axios.post('/api/get-admin',data).then(res=>res.data),
       getEmployee:(data)=>axios.post('/api/get-employee',data).then(res=>res.data),
       getManufecturer:(data)=>axios.post('/api/get-manufecturer',data).then(res=>res.data),
       getSupplier:(data)=>axios.post('/api/get-supplier',data).then(res=>res.data),
       getSupply:(data)=> axios.post('/api/get-supply',data).then(res=>res.data),
       getDrug:(data)=>axios.post('/api/get-drug',data).then(res=>res.data),
    
       drugSales:()=>axios.get('/api/drug-sale').then(res=>res.data),
       userCount:()=>axios.get('/api/user-count').then(res=>res.data),

       getPendingOrder:()=>axios.get('/api/pending-order').then(res=>res.data),
       getOrders:(data)=>axios.post('/api/get-orders',data).then(res=>res.data),
       
       approveOrder:(data)=>axios.post('/api/approve-order',data).then(res=>res.data),
       rejectOrder:(data)=>axios.post('/api/reject-order',data).then(res=>res.data),
       viewDetails:(data)=>axios.post('/api/order-details',data).then(res=>res.data),

       setNotification:(data)=>axios.post('/api/set-notification',data).then(res=>res.data),
       supplierPrice:(data)=>axios.post('/api/available-supplier-price',data).then(res=>res.data),
       saleByDays:(data)=>axios.post('/api/sales-by-days',data).then(res=>res.data),
       profitByDays:(data)=>axios.post('/api/profit-by-days',data).then(res=>res.data),

       getEmployee:(data)=>axios.post('/api/get-employee-regexp',data).then(res=>res.data),
       
       searchEmployee:(data)=>axios.post('/api/search-employee',data).then(res=>res.data),
       searchLocation:(data)=>axios.post('/api/search-location',data).then(res=>res.data),
       searchManufacturer:(data)=>axios.post('/api/search-manufacturer',data).then(res=>res.data),
       searchProduct:(data)=>axios.post('/api/search-product',data).then(res=>res.data),
       searchSupplier:(data)=>axios.post('/api/search-Supplier',data).then(res=>res.data),
       searchUser:(data)=>axios.post('/api/search-User',data).then(res=>res.data),


       salesEmployee:(data)=>axios.post('/api/sales-employee',data).then(res=>res.data),
       salesManufacturer:(data)=>axios.post('/api/sales-manufacturer',data).then(res=>res.data),
       salesProduct:(data)=>axios.post('/api/sales-product',data).then(res=>res.data),
       salesSupplier:(data)=>axios.post('/api/sales-supplier',data).then(res=>res.data),
       salesUser:(data)=>axios.post('/api/sales-user',data).then(res=>res.data),

       
    }