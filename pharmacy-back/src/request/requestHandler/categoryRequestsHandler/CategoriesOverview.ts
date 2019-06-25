import RequestHandler from '../RequestHandler'


export default class CategoriesOverview extends RequestHandler{
    
    handle(req: any, res: any): void {
        
        this.getCategories().then((categoryList:any)=>{

            let drugs=categoryList.map((category:any)=> {

                return this.getDrugsID(category["CATEGORY_ID"]).then((drugsIDList:any)=>{
                      
                    let categoryDrugs=drugsIDList.map((drug_id:any) => {
                        return  this.getDrug(drug_id['DRUG_ID']) 
                    })
                   
                   return Promise.all(categoryDrugs).then((categoryDrugsList:any)=>({CATEGORY:category["CATEGORY_NAME"],DRUGS:categoryDrugsList}));       
                })              
            });
            

            Promise.all(drugs).then((DRUGS:any)=>res.json(DRUGS))
                 
        })
        
        
    }
    
    private getDrug(DRUG_ID:number){
        const query=`select DRUG_ID,DRUG_NAME,IMAGE_SRC,PRICE from Drugs where DRUG_ID=?`

        return this.pool.query(query,[DRUG_ID]).then((drug:any)=>{
            if(drug.length){
            return {
                DRUG_ID:drug[0]['DRUG_ID'],    
            DRUG_NAME:drug[0]['DRUG_NAME'],
            IMAGE_SRC:drug[0]['IMAGE_SRC'],
            PRICE:drug[0]['PRICE']
            }}else{
                return {}
            }
        })
    }

    private getDrugsID(category:number){
        let query=`select DRUG_ID from DrugCategory where CATEGORY_ID=? limit 5`;
        return this.pool.query(query,[category]);
    }

    private getCategories(){
        let query=`select CATEGORY_ID,CATEGORY_NAME from Category`
        return  this.pool.query(query,[])   
    }

}