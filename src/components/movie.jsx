import React, { Component } from "react";
import { getMovies } from "../moviesService";
import { getGenres } from "../genreService";

import Pager from "./pager";

class Movie extends Component {
  state = {
    movies: getMovies(),
    numberOfMovies: null,
    page: 1,
    moviesInPage: null,
    pageSize: 4,
  };

  constructor() {
    super();
    console.log(getGenres());
    this.state.moviesInPage = this.moviesByPage(1);
    this.state.numberOfMovies = this.state.movies.length;
  }

  handleDelete(movie) {
    let movies = this.state.movies.filter((m) => m.id != movie.id);

    this.setState(
      {
        movies: movies,
        numberOfMovies: this.state.numberOfMovies - 1,
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
    let start = (n - 1) * this.state.pageSize;
    return this.state.movies.slice(start, start + this.state.pageSize);
  }

  toPage(n) {
    let m = this.moviesByPage(n);
    this.setState({
      moviesInPage: m,
      page: n,
    });
  }

  showMovies() {
    let { length: count } = this.state.movies;
    return count === 0 ? (
      <p>no movies to show</p>
    ) : (
      <div className="row">
        <div className="col-3">
          <ul class="list-group">
            <li class="list-group-item">Cras justo odio</li>
            <li class="list-group-item">Dapibus ac facilisis in</li>
            <li class="list-group-item">Morbi leo risus</li>
            <li class="list-group-item">Porta ac consectetur ac</li>
            <li class="list-group-item">Vestibulum at eros</li>
          </ul>
        </div>
        <div className="col-9">
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
            numberOfMovies={this.state.numberOfMovies}
            pageSize={this.state.pageSize}
            page={this.state.page}
            onPageClick={(n) => {
              this.toPage(n);
            }}
          ></Pager>
        </div>
      </div>
    );
  }

  render() {
    return this.showMovies();
  }
}

export default Movie;
