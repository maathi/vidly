import React from "react";
const Movie = ({ match, history }) => {
  return (
    <div>
      <h1>movie : {match.params.id}</h1>
      <button
        className="btn btn-success"
        onClick={() => {
          history.replace("/");
        }}
      >
        save
      </button>
    </div>
  );
};

export default Movie;
