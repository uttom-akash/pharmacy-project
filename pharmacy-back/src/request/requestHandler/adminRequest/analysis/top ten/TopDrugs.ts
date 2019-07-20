import RequestHandler from '../../../RequestHandler'
import TimeStamp from '../../../../../processing/timestamp/TimeStamp'

export default class TopTenDrugs extends RequestHandler{

    handle(req: any, res: any): void {
        let {date,days,limit}=req.body
        limit=parseInt(limit,10)

        let dateObject=TimeStamp.getInstance()
            dateObject.setDays(days,date)
            let enddate=dateObject.dateMonthYear()

            if(days<0){
                let temp=date;
                date=enddate;
                enddate=temp
            }
            

        let query=`select sum(ds.TOTAL_MRP_PRICE) sales,d.DRUG_NAME name from DrugSales ds inner join Drugs d using(DRUG_ID) where SALES_DATE>=? and SALES_DATE<? group by DRUG_ID order by sales desc limit ?`
        this.pool.query(query,[date,enddate,limit]).then((drugs:any)=>{
            query=`select sum(SALES_PRICE) total from Orders where DATE>=? and DATE<?`
            this.pool.query(query,[date,enddate]).then((sales:any)=>res.json({drugs,total:sales[0]['total']}))
        })
    }

}