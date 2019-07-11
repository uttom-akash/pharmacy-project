import React, { Component } from 'react'
import ChooseItems from './ChooseItems'
import Modal from '../unitComp/modal/Modal'
import Button from '../unitComp/button/Button'
import './css/VoucharForm.css'
import api from '../api/Api'

export default class VoucharForm extends Component {
    
    constructor(props){
        super(props)

        this.state={
            total:0,
            header:["item","quantity","price"],
            list:{},
            selectedlist:[],
            modal:false,
            address:"nurani 6,subidbazar",
            contactNumber:'0000000000',
            orderID:null,
            date:null,
            time:null
        }
    }

    componentDidMount=()=>{
           const {userID,address,contactNumber}=this.props
           api.newOrderInit({userID}).then(res=>this.setState({orderID:res['ORDER_ID'],date:res['DATE'],time:res['TIME'],address,contactNumber}))
    }

    toggle=()=>this.setState({modal:!this.state.modal})
     
    // onStateChange=(param)=>{
    //        this.setState(param);
    // }

    onChoose=(selectedlist,total)=>{
        
        this.setState({selectedlist,total})
        this.toggle();
    }

    
    // onHandleChange=(event)=>[...event.target.options].filter(({selected})=>selected).map(({value})=>console.log(value))
    onChange=(event)=>this.setState({[event.target.name] :event.target.value});
    
    onSubmit=(ev)=>{
        ev.preventDefault();
        const {orderID,total,selectedlist}=this.state;
        api.confirmOrder({orderID:orderID,totalPrice:total}).then(res=>
            {
                this.props.toggle()
                api.salesOrder({orderID,selectedlist})
            })        
    }

    onCancel=(ev)=>{
        ev.preventDefault();
        api.cancelOrder({orderID:this.state.orderID}).then(res=>this.props.toggle())
    }

    render() {
        const {selectedlist,header,total,address,contactNumber,orderID,date,time}=this.state;
    return (
      <form className="vouchar">
          <div className="selected-list">
              <h6>Vouchar</h6>
              <Button onClick={this.toggle} id="choose-cart-btn" text="Choose from cart"></Button>
              <Modal modal={this.state.modal}>
                    <ChooseItems onSubmit={this.onChoose}  list={this.state.list} orderID={orderID}/>  
              </Modal>
              <div className="vouchar-list">
                   <label>Date :{date}</label>
                   <label>Time :{time}</label>
                   {
                    <table>
                           <React.Fragment>
                            <tr>
                                {header.map(head=><th>{head}</th>)}
                            </tr>
                            {
                                selectedlist.map(({name,quantity,price},key)=>
                                <tr className="table-row" key={key}>
                                    <td>{name}</td>
                                    <td>{quantity}</td>
                                    <td>{price}</td>
                                </tr>
                                ) 
                            }                   
                            <tr>
                                <td colSpan="2">Total</td>
                                <td>{total}</td>
                            </tr>    
                        </React.Fragment>
                    </table>
                   }
              </div>
            </div>
            <div className="delivery-loc">
                <h6>Delivery</h6>
                 <code>duration:40min</code>
                 <address>adress: <input type="text" name="address" value={address}  onChange={this.onChange}></input></address>
            </div>
            <div className="personal-info">
                   <h6>Personal Info</h6>
                   <code>Number: <input type="text" name="contactNumber" value={contactNumber} onChange={this.onChange}></input></code>
            </div>
            <div className="payment">
                  <h6>Payment</h6>
                  <label>Cash on Delivary</label>
            </div>
            <div className="voucher-btn">
                        <Button onClick={this.onSubmit} id="check-btn" text="Confirm"></Button>
                        <Button onClick={this.onCancel} id="check-btn" text="Cancel"></Button>     
            </div>
            
      </form>
    )
  }
}
