import RequestHandlers from '../RequestHandler'


export default class BrandDrugs extends RequestHandlers{
    
    handle(req: any, res: any): void {
        const {BRAND}=req.body
        
        this.getDrug(BRAND).then((drugsList:any)=>res.json({DRUGS:drugsList}))
         
    }


    private getDrug(BRAND:string){
        const query=`select DRUG_ID,DRUG_NAME,IMAGE_SRC,PRICE from Drugs where BRAND=? limit 30`

        return this.pool.query(query,[BRAND]).then((drugslist:any)=>drugslist)
    }


}