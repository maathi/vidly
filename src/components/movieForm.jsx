import React, { Component } from "react";
import Joi from "joi-browser";

class MovieForm extends Component {
  state = {
    data: { title: "", genre: "", rate: "", stock: "" },
    errors: { title: null, genre: "", rate: "", stock: "" },
  };

  schema = {
    title: Joi.string().required(),
    genre: Joi.string().required(),
    rate: Joi.number().min(0).max(10).required(),
    stock: Joi.number().min(0).max(100).required(),
  };

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
  render() {
    return (
      <form className="container">
        <div className="form-group">
          <label> Title </label>
          <input
            autoFocus
            name="title"
            value={this.state.value}
            className="form-control"
            onChange={this.handleChange}
            onBlur={this.validate}
          />
          {this.state.errors["title"] && (
            <div className="alert alert-danger">
              {this.state.errors["title"]}
            </div>
          )}
        </div>
        <div className="form-group">
          <label> Genre </label>
          <select
            name="genre"
            className="form-control"
            value={this.state.genre}
            onChange={this.handleChange}
            onBlur={this.validate}
          >
            <option>--</option>
            <option>1</option>
            <option>2</option>
          </select>
          {this.state.errors["genre"] && (
            <div className="alert alert-danger">
              {this.state.errors["genre"]}
            </div>
          )}
        </div>
        <div className="form-group">
          <label> rate </label>
          <input
            name="rate"
            className="form-control"
            value={this.state.value}
            onChange={this.handleChange}
            onBlur={this.validate}
          />
          {this.state.errors["rate"] && (
            <div className="alert alert-danger">
              {this.state.errors["rate"]}
            </div>
          )}
        </div>
        <div className="form-group">
          <label> stock </label>
          <input
            name="stock"
            className="form-control"
            value={this.state.value}
            onChange={this.handleChange}
            onBlur={this.validate}
          />
          {this.state.errors["stock"] && (
            <div className="alert alert-danger">
              {this.state.errors["stock"]}
            </div>
          )}
        </div>
        <button
          className="btn btn-primary"
          disabled={this.validateAll()}
          onClick={this.handleSubmit}
        >
          Submit
        </button>
      </form>
    );
  }
}

export default MovieForm;
