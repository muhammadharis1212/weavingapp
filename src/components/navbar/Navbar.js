import React, { useContext } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import "./navbar.css";
import LogoutIcon from "@mui/icons-material/Logout";
import Brightness4TwoToneIcon from "@mui/icons-material/Brightness4TwoTone";
import Brightness4OutlinedIcon from "@mui/icons-material/Brightness4Outlined";
import { Menu, Layout, theme } from "antd";
import Title from "antd/es/typography/Title";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { Header } = Layout;
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
      <LogoutIcon onClick={handleClick} style={{ height: 25, width: 25 }} />
    ),
  ];

  function handleClick() {
    sessionStorage.clear();
    navigate("/auth/login");
  }
  return (
    <Layout>
      <Header
        className="header"
        style={{
          height: "7vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Title level={3} type="warning">
          Weaving ERP
        </Title>
        <Menu
          style={{ fontSize: "20px" }}
          theme="dark"
          mode="horizontal"
          items={navItems}
        />
      </Header>
    </Layout>
  );
};

export default Navbar;
