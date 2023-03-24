import { Select, Spin } from "antd";
import { Option } from "antd/es/mentions";
import qs from "qs";
import { forwardRef, useEffect, useState } from "react";
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
    await callback(fetchSuppliers({ authToken, searchParams: currentValue }));
  };
  timeout = setTimeout(fetchData, 500);
};
const DebounceSearchSelect = forwardRef(({ ...props }, ref) => {
  const defaultOption = props?.defaultOption;
  // const [data, setData] = useState([]);
  const [value, setValue] = useState();
  //const suppliers = useSelector((state) => state.suppliers);
  console.log("value : ", value);
  const dispatch = useDispatch();
  useEffect(() => {
    if (defaultOption?.value) setValue(defaultOption.value);
    //dispatch(fetchSuppliers(props.authToken));
    // const fetchSuppliers = async (authToken) => {
    //   const res = await allSuppliers(authToken);
    //   setData((prev) => res?.data);
    // };
    // fetchSuppliers(props.authToken);
  }, []);
  const handleSearch = (newValue) => {
    if (newValue) {
      //fetch(newValue, setData, props.authToken);
      fetch(newValue, dispatch, props.authToken);
    } else {
      //console.log("In else");
      //dispatch(fetchSuppliers(props.authToken));
      fetch("", dispatch, props.authToken);
    }
  };
  const handleChange = (newValue) => {
    //console.log("handleChange", newValue);
    setValue(() => newValue);
    props?.onChange(newValue);
  };
  const handleClick = () => {
    console.log("CLicked");
  };
  return (
    <Select
      ref={ref}
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
      // suppliers.suppliers
      options={props?.options || []}
      dropdownRender={(menu) => (
        <>
          {props?.isLoading ? (
            <div>
              <Spin />
            </div>
          ) : (
            <>{menu}</>
          )}
        </>
      )}
    ></Select>
  );
});

export default DebounceSearchSelect;
