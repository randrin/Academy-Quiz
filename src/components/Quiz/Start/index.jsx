import React, { Component } from "react";
import Levels from "../../Levels";
import Questions from "../../Questions";

class StartQuiz extends Component {
  render() {
    const { pseudo } = this.props.userData;
    return (
      <>
        <div className="quiz-bg">
          <div className="container">Pseudo: {pseudo}</div>
        </div>
        <Levels />
        <Questions />
      </>
    );
  }
}

export default StartQuiz;
