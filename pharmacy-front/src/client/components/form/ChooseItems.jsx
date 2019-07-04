import React, { Component } from 'react'
import './css/ChooseItem.css'
import {connect} from 'react-redux'
import Button from '../unitComp/button/Button'
import {isAvailable} from './../action/DrugsAction'
import api from '../api/Api'


class ChooseItems extends Component {
    
    state={
        list:[],
        listIndex:['name','quantity','price','total'],
        header:['name','quantity','price','total'],
        total:0
    }
    
    componentDidMount=()=>{
        const {cartList}=this.props
        let list=[]
        cartList.map(drug=>list[drug['DRUG_ID']]={name:drug['DRUG_NAME'],status:false,quantity:0,price:drug['PRICE'],total:0})
        this.setState({list});

        list.map((row,index)=>{console.log(row['name'])})
    }

    onChange=(ev)=>{
        let list=this.state.list.slice(0)

        list[parseInt(ev.target.name)].status=!this.state.list[[parseInt(ev.target.name)]].status
        this.setState({list});
    }
    
    onIncDec=(drugID,op)=>{

                let list=this.state.list.slice(0)
        
                list[drugID].quantity=list[drugID].quantity+op;
                list[drugID].total=list[drugID].quantity*list[drugID].price;

                let total=this.state.total;
                total=total+list[drugID].price*op;

                this.setState({list,total});
    }

    onInc=(drugID)=>{
        const {orderID}=this.props
        if(this.state.list[drugID].status){
            this.props.isAvailable({drugID}).then(res=>{
                let quantity=this.state.list[drugID].quantity
                if(quantity+1<=res){
                    api.decrement({drugID,orderID}).then(result=>{
                        this.onIncDec(drugID,+1)})  
                }else alert('Sorry..No more drugs of this are available')
            })
        }else alert("please check the box first")

    }


    onDec=(drugID)=>{

        const {orderID}=this.props
        if(this.state.list[drugID].status){
                let quantity=this.state.list[drugID].quantity
                if(quantity-1>=0){
                    api.increment({drugID,orderID}).then(result=>{
                        this.onIncDec(drugID,-1)})  
                }
        }else alert("please check the box first")
    }

    
    onSubmit=(ev)=>{

        ev.preventDefault();
        let {list,total}=this.state;
        let vouchar=[]
        
        vouchar=list.filter(drug=>drug.status && drug.quantity)
        this.props.onSubmit(vouchar,total);
    
    }

    onCancel=(ev)=>{
        ev.preventDefault();

        api.cancelOrder({orderID:this.props.orderID})
        this.props.onSubmit([],0)
    }



    render() {
        const {list,listIndex,header,total}=this.state;
        return (
            <form className="choose-med-form" >

                <div className="header">
                    {header.map(head=><label className="head">{head}</label>)}
                </div >
                <div className="choose-content">
                {
                    list.map((row,rowIndex)=>
                        <div className="choose-row">
                            <input type="checkbox" name={rowIndex} checked={row['status']}  onChange={this.onChange} className="checkbox" />
                            <label className="drug-name">{row[listIndex[0]]}</label>
                            <label >{row[listIndex[1]]}</label>
                            <label >{row[listIndex[2]]}</label>
                            <label >{row[listIndex[3]]}</label>

                            <Button onClick={()=>this.onDec(rowIndex)} id="incdec" text=' - '/>
                            <Button onClick={()=>this.onInc(rowIndex)} id="incdec" text=' + '/>
                        </div>
                    )
                }
                <label className="total">TOTAL : {total}</label>
                </div>  
                <div className="choose-btn">
                        <Button onClick={this.onSubmit} id="check-btn" text="Confirm"></Button>
                        <Button onClick={this.onCancel} id="check-btn" text="Cancel"></Button>     
                </div>
            </form>
        )
  }
}

const mapStateToProps=state=>({
    cartList:state.Cart
})
export default  connect(mapStateToProps,{isAvailable})(ChooseItems)