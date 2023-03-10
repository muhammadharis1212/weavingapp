import React, { forwardRef } from "react";
import { Select, Button, Divider } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const CustomSelect = forwardRef(({ ...props }, ref) => {
  const onChange = (value) => {
    console.log("Custom Select Value : ", value);
    const newValue = props?.list.filter((obj) => value.value === obj.value);
    //auto passed by Form.Item
    props.onChange(newValue[0]);
  };
  const onSearch = (value) => {
    console.log("search:", value);
    console.log(props.list);
  };

  // const list = props.data?.map((unit) => {
  //   return { value: unit.unit_id, label: unit.unit_name };
  // });
  return (
    <Select
      labelInValue
      onBlur={props.onBlur}
      ref={ref}
      style={{
        width: 200,
      }}
      id={"customSelect"}
      fieldNames={"customSelect"}
      getPopupContainer={(trigger) => trigger.parentNode}
      showSearch
      placeholder="Select Item"
      optionFilterProp="children"
      onChange={onChange}
      onSearch={onSearch}
      filterOption={(input, option) =>
        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
      }
      options={props.list}
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
            //onClick={() => setOpen((prev) => !prev)}
            style={{
              width: "100%",
            }}
          >
            Add New
          </Button>
        </>
      )}
    />
  );
});

export default CustomSelect;
