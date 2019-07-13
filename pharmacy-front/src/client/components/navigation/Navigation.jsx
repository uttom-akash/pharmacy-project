import React, { Component } from 'react';
import CustomNavlink from './CustomNavlink'
import './css/Navigation.css'

import logo from '../../assets/logo.png'
import RegisterForm from '../form/RegisterForm';
import Login from '../form/Login'
import DropDown from '../unitComp/dropDown/DropDown' 

import {connect} from 'react-redux'
import {logoutAction,register,login} from '../action/AuthActions'

const banner=<React.Fragment>
                <img src={logo} className="logo" alt='logo' />
                {window.innerWidth>600 && <h3>Oushudh</h3>}
            </React.Fragment>

class Navigation extends Component {
    state = {
        dropdownOpen:false,
        query: "",
        signinToggle: false,
        loginToggle: false,
        loggedin: false
    }

    
    onDropToggle=()=>this.setState({dropdownOpen:!this.state.dropdownOpen})
    onLogout=()=>{
         sessionStorage.removeItem("number");
         window.location.reload(); 
    }

    onSignToggle = () =>{
               this.setState({ signinToggle: !this.state.signinToggle,loginToggle:false});
        }
    onLoginToggle = () => this.setState({ loginToggle: !this.state.loginToggle });

    onLoggedin = () => this.setState({ loggedin: !this.state.loggedin })
    
    
    
    render() {
        
        return (
            <div className="navigation-bar">
                
                <CustomNavlink  Cpath="/" classname={"banner"}>{banner}</CustomNavlink>            
                
                {/* nav link */}
                <CustomNavlink Cpath="/community" Cname='Community' classname={"Link"}/>
                
                {
                !!this.props.userName ? 
                    <DropDown cname="Link" idname={`auth${this.state.loginToggle}`} dropdownOpen={this.state.dropdownOpen} dropToggle={this.onDropToggle} userName={this.props.userName} onLogout={this.onLogout}></DropDown>
                    :
                    <div className="Link" id={`auth${this.state.loginToggle}`} onClick={this.onLoginToggle}><i className="far fa-user"></i><label>Login</label></div>
                }

                {/* modal */}
                {this.state.signinToggle && <RegisterForm register={this.props.register} modal={this.state.signinToggle} toggle={this.onSignToggle}> </RegisterForm>}
                

                
                {this.state.loginToggle && <Login login={this.props.login} modal={this.state.loginToggle} toggle={this.onLoginToggle}>
                   <div className="optional" id={`auth${this.state.signinToggle}`} onClick={this.onSignToggle}>Signin</div>
                </Login>
                }

            </div>
        );
    }
}

const mapStateToProps=state=>({
    userName:state.User.LAST_NAME
})

export default connect(mapStateToProps,{logoutAction,register,login})(Navigation);