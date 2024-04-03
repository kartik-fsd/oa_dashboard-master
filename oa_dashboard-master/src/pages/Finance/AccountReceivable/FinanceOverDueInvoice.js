import React, { useState } from "react";

import {
  Card,
  CardBody,
  Col,
  Container,
  Nav,
  NavItem,
  Row,
  TabContent,
  NavLink,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import Issues from "../../Dashboard/issues/Issues";
import FinanceArSummaryTableHeaders from "./FinanceOverDueInvoiceTableHeaders";
import FinanceOverDueInvoiceTableHeaders from "./FinanceOverDueInvoiceTableHeaders";
const FinanceOverDueInvoice = () => {
  // Custom Nav Tabs
  const [customNav, setcustomNav] = useState("1");
  const customNavtoggle = (tab) => {
    if (customNav !== tab) {
      setcustomNav(tab);
    }
  };

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <FinanceOverDueInvoiceTableHeaders />
        </Container>
      </div>
    </>
  );
};

export default FinanceOverDueInvoice;
