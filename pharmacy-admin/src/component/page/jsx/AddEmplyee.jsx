import React, { Component } from 'react'
import Modal from '../../comp/modal/Modal'
import EmplyeeForm from '../../form/jsx/EmployeeForm'
import api from '../../api/Api'
import GetUser from '../../form/jsx/GetUser'
import {Button} from 'semantic-ui-react'
import '../css/view.css'
import Listing from '../../comp/data/Listing'


export default class AddEmplyee extends Component {
    state={
        modal:false,
        params:[{param:'Employee_ID',status:false,value:""},{param:'First_Name',status:false,value:""},
        {param:'Last_Name',status:false,value:""},{param:"Mobile_No",status:false,value:""},
        {param:'salary',status:false,value:""},{param:"NID",status:false,value:""},
        {param:'Ref_Name',status:false,value:""},{param:"Ref_Num",status:false,value:""},
    
        ],
        list:[],
        listIndex:[]
    
    }

    onToggle=()=>this.setState({modal:!this.state.modal})
    onSubmit=(data)=>api.addEmployee(data).then(res=>{
        this.onToggle()
        return res;
    })

    onGetEmployee=(data)=>api.getEmployee(data).then(data=>{
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
                    <GetUser params={params} onSubmit={this.onGetEmployee}/>
                </div> 

                 {!!list.length && <Listing list={list} listIndex={listIndex}/>}
                 <Modal isOpen={modal} header={'Add Employee'} onToggle={this.onToggle}><EmplyeeForm onSubmit={this.onSubmit}/></Modal>
                 
            </div>
        )
    }
}
