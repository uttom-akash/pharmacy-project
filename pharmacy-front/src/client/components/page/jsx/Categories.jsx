import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getCategoryDrugs,addToOrderAction,addCart} from '../../action/DrugsAction' 
import Drugs from '../../unitComp/specificDrug/SpecificDrugs'


class Categories extends Component {
    
    state={
        loading:false
    }

    componentWillMount=()=>{
        const {category}=this.props.match.params;
        this.setState({loading:true})
        this.props.getCategoryDrugs({categoryID:category}).then(res=>this.setState({loading:false})) 
    }
   
    onDrugClick=(drugID)=>{
        this.props.history.push(`/Drug/${drugID}`)
    }

    
    onAddCart=(drug)=>this.props.addCart({userID:this.props.user.USER_ID,drugID:drug['DRUG_ID'],drug})

    onAddOrder=(drugs)=>this.props.addToOrderAction(drugs)

    render() {
        const {drugs}=this.props
        console.log(!(!!drugs));
        
        return (
            <div>
               {
                   drugs.DRUGS_LIST && <Drugs drugs={drugs.DRUGS_LIST} onDrugClick={this.onDrugClick} onAddOrder={this.onAddOrder} onAddCart={this.onAddCart}/>
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

export default  connect(mapStatesToProps,{getCategoryDrugs,addToOrderAction,addCart})(Categories);