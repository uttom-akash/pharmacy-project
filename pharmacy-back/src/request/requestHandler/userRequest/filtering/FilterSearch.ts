import RequestHandlers from '../../RequestHandler'
import mysql from 'mysql'

export default class FilterSearch extends RequestHandlers{
    
    handle(req: any, res: any): void {
       let {categories,minPrice,maxPrice,brand}=req.body;
       
       console.log(req.body);
       
       brand='^'+brand+'.*'
       
       if(!minPrice)minPrice=0
       if(!maxPrice)maxPrice=1000000

       this.getDrugsbymoreCategory(categories,minPrice,maxPrice,brand).then((DrugsList:any)=>res.json(DrugsList)); 
    }

    private getDrugsbymoreCategory(categories:any[],minPrice:number,maxPrice:number,brand:string){
        let selectPart=`select d.DRUG_ID,d.DRUG_NAME,d.IMAGE_SRC,d.PRICE,d.BRAND from Drugs d inner join DrugCategory dc1 using(DRUG_ID)`
        let wherePart=``

        if(categories.length)
            wherePart=`where dc1.CATEGORY_ID=? and`
        else
            wherePart=`where `    
        
        
        for(let i:number=1;i<categories.length;i++){
            let selectConcat:string=` inner join DrugCategory dc${i+1} using(DRUG_ID)`
            let whereConcat:string=` dc${i+1}.CATEGORY_ID=? and `


            selectPart+=selectConcat
            wherePart+=whereConcat
        }


        const query=`${selectPart}  ${wherePart} d.PRICE>=${mysql.escape(minPrice)} and d.PRICE<=${mysql.escape(maxPrice)}  and d.BRAND regexp ${mysql.escape(brand)}`
        console.log(query);
        
        return this.pool.query(query,categories).then((drugsList:any)=>drugsList)

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