import RequestHandler from '../../RequestHandler'




export default class IsSupplierAvailable extends RequestHandler{
    
    handle(req: any, res: any): void {
        const {supplierName}=req.body;

        this.IsSupplier(supplierName).then((cnt:string)=>res.json({id:cnt}))
    }


    private IsSupplier(supplierName:string){
            let query=`select SUPPLIER_ID as id from Supplier where SUPPLIER_NAME=?`;
            return this.pool.query(query,[supplierName]).then((res:any)=>{return (res.length>0 ? res[0]['id']:"-1")})
    }

}
