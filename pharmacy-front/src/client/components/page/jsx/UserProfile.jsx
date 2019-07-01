import React, { Component } from 'react';
import {connect} from 'react-redux'
import '../css/UserProfile.css'


class UserProfile extends Component {
    state = {}
    render() {
        const {firstName,lastName,address,contactNumber}=this.props;

        return (<div className="profile-container">
             <div className="profile-header"></div>
             <div className="profile">
                 <div className="basic-profile-info">
                     <label className="title">{firstName} {lastName}</label>
                     <hr/>
                     <div>
                         <label className="disabled"><i className="fas fa-map-marker-alt"></i></label>
                         <label className="disabled">{address}</label>
                     </div>
                     <div>
                         <label className="disabled"><i className="fas fa-mobile-alt"></i></label>
                         <label className="disabled">{contactNumber}</label>
                     </div>
                 </div>
                 <div className="history">

                 </div>
             </div>
             <div className="voucher"></div>
        </div>);
    }
}

const mapStatesToProps=state=>({
    firstName: state.User.FIRST_NAME,
    lastName : state.User.LAST_NAME,
    address: state.User.ADDRESS,
    contactNumber: state.User.CONTACT_NUMBER
})

export default connect(mapStatesToProps,null)(UserProfile);