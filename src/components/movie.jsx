import React, { Component } from "react";
import { getMovies } from "../moviesService";

import Pager from "./pager";
import Menu from "./genre";

class Movie extends Component {
  state = { movies: getMovies(), pageSize: 4 };

  componentDidMount() {
    this.props.setPageCount(
      Math.ceil(this.state.movies.length / this.state.pageSize)
    );
  }

  componentDidUpdate() {
    // console.log(this.state.movies.length, this.state.pageSize);
    // this.props.setPageCount(
    //   Math.ceil(this.state.movies.length / this.state.pageSize)
    // );
  }
  // toPage(n) {
  //   let m = this.moviesByPage(n);
  //   this.setState({
  //     moviesInPage: m,
  //     page: n,
  //   });
  // }

  getMovies() {
    //get all movies
    let movies = this.state.movies;
    //filter
    if (this.props.selectedGenre) {
      movies = movies.filter((m) => {
        return m.genre.id == this.props.selectedGenre.id;
      });
    }

    let start = (this.props.page - 1) * this.state.pageSize;
    return movies.slice(start, start + this.state.pageSize);
  }

  moviesByPage(n) {
    let start = (n - 1) * this.state.pageSize;
    return this.state.movies.slice(start, start + this.state.pageSize);
  }

  handleLike(id) {
    let movies = this.state.movies;
    movies.map((m) => {
      if (m.id == id) {
        if (m.liked != true) {
          m.liked = true;
        } else {
          m.liked = false;
        }
      }
    });

    this.setState({ movies });
  }

  handleDelete(movie) {
    let movies = this.state.movies.filter((m) => m.id != movie.id);

    this.setState(
      {
        movies: movies,
        numberOfMovies: this.state.numberOfMovies - 1,
      },
      () => {
        this.props.setPageCount(
          Math.ceil(this.state.movies.length / this.state.pageSize)
        );
      }
    );
  }

  filter(genre) {
    let movies = getMovies().filter((m) => {
      return m.genre.id == genre.id;
    });

    this.setState({
      movies: movies,
      // numberOfMovies: movies.length,
      // page: 1,
    });
  }
  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Genre</th>
            <th scope="col">Stock</th>
            <th scope="col">Rate</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.getMovies().map((movie) => {
            return (
              <tr key={movie.id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.stock}</td>
                <td>{movie.rate}</td>
                <td>
                  <button
                    onClick={() => {
                      this.handleLike(movie.id);
                    }}
                  >
                    {movie.liked === true ? 1 : 0}
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      this.handleDelete(movie);
                    }}
                  >
                    delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default Movie;
