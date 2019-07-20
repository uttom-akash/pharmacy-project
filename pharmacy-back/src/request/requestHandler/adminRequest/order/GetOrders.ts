import RequestHandler from '../../RequestHandler'
import TimeStamp from '../../../../processing/timestamp/TimeStamp'

export default class GetOrders extends RequestHandler{

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

            let query=`select * from Orders where DATE>=? and DATE<?`
            console.log(query);
            this.pool.query(query,[date,enddate]).then((result:any)=>res.json({List:result,startDate:date,endDate:enddate}))
    }

}