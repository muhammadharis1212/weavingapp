import React from "react";
import { useSelector } from "react-redux";
import { Select, Button, Divider } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const UnitListView = ({ ...props }) => {
  const unit = useSelector((state) => state.itemUnits);
  const { units } = unit;

  const onChange = (value) => {
    props.onChange(value.label);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  const list = units?.map((unit) => {
    return { value: unit.unit_id, label: unit.unit_name };
  });
  return (
    <Select
      labelInValue
      style={{
        width: 130,
      }}
      getPopupContainer={(trigger) => trigger.parentNode}
      showSearch
      placeholder="Select Unit"
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
            onClick={() => props.setOpen((prev) => !prev)}
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
