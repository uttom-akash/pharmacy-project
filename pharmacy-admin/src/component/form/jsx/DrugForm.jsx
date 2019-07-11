import React, { Component } from 'react'
import {Button} from 'semantic-ui-react'
import FileInput from '../../comp/form/FileInput'
import '../css/UserForm.css'

export default class DrugForm extends Component {

    state={
        drugName:"",
        brandName:"",
        manufecturerName:"",
        brand:"",
        DAR:"",
        price:0,
        image_src:""
    }

    onChange = ev => this.setState({ [ev.target.name]: ev.target.value });

    onfileChange=({profilePicture,pictureName})=>this.setState({profilePicture,pictureName})

    onSubmit = ev => {
        ev.preventDefault();

        

        let error = {};
        error = this.onValidate();
        this.setState({ error });

        if (Object.keys(error).length === 0) {
                this.setState({ loading: true });


                this.props.onSubmit(this.state).then(user=>{
                                                this.setState({ loading: false})
                                                this.props.toggle();
                                            }).catch(err => {
                                                error.global = err.response.data.error;
                                                this.setState({ loading: false, error });
                                            });
            }
    };

    onValidate = () => {
        const { contactNumber, password } = this.state;
        let error = {};
        if (!password) error.password = "password can't be blank..";
        if (!contactNumber) error.phoneNumber = "phone number is not valid..";

        return error;
    };

    
    render() {
        const {drugName,brandName,brand,manufecturerName,DAR,price,image_src}=this.state
        return (
            <div className="user-form">
            <form onSubmit={this.onSubmit}>
                {/* <FileInput onfileChange={this.onfileChange}/> */}
                <input type="text" placeholder="Drug Name" name="drugName" value={drugName} onChange={this.onChange}/>
                <input type="text" placeholder="Brand Name" name="brandName" value={brandName} onChange={this.onChange}/>
                <input type="text" placeholder="Brand" name="brand" value={brand} onChange={this.onChange}/>
                <input type="text" placeholder="Manufecturer Name" name="manufecturerName" value={manufecturerName} onChange={this.onChange}/>
                <input type="password" placeholder="DAR" name="DAR" value={DAR} onChange={this.onChange}/>
                <input type="password" placeholder="price" name="price" value={price} onChange={this.onChange}/>
                <input type="text" placeholder="Image Url" name="image_src" value={image_src} onChange={this.onChange}/>
                
                <Button color={'green'} style={{width:"7rem"}}>Submit</Button>
            
            </form>
                
            </div>
        )
    }
}
