import React, { useContext, useEffect, useState } from "react";
import { Input, Radio, Divider, Form, Col, Row, Select, Button } from "antd";
import { AuthContext } from "../../context/AuthContext";
import { getAllUnits } from "../../api/items/unit/getAllUnits";
import UnitListView from "./UnitListView";
import { useDispatch, useSelector } from "react-redux";
import { getUnits } from "../../features/items/units/unitsSlice";
import CreateUnitView from "./units/CreateUnitView";
import "./createItem.scss";

const CreateItem = () => {
  const unit = useSelector((state) => state.itemUnits);
  const [selectedUnit, setSelectedUnit] = useState("");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { token } = useContext(AuthContext);
  const [itemType, setItemType] = useState("Goods");
  const [isSelected, setIsSelected] = useState(false);
  const options = [
    { label: "Goods", value: "Goods" },
    { label: "Service", value: "Service" },
  ];

  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState("optional");
  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  const radioValueChange = ({ target: { value } }) => {
    console.log("Radio Value : ", value);
    setItemType(value);
  };
  const handleClick = async () => {
    setIsSelected(!isSelected);
    const res = await getAllUnits(token);
  };
  useEffect(() => {
    dispatch(getUnits(token));
  }, []);

  return (
    <div className="createItem--container">
      <div>
        <h2>New Item</h2>
      </div>
      <Divider className="divider" />
      <div className="createItem--body">
        <Form
          labelCol={{ span: 8 }}
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
          onValuesChange={onRequiredTypeChange}
        >
          <div className="item--info">
            <Form.Item label="Type">
              <Radio.Group
                options={options}
                onChange={radioValueChange}
                value={itemType}
                optionType="button"
                buttonStyle="solid"
                className="body--radio--group"
              />
            </Form.Item>
            <Form.Item label="Name" required tooltip="This is a required field">
              <Input />
            </Form.Item>
            <Form.Item label="SKU" required tooltip="This is a required field">
              <Input />
            </Form.Item>
            <Form.Item
              label="Unit"
              tooltip="This is a required field"
              requiredMark={"optional"}
            >
              <UnitListView setOpen={setOpen} />
              {open && (
                <CreateUnitView open={open} setOpen={setOpen} token={token} />
              )}
            </Form.Item>
          </div>
          <Row gutter={32}>
            <Col span={"8"}>
              <p>Sales Information</p>
              <Form.Item required label="Selling Price">
                <Input />
              </Form.Item>
              <Form.Item required label="Account">
                <Select />
              </Form.Item>
              <Form.Item label="Description">
                <Input />
              </Form.Item>
            </Col>
            <Col span={"8"} offset={2}>
              <p>Purchase Information</p>
              <Form.Item required label="Cost Price">
                <Input />
              </Form.Item>
              <Form.Item required label="Account">
                <Select />
              </Form.Item>
              <Form.Item label="Description">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Divider className="divider" />
          <Form.Item className="form--buttons" wrapperCol={15}>
            <Button className="btn--create" type="primary">
              Create
            </Button>
            <Button type="default">Cancel</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreateItem;
