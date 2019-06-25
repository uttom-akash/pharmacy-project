import RequestHandler from '../RequestHandler'


export default class Register extends RequestHandler{
    
    handle(req: any, res: any): void {
            const {FirstName,LastName,phoneNumber,password}=req.body;
            let qs=`insert into Users(FIRST_NAME,LAST_NAME,CONTACT_NUMBER,PASSWORD) values(?,?,?,?)`;

            this.pool.query(qs,[FirstName,LastName,phoneNumber,password])
            .then((result:any)=>
                setTimeout(()=>{
                    res.json({user :{
                        FIRST_NAME: FirstName,
                        LAST_NAME: LastName,
                        ADDRESS: "",
                        CONTACT_NUMBER:phoneNumber}}),10000 
                }))
            .catch((err:any)=>setTimeout(()=>res.status(400).json({error:err}),10000))

    }

}