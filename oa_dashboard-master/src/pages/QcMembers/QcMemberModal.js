import React, { useContext } from "react";
import {
  Alert,
  Col,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import axios from "axios";
import Flatpickr from "react-flatpickr";
import moment from "moment";
import { GetQcContext } from "./QcMembers";
import { addLangtoqc, removelangtoqc } from "../../assets/utils/farmingBase";
import { api, farming } from "../../globalConfig";
import { toast } from "react-toastify";

const QcMemberModalEdit = (props) => {
  const { open, setOpen, update, setUpdate, id, updateQc, edit, switchData } =
    props;

  const handleQcEditChange = (e) => {
    update.id = id;
    const { name, value } = e.target;
    setUpdate({ ...update, [name]: value });
  };

  const { setGetQc, getqc, setGetAllQc } = useContext(GetQcContext);

  const handleSubmitUpdate = (e) => {
    e.preventDefault();
    updateQc();
    setOpen(false);
    setTimeout(() => {
      setGetQc(!getqc);
    }, 1000);
  };
  return (
    <div>
      <Modal
        id="signupModals"
        tabIndex="-1"
        isOpen={open}
        size="lg"
        toggle={() => {
          setOpen(false);
          setUpdate({});
        }}
        centered={true}
      >
        <ModalHeader
          toggle={() => {
            setOpen(false);
            setUpdate({});
          }}
        >
          <h5 style={{ color: "#3f5289 " }}>Edit</h5>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmitUpdate}>
            <Row>
              <Col xs={"6"} className="mb-3">
                <div>
                  <label htmlFor="labelInput" className="form-label">
                    Name
                  </label>
                  <input
                    name="full_name"
                    defaultValue={edit.name}
                    type="text"
                    className="form-control"
                    id="labelInput"
                    onChange={handleQcEditChange}
                  />
                </div>
              </Col>

              <Col xs={"6"} className="mb-3">
                <div>
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    name="email_id"
                    defaultValue={edit.email}
                    type="email"
                    className="form-control"
                    id="email"
                    onChange={handleQcEditChange}
                  />
                </div>
              </Col>
              <Col xs={"4"} className="mb-3">
                <div>
                  <label htmlFor="number" className="form-label">
                    Mobile Number
                  </label>
                  <input
                    name="number"
                    defaultValue={edit.mobile}
                    type="number"
                    className="form-control"
                    id="number"
                    min={10}
                    onChange={handleQcEditChange}
                    onInput={(e) =>
                      (e.target.value = Math.max(
                        0,
                        parseInt(e.target.value).toString().slice(0, 10)
                      ))
                    }
                  />
                </div>
              </Col>
              <Col xs={"4"} className="mb-3">
                <div>
                  <label htmlFor="number" className="form-label">
                    Type
                  </label>
                  <select
                    name="type"
                    className="form-select mb-3"
                    aria-label="Default select example"
                    required
                    onChange={handleQcEditChange}
                    defaultValue={edit.type}
                  >
                    {/* <option selected>select type</option> */}
                    <option value="" selected disabled>
                      select type
                    </option>
                    <option value="qc">qc agent</option>
                    <option value="viewer">viewer</option>
                  </select>
                </div>
              </Col>
              <Col xs={"4"} className="mb-3">
                <div>
                  <label htmlFor="number" className="form-label">
                    Status
                  </label>
                  <select
                    name="status"
                    className="form-select mb-3"
                    defaultValue={edit.status}
                    aria-label="Default select example"
                    required
                    onChange={handleQcEditChange}
                  >
                    <option selected value="active">
                      active
                    </option>
                    <option value="inactive">inactive</option>
                  </select>
                </div>
              </Col>
              <Col xs={"12"} className="d-flex justify-content-end">
                <button
                  type="submit"
                  className="btn btn-primary waves-effect waves-light"
                  // onClick={() => {
                  //   updateQc();
                  //   setOpen(false);
                  // }}
                  // disabled={
                  //   JSON.stringify(edit) === JSON.stringify(update)
                  //     ? true
                  //     : false
                  // }
                >
                  Update
                </button>
              </Col>
            </Row>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
};

const QcMemberModal2 = ({
  modal_langaugeModals,
  tog_langaugeModals,
  id,
  lang,
  setLang,
  selectedCheckboxes,
  setSelectedCheckboxes,
  handleLang,
}) => {
  console.log(id, "idkholi");

  const warningnotify = (msg) =>
    toast(msg, {
      position: "top-center",
      hideProgressBar: true,
      closeOnClick: false,
      className: "bg-warning text-white",
    });

  const handleCheckboxChange = (e, checkboxValue) => {
    console.log(e.target.checked, "lion");
    if (e.target.checked === false) {
      const link = farming.farming_URL + removelangtoqc;
      const body = {
        id: id,
        language_id: checkboxValue,
      };
      console.log(body, "body");
      axios
        .put(link, body)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
      setTimeout(() => {
        handleLang(id);
      }, 500);
    }
    if (selectedCheckboxes.includes(checkboxValue)) {
      setSelectedCheckboxes(
        selectedCheckboxes.filter((value) => value !== checkboxValue)
      );
    } else if (selectedCheckboxes.length < 3) {
      setSelectedCheckboxes([...selectedCheckboxes, checkboxValue]);
      const link = farming.farming_URL + addLangtoqc;
      const body = {
        id: id,
        language_id: checkboxValue,
      };
      console.log(body, "body");
      axios
        .put(link, body)
        .then((res) => {
          if (res.data.error === true) {
            warningnotify(res.data.message);
          }
        })
        .catch((err) => console.log(err));
      setTimeout(() => {
        handleLang(id);
      }, 500);
    }
  };

  return (
    <>
      <Modal
        id="signupModals"
        tabIndex="-1"
        isOpen={modal_langaugeModals}
        toggle={() => {
          tog_langaugeModals();
        }}
        centered
        size="lg"
      >
        <ModalHeader
          className="p-3"
          toggle={() => {
            tog_langaugeModals();
          }}
        >
          <h5 style={{ color: "#3f5289 " }}>Language</h5>
        </ModalHeader>

        <ModalBody>
          <Row>
            {lang.map((item) => {
              return (
                <>
                  <Col xs="4" className="mb-3">
                    <div
                      style={{
                        border: "1px solid  #202945",
                        height: "50px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderRadius: "6px",
                      }}
                    >
                      <p
                        style={{
                          margin: "0px",
                          padding: "6px",
                          color: "#3f5289",
                          fontWeight: "600",
                        }}
                      >
                        {item.language_name}
                      </p>

                      <div>
                        <label
                          key={item.id}
                          style={{
                            transform: "scale(1.5)",
                            marginRight: "12px",
                            marginTop: "15px",
                          }}
                        >
                          <input
                            type="checkbox"
                            value={item.id}
                            // disabled={!selectedCheckboxes.includes(item.id)}
                            checked={selectedCheckboxes.includes(item.id)}
                            onChange={(e) => handleCheckboxChange(e, item.id)}
                          />
                        </label>
                      </div>
                    </div>
                  </Col>
                </>
              );
            })}
          </Row>
        </ModalBody>
      </Modal>
    </>
  );
};

const QcRangeModal = (props) => {
  const {
    modalRange,
    setModalRange,
    startDateRange,
    endDateRange,
    setStartDateRange,
    setEndDateRange,
    handleDateRange,
  } = props;

  const handleDate = (value) => {
    setStartDateRange(moment(value[0]).format("YYYY-MM-DD"));
    setEndDateRange(moment(value[1]).format("YYYY-MM-DD"));
  };
  return (
    <>
      <Modal
        id="signupModals"
        tabIndex="-1"
        isOpen={modalRange}
        size="sm"
        toggle={() => {
          setModalRange();
          setStartDateRange("");
          setEndDateRange("");
        }}
        centered={true}
      >
        <ModalHeader
          toggle={() => {
            setModalRange();
            setStartDateRange("");
            setEndDateRange("");
          }}
        >
          <h5 style={{ color: "#3f5289 " }}>Select Date</h5>
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <div className="mt-3">
                <Label className="form-label mb-0">Range</Label>
                <Flatpickr
                  className="form-control"
                  options={{
                    mode: "range",
                    dateFormat: "Y-m-d",
                  }}
                  onChange={handleDate}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs="12" className="mt-3 d-flex justify-content-end">
              <button
                className="btn btn-primary  "
                onClick={() => {
                  handleDateRange();
                  setModalRange(false);
                  setStartDateRange("");
                  setEndDateRange("");
                }}
                disabled={endDateRange === "" ? true : false}
              >
                Apply
              </button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </>
  );
};

const QcFilterModal = (props) => {
  const { openFilter, setOpenFilter, qcStatus, setQcStatus, getallqc } = props;

  const handleStatusChange = (e) => {
    setQcStatus(e.target.value);
  };

  const handleClose = () => {
    setOpenFilter(false);
    setQcStatus("all");
  };

  const handleStatusSubmit = (e) => {
    e.preventDefault();
    getallqc();
    handleClose();
  };
  return (
    <>
      <Modal
        id="signupModals"
        tabIndex="-1"
        isOpen={openFilter}
        size="sm"
        toggle={() => {
          handleClose();
        }}
        centered={true}
      >
        <ModalHeader
          toggle={() => {
            handleClose();
          }}
        >
          <h5 style={{ color: "#3f5289 " }}>Status</h5>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleStatusSubmit}>
            <Row
              className="align-items-center
"
            >
              <Col xs={"8"} className="mb-3">
                <div>
                  <label htmlFor="number" className="form-label">
                    Status
                  </label>
                  <select
                    name="status"
                    className="form-select mb-3"
                    defaultValue={qcStatus}
                    aria-label="Default select example"
                    onChange={handleStatusChange}
                  >
                    <option value="all">all</option>
                    <option value="active">active</option>
                    <option value="inactive">inactive</option>
                    {/* <option value="inactive">all</option> */}
                  </select>
                </div>
              </Col>
              <Col xs={"4"}>
                <button
                  type="submit"
                  className="btn btn-primary waves-effect waves-light"
                  // onClick={() => {
                  //   updateQc();
                  //   setOpen(false);
                  // }}
                >
                  Apply
                </button>
              </Col>
            </Row>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
};
export { QcMemberModalEdit, QcMemberModal2, QcRangeModal, QcFilterModal };
