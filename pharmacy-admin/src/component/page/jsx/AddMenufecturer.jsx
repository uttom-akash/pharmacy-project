import React, { Component } from 'react'
import Modal from '../../comp/modal/Modal'
import SupplierForm from '../../form/jsx/SupplierForm'
import api from '../../api/Api'
import GetUser from '../../form/jsx/GetUser'
import {Button} from 'semantic-ui-react'
import '../css/view.css'

import Listing from '../../comp/data/Listing'
export default class AddMenufecturer extends Component {
    state={
        modal:false,
        params:[{param:'Menufecturer_ID',status:false,value:""},{param:'Name',status:false,value:""},{param:"Mobile_No",status:false,value:""}],
        list:[],
        listIndex:[]
    
    }

    onToggle=()=>this.setState({modal:!this.state.modal})
    onSubmit=(data)=>api.addManufecturer(data).then(res=>{
        this.onToggle()
        return res;
    })

    onGetManuFacturer=(data)=>api.getManufecturer(data).then(data=>{
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
                    <GetUser params={params} onSubmit={this.onGetManuFacturer}/>
                </div>   
                {!!list.length && <Listing list={list} listIndex={listIndex}/>}
               
                 <Modal isOpen={modal} basic={true} header={'Add Manufecturer'} onToggle={this.onToggle}><SupplierForm onSubmit={this.onSubmit}/></Modal>
                
            </div>
        )
    }
}
