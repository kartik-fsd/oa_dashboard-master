import React, { useState, useEffect, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { agreement_list } from "../../../assets/utils/Business";
import { api } from "../../../globalConfig";
import axios from "axios";
import DataTableExtensions from "react-data-table-component-extensions";
import DataTable from "react-data-table-component";
import AgreementHeader from "./AgreementHeader";

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

function Agreement({ agreementData }) {
  const history = useHistory();

  const redirect = (e) => {
    history.push(`/business-dashboard/agreementDetails/${e}`);
  };

  const columns = [
    {
      name: "Agreement UID",
      selector: (row) => row.agreement_unique_id,
      width: "130px",
      sortable: true,
      cell: (d) => (
        <div
          style={{ cursor: "pointer" }}
          className="text-info"
          onClick={() => {
            redirect(d.agreement_id);
          }}
        >
          <u>
            <span
              className="badge px-3"
              style={{ padding: 5, fontSize: 12, backgroundColor: "#f07d47" }}
            >
              {d.agreement_unique_id}
            </span>
          </u>
        </div>
      ),
    },

    {
      name: "Company",
      selector: (row) => row.agreement_unique_id,
      width: "300px",
      sortable: true,
      cell: (d) => (
        <div className="d-flex gap-2 align-items-center">
          <div>
            <img
              src={d?.brand_logo}
              alt="company"
              className="avatar-sm rounded-circle"
            />
          </div>
          <div>
            <span style={{ fontSize: 13, color: "#405189" }}>
              {d?.company_name}
            </span>
            <br />
            <span style={{ fontSize: 10 }}>{d?.brand_name}</span>
          </div>
        </div>
      ),
    },

    {
      name: "Project Title",
      selector: (row) => row.agreement_unique_id,
      width: "200px",
      sortable: true,
      cell: (d) => <div>{d?.agreement_type}</div>,
      cell: (d) => (
        <div>
          <div style={{ fontSize: 13 }}> {d?.agreement_title}</div>
        </div>
      ),
    },

    {
      name: "Type",
      selector: (row) => row.agreement_unique_id,
      width: "200px",
      sortable: true,
      cell: (d) => <div>{d?.agreement_type}</div>,
    },

    {
      name: "Expiry Date",
      selector: (row) => row.agreement_unique_id,
      width: "150px",
      sortable: true,
      cell: (d) => (
        <div>
          <div style={{ fontSize: 10 }}>
            <div style={{ textAlign: "center" }}> {d?.agreement_end_date} </div>
            <div className="fs-10" style={{ color: "#405189" }}>
              {!d?.expiry
                ? "Not Added"
                : Number(d?.expiry) <= 0
                ? "Expired"
                : `Expires in ${d?.expiry} days`}
            </div>
          </div>
        </div>
      ),
    },

    {
      name: "Status",
      selector: (row) => row.agreement_unique_id,
      width: "150px",
      sortable: true,
      cell: (d) => (
        console.log(d, "fcd"),
        (
          <button
            className={`btn w-sm ${
              d?.agreement_status === "active"
                ? "btn-success"
                : d?.agreement_status === "rejected"
                ? "btn-danger"
                : d?.agreement_status === "pending"
                ? "btn-secondary"
                : ""
            }`}
            onClick={() => redirect(d?.agreement_id)}
          >
            {d?.agreement_status.toUpperCase()}
          </button>
        )
      ),
    },
  ];
  let tableData = {
    data: agreementData,
    columns,
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
          data={agreementData}
          customStyles={customStyles}
          highlightOnHover={true}
          pagination
          onRowClicked={(d) => {
            redirect(d?.agreement_id);
          }}
        />
      </DataTableExtensions>
    </div>
  );
}

export default Agreement;
