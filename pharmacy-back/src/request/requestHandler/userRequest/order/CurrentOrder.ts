import RequestHandlers from '../../RequestHandler'


export default class CurrentOrder extends RequestHandlers{
    
    handle(req: any, res: any): void {
        const {userID}=req.body
        

        const query=`select ORDER_ID,DATE_FORMAT(NOW(), '%d-%m-%Y') as DATE,TIME,TOTAL_PRICE,REC_STATUS from Orders where REC_STATUS=? and USER_ID=?`
        
        this.pool.query(query,[0,userID]).then((ORDERS:any)=>res.json({ORDERS}))    
    }
}