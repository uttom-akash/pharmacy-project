import RequestHandler from '../../RequestHandler'
import Hash from '../../../../processing/crypto/functionality/Hash256'


export default class Login extends RequestHandler{
    
    handle(req: any, res: any): void {
        const {phoneNumber,password}=req.body;
        let query=`select USER_ID,FIRST_NAME,LAST_NAME,ADDRESS,CONTACT_NUMBER from Users where CONTACT_NUMBER=? and PASSWORD=?`;
        let passwordHash:string=Hash.getInstance().execute(password)        
        
        console.log(passwordHash);
        
        this.pool.query(query,[phoneNumber,passwordHash]).then((user:any)=>{
            if(user.length)res.json({user:user[0]})
            else setTimeout(()=>res.status(400).json({error:"invalid credentails"}),10000)
        }).catch((err:any)=>setTimeout(()=>res.status(400).json({error:err}),10000))
    }

}