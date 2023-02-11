import {
  Divider,
  Form,
  Input,
  Select,
  theme,
  Button,
  Table,
  Popconfirm,
  DatePicker,
} from "antd";
import React, {
  useRef,
  useState,
  useEffect,
  useContext,
  createContext,
} from "react";
import ContentBody from "../../components/content/ContentBody";
import ContentHeader from "../../components/content/ContentHeader";
import ContentLayout from "../../components/layout/ContentLayout";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import CustomSelect from "../../components/customselect/CustomSelect";
import TableForm from "../../components/tableform/TableForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../../features/items/itemsSlice";
import { AuthContext } from "../../context/AuthContext";
import { fetchSuppliers } from "../../features/suppliers/suppliersSlice";
import { newBill } from "../../features/bills/billsSlice";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";

const NewBillView = () => {
  const navigate = useNavigate();
  const { authToken } = useContext(AuthContext);
  const suppliers = useSelector((state) => state.suppliers.suppliers);
  const items = useSelector((state) => state.items.items);
  const dispatch = useDispatch();
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  useEffect(() => {
    dispatch(fetchItems(authToken));
    dispatch(fetchSuppliers(authToken));
  }, []);
  //suppliers list for select component
  const suppliersList = suppliers?.map((supplier) => ({
    ...supplier,
    value: supplier.id,
    label: supplier?.lastName
      ? `${supplier.firstName} ${supplier.lastName}`
      : supplier.firstName,
  }));

  //columns for table
  const defaultColumns = [
    {
      title: "Item",
      dataIndex: "item",
      render: ({ title }) => {
        return title ? <div>{`${title}`}</div> : <div></div>;
      },
      width: "30%",
      editable: true,
      renderDropDown: true,
    },
    {
      title: "Account",
      dataIndex: "account",
      render: ({ title }) => (title ? <div>{`${title}`}</div> : <div></div>),
      width: "25%",
      editable: true,
      renderDropDown: true,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      width: "10%",
      editable: true,
    },
    {
      title: "Rate",
      dataIndex: "rate",
      width: "10%",
      editable: true,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      width: "15%",
    },
  ];
  //Data format for table
  const data = {
    key: 0,
    item: {},
    account: {},
    quantity: "1.00",
    rate: "0.00",
    amount: "0.00",
  };
  //list for items to be displayed on custom select component
  const itemsList = items?.map((item) => ({
    ...item,
    value: item.item_id,
    label: item.item_name,
    title: item.item_name,
  }));

  //Form Method
  const onFinish = (fieldsValue) => {
    console.log("Received values of form:", fieldsValue);
    //does not contain prototype chain properties of the original object which is fieldsValue
    //therefore cloneObject["billDate"].format() is not available on cloned Object
    const clonedObject = structuredClone(fieldsValue);
    const bill = {
      ...clonedObject,
      status: "Open",
      supplierId: fieldsValue.supplier?.id,
      billDate: fieldsValue["billDate"].toISOString(),
      dueDate: fieldsValue["billDueDate"]?.format("YYYY-MM-DD"),
    };
    console.log("Bill : ", bill);
    dispatch(newBill({ authToken, bill }));
  };
  //Date Change Handler
  const onDateChange = (date, dateString) => {
    console.log(date, dateString);
    console.log(moment(date).format("YYYY-MM-DD"));
    const newDate = moment(date).format("YYYY-MM-DD");
    form.setFieldsValue({ billDate: newDate });
  };
  const setBillDateField = (date) => {
    form.setFieldsValue({ billDate: moment(date).format("YYYY-MM-DD") });
  };
  const saveAsDraftHandler = () => {
    form.submit();
  };
  const onCancelhandler = () => {
    navigate(-1);
  };

  return (
    <ContentLayout>
      <ContentHeader title={"New Bill"}></ContentHeader>

      <Divider style={{ margin: 0 }} />

      <ContentBody>
        <div>
          <Form
            labelCol={{ span: 5 }}
            labelAlign="left"
            form={form}
            onFinish={onFinish}
          >
            <Form.Item
              wrapperCol={{ span: 8 }}
              name="supplier"
              label="Vendor Name"
              required
              style={{ background: token.colorFillAlter, padding: "30px 0px" }}
              // rules={[
              //   {
              //     required: true,
              //     message: "Required",
              //   },
              // ]}
            >
              <CustomSelect list={suppliersList} />
            </Form.Item>
            <Form.Item
              name={"billNo"}
              label="Bill#"
              required
              wrapperCol={{ span: 8 }}
              // rules={[
              //   {
              //     required: true,
              //     message: "Required",
              //   },
              // ]}
            >
              <Input placeholder="Bill No" />
            </Form.Item>
            <Form.Item
              wrapperCol={{ span: 8 }}
              name={"wareHouseName"}
              label="Warehouse Name"
              required
            >
              <Input placeholder="Warehouse Name" />
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
            >
              <DatePicker picker="date" />
            </Form.Item>
            <Form.Item
              wrapperCol={{ span: 4 }}
              name={"paymentTerms"}
              label="Payment Terms"
            >
              <Input placeholder="Payment Terms" />
            </Form.Item>
            <Divider />
            <Form.Item name={"billItems"}>
              <TableForm
                parentForm={form}
                tableColumns={defaultColumns}
                data={data}
                itemsList={itemsList}
              />
            </Form.Item>
            <div
              style={{
                marginLeft: "auto",
                marginTop: -20,
                width: "50%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: 20,
                background: token.colorFillAlter,
                borderRadius: 10,
              }}
            >
              <Form.Item>
                <Input type="number" placeholder="Discount" />
              </Form.Item>
              <Form.Item>
                <Input type="number" placeholder="Adjustments" />
              </Form.Item>
            </div>
            <Divider />
            <Form.Item>
              <Button htmlType="submit" onClick={saveAsDraftHandler}>
                Save as Draft
              </Button>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
              <Button onClick={onCancelhandler}>Cancel</Button>
            </Form.Item>
          </Form>
        </div>
      </ContentBody>
    </ContentLayout>
  );
};

export default NewBillView;
