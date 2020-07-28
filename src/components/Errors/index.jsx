import React from "react";
import { Link } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa"
import ErrorImage from "../../images/batman.png";

const ErrorPage = () => {
  const errorMessage = {
    textAlign: "center",
    marginTop: "50px",
  };
  const errorImage = {
    display: "block",
    margin: "50px auto",
  };
  return (
    <div className="quiz-bg">
      <div className="container">
        <h2 style={errorMessage}>404 Error Page</h2>
        <img src={ErrorImage} style={errorImage} alt="Error Page" />
        <Link to="/" class="btn-redirection">
          <FaAngleLeft className="btn-icon" />Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
