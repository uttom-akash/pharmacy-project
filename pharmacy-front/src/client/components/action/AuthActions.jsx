import api from '../api/Api'
import {LOGIN,REGISTER,FETCH_USER,LOG_OUT,GET_NOTIFICATION, OBSERVE_NOTIFICATION, SEEN_NOTIFICATION, GET_NOTIFICATION_COUNT} from '../type/Type'

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



// notify

export const getNotificationCountAction =(data)=>({
    payload:data,
    type:GET_NOTIFICATION_COUNT
})

export const seenNotificationAction =(data)=>({
    payload:data,
    type:SEEN_NOTIFICATION
})




// notify
const getNotify=(data,dispatch)=>api.getNotificationCount(data).then(res=>dispatch(getNotificationCountAction(res)))

export const seenNotify=(data)=>dispatch=>api.seenNotification(data).then(res=>dispatch(seenNotificationAction(res)))
export const getNotificationCount=(data)=>dispatch=>getNotify(data,dispatch)
// action function




export const login=(data)=>dispatch=>api.login(data).then(user=>{
    dispatch(loginAction(user))
    getNotify({userID:user['USER_ID']},dispatch)
});
export const register=(data)=>dispatch=>api.register(data).then(user=>{
    dispatch(registerAction(user))
    getNotify({userID:user['USER_ID']},dispatch)
});


export const fetchUser=(data)=>dispatch=>api.fetchUser(data).then(user=>{
    dispatch(fetchUserAction(user))
    getNotify({userID:user['USER_ID']},dispatch)
});






