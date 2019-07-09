import React, { Component } from "react";
import "./css/Form.css";
import validator from "validator";
import { Spinner, Modal, ModalHeader, Button, ModalBody, ModalFooter } from "reactstrap";


class Login extends Component {
  state = {
    phoneNumber: "",
    password: "",
    error: {},
    loading: false
  };

  onChange = ev => this.setState({ [ev.target.name]: ev.target.value });

  onSubmit = ev => {
    ev.preventDefault();

    const { phoneNumber, password } = this.state;

    let error = {};
    error = this.onValidate();
    this.setState({ error });

    if (Object.keys(error).length === 0) {
      this.setState({ loading: true });
      this.props.login({phoneNumber, password }).then(user=>{
        this.setState({ loading: false})
        this.props.toggle();
      }).catch(err => {
        error.global = err.response.data.error;
        this.setState({ loading: false, error });
      });
    }
  };

  onValidate = () => {
    const { phoneNumber, password } = this.state;
    let error = {};
    if (!password) error.password = "password can't be blank..";
    if (!phoneNumber) error.phoneNumber = "phone number is not valid..";

    return error;
  };

  getView = () => {
    const { phoneNumber, password } = this.state;
    const closeBtn = <button className="close" onClick={this.props.toggle}>&times;</button>;

    return (
      <Modal isOpen={this.props.modal} centered={true} fade={true}  toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle} close={closeBtn}>Login</ModalHeader>
        <ModalBody>

          <form onSubmit={this.onSubmit} className="form">
            {this.state.error.global && (
              <div className="error">
                <label>{this.state.error.global}</label>
              </div>
            )}
            <input
              type="text"
              name="phoneNumber"
              value={phoneNumber}
              onChange={this.onChange}
              placeholder="phone number"
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
            <button className="btn">Login</button>
          </form>
          <label className="no-account">Don't have an account ?.. { this.props.children}</label>
        </ModalBody>
      </Modal>
    );
  };

  render() {
    return (
      <React.Fragment>
        {this.state.loading ? (
          <Spinner type="grow" className="spinner" />
        ) : (
            this.getView()
          )}
      </React.Fragment>
    );
  }
}

export default Login;
