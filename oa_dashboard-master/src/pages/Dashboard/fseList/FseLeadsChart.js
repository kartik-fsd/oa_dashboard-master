import React from "react";
// import "../../components/Chart/Bargraph/Bargraph.css";
import Chart from "react-apexcharts";

const FseLeadsChart = ({ data, loading, change }) => {
  var options = {
    series1: [
      {
        name: "Total Lead",
        data: data.total_lead,
      },
      {
        name: "Approved Leads",
        data: data.approved_leads,
      },
      //   { name: "Total Checkin", data: data?.checkin },
    ],
    series2: [
      {
        name: "Total Lead",
        data: data.total_lead,
      },
      {
        name: "Approved Leads",
        data: data.approved_leads,
      },
    ],
    stroke: {
      curve: "smooth",
    },
    colors: ["#595BC7", "#3ABE4E", "#f7cb04"],

    // subtitle: {
    //   text: `Total Earnings Rs 12345345`,
    //   align: "right",
    //   margin: 20,
    //   offsetY: 0,
    //   offsetX: -30,
    //   style: {
    //     fontSize: 16,
    //   },
    // },
    chart: {
      type: "bar",
      stacked: false,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: 10,
        borderRadius: 3,
      },
    },
    xaxis: {
      type: "category",
      categories: data.date,
      labels: {
        style: {
          fontSize: "10",
          colors: "#6B7280",
          fontWeight: 100,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "10px",
          colors: "#6B7280",
          fontWeight: 100,
        },
      },
    },
    legend: {
      position: "top",
      offsetX: 800,
      offsetY: -60,
      fontSize: 14,
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
      pattern: {
        width: 10,
      },
    },
  };
  return (
    <div>
      {loading ? (
        <div className="chart_css11">
          <img
            src={window.location.origin + "/images/gif/search1.gif"}
            alt="gif"
            className="loader_gif"
          />
        </div>
      ) : (
        <div className="chart_css2">
          <Chart
            options={options}
            series={change ? options.series1 : options.series2}
            type="line"
            height={335}
          />
        </div>
      )}
    </div>
  );
};

export default FseLeadsChart;
