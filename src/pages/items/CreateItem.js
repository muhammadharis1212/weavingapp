import React, { useContext, useEffect, useState } from "react";
import { Button, Input, Radio } from "antd";
import "./createItem.css";
import { UpOutlined, DownOutlined } from "@ant-design/icons";
import { postUnit } from "../../api/items/unit/postUnit";
import { AuthContext } from "../../context/AuthContext";
import { getAllUnits } from "../../api/items/unit/getAllUnits";
import UnitsList from "../../features/items/units/UnitsList";

const CreateItem = () => {
  const unitInitialState = { unit_id: null, unit_name: "" };
  const allUnitsInitialState = { units: [] };
  const { token } = useContext(AuthContext);
  const [itemType, setItemType] = useState("Goods");
  const [allUnits, setAllUnits] = useState(allUnitsInitialState);
  const [unit, setUnit] = useState(unitInitialState);
  const [isSelected, setIsSelected] = useState(false);
  const options = [
    { label: "Goods", value: "Goods" },
    { label: "Service", value: "Service" },
  ];
  const radioValueChange = ({ target: { value } }) => {
    console.log("Radio Value : ", value);
    setItemType(value);
  };
  const handleClick = async () => {
    setIsSelected(!isSelected);
    const res = await getAllUnits(token);
    setAllUnits((prev) => ({ ...prev, units: JSON.parse(res) }));
  };
  useEffect(() => {
    const postRequest = async () => {
      //return await postUnit(token, {unit_id});
    };
  }, []);

  return (
    <div className="createItem--container">
      <div>
        <h2>New Item</h2>
      </div>
      <div>
        <div>
          <label>Type</label>
          <Radio.Group
            options={options}
            onChange={radioValueChange}
            value={itemType}
            optionType="button"
            buttonStyle="solid"
          />
        </div>
        <div>
          <label>Name*</label>
          <Input />
        </div>
        <div>
          <label>SKU</label>
          <Input />
        </div>
        <div>
          <label>Unit*</label>
          <Input
            placeholder="Select or Type to Add"
            onClick={handleClick}
            suffix={isSelected ? <DownOutlined /> : <UpOutlined />}
            size="small"
            value={unit.unit_name}
          />
          {isSelected && <UnitsList data={allUnits} setAllUnits={setUnit} />}
        </div>
      </div>
    </div>
  );
};

export default CreateItem;
