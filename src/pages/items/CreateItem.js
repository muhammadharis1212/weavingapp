import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Input,
  Radio,
  Divider,
  Form,
  Col,
  Row,
  Select,
  Button,
  InputNumber,
  Space,
} from "antd";
import { AuthContext } from "../../context/AuthContext";
import { getAllUnits } from "../../api/items/unit/getAllUnits";
import UnitListView from "./UnitListView";
import { useDispatch, useSelector } from "react-redux";
import { getUnits } from "../../features/items/units/unitsSlice";
import CreateUnitView from "./units/CreateUnitView";
import { fetchChartAccounts } from "../../features/chartofaccounts/chartOfAccountsSlice";
import ContentLayout from "../../components/layout/ContentLayout";
import ContentHeader from "../../components/content/ContentHeader";
import ContentBody from "../../components/content/ContentBody";
import TextArea from "antd/es/input/TextArea";
import { newItem } from "../../features/items/itemsSlice";

const CreateItem = () => {
  const { authToken } = useContext(AuthContext);
  const nameRef = useRef();
  const unit = useSelector((state) => state.itemUnits);
  const accounts = useSelector((state) => state.chartOfAccounts);
  const [selectedUnit, setSelectedUnit] = useState("");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
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
    form.setFieldsValue({ item_type: value });
  };
  const handleClick = async () => {
    setIsSelected(!isSelected);
    const res = await getAllUnits(authToken);
  };
  useEffect(() => {
    if (nameRef.current) {
      nameRef.current.focus();
    }
    dispatch(getUnits(authToken));
    dispatch(fetchChartAccounts(authToken));
  }, [nameRef]);

  //Input Number change event
  const onInputNumberChange = (value) => {
    console.log("changed", value);
    //return parseFloat(value);
  };
  //Select Component
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };
  //antd form submit method
  const onFinish = (values) => {
    console.log("Form Values : ", values);
    console.log({ item: values });
    dispatch(newItem({ authToken, item: values }));
  };

  return (
    <ContentLayout>
      <ContentHeader title={"New Item"} />
      <Divider style={{ margin: 0 }} />
      <ContentBody paddingLeft={20}>
        <Form
          onFinish={onFinish}
          labelCol={{ span: 8 }}
          wrapperCol={{
            span: 12,
          }}
          labelAlign="left"
          form={form}
          layout="horizontal"
          initialValues={{
            requiredMarkValue: requiredMark,
          }}
          onValuesChange={onRequiredTypeChange}
        >
          <Form.Item labelCol={{ span: 4 }} label="Type" name={"item_type"}>
            <Radio.Group
              options={options}
              onChange={radioValueChange}
              value={itemType}
              optionType="button"
              buttonStyle="solid"
            />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              span: 8,
            }}
            labelCol={{ span: 4 }}
            name={"item_name"}
            label="Name"
            required
          >
            <Input ref={nameRef} />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              span: 8,
            }}
            labelCol={{ span: 4 }}
            name={"item_sku"}
            label="SKU"
            required
            tooltip="Stock Keeping Unit"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"unit_name"}
            label="Unit"
            tooltip="This is a required field"
            wrapperCol={{
              span: 8,
            }}
            labelCol={{ span: 4 }}
          >
            <UnitListView setOpen={setOpen} />
          </Form.Item>
          {open && (
            <CreateUnitView open={open} setOpen={setOpen} token={authToken} />
          )}
          <Row>
            <Divider style={{ margin: 0 }} />
            <Col span={"12"}>
              <p style={{ fontWeight: "bold", fontSize: 16 }}>
                Sales Information
              </p>

              <Form.Item
                required
                name={"salePrice"}
                label="Selling Price"
                rules={[
                  {
                    required: true,
                    message: "Please input sale price",
                  },
                ]}
              >
                <InputNumber
                  onChange={onInputNumberChange}
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item required name={"saleAccountId"} label="Account">
                <Select
                  showSearch
                  placeholder="Select Account"
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
                      label: "Income",
                      options:
                        accounts.chartOfAccounts.length > 0
                          ? accounts.chartOfAccounts
                              .filter((account) => {
                                return (
                                  account.group.rootType.name === "Revenue"
                                );
                              })
                              .map((group) => {
                                return { label: group.name, value: group.id };
                              })
                          : [],
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item name={"saleDescription"} label="Description">
                <TextArea />
              </Form.Item>
            </Col>
            <Col span={"12"}>
              <p style={{ fontWeight: "bold", fontSize: 16 }}>
                Purchase Information
              </p>
              <Form.Item
                required
                name={"purchasePrice"}
                label="Purchase Price"
                rules={[
                  {
                    required: true,
                    message: "Please input purchase price",
                  },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  onChange={onInputNumberChange}
                />
              </Form.Item>
              <Form.Item required name={"purchaseAccountId"} label="Account">
                <Select
                  showSearch
                  placeholder="Select Account"
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
                      label: "Expense",
                      options:
                        accounts.chartOfAccounts.length > 0
                          ? accounts.chartOfAccounts
                              .filter((account) => {
                                return (
                                  account.group.rootType.name === "Expenses" &&
                                  account.group.name !== "Cost of Goods Sold"
                                );
                              })
                              .map((group) => {
                                return { label: group.name, value: group.id };
                              })
                          : [],
                    },
                    {
                      label: "Cost of Goods Sold",
                      options:
                        accounts.chartOfAccounts.length > 0
                          ? accounts.chartOfAccounts
                              .filter(
                                (account) =>
                                  account.name === "Cost of Goods Sold"
                              )
                              .map((account) => ({
                                label: account.name,
                                value: account.id,
                              }))
                          : [],
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item name={"purchaseDescription"} label="Description">
                <TextArea />
              </Form.Item>
            </Col>
          </Row>
          <Divider className="divider" />
          <Form.Item className="form--buttons" wrapperCol={15}>
            <Space>
              <Button htmlType="submit" className="btn--create" type="primary">
                Create
              </Button>
              <Button type="default">Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      </ContentBody>
    </ContentLayout>
  );
};

export default CreateItem;
