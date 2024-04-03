import React from "react";
import ReactApexChart from "react-apexcharts";

const SalesForecastCharts = (props) => {
  const areachartSalesColors = props.data?.colors;
  const dataEnter = props.data?.data;
  const series = [
    {
      name: "Signed",
      data: [`${dataEnter?.total_users}`],
    },
    {
      name: "Allocated",
      data: [`${dataEnter?.my_users}`],
    },
    {
      name: "Overall Trained",
      data: [`${dataEnter?.total_attend}`],
    },
    {
      name: "My Trained",
      data: [`${dataEnter?.my_attend}`],
    },
  ];

  const series2 = [
    {
      name: "Scheduled",
      data: [`${dataEnter?.total_training}`],
    },
    {
      name: "Enrolled",
      data: [`${dataEnter?.total_enroll}`],
    },
    {
      name: "Completed",
      data: [`${dataEnter?.completed}`],
    },
    {
      name: "Not Attended",
      data: [`${dataEnter?.enroll}`],
    },
    {
      name: "Absent",
      data: [`${dataEnter?.absent}`],
    },
    {
      name: "Rejected",
      data: [`${dataEnter?.rejected}`],
    },
  ];
  var options = {
    chart: {
      type: "bar",
      height: 341,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "65%",
      },
    },
    stroke: {
      show: true,
      width: 5,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [""],
      axisTicks: {
        show: false,
        borderType: "solid",
        color: "#78909C",
        height: 6,
        offsetX: 0,
        offsetY: 0,
      },
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return value;
        },
      },
      tickAmount: 4,
      min: 0,
    },
    fill: {
      opacity: 1,
    },
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
      fontWeight: 500,
      offsetX: 0,
      offsetY: -14,
      itemMargin: {
        horizontal: 8,
        vertical: 0,
      },
      markers: {
        width: 10,
        height: 10,
      },
    },
    colors: areachartSalesColors,
  };
  return (
    <React.Fragment>
      <ReactApexChart
        options={options}
        series={props.data?.type == "5" ? series : series2}
        type="bar"
        height="341"
        className="apex-charts"
      />
    </React.Fragment>
  );
};

export { SalesForecastCharts };
