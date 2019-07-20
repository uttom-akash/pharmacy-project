import RequestHandler from '../../RequestHandler'
import TimeStamp from '../../../../processing/timestamp/TimeStamp'


export default class SalesByDays extends RequestHandler{

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
            
            let query=`select  sum(SALES_PRICE) as sales,DATE as date from Orders where DATE>=? and DATE<? group by DATE order by DATE`
            this.pool.query(query,[date,enddate]).then((result:any)=>res.json({list:result,startDate:date,enddate,total:result.reduce((a:any,b:any)=>({sales: a.sales+b.sales}))['sales']}))
            
    }
}