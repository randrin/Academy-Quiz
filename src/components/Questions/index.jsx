import React, { Component } from "react";
import { FaChevronRight } from "react-icons/fa";
import ProgressBar from "../../components/ProgressBar";
import { QuizQuestions } from "../../data/index";
import Levels from "../../components/Levels";
import { toast } from "react-toastify";
import EndQuiz from "../Quiz/End";
toast.configure();
class Questions extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      levels: ["debutant", "confirme", "expert"],
      academyLevel: 0,
      maxQuestions: 10,
      storedQuestions: [],
      userAnswer: "",
      userScore: 0,
      userPercentage: 0,
      question: "",
      options: [],
      idQuestion: 0,
      disabledSubmit: true,
      endQuiz: false,
    };

    this.state = this.initialState;
    this.questionsWithAnswers = React.createRef();
  }

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
      this.goToEndQuiz();
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
        //idQuestion: prevState.idQuestion + 1,
        disabledSubmit: true,
      }));
      // Alert Good Answer
      toast.success(`Bonne Réponse. +1 Point`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      this.setState((prevState) => ({
        disabledSubmit: true,
      }));
      // Alert Bad Answer
      toast.error(`Mauvaise Réponse. +0 Point`, {
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

  goToEndQuiz = () => {
    this.setState({
      endQuiz: true,
    });
  };

  goToEndResult = () => {
    const userPercentage =
      (this.state.userScore / this.state.maxQuestions) * 100;
    if (userPercentage > 50) {
      this.setState({
        academyLevel: this.state.academyLevel + 1,
        endQuiz: true,
        userPercentage: userPercentage,
      });
    } else {
      this.setState({
        endQuiz: true,
        userPercentage: userPercentage,
      });
    }
  };

  loadLevelQuestions = (level) => {
    this.setState({ ...this.initialState, academyLevel: level });
    this.loadQuestions(this.state.levels[level]);
  };

  componentDidMount() {
    this.loadQuestions(this.state.levels[this.state.academyLevel]);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.storedQuestions !== prevState.storedQuestions &&
      this.state.storedQuestions.length
    ) {
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion].question,
        options: this.state.storedQuestions[this.state.idQuestion].options,
      });
    }
    if (
      this.state.idQuestion !== prevState.idQuestion &&
      this.state.storedQuestions.length
    ) {
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion].question,
        options: this.state.storedQuestions[this.state.idQuestion].options,
      });
    }

    if (this.state.endQuiz !== prevState.endQuiz) {
      this.goToEndResult();
    }
  }

  render() {
    const {
      levels,
      academyLevel,
      question,
      options,
      disabledSubmit,
      userAnswer,
      endQuiz,
      idQuestion,
      maxQuestions,
      userPercentage,
      userScore,
    } = this.state;

    return endQuiz ? (
      <>
        <Levels levels={levels} academyLevel={academyLevel} />
        <EndQuiz
          ref={this.questionsWithAnswers}
          userPercentage={userPercentage}
          userScore={userScore}
          maxQuestions={maxQuestions}
          academyLevel={academyLevel}
          levels={levels}
          loadLevelQuestion={() => this.loadLevelQuestions(academyLevel)}
        />
      </>
    ) : (
      <>
        <Levels levels={levels} academyLevel={academyLevel} />
        <ProgressBar idQuestion={idQuestion} maxQuestions={maxQuestions} />
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
          {idQuestion === maxQuestions - 1 ? "Terminer" : "Suivant"}
          <FaChevronRight className="academy-quiz-icon-left" />
        </button>
      </>
    );
  }
}

export default Questions;
