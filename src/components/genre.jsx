
import { extend } from "lodash";
import React, { Component } from "react";
import { getGenres } from "../genreService";


class Menu extends Component{
  state = {
    genres: [],
    SelectedGenre: "foo"
  }
  async componentDidMount(){
    let res = await getGenres();
    this.setState({genres: res.data.data.genres})
  }

  render(){
    return(    <ul className="list-group">
    {this.state.genres.map((genre) => {
      return (
        <a
          key={genre.id}
          href="#"
          onClick={() => {
            this.props.setSelectedGenre(genre);
          }}
        >
          <li
            className={
              genre.id == this.props.SelectedGenre?.id
                ? "list-group-item active"
                : "list-group-item"
            }
          >
            {genre.name}
          </li>
        </a>
      );
    })}
  </ul>)
  }
}

export default Menu;
