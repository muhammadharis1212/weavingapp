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
  Spin,
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
import {
  editItemById,
  fetchItemById,
  newItem,
} from "../../features/items/itemsSlice";
import { useNavigate, useParams } from "react-router-dom";

const EditItemView = () => {
  const { authToken } = useContext(AuthContext);
  const params = useParams();
  const nameRef = useRef();
  const unit = useSelector((state) => state.itemUnits);
  const item = useSelector((state) => state.items);
  const [itemData] = item.items;
  const accounts = useSelector((state) => state.chartOfAccounts);
  const [selectedUnit, setSelectedUnit] = useState("");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [itemType, setItemType] = useState("Goods");
  const [isSelected, setIsSelected] = useState(false);
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState("optional");
  //for button loading state
  const [loadings, setLoadings] = useState(false);

  useEffect(() => {
    if (nameRef.current) {
      nameRef.current.focus();
    }
    dispatch(getUnits(authToken));
    dispatch(fetchChartAccounts(authToken));
    dispatch(fetchItemById({ authToken, itemId: params.id }));
  }, [nameRef]);

  const options = [
    { label: "Goods", value: "Goods" },
    { label: "Service", value: "Service" },
  ];

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
  const onFinish = async (values) => {
    console.log("Form Values : ", values);
    if (
      typeof values.salePrice === "string" ||
      typeof values.purchasePrice === "string"
    ) {
      const salePrice = parseFloat(values.salePrice);
      console.log(salePrice);
      const purchasePrice = parseFloat(values.purchasePrice);
      dispatch(
        editItemById({
          authToken,
          itemId: params.id,
          reqObject: { ...values, salePrice, purchasePrice },
        })
      );
    } else {
      dispatch(
        editItemById({ authToken, itemId: params.id, reqObject: values })
      );
    }
    setLoadings((prev) => !prev);
    if (!item.error) {
      console.log("item error : ", item.error);
      navigate(`/items/${params.id}`, {
        state: { editStatus: "success" },
        replace: true,
      });
    }
  };

  //button loading method
  const btnLoading = () => {
    setLoadings((prev) => !prev);
  };
  return (
    <ContentLayout>
      {item.isLoading ? (
        <Spin size="large" />
      ) : (
        <>
          <ContentHeader title={"New Item"} />
          <Divider style={{ margin: 0 }} />
          <ContentBody paddingTop={20} paddingLeft={20}>
            {item.items.length && (
              <Form
                autoCapitalize="true"
                onFinish={onFinish}
                labelCol={{ span: 8 }}
                wrapperCol={{
                  span: 12,
                }}
                labelAlign="left"
                form={form}
                layout="horizontal"
                initialValues={itemData}
                onValuesChange={onRequiredTypeChange}
              >
                <Form.Item
                  labelCol={{ span: 4 }}
                  label="Type"
                  name={"item_type"}
                >
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
                  <CreateUnitView
                    open={open}
                    setOpen={setOpen}
                    token={authToken}
                  />
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
                                        account.group.rootType.name ===
                                        "Revenue"
                                      );
                                    })
                                    .map((group) => {
                                      return {
                                        label: group.name,
                                        value: group.id,
                                      };
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
                    <Form.Item
                      required
                      name={"purchaseAccountId"}
                      label="Account"
                    >
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
                                        account.group.rootType.name ===
                                          "Expenses" &&
                                        account.group.name !==
                                          "Cost of Goods Sold"
                                      );
                                    })
                                    .map((group) => {
                                      return {
                                        label: group.name,
                                        value: group.id,
                                      };
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
                    <Button
                      htmlType="submit"
                      className="btn--create"
                      type="primary"
                      loading={loadings}
                      onClick={btnLoading}
                    >
                      Save
                    </Button>
                    <Button type="default" onClick={() => navigate(-1)}>
                      Cancel
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            )}
          </ContentBody>
        </>
      )}
    </ContentLayout>
  );
};

export default EditItemView;
