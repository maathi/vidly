import React from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./components/home";
import Navbar from "./components/navbar";
import NotFound from "./components/not-found";
import Movie from "./components/movie";
import MovieForm from "./components/movieForm";
import Register from "./components/register";

function App() {
  return (
    <div className="container-fluid">
      <Navbar></Navbar>
      <Switch>
        <Route path="/home">
          <Home></Home>
        </Route>
        <Route path="/contact">
          <h2>contact</h2>
        </Route>
        <Route path="/out">
          <h2>out</h2>
        </Route>
        <Route path="/not-found">
          <h2>not found</h2>
        </Route>
        <Route path="/movies/new">
          <MovieForm></MovieForm>
        </Route>
        <Route path="/movies/:id" component={Movie}></Route>
        <Route path="/register">
          <Register></Register>
        </Route>
        <Redirect exact from="/" to="/home"></Redirect>
        <Redirect to="not-found"></Redirect>
      </Switch>
    </div>
  );
}

export default App;
