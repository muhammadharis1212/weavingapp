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
import { Button, Spin } from "antd";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import ContentLayout from "../../components/layout/ContentLayout";
import { Divider, Empty, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const Bills = () => {
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const { authToken } = useContext(AuthContext);
  const data = useSelector((state) => state.bills);
  const { isLoading, bills, error, page_context } = data;
  const dispatch = useDispatch();
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
  const [perPage, setPerPage] = useState(searchParams.get("per_page"));
  const [page, setPage] = useState(searchParams.get("page"));
  const [filterBy, setFilterBy] = useState(searchParams.get("filter_by"));
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: Number(searchParams.get("page")),
      pageSize: Number(searchParams.get("per_page")),
      total: page_context.totalRecordCount,
    },
  });
  console.log("page_context before useEffect : ", page_context);
  useMemo(() => {
    //dispatch(allBills({ authToken, filterBy, perPage, page }));

    setTableParams(() => ({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: page_context["totalRecordCount"],

        // 200 is mock data, you should read it from server
        // total: data.totalCount,
      },
    }));
  }, [JSON.stringify(page_context)]);
  useEffect(() => {
    console.log("In useEffect");
    setPerPage(() => searchParams.get("per_page"));
    setPage(() => searchParams.get("page"));
    setFilterBy(() => searchParams.get("filter_by"));

    dispatch(allBills({ authToken, filterBy, perPage, page }));

    setTableParams(() => ({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: page_context["totalRecordCount"],

        // 200 is mock data, you should read it from server
        // total: data.totalCount,
      },
    }));
  }, [JSON.stringify(tableParams)]);

  const handleTableChange = (pagination, filters, sorter) => {
    console.log("pagination : ", pagination);
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setRowData([]);
    }
  };
  const newBillHandler = () => {
    navigate("new");
  };

  const columns = [
    {
      title: "Bill Date",
      dataIndex: "billDate",
      sorter: true,
      width: "20%",
    },
    {
      title: "Bill#",
      dataIndex: "billNo",
    },
    {
      title: "Supplier",
      dataIndex: "supplierName",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Due Date",
      dataIndex: "billDueDate",
    },
    {
      title: "Outstanding Amount",
      dataIndex: "amount",
    },
  ];
  const getRandomuserParams = (params) => ({
    results: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
  });

  return (
    <ContentLayout>
      {isLoading ? (
        <Spin style={{ marginTop: 20 }} size="large" />
      ) : (
        <>
          <ContentHeader title={"All Bills"}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={newBillHandler}
            >
              New
            </Button>
          </ContentHeader>
          <Divider style={{ margin: 0 }} />
          <ContentBody>
            <div
              className="ag-theme-alpine"
              style={{ width: "100%", height: "100%" }}
            >
              <Table
                columns={columns}
                rowKey={(record) => record.id}
                dataSource={bills}
                pagination={tableParams.pagination}
                loading={isLoading}
                onChange={handleTableChange}
              />
            </div>
          </ContentBody>
        </>
      )}
    </ContentLayout>
  );
};

export default Bills;
