import RequestHandlers from '../../RequestHandler'


export default class InsertDrugs extends RequestHandlers{
    
    handle(req: any, res: any): void {
        const {drugName,brandName,manufecturerName,brand,DAR,price,image_src}=req.body
        
        let query=`insert into Drugs(DRUG_NAME,BRAND_NAME,MENUFACTURER_ID,BRAND,DAR,PRICE,IMAGE_SRC) values(?,?,?,?,?,?,?)`;
        
        this.getMenufecturerID(manufecturerName,).then((menufacturer_id:any)=>
        this.pool.query(query,[drugName,brandName,menufacturer_id,brand,DAR,price,image_src])
        .then((result:any)=>res.json({result}))
        .catch((err:any)=>{if(err)throw err;}))
    }


    public getMenufecturerID(menufacturer:string){
        let query=`select MENUFACTURER_ID from Manufacturer where NAME=?`
        return this.pool.query(query,[menufacturer]).then((id:any)=>id[0]["MENUFACTURER_ID"])
    }

}