import React, { Component } from 'react'
import '../css/SideBar.css'
import {List,Image,Icon} from 'semantic-ui-react'
import ListItem from '../../comp/listItem/ListItem'
import CollapseList from '../../comp/collapseList/CollapseList'
import NavLink from '../../comp/nav/NavLink'

export default class SideBar extends Component {
    
    state={
        actions:[{name:"Add User",path:"/add-user"},{name :"Add Admin",path:"/add-admin"},{name:"Add Employee",path:"/add-employee"},{name:"Add Menufecturer",path:"/add-menufecturer"},{name:"Add Supplier",path:"/add-supplier"},{name:"New Supply",path:"/new-supply"},{name:"New Drug",path:"/new-drug"}],
        activeIndex:-1
    }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        console.log(index);
        
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index
    
        this.setState({ activeIndex: newIndex })
    }




    

    render() {
        const {actions,activeIndex}=this.state
        const {width,onClick}=this.props;
        return (
            <div className="sidebar-contianer">
                <div className="sidebar" style={{width:`${width}px`,overflow:"hidden"}}>
                    <List  selection verticalAlign='middle'>
                        <ListItem icon="home" ><NavLink classname="Link" Cname={"DashBoard"} Cpath={'/'}/></ListItem>
                        <ListItem icon="bell" ><NavLink classname="Link" Cname={"Notification"} Cpath={'/notfication'}/></ListItem>
                    </List>
                    <CollapseList  list={actions} handleClick={this.handleClick} activeIndex={activeIndex}/>
                </div>
                <div onClick={onClick} className="sidebar-controller">
                <Icon name="angle right"></Icon>
                </div>
            </div>
        )
    }
}
