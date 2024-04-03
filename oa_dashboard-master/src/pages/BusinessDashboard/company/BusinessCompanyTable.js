import React from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { useHistory } from "react-router-dom";
import img from "../../../assets/images/users/avatar-1.jpg";
import "./businessCompany.css";

const BusinessCompanyTable = ({ data }) => {
  const [hover, setHover] = React.useState(false);
  const [dupId, setDupId] = React.useState("");
  const history = useHistory();

  const imageOnError = (event) => {
    event.currentTarget.src = "/user-dummy-img.jpg";
    // event.currentTarget.className = "error";
  };

  const hoverStyles = {
    boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
    borderRadius: "50%",
    transform: "scaleY(1.1)",
    cursor: "pointer",
  };

  const columns = [
    {
      name: "Company ID",
      selector: (row) => row.company_unique_id,
      sortable: true,
      //   omit: true,
      // width: "200px",
      cell: (d) => (
        <div>
          {/* <span
            className="badge  text-bg-primary"
            style={{ minWidth: "100px" }}
          >
            {d.company_unique_id}
          </span> */}
          <span
            className="badge badge-soft-primary cursor-pointer"
            onClick={() =>
              history.push(`/business-dashboard/company/${d.company_id}`)
            }
          >
            {d.company_unique_id}
          </span>
        </div>
      ),
    },
    {
      name: "Company",
      selector: (row) => row.company_name,
      sortable: true,
      width: "250px",
      cell: (d) => (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            padding: "12px",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <div style={hover && d.company_unique_id == dupId ? hoverStyles : {}}>
            <img
              src={d.brand_logo}
              onError={imageOnError}
              alt="brand logo"
              className="rounded-avatar-xs"
              width="40px"
              height={"40px"}
              style={{ borderRadius: "50%" }}
              onMouseEnter={() => {
                setHover(true);
                setDupId(d.company_unique_id);
              }}
              onMouseLeave={() => {
                setHover(false);
                setDupId("");
              }}
              // onClick={() =>
              //   history.push(`/business-dashboard/company/${d.company_id}`)
              // }
            />
          </div>

          <div className="d-flex flex-column  ">
            <span
              className="fs-11  text-primary"
              style={{ wordBreak: "break-all", fontWeight: "450" }}
            >
              {d.company_name}
            </span>
            <div>
              {/* <span className="badge text-bg-primary">{"L123"}</span> */}
              <span className="fs-10" style={{ fontWeight: "500" }}>
                {d.brand_name}
              </span>
            </div>
          </div>
        </div>
      ),
    },

    {
      name: "Created By",
      selector: (row) => row.user_name,
      // width: "200px",
      sortable: true,
      center: true,
      cell: (d) => <div className="fs-12">{d.user_name}</div>,
    },
    {
      name: "Created On",
      selector: (row) => row.created_at,
      sortable: true,
      center: true,
      cell: (d) => (
        // <div className="fs-12">08-12-2023&nbsp;@&nbsp;00:00&nbsp;pm</div>
        <div className="fs-12">{d.created_at}</div>
      ),
    },
    {
      name: "Total Counts",
      selector: (row) => row.clientTotal,
      // width: "90px",
      sortable: true,
      center: true,
      cell: (d) => (
        // <div className="fs-12">08-12-2023&nbsp;@&nbsp;00:00&nbsp;pm</div>
        <div>
          <span className="badge badge-soft-secondary fs-11">
            {d.clientTotal}
          </span>
        </div>
      ),
    },
    {
      name: "Total GST",
      selector: (row) => row.gst_count,
      sortable: true,
      center: true,
      cell: (d) => (
        // <div className="fs-12">08-12-2023&nbsp;@&nbsp;00:00&nbsp;pm</div>
        <div>
          <span className="badge badge-soft-secondary fs-11">
            {d.gst_count}
          </span>
        </div>
      ),
    },
  ];
  const tableData = {
    columns,
    data,
  };
  return (
    <div className="company_table">
      <DataTableExtensions
        {...tableData}
        export={false}
        filterPlaceholder={`Search`}
        className="filter_text"
        style={{ paddingRight: "25px important" }}
      >
        <DataTable
          pagination
          paginationPerPage={7}
          columns={columns}
          data={data}
          onRowClicked={(d) =>
            history.push(`/business-dashboard/company/${d.company_id}`)
          }
        />
      </DataTableExtensions>
    </div>
  );
};

export default BusinessCompanyTable;
