import React from 'react';
import { NavLink } from 'react-router-dom'
import './css/CustomNavlink.css'

export default ({ Cpath, Cname,children }) => {
    return (<NavLink to={Cpath} className="Link" activeClassName="selectedLink" style={{ textDecoration: "none" }}>{Cname}{children}</NavLink>);
}