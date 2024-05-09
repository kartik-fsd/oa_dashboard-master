import axios from "axios";
import React from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
import { dailycollectable } from "../../../assets/utils/managementapi";
import { farming } from "../../../globalConfig";
import DailyCollectableTable from "./DailyCollectableTable";
import DatePicker from "react-datepicker";
import moment from "moment";
const indianNumbers = (num, len) => {
  return (
    " ₹ " +
    Number(num).toLocaleString("en-IN", {
      maximumFractionDigits: len,
    })
  );
};
const DailyCollectable = () => {
  const [total, setTotal] = React.useState([]);
  const [totalData, setTotalData] = React.useState([]);
  const [colData, setColData] = React.useState([]);
  const [all, setAlldata] = React.useState([]);
  const [startDate, setStartDate] = React.useState(new Date());
  document.title = "OnX | Management";
  const month = moment(startDate).format("/MM/YYYY");
  console.log(total, "month");

  const link = farming.farming_URL + dailycollectable + month;
  console.log(link, "link");
  React.useEffect(() => {
    axios
      .get(link)
      .then((res) => {
        setTotal(res.data.total);
        setTotalData(res.data.result);
        setColData(res.data.monthDays);
        setAlldata(res.data);
      })
      .catch((err) => console.log(err));
  }, [month]);

  const ExampleCustomInput = React.forwardRef(({ value, onClick }, ref) => (
    // <button className="example-custom-input" onClick={onClick} ref={ref}>
    //   {value}
    // </button>
    <input value={value} onClick={onClick} className="example-custom-input" />
  ));

  ExampleCustomInput.displayName = "ExampleCustomInput";

  return (
    <div className="page-content">
      <Card>
        <CardHeader className="mt-2">
          <div className="d-flex justify-content-between">
            <h5
              className="fw-600 fs-16 "
              style={{
                letterSpacing: "2px",
                marginLeft: "15px",
                color: "#b83016",
              }}
            >
              Daily Collections Traker
            </h5>
            <div style={{ marginRight: "228px" }}>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="MM-yyyy"
                showMonthYearPicker
                showFullMonthYearPicker
                showFourColumnMonthYearPicker
                customInput={<ExampleCustomInput />}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <div className="d-flex justify-content-end gap-2">
            <div>
              <span
                className="badge badge-soft-dark d-flex align-items-center justify-content-center px-3  fs-12 text-center"
                style={{ height: "40px", minWidth: "206px" }}
              >
                Target :{indianNumbers(total[0]?.target_current, 0)}
              </span>
            </div>
            <div>
              <span
                className="badge badge-soft-success d-flex align-items-center justify-content-center px-3  fs-12 "
                style={{ height: "40px", minWidth: "206px" }}
              >
                Actual : {indianNumbers(all?.total_actual_collectabe, 0)}
              </span>
            </div>
            <div>
              <span
                className="badge badge-soft-success d-flex align-items-center justify-content-center px-3  fs-12 "
                style={{ height: "40px", minWidth: "206px" }}
              >
                Achived : {indianNumbers(all?.achived_per, 2)} %
              </span>
            </div>
          </div>
          <div className="my-table">
            <DailyCollectableTable
              totalData={totalData}
              total={total}
              colData={colData}
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default DailyCollectable;
