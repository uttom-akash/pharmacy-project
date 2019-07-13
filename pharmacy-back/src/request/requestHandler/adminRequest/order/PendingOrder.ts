import RequestHandler from '../../RequestHandler'

export default class PendingOrders extends RequestHandler{

    handle(req: any, res: any): void {
            let query=`select * from Orders where STATUS=?`
            this.pool.query(query,[0]).then((result:any)=>res.json({List:result}))
    }

}