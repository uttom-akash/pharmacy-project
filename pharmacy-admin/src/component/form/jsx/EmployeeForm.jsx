import React, { Component } from 'react'
import {Button} from 'semantic-ui-react'
import FileInput from '../../comp/form/FileInput'
import '../css/UserForm.css'

export default class EmployeeForm extends Component {

    state={
        firstName:"",
        lastName:"",
        salary:0,
        nid:"",
        address:"",
        contactNumber:"",
        RefName:"",
        RefNumber:"",
        profilePicture:null,
        pictureName:"",
    }

    onChange = ev => this.setState({ [ev.target.name]: ev.target.value });

    onfileChange=({profilePicture,pictureName})=>this.setState({profilePicture,pictureName})

    onSubmit = ev => {
        ev.preventDefault();

        console.log("akash");
        

        let error = {};
        error = this.onValidate();
        this.setState({ error });

        if (Object.keys(error).length === 0) {
                this.setState({ loading: true });


                this.props.onSubmit(this.state).then(user=>{
                                    this.setState({ loading: false})
                                    this.props.toggle();
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
        const {firstName,lastName,address,contactNumber,salary,nid,RefName,RefNumber}=this.state
        return (
            <div className="user-form">
            <form onSubmit={this.onSubmit}>
                <FileInput onfileChange={this.onfileChange}/>
                <input type="text" placeholder="First Name" name="firstName" value={firstName} onChange={this.onChange}/>
                <input type="text" placeholder="Last Name" name="lastName" value={lastName} onChange={this.onChange}/>
                <input type="text" placeholder="Address" name="address" value={address} onChange={this.onChange}/>
                <input type="text" placeholder="Contact Number" name="contactNumber" value={contactNumber} onChange={this.onChange}/>
                
                <input type="number" placeholder="Salary" name="salary" value={salary} onChange={this.onChange}/>
                <input type="text" placeholder="NID" name="nid" value={nid} onChange={this.onChange}/>

                <input type="text" placeholder="Referer Name" name="RefName" value={RefName} onChange={this.onChange}/>
                <input type="text" placeholder="Referer Number" name="RefNumber" value={RefNumber} onChange={this.onChange}/>
                
                <Button color={'green'} style={{width:"7rem"}}>Submit</Button>
            
            </form>
                
            </div>
        )
    }
}
