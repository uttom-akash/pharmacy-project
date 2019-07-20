import RequestHandler from '../../RequestHandler'


export default class SearchManufacturer extends RequestHandler{

    handle(req: any, res: any): void {
            const {name}=req.body;
            let query=`select distinct BRAND  as title from Drugs where BRAND regexp ? limit 30`;
            this.pool.query(query,[`^${name}.*`]).then((result:any)=>res.json({List:result}))
    }

}