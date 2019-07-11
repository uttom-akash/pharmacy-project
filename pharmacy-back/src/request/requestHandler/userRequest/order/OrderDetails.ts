import RequestHandlers from '../../RequestHandler'


export default class OrderDetails extends RequestHandlers{
    
    handle(req: any, res: any): void {
        const {orderID}=req.body
        
        let query=`select DATE,TIME,TOTAL_PRICE,ADDRESS from Orders where ORDER_ID=?`

        this.pool.query(query,[orderID]).then((res:any)=>{
            query=`select `
        })
    }
}