import RequestHandler from '../../RequestHandler'


export default class DrugOverview extends RequestHandler{

    handle(req: any, res: any): void {
        const {limit}=req.body
        let query=`select * from drugReport`
        this.pool.query(query).then((Drugs:any)=>res.json({list:Drugs}))
    }

}