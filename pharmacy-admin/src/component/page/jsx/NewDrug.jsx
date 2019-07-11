import React, { Component } from 'react'
import DrugForm from '../../form/jsx/DrugForm'
import Modal from '../../comp/modal/Modal'
import api from '../../api/Api'
import GetUser from '../../form/jsx/GetUser'
import {Button} from 'semantic-ui-react'
import '../css/view.css'
import Listing from '../../comp/data/Listing'

export default class NewDrug extends Component {
    state={
        modal:false,
        params:[{param:'Drug_ID',status:false,value:""},{param:'drug_Name',status:false,value:""},
        {param:'brand_Name',status:false,value:""},{param:"brand",status:false,value:""},
        {param:'price',status:false,value:""}
    ],
    list:[],
    listIndex:[]
    
    }

    onToggle=()=>this.setState({modal:!this.state.modal})
    onSubmit=(data)=>api.newDrug(data)(res=>{
        this.onToggle();
        return res;
    })
    
    onGetDrugs=(data)=>api.getDrug(data).then(data=>{
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
                    <GetUser params={params} onSubmit={this.onGetDrugs}/>
                </div> 
                {!!list.length && <Listing list={list} listIndex={listIndex}/>}
               <Modal isOpen={modal} header={'Add Drug'} onToggle={this.onToggle}><DrugForm onSubmit={this.onSubmit}/></Modal>
            </div>
        )
    }
}
