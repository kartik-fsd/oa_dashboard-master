import React from "react";
import ReactApexChart from "react-apexcharts";

const AudiencesCharts = (props) => {
  const chartAudienceColumnChartsColors = props.data?.colors;
  const series = [
    {
      name: "Enroll",
      data: props?.data?.data?.enroll,
    },
    {
      name: "Completed",
      data: props?.data?.data?.completed,
    },
    {
      name: "Absent",
      data: props?.data?.data?.absent,
    },
    {
      name: "Rejected",
      data: props?.data?.data?.rejected,
    },
  ];
  var options = {
    chart: {
      type: "bar",
      height: 309,
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "20%",
        borderRadius: 6,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
      fontWeight: 400,
      fontSize: "8px",
      offsetX: 0,
      offsetY: 0,
      markers: {
        width: 9,
        height: 9,
        radius: 4,
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    grid: {
      show: false,
    },
    colors: chartAudienceColumnChartsColors,
    xaxis: {
      categories: props?.data?.data?.date,
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: true,
        strokeDashArray: 1,
        height: 1,
        width: "100%",
        offsetX: 0,
        offsetY: 0,
      },
    },
    yaxis: {
      show: false,
    },
    fill: {
      opacity: 1,
    },
  };

  const series2 = [
    {
      name: "Training",
      data: Object.values(props?.data?.data),
    },
  ];
  var options2 = {
    chart: {
      type: "bar",
      height: 309,
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "20%",
        borderRadius: 6,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
      fontWeight: 400,
      fontSize: "8px",
      offsetX: 0,
      offsetY: 0,
      markers: {
        width: 9,
        height: 9,
        radius: 4,
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    grid: {
      show: false,
    },
    colors: ["#683395"],
    xaxis: {
      categories: [
        "Total enroll",
        "Not attended",
        "Absent",
        "Completed",
        "Rejected",
        "Total Training",
      ],
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: true,
        strokeDashArray: 1,
        height: 1,
        width: "100%",
        offsetX: 0,
        offsetY: 0,
      },
    },
    yaxis: {
      show: false,
    },
    fill: {
      opacity: 1,
    },
  };
  return (
    <React.Fragment>
      <ReactApexChart
        options={props?.data?.type == "1" ? options : options2}
        series={props?.data?.type == "1" ? series : series2}
        type="bar"
        height="309"
        className="apex-charts"
      />
    </React.Fragment>
  );
};

export default AudiencesCharts;
