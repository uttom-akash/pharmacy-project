import RequestHandler from '../../RequestHandler'


export default class Categories extends RequestHandler{
    
    handle(req: any, res: any): void {
        
        this.getCategories().then((categoryList:any)=>res.json(categoryList))
    }
    
    private getCategories(){
        let query=`select CATEGORY_ID,CATEGORY_NAME from Category`
        return  this.pool.query(query,[])   
    }

}