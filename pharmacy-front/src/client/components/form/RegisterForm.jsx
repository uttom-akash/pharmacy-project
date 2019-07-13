import React, { Component } from "react";
import "./css/Form.css";
import validator from "validator";
import {connect} from 'react-redux'
import Modal from '../unitComp/modal  basic/Modal'

class RegisterForm extends Component {
  state = {
    FirstName: "",
    LastName: "",
    phoneNumber:"",
    password: "",
    confirmPassword: "",
    error: {},
    loading: false
  };

  onFileChange = ev => {
    const pro = ev.target.files[0];
    if (!pro) return;

    this.setState({ pictureName: pro.name });
    let reader = new FileReader();
    reader.onload = ev => {
      this.setState({ profilePicture: reader.result });
    };
    reader.readAsDataURL(pro);
  };


  onChange = ev => this.setState({ [ev.target.name]: ev.target.value });

  onSubmit = ev => {
    ev.preventDefault();
    const { 
      FirstName,
      LastName,
      phoneNumber,
      password} = this.state;
    
    let error = {};
    error = this.onValidate();
    this.setState({ error });

    if (Object.keys(error).length === 0) {
      this.setState({ loading: true });

      this.props
        .register({ FirstName,LastName,phoneNumber,password})
        .then(res=>{
          this.setState({ loading: false})
          this.props.toggle();
      })
        .catch(err => {
          error.global = "phone number is already in use ..";
          this.setState({ loading: false,error });
        });
    }
  };

  onValidate = () => {
    const { FirstName,LastName,phoneNumber,password,confirmPassword } = this.state;
    let error = {};
    if (!FirstName) error.FirstName = "first name can't be blank..";
    if (!LastName) error.LastName = "last name can't be blank..";
    if (!phoneNumber) error.phoneNumber = "phone number can't be blank..";
    if (!password) error.password = "password can't be blank..";
    if (password !== confirmPassword)
      error.confirmPassword = "password doesn't match";
    // if (!validator.isEmail(userEmail)) error.userEmail = "email is not valid..";

    return error;
  };

  getView = () => {
    const {
      FirstName,
      LastName,
      phoneNumber,
      password,
      confirmPassword
    } = this.state;

    return (

      <Modal modal={this.props.modal} basic={false} onToggle={this.props.toggle}>
          <form onSubmit={this.onSubmit} className="form">
            {/* {!!this.state.profilePicture ? (
              <img src={profilePicture} alt="user-pro-pic" className="pro-pic" />
            ) : (
                <i className="fas fa-user" id="pro-icon" />
              )}
            <input
              type="file"
              name="pro-pic"
              onChange={this.onFileChange}
              className="pro-file"
              id="pic"
              style={{ width: "0px", height: "0px", opacity: "0" }}
            />
            <label htmlFor="pic" className="file-chooser">
              <i className="far fa-image" />
              <p>{pictureName}</p>
            </label> */}

            <input
              type="text"
              name="FirstName"
              value={FirstName}
              onChange={this.onChange}
              placeholder="First Name"
              className={`${!!this.state.error.FirstName}`}
            />

            <input
              type="text"
              name="LastName"
              value={LastName}
              onChange={this.onChange}
              placeholder="Last Name"
              className={`${!!this.state.error.LastName}`}
            />

            <input
              type="text"
              name="phoneNumber"
              value={phoneNumber}
              onChange={this.onChange}
              placeholder="phone Number"
              className={`${!!this.state.error.phoneNumber}`}
            />
            

            <input
              type="password"
              name="password"
              value={password}
              onChange={this.onChange}
              placeholder="password"
              className={`${!!this.state.error.password}`}
            />
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={this.onChange}
              placeholder="confirm password"
              className={`${!!this.state.error.confirmPassword}`}
            />
            <button className="btn">Register</button>

            {this.state.error.global && (
              <div className="error">
                <label>{this.state.error.global}</label>
              </div>

            )}
          </form>
      </Modal>


    );
  };

  render() {
    return (
      <React.Fragment>
          {this.getView()}
      </React.Fragment>
    );
  }
}

export default RegisterForm;
