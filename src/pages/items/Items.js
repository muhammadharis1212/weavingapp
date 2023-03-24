import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Spin, theme, Table, Dropdown } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import ContentBody from "../../components/content/ContentBody";
import ContentHeader from "../../components/content/ContentHeader";
import ContentLayout from "../../components/layout/ContentLayout";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../../features/items/itemsSlice";
import SortButtons from "../../components/SortButtons";

const Items = () => {
  const { token } = theme.useToken();
  const [searchParams, setSearchParams] = useSearchParams();
  //search params
  const page = Number(searchParams.get("page")) || searchParams.set("page", 1);
  const per_page =
    Number(searchParams.get("per_page")) || searchParams.set("per_page", 50);
  const filter_by = searchParams.get("filter_by");
  const sort_column = searchParams.get("sort_column");
  const sort_order = searchParams.get("sort_order");
  const { authToken } = useContext(AuthContext);
  const data = useSelector((state) => state.items);
  const { isLoading, items, error, page_context } = data;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: Number(searchParams.get("page")),
      pageSize: Number(searchParams.get("per_page")),
      total: page_context.totalRecordCount,
      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} bills`,
    },
  });
  const [selectedItem, setSelectedItem] = useState(sort_column);

  useEffect(() => {
    dispatch(
      fetchItems({
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
      },
    }));
  }, [
    JSON.stringify(page_context),
    JSON.stringify(items),
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
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      console.log("handleTableChange");
    }
    setSearchParams({
      filter_by: filter_by,
      per_page: per_page,
      page: pagination.current,
      sort_column: sort_column,
      sort_order: sort_order,
    });
  };
  const columns = [
    {
      title: "Item Name",
      dataIndex: "item_name",
      width: "20%",
      render: (title) => (
        <span style={{ color: token.colorPrimary }}>{title}</span>
      ),
      ellipsis: true,
    },
    {
      title: "SKU",
      dataIndex: "item_sku",
      ellipsis: true,
    },
    {
      title: "Sale Price",
      dataIndex: "salePrice",
      ellipsis: true,
    },
  ];

  function newItemHandler() {
    navigate("new");
  }

  const dropDownItems = [
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
              <span style={{ paddingRight: 60 }}>Created Time</span>
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
              <span style={{ paddingRight: 60 }}>Name</span>
              {selectedItem === "item_name" && (
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
          key: "item_name",
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
              <span style={{ paddingRight: 60 }}>SKU</span>
              {selectedItem === "item_sku" && (
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
          key: "item_sku",
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
    items: dropDownItems,
    selectable: true,
    selectedKeys: selectedItem,
    onClick: onMenuClick,
  };
  return (
    <ContentLayout>
      {isLoading ? (
        <Spin style={{ marginTop: 20 }} size="large" />
      ) : (
        <>
          <ContentHeader title={<h2 style={{ margin: 0 }}>All Items</h2>}>
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
                onClick={newItemHandler}
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
              className="items--container"
              style={{ width: "100%", height: "100%" }}
            >
              <Table
                columns={columns}
                rowKey={(record) => record.item_id}
                dataSource={items}
                pagination={tableParams.pagination}
                loading={isLoading}
                onChange={handleTableChange}
                rowSelection={true}
                size="middle"
                onRow={(record, rowIndex) => {
                  return {
                    onClick: (event) => {
                      navigate(`${record.item_id}`);
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

export default Items;
