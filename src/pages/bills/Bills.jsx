import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import {
  createSearchParams,
  useSearchParams,
  useParams,
  useNavigate,
} from "react-router-dom";
import ContentBody from "../../components/content/ContentBody";
import ContentHeader from "../../components/content/ContentHeader";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../context/AuthContext";
import { allBills } from "../../features/bills/billsSlice";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import { Button } from "antd";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import ContentLayout from "../../components/layout/ContentLayout";
import { Divider } from "antd";

const Bills = () => {
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const { authToken } = useContext(AuthContext);
  const bills = useSelector((state) => state.bills);
  const dispatch = useDispatch();
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
  const [limit, setLimit] = useState(searchParams.get("limit"));
  const [offset, setOffset] = useState(searchParams.get("offset"));
  const [filterBy, setFilterBy] = useState(searchParams.get("filter_by"));
  const rowModelType = "serverSide";
  //create Data Source
  const createDatasource = (server) => {
    return {
      // called by the grid when more rows are required
      getRows: (params) => {
        // get data for request from server
        const response = server.getData(params.request);

        if (response.success) {
          // supply rows for requested block to grid
          params.success({
            rowData: response.rows,
          });
        } else {
          // inform grid request failed
          params.fail();
        }
      },
    };
  };
  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    { field: "billDate" },
    { field: "billNo", filter: true },
    { field: "supplierName", filter: true },
    { field: "status", filter: true },
    { field: "billDueDate" },
    { field: "amount" },
  ]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({
    sortable: true,
  }));

  // Example of consuming Grid Event
  const cellClickedListener = useCallback((event) => {
    console.log("cellClicked", event);
  }, []);
  useEffect(() => {
    console.log("In useEffect");
    setLimit(() => searchParams.get("limit"));
    setOffset(() => searchParams.get("offset"));
    setFilterBy(() => searchParams.get("filter_by"));
    dispatch(allBills({ authToken, filterBy, limit, offset }));
    setRowData(() => bills.bills);
  }, [limit, offset]);
  const buttonListener = useCallback((e) => {
    gridRef.current.api.deselectAll();
  }, []);

  const newBillHandler = () => {
    navigate("new");
  };

  return (
    <ContentLayout>
      <ContentHeader title={"All Bills"}>
        <Button type="primary" onClick={newBillHandler}>
          New
        </Button>
      </ContentHeader>
      <Divider style={{ margin: 0 }} />
      <ContentBody>
        <div
          className="ag-theme-alpine"
          style={{ width: "100%", height: "100%" }}
        >
          <AgGridReact
            rowModelType={rowModelType}
            ref={gridRef} // Ref for accessing Grid's API
            rowData={rowData} // Row Data for Rows
            columnDefs={columnDefs} // Column Defs for Columns
            defaultColDef={defaultColDef} // Default Column Properties
            animateRows={true} // Optional - set to 'true' to have rows animate when sorted
            rowSelection="multiple" // Options - allows click selection of rows
            //onCellClicked={cellClickedListener} // Optional - registering for Grid Event
            paginationPageSize="100"
            pagination={true}
            onRowClicked={(e) => navigate(`${e.data.id}`)}
          />
        </div>
      </ContentBody>
    </ContentLayout>
  );
};

export default Bills;
