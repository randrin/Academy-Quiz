import React, { useState, useEffect, useContext } from "react";
import { AcademyContext } from "../Firebase";
import NavBar from "../NavBar";
import StartQuiz from "../Quiz/Start";
import { toast } from "react-toastify";
toast.configure();

const Welcome = (prop) => {
  const [userIsLogged, setUserIsLogged] = useState(null);
  const [userData, setUserData] = useState({});
  const academyContext = useContext(AcademyContext);

  useEffect(() => {
    let listener = academyContext.auth.onAuthStateChanged((user) => {
      user && user.emailVerified
        ? setUserIsLogged(user)
        : prop.history.push("/");
    });
    if (!!userIsLogged) {
      academyContext
        .signUpUserWithUID(userIsLogged.uid)
        .get()
        .then((doc) => {
          if (doc && doc.exists) {
            const user = doc.data();
            setUserData(user);
            // Alert Welcome User
            if (user.pseudo) {
              toast.info(`Welcome ${user.pseudo} to Academy Quizz`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }
          }
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    }
    return () => {
      listener();
    };
  }, [userIsLogged, academyContext, prop.history]);

  return userIsLogged === null ? (
    <>
      <div className="loader"></div>
      <p className="loaderText">Loading ...</p>
    </>
  ) : (
    <div className="quiz-bg">
      <div className="container">
        <NavBar />
        <StartQuiz userData={userData} />
      </div>
    </div>
  );
};

export default Welcome;
