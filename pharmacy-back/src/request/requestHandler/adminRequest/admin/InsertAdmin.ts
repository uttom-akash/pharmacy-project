import RequestHandler from '../../RequestHandler'
import Hash from '../../../../processing/crypto/functionality/Hash256'
import RandomGenerator from '../../../../processing/randomization/RandomGenerator'


export default class Register extends RequestHandler{
    
    handle(req: any, res: any): void {
            const {FirstName,LastName,address,phoneNumber,password}=req.body;
            
            let qs=`insert into Users(ADMIN_ID,FIRST_NAME,LAST_NAME,ADDRESS,CONTACT_NUMBER,PASSWORD) values(?,?,?,?,?,?)`;
            let passwordhash:string=Hash.getInstance().execute(password)
            
            this.UniqueID().then((adminID:string)=>this.pool.query(qs,[adminID,FirstName,LastName,address,phoneNumber,passwordhash])
            .then((result:any)=>
                setTimeout(()=>{
                    res.json({user :{
                        FIRST_NAME: FirstName,
                        LAST_NAME: LastName,
                        ADDRESS: "",
                        CONTACT_NUMBER:phoneNumber}}),10000 
                }))
            .catch((err:any)=>setTimeout(()=>res.status(400).json({error:err}),10000))
)
    }

    private getUserID():string{
        return Hash.getInstance().execute(RandomGenerator.getInstance().getNumber())
    }


    private async UniqueID(){
        
        let query=`select count(*) as id FROM Admin where ADMIN_ID=?`
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