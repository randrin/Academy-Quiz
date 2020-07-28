import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AcademyContext } from "../../Firebase";

const ForgotPassword = (prop) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const academyContext = useContext(AcademyContext);

  const errorMsg = error !== "" && <span>{error.message}</span>;
  const successMsg = success !== "" && (
    <span
      style={{
        border: "1px solid green",
        background: "green",
        color: "white",
      }}
    >
      {success}
    </span>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    academyContext
      .resetPassword(email)
      .then((response) => {
        setError("");
        setSuccess(
          `Votre Mot de Passe a été réinitialisé avec succés. Un message a été envoyé à ${email}`
        );
        setTimeout(() => {
          prop.history.push("/login");
        }, 5000);
      })
      .catch((error) => {
        setError(error);
        setEmail("");
      });
  };

  const removeErrorMessage = (e) => {};

  // Validation Submit Button
  const btnSubmit =
    email !== "" ? (
      <button className="btn-loginAndSign">Envoyer</button>
    ) : (
      <button disabled>Envoyer</button>
    );

  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftForget"></div>
        <div className="formBoxRight formBoxTop">
          <div className="formContent">
            <h2>Mot de Passe Oublié</h2>
            {errorMsg}
            {successMsg}
            <form onSubmit={handleSubmit}>
              <div className="inputBox">
                <input
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  onClick={removeErrorMessage}
                  id="email"
                  name="email"
                  value={email}
                  autoComplete="off"
                  required
                />
                <label>Votre Email</label>
              </div>
              {btnSubmit}
            </form>
            <hr />
            <Link to="/login" className="">
              <span>
                Vous vous souveniez de votre Mot de Passe? Connectez-vous
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
