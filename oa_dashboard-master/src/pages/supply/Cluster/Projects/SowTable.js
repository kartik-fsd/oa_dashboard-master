import React from "react";
import DataTable from "react-data-table-component";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import DataTableExtensions from "react-data-table-component-extensions";

import axios from "axios";
import { api } from "../../../../globalConfig";
import { vendor_all_sow } from "../../../../assets/utils/mepApi";
import { useParams } from "react-router-dom";

const SowTable = () => {
  const [sowData, setSowData] = React.useState([]);
  const { id } = useParams();
  console.log(sowData, 1234);
  React.useEffect(() => {
    const link = api.VENDOR_URL + vendor_all_sow;
    axios
      .post(link, { asm_id: id })
      .then((res) => {
        setSowData(res.data.sow);
      })
      .catch((err) => console.log(err));
  }, []);

  const columns = [
    {
      name: "SOW-ID",
      selector: (row) => row.date,
      sortable: true,
      // omit: omitData || omit3,
      center: true,
      width: "100px",
      cell: (d) => <div>{d.sow_id}</div>,
    },
    {
      name: "Logo",
      selector: (row) => row.rm,
      sortable: true,
      //   width: "600px",
      center: true,

      cell: (d) => (
        <div>
          <img
            src={
              d.brand_logo?.substr(0, 4) === "http"
                ? d.brand_logo
                : "/user-dummy-img.jpg"
            }
            alt="brand logo"
            className="rounded-avatar-xs"
            width="40px"
            height={"40px"}
            style={{ borderRadius: "50%" }}
          />
        </div>
      ),
    },

    {
      name: "Project Title",
      selector: (row) => row.date,
      width: "200px",
      sortable: true,
      // omit: omitData || omit3,
      center: true,
      cell: (d) => <div>{d.project_title}</div>,
    },
    {
      name: "Commission Earned",
      selector: (row) => row.date,
      sortable: true,
      // omit: omitData || omit3,
      center: true,
      cell: (d) => <div>{d.commission}</div>,
    },
    {
      name: "Last Month",
      selector: (row) => row.date,
      sortable: true,
      //   omit: role == "cm" ? true : false,
      center: true,
      width: "100px",
      cell: (d) => <div>{d.last_month_leads}</div>,
    },
    {
      name: "Monthly",
      selector: (row) => row.date,
      sortable: true,
      //   omit: role == "cm" ? true : false,
      center: true,
      width: "100px",
      cell: (d) => <div>{d.month_leads}</div>,
    },
    {
      name: "Lead Status",
      selector: (row) => row.date,
      sortable: true,
      // omit: omitData || omit3,
      center: true,
      cell: (d) => (
        <div>
          <span
            className={`badge rounded-pill badge-soft-${
              d.add_lead_status == "enable" ? "success" : "danger"
            }`}
          >
            {d.add_lead_status}
          </span>
        </div>
      ),
    },

    {
      name: "Options",
      right: true,
      //   omit: role != "cm" ? true : false,
      width: "100px",
      cell: (d) => (
        <div>
          <UncontrolledDropdown className="dropdown d-inline-block">
            <DropdownToggle
              className="btn btn-soft-secondary btn-sm"
              tag="button"
            >
              <i
                className="ri-more-fill align-middle"
                style={{ color: "black" }}
              ></i>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              <DropdownItem className="edit-item-btn d-flex align-items-center">
                <i className=" ri-add-circle-fill align-bottom me-2 text-muted"></i>
                View Details
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      ),
    },
  ];

  const tableData = {
    columns: columns,
    data: sowData,
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
          data={sowData}
          pagination
          //   onRowClicked={() => {
          //     history.push("/manpower/asmprojects");
          //   }}
        />
      </DataTableExtensions>
    </div>
  );
};

export default SowTable;
