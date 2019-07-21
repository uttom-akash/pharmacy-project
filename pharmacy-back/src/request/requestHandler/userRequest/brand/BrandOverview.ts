import RequestHandler from '../../RequestHandler'


export default class BrandOverview extends RequestHandler{
    
    handle(req: any, res: any): void {
        
        this.getBrandsName().then((brandsList:any)=>{
            let drugs=brandsList.map((brand:any)=>{
                    let brandedDrugs=this.getDrugs(brand["BRAND"])
                    return Promise.all([brandedDrugs]).then((brandedDrugs)=>({BRAND:brand["BRAND"],DRUGS:brandedDrugs}))
                })
            
            Promise.all(drugs).then((DRUGS:any)=>res.json(DRUGS.map((drug:any)=>({BRAND:drug['BRAND'],DRUGS:drug['DRUGS'][0]}))))
        })
    }


    private getBrandsName(){
        let query=`select distinct BRAND from Drugs`

        return this.pool.query(query,[]).then((brandsList:[])=>brandsList);
    }

    private getDrugs(brand:string){
        let query=`select DRUG_ID,DRUG_NAME,IMAGE_SRC,PRICE,BRAND,DISCOUNT from Drugs where BRAND=? limit 4`

        return this.pool.query(query,[brand])

    }

}