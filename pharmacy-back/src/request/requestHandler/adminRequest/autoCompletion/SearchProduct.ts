import RequestHandler from '../../RequestHandler'


export default class SearchProduct extends RequestHandler{

    handle(req: any, res: any): void {
            const {name}=req.body;
            let query=`select DRUG_ID as id,DRUG_NAME as title from Drugs where DRUG_NAME regexp ? limit 30`;
            this.pool.query(query,[`^${name}.*`]).then((result:any)=>res.json({List:result}))
    }

}