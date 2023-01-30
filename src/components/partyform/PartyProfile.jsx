import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { fetchParty } from "../../features/party/partySlice";
import { Button, Collapse, theme, Tabs } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
const { Panel } = Collapse;

const PartyProfile = ({ data, token }) => {
  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };
  return (
    <div style={{ paddingTop: 20 }}>
      <div style={{ display: "flex", gap: 10 }}>
        <div style={{ alignItems: "center" }}>
          <Avatar shape="square" size="large" icon={<UserOutlined />} />
        </div>
        <div>
          <p style={{ fontWeight: "bold", margin: 0 }}>
            <span>{data.parties.salutation + `${" "}`}</span>
            {data.parties.firstName}
            <span>{`${" "}` + data.parties.lastName}</span>
          </p>
          <div style={{ fontSize: "11px", marginTop: 3 }}>
            <a style={{ marginRight: 5 }}>Edit</a>
            <a>Delete</a>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 10 }}>
        <Collapse
          bordered={false}
          defaultActiveKey={["1"]}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          style={{ background: token.colorBgContainer }}
        >
          <Panel header="ADDRESS" key="1" style={panelStyle}>
            <div style={{ marginBottom: 5 }}>
              {data.parties.address?.map((address) => {
                return (
                  <div>
                    <div>{address.addressLine1}</div>
                    <div>{address.addressLine2}</div>
                    <div>{address.city}</div>
                    <div>{address.state}</div>
                    <div>{address.country}</div>
                    <div>{address.postalCode}</div>
                  </div>
                );
              })}
            </div>
          </Panel>
          <Panel header="ADDRESS" key="1" style={panelStyle}>
            <div style={{ marginBottom: 5 }}>
              {data.parties.address?.map((address) => {
                return (
                  <div>
                    <div>{address.addressLine1}</div>
                    <div>{address.addressLine2}</div>
                    <div>{address.city}</div>
                    <div>{address.state}</div>
                    <div>{address.country}</div>
                    <div>{address.postalCode}</div>
                  </div>
                );
              })}
            </div>
          </Panel>
          <Panel header="ADDRESS" key="1" style={panelStyle}>
            <div style={{ marginBottom: 5 }}>
              {data.parties.address?.map((address) => {
                return (
                  <div>
                    <div>{address.addressLine1}</div>
                    <div>{address.addressLine2}</div>
                    <div>{address.city}</div>
                    <div>{address.state}</div>
                    <div>{address.country}</div>
                    <div>{address.postalCode}</div>
                  </div>
                );
              })}
            </div>
          </Panel>
          <Panel header="ADDRESS" key="1" style={panelStyle}>
            <div style={{ marginBottom: 5 }}>
              {data.parties.address?.map((address) => {
                return (
                  <div>
                    <div>{address.addressLine1}</div>
                    <div>{address.addressLine2}</div>
                    <div>{address.city}</div>
                    <div>{address.state}</div>
                    <div>{address.country}</div>
                    <div>{address.postalCode}</div>
                  </div>
                );
              })}
            </div>
          </Panel>
          <Panel header="CONTACT" key="2" style={panelStyle}>
            <div>
              {data.parties.contact?.map((contact) => {
                return <div>{contact.phone}</div>;
              })}
            </div>
          </Panel>
          <Panel header="RECORD INFO" key="3" style={panelStyle}>
            <p>Party ID : {data.parties.id}</p>
            <p>Created at : {data.parties.createdAt}</p>
          </Panel>
        </Collapse>
      </div>
    </div>
  );
};

export default PartyProfile;
