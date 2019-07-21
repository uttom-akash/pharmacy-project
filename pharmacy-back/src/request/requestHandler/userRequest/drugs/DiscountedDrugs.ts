import RequestHandlers from '../../RequestHandler'


export default class DiscountedDrugs extends RequestHandlers{
    
    handle(req: any, res: any): void {
        const {limit}=req.body

        let query=`select * from Drugs where DISCOUNT>0 limit ?`
        this.pool.query(query,[limit]).then((result:any)=>res.json({drugs:result}))    
    }

}