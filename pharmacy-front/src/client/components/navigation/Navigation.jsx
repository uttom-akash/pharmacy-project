import React, { Component } from 'react';
import CustomNavlink from './CustomNavlink'
import './css/Navigation.css'

import logo from '../../assets/logo.png'
import RegisterForm from '../form/RegisterForm';
import Login from '../form/Login'
import DropDown from '../unitComp/dropDown/DropDown' 

import {connect} from 'react-redux'
import {logoutAction,register,login,getNotificationCount} from '../action/AuthActions'
import {Label} from 'semantic-ui-react'

const banner=<React.Fragment>
                <img src={logo} className="logo" alt='logo' />
                {window.innerWidth>600 && <h3>Oushudh</h3>}
            </React.Fragment>

class Navigation extends Component {
    state = {
        query: "",
        signinToggle: false,
        loginToggle: false,
        loggedin: false
    }

    componentDidMount=()=>{
        setInterval(()=>{
            if(!!this.props.userID)this.props.getNotificationCount({userID:this.props.userID})
        },2*60000)
    }
    
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
        const {userName,notifications}=this.props

        return (
            <div className="navigation-bar">
                
                <CustomNavlink  Cpath="/" classname={"banner"}>{banner}</CustomNavlink>            
                { !!userName &&
                    <CustomNavlink Cpath="/notifications" Cname='Notifactions' classname={"Link"}>
                            {!!notifications.count && <Label size='tiny' color='red' circular>{notifications.count}</Label>}
                    </CustomNavlink>
                }
                

                {
                !!userName ? 
                    <DropDown cname="Link" idname={`auth${this.state.loginToggle}`}  userName={this.props.userName} onLogout={this.onLogout}></DropDown>
                    :
                    <div className="Link" id={`auth${this.state.loginToggle}`} onClick={this.onLoginToggle}><i className="far fa-user"></i><label>Login</label></div>
                }

 

 
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
    userName:state.User.LAST_NAME,
    userID:state.User.USER_ID,
    notifications:state.Notifications
})

export default connect(mapStateToProps,{logoutAction,register,login,getNotificationCount})(Navigation);