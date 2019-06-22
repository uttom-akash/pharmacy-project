import mysql from 'mysql'
import promisify from 'util.promisify'


class Mysql{
    private static _intstance:Mysql;
    private pool:any;

    private constructor(){
       this.pool = mysql.createPool({
            host: "localhost",
            user: "root",
            password: "akash",
            database: "mydb",
            connectionLimit: 10
        });
        this.pool.query = promisify(this.pool.query);
    }

    public static getInstance(): Mysql {
        return this._intstance || (this._intstance=new this());
    }


    public query(query:string,params:any []):Promise<any>{
          return this.pool.query(query,params);
    }
}

export default Mysql;



