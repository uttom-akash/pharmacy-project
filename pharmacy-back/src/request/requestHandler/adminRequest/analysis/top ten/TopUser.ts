import RequestHandler from '../../../RequestHandler'
import TimeStamp from '../../../../../processing/timestamp/TimeStamp'

export default class TopTenUsers extends RequestHandler{

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
            

        let query=`select u.LAST_NAME name,sum(o.SALES_PRICE) sales  from Users u inner join Orders o using(USER_ID) where DATE>=? and DATE<? group by USER_ID order by sales desc limit ?`
        this.pool.query(query,[date,enddate,limit]).then((users:any)=>{
            query=`select sum(SALES_PRICE) total from Orders where DATE>=? and DATE<?`
            this.pool.query(query,[date,enddate]).then((sales:any)=>res.json({users,total:sales[0]['total']}))
        })
    }

}