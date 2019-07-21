import RequestHandler from '../../RequestHandler'
import TimeStamp from '../../../../processing/timestamp/TimeStamp'


export default class SalesByManufacturer extends RequestHandler{

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

           let query=`select sum(ds.QUANTITY) as quantity,sum(ds.TOTAL_MRP_PRICE) as mrp_price,sum(ds.SUPPLIER_PRICE*ds.QUANTITY) as sup_price,d.BRAND as title from DrugSales ds inner join Drugs d using(DRUG_ID) where ds.SALES_DATE>=? and ds.SALES_DATE<=? group by brand order by mrp_price desc`
            this.pool.query(query,[date,enddate]).then((result:any)=>res.json({list:result,startDate:date,enddate}))
            
    }
}