import React, { useState } from "react";
import { indianNumbers } from "../../components/common/indianNumbers";
import DataTable, { createTheme } from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import {
  Card,
  CardBody,
  CardHeader,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import "./inv2022.css";
import { farming } from "../../globalConfig";
import { sow_rep } from "../../assets/utils/farmingBase";
import UploadDumpModal from "./modals/UploadDumpModal";
import MoveToInvModal from "./modals/MoveToInvModal";
import AddPayoutModal from "./modals/AddPayoutModal";

createTheme("solarized", {
  text: {
    primary: "black",
    secondary: "#b2b2b2",
  },
  background: {
    default: "#fff",
  },
  boxshadow: {
    default: "5px 5px 30px #DEDEDEBF",
  },
  context: {
    background: "#cb4b16",
    text: "#FFFFFF",
  },
  divider: {
    default: "#f1f1f1",
  },
  action: {
    button: "rgba(0,0,0,.54)",
    hover: "rgba(0,0,0,.08)",
    disabled: "rgba(0,0,0,.12)",
  },
});

const PayoutDetailsTable = (props) => {
  const {
    leadData,
    totalcount,
    data,
    setupdateBoolProcess,
    updateboolProcess,
  } = props;
  const [dumpData, setDumpdata] = useState({});
  const [updateDetailsData, setUpdateDetailsData] = useState({});
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);

  const sow_repnew = farming.farming_URL + sow_rep;
  const token = sessionStorage.getItem("token");
  console.log(leadData, "lead");

  const openUpdateModal = (d) => {
    let ot = {
      type: d.type,
      cpl: d.p_cpl,
      leads: d.leads,
      billable_leads: d.billable_leads,
      request_id: d.req_id,
      billing_amt: d.billing_amt,
      start_date: d.start_date,
      end_date: d.end_date,
    };
    setUpdateDetailsData(ot);
    setOpen2(true);
  };

  const columns = [
    {
      name: "Payment Type",
      selector: "type",
      cell: (d) => (
        <div className="loanid">
          {d.type.split("_")[0]} {d.type.split("_")[1]}
        </div>
      ),
      sortable: true,
      center: true,
      width: "175px",
    },
    {
      name: "ID",
      selector: "req_id",
      cell: (d) => <div className="loanid">{d.req_id}</div>,
      sortable: true,
      center: true,
      width: "70px",
    },
    {
      name: "SOW ID",
      selector: "sow_id",

      cell: (d) => (
        <div>
          {/* <div className="loanid">{d.sow_id}</div> */}
          <span
            className="badge rounded-pill badge-soft-primary"
            style={{ minWidth: "30px" }}
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
      name: " Date",
      selector: "display_date",
      cell: (d) => (
        <div className="date" style={{ minWidth: "85px" }}>
          {/* {d.display_date} */}

          <span
            className="badge rounded-pill badge-soft-primary"
            style={{ minWidth: "30px" }}
          >
            {d.display_date}
          </span>
        </div>
      ),
      // sortable: true,
      center: true,
      width: "165px",
    },

    {
      name: "b_l * b_a",
      selector: "billable_leads",
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

      cell: (d) => (
        <div className="amt_table">{d.billable_leads * d.billing_amt}</div>
      ),
      sortable: true,
      center: true,
      width: "120px",
    },
    {
      name: "t_l * cpl",
      // selector: "leads",
      width: "120px",
      cell: (d) => (
        <div>
          {d.type == "auto_payment" && (
            <a
              href={`${sow_repnew}?token=${token}&sow_id=${d.sow_id}&start_date=${d.start_date}&end_date=${d.end_date}&type=qc`}
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
      name: "t_amt",
      // selector: "cpl",
      cell: (d) => <div className="amt_table">{d.p_cpl * d.leads}</div>,
      sortable: true,
      center: true,
      width: "120px",
    },

    {
      name: " DAys left",
      selector: (d) => d.days_left,
      cell: (d) => (
        <div>
          {d.paid > "0" ? (
            <span className="badge rounded-pill badge-soft-success ">Paid</span>
          ) : d.days_left > 0 ? (
            <span className="badge rounded-pill badge-soft-success">{`Due in ${d.days_left} Days`}</span>
          ) : d.days_left < 0 ? (
            <span className="badge rounded-pill badge-soft-danger">{`Overdue by ${Math.abs(
              d.days_left
            )} Days`}</span>
          ) : (
            <span className="badge rounded-pill badge-soft-warning">{`Not Updated`}</span>
          )}
        </div>
      ),
      sortable: true,
      center: true,
      width: "140px",
    },

    {
      name: "action",
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
                  dumpData.paid == "0" && openUpdateModal(d);
                  console.log("hii");
                }}
                style={{
                  border: "none",
                  filter:
                    dumpData.paid > "0"
                      ? "blur(2                                                                                                                 px)"
                      : "",
                }}
                disabled={dumpData.paid > "0" ? true : false}
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
              <DropdownItem
                className="edit-item-btn d-flex align-items-center"
                onClick={() => {
                  setOpen3(!open3);
                }}
              >
                <i className=" ri-arrow-right-line align-bottom me-2 text-muted"></i>
                Move To Invoice
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      ),
    },
  ];

  const dataTable = {
    columns: columns,
    data: leadData,
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <div
            className="d-flex justify-content-end align-items-center gap-4 "
            style={{ marginRight: "228px" }}
          >
            <div>
              <span
                className="badge badge-soft-dark d-flex align-items-center justify-content-center px-3  fs-12 text-center"
                style={{ height: "40px", minWidth: "186px" }}
              >
                Total Payout : {indianNumbers(totalcount, 2)}
              </span>
            </div>
            <div>
              <button
                className="btn btn-primary mb-1"
                onClick={() => {
                  setOpen4(!open4);
                }}
              >
                <i className="ri-add-fill align-middle me-1"></i>
                Add
              </button>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <div className="payout_input">
            <DataTableExtensions
              {...dataTable}
              filterPlaceholder={`Search`}
              print={false}
              export={false}
            >
              <DataTable
                columns={columns}
                data={dataTable}
                defaultSortFieldId={1}
                pagination
                paginationPerPage={5}
                theme="solarized"
              />
            </DataTableExtensions>
          </div>
        </CardBody>
      </Card>
      <UploadDumpModal open={open} setOpen={setOpen} d={dumpData} />
      <MoveToInvModal
        open3={open3}
        setOpen3={setOpen3}
        data={data}
        table={dumpData}
      />
      <AddPayoutModal
        open4={open4}
        setOpen4={setOpen4}
        updateboolProcess={updateboolProcess}
        setupdateBoolProcess={setupdateBoolProcess}
      />
    </div>
  );
};

export default PayoutDetailsTable;
