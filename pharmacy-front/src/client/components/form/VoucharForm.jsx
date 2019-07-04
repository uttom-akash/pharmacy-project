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
            location:{
                address:"nurani 6,subidbazar"
            },
            orderID:null
        }
    }

    componentDidMount=()=>{
           const {userID}=this.props
           api.newOrderInit({userID}).then(res=>this.setState({orderID:res['ORDER_ID']}))
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
    onChange=(event)=>console.log(event.target);
    
    onSubmit=(ev)=>{
        ev.preventDefault();
        // this.props.onSubmit({order:this.state.selectedlist,total:this.state.total});
        api.confirmOrder({orderID:this.state.orderID,totalPrice:this.state.total}).then(res=>this.props.toggle())        
    }

    onCancel=(ev)=>{
        ev.preventDefault();
        api.cancelOrder({orderID:this.state.orderID}).then(res=>this.props.toggle())
    }

    render() {
        const {selectedlist,header,total,location,orderID}=this.state;
    return (
      <form className="vouchar">
          <div className="selected-list">
              <h6>Vouchar</h6>
              <Button onClick={this.toggle} id="choose-cart-btn" text="Choose from cart"></Button>
              <Modal modal={this.state.modal}>
                    <ChooseItems onSubmit={this.onChoose}  list={this.state.list} orderID={orderID}/>  
              </Modal>
              <div className="vouchar-list">
                   <label>Date :{new Date().getDate()}</label>
                   <label>Time :{new Date().getTime()}</label>
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
                 <address>adress: <input type="text" name="address" value={location.address}></input></address>
            </div>
            <div className="personal-info">
                   <h6>Personal Info</h6>
                   <code>Number: <input type="text" name="contact-no"   placeholder="01797544036" value="01797544036"></input></code>
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
