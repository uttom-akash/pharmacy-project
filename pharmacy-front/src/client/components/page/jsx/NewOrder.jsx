import React, { Component } from 'react'
import  Draggable from 'react-draggable'
import {Button,Dropdown} from 'semantic-ui-react'
import Modal from '../../unitComp/modal  basic/Modal'
import VoucharForm from '../../form/VoucharForm'
import {connect} from 'react-redux'
import {checkoutToggleAction} from '../../action/UniverseAction'
import ConfirmUi from '../../unitComp/confirmUI/ConfirmUI'
import api from '../../api/Api';
const style={position:'fixed',top:'8rem',right:'1rem'}

class NewOrder extends Component {

    state={
        drugsOption:[],
        open:true,
        confirm:false,
        message:'Order is Placed...'
    }

    
    ok=()=>this.setState({confirm:false})

    componentDidUpdate=(prevProps,prevState)=>{
        if(prevProps.orderDrugs.length!==this.props.orderDrugs.length){
            const {orderDrugs}=this.props;
            let drugsOption=orderDrugs.map((drug,index)=>({key:drug['name'],text:drug['name'],value:drug['name']}))     
            this.setState({drugsOption})
        }
    }
    onClick=()=>this.setState({open:!this.state.open})

    toggle=()=>{
        this.props.checkoutToggleAction()
    }

    confirmOrder=(data)=>api.confirmOrder(data).then(res=>{
        this.toggle()
        this.setState({confirm:true})
    })
    render() {
        const {user,orderDrugs}=this.props;
        const {drugsOption,open,confirm,message}=this.state
        const {checkout}=this.props.checkout

        return (
            <div>
                <div className="new-order">
                <div style={style}>
                      <Draggable >
                        <Button.Group >
                          <Button color='teal' onClick={this.toggle}>checkout</Button>
                          <Button.Or/>
                          <Dropdown  onClick={this.onClick} button floating search text='drugs' options={drugsOption}  open={open && !!drugsOption.length}/>   
                        </Button.Group>
                      </Draggable>
                  </div>
                  <Modal modal={checkout} onToggle={this.toggle} basic={false}><VoucharForm confirmOrder={this.confirmOrder} toggle={this.toggle} list={orderDrugs} userID={user['USER_ID']} address={user['ADDRESS']} contactNumber={user['CONTACT_NUMBER']}/> </Modal> 
                  <ConfirmUi open={confirm} text={message} click1={this.ok} click2={this.ok} btn1={'cancel'} btn2={'ok'}/>
                </div>

            </div>
        )
    }
}

const mapStateToProps=(state)=>({
    user:state.User,
    orderDrugs:state.OrderDrugs,
    checkout:state.Universe

})

export default  connect(mapStateToProps,{checkoutToggleAction})(NewOrder);