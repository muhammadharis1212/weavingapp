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
import { useNavigate } from "react-router-dom";
import { fetchChartAccounts } from "../../features/chartofaccounts/chartOfAccountsSlice";
import TextArea from "antd/es/input/TextArea";
import DebounceSearchSelect from "./DebounceSearchSelect";
import dayjs from "dayjs";
import { createSearchParams } from "react-router-dom";
import { fetchSuppliers } from "../../features/suppliers/suppliersSlice";

const NewBillView = () => {
  const navigate = useNavigate();
  const { authToken } = useContext(AuthContext);
  const [errMsg, setErrMsg] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const items = useSelector((state) => state.items.items);
  const accounts = useSelector(
    (state) => state.chartOfAccounts.chartOfAccounts
  );
  const suppliers = useSelector((state) => state.suppliers);
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
    dispatch(fetchSuppliers(authToken));
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

    if (errMsg.length > 0 || !fieldsValue.billItems) {
      setShowAlert((prev) => true);
    } else dispatch(newBill({ authToken, bill: fieldsValue }));
    if (errMsg.length === 0) {
      // navigate(`/bills`, {
      //   state: { editStatus: "success" },
      //   replace: true,
      // });
      navigate(
        {
          pathname: "/bills",
          search: createSearchParams({
            filter_by: "Status.All",
            per_page: "2",
            page: "1",
            sort_column: "createdAt",
            sort_order: "desc",
          }).toString(),
        },
        { state: { editStatus: "success" }, replace: true }
      );
    }
  };

  //Date Change Handler
  const onBillDueDateChanged = (date, dateString) => {
    console.log(date.toISOString());
  };
  const disabledDate = (current) => {
    const date = form.getFieldValue("billDate");
    if (date) return date && current < dayjs(date);
    else return current && current < dayjs().startOf("day");
  };
  const onBillDateChanged = (date) => {
    console.log("Bill date : ", date);
    form.setFieldValue("billDueDate", date);
  };
  const saveAsDraftHandler = (value) => {
    console.log("Value : ", value);
    form.setFieldValue("status", "DRAFT");
    form.submit();
  };
  const saveAsOpenHandler = (e) => {
    form.setFieldValue("status", "OPEN");
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
              name="status"
              style={{ margin: "-16px", marginRight: "0px", padding: 0 }}
            >
              <Input type="hidden" />
            </Form.Item>
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
                options={(suppliers?.suppliers || []).map((d) => {
                  const fullName = `${d?.firstName} ${
                    d.lastName ? d?.lastName : ""
                  }`;
                  return {
                    value: d.id,
                    label: fullName,
                  };
                })}
                isLoading={suppliers.isLoading}
              />
            </Form.Item>
            <div style={{ paddingLeft: 20 }}>
              <Form.Item
                name={"billNo"}
                label="Bill#"
                required
                wrapperCol={{ span: 6 }}
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
                wrapperCol={{ span: 10 }}
                name={"billDate"}
                label="Bill Date"
                rules={[
                  {
                    required: true,
                    message: "Required",
                  },
                ]}
              >
                <DatePicker picker="date" onChange={onBillDateChanged} />
              </Form.Item>
              <Form.Item
                wrapperCol={{ span: 10 }}
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
                  onChange={onBillDueDateChanged}
                  disabledDate={disabledDate}
                  picker="date"
                />
              </Form.Item>
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
              <div style={{ marginBottom: 5 }}>Notes</div>
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
                <Button onClick={saveAsDraftHandler}>Save as Draft</Button>
                <Button onClick={saveAsOpenHandler} type="primary">
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
