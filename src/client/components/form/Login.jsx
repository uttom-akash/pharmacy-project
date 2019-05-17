import React, { Component } from "react";
import "./css/Form.css";
import validator from "validator";

import { Spinner, Modal, ModalHeader, Button, ModalBody, ModalFooter } from "reactstrap";


class Login extends Component {
  state = {
    userEmail: "",
    password: "",
    error: {},
    loading: false
  };

  onChange = ev => this.setState({ [ev.target.name]: ev.target.value });

  onSubmit = ev => {
    ev.preventDefault();
    const { userEmail, password } = this.state;

    let error = {};
    error = this.onValidate();
    this.setState({ error });
    if (Object.keys(error).length === 0) {
      this.setState({ loading: true });
      this.props.onLogin({ userEmail, password }).catch(err => {
        error.global = err.response.data.error;
        this.setState({ loading: false, error });
      });
    }
  };

  onValidate = () => {
    const { userEmail, password } = this.state;
    let error = {};
    if (!password) error.password = "password can't be blank..";
    if (!validator.isEmail(userEmail)) error.userEmail = "email is not valid..";

    return error;
  };

  getView = () => {
    const { userEmail, password } = this.state;
    const closeBtn = <button className="close" onClick={this.props.toggle}>&times;</button>;

    return (
      <Modal isOpen={this.props.modal} centered={true} fade={true} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle} close={closeBtn}>Login</ModalHeader>
        <ModalBody>

          <form onSubmit={this.onSubmit} className="form">
            {this.state.error.global && (
              <div className="error">
                <label>{this.state.error.global}</label>
              </div>
            )}
            <input
              type="email"
              name="userEmail"
              value={userEmail}
              onChange={this.onChange}
              placeholder="email"
              className={`${!!this.state.error.userEmail}`}
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
          { this.props.children}
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
