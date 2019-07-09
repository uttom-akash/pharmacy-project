import React from 'react';
import { NavLink } from 'react-router-dom'
import './css/CustomNavlink.css'

export default ({ Cpath, Cname,children,classname}) => {
    return (<NavLink to={Cpath} className={classname} activeClassName="selectedLink" style={{ textDecoration: "none" }}>{Cname}{children}</NavLink>);
}