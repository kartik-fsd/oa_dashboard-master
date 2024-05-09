import React from "react";

function TableColumnHeader({ data }) {
  return (
    <span className="font-weight-bold fs-13 d-flex align-items-center flex-column w-100">
      {data}
      <div className="d-flex justify-content-between mt-1 w-75">
        <span style={{ color: "#1F99CC" }}>T</span>
        <span style={{ color: "#2EC851" }}>A</span>
        <span style={{ color: "#FCBB33" }}>P</span>
        <span style={{ color: "#F74544" }}>R</span>
      </div>
    </span>
  );
}

function TableColumnRow({ total, approved, pending, reject }) {
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
        {total}
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
        {approved}
      </div>
      <div
        style={{
          background: "#FCBB33",
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
        {pending}
      </div>
      <div
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
      </div>
    </div>
  );
}

export { TableColumnHeader, TableColumnRow };
