import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import StoreIcon from "@mui/icons-material/Store";
import GroupIcon from "@mui/icons-material/Group";
import { ShoppingBagOutlined } from "@mui/icons-material";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import {
  DollarCircleOutlined,
  DashboardOutlined,
  UserOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import "./sideBar.scss";

import { Layout, theme, Menu } from "antd";
import { AuthContext } from "../../context/AuthContext";

const SideBar = () => {
  const { company } = useContext(AuthContext);
  const navigate = useNavigate();
  const [current, setCurrent] = useState("/");
  //Function to get SideBar Menu Items
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  //Array of Items to be display in the sidebar
  const sideBarItems = [
    getItem("Dashboard", "/", <DashboardOutlined />),
    getItem("Sales", "sub1", <DollarCircleOutlined />, [
      getItem("Customers", "customers", <GroupIcon />),
      getItem("Invoices", "3", <RequestQuoteOutlinedIcon />),
    ]),
    getItem("Purchases", "sub2", <ShoppingBagOutlined />, [
      getItem("Vendors", "vendors", <StoreIcon />),
      getItem("Bills", "5", <ReceiptLongOutlinedIcon />),
    ]),
    getItem("Inventory", "sub3", <Inventory2OutlinedIcon />, [
      getItem("Items", "items", <PostAddOutlinedIcon />),
    ]),
    getItem("Account", "sub4", <AccountBoxOutlinedIcon />, [
      getItem("Profile", "user", <BadgeOutlinedIcon />),
    ]),
    getItem("Accountant", "sub5", <UserOutlined />, [
      getItem("Chart of Accounts", "chartofaccounts"),
    ]),
  ];
  //config
  const { Sider } = Layout;
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  //click handler for selecting items
  const onClick = (e) => {
    setCurrent(e.key);
    navigate(e.key);
  };
  return (
    <div>
      <div>
        <p className="title">{company?.name || "ERP"}</p>
      </div>

      <Menu
        mode="inline"
        theme="dark"
        onClick={onClick}
        defaultSelectedKeys={["/"]}
        selectedKeys={[current]}
        style={{
          height: "100%",
          borderRight: 0,
        }}
        items={sideBarItems}
      />
    </div>
  );
};

export default SideBar;
