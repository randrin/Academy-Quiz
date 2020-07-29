import React from "react";
import { FaChevronRight } from "react-icons/fa";

const Questions = () => {
  return (
    <div>
      <h2>Question title</h2>
      <p className="answerOptions">Reponse 1</p>
      <p className="answerOptions">Reponse 2</p>
      <p className="answerOptions">Reponse 3</p>
      <p className="answerOptions">Reponse 4</p>
      <button className="btnSubmit">
        Suivant <FaChevronRight className="academy-quiz-icon" />
      </button>
    </div>
  );
};

export default Questions;
