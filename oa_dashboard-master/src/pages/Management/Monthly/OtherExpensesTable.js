import React, { useEffect } from "react";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import DataTable, { createTheme } from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { getpaymentRequest } from "../../../assets/utils/farmingBase";
import { farming } from "../../../globalConfig";
import axios from "axios";
import AddPayout from "./AddPayout";
import UploadDumpModal from "../../Finance/modals/UploadDumpModal";
import "./MonthlyTable1.css";
import EditOtherMod from "./EditOtherMod";

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
const OtherExpensesTable = ({ table, setOtherTotal, update, inv }) => {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [dumpData, setDumpdata] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [check, setCheck] = React.useState(false);
  const [id, setId] = React.useState("");
  console.log(inv, "ggg");

  useEffect(() => {
    const link = farming.farming_URL + getpaymentRequest;
    const data = {
      invoice_id: inv,
      type: "other",
    };
    axios
      .post(link, data)
      .then((res) => {
        setData(res.data.data);
        setOtherTotal(res.data.total);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [check, update, inv]);

  const columns = [
    {
      name: "Payment Type",
      selector: "type",
      cell: (d) => (
        <div className="loanid">
          {d.type == "manual_payment" ? (
            <span
              className="badge rounded-pill badge-soft"
              style={{ minWidth: "30px", backgroundColor: "#f07d47" }}
            >
              Payout
            </span>
          ) : (
            <span
              className="badge rounded-pill badge-soft"
              style={{ minWidth: "30px", backgroundColor: "#f07d47" }}
            >
              Expense
            </span>
          )}
        </div>
      ),
      sortable: true,
      center: true,
      width: "175px",
    },
    {
      name: "Ref ID",
      selector: "req_id",
      cell: (d) => <div className="loanid">{d.req_id}</div>,
      sortable: true,
      center: true,
      width: "70px",
    },
    {
      name: "SOW ID",
      selector: "sow_id",
      omit: true,
      cell: (d) => (
        <div>
          {/* <div className="loanid">{d.sow_id}</div> */}
          <span
            className="badge rounded-pill badge-soft"
            style={{ minWidth: "30px", backgroundColor: "#f07d47" }}
          >
            {d.sow_id}
          </span>
        </div>
      ),
      sortable: true,
      center: true,
      width: "100px",
    },
    {
      name: "Created Date",
      selector: "display_date",
      cell: (d) => (
        <div className="date" style={{ minWidth: "85px" }}>
          {/* {d.display_date} */}

          <span
            className="badge rounded-pill badge-soft"
            style={{ minWidth: "30px", backgroundColor: "#f07d47" }}
          >
            {d.display_date}
          </span>
        </div>
      ),
      // sortable: true,
      center: true,
      // width: "165px",
    },

    {
      name: "b_l * b_a",
      selector: "billable_leads",
      omit: true,
      cell: (d) => (
        <div className="amt_table">
          {String(d.billable_leads) + "*" + String(d.billing_amt)}
        </div>
      ),
      sortable: true,
      center: true,
      width: "120px",
    },
    {
      name: "b_total",
      omit: true,
      cell: (d) => (
        <div className="amt_table">{d.billable_leads * d.billing_amt}</div>
      ),
      sortable: true,
      center: true,
      width: "120px",
    },
    {
      name: "t_l * cpl",
      omit: true,
      width: "120px",
      cell: (d) => (
        <div>
          {d.type == "auto_payment" && (
            <a
            // href={`${sow_repnew}?token=${token}&sow_id=${d.sow_id}&start_date=${d.start_date}&end_date=${d.end_date}&type=qc`}
            >
              <div
                className="amt_table"
                style={{
                  padding: "5px 10px",
                  fontSize: "15px",
                  cursor: "pointer",
                }}
              >
                {String(d.leads) + "*" + String(d.p_cpl)}
              </div>
            </a>
          )}
          {d.type != "auto_payment" && (
            <div className="amt_table">
              {String(d.leads) + "*" + String(d.p_cpl)}
            </div>
          )}
        </div>
      ),
      sortable: true,
      center: true,
    },
    {
      name: "Leads * CPL",
      // omit: true,
      cell: (d) => (
        <div className="amt_table">
          {d.leads} * {d.p_cpl}
        </div>
      ),
      sortable: true,
      center: true,
      width: "120px",
    },
    {
      name: "Cost/Lead",
      omit: true,
      cell: (d) => <div className="amt_table">{d.p_cpl}</div>,
      sortable: true,
      center: true,
      width: "120px",
    },
    {
      name: "Amount",
      // selector: "cpl",
      cell: (d) => <div className="amt_table">{d.p_cpl * d.leads}</div>,
      sortable: true,
      center: true,
      width: "120px",
    },
    {
      name: "Remark",
      selector: "remark",
      cell: (d) => <div className="amt_table fs-10">{d.remark}</div>,
      sortable: true,
      center: true,
      width: "120px",
    },

    {
      name: "Status",
      selector: (d) => d.status,
      cell: (d) => (
        <div>
          {d.status == "processed" ? (
            <span
              className="badge rounded-pill badge-soft-success "
              style={{ minWidth: "100px" }}
            >
              Processed
            </span>
          ) : (
            <span
              className="badge rounded-pill badge-soft-warning "
              style={{ minWidth: "100px" }}
            >
              Pending
            </span>
          )}
        </div>
      ),
      sortable: true,
      center: true,
      // width: "140px",
    },

    {
      name: "action",
      // omit: true,
      width: "100px",
      center: "true",
      cell: (d) => (
        <div>
          <UncontrolledDropdown className="dropdown d-inline-block">
            <DropdownToggle
              style={{ background: "#fff", border: "none" }}
              onClick={() => {
                setDumpdata(d);
                console.log(d, "dumpdata");
              }}
            >
              <i
                className="  ri-more-2-fill align-middle text-dark bg-light p-1 "
                style={{
                  borderRadius: "4px",
                }}
              ></i>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              <DropdownItem
                className="edit-item-btn d-flex align-items-center"
                onClick={() => {
                  // dumpData.paid == "0" && openUpdateModal(d);
                  setOpen2(!open2);
                }}
                style={{
                  border: "none",
                  // filter:
                  //   dumpData.paid > "0"
                  //     ? "blur(2                                                                                                                 px)"
                  //     : "",
                }}
                // disabled={dumpData.paid > "0" ? true : false}
              >
                <i className="  ri-edit-line align-bottom me-2 text-muted"></i>
                Edit
              </DropdownItem>
              <DropdownItem
                className="edit-item-btn d-flex align-items-center"
                onClick={() => {
                  setOpen(!open);
                }}
              >
                <i className=" ri-upload-line align-bottom me-2 text-muted"></i>
                Upload
              </DropdownItem>
              {/* <DropdownItem
                className="edit-item-btn d-flex align-items-center"
                onClick={() => {
                  // setOpen3(!open3);
                }}
              >
                <i className=" ri-arrow-right-line align-bottom me-2 text-muted"></i>
                Move To Invoice
              </DropdownItem> */}
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      ),
    },
  ];

  const tableData = {
    columns: columns,
    data: data,
  };

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
          className="invoice_table"
          columns={columns}
          data={data}
          theme="VendorTable"
          pagination
          paginationPerPage={5}
          expandableRows={false}
          // expandableRows={userType == "om" ? true : false}
          //   expandableRowsComponent={ExpandableRowComponent}
          expandableRowsHideExpander //hide the arrow icon on the left
          progressPending={loading}
          expandOnRowClicked={true}
          customStyles={customStyles}
          highlightOnHover={true}
        />
      </DataTableExtensions>
      <UploadDumpModal open={open} setOpen={setOpen} d={dumpData} />
      <EditOtherMod
        open={open2}
        setOpen={setOpen2}
        d={dumpData}
        setCheck={setCheck}
        check={check}
      />
    </div>
  );
};

export default OtherExpensesTable;
