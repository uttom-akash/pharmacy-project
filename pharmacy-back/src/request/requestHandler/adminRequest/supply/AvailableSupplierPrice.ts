import RequestHandler from '../../RequestHandler'


export default class AvailableSupplierPrice extends RequestHandler{

    handle(req: any, res: any): void {
            const {drugID}=req.body;
            
            let query=`select s.SUPPLY_ID,s.SUPPLIER_PRICE from Supply s inner join DrugStates d using(SUPPLY_ID) where d.REMAIN_QTY>0 and d.DRUG_ID=?`       
            this.pool.query(query,[drugID]).then((result:any)=>res.json({List:result}))
    }

}