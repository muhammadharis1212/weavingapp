import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./navbar.css";

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  function handleClick() {
    logout();
  }
  return (
    <nav className="nav">
      <div className="nav--left">
        <h3>Weaving ERP</h3>
      </div>
      <div className="nav--right">
        <div className="nav--right--user">
          <span>user name</span>
          <button onClick={handleClick}>LogOut</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
