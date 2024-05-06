import React, { useState } from "react";
import DataTableExtensions from "react-data-table-component-extensions";
import DataTable from "react-data-table-component";
import { api } from "../../globalConfig";
import { agreement_list } from "../../assets/utils/Business";
import axios from "axios";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
  ModalBody,
  UncontrolledDropdown,
} from "reactstrap";
import InvoiceBusiness from "./InvoiceBusiness";
import { use } from "i18next";
import moment from "moment";

const customStyles = {
  rows: {
    style: {
      minHeight: "72px", // override the row height
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px", // override the cell padding for head cells
      paddingRight: "8px",
      // color: "red",
      // background: "#CAE6E2",
      height: "40px",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px", // override the cell padding for data cells
      paddingRight: "8px",
      // borderRadius: "44px",
    },
  },
  table: {
    style: {
      minHeight: "400px",
    },
  },
};

const BusinessAgreementTable = ({ status, update, setUpdate, tab }) => {
  const date = new Date();
  const dateFormat = moment(date).format("DD-MMM-YYYY");

  const [isLoading, setIsLoading] = useState(false);
  const [isErr, setIsErr] = useState(false);
  const [agreementData, setAgreementData] = useState([]);
  const [invoiceData, setInvoiceData] = useState({});
  const [agreeUp, setAgreeUp] = useState(false);

  // invoice
  const [modal_edit, set_modal_edit] = useState(false);
  const getBusinessAgreementData = () => {
    let GetBusinessAgApiLink = api.ONX_URL + agreement_list;
    setIsLoading(true);
    axios
      .get(GetBusinessAgApiLink, { params: { type: status } })
      .then((res) => {
        setAgreementData(res?.data?.agreement_list);

        setIsLoading(false);
      })
      .catch((err) => setIsErr(true))
      .finally(() => {
        setIsLoading(false);
      });
  };

  React.useEffect(() => {
    getBusinessAgreementData();
  }, [agreeUp, tab]);
  const columns = [
    {
      name: "Agreement UID",
      selector: (row) => row.agreement_unique_id,
      width: "150px",
      sortable: true,
      cell: (d) => (
        <div
          style={{ cursor: "pointer" }}
          className="text-info"
          onClick={() => {
            setInvoiceData(d);
            set_modal_edit(true);
          }}
        >
          <u>{d.agreement_unique_id}</u>
        </div>
      ),
    },
    {
      name: "Details",
      selector: (row) => row.year,
      width: "300px",
      sortable: true,
      cell: (d) => (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div>
              <img
                src={d.brand_logo}
                alt=""
                className="rounded-circle avatar-sm"
              />
            </div>
            <div className="d-flex flex-column">
              <div>{d.company_name}</div>
              <span className="fs-10 text-muted">{d.brand_name}</span>
            </div>
          </div>
        </div>
      ),
    },

    // {
    //   name: "Validity Till",
    //   omit: status == "pending" ? true : false,
    //   selector: (row) => row.start_date,
    //   cell: (d) => (
    //     <div>
    //       <div className="fs-12 w-100">
    //         <div className="fs-14 fw-semi-bold">{d.agreement_end_date}</div>
    //         <span className="fs-10 text-muted">
    //           {new Date() <= new Date(d.agreement_end_date)
    //             ? `Expires in {Math.floor(
    //                 (new Date(d.agreement_end_date).getTime() -
    //                   new Date().getTime()) /
    //                   (1000 * 60 * 60 * 25)
    //               )} days`
    //             : "Expired"}
    //         </span>
    //       </div>
    //     </div>
    //   ),
    // },

    {
      name: "Agreement Details",
      selector: (row) => row.agreement_title,
      sortable: true,
      cell: (d) => (
        <div>
          <div className="d-flex flex-column">
            <div>{d.agreement_title}</div>
            <div className="text-muted fs-10">Type : {d.agreement_type}</div>
          </div>
        </div>
      ),
    },

    {
      name: "Agreement by",
      selector: (row) => row.agreement_title,
      sortable: true,
      cell: (d) => (
        // <div>
        //   <div className="d-flex flex-column">
        //     <div>{d.created_by_name ?? "-"}</div>
        //     <div className="text-muted fs-10">
        //       {new Date(d.agreement_end_date) <= new Date(dateFormat)
        //         ? `${Math.floor(
        //             (new Date().getTime() -
        //               new Date(d.agreement_end_date).getTime()) /
        //               (1000 * 60 * 60 * 25)
        //           )} since expired`
        //         : "Active"}
        //     </div>
        //   </div>
        // </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            // justifyContent: "center",
            gap: "10px",
            alignItems: "center",
            width: "250px",
            height: "100px",
          }}
        >
          <div>
            <img
              src={
                d.profile?.substr(0, 4) === "http"
                  ? d.profile
                  : "/user-dummy-img.jpg"
              }
              alt="brand logo"
              className="rounded-avatar-xs"
              width="40px"
              height={"40px"}
              style={{ borderRadius: "50%" }}
            />
          </div>

          <div className="fs-12 w-100">
            <div className="fs-14 fw-semi-bold">{d.created_by_name}</div>

            {new Date() <= new Date(d.agreement_end_date) ? (
              <span className="fs-10 text-muted">
                Expires in{" "}
                {Math.floor(
                  (new Date(d.agreement_end_date).getTime() -
                    new Date().getTime()) /
                    (1000 * 60 * 60 * 25)
                )}{" "}
                days
              </span>
            ) : (
              <span className="fs-10 text-danger">Expired</span>
            )}
          </div>
        </div>
      ),
    },
  ];

  let tableData = {
    data: agreementData,
    columns,
  };
  return (
    <div>
      {" "}
      <DataTableExtensions
        {...tableData}
        export={false}
        filterPlaceholder={`Search`}
        className="filter_text"
        style={{ paddingRight: "25px important" }}
      >
        <DataTable
          columns={columns}
          data={agreementData}
          customStyles={customStyles}
          highlightOnHover={true}
        />
      </DataTableExtensions>
      {/* invoice modal */}
      {modal_edit && (
        <Modal
          id="signupModals"
          tabIndex="-1"
          isOpen={modal_edit}
          toggle={() => {
            set_modal_edit(false);
          }}
          centered={true}
          size="lg"
        >
          <ModalBody>
            <InvoiceBusiness
              data={invoiceData}
              set_modal_edit={set_modal_edit}
              update={agreeUp}
              setUpdate={setAgreeUp}
            />
          </ModalBody>
        </Modal>
      )}
    </div>
  );
};

export default BusinessAgreementTable;
