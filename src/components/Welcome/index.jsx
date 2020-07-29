import React, { useState, useEffect, useContext } from "react";
import { AcademyContext } from "../Firebase";
import NavBar from "../NavBar";
import Quiz from "../Quiz";

const Welcome = (prop) => {
  const [userIsLogged, setUserIsLogged] = useState(null);
  const [userData, setUserData] = useState({});
  const academyContext = useContext(AcademyContext);

  useEffect(() => {
    let listener = academyContext.auth.onAuthStateChanged((user) => {
      user ? setUserIsLogged(user) : prop.history.push("/");
    });
    if (!!userIsLogged) {
      academyContext
        .signUpUserWithUID(userIsLogged.uid)
        .get()
        .then((doc) => {
          if (doc && doc.exists) {
            const user = doc.data();
            setUserData(user);
          }
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    }
    return () => {
      listener();
    };
  }, [userIsLogged]);

  return userIsLogged === null ? (
    <>
      <div className="loader"></div>
      <p className="loaderText">Loading ...</p>
    </>
  ) : (
    <div className="quiz-bg">
      <div className="container">
        <NavBar />
        <Quiz userData={userData} />
      </div>
    </div>
  );
};

export default Welcome;
