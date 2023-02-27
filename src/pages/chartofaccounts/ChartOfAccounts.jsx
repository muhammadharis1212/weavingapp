import React, { useContext, useState } from "react";
import { Divider, Radio, Table, Button } from "antd";
import CreateAccountView from "./CreateAccountView";
import { AuthContext } from "../../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchChartAccounts } from "../../features/chartofaccounts/chartOfAccountsSlice";

const ChartOfAccounts = () => {
  const { token } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [fetchFlag, setFetchFlag] = useState(false);
  const accounts = useSelector((state) => {
    return state.chartOfAccounts;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchChartAccounts(token));
    console.log("Fetch Data");
  }, [fetchFlag]);

  const data = accounts?.chartOfAccounts?.map((account) => {
    return {
      key: account.id,
      name: account.name,
      code: account.code,
      group: account.group.name,
      root: account.group.rootType.name,
    };
  });
  console.log("Data : ", data);
  const columns = [
    {
      title: "Account Name",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
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
    <div style={{ height: "100%" }}>
      <div>
        <Button type="primary" onClick={handleClick}>
          New Account
        </Button>
      </div>
      <Divider style={{ marginBottom: 0 }} />
      <div>
        {open && (
          <CreateAccountView
            open={open}
            setOpen={setOpen}
            token={token}
            setFetchFlag={setFetchFlag}
          />
        )}
        <Table
          rowSelection={{ type: "checkbox" }}
          pagination={false}
          size="middle"
          scroll={{ y: 350 }}
          dataSource={data}
          columns={columns}
        />
      </div>
    </div>
  );
};

export default ChartOfAccounts;
