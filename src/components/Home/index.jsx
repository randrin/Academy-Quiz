import React, { useRef, useEffect, useState, useContext } from "react";
import { AcademyContext } from "../Firebase";
import { Link } from "react-router-dom";
import { FaCheck, FaUserPlus, FaArrowRight } from "react-icons/fa";

const Home = () => {
  const [btn, setBtn] = useState(false);
  const [userIsLogged, setUserIsLogged] = useState(false);
  const academyContext = useContext(AcademyContext);

  const welcomePage = useRef(null);

  useEffect(() => {
    let listener = academyContext.auth.onAuthStateChanged((user) => {
      user && user.emailVerified
        ? setUserIsLogged(true)
        : setUserIsLogged(false);
    });
    welcomePage.current.classList.add("startingImg");
    setTimeout(() => {
      setBtn(true);
      welcomePage.current.classList.remove("startingImg");
    }, 1000);
    return () => {
      listener();
    };
  }, [userIsLogged, academyContext]);

  const showLeftImg = () => {
    welcomePage.current.classList.add("leftImg");
  };

  const showRightImg = () => {
    welcomePage.current.classList.add("rightImg");
  };

  const clearImg = () => {
    if (welcomePage.current.classList.contains("leftImg")) {
      welcomePage.current.classList.remove("leftImg");
    } else {
      welcomePage.current.classList.remove("rightImg");
    }
  };

  return (
    <main ref={welcomePage} className="welcomePage">
      {btn && (
        <>
          <div
            onMouseOver={showLeftImg}
            onMouseOut={clearImg}
            className="leftBox"
          >
            {!userIsLogged && (
              <Link to="/signup" className="btn-welcome">
                <FaUserPlus className="academy-quiz-icon-right" />
                Inscription
              </Link>
            )}
          </div>
          <div
            onMouseOver={showRightImg}
            onMouseOut={clearImg}
            className="rightBox"
          >
            {userIsLogged ? (
              <Link to="/welcome" className="btn-welcome">
                Go to Dashboard
                <FaArrowRight className="academy-quiz-icon-left" />
              </Link>
            ) : (
              <Link to="/login" className="btn-welcome">
                <FaCheck className="academy-quiz-icon-right" />
                Connexion
              </Link>
            )}
          </div>
        </>
      )}
    </main>
  );
};

export default Home;
