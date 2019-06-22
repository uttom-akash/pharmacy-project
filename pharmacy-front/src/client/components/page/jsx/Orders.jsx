import React, { Component } from 'react'
import List from '../../unitComp/list/List'

export default class Orders extends Component {
    state = {
        curOrder:false,
        pastOrder:false,
        header:["#","","/-"],
        list:[
            [1,"10-10-19",100],
            [2,"10-10-19",122]
        ],
        presentOrders:[
        ],
        modal:false
    }
   
    onClick=()=>{}

    render() {
        const {list,header,curOrder,pastOrder}=this.state;
        return (
            <div className="order">
                <h6>Orders</h6>
                <div className="curr-order">
                    <h6>Current Orders</h6>
                        <List header={header} list={list} onClick={this.onClick}></List>
                        <div className="less" onClick={()=>this.onClick({"curOrder":!curOrder})}>
                            {curOrder ? "Less" : "More"}
                        </div>
                </div>
                 
                <div className="past-order">
                    <h6>Past Orders</h6>
                    <List header={header} list={list} onClick={this.onClick}></List>
                        <div className="less" onClick={()=>this.onClick({"pastOrder":!pastOrder})}>
                           {pastOrder ? "Less" : "More"}
                        </div>
                    </div>
            </div>
        )
    }
}
