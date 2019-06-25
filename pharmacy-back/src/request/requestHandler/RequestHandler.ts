import Handler from './Handler'
import Mysql from '../../database/Connection'


export default abstract class RequestHandler implements Handler{
    pool:any;

    constructor(){
        this.pool=Mysql.getInstance();
    }

    abstract handle(req:any,res:any):void;
}