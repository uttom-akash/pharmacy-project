// factory

import express  from 'express'

// auth
import Register from './requestHandler/userRequest/authRequestsHandler/Register'
import Login from './requestHandler/userRequest/authRequestsHandler/Login'
import FetchUser from './requestHandler/userRequest/authRequestsHandler/FetchUser'

// category
import CategoriesOverview from './requestHandler/userRequest/categoryRequestsHandler/CategoriesOverview'
import CategoryDrugs from './requestHandler/userRequest/categoryRequestsHandler/CategoryDrugs'
import Categories from './requestHandler/userRequest/categoryRequestsHandler/Categories'


// drug
import Drugs from './requestHandler/userRequest/drugs/Drugs'

// brand
import BrandOverview from './requestHandler/userRequest/brand/BrandOverview'
import BrandDrugs from './requestHandler/userRequest/brand/BrandDrugs'
import Brands from './requestHandler/userRequest/brand/Brands'


// filtering
import FilterSearch from './requestHandler/userRequest/filtering/FilterSearch'


// cart
import AddToCart from './requestHandler/userRequest/cart/AddToCart'
import GetCart from './requestHandler/userRequest/cart/GetCart'
import RemoveCart from './requestHandler/userRequest/cart/RemoveCart'


import IsAvailable from './requestHandler/userRequest/sync/IsAvailable'

// 
import Increment from './requestHandler/userRequest/sync/Increment'
import Decrement from './requestHandler/userRequest/sync/Decrement'


// 
import NewOrderInitialize from './requestHandler/userRequest/order/NewOrderInitialize'
import CancelOrder from './requestHandler/userRequest/order/CancelOrder'
import ConfirmOrder from './requestHandler/userRequest/order/ConfirmOrder'

// Order
import CurrentOrder from './requestHandler/userRequest/order/CurrentOrder'
import PastOrder from './requestHandler/userRequest/order/PastOrder'
import OrderRecieved from './requestHandler/userRequest/order/OrderRecieved'
import OrderDetails from './requestHandler/userRequest/order/OrderDetails'


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
    
        // Filter search
        this.router.post("/filter_search",(req:any,res:any)=>new FilterSearch().handle(req,res))
    
        this.router.get("/categories",(req:any,res:any)=>new Categories().handle(req,res))
        this.router.get("/brands",(req:any,res:any)=>new Brands().handle(req,res))

        // cart
        this.router.post('/add-cart',(req:any,res:any)=>new AddToCart().handle(req,res))
        this.router.post('/remove-cart',(req:any,res:any)=>new RemoveCart().handle(req,res))
        this.router.post('/get-cart',(req:any,res:any)=>new GetCart().handle(req,res))
        
        this.router.post('/is-available',(req:any,res:any)=>new IsAvailable().handle(req,res))
        
        this.router.post('/increment',(req:any,res:any)=>new Increment().handle(req,res))
        this.router.post('/decrement',(req:any,res:any)=>new Decrement().handle(req,res))

        this.router.post('/new-order-init',(req:any,res:any)=>new NewOrderInitialize().handle(req,res))
        this.router.post('/cancel-order',(req:any,res:any)=>new CancelOrder().handle(req,res))
        this.router.post('/confirm-order',(req:any,res:any)=>new ConfirmOrder().handle(req,res))

        this.router.post('/current-order',(req:any,res:any)=>new CurrentOrder().handle(req,res))
        this.router.post('/past-order',(req:any,res:any)=>new PastOrder().handle(req,res))

        this.router.post('/order-recieved',(req:any,res:any)=>new OrderRecieved().handle(req,res))
        this.router.post('/order-details',(req:any,res:any)=>new OrderDetails().handle(req,res))

    }

    public getRouter():express.Application{
        return this.router;
    }
}


let request=new Requests();
request.getRouting();

export default request.getRouter();

