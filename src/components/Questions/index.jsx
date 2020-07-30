import React, { Component } from "react";
import { FaChevronRight } from "react-icons/fa";
import ProgressBar from "../../components/ProgressBar";
import { QuizQuestions } from "../../data/index";
import { toast } from "react-toastify";
import EndQuiz from "../Quiz/End";
toast.configure();
class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      levels: ["debutant", "confirme", "expert"],
      firstLevel: 0,
      maxQuestions: 10,
      storedQuestions: [],
      userAnswer: "",
      userScore: 0,
      question: "",
      options: [],
      idQuestion: 0,
      disabledSubmit: true,
      endQuiz: false,
    };
  }

  questionsWithAnswers = React.createRef();

  loadQuestions = (level) => {
    const allQuizz = QuizQuestions[0].quizz[level];
    if (allQuizz.length >= this.state.maxQuestions) {
      this.questionsWithAnswers.current = allQuizz;
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

  nextQuestion = () => {
    // First check the question number not greater than 10
    if (this.state.idQuestion === this.state.maxQuestions - 1) {
      this.setState({
        endQuiz: true,
      });
    } else {
      this.setState((prevState) => ({
        idQuestion: prevState.idQuestion + 1,
      }));
    }

    // Check the user selected answer and the question answer quizz
    if (
      this.questionsWithAnswers.current[this.state.idQuestion].answer ===
      this.state.userAnswer
    ) {
      this.setState((prevState) => ({
        userScore: prevState.userScore + 1,
        idQuestion: prevState.idQuestion + 1,
        disabledSubmit: true,
      }));
      // Alert Good Answer
      toast.success(`Bonne Réponse. +1`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      // Alert Bad Answer
      toast.error(`Mauvaise Réponse. +0`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
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
    if (this.state.idQuestion !== prevState.idQuestion) {
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion].question,
        options: this.state.storedQuestions[this.state.idQuestion].options,
      });
    }
  }

  render() {
    const {
      question,
      options,
      disabledSubmit,
      userAnswer,
      endQuiz,
    } = this.state;

    return endQuiz ? (
      <EndQuiz />
    ) : (
      <>
        <ProgressBar />
        <h2>{question}</h2>
        {options.map((option, index) => {
          return (
            <p
              key={index}
              onClick={() => this.selectedResponse(option)}
              className={`answerOptions ${
                userAnswer === option ? "selected" : null
              }`}
            >
              {option}
            </p>
          );
        })}
        <button
          disabled={disabledSubmit}
          onClick={this.nextQuestion}
          className="btnSubmit"
        >
          Suivant <FaChevronRight className="academy-quiz-icon" />
        </button>
      </>
    );
  }
}

export default Questions;
