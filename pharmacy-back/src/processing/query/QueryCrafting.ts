export default (list:any,table:string)=>{
    let query=`select * from  ${table}`
   
    for(let i=0;i<list.length;i++){
        if(i) query=query+' and'
        else query=query+' where'

        query=query+` ${list[i]['param'].toUpperCase()}`;
        
        if(list[i]['param'].toUpperCase()==='DATE' || list[i]['param'].toUpperCase()==="PRICE")
            query=query+`<?`
        else
            query=query+` regexp ?`    
    }

    return query;
}