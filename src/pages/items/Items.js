import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import ItemsTable from "../../features/items/ItemsTable";
import CreateItem from "./CreateItem";
import "./items.css";

const Items = () => {
  const navigate = useNavigate();
  function handleClick() {
    navigate("new");
  }
  return (
    <div className="items--container">
      <div className="items--header">
        <h2>All Items</h2>

        <Button type="primary" icon={<PlusOutlined />} onClick={handleClick}>
          New
        </Button>
      </div>
      <div>
        <ItemsTable />
      </div>
    </div>
  );
};

export default Items;
