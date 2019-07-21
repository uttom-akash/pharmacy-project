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
import FilterSearch from '../form/filterSearchForm'


class Navigation extends Component {
    state = {
        query: "",
        signinToggle: false,
        active:'oushudh',
        subActive:'',
        filterModal:false
    }

    handleClick=(name,path)=>{
        this.setState({active:name})
        this.props.history.push(path)
    }

    subHandleClick=(name,path)=>{
        this.setState({subActive:name})
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

    onFilterToggle=()=>{
        this.setState({filterModal:!this.state.filterModal})
    }
    onSignToggle = () =>{
            const {loginOpen}=this.props
               this.setState({ signinToggle: !this.state.signinToggle});
               if(loginOpen) this.props.loginToggleAction()
    }
    
    onLoginToggle = (e,{name}) =>{
        this.handleClick(e,{name})
        this.props.loginToggleAction();
    }
    
    onRoute = (path) => this.props.history.push(path)


    onShowMap = () => {
        const { lat, lng } = this.state;
        let place = { lat: lat, lng: lng };
        let map = new window.google.maps.Map(
            document.getElementById('map'), { zoom: 4, center: place });
        let marker = new window.google.maps.Marker({ position: place, map: map });
        return map;
    }



    locateMyPlace = () => {

        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({ lat: position.coords.latitude, lng: position.coords.longitude })
                resolve();
            }, () => {
                reject();
            }, this.geoOptions);
        })
    }
    
    onFindMe = () => {
        this.locateMyPlace().then(() => this.onShowMap()
        );
    }


    render() {
        const {userName,notifications,loginOpen,userID,history,subActive}=this.props
        const {signinToggle,active}=this.state

        return (
            <div className="navigation-bar">        
                 <Menu  pointing style={{display:'flex',position:'fixed',width:'100vw',zIndex:'2'}}>
                    <Menu.Item>
                        <img src={logo} />
                    </Menu.Item>
                    <Menu.Item name='oushudh' active={active==='oushudh'} onClick={(e,{name})=>this.handleClick(name,'/')} style={{fontSize:'1.1rem',color:'#38B5AD'}}/>
                    { !!userName &&
                        <Menu.Item position='right' name='notify' active={active==='notify'} onClick={(e,{name})=>this.handleClick(name,'/notifications')} style={{fontSize:'1.1rem',color:'#38B5AD'}}>
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

                <Menu color='teal' size='small'  inverted style={{display:'flex',justifyContent:'center',position:'fixed',width:'100vw',zIndex:'2',marginTop:'4rem'}}>
                    <Menu.Item active={subActive==='Category'}  name='Category' icon={'code branch'}  onClick={(e,{name})=>this.subHandleClick(name,'/categories-overview')}/>
                    <Menu.Item active={subActive==='Brands'}  name='Brands' icon={'briefcase'}  onClick={(e,{name})=>this.subHandleClick(name,'/brands-overview')}/>
                    <Menu.Item active={subActive==='Filter search'}  name='Filter search' icon={'filter'}  onClick={(e,{name})=>this.onFilterToggle()}/>
                    <Menu.Item active={subActive==='Location'}  name='Location' icon={'location arrow'}  onClick={(e,{name})=>this.onFindMe()}/>  
                </Menu>


                <FilterSearch onRoute={this.onRoute} modal={this.state.filterModal} toggle={this.onFilterToggle}/>
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