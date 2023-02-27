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
        <h2 style={{ margin: 0, marginBottom: 10 }}>{title}</h2>
      </div>
      <div style={{ marginBottom: 10 }}>{children}</div>
    </div>
  );
};

export default ContentHeader;
