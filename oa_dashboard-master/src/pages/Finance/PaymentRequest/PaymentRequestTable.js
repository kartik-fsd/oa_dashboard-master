import React from "react";
import DataTable from "react-data-table-component";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  UncontrolledTooltip,
} from "reactstrap";
import DataTableExtensions from "react-data-table-component-extensions";
import PaymentRequestModal from "./PaymentRequestModal";
import { useHistory } from "react-router-dom";
import { filter } from "lodash";
import PipelineModal from "../../Management/PipelineModal";
import SplitModal from "./SplitModal";

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

const PaymentRequestTable = ({ data, updated, setUpdated }) => {
  const history = useHistory();
  const [singleData, setSingledata] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [editData, setEditData] = React.useState({});
  const [error, setError] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [sendData, setSendData] = React.useState({});
  const [open4, setOpen4] = React.useState(false);
  const closeConfirm3 = () => {
    setOpen4(!open4);
  };

  const handleCloseEditModal = () => {
    setOpen(false);
    setError(false);
  };

  const columns = [
    {
      name: <div>Project</div>,
      selector: (row) => row.sow_id,
      sortable: true,
      width: "220px",
      // cell: (d) => (
      //   <div>
      //     <span
      //       className="badge rounded-pill badge-soft-primary"
      //       style={{ width: "50px" }}
      //     >
      //       {d.sow_id}
      //     </span>
      //   </div>
      // ),
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
                  <div className="avatar-title rounded-circle bg-soft-primary  text-primary">
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
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setSendData(d);
                  setOpen3(!open3);
                }}
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
      name: <div>Requestor</div>,
      selector: (row) => row.sow_id,
      sortable: true,
      width: "200px",
      cell: (d) => (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div>
              {d?.brand_logo ? (
                <img
                  src={d.profile_image}
                  alt=""
                  className="rounded-circle avatar-sm"
                  style={{ width: "32px", height: "32px" }}
                />
              ) : (
                <div className="avatar-sm">
                  <div className="avatar-title rounded-circle bg-soft-primary  text-primary">
                    {d?.req_name?.charAt(0) ?? ""}
                  </div>
                </div>
              )}
            </div>

            <div>
              <div className="fs-10">
                <div>
                  {d.req_name} &nbsp;{" "}
                  <i
                    className="ri-information-fill"
                    style={{ marginTop: "10px" }}
                    id={`tooltipTop${d.req_id}`}
                  ></i>
                  <UncontrolledTooltip
                    placement="top"
                    target={`tooltipTop${d.req_id}`}
                  >
                    {d?.req_remark}
                  </UncontrolledTooltip>
                </div>
              </div>
              <div style={{ display: "flex" }}>
                {/* <div className="fs-10">Req on </div> */}
                <div
                  className="fs-10 fs-10 text-muted"
                  style={{ fontWeight: 500 }}
                >
                  &nbsp;{d.request_date}
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      name: "Type",
      selector: (row) => row.user_type,
      sortable: true,
      width: "100px",
      center: true,
      cell: (d) => (
        <div className="amt_table text-primary">
          {d.user_type == "direct_sp" ? (
            <span
              className="badge rounded-pill badge-soft-success"
              style={{ width: "60px" }}
            >
              Managed
            </span>
          ) : d.user_type == "indirect_sp" ? (
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
      name: "Leads",
      selector: (row) => row.leads,
      width: "80px",
      cell: (d) => (
        <div>
          <span className="fs-10" style={{ fontWeight: 600 }}>
            {d.leads} * {d.p_cpl}
          </span>
        </div>
      ),
      sortable: true,
      center: true,
    },

    {
      name: "Approved Date",
      selector: (row) => row.display_date,
      sortable: true,
      width: "150px",
      cell: (d) => (
        <div style={{ fontWeight: "600", foontSize: "10px" }}>
          <span className="badge rounded-pill badge-soft-dark">
            {d.display_date}
          </span>
        </div>
      ),
      center: true,
    },

    {
      name: "Splits",
      selector: (row) => row.leads,
      width: "80px",
      cell: (d) => (
        <div>
          <span
            className="fs-10"
            style={{
              fontWeight: 600,
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            {d.splits}
          </span>
        </div>
      ),
      sortable: true,
      center: true,
    },

    {
      name: "Status",
      // right: true,
      center: true,
      // width: "50px",
      cell: (d) => (
        <div>
          <UncontrolledDropdown className="dropdown d-inline-block">
            <DropdownToggle
              className="btn btn-soft-secondary btn-sm"
              tag="button"
              onClick={() => setSingledata(d)}
            >
              <i
                className="ri-more-fill align-middle"
                style={{ color: "black" }}
              ></i>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              <DropdownItem
                className="edit-item-btn d-flex align-items-center"
                onClick={() => {
                  setOpen(!open);
                }}
              >
                <i className=" ri-recycle-line align-bottom me-2 text-muted"></i>
                Process
              </DropdownItem>
              {d.status == "none" && d.split_status == "none" ? (
                <DropdownItem
                  className="edit-item-btn d-flex align-items-center"
                  onClick={() => {
                    console.log(d, "ddddeeee");
                    localStorage.setItem("splitreqdata", JSON.stringify(d));
                    // history.push(`/splitrequestnew/${d.req_id}`);
                    setOpen4(!open4);
                  }}
                >
                  <i className="ri-contacts-book-line align-bottom me-2 text-muted"></i>
                  split request
                </DropdownItem>
              ) : (
                ""
              )}
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
          columns={columns}
          data={data}
          theme="VendorTable"
          pagination
          expandableRows={false}
          expandableRowsHideExpander //hide the arrow icon on the left
          // progressPending={loading}
          expandOnRowClicked={true}
          customStyles={customStyles}
          highlightOnHover={true}
        />
      </DataTableExtensions>
      <PaymentRequestModal
        updated={updated}
        setUpdated={setUpdated}
        open={open}
        setOpen={setOpen}
        singleData={singleData}
        editData={editData}
        setEditData={setEditData}
        error={error}
        setError={setError}
        handleCloseEditModal={handleCloseEditModal}
      />

      <SplitModal
        onCloseClick={closeConfirm3}
        show={open4}
        id={singleData.req_id}
        updated={updated}
        setUpdated={setUpdated}
      />
      <PipelineModal open={open3} setOpen={setOpen3} data={sendData} />
    </div>
  );
};

export default PaymentRequestTable;
