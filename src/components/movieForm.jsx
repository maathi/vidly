import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class MovieForm extends Form {
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

  render() {
    return (
      <form className="container">
        {this.renderFormGroup("Title", "title")}
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
        {this.renderFormGroup("Rate", "rate")}
        {this.renderFormGroup("Stock", "stock")}
        {this.renderButton()}
      </form>
    );
  }
}

export default MovieForm;
