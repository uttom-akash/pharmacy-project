import RequestHandlers from '../../RequestHandler'

export default class Increment extends RequestHandlers{
    
    handle(req: any, res: any): void {
        const {drugID}=req.body
        
        const query=`update DrugStates set REMAIN_QTY=REMAIN_QTY+1 where DRUG_ID=?`
        
        this.pool.query(query,[drugID]).then((result:any)=>res.json({result:'ok'}))    
    }
    
}