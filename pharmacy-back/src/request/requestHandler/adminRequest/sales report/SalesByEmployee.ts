import RequestHandler from '../../RequestHandler'
import TimeStamp from '../../../../processing/timestamp/TimeStamp'


export default class SalesByEmployee extends RequestHandler{

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

           let query=`select  concat(u.FIRST_NAME," ",u.LAST_NAME) as title,sum(o.SALES_PRICE) as mrp_price,sum(o.SUPPLIER_PRICE) as sup_price from Orders o inner join Employee u using(EMPLOYEE_ID) where o.DATE>=? and o.DATE<=?  group by u.EMPLOYEE_ID order by mrp_price desc`
            this.pool.query(query,[date,enddate]).then((result:any)=>res.json({list:result,startDate:date,enddate}))
            
    }
}