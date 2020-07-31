import React, { useEffect, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";

const EndQuiz = React.forwardRef(
  (
    {
      userPercentage,
      userScore,
      maxQuestions,
      academyLevel,
      levels,
      loadLevelQuestion,
    },
    ref
  ) => {
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
      setAnswers(ref.current);
    }, [ref]);

    const averageQuestions = maxQuestions / 2;
    const userResult =
      userScore > averageQuestions ? (
        <>
          {academyLevel < levels.length ? (
            <>
              <div className="stepsBtnContainer">
                <p className="successMsg">
                  Bravo, vous avez passé le test !!!!
                </p>
                <button
                  className="btnResult success"
                  onClick={() => loadLevelQuestion(academyLevel)}
                >
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
                <p className="successMsg">Bravo, vous etes un expert !!</p>
                <button
                  className="btnResult gameOver"
                  onClick={() => loadLevelQuestion(0)}
                >
                  Acceuil
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
          )}
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

    const responseQuiz = (
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
              {userScore > averageQuestions ? (
                <>
                  {answers.map((answer) => {
                    return (
                      <tr key={answer.id}>
                        <td>{answer.question}</td>
                        <td>{answer.answer}</td>
                        <td>
                          <button className="btnInfo">
                            <FaInfoCircle className="academy-quiz-icon-right" />
                            Infos
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </>
              ) : (
                <>
                  <tr>
                    <td colSpan="3">
                      <div className="loader"></div>
                      <p className="academy-quiz-no-response">
                        Vous allez être redirigé sur le quiz dans 5s.
                      </p>
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </>
    );

    if (userScore < averageQuestions) {
      setTimeout(() => {
        loadLevelQuestion(academyLevel);
      }, 3000);
    }

    return (
      <>
        {userResult}
        {responseQuiz}
      </>
    );
  }
);

export default React.memo(EndQuiz);
