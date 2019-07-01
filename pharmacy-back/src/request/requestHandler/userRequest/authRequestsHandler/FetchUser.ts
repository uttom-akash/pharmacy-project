import RequestHandler from '../../RequestHandler'


export default class FetchUser extends RequestHandler{
    
    handle(req: any, res: any): void {
        const {userID}=req.body;
        let query=`select USER_ID,FIRST_NAME,LAST_NAME,ADDRESS,CONTACT_NUMBER from Users where USER_ID=?`;
        this.pool.query(query,[userID]).then((user:any)=>{
            if(user.length)res.json({user:user[0]})
            else setTimeout(()=>res.status(400).json({error:"invalid credentails"}),10000)
        }).catch((err:any)=>setTimeout(()=>res.status(400).json({error:err}),10000))
        
    }

}