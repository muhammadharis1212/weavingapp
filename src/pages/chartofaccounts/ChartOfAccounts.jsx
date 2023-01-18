import React, { useContext, useState } from "react";
import { Divider, Radio, Table, Button } from "antd";
import CreateAccountView from "./CreateAccountView";
import { AuthContext } from "../../context/AuthContext";

const ChartOfAccounts = () => {
  const { token } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const dataSource = [
    {
      key: "1",
      name: "Accounts Receivable",
      code: 100,
      group: "Accounts Receivable",
      root: "Assets",
    },
    {
      key: "2",
      name: "John",
      code: 200,
      group: 42,
      root: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Account Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Account Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Account Group",
      dataIndex: "group",
      key: "group",
    },
    {
      title: "Root Type",
      dataIndex: "root",
      key: "root",
    },
  ];

  const handleClick = () => {
    console.log("Clicked Me");
    setOpen((prev) => !prev);
  };

  return (
    <div>
      <div>
        <Button type="primary" onClick={handleClick}>
          New Account
        </Button>
      </div>
      <Divider />
      {open && (
        <CreateAccountView open={open} setOpen={setOpen} token={token} />
      )}
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default ChartOfAccounts;
