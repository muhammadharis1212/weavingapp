import { Button, Form, Input, Popconfirm, Table } from "antd";
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  forwardRef,
} from "react";
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
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();

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
  const selectSave = async () => {
    try {
      const values = await form.validateFields();
      console.log("Save method values : ", values);
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
          <Input
            type="number"
            ref={inputRef}
            onPressEnter={save}
            onBlur={save}
          />
        ) : (
          <CustomSelect
            list={itemsList}
            ref={inputRef}
            onBlur={selectSave}
            dataIndex={dataIndex}
            form={form}
          />
        )}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};

const TableForm = ({ tableColumns, data, itemsList, onChange, parentForm }) => {
  const [dataSource, setDataSource] = useState([data]);

  const columnDeleteButton = {
    title: "operation",
    dataIndex: "operation",
    padding: "5px",
    margin: 0,
    render: (_, record) =>
      dataSource.length >= 2 ? (
        <Popconfirm
          title="Sure to delete?"
          onConfirm={() => handleDelete(record.key)}
        >
          <Button type="link">
            <MinusCircleOutlined style={{ color: "red" }} />
          </Button>
        </Popconfirm>
      ) : (
        <div>
          <MinusCircleOutlined disabled />
        </div>
      ),
  };
  const defaultColumns = [...tableColumns, columnDeleteButton];
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
      item: "",
      account: "",
      quantity: "1.00",
      rate: "0.00",
      amount: "0.00",
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row, dataIndex) => {
    console.log(dataIndex);
    const newData = JSON.parse(JSON.stringify(dataSource));
    console.log("value : ", newData);
    // const newData = [...dataSource];

    const index = newData.findIndex((item) => {
      return row.key === item.key;
    });
    const item = newData[index];
    row.itemId = row.item.item_id;
    if (dataIndex === "item") {
      const newItem = row.item;
      console.log("item New : ", newItem);
      let quantity = parseFloat(parseFloat(row.quantity).toFixed(2));
      let rate = parseFloat(parseFloat(newItem.item_SalePrice).toFixed(2));
      const amount = parseFloat(parseFloat(quantity * rate).toFixed(2));
      row = JSON.parse(JSON.stringify({ ...row, quantity, rate, amount }));
      console.log("Row New : ", row);

      newData.splice(index, 1, {
        ...item,
        ...row,
      });
    } else if (dataIndex !== "item") {
      let quantity = parseFloat(parseFloat(row.quantity).toFixed(2));
      let rate = parseFloat(parseFloat(row.rate).toFixed(2));
      const amount = parseFloat(parseFloat(quantity * rate).toFixed(2));
      row = JSON.parse(JSON.stringify({ ...row, quantity, rate, amount }));
      console.log("Row New : ", row);

      newData.splice(index, 1, {
        ...item,
        ...row,
      });
    } else {
      let quantity = parseFloat(parseFloat(row.quantity).toFixed(2));
      let rate = parseFloat(parseFloat(row.rate).toFixed(2));
      const amount = parseFloat(parseFloat(row.amount).toFixed(2));
      row = JSON.parse(JSON.stringify({ ...row, quantity, rate, amount }));
      newData.splice(index, 1, {
        ...item,
        ...row,
      });
      console.log(newData);
    }
    console.log(newData);
    setDataSource(newData);
    onChange(newData);
  };
  const components = {
    body: {
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
        renderDropDown: col.renderDropDown,
        handleSave,
      }),
    };
  });

  return (
    <div>
      <Table
        name={"lineItems"}
        pagination={false}
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns}
      />
      <Button
        onClick={handleAdd}
        type="dashed"
        style={{
          marginTop: 10,
          marginBottom: 16,
        }}
      >
        <PlusOutlined /> Add Line Item
      </Button>
    </div>
  );
};

export default TableForm;
