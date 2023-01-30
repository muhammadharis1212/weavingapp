import React from "react";
import { Divider } from "antd";
import CreatePartyForm from "../../components/partyform/CreatePartyForm";

const CreateCustomerView = () => {
  return (
    <div>
      {" "}
      <div>
        <h2 style={{ margin: 0 }}>New Supplier</h2>
      </div>
      <Divider />
      <CreatePartyForm />
    </div>
  );
};

export default CreateCustomerView;
