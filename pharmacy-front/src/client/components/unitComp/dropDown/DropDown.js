import React, { Component } from 'react'
import { Dropdown,Label, Icon} from 'semantic-ui-react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class DropDown extends Component {
  
  render() {
    const {userName,onLogout,userID,onClick}=this.props

    const trigger=<span style={{fontSize:'1.1rem',color:'#38B5AD'}}><Icon name='user' /> {userName}
                  </span> 
    return (
      <Dropdown  trigger={trigger} item >
          <Dropdown.Menu>
            <Dropdown.Item onClick={()=>onClick('login',"/profile")} text="Profile"/>
            <Dropdown.Item onClick={()=>onClick('login',"/order")} text="Order"/>
            <Dropdown.Item onClick={()=>onClick('login',`/cart/${userID}`)} text='Cart'/>
            <Dropdown.Item onClick={onLogout}>LogOut</Dropdown.Item>
          </Dropdown.Menu>
      </Dropdown>
  )
  }
}     
const mapStateToProps=state=>({
  user:state.User
})
export default  connect(mapStateToProps)(DropDown);