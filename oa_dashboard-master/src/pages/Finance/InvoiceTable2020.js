import React from "react";
import DataTable, { createTheme } from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import InvoiceModal from "./InvoiceModal";
import { invoiceDetails } from "../../assets/utils/farmingBase";
import { farming } from "../../globalConfig";
import axios from "axios";
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
      paddingLeft: "8px",
      paddingRight: "8px",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px",
      paddingRight: "8px",
    },
  },
  table: {
    style: {
      minHeight: "400px",
    },
  },
};
const token = sessionStorage.getItem("token");

const InvoiceTable2020 = ({ invtable }) => {
  const [invMod, setInvMod] = React.useState(false);
  const [inData, setIndata] = React.useState({});
  const [innId, setinvid] = React.useState("");

  const handleInvModal = (data) => {
    let link = farming.farming_URL + invoiceDetails;
    const body = {
      invoice_id: data.invoice_id,
      year: "2020",
    };
    axios
      .post(link, body)
      .then((res) => {
        setIndata(res.data);
        setinvid(data.invoice_id);
        setInvMod(!invMod);
      })
      .catch((err) => console.log(err));
  };

  const indianNumbers = (num, len) => {
    return Number(num).toLocaleString("en-IN", {
      maximumFractionDigits: len,
    });
  };
  const columns = [
    {
      name: "Invoice ID",

      selector: (row) => row.invoice_id,
      sortable: true,
      center: true,
      cell: (d) => (
        <div>
          <span
            className="badge rounded-pill badge-soft"
            style={{ width: "40px", backgroundColor: "#f07d47" }}
          >
            {d.invoice_id}
          </span>
        </div>
      ),
    },
    {
      name: "Date",
      selector: (row) => row.billed_date,
      sortable: true,
      center: true,
      cell: (d) => <div style={{ color: "#b83016" }}>{d.billed_date}</div>,
    },

    {
      name: "Amount",
      selector: (row) => row.amount,
      sortable: true,
      cell: (d) => (
        <div style={{ fontWeight: "600" }}>
          &#x20B9;{indianNumbers(d.amount, 2)}
        </div>
      ),
      center: true,
    },

    {
      name: "Invoice",
      selector: (row) => row.total_leads,
      sortable: true,
      cell: (d) => (
        <div>
          <i
            className=" ri-eye-fill"
            style={{ fontSize: "16px", color: "#673695", cursor: "pointer" }}
            onClick={() => {
              handleInvModal(d);
              console.log("hii");
            }}
          ></i>
        </div>
      ),
      center: true,
    },
    {
      name: "Download",
      selector: (row) => row.total_leads,
      sortable: true,
      center: true,
      cell: (d) => (
        <div
          className="amt_table"
          style={{ cursor: "pointer", color: "#ec5c24" }}
        >
          <a
            href={`https://farming-backend.taskmo.in/invoatoken/downloadinvoice2021/2021?invoice_id=${d.invoice_id}&token=${token}`}
            target="_blank"
          >
            <i className="ri-download-2-fill" style={{ fontSize: "19px" }}></i>
          </a>
        </div>
      ),
    },
  ];

  const tableData = {
    columns: columns,
    data: invtable,
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
          data={invtable}
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
      <InvoiceModal
        invMod={invMod}
        setInvMod={setInvMod}
        inData={inData}
        innId={innId}
        year={"20-21"}
      />
    </div>
  );
};

export default InvoiceTable2020;
