import React, { Component } from 'react';
import {connect} from 'react-redux'
import {getDrug,addToOrderAction,addCart} from '../../action/DrugsAction'
import {loginToggleAction,checkoutToggleAction} from '../../action/UniverseAction'
import '../css/Drug.css'
import LoadingMessage from '../../unitComp/alert/LoadingMessage'
import ConfirmUi from '../../unitComp/confirmUI/ConfirmUI'

import {Button,Segment,} from 'semantic-ui-react'


class Drug extends Component {
    state = {
        confirm:false,
        loading:false,
        message:'',
        notUser:false
    }
    
   componentWillMount=()=>{
       const {drugID}=this.props.match.params;
       this.props.getDrug({drugID})
   }



   onAddOrder=(drug)=>{
    const {userID}=this.props
    if(!!userID){
        this.props.addToOrderAction(drug)
    }else{
        this.setState({notUser:true})
    }
    }

    onAddCart=(drug)=>{
        const {userID}=this.props
        if(!!userID){
            this.setState({loading:true})
            this.props.addCart({userID,drugID:drug['DRUG_ID'],drug}).then(res=>this.alertMessage('Added successfully')).catch(err=>this.alertMessage('Drug already in cart'))
        }else{
            this.setState({notUser:true})
        }
    }

    alertMessage=(message)=>{
        this.setState({loading:false,confirm:true,message})
    }

    onCheckout=()=>{
        this.setState({confirm:false})
        this.props.checkoutToggleAction()
    }

    onContinue=()=>this.setState({confirm:false})

    onLogin=()=>{
        this.setState({notUser:false})
        this.props.loginToggleAction()
    }


    render() {
        const {drug}=this.props;
        const {message,confirm,notUser,loading}=this.state

        return (
        <div className="drug-profile">

            <LoadingMessage visiblity={!loading} text={'Adding ...'}/>
            <ConfirmUi open={confirm} text={message} click1={this.onCheckout} click2={this.onContinue} btn1={'checkout'} btn2={'continue'}/>
            <ConfirmUi open={notUser} text={"You are not loggedin ..."} click1={this.onLogin} click2={()=>this.setState({notUser:false})} btn1={'login'} btn2={'Cancel'}/>

            <div className="header"></div>
            {!!drug &&  <div className="drug-content">
                <img src={drug['IMAGE_SRC']} alt="drug image"></img>
                <div className="desc">
                    <label className="title">{drug["DRUG_NAME"]}</label>
                    <br/><br/>

                    <label id="disabled">Barnd Name :</label><label>{drug['BRAND_NAME']}</label><br/>
                    <label id="disabled">Brand :</label><label>{drug['BRAND']}</label><br/><hr/>
                    <label id="disabled">DAR :</label><label>{drug['DAR']}</label><br/>
                    <label id="disabled">Price :</label><label>{drug['PRICE']}</label><br/>
                    
                    <Button.Group>
                            <Button size='tiny' color='teal' onClick={()=>this.onAddCart(drug) } icon='cart'/>
                            <Button.Or/>
                            <Button size='tiny' color='teal' onClick={()=>this.onAddOrder({name:drug['DRUG_NAME'],price: drug['PRICE'],drugID:drug["DRUG_ID"],discount:drug['DISCOUNT']}) }>add to order</Button>        
                    </Button.Group></div>
            </div>
            }    
        </div>);
    }
}

const mapStatesToProps=state=>(
    {
        drug:state.Drugs.Drug,
        userID: state.User.USER_ID
    })

export default connect(mapStatesToProps,{getDrug,addToOrderAction,addCart,checkoutToggleAction,loginToggleAction})(Drug);

