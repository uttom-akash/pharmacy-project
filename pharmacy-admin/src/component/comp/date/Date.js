


export const timeStamp=()=>{
    let date=new Date()
    return `${date.getFullYear()}-${date.getMonth() +
        1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;        
}

export const hms=()=>{
    let date=new Date()
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}


export const ymd=(date=new Date())=>{
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}




export const setDate=(days)=>{
    let date=new Date()
    let setter=new Date()
    let time=setter.getTime()+1000*60*60*24*days;
    date.setTime(time)

    return ymd(date) 
}