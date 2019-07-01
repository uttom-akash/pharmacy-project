import React from 'react'
import { Switch, Route } from 'react-router-dom'

// components
import Home from '../page/jsx/Home'
import Services from '../page/jsx/Services'
import Community from '../page/jsx/Community'
import Contact from '../page/jsx/Contact'
import About from '../page/jsx/About'
import Cart from '../page/jsx/Cart'
import CatagoriesOverview from '../page/jsx/CatagoriesOverview'
import BrandOverview from '../page/jsx/BrandOverview'
import Brands from '../page/jsx/Brands'
import FilterSearch from '../page/jsx/FilterSearch'
import Orders from '../page/jsx/Orders'
import  UserProfile from '../page/jsx/UserProfile'
import Categories from '../page/jsx/Categories';
import Drug from '../page/jsx/Drug'

export default () => {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/services" exact component={Services} />
            <Route path="/community" exact component={Community} />
            <Route path="/contact" exact component={Contact} />
            <Route path="/about" exact component={About} />
            <Route path="/profile" exact component={UserProfile} />
            

            <Route path="/cart/:userID" exact component={Cart} />
            <Route path="/order" exact component={Orders} />
            <Route path="/categories-overview" exact component={CatagoriesOverview} />
            <Route path="/categories/:category" exact component={Categories}/>
            <Route path="/brands-overview" exact component={BrandOverview} />
            <Route path="/brands/:brand" exact component={Brands} />
            <Route path="/filter-search/:category/:brand/:price" exact component={FilterSearch} />
            <Route path="/drug/:drugID" exact component={Drug} />
            
        </Switch>
    )
}