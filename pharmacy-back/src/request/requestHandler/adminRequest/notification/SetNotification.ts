import RequestHandlers from '../../RequestHandler'
import TimeStamp from '../../../../processing/timestamp/TimeStamp'

export default class GetNotification extends RequestHandlers{
    
    handle(req: any, res: any): void {
        let {userID,message,image_src,header,type}=req.body;
        
        if(!(!!message))message=''
        if(!(!!image_src))image_src=''

        let dateTime=TimeStamp.getInstance().timeStamp()

        let query=`insert into Notifications(USER_ID,HEADER,MESSAGE,TYPE,DATE_TIME,IMAGE_SRC) values(?,?,?,?,?,?)`

        this.pool.query(query,[userID,header,message,type,dateTime,image_src]).then((response:any)=>res.json({notification:response}))
    }
}