import RequestHandler from '../../RequestHandler'
import Hash from '../../../../processing/crypto/functionality/Hash256'
import RandomGenerator from '../../../../processing/randomization/RandomGenerator'


export default class Register extends RequestHandler{
    
    handle(req: any, res: any): void {
            const {FirstName,LastName,salary,nid,phoneNumber,address,ref_name,ref_num}=req.body;
            
            let qs=`insert into Users(EMPLOYEE_ID,FIRST_NAME,LAST_NAME,SALARY,NID,MOBILE_NO,ADDRESS,REF_NAME,REF_NUM) values(?,?,?,?,?,?,?,?,?)`;
            
            this.UniqueID().then((EmployeeID:string)=>this.pool.query(qs,[EmployeeID,FirstName,LastName,salary,nid,phoneNumber,address,ref_name,ref_num])
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
        
        let query=`select count(*) as id FROM Employee where EMPLOYEE_ID=?`
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