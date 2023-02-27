import React from "react";

const ContentBody = ({
  children,
  paddingLeft,
  paddingTop,
  paddingBottom,
  paddingRight,
}) => {
  return (
    // <div
    //   style={{
    //     maxHeight: "100%",
    //     flexGrow: 2,
    //     overflow: "hidden",
    //     background: "yellow",
    //   }}
    // >
    //   {children}
    // </div>
    <div
      style={{
        paddingLeft,
        paddingTop,
        paddingBottom,
        paddingRight,
        overflowY: "auto",
        height: "100%",
        marginBottom: 0,
      }}
    >
      {children}
    </div>
  );
};

export default ContentBody;
