import RequestHandlers from '../../RequestHandler'


export default class OrderDetails extends RequestHandlers{
    
    handle(req: any, res: any): void {
        const {orderID}=req.body
        
        this.orderInfo(orderID).then((orderinfo:any)=>{
            this.getDrugsID(orderID).then((drugs:any)=>{
                    let    query=`select FIRST_NAME,LAST_NAME from Users where USER_ID=?`

                    this.pool.query(query,[orderinfo['USER_ID']]).then((user:any)=>{
                    Promise.all(drugs).then(drugsList=>res.json({user:user[0],orderinfo,drugsList}))
                        })
                })

        })

    }

    private orderInfo(orderID:any){
            let query=`select * from Orders where ORDER_ID=?`;
            return this.pool.query(query,[orderID]).then((resp:any)=>resp[0]);
    }

    private  getDrugsID(orderID:any){
        let query=`select d.DRUG_ID,d.DRUG_NAME,d.PRICE,ds.SUPPLIER_PRICE,ds.QUANTITY from DrugSales ds inner join Drugs d using(DRUG_ID) where ORDER_ID=?`;

        return this.pool.query(query,[orderID]).then((drugs:any)=>{
            return drugs.map((drug:any)=>({
                drugName:drug['DRUG_NAME'],
                quantity:drug['QUANTITY'],
                price :drug['PRICE'],
                supplierPrice:drug['SUPPLIER_PRICE'],
                drugID:drug['DRUG_ID']
            }))
        });
    }
}