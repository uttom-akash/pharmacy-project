import RequestHandlers from '../../RequestHandler'


export default class CategoryDrugs extends RequestHandlers{
    
    handle(req: any, res: any): void {
        const {categoryID}=req.body

        // this.getDrugsID(categoryID,offset).then((drugsList:any)=>{
        //     let drugs=drugsList.map((drugID:any)=>this.getDrug(drugID["DRUG_ID"]))
        //     this.isMore(categoryID).then((cnt:any)=>
        //     Promise.all(drugs).then((DRUGS_LIST:any)=>res.json({MORE:(offset+15<cnt['cnt'] ? true:false),DRUGS_LIST}))
        //     )
        // })

        this.getDrugs(categoryID).then((drugsList:any)=>res.json({DRUGS_LIST:drugsList}))

         
    }

    // private isMore(categoryID:number){
    //     const query=`select count(*) as cnt from DrugCategory where CATEGORY_ID=?`
    //     return this.pool.query(query,categoryID).then((cnt:any)=>cnt[0])
    // }
    
    // private getDrugsID(CATEGORY_ID:number){
    //      const query=`select DRUG_ID from DrugCategory where CATEGORY_ID=?`
    //      return this.pool.query(query,[CATEGORY_ID])
    // }


    private getDrugs(categoryID:number){
        const query=`select DRUG_ID,DRUG_NAME,IMAGE_SRC,PRICE from Drugs inner join DrugCategory dc using(DRUG_ID) where dc.CATEGORY_ID=?`


        return this.pool.query(query,[categoryID])
    }


}