import React, { useState, useEffect, useContext } from "react";
import { AcademyContext } from "../Firebase";
import NavBar from "../NavBar";
import Quiz from "../Quiz";

const Welcome = (prop) => {
  const [userIsLogged, setUserIsLogged] = useState(null);
  const academyContext = useContext(AcademyContext);

  useEffect(() => {
    academyContext.auth.onAuthStateChanged((user) => {
      user ? setUserIsLogged(user) : prop.history.push("/");
    });
  }, []);

  return userIsLogged === null ? (
    <>
      <div className="loader"></div>
      <p className="loaderText">Loading ...</p>
    </>
  ) : (
    <div className="quiz-bg">
      <div className="container">
        <NavBar />
        <Quiz />
      </div>
    </div>
  );
};

export default Welcome;
