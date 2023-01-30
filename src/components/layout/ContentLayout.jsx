import React from "react";

const ContentLayout = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        flexFlow: "column",
        overflow: "hidden",
        height: "100%",
      }}
    >
      {children}
    </div>
  );
};

export default ContentLayout;
