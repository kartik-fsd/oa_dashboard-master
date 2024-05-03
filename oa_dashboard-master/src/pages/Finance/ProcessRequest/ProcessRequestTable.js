import axios from "axios";
import React from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import {
  payout_report,
  process_payment,
} from "../../../assets/utils/farmingBase";
import { farming } from "../../../globalConfig";
import ProcessRequestModal from "./ProcessRequestModal";
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

const ProcessRequestTable = ({ leadData }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [payment_ref, setPayment_ref] = React.useState(null);
  const [isError, setIsError] = React.useState(false);
  const [updateboolProcess, setupdateBoolProcess] = React.useState(false);
  const [sowwId, setSowwId] = React.useState("");
  const [requId, setRequId] = React.useState("");
  const [type, setType] = React.useState("");
  const [reqMod, setReqMod] = React.useState(false);

  const token = sessionStorage.getItem("token");
  const userType = sessionStorage.getItem("useraccesstype");
  const role = sessionStorage.getItem("role");

  console.log(userType, role, "ipl");

  const processPaymentFunc = () => {
    // handleCloseSureD();
    const link = farming.farming_URL + process_payment;
    const data = {
      req_id: requId,
      sow_id: sowwId,
      type: type,
      payment_reference: payment_ref,
    };

    setPayment_ref(null);
    setIsLoading(true);
    console.log(data, 123);
    axios
      .post(link, data)
      .then((res) => {
        window.location.reload();
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
        setupdateBoolProcess(!updateboolProcess);
      });
  };

  const onclickOpenSureD = (d) => {
    setSowwId(d.sow_id);
    setRequId(d.req_id);
    setType(d.payment_type);
    setReqMod(!reqMod);
  };
  const columns = [
    {
      name: " Days Left ",
      selector: (d) => d.days_left,
      omit: true,
      cell: (d) => (
        <div>
          {d.paid > 0 ? (
            <span
              className="badge rounded-pill badge-soft-success"
              style={{ width: "50px" }}
            >
              Paid
            </span>
          ) : d.days_left > 0 ? (
            <span
              className="badge rounded-pill badge-soft-success"
              style={{ width: "110px" }}
            >
              {`Due in ${d.days_left} Days`}
            </span>
          ) : d.days_left < 0 ? (
            <span
              className="badge rounded-pill badge-soft-danger"
              style={{ width: "110px" }}
            >
              {`Overdue by ${Math.abs(d.days_left)} Days`}
            </span>
          ) : (
            <span
              className="badge rounded-pill badge-soft-warning"
              style={{ width: "80px" }}
            >
              {`Not Updated`}
            </span>
          )}
        </div>
      ),
      sortable: true,
      center: true,
      //   width: "165px",
    },
    {
      name: "ID",
      selector: (d) => d.req_id,
      cell: (d) => <div className="fw-bold">{d.req_id}</div>,
      sortable: true,
      center: true,
      // width: "80px",
    },
    {
      name: <div>Project</div>,
      selector: (row) => row.sow_id,
      sortable: true,
      width: "220px",
      cell: (d) => (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div>
              {d?.brand_logo ? (
                <img
                  src={d.brand_logo}
                  alt=""
                  className="rounded-circle avatar-sm"
                  style={{ width: "32px", height: "32px" }}
                />
              ) : (
                <div className="avatar-sm">
                  <div
                    className="avatar-title rounded-circle  "
                    style={{ backgroundColor: "#f07d47", color: "#b83016" }}
                  >
                    {d?.brand_name?.charAt(0) ?? ""}
                  </div>
                </div>
              )}
            </div>

            <div>
              <div
                className="fs-11"
                style={{
                  display: "flex",
                  alignItems: "center",
                  // textDecoration: "underline",
                  cursor: "pointer",
                }}
                // onClick={() => {
                //   setSendData(d);
                //   setOpen3(!open3);
                // }}
              >
                <div>
                  {d.brand_name}-{d.sow_id}{" "}
                </div>
              </div>
              <div className="fs-10 text-muted">{d?.project_title ?? ""}</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      name: "SOW ID",
      selector: (d) => d.sow_id,
      omit: true,
      cell: (d) => (
        <div>
          <div className="d-flex flex-column align-items-center gap-1">
            <span className="fs-11">{d.brand_name}</span>

            <span
              className="badge badge-soft"
              style={{ backgroundColor: "#f07d47" }}
            >
              {d.sow_id}
            </span>
          </div>
        </div>
      ),
      sortable: true,
      center: true,
      // width: "80px",
    },
    {
      name: " Date",
      selector: (d) => d.display_date,
      cell: (d) => (
        <div style={{ fontWeight: "600", foontSize: "10px" }}>
          <span className="badge rounded-pill badge-soft-dark">
            {d.display_date}
          </span>
        </div>
      ),
      sortable: true,
      center: true,
      width: "180px",
    },

    {
      name: "Leads",
      selector: (row) => row.leads,
      width: "80px",
      cell: (d) => (
        <div>
          <span className="fs-10" style={{ fontWeight: 600 }}>
            {d.total_leads} * {d.cpl}
          </span>
        </div>
      ),
      sortable: true,
      center: true,
    },
    {
      name: "Total",
      cell: (d) => <div className="fs-10 fw-bold">{d.total}</div>,
      sortable: true,
      center: true,
      //   width: "120px",
    },
    {
      name: "Type",
      selector: (row) => row.payment_type,
      sortable: true,
      width: "100px",
      center: true,
      cell: (d) => (
        <div className="amt_table " style={{ color: "#b83016" }}>
          {d.payment_type == "direct_sp" ? (
            <span
              className="badge rounded-pill badge-soft-success"
              style={{ width: "60px" }}
            >
              Managed
            </span>
          ) : d.payment_type == "indirect_sp" ? (
            <span
              className="badge rounded-pill badge-soft-warning"
              style={{ width: "60px" }}
            >
              Grouped
            </span>
          ) : (
            <span
              className="badge rounded-pill badge-soft-info"
              style={{ width: "60px" }}
            >
              Direct
            </span>
          )}
        </div>
      ),
    },
    {
      name: "Download",
      selector: (d) => "download",
      cell: (d) => (
        <div className="d-flex ">
          <a
            href={`${
              farming.farming_URL + payout_report
            }?token=${token}&req_id=${d.req_id}&payment_type=${d.payment_type}`}
            target="_blank"
            rel="noreferrer"
          >
            <i
              className=" ri-download-cloud-2-fill text-secondary"
              style={{ fontSize: "21px", color: "#3f5289" }}
            ></i>
          </a>
        </div>
      ),
      sortable: true,
      center: true,
      width: "120px",
    },
    {
      name: "process payment",
      omit:
        (userType == "fin" && role == "head") || role == "manager"
          ? false
          : true,
      selector: (d) => d.paid,
      sortable: true,
      center: "true",
      cell: (d) => (
        <div>
          {isLoading ? (
            <>
              <div
                className="spinner-border "
                role="status"
                style={{ color: "#b83016" }}
              >
                <span className="sr-only">Loading...</span>
              </div>
            </>
          ) : (
            <div
              onClick={() => {
                d.count > 0 && d.paid == 0 && onclickOpenSureD(d);
              }}
              style={{ cursor: "pointer" }}
            >
              {d.count == 0 ? (
                <img
                  src={window.location.origin + "/process_payment_grey.svg"}
                />
              ) : d.count > 0 && d.paid == "0" ? (
                <img
                  src={window.location.origin + "/process_payment_purple.svg"}
                />
              ) : (
                <img
                  src={window.location.origin + "/process_payment_green.svg"}
                />
              )}
            </div>
          )}
        </div>
      ),
    },
  ];
  const tableData = {
    columns:
      //   token_type !== "admin" ? columns.splice(0, columns.length - 1) : columns,
      columns,
    data: leadData?.req,
  };
  console.log(leadData?.req, "leads");
  return (
    <div>
      <DataTableExtensions
        {...tableData}
        export={false}
        filterPlaceholder={`Search`}
        className="filter_text"
        style={{ paddingRight: "25px important" }}
      >
        <DataTable
          columns={columns}
          data={leadData?.req}
          theme="VendorTable"
          pagination
          expandableRows={false}
          // expandableRows={userType == "om" ? true : false}
          // expandableRowsComponent={ExpandableRowComponent}
          expandableRowsHideExpander //hide the arrow icon on the left
          // progressPending={loading}
          expandOnRowClicked={true}
          customStyles={customStyles}
          highlightOnHover={true}
        />
      </DataTableExtensions>
      <ProcessRequestModal
        reqMod={reqMod}
        setReqMod={setReqMod}
        setPayment_ref={setPayment_ref}
        payment_ref={payment_ref}
        processPaymentFunc={processPaymentFunc}
      />
    </div>
  );
};

export default ProcessRequestTable;
