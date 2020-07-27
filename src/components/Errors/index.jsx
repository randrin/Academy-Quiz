import React from "react";
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
        <h2 style={errorMessage}>Error Page</h2>
        <img src={ErrorImage} style={errorImage} alt="Error Page" />
      </div>
    </div>
  );
};

export default ErrorPage;
