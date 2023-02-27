import { Select, Spin } from "antd";
import qs from "qs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchSuppliers } from "../../api/suppliers/searchSuppliers";
import { allSuppliers } from "../../api/suppliers/suppliers";
import { fetchSuppliers } from "../../features/suppliers/suppliersSlice";
let timeout;
let currentValue;
const fetch = (value, callback, authToken) => {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;
  const fetchData = async () => {
    const str = qs.stringify({
      code: "utf-8",
      q: value,
    });
    // const res = await searchSuppliers(authToken, value);
    // callback(() => res.data);
    callback(fetchSuppliers({ authToken, searchParams: value }));
  };
  timeout = setTimeout(fetchData, 300);
};
const DebounceSearchSelect = (props) => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState();
  const suppliers = useSelector((state) => state.suppliers);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSuppliers(props.authToken));
    // const fetchSuppliers = async (authToken) => {
    //   const res = await allSuppliers(authToken);
    //   setData((prev) => res?.data);
    // };
    // fetchSuppliers(props.authToken);
  }, []);
  const handleSearch = (newValue) => {
    if (newValue) {
      console.log("newValue : ", newValue);
      //fetch(newValue, setData, props.authToken);
      fetch(newValue, dispatch, props.authToken);
    } else {
      console.log("In else");
      dispatch(fetchSuppliers(props.authToken));
    }
  };
  const handleChange = (newValue) => {
    setValue(newValue);
    props.onChange(newValue);
  };
  const handleClick = () => {
    console.log("CLicked");
  };
  return (
    <Select
      showSearch
      value={value}
      placeholder={props.placeholder}
      style={props.style}
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={(input, option) =>
        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
      }
      onSearch={handleSearch}
      onChange={handleChange}
      onClick={handleClick}
      notFoundContent={"Result Not Found"}
      options={(suppliers.suppliers || []).map((d) => {
        const fullName = `${d.firstName} ${d.lastName ? d.lastName : ""}`;
        return {
          value: d.id,
          label: fullName,
        };
      })}
      dropdownRender={(menu) => (
        <>
          {suppliers.isLoading ? (
            <div>
              <Spin />
            </div>
          ) : (
            <>{menu}</>
          )}
        </>
      )}
    />
  );
};

export default DebounceSearchSelect;
