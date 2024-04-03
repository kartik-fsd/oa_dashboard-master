import axios from "axios";
import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import avatar from "../../../assets/images/users/avatar-1.jpg";
import { update_company_details } from "../../../assets/utils/Business";
import { api } from "../../../globalConfig";
import { successnotify, warningnotify } from "../../Toasts";

const CompanyAddressEdit = ({ open, setOpen, data, check, setCheck }) => {
  const [dataEdit, setDataEdit] = useState({});
  const { id } = useParams();

  const inputRef = useRef();

  console.log(dataEdit, "compedt");

  const handleSubmit = () => {
    const link = api.TASKMO_URL + update_company_details;
    dataEdit.company_id = id;

    axios
      .patch(link, dataEdit)
      .then((res) => {
        successnotify("success");
        setCheck(!check);
        setOpen(false);
      })
      .catch((err) => warningnotify("something went wrong...!"));
  };
  return (
    <div>
      <Modal
        isOpen={open}
        toggle={() => setOpen(false)}
        centered={true}
        size={"xl"}
      >
        <ModalHeader toggle={() => setOpen(false)}>Company Address</ModalHeader>
        <ModalBody>
          <div
            style={
              {
                //   padding: "21px",
                //   paddingBottom: "32px",
                //   border: "1px solid #e3c8fc",
                //   marginTop: "24px",
              }
            }
          >
            {/* <h5 className="mb-3">Company Address</h5> */}
            <Row>
              <Col xs="6" className="mb-4">
                <div>
                  <label htmlFor="code" className="form-label">
                    Pincode
                  </label>
                  <input
                    type="text"
                    defaultValue={data.company_pin}
                    className="form-control"
                    id="code"
                    placeholder=""
                    onChange={(e) =>
                      setDataEdit({ ...dataEdit, company_pin: e.target.value })
                    }
                  />
                </div>
              </Col>

              <Col xs="6" className="mb-4">
                <div>
                  <label htmlFor="state" className="form-label">
                    State
                  </label>
                  <input
                    type="text"
                    defaultValue={data.company_state}
                    className="form-control"
                    id="code"
                    placeholder=""
                    onChange={(e) =>
                      setDataEdit({
                        ...dataEdit,
                        company_state: e.target.value,
                      })
                    }
                  />

                  {/* <div className="input-group">
                    <select className="form-select" id="state">
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div> */}
                </div>
              </Col>
              <Col xs="6" className="mb-4">
                <div>
                  <label htmlFor="addrs" className="form-label">
                    Company Address
                  </label>
                  {/* <input
                    type="text"
                    className="form-control"
                    id="addrs"
                    placeholder=""
                    style={{ height: "128px" }}
                  /> */}
                  <textarea
                    defaultValue={data.company_address}
                    style={{ width: "100%", height: "128px" }}
                    onChange={(e) =>
                      setDataEdit({
                        ...dataEdit,
                        company_address: e.target.value,
                      })
                    }
                  />
                </div>
              </Col>
              <Col xs="6" className="mb-4">
                <Row>
                  <Col xs="12" className="mb-4">
                    <div>
                      <label htmlFor="city" className="form-label">
                        City
                      </label>
                      <input
                        type="text"
                        defaultValue={data.company_city}
                        className="form-control"
                        id="city"
                        placeholder=""
                        onChange={(e) =>
                          setDataEdit({
                            ...dataEdit,
                            company_city: e.target.value,
                          })
                        }
                      />
                    </div>
                  </Col>

                  <Col xs="12">
                    <div>
                      <label htmlFor="cont" className="form-label">
                        Country
                      </label>

                      <input
                        type="text"
                        value="India"
                        readOnly
                        className="form-control"
                        id="city"
                        placeholder=""
                      />
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
            <div className="d-flex justify-content-end gap-2 ">
              {/* <button type="button" className="btn btn-outline-primary ">
                    Reset
                  </button> */}
              {/* <button
                type="button"
                className="btn btn-outline-primary btn-label waves-effect waves-light w-xs px-2"
                style={{ marginLeft: "10px" }}
              >
                <i className="bx bx-reset align-middle fs-14 me-1"></i>
                Reset
              </button> */}
              <button
                type="button"
                disabled={Object.values(dataEdit).includes("") ? true : false}
                className="btn btn-primary btn-label waves-effect waves-light w-xs px-2"
                style={{ marginLeft: "10px" }}
                onClick={() => handleSubmit()}
              >
                {/* <i className="bx bx-save align-middle me-1  fs-14 "></i> */}
                Update
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default CompanyAddressEdit;
