import React, { Component } from "react";
import "./css/Form.css";
import validator from "validator";
import Modal from '../unitComp/modal  basic/Modal' 

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
      <Modal modal={this.props.modal}  basic={false} onToggle={this.props.toggle}>
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
      </Modal>
    );
  };

  render() {
    return (
      <React.Fragment>
        {   this.getView()}
      </React.Fragment>
    );
  }
}

export default Login;
