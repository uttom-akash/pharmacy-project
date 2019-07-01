import express  from 'express'
import Mysql from '../database/Connection'
import fs from 'fs'
import path from 'path'

const pool=Mysql.getInstance();
const router = express.Router()

router.get('/cat', (req, res) =>{

   let cat=fs.readFileSync(path.join(__dirname,"catagories.json"),"utf8")
   let jcat=JSON.parse(cat)
    
   let length=jcat["category"].length

    
    for(let i:number=0;i<length;i++)
    {
        let q=`insert into Category(CATEGORY_NAME) values(?)`;
        let value=jcat["category"][i]
        
        pool.query(q,[value])
        .then(result=>console.log("ok"))
        .catch(err=>{if(err)throw err;})
    }

    res.send("ok")
})







router.get("/drug",(req,res)=>{

   let data=fs.readFileSync(path.join(__dirname,"drugs.json"),"utf8")
   let jdata=JSON.parse(data)
   let drug=jdata["drugs"]
   
   let length=drug.length

    for(let i:number=0;i<length;i++)
    {
        let q=`insert into Drugs(DRUG_NAME,BRAND_NAME,BRAND,DAR,PRICE,IMAGE_SRC) values(?,?,?,?,?,?)`;
        pool.query(q,[drug[i].title,drug[i]["brand name"],drug[i].brand,drug[i].DAR,drug[i].price,drug[i].image_src])
        .then(result=>console.log("ok"))
        .catch(err=>{if(err)throw err;})
    }
    res.send("ok")
})

router.get("/drugc",(req,res)=>{
    
   let data=fs.readFileSync(path.join(__dirname,"drugs.json"),"utf8")
   let jdata=JSON.parse(data)
   let drug=jdata["drugs"]
   
   let length=drug.length
   
    for(let i:number=0;i<length;i++)
    {
        let cat=drug[i]["categories"];
        let clength:number=cat.length
        let dname=drug[i]["title"]

        pool.query(`select DRUG_ID from Drugs where DRUG_NAME=?`,[dname]).then(dres=>{if(dres.length>0)return dres[0]['DRUG_ID']}).then(did=>{
            for(let j:number=0;j<clength;j++){
                let categ:string=cat[j];
                pool.query(`select CATEGORY_ID from Category where CATEGORY_NAME=?`,[categ]).then(res=>res[0]["CATEGORY_ID"]).then(cid=>{
                    pool.query(`insert into DrugCategory values(?,?)`,[did,cid]).then(res=>console.log(res))                
                })
    
            }         
        })
    }
    res.send("ok")

})

export default router