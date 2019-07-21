import RequestHandler from '../../RequestHandler'
import TimeStamp from '../../../../processing/timestamp/TimeStamp'

export default class TrendingDrugs extends RequestHandler{

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
            

        let query=`select DRUG_NAME,BRAND,PRICE,IMAGE_SRC,sum(TOTAL_MRP_PRICE) sales from DrugSales ds inner join Drugs d using(DRUG_ID) where SALES_DATE>=? and SALES_DATE<? group by DRUG_ID order by sales desc limit ?`
        this.pool.query(query,[date,enddate,limit]).then((drugs:any)=>res.json({drugs}))
    }

}