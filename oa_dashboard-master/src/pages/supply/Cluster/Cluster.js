import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import {
  AddCluster,
  AddManager,
  CityModal,
  ProjectModal,
  EditModal,
} from "./ClusterModal";

import { getclusters } from "../../../assets/utils/clusterApi";
import { farming } from "../../../globalConfig";
import axios from "axios";
import FeatherIcon from "feather-icons-react";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../../App";

const Cluster = () => {
  const [open, setOpen] = React.useState(false);
  const [openProj, setOpenProj] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [apiData, setApiData] = React.useState([]);
  const [cityMod, setCityMod] = React.useState(false);
  const [addMod, setAddMod] = React.useState(false);
  const [clustId, setClustId] = React.useState("");
  const [managerId, setManagerId] = React.useState("");
  const [manager, setManager] = React.useState("");
  const [check, setCheck] = React.useState(false);
  const [managerCheck, setManagerCheck] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  console.log(apiData, userData, "idd");

  // const role = sessionStorage.getItem("role");
  const [context, setContext] = useContext(Context);
  const role = context.oaDetials.role;

  const history = useHistory();
  document.title = "OnX | Supply";

  React.useEffect(() => {
    const link = farming.farming_URL + getclusters;
    axios
      .get(link)
      .then((res) => setApiData(res?.data?.cluster))
      .catch((err) => console.log(err));
  }, [check, managerCheck]);

  const handleAddCluster = () => {
    setOpen(!open);
  };
  return (
    <>
      <div className="page-content">
        {/* <ToastContainer /> */}

        <Container fluid>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="card-title mb-2 fs-20" style={{ color: "#b83016" }}>
              Cluster
            </h5>
            <button
              className="btn"
              style={{
                backgroundColor: "#ec5c24",
                color: "whitesmoke",
                transition: "background-color 0.3s ease",
                display:
                  role == "super_admin" || role == "head" ? "block" : "none",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#dd4319")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#ec5c24")}
              onClick={handleAddCluster}
            >
              <i className=" ri-add-fill align-middle me-1"></i>
              Add
            </button>
          </div>

          <Row>
            {apiData?.map((item) => {
              return (
                <Col
                  key={item.cluster_id}
                  md={6}
                  style={{ padding: "0px 8px" }}
                >
                  <Card
                    style={{ minHeight: "175px", marginBottom: "18px" }}
                    onClick={() => setUserData(item)}
                  >
                    <CardBody>
                      <div style={{ display: "flex", minHeight: "175px" }}>
                        <div style={{ flex: "1.5" }}>
                          <div className="d-flex align-items-center  gap-4 mb-2">
                            <img
                              src={
                                item.profile_image.substr(0, 4) === "http"
                                  ? item.profile_image
                                  : "/user-dummy-img.jpg"
                              }
                              alt="img"
                              className="rounded-circle avatar-sm"
                            ></img>

                            <h5 className="m-0 " style={{ color: "#b83016" }}>
                              {item.cluster_name}

                              {item.status == "active" ? (
                                <span className="ml-2">
                                  <i className="ri-checkbox-circle-fill align-middle text-success mx-2 "></i>
                                </span>
                              ) : (
                                <></>
                              )}
                            </h5>
                          </div>
                          <br />
                          <div
                            style={{
                              display: "flex",
                              gap: "10px",
                              flexWrap: "wrap",

                              // width: "500px",
                            }}
                          >
                            {item?.city?.map((res) => {
                              return (
                                <>
                                  <span
                                    className="badge badge-soft"
                                    style={{
                                      display: "block",
                                      minWidth: "99px",
                                      backgroundColor: "#fde8d7 ",
                                      color: "#f07d47",
                                    }}
                                  >
                                    {res.city}
                                  </span>
                                </>
                              );
                            })}
                          </div>
                          <p
                            className="m-0 mb-0 fs-10 text-muted"
                            style={{ position: "absolute", bottom: "17px" }}
                          >
                            {item.date}
                          </p>
                        </div>
                        <div
                          style={{ flex: "1 " }}
                          className="d-flex flex-column justify-content-between"
                        >
                          <div style={{ textAlign: "end" }}>
                            <UncontrolledDropdown
                              direction="start"
                              className="dropdown d-inline-block"
                              onClick={() => {
                                setClustId(item.cluster_id);
                                setManager(item.manager);
                                setManagerId(item?.cluster_manager_id);
                              }}
                              disabled={
                                role == "super_admin" ||
                                role == "head" ||
                                role === "manager" ||
                                role == "rm"
                                  ? false
                                  : true
                              }
                            >
                              <DropdownToggle
                                tag="button"
                                className="btn btn-link text-muted p-1 mt-n2 py-0 text-decoration-none fs-15 bg-light"
                              >
                                <FeatherIcon
                                  icon="more-horizontal"
                                  className="icon-sm"
                                />
                              </DropdownToggle>
                              <DropdownMenu className="dropdown-menu-end">
                                <DropdownItem
                                  className="edit-item-btn d-flex align-items-center"
                                  onClick={() => setCityMod(!cityMod)}
                                >
                                  <i className=" ri-hotel-fill align-bottom me-2 text-muted"></i>
                                  Add City
                                </DropdownItem>
                                <DropdownItem
                                  className="edit-item-btn d-flex align-items-center"
                                  onClick={() => setOpenEdit(!openEdit)}
                                >
                                  <i className="   ri-edit-line align-bottom me-2 text-muted"></i>
                                  Edit
                                </DropdownItem>
                                <DropdownItem
                                  className="edit-item-btn d-flex align-items-center"
                                  onClick={() =>
                                    history.push(
                                      `/supply/cluster/cm/${userData.cluster_id}`
                                    )
                                  }
                                >
                                  <i className="ri-eye-fill align-bottom me-2 text-muted"></i>
                                  View TSM
                                </DropdownItem>
                                {item.manager == null ? (
                                  <DropdownItem
                                    className="edit-item-btn d-flex align-items-center"
                                    onClick={() => setAddMod(!addMod)}
                                  >
                                    <i className=" ri-add-circle-fill align-bottom me-2 text-muted"></i>
                                    Add Manager
                                  </DropdownItem>
                                ) : (
                                  <DropdownItem
                                    className="edit-item-btn d-flex align-items-center"
                                    onClick={() => setAddMod(!addMod)}
                                  >
                                    <i className="  ri-indeterminate-circle-fill align-bottom me-2 text-muted"></i>
                                    Remove Manager
                                  </DropdownItem>
                                )}
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </div>
                          <div className="d-flex gap-3 flex-column align-items-end mt-2">
                            {/* <div className="d-flex gap-2 align-items-center">
                              <p className="m-0 mb-1  fs-12 text-muted text-center">
                                Project
                              </p>
                              <div
                                className="badge badge-soft-secondary p-2 px-3 fs-13"
                                style={{ minWidth: "80px", cursor: "pointer" }}
                                onClick={() => setOpenProj(!openProj)}
                              >
                                <span className="fw-bold ms-1">
                                  {item.project_count}
                                </span>
                              </div>
                            </div> */}
                            <div className="d-flex gap-2 align-items-center">
                              <p className="m-0 mb-1 fs-12 text-muted text-center">
                                Networks
                              </p>
                              <div
                                className="badge badge-soft-success p-1 px-2 fs-13"
                                style={{ minWidth: "80px", cursor: "pointer" }}
                              >
                                <span className="fw-bold ms-1">
                                  {" "}
                                  {item.fse_count}
                                </span>
                              </div>
                            </div>
                            <div className="d-flex gap-2 align-items-center">
                              <p className="m-0 mb-1  fs-12 text-muted text-center">
                                TSM
                              </p>
                              <div
                                className="badge badge-soft-info p-1 px-2 fs-13"
                                style={{ minWidth: "80px", cursor: "pointer" }}
                              >
                                <span className="fw-bold ms-1">
                                  {item.asm_tsm_count}
                                </span>
                              </div>
                            </div>
                            <div className="d-flex gap-2 align-items-center">
                              <p className="m-0 mb-1  fs-12 text-muted text-center">
                                Vendor
                              </p>
                              <div
                                className="badge badge-soft-secondary p-1 px-2 fs-13"
                                style={{ minWidth: "80px", cursor: "pointer" }}
                              >
                                <span className="fw-bold ms-1">
                                  {item.asm_vendor_count}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex  flex-column justify-content-center align-items-end gap-2 mt-3">
                            <span
                              className="fs-10 text-muted"
                              style={{ wordBreak: "break-word" }}
                            >
                              Head : {item.rm}
                            </span>
                            <span
                              className="fs-10 text-muted"
                              style={{ wordBreak: "break-word" }}
                            >
                              Manager : {item.manager}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
        <AddCluster
          open={open}
          setOpen={setOpen}
          setCheck={setCheck}
          check={check}
        />
        <CityModal
          cityMod={cityMod}
          setCityMod={setCityMod}
          clustId={clustId}
          setCheck={setCheck}
          check={check}
        />
        <AddManager
          addMod={addMod}
          setAddMod={setAddMod}
          clustId={clustId}
          manager={manager}
          setManagerCheck={setManagerCheck}
          managerCheck={managerCheck}
          managerId={managerId}
        />

        <ProjectModal openProj={openProj} setOpenProj={setOpenProj} />
        <EditModal
          openEdit={openEdit}
          setOpenEdit={setOpenEdit}
          userData={userData}
          check={check}
          setCheck={setCheck}
        />
      </div>
    </>
  );
};

export default Cluster;
