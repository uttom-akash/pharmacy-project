import RequestHandlers from '../../RequestHandler'
import TimeStamp from '../../../../processing/timestamp/TimeStamp'


export default class ConfirmOrder extends RequestHandlers{
    
    handle(req: any, res: any): void {
        const {orderID,totalPrice}=req.body
        
        let timeStamp=TimeStamp.getInstance()

        const date=timeStamp.dateMonthYear()
        const time=timeStamp.time()
        

        const query=`update Orders set STATUS=?,TOTAL_PRICE=?,DATE=?,TIME=? where ORDER_ID=?`
        
        this.pool.query(query,[1,totalPrice,date,time,orderID]).then((result:any)=>res.json({result:'confirmed'}))    
    }
}