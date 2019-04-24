import React from 'react'
import { Switch, Route } from 'react-router-dom'

// components
import Home from '../page/jsx/Home'
import Services from '../page/jsx/Services'
import Blog from '../page/jsx/Blog'
import Contact from '../page/jsx/Contact'
import About from '../page/jsx/About'


export default () => {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/services" exact component={Services} />
            <Route path="/blog" exact component={Blog} />
            <Route path="/contact" exact component={Contact} />
            <Route path="/about" exact component={About} />
        </Switch>
    )
}