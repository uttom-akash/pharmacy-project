import RequestHandler from '../RequestHandler'


export default class BrandOverview extends RequestHandler{
    
    handle(req: any, res: any): void {
        
        this.getBrandsName().then((brandsList:[])=>{
            let drugs=brandsList.map((brand:any)=>{
                
            let brandedDrugs=this.getDrugs(brand["BRAND"])
               
            return  Promise.all([brandedDrugs]).then((brandedDrugsList:any)=>({BRAND:brand["BRAND"],DRUGS:brandedDrugsList}))

        })
            
            Promise.all(drugs).then((DRUGS:any)=>res.json(DRUGS))
        })
    }


    private getBrandsName(){
        let query=`select distinct BRAND from Drugs`

        return this.pool.query(query,[]).then((brandsList:[])=>brandsList);
    }

    private getDrugs(brand:string){
        let query=`select DRUG_ID,DRUG_NAME,IMAGE_SRC,PRICE,BRAND from Drugs where BRAND=? limit 2`

        return this.pool.query(query,[brand]).then((drugs:any)=>{
            let brandDrugs=drugs.map((drug:any)=>({
                DRUG_ID:drug['DRUG_ID'],
                DRUG_NAME:drug['DRUG_NAME'],
                IMAGE_SRC:drug['IMAGE_SRC'],
                PRICE:drug['PRICE'],
                BRAND:drug['BRAND']
            }))
            
            return brandDrugs
        })

    }

}