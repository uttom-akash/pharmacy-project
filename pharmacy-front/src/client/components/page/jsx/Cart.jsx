import React, { Component } from 'react';
import '../css/Cart.css'
import Restrict from '../../unitComp/restriction/Restriction'
import Table from '../../unitComp/table/Table'
import {connect} from 'react-redux'
import {removeCart,getCart} from '../../action/DrugsAction'
class Cart extends Component {
    
    state = {
        curOrder:false,
        pastOrder:false,
        cart:false,
        cartHeader:["product","price",'action'],
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


    componentDidMount=()=>{
        Restrict(this.props)
       const userID=sessionStorage.number
       if(!!userID) this.props.getCart({userID})
    }

    onClick=(drugID)=>  this.props.history.push(`/Drug/${drugID}`)
    
    toggle=()=>this.setState({modal:!this.state.modal})
  
    remove=(drugID)=>this.props.removeCart({drugID,userID:this.props.userID})
    
    render() {
        const { curOrder,pastOrder,cart,modal,cartlist,cartHeader,listIndex}=this.state;
        const {cartList} =this.props

        return (
        <div className="cart">

            <div className="cart-header"></div>
            
            <div className="cart-body">
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
        userID:state.User['USER_ID']
    }
)


export default connect(mapStatesToProps,{removeCart,getCart})(Cart);