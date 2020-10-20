import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class Register extends Form {
  state = {
    data: { username: null, email: null, password: null },
    errors: { username: null, email: null, password: null },
  };

  schema = {
    username: Joi.string().required().label("Username"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(5).required().label("Password"),
  };

  render() {
    return (
      <form className="container">
        {this.renderFormGroup("Username", "username")}
        {this.renderFormGroup("Email", "email")}
        {this.renderFormGroup("Password", "password")}
        {this.renderButton()}
      </form>
    );
  }
}

export default Register;
