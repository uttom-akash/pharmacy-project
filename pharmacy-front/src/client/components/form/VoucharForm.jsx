import React, { Component } from 'react'
import ChooseItems from './ChooseItems'
import Modal from '../unitComp/modal/Modal'
import Table from '../unitComp/table/Table'
import Button from '../unitComp/button/Button'
import './css/VoucharForm.css'

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
            }
        }
    }

    componentDidMount=()=>{
        let cartlist=[
            ["Napa",3],
            ["Tuska",40],
            ["Etorix",8]
        ]

        let  list={};
        cartlist.map((med)=>list[med[0]]={status:false,quantity:0,price:med[1]})
        this.setState({list})
    }

    toggle=()=>this.setState({modal:!this.state.modal})
     
    onStateChange=(param)=>{
           this.setState(param);
    }

    onChoose=(selectedlist,total)=>{
        this.setState({selectedlist,total})
        this.toggle();
    }

    // onHandleChange=(event)=>[...event.target.options].filter(({selected})=>selected).map(({value})=>console.log(value))
    onChange=(event)=>console.log(event.target);
    
    onSubmit=(ev)=>{
        ev.preventDefault();
        this.props.onSubmit({order:this.state.selectedlist,total:this.state.total});        
    }

    render() {
        const {selectedlist,header,total,location}=this.state;
    return (
      <form className="vouchar">
          <div className="selected-list">
              <h6>Vouchar</h6>
              <Button onClick={this.toggle} id="choose-cart-btn" text="Choose from cart"></Button>
              <Modal modal={this.state.modal} toggle={this.toggle}>
                    <ChooseItems onSubmit={this.onChoose} onStateChange={this.onStateChange} list={this.state.list}/>  
              </Modal>
              <div className="vouchar-list">
                   <label>Date :{new Date().getDate()}</label>
                   <label>Time :{new Date().getTime()}</label>
                   {
                    <Table>
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
                    </Table>
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
            <Button onClick={this.onSubmit} id="confirm-order" text="Confirm"></Button>
      </form>
    )
  }
}
