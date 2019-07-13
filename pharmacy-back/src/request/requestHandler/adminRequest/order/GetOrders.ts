import RequestHandler from '../../RequestHandler'

export default class GetOrders extends RequestHandler{

    handle(req: any, res: any): void {
            const {date,limit}=req.body;

            let query=`select * from Orders where DATE>?`
            console.log(query);
            this.pool.query(query,[date]).then((result:any)=>res.json({List:result}))
    }

}