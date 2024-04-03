import axios from "axios";
import React from "react";
import ReactApexChart from "react-apexcharts";
import { Link, useParams } from "react-router-dom";
import { Card, CardBody, CardHeader, Progress, Table } from "reactstrap";
import { get_sow_target } from "../../../assets/utils/sow";
import { api } from "../../../globalConfig";

const AudiencesMetricsChartManager = ({ graphData }) => {
  const [dataInsert, setDataInsert] = React.useState(graphData);
  const data = dataInsert?.data?.targets;

  const chartAudienceColumnChartsColors = ["#0ab39c", "#e9ebec"];
  // const series = [
  //   {
  //     name: "Achieved",
  //     data: data?.manager_achieved,
  //   },
  //   {
  //     name: "Target",
  //     data: data?.manager_target,
  //   },
  // ];
  // var options = {
  //   chart: {
  //     type: "bar",
  //     height: 309,
  //     stacked: true,
  //     toolbar: {
  //       show: false,
  //     },
  //   },
  //   plotOptions: {
  //     bar: {
  //       horizontal: false,
  //       columnWidth: "20%",
  //       borderRadius: 6,
  //     },
  //   },
  //   dataLabels: {
  //     enabled: false,
  //   },
  //   legend: {
  //     show: true,
  //     position: "bottom",
  //     horizontalAlign: "center",
  //     fontWeight: 400,
  //     fontSize: "8px",
  //     offsetX: 0,
  //     offsetY: 0,
  //     markers: {
  //       width: 9,
  //       height: 9,
  //       radius: 4,
  //     },
  //   },
  //   stroke: {
  //     show: true,
  //     width: 0,
  //     colors: ["transparent"],
  //   },
  //   grid: {
  //     show: false,
  //   },
  //   colors: chartAudienceColumnChartsColors,
  //   xaxis: {
  //     categories: data?.month,
  //     axisTicks: {
  //       show: false,
  //     },
  //     axisBorder: {
  //       show: true,
  //       strokeDashArray: 1,
  //       height: 1,
  //       width: "100%",
  //       offsetX: 0,
  //       offsetY: 0,
  //     },
  //   },
  //   yaxis: {
  //     show: false,
  //   },
  //   fill: {
  //     opacity: 1,
  //   },
  // };

  console.log(data, "dataInsert");
  return (
    <React.Fragment>
      {/* <ReactApexChart
                options={options}
                series={series}
                type="bar"
                height="309"
                className="apex-charts"
            /> */}
      <Card style={{ height: "95%" }}>
        <CardHeader className="d-flex justify-content-between">
          <h4 className="card-title mb-0">{dataInsert?.title}</h4>
        </CardHeader>
        <CardBody style={{ height: "400px", overflow: "auto" }}>
          {/* {Object.keys(dataInsert).length > 0 ? (
            <ReactApexChart
              options={options}
              series={series}
              type="bar"
              height="309"
              className="apex-charts"
            />
          ) : (
            <></>
          )} */}
          <Card className="bg-light overflow-hidden shadow-none">
            <CardBody>
              <div className="d-flex">
                <div className="flex-grow-1">
                  <h6 className="mb-0 text-capitalize d-flex gap-2">
                    <b className="text-secondary">
                      {dataInsert?.data?.overallAchieved}%
                    </b>{" "}
                    overall performance
                  </h6>
                </div>
                {/* <div className="flex-shrink-0">
                  <h6 className="mb-0">1 min left</h6>
                </div> */}
              </div>
            </CardBody>
            <div>
              <Progress
                value={dataInsert?.data?.overallAchieved}
                color="info"
                className="bg-soft-info rounded-0"
              />
            </div>
          </Card>
          <Table
            className="table-bordered align-middle table-nowrap mb-0 overflow-auto"
            style={{ height: "200px" }}
          >
            <thead>
              <tr>
                <th scope="col fs-5">Month</th>
                <th scope="col fs-5">Training</th>
                <th scope="col fs-5">Direct</th>
                <th scope="col fs-5">Earning</th>
                <th scope="col fs-5">Count</th>
                <th scope="col fs-5">Achieved</th>
              </tr>
            </thead>
            <tbody>
              {(data || []).map((item) => (
                <>
                  <tr>
                    <td className="fw-medium">{item.target_month}</td>
                    <td>
                      {item.training_slot}
                      <span
                        className={
                          item.training_percentage < 50
                            ? "badge badge-soft-danger mb-0"
                            : item.training_percentage < 80
                            ? "badge badge-soft-warning mb-0"
                            : "badge badge-soft-success mb-0"
                        }
                        style={{
                          width: "40px",
                          float: "right",
                        }}
                      >
                        {item.training_percentage}%
                      </span>
                    </td>

                    <td>
                      {item.tasker_ratio}
                      <span
                        className={
                          item.direct_percentage < 50
                            ? "badge badge-soft-danger mb-0"
                            : item.direct_percentage < 80
                            ? "badge badge-soft-warning mb-0"
                            : "badge badge-soft-success mb-0"
                        }
                        style={{
                          width: "40px",
                          float: "right",
                        }}
                      >
                        {item.direct_percentage}%
                      </span>
                    </td>
                    <td>
                      {item.es_stats}
                      <span
                        className={
                          item.earning_percentage < 50
                            ? "badge badge-soft-danger mb-0"
                            : item.earning_percentage < 80
                            ? "badge badge-soft-warning mb-0"
                            : "badge badge-soft-success mb-0"
                        }
                        style={{
                          width: "40px",
                          float: "right",
                        }}
                      >
                        {item.earning_percentage}%
                      </span>
                    </td>
                    <td>
                      {item.manager_target}
                      <span
                        className={
                          item.count_percentage < 50
                            ? "badge badge-soft-danger mb-0"
                            : item.count_percentage < 80
                            ? "badge badge-soft-warning mb-0"
                            : "badge badge-soft-success mb-0"
                        }
                        style={{
                          width: "40px",
                          float: "right",
                        }}
                      >
                        {item.count_percentage}%
                      </span>
                    </td>
                    <td className="text-center">
                      {" "}
                      <span
                        style={{
                          padding: "4px 10px",

                          borderRadius: "5px",
                          background: "black",
                          color: "#fff",
                        }}
                      >
                        {item.achived}%
                      </span>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default AudiencesMetricsChartManager;
