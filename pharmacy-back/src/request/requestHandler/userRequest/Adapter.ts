import RequestHandlers from '../RequestHandler'
import GetCart from './cart/GetCart'

export default class Adapter extends RequestHandlers{
    
    private getCart:any; 

    Adapter(){
        this.getCart=new GetCart();
    }

    handle(req: any, res: any): void {
        const {userID,drugID}=req.body
        
        const query='delete from Cart where USER_ID=? and DRUG_ID=?'
        this.pool.query(query,[userID,drugID]).then((result:any)=>new GetCart().handle(req,res))    
    }

}