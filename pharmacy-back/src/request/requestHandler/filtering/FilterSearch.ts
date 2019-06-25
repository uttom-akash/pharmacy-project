import RequestHandlers from '../RequestHandler'
import mysql from 'mysql'

export default class FilterSearch extends RequestHandlers{
    
    handle(req: any, res: any): void {
       let {CATEGORY,BRAND,PRICE}=req.body;
       
       BRAND='^'+BRAND+'.*'
       if(!PRICE)PRICE=100000
       
       this.getDrugsbymoreCategory(CATEGORY,PRICE,BRAND).then((DrugsList:any)=>res.json(DrugsList)); 
    }

    private getDrugsbymoreCategory(category:number[],price:number,brand:string){
        let selectPart=`select d.DRUG_ID,d.DRUG_NAME,d.IMAGE_SRC,d.PRICE,d.BRAND from Drugs d inner join DrugCategory dc1 using(DRUG_ID)`
        let wherePart=`where dc1.CATEGORY_ID=?`
        
        for(let i:number=1;i<category.length;i++){
            let selectConcat:string=` inner join DrugCategory dc${i+1} using(DRUG_ID)`
            let whereConcat:string=` and dc${i+1}.CATEGORY_ID=?`


            selectPart+=selectConcat
            wherePart+=whereConcat
        }


        const query=`${selectPart}  ${wherePart} and d.PRICE<${mysql.escape(price)} and d.BRAND regexp ${mysql.escape(brand)}  limit 2`
        return this.pool.query(query,category).then((drugsList:any)=>drugsList)

    }



    // private getDrug(DRUG_ID:number){
    //     const query=`select DRUG_ID,DRUG_NAME,IMAGE_SRC,PRICE from Drugs where DRUG_ID=?`

    //     return this.pool.query(query,[DRUG_ID]).then((drug:any)=>({
    //         DRUG_ID:drug[0]['DRUG_ID'],
    //         DRUG_NAME:drug[0]['DRUG_NAME'],
    //         IMAGE_SRC:drug[0]['IMAGE_SRC'],
    //         PRICE:drug[0]['PRICE']
    //     }))
    // }
}