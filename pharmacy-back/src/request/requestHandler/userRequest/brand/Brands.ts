import RequestHandler from '../../RequestHandler'


export default class Brands extends RequestHandler{
    
    handle(req: any, res: any): void {
        const {brand}=req.body;
        console.log(brand);
        
        this.getBrandsName(brand).then((brandsList:any)=>res.json(brandsList))
    }


    private getBrandsName(brand:string){

        let query=`select distinct BRAND from Drugs where lower(BRAND) regexp ?`

        return this.pool.query(query,[`${brand.toLowerCase()}.*`]).then((brandsList:[])=>brandsList);
    }

}