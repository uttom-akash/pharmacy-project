import RequestHandlers from '../../RequestHandler'


export default class PastOrder extends RequestHandlers{
    
    handle(req: any, res: any): void {
        const {userID,offset}=req.body
        

        const query=`select * from Orders where REC_STATUS=? and USER_ID=? order by ORDER_ID desc limit ?,10`
        this.pool.query(query,[1,userID,offset]).then((ORDERS:any)=>res.json({ORDERS}))    
    }
}