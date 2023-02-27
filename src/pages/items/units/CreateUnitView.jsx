import React, { useState } from "react";
import { Button, Input, Modal } from "antd";
import { postUnit } from "../../../api/items/unit/postUnit";

const CreateUnitView = ({ open, setOpen, token }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("");
  const [text, setText] = useState("");

  const handleOk = async () => {
    setModalText("The modal will be closed after two seconds");
    await postUnit(token, text);
    setModalText("Success");
    setOpen(false);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  return (
    <>
      <Modal
        title="Create New Unit"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okButtonProps={{ disabled: !text }}
      >
        <p>{modalText}</p>
        <span>Unit Name* </span>
        <Input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default CreateUnitView;
