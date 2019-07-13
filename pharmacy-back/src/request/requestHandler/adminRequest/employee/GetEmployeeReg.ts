import RequestHandler from '../../RequestHandler'


export default class GetEmployeeReg extends RequestHandler{

    handle(req: any, res: any): void {
            const {employee}=req.body;
            
            let query=`select EMPLOYEE_ID,FIRST_NAME from Employee where FIRST_NAME regexp ?`;
            this.pool.query(query,[`^${employee}.*`]).then((result:any)=>res.json({List:result}))
    }

}