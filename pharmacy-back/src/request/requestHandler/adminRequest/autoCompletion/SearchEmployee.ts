import RequestHandler from '../../RequestHandler'


export default class SearchEmployee extends RequestHandler{

    handle(req: any, res: any): void {
            const {name}=req.body;
            
            let query=`select EMPLOYEE_ID as id,FIRST_NAME as title from Employee where FIRST_NAME regexp ? or LAST_NAME regexp ? limit 30`;
            this.pool.query(query,[`^${name}.*`,`^${name}.*`]).then((result:any)=>res.json({List:result}))
    }

}