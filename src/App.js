// import React, { Component } from "react";
import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTutorial from "./components/add-tutorial-rdk.component";
import Tutorial from "./components/tutorial-rdk.component";
import TutorialsList from "./components/tutorials-list-rdk.component";

import { useDispatch } from 'react-redux';
import {
  setCurrentTutorial,
  setSubmitted,
  setMessage,
} from './redux/storeSlice';

const App = () => {
  const dispatch = useDispatch();

  const initializeCurrentTutorial = () => {
    dispatch(setCurrentTutorial({
      id: null,
      title: "",
      description: "",
      published: false
    }));
    dispatch(setSubmitted(false));
    dispatch(setMessage(''));
  }

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/tutorials" className="navbar-brand">
          sphelps
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/tutorials"} className="nav-link">
              Tutorials
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link" onClick={() => initializeCurrentTutorial()}>
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/tutorials"]} component={TutorialsList} />
          <Route exact path="/add" component={AddTutorial} />
          <Route path="/tutorials/:id" component={Tutorial} />
        </Switch>
      </div>
    </div>
  );
}

export default App;