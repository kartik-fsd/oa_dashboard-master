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
import {
  accSummary,
  paySummary,
  update_invoice,
} from "../../../assets/utils/farmingBase";
import AreYouSureModal from "../../../components/common/AreYouSureModal";
import { api, farming } from "../../../globalConfig";
import BadDebtModal from "./BadDebtModal";
import PaymentModal from "./PaymentModal";
import "./financesummary.css";
import { successnotify, warningnotify } from "../../Toasts";
import { useParams, useLocation } from "react-router-dom";

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

const FinanceSummaryTable = ({
  data,
  isLoading,
  err,
  check,
  setCheck,
  filter,
}) => {
  const [role, setRole] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const type = sessionStorage.getItem("checktype");
  const [userData, setUserData] = React.useState({});
  const [paysum, setPaysum] = React.useState([]);

  const { pathname } = useLocation();

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

  const onCloseClick = () => {
    setOpen2(false);
  };

  const onSubmitClick = (value) => {
    const link = farming.farming_URL + update_invoice;
    const body = {
      invoice_id: userData.invoice_id,
      bad_debt: userData.bad_debt == "no" ? "yes" : "no",
    };

    axios
      .post(link, body)
      .then((res) => {
        successnotify("success");
        setCheck(!check);
        setOpen2(!open2);
      })
      .catch((err) => {
        console.log(err);
        warningnotify("oops something went wrong...!");
      });
  };

  const columns = [
    {
      name: (
        <div className="d-flex justify-content-center w-100">
          {pathname == "/management/ar-summary"
            ? "Client Info"
            : "Invoice Info"}
        </div>
      ),
      selector: (row) => row["invoice_number"],
      sortable: true,
      cell: (d) => (
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              width: "max-content",
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
                  <div
                    className="avatar-title rounded-circle bg-soft"
                    style={{ color: "#b83016", backgroundColor: "#f07d47" }}
                  >
                    {d?.brand_name?.charAt(0) ?? ""}
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
                style={{ display: "flex", gap: "5px", alignItems: "center" }}
              >
                {pathname == "/management/ar-summary" ? (
                  <div className="fs-10 text-muted"></div>
                ) : (
                  <div className="fs-10 text-muted d-flex flex-column my-1">
                    Billed on {d?.created_on}{" "}
                    <span
                      className="badge badge-soft"
                      style={{ backgroundColor: "#fde8d7", color: "#f07d47" }}
                    >
                      {d?.net}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      name: (
        <div>
          {pathname == "/management/ar-summary" ? "Client Id" : "Inv No"}
        </div>
      ),
      selector: "amount",
      cell: (d) => (
        <div className="fs-16" style={{ cursor: "pointer" }}>
          <div>
            <span
              className="badge badge-soft "
              style={{
                textDecoration: "underline",
                backgroundColor: "#f9cdaf",
                color: "#400f0a",
              }}
            >
              {pathname == "/management/ar-summary"
                ? d["user_id"]
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
      name: (
        <div className="d-flex justify-content-center align-items-center flex-column">
          <span>0-30</span>
          <span className="badge badge-soft-info mt-2">
            {indianNumbers(data.zero_30)}
          </span>
        </div>
      ),
      selector: (row) => row["0-30"],
      cell: (d) => (
        <div
          className={`text-${
            d.bad_debt == "yes" && d["0-30"] > 0 ? "danger" : "primary"
          }`}
        >
          {d["0-30"] > 0 ? indianNumbers(d["0-30"]) : "-"}
        </div>
      ),
      width: "120px",
      sortable: true,
      // center: true,
    },
    {
      name: (
        <div className="d-flex justify-content-center align-items-center flex-column">
          <span>31-60</span>
          <span className="badge badge-soft-info mt-2">
            {indianNumbers(data.thirtyone_60)}
          </span>
        </div>
      ),
      selector: (row) => row["31-60"],
      sortable: true,
      cell: (d) => (
        <div
          className={`text-${
            d.bad_debt == "yes" && d["31-60"] > 0 ? "danger" : "primary"
          }`}
        >
          {d["31-60"] > 0 ? indianNumbers(d["31-60"]) : "-"}
        </div>
      ),
      width: "120px",
      // center: true,
    },
    {
      name: (
        <div className="d-flex justify-content-center align-items-center flex-column">
          <span>61-90</span>
          <span className="badge badge-soft-info mt-2">
            {indianNumbers(data.sixtyone_90)}
          </span>
        </div>
      ),
      selector: (row) => row["61-90"],
      sortable: true,
      cell: (d) => (
        <div
          className={`text-${
            d.bad_debt == "yes" && d["61-90"] > 0 ? "danger" : "primary"
          }`}
        >
          {d["61-90"] > 0 ? indianNumbers(d["61-90"]) : "-"}
        </div>
      ),
      width: "120px",
      // center: true,
    },
    {
      name: (
        <div className="d-flex justify-content-center align-items-center flex-column">
          <span>91-180</span>
          <span className="badge badge-soft-info mt-2">
            {indianNumbers(data.nintyone_180)}
          </span>
        </div>
      ),
      selector: (row) => row["91-180"],
      sortable: true,
      cell: (d) => (
        <div
          className={`text-${
            d.bad_debt == "yes" && d["91-180"] > 0 ? "danger" : "primary"
          }`}
        >
          {d["91-180"] > 0 ? indianNumbers(d["91-180"]) : "-"}
        </div>
      ),
      width: "120px",
      // center: true,
    },
    {
      name: (
        <div className="d-flex justify-content-center align-items-center flex-column">
          <span>181-365</span>
          <span className="badge badge-soft-info mt-2">
            {indianNumbers(data.oneeigty_365)}
          </span>
        </div>
      ),
      selector: (row) => row["181-365"],
      sortable: true,
      cell: (d) => (
        <div
          className={`text-${
            d.bad_debt == "yes" && d["181-365"] > 0 ? "danger" : "primary"
          }`}
        >
          {d["181-365"] > 0 ? indianNumbers(d["181-365"]) : "-"}
        </div>
      ),
      width: "120px",
      // center: true,
    },
    {
      name: (
        <div className="d-flex justify-content-center align-items-center flex-column">
          <span>365+</span>
          <span className="badge badge-soft-info mt-2">
            {indianNumbers(data.three65plus)}
          </span>
        </div>
      ),
      selector: (row) => row["365+"],
      sortable: true,
      cell: (d) => (
        <div
          className={`text-${
            d.bad_debt == "yes" && d["365+"] > 0 ? "danger" : "primary"
          }`}
        >
          {d["365+"] > 0 ? indianNumbers(d["365+"]) : "-"}
        </div>
      ),
      width: "120px",
      // center: true,
    },
    {
      name: "",
      right: true,
      width: "70px",
      center: true,
      omit:
        (type == "fin" && (role == "manager" || role == "head")) ||
        role === "super_admin"
          ? false
          : true,
      // omit: false,
      cell: (d) => (
        // <div>
        //   <UncontrolledDropdown className="dropdown d-inline-block">
        //     <DropdownToggle
        //       className="btn btn-soft-secondary btn-sm"
        //       tag="button"
        //       onClick={() => {
        //         setUserData(d);
        //         console.log(d, "testingdate");
        //         const paySummaryURL =
        //           farming.farming_URL + paySummary + d.invoice_id;

        //         axios
        //           .get(paySummaryURL)
        //           .then((res) => {
        //             setPaysum(res.data.data);
        //             console.log(res.data.data, "ubb");
        //           })
        //           .catch((err) => {
        //             console.log(err);
        //           });
        //         setOpen(!open);
        //       }}
        //     >
        //       <i
        //         className=" ri-exchange-line align-middle"
        //         style={{ color: "black" }}
        //       ></i>
        //     </DropdownToggle>
        //   </UncontrolledDropdown>

        // </div>
        <div>
          <UncontrolledDropdown
            className="dropdown d-inline-block"
            onClick={() => setUserData(d)}
          >
            <DropdownToggle style={{ background: "#fff", border: "none" }}>
              <i
                className="ri-more-fill align-middle"
                style={{ color: "black" }}
              ></i>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              <DropdownItem
                className="edit-item-btn d-flex align-items-center"
                onClick={() => {
                  const paySummaryURL =
                    farming.farming_URL + paySummary + d.invoice_id;

                  axios
                    .get(paySummaryURL)
                    .then((res) => {
                      setPaysum(res.data.data);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                  setOpen(!open);
                }}
              >
                <i className="ri-contacts-book-line align-bottom me-2 text-muted"></i>
                Update Payment
              </DropdownItem>
              {/* <DropdownItem
                className="edit-item-btn d-flex align-items-center"
                onClick={() => {
                  setOpen2(!open2);
                }}
              >
                <i className=" ri-delete-back-2-line align-bottom me-2 text-muted"></i>
                {userData.bad_debt == "no"
                  ? "Move To Bad Debt"
                  : "Move To Recievables"}
              </DropdownItem> */}
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      ),
    },
  ];
  const tableData = {
    columns,
    data: pathname == "/management/ar-summary" ? data?.userWise : data?.inv,
    // data: data.inv,
  };
  return isLoading ? (
    <>...loading</>
  ) : err ? (
    <>some thing went wrong</>
  ) : (
    <>
      <div
        className={
          pathname == "/management/ar-summary"
            ? "finance-summary-table"
            : "finance-summary"
        }
      >
        <DataTableExtensions
          {...tableData}
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
            expandableRows={false}
            expandableRowsHideExpander //hide the arrow icon on the left
            progressPending={isLoading}
            expandOnRowClicked={true}
            customStyles={customStyles}
            highlightOnHover={true}
          />
        </DataTableExtensions>
      </div>
      <PaymentModal
        open={open}
        setOpen={setOpen}
        userData={userData}
        setCheck={setCheck}
        check={check}
        paysum={paysum}
      />
      {/* <BadDebtModal
        open2={open2}
        setOpen2={setOpen2}
        onSubmitClick={onSubmitClick}
      /> */}
      <AreYouSureModal
        show={open2}
        onCloseClick={onCloseClick}
        statement={
          userData.bad_debt == "no"
            ? "Are You Sure To Move To Bad Debt"
            : "Are You Sure To Move To Recievables"
        }
        onSubmitClick={onSubmitClick}
      />
    </>
  );
};

export default FinanceSummaryTable;
