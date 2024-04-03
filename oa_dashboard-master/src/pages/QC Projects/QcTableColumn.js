import React from "react";

function TableColumnHeader({ data }) {
  return (
    <span className="font-weight-bold fs-13 d-flex align-items-center flex-column w-100">
      {data}
      <div className="d-flex justify-content-center mt-1 w-75" style={{gap:'30px'}}>
        <span style={{ color: "#1F99CC" }}>L1</span>
        <span style={{ color: "#2EC851",marginLeft:'10px' }}>L2</span>
        <span style={{ color: "#FCBB33" }}>L3</span>
        {/* <span style={{ color: "#F74544" }}>R</span> */}
      </div>
    </span>
  );
}

function TableColumnRow({ l1, l2, l3 }) {
  return (
    <div className="d-flex">
      <div
        style={{
          background: "#1F99CC",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginRight: "2px",
          borderRadius: "6px",
          color: "#fff",
          fontWeight: "600",
          padding: "4px 6px",
          minWidth: "45px",
        }}
      >
        {l1}
      </div>
      <div
        style={{
          background: "#2EC851",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginRight: "2px",
          borderRadius: "6px",
          color: "#fff",
          fontWeight: "600",
          padding: "4px 6px",
          minWidth: "45px",
        }}
      >
        {l2}
      </div>
      <div
        style={{
          background: "#FFBB33",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginRight: "2px",
          borderRadius: "6px",
          color: "#fff",
          fontWeight: "600",
          padding: "4px 6px",
          minWidth: "45px",
        }}
      >
        {l3}
      </div>
      {/* <div
        style={{
          background: "#F74544",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginRight: "2px",
          borderRadius: "6px",
          color: "#fff",
          fontWeight: "600",
          padding: "4px 6px",
          minWidth: "45px",
        }}
      >
        {reject}
      </div> */}
    </div>
  );
}

export { TableColumnHeader, TableColumnRow };
