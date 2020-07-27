import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [btn, setBtn] = useState(false);

  const welcomePage = useRef(null);

  useEffect(() => {
    welcomePage.current.classList.add("startingImg");
    setTimeout(() => {
      setBtn(true);
      welcomePage.current.classList.remove("startingImg");
    }, 1000);
  });

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
            <Link to="/signup" className="btn-welcome">Inscription</Link>
          </div>
          <div
            onMouseOver={showRightImg}
            onMouseOut={clearImg}
            className="rightBox"
          >
            <Link to="/login" className="btn-welcome">Connexion</Link>
          </div>
        </>
      )}
    </main>
  );
};

export default Home;
