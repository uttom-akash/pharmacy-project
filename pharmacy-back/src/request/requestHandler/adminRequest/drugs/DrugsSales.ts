import RequestHandler from '../../RequestHandler'


export default class GetDrug extends RequestHandler{

    handle(req: any, res: any): void {
            
            let query=`select count(*) as cnt,DRUG_NAME,BRAND from DrugStates inner join Drugs using(DRUG_ID) group by DRUG_ID`
            console.log(query);
            this.pool.query(query).then((result:any)=>res.json({List:result}))
    }

}