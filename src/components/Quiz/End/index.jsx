import React, { useEffect, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import Modal from "../../Modal";
import axios from "axios";

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
    const [infosModal, setInfosModal] = useState(null);
    const [loadingInfos, setLoadingInfos] = useState(false);

    useEffect(() => {
      setAnswers(ref.current);
    }, [ref]);

    const averageQuestions = maxQuestions / 2;
    const API_KEY = process.env.REACT_APP_MARVEL_PUBLIC_KEY;
    const hash = "ab7cc8d1a65a1292bc14a68c26f7e9b3";

    const showInfo = (id) => {
      axios
        .get(
          `https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${API_KEY}&hash=${hash}`
        )
        .then((response) => {
          setOpenModal(true);
          setInfosModal(response.data.data);
          setLoadingInfos(true);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const closeModal = () => {
      setOpenModal(false);
      setLoadingInfos(false);
    };

    const modalInformations = loadingInfos ? (
      <>
        <div className="modalHeader">
          <h2>{infosModal.results[0].name}</h2>
        </div>
        <div className="modalBody">
          <h3>{infosModal.results[0].description}</h3>
        </div>
        <div className="modalFooter">
          <button className="modalBtn">Fermer</button>
        </div>
      </>
    ) : (
      <>
        <div className="modalHeader">
          <h2>Retrieving Informations Question</h2>
        </div>
        <div className="modalBody">
          <div className="loader"></div>
          <p className="loaderText">Loading ...</p>
        </div>
      </>
    );

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
            {modalInformations}
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
