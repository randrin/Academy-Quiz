import React, { Component } from "react";
import Levels from "../Levels";
import ProgressBar from "../ProgressBar";
import Questions from "../Questions";

class Quiz extends Component {
  render() {
    const { pseudo } = this.props.userData;
    return (
      <>
        <div className="quiz-bg">
          <div className="container">Pseudo: {pseudo}</div>
        </div>
        <Levels />
        <ProgressBar />
        <Questions />
      </>
    );
  }
}

export default Quiz;
