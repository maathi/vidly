import React from "react";
import { getGenres } from "../genreService";

let Menu = (props) => {
  let genres = getGenres();
  let SelectedGenre = "foo";
  return (
    <ul className="list-group">
      {genres.map((genre) => {
        return (
          <a
            key={genre.id}
            href="#"
            onClick={() => {
              props.setSelectedGenre(genre);
            }}
          >
            <li
              className={
                genre.id == SelectedGenre.id
                  ? "list-group-item active"
                  : "list-group-item"
              }
            >
              {genre.name}
            </li>
          </a>
        );
      })}
    </ul>
  );
};

export default Menu;
