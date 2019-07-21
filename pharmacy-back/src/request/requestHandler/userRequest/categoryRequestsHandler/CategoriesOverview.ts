import RequestHandler from '../../RequestHandler'


export default class CategoriesOverview extends RequestHandler{
    
    handle(req: any, res: any): void {

        this.getCategories().then((categoryList:any)=>{
            let {limit}=req.body
            limit=parseInt(limit)
            let drugs=categoryList.map((category:any)=> {

                return this.getDrugsID(category["CATEGORY_ID"],limit).then((drugsIDList:any)=>{
                      
                    let categoryDrugs=drugsIDList.map((drug_id:any) => {
                        return  this.getDrug(drug_id['DRUG_ID']) 
                    })
                   
                   return Promise.all(categoryDrugs).then((categoryDrugsList:any)=>({CATEGORY:category["CATEGORY_NAME"],CATEGORY_ID:category["CATEGORY_ID"],DRUGS:categoryDrugsList}));       
                })              
            });
            

            Promise.all(drugs).then((DRUGS:any)=>res.json(DRUGS))
                 
        })
        
        
    }
    
    private getDrug(DRUG_ID:number){
        const query=`select DRUG_ID,DRUG_NAME,IMAGE_SRC,PRICE,DISCOUNT from Drugs where DRUG_ID=?`

        return this.pool.query(query,[DRUG_ID]).then((drug:any)=>{
            if(drug.length){
            return {
                DRUG_ID:drug[0]['DRUG_ID'],    
                DRUG_NAME:drug[0]['DRUG_NAME'],
                IMAGE_SRC:drug[0]['IMAGE_SRC'],
                PRICE:drug[0]['PRICE'],
                DISCOUNT:drug[0]['DISCOUNT']
            }}else{
                return {}
            }
        })
    }

    private getDrugsID(category:number,limit:number){
        let query=`select DRUG_ID from DrugCategory where CATEGORY_ID=? limit ?`;
        return this.pool.query(query,[category,limit]);
    }

    private getCategories(){
        let query=`select CATEGORY_ID,CATEGORY_NAME from Category`
        return  this.pool.query(query,[])   
    }

}