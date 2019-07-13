import React, { Component } from 'react'
import SupplyForm from '../../form/jsx/SupplyForm'
import Modal from '../../comp/modal/Modal' 
import api from '../../api/Api'
import GetUser from '../../form/jsx/GetUser'
import {Button} from 'semantic-ui-react'
import '../css/view.css'
import Listing from '../../comp/data/Listing'

export default class NewSupply extends Component {
    state={
        modal:false,
        params:[{param:'Supply_ID',status:false,value:""},{param:"Supply_Date",status:false,value:""}],
        list:[],
        listIndex:[]
    
    }

    onToggle=()=>this.setState({modal:!this.state.modal})
    onSubmit=(data)=>api.newSupply(data)(res=>{
        this.onToggle();
        return res;
    })
    
    onGetSupply=(data)=>api.getSupply(data).then(data=>{
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
                    <GetUser params={params} onSubmit={this.onGetSupply}/>
                 </div>
                
                 {!!list.length && <Listing list={list} listIndex={listIndex}/>}
                <Modal isOpen={modal} header={'New Supply'} basic={true} onToggle={this.onToggle}><SupplyForm onSubmit={this.onSubmit}/></Modal> 
            </div>
        )
    }
}
