import RequestHandlers from '../../RequestHandler'
import TimeStamp from '../../../../processing/timestamp/TimeStamp'


export default class ConfirmOrder extends RequestHandlers{
    
    handle(req: any, res: any): void {
        const {userID,contactNumber,totalPrice,address,list}=req.body
        
        let timeStamp=TimeStamp.getInstance()
        const date=timeStamp.dateMonthYear()
        const time=timeStamp.time()
        
        let query=`insert into Orders(USER_ID,TOTAL_PRICE,DATE,TIME,ADDRESS,USER_CONTACT_NUMBER ) values(?,?,?,?,?,?)`
        this.pool.query(query,[userID,totalPrice,date,time,address,contactNumber]).then((response:any)=>{
            this.insertOrders(response['insertId'],list).then((response:any)=>res.json({pending:true}))    
        })
        
    }


    private async insertOrders(orderID:any,list:any){
        let query=`insert into OrderedDrugs(ORDER_ID,DRUG_ID,QUANTITY) values(?,?,?)`
        return await  list.map((drug:any)=>this.pool.query(query,[orderID,drug['drugID'],drug['quantity']]))
    }
}