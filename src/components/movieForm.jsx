import React, { Component } from "react";
class MovieForm extends Component {
  state = { title: "", genre: "", rate: "", stock: "" };

  handleChange = (e) => {
    const name = e.target.name;
    console.log("changed!!", e.target);
    this.setState({ [name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted!", this.state);
  };
  render() {
    return (
      <form>
        <div className="form-group">
          <label> Title </label>
          <input
            autoFocus
            name="title"
            value={this.state.value}
            className="form-control"
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label> Genre </label>
          <select
            name="genre"
            value={this.state.genre}
            className="form-control"
            onChange={this.handleChange}
          >
            <option>--</option>
            <option>1</option>
            <option>2</option>
          </select>
        </div>
        <div className="form-group">
          <label> rate </label>
          <input
            name="rate"
            value={this.state.value}
            className="form-control"
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label> rate </label>
          <input
            name="stock"
            value={this.state.value}
            className="form-control"
            onChange={this.handleChange}
          />
        </div>
        <button className="btn btn-primary" onClick={this.handleSubmit}>
          Submit
        </button>
      </form>
    );
  }
}

export default MovieForm;
