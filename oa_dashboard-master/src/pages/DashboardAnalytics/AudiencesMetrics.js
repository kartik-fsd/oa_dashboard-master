import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
} from "reactstrap";
import CountUp from "react-countup";
import AudiencesCharts from "./AudiencesCharts";
import axios from "axios";
import { training_chart, training_chart_daily } from "../../assets/utils/sow";
import { api } from "../../globalConfig";
import { useParams } from "react-router-dom";
import { APIClient } from "../../assets/config/sessionToken";

const AudiencesMetrics = ({ graphData }) => {
  const { id } = useParams();
  const [isUserDropdown, setUserDropdown] = useState(false);
  const toggleDropdown = () => setUserDropdown(!isUserDropdown);
  const pathName = api.OA_URL + training_chart_daily;

  const handleDropDown = (e) => {
    const sample = new APIClient();

    sample
      .get(pathName, { sow_id: id, filter: e })
      .then((res) => {
        const total = res?.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <Card style={{ height: "95%", display: "grid" }}>
        <CardHeader className="align-items-center d-flex">
          <h4 className="card-title mb-0 flex-grow-1">{graphData?.title}</h4>
          <div className="flex-shrink-0">
            <Dropdown
              className="card-header-dropdown"
              isOpen={isUserDropdown}
              toggle={toggleDropdown}
              direction="start"
            >
              <DropdownToggle
                tag="a"
                className="text-reset dropdown-btn"
                role="button"
              >
                <span className="text-muted fs-16">
                  <i className="mdi mdi-dots-vertical align-middle"></i>
                </span>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end">
                <DropdownItem onClick={() => handleDropDown("today")}>
                  Oerall
                </DropdownItem>
                <DropdownItem onClick={() => handleDropDown("week")}>
                  Monthly
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </CardHeader>
        <CardHeader className="p-0 border-0 bg-soft-light"></CardHeader>
        <CardBody className="p-0 pb-2">
          <div>
            <div
              id="audiences_metrics_charts"
              className="apex-charts"
              dir="ltr"
            >
              {Object.keys(graphData)?.length > 0 ? (
                <AudiencesCharts data={graphData} />
              ) : (
                <></>
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default AudiencesMetrics;
