import React, { Component } from 'react'
import Modal from '../../comp/modal/Modal' 
import Form from '../../form/jsx/UserForm'
import api from '../../api/Api'
import GetUser from '../../form/jsx/GetUser'
import {Button} from 'semantic-ui-react'
import '../css/view.css'
import Listing from '../../comp/data/Listing'

export default class AddAdmin extends Component {
    state={
        modal:false,
        params:[{param:'Admin_ID',status:false,value:""},{param:'First_Name',status:false,value:""},{param:'Last_Name',status:false,value:""},{param:"Contact_Number",status:false,value:""}],
        list:[],
        listIndex:[]
    }


    onToggle=()=>this.setState({modal:!this.state.modal})

    onSubmit=(data)=>api.addAdmin(data).then(res=>{
        this.onToggle()
        return  res
    })

    onGetAdmin=(data)=>api.getAdmin(data).then(data=>{
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
                  <GetUser params={params} onSubmit={this.onGetAdmin}/>
                </div>
                {!!list.length && <Listing list={list} listIndex={listIndex}/>}
               
                 <Modal isOpen={modal} header={'Add Admin'} onToggle={this.onToggle}><Form onSubmit={this.onSubmit}/></Modal>
            </div>
        )
    }
}
