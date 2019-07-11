export default (list:any,table:string)=>{
    let query=`select * from  ${table}`
   
    for(let i=0;i<list.length;i++){
        if(i) query=query+' and'
        else query=query+' where'

        query=query+` ${list[i]['param'].toUpperCase()}=?`;   
    }

    return query;
}