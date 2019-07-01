import React, { Component } from 'react';
import {connect} from 'react-redux'
import {getBrandDrugsOverview} from '../../action/DrugsAction'
import api from '../../api/Api'
import Overview from '../../unitComp/overview/Overview'


class BrandOverview extends Component {

    state = {}
    
    componentWillMount=()=>{
       this.props.getBrandDrugsOverview()
    }


    onMore=(brand)=>{
        this.props.history.push(`/brands/${brand}`)
    }

    onDrugClick=(drugID)=>{
        this.props.history.push(`/Drug/${drugID}`)
    }

    onAddCart=(drugID)=>api.addToCart({userID:this.props.user.USER_ID,drugID})



    render() {
        const {drugs} =this.props
        return (<Overview drugs={drugs} onDrugClick={this.onDrugClick} onAddCart={this.onAddCart} onMore={this.onMore} title='BRAND'/>);
    }
}

const mapStatesToProps=state=>({
    drugs:state.Drugs.BrandOverview,
    user: state.User
})

export default connect(mapStatesToProps,{getBrandDrugsOverview})(BrandOverview);


