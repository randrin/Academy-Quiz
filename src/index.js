import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.min.css";
import Index from "./components/App";
import Firebase, { AcademyContext } from "./components/Firebase";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AcademyContext.Provider value={new Firebase()}>
        <Index />
      </AcademyContext.Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
