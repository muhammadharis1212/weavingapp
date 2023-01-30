import React from "react";

const ContentHeader = ({ title, children }) => {
  return (
    <div>
      <h2 style={{ margin: 0, marginBottom: 10 }}>{title}</h2>
      {children}
    </div>
  );
};

export default ContentHeader;
