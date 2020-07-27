import React, { useRef, useEffect, useState } from "react";

const Home = () => {
  const [btn, setBtn] = useState(false);

  const welcomePage = useRef(null);

  useEffect(() => {
    welcomePage.current.classList.add("startingImg");
    setTimeout(() => {
      setBtn(true);
      welcomePage.current.classList.remove("startingImg");
    }, 3000);
  });

  return (
    <main ref={welcomePage} className="welcomePage">
      {btn && (
        <>
          <div className="leftBox">
            <button className="btn-welcome">Inscription</button>
          </div>
          <div className="rightBox">
            <button className="btn-welcome">Connexion</button>
          </div>
        </>
      )}
    </main>
  );
};

export default Home;
