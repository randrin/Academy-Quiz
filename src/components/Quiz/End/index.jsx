import React, { useEffect, useState } from "react";
import { FaInfoCircle, FaRegTimesCircle } from "react-icons/fa";
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
      if (localStorage.getItem("storageApiDate")) {
        const date = localStorage.getItem("storageApiDate");
        checkApiCallData(date);
      }
    }, [ref]);

    const averageQuestions = maxQuestions / 2;
    const API_KEY = process.env.REACT_APP_MARVEL_PUBLIC_KEY;
    const hash = "ab7cc8d1a65a1292bc14a68c26f7e9b3";

    const checkApiCallData = (date) => {
      const now = Date.now();
      const timeDifference = now - date;
      const day = timeDifference / (1000 * 3600 * 24);
      if (day >= 15) {
        localStorage.clear();
        localStorage.setItem("storageApiDate", Date.now());
      }
    };

    const showInfo = (id) => {
      setOpenModal(true);
      if (localStorage.getItem(id)) {
        setInfosModal(JSON.parse(localStorage.getItem(id)));
        setLoadingInfos(true);
      } else {
        axios
          .get(
            `https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${API_KEY}&hash=${hash}`
          )
          .then((response) => {
            setInfosModal(response.data);
            localStorage.setItem(id, JSON.stringify(response.data.data));
            if (!localStorage.getItem("storageApiDate")) {
              localStorage.setItem("storageApiDate", Date.now());
            }
            setLoadingInfos(true);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };

    const closeModal = () => {
      setOpenModal(false);
      setLoadingInfos(false);
    };

    const modalInformations = loadingInfos ? (
      <>
        <div className="modalHeader">
          <h2>{infosModal.data.results[0].name}</h2>
        </div>
        <div className="modalBody">
          <div className="comicImage">
            <img
              src={
                infosModal.data.results[0].thumbnail.path +
                "." +
                infosModal.data.results[0].thumbnail.extension
              }
              alt={infosModal.data.results[0].name}
            />
            {infosModal.data.attributionText}
          </div>
          <div className="comicDetails">
            <h3>Description</h3>
            <p>
              {infosModal.data.results[0].description === ""
                ? "Description Indisponibile pour le moment."
                : infosModal.data.results[0].description}
            </p>
            <h3>Plus d'Informations</h3>
            {infosModal.data.results[0].urls &&
              infosModal.data.results[0].urls.map((link, index) => {
                return (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btnInfo"
                  >
                    {link.type}
                  </a>
                );
              })}
          </div>
        </div>
        <div className="modalFooter">
          <button className="modalBtn" onClick={closeModal}>
            <FaRegTimesCircle className="academy-quiz-icon-right" /> Fermer
          </button>
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
          <Modal openModal={openModal}>{modalInformations}</Modal>
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
