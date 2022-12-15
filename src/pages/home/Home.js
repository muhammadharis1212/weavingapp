import React, { useContext } from "react";
import LeftBar from "../../components/leftbar/LeftBar";
import Navbar from "../../components/navbar/Navbar";
import { AuthContext } from "../../context/AuthContext";
import "./home.css";

const Home = () => {
  const { logout } = useContext(AuthContext);
  function handleClick() {
    logout();
  }
  return (
    <div className="home">
      <div className="home--navbar">
        <Navbar />
      </div>
      <div className="home--bottom">
        <div className="home--bottom--left">
          <LeftBar />
        </div>
        <div className="home--bottom--right">
          <h1>Home Page</h1>
        </div>
      </div>

      <button onClick={handleClick}>LogOut</button>
    </div>
  );
};

export default Home;
