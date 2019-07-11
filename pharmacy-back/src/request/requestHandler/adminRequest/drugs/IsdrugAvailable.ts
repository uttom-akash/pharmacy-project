import RequestHandlers from '../../RequestHandler'


export default class IsDrugAvailable extends RequestHandlers{
    
    handle(req: any, res: any): void {
        
        const {drugName}=req.body
        this.IsDrug(drugName).then((id:string)=>res.json({id}))
    }

    private IsDrug(drugName:string){
        let query=`select DRUG_ID as id from Drugs where DRUG_NAME=?`;
        return this.pool.query(query,[drugName]).then((res:any)=>{return (res.length>0 ? res[0]['id']:"-1")})
}


}