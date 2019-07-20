import RequestHandler from '../../RequestHandler'


export default class SearchUser extends RequestHandler{

    handle(req: any, res: any): void {
            const {name}=req.body;
            
            let query=`select USER_ID as id,concat(FIRST_NAME," ",LAST_NAME) as title from Users where FIRST_NAME regexp ? or LAST_NAME regexp ? limit 30`;
            this.pool.query(query,[`^${name}.*`,`^${name}.*`]).then((result:any)=>res.json({List:result}))
    }

}