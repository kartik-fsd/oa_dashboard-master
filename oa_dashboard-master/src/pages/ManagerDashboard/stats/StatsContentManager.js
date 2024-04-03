import React, { useEffect } from "react";
import { Card, Col, Row } from "reactstrap";
import TopReferrals from "../../DashboardAnalytics/TopReferrals";
import { withTranslation } from "react-i18next";
import { Link, useParams, withRouter } from "react-router-dom";
import { api } from "../../../globalConfig";
import {
  earnings_fse_chart,
  get_sow_target,
  hourly_leads_chart_oa,
  oa_leads_stats,
  overall_fse_enroll,
  overall_leads_chart_oa,
  training_chart,
  training_chart_daily,
} from "../../../assets/utils/sow";
import axios from "axios";
import DashedLineChart from "../../Charts/MainChart/DashedLineChart";
import BarChart from "../../Charts/MainChart/BarChart";
import ManagerTotalLeads from "./ManagerTotalLeads";
import PayoutsChart from "../../Dashboard/ProjectPayout/PayoutsChart";
import AudiencesMetricsChartManager from "./AudienceMetricChartManager";
import Widgets from "../../Dashboard/widget/widgets";
import moment from "moment";

function StatsContent({ monthData }) {
  const { id } = useParams();
  const params = id;

  const hourlyName = api.OA_URL + hourly_leads_chart_oa + `?sow_id=${params}`;
  const overallName =
    api.OA_URL +
    overall_leads_chart_oa +
    `?sow_id=${params}&type=current&month=0&year=0`;
  const leadspath = api.OA_URL + oa_leads_stats;
  const linkURL = api.VENDOR_URL + get_sow_target + `?sow_id=${params}`;
  const trainingDailyUrl =
    api.OA_URL +
    training_chart_daily +
    `?sow_id=${params}&type=month&month=0&year=0`;
  const overallNameOA =
    api.OA_URL + overall_leads_chart_oa + `?sow_id=${params}`;

  const current_date = new Date();
  const current_month = moment(current_date).format("MM");
  const current_year = moment(current_date).format("YYYY");
  const earningUrl =
    api.OA_URL +
    earnings_fse_chart +
    `?sow_id=${id}&type=month&month=${current_month}&year=${current_year}`;

  //states
  const [graphData2, setGraphData2] = React.useState({});
  const [graphData3, setGraphData3] = React.useState({});
  const [graphData4, setGraphData4] = React.useState({});
  const [graphData5, setGraphData5] = React.useState({});
  const [loadingTwo, setLoadingTwo] = React.useState(false);
  const [loading3, setLoading3] = React.useState(false);
  const [loading4, setLoading4] = React.useState(false);

  const [leadsstats, setLeadsstats] = React.useState({});
  const [cardMap, setCardMap] = React.useState([]);
  const [targetdata, setTargetData] = React.useState({});
  const [loadingtarget, setLoadingTarget] = React.useState(false);
  const [loadingtraining, setLoadingTraining] = React.useState(false);
  const [earningStats, setEarningStats] = React.useState({});

  useEffect(() => {
    (async () => {
      setLoadingTwo(true);
      setLoading3(true);
      setLoading4(true);
      setLoadingTarget(true);
      setLoadingTraining(true);

      await axios
        .get(hourlyName)
        .then((res) => {
          setGraphData3({
            type: "3",
            title: "Today's Stats",
            data: res.data,
            colors: ["#683395", "#09B29C", "#EF6547", "#FF0100"],
          });
          setLoading3(false);
        })
        .catch((err) => console.log(err));
      await axios
        .get(overallName)
        .then((res) => {
          setGraphData4({
            type: "5",
            title: "Overall Stats",
            data: res.data?.overall,
            colors: ["#683395", "#09B29C", "#F6B84B", "#FF0100", "#a5adff"],
            access: "manager",
          });
          setLoading4(false);
        })
        .catch((err) => console.log(err));
      await axios
        .get(leadspath, { params: { sow_id: id } })
        .then((res) => {
          setLeadsstats(res.data);
          const arr = [];
          const obj = res.data;

          arr.push({
            icon: "ri ri-thumb-up-line",
            iconClass: "success",
            label: "Total Leads",
            labelClass: "muted",
            counter: obj.total_leads,
            decimals: 0,
            separator: ",",
            suffix: "",
            prefix: "",
          });
          arr.push({
            icon: "mdi mdi-briefcase-check-outline",
            iconClass: "primary",
            label: "Approved Leads",
            labelClass: "muted",
            counter: obj.approved_leads,
            decimals: 0,
            separator: ",",
            suffix: "",
            prefix: "",
          });
          arr.push({
            icon: "mdi mdi-briefcase-clock-outline pending-icon",
            iconClass: "warning",
            label: "Pending Leads",
            labelClass: "muted",
            counter: obj.pending_leads,
            decimals: 0,
            separator: ",",
            suffix: "",
            prefix: "",
          });

          setCardMap([...arr]);
        })
        .catch((err) => console.log(err));
      await axios
        .get(linkURL)
        .then((res) => {
          setTargetData({
            type: "6",
            title: "TDEC Score Board",
            data: res?.data,
            colors: ["#683395", "#09B29C", "#EF6547", "#FF0100"],
            access: "manager",
          });

          setLoadingTarget(false);
        })
        .catch((err) => console.log(err, "err"));

      await axios
        .get(trainingDailyUrl)
        .then((res) => {
          setGraphData2({
            type: "2",
            title: "Training Stats",
            data: res.data?.data,
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
      await axios
        .get(earningUrl)
        .then((res) => {
          console.log(res.data, "axios");
          setEarningStats(res.data);
          setLoadingTraining(false);
        })
        .catch((err) => console.log(err));
    })();
  }, [id]);

  return (
    <React.Fragment>
      {/* <Row>
        <PayoutsChart cardMap={cardMap} leadsstats={leadsstats} />
      </Row> */}

      {/* <Row>
        <Widgets
          milestone={targetdata}
          leads={graphData4}
          training={graphData2}
          earnings={earningStats}
        />
      </Row> */}
      <Row>
        <Col md={5}>
          {!loading3 ? (
            <DashedLineChart graphData={graphData3} />
          ) : (
            <Card
              md={4}
              className="shine"
              style={{ width: "100%", height: "430px" }}
            ></Card>
          )}
        </Col>
        <Col md={7}>
          {!loadingtarget ? (
            <>
              <AudiencesMetricsChartManager graphData={targetdata} />
            </>
          ) : (
            <Card
              md={4}
              className="shine"
              style={{ width: "100%", height: "430px" }}
            ></Card>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          {!loading4 ? (
            <DashedLineChart graphData={graphData4} monthData={monthData} />
          ) : (
            <Card
              md={4}
              className="shine"
              style={{ width: "100%", height: "430px" }}
            ></Card>
          )}
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={4}>
          <ManagerTotalLeads monthData={monthData} />
        </Col>

        <Col xs={12} md={4}>
          {!loadingTwo ? (
            <BarChart graphData={graphData2} monthData={monthData} />
          ) : (
            <Card
              md={4}
              className="shine"
              style={{ width: "100%", height: "400px" }}
            ></Card>
          )}
        </Col>
        <Col xs={12} md={4}>
          {!loadingtraining ? (
            <TopReferrals graphData={earningStats} monthData={monthData} />
          ) : (
            <Card
              md={4}
              className="shine"
              style={{ width: "100%", height: "400px" }}
            ></Card>
          )}
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default withRouter(withTranslation()(StatsContent));
