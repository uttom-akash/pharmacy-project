import RequestHandler from '../../RequestHandler'

export default class ApproveOrder extends RequestHandler{

    handle(req: any, res: any): void {
            const {vouchar,duration,employeeID}=req.body;


            let query=`update Orders set STATUS=?,EMPLOYEE_ID=? where ORDER_ID=?`
            this.setDrugStates(vouchar['drugsList']).then((resp:any)=>
                                this.pool.query(query,[1,employeeID,vouchar['orderinfo']['ORDER_ID']]).then((result:any)=>res.json({result:true})))
    }


    private async setDrugStates(list:any){

       return  await list.map((drug:any)=>
        {
            let query=`update DrugStates set REMAIN_QTY=REMAIN_QTY-?,SOLD_QTY=SOLD_QTY+? where DRUG_ID=?`;
            this.pool.query(query,[  drug['quantity'],drug['quantity'],drug['drugID'] ]);
        })
    }

}