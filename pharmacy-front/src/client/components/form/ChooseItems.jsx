import React, { Component } from 'react'
import './css/ChooseItem.css'

export default class ChooseItems extends Component {
    
    state={
        medicine:[],
        list:{},
        total:0
    }
    
    componentDidMount=()=>{
        let medicine=Object.keys(this.props.list);
        this.setState({medicine,list:this.props.list});
    }

    onChange=(ev)=>{
        let list={...this.state.list}
        list[ev.target.name].status=!this.state.list[[ev.target.name]].status
        this.setState({list});
    }
    
    onIncDec=(name,op,price)=>{
        
        // checker

        let list={...this.state.list}
        list[name].quantity=this.state.list[[name]].quantity+op;
        let total=this.state.total;
        total=total+price*op;
        this.setState({list,total});
    }
    
    onSubmit=(ev)=>{
        ev.preventDefault();
        let {medicine,list}=this.state;
        let vouchar=[]
        
        medicine.filter(med=>list[med].status && list[med].quantity)
        .map(med=>vouchar.push({"name":med,"quantity":list[med].quantity,"price":list[med].quantity*list[med].price}))
        
        this.props.onStateChange({list})
        this.props.onSubmit(vouchar,this.state.total);
    }

    render() {
        const {medicine,list}=this.state;
        return (
            <form className="choose-med-form" onSubmit={this.onSubmit}>
            <table>
            <h6>Cart</h6>   
            {
                medicine.map((name,key)=>
                    !!list[name] &&   
                    <tr className="check-row" key={key}>
                            <td><input type="checkbox"  name={name} checked={list[name].status}  onChange={this.onChange} className="checkbox"/> </td>
                            <td className="desc">{name}</td>
                            { 
                    !!list[name] &&    list[name].status &&
                            <React.Fragment>
                                <td className="check-control">
                                    <label className="check-btn" onClick={()=>this.onIncDec(name,-1,list[name].price)}>-</label>
                                    <label>{list[name].quantity}</label>
                                    <label className="check-btn" onClick={()=>this.onIncDec(name,+1,list[name].price)}>+</label>
                                </td>
                                <td className="desc">{list[name].quantity}*{list[name].price}</td>
                                <td className="desc">{list[name].quantity*list[name].price} taka</td>
                            </React.Fragment>
                            }
                    </tr>    
                )  
           }
           <tr className="check-row">
               <td className="total" colSpan="4">Total</td>
               <td className="total">{this.state.total}</td>    
           </tr>
           </table>
            <button className="check-btn">OK</button>
            </form>
        )
  }
}
