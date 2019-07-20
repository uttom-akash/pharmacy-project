import RequestHandler from '../../RequestHandler'


export default class SearchProduct extends RequestHandler{

    handle(req: any, res: any): void {
            const {name}=req.body;

            let query=`select ADDRESS as title from Orders where ADDRESS regexp ? limit 30`;
            this.pool.query(query,[`^${name}.*`]).then((result:any)=>res.json({List:result}))
    }

}