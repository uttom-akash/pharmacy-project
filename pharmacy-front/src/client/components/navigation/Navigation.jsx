import React, { Component } from 'react';

import logo from '../../assets/logo.png'
import RegisterForm from '../form/RegisterForm';
import Login from '../form/Login'
import DropDown from '../unitComp/dropDown/DropDown' 

import {connect} from 'react-redux'
import {logoutAction,register,login,getNotificationCount} from '../action/AuthActions'
import {loginToggleAction} from '../action/UniverseAction'
import {Label, Menu} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'


class Navigation extends Component {
    state = {
        query: "",
        signinToggle: false,
        active:'oushudh'
    }

    handleClick=(name,path)=>{
        this.setState({active:name})
        this.props.history.push(path)
    }

    componentDidMount() {
        if(!!sessionStorage.window)this.setState({active:sessionStorage.window})
        console.log(this.props);
    }

    componentDidUpdate=(prevProps)=>{
        if(prevProps.userID!==this.props.userID && !!this.props.userID){
            setInterval(()=>{
                if(!!this.props.userID)this.props.getNotificationCount({userID:this.props.userID})
            },2*60000)    
        }

        sessionStorage.window=this.state.active
    }
    
    onLogout=()=>{
        console.log("loggoedout");
        
         sessionStorage.removeItem("number");
         window.location.reload(); 
    }

    onSignToggle = () =>{
               this.setState({ signinToggle: !this.state.signinToggle});
               this.props.loginToggleAction()
        }
    
    onLoginToggle = (e,{name}) =>{
        this.handleClick(e,{name})
        this.props.loginToggleAction();
    }
    


    render() {
        const {userName,notifications,loginOpen,userID,history}=this.props
        const {signinToggle,active}=this.state

        return (
            <div className="navigation-bar">        
                 <Menu stackable pointing style={{position:'fixed',width:'100vw',zIndex:'2'}}>
                    <Menu.Item>
                        <img src={logo} />
                    </Menu.Item>
                    <Menu.Item name='oushudh' active={active==='oushudh'} onClick={(e,{name})=>this.handleClick(name,'/')} style={{fontSize:'1.1rem',color:'#38B5AD'}}/>
                    { !!userName &&
                        <Menu.Item position='right' name='notify' active={active==='notify'} onClick={(e,{name})=>this.handleClick(name,'notifications')} style={{fontSize:'1.1rem',color:'#38B5AD'}}>
                            Notifactions{!!notifications.count && <Label size='tiny' color='red' circular>{notifications.count}</Label>}
                        </Menu.Item>
                    }
                    {
                    !!userName ? 
                        <DropDown  onClick={this.handleClick} userName={userName} onLogout={this.onLogout} userID={userID}></DropDown>
                        :
                        <Menu.Item  active={active==='login'} icon='user' name='Login'   position='right' onClick={this.onLoginToggle} style={{fontSize:'1.1rem',color:'#38B5AD'}}/>
                    }
                    <Menu.Item>

                    </Menu.Item>
                </Menu>

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

export default connect(mapStateToProps,{logoutAction,register,login,getNotificationCount,loginToggleAction})(withRouter(Navigation));