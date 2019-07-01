import React, { Component } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import CustomNavlink from '../../navigation/CustomNavlink'
import {connect} from 'react-redux'

class DropDown extends Component {
  
  render() {
    const {dropdownOpen,dropToggle,userName,onLogout,cname,idname,user}=this.props
    
    return (
      <Dropdown className={cname} id={idname}  isOpen={dropdownOpen} toggle={dropToggle}>
      <DropdownToggle tag="span">
      <i className="far fa-user"></i><label>{userName}</label>
      </DropdownToggle>

      <DropdownMenu>
        <DropdownItem><CustomNavlink Cpath="/profile" Cname="Profile"/></DropdownItem>
        <DropdownItem divider />
        <DropdownItem><CustomNavlink Cpath="/order" Cname="Orders"/></DropdownItem>
        <DropdownItem divider />
        <DropdownItem><CustomNavlink Cpath={`/cart/${user.USER_ID}`} Cname="Cart"/></DropdownItem>
        <DropdownItem divider />
        <DropdownItem><div className="Link"  onClick={onLogout}>LogOut</div></DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
  }
}     
const mapStateToProps=state=>({
  user:state.User
})
export default  connect(mapStateToProps)(DropDown);