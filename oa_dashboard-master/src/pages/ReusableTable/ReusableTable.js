import React from "react";
import { Card, CardBody, CardHeader, Col, Container } from "reactstrap";
import ReusableTableMain from "./ReusableTableMain";
import Flatpickr from "react-flatpickr";
import moment from "moment";
const ReusableTable = ({
  heading = "Default",
  searchMain = true,
  columns = [],
  data = [],
}) => {
  const startdateGetter = () => {
    const date = new Date();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${year}-${month}-1`;
  };

  const enddateGetter = () => {
    const date = new Date();
    date.setMonth(date.getMonth() + 1, 1);
    date.setDate(date.getDate() - 1);
    const lastDayOfMonth = date.getDate();
    const month = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    return `${currentYear}-${month}-${lastDayOfMonth}`;
  };
  const [startDate, setStartDate] = React.useState(startdateGetter());
  const [endDate, setEndDate] = React.useState(
    moment(new Date()).format("YYYY-MM-DD")
  );

  const [filter, setFilter] = React.useState(false);
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Col lg={12}>
            <Card>
              <CardHeader style={{ padding: "10px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h5 className="card-title mb-0">{heading}</h5>
                  <div style={{ marginLeft: "400px" }}>
                    <div style={{ width: "210px" }}>
                      <Flatpickr
                        // ref={refComp1}
                        className="form-control"
                        id="exampleInputdate"
                        // defaultValue={props.data.data?.start_date}
                        options={{
                          mode: "range",
                          // minDate: new Date("2023-01-16"),
                          // maxDate: new Date(Date.now() - 864e5)
                          maxDate: new Date(Date.now()),
                          defaultDate: [startDate, new Date(Date.now())],
                        }}
                        placeholder="Enter Filter Dates"
                        name="date"
                        onChange={(e) => {
                          console.log(e, "echeck");
                          if (e.length == 2) {
                            setFilter(!filter);
                          }

                          setStartDate(moment(e[0]).format("YYYY-MM-DD"));
                          setEndDate(moment(e[1]).format("YYYY-MM-DD"));
                        }}
                        // onChange={(e) => {
                        //   setStartDateDisp(e[0]);
                        //   setDate1(moment(e[0]).format("YYYY-MM-DD"));

                        // }}
                      />
                    </div>
                  </div>
                  <div>
                    <div style={{ height: "40px" }}></div>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <ReusableTableMain
                  searchMain={searchMain}
                  columns={columns}
                  data={data}
                />
              </CardBody>
            </Card>
          </Col>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ReusableTable;
