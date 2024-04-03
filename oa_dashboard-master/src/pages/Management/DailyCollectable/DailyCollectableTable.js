import React from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "./dailyCollectable.css";

const customStyles = {
  rows: {
    style: {
      minHeight: "72px",
      minWidth: "120px",
      center: true,
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px", // override the cell padding for head cells
      paddingRight: "8px",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px", // override the cell padding for data cells
      paddingRight: "8px",
    },
  },
  table: {
    style: {
      minHeight: "400px",
    },
  },
};
const indianNumbers = (num, len) => {
  return (
    " ₹ " +
    Number(num).toLocaleString("en-IN", {
      maximumFractionDigits: len,
    })
  );
};

const DailyCollectableTable = (props) => {
  const { totalData, colData, total } = props;
  console.log(total[0], "fasakdata");
  let columns = [];

  const constColumns = [
    {
      name: (
        <div className="d-flex" style={{ gap: "0px" }}>
          <div
            style={{
              minWidth: "225px",
              fontWeight: "500",
              fontSize: "12px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ marginRight: "5px", marginTop: "4px" }}>
              <i className="ri-group-line "></i>
            </div>
            <span>Client</span>
          </div>
          <div
            style={{
              minWidth: "100px",
              textAlign: "center",
              fontWeight: "500",
              fontSize: "12px",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span>
              (M-1) <br /> Collections
            </span>
            <span
              className="badge rounded-pill badge-soft-primary fs-10"
              style={{ minWidth: "76px" }}
            >
              {indianNumbers(Math.abs(total[0]?.target_old?.toFixed(0)))}
            </span>
          </div>
          <div
            style={{
              minWidth: "100px",
              textAlign: "center",
              fontWeight: "500",
              fontSize: "12px",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span>
              (M-0) <br /> Collections
            </span>
            <span
              className="badge rounded-pill badge-soft-primary fs-10"
              style={{ minWidth: "76px" }}
            >
              {indianNumbers(total[0]?.target_current?.toFixed(0))}
            </span>
          </div>
        </div>
      ),
      selector: (d) => d.brand_name,
      sortable: true,
      //   center: true,
      width: "450px",
      cell: (d) => (
        <div
          className="d-flex gap-4 align-items-center justify-content-center"
          style={{ flex: "1" }}
        >
          <div className="d-flex gap-2" style={{ flex: "1 1 200px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div>
                {d?.brand_logo ? (
                  <img
                    src={d.brand_logo}
                    alt=""
                    className="rounded-circle avatar-sm"
                  />
                ) : (
                  <div className="avatar-sm">
                    <div className="avatar-title rounded-circle bg-soft-primary  text-primary">
                      {d?.brand_name[0] ?? ""}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <div className="fs-12">{d.brand_name}</div>
                <div className="fs-10 text-muted">{d?.companyname ?? ""}</div>
                <div
                  style={{ display: "flex", gap: "5px", alignItems: "center" }}
                >
                  <div className="fs-10 text-muted">
                    <span className="badge badge-soft-primary">
                      {d.user_id}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* <div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <div>
                  {d?.brand_logo ? (
                    <img
                      src={d.brand_logo}
                      alt=""
                      className="rounded-circle avatar-sm"
                    />
                  ) : (
                    <div className="avatar-sm">
                      <div className="avatar-title rounded-circle bg-soft-primary  text-primary">
                        {d?.brand_name[0] ?? ""}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <div className="fs-12">
                    {d.bd_name ? d.bd_name : d.brand_name}
                  </div>
                  <div className="fs-10 text-muted">
                    {d?.cmp_name ? d?.cmp_name : d?.companyname ?? ""}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "5px",
                      alignItems: "center",
                    }}
                  >
                    <div className="fs-10 text-muted">
                      Billed on {d.created_on}{" "}
                      <span className="badge badge-soft-primary">{d.net}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
          <div style={{ display: "flex", flexGrow: "1" }} className="fs-10">
            <span style={{ wordBreak: "break-word" }}>
              {indianNumbers(d.amount?.toFixed(0) ? d.amount?.toFixed(0) : 0) ||
                0}
            </span>
          </div>
          <div style={{ display: "flex", flexGrow: "1" }} className="fs-10">
            <span style={{ wordBreak: "break-word" }}>
              {indianNumbers(
                d.current_amount?.toFixed(0) ? d.current_amount?.toFixed(0) : 0
              ) || 0}
            </span>
          </div>
        </div>
      ),
    },
  ];

  columns = [...constColumns];

  colData.map((item) => {
    let obj;
    return (
      (obj = {
        name: (
          <div
            className="d-flex flex-column  align-items-center"
            style={{ fontWeight: "500", fontSize: "12px", gap: "12px" }}
          >
            <span>{item.name?.split("_").join("-")}</span>
            {/* <span>{item.value.toFixed(0)}</span> */}
            <span
              className="badge badge-soft-primary"
              style={{ minWidth: "42px" }}
            >
              {indianNumbers(item.value?.toFixed(0)) || 0}
            </span>
          </div>
        ),
        selector: (row) => <div>{row[item.name]?.toFixed(0)}</div>,
        sortable: true,
        width: "130px",
        cell: (d) => (
          <div className="fs-10">
            {d[item.name] != "0"
              ? indianNumbers(d[item.name]?.toFixed(0))
              : "-"}
          </div>
        ),
        center: true,
      }),
      columns.push(obj)
    );
  });

  const tableData = {
    columns: columns,
    data: totalData,
  };

  return (
    <div>
      <DataTableExtensions
        {...tableData}
        export={false}
        filterPlaceholder={`Search`}
        className="filter_text"
        style={{
          paddingRight: "25px important",
        }}
      >
        <DataTable
          columns={columns}
          data={tableData}
          theme="VendorTable"
          expandableRows={false}
          // expandableRows={userType == "om" ? true : false}
          // expandableRowsComponent={ExpandableRowComponent}
          expandableRowsHideExpander //hide the arrow icon on the left
          // progressPending={loading}
          expandOnRowClicked={true}
          customStyles={customStyles}
          //   highlightOnHover={true}
          className="daily-collectable"
        />
      </DataTableExtensions>
    </div>
  );
};

export default DailyCollectableTable;
