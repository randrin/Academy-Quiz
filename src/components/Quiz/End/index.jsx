import React, { useEffect, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";

const EndQuiz = React.forwardRef(
  ({ userPercentage, userScore, maxQuestions, academyLevel, levels }, ref) => {
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
      setAnswers(ref.current);
    }, [ref]);

    const averageQuestions = maxQuestions / 2;
    const userResult =
      userScore > averageQuestions ? (
        <>
          <div className="stepsBtnContainer">
            <p className="successMsg">Bravo, vous avez passé le test !!!!</p>
            <button className="btnResult success">
              Passez au niveau {levels[academyLevel]}
            </button>
          </div>
          <div className="percentage">
            <div className="progressPercent">
              Pourcentage Reusite : {userPercentage}%
            </div>
            <div className="progressPercent">
              Votre score : {userScore}/{maxQuestions}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="stepsBtnContainer">
            <p className="failureMsg">Vous n'avez pas passé le test !!!</p>
            <button className="btnResult failure">
              Essayez de nouveau le test
            </button>
          </div>
          <div className="percentage">
            <div className="progressPercent">
              Pourcentage Reusite : {userPercentage}%
            </div>
            <div className="progressPercent">
              Votre score : {userScore}/{maxQuestions}
            </div>
          </div>
        </>
      );

    const responseQuiz = userScore > averageQuestions && (
      <>
        <hr className="academy-quiz-divider" />
        <p>Les questions posées pour ce niveau</p>
        <div className="answerContainer">
          <table className="answers">
            <thead>
              <tr>
                <th>Question</th>
                <th>Réponse</th>
                <th>Informations</th>
              </tr>
            </thead>
            <tbody>
              {answers.map((answer) => {
                return (
                  <tr key={answer.id}>
                    <td>{answer.question}</td>
                    <td>{answer.answer}</td>
                    <td>
                      <button className="btnInfo">
                        <FaInfoCircle className="academy-quiz-icon-right" />{" "}
                        Infos
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );

    return (
      <>
        {userResult}
        {responseQuiz}
      </>
    );
  }
);

export default React.memo(EndQuiz);
