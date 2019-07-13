import React, { Component } from 'react'
import {connect} from 'react-redux'
import Drugs from '../../unitComp/specificDrug/SpecificDrugs'
import api from '../../api/Api'
import {getFilterSearchDrugs} from '../../action/DrugsAction'


class FilterSearch extends Component {
    
    state={
        offset:0
    }


    onDrugClick=(drugID)=>{
        this.props.history.push(`/Drug/${drugID}`)
    }

    onAddCart=(drugID)=>api.addToCart({userID:this.props.user.USER_ID,drugID})


    render() {
        const {drugs}=this.props
        return (
            <div>
                {
                    !!drugs && <Drugs drugs={drugs} onDrugClick={this.onDrugClick} onAddCart={this.onAddCart}/>
                }
                </div>
        )
    }
}

const mapStatesToProps=state=>(
    {
        drugs:state.Drugs,
        user:state.User
    }
)

export default  connect(mapStatesToProps,{getFilterSearchDrugs})(FilterSearch);