import React, { useState, useEffect, useContext } from "react";
import { AcademyContext } from "../Firebase";

const Logout = () => {
  const [checked, setChecked] = useState(false);
  const academyContext = useContext(AcademyContext);

  useEffect(() => {
    if (checked) {
      console.log("Déconnexion....");
      academyContext.logoutUser();
    }
  }, [checked, academyContext]);

  const handleChange = (e) => {
    setChecked(e.target.checked);
  };

  return (
    <div className="logoutContainer">
      <label className="switch">
        <input type="checkbox" onChange={handleChange} checked={checked} />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default Logout;
