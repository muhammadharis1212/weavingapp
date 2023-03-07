import {
  Button,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  theme,
} from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import CustomSelect from "../../components/customselect/CustomSelect";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import "./tableForm.scss";

const EditableContext = React.createContext(null);
const EditableRow = ({ index, parentForm, ...props }) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Received values of editable table form:", values);
  };
  return (
    <Form form={form} component={false} onFinish={onFinish}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  itemsList,
  accountsList,
  renderDropDown,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    console.log("In toggle Edit : ", { [dataIndex]: record[dataIndex] });
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      console.log("validateFields : ", values);
      toggleEdit();
      handleSave(
        {
          ...record,
          ...values,
        },
        dataIndex
      );
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
          width: "100%",
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        {!renderDropDown ? (
          <InputNumber
            controls={false}
            ref={inputRef}
            onPressEnter={save}
            onBlur={save}
          />
        ) : (
          <CustomSelect
            list={dataIndex === "item" ? itemsList : accountsList}
            ref={inputRef}
            onBlur={save}
            dataIndex={dataIndex}
            form={form}
          />
        )}
      </Form.Item>
    ) : (
      <div
        className={`editable-cell-value-wrap editable-cell-value-wrap-${dataIndex}`}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};

const TableForm = ({
  tableColumns,
  data,
  itemsList,
  accountsList,
  onChange,
  parentForm,
  setErrMsg,
}) => {
  const { token } = theme.useToken();
  const [dataSource, setDataSource] = useState([data]);
  //for calculating total and subtotal to display on page
  const [calTotal, setCalTotal] = useState({ subTotal: 0, total: 0 });
  const columnAmountCell = {
    title: "Amount",
    dataIndex: "amount",
    margin: 0,
    width: "15%",
    render: (_, record) => {
      return (
        <div className="amount--column">
          <strong>{`${record.amount}`}</strong>
        </div>
      );
    },
  };
  const columnDeleteButton = {
    title: "X",
    dataIndex: "operation",
    margin: 0,
    width: 20,
    render: (_, record) =>
      dataSource.length >= 2 ? (
        <div className="operation--button">
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <Button
              type="link"
              icon={<MinusCircleOutlined style={{ color: "red" }} />}
            ></Button>
          </Popconfirm>
        </div>
      ) : (
        <div className="operation--button">
          <Button
            type="link"
            disabled={true}
            icon={<MinusCircleOutlined disabled />}
          ></Button>
        </div>
      ),
  };
  const defaultColumns = [
    ...tableColumns,
    columnAmountCell,
    columnDeleteButton,
  ];
  //row counter
  const [count, setCount] = useState(1);
  //table row data

  //method to delete row data
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  //method to add new table row on button press
  const handleAdd = () => {
    const newData = {
      key: count,
      item: null,
      account: null,
      quantity: 1,
      rate: 0,
      amount: 0,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row, dataIndex) => {
    console.log("Row in handleSave : ", row);
    const newData = [...dataSource];

    const index = newData.findIndex((item) => {
      return row.key === item.key;
    });
    const item = newData[index];

    //if item is selected on the form
    if (dataIndex === "item") {
      row.itemId = row.item.item_id;
      const newItem = row.item;
      console.log("item New : ", newItem);
      let quantity = parseFloat(row.quantity);
      let rate = parseFloat(newItem.salePrice);
      const amount = parseFloat(quantity * rate);
      //check if account from the server matches the account in the item object
      //then assign the account else account remain empty
      if (
        accountsList?.find(
          (element) => element.id === newItem.purchaseAccountId
        )
      ) {
        const account = accountsList.find(
          (element) => element.id === newItem.purchaseAccountId
        );
        row = JSON.parse(
          JSON.stringify({ ...row, account, quantity, rate, amount })
        );
      } else {
        row = JSON.parse(
          JSON.stringify({ ...row, account: null, quantity, rate, amount })
        );
      }

      newData.splice(index, 1, {
        ...item,
        ...row,
      });
    } else if (dataIndex === "account") {
      console.log("In elseIf statement where dataIndex is account");
      let quantity = parseFloat(row.quantity);
      let rate = parseFloat(row.rate);
      const amount = parseFloat(quantity * rate);
      row = JSON.parse(
        JSON.stringify({
          ...row,
          quantity,
          rate,
          amount,
          accountId: row.account.id,
        })
      );
      console.log("Row New : ", row);

      newData.splice(index, 1, {
        ...item,
        ...row,
      });
    } else {
      console.log("In else statement");
      let quantity = parseFloat(row.quantity);
      let rate = parseFloat(row.rate);
      const amount = parseFloat(quantity * rate);
      row = JSON.parse(JSON.stringify({ ...row, quantity, rate, amount }));
      newData.splice(index, 1, {
        ...item,
        ...row,
      });
    }
    console.log("newData : ", newData);
    setDataSource(newData);
    //calculate subTotal and total
    setCalTotal((prev) => {
      const subTotal = newData.reduce((prev, curr) => {
        return (prev += curr.amount);
      }, 0);
      console.log("SubTotal : ", subTotal);
      return {
        ...prev,
        subTotal,
        total: subTotal + parentForm.getFieldValue("adjustment"),
      };
    });

    //send data to form which is needed
    const resultArray = newData.map((element) => {
      const { item, account, quantity, rate, amount } = element;
      return {
        itemId: item?.item_id,
        accountId: account?.id,
        quantity,
        rate,
        amount,
      };
    });
    console.log("RESULT : ", resultArray);
    onChange(resultArray);

    validateFormData(resultArray, setErrMsg);
  };
  //set ErrMsg to display alert on NewBillView.jsx
  const validateFormData = (resultArray, setErrMsg) => {
    const errMsg = [];
    resultArray.forEach((element) => {
      if (!element.itemId) errMsg[0] = "Please Select Item";
      if (!element.accountId) errMsg[1] = "Please Select Account";
      if (!element.quantity || element.quantity <= 0)
        errMsg[2] = "Quantity should be greater than 0";
      if (!element.rate || element.rate <= 0)
        errMsg[3] = "Rate should be greater than 0";
    });

    console.log(errMsg);
    setErrMsg([...errMsg]);
  };
  const components = {
    body: {
      //passed form object from upper component
      row: (props) => <EditableRow parentForm={parentForm} {...props} />,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        itemsList: itemsList,
        accountsList: accountsList,
        renderDropDown: col.renderDropDown,
        handleSave,
      }),
    };
  });

  //Adjustment Handler
  const adjustmentHandler = (value) => {
    console.log("Value : ", value);
    setCalTotal((prev) => {
      return { ...prev, total: prev.subTotal + value };
    });
    //parentForm.setFieldValue({ adjustment: parseFloat(e.target.value) });
  };

  console.log("calc ; ", calTotal);

  return (
    <div className="table--form">
      <Table
        name={"lineItems"}
        pagination={false}
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns}
      />
      <div className="table--bottom">
        <Button
          onClick={handleAdd}
          type="dashed"
          // style={{
          //   marginTop: 30,
          //   marginBottom: 20,
          //   marginLeft: 20,
          // }}
        >
          <PlusOutlined /> Add Line Item
        </Button>
        <div
          className="card--container"
          style={{ background: token.colorFillAlter }}
        >
          <div className="subtotal">
            <p>Sub Total</p>
            <p>{calTotal.subTotal}</p>
          </div>
          <div className="adjustment">
            <p>Adjustment</p>
            <Form.Item
              style={{ margin: 0, padding: 0 }}
              name={"adjustment"}
              initialValue={0}
            >
              <InputNumber
                placeholder="Adjustments"
                onChange={adjustmentHandler}
              />
            </Form.Item>
            <p>{parentForm.getFieldValue("adjustment")}</p>
          </div>
          <div className="total">
            <p>Total</p>
            <p>
              <strong>{calTotal.total}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableForm;
