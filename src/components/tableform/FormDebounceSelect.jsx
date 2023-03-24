import { Select, Spin } from "antd";
import { Option } from "antd/es/mentions";
import qs from "qs";
import { forwardRef, useContext, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchItem } from "../../api/items/searchItem";
import { AuthContext } from "../../context/AuthContext";
import { fetchSuppliers } from "../../features/suppliers/suppliersSlice";
let timeout;
let currentValue;
const fetch = (value, callback, authToken, apiGetRequest, setLoading) => {
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
    try {
      const res = await apiGetRequest(authToken, currentValue);
      callback(() => res.data);
      setLoading(false);
    } catch (err) {
      console.log("Error : ", err);
    }
  };
  timeout = setTimeout(fetchData, 500);
};
const FormDebounceSelect = forwardRef(({ ...props }, ref) => {
  const valueProperty = props?.valueProperty;
  const labelProperty = props?.labelProperty;
  const { authToken } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [value, setValue] = useState();

  useEffect(() => {
    let value;
    if (props?.selectedOption?.value) {
      value = props?.selectedOption?.value;
      setValue(props.selectedOption.value);
      setData(() => [props.selectedOption]);
    }
    console.log("In UseEffect");
    setLoading(true);
    fetch(undefined, setData, authToken, props.apiGetRequest, setLoading);
  }, []);
  const handleSearch = (newValue) => {
    setLoading(true);
    if (newValue) {
      //fetch(newValue, setData, props.authToken);
      fetch(newValue, setData, authToken, props.apiGetRequest, setLoading);
    } else {
      fetch(undefined, setData, authToken, props.apiGetRequest, setLoading);
    }
  };
  const handleChange = (newValue) => {
    setValue(() => newValue);
    const selectedOption = data
      .map((obj) => ({
        ...obj,
        value: obj[props?.valueProperty],
        label: obj[props?.labelProperty],
      }))
      .filter((obj) => newValue === obj.value);
    props?.onChange(selectedOption[0]);
  };
  const handleClick = () => {
    console.log("CLicked");
    const selectedValue = data;
    console.log("Selected Value : ", selectedValue);
  };
  return (
    <Select
      ref={ref}
      onBlur={props?.onBlur}
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
      options={
        data.map((ele) => {
          return { value: ele[valueProperty], label: ele[labelProperty] };
        }) || []
      }
      dropdownRender={(menu) => <>{loading ? <Spin /> : <>{menu}</>}</>}
    ></Select>
  );
});

export default FormDebounceSelect;
