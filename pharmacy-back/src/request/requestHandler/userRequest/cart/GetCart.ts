import RequestHandlers from '../../RequestHandler'

export default class GetCart extends RequestHandlers{
    
    handle(req: any, res: any): void {
        const {userID}=req.body
        this.getDrugsID(userID).then((drugsList:any)=>{
            let drugs=drugsList.map((drugID:any)=>this.getDrug(drugID["DRUG_ID"]))
            Promise.all(drugs).then((DRUGS_LIST:any)=>res.json({MORE:DRUGS_LIST}))
        })
    }

    private getDrugsID(userID:string){
        const query='select DRUG_ID from Cart where USER_ID=?'
        return this.pool.query(query,[userID])    
    
    }

    private getDrug(DRUG_ID:number){
        const query=`select PRICE,BRAND from Drugs where DRUG_ID=?`

        return this.pool.query(query,[DRUG_ID]).then((drug:any)=>{
            if(drug.length){
            return {
                PRICE:drug[0]['PRICE'],
                BRAND:drug[0]['BRAND']
            }}else{
                return {}
            }
        })
    }


}