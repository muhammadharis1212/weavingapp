import React from "react";
import { CaretDownFilled, CaretUpFilled } from "@ant-design/icons";

const SortButtons = ({
  filter_by,
  per_page,
  page,
  sort_column,
  sort_order,
  token,
  setSearchParams,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginLeft: "auto",
      }}
    >
      <CaretUpFilled
        style={{
          marginBottom: "-4px",
          color:
            sort_order === "asc" ? token.colorPrimary : token.colorBgContainer,
        }}
        onClick={(e) => {
          console.log("Icon clicked : ", e.target);
          e.stopPropagation();
          //searchParams.set("sort_order", "desc");
          setSearchParams({
            filter_by: filter_by,
            per_page: per_page,
            page: page,
            sort_column: sort_column,
            sort_order: "asc",
          });
        }}
      />
      <CaretDownFilled
        style={{
          color:
            sort_order === "desc" ? token.colorPrimary : token.colorBgContainer,
        }}
        onClick={(e) => {
          console.log("Icon clicked : ", e);
          e.stopPropagation();
          //searchParams.set("sort_order", "desc");
          setSearchParams({
            filter_by: filter_by,
            per_page: per_page,
            page: page,
            sort_column: sort_column,
            sort_order: "desc",
          });
        }}
      />
    </div>
  );
};

export default SortButtons;
