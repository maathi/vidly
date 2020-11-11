import React, { Component } from "react";
import { getMovies } from "../moviesService";
import _ from "lodash";
import axios from "axios"
import { Link } from "react-router-dom";
class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    sortColumn: { path: "title", ord: "desc" },
  };


  async componentDidMount() {
    let res = await getMovies();
    this.setState({movies: res.data.data.movies})
    this.onSort("title");
  }

  onSort(path) {
    if (path === this.state.sortColumn.path)
      var ord = this.state.sortColumn.ord === "asc" ? "desc" : "asc";
    else var ord = "asc";

    let movies = _.orderBy(this.state.movies, [path], [ord]);
    this.setState({
      movies: movies,
      sortColumn: { path, ord },
    });
  }

  getMovies() {
    //get all movies
    let movies = this.state.movies;
    //filter

    if (this.props.selectedGenre) {
      movies = movies.filter((m) => {
        return m.genre.id === this.props.selectedGenre.id;
      });
    }

    let start = (this.props.page - 1) * this.state.pageSize;
    return movies.slice(start, start + this.state.pageSize);
  }

  handleLike(id) {
    let movies = this.state.movies;
    movies.map((m) => {
      if (m.id === id) {
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

  renderSortIcon(path) {
    if (path != this.state.sortColumn.path) return null;
    if (this.state.sortColumn.ord === "asc") return "+";
    return "-";
  }
  render() {
    return (
      <div>
        <Link to={"/movies/new"}>
          {" "}
          <button className="btn btn-success">Add</button>
        </Link>
        <table className="table">
          <thead>
            <tr className="clickable">
              <th
                onClick={() => {
                  this.onSort("title");
                }}
                scope="col"
              >
                Title {this.renderSortIcon("title")}
              </th>
              <th
                onClick={() => {
                  this.onSort("genre.name");
                }}
                scope="col"
              >
                Genre {this.renderSortIcon("genre.name")}
              </th>
              <th
                onClick={() => {
                  this.onSort("stock");
                }}
                scope="col"
              >
                Stock {this.renderSortIcon("stock")}
              </th>
              <th
                onClick={() => {
                  this.onSort("rate");
                }}
                scope="col"
              >
                Rate {this.renderSortIcon("rate")}
              </th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.getMovies().map((movie) => {
              return (
                <tr key={movie.id}>
                  <td>
                    <Link to={"movies/" + movie.id}>{movie.title}</Link>
                  </td>
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
      </div>
    );
  }
}

export default Movies;
