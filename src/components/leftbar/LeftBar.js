import React from "react";
import { Link } from "react-router-dom";
import Profile from "../../pages/profile/Profile";
import Vendors from "../../pages/vendors/Vendors";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import StoreIcon from "@mui/icons-material/Store";
import GroupIcon from "@mui/icons-material/Group";

const LeftBar = () => {
  return (
    <div className="leftbar">
      <ul>
        <li>
          <DashboardIcon />
          <span>Dashboard</span>
        </li>
        <li>
          <Link to={"/user"}>
            <AccountCircleIcon />
            <span>User</span>
          </Link>
        </li>
        <li>
          <Link to={"/vendors"}>
            <StoreIcon />
            <span>Vendors</span>
          </Link>
        </li>
        <li>
          <GroupIcon />
          <span>Customers</span>
        </li>
      </ul>
    </div>
  );
};

export default LeftBar;
