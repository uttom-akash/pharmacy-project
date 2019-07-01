import RequestHandlers from '../../RequestHandler'


export default class CategoryDrugs extends RequestHandlers{
    
    handle(req: any, res: any): void {
        const {categoryID,offset}=req.body

        this.getDrugsID(categoryID,offset).then((drugsList:any)=>{
            let drugs=drugsList.map((drugID:any)=>this.getDrug(drugID["DRUG_ID"]))
            this.isMore(categoryID).then((cnt:any)=>
            Promise.all(drugs).then((DRUGS_LIST:any)=>res.json({MORE:(offset+15<cnt['cnt'] ? true:false),DRUGS_LIST}))
            )
        })
         
    }

    private isMore(categoryID:number){
        const query=`select count(*) as cnt from DrugCategory where CATEGORY_ID=?`
        return this.pool.query(query,categoryID).then((cnt:any)=>cnt[0])
    }
    
    private getDrugsID(CATEGORY_ID:number,offset:number){
         const query=`select DRUG_ID from DrugCategory where CATEGORY_ID=? limit ?,15`
         
         return this.pool.query(query,[CATEGORY_ID,offset])
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