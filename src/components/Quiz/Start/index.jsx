import React, { Component } from "react";
import Questions from "../../Questions";

class StartQuiz extends Component {
  render() {
    const { pseudo } = this.props.userData;
    return (
      <>
        <div className="quiz-bg">
          <div className="container">Pseudo: {pseudo}</div>
        </div>
        <Questions />
      </>
    );
  }
}

export default StartQuiz;
