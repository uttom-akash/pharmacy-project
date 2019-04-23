import React from 'react'
import { Switch, Route } from 'react-router-dom'

// components
import Home from '../page/Home'
import Services from '../page/Services'
import Blog from '../page/Blog'
import Contact from '../page/Contact'
import About from '../page/About'


export default () => {
    return (
        <Switch>
            <Route path="/home" exact component={Home} />
            <Route path="/services" exact component={Services} />
            <Route path="/blog" exact component={Blog} />
            <Route path="/contact" exact component={Contact} />
            <Route path="/about" exact component={About} />
        </Switch>
    )
}