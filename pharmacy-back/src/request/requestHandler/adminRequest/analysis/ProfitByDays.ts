import RequestHandler from '../../RequestHandler'
import TimeStamp from '../../../../processing/timestamp/TimeStamp'


export default class ProfitByDays extends RequestHandler{

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
            
            let query=`select DATE as date,sum(SALES_PRICE-SUPPLIER_PRICE) as profit from Orders where DATE>=? and DATE<=? group by DATE order by DATE`
            this.pool.query(query,[date,enddate]).then((result:any)=>res.json({list:result,startDate:date,enddate,total:result.concat([{profit:0}]).reduce((a:any,b:any)=>({profit: a.profit+b.profit}))['profit']}))
            
    }
}