import React from "react";
import DataTable from "react-data-table-component";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import DataTableExtensions from "react-data-table-component-extensions";
import {
  BillModal,
  CreateInvoiceModal,
  EditInvModal,
} from "./Invoice2022Modal";
import { useHistory } from "react-router-dom";

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

const InvoiceTable2022 = ({ datalist }) => {
  const [billMod, setBillMod] = React.useState(false);
  const [editMod, setEditMod] = React.useState(false);
  const [colData, setColData] = React.useState({});
  const [userData, setUserData] = React.useState({});
  console.log(userData, "245");
  const history = useHistory();

  const indianNumbers = (num, len) => {
    return Number(num).toLocaleString("en-IN", {
      maximumFractionDigits: len,
    });
  };
  const columns = [
    {
      name: "S.No",
      selector: "invoice_id",
      cell: (d) => <div className="loanid">{d.invoice_id}</div>,
      sortable: true,
      width: "80px",
      center: true,
    },
    {
      name: "Inv No",
      selector: "invoice_number",
      cell: (d) => <div className="loanid">{d.invoice_number}</div>,
      sortable: true,
      width: "100px",
      center: true,
    },
    {
      name: "Billing DATE",
      selector: "billed_date",
      cell: (d) => <div className="date">{d.billed_date}</div>,
      sortable: true,
      width: "140px",
      center: true,
    },
    {
      name: "Company Name",
      selector: "companyname",
      cell: (d) => (
        <div className="colNmae2">
          {d.companyname}
          <span>
            &nbsp;{"("}
            {d.clientid}
            {")"}
          </span>
        </div>
      ),
      sortable: true,
      width: "250px",
      center: true,
    },
    {
      name: "Revenue",
      selector: "amount",
      cell: (d) => (
        <div className="amt_table">
          &#x20B9;{indianNumbers(d?.desc_amount, 2)}
        </div>
      ),
      sortable: true,
      width: "130px",
      center: true,
    },
    {
      name: "Payout",
      selector: "payout",
      cell: (d) => (
        <div className="amt_table">&#x20B9;{indianNumbers(d?.payout, 2)}</div>
      ),
      sortable: true,
      width: "130px",
      center: true,
    },
    {
      name: "Margin",
      selector: "margin",
      cell: (d) => (
        // <div className="amt_table">&#x20B9;{d?.margin?.toFixed(2)}</div>
        <div className="amt_table">&#x20B9;{indianNumbers(d?.margin, 2)}</div>
      ),
      sortable: true,
      width: "130px",
      center: true,
    },
    {
      name: "Margin Per",
      selector: "margin_per",
      cell: (d) => (
        <div className="amt_table">{d?.margin_per?.toFixed(2)}%</div>
      ),
      sortable: true,
      width: "120px",
      center: true,
    },
    {
      name: "billing date",
      selector: "upload",
      cell: (d) => (
        <div className="amt_table">
          {d.start_date == "00-00-0000" ? (
            // <FeatherIcon
            //   icon="edit"
            //   style={{ color: "#663595", cursor: "pointer" }}
            //   onClick={() => handleClickOpen(d)}
            // />
            <i
              className=" bx bxs-edit "
              style={{ fontSize: "26px", color: "#663595", cursor: "pointer" }}
              onClick={() => {
                setBillMod(!billMod);
              }}
            ></i>
          ) : (
            <div>
              <span>
                {d.start_date_d}&nbsp;&nbsp;{d.end_date_d}
              </span>
            </div>
          )}
        </div>
      ),
      sortable: true,
      width: "150px",
      center: true,
    },

    {
      name: "Process",
      right: true,
      width: "50px",
      cell: (d) => (
        <div>
          <UncontrolledDropdown className="dropdown d-inline-block">
            <DropdownToggle
              className="btn btn-soft-secondary btn-sm"
              tag="button"
              onClick={() => {
                setColData(d);
              }}
            >
              <i
                className="ri-more-fill align-middle"
                style={{ color: "black" }}
              ></i>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              <DropdownItem className="edit-item-btn d-flex align-items-center">
                <i className=" ri-checkbox-circle-line fs-16 align-bottom me-2 text-muted"></i>
                Billed
              </DropdownItem>
              <DropdownItem className="edit-item-btn d-flex align-items-center">
                <i className=" ri-checkbox-circle-line fs-16 align-bottom me-2 text-muted"></i>
                Recon
              </DropdownItem>
              <DropdownItem
                className="edit-item-btn d-flex align-items-center"
                onClick={() => {
                  setEditMod(!editMod);
                }}
              >
                <i className="  ri-edit-line align-bottom me-2 text-muted"></i>
                Edit
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      ),
    },
  ];
  const tableData = {
    columns: columns,
    data: datalist,
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
          data={datalist}
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
          onRowClicked={(d) => {
            history.push("/finance/inv22/maindetails", { data: d });
          }}
        />
      </DataTableExtensions>
      <BillModal billMod={billMod} setBillMod={setBillMod} />
      <EditInvModal editMod={editMod} setEditMod={setEditMod} />
    </div>
  );
};

export default InvoiceTable2022;
