import React, { useState, useEffect, useContext } from "react";
import { AcademyContext } from "../../Firebase";
import ReactTooltip from "react-tooltip";
import { toast } from "react-toastify";
toast.configure();

const Logout = () => {
  const [checked, setChecked] = useState(false);
  const academyContext = useContext(AcademyContext);

  useEffect(() => {
    if (checked) {
      academyContext.logoutUser();
    }
  }, [checked, academyContext]);

  const handleChange = (e) => {
    setChecked(e.target.checked);
    // Alert Logout
    toast.info(`Vous vous êtes déconnecté avec succés.`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="logoutContainer">
      <label className="switch">
        <input type="checkbox" onChange={handleChange} checked={checked} />
        <span className="slider round" data-tip="Déconnexion"></span>
      </label>
      <ReactTooltip place="left" effect="solid" />
    </div>
  );
};

export default Logout;
