import React from "react";
import NavBar from "../NavBar";
import Quiz from "../Quiz";

const Welcome = () => {
  return (
    <div className="quiz-bg">
      <div className="container">
        <NavBar />
        <Quiz />
      </div>
    </div>
  );
};

export default Welcome;
