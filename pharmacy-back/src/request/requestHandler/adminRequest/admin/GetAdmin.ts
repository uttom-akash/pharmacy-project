import RequestHandler from '../../RequestHandler'
import QueryCrafting from '../../../../processing/query/QueryCrafting'


export default class GetAdmin extends RequestHandler{

    handle(req: any, res: any): void {
            const {list}=req.body;
            console.log(list);
            
            let query=QueryCrafting(list,'Admin')
            console.log(query);
            
            this.pool.query(query,list.map((param:any)=>param.value)).then((result:any)=>res.json({List:result}))
    }

}