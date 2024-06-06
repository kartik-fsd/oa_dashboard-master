import React from "react";
import {
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import Select from "react-select";
import { api, farming } from "../../../globalConfig";
import { add_vendor } from "../../../assets/utils/mepApi";
import axios from "axios";
import { getclustercity } from "../../../assets/utils/SupplyApi";
import { successnotify, warningnotify } from "../../Toasts";
import { isElementOfType } from "react-dom/test-utils";
import { sendWhatsappForSp } from "../../../assets/utils/abhiApi";

const AddTsmMod = ({ setOpen, open }) => {
  const [empDet, setEmpDet] = React.useState({});
  const [city, setCity] = React.useState([]);
  const colorStyles = {
    control: (styles) => ({ ...styles, height: "39px" }),
  };

  const handleEmpChange = (e) => {
    if (e.value == undefined) {
      const { name, value } = e.target;
      setEmpDet({ ...empDet, [name]: value });
    } else {
      setEmpDet({ ...empDet, city: e.label, state: e.state });
    }
  };

  const handleType = (e) => {
    if (e.target.value == 4) {
      const { name, value } = e.target;
      setEmpDet({ ...empDet, [name]: value });
    } else {
      setEmpDet({ ...empDet, type: e.target.value, emp_type: "off_roll" });
    }
  };

  const handleAddEmpDet = (e) => {
    e.preventDefault();
    const link = api.VENDOR_URL + add_vendor;

    const body = empDet;

    const comp = Object.values(body).length >= 4;

    if (comp) {
      axios
        .post(link, body)
        .then((res) => {
          if (res.data.error) {
            warningnotify(res.data.message);
          } else {
            const dataEnter = {
              asm_id: res.data?.vendor_id,
            };
            axios
              .post(sendWhatsappForSp, dataEnter)
              .then((res) => {
                successnotify("success");
                setOpen(false);
              })
              .catch((err) => {
                warningnotify("oops something went wrong...!");
              });
          }
        })
        .catch((err) => {
          warningnotify("oops something went wrong...!");
        });
    } else {
      warningnotify("Please Enter All Details");
    }
  };

  React.useEffect(() => {
    const link = farming.farming_URL + getclustercity;
    axios
      .get(link)
      .then((res) => setCity(res.data.city))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Modal
        id="signupModals"
        tabIndex="-1"
        isOpen={open}
        size="md"
        toggle={() => {
          setOpen(false);
          setEmpDet({});
        }}
        centered={true}
      >
        <ModalHeader
          toggle={() => {
            setOpen(false);
            setEmpDet({});
          }}
        >
          <h5 style={{ color: "#3f5289 " }}>SP Details</h5>
        </ModalHeader>
        <form onSubmit={handleAddEmpDet}>
          <ModalBody>
            <Row>
              <Col xl={"12"}>
                <div>
                  <label htmlFor="basiInput" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="basiInput"
                    name="full_name"
                    required
                    onChange={handleEmpChange}
                  />
                </div>
              </Col>
              <Col xl={"12"}>
                <div className="mt-3">
                  <label htmlFor="basiInput" className="form-label">
                    Contact Number
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="basiInput"
                    name="mobile_number"
                    min={10}
                    onInput={(e) =>
                      (e.target.value = Math.max(
                        0,
                        parseInt(e.target.value).toString().slice(0, 10)
                      ))
                    }
                    required
                    onChange={handleEmpChange}
                  />
                </div>
                <p className="mt-2 m-0 text-danger fs-10">
                  Note:{" "}
                  <span className="text-warning">
                    Mobile Number should be same as whatsapp number
                  </span>
                </p>
              </Col>
              {/* <Col xl={"12"} className="mt-4">
                <div>
                  <label htmlFor="basiInput" className="form-label">
                    Email ID
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="basiInput"
                    name="email_id"
                    required
                    onChange={handleEmpChange}
                  />
                </div>
              </Col>
              <Col xl={"12"} className="mt-4">
                <div>
                  <label htmlFor="basiInput" className="form-label">
                    Aadhar Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="basiInput"
                    name="aadhar_number"
                    pattern="^\d{12}$"
                    required
                    onChange={handleEmpChange}
                  />
                </div>
              </Col> */}
              <Col xl={"12"} className="mt-3">
                <label htmlFor="basiInput" className="form-label">
                  Type
                </label>
                <select
                  className="form-select mb-3"
                  aria-label="Default select example"
                  required
                  name="type"
                  onChange={handleType}
                >
                  <option value="" disabled selected>
                    select
                  </option>
                  <option value="3">Managed</option>
                  <option value="4">Grouped</option>
                </select>
              </Col>
              <Col xl={"12"} className="mt-1">
                <div>
                  <label htmlFor="labelInput" className="form-label">
                    City
                  </label>
                  <Select
                    styles={colorStyles}
                    id="sowid"
                    options={city}
                    isSearchable
                    // isMulti
                    // isClearable={data.sow_id}
                    required
                    onChange={handleEmpChange}
                  />
                </div>
              </Col>

              {empDet.type == "4" ? (
                <Col xl={"12"} className="mt-4">
                  <div>
                    <label htmlFor="basiInput" className="form-label">
                      Contact Number
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="basiInput"
                      placeholder="Off-roll"
                      disabled
                    />
                  </div>
                </Col>
              ) : (
                <Col xl={"12"} className="mt-4">
                  <label htmlFor="basiInput" className="form-label">
                    Pay Type
                  </label>
                  <select
                    className="form-select mb-3"
                    aria-label="Default select example"
                    required
                    name="emp_type"
                    onChange={handleEmpChange}
                  >
                    <option value="" disabled selected>
                      select
                    </option>
                    <option value="on_roll">On-roll</option>
                    <option value="off_roll">Off-roll</option>
                  </select>
                </Col>
              )}
            </Row>
          </ModalBody>
          <ModalFooter>
            <button
              type="submit"
              className="btn btn-success waves-effect waves-light d-flex align-items-center gap-2"
            >
              <i className="ri ri-checkbox-circle-line fs-18"></i>
              Submit
            </button>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  );
};

export { AddTsmMod };
