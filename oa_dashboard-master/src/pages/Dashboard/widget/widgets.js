import React from "react";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Row } from "reactstrap";
// import { ecomWidgets } from "../../../common/data/dashboardEcommerce";

const Widgets = ({ earnings, leads, training }) => {
  const [ecomWidgets, seteComWidgets] = React.useState([]);

  React.useEffect(() => {
    const totalApproved = leads?.data?.approved_leads.reduce(
      (partialSum, a) => partialSum + a,
      0
    );

    const taskerRatio = (
      (earnings.direct / earnings.total_users) *
      100
    ).toFixed(0);
    const spRatio = (
      ((earnings.grouped + earnings.managed) / earnings.total_users) *
      100
    ).toFixed(0);
    const esTotal = earnings.phase3 + earnings.phase3 + earnings.phase3;
    const dataEnter = [
      {
        id: 1,
        cardColor: "primary",
        label: "Leads Ratio",
        badge: "ri-arrow-right-up-line",
        badgeClass: "success",
        percentage: "16.24",
        counter: Number(totalApproved).toString(),
        bgcolor: "success",
        icon: "bx bx-dollar-circle",
        decimals: 0,
        prefix: "",
        suffix: "",
      },
      {
        id: 2,
        cardColor: "secondary",
        label: "Training Ratio",
        badge: "ri-arrow-right-down-line",
        badgeClass: "danger",
        percentage: "-3.57",
        counter: Number(training?.data?.total_training).toString(),
        bgcolor: "info",
        icon: "bx bx-shopping-bag",
        decimals: 0,
        prefix: "",
        separator: ",",
        suffix: "",
      },
      {
        id: 3,
        cardColor: "success",
        label: "Network and SP Ratio",
        badge: "ri-arrow-right-up-line",
        badgeClass: "success",
        percentage: "+29.08",
        counter: `${taskerRatio}%-${spRatio}%`.toString(),
        bgcolor: "warning",
        icon: "bx bx-user-circle",
        decimals: 0,
        prefix: "",
        suffix: "",
      },
      {
        id: 4,
        cardColor: "info",
        label: "Earning Ratio",
        badgeClass: "muted",
        percentage: "+0.00",
        counter: esTotal.toFixed(0),
        bgcolor: "primary",
        icon: "bx bx-wallet",
        decimals: 2,
        prefix: "$",
        suffix: "k",
      },
    ];
    // console.log(dataEnter, "ecomWidgets");

    seteComWidgets(dataEnter);
  }, [earnings, training, leads]);

  console.log(earnings, "ecomWidgets");
  return (
    <React.Fragment>
      <Card className="crm-widget">
        <CardBody className="p-0">
          <Row className="row-cols-md-3 row-cols-1">
            {(ecomWidgets || []).map((item, key) => (
              <Col
                className={item.id === 4 ? "col-lg" : "col-lg border-end"}
                key={key}
              >
                <div className="mt-3 mt-md-0 py-4 px-3">
                  <h5 className="text-muted text-uppercase fs-13">
                    {item.label}{" "}
                  </h5>
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0">
                      <i className={"display-6 text-muted " + item.icon}></i>
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h2 className="mb-0">
                        <span className="counter-value">
                          {item?.counter != "NaN" ? item?.counter : "-"}
                        </span>
                      </h2>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default Widgets;
