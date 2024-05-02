import React, { useEffect } from "react";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import DataTable, { createTheme } from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import axios from "axios";
import { farming } from "../../../globalConfig";
import {
  getpaymentRequest,
  payout_report,
} from "../../../assets/utils/farmingBase";

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
const PayoutTable = ({ table, setPayoutTotal, setLeads }) => {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [dumpData, setDumpdata] = React.useState({});
  const [open, setOpen] = React.useState(false);

  const payout_reportnew = farming.farming_URL + payout_report;
  const token = sessionStorage.getItem("token");
  console.log(token, "token");

  useEffect(() => {
    const link = farming.farming_URL + getpaymentRequest;
    const data = {
      invoice_id: table.invoice_id,
      type: "auto",
    };
    axios
      .post(link, data)
      .then((res) => {
        setData(res.data.data);
        setPayoutTotal(res.data.total);
        setLeads(res.data.total_leads);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  // const columns = [
  //   {
  //     name: "Payment ID",
  //     //   width: "100px",
  //     selector: (row) => row.sow_id,
  //     sortable: true,

  //     // width:'180px',
  //     center: true,
  //     cell: (d) => <div>1234</div>,
  //   },
  //   {
  //     name: "Upload",
  //     //   width: "100px",
  //     selector: (row) => row.sow_id,
  //     sortable: true,

  //     // width:'180px',
  //     center: true,
  //     cell: (d) => (
  //       <div>
  //         <i className=" ri-upload-cloud-2-fill fs-23 text-secondary"></i>
  //       </div>
  //     ),
  //   },
  //   {
  //     name: "Project Details",
  //     selector: (row) => row.brand_logo,
  //     sortable: true,
  //     center: true,
  //     omit: true,
  //     minWidth: "250px",
  //     cell: (d) => (
  //       <div
  //         style={{
  //           display: "flex",
  //           flexDirection: "row",
  //           // justifyContent: "center",
  //           gap: "10px",
  //           alignItems: "flex-start",
  //           width: "200px",
  //         }}
  //       >
  //         <div>
  //           <img
  //             src={"/user-dummy-img.jpg"}
  //             alt="brand logo"
  //             className="rounded-avatar-xs"
  //             width="40px"
  //             height={"40px"}
  //             style={{ borderRadius: "50%" }}
  //           />
  //         </div>

  //         <div>project title testing</div>
  //       </div>
  //     ),
  //     // center: true,
  //   },

  //   {
  //     name: "Count",
  //     omit: true,
  //     //   width: "60px",
  //     selector: (row) => row.add_lead_status,
  //     sortable: true,
  //     cell: (d) => <div>1234</div>,

  //     center: true,
  //   },
  //   {
  //     name: "Cost",
  //     //   width: "100px",
  //     selector: (row) => row.sow_id,
  //     sortable: true,

  //     // width:'180px',
  //     center: true,
  //     cell: (d) => <div>1234</div>,
  //   },
  //   {
  //     name: "Description",
  //     //   width: "100px",
  //     selector: (row) => row.sow_id,
  //     sortable: true,

  //     // width:'180px',
  //     center: true,
  //     cell: (d) => <div>1234</div>,
  //   },
  //   {
  //     name: "Amount",
  //     //   width: "100px",
  //     selector: (row) => row.sow_id,
  //     sortable: true,

  //     // width:'180px',
  //     center: true,
  //     cell: (d) => <div>1234</div>,
  //   },
  //   {
  //     name: "Status",
  //     //   width: "100px",
  //     selector: (row) => row.sow_id,
  //     sortable: true,

  //     // width:'180px',
  //     center: true,
  //     cell: (d) => <div>1234</div>,
  //   },

  //   {
  //     name: "",
  //     right: true,
  //     width: "50px",
  //     omit: true,
  //     cell: (d) => (
  //       <div>
  //         <UncontrolledDropdown className="dropdown d-inline-block">
  //           <DropdownToggle style={{ background: "#fff", border: "none" }}>
  //             <i
  //               className="ri-more-fill align-middle"
  //               style={{ color: "black" }}
  //             ></i>
  //           </DropdownToggle>
  //           <DropdownMenu className="dropdown-menu-end">
  //             <DropdownItem
  //               className="edit-item-btn d-flex align-items-center"
  //               onClick={() => {
  //                 "";
  //               }}
  //             >
  //               <i className="ri-file-edit-line align-bottom m-0 me-2 text-muted"></i>
  //               Add/Edit Target
  //             </DropdownItem>
  //           </DropdownMenu>
  //         </UncontrolledDropdown>
  //       </div>
  //     ),
  //   },
  // ];

  const columns = [
    {
      name: "Payment Type",
      selector: "type",
      omit: true,
      cell: (d) => (
        <div className="loanid">
          {d.type?.split("_")[0]} {d.type?.split("_")[1]}
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
      // width: "70px",
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
      name: "Leads",
      // omit: true,
      cell: (d) => <div className="amt_table">{d.leads}</div>,
      sortable: true,
      center: true,
      // width: "120px",
    },
    {
      name: "Cost/Lead",
      // omit: true,
      cell: (d) => <div className="amt_table">{d.p_cpl}</div>,
      sortable: true,
      center: true,
      // width: "120px",
    },
    {
      name: "Amount",
      // selector: "cpl",
      cell: (d) => (
        <div className="amt_table ">
          <a href={`${payout_reportnew}?token=${token}&req_id=${d.req_id}`}>
            <span className="text-secondary">{d.p_cpl * d.leads}</span>
          </a>
        </div>
      ),
      sortable: true,
      center: true,
      // width: "120px",
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
      omit: true,
      width: "100px",
      center: "true",
      cell: (d) => (
        <div>
          <UncontrolledDropdown className="dropdown d-inline-block">
            <DropdownToggle
              style={{ background: "#fff", border: "none" }}
              onClick={() => {
                // setDumpdata(d);
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
                  console.log("hii");
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
                  // setOpen(!open);
                }}
              >
                <i className=" ri-upload-line align-bottom me-2 text-muted"></i>
                Upload
              </DropdownItem>
              <DropdownItem
                className="edit-item-btn d-flex align-items-center"
                onClick={() => {
                  // setOpen3(!open3);
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
    </div>
  );
};

export default PayoutTable;
