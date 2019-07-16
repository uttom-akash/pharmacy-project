import React, { Component } from 'react';
import CustomNavlink from './CustomNavlink'
import './css/Navigation.css'

import logo from '../../assets/logo.png'
import RegisterForm from '../form/RegisterForm';
import Login from '../form/Login'
import DropDown from '../unitComp/dropDown/DropDown' 

import {connect} from 'react-redux'
import {logoutAction,register,login,getNotificationCount} from '../action/AuthActions'
import {loginToggleAction} from '../action/UniverseAction'
import {Label} from 'semantic-ui-react'



const banner=<React.Fragment>
                <img src={logo} className="logo" alt='logo' />
                {window.innerWidth>600 && <h3>Oushudh</h3>}
            </React.Fragment>

class Navigation extends Component {
    state = {
        query: "",
        signinToggle: false,
    }


    componentDidUpdate=(prevProps)=>{
        if(prevProps.userID!==this.props.userID && !!this.props.userID){
            setInterval(()=>{
                if(!!this.props.userID)this.props.getNotificationCount({userID:this.props.userID})
            },2*60000)    
        }
    }
    
    onLogout=()=>{
         sessionStorage.removeItem("number");
         window.location.reload(); 
    }

    onSignToggle = () =>{
               this.setState({ signinToggle: !this.state.signinToggle});
               this.props.loginToggleAction()
        }
    
    onLoginToggle = () =>this.props.loginToggleAction();
    
    



    render() {
        const {userName,notifications,loginOpen}=this.props
        const {signinToggle}=this.state

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
                    <DropDown cname="Link" idname={`auth${loginOpen}`}  userName={userName} onLogout={this.onLogout}></DropDown>
                    :
                    <div className="Link" id={`auth${loginOpen}`} onClick={this.onLoginToggle}><i className="far fa-user"></i><label>Login</label></div>
                }
                {signinToggle && <RegisterForm register={this.props.register} modal={signinToggle} toggle={this.onSignToggle}> </RegisterForm>}
                {loginOpen && <Login login={this.props.login} modal={loginOpen} toggle={this.onLoginToggle}>
                   <div className="optional" id={`auth${signinToggle}`} onClick={this.onSignToggle}>Signin</div>
                </Login>
                }

            </div>
        );
    }
}

const mapStateToProps=state=>({
    userName:state.User.LAST_NAME,
    userID:state.User.USER_ID,
    notifications:state.Notifications,
    loginOpen:state.Universe.loginOpen
})

export default connect(mapStateToProps,{logoutAction,register,login,getNotificationCount,loginToggleAction})(Navigation);