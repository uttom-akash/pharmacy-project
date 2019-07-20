import RequestHandler from '../../RequestHandler'


export default class SearchSupplier extends RequestHandler{

    handle(req: any, res: any): void {
            const {name}=req.body;
            
            let query=`select SUPPLIER_ID as id,SUPPLIER_NAME as title from Supplier where SUPPLIER_NAME regexp ? limit 30`;
            this.pool.query(query,[`^${name}.*`]).then((result:any)=>res.json({List:result}))
    }

}