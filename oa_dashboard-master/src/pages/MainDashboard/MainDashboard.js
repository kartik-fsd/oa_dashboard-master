import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { overall_oa_leads } from "../../assets/utils/dashboard";
import {
  hourly_leads_chart_oa,
  overall_fse_enroll,
  overall_leads_chart_oa,
  training_chart,
  training_chart_daily,
} from "../../assets/utils/sow";
import { api } from "../../globalConfig";
import BarChart from "../Charts/MainChart/BarChart";
import DashedLineChart from "../Charts/MainChart/DashedLineChart";
import TopReferrals from "../DashboardAnalytics/TopReferrals";
import UsersByDevice from "../DashboardAnalytics/UsersByDevice";

function MainDashboard() {
  const { id } = useParams();
  const pathName = api.OA_URL + overall_oa_leads + `?type=month`;

  //states
  const [graphData, setGraphData] = React.useState({});
  const [loading3, setLoading3] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      setLoading3(true);
      await axios
        .get(pathName)
        .then((res) => {
          setGraphData({
            type: "5",
            title: "Overall Leads Stats",
            data: res.data?.overall,
            colors: ["#F6B84B", "#09B29C", "#EF6547", "#FF0100"],
          });
          setLoading3(false);
        })
        .catch((err) => console.log(err));
    })();
  }, [id]);
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h1 className="my-3">Dashboard</h1>

          <Row>
            <Col>{!loading3 && <DashedLineChart graphData={graphData} />}</Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default MainDashboard;
