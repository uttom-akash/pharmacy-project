import React from 'react';
import { NavLink } from 'react-router-dom'
import './Navlink.css'

export default ({ Cpath, Cname,children,classname}) => {
    return (<NavLink to={Cpath} className={classname} activeClassName="selectedLink">{Cname}{children}</NavLink>);
}