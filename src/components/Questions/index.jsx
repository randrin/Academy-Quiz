import React, { Component } from "react";
import { FaChevronRight } from "react-icons/fa";
import { QuizQuestions } from "../../data/index";
class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      levels: ["debutant", "confirme", "expert"],
      firstLevel: 0,
      maxQuestions: 10,
      storedQuestions: [],
      userAnswer: "",
      question: "",
      options: [],
      idQuestion: 0,
      disabledSubmit: true,
    };
  }

  loadQuestions = (level) => {
    const allQuizz = QuizQuestions[0].quizz[level];
    if (allQuizz.length >= this.state.maxQuestions) {
      const questionsWithoutAnswers = allQuizz.map(
        ({ answer, ...questions }) => questions
      );
      this.setState({
        storedQuestions: questionsWithoutAnswers,
      });
    } else {
      console.log(
        "Pas assez de question pour ce niveau. Veillez patienter ...."
      );
    }
  };

  selectedResponse = (selected) => {
    this.setState({
      userAnswer: selected,
      disabledSubmit: false,
    });
  };

  componentDidMount() {
    this.loadQuestions(this.state.levels[this.state.firstLevel]);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.storedQuestions !== prevState.storedQuestions) {
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion].question,
        options: this.state.storedQuestions[this.state.idQuestion].options,
      });
    }
  }

  render() {
    const { question, options, disabledSubmit, userAnswer } = this.state;
    return (
      <div>
        <h2>{question}</h2>
        {options.map((option, index) => {
          return (
            <p
              key={index}
              onClick={() => this.selectedResponse(option)}
              className={`answerOptions ${userAnswer === option ? 'selected' : null}`}
            >
              {option}
            </p>
          );
        })}
        <button disabled={disabledSubmit} className="btnSubmit">
          Suivant <FaChevronRight className="academy-quiz-icon" />
        </button>
      </div>
    );
  }
}

export default Questions;
