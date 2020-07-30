import React, { useEffect, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";

const EndQuiz = React.forwardRef((props, ref) => {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    setAnswers(ref.current);
  }, [ref]);

  console.log(answers.current);
  return (
    <>
      <div className="stepsBtnContainer">
        <p className="successMsg">Bravo, vous avez passé le test !!!!</p>
        <button className="btnResult success">
          Passez au niveau supérieur
        </button>
      </div>
      <div className="percentage">
        <div className="progressPercent">Pourcentage Reusite : 10%</div>
        <div className="progressPercent">Votre score : 10/10</div>
      </div>
      <hr />
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
                      <FaInfoCircle className="academy-quiz-icon-right" /> Infos
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
});

export default React.memo(EndQuiz);
