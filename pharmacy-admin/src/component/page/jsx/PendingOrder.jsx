import React, { Component } from 'react'
import Listing from '../../comp/data/Listing'
import api from '../../api/Api'
import Modal from '../../comp/modal/Modal'
import Vouchar from './Vouchar'

export default class PendingOrder extends Component {
    state={
        order:[],
        listIndex:['ORDER_ID','DATE','TIME','ADDRESS','TOTAL_PRICE'],
        modal:false,
        orderID:''
    }

    componentWillMount=()=>{
        this.getPendingOrder()
    }

    getPendingOrder=()=>api.getPendingOrder().then(res=>this.setState({order:res['List']}))
    

    approve=()=>{
        this.getPendingOrder()
    }
    reject=(orderID)=>{
        api.rejectOrder({orderID}).then(res=>this.getPendingOrder())
    }

    toggle=()=>this.setState({modal:!this.state.modal})

    viewDetails=(orderID)=>{
            this.setState({orderID})
            this.toggle();
    }
    render() {
        const {order,listIndex,modal,orderID}=this.state
        return (
            <div className="notification">
                <Listing list={order} listIndex={listIndex} 
                                        onClick1={this.viewDetails} clickKey1={'ORDER_ID'} clickText1={'Details'}
                                        onClick2={this.reject} clickKey2={'ORDER_ID'} clickText2={'Reject'}
                                        />                
                    <Modal modal={modal} onToggle={this.toggle} basic={false}>
                            <Vouchar orderID={orderID} toggle={this.toggle} approve={this.approve} reject={this.reject}/>
                    </Modal>
            </div>
        )
    }
}
