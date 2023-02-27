import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { AuthContext } from "../../context/AuthContext";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import { PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import ContentBody from "../../components/content/ContentBody";
import ContentHeader from "../../components/content/ContentHeader";
import ContentLayout from "../../components/layout/ContentLayout";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../../features/items/itemsSlice";

const Items = () => {
  const { authToken } = useContext(AuthContext);
  const items = useSelector((state) => state.items);
  const dispatch = useDispatch();
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
  const navigate = useNavigate();
  function handleClick() {
    navigate("new");
  }
  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Name",
      field: "item_name",
      filter: true,
      checkboxSelection: true,
    },
    { headerName: "SKU", field: "item_sku", filter: true },
    { headerName: "Unit", field: "unit_name" },
    { headerName: "Sale Price", field: "salePrice", filter: true },
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
    dispatch(fetchItems(authToken));
    setRowData(() => items.items);
  }, []);
  return (
    <ContentLayout>
      {items.isLoading ? (
        <Spin style={{ marginTop: 20 }} size="large" />
      ) : (
        <>
          <ContentHeader
            title={"All Items"}
            children={
              <div>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={handleClick}
                >
                  New
                </Button>
              </div>
            }
          ></ContentHeader>
          <Divider style={{ margin: 0 }} />
          <ContentBody>
            <div
              className="ag-theme-alpine"
              style={{ width: "100%", height: "100%" }}
            >
              <AgGridReact
                ref={gridRef} // Ref for accessing Grid's API
                rowData={rowData} // Row Data for Rows
                columnDefs={columnDefs} // Column Defs for Columns
                defaultColDef={defaultColDef} // Default Column Properties
                animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                rowSelection="multiple" // Options - allows click selection of rows
                suppressRowClickSelection={true} // selecting row does not select checkbox
                //onCellClicked={cellClickedListener} // Optional - registering for Grid Event
                paginationPageSize="100"
                pagination={true}
                onRowClicked={(e) => navigate(`${e.data.item_id}`)}
              />
            </div>
          </ContentBody>
        </>
      )}
    </ContentLayout>
  );
};

export default Items;
