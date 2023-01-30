import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { fetchParties } from "../../features/party/partySlice";
import { Table, Button, Divider } from "antd";

const Party = () => {
  const navigate = useNavigate();
  const { authToken } = useContext(AuthContext);
  const data = useSelector((state) => state.party);
  console.log("State : ", data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchParties(authToken));
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "firstName",
      render: (text) => <Link>{text}</Link>,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Outstanding Amount",
      dataIndex: "group",
      key: "group",
    },
  ];
  const dataSource = data?.parties?.map((party) => {
    return {
      key: party.id,
      firstName: party.firstName,
      role: party.role,
    };
  });
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2 style={{ margin: 0 }}>Party</h2>
        <Button
          type="primary"
          onClick={() => {
            navigate("new");
          }}
        >
          New
        </Button>
      </div>
      <Divider />
      <Table
        rowSelection={{ type: "checkbox" }}
        pagination={false}
        size="middle"
        scroll={{ y: 350 }}
        dataSource={dataSource}
        columns={columns}
        onRow={(record) => {
          return {
            onClick: () => {
              console.log("Row Clicked : ", record);
              navigate(`${record?.key}`);
            },
          };
        }}
      />
    </div>
  );
};

export default Party;
