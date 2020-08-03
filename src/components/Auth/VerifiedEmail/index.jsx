import React from "react";
import { FaRegSmile, FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

const VerifiedEmail = ({ email }) => {
  return (
    <div className="emailVerifiedPage">
      <div className="emailVerifiedBox">
        <FaRegSmile className="emailVerifiedIcon academy-quiz-color-green" />
        <h1 className="emailVerifiedTitle">Félicitation</h1>
        <h2 className="emailVerifiedSubtitle">
          Votre compte a été crée avec succès.
        </h2>
        <div className="emailVerifiedCta">
          <span>
            Un mail d'activation de votre compte a été envoyé à l'adresse
            électronique <span className="emailVerifiedCtaEmail">{email}</span>.
            Bien vouloir cliquer sur le lien.
          </span>
          <Link to="/login" className="btn-loginAndSign">
            <FaCheck className="academy-quiz-icon-right" /> Connexion
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifiedEmail;
