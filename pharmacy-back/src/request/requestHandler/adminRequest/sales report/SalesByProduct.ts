import RequestHandler from '../../RequestHandler'
import TimeStamp from '../../../../processing/timestamp/TimeStamp'


export default class SalesByProduct extends RequestHandler{

    handle(req: any, res: any): void {
            let {date,days}=req.body;
            
            let dateObject=TimeStamp.getInstance()
            dateObject.setDays(days,date)
            let enddate=dateObject.dateMonthYear()

            if(days<0){
                let temp=date;
                date=enddate;
                enddate=temp
            }

           let query=`select d.DRUG_NAME as title,sum(ds.QUANTITY) as quantity,d.PRICE as mrp_price,sum(ds.QUANTITY*ds.SUPPLIER_PRICE) as sup_price,d.BRAND as brand from DrugSales ds inner join Drugs d using(DRUG_ID) where SALES_DATE>=? and SALES_DATE<=? group by ds.DRUG_ID order by quantity desc`
            console.log(query);
            
            this.pool.query(query,[date,enddate]).then((result:any)=>res.json({list:result,startDate:date,enddate}))
            
    }
}