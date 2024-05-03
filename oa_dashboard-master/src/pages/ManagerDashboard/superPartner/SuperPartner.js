import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  InputGroup,
  InputGroupText,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  UncontrolledDropdown,
} from "reactstrap";

import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";

// import StatsContent from "../../../Dashboard/stats/StatsContent";
// import TaskerChart from "../../../EditSow/TaskerChart";
import {
  search_vendor,
  sow_vendor_list,
  vendor_sow_assign,
} from "../../../assets/utils/dashboard";
import { api, farming } from "../../../globalConfig";
import {
  TableColumnHeader,
  TableColumnRow,
} from "../../Dashboard/TableColumn/TableColumn";
import InactiveModal from "./InactiveModal";
import ActiveModal from "./ActiveModal";
import SupplyTableData from "../../TableComponent/SupplyTableData";
import { cityIn } from "../../../assets/utils/SupplyApi";
const SuperPartner = ({ type }) => {
  const { id } = useParams();
  const sowIdData = id.split("-")[0];

  const [check, setCheck] = React.useState(true);
  const [tableData, setTableData] = React.useState([]);
  const [cardMap, setCardMap] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [userSows, setUserSows] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isErr, setIsErr] = React.useState(false);
  const [oaList, setOaList] = React.useState([]);
  //graphs api's
  // const pathName = api.OA_URL + training_chart + `?sow_id=${id}`;
  // const trainingDailyUrl = api.OA_URL + training_chart_daily + `?sow_id=${id}`;
  // const hourlyName = api.OA_URL + hourly_leads_chart_oa + `?sow_id=${id}`;
  // const overallName = api.OA_URL + overall_leads_chart_oa + `?sow_id=${id}`;
  // const overallEnroll = api.OA_URL + overall_fse_enroll + `?sow_id=${id}`;
  //opening full screen modal
  const [modal_fullscreen1, setmodal_fullscreen1] = React.useState(false);
  const [graphToken, setGraphToken] = React.useState("");
  const [activeMod, setActiveMod] = React.useState(false);
  const [userData, setUserData] = React.useState([]);
  const [open_supportable, set_open_supportable] = React.useState(false);
  const [showAdd, setShowAdd] = React.useState(true);
  const [stateData, setStateData] = useState([]);

  console.log(userData, "data123");
  React.useEffect(() => {
    const apilink = api.VENDOR_URL + sow_vendor_list;
    axios
      .get(apilink, { params: { sow_id: sowIdData } })
      .then((res) => {
        setOaList(res.data.vendor_list);
      })
      .catch((err) => console.log(err));
  }, [check]);

  function tog_fullscreen1() {
    setmodal_fullscreen1(!modal_fullscreen1);
  }

  const handleAssign = (oaid) => {
    const apilink = api.VENDOR_URL + vendor_sow_assign;
    const postData = {
      asm_id: oaid,
      sow_id: sowIdData,
    };
    console.log(postData, "postData");
    axios
      .post(apilink, postData)
      .then((res) => {
        console.log(res.data, "postData");

        if (res.data?.error) {
          toast("Something went wrong", {
            position: "top-center",
            hideProgressBar: true,
            closeOnClick: false,
            className: "bg-warning text-white",
          });
        } else {
          toast("success", {
            position: "top-center",
            hideProgressBar: true,
            closeOnClick: false,
            className: "bg-success text-white",
          });
          setOpen(false);
          setUserSows([]);
        }
      })
      .catch((err) => {
        toast(err.response.data.message, {
          position: "top-center",
          hideProgressBar: true,
          closeOnClick: false,
          className: "bg-warning text-white",
        });
      });
  };
  // const callClickFunction = (d) => {
  //   const token = d?.token;
  //   setGraphToken(token);
  //   tog_fullscreen1();

  //   const config = {
  //     headers: { "x-access-token": ` ${token}` },
  //   };
  //   fetch(pathName, config)
  //     .then((res) => res.json())
  //     .then((data) => console.log(data, "datadresdd"))
  //     .catch((err) => console.log(err));
  // };
  const handleSearch = () => {
    const apilink = api.OA_URL + search_vendor;
    axios
      .get(apilink, { params: { mobile_number: search } })
      .then((res) => {
        console.log(res.data, "response");
        if (res.data?.error) {
          toast(res.data?.message, {
            position: "top-center",
            hideProgressBar: true,
            closeOnClick: false,
            className: "bg-danger text-white",
          });
          setUserSows({});
        } else {
          setUserSows(res.data?.tasker);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const data = oaList;
  const columns = [
    {
      name: "Profile",
      selector: (row) => row.profile_image,
      width: "300px",
      cell: (row) => (
        <>
          <div className="w-100">
            <Row className="my-2">
              <Col md={4}>
                <div className="flex-shrink-0 chat-user-img online align-self-center">
                  <div className="avatar-md d-flex align-items-center justify-content-center">
                    {row?.profile_image != "" &&
                    // row?.profile_image != "null" ? (
                    row?.profile_image?.includes("https") ? (
                      <img
                        className=" rounded-circle img-fluid userprofile"
                        alt="s"
                        src={row.profile_image}
                        style={{
                          width: "70px",
                          height: "70px",
                          border:
                            row.type == "4"
                              ? "4px solid #FFA45E"
                              : "4px solid #63bbbe",
                        }}
                      />
                    ) : (
                      //   : (
                      //     <img
                      //       className="rounded-circle img-fluid userprofile "
                      //       alt="p"
                      //       src={`https://isp.taskmo.in/asm_images/${row?.profile_image}`}
                      //       style={{
                      //         width: "70px",
                      //         height: "70px",
                      //         border:
                      //           row.type == "4"
                      //             ? "4px solid #FFA45E"
                      //             : "4px solid #63bbbe",
                      //       }}
                      //     />
                      //   )
                      // )
                      <div className="rounded-circle img-fluid userprofile my-2 d-flex align-items-center">
                        <div
                          className="rounded-circle img-fluid userprofile bg-soft-secondary text-secondary d-flex align-items-center justify-content-center fs-20 fw-bold"
                          // style={{ width: "40px", height: "35px" }}
                          style={{
                            width: "70px",
                            height: "70px",
                            border:
                              row?.type == "4"
                                ? "4px solid #FFA45E"
                                : "4px solid #63bbbe",
                          }}
                        >
                          {row?.full_name[0]}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Col>
              <Col md={8}>
                <p
                  className="text-uppercase fw-medium mb-1 fs-15 d-flex"
                  style={{
                    wordWrap: "break-word",
                    alignItems: "center",
                  }}
                >
                  {row.full_name}
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
                <p style={{ fontSize: "12px", margin: "2px", display: "flex" }}>
                  {"SPID: "}
                  {row.asm_id}
                  {row?.sp_status == "blocked" && (
                    <span
                      className={"badge rounded-pill text-bg-danger "}
                      style={{
                        marginLeft: "4px",
                        display: "inline-flex",
                        alignItems: "center",
                      }}
                    >
                      {" "}
                      {row?.sp_status}
                    </span>
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
              </Col>
            </Row>
          </div>
          {/* <div>
          {d?.profile_image != "" && d?.profile_image != "null" ? (
            d?.profile_image.includes("https") ? (
              <img
                className=" avatar-sm rounded bg-soft-secondary text-secondary my-2"
                alt="s"
                src={d.profile_image}
              />
            ) : (
              <img
                className="avatar-sm rounded bg-soft-secondary text-secondary my-2"
                alt="p"
                src={`https://isp.taskmo.in/asm_images/${d?.profile_image}`}
              />
            )
          ) : (
            <div className="avatar-sm my-2 d-flex align-items-center">
              <div
                className="avatar-title rounded bg-soft-secondary text-secondary"
                style={{ width: "40px", height: "35px" }}
              >
                {d.full_name[0]}
              </div>
            </div>
          )}
        </div> */}
        </>
      ),
    },
    // {
    //   name: "Full Name",
    //   selector: (row) => row.full_name,
    //   cell: (d) => (
    //     <div className="d-flex gap-2">
    //       <div>{d.full_name}</div>
    //       <div>({d.asm_id})</div>
    //     </div>
    //   ),
    //   width: "400px",
    // },
    {
      name: "Taskers",
      selector: (row) => row.total_fses,
      center: true,
      width: "150px",
      cell: (d) => (
        <div className="fs-14 fw-light">
          {d.lead_fse}
          <span className="">/</span>
          {d.total_fses}
        </div>
      ),
    },
    {
      name: <TableColumnHeader data={"Overall"} />,
      selector: (row) => row.total_leads,
      sortable: true,
      width: "250px",
      cell: (d) => (
        <TableColumnRow
          total={d.total_leads}
          approved={d.approved_leads}
          pending={d.pending_leads}
          reject={d.reject_leads}
        />
      ),
    },
    {
      name: <TableColumnHeader data={"Monthly"} />,
      selector: (row) => row.total_leads_month,
      width: "250px",
      sortable: true,
      cell: (d) => (
        <TableColumnRow
          total={d.total_leads_month}
          approved={d.approved_leads_month}
          pending={d.pending_leads_month}
          reject={d.reject_leads_month}
        />
      ),
    },

    {
      name: "Today",
      selector: (row) => row.total_leads,
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
            {d.today_leads}
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
              {d.sp_status == "accepted" ? (
                <DropdownItem
                  className="edit-item-btn d-flex align-items-center"
                  onClick={() => {
                    setActiveMod(!activeMod);
                    setUserData(d);
                    // console.log(d, "dd");
                  }}
                >
                  <i className=" ri-close-fill align-bottom me-2 text-muted"></i>
                  block
                </DropdownItem>
              ) : (
                <DropdownItem
                  className="edit-item-btn d-flex align-items-center"
                  onClick={() => {
                    setActiveMod(!activeMod);
                    setUserData(d);
                  }}
                >
                  <i className="  ri-check-fill align-bottom me-2 text-muted"></i>
                  unblock
                </DropdownItem>
              )}
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      ),
    },

    // {
    //   name: "Pending Leads",
    //   selector: (row) => row.pending_leads,
    //   cell: (d) => (
    //     <div>
    //       <span
    //         className="badge rounded-pill "
    //         style={{
    //           width: "60px",
    //           fontWeight: 600,
    //           fontSize: "12px",
    //           background: "#f3e053",
    //         }}
    //       >
    //         {d.pending_leads}
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
    //         +{d.pending_leads_monthl}
    //       </div>
    //     </div>
    //   ),
    // },
    // {
    //   name: "Approved Leads",
    //   selector: (row) => row.approved_leads,
    //   cell: (d) => (
    //     <div>
    //       <span
    //         className="badge rounded-pill "
    //         style={{
    //           width: "60px",
    //           fontWeight: 600,
    //           fontSize: "12px",
    //           background: "lightgreen",
    //         }}
    //       >
    //         {d.approved_leads}
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
    //         +{d.approved_leads_month}
    //       </div>
    //     </div>
    //   ),
    // },
  ];

  const tableDataExtension = {
    columns: columns,
    data: data,
  };

  //, background: "#f3f3f8"

  const callStateApi = () => {
    setShowAdd(true);
    let stateApi = farming.farming_URL + cityIn + "all";
    axios
      .get(stateApi)
      .then((res) => {
        console.log(res.data, "testingfa");
        setStateData(res.data.state);
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    callStateApi();
  }, []);

  return (
    <div>
      <React.Fragment>
        {/* <ToastContainer /> */}
        {/* <div className="d-flex justify-content-between align-items-center w-80 px-4 mb-3">
          <h5 className="card-title mb-0">Super Partner List</h5>
          <div className="flex-shrink-0">
            <button
              className="btn btn-danger add-btn"
              onClick={() => setOpen(true)}
            >
              <i className="ri-add-line align-bottom"></i> Assign SP
            </button>
          </div>
        </div> */}
        <Card>
          <CardHeader style={{ marginBottom: "-6px" }}>
            <div className="d-flex flex-column">
              {/* <h5 className="card-title mt-2">Super Partner List </h5> */}
              <div
                className="d-flex align-items-center gap-2 mt-3"
                // style={{ marginBottom: "30px" }}
              >
                {/* <div className="d-flex align-items-center gap-1 fs-12">
                  <span
                    className="rounded-circle"
                    style={{
                      background: "#ba94f9",
                      width: "10px",
                      height: "10px",
                    }}
                  ></span>
                  <span>Direct</span>
                </div> */}
                <div className="d-flex align-items-center gap-1 fs-12">
                  <span
                    className="rounded-circle"
                    style={{
                      background: "#FFA45E",
                      width: "10px",
                      height: "10px",
                    }}
                  ></span>
                  <span>Group</span>
                </div>
                <div className="d-flex align-items-center gap-1 fs-12">
                  <span
                    className="rounded-circle"
                    style={{
                      background: "#63bbbe",
                      width: "10px",
                      height: "10px",
                    }}
                  ></span>
                  <span>Managed</span>
                </div>
              </div>
            </div>
            {type == "spoc" ? (
              <div style={{ marginTop: "5px" }}></div>
            ) : (
              <div
                className="flex-shrink-0"
                style={{
                  float: "right",
                  marginRight: "220px",
                  marginTop: "-40px",
                }}
              >
                <button
                  className="btn btn-danger add-btn"
                  onClick={() => setOpen(true)}
                >
                  <i className="ri-add-line align-bottom"></i> Assign SP
                </button>
              </div>
            )}

            <div
              className="flex-shrink-0"
              style={{
                float: "right",
                marginRight: "350px",
                marginTop: "-40px",
              }}
            >
              <button
                className="btn btn-danger add-btn"
                onClick={() => set_open_supportable(true)}
              >
                <i className="ri-add-line align-bottom"></i> Supply
              </button>
            </div>
          </CardHeader>
          <CardBody>
            <DataTableExtensions
              {...tableDataExtension}
              export={false}
              filterPlaceholder={`Search`}
              style={{ paddingRight: "25px important" }}
            >
              <DataTable
                data={data}
                columns={tableDataExtension}
                pagination
                // onRowClicked={callClickFunction}
              />
            </DataTableExtensions>
          </CardBody>
        </Card>
        <Modal
          className="modal-lg"
          id="signupModals"
          tabIndex="-1"
          isOpen={open}
          toggle={() => {
            setOpen(false);
            setUserSows([]);
          }}
          centered
        >
          <ModalHeader
            className="p-3"
            toggle={() => {
              setOpen(false);
              setUserSows([]);
            }}
          >
            ASSIGN SP
          </ModalHeader>

          <ModalBody>
            <Row className="d-flex mx-1">
              <InputGroup>
                <InputGroupText>Mobile Number</InputGroupText>
                <Input
                  type="text"
                  maxLength={10}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                />
                <InputGroupText
                  style={{ cursor: "pointer" }}
                  onClick={handleSearch}
                >
                  <i className="ri-search-line fs-20"></i>
                </InputGroupText>
              </InputGroup>
            </Row>
            <Card className="m-3">
              {Object.keys(userSows).length > 0 && (
                <Row className="align-items-start g-3 mx-2 py-3">
                  <Col md={10}>
                    <div
                      style={{
                        display: "flex",
                        gap: "20px",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        {!(
                          userSows[0]?.profile_image == "" ||
                          userSows[0]?.profile_image == "null"
                        ) ? (
                          userSows[0]?.profile_image?.includes("https") ? (
                            <img
                              className="rounded-circle avatar-md"
                              alt="200x200"
                              src={userSows[0].profile_image}
                            />
                          ) : (
                            <img
                              className="rounded-circle avatar-md"
                              alt="200x200"
                              src={`https://isp.taskmo.in/fieldon_images/${userSows[0]?.profile_image}`}
                            />
                          )
                        ) : (
                          <div className="avatar-md">
                            <div className="avatar-title rounded-circle text-warning">
                              {userSows[0]?.fse_name[0]}
                            </div>
                          </div>
                        )}
                        {/* {userSows[0]?.profile_image == "null" && (
                        <div className="avatar-md">
                          <div className="avatar-title rounded-circle text-warning">
                            {userSows[0]?.fse_name[0]}
                          </div>
                        </div>
                      )} */}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          gap: "20px",
                        }}
                      >
                        <h5 className="text-reset fs-14 mb-0">
                          {`${userSows[0]?.fse_name} ${"("} ${
                            userSows[0]?.asm_id
                          } ${")"}`}
                        </h5>
                        <div className="d-flex flex-wrap">
                          {(userSows || []).map(
                            (sow) =>
                              sow.brand_logo && (
                                <div key={sow.sow_id}>
                                  <img
                                    className="rounded-circle avatar-xxs"
                                    alt="sow_tag"
                                    src={sow.brand_logo}
                                    style={{ marginRight: "10px" }}
                                  />
                                </div>
                              )
                          )}
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col className="d-flex justify-content-end align-items-center h-100">
                    <button
                      className="btn btn-danger add-btn"
                      onClick={() => handleAssign(userSows[0]?.asm_id)}
                    >
                      Assign
                    </button>
                  </Col>
                </Row>
              )}
            </Card>
          </ModalBody>
        </Modal>
        {/* modal data */}
        <Modal
          size="xl"
          isOpen={modal_fullscreen1}
          toggle={() => {
            tog_fullscreen1();
          }}
          className="modal-fullscreen"
          id="fullscreeexampleModal"
        >
          <div style={{ padding: "20px", overflowX: "scroll" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <h2>OA Wise Stats</h2>
              </div>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  tog_fullscreen1();
                }}
                className="fs-20"
              >
                {" "}
                X
              </div>
            </div>

            {/* <TaskerChart token={graphToken} /> */}
          </div>
        </Modal>
        {/* <InactiveModal
          inactiveMod={inactiveMod}
          setInactiveMod={setInactiveMod}
          userData={userData}
        /> */}
        <ActiveModal
          activeMod={activeMod}
          setActiveMod={setActiveMod}
          userData={userData}
          setCheck={setCheck}
          check={check}
        />
      </React.Fragment>
      <Modal
        id="signupModals"
        tabIndex="-1"
        isOpen={open_supportable}
        toggle={() => {
          set_open_supportable(!open_supportable);
          // setShowAdd(false);
        }}
        top="true"
        size="lg"
      >
        <ModalHeader
          className="p-3"
          toggle={() => {
            set_open_supportable(!open_supportable);
            // setShowAdd(false);
          }}
        >
          <h5
            className="fw-600 fs-16"
            style={{
              letterSpacing: "2px",
              marginLeft: "15px",
              color: "#b83016",
            }}
          >
            Supply Requests
          </h5>
        </ModalHeader>

        <ModalBody>
          <div className="mt-2">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                {" "}
                {/* {showAdd ? (
                  ""
                ) : (
                  <button
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "140px",
                    }}
                    className="btn btn-success d-flex align-items-center"
                    onClick={callStateApi}
                  >
                    <i className="ri ri-add-fill fs-18"></i>&nbsp;&nbsp;&nbsp;
                    Request
                  </button>
                )} */}
              </div>
            </div>
            <SupplyTableData
              stateData={stateData}
              showAdd={true}
              setShowAdd={setShowAdd}
            />
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default SuperPartner;
