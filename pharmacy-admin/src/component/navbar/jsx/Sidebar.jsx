import React, { Component } from 'react'
import {Sidebar,Menu,Icon,Header,Segment,Image,Dropdown} from 'semantic-ui-react'
import Route from './Route'
import {withRouter} from 'react-router-dom'
import CollapseList from '../../comp/collapseList/CollapseList'

class SideBar extends Component {
    state={
        actions:[{name:"Add User",path:"/add-user"},{name :"Add Admin",path:"/add-admin"},{name:"Add Employee",path:"/add-employee"},{name:"Add Menufecturer",path:"/add-menufecturer"},{name:"Add Supplier",path:"/add-supplier"},{name:"New Supply",path:"/new-supply"},{name:"New Drug",path:"/new-drug"}],
        activeItem:'dashboard'
    }
    
    onActive=(name,path)=>{
        this.setState({activeItem:name})
        this.props.history.push(path)
    }
    
    render() {
        const {actions,activeItem}=this.state
        return (
            <div>
                <div style={{width:'100vw',height:'1.5rem',backgroundColor:'black',position:'fixed',zIndex:'2'}}></div>
                <Menu
                    icon='labeled'
                    inverted
                    vertical
                    visible
                    width='thin'
                    style={{height:'100vh',position:'fixed',margin:'0',borderRadius:'0',zIndex:'3'}}
                    pointing
                >
                    <Menu.Item  name='dashboard' icon='home' active={activeItem==='dashboard'} onClick={(e,{name})=>this.onActive(name,'/')} />
                    <Menu.Item  name='notifications' active={activeItem==='notifications'} onClick={(e,{name})=>this.onActive(name,'/pending-order')} />
                    <Menu.Item  name='orders' active={activeItem==='orders'} onClick={(e,{name})=>this.onActive(name,'/get-order')}/>
                    <CollapseList list={actions} header={'Task'} onClick={this.onActive}/>     
                </Menu>
                <div style={{marginLeft:'9rem',paddingTop:'2rem'}}>
                    <Route/>
                </div>
            </div>
        )
    }
}


export default  withRouter(SideBar);