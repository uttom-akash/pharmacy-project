// factory

import express  from 'express'

// auth
import Register from './requestHandler/authRequestsHandler/Register'
import Login from './requestHandler/authRequestsHandler/Login'
import FetchUser from './requestHandler/authRequestsHandler/FetchUser'

// drugs
import CategoriesOverview from './requestHandler/categoryRequestsHandler/CategoriesOverview'
import CategoryDrugs from './requestHandler/categoryRequestsHandler/CategoryDrugs'

import Drugs from './requestHandler/drugs/Drugs'

// brand
import BrandOverview from './requestHandler/brand/BrandOverview'
import BrandDrugs from './requestHandler/brand/BrandDrugs'

class Requests{
    private router:any;

    constructor(){
        this.router=express.Router();
    }

    public getRouting():void{
        // auth
        this.router.post('/register', (req:any, res:any)=>new Register().handle(req,res))
        this.router.post("/login",(req:any,res:any)=>new Login().handle(req,res))
        this.router.post("/fetch_user",(req:any,res:any)=>new FetchUser().handle(req,res))
        
        // Drugs
        this.router.post("/drug",(req:any,res:any)=>new Drugs().handle(req,res))
        

        // categories
        this.router.get("/categories_overview",(req:any,res:any)=>new CategoriesOverview().handle(req,res))
        this.router.post("/category_drugs",(req:any,res:any)=>new CategoryDrugs().handle(req,res))
    
        // Brands
        this.router.get("/brand_overview",(req:any,res:any)=>new BrandOverview().handle(req,res))
        this.router.post("/brand_drugs",(req:any,res:any)=>new BrandDrugs().handle(req,res))
    
    }

    public getRouter():express.Application{
        return this.router;
    }
}


let request=new Requests();
request.getRouting();

export default request.getRouter();

