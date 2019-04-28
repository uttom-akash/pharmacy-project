import React, { Component } from 'react';
import CustomNavlink from './CustomNavlink'
import Searchbar from './Searchbar'
import './css/Navigation.css'

import logo from '../../../drug.svg'
import RegisterForm from '../form/RegisterForm';
import Login from '../form/Login'

class Navigation extends Component {
    state = {
        query: "",
        signinToggle: false,
        loginToggle: false,
        loggedin: false
    }

    onChange = (ev) => this.setState({ query: ev.target.value });
    onSignToggle = () => this.setState({ signinToggle: !this.state.signinToggle });
    onLoginToggle = () => this.setState({ loginToggle: !this.state.loginToggle });

    onLoggedin = () => this.setState({ loggedin: !this.state.loggedin })


    render() {
        return (
            <div className="navigation-bar">
                <img src={logo} className="logo" alt='logo' />
                <CustomNavlink Cpath='/' Cname="Home" />
                <CustomNavlink Cpath="/community" Cname='Community' />
                <Searchbar query={this.state.query} onChange={this.onChange} />
                {
                    this.state.loggedin ?
                        <img className="pro-pic" /> :
                        <div className="auth">
                            <div className="Link" id={`auth${this.state.signinToggle}`} onClick={this.onSignToggle}>Signin</div>
                            <div className="Link" id={`auth${this.state.loginToggle}`} onClick={this.onLoginToggle}>Login</div>
                        </div>
                }

                {this.state.signinToggle && <RegisterForm modal={this.state.signinToggle} toggle={this.onSignToggle} />}
                {this.state.loginToggle && <Login modal={this.state.loginToggle} toggle={this.onLoginToggle} />}

            </div>
        );
    }
}

export default Navigation;