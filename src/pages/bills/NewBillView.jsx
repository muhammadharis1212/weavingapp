import {
  Divider,
  Form,
  Input,
  theme,
  Button,
  Alert,
  DatePicker,
  Space,
} from "antd";
import React, { useState, useEffect, useContext } from "react";
import ContentBody from "../../components/content/ContentBody";
import ContentHeader from "../../components/content/ContentHeader";
import ContentLayout from "../../components/layout/ContentLayout";
import TableForm from "../../components/tableform/TableForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../../features/items/itemsSlice";
import { AuthContext } from "../../context/AuthContext";
import { newBill } from "../../features/bills/billsSlice";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import { fetchChartAccounts } from "../../features/chartofaccounts/chartOfAccountsSlice";
import TextArea from "antd/es/input/TextArea";
import DebounceSearchSelect from "./DebounceSearchSelect";
import dayjs from "dayjs";

const NewBillView = () => {
  const navigate = useNavigate();
  const { authToken } = useContext(AuthContext);
  const [errMsg, setErrMsg] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const items = useSelector((state) => state.items.items);
  const accounts = useSelector(
    (state) => state.chartOfAccounts.chartOfAccounts
  );
  const dispatch = useDispatch();
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  //Data format for table
  const data = {
    key: 0,
    item: null,
    account: null,
    quantity: 1,
    rate: 0,
    amount: 0,
  };

  useEffect(() => {
    dispatch(fetchItems(authToken));
    dispatch(fetchChartAccounts(authToken));
  }, []);

  //columns for table
  const defaultColumns = [
    {
      title: "Item",
      dataIndex: "item",
      render: (props) => {
        return props?.title ? (
          <div>{`${props?.title}`}</div>
        ) : (
          <div>Select Item</div>
        );
      },

      editable: true,
      renderDropDown: true,
    },
    {
      title: "Account",
      dataIndex: "account",
      render: (props) =>
        props?.title ? (
          <div>{`${props?.title}`}</div>
        ) : (
          <div>Select Account</div>
        ),
      width: "25%",
      editable: true,
      renderDropDown: true,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      width: "12%",
      editable: true,
    },
    {
      title: "Rate",
      dataIndex: "rate",
      width: "12%",
      editable: true,
    },
    // {
    //   title: "Amount",
    //   dataIndex: "amount",
    //   width: "15%",
    // },
  ];

  //list for items to be displayed on custom select component
  const itemsList = items?.map((item) => ({
    ...item,
    value: item.item_id,
    label: item.item_name,
    title: item.item_name,
  }));
  const accountsList = accounts
    ?.filter((account) => account.group.rootType.name === "Expenses")
    .map((account) => ({
      ...account,
      value: account.id,
      label: account.name,
      title: account.name,
    }));
  //Form Method
  const onFinish = (values) => {
    console.log("Received values of form:", values);
    //does not contain prototype chain properties of the original object which is" values"
    //therefore cloneObject["billDate"].format() is not available on cloned Object
    const fieldsValue = structuredClone(values);
    console.log("fieldsValue : ", fieldsValue);
    //make date with 0 time value
    const billDate = new Date(values.billDate.toISOString());
    billDate.setUTCHours(0, 0, 0, 0);
    fieldsValue.billDate = billDate.toISOString();

    if (values.billDueDate) {
      let billDueDate = new Date(values.billDueDate.toISOString());
      billDueDate.setUTCHours(0, 0, 0, 0);
      fieldsValue.billDueDate = billDueDate.toISOString();
    }
    //set the status of the Bill
    fieldsValue.status = "Open";

    if (errMsg.length > 0 || !fieldsValue.billItems) {
      console.log("In if statement");
      setShowAlert((prev) => true);
    } else dispatch(newBill({ authToken, bill: fieldsValue }));
  };
  console.log("errMsg : ", errMsg);
  console.log("Show ALert : ", showAlert);
  //Date Change Handler
  const onBillDueDateChange = (date, dateString) => {};
  const disabledDate = (current) => {
    return current && current < dayjs().startOf("day");
  };
  const onBillDateChanged = (date) => {
    form.setFieldsValue({ billDate: moment(date).format("YYYY-MM-DD") });
  };
  const saveAsDraftHandler = () => {
    form.submit();
  };
  const onCancelHandler = () => {
    navigate(-1);
  };
  const onClose = (e) => {
    console.log(e, "I was closed.");
    //setErrMsg(() => []);
    setShowAlert(() => false);
  };

  return (
    <ContentLayout>
      <ContentHeader title={"New Bill"}></ContentHeader>

      <Divider style={{ margin: 0 }} />

      <ContentBody>
        <div>
          {showAlert && (
            <Alert
              message={
                errMsg.length ? (
                  errMsg.map(
                    (msg) =>
                      msg && (
                        <ul>
                          <li>{msg}</li>
                        </ul>
                      )
                  )
                ) : (
                  <ul>
                    <li>Please fill the table form.</li>
                  </ul>
                )
              }
              type="error"
              closable
              onClose={onClose}
            />
          )}
          <Form
            labelCol={{ span: 5 }}
            labelAlign="left"
            form={form}
            onFinish={onFinish}
          >
            <Form.Item
              wrapperCol={{ span: 8 }}
              name="supplierId"
              label="Supplier Name"
              required
              style={{ background: token.colorFillAlter, padding: "30px 20px" }}
              rules={[
                {
                  required: true,
                  message: "Please select a supplier",
                },
              ]}
            >
              <DebounceSearchSelect
                placeholder={"Select or Search Supplier"}
                authToken={authToken}
              />
            </Form.Item>
            <div style={{ paddingLeft: 20 }}>
              <Form.Item
                name={"billNo"}
                label="Bill#"
                required
                wrapperCol={{ span: 8 }}
                rules={[
                  {
                    required: true,
                    message: "Required",
                  },
                ]}
              >
                <Input placeholder="Bill No" />
              </Form.Item>

              <Form.Item
                wrapperCol={{ span: 4 }}
                name={"billDate"}
                label="Bill Date"
                rules={[
                  {
                    required: true,
                    message: "Required",
                  },
                ]}
              >
                <DatePicker picker="date" />
              </Form.Item>
              <Form.Item
                wrapperCol={{ span: 4 }}
                name={"billDueDate"}
                label="Due Date"
                rules={[
                  {
                    required: true,
                    message: "Required",
                  },
                ]}
              >
                <DatePicker
                  onChange={onBillDueDateChange}
                  disabledDate={disabledDate}
                  picker="date"
                />
              </Form.Item>
              {/* <Form.Item
                wrapperCol={{ span: 4 }}
                name={"paymentTerms"}
                label="Payment Terms"
              >
                <Input placeholder="Payment Terms" />
              </Form.Item> */}
            </div>
            <Divider />
            <Form.Item name={"billItems"}>
              <TableForm
                parentForm={form}
                tableColumns={defaultColumns}
                data={data}
                itemsList={itemsList}
                accountsList={accountsList}
                setErrMsg={setErrMsg}
              />
            </Form.Item>
            <div
              style={{
                background: token.colorFillAlter,
                padding: "30px 20px",
              }}
            >
              <Form.Item name={"notes"} style={{ marginBottom: 0 }}>
                <TextArea style={{ maxWidth: "50%" }} />
              </Form.Item>
              <p style={{ margin: 0, fontSize: 10, paddingLeft: 3 }}>
                It will not be shown in the pdf
              </p>
            </div>

            <Divider />
            <Form.Item style={{ marginLeft: 20 }}>
              <Space>
                <Button htmlType="submit" onClick={saveAsDraftHandler}>
                  Save as Draft
                </Button>
                <Button type="primary" htmlType="submit">
                  Save as Open
                </Button>
                <Button onClick={onCancelHandler}>Cancel</Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </ContentBody>
    </ContentLayout>
  );
};

export default NewBillView;
