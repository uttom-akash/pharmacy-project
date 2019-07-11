import React, { Component } from 'react'
import {Button} from 'semantic-ui-react'
import FileInput from '../../comp/form/FileInput'
import '../css/UserForm.css'

export default class SupplierForm extends Component {

    state={
        name:"",
        address:"",
        contactNumber:"",
    }

    onChange = ev => this.setState({ [ev.target.name]: ev.target.value });

    onSubmit = ev => {
        ev.preventDefault();

        console.log("akash");
        

        let error = {};
        error = this.onValidate();
        this.setState({ error });

        if (Object.keys(error).length === 0) {
                    this.setState({ loading: true });


                    this.props.onSubmit(this.state).then(res=>{
                                                    this.setState({ loading: false})
                                                }).catch(err => {
                                                    error.global = err;
                                                    this.setState({ loading: false, error });
                                                });
        }
    };

    onValidate = () => {
        const { contactNumber} = this.state;
        let error = {};
        // if (!password) error.password = "password can't be blank..";
        if (!contactNumber) error.phoneNumber = "phone number is not valid..";

        return error;
    };

    
    render() {
        const {name,address,contactNumber}=this.state
        return (
            <div className="user-form">
            <form onSubmit={this.onSubmit}>
                <input type="text" placeholder="Name" name="name" value={name} onChange={this.onChange}/>
                <input type="text" placeholder="Address" name="address" value={address} onChange={this.onChange}/>
                <input type="text" placeholder="Contact Number" name="contactNumber" value={contactNumber} onChange={this.onChange}/>
                <Button color={'green'} style={{width:"7rem"}}>Submit</Button>
            
            </form>
                
            </div>
        )
    }
}
