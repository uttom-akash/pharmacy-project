import RequestHandler from '../../RequestHandler'
import Hash from '../../../../processing/crypto/functionality/Hash256'
import RandomGenerator from '../../../../processing/randomization/RandomGenerator'


export default class Register extends RequestHandler{
    
    handle(req: any, res: any): void {
            const {FirstName,LastName,phoneNumber,password}=req.body;
            
            let qs=`insert into Users(USER_ID,FIRST_NAME,LAST_NAME,ADDRESS,CONTACT_NUMBER,PASSWORD) values(?,?,?,?,?,?)`;
            let passwordhash:string=Hash.getInstance().execute(password)
            
            this.UniqueID().then((userID:string)=>this.pool.query(qs,[userID,FirstName,LastName,"",phoneNumber,passwordhash])
            .then((result:any)=>
                
                    res.json({user :{
                        USER_ID:userID,
                        FIRST_NAME: FirstName,
                        LAST_NAME: LastName,
                        ADDRESS: "",
                        CONTACT_NUMBER:phoneNumber}}),10000 
                )
            .catch((err:any)=>res.status(400).json({error:err}))
)
    }

    private getUserID():string{
        return Hash.getInstance().execute(RandomGenerator.getInstance().getNumber())
    }


    private async UniqueID(){
        
        let query=`select count(*) as id FROM Users where USER_ID=?`
        let unique:boolean=true
        let user_id:string=""

        while(unique){
            user_id=this.getUserID()
            let id:number=await this.pool.query(query,[user_id]).then((id:any)=>id[0]["id"])

            if(id<1)unique=false
        }

        return  user_id;
    }

}