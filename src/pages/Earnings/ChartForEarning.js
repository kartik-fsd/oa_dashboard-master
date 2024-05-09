import React from "react";
import ReactApexChart from "react-apexcharts";
import { DashedLineEp } from "../Charts/OptionsChart/OptionsChart";

const ChartForEarning = ({ dataInsert }) => {
  console.log(dataInsert, "testingnng");
  return (
    <div>
      <DashedLineEp data={dataInsert} />
    </div>
  );
};

export default ChartForEarning;
