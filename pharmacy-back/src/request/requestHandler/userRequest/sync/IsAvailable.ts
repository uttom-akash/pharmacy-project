import RequestHandlers from '../../RequestHandler'

export default class IsAvailable extends RequestHandlers{
    
    handle(req: any, res: any): void {
        const {drugID}=req.body
        
        const query=`select REMAIN_QTY from DrugStates where DRUG_ID=?`
        
        this.pool.query(query,[drugID]).then((result:any)=>res.json({available:result[0]['REMAIN_QTY']}))    
    }
}