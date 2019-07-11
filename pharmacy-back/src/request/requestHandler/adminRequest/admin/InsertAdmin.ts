import RequestHandler from '../../RequestHandler'
import Hash from '../../../../processing/crypto/functionality/Hash256'
import RandomGenerator from '../../../../processing/randomization/RandomGenerator'
import fs from 'fs'

export default class InsertAdmin extends RequestHandler{

    handle(req: any, res: any): void {

            const {firstName,lastName,address,contactNumber,password}=req.body;
            
            let qs=`insert into Admin(ADMIN_ID,FIRST_NAME,LAST_NAME,ADDRESS,CONTACT_NUMBER,PASSWORD) values(?,?,?,?,?,?)`;
            let passwordhash:string=Hash.getInstance().execute(password)
            
            this.UniqueID().then((adminID:string)=>this.pool.query(qs,[adminID,firstName,lastName,address,contactNumber,passwordhash])
            .then((result:any)=>{
                    res.json({result:true})
                })
            .catch((err:any)=>res.status(400).json({error:err}))
)
    }


    private saveProfile(adminID:string,profilePicture:any):void{
        fs.createWriteStream(
            `./dist/uploads/profile/${adminID}.jpeg`
          ).write(new Buffer(profilePicture.split(",")[1], "base64"));
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