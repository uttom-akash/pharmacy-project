import RequestHandler from '../../RequestHandler'


export default class CountUser extends RequestHandler{

    handle(req: any, res: any): void {
            
        let query=`select count(*) as cnt from Users`
        this.pool.query(query).then((result:any)=>res.json({count:result[0]['cnt']}))
    }

}