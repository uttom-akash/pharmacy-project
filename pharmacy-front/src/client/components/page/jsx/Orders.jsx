import React, { Component } from 'react'
import {connect} from 'react-redux'

import {getCurrentOrders,getPastOrders} from '../../action/DrugsAction'
import api from '../../api/Api'
import Restrict from '../../unitComp/restriction/Restriction'
import Table from '../../unitComp/table/Table'
import {Segment,Label} from 'semantic-ui-react'
import TableMenu from '../../unitComp/table menu/TableMenu'
import Modal from '../../unitComp/modal  basic/Modal'
import Vouchar from './Voucher' 
import '../css/Order.css'

class Orders extends Component {
    state = {
        curOrderOffset:0,
        pastOrderOffset:0,
        header:['Date','Time','Price','status','action'],
        listIndex:['DATE','TIME','TOTAL_PRICE'],
        modal:false
    }

    componentWillMount=()=>{
        Restrict(this.props)
        this.getOrderOverview()
    }

    getOrderOverview=()=>{
        const USER_ID=sessionStorage.number
        const {curOrderOffset,pastOrderOffset}=this.state
        this.props.getCurrentOrders({userID:USER_ID,offset:curOrderOffset})
        this.props.getPastOrders({userID:USER_ID,offset:pastOrderOffset})

    }

    toggle=()=>this.setState({modal:!this.state.modal})

    viewDetails=(orderID)=>{
        api.viewOrderDetails({orderID}).then(res=>{
            this.setState({vouchar:res})
            this.toggle()
        })
    }

    comfirmRecieve=(orderID)=>{
        api.orderRecieved({orderID}).then(res=>this.getOrderOverview())
    }

    moreCurrentOrders=(op)=>{
        const USER_ID=sessionStorage.number
        
        const {curOrderOffset}=this.state
        if(curOrderOffset+10*op>=0){
            this.setState({curOrderOffset:curOrderOffset+10*op});
            this.props.getCurrentOrders({userID:USER_ID,offset:curOrderOffset+10*op})
        }
    }

    morePastOrders=(op)=>{
        const USER_ID=sessionStorage.number
        const {pastOrderOffset}=this.state
        if(pastOrderOffset+10*op>=0){
            this.setState({pastOrderOffset:pastOrderOffset+10*op});
            this.props.getPastOrders({userID:USER_ID,offset:pastOrderOffset+10*op})
        }
    };

    render() {
        const {listIndex,header,modal,vouchar}=this.state
        const {order}=this.props;

        return (
            <div className='order'>
                {
                    !!order.currentOrder &&
                    <Segment>
                        <Label>Current Order</Label>
                        <Table list={order.currentOrder.ORDERS} listIndex={listIndex} header={header} special={'STATUS'} onClick1={this.comfirmRecieve} onClick2={this.viewDetails} clickKey1={'ORDER_ID'} clickKey2={'ORDER_ID'} clickText1={'Ok'} clickText2={'Details'}>
                                <TableMenu left={this.moreCurrentOrders} right={this.moreCurrentOrders}/>
                        </Table>
                    </Segment>
                }

                {
                    !!order.pastOrder &&
                    <Segment>
                        <Label>Past Order</Label>
                        <Table list={order.pastOrder.ORDERS} listIndex={listIndex} header={header} special={'STATUS'}  onClick2={this.viewDetails}  clickKey2={'ORDER_ID'}  clickText2={'Details'}>
                                <TableMenu left={this.morePastOrders} right={this.morePastOrders}/>
                        </Table>
                    </Segment>
                }
                <Modal modal={modal} onToggle={this.toggle} basic={false}>
                    <Vouchar header={['drugName','quantity','price']} vouchar={vouchar} toogle={this.toggle}/>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps=state=>({
    order:state.Order,
    user:state.User
})

export default  connect(mapStateToProps,{getCurrentOrders,getPastOrders})(Orders);