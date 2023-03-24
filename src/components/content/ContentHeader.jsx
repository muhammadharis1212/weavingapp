import React from "react";

const ContentHeader = ({ title, children }) => {
  return (
    <div
      style={{
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 5,
        paddingBottom: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div>
        <div style={{ margin: 0, marginBottom: 10 }}>{title}</div>
      </div>
      <div style={{ marginBottom: 10 }}>{children}</div>
    </div>
  );
};

export default ContentHeader;
