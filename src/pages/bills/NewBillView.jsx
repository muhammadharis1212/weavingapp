import {
  Divider,
  Form,
  Input,
  Select,
  theme,
  Button,
  Table,
  Popconfirm,
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

const NewBillView = () => {
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
    quantity: 1,
    rate: 0,
    amount: 0,
  };
  //list for items to be displayed on custom select component
  const itemsList = items?.map((item) => ({
    ...item,
    value: item.item_id,
    label: item.item_name,
    title: item.item_name,
  }));

  //Form Methods
  const onFinish = (values) => {
    console.log("Received values of form:", values);
    console.log(form.getFieldsValue());
  };
  //Form submit method

  return (
    <ContentLayout>
      <ContentHeader title={"New Bill"}> </ContentHeader>
      <Divider style={{ margin: 0 }} />
      <ContentBody>
        <div>
          <Form form={form} onFinish={onFinish}>
            <Form.Item
              name="supplierId"
              label="Vendor Name"
              required
              style={{ background: token.colorFillAlter, padding: "30px 0px" }}
            >
              <CustomSelect list={suppliersList} />
            </Form.Item>
            <Form.Item name={"billNo"} label="Bill#" required>
              <Input placeholder="Bill No" />
            </Form.Item>
            <Form.Item name={"wareHouseName"} label="Warehouse Name" required>
              <Input placeholder="Warehouse Name" />
            </Form.Item>
            <Form.Item name={"billDate"} label="Bill Date" required>
              <Input placeholder="Date when bill issued" />
            </Form.Item>
            <Form.Item name={"dueDate"} label="Due Date">
              <Input placeholder="Due Date" />
            </Form.Item>
            <Form.Item name={"paymentTerms"} label="Payment Terms">
              <Input placeholder="Payment Terms" />
            </Form.Item>
            <Divider />
            <Form.Item name={"itemsList"}>
              <TableForm
                parentForm={form}
                tableColumns={defaultColumns}
                data={data}
                itemsList={itemsList}
              />
            </Form.Item>

            <Divider />
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>
        </div>
      </ContentBody>
    </ContentLayout>
  );
};

export default NewBillView;
