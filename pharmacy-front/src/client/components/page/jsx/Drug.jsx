import React, { Component } from 'react';
import {connect} from 'react-redux'
import {getDrug} from '../../action/DrugsAction'
import '../css/Drug.css'
import api from '../../api/Api'


class Drug extends Component {
    state = {}
    
   componentWillMount=()=>{
       const {drugID}=this.props.match.params;
       this.props.getDrug({drugID})
   }

   onAddCart=(drugID)=>api.addToCart({userID:this.props.user.USER_ID,drugID})

    render() {
        const {drug}=this.props;

        return (
        <div className="drug-profile">
            <div className="header"></div>
            {!!drug &&  <div className="drug-content">
                <img src={drug['IMAGE_SRC']} alt="drug image"></img>
                <div className="desc">
                    <label className="title">{drug["DRUG_NAME"]}</label>
                    <br/><br/>

                    <label id="disabled">Barnd Name :</label><label>{drug['BRAND_NAME']}</label><br/>
                    <label id="disabled">Brand :</label><label>{drug['BRAND']}</label><br/><hr/>
                    <label id="disabled">DAR :</label><label>{drug['DAR']}</label><br/>
                    <label id="disabled">Price :</label><label>{drug['PRICE']}</label><br/>
                    <div className="add-cart" onClick={()=>this.onAddCart(drug['DRUG_ID'])}><i className="fas fa-shopping-cart"></i>+</div>
                </div>
            </div>}    
        </div>);
    }
}

const mapStatesToProps=state=>(
    {
        drug:state.Drugs.Drug,
        user: state.User
    })

export default connect(mapStatesToProps,{getDrug})(Drug);

