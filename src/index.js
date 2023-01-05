import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Context from "./store/firebaseContext";
import { FirebaseContext } from "./store/firebaseContext";
import { BrowserRouter as Router } from "react-router-dom";
import firebase from "./config/firebase";
ReactDOM.render(
  <FirebaseContext.Provider value={{ firebase }}>
    <Context>
      <App />
    </Context>
  </FirebaseContext.Provider>,
  document.getElementById("root")
);
