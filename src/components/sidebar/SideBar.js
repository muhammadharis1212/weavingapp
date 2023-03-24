import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import StoreIcon from "@mui/icons-material/Store";
import GroupIcon from "@mui/icons-material/Group";
import { ShoppingBagOutlined } from "@mui/icons-material";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import {
  DollarCircleOutlined,
  DashboardOutlined,
  UserOutlined,
} from "@ant-design/icons";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import "./sideBar.scss";
import { createSearchParams } from "react-router-dom";
import { Menu } from "antd";
import { AuthContext } from "../../context/AuthContext";

const SideBar = () => {
  const location = useLocation();
  //console.log(location);
  const { company } = useContext(AuthContext);
  const navigate = useNavigate();
  const [current, setCurrent] = useState(location.pathname);
  const [openedSubMenu, setOpenedSubMenu] = useState();
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
    getItem("Inventory", "sub1", <Inventory2OutlinedIcon />, [
      getItem("Items", "items", <PostAddOutlinedIcon />),
    ]),
    getItem("Sales", "sub2", <DollarCircleOutlined />, [
      getItem("Customers", "customers", <GroupIcon />),
      getItem("Invoices", "3", <RequestQuoteOutlinedIcon />),
    ]),

    getItem("Purchases", "purchases", <ShoppingBagOutlined />, [
      getItem("Suppliers", "suppliers", <StoreIcon />),
      getItem("Bills", "/bills", <ReceiptLongOutlinedIcon />),
    ]),
    getItem("Common", "sub4", <AccountBoxOutlinedIcon />, [
      getItem("Party", "party", <BadgeOutlinedIcon />),
    ]),
    getItem("Account", "sub5", <AccountBoxOutlinedIcon />, [
      getItem("Profile", "user", <BadgeOutlinedIcon />),
    ]),
    getItem("Accountant", "sub6", <UserOutlined />, [
      getItem("Chart of Accounts", "chartofaccounts"),
    ]),
  ];

  //click handler for selecting items
  const onClick = (e) => {
    console.log(e);
    setCurrent(e.key);
    switch (e.key) {
      case "/bills":
        setOpenedSubMenu(() => "purchases");
        navigate({
          pathname: "bills",
          search: createSearchParams({
            filter_by: "Status.All",
            per_page: "2",
            page: "1",
            sort_column: "createdAt",
            sort_order: "desc",
          }).toString(),
        });
        break;
      case "items":
        navigate({
          pathname: "items",
          search: createSearchParams({
            filter_by: "Status.All",
            per_page: "2",
            page: "1",
            sort_column: "createdAt",
            sort_order: "desc",
          }).toString(),
        });
        break;
      default:
        navigate(e.key);
    }
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
        defaultSelectedKeys={[location.pathname]}
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
