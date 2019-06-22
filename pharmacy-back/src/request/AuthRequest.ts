import express  from 'express'
import Mysql from '../database/Connection'
import fs from 'fs'
import path from 'path'

const pool=Mysql.getInstance();
const router = express.Router()

router.post('/register', (req, res) =>{
    const {FirstName,LastName,phoneNumber,password}=req.body;
    let qs=`insert into Users(FIRST_NAME,LAST_NAME,CONTACT_NUMBER,PASSWORD) values(?,?,?,?)`;

    pool.query(qs,[FirstName,LastName,phoneNumber,password])
    .then(result=>
        setTimeout(()=>{
            res.json({user :{
                FIRST_NAME: FirstName,
                LAST_NAME: LastName,
                ADDRESS: "",
                CONTACT_NUMBER:phoneNumber}}),10000 
        }))
    .catch(err=>setTimeout(()=>res.status(400).json({error:err}),10000))
})

router.post("/login",(req,res)=>{
    const {phoneNumber,password}=req.body;
    let query=`select FIRST_NAME,LAST_NAME,ADDRESS,CONTACT_NUMBER from Users where CONTACT_NUMBER=? and password=?`;
    pool.query(query,[phoneNumber,password]).then(user=>{
        if(user.length)res.json({user:user[0]})
        else setTimeout(()=>res.status(400).json({error:"invalid credentails"}),10000)
    }).catch(err=>setTimeout(()=>res.status(400).json({error:err}),10000))
    
})


router.post("/fetch_user",(req,res)=>{
    const {phoneNumber}=req.body;
    let query=`select FIRST_NAME,LAST_NAME,ADDRESS,CONTACT_NUMBER from Users where CONTACT_NUMBER=?`;
    pool.query(query,[phoneNumber]).then(user=>{
        if(user.length)res.json({user:user[0]})
        else setTimeout(()=>res.status(400).json({error:"invalid credentails"}),10000)
    }).catch(err=>setTimeout(()=>res.status(400).json({error:err}),10000))
    
})

export default router