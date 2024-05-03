import axios from "axios";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Card, CardBody, CardHeader, Col } from "reactstrap";
import { Context } from "../../../App";
import { company_list_business } from "../../../assets/utils/Business";
import { api } from "../../../globalConfig";
import { AddCompanyModal } from "../Modals";
import AddCompnay from "./AddCompnay";
import BusinessCompanyTable from "./BusinessCompanyTable";

const BusinessCompany = () => {
  // const [open, setOpen] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const [context, setContext] = useContext(Context);

  const history = useHistory();
  document.title = "OnX | Business";
  const toggle = () => {
    setModal(!modal);
  };
  const [compList, setCompList] = React.useState([]);

  console.log(compList, "complist");

  React.useEffect(() => {
    const link = api.TASKMO_URL + company_list_business;
    axios
      .get(link)
      .then((res) => setCompList(res.data.company_list))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="page-content">
      <Card>
        <CardHeader>
          <div className="d-flex align-items-center  justify-content-between">
            <div className="d-flex align-items-center gap-4 ">
              <h5
                className=" fw-600 fs-16"
                style={{
                  letterSpacing: "2px",
                  marginLeft: "15px",
                  color: "#b83016",
                }}
              >
                My Company
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
                          <span
                            className="avatar-title  rounded "
                            style={{ backgroundColor: "#ec5c24" }}
                          >
                            <i
                              className=" ri-shopping-basket-line text-light"
                              style={{ fontSize: "16px" }}
                            ></i>
                          </span>
                        </div>
                        <div className="d-flex gap-5 align-items-center">
                          <div className="flex-grow-1 ps-3">
                            <h5 className="text-muted text-uppercase fs-11 mb-0">
                              Total Companies
                            </h5>
                          </div>
                          <div style={{ fontSize: "14px", fontWeight: "500" }}>
                            {compList?.length}
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </div>
            </div>
            {context.oaDetials.type == "business" && (
              <div style={{ marginRight: "228px" }}>
                <button
                  type="button"
                  className="btn  waves-effect waves-light"
                  onClick={() => history.push("/business-dashboard/addcompany")}
                >
                  <i className=" ri-add-fill align-middle me-1"></i>
                  Company
                </button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardBody>
          <BusinessCompanyTable data={compList} />
        </CardBody>
      </Card>
      {/* <AddCompnay open={open} setOpen={setOpen} /> */}
      <AddCompanyModal modal={modal} toggle={toggle} />
    </div>
  );
};

export default BusinessCompany;
