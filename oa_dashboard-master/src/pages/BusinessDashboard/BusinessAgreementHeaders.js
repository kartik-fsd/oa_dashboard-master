import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Nav,
  NavItem,
  TabContent,
  TabPane,
  NavLink,
} from "reactstrap";
import classnames from "classnames";
import BusinessAgreementTable from "./BusinessAgreementTable";
const BusinessAgreementHeaders = () => {
  const [customNav, setcustomNav] = useState("1");
  const [update, setUpdate] = useState(false);
  const customNavtoggle = (tab) => {
    if (customNav !== tab) {
      setcustomNav(tab);
    }
  };
  return (
    <div>
      <Container fluid>
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
                <Nav pills>
                  <NavItem>
                    <NavLink
                      style={{ cursor: "pointer" }}
                      className={classnames({ active: customNav === "1" })}
                      onClick={() => {
                        customNavtoggle("1");
                      }}
                    >
                      Pending
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      style={{ cursor: "pointer" }}
                      className={classnames({ active: customNav === "2" })}
                      onClick={() => {
                        customNavtoggle("2");
                      }}
                    >
                      Active
                    </NavLink>
                  </NavItem>
                </Nav>
              </div>
            </CardHeader>
            <CardBody>
              <TabContent activeTab={customNav} className="text-muted">
                <TabPane tabId="1" id="border-navs-home">
                  <BusinessAgreementTable
                    tab={customNav}
                    status={"pending"}
                    update={update}
                    setUpdate={setUpdate}
                  />
                </TabPane>

                <TabPane tabId="2" id="border-navs-profile">
                  <BusinessAgreementTable
                    tab={customNav}
                    status={"active"}
                    update={update}
                    setUpdate={setUpdate}
                  />
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </Col>
      </Container>
    </div>
  );
};

export default BusinessAgreementHeaders;
