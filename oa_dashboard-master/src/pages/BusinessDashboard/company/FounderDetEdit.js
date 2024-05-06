import axios from "axios";
import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import { v4 as uuid } from "uuid";
import { update_company_details } from "../../../assets/utils/Business";
import { api } from "../../../globalConfig";
import { successnotify, warningnotify } from "../../Toasts";

const FounderDetEdit = ({ open, setOpen, data, setCheck, check }) => {
  let [testObj, setTestObj] = React.useState({});
  const [mileStoneData, setMileStoneData] = React.useState([]);

  const { id } = useParams();
  const handleClickAdd = () => {
    let obj = { ...testObj, id: uuid() };
    if (!Object.keys(testObj).includes("month")) {
      Object.month = new Date();
    }
    console.log(obj, "finalobj");

    setMileStoneData([...mileStoneData, obj]);
    testObj.type_value = "";
    setTestObj({});
  };

  const handleSubmit = () => {
    const link = api.ONX_URL + update_company_details;
    const dataEdit = {};
    dataEdit.company_id = id;
    dataEdit.founder_details = JSON.stringify(mileStoneData);

    axios
      .patch(link, dataEdit)
      .then((res) => {
        successnotify("success");
        setCheck(!check);
        setOpen(false);
      })
      .catch((err) => warningnotify("something went wrong...!"));
  };

  React.useEffect(() => {
    const bol = data?.founder_details?.length > 0;
    if (bol) setMileStoneData(data?.founder_details);
  }, [data]);

  console.log(mileStoneData, "miledata");

  console.log(data.founder_details, "data123");

  return (
    <div>
      <Modal
        isOpen={open}
        toggle={() => setOpen(false)}
        centered={true}
        size={"xl"}
      >
        {/* <ModalHeader toggle={() => setOpen(false)}>Founder Details</ModalHeader> */}
        <ModalBody>
          <Row>
            <Col xs="12">
              <div className="d-flex justify-content-between">
                <h5 className="mb-4 " style={{ color: "#b83016" }}>
                  Founder Details
                </h5>
                <div>
                  <button
                    disabled={
                      Object.keys(testObj).includes("founder_name") &&
                      testObj.founder_name !== "" &&
                      Object.keys(testObj).includes("founder_email") &&
                      testObj.founder_email !== "" &&
                      Object.keys(testObj).includes("founder_contact") &&
                      testObj.founder_phone !== "" &&
                      Object.keys(testObj).includes("founder_linkedIn") &&
                      testObj.founder_linkedIn !== ""
                        ? false
                        : true
                    }
                    type="button"
                    className="btn  waves-effect waves-light text-light btn-sm"
                    style={{
                      backgroundColor: "#ec5c24",
                    }}
                    onClick={handleClickAdd}
                  >
                    Add
                  </button>
                </div>
              </div>

              <Row>
                <Col xs="6">
                  <div>
                    <label htmlFor="basiInput" className="form-label">
                      Founder Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="basiInput"
                      // placeholder="0"
                      // value={
                      //   testObj.quantity == undefined ? 0 : testObj.quantity
                      // }
                      onChange={(e) => {
                        setTestObj({
                          ...testObj,
                          founder_name: e.target.value,
                        });
                      }}
                    />
                  </div>
                </Col>
                <Col xs="6">
                  <div>
                    <label htmlFor="basiInput" className="form-label">
                      Founder Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="basiInput"
                      // placeholder="0"
                      // value={
                      //   testObj.quantity == undefined ? 0 : testObj.quantity
                      // }
                      onChange={(e) => {
                        setTestObj({
                          ...testObj,
                          founder_email: e.target.value,
                        });
                      }}
                    />
                  </div>
                </Col>
                <Col xs="6" className="mt-4">
                  <div>
                    <label htmlFor="basiInput" className="form-label">
                      Founder Contact
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="basiInput"
                      // placeholder="0"
                      // value={
                      //   testObj.quantity == undefined ? 0 : testObj.quantity
                      // }
                      onInput={(e) =>
                        (e.target.value = Math.max(
                          0,
                          parseInt(e.target.value).toString().slice(0, 10)
                        ))
                      }
                      onChange={(e) => {
                        setTestObj({
                          ...testObj,
                          founder_contact: e.target.value,
                        });
                      }}
                    />
                  </div>
                </Col>
                <Col xs="6" className="mt-4">
                  <div>
                    <label htmlFor="basiInput" className="form-label">
                      Founder LinkedIn
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="basiInput"
                      // placeholder="0"
                      // value={
                      //   testObj.quantity == undefined ? 0 : testObj.quantity
                      // }
                      onChange={(e) => {
                        setTestObj({
                          ...testObj,
                          founder_linkedIn: e.target.value,
                        });
                      }}
                    />
                  </div>
                </Col>
              </Row>
              <hr className="mt-5"></hr>
            </Col>
            <Col xs="12" className="mt-2">
              <h5 className="mb-4 " style={{ color: "#b83016" }}>
                Founder Details Table
              </h5>
              <div>
                {mileStoneData?.length == 0 ? (
                  <div style={{}}>No TableData Found</div>
                ) : (
                  <table className="table caption-top table-nowrap">
                    <thead className="table-light">
                      <tr>
                        <th scope="col">Founder Name</th>
                        <th scope="col">Founder Email</th>
                        <th scope="col">Founder Contact</th>
                        <th scope="col">Founder Linkedin</th>
                        <th scope="col">Delete</th>
                        {/* <th scope="col">Payment</th> */}
                      </tr>
                    </thead>
                    {/* <tbody>
                  {data.milestones?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.type}</td>
                        <td>{item.type_value}</td>
                        <td>{moment(item.month).format("YYYY-MM-DD")}</td>
                        <td>{item.quantity}</td>
                        <td>delete icon</td>
                      </tr>
                    );
                  })}
                </tbody> */}

                    <tbody>
                      {mileStoneData?.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{item.founder_name}</td>
                            <td>{item.founder_email}</td>
                            <td>{item.founder_contact}</td>
                            <td>{item.founder_linkedIn}</td>
                            <td
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                let ot = mileStoneData.filter(
                                  (it) => it.id !== item.id
                                );
                                setMileStoneData(ot);
                                console.log(item.id, "testing");
                              }}
                            >
                              <i className="ri-delete-bin-fill text-danger fs-20"></i>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>

              <hr
                style={{
                  marginTop: "24px",
                  marginBottom: "24px",
                }}
              ></hr>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            className="btn  waves-effect waves-light text-light"
            style={{ backgroundColor: "#ec5c24" }}
            onClick={() => handleSubmit()}
          >
            Update
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default FounderDetEdit;
