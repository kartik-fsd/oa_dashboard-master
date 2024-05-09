import React from "react";
import DataTable from "react-data-table-component";
import {
  Badge,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import DataTableExtensions from "react-data-table-component-extensions";
import Flatpickr from "react-flatpickr";
import moment from "moment";
import { toast } from "react-toastify";
import axios from "axios";
import { api } from "../../globalConfig";
import {
  aravindSowAdd,
  create_sow,
  managers_oa,
  work_id_manager,
} from "../../assets/utils/dashboard";
import { overall_projects } from "../../assets/utils/sow";
import { extract_token } from "../../assets/utils/common";
import { useHistory, useLocation } from "react-router-dom";

const ProjectLeadsTable = ({ data }) => {
  const location = useLocation();
  const history = useHistory();

  const [modal_signUpModals_1, set_modal_signUpModals_1] =
    React.useState(false);
  const [formData, setFormData] = React.useState({});
  const [workteam, setWorkTeam] = React.useState("");
  const [sowId, setSowId] = React.useState("");
  const [sortBy, setsortBy] = React.useState(null);
  const [check1, setCheck1] = React.useState(false);
  const [oashow, setOaShow] = React.useState(false);
  const [managerData, setManagerData] = React.useState([]);
  const [oaData, setOaData] = React.useState([]);
  const [onClickData, setOnClickData] = React.useState({});
  const [userType, setUserType] = React.useState("");

  const createSowUrl = api.OA_URL + create_sow;
  const work_id_manager_url = api.VENDOR_URL + work_id_manager;
  const managers_oa_url = api.VENDOR_URL + managers_oa;
  const extractTokenURL = api.VENDOR_URL + extract_token;

  React.useState(() => {
    axios
      .get(extractTokenURL)
      .then((res) => {
        setUserType(res.data.type);
      })
      .catch((err) => console.log(err, "error"));
  }, []);

  React.useEffect(() => {
    axios
      .get(work_id_manager_url)
      .then((res) => {
        setManagerData(res?.data?.data);
      })
      .catch((err) => {
        console.log(err, "err");
      });

    if (oashow) {
      delete formData.oa_work_id;
      // setOaShow(false)
      axios
        .get(managers_oa_url, { params: { work_team: workteam } })
        .then((res) => {
          // setOaShow(true)
          setOaData(res?.data?.data);
        })
        .catch((err) => console.log(err, "errint"));
    }
  }, [oashow, workteam]);

  const openModalside = (d) => {
    setOnClickData(d);
    set_modal_signUpModals_1(true);
  };
  const closeModalside = () => {
    set_modal_signUpModals_1(false);
  };

  const handleChange = (e) => {
    if (e.target == undefined) {
      const name = "start_date";
      const value = moment(e[0]).format("YYYY-MM-DD");
      setFormData({ ...formData, [name]: value });
    } else if (e.target.name == "manager_work_id") {
      const data = e.target.value.split(",");
      setWorkTeam(data[1]);
      setFormData({ ...formData, [e.target.name]: data[0] });
    } else {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleChange1 = (e) => {
    const name = "end_date";
    const value = moment(e[0]).format("YYYY-MM-DD");
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    formData.ref_table_name = onClickData.ref_table_name;
    formData.project_id = onClickData.main_id;
    formData.project_title = onClickData.project_title;
    formData.add_lead_status = "none";
    console.log(formData, "formdata");

    axios
      .post(createSowUrl, formData)
      .then((res) => {
        setSowId(res.data.id);
        if (onClickData.project_id > 0) {
          const enterAravind = {
            project_id: onClickData.project_id,
            sow_id: res.data.id,
            sow_date: formData.start_date,
            sow_status: 1,
            ref_table_name: "none",
            project_intro_status: 0,
          };

          const headerEnter = {
            headers: {
              "x-auth-key": "mxhyz-bsmnr-pqknt",
            },
          };
          axios
            .patch(aravindSowAdd, enterAravind, headerEnter)
            .then((res) => {
              console.log("success res");
            })
            .catch((err) => {
              console.log(err);
            });
        }
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
          // setNextData(false);
          closeModalside();
          setCheck1(!check1);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const columns = [
    {
      name: "Lead ID",
      selector: (row) => row.project_unique_id,
      sortable: true,
      cell: (row) => (
        <div
          className="text-info cursor-pointer"
          onClick={() => {
            history.push(`/project-overview/${row.project_id}`);
          }}
        >
          <u>{row.project_unique_id}</u>
        </div>
      ),
      width: "200px",
    },
    {
      name: "Lead Details",
      selector: (row) => row.project_title,
      sortable: true,
      cell: (d) => (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            // justifyContent: "center",
            gap: "10px",
            alignItems: "center",
            width: "200px",
            height: "100px",
          }}
        >
          <div>
            <img
              src={d.brand_logo}
              alt="brand logo"
              className="rounded-avatar-xs"
              width="40px"
              height={"40px"}
              style={{ borderRadius: "50%" }}
            />
          </div>

          <div className="d-flex flex-column justify-content-between">
            {d.project_title}
            <span className="fs-12 text-muted d-flex gap-2 mt-1">
              {d.live_from == "Live" ? (
                <span className="badge badge-soft-success">{d.live_from}</span>
              ) : d.live_from > 0 ? (
                <div className="fs-10">
                  {" "}
                  To be live in
                  <span
                    className="badge badge-soft-danger"
                    style={{ color: "orange" }}
                  >
                    {d.live_from} Days
                  </span>
                </div>
              ) : (
                ""
              )}
            </span>
          </div>
        </div>
      ),
    },
    {
      name: "Generated By",
      selector: (row) => row.full_name,
      sortable: true,
      cell: (d) => (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            // justifyContent: "center",
            gap: "10px",
            alignItems: "center",
            width: "250px",
            height: "100px",
          }}
        >
          <div>
            <img
              src={d.profile}
              alt="brand logo"
              className="rounded-avatar-xs"
              width="40px"
              height={"40px"}
              style={{ borderRadius: "50%" }}
            />
          </div>

          <div className="fs-12 w-100">
            <div className="fs-14 fw-semi-bold">{d.full_name}</div>{" "}
            <span className="fs-10 text-muted">Created on: {d.created_at}</span>
            {/* <div className="fs-10 text-muted">
              Phone: <span className="text-black">{d.phone}</span>
            </div>
            <div className="fs-10 text-muted">
              Email: <span className="text-black">{d.email}</span>
            </div> */}
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
          color={
            row.difficulty_level == "Low"
              ? "info"
              : row.difficulty_level == "High"
              ? "primary"
              : "secondary"
          }
          className="badge-label"
          style={{ width: "65px" }}
        >
          <i className="mdi mdi-circle-medium"></i> {row.difficulty_level}
        </Badge>
      ),
      width: "200px",
    },
    // {
    //   name: "",
    //   right: true,
    //   width: "50px",
    //   cell: (d) => (
    //     <div>
    //       {userType == "all" && location.pathname == "/project-leads" ? (
    //         <UncontrolledDropdown className="dropdown d-inline-block">
    //           <DropdownToggle
    //             tag="a"
    //             className="text-reset dropdown-btn"
    //             role="button"
    //           >
    //             <i
    //               className="ri-more-fill align-middle"
    //               style={{ color: "black" }}
    //             ></i>
    //           </DropdownToggle>
    //           <DropdownMenu className="dropdown-menu-end">
    //             <DropdownItem
    //               className="edit-item-btn d-flex align-items-center"
    //               // onClick={() => history.push(`/editsow/${d.sow_id}`)}
    //               onClick={() => openModalside(d)}
    //             >
    //               <i className="ri-add-circle-line align-bottom me-2 text-muted"></i>
    //               Add Sow
    //             </DropdownItem>
    //             <DropdownItem
    //               className="edit-item-btn d-flex align-items-center"
    //               onClick={() => {
    //                 history.push(`/project-overview/${d.project_id}`);
    //               }}
    //             >
    //               <i className="ri-eye-line align-bottom me-2 text-muted"></i>
    //               View Details
    //             </DropdownItem>
    //           </DropdownMenu>
    //         </UncontrolledDropdown>
    //       ) : (
    //         <></>
    //       )}
    //     </div>
    //   ),
    // },
  ];
  const tableData = {
    columns,
    data,
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
        <DataTable columns={columns} data={data} />
      </DataTableExtensions>

      <Modal
        id="signupModals"
        tabIndex="-1"
        isOpen={modal_signUpModals_1}
        toggle={() => {
          closeModalside();
          // setNextData(true);
          // setShow(false);
          // setFormData({});
          // setsortBy("");
          // setOaData([]);
        }}
        centered={true}
        size="xl"
      >
        <ModalHeader
          className="p-3"
          toggle={() => {
            closeModalside();
            // setNextData(true);
            // setShow(false);
            // setsortBy("");
            // setOaData([]);

            // setFormData({});
          }}
        >
          New Project
        </ModalHeader>

        <ModalBody>
          <form onSubmit={handleSubmit}>
            <>
              <div className="mb-3">
                <Row className="align-items-center g-3">
                  <Col lg={6}>
                    <Label> Start Date</Label>
                    <Flatpickr
                      placeholder="Select Start Date"
                      className="form-control"
                      id="exampleInputdate"
                      name="startdate"
                      onChange={handleChange}
                    />
                  </Col>

                  <Col lg={6}>
                    <Label>End Date</Label>
                    <Flatpickr
                      placeholder="Select End Date"
                      className="form-control"
                      id="exampleInputdate"
                      options={{
                        minDate: formData.startdate,
                      }}
                      name="enddate"
                      onChange={handleChange1}
                    />
                  </Col>
                </Row>
              </div>

              <div className="mb-3">
                <Row className="align-items-center g-3">
                  <Col lg={6}>
                    <Label>Project Title</Label>
                    <input
                      type="text"
                      className="form-control"
                      id="emailInput"
                      name="project_title"
                      onChange={handleChange}
                    />
                  </Col>
                  <Col xs={3}>
                    <Label>Tasker CPL</Label>
                    <input
                      type="text"
                      className="form-control"
                      id="emailInput"
                      name="xleads"
                      onChange={handleChange}
                    />
                  </Col>
                  <Col xs={3}>
                    <Label>SP CPL</Label>
                    <input
                      type="text"
                      className="form-control"
                      id="emailInput"
                      name="vendor_cpl"
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
                <Row className="align-items-center g-3 mt-2">
                  <Col lg={6}>
                    <Label>Manager</Label>
                    <select
                      className="form-select"
                      aria-label=".form-select-sm example"
                      name="manager_work_id"
                      onChange={(e) => {
                        handleChange(e);
                        setOaShow(true);
                      }}
                    >
                      <option>Select Manager</option>

                      {managerData?.map((item) => (
                        <option
                          key={item?.employee_id}
                          value={[item?.workids_id, item?.team_name]}
                        >
                          {item?.full_name}
                        </option>
                      ))}
                    </select>
                  </Col>
                  {oashow ? (
                    <Col lg={6}>
                      <Label>KAM</Label>
                      <select
                        className="form-select"
                        aria-label=".form-select-sm example"
                        name="oa_work_id"
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      >
                        <option>Select Manager</option>

                        {oaData?.map((item) => (
                          <option
                            key={item?.employee_id}
                            value={item?.workids_id}
                          >
                            {item?.full_name}
                          </option>
                        ))}
                      </select>
                    </Col>
                  ) : (
                    ""
                  )}
                </Row>

                <div className="d-flex justify-content-end mt-2">
                  <button
                    type="submit"
                    className="btn btn-secondary d-flex align-items-center gap-2"
                  >
                    <i className="ri ri-check-line"></i>
                    Submit
                  </button>
                </div>
              </div>
            </>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ProjectLeadsTable;
