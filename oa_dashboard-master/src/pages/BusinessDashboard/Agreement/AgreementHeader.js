import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  TabContent,
  TabPane,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import Agreement from "./Agreement";
//import filtergSVG from "/filter.svg";
//import { useHistory } from 'react-router-dom'; // version 5.2.0
import AddAgreement from "./AddAgreement";
import { Context } from "../../../App";
import { api } from "../../../globalConfig";
import { agreement_list } from "../../../assets/utils/Business";
import axios from "axios";
import { hover } from "@testing-library/user-event/dist/hover";

const AgreementHeader = () => {
  const [agreementData, setAgreementData] = useState([]);

  const [count, setCount] = useState(0);

  const [Atype, setType] = useState("all");
  const [check, setCheck] = useState("all");

  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };
  const getBusinessAgreementData = () => {
    let GetBusinessAgApiLink = api.TASKMO_URL + agreement_list;
    axios
      .get(GetBusinessAgApiLink, { params: { type: Atype } })
      .then((res) => {
        setAgreementData(res?.data?.agreement_list);
        setCount(res?.data?.agreement_list?.length);
      })
      .catch((err) => console.log(err))
      .finally(() => {});
  };
  React.useEffect(() => {
    getBusinessAgreementData();
  }, [Atype, check]);

  return (
    <div className="page-content">
      <Container fluid>
        <Col lg={12}>
          <Card>
            <CardHeader style={{ height: 77 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div className="m-2">
                    <h4 style={{ color: "#121212", opacity: 1 }}>Agreement</h4>
                  </div>
                  <Col xs="8">
                    <Card className="m-0 " style={{ background: "#f0f4ff" }}>
                      <CardBody className="px-2 py-2">
                        <div className="d-flex align-items-center">
                          <div
                            className="avatar-xs flex-shrink-0"
                            style={{ height: "26px" }}
                          >
                            <span
                              className="avatar-title  rounded "
                              style={{ backgroundColor: "#ec5c24" }}
                            >
                              <i
                                className=" ri-shopping-basket-line text-light"
                                style={{ fontSize: "16px" }}
                              ></i>
                            </span>
                          </div>
                          <div className="d-flex gap-5 align-items-center">
                            <div className="flex-grow-1 ps-3">
                              <h5 className="text-muted text-uppercase fs-11 mb-0">
                                Total Agreement
                              </h5>
                            </div>
                            <div
                              style={{ fontSize: "14px", fontWeight: "500" }}
                            >
                              {agreementData?.length}
                            </div>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </div>

                <div
                  className="mb-2"
                  style={{
                    display: "flex",
                    marginRight: "228px",
                    alignItems: "center",
                  }}
                >
                  <button
                    className="btn m-2"
                    style={{
                      backgroundColor: "#ec5c24",
                      color: "whitesmoke",
                      transition: "background-color 0.3s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#dd4319")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#ec5c24")
                    }
                    onClick={toggleModal}
                  >
                    {" "}
                    + Add Agreement{" "}
                  </button>
                  <div>
                    <UncontrolledDropdown className="dropdown d-inline-block">
                      <DropdownToggle
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                        }}
                      >
                        <button
                          className="btn"
                          style={{
                            backgroundColor: "#ec5c24",
                            color: "whitesmoke",
                            transition: "background-color 0.3s ease",
                          }}
                          onMouseEnter={(e) =>
                            (e.target.style.backgroundColor = "#dd4319")
                          }
                          onMouseLeave={(e) =>
                            (e.target.style.backgroundColor = "#ec5c24")
                          }
                        >
                          <i className="ri-filter-3-line align-bottom me-1 fs-14"></i>
                          Filter
                        </button>
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-menu-end">
                        <DropdownItem
                          className="edit-item-btn d-flex align-items-center"
                          onClick={() => setType("all")}
                        >
                          All
                        </DropdownItem>
                        <DropdownItem
                          className="edit-item-btn d-flex align-items-center"
                          onClick={() => setType("active")}
                        >
                          Active
                        </DropdownItem>
                        <DropdownItem
                          className="edit-item-btn d-flex align-items-center"
                          onClick={() => setType("rejected")}
                        >
                          {/* <i className=" ri-delete-back-2-line align-bottom me-2 text-muted"></i> */}
                          Rejected
                        </DropdownItem>
                        <DropdownItem
                          className="edit-item-btn d-flex align-items-center"
                          onClick={() => setType("pending")}
                        >
                          {/* <i className=" ri-delete-back-2-line align-bottom me-2 text-muted"></i> */}
                          Pending
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <Agreement agreementData={agreementData} />
            </CardBody>
          </Card>
        </Col>
        <AddAgreement
          isOpen={modal}
          toggle={toggleModal}
          setModal={setModal}
          setCheck={setCheck}
          check={check}
        />
      </Container>
    </div>
  );
};

export default AgreementHeader;
