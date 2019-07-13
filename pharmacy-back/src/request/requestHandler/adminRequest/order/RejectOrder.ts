import RequestHandler from '../../RequestHandler'

export default class RejectOrder extends RequestHandler{

    handle(req: any, res: any): void {
            const {orderID}=req.body;

            let query=`update Orders set STATUS=? where ORDER_ID=?`
            this.pool.query(query,[-1,orderID]).then((result:any)=>res.json({result:true}))
    }

}