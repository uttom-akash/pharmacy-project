import React, { Component } from 'react';
import {connect} from 'react-redux'
import {getCategoryDrugsOverview} from '../../action/DrugsAction'
import api from '../../api/Api'

import Overview from '../../unitComp/overview/Overview'


class CatagoriesOverview extends Component {
    state = {}
    
    componentWillMount=()=>{
       this.props.getCategoryDrugsOverview()
    }


    onMore=(categoryID)=>{
        this.props.history.push(`/categories/${categoryID}`)
    }

    onDrugClick=(drugID)=>{
        this.props.history.push(`/Drug/${drugID}`)
    }

    onAddCart=(drugID)=>api.addToCart({userID:this.props.user.USER_ID,drugID})



    render() {
        const {drugs} =this.props
        return (<Overview drugs={drugs} onDrugClick={this.onDrugClick} onAddCart={this.onAddCart} onMore={this.onMore} title='CATEGORY'/>);
    }
}

const mapStatesToProps=state=>({
    drugs:state.Drugs.CategoryOverview,
    user: state.User
})

export default connect(mapStatesToProps,{getCategoryDrugsOverview})(CatagoriesOverview);

