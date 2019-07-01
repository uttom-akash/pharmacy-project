import RequestHandlers from '../../RequestHandler'


export default class BrandDrugs extends RequestHandlers{
    
    handle(req: any, res: any): void {
        const {brand,offset}=req.body
        this.getDrug(brand,offset).then((drugsList:any)=>{
             this.isMore(brand).then((cnt:any)=>res.json({MORE:(offset+15<cnt['cnt'] ?true:false ) ,DRUGS_LIST:drugsList}))
        })
    }

    private isMore(brand:string){
        const query=`select count(*) as cnt from Drugs where BRAND=?`
        return this.pool.query(query,brand).then((cnt:any)=>cnt[0])
    }    

    private getDrug(brand:string,offset:number){
        const query=`select DRUG_ID,DRUG_NAME,IMAGE_SRC,PRICE from Drugs where BRAND=? limit ?,15`

        return this.pool.query(query,[brand,offset]).then((drugslist:any)=>drugslist)
    }


}