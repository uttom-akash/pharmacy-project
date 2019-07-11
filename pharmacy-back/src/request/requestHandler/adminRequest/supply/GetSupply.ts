import RequestHandler from '../../RequestHandler'
import QueryCrafting from '../../../../processing/query/QueryCrafting'


export default class GetSupply extends RequestHandler{

    handle(req: any, res: any): void {
            const {list}=req.body;
            
            let query=QueryCrafting(list,'Supply')
            console.log(query);
            
            this.pool.query(query,list.map((param:any)=>param.value)).then((result:any)=>res.json({List:result}))
    }

}