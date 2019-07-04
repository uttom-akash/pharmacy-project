import RequestHandlers from '../../RequestHandler'


export default class OrderRecieved extends RequestHandlers{
    
    handle(req: any, res: any): void {
        const {orderID}=req.body

        const query=`update Orders set REC_STATUS=1 where ORDER_ID=?`

        this.pool.query(query,[orderID]).then((result:any)=>res.json({result:true}))    
    }
}