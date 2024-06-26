import React from "react";
import ReactApexChart from "react-apexcharts";

const UsersByDeviceCharts = ({ data: { label, value } }) => {
  const dountchartUserDeviceColors = ["#F6B84B", "#09B29C", "#EF6547"];
  const series = value;
  const options = {
    labels: ["Pending", "Approved", "Reject"],
    chart: {
      type: "donut",
      height: 219,
    },
    plotOptions: {
      pie: {
        size: 100,
        donut: {
          size: "76%",
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
      position: "bottom",
      horizontalAlign: "center",
      offsetX: 0,
      offsetY: 0,
      markers: {
        width: 20,
        height: 6,
        radius: 2,
      },
      itemMargin: {
        horizontal: 12,
        vertical: 0,
      },
    },
    stroke: {
      width: 0,
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return value + " Leads";
        },
      },
      tickAmount: 4,
      min: 0,
    },
    colors: dountchartUserDeviceColors,
  };
  return (
    <React.Fragment>
      <ReactApexChart
        options={options}
        series={series}
        type="donut"
        height="219"
        className="apex-charts"
      />
    </React.Fragment>
  );
};

export default UsersByDeviceCharts;
