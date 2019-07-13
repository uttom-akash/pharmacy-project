import RequestHandlers from '../../RequestHandler'


export default class OrderDetails extends RequestHandlers{
    
    handle(req: any, res: any): void {
        const {orderID}=req.body
        
        this.orderInfo(orderID).then((orderinfo:any)=>{
            this.getDrugsID(orderID).then((drugs:any)=>{
                console.log(drugs);
                
                let drugsList=drugs.map((drugID:any)=>{
                        let query=`select DRUG_NAME,PRICE from Drugs where DRUG_ID=?`
                        return this.pool.query(query,[drugID['DRUG_ID']]).then((drug:any)=>({
                            drugName:drug[0]['DRUG_NAME'],
                            quantity:drugID['QUANTITY'],
                            price :drug[0]['PRICE'],
                            drugID:drugID['DRUG_ID']
                        }))
                    })

                    let    query=`select FIRST_NAME,LAST_NAME from Users where USER_ID=?`
                    
                    this.pool.query(query,[orderinfo['USER_ID']]).then((user:any)=>
                    Promise.all(drugsList).then(drugsList=>res.json({user:user[0],orderinfo,drugsList})))
                })

        })

    }
    private orderInfo(orderID:any){
            let query=`select * from Orders where ORDER_ID=?`;
            return this.pool.query(query,[orderID]).then((resp:any)=>resp[0]);
    }

    private  getDrugsID(orderID:any){
        let query=`select DRUG_ID,QUANTITY from OrderedDrugs where ORDER_ID=?`;
            return this.pool.query(query,[orderID]);
    }
}