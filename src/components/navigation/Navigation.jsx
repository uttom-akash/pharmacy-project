import React from 'react';
import CustomNavlink from './CustomNavlink'
import './css/Navigation.css'


import logo from '../../drug.svg'

export default () => {
    return (
        <div className="navbar">
            <img src={logo} className="logo" alt='logo' />
            <CustomNavlink Cpath='/home' Cname="Home" />
            <CustomNavlink Cpath="/services" Cname='Services' />
            <CustomNavlink Cpath="/blog" Cname='Blog' />
            <CustomNavlink Cpath="/contact" Cname='Contact' />
            <CustomNavlink Cpath="/about" Cname='About' />
        </div>
    );
}