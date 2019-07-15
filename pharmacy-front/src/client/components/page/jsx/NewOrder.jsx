import React, { Component } from 'react'
import  Draggable from 'react-draggable'
import {Button,Dropdown} from 'semantic-ui-react'
import Modal from '../../unitComp/modal  basic/Modal'
import VoucharForm from '../../form/VoucharForm'
import {connect} from 'react-redux'


const style={position:'fixed',top:'6.6rem',right:'3rem'}

class NewOrder extends Component {

    state={
        modal:false,
        drugsOption:[]
    }

    

    componentDidUpdate=(prevProps,prevState)=>{
        if(prevProps.orderDrugs.length!==this.props.orderDrugs.length){
            const {orderDrugs}=this.props;
            let drugsOption=orderDrugs.map((drug,index)=>({key:index,text:drug['name'],value:drug['drugID']}))     
            this.setState({drugsOption})
        }
    }

    toggle=()=>this.setState({modal:!this.state.modal})

    render() {
        const {user,orderDrugs}=this.props;
        const {modal,drugsOption}=this.state

        return (
            <div>
                <div className="new-order">
                <div style={style}>
                      <Draggable >
                        <Button.Group >
                          <Button color='teal' onClick={this.toggle}>order</Button>
                          <Button.Or/>
                          <Dropdown  button floating search text='drugs' options={drugsOption}/>   
                        </Button.Group>
                      </Draggable>
                  </div>
                  <Modal modal={modal} onToggle={this.toggle} basic={false}><VoucharForm  toggle={this.toggle} list={orderDrugs} userID={user['USER_ID']} address={user['ADDRESS']} contactNumber={user['CONTACT_NUMBER']}/> </Modal> 
                </div>

            </div>
        )
    }
}

const mapStateToProps=(state)=>({
    user:state.User,
    orderDrugs:state.OrderDrugs
})

export default  connect(mapStateToProps)(NewOrder);