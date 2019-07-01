import RequestHandler from '../../RequestHandler'
import Hash from '../../../../processing/crypto/functionality/Hash256'
import RandomGenerator from '../../../../processing/randomization/RandomGenerator'


export default class InsertUser extends RequestHandler{
    
    handle(req: any, res: any): void {
            const {FirstName,LastName,address,phoneNumber,password}=req.body;
            let qs=`insert into Users(USER_ID,FIRST_NAME,LAST_NAME,ADDRESS,CONTACT_NUMBER,PASSWORD) values(?,?,?,?,?,?)`;
            let userID:string=Hash.getInstance().execute(RandomGenerator.getInstance().getNumber())
            let passwordhash:string=Hash.getInstance().execute(password)
            
            this.pool.query(qs,[userID,FirstName,LastName,address,phoneNumber,passwordhash])
            .then((result:any)=>
                setTimeout(()=>{
                    res.json({user :{
                        FIRST_NAME: FirstName,
                        LAST_NAME: LastName,
                        ADDRESS: "",
                        CONTACT_NUMBER:phoneNumber}}),10000 
                }))
            .catch((err:any)=>setTimeout(()=>res.status(400).json({error:err}),10000))

    }

}