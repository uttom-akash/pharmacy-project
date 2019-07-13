import RequestHandler from '../../RequestHandler'
import TimeStamp from '../../../../processing/timestamp/TimeStamp'

export default class InsertSupply extends RequestHandler{
    
    handle(req: any, res: any): void {
        const {drugs,supplierID}=req.body;
        const supplyID=  `${Math.floor(Math.random()*10000)}`

        drugs.map((drug:any)=>{
            let query= `insert into Supply(DRUG_ID,SUPPLY_DATE,QUANTITY,SUPPLIER_PRICE,SUPPLIER_ID,SUPPLY_ID) values(?,?,?,?,?)`

            this.pool.query(query,[drug['drugID'],TimeStamp.getInstance().dateMonthYear(),drug['quantity'],drug['price'],supplierID,supplyID]).then((result:any)=>
            
            this.isExist(drug['drugID']).then((cnt:number)=>{
                if(cnt>0){
                    query=`update DrugStates set REMAIN_QTY=REMAIN_QTY+? where DRUG_ID=?`
                    return this.pool.query(query,[drug['quantity'],drug['drugID']])
                }else{
                    query=`insert into DrugStates values(?,?,?)`
                    return this.pool.query(query,[drug['drugID'],drug['quantity'],0])
                }
            }))

        })

        res.json({result:true})
    }


    private isExist(drugID:number){
        let query=`select count(*) as cnt from DrugStates where DRUG_ID=?`
        return this.pool.query(query,[drugID]).then((result:any)=>result[0]['cnt'])
    }
}
