import React, { useState, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { AcademyContext } from "../../Firebase";

const Login = (props) => {
  const userData = {
    email: "",
    password: "",
  };

  const [user, setUser] = useState(userData);
  const [error, setError] = useState("");
  const academyContext = useContext(AcademyContext);
  const hoverInput = useRef(null);

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
        setUser({ ...userData });
        props.history.push("/welcome");
      })
      .catch((error) => {
        setError(error);
      });
  };

  const { email, password } = user;

  // Validation Submit Button
  const btnSubmit =
    email !== "" && password.length > 5 ? (
      <button className="btn-loginAndSign">Connexion</button>
    ) : (
      <button disabled>Connexion</button>
    );

  // Validation Error
  const errorMsg = error !== "" && (
    <div ref={hoverInput} className="error-alert">
      <span>{error.message}</span>
    </div>
  );

  return (
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
