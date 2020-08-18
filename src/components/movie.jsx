import React, { Component } from "react";
import { getMovies } from "../moviesService";
import Pager from "./pager";

class Movie extends Component {
  state = {
    movies: getMovies(),
    page: 1,
    moviesInPage: null,
    moviesNumberInPage: 4,
  };

  constructor() {
    super();
    this.state.moviesInPage = this.moviesByPage(1);
  }

  handleDelete(movie) {
    let movies = this.state.movies.filter((m) => m.id != movie.id);

    this.setState(
      {
        movies: movies,
      },
      () => {
        this.toPage(this.state.page);
      }
    );
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

  moviesByPage(n) {
    let start = (n - 1) * this.state.moviesNumberInPage;
    return this.state.movies.slice(
      start,
      start + this.state.moviesNumberInPage
    );
  }

  toPage(n) {
    let m = this.moviesByPage(n);
    this.setState({ moviesInPage: m, page: n });
  }

  showMovies() {
    let { length: count } = this.state.movies;
    return count === 0 ? (
      <p>no movies to show</p>
    ) : (
      <div>
        <p>showing {count} movies in the database</p>
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
            {this.state.moviesInPage.map((movie) => {
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
        <Pager
          onPageClick={(n) => {
            this.toPage(n);
          }}
        ></Pager>
      </div>
    );
  }

  render() {
    return this.showMovies();
  }
}

export default Movie;
