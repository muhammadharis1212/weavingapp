import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Layout, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { PoweroffOutlined } from "@ant-design/icons";

const Navbar = () => {
  const navigate = useNavigate();

  //Navbar Icons Mapping
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const navItems = [
    getItem(
      "",
      "logout",
      <Button type="primary" placeholder="Logout" onClick={handleClick} />
    ),
  ];

  function handleClick() {
    sessionStorage.clear();
    navigate("/auth/login");
  }
  return (
    <div
      style={{
        paddingRight: "10px",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "end",
      }}
    >
      <PoweroffOutlined onClick={handleClick} />
    </div>
  );
};

export default Navbar;
