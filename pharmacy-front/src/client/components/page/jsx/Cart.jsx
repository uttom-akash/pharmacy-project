import React, { Component } from 'react';
import '../css/Cart.css'
import List from '../../unitComp/list/List'
import Modal from '../../unitComp/modal/Modal'
import VoucharForm from '../../form/VoucharForm'


import {connect} from 'react-redux'

import {getCart} from '../../action/DrugsAction'



class Cart extends Component {
    
    state = {
        curOrder:false,
        pastOrder:false,
        cart:false,
        cartHeader:["item","brand","price/unit","action"],
        header:["#","","/-"],
        list:[
            [1,"10-10-19",100],
            [2,"10-10-19",122]
        ],
        listIndex:[
            'DRUG_NAME',
            'BRAND',
            'PRICE'
        ],
        presentOrders:[
        ],
        modal:false
    }


    componentWillMount=()=>{
          const {userID}=this.props.match.params
          console.log(userID);
          
          this.props.getCart({userID})
    }

    onClick=(ev)=>this.setState(ev);
    
    toggle=()=>this.setState({modal:!this.state.modal})
    
    onPlaceOrder=({order,total})=>{
        let list=[...this.state.list];
        let presentOrders=[...this.state.presentOrders]
        list.push([list.length+1,"1-1-19",total]); 
        presentOrders.push({...order,total:total})
        this.setState({list,presentOrders})
        this.toggle();
    }
    
    render() {
        const { curOrder,pastOrder,cart,modal,cartlist,cartHeader,listIndex}=this.state;
        // const {cart} =this.props

        return (
        <div className="cart">

            <div className="cart-header"></div>
            
            <div className="cart-body">
                <div className="new-order">
                    <label>New Order</label>
                    <hr/>
                    <div className="make-order" onClick={this.toggle}>Create</div>
                    <Modal modal={modal} toggle={this.toggle}><VoucharForm onSubmit={this.onPlaceOrder}/> </Modal> 
                </div>

                <div className="cart-content">
                    <label>Cart</label>
                    <hr/>
                    <List header={cartHeader} list={this.props.cart} listIndex={listIndex} onClick={this.onClick}></List>
                    <div className="less" onClick={()=>this.onClick({"cart":!cart})}>
                        {cart ? "Less" : "More"}
                    </div>     
                </div>
            </div>
            
            
        </div>);
    }
}

const mapStatesToProps=state=>(
    {
        cart:state.Cart,
        user:state.User
    }
)


export default connect(mapStatesToProps,{getCart})(Cart);