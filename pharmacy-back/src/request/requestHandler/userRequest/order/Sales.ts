import RequestHandlers from '../../RequestHandler'


export default class Sales extends RequestHandlers{
    
    handle(req: any, res: any): void {
        const {orderID,selectedlist}=req.body
        
        
        selectedlist.map((selected:any)=>{
            let query=`insert into DrugSales values(?,?,?)`;
            this.pool.query(query,[orderID,selected['drugID'],selected['quantity']])
        })

        res.json({result:true})
    }
}