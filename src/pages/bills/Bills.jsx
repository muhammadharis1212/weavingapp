import React, { useContext, useEffect, useState, useMemo } from "react";
import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import ContentBody from "../../components/content/ContentBody";
import ContentHeader from "../../components/content/ContentHeader";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../context/AuthContext";
import { allBills } from "../../features/bills/billsSlice";
import { Button, Pagination, Spin } from "antd";
import ContentLayout from "../../components/layout/ContentLayout";
import { Divider, Empty, Table, theme, Dropdown, Space } from "antd";
import { PlusOutlined, DownOutlined } from "@ant-design/icons";
import "./bills.scss";
import SortButtons from "../../components/SortButtons";

const Bills = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  //search params
  const page = Number(searchParams.get("page")) || searchParams.set("page", 1);
  const per_page =
    Number(searchParams.get("per_page")) || searchParams.set("per_page", 50);
  const filter_by = searchParams.get("filter_by");
  const sort_column = searchParams.get("sort_column");
  const sort_order = searchParams.get("sort_order");

  //antd theme token
  const { token } = theme.useToken();
  const navigate = useNavigate();

  const { authToken } = useContext(AuthContext);
  const data = useSelector((state) => state.bills);
  const { isLoading, bills, error, page_context } = data;
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState(sort_column);
  const [selectedStatusItem, setSelectedStatusItem] = useState(filter_by);

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: Number(searchParams.get("page")),
      pageSize: Number(searchParams.get("per_page")),
      total: page_context.totalRecordCount,
      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} bills`,
    },
  });
  useEffect(() => {
    dispatch(
      allBills({
        authToken,
        filter_by,
        per_page,
        page,
        sort_column,
        sort_order,
      })
    );

    setTableParams(() => ({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: page_context["totalRecordCount"],

        // 200 is mock data, you should read it from server
        // total: data.totalCount,
      },
    }));
  }, [
    JSON.stringify(page_context),
    filter_by,
    per_page,
    page,
    sort_column,
    sort_order,
  ]);

  const handleTableChange = (pagination, filters, sorter) => {
    console.log("pagination : ", pagination);
    console.log("tableparams pagination : ", tableParams.pagination);

    setTableParams((prev) => {
      const newParams = {
        pagination,
        filters,
        ...sorter,
      };
      return {
        ...newParams,
        pagination: {
          ...newParams.pagination,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} bills`,
        },
      };
    });
    // setTableParams({
    //   pagination,
    //   filters,
    //   ...sorter,
    // });
    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      // setRowData([]);
      console.log("In if condition");
    }
    setSearchParams({
      filter_by: filter_by,
      per_page: per_page,
      page: pagination.current,
      sort_column: sort_column,
      sort_order: sort_order,
    });
  };
  const newBillHandler = () => {
    navigate("new");
  };
  const columns = [
    {
      title: "Bill Date",
      dataIndex: "billDate",
      width: "20%",
      ellipsis: true,
    },
    {
      title: "Bill#",
      dataIndex: "billNo",
      render: (title) => (
        <span style={{ color: token.colorPrimary }}>{title}</span>
      ),
    },
    {
      title: "Supplier",
      dataIndex: "supplierName",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (title) => {
        let statusColor = "";
        switch (title) {
          case "OVERDUE":
            statusColor = token.colorWarning;
            break;
          case "OPEN":
            statusColor = token.colorPrimary;
            break;
          case "DRAFT":
            statusColor = token.colorTextDescription;
            break;
          case "PAID":
            statusColor = token.colorSuccess;
            break;
          default:
            statusColor = token.colorTextBase;
        }
        //style the whole row because of p element
        return <p style={{ color: statusColor, margin: "3px 0" }}>{title}</p>;
      },
    },
    {
      title: "Due Date",
      dataIndex: "billDueDate",
    },
    {
      title: "Outstanding Amount",
      dataIndex: "outStandingAmount",
    },
  ];

  const items = [
    {
      key: "1",
      type: "group",
      label: "Sort by",
      children: [
        {
          label: (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                columnGap: 10,
              }}
            >
              <span style={{ paddingRight: 60 }}>Creation Time</span>
              {selectedItem === "createdAt" && (
                <SortButtons
                  filter_by={filter_by}
                  per_page={per_page}
                  page={page}
                  sort_column={sort_column}
                  sort_order={sort_order}
                  setSearchParams={setSearchParams}
                  token={token}
                />
              )}
            </div>
          ),
          key: "createdAt",
        },
        {
          label: (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                columnGap: 10,
              }}
            >
              <span>Bill Date</span>
              {selectedItem === "billDate" && (
                <SortButtons
                  filter_by={filter_by}
                  per_page={per_page}
                  page={page}
                  sort_column={sort_column}
                  sort_order={sort_order}
                  setSearchParams={setSearchParams}
                  token={token}
                />
              )}
            </div>
          ),
          key: "billDate",
        },

        {
          label: (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                columnGap: 10,
              }}
            >
              <span>Bill#</span>
              {selectedItem === "billNo" && (
                <SortButtons
                  filter_by={filter_by}
                  per_page={per_page}
                  page={page}
                  sort_column={sort_column}
                  sort_order={sort_order}
                  setSearchParams={setSearchParams}
                  token={token}
                />
              )}
            </div>
          ),
          key: "billNo",
        },
        {
          label: (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                columnGap: 10,
              }}
            >
              <span>Name</span>
              {selectedItem === "Supplier" && (
                <SortButtons
                  filter_by={filter_by}
                  per_page={per_page}
                  page={page}
                  sort_column={sort_column}
                  sort_order={sort_order}
                  setSearchParams={setSearchParams}
                  token={token}
                />
              )}
            </div>
          ),
          key: "Supplier",
        },
        {
          label: (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                columnGap: 10,
              }}
            >
              <span>Due Date</span>
              {selectedItem === "billDueDate" && (
                <SortButtons
                  filter_by={filter_by}
                  per_page={per_page}
                  page={page}
                  sort_column={sort_column}
                  sort_order={sort_order}
                  setSearchParams={setSearchParams}
                  token={token}
                />
              )}
            </div>
          ),
          key: "billDueDate",
        },
        {
          label: (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                columnGap: 10,
              }}
            >
              <span>Amount</span>
              {selectedItem === "outStandingAmount" && (
                <SortButtons
                  filter_by={filter_by}
                  per_page={per_page}
                  page={page}
                  sort_column={sort_column}
                  sort_order={sort_order}
                  setSearchParams={setSearchParams}
                  token={token}
                />
              )}
            </div>
          ),
          key: "outStandingAmount",
        },
      ],
    },
  ];
  const onMenuClick = (e) => {
    console.log("click", e);
    setSelectedItem(() => e.key);
    setSearchParams({
      filter_by: filter_by,
      per_page: per_page,
      page: page,
      sort_column: e.key,
      sort_order: sort_order,
    });
  };
  const menuProps = {
    items,
    selectable: true,
    selectedKeys: selectedItem,
    onClick: onMenuClick,
  };
  const statusItems = [
    {
      key: "1",
      type: "group",
      label: "Sort by",
      children: [
        {
          label: "All Bills",
          key: "Status.All",
        },
        {
          label: "Open Bills",
          key: "Status.Open",
        },
        {
          label: "Draft Bills",
          key: "Status.Draft",
        },
        {
          label: "Paid Bills",
          key: "Status.Paid",
        },
      ],
    },
  ];
  const onStatusMenuClick = (e) => {
    console.log("click", e);
    setSelectedStatusItem(() => e.key);
    setSearchParams({
      filter_by: e.key,
      per_page: per_page,
      page: page,
      sort_column: sort_column,
      sort_order: sort_order,
    });
  };
  const menuPropsStatus = {
    items: statusItems,
    selectable: true,
    selectedKeys: selectedStatusItem,
    onClick: onStatusMenuClick,
  };
  const title = statusItems[0].children.find(
    (value) => value.key === selectedStatusItem
  );
  return (
    <ContentLayout>
      {isLoading ? (
        <Spin style={{ marginTop: 20 }} size="large" />
      ) : (
        <>
          <ContentHeader
            title={
              <Dropdown menu={menuPropsStatus} arrow>
                <h1
                  style={{ margin: 0, cursor: "pointer" }}
                  onClick={(e) => e.preventDefault()}
                >
                  {title.label}
                  <DownOutlined style={{ color: token.colorPrimary }} />
                </h1>
              </Dropdown>
            }
          >
            <div
              style={{
                display: "flex",
                columnGap: 10,
                justifyContent: "space-between",
              }}
            >
              <Button
                type="primary"
                style={{
                  padding: 7,
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  gap: 0,
                }}
                icon={<PlusOutlined style={{}} />}
                onClick={newBillHandler}
              >
                <span style={{ marginLeft: "4px" }}>New</span>
              </Button>
              <Dropdown menu={menuProps} trigger={["click"]} arrow>
                <Button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: 25,
                    fontWeight: 700,
                    padding: 7,
                    paddingBottom: 18,
                  }}
                  onClick={(e) => e.preventDefault()}
                >
                  ...
                </Button>
              </Dropdown>
            </div>
          </ContentHeader>

          <Divider style={{ margin: 0 }} />
          <ContentBody>
            <div
              className="bills--container"
              style={{ width: "100%", height: "100%" }}
            >
              <Table
                columns={columns}
                rowKey={(record) => record.id}
                dataSource={bills}
                pagination={tableParams.pagination}
                loading={isLoading}
                onChange={handleTableChange}
                rowSelection={true}
                size="middle"
                onRow={(record, rowIndex) => {
                  return {
                    onClick: (event) => {
                      console.log("Record and Row Index", record, rowIndex);
                      navigate(`${record.id}`);
                    }, // click row
                  };
                }}
              />
            </div>
          </ContentBody>
        </>
      )}
    </ContentLayout>
  );
};

export default Bills;
