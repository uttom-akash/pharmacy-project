import RequestHandler from '../../../RequestHandler'


export default class TopTenSales extends RequestHandler{

    handle(req: any, res: any): void {
        
        let query=`select sum(ds.TOTAL_MRP_PRICE) as total,d.DRUG_NAME as name from DrugSales ds inner join Drugs d using(DRUG_ID) where SALES_DATE>='2019-07-18' group by ds.DRUG_ID order by total desc limit 9`
        
    }

}