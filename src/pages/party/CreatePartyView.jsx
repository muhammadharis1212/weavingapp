import {
  Divider,
  Form,
  Radio,
  Input,
  Button,
  Select,
  Row,
  Col,
  Space,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { AuthContext } from "../../context/AuthContext";
import { newParty } from "../../features/party/partySlice";
const { Option } = Select;

const CreatePartyView = () => {
  const { authToken } = useContext(AuthContext);
  const [itemType, setItemType] = useState("Individual");
  const options = [
    { label: "Individual", value: "Individual" },
    { label: "Business", value: "Business" },
  ];
  const [requiredMark, setRequiredMarkType] = useState("optional");
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const radioValueChange = ({ target: { value } }) => {
    form.setFieldsValue({ type: value });
    setItemType(value);
  };
  const onFinish = (value) => {
    console.log("Value : ", value);
    const formData = {
      salutation: value.salutation,
      firstName: value.firstName,
      lastName: value.lastName,
      type: value.type,
      role: value.role,
      address: [
        {
          addressLine1: value.address.addressLine1,
          addressLine2: value.address.addressLine2,
          city: value.address.city,
        },
      ],
      contact: [{ phone: value.contact.phone }],
    };
    console.log("FormData : ", formData);
    dispatch(newParty({ authToken: authToken, party: formData }));
  };

  const onRoleChange = (value) => {
    switch (value) {
      case "Supplier":
        form.setFieldsValue({
          role: "Supplier",
        });
        return;
      case "Customer":
        form.setFieldsValue({
          role: "Customer",
        });
        return;
      case "Both":
        form.setFieldsValue({
          role: "Both",
        });
        break;
      default:
    }
  };
  const onSalutationChange = (value) => {
    switch (value) {
      case "Mr.":
        form.setFieldsValue({
          salutation: "Mr.",
        });
        return;
      case "Mrs.":
        form.setFieldsValue({
          salutation: "Mrs.",
        });
        return;
      case "Dr.":
        form.setFieldsValue({
          salutation: "Dr.",
        });
        break;
      default:
    }
  };
  return (
    <div>
      <div>
        <h2 style={{ margin: 0 }}>New Party</h2>
      </div>
      <Divider />
      <div style={{ display: "flex" }}>
        <Form
          onFinish={onFinish}
          labelCol={{ span: 5 }}
          wrapperCol={{
            span: 15,
          }}
          labelAlign="left"
          className="create--item--form"
          form={form}
          layout="horizontal"
          initialValues={{
            requiredMarkValue: requiredMark,
          }}
        >
          <div className="item--info">
            <Form.Item
              label="Type"
              name={"type"}
              rules={[
                {
                  required: true,
                  message: "Required",
                },
              ]}
            >
              <Radio.Group
                options={options}
                onChange={radioValueChange}
                value={itemType}
                buttonStyle="solid"
                className="body--radio--group"
              />
            </Form.Item>
            <Form.Item
              label="Name"
              required
              tooltip="First Name cannot be empty"
            >
              <div style={{ display: "flex", gap: 5 }}>
                <Form.Item name={"salutation"}>
                  <Select
                    placeholder="Salutation"
                    onChange={onSalutationChange}
                  >
                    <Option value="Mr.">Mr.</Option>
                    <Option value="Mrs.">Mrs.</Option>
                    <Option value="Dr.">Dr.</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name={"firstName"}
                  rules={[
                    {
                      required: true,
                      message: "Required",
                    },
                  ]}
                >
                  <Input placeholder="First Name" />
                </Form.Item>
                <Form.Item name={"lastName"}>
                  <Input placeholder="Last Name" />
                </Form.Item>
              </div>
            </Form.Item>
            <Form.Item label="Email" name={"email"}>
              <Input placeholder="Email" type="email" />
            </Form.Item>
            <Form.Item
              name={"role"}
              required
              label="Role"
              rules={[{ required: true, message: "Role should not be empty" }]}
            >
              <Select placeholder="Select Role" onChange={onRoleChange}>
                <Option value="Supplier">Supplier</Option>
                <Option value="Customer">Customer</Option>
                <Option value="Both">Both</Option>
              </Select>
            </Form.Item>
            <Divider style={{ marginBottom: 5 }} />
            <p>Address</p>
            <Divider style={{ marginTop: 5 }} />
            <Form.Item label="Line 1" name={["address", "addressLine1"]}>
              <TextArea placeholder="Address Line 1" />
            </Form.Item>
            <Form.Item label="Line 2" name={["address", "addressLine2"]}>
              <TextArea placeholder="Address Line 2" />
            </Form.Item>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="City" name={["address", "city"]}>
                  <Input placeholder="City" />
                </Form.Item>
                <Form.Item label="State" name={["address", "state"]}>
                  <Input placeholder="State" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Country" name={["address", "country"]}>
                  <Input placeholder="Country" />
                </Form.Item>
                <Form.Item label="Postal" name={["address", "postalCode"]}>
                  <Input placeholder="Postal Code" />
                </Form.Item>
              </Col>
            </Row>
            <Divider style={{ marginBottom: 5 }} />
            <p>Contact</p>
            <Divider style={{ marginTop: 5 }} />
            <Form.Item label="Phone" name={["contact", "phone"]}>
              <Input placeholder="Phone No" />
            </Form.Item>
            <Divider />
            <Form.Item
              className="form--buttons"
              wrapperCol={15}
              style={{
                paddingBottom: 20,
                display: "flex",
                gap: 20,
              }}
            >
              <Space size={"middle"}>
                <Button
                  htmlType="submit"
                  className="btn--create"
                  type="primary"
                >
                  Create
                </Button>
                <Button type="default">Cancel</Button>
              </Space>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreatePartyView;
