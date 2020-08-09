import React, { useState, useContext, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaCheck, FaRegFrown } from "react-icons/fa";
import { AcademyContext } from "../../Firebase";

const Login = (props) => {
  const userData = {
    email: "",
    password: "",
  };

  const [user, setUser] = useState(userData);
  const [error, setError] = useState("");
  const [userVerified, setUserVerified] = useState(false);
   const [sendEmail, setSendEmail] = useState(false);
  const academyContext = useContext(AcademyContext);
  const hoverInput = useRef(null);
  const [userIsLogged, setUserIsLogged] = useState(false);

  useEffect(() => {
    let listener = academyContext.auth.onAuthStateChanged((user) => {
      console.log("useEffect User: ", user);
      user && user.emailVerified
        ? props.history.push("/")
        : setUserIsLogged(true);
    });

    return () => {
      listener();
    };
  }, [userIsLogged, academyContext, props.history]);

  const removeErrorMessage = () => {
    console.log(hoverInput.current);
    //hoverInput.current.classList.add("leftImg");
  };
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = user;
    academyContext
      .loginUser(email, password)
      .then((response) => {
        console.log("Login User: ", response);
        if (response.user.emailVerified) {
          setUser({ ...userData });
          props.history.push("/welcome");
        } else {
          setUserVerified(true);
        }
      })
      .catch((error) => {
        setError(error);
      });
  };

  const sendEmailVerification = () => {
    console.log("sendEmailVerification");
    // user
    //   .sendEmailVerification()
    //   .then(() => {
    //     setSendEmail(true);
    //     console.log("sendEmailVerification: ", sendEmail);
    //   })
    //   .catch((error) => {
    //     setError(error);
    //   });
  };

  const { email, password } = user;

  // Validation Submit Button
  const btnSubmit =
    email !== "" && password.length > 5 ? (
      <button className="btn-loginAndSign">
        <FaCheck className="academy-quiz-icon-right" /> Connexion
      </button>
    ) : (
      <button disabled>
        <FaCheck className="academy-quiz-icon-right" />
        Connexion
      </button>
    );

  // Validation Error
  const errorMsg = error !== "" && (
    <div ref={hoverInput} className="error-alert">
      <span>{error.message}</span>
    </div>
  );

  return userVerified ? (
    <div className="emailVerifiedPage">
      <div className="emailVerifiedBox">
        <FaRegFrown className="emailVerifiedIcon academy-quiz-color-red" />
        <h1 className="emailVerifiedTitle">Pas Authorisé</h1>
        <h2 className="emailVerifiedSubtitle">Votre compte n'est pas validé</h2>
        <div className="emailVerifiedMessage">
          <span>
            Lors de votre régistration, un mail d'activation de compte a été
            envoyé à <span className="emailVerifiedCtaEmail">{email}</span>.
            <br />
            Bien vouloir vous rendre dans votre courrier électronique et
            finaliser votre inscription sur Academy Quiz.
          </span>
        </div>
        <div className="emailVerifiedMessage">
          <span>Mail d'activation as réçu?</span>
          <button onClick={sendEmailVerification} className="btn-loginAndSign">
            <FaCheck className="academy-quiz-icon-right" /> Send Again
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftLogin"></div>
        <div className="formBoxRight">
          <div className="formContent">
            <h2>Connexion</h2>
            {errorMsg}
            <form onSubmit={handleSubmit}>
              <div className="inputBox">
                <input
                  type="text"
                  onChange={handleChange}
                  onClick={removeErrorMessage}
                  id="email"
                  name="email"
                  value={email}
                  autoComplete="off"
                  required
                />
                <label>Votre Email</label>
              </div>
              <div className="inputBox">
                <input
                  type="password"
                  onChange={handleChange}
                  onClick={removeErrorMessage}
                  id="password"
                  name="password"
                  value={password}
                  autoComplete="off"
                  required
                />
                <label>Votre Mot de Passe</label>
              </div>
              <div className="forgotPassword">
                <Link to="/forgot/password" className="forgotPassword">
                  Vous avez oublié votre Mot de Passe?
                </Link>
              </div>
              {btnSubmit}
            </form>
            <hr />
            <Link to="/signup" className="">
              <span>Vous êtes nouveau? Inscrivez-vous</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
