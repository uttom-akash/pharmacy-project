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

    onSignToggle = () =>{
        
               this.setState({ signinToggle: !this.state.signinToggle,loginToggle:!this.state.signinToggle});
        }
    onLoginToggle = () => this.setState({ loginToggle: !this.state.loginToggle });

    onLoggedin = () => this.setState({ loggedin: !this.state.loggedin })


    render() {
        return (
            <div className="navigation-bar">
                <img src={logo} className="logo" alt='logo' />
                
                <Searchbar query={this.state.query} onChange={this.onChange} id="search"/>
                
                <CustomNavlink Cpath="/community" Cname='Community' />
                <div className="Link" id={`auth${this.state.loginToggle}`} onClick={this.onLoginToggle}><i className="far fa-user"></i><label>Login</label></div>
                
                {this.state.signinToggle && <RegisterForm modal={this.state.signinToggle} toggle={this.onSignToggle}></RegisterForm>}
                {this.state.loginToggle && <Login modal={this.state.loginToggle} toggle={this.onLoginToggle}>
                   <div className="optional" id={`auth${this.state.signinToggle}`} onClick={this.onSignToggle}>Signin</div>
                </Login>
                }

            </div>
        );
    }
}

export default Navigation;