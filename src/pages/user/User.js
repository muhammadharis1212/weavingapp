import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./user.css";
import { Layout, theme, Tabs } from "antd";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const User = () => {
  const navigate = useNavigate();
  const { Content } = Layout;
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const getUser = async (token) => {
      const res = await axios.get("http://localhost:5000/user", {
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      console.log("User : ", res.data);
    };
    getUser(token);
  }, []);
  const clickHandler = (key) => {
    if (key === "update") {
      navigate("update");
    } else navigate("");
  };
  return (
    <Layout
      style={{
        padding: "24px 24px 0 24px",
      }}
    >
      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
          background: colorBgContainer,
        }}
      >
        <Tabs
          type="card"
          defaultActiveKey="profile"
          //activeKey={`${tab}`}
          onTabClick={clickHandler}
          size={"large"}
          items={[
            {
              label: "Profile",
              key: "profile",
              children: <Profile userInfo={userInfo} />,
            },
            {
              label: "Update",
              key: "update",
              children: <EditProfile userInfo={userInfo} />,
            },
          ]}
        />
      </Content>
    </Layout>
  );
};

export default User;
