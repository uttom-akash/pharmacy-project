import React, { Component } from 'react'
import {connect} from 'react-redux'

import {getBrandDrugs} from '../../action/DrugsAction' 
import Drugs from '../../unitComp/specificDrug/SpecificDrugs'
import api from '../../api/Api'


class Brands extends Component {
    
    // state={
    //     offset:0
    // }

    componentWillMount=()=>{
        const {brand}=this.props.match.params;

        this.props.getBrandDrugs({brand}) 
    }
    
    // onMore=async ()=>{
    //     const {brand}=this.props.match.params;
        
    //     if(this.props.drugs.MORE) await this.setState({offset:this.state.offset+15})
    //     else if(this.state.offset-15>=0)await this.setState({offset:this.state.offset-15})
        
    //     this.props.getBrandDrugs({brand,offset:this.state.offset})         
    // }

    onDrugClick=(drugID)=>{
        this.props.history.push(`/Drug/${drugID}`)
    }

    onAddCart=(drugID)=>api.addToCart({userID:this.props.user.USER_ID,drugID})


    render() {
        const {drugs}=this.props
        return (
            <div>
                {
                    !!drugs && <Drugs drugs={drugs.DRUGS_LIST} onDrugClick={this.onDrugClick} onAddCart={this.onAddCart}/>
            
                }
                </div>
        )
    }
}

const mapStatesToProps=state=>(
    {
        drugs:state.Drugs.Brand,
        user:state.User
    }
)

export default  connect(mapStatesToProps,{getBrandDrugs})(Brands);