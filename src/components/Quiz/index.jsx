import React from "react";

const Quiz = (props) => {
  return (
    <div className="quiz-bg">
      <div className="container">Pseudo: {props.userData.pseudo}</div>
    </div>
  );
};

export default Quiz;
