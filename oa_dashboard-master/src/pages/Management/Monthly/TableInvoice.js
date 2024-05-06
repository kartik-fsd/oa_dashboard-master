import React from "react";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
  ModalBody,
  ModalHeader,
  UncontrolledDropdown,
} from "reactstrap";
import DataTable, { createTheme } from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { EditInvModal } from "./EditModal";
import { projInvinfo } from "../../../assets/utils/farmingBase";
import { farming } from "../../../globalConfig";
import axios from "axios";
import moment from "moment/moment";
import "./MonthlyTable1.css";

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
const TableInvoice = (props) => {
  console.log(props.userData, "popps");
  const { table, open, setOpen } = props;
  const [loading, setLoading] = React.useState(false);
  const [editMod, setEditMod] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [editData, setEditData] = React.useState({});
  const [check, setCheck] = React.useState(false);

  const token = sessionStorage.getItem("token");

  const today = new Date();
  const date = moment(today).format("DD-MMM-YYYY");

  console.log(moment(today).format("DD-MMM-YYYY"), "today");
  console.log(table.sow_id, "asd");

  React.useEffect(() => {
    const link = farming.farming_URL + projInvinfo + "/" + table.sow_id;
    async function getData() {
      const resData = await axios.get(link);
      console.log(resData.data.data, "res");
      setData(resData.data.data);
    }

    try {
      getData();
    } catch (error) {
      console.log(error);
    }
  }, [check]);

  const columns = [
    {
      name: "INV No",
      width: "100px",
      selector: (row) => row.invoice_number,
      sortable: true,

      // width:'180px',
      //   center: true,
      cell: (d) => (
        <div className="d-flex flex-column gap-1 justify-content-center align-items-center">
          <span>
            <span
              className="badge rounded-pill badge-soft text-dark"
              style={{
                minWidth: "55px",
                textDecoration: "underline",
                backgroundColor: "#fde8d7",
              }}
            >
              <a
                target={"_blank"}
                href={`${farming.farming_URL}/invoatoken/downloadinvoice?invoice_id=${d.invoice_id}&token=${token} `}
                download
                rel="noreferrer"
              >
                <span className="fs-10" style={{ color: "#f07d47" }}>
                  {d.invoice_number}
                </span>
              </a>
            </span>
          </span>

          <a
            target={"_blank"}
            href={`${farming.farming_URL}/invoatoken/xyz?invoice_id=${d.invoice_id}&token=${token} `}
            download
            rel="noreferrer"
          >
            <span className="fs-10" style={{ color: "#400f0a" }}>
              {" "}
              {d.bill_date}
            </span>
          </a>
        </div>
      ),
    },
    {
      name: "Due Date",
      selector: (row) => row.due,
      sortable: true,
      //   omit: true,
      center: true,
      // width:'180px',
      cell: (d) => (
        <div>
          {/* <span
            className="badge rounded-pill "
            style={{
              width: "60px",
              fontWeight: 600,
              fontSize: "12px",
              background: "black",
            }}
          >
            {12345}
          </span> */}
          <span
            className={`${
              d.due == date
                ? "text-warning"
                : d.due < date
                ? "text-danger"
                : "text-success"
            }`}
          >
            {d.due}
          </span>

          {/* <div
              style={{
                fontSize: "12px",
                marginTop: "2px",
                marginLeft: "20px",
                color: "#7b96ae",
              }}
            >
              +{23}
            </div> */}
        </div>
      ),
    },
    {
      name: "Project Details",
      selector: (row) => row.brand_logo,
      sortable: true,
      center: true,
      omit: true,
      minWidth: "250px",
      cell: (d) => (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            // justifyContent: "center",
            gap: "10px",
            alignItems: "flex-start",
            width: "200px",
          }}
        >
          <div>
            <img
              src={"/user-dummy-img.jpg"}
              alt="brand logo"
              className="rounded-avatar-xs"
              width="40px"
              height={"40px"}
              style={{ borderRadius: "50%" }}
            />
          </div>

          <div>project title testing</div>
        </div>
      ),
      // center: true,
    },

    {
      name: "Team",
      selector: (row) => row.profile_image,
      sortable: true,
      omit: true,
      cell: (d, index) => (
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              alignItems: "center",
              width: "200px",
              height: "100px",
            }}
          >
            <div>
              <img
                src={d.oa_profile}
                alt="brand logo"
                className="rounded-avatar-md"
                width="50px"
                height={"50px"}
                style={{ borderRadius: "50%" }}
              />
            </div>

            <div className="fs-12 w-100">
              <div className="fs-14 fw-semi-bold">
                {d.oa_name}{" "}
                <span
                  className="badge badge-soft"
                  style={{ backgroundColor: "#f07d47" }}
                >
                  {d.oa_count > 0 ? `+${d.oa_count}` : "0"}
                </span>
              </div>{" "}
              <span className="fs-10 text-muted">
                Manager: {d.manager_name}
              </span>
            </div>
          </div>
        </div>
      ),
      // center: true,
      // width:'180px',
    },

    {
      name: "Due Date",
      omit: true,
      width: "60px",
      selector: (row) => row.add_lead_status,
      sortable: true,
      cell: (d) => <div>1-12-2022</div>,

      center: true,
    },
    {
      name: "Amount",
      selector: (row) => row.revenue,
      sortable: true,
      //   omit: omitData || omit3,
      center: true,
      // width:'180px',
      cell: (d) => (
        <div>
          {/* <span
            className="badge rounded-pill "
            style={{
              width: "60px",
              fontWeight: 600,
              fontSize: "12px",
              background: "grey",
            }}
          >
            {1234}
          </span> */}
          {d.revenue == null ? 0 : d.revenue}
          {/* <div
            style={{
              fontSize: "12px",
              marginTop: "2px",
              marginLeft: "20px",
              color: "white",
            }}
          >
            {` -`}
          </div> */}
        </div>
      ),
    },
    {
      name: "E-Invoice",
      selector: (row) => row.leads_last_month,
      sortable: true,
      //   omit: omitData || omit3,
      center: true,
      // width:'180px',
      cell: (d) => (
        <div>
          {/* <span
            className="badge rounded-pill "
            style={{
              width: "60px",
              fontWeight: 600,
              fontSize: "12px",
              background: "black",
            }}
          >
            {12345}
          </span>

          <div
            style={{
              fontSize: "12px",
              marginTop: "2px",
              marginLeft: "20px",
              color: "white",
            }}
          >
            {` -`}
          </div> */}
          <span color="dark">{d.e_invoice_no}</span>
        </div>
      ),
    },
    {
      name: "Activity Date",
      selector: (row) => row.activity_date,
      sortable: true,
      //   omit: true,
      center: true,
      // width:'180px',
      cell: (d) => (
        <div>
          {/* <span
            className="badge rounded-pill "
            style={{
              width: "60px",
              fontWeight: 600,
              fontSize: "12px",
              background: "black",
            }}
          >
            {12345}
          </span> */}

          <span style={{ color: "green" }}>{d.activity_date}</span>
          {/* <div
            style={{
              fontSize: "12px",
              marginTop: "2px",
              marginLeft: "20px",
              color: "#7b96ae",
            }}
          >
            +{23}
          </div> */}
        </div>
      ),
    },
    {
      name: "Payment Status",
      selector: (row) => row.is_paid,
      sortable: true,
      //   omit: true,
      center: true,
      // width:'180px',
      cell: (d) => (
        <div>
          <span
            className="badge badge-soft"
            style={{
              minWidth: "100px",
              backgroundColor: "#fde8d7",
              color: "#400f0a",
            }}
          >
            {d?.is_paid == "yes"
              ? "Paid"
              : d?.is_paid == "no" && d?.diff > 0
              ? `Due in ${d.diff} Days`
              : d?.is_paid == "no" && d?.diff < 0
              ? `Overdue in ${Math.abs(d?.diff)} Days`
              : d?.is_paid == "no" && d?.diff == null
              ? `Update Due Date`
              : "Partially Paid"}
          </span>
        </div>
      ),
    },

    {
      name: "",
      right: true,
      width: "50px",
      // omit: true,
      cell: (d) => (
        <>
          {props.userData?.type == "all" || props.userData?.type == "fin" ? (
            <div>
              <UncontrolledDropdown className="dropdown d-inline-block">
                <DropdownToggle style={{ background: "#fff", border: "none" }}>
                  <i
                    className="ri-more-fill align-middle"
                    style={{ color: "black" }}
                  ></i>
                </DropdownToggle>
                {props.userData?.type == "all" ||
                props.userData?.type == "fin" ? (
                  <DropdownMenu className="dropdown-menu-end">
                    <DropdownItem
                      className="edit-item-btn d-flex align-items-center"
                      onClick={() => {
                        setEditMod(!editMod);
                        setEditData(d);
                      }}
                    >
                      <i className="ri-file-edit-line align-bottom m-0 me-2 text-muted"></i>
                      Edit
                    </DropdownItem>
                  </DropdownMenu>
                ) : (
                  ""
                )}
              </UncontrolledDropdown>
            </div>
          ) : (
            ""
          )}
        </>
      ),
    },
  ];

  const tableData = {
    columns: columns,
    data: data,
  };

  return (
    <>
      <Modal
        id="signupModals"
        tabIndex="-1"
        isOpen={open}
        size="xl"
        toggle={() => {
          setOpen(false);
        }}
        centered={true}
      >
        <ModalHeader
          toggle={() => {
            setOpen(false);
          }}
        >
          <h5 style={{ color: "#3f5289 ", alignItems: "flex-end" }}>Invoice</h5>
        </ModalHeader>
        <ModalBody>
          <div style={{ marginTop: "65px" }}>
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
        </ModalBody>
      </Modal>
      <EditInvModal
        editMod={editMod}
        setEditMod={setEditMod}
        editData={editData}
        setCheck={setCheck}
        check={check}
      />
    </>
  );
};

export default TableInvoice;
