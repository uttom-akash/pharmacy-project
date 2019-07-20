import React, { Component } from 'react'
import Modal from '../../comp/modal/Modal' 
import Form from '../../form/jsx/UserForm'
import api from '../../api/Api'
import GetUser from '../../form/jsx/GetUser'
import {Button} from 'semantic-ui-react'
import '../css/view.css'
import Listing from '../../comp/data/Listing'

export default class AddUser extends Component {
    state={
        modal:false,
        params:[{param:'User_ID',status:false,value:""},{param:'first_Name',status:false,value:""},{param:'last_Name',status:false,value:""},{param:"contact_Number",status:false,value:""}],
        list:[],
        listIndex:[]
    
    }

    onToggle=()=>this.setState({modal:!this.state.modal})
    onSubmit=(data)=>api.addUser(data).then(res=>{
        this.onToggle()
        return res
    })

    onGetUsers=(data)=>api.getUser(data).then(data=>{
        let list=data['List']
        if(list.length){
            let listIndex=Object.keys(data['List'][0])
            this.setState({list,listIndex})
        }
        return data;
    })

    render() {
        const {modal,params,list,listIndex}=this.state;

        return (
            <div className="view-container">
                <div className="control">
                    <Button onClick={this.onToggle}>+ Add</Button>
                    <GetUser params={params} onSubmit={this.onGetUsers}/>    
                </div>  
                {!!list.length && <Listing list={list} listIndex={listIndex}/>}
                <Modal isOpen={modal} basic={true} header={'Add User'} onToggle={this.onToggle}><Form onSubmit={this.onSubmit}/></Modal>
                
            </div>
        )
    }
}
