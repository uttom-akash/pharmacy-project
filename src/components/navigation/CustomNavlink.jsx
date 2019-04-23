import React from 'react';
import { NavLink } from 'react-router-dom'
import './css/CustomNavlink.css'

export default ({ Cpath, Cname }) => {
    return (<NavLink to={Cpath} className="Link" activeClassName="selectedLink">{Cname}</NavLink>);
}