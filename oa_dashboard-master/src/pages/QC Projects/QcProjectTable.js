import React from "react";
import DataTable, { createTheme } from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { useHistory } from "react-router-dom";
import {
  UncontrolledDropdown,
  UncontrolledTooltip,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Spinner,
} from "reactstrap";
import { getQcsow, enabledisableQc } from "../../assets/utils/farmingBase";

import { api, farming } from "../../globalConfig";
import axios from "axios";
import moment from "moment";
import { TableColumnHeader, TableColumnRow } from "./QcTableColumn";
import ClientAccessModal from "./ClientAccessModal";

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

const QcProjectTable = ({ leadstatus, startdate, enddate, apply }) => {
  console.log(apply, "checkingchandler", startdate, enddate, leadstatus);
  const history = useHistory();
  const [apiData, setApiData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState(false);
  const [clientMod, setClientMod] = React.useState(false);
  const [projectId, setProjectId] = React.useState(0);
  const [enable, setEnable] = React.useState(false);

  console.log(startdate, enddate, 789);
  console.log(apiData, "data");
  let date = new Date();
  const end_date1 = moment(date).format("YYYY-MM-DD");

  //   console.log(date.getMonth() + 1, "date");
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

  const start_date1 = moment(firstDay).format("YYYY-MM-DD");

  React.useEffect(() => {
    console.log(farming, "testing", apply, startdate, enddate, leadstatus);
    const link = farming.farming_URL + getQcsow;
    setLoading(true);
    const body = {
      start_date: startdate ?? start_date1,
      end_date: enddate ?? end_date1,
      add_lead_status: leadstatus,
    };
    console.log(body, "cheppu");

    axios
      .post(link, body)
      .then((res) => {
        let filteredData;
        filteredData = res?.data?.sow;
        setApiData(filteredData);
        setLoading(false);
        console.log(res?.data, "resss");
      })
      .catch((err) => {
        console.log(err);
        setErrMsg(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [apply, enable]);

  const handleEnableQc = (d) => {
    const link = farming.farming_URL + enabledisableQc;
    const body = {
      is_qc: "yes",
      sow_id: d.sow_id,
    };
    axios
      .put(link, body)
      .then((res) => {
        console.log(res.data);
        setEnable(!enable);
      })
      .catch((err) => console.log(err));
  };
  const handleDisableQc = (d) => {
    const link = farming.farming_URL + enabledisableQc;
    const body = {
      is_qc: "no",
      sow_id: d.sow_id,
    };
    axios
      .put(link, body)
      .then((res) => {
        console.log(res.data);
        setEnable(!enable);
      })
      .catch((err) => console.log(err));
  };
  const columns = [
    {
      name: "Project ID",
      width: "100px",
      selector: (row) => row.sow_id,
      sortable: true,

      // width:'180px',
      center: true,
    },
    {
      name: "Project Details",
      selector: (row) => row.brand_logo,
      sortable: true,
      center: true,

      width: "200px",
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
              src={d.brand_logo}
              alt="brand logo"
              className="rounded-avatar-xs"
              width="40px"
              height={"40px"}
            />
          </div>

          <div>{d.project_title}</div>
        </div>
      ),
      // center: true,
    },

    {
      name: "Manager",
      selector: (row) => row.manager_name,
      sortable: true,

      center: true,
      // width:'180px',
    },

    {
      name: "Total",
      selector: (row) => row.total_leads,
      sortable: true,
      // omit: omitData || omit3,
      center: true,
      width: "80px",
      cell: (d) => (
        <div className="d-flex">
          <div
            style={{
              background: "#9258C4",
              // background: "#1F99CC",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "2px",
              borderRadius: "6px",
              color: "#fff",
              fontWeight: "600",
              padding: "4px 6px",
              minWidth: "45px",
            }}
          >
            {d.total_leads_range}
          </div>
        </div>
      ),
    },

    {
      name: <TableColumnHeader data="Approved" />,
      selector: (row) => row.approved_l1__leads,
      sortable: true,
      // omit: omitData || omit4,
      center: true,
      width: "180px",
      cell: (d) => (
        <TableColumnRow
          l1={d.approved_l1_leads_range}
          l2={d.approved_l2_leads_range}
          l3={d.approved_l3_leads_range}
        />
      ),
    },

    {
      name: <TableColumnHeader data="Rejected" />,
      selector: (row) => row.rejected_l1_leads_range,
      sortable: true,
      // omit: omitData || omit3,
      center: true,
      width: "180px",
      cell: (d) => (
        <TableColumnRow
          l1={d.rejected_l1_leads_range}
          l2={d.rejected_l2_leads_range}
          l3={d.rejected_l3_leads_range}
        />
      ),
    },
    {
      name: <TableColumnHeader data="Pending" />,
      selector: (row) => row.pending_l1_leads_range,
      sortable: true,
      // omit: omitData || omit3,
      center: true,
      width: "180px",
      cell: (d) => (
        <TableColumnRow
          l1={d.pending_l1_leads_range}
          l2={d.pending__l2_leads_range}
          l3={d.pending__l3_leads_range}
        />
      ),
    },
    {
      name: "Desperancy",
      selector: (row) => row.disperency_leads_range,
      sortable: true,
      // omit: omitData || omit3,
      center: true,
      width: "80px",
      cell: (d) => (
        <div className="d-flex">
          <div
            style={{
              background: "grey",

              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "2px",
              borderRadius: "6px",
              color: "#fff",
              fontWeight: "600",
              padding: "4px 6px",
              minWidth: "45px",
            }}
          >
            {d.disperency_leads_range}
          </div>
        </div>
      ),
    },
    {
      name: "",
      right: true,
      width: "50px",
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
              <DropdownItem
                className="edit-item-btn d-flex align-items-center"
                onClick={() => {
                  history.push(`/viewproject/${d.sow_id}-${d?.project_title}`);
                }}
              >
                <i className="ri-code-view align-bottom me-2 text-muted"></i>
                View project
              </DropdownItem>
              <DropdownItem
                className="edit-item-btn d-flex align-items-center"
                onClick={() => {
                  setClientMod(!clientMod);
                  setProjectId(d.project_id);
                  console.log(d.project_id, "jj");
                }}
              >
                <i className="ri-contacts-book-line align-bottom me-2 text-muted"></i>
                Client Access
              </DropdownItem>
              {d.is_qc == "yes" ? (
                <DropdownItem
                  className="edit-item-btn d-flex align-items-center"
                  onClick={() => {
                    handleDisableQc(d);
                  }}
                >
                  <i className=" ri-toggle-line align-bottom me-2 text-muted"></i>
                  disable
                </DropdownItem>
              ) : (
                <DropdownItem
                  className="edit-item-btn d-flex align-items-center"
                  onClick={() => {
                    handleEnableQc(d);
                  }}
                >
                  <i className=" ri-toggle-fill align-bottom me-2 text-muted"></i>
                  Enable
                </DropdownItem>
              )}
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      ),
    },
  ];

  const tableData = {
    columns: columns,
    data: apiData,
  };

  return (
    <div>
      {loading ? (
        <div
          style={{
            width: "80vw",
            height: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner color="primary">Loading</Spinner>
        </div>
      ) : errMsg ? (
        <div
          style={{
            width: "80vw",
            height: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "18px",
            fontWeight: "600",
            color: "orangered",
          }}
        >
          oops something went wrong...!
        </div>
      ) : (
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
              data={apiData}
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
        </div>
      )}
      <ClientAccessModal
        clientMod={clientMod}
        setClientMod={setClientMod}
        projectId={projectId}
      />
    </div>
  );
};

export default QcProjectTable;
