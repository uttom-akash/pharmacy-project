import RequestHandlers from '../RequestHandler'


export default class CategoryDrugs extends RequestHandlers{
    
    handle(req: any, res: any): void {
        const {CATEGORY_ID}=req.body
        
        this.getDrugsID(CATEGORY_ID).then((drugsList:any)=>{
            let drugs=drugsList.map((drugID:any)=>this.getDrug(drugID["DRUG_ID"]))
            Promise.all(drugs).then((DRUGS_LIST:any)=>res.json({DRUGS_LIST}))
        })
         
    }

    
    private getDrugsID(CATEGORY_ID:number){
         const query=`select DRUG_ID from DrugCategory where CATEGORY_ID=? limit 30`
         
         return this.pool.query(query,[CATEGORY_ID])
    }


    private getDrug(DRUG_ID:number){
        const query=`select DRUG_ID,DRUG_NAME,IMAGE_SRC,PRICE from Drugs where DRUG_ID=?`

        return this.pool.query(query,[DRUG_ID]).then((drug:any)=>({
            DRUG_ID:drug[0]['DRUG_ID'],
            DRUG_NAME:drug[0]['DRUG_NAME'],
            IMAGE_SRC:drug[0]['IMAGE_SRC'],
            PRICE:drug[0]['PRICE']
        }))
    }


}