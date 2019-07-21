import React, { Component } from 'react'
import {connect} from 'react-redux'
import Drugs from '../../unitComp/specificDrug/SpecificDrugs'
import api from '../../api/Api'
import {getFilterSearchDrugs,addToOrderAction,addCart} from '../../action/DrugsAction'


class FilterSearch extends Component {
    
    state={
        offset:0
    }


    onDrugClick=(drugID)=>{
        this.props.history.push(`/Drug/${drugID}`)
    }

    onAddOrder=(drugs)=>this.props.addToOrderAction(drugs)
    onAddCart=(drug)=>this.props.addCart({userID:this.props.user.USER_ID,drugID:drug['DRUG_ID'],drug})


    render() {
        const {drugs}=this.props
    
        return (
            <div>
                {
                    !!drugs.length ? <Drugs drugs={drugs} onDrugClick={this.onDrugClick} onAddOrder={this.onAddOrder} onAddCart={this.onAddCart}/> : this.props.history.push('/')
                }
                </div>
        )
    }
}

const mapStatesToProps=state=>(
    {
        drugs:state.Filter,
        user:state.User
    }
)

export default  connect(mapStatesToProps,{getFilterSearchDrugs,addToOrderAction,addCart})(FilterSearch);