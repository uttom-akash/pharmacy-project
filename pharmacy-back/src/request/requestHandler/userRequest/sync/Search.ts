import RequestHandlers from '../../RequestHandler'

export default class Search extends RequestHandlers{
    
    handle(req: any, res: any): void {
        const {query}=req.body
        
        let q1=`select DRUG_NAME as title,DRUG_ID as id from Drugs where DRUG_NAME REGEXP ? limit 10`;
        this.pool.query(q1,[`^${query}.*`]).then((result:any)=>res.json({list:result}))    
    }
   
}