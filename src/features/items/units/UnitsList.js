import React from "react";

const UnitsList = ({ data, setAllUnits }) => {
  const { units } = data;
  console.log("Units : ", units);
  console.log("UnitList : ", data);

  function liCLickHandler() {
    // setUnit_Name();
  }

  const list = units.map((obj) => {
    return (
      <li
        key={obj.unit_id}
        onClick={() =>
          setAllUnits((prev) => ({
            ...prev,
            unit_id: obj.unit_id,
            unit_name: obj.unit_name,
          }))
        }
      >
        {obj.unit_name}
      </li>
    );
  });
  return (
    <div>
      <div>
        <ul>{list}</ul>
        <div>New Unit</div>
      </div>
    </div>
  );
};

export default UnitsList;
