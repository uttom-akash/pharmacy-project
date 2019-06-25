import RequestHandler from '../RequestHandler'


export default class Login extends RequestHandler{
    
    handle(req: any, res: any): void {
        const {phoneNumber,password}=req.body;
        let query=`select FIRST_NAME,LAST_NAME,ADDRESS,CONTACT_NUMBER from Users where CONTACT_NUMBER=? and password=?`;
        this.pool.query(query,[phoneNumber,password]).then((user:any)=>{
            if(user.length)res.json({user:user[0]})
            else setTimeout(()=>res.status(400).json({error:"invalid credentails"}),10000)
        }).catch((err:any)=>setTimeout(()=>res.status(400).json({error:err}),10000))
    }

}