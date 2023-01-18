import React from "react";
import { useSelector } from "react-redux";
import { Select, Button, Divider } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const UnitListView = ({ setOpen }) => {
  const unit = useSelector((state) => state.itemUnits);
  const { units } = unit;

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  const list = units?.map((unit) => {
    return { value: unit.unit_id, label: unit.unit_name };
  });
  return (
    <Select
      style={{
        width: 130,
      }}
      showSearch
      placeholder="Select unit"
      optionFilterProp="children"
      onChange={onChange}
      onSearch={onSearch}
      filterOption={(input, option) =>
        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
      }
      options={list}
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider
            style={{
              margin: "8px 0",
            }}
          />
          <Button
            type="text"
            icon={<PlusOutlined />}
            onClick={() => setOpen((prev) => !prev)}
            style={{
              width: "100%",
            }}
          >
            Add Unit
          </Button>
        </>
      )}
    />
  );
};

export default UnitListView;
