import RequestHandlers from '../../RequestHandler'

export default class CancelOrder extends RequestHandlers{
    
    handle(req: any, res: any): void {
        const {orderID}=req.body
        
        this.drugIDs(orderID).then((drugs:any)=>{
                drugs.map((drug:any)=>this.increment(drug['DRUG_ID'],drug['QUANTITY']))
                res.json({result:true})
        })
    }


    public drugIDs(orderID:number){
        const query=`select DRUG_ID,QUANTITY from OrderedDrugs where  ORDER_ID=?`
        
        return this.pool.query(query,[orderID])    
    
    }

    public increment(drugID:number,inc:number){
        
        const query=`update DrugStates set REMAIN_QTY=REMAIN_QTY+? where DRUG_ID=?`
        
        return  this.pool.query(query,[inc,drugID])    
    
    }

}