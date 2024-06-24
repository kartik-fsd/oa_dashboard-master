import React, { useEffect } from "react";
import { Col, Row } from "reactstrap";
// import AudiencesMetrics from "../../DashboardAnalytics/AudiencesMetrics";
// import TopReferrals from "../../DashboardAnalytics/TopReferrals";
// import UsersByDevice from "../../DashboardAnalytics/UsersByDevice";
import { withTranslation } from "react-i18next";
import { Link, useParams, withRouter } from "react-router-dom";

import axios from "axios";
// import DashedLineChart from "../../Charts/MainChart/DashedLineChart";
// import BarChart from "../../Charts/MainChart/BarChart";
import UsersByDevice from "../DashboardAnalytics/UsersByDevice";
import TopReferrals from "../DashboardAnalytics/TopReferrals";
import {
  hourly_leads_chart_oa,
  overall_fse_enroll,
  overall_leads_chart_oa,
  training_chart,
  training_chart_daily,
} from "../../assets/utils/sow";
import DashedLineChart from "../Charts/MainChart/DashedLineChart";
import BarChart from "../Charts/MainChart/BarChart";
import { api } from "../../globalConfig";

function TaskerChart({ token }) {
  const { id } = useParams();
  const params = id;
  const pathName = api.OA_URL + training_chart + `?sow_id=${id}`;
  const trainingDailyUrl = api.OA_URL + training_chart_daily + `?sow_id=${id}`;
  const hourlyName = api.OA_URL + hourly_leads_chart_oa + `?sow_id=${id}`;
  const overallName = api.OA_URL + overall_leads_chart_oa + `?sow_id=${id}`;
  const overallEnroll = api.OA_URL + overall_fse_enroll + `?sow_id=${id}`;

  //states
  const [graphData, setGraphData] = React.useState({});
  const [graphData2, setGraphData2] = React.useState({});
  const [graphData3, setGraphData3] = React.useState({});
  const [graphData4, setGraphData4] = React.useState({});
  const [graphData5, setGraphData5] = React.useState({});
  const [loadingone, setLoadingone] = React.useState(false);
  const [loadingTwo, setLoadingTwo] = React.useState(false);
  const [loading3, setLoading3] = React.useState(false);
  const [loading4, setLoading4] = React.useState(false);
  const [loading5, setLoading5] = React.useState(false);

  useEffect(() => {
    const config = {
      headers: { "x-access-token": ` ${token}` },
    };

    //    const headers =  {
    //         'Content-type': 'application/json',
    //         'Authorization': `Bearer ${token}`, // notice the Bearer before your token
    //     },
    (async () => {
      setLoadingone(true);
      setLoadingTwo(true);
      setLoading3(true);
      setLoading4(true);
      setLoading5(true);

      await fetch(pathName, config)
        .then((res) => res.json())
        .then((res) => {
          setGraphData({
            type: "1",
            title: "Training stats",
            data: res.data?.data,
            colors: ["#F6B84B", "#09B29C", "#EF6547", "#FF0100"],
          });
          setLoadingone(false);
        })
        .catch((err) => console.log(err));
      await fetch(trainingDailyUrl, config)
        .then((res) => res.json())
        .then((res) => {
          setGraphData2({
            type: "2",
            title: "Training stats overall",
            data: res.data,
            colors: [
              "#683395",
              "#3F5189",
              "#09B29C",
              "#F6B84B",
              "#FF0100",
              "#EF6547",
            ],
          });
          setLoadingTwo(false);
        })
        .catch((err) => console.log(err));
      await fetch(hourlyName, config)
        .then((res) => res.json())
        .then((res) => {
          setGraphData3({
            type: "3",
            title: "Todays leads",
            data: res.data,
            colors: ["#683395", "#09B29C", "#EF6547", "#FF0100"],
          });
          setLoading3(false);
        })
        .catch((err) => console.log(err));
      await fetch(overallName, config)
        .then((res) => res.json())
        .then((res) => {
          setGraphData4({
            type: "4",
            title: "Overall leads stats",
            data: res,
            colors: ["#683395", "#09B29C", "#EF6547", "#FF0100"],
          });
          setLoading4(false);
        })
        .catch((err) => console.log(err));
      await fetch(overallEnroll, config)
        .then((res) => res.json())
        .then((res) => {
          setGraphData5({
            type: "5",
            title: "Overall Network stats",
            data: res,
            colors: [
              "#683395",
              "#3F5189",
              "#09B29C",
              "#F6B84B",
              "#FF0100",
              "#EF6547",
            ],
          });
          setLoading5(false);
        })
        .catch((err) => console.log(err));
    })();
  }, [id]);

  return (
    <React.Fragment>
      <Row>
        <Col md={8}>
          {!loading3 && <DashedLineChart graphData={graphData3} />}
        </Col>

        <Col md={4}>{!loading5 && <BarChart graphData={graphData5} />}</Col>
      </Row>
      <Row>
        <Col>{!loading4 && <DashedLineChart graphData={graphData4} />}</Col>
      </Row>
      <Row>
        <Col xs={12} md={4}>
          <UsersByDevice />
        </Col>
        <Col xs={12} md={4}>
          {!loadingone && <BarChart graphData={graphData2} />}
        </Col>

        {/* <Col>{!loadingTwo && <AudiencesMetrics graphData={graphData2} />}</Col> */}
        <Col xs={12} md={4}>
          <TopReferrals />
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default withRouter(withTranslation()(TaskerChart));
