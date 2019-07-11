import RequestHandler from '../../RequestHandler'
import Hash from '../../../../processing/crypto/functionality/Hash256'
import RandomGenerator from '../../../../processing/randomization/RandomGenerator'
import fs from 'fs'

export default class InsertEmployee extends RequestHandler{

    handle(req: any, res: any): void {

            const {firstName,lastName,salary,nid,address,contactNumber,RefName,RefNumber,profilePicture}=req.body;
            
            let qs=`insert into Employee(EMPLOYEE_ID,FIRST_NAME,LAST_NAME,SALARY,NID,ADDRESS,MOBILE_NO,REF_NAME,REF_NUM) values(?,?,?,?,?,?,?,?,?)`;
            
            this.UniqueID().then((ID:string)=>this.pool.query(qs,[ID,firstName,lastName,salary,nid,address,contactNumber,RefName,RefNumber])
            .then((result:any)=>{
                    this.saveProfile(ID,profilePicture)
                    res.json({result:true})
                })
            .catch((err:any)=>res.status(400).json({error:err}))
)
    }


    private saveProfile(adminID:string,profilePicture:any):void{
        fs.createWriteStream(
            `./src/uploads/employee/${adminID}.jpeg`
          ).write(new Buffer(profilePicture.split(",")[1], "base64"));
    }


    private getUserID():string{
        return Hash.getInstance().execute(RandomGenerator.getInstance().getNumber())
    }


    private async UniqueID(){
        
        let query=`select count(*) as id FROM Employee where Employee_ID=?`
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