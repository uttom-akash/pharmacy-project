import RequestHandlers from '../../RequestHandler'

export default class SeenNotification extends RequestHandlers{
    
    handle(req: any, res: any): void {
        const {userID,notificationID}=req.body;
        

        let query=`update Notifications set STATUS=? where  USER_ID=? and NOTIFICATION_ID=?`
        this.pool.query(query,[true,userID,notificationID]).then((response:any)=>res.json({id:notificationID}))
    }
}