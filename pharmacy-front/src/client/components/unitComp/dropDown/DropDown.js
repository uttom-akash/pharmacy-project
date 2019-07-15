import React, { Component } from 'react'
import { Dropdown,Label} from 'semantic-ui-react';
import CustomNavlink from '../../navigation/CustomNavlink'
import {connect} from 'react-redux'

class DropDown extends Component {
  
  render() {
    const {userName,onLogout,cname,idname,user}=this.props

    const trigger=<React.Fragment><i className="far fa-user"></i><label>{userName}</label></React.Fragment> 
                  
    return (
      <Dropdown className={cname} id={idname} trigger={trigger} icon={null}>
      
          <Dropdown.Menu>
            <Dropdown.Item><CustomNavlink Cpath="/profile" Cname="Profile" classname='Link'/></Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item><CustomNavlink Cpath="/order" Cname="Orders" classname='Link'/></Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item><CustomNavlink Cpath={`/cart/${user.USER_ID}`} Cname="Cart" classname='Link'/></Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item><div className="Link"  onClick={onLogout}>LogOut</div></Dropdown.Item>
          </Dropdown.Menu>
      </Dropdown>
  )
  }
}     
const mapStateToProps=state=>({
  user:state.User
})
export default  connect(mapStateToProps)(DropDown);