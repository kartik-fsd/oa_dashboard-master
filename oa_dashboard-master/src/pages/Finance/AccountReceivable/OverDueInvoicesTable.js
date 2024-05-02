import axios from "axios";
import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import { extract_token } from "../../../assets/utils/common";
import { paySummary } from "../../../assets/utils/farmingBase";
import { api, farming } from "../../../globalConfig";
import PaymentModal from "./PaymentModal";
const indianNumbers = (num, len) => {
  return Number(num).toLocaleString("en-IN", {
    maximumFractionDigits: len,
  });
};

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

const OverDueInvoicesTable = ({ tableData, setCheck, check }) => {
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  const [paysum, setPaysum] = React.useState([]);
  const [role, setRole] = React.useState("");
  const [id, setId] = React.useState("");
  const type = sessionStorage.getItem("checktype");

  useEffect(() => {
    const pathName = api.VENDOR_URL + extract_token;

    axios
      .get(pathName)
      .then((res) => {
        setRole(res.data.role);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const columns = [
    {
      name: (
        <div className="d-flex justify-content-center w-100">Invoice Info</div>
      ),
      selector: (row) => row["invoice_number"],
      sortable: true,
      cell: (d) => (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div>
              <div className="avatar-sm">
                <div
                  className="avatar-title rounded-circle bg-soft "
                  style={{ color: "#b83016", backgroundColor: "f07d47" }}
                >
                  {d?.brand_name[0] ?? ""}
                </div>
              </div>
            </div>
            <div>
              <div className="fs-12">{d.brand_name}</div>
              <div className="fs-10 text-muted">{d?.companyname ?? ""}</div>
              <div
                style={{ display: "flex", gap: "5px", alignItems: "center" }}
              >
                <div className="fs-10 text-muted">
                  Billed on {d.created_on}
                  <span
                    className="badge badge-soft"
                    style={{ backgroundColor: "f07d47" }}
                  >
                    {d.net}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      name: "Inv No",
      selector: "amount",
      cell: (d) => (
        <div className=" fs-16" style={{ cursor: "pointer", color: "#b83016" }}>
          <div>
            <span
              className="badge badge-soft"
              style={{ textDecoration: "underline", backgroundColor: "f07d47" }}
            >
              {d.year == "2022"
                ? ` 22-23 / ${d["invoice_number"]}`
                : d.year == "2023"
                ? ` 23-24 / ${d["invoice_number"]}`
                : d["invoice_number"]}
            </span>
          </div>
        </div>
      ),
      sortable: true,
      width: "120px",
      // center: true,
    },
    {
      name: "Amount",
      selector: "amount",
      cell: (d) => (
        <div className=" fs-12" style={{ color: "#b83016" }}>
          &#x20B9;&nbsp;{indianNumbers(d.amount, 2)}
        </div>
      ),
      sortable: true,
      width: "120px",
      // center: true,
    },
    {
      name: "Balance",
      selector: "balance",
      cell: (d) => (
        <div className=" fs-12" style={{ color: "#b83016" }}>
          &#x20B9;&nbsp;{indianNumbers(d.remaining_amount, 2)}
        </div>
      ),
      sortable: true,
      width: "120px",
    },
    {
      name: "Due Date",
      selector: "due",
      cell: (d) => (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <div className="fs-12">{d.due}</div>
        </div>
      ),
      sortable: true,
      width: "130px",
      center: true,
    },
    {
      name: "Status",
      selector: "status",
      cell: (d) => (
        <div>
          <span
            className={`badge rounded-pill badge-soft-${
              d.is_paid == "no" ? "danger" : "warning"
            }`}
          >
            {d.is_paid == "no" ? "Not Paid" : "Partially Paid"}
          </span>
        </div>
      ),
      sortable: true,
      width: "130px",
      center: true,
    },
    {
      name: "",
      right: true,
      width: "70px",
      center: true,
      omit:
        type == "fin" && (role == "manager" || role == "head") ? false : true,
      cell: (d) => (
        <div>
          <UncontrolledDropdown className="dropdown d-inline-block">
            <DropdownToggle
              className="btn btn-soft-secondary btn-sm"
              tag="button"
              onClick={() => {
                setUserData(d);
                const paySummaryURL =
                  farming.farming_URL + paySummary + d.invoice_id;

                axios
                  .get(paySummaryURL)
                  .then((res) => {
                    setPaysum(res.data.data);
                    console.log(res.data.data, "ubb");
                  })
                  .catch((err) => {
                    console.log(err);
                  });
                setOpen(!open);
              }}
            >
              <i
                className=" ri-exchange-line align-middle"
                style={{ color: "black" }}
              ></i>
            </DropdownToggle>
          </UncontrolledDropdown>
        </div>
      ),
    },
  ];

  const data = {
    columns,
    data: tableData,
  };

  return (
    <>
      <DataTableExtensions
        {...data}
        export={false}
        filterPlaceholder={`Search`}
        className="filter_text"
        style={{ paddingRight: "25px important" }}
      >
        <DataTable
          columns={columns}
          data={tableData}
          theme="VendorTable"
          pagination
          progressPending={false}
          expandOnRowClicked={true}
          customStyles={customStyles}
          highlightOnHover={true}
        />
      </DataTableExtensions>
      <PaymentModal
        open={open}
        setOpen={setOpen}
        userData={userData}
        setCheck={setCheck}
        check={check}
        paysum={paysum}
      />
    </>
  );
};

export default OverDueInvoicesTable;
