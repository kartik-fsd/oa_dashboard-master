import React from "react";
import { Link } from "react-router-dom";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";

import axios from "axios";
import { api } from "../../globalConfig";
import { inactive_sow_support } from "../../assets/utils/dashboard";
import { toast } from "react-toastify";
import moment from "moment";

function TableSupportAgent(props) {
  const date = new Date();
  let current_date = moment(date).format("DD-MMM-YYYY");

  const [relieveMod, setRelieveMod] = React.useState(false);
  const [id, setID] = React.useState("");

  const toggle = () => setRelieveMod(!relieveMod);

  const handleRelieve = () => {
    const link = api.OA_URL + inactive_sow_support;

    axios
      .get(link, { params: { assign_id: id } })
      .then((res) => {
        console.log(res.data, "inactive");
        toast("Relieved success", {
          position: "top-center",
          hideProgressBar: true,
          closeOnClick: false,
          className: "bg-success text-white",
        });
        setRelieveMod(false);
        props.setRel(true);
        props.setCheck(!props.check);
      })
      .catch((err) => {
        console.log(err);
        toast("something went wrong", {
          position: "top-center",
          hideProgressBar: true,
          closeOnClick: false,
          className: "bg-warning text-white",
        });
      });
  };
  return (
    <React.Fragment>
      <div className="table-responsive">
        <table className="table table-bordered table-nowrap align-middle mb-0">
          <thead>
            <tr>
              <th scope="col" style={{ width: "10%" }}>
                ID
              </th>
              <th scope="col" style={{ width: "70%" }}>
                Details
              </th>
              {/* <th scope="col" style={{ width: "20%" }}>
                
              </th> */}
              <th scope="col" style={{ width: "20%" }}>
                Assigned Date
              </th>
              <th scope="col" style={{ width: "20%" }}>
                Relieve
              </th>

              {/* <th scope="col" style={{ width: "20%" }}>
                Cost
              </th> */}
            </tr>
          </thead>

          <tbody>
            {(props.oaList || []).map((item, key) => (
              <tr key={key}>
                <td>{item.oa_id}</td>
                <td className="p-2">
                  <Row>
                    <Col md={2} className="d-flex align-items-center">
                      <div className="avatar-group-item">
                        <div className="avatar-xs">
                          {item?.profile_image.length > 0 ? (
                            <img
                              src={item.profile_image}
                              alt="profile"
                              className="fs-10"
                              style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                              }}
                            />
                          ) : (
                            <span
                              className={
                                "avatar-title rounded-circle text-white " +
                                item.bgcolor
                              }
                            >
                              {item?.full_name.charAt(0).toUpperCase()}
                            </span>
                          )}
                        </div>
                      </div>
                    </Col>
                    <Col md={7}>
                      <div
                        style={{ marginLeft: "10px" }}
                        className="text-body fw-medium text-capitalize d-flex gap-2"
                      >
                        {item.full_name}{" "}
                        {/* <span className="text-muted fs-10">
                          {" "}
                          ({item.oa_id}){" "}
                        </span> */}
                      </div>
                      <div
                        style={{ marginLeft: "10px" }}
                        className="text-body fw-medium fs-12 text-muted text-capitalize"
                      >
                        {/* {item.mobile_number} */}
                        {item.role == "support_1"
                          ? "SA-1"
                          : item.role == "support_2"
                          ? "SA-2"
                          : item.role == "support_3"
                          ? "SA-3"
                          : item.role}
                      </div>
                    </Col>
                    <Col md={3} className="m-auto">
                      <h4 className="m-0 ">
                        <span className="badge badge-soft-success text-center w-100">
                          <i className="bx bx bx-rupee"></i>
                          {item.status == "active"
                            ? moment(date).diff(item.assigned_date, "days") *
                              item.amount
                            : moment(item.updated_on).diff(
                                item.assigned_date,
                                "days"
                              ) * item.amount}
                        </span>
                      </h4>
                    </Col>
                  </Row>
                </td>
                <td>{item.assigned_date}</td>

                <td className="text-center">
                  {item.status == "active" ? (
                    <i
                      className=" ri-delete-bin-line fs-20 cursor-pointer text-danger"
                      onClick={() => {
                        setRelieveMod(!relieveMod);
                        setID(item.st_id);
                      }}
                    ></i>
                  ) : (
                    <p className="m-0">{item.updated_on}</p>
                  )}
                </td>
                {/* <td>780/day</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        id="signupModals"
        tabIndex="-1"
        isOpen={relieveMod}
        size="sm"
        toggle={() => {
          setRelieveMod(false);
        }}
        centered={true}
      >
        <ModalBody>
          <Row>
            <Col xs={"12"}>
              <p
                style={{
                  // textAlign: "center",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                Are you sure ?
              </p>
            </Col>
            <Col className="d-flex justify-content-end gap-2">
              <button
                type="button"
                className="btn waves-effect waves-light"
                style={{ backgroundColor: "#ec5c24" }}
                onClick={handleRelieve}
              >
                Yes
              </button>
              <button
                type="button"
                className="btn waves-effect waves-light"
                style={{ backgroundColor: "#ec5c24" }}
                onClick={() => setRelieveMod(false)}
              >
                No
              </button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}

export default TableSupportAgent;
