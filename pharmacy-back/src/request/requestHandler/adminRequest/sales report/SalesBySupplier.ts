import RequestHandler from '../../RequestHandler'
import TimeStamp from '../../../../processing/timestamp/TimeStamp'


export default class SalesBySupplier extends RequestHandler{

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
            let query=`select SUPPLIER_NAME as title,sum(ds.QUANTITY) quantity,sum(ds.TOTAL_MRP_PRICE) mrp_price,sum(ds.QUANTITY*ds.SUPPLIER_PRICE) sup_price from DrugSales ds inner join Supply s  using(DRUG_ID) inner join Supplier si using(SUPPLIER_ID) where ds.SALES_DATE>=? and ds.SALES_DATE<=?  group by SUPPLIER_ID order by quantity desc`
            this.pool.query(query,[date,enddate]).then((result:any)=>res.json({list:result,startDate:date,enddate}))
    }
}