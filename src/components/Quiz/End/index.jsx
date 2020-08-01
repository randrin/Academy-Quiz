import React, { useEffect, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import Modal from "../../Modal";

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
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
      setAnswers(ref.current);
    }, [ref]);

    const showInfo = (id) => {
      console.log("showInfo: ", id);
      setOpenModal(true);
    };

    const closeModal = () => {
      setOpenModal(false);
    };

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
                <th>Questions</th>
                <th>Réponses</th>
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
                          <button
                            className="btnInfo"
                            onClick={() => showInfo(answer.heroId)}
                          >
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
          <Modal openModal={openModal} closeModal={closeModal}>
            <div className="modalHeader">
              <h2>Title</h2>
            </div>
            <div className="modalBody">
              <h3>Description</h3>
            </div>
            <div className="modalFooter">
              <button className="modalBtn">Fermer</button>
            </div>
          </Modal>
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
