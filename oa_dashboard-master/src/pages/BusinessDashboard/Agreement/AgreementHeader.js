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
                  <div className="m-2">
                    {" "}
                    <span
                      className="badge  bg-gradient"
                      style={{
                        backgroundColor: "#F0F4FF",
                        color: "#747788",
                        padding: 8,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src="/bag.svg"
                        style={{ height: 25, margin: "0 15px" }}
                      />{" "}
                      TOTAL AGREEMENT
                      <span
                        style={{
                          color: "#393F45",
                          fontSize: 25,
                          margin: "0 15px",
                        }}
                      >
                        {"  "}
                        {agreementData.length}
                      </span>
                    </span>
                  </div>
                </div>

                <div
                  className="mb-2"
                  style={{ display: "flex", marginRight: "228px" }}
                >
                  <button className="btn btn-primary m-2" onClick={toggleModal}>
                    {" "}
                    + Add Agreement{" "}
                  </button>
                  <div>
                    <UncontrolledDropdown className="dropdown d-inline-block">
                      <DropdownToggle
                        style={{ background: "#fff", border: "none" }}
                      >
                        <button className="btn btn-primary">
                          <i className=" ri-filter-3-line align-bottom me-1  fs-14"></i>
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
