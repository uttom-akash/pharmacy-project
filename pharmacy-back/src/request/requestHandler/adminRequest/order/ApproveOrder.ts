import RequestHandler from '../../RequestHandler'

export default class ApproveOrder extends RequestHandler{

    handle(req: any, res: any): void {
            const {vouchar,duration,employeeID}=req.body;


            let query=`update Orders set STATUS=?,EMPLOYEE_ID=?,SUPPLIER_PRICE=? where ORDER_ID=?`
            this.setDrugStates(vouchar['drugsList']).then((resp:any)=>{
                Promise.all(resp).then((list:any)=>{
                    let total=list.reduce((a:number,b:number)=>a+b,0)
                    this.pool.query(query,[1,employeeID,total,vouchar['orderinfo']['ORDER_ID']]).then((result:any)=>res.json({result:true}))
                })
            })
    }


    private async setDrugStates(list:any){

       return  await list.map((drug:any)=>
        {
            let query=`update DrugStates set REMAIN_QTY=REMAIN_QTY-?,SOLD_QTY=SOLD_QTY+? where DRUG_ID=? and SUPPLY_ID=?`;
           return this.getQuantity(drug['drugID']).then(((drugList:any)=>{
                console.log(drugList,drug['drugID']);
                    

                let qty=drug['quantity']
                let qty1=drugList[0]['REMAIN_QTY']
                let qty3=0

                if(qty1>qty)qty3=qty 
                else qty3=qty1

                return this.pool.query(query,[qty3,qty3,drug['drugID'],drugList[0]['SUPPLY_ID']]).then((resp:any)=>{
                    if(qty3<qty){
                        let qty4=qty-qty3
                        return this.pool.query(query,[qty4,qty4,drug['drugID'],drugList[0]['SUPPLY_ID']]).then((resp:any)=>
                        qty3*drugList[0]['SUPPLIER_PRICE']+qty4*drugList[1]['SUPPLIER_PRICE']
                        )
                    }else{
                        console.log("akash");
                        
                        return qty3*drugList[0]['SUPPLIER_PRICE']
                    }
                })

            }))
        })
    }

    private async getQuantity(drugID:any){
        let query=`select ds.REMAIN_QTY,s.SUPPLY_ID,s.SUPPLIER_PRICE from DrugStates ds inner join Supply s using(SUPPLY_ID,DRUG_ID) where ds.REMAIN_QTY>0 and ds.DRUG_ID=? order by ds.REMAIN_QTY`
        return await this.pool.query(query,[drugID])
    }
}