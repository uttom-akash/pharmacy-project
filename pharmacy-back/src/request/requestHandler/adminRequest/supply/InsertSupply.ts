import RequestHandler from '../../RequestHandler'



export default class InsertSupply extends RequestHandler{
    
    handle(req: any, res: any): void {
        const {drugID,date,quantity,supplierPrice,supplierID}=req.body;
        
        let query= `insert into Supply(DRUG_ID,SUPPLY_DATE,QUANTITY,SUPPLIER_PRICE,SUPPLIER_ID) values(?,?,?,?,?)`
        
        this.pool.query(query,[drugID,date,quantity,supplierPrice,supplierID])
                                          .then((result:any)=>res.json({result}))
                                          .catch((err:any)=>res.json({error:err}))
        
    }
}
