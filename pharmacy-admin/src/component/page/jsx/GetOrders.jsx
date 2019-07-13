import React, { Component } from 'react'
import Listing from '../../comp/data/Listing'
import api from '../../api/Api'
import Modal from '../../comp/modal/Modal'
import Vouchar from './Vouchar'
import {Form,Input,Button} from 'semantic-ui-react'

export default class GetOrder extends Component {
    state={
        order:[],
        listIndex:['ORDER_ID','DATE','TIME','ADDRESS','TOTAL_PRICE'],
        modal:false,
        orderID:'',
        date:'',
        limit:''
    }


    getOrder=(date,limit)=>api.getOrders({date,limit}).then(res=>this.setState({order:res['List']}))
    

    approve=(orderID)=>{
        api.approveOrder({orderID}).then(res=>this.getPendingOrder())
    }
    reject=(orderID)=>{
        api.rejectOrder({orderID}).then(res=>this.getPendingOrder())
    }

    toggle=()=>this.setState({modal:!this.state.modal})

    viewDetails=(orderID)=>{
            this.setState({orderID})
            this.toggle();
    }

    onSubmit=(ev)=>{
        ev.preventDefault();
        const {date,limit}=this.state
        this.getOrder(date,limit)
    }

    onChange=(ev)=>this.setState({[ev.target.name]:ev.target.value})
    render() {
        const {order,listIndex,modal,orderID,date,limit}=this.state
        return (
            <div className="notification">
                    <Form onSubmit={this.onSubmit}>
                            <Input type="text" name='date' placeholder='yyyy-mm-dd' label='Date' value={date} onChange={this.onChange}></Input><br/>
                            <Input type="number" name='limit' placeholder='limt' label='Limit' value={limit}  onChange={this.onChange}></Input><br/>
                            <Button label='Query'></Button>
                    </Form>
                    
                    {!!order.length && <Listing list={order} listIndex={listIndex} 
                                        onClick1={this.viewDetails} clickKey1={'ORDER_ID'} clickText1={'Details'}
                                        />
        }                 
                    <Modal modal={modal} onToggle={this.toggle} basic={false}>
                            <Vouchar orderID={orderID} toggle={this.toggle}/>
                    </Modal>
            </div>
        )
    }
}
