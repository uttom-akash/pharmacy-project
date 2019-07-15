import RequestHandlers from '../../RequestHandler'

export default class ObserveNotification extends RequestHandlers{
    
    handle(req: any, res: any): void {

        const {userID,dateTime}=req.body;
        
        let query=`select * from Notifications where DATE_TIME>=? and STATUS=? and USER_ID=? order by DATE_TIME desc`
        this.pool.query(query,[dateTime,false,userID]).then((response:any)=>res.json({notification:response}))
    }
}