import RequestHandlers from '../../RequestHandler'


export default class Drugs extends RequestHandlers{
    
    handle(req: any, res: any): void {
        const {drugID}=req.body
        this.getDrug(drugID).then((drug:any)=>res.json({drug})).catch((err:any)=>res.json({error:err}))
    }


    private getDrug(DRUG_ID:number){
        const query=`select DRUG_ID,DRUG_NAME,BRAND_NAME,MENUFACTURER_ID,BRAND,DAR,PRICE,IMAGE_SRC from Drugs where DRUG_ID=?`
        
        
        return this.pool.query(query,[DRUG_ID]).then((drug:any)=>({
            DRUG_ID:drug[0]['DRUG_ID'],
            DRUG_NAME:drug[0]['DRUG_NAME'],
            BRAND_NAME:drug[0]['BRAND_NAME'],
            MENUFACTURER:drug[0]['MENUFACTURER'],
            BRAND:drug[0]['BRAND'],
            DAR:drug[0]['DAR'],
            PRICE:drug[0]['PRICE'],
            IMAGE_SRC:drug[0]['IMAGE_SRC']
        }))
    }


}