import RequestHandlers from '../../RequestHandler'
import Adapter from '../Adapter'
export default class RemoveCart extends RequestHandlers{
    
    handle(req: any, res: any): void {
        const {userID,drugID}=req.body
        new Adapter().handle(req,res)
    }
}