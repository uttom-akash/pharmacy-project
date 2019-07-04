import RequestHandlers from '../../RequestHandler'
import TimeStamp from '../../../../processing/timestamp/TimeStamp'

export default class NewOrderInitialize extends RequestHandlers{
    
    handle(req: any, res: any): void {
        const {userID}=req.body
        let timeStamp=TimeStamp.getInstance()

        const date=timeStamp.dateMonthYear()
        const time=timeStamp.time()
        
        const query=`insert into Orders(USER_ID,DATE,TIME) values(?,?,?)`
        
        this.pool.query(query,[userID,date,time]).then((result:any)=>res.json({ORDER_ID:result['insertId']}))    
    }
}