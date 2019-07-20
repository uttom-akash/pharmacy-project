import RequestHandlers from '../../RequestHandler'


export default class IsDrugAvailable extends RequestHandlers{
    
    handle(req: any, res: any): void {
        
        const {drugID}=req.body
        this.IsDrug(drugID).then((id:string)=>res.json({id}))
    }

    private IsDrug(drugID:string){
        let query=`select DRUG_ID as id from Drugs where DRUG_ID=?`;
        return this.pool.query(query,[drugID]).then((res:any)=>{return (res.length>0 ? res[0]['id']:"-1")})
}


}