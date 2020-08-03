import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import { AcademyContext } from "../../Firebase";
import VerifiedEmail from "../VerifiedEmail";

const SignUp = (props) => {
  const newUserData = {
    pseudo: "",
    email: "",
    password: "",
    confirmatioPassword: "",
  };

  const [newUser, setNewUser] = useState(newUserData);
  const [error, setError] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const academyContext = useContext(AcademyContext);

  const handleChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, pseudo } = newUser;
    academyContext
      .signUpUser(email, password)
      .then((response) => {
        response.user
          .sendEmailVerification()
          .then(() => {
            setNewUser({ ...response.user });
            setEmailVerified(true);
          })
          .catch((error) => {
            setError(error);
          });
        academyContext.signUpUserWithUID(response.user.uid).set({
          pseudo,
          email,
        });
      })
      // .then((response) => {
      //   setNewUser({ response.user });
      //   //props.history.push("/welcome");
      // })
      .catch((error) => {
        setError(error);
      });
  };

  const { pseudo, email, password, confirmatioPassword } = newUser;

  // Validation Submit Button
  const btnSubmit =
    pseudo === "" ||
    email === "" ||
    password === "" ||
    confirmatioPassword !== password ? (
      <button disabled>
        <FaUserPlus className="academy-quiz-icon-right" />
        Register
      </button>
    ) : (
      <button className="btn-loginAndSign">
        <FaUserPlus className="academy-quiz-icon-right" />
        Register
      </button>
    );

  // Validation Error
  const errorMsg = error !== "" && <span>{error.message}</span>;

  return emailVerified ? (
    <VerifiedEmail email={email} />
  ) : (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftSignup"></div>
        <div className="formBoxRight">
          <div className="formContent">
            <h2>Inscription</h2>
            {errorMsg}
            <form onSubmit={handleSubmit}>
              <div className="inputBox">
                <input
                  type="text"
                  onChange={handleChange}
                  id="pseudo"
                  name="pseudo"
                  value={pseudo || ""}
                  autoComplete="off"
                  required
                />
                <label>Votre Pseudo</label>
              </div>
              <div className="inputBox">
                <input
                  type="text"
                  onChange={handleChange}
                  id="email"
                  name="email"
                  value={email || ""}
                  autoComplete="off"
                  required
                />
                <label>Votre Email</label>
              </div>
              <div className="inputBox">
                <input
                  type="password"
                  onChange={handleChange}
                  id="password"
                  name="password"
                  value={password || ""}
                  autoComplete="off"
                  required
                />
                <label>Votre Mot de Passe</label>
              </div>
              <div className="inputBox">
                <input
                  type="password"
                  onChange={handleChange}
                  id="confirmatioPassword"
                  name="confirmatioPassword"
                  value={confirmatioPassword || ""}
                  autoComplete="off"
                  required
                />
                <label>Confirmer votre Mot de Passe</label>
              </div>
              {btnSubmit}
            </form>
            <hr />
            <Link to="/login" className="">
              <span>Vous avez déjà un compte? Connectez-vous</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
