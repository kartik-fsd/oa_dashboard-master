import axios from "axios";
import React, { useState, useEffect, useMemo } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { useParams } from "react-router-dom";
import {
  Col,
  Row,
  Modal,
  ModalBody,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  UncontrolledDropdown,
  Label,
  ModalHeader,
  Button,
  ButtonToggle,
  CardBody,
  Dropdown,
  CardHeader,
  Card,
} from "reactstrap";
import {
  fse_leads_chart,
  fse_training_attend,
  oa_block_fse,
  sow_user_details,
} from "../../../../assets/utils/sow";
import FseDetails from "../../../../components/common/FseDetails";
import { api } from "../../../../globalConfig";
import {
  TableColumnHeader,
  TableColumnRow,
} from "../../TableColumn/TableColumn";
import FseLeadsChart from "../FseLeadsChart";
import DataTableModel from "./DataTableModel";
import DataTrainingTable from "./DataTrainingTable";
// import { Dialog, DialogContent } from "@mui/material";
// import { Col, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap";

const BasicTable = (props) => {
  const data = props.data;
  // const data = [];
  const { id } = useParams();
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [isUserDropdown, setUserDropdown] = React.useState(false);
  const [leadsdata, setLeadsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [change, setChange] = useState(false);
  const [switchData, setSwitchData] = useState(false);
  const [rowData, setRowData] = useState({});
  const [tableData, setTableData] = useState([]);
  const [trainingTable, setTrainingTable] = useState([]);
  const [remarkData, setRemarkData] = useState("");
  const trainUrl = api.OA_URL + fse_training_attend;
  const blockUrl = api.OA_URL + oa_block_fse;
  const leads = (user) => {
    const urlEnter =
      api.OA_URL +
      fse_leads_chart +
      `?sow_id=${id}&user_id=${user?.user_id}&month=month`;
    axios
      .get(urlEnter)
      .then((res) => {
        setLeadsData(res.data);
        setLoading(false);
        setChange(!change);
      })
      .catch((err) => console.log(err));

    const dataEnter = {
      sow_id: id,
      user_id: user?.user_id,
    };

    axios
      .post(trainUrl, dataEnter)
      .then((res) => {
        setTrainingTable(res.data.training);
      })
      .catch((err) => console.log(err));
  };

  const sowDetails = (d) => {
    const dataEnter = {
      sow_id: id,
      user_id: d.user_id,
    };
    const urlEnter = api.FINANCE_URL + sow_user_details;

    axios
      .post(urlEnter, dataEnter)
      .then((res) => setTableData(res.data?.details))
      .catch((err) => console.log(err));
  };

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Profile</span>,
      selector: (row) => row.full_name,
      sortable: true,
      width: "300px",
      cell: (row) => (
        <div className="w-100">
          <Row className="my-2">
            <Col md={3}>
              <div className="flex-shrink-0 chat-user-img online align-self-center">
                <div className="avatar-md d-flex align-items-center justify-content-center">
                  <img
                    src={
                      // row?.profile_image?.length > 5?
                      row?.profile_image.substr(0, 4) === "http"
                        ? row?.profile_image
                        : // : `https://isp.taskmo.in/fieldon_images/${row?.profile_image}`
                          "/user-dummy-img.jpg"
                    }
                    alt="profile"
                    className="rounded-circle img-fluid userprofile"
                    style={{
                      width: "70px",
                      height: "70px",
                      border:
                        row.user_type == "Open"
                          ? "4px solid #ba94f9"
                          : row.user_type == "Vendor"
                          ? "4px solid #FFA45E"
                          : row.user_type == "TSM" &&
                            row.sp_status == "accepted"
                          ? "4px solid #63bbbe"
                          : "4px solid #ba94f9",
                    }}
                  />
                </div>
              </div>
            </Col>

            <Col md={9}>
              <p
                className="text-uppercase fw-medium mb-1 fs-15 d-flex"
                style={{ wordWrap: "break-word" }}
              >
                {row.full_name}
              </p>
              <p style={{ fontSize: "12px", margin: "2px", display: "flex" }}>
                {"PID: "}
                {row.user_id}
                {row.onboard_status == "onboarded" ? (
                  <i
                    className="ri-checkbox-circle-fill mx-2 fs-15"
                    style={{ color: "#35a635" }}
                  ></i>
                ) : row.onboard_status == "inactive" ? (
                  <i
                    className="ri-close-circle-fill mx-2 fs-15"
                    style={{ color: "#cc0000" }}
                  ></i>
                ) : (
                  <i
                    className=" ri-indeterminate-circle-fill mx-2 fs-15"
                    style={{ color: "#ffbb33" }}
                  ></i>
                )}
              </p>

              <p style={{ fontSize: "10px", margin: "2px" }}>
                {"Active Since: "}
                {row?.active_since}
                {" day"}
              </p>
              <p style={{ fontSize: "10px", margin: "2px" }}>
                {"City: "}
                {row?.city}
              </p>
              {/* <div className="d-flex gap-1">
                <span
                  className={
                    row.sow_status === "accepted"
                      ? "badge text-bg-success"
                      : row.sow_status === "assigned"
                      ? "badge text-bg-warning"
                      : "badge text-bg-danger"
                  }
                >
                  {row.sow_status}
                </span>
                <span
                  className={
                    row.training_status === "rejected"
                      ? "badge text-bg-danger"
                      : "badge text-bg-warning"
                  }
                >
                  {row.training_status}
                </span>
              </div> */}
            </Col>
          </Row>
        </div>
      ),
    },
    {
      name: <TableColumnHeader data={"Overall"} />,
      selector: (row) => row.total_count,
      sortable: true,
      width: "220px",
      cell: (d) => (
        <TableColumnRow
          total={d.total_count}
          approved={d.approved_count}
          pending={d.pending_count}
          reject={d.reject_count}
        />
        // <div className="d-flex">
        //   <div
        //     style={{
        //       background: "#1F99CC",
        //       display: "flex",
        //       justifyContent: "center",
        //       alignItems: "center",
        //       marginRight: "2px",
        //       borderRadius: "6px",
        //       color: "#fff",
        //       fontWeight: "600",
        //       padding: "4px 6px",
        //       minWidth: "45px",
        //     }}
        //   >
        //     {d.total_count}
        //   </div>
        //   <div
        //     style={{
        //       background: "#2EC851",
        //       display: "flex",
        //       justifyContent: "center",
        //       alignItems: "center",
        //       marginRight: "2px",
        //       borderRadius: "6px",
        //       color: "#fff",
        //       fontWeight: "600",
        //       padding: "4px 6px",
        //       minWidth: "45px",
        //     }}
        //   >
        //     {d.approved_count}
        //   </div>
        //   <div
        //     style={{
        //       background: "#FCBB33",
        //       display: "flex",
        //       justifyContent: "center",
        //       alignItems: "center",
        //       marginRight: "2px",
        //       borderRadius: "6px",
        //       color: "#fff",
        //       fontWeight: "600",
        //       padding: "4px 6px",
        //       minWidth: "45px",
        //     }}
        //   >
        //     {d.pending_count}
        //   </div>
        //   <div
        //     style={{
        //       background: "#F74544",
        //       display: "flex",
        //       justifyContent: "center",
        //       alignItems: "center",
        //       marginRight: "2px",
        //       borderRadius: "6px",
        //       color: "#fff",
        //       fontWeight: "600",
        //       padding: "4px 6px",
        //       minWidth: "45px",
        //     }}
        //   >
        //     {d.reject_count}
        //   </div>
        // </div>
      ),
    },
    {
      name: <TableColumnHeader data={"Monthly"} />,
      selector: (row) => row.monthly_count,
      width: "220px",
      sortable: true,
      cell: (d) => (
        <TableColumnRow
          total={d.monthly_count}
          approved={d.monthly_approved_count}
          pending={d.monthly_pending_count}
          reject={d.monthly_reject_count}
        />
        // <div className="d-flex">
        //   <div
        //     style={{
        //       background: "#1F99CC",
        //       display: "flex",
        //       justifyContent: "center",
        //       alignItems: "center",
        //       marginRight: "2px",
        //       borderRadius: "6px",
        //       color: "#fff",
        //       fontWeight: "600",
        //       padding: "4px 6px",
        //       minWidth: "45px",
        //     }}
        //   >
        //     {d.monthly_count}
        //   </div>
        //   <div
        //     style={{
        //       background: "#2EC851",
        //       display: "flex",
        //       justifyContent: "center",
        //       alignItems: "center",
        //       marginRight: "2px",
        //       borderRadius: "6px",
        //       color: "#fff",
        //       fontWeight: "600",
        //       padding: "4px 6px",
        //       minWidth: "45px",
        //     }}
        //   >
        //     {d.monthly_approved_count}
        //   </div>
        //   <div
        //     style={{
        //       background: "#FCBB33",
        //       display: "flex",
        //       justifyContent: "center",
        //       alignItems: "center",
        //       marginRight: "2px",
        //       borderRadius: "6px",
        //       color: "#fff",
        //       fontWeight: "600",
        //       padding: "4px 6px",
        //       minWidth: "45px",
        //     }}
        //   >
        //     {d.monthly_pending_count}
        //   </div>
        //   <div
        //     style={{
        //       background: "#F74544",
        //       display: "flex",
        //       justifyContent: "center",
        //       alignItems: "center",
        //       marginRight: "2px",
        //       borderRadius: "6px",
        //       color: "#fff",
        //       fontWeight: "600",
        //       padding: "4px 6px",
        //       minWidth: "45px",
        //     }}
        //   >
        //     {d.monthly_reject_count}
        //   </div>
        // </div>
      ),
    },
    {
      name: (
        <span className="font-weight-bold fs-13 d-flex flex-column w-50">
          Today
          {/* <div className="d-flex justify-content-between">
            <span>T</span>
            <span>A</span>
          </div> */}
        </span>
      ),
      selector: (row) => row.today_count,
      width: "120px",
      sortable: true,
      cell: (d) => (
        <div className="d-flex">
          <div
            style={{
              background: "black",
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
            {d.today_count}
          </div>
          {/* <div
            style={{
              background: "black",
              // background: "#2EC851",
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
            {d.today_approved_count}
          </div> */}
        </div>
      ),
    },
    {
      name: (
        <span className="font-weight-bold fs-13 d-flex flex-column w-50">
          Avg
          {/* <div className="d-flex justify-content-between">
            <span>T</span>
            <span>A</span>
          </div> */}
        </span>
      ),
      selector: (row) => row.today_count,
      width: "85px",
      sortable: true,
      cell: (d) => (
        <div className="d-flex fw-light fs-16">
          {(d?.total_count / d.lead_since).toFixed(2)}
        </div>
      ),
    },
    // {
    //   name: <span className="font-weight-bold fs-13">Mobile Number</span>,
    //   selector: (row) => row.mobile_number,
    //   sortable: true,
    // },
    // {
    //   name: <span className="font-weight-bold fs-13">City</span>,
    //   selector: (row) => row.city,
    //   sortable: true,
    //   // width: "120px",
    // },
    // {
    //   name: <span className="font-weight-bold fs-13">User Type</span>,
    //   selector: (row) => row.user_type,
    //   sortable: true,
    //   center: true,
    //   width: "120px",
    // },
    // {
    //   name: <span className="font-weight-bold fs-13">Training</span>,
    //   selector: (row) => row.onboard_status,
    //   sortable: true,
    //   center: true,
    //   cell: (d) =>
    //     d.training_status == "rejected" ? (
    //       <i className="ri-close-circle-line text-danger fs-20"></i>
    //     ) : d.training_status == "completed" ? (
    //       <i className="ri-checkbox-circle-line text-success fs-20"></i>
    //     ) : (
    //       <i className="ri-indeterminate-circle-line text-warning fs-20"></i>
    //     ),
    // },
    // {
    //   name: <span className="font-weight-bold fs-13">Today</span>,
    //   selector: (row) => row.total_count,
    //   sortable: true,
    //   cell: (d) => (
    //     <div>
    //       <span
    //         className="badge rounded-pill "
    //         style={{
    //           width: "60px",
    //           fontWeight: 600,
    //           fontSize: "12px",
    //           background: "grey",
    //         }}
    //       >
    //         {d.total_count}
    //       </span>

    //       <div
    //         style={{
    //           fontSize: "12px",
    //           margin: "2px",
    //           display: "flex",
    //           justifyContent: "center",
    //           color: "#7b96ae",
    //         }}
    //       >
    //         {/* +{d.monthly_count} */}.
    //       </div>
    //     </div>
    //   ),
    // },
    // {
    //   name: <span className="font-weight-bold fs-13">Approved</span>,
    //   selector: (row) => row.approved_count,
    //   sortable: true,
    //   cell: (d) => (
    //     <div>
    //       <span
    //         className="badge rounded-pill "
    //         style={{
    //           width: "60px",
    //           fontWeight: 600,
    //           fontSize: "12px",
    //           background: "lightblue",
    //         }}
    //       >
    //         {d.approved_count}
    //       </span>
    //       <div
    //         style={{
    //           fontSize: "12px",
    //           margin: "2px",
    //           display: "flex",
    //           justifyContent: "center",
    //           color: "#7b96ae",
    //         }}
    //       >
    //         {/* +{d.monthly_approved_count} */}.
    //       </div>
    //     </div>
    //   ),
    // },

    // {
    //   name: <span className="font-weight-bold fs-13">Earnings</span>,
    //   selector: (row) => row.approved_count * row.cpl,
    //   sortable: true,
    //   cell: (d) => (
    //     <div>
    //       <span
    //         className="badge rounded-pill "
    //         style={{
    //           width: "60px",
    //           fontWeight: 700,
    //           fontSize: "14px",
    //           color: "black",
    //         }}
    //       >
    //         {`₹ ${d.approved_count * d.cpl}`}
    //       </span>
    //       <div
    //         style={{
    //           fontSize: "12px",
    //           margin: "2px",
    //           display: "flex",
    //           justifyContent: "center",
    //           color: "#7b96ae",
    //         }}
    //       >
    //         {`+ ₹${
    //           d.monthly_approved_count && d.monthly_approved_count * d.cpl
    //         }`}
    //       </div>
    //     </div>
    //   ),
    // },
    // {
    //   name: <span className="font-weight-bold fs-13">Action</span>,
    //   sortable: true,
    //   // width: "100px",
    //   cell: (d) => {
    //     return (
    //       <button
    //         type="button"
    //         className="btn btn-outline-info waves-effect waves-light fs-12"
    //         onClick={() => {
    //           leads(d);
    //           setRowData(d);
    //           sowDetails(d);
    //           rowModal();
    //         }}
    //       >
    //         <i className="ri-eye-line label-icon align-middle rounded-pill fs-12 me-2"></i>
    //       </button>

    //       // <UncontrolledDropdown className="dropdown d-inline-block">
    //       //   <DropdownToggle
    //       //     className="btn btn-soft-secondary btn-sm"
    //       //     tag="button"
    //       //   >
    //       //     <i className="ri-more-fill align-middle"></i>
    //       //   </DropdownToggle>
    //       //   <DropdownMenu className="dropdown-menu-end">
    //       //     <DropdownItem
    //       //       className="edit-item-btn"
    //       //       onClick={() => {
    //       //         leads(d);
    //       //         setRowData(d);
    //       //         sowDetails(d);
    //       //         rowModal();
    //       //       }}
    //       //     >
    //       //       <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>
    //       //       View Details
    //       //     </DropdownItem>
    //       //   </DropdownMenu>
    //       // </UncontrolledDropdown>
    //     );
    //   },
    //   // width: "100px",
    // },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      sortable: true,
      width: "100px",
      cell: (d) => {
        return (
          <UncontrolledDropdown className="dropdown d-inline-block">
            <DropdownToggle
              className="btn btn-soft-secondary btn-sm"
              tag="button"
            >
              <i className="ri-more-fill align-middle"></i>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              <DropdownItem
                className="edit-item-btn"
                onClick={() => {
                  leads(d);
                  setRowData(d);
                  sowDetails(d);
                  rowModal();
                }}
              >
                <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>
                View Details
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        );
      },
      // width: "100px",
    },
  ];

  const rowModal = () => {
    setOpen(true);
  };

  const handleApprove = () => {
    const dataEnter = {
      sow_id: id,
      user_id: rowData?.user_id,
      status: switchData ? "blocked" : "accepted",
      remark: remarkData,
      type: "oa",
    };

    const dataSample = switchData ? "blocked" : "accepted";
    rowData["sow_status"] = dataSample;

    axios
      .post(blockUrl, dataEnter)
      .then((res) => {
        setRowData({ ...rowData });
        setOpen2(false);
      })
      .catch((err) => console.log(err));
  };

  const tableDataExtension = {
    columns: columns,
    data: data,
  };

  const handleClick = (e) => {
    const urlEnter =
      api.OA_URL +
      fse_leads_chart +
      `?sow_id=${rowData?.sow_id}&user_id=${rowData?.user_id}&month=${e}`;
    axios
      .get(urlEnter)
      .then((res) => {
        setLeadsData(res.data);
        setLoading(false);
        setChange(!change);
      })
      .catch((err) => console.log(err));
  };

  return (
    <React.Fragment>
      <div>
        <Container fluid>
          <DataTableExtensions
            {...tableDataExtension}
            export={false}
            filterPlaceholder={`Search`}
            style={{ paddingRight: "25px important" }}
          >
            <DataTable columns={columns} data={tableDataExtension} pagination />
          </DataTableExtensions>
          <Modal
            id="signupModals"
            className="modal-dialog modal-xl"
            tabIndex="-1"
            isOpen={open}
            toggle={() => {
              setOpen(false);
            }}
            onClosed={() => {
              setOpen(false);
            }}
            centered
          >
            <ModalBody style={{ overflowX: "scroll" }}>
              <div
                style={{
                  display: "flex",
                  gap: "18px",
                  justifyContent: "space-between",
                }}
              >
                <FseDetails rowData={rowData} />
                <div></div>
                <div
                  className="form-check form-switch mb-2"
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <Input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                    style={{ width: "40px" }}
                    onChange={(e) => {
                      setOpen2(true);
                      setSwitchData(e.target.checked);
                    }}
                    checked={
                      rowData?.sow_status !== "accepted" ? "checked" : ""
                    }
                  />
                  <Label
                    className="form-check-label"
                    htmlFor="flexSwitchCheckDefault"
                    style={{ fontWeight: "600", fontSize: "18px" }}
                  >
                    Block
                  </Label>
                </div>
              </div>

              <hr className="w-70" />
              <div className="bargraph" style={{ marginTop: "24px" }}>
                <Card>
                  <CardHeader className="d-flex justify-content-between">
                    <h4 className="card-title mb-0">Lead Tracker</h4>
                    <div className="flex-shrink-0">
                      <Dropdown
                        className="card-header-dropdown"
                        isOpen={isUserDropdown}
                        toggle={() => setUserDropdown(!isUserDropdown)}
                        direction="start"
                      >
                        <DropdownToggle
                          tag="a"
                          className="text-reset dropdown-btn"
                          role="button"
                        >
                          <span className="text-muted fs-16">
                            <i className="mdi mdi-dots-vertical align-middle"></i>
                          </span>
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-end">
                          <DropdownItem onClick={() => handleClick("month")}>
                            Current Month
                          </DropdownItem>
                          <DropdownItem onClick={() => handleClick("year")}>
                            Overall
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  </CardHeader>
                  <CardBody>
                    {Object.keys(leadsdata).length > 0 ? (
                      <FseLeadsChart
                        data={leadsdata}
                        loading={loading}
                        change={change}
                      />
                    ) : (
                      <></>
                    )}
                  </CardBody>
                </Card>
              </div>
              <div style={{ marginTop: "48px" }}>
                <h4 style={{ color: "gray", marginLeft: "25px" }}>
                  Network Payouts
                </h4>
                <DataTableModel testData={tableData} />
              </div>
              <div style={{ marginTop: "48px" }}>
                <h4 style={{ color: "gray", marginLeft: "25px" }}>
                  Network Training
                </h4>
                <DataTrainingTable trainingTable={trainingTable} />
              </div>
            </ModalBody>
          </Modal>
          <Modal
            id="signupModals"
            className="modal-dialog modal-md"
            tabIndex="-1"
            isOpen={open2}
            toggle={() => {
              setOpen2(false);
            }}
            centered
          >
            <ModalHeader
              className="p-3"
              // toggle={() => {
              //   setOpen(false);
              // }}
            >
              Block Network
            </ModalHeader>
            <ModalBody style={{ overflowX: "scroll" }}>
              <h4>Are you sure you wanna block?</h4>
              <p className="text-muted">
                Please leave comment to <code>Block Sow</code>
              </p>

              <textarea
                type="text"
                style={{ width: "100%" }}
                onChange={(e) => {
                  setRemarkData(e.target.value);
                }}
                rows="4"
                className="mt-2"
              ></textarea>
              <div className="d-flex justify-content-end mt-4">
                <button
                  className="btn btn-danger add-btn"
                  onClick={() => setOpen2(false)}
                >
                  <i className=" ri-close-line align-bottom"></i> Close
                </button>
                <button
                  style={{ marginLeft: "15px" }}
                  className="btn btn-success add-btn"
                  onClick={handleApprove}
                >
                  <i className=" ri-check-line align-bottom"></i>
                  Approve
                </button>
              </div>
            </ModalBody>
          </Modal>
        </Container>
      </div>
    </React.Fragment>
  );
};

export { BasicTable };
