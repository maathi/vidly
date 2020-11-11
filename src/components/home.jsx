import React, { Component } from "react";
import Pager from "./pager";
import Menu from "./genre";
import Movies from "./movies";

class Home extends Component {
  state = {
    page: 1,
    pageCount: null,
    selectedGenre: null,
  };

  constructor() {
    super();
    // this.state.numberOfMovies = this.state.movies.length;
  }

  setPageCount(n) {
    this.setState({
      pageCount: n,
    });
  }

  setSelectedGenre(genre) {
    this.setState({
      selectedGenre: genre,
    });
  }

  onPageChange(n) {
    console.log("on page change");
    this.setState({
      page: n,
    });
  }

  showMovies() {
    return (
      <div className="row">
        <div className="col-3">
          <Menu
            SelectedGenre={this.state.selectedGenre}
            // filter={(genre) => {
            //   this.filter(genre);
            // }}
            setSelectedGenre={(genre) => {
              this.setSelectedGenre(genre);
            }}
          ></Menu>
        </div>
        <div className="col-9">
          {/* <p>showing {count} movies in the database</p> */}
          <Movies
            page={this.state.page}
            setPageCount={(n) => {
              this.setPageCount(n);
            }}
            selectedGenre={this.state.selectedGenre}
          ></Movies>
          <Pager
            page={this.state.page}
            pageCount={this.state.pageCount}
            onPageClick={(n) => {
              this.onPageChange(n);
            }}
          ></Pager>
        </div>
      </div>
    );
    // );
  }

  render() {
    return this.showMovies();
  }
}

export default Home;
