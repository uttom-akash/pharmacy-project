import axios from 'axios'

const api={
    login:(data)=>axios.post("/api/login",data).then(res=>{sessionStorage.number=res.data.user.CONTACT_NUMBER;return res.data.user}),
    register:(data)=>axios.post("/api/register",data).then(res=>{sessionStorage.number=res.data.user.CONTACT_NUMBER;return res.data.user}),
    fetchUser:(data)=>axios.post("/api/fetch_user",data).then(res=>{sessionStorage.number=res.data.user.CONTACT_NUMBER;return res.data.user})
}


export default api;