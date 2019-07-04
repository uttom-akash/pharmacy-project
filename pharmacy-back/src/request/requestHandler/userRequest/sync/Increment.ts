import RequestHandlers from '../../RequestHandler'

export default class Increment extends RequestHandlers{
    
    handle(req: any, res: any): void {
        const {drugID,orderID}=req.body
        
        let query=`update DrugStates set REMAIN_QTY=REMAIN_QTY+1 where DRUG_ID=?`
        
        this.pool.query(query,[drugID]).then((result:any)=>{
            this.isExist(drugID,orderID).then((result:any)=>{
                query=`update OrderedDrugs set QUANTITY=QUANTITY-1 where ORDER_ID=? and DRUG_ID=?`
                this.pool.query(query,[orderID,drugID]).then((result:any)=>res.json({result:true}))
        
            })
      })
    }

    public isExist(drugID:number,orderID:number){
        let query=`select count(*) as cnt  from OrderedDrugs where ORDER_ID=? and DRUG_ID=?`
        
        return this.pool.query(query,[orderID,drugID]).then((result:any)=>{
            if(result[0]['cnt']<=0){    
                query=`insert into OrderedDrugs(ORDER_ID,DRUG_ID) values(?,?)`
               return this.pool.query(query,[orderID,drugID])
            }   
     })
    }
    
}