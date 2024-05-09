import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { tsm_sow_list, vendor_all_sow } from "../../../assets/utils/mepApi";
import { api } from "../../../globalConfig";
import DataTableExtensions from "react-data-table-component-extensions";
import DataTable from "react-data-table-component";
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
};
const AsmTable = () => {
  let { id } = useParams();
  const [asmData, setAsmData] = useState([]);
  const getAsmData = () => {
    let apiData = api.VENDOR_URL + tsm_sow_list;
    axios
      .get(apiData, { params: { asm_id: id } })
      .then((res) => {
        setAsmData(res.data.project_lists);
      })
      .catch((err) => console.log(err, "err"));
  };

  React.useEffect(() => {
    getAsmData();
  }, []);

  const columns = [
    {
      name: "SOW-ID",
      selector: (d) => d.sow_id,
      sortable: true,
      center: true,
      width: "100px",
      cell: (d) => <div>{d.sow_id}</div>,
    },

    {
      name: "Logo",
      selector: (d) => d.brand_logo,
      sortable: true,
      // center: true,
      cell: (d) => (
        <div>
          <img
            src={d.brand_logo}
            width="30px"
            height="30px"
            alt="profile"
            className="profile_table_images"
          />
          <div>{d.brand_name}</div>
        </div>
      ),
    },
    {
      name: "Project Title",
      selector: (d) => d.project_title,
      sortable: true,
      // center: true,
      // width: "230px",
      cell: (d) => <div>{d.project_title}</div>,
    },

    {
      name: "Team",
      selector: (row) => row.profile_image,
      sortable: true,
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
                {/* <span className="badge badge-soft-primary">
                  {d.oa_count > 0 ? `+${d.oa_count}` : "0"}
                </span> */}
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
      name: "Total",
      selector: (row) => row.total_leads,
      sortable: true,
      center: true,
      // width:'180px',
      cell: (d) => (
        <div>
          <span
            className="badge rounded-pill "
            style={{
              width: "60px",
              fontWeight: 600,
              fontSize: "12px",
              background: "grey",
            }}
          >
            {d.total_leads}
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
          </div>
        </div>
      ),
    },

    {
      name: "Approved",
      selector: (row) => row.total_leads,
      sortable: true,
      // omit: omitData || omit3,
      center: true,
      // width:'180px',
      cell: (d) => (
        <div>
          <span
            className="badge rounded-pill "
            style={{
              width: "60px",
              fontWeight: 600,
              fontSize: "12px",
              background: "black",
            }}
          >
            {d.approved_leads}
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
          </div>
        </div>
      ),
    },

    {
      name: "Status",
      selector: (row) => row.total_leads,
      sortable: true,
      // omit: omitData || omit3,
      center: true,
      // width:'180px',
      cell: (d) => (
        <div>
          <span
            style={{
              width: "60px",
              fontWeight: 600,
              fontSize: "12px",
              background: "black",
            }}
            className={`badge rounded-pill text-bg-${
              d.sow_status == "enable"
                ? "success"
                : d.sow_status == "disable"
                ? "warning"
                : "danger"
            }`}
          >
            {d.sow_status == "enable"
              ? "Success"
              : d.sow_status == "disable"
              ? "Hold"
              : "Closed"}
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
          </div>
        </div>
      ),
    },
  ];
  const tableData = {
    columns: columns,
    data: asmData,
  };
  return (
    <div>
      <DataTableExtensions
        {...tableData}
        export={false}
        filterPlaceholder={`Search`}
        style={{ paddingRight: "25px important" }}
      >
        <DataTable
          columns={columns}
          data={asmData}
          pagination
          highlightOnHover
          customStyles={customStyles}
        />
      </DataTableExtensions>
    </div>
  );
};

export default AsmTable;
