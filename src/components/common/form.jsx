import React, { Component } from "react";
import Joi from "joi-browser";

class Form extends Component {
  state = { data: {}, errors: {} };

  validate = (e) => {
    const name = e.target.name;
    let errors = { ...this.state.errors };

    const { error } = Joi.validate(
      { [name]: this.state.data[name] },
      { [name]: this.schema[name] }
    );

    errors[name] = error ? error.details[0].message : null;
    this.setState({ errors: errors });
  };

  handleChange = (e) => {
    const name = e.target.name;

    let data = { ...this.state.data };
    data[name] = e.target.value;
    this.setState({ data });
  };

  validateAll = () => {
    const { error } = Joi.validate(this.state.data, this.schema);
    return error;
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.validateAll();
  };

  renderFormGroup = (label, name) => {
    return (
      <div className="form-group">
        <label>{label}</label>
        <input
          className="form-control"
          name={name}
          value={this.state.value}
          onChange={this.handleChange}
          onBlur={this.validate}
        />
        {this.state.errors[name] && (
          <div className="alert alert-danger">{this.state.errors[name]}</div>
        )}
      </div>
    );
  };

  renderButton = () => {
    return (
      <button
        className="btn btn-primary"
        disabled={this.validateAll()}
        onClick={this.handleSubmit}
      >
        Submit
      </button>
    );
  };
}

export default Form;
