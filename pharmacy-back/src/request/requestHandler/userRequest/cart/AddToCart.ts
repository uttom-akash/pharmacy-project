import RequestHandlers from '../../RequestHandler'
import TimeStamp from '../../../../processing/timestamp/TimeStamp'

export default class AddToCart extends RequestHandlers{
    
    handle(req: any, res: any): void {
        const {userID,drugID}=req.body
        const query='insert into Cart values(?,?,?)'
        const date=TimeStamp.getInstance()
        this.pool.query(query,[userID,drugID,date.dateMonthYear()]).then((result:any)=>res.json({id:drugID})).catch((err:any)=>res.status(450).json({error:err}))    
    }
}