import RequestHandler from '../../RequestHandler'


export default class Brands extends RequestHandler{
    
    handle(req: any, res: any): void {
        
        this.getBrandsName().then((brandsList:any)=>res.json(brandsList))
    }


    private getBrandsName(){
        let query=`select distinct BRAND from Drugs`

        return this.pool.query(query,[]).then((brandsList:[])=>brandsList);
    }

}