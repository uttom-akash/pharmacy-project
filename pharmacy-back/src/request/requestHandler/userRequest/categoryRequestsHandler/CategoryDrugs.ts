import RequestHandlers from '../../RequestHandler'


export default class CategoryDrugs extends RequestHandlers{
    
    handle(req: any, res: any): void {
        const {categoryID}=req.body

        this.getDrugs(categoryID).then((drugsList:any)=>res.json({DRUGS_LIST:drugsList}))

         
    }

    private getDrugs(categoryID:number){
        const query=`select DRUG_ID,DRUG_NAME,IMAGE_SRC,PRICE from Drugs inner join DrugCategory dc using(DRUG_ID) where dc.CATEGORY_ID=?`


        return this.pool.query(query,[categoryID])
    }


}