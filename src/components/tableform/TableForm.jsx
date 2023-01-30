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
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Received values of form:", values);
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
      //does not work on custom select component that I made. "values" variable remains
      // empty on Select component, but works on Input component.
      const values = await form.validateFields();
      console.log("Save Method values : ", values);
      console.log("Save method record : ", record);
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };
  const selectSave = async () => {
    try {
      //does not work on custom select component that I made. "values" variable remains
      // empty on Select component, but works on Input component.
      const values = await form.validateFields();
      console.log("Save Method values : ", values);
      console.log("Save method record : ", record);
      toggleEdit();
      console.log("form getfieldValue", form.getFieldValue("item"));
      console.log("Object Layout : ", {
        ...record,
        ...values,
      });
      handleSave({
        ...record,
        ...values,
      });
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
        {dataIndex === "quantity" ? (
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
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

const TableForm = ({ tableColumns, data, itemsList }) => {
  const [dataSource, setDataSource] = useState([data]);
  console.log("Table Form dataSource", dataSource);
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
      quantity: 1,
      rate: 0,
      amount: 0,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    console.log(
      "handleSave newData : ",
      newData.splice(index, 1, {
        ...item,
        ...row,
      })
    );
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };
  const components = {
    body: {
      row: EditableRow,
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
        handleSave,
      }),
    };
  });

  return (
    <div>
      <Table
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
