import axios from "axios";
import { use } from "i18next";
import React, { useEffect, useState } from "react";

import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Badge,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import {
  client_details,
  update_client,
} from "../../../assets/utils/farmingBase";
import { pending_project_lists } from "../../../assets/utils/OnxUrl";
import { api } from "../../../globalConfig";
import InvoiceDetails from "./InvoiceDetails";

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

const CommericalTable = ({ status, update, setUpdate }) => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [clientData, setClientData] = useState([]);
  const [modal_edit, set_modal_edit] = useState(false);
  const [projectList, setProjectList] = useState([]);
  const [eachData, setEachData] = useState({ status: status });

  const handleopenEdit = (d) => {
    set_modal_edit(true);
  };

  const columns = [
    {
      name: "Unique ID",
      selector: (row) => (
        <div>
          <Link to={`/project-overview/${row.project_id}`}>
            {row.project_unique_id}
          </Link>
        </div>
      ),
      width: "150px",
      sortable: true,
      center: true,
    },
    {
      name: "Project Details",
      selector: (row) => row.project_title,
      left: true,
      // width: "300px",
      sortable: true,
      cell: (d) => (
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            flexDirection: "row",
            gap: "10px",
          }}
        >
          <div>
            <img
              src={d.brand_logo}
              alt=""
              className="rounded-circle avatar-sm"
            />
          </div>
          <div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>{d.brand_name}</div>
              <div className="fs-12 text-muted">{d.project_title}</div>
              <div>
                {Number(d.active_since > 0) ? (
                  <div className="fs-10 text-muted">
                    To be Live in
                    <span className="badge badge-soft-info ">
                      {d.active_since}days
                    </span>
                  </div>
                ) : (
                  <div>
                    <span className="badge badge-soft-success ">Live</span>
                  </div>
                )}{" "}
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      name: "profile",
      selector: (row) => row.full_name,
      // width: "250px",
      left: true,
      sortable: true,
      cell: (d) => (
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            flexDirection: "row",
            gap: "10px",
          }}
        >
          <div>
            <img src={d.profile} alt="" className="rounded-circle avatar-sm" />
          </div>
          <div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>{d.full_name}</div>
              {/* <div>phno :&nbsp;{d.phone}</div> */}

              <div className="fs-10 text-muted">{d.approved_on}</div>
            </div>
          </div>
        </div>
      ),
    },

    {
      name: "Difficulty",
      selector: (row) => row.difficulty_level,
      sortable: true,
      cell: (row) => (
        <Badge
          style={{ minWidth: "70px" }}
          color={
            row.difficulty_level == "Low"
              ? "info"
              : row.difficulty_level == "High"
              ? "primary"
              : "secondary"
          }
          className="badge-label"
        >
          <i className="mdi mdi-circle-medium"></i> {row.difficulty_level}
        </Badge>
      ),
      width: "200px",
    },
    // {
    //   name: "",
    //   center: true,
    //   cell: (d) => (
    //     <div
    //       onClick={() => {
    //         // set_modal_edit(true);
    //         history.push(`/project-overview/${d.project_id}`);
    //         setEachData({ ...eachData, ...d });
    //       }}
    //       style={{ cursor: "pointer" }}
    //     >
    //       <i className="ri-eye-fill"></i>
    //     </div>
    //   ),
    // },
  ];

  const tableData = {
    columns,
    data: projectList,
  };

  useEffect(() => {
    let commericalApi = api.ONX_URL + pending_project_lists;
    axios
      .get(commericalApi, { params: { commercial_status: status } })
      .then((res) => {
        console.log(res?.data?.project_list, "response");
        setProjectList(res?.data?.project_list);
      })
      .catch((err) => console.log(err));
  }, [status, update]);
  return (
    <>
      <DataTableExtensions
        {...tableData}
        export={false}
        filterPlaceholder={`Search`}
        className="filter_text"
        style={{ paddingRight: "25px important" }}
      >
        <DataTable
          columns={columns}
          data={projectList}
          theme="VendorTable"
          pagination
          expandableRows={false}
          expandableRowsHideExpander //hide the arrow icon on the left
          //   progressPending={isLoading}
          expandOnRowClicked={true}
          customStyles={customStyles}
          highlightOnHover={true}
        />
      </DataTableExtensions>

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
            <InvoiceDetails
              data={eachData}
              set_modal_edit={set_modal_edit}
              update={update}
              setUpdate={setUpdate}
            />
          </ModalBody>
        </Modal>
      )}
    </>
  );
};

export default CommericalTable;
