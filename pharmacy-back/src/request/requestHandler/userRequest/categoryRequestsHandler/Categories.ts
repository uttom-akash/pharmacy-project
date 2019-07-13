import RequestHandler from '../../RequestHandler'


export default class Categories extends RequestHandler{
    
    handle(req: any, res: any): void {
        const {squery}=req.body;

        this.getCategories(squery).then((categoryList:any)=>res.json(categoryList))
    }
    
    private getCategories(squery:string){

        let query=`select CATEGORY_ID,CATEGORY_NAME from Category where LOWER(CATEGORY_NAME) REGEXP ?`
        return  this.pool.query(query,[`^${squery.toLowerCase()}.*`])   
    }

}