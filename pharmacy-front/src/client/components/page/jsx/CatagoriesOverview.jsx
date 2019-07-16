import React, { Component } from 'react';
import {connect} from 'react-redux'
import {getCategoryDrugsOverview,addToOrderAction,addCart} from '../../action/DrugsAction'
import api from '../../api/Api'

import Overview from '../../unitComp/overview/Overview'


class CatagoriesOverview extends Component {
    
    
    componentWillMount=()=>{
       this.props.getCategoryDrugsOverview()
    }


    onMore=(categoryID)=>{
        this.props.history.push(`/categories/${categoryID}`)
    }

    onDrugClick=(drugID)=>{
        this.props.history.push(`/Drug/${drugID}`)
    }

    
    onAddCart=(drug)=>this.props.addCart({userID:this.props.user.USER_ID,drugID:drug['DRUG_ID'],drug})

    onAddOrder=(drugs)=>this.props.addToOrderAction(drugs)

    render() {
        const {drugs} =this.props
        return (<Overview drugs={drugs} onDrugClick={this.onDrugClick} onAddCart={this.onAddCart} onAddOrder={this.onAddOrder} onMore={this.onMore} title='CATEGORY'/>);
    }
}

const mapStatesToProps=state=>({
    drugs:state.Drugs,
    user: state.User
})

export default connect(mapStatesToProps,{getCategoryDrugsOverview,addToOrderAction,addCart})(CatagoriesOverview);

