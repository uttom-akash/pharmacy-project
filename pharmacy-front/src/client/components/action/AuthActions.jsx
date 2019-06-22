import api from '../api/Api'
import {LOGIN,REGISTER,FETCH_USER,LOG_OUT} from '../type/Type'

// action object
export const loginAction=(data)=>({
    payload:data,
    type:LOGIN
})

export const registerAction=(data)=>({
    payload:data,
    type:REGISTER
})

export const fetchUserAction=(data)=>({
    payload:data,
    type:FETCH_USER
})


export const logoutAction =()=>({
    payload:{},
    type:LOG_OUT
})



// action function
export const login=(data)=>dispatch=>api.login(data).then(user=>dispatch(loginAction(user)));
export const register=(data)=>dispatch=>api.register(data).then(user=>dispatch(registerAction(user)));
export const fetchUser=(data)=>dispatch=>api.fetchUser(data).then(user=>dispatch(fetchUserAction(user)));



