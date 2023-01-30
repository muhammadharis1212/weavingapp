import React, {
  useCallback,
  useRef,
  useState,
  useMemo,
  useEffect,
} from "react";
import { Button, Empty } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import "./suppliers.scss";
import { fetchParties } from "../../features/party/partySlice";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Suppliers = () => {
  const { authToken } = useContext(AuthContext);
  const data = useSelector((state) => state.party);
  const navigate = useNavigate();
  const gridRef = useRef(); // Optional - for accessing Grid's API
  //const [rowData, setRowData] = useState(data); // Set rowData to Array of Objects, one Object per Row

  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const containerStyle = useMemo(() => ({ width: "100%", height: "92%" }), []);
  const dispatch = useDispatch();
  console.log(data);
  let rowData = [];
  rowData = data?.parties?.map((supplier) => {
    return {
      name: `${supplier?.firstName} ${supplier?.lastName}`,
      role: supplier?.role,
      phone: supplier?.contact[0].phone,
      payable: supplier?.payable,
    };
  });
  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    { field: "name", filter: true },
    { field: "role" },
    { field: "phone", filter: true },
    { field: "payable" },
  ]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({
    sortable: true,
  }));

  // Example of consuming Grid Event
  const cellClickedListener = useCallback((event) => {
    console.log("cellClicked", event);
  }, []);

  // Example load data from sever
  useEffect(() => {
    dispatch(fetchParties(authToken));
  }, []);

  // Example using Grid's API
  const buttonListener = useCallback((e) => {
    gridRef.current.api.deselectAll();
  }, []);

  return (
    <div style={containerStyle}>
      {rowData?.length > 0 ? (
        <div className="ag-theme-alpine" style={containerStyle}>
          <header
            style={{
              display: "flex",
              justifyContent: "space-between",
              height: "15%",
            }}
          >
            <h2 style={{ margin: 0 }}>Suppliers</h2>
            <Button
              type="primary"
              onClick={() => {
                navigate("new");
              }}
            >
              New
            </Button>
          </header>
          <AgGridReact
            style={gridStyle}
            ref={gridRef} // Ref for accessing Grid's API
            rowData={rowData} // Row Data for Rows
            columnDefs={columnDefs} // Column Defs for Columns
            defaultColDef={defaultColDef} // Default Column Properties
            animateRows={true} // Optional - set to 'true' to have rows animate when sorted
            rowSelection="multiple" // Options - allows click selection of rows
            onCellClicked={cellClickedListener} // Optional - registering for Grid Event
          />
        </div>
      ) : (
        <div>
          <h2 style={{ margin: 0 }}>Suppliers</h2>
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{
              height: 60,
            }}
            description={
              <span>
                <Link>There are no Suppliers. :(</Link>
              </span>
            }
          >
            <Button type="primary" onClick={() => navigate("new")}>
              Create Now
            </Button>
          </Empty>
        </div>
      )}
    </div>
  );
};

export default Suppliers;
