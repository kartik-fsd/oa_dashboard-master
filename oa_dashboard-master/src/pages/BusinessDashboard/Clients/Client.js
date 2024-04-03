import axios from "axios";
import React from "react";
import { Card, CardBody, CardHeader, Col } from "reactstrap";
import { client_list_business } from "../../../assets/utils/Business";
import { api } from "../../../globalConfig";
import BusinessClientTable from "./BusinessClientTable";

const Client = () => {
  const [clientList, setClientList] = React.useState([]);

  React.useEffect(() => {
    const link = api.TASKMO_URL + client_list_business;

    axios
      .get(link)
      .then((res) => setClientList(res.data.company_list))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="page-content">
      <Card>
        <CardHeader>
          <div className="d-flex align-items-center gap-4 ">
            <h5
              className="text-primary fw-600 fs-16"
              style={{ letterSpacing: "2px", marginLeft: "15px" }}
            >
              My Client
            </h5>

            <div>
              <Col xs="12">
                <Card className="m-0 " style={{ background: "#f0f4ff" }}>
                  <CardBody className="px-2 py-2">
                    <div className="d-flex align-items-center">
                      <div
                        className="avatar-xs flex-shrink-0"
                        style={{ height: "26px" }}
                      >
                        <span className="avatar-title bg-primary rounded fs-3">
                          <i
                            className=" ri-shopping-basket-line text-light "
                            style={{ fontSize: "16px" }}
                          ></i>
                        </span>
                      </div>
                      <div className="d-flex gap-5 align-items-center">
                        <div className="flex-grow-1 ps-3">
                          <h5 className="text-muted text-uppercase  mb-0 fs-11">
                            Total Client
                          </h5>
                        </div>
                        <div style={{ fontSize: "14px", fontWeight: "500" }}>
                          {clientList?.length}
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <BusinessClientTable data={clientList} />
        </CardBody>
      </Card>
    </div>
  );
};

export default Client;
