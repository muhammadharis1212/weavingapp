import React, { useContext } from "react";
import { Layout, theme, Breadcrumb } from "antd";

import "./home.css";

const Home = () => {
  const { Content } = Layout;
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return <div>Dashboard</div>;
};

export default Home;
