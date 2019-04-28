import React from 'react'
import { Switch, Route } from 'react-router-dom'

// components
import Home from '../page/jsx/Home'
import Services from '../page/jsx/Services'
import Community from '../page/jsx/Community'
import Contact from '../page/jsx/Contact'
import About from '../page/jsx/About'
import Cart from '../page/jsx/Cart'
import Catagories from '../page/jsx/Catagories'
import Brands from '../page/jsx/Brands'
import FilterSearch from '../page/jsx/filterSearch'


export default () => {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/services" exact component={Services} />
            <Route path="/community" exact component={Community} />
            <Route path="/contact" exact component={Contact} />
            <Route path="/about" exact component={About} />

            <Route path="/cart" exact component={Cart} />
            <Route path="/catagories" exact component={Catagories} />
            <Route path="/brands" exact component={Brands} />
            <Route path="/filterSearch" exact component={FilterSearch} />

        </Switch>
    )
}