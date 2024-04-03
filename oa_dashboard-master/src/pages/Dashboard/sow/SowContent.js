import React, { useEffect } from "react";
import { Col, Row } from "reactstrap";
import AudiencesMetrics from "../../DashboardAnalytics/AudiencesMetrics";
import TopReferrals from "../../DashboardAnalytics/TopReferrals";
import UsersByDevice from "../../DashboardAnalytics/UsersByDevice";
import ItemDetails from "../../NFTMarketDetails/Itemdetails/Index";
import { withTranslation } from "react-i18next";
import { Link, withRouter } from "react-router-dom";

function SowContent() {
  return (
    <React.Fragment>
      <Row>
        <ItemDetails />
      </Row>
      {/* <Row>
        <AudiencesMetrics />
      </Row>
      <Row>
        <Col>
          <UsersByDevice />
        </Col>
        <Col>
          <TopReferrals />
        </Col>
      </Row> */}
    </React.Fragment>
  );
}

export default withRouter(withTranslation()(SowContent));
