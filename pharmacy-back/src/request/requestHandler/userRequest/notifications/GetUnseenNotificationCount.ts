import RequestHandlers from '../../RequestHandler'

export default class GetUnseenNotificationCount extends RequestHandlers{
    
    handle(req: any, res: any): void {
        const {userID}=req.body;
        
        let query=`select count(*) as cnt from Notifications where  STATUS=? and USER_ID=?`
        this.pool.query(query,[false,userID]).then((response:any)=>res.json({count:response[0]['cnt']}))
    }
}