import React, { Component } from 'react'
import List from '../../unitComp/list/List'
import '../css/Order.css'
import {connect} from 'react-redux'

import {getCurrentOrders,getPastOrders} from '../../action/DrugsAction'
import api from '../../api/Api'
import Restrict from '../../unitComp/restriction/Restriction'


class Orders extends Component {
    state = {
        curOrderMore:false,
        pastOrderMore:false,
        header:["#","","/-"],
        listIndex:['DATE','TIME','TOTAL_PRICE']
    }

    componentWillMount=()=>{
        Restrict(this.props)
        this.getOrderOverview()
    }
    getOrderOverview=()=>{
        const USER_ID=sessionStorage.number
        this.props.getCurrentOrders({userID:USER_ID,offset:0})
        this.props.getPastOrders({userID:USER_ID,offset:0})
    }
   
    viewDetails=(orderID)=>{
        
    }

    comfirmRecieve=(orderID)=>{
        api.orderRecieved({orderID}).then(res=>this.getOrderOverview())
    }

    moreCurrentOrders=()=>{};

    morePastOrders=()=>{};

    render() {
        const {curOrderMore,pastOrderMore,listIndex,header}=this.state

        return (
            <div className="order">
                <div className="order-header"></div>
                <div className="order-content">
                    <label className="title">Orders</label>
                    <hr/>
                    {
                        !!this.props.order.currentOrder && 
                        
                    <div className="curr-order">
                        <h6>Current Orders</h6>
                            <List  list={this.props.order.currentOrder.ORDERS} listIndex={listIndex} onClick={this.viewDetails} clickValue={'ORDER_ID'} label={'details'} onClick1={this.comfirmRecieve} clickValue1={'ORDER_ID'} label1={'recieve'}></List>
                            
                            <div className="less" onClick={()=>this.onClick({"curOrder":!curOrderMore})}>
                                {curOrderMore ? "Less" : "More"}
                            </div>
                    </div>
                    
                    }

                    <hr/>
                 
                    {
                        !!this.props.order.pastOrder &&
                        
                    
                    <div className="past-order">
                        <h6>Past Orders</h6>
                        <List  list={this.props.order.pastOrder.ORDERS} listIndex={listIndex} onClick={this.viewDetails} clickValue={'ORDER_ID'} label={'details'}></List>
                            
                            <div className="less" onClick={()=>this.onClick({"pastOrder":!pastOrderMore})}>
                            {pastOrderMore ? "Less" : "More"}
                            </div>
                    </div>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps=state=>({
    order:state.Order,
    user:state.User
})

export default  connect(mapStateToProps,{getCurrentOrders,getPastOrders})(Orders);