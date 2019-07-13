import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getCategoryDrugs} from '../../action/DrugsAction' 
import Drugs from '../../unitComp/specificDrug/SpecificDrugs'
import api from '../../api/Api'


class Categories extends Component {
    
    state={
        loading:false
    }

    componentWillMount=()=>{
        const {category}=this.props.match.params;
        this.setState({loading:true})
        this.props.getCategoryDrugs({categoryID:category}).then(res=>this.setState({loading:false})) 
    }
    
    // onMore=async ()=>{
    //     const {category}=this.props.match.params;
    //     console.log(this.props.drugs.More);
        
    //     if(this.props.drugs.MORE) await this.setState({offset:this.state.offset+15})
    //     else if(this.state.offset-15>=0)await this.setState({offset:this.state.offset-15})
        
    //     this.props.getCategoryDrugs({categoryID:category,offset:this.state.offset})         
    // }

    onDrugClick=(drugID)=>{
        this.props.history.push(`/Drug/${drugID}`)
    }

    onAddCart=(drugID)=>api.addToCart({userID:this.props.user.USER_ID,drugID})


    render() {
        const {drugs}=this.props
        console.log(!(!!drugs));
        
        return (
            <div>
               {
                   drugs.DRUGS_LIST && <Drugs drugs={drugs.DRUGS_LIST} onDrugClick={this.onDrugClick} onAddCart={this.onAddCart}/>
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

export default  connect(mapStatesToProps,{getCategoryDrugs})(Categories);