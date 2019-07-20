import RequestHandler from '../../RequestHandler'


export default class DrugsReport extends RequestHandler{

    handle(req: any, res: any): void {
        const {offset,limit}=req.body
        let query=`select DRUG_NAME,BRAND,REMAIN_QTY,date_format(MFG_DATE,'%Y-%m-%d') MFG_DATE,date_format(EXP_DATE,'%Y-%m-%d') EXP_DATE,SUPPLIER_PRICE,SUPPLIER_NAME,MOBILE_NO from drugReport order by REMAIN_QTY limit ?,?`
        this.pool.query(query,[offset,limit]).then((Drugs:any)=>res.json({list:Drugs}))
    }

}