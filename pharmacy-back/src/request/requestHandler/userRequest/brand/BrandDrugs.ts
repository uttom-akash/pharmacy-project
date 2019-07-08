import RequestHandlers from '../../RequestHandler'


export default class BrandDrugs extends RequestHandlers{
    
    handle(req: any, res: any): void {
        const {brand}=req.body
        this.getDrug(brand).then((drugsList:any)=>res.json({DRUGS_LIST:drugsList}))
    }

    // private isMore(brand:string){
    //     const query=`select count(*) as cnt from Drugs where BRAND=?`
    //     return this.pool.query(query,brand).then((cnt:any)=>cnt[0])
    // }    

    private getDrug(brand:string){
        const query=`select DRUG_ID,DRUG_NAME,IMAGE_SRC,PRICE from Drugs where BRAND=?`

        return this.pool.query(query,[brand]).then((drugslist:any)=>drugslist)
    }


}