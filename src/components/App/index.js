import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "../Header";
import Home from "../Home";
import Footer from "../Footer";
import Welcome from "../Welcome";
import Login from "../Auth/Login";
import SignUp from "../Auth/SignUp";
import ErrorPage from "../Errors";
import ForgotPassword from "../Auth/ForgotPassword";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/welcome" component={Welcome} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
        <Route component={ErrorPage} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
