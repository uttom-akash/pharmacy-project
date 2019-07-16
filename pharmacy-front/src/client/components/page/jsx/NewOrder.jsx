import React, { Component } from 'react'
import  Draggable from 'react-draggable'
import {Button,Dropdown} from 'semantic-ui-react'
import Modal from '../../unitComp/modal  basic/Modal'
import VoucharForm from '../../form/VoucharForm'
import {connect} from 'react-redux'
import {checkoutToggleAction} from '../../action/UniverseAction'

const style={position:'fixed',top:'6.6rem',right:'1rem'}

class NewOrder extends Component {

    state={
        drugsOption:[],
        open:true
    }

    

    componentDidUpdate=(prevProps,prevState)=>{
        if(prevProps.orderDrugs.length!==this.props.orderDrugs.length){
            const {orderDrugs}=this.props;
            let drugsOption=orderDrugs.map((drug,index)=>({key:drug['name'],text:drug['name'],value:drug['name']}))     
            this.setState({drugsOption})
        }
    }
    onClick=()=>this.setState({open:!this.state.open})

    toggle=()=>this.props.checkoutToggleAction()

    render() {
        const {user,orderDrugs}=this.props;
        const {drugsOption,open}=this.state
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
                  <Modal modal={checkout} onToggle={this.toggle} basic={false}><VoucharForm  toggle={this.toggle} list={orderDrugs} userID={user['USER_ID']} address={user['ADDRESS']} contactNumber={user['CONTACT_NUMBER']}/> </Modal> 
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