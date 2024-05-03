import React, { useState } from "react";

import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Nav,
  NavItem,
  Row,
  TabContent,
  NavLink,
  TabPane,
} from "reactstrap";
import OverDueInvoicesTable from "./OverDueInvoicesTable";
import classnames from "classnames";
import { farming } from "../../../globalConfig";
import { overdueInv } from "../../../assets/utils/farmingBase";
import axios from "axios";

const FinanceOverDueInvoiceTableHeaders = () => {
  const [customNav, setcustomNav] = useState("1");
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [check, setCheck] = React.useState(true);

  console.log(typeof start, end, "check");
  const customNavtoggle = (tab) => {
    if (customNav !== tab) {
      setcustomNav(tab);
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const link = `${farming.farming_URL}${overdueInv}/${start}/${end}`;
        const response = await axios.get(link);
        setTableData(response.data.inv);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [start, end, check]);
  return (
    <>
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
                  <Nav pills className="nav-customs nav-danger ">
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({ active: customNav === "1" })}
                        onClick={() => {
                          customNavtoggle("1");
                          setStart(0);
                          setEnd(0);
                        }}
                      >
                        Collection's today
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({ active: customNav === "2" })}
                        onClick={() => {
                          customNavtoggle("2");
                          setStart(1);
                          setEnd(5);
                        }}
                      >
                        1-5
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({ active: customNav === "3" })}
                        onClick={() => {
                          customNavtoggle("3");
                          setStart(6);
                          setEnd(15);
                        }}
                      >
                        6-15
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({ active: customNav === "4" })}
                        onClick={() => {
                          customNavtoggle("4");
                          setStart(16);
                          setEnd(20);
                        }}
                      >
                        16-20
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({ active: customNav === "5" })}
                        onClick={() => {
                          customNavtoggle("5");
                          setStart(21);
                          setEnd(25);
                        }}
                      >
                        21-25
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({ active: customNav === "6" })}
                        onClick={() => {
                          customNavtoggle("6");
                          setStart(26);
                          setEnd(30);
                        }}
                      >
                        26-30
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({ active: customNav === "7" })}
                        onClick={() => {
                          customNavtoggle("7");
                          setStart(31);
                          setEnd(31);
                        }}
                      >
                        30+
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>
              </CardHeader>
              <CardBody>
                <TabContent activeTab={customNav} className="text-muted">
                  <TabPane tabId="1" id="border-navs-home">
                    <OverDueInvoicesTable
                      tableData={tableData}
                      setCheck={setCheck}
                      check={check}
                    />
                  </TabPane>

                  <TabPane tabId="2" id="border-navs-profile">
                    <OverDueInvoicesTable
                      tableData={tableData}
                      setCheck={setCheck}
                      check={check}
                    />
                  </TabPane>

                  <TabPane tabId="3" id="border-navs-messages">
                    <OverDueInvoicesTable
                      tableData={tableData}
                      setCheck={setCheck}
                      check={check}
                    />
                  </TabPane>

                  <TabPane tabId="4" id="border-navs-settings">
                    <OverDueInvoicesTable
                      tableData={tableData}
                      setCheck={setCheck}
                      check={check}
                    />
                  </TabPane>
                  <TabPane tabId="5" id="border-navs-settings">
                    <OverDueInvoicesTable
                      tableData={tableData}
                      setCheck={setCheck}
                      check={check}
                    />
                  </TabPane>
                  <TabPane tabId="6" id="border-navs-settings">
                    <OverDueInvoicesTable
                      tableData={tableData}
                      setCheck={setCheck}
                      check={check}
                    />
                  </TabPane>
                  <TabPane tabId="7" id="border-navs-settings">
                    <OverDueInvoicesTable
                      tableData={tableData}
                      setCheck={setCheck}
                      check={check}
                    />
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Container>
      </div>
    </>
  );
};

export default FinanceOverDueInvoiceTableHeaders;
