import React, { Component } from 'react';
import '../css/Cart.css'
import Modal from '../../unitComp/modal  basic/Modal'
import VoucharForm from '../../form/VoucharForm'
import Restrict from '../../unitComp/restriction/Restriction'
import Table from '../../unitComp/table/Table'

import {connect} from 'react-redux'

import {getCart,removeCart} from '../../action/DrugsAction'



class Cart extends Component {
    
    state = {
        curOrder:false,
        pastOrder:false,
        cart:false,
        cartHeader:["product","price",'action'],
        header:["#","","/-"],
        list:[
            [1,"10-10-19",100],
            [2,"10-10-19",122]
        ],
        listIndex:[
            'DRUG_NAME',
            'PRICE',
        ],
        presentOrders:[
        ],
        modal:false
    }


    componentWillMount=()=>{
          Restrict(this.props);
          const {userID}=this.props.match.params          
          this.props.getCart({userID})
    }

    onClick=(drugID)=>  this.props.history.push(`/Drug/${drugID}`)
    
    toggle=()=>this.setState({modal:!this.state.modal})
    
    onPlaceOrder=({order,total})=>{
        let list=[...this.state.list];
        let presentOrders=[...this.state.presentOrders]
        list.push([list.length+1,"1-1-19",total]); 
        presentOrders.push({...order,total:total})
        this.setState({list,presentOrders})
        this.toggle();
    }

    remove=(drugID)=>this.props.removeCart({drugID,userID:this.props.user.USER_ID})
    
    render() {
        const { curOrder,pastOrder,cart,modal,cartlist,cartHeader,listIndex}=this.state;
        const {cartList,user} =this.props
        console.log(user['USER_ID']);
        

        return (
        <div className="cart">

            <div className="cart-header"></div>
            
            <div className="cart-body">
                <div className="new-order">
                    <label>New Order</label>
                    <hr/>
                    <div className="make-order" onClick={this.toggle}>Create</div>
                    <Modal modal={modal} onToggle={this.toggle} basic={false}><VoucharForm onSubmit={this.onPlaceOrder} toggle={this.toggle} userID={user['USER_ID']} address={user['ADDRESS']} contactNumber={user['CONTACT_NUMBER']}/> </Modal> 
                </div>

                <div className="cart-content">
                    <label>Cart</label>
                    <hr/>
                    <Table header={cartHeader} list={cartList} listIndex={listIndex} onClick1={this.onClick} clickKey1={'DRUG_ID'} clickText1={'view'} onClick2={this.remove} clickKey2={"DRUG_ID"} clickText2={'remove'}/>
                </div>
            </div>
            
            
        </div>);
    }
}

const mapStatesToProps=state=>(
    {
        cartList:state.Cart,
        user:state.User
    }
)


export default connect(mapStatesToProps,{getCart,removeCart})(Cart);