import RequestHandler from '../../RequestHandler'
import Hash from '../../../../processing/crypto/functionality/Hash256'
import RandomGenerator from '../../../../processing/randomization/RandomGenerator'



export default class InsertMenufecturer extends RequestHandler{
    
    handle(req: any, res: any): void {
        const {menufacturerName,email,mobileNo,address}=req.body;
        
        let query= `insert into Supplier values(?,?,?,?,?)`
        
        this.UniqueID().then((ID:string)=>this.pool.query(query,[ID,menufacturerName,email,mobileNo,address])
                                          .then((result:any)=>res.json({result}))
                                          .catch((err:any)=>res.json({error:err})))
        
    }


    private getUserID():string{
        return Hash.getInstance().execute(RandomGenerator.getInstance().getNumber())
    }


    private async UniqueID(){
        
        let query=`select count(*) as id FROM Menufacturer where MENUFACTURER_ID=?`
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