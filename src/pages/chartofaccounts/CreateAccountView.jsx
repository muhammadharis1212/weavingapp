import React from "react";
import { Modal, message, Form, Input, Divider, Select } from "antd";
import { useState, useEffect } from "react";
import TextArea from "antd/es/input/TextArea";
import { getAccountGroups } from "../../api/chartofaccounts/accountgroups/getAccountGroups";

const CreateAccountView = ({ open, setOpen, token, setFetchFlag }) => {
  const [groups, setGroups] = useState([]);
  console.log(groups);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Success",
    });
  };
  const error = () => {
    messageApi.open({
      type: "error",
      content: "Failed",
    });
  };
  //Model Component
  const handleOk = () => {
    setConfirmLoading(true);
    error();
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      success();
      setFetchFlag((prev) => !prev);
    }, 2000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  //Select Component
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  useEffect(() => {
    (async () => {
      const data = await getAccountGroups(token);
      setGroups(() => data);
    })();
  }, [token]);

  return (
    <>
      {contextHolder}
      <Modal
        title="Create Account"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Divider />
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{
            span: 12,
          }}
          labelAlign="left"
          form={form}
          layout="horizontal"
        >
          <Form.Item label="Account Type" required>
            <Select
              showSearch
              placeholder="Select type"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                {
                  label: "Assets",
                  options: groups
                    .filter((group) => group.rootType.name === "Assets")
                    .map((group) => {
                      return { label: group.name, value: group.id };
                    }),
                },
                {
                  label: "Equity",
                  options: groups
                    .filter((group) => group.rootType.name === "Equity")
                    .map((group) => {
                      return { label: group.name, value: group.id };
                    }),
                },
                {
                  label: "Liabilities",
                  options: groups
                    .filter((group) => group.rootType.name === "Liabilities")
                    .map((group) => {
                      return { label: group.name, value: group.id };
                    }),
                },
                {
                  label: "Revenue",
                  options: groups
                    .filter((group) => group.rootType.name === "Revenue")
                    .map((group) => {
                      return { label: group.name, value: group.id };
                    }),
                },
                {
                  label: "Expense",
                  options: groups
                    .filter((group) => group.rootType.name === "Expenses")
                    .map((group) => {
                      return { label: group.name, value: group.id };
                    }),
                },
              ]}
            />
          </Form.Item>
          <Form.Item label="Account Name" required>
            <Input />
          </Form.Item>
          <Form.Item label="Code" wrapperCol={{ span: 8 }}>
            <Input />
          </Form.Item>
          <Form.Item label="Description">
            <TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateAccountView;
