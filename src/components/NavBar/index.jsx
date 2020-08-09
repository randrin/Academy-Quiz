import React from "react";
import { Link } from "react-router-dom"
import Logout from "../Auth/Logout";

const NavBar = () => {
  return (
    <div className="container">
      <div>
        <span>NavBar Section</span>
        <Link to="/admin" className="btnSubmit">Admin</Link>
      </div>
      <Logout />
    </div>
  );
};

export default NavBar;
