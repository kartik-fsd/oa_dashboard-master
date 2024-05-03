import axios from "axios";
import React from "react";
import Select from "react-select";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import {
  cmrm,
  createCluster,
  cluster_city,
  bulkAddcity,
  updatecm,
  editCluster,
} from "../../../assets/utils/clusterApi";
import { upload_issue_proof } from "../../../assets/utils/sow";
import { api, farming } from "../../../globalConfig";
import { successnotify, warningnotify } from "../../Toasts";
import AsmProjectTable from "./Projects/AsmProjectTable";

const AddCluster = ({ open, setOpen, setCheck, check }) => {
  const [clustName, setClustName] = React.useState("");
  const [clustHead, setClustHead] = React.useState("");
  const [clustHeadOpt, setClustHeadOpt] = React.useState([]);
  const [fileName, setFileName] = React.useState("");
  const [resurl, setResurl] = React.useState("");
  const hiddenFile = React.useRef(null);

  const colorStyles = {
    control: (styles) => ({ ...styles, height: "40px" }),
  };
  const clustNameChange = (e) => {
    setClustName(e.target.value);
  };
  const clustHeadChange = (e) => {
    setClustHead(e.value);
  };

  React.useEffect(() => {
    const link = farming.farming_URL + cmrm + `/rm`;

    axios
      .get(link)
      .then((res) => {
        setClustHeadOpt(res.data.cmrm);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleAddCluster = () => {
    const link = farming.farming_URL + createCluster;
    const body = {
      cluster_name: clustName,
      cluster_head: clustHead,
      profile_image: resurl,
    };
    const comp = Object.values(body);
    console.log(body, "body890");

    if (!comp.includes("")) {
      axios
        .post(link, body)
        .then((res) => {
          setCheck(!check);
          successnotify("success");
          setOpen(false);
        })
        .catch((err) => {
          warningnotify("oops something went wrong...!");
        });
    } else {
      warningnotify("Please Enter All Details");
    }
  };

  const handleProfileClick = () => {
    hiddenFile.current.click();
  };

  const handleProfileChange = (e) => {
    const path = api.AWS_URL + upload_issue_proof;
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    setFileName(e.target.files[0]?.name);
    // console.log(e.target.files[0].name, "file");
    console.log(formData.get("file"), 123);
    axios
      .post(path, formData)
      .then((res) => {
        setResurl(res?.data?.url);
      })
      .catch((err) => console.log(err, "err"));
  };

  const tog = () => {
    setOpen(false);
    setClustName("");
    setClustHead("");
  };
  return (
    <div>
      <Modal
        id="signupModals"
        tabIndex="-1"
        isOpen={open}
        size="lg"
        toggle={() => {
          tog();
        }}
        centered={true}
      >
        <ModalHeader
          toggle={() => {
            tog();
          }}
        >
          <h5 style={{ color: "#3f5289 " }}>Add Cluster</h5>
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col xs={"4"} className="mb-3">
              <div>
                <label htmlFor="basiInput" className="form-label">
                  Cluster Name
                </label>
                <input
                  type="text"
                  // defaultValue="hii"
                  className="form-control"
                  id="basiInput"
                  onChange={clustNameChange}
                />
              </div>
            </Col>
            <Col xs={"4"} className="mb-3">
              <div>
                <label htmlFor="labelInput" className="form-label">
                  Cluster Head
                </label>
                <Select
                  styles={colorStyles}
                  id="sowid"
                  options={clustHeadOpt}
                  isSearchable
                  // isClearable={data.sow_id}
                  onChange={(e) => {
                    clustHeadChange(e);
                  }}
                />
              </div>
            </Col>
            <Col xs={"4"} className="mb-3">
              <div>
                <label htmlFor="labelInput" className="form-label">
                  Upload Profile
                </label>
                <div>
                  {/* <i
                    className=" ri-upload-cloud-2-fill fs-24 ms-4 text-secondary"
                    onClick={handleProfileClick}
                  ></i>
                  <input
                    type="file"
                    ref={hiddenFile}
                    className="d-none"
                    onChange={handleProfileChange}
                  /> */}
                  <div className="input-group">
                    <button
                      className="btn btn-secondary"
                      type="button"
                      onClick={handleProfileClick}
                    >
                      Upload
                    </button>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="file name"
                      readOnly
                      value={fileName}
                      aria-label="Example text with two button addons"
                    />
                    <input
                      type="file"
                      ref={hiddenFile}
                      className="d-none"
                      onChange={handleProfileChange}
                    />
                  </div>
                </div>
              </div>
            </Col>

            <Col xs={"12"} className="d-flex justify-content-end">
              <button
                type="button"
                className="btn waves-effect waves-light text-light"
                style={{ backgroundColor: "#ec5c24" }}
                onClick={handleAddCluster}
              >
                Add
              </button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  );
};

const CityModal = ({ cityMod, setCityMod, clustId, setCheck, check }) => {
  const [cityOpt, setCityOpt] = React.useState([]);
  const [city, setCity] = React.useState([]);
  const [cityCheck, setCityCheck] = React.useState(false);

  console.log(city, "selec");
  const colorStyles = {
    control: (styles) => ({
      ...styles,
      height: city.length <= 3 ? "40px" : "60px",
    }),
  };

  React.useEffect(() => {
    const link = farming.farming_URL + cluster_city;

    axios
      .get(link)
      .then((res) => {
        setCityOpt(res?.data.cities);
      })
      .catch((err) => console.log(err));
  }, [cityCheck]);

  const handleCityChange = (e) => {
    console.log(e, "qw");
    const selectedCity = e.map((el) => el.value);
    setCity([...selectedCity]);
  };

  const handleAddCity = () => {
    const link = farming.farming_URL + bulkAddcity;
    const body = {
      city: city,
      cluster_id: clustId,
    };
    axios
      .post(link, body)
      .then((res) => {
        successnotify("success");
        setCheck(!check);
        setCityMod(false);
        setCityCheck(!cityCheck);
        setCity([]);
      })
      .catch((err) => warningnotify("oops something went wrong...!"));
  };
  const tog = () => {
    setCityMod(false);
    setCity([]);
  };
  return (
    <>
      <Modal
        id="signupModals"
        tabIndex="-1"
        isOpen={cityMod}
        size="md"
        toggle={() => {
          tog();
        }}
        centered={true}
      >
        <ModalHeader
          toggle={() => {
            tog();
          }}
        >
          <h5 style={{ color: "#3f5289 " }}>Add City</h5>
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col xs={"12"} className="mb-3">
              <div>
                <label htmlFor="labelInput" className="form-label">
                  City
                </label>
                <Select
                  styles={colorStyles}
                  id="sowid"
                  options={cityOpt}
                  isSearchable
                  isMulti
                  // isClearable={data.sow_id}
                  onChange={(e) => {
                    handleCityChange(e);
                  }}
                />
              </div>
            </Col>

            <Col xs={"12"} className="d-flex justify-content-end">
              <button
                type="button"
                className="btn waves-effect waves-light"
                style={{ backgroundColor: "#ec5c24" }}
                disabled={city.length < 1 ? true : false}
                onClick={handleAddCity}
              >
                Add
              </button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </>
  );
};

const AddManager = ({
  setAddMod,
  addMod,
  clustId,
  manager,
  setManagerCheck,
  managerCheck,
  managerId,
}) => {
  const [clustManager, setClustManager] = React.useState("");
  const [clustManagerOpt, setManagerHeadOpt] = React.useState([]);
  const [check, setCheck] = React.useState(false);
  console.log(clustManager, clustId, "123456");

  const colorStyles = {
    control: (styles) => ({ ...styles, height: "40px" }),
  };

  React.useEffect(() => {
    const path = farming.farming_URL + cmrm + `/cm`;
    axios
      .get(path)
      .then((res) => {
        setManagerHeadOpt(res.data.cmrm);
      })
      .catch((err) => console.log(err));
  }, [check]);

  const clustManagerChange = (e) => {
    setClustManager(e.value);
  };

  const handleManager = () => {
    const link = farming.farming_URL + updatecm;

    const body = {
      type: "add",
      cluster_id: clustId,
      cluster_manager_id: clustManager,
    };
    console.log(body);
    axios
      .put(link, body)
      .then((res) => {
        console.log(res.data, "res");
        setManagerCheck(!managerCheck);
        setCheck(!check);
        setAddMod(false);
        successnotify(res.data.message);
      })
      .catch((err) => console.log(err));
  };

  const handleRemoveManager = () => {
    const link = farming.farming_URL + updatecm;

    const body = {
      type: "remove",
      cluster_id: clustId,
      cluster_manager_id: managerId,
    };
    console.log(body);
    axios
      .put(link, body)
      .then((res) => {
        console.log(res.data, "res");
        setManagerCheck(!managerCheck);
        setCheck(!check);
        setAddMod(false);
        successnotify(res.data.message);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Modal
        id="signupModals"
        tabIndex="-1"
        isOpen={addMod}
        size="md"
        toggle={() => {
          setAddMod(false);
        }}
        centered={true}
      >
        <ModalHeader
          toggle={() => {
            setAddMod(false);
          }}
        >
          <h5 style={{ color: "#3f5289 " }}>
            {manager == null ? "Add Manager" : "Remove Manager"}{" "}
          </h5>
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col xs={"12"} className="mb-3">
              {manager == null ? (
                <div>
                  <label htmlFor="labelInput" className="form-label">
                    Manager
                  </label>
                  <Select
                    styles={colorStyles}
                    id="sowid"
                    options={clustManagerOpt}
                    isSearchable
                    // isClearable={data.sow_id}
                    onChange={(e) => {
                      clustManagerChange(e);
                    }}
                  />
                </div>
              ) : (
                <div>
                  <p className="fs-16 text-center">
                    Are you sure you want to remove manager
                  </p>
                </div>
              )}
            </Col>

            <Col xs={"12"} className="d-flex justify-content-end">
              {manager == null ? (
                <button
                  type="button"
                  className="btn waves-effect waves-light"
                  style={{ backgroundColor: "#ec5c24" }}
                  onClick={handleManager}
                >
                  Add
                </button>
              ) : (
                <div>
                  <button
                    type="button"
                    className="btn waves-effect waves-light me-2"
                    style={{ backgroundColor: "#ec5c24" }}
                    onClick={handleRemoveManager}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    className="btn waves-effect waves-light"
                    style={{ backgroundColor: "#ec5c24" }}
                    onClick={() => setAddMod(false)}
                  >
                    No
                  </button>
                </div>
              )}
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </>
  );
};

const ProjectModal = ({ openProj, setOpenProj }) => {
  return (
    <>
      <Modal
        id="signupModals"
        tabIndex="-1"
        isOpen={openProj}
        size="xl"
        toggle={() => {
          setOpenProj(false);
        }}
        centered={true}
      >
        <ModalHeader
          toggle={() => {
            setOpenProj(false);
          }}
        >
          {/* <h5 style={{ color: "#3f5289 " }}>Project</h5> */}
        </ModalHeader>
        <ModalBody>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h5 className="card-title mb-0">Project Details</h5>
                  <div>
                    <div style={{ height: "30px" }}></div>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <AsmProjectTable />
              </CardBody>
            </Card>
          </Col>
        </ModalBody>
      </Modal>
    </>
  );
};

const EditModal = ({ openEdit, setOpenEdit, userData, setCheck, check }) => {
  const hiddenFile = React.useRef(null);
  const [fileName, setFileName] = React.useState("");
  const [name, setName] = React.useState("");
  const [resurl, setResurl] = React.useState("");

  const handleProfileClick = () => {
    hiddenFile.current.click();
  };

  const handleProfileChange = (e) => {
    const path = api.AWS_URL + upload_issue_proof;
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    setFileName(e.target.files[0]?.name);

    console.log(formData.get("file"), 123);
    axios
      .post(path, formData)
      .then((res) => {
        setResurl(res?.data?.url);
      })
      .catch((err) => console.log(err, "err"));
  };

  console.log(resurl, "resurl");

  const handleUpdate = () => {
    const link = farming.farming_URL + editCluster;
    const body = {
      cluster_id: userData.cluster_id,
      profile_image: resurl,
      cluster_name: name,
    };

    const ot = Object.keys(body);

    for (let i = 0; i < ot.length; i++) {
      const key = ot[i];
      if (body[key] == "") {
        delete body[key];
      }
    }

    console.log(body, "asd");
    axios
      .put(link, body)
      .then((res) => {
        successnotify("success");
        setCheck(!check);
        setOpenEdit(false);
        setResurl("");
      })
      .catch((err) => warningnotify("oops somenthing went wrong...!"));
  };
  return (
    <>
      <Modal
        id="signupModals"
        tabIndex="-1"
        isOpen={openEdit}
        size="md"
        toggle={() => {
          setOpenEdit(false);
          setFileName("");
          name("");
          resurl("");
        }}
        centered={true}
      >
        <ModalHeader
          toggle={() => {
            setOpenEdit(false);
            setFileName("");
            setName("");
            setResurl("");
          }}
        >
          <h5 style={{ color: "#3f5289 " }}>Edit</h5>
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col xs={"6"} className="mb-3">
              <div>
                <label htmlFor="basiInput" className="form-label">
                  Cluster Name
                </label>
                <input
                  type="text"
                  defaultValue={userData.cluster_name}
                  className="form-control"
                  id="basiInput"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </Col>

            <Col xs={"6"} className="mb-3">
              <div>
                <label htmlFor="labelInput" className="form-label">
                  Upload Profile
                </label>
                <div>
                  <div className="input-group">
                    <button
                      className="btn btn-secondary"
                      type="button"
                      onClick={handleProfileClick}
                    >
                      Upload
                    </button>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="file name"
                      readOnly
                      value={userData.profile_image}
                      aria-label="Example text with two button addons"
                    />
                    <input
                      type="file"
                      ref={hiddenFile}
                      className="d-none"
                      onChange={handleProfileChange}
                    />
                  </div>
                </div>
              </div>
            </Col>

            <Col xs={"12"} className="d-flex justify-content-end">
              <button
                type="button"
                className="btn waves-effect waves-light"
                style={{ backgroundColor: "#ec5c24" }}
                disabled={name == "" && resurl == "" ? true : false}
                onClick={handleUpdate}
              >
                Update
              </button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </>
  );
};

export { AddCluster, CityModal, AddManager, ProjectModal, EditModal };
