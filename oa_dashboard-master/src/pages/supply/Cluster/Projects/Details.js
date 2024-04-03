import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";

import { withTranslation } from "react-i18next";
import { Link, withRouter } from "react-router-dom";
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  UncontrolledTooltip,
} from "reactstrap";
import classnames from "classnames";
import SowTable from "./SowTable";
import FseTable from "./FseTable";

import { vendor_all_sow } from "../../../../assets/utils/mepApi";
import { api } from "../../../../globalConfig";
import axios from "axios";
import BreadCrumb from "../../../../components/common/BreadCrumb";

const Details = () => {
  const [activeTab, setactiveTab] = useState("1");
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setactiveTab(tab);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <BreadCrumb title={"TSM List"} pageTitle="Project Leads" />
        <Container fluid>
          <Row>
            <Col xxl={12}>
              <h5 className="mb-3">Details</h5>
              <Card>
                <CardBody>
                  {/* <p className="text-muted">A default tabbed interface.</p> */}

                  <Nav tabs className="nav-tabs mb-3">
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({ active: activeTab === "1" })}
                        onClick={() => {
                          toggle("1");
                        }}
                      >
                        SOW
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({ active: activeTab === "2" })}
                        onClick={() => {
                          toggle("2");
                        }}
                      >
                        FSE List
                      </NavLink>
                    </NavItem>
                  </Nav>

                  <TabContent activeTab={activeTab} className="text-muted">
                    <TabPane tabId="1" id="home">
                      <Card>
                        <CardHeader style={{ minHeight: "70px" }}></CardHeader>
                        <CardBody>
                          <SowTable />
                        </CardBody>
                      </Card>
                    </TabPane>

                    <TabPane tabId="2" id="product">
                      <Card>
                        <CardHeader style={{ minHeight: "70px" }}></CardHeader>
                        <CardBody>
                          <FseTable />
                        </CardBody>
                      </Card>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Details;
