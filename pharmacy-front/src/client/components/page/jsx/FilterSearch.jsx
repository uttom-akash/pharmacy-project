import React, { Component } from 'react'
import {connect} from 'react-redux'
import Drugs from '../../unitComp/specificDrug/SpecificDrugs'
import api from '../../api/Api'
import {getFilterSearchDrugs} from '../../action/DrugsAction'


class FilterSearch extends Component {
    
    state={
        offset:0
    }

    componentWillMount=()=>{
        let {category,brand,price}=this.props.match.params;
        
        category=category.split(',').map(num=>parseInt(num,10));

        this.props.getFilterSearchDrugs({category,brand,price,offset:this.state.offset})
                  .then(res=>console.log(res))
                  .catch(err=>console.log(err)) 

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
        drugs:state.Drugs.Filter,
        user:state.User
    }
)

export default  connect(mapStatesToProps,{getFilterSearchDrugs})(FilterSearch);