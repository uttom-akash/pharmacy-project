import RequestHandler from '../../RequestHandler'
import QueryCrafting from '../../../../processing/query/QueryCrafting'


export default class GetUser extends RequestHandler{

    handle(req: any, res: any): void {
            const {list}=req.body;
            
            let query=QueryCrafting(list,'Users')
            console.log(query,this.getValue(list));
            
            this.pool.query(query,this.getValue(list)).then((result:any)=>res.json({List:result}))
    }
    private getValue(list:any){
        return list.map((param:any)=>{
            if(param['param'].toUpperCase()==='DATE' || param['param'].toUpperCase()==="PRICE")return param.value 
            else return `^${param.value}.*`
        })
    }
}