import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Col, Row } from "reactstrap";

const BreadCrumb = ({ title, pageTitle }) => {
  const history = useHistory();
  const location = useLocation();
  let loc = location.pathname.split("/");
  loc?.shift();
  loc?.pop();
  loc = loc.join("");
  return (
    <React.Fragment>
      <Row>
        <Col xs={12}>
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0 d-flex align-items-center">
              <span className="mx-4" onClick={() => history.goBack()}>
                <i className=" ri-arrow-left-line fs-20 cursor-pointer"></i>
              </span>
              {title}
            </h4>

            <div className="page-title-right">
              {/* <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <Link to="#" onClick={() => history.goBack()}>
                    {title}
                  </Link>
                </li>
              </ol> */}
            </div>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default BreadCrumb;
