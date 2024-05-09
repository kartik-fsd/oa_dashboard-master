import React from "react";
import { Alert, Card, CardBody, Col, Row } from "reactstrap";

//Import Icons
import FeatherIcon from "feather-icons-react";

//import images
import illustarator from "../../assets/images/user-illustarator-2.png";
import { Link } from "react-router-dom";
import EcommerceProductDetail from "../Ecommerce/EcommerceProducts/EcommerceProductDetail";


const UpgradeAccountNotise = () => {
  return (
    <React.Fragment>
      <Row>
        <Col xs={12}>
          <Card>
            <CardBody className="p-0" style={{ height: "500px" }}>
             

              <Row className="align-items-end">
                <Col sm={8}>
                 <EcommerceProductDetail/>
                </Col>
                
               
                {/* <div
                  className="mt-3"
                  style={{ position: "absolute", bottom: "15px", left: "5px" }}
                >
                  <Link to="/pages-pricing" className="btn btn-success">
                    Upgrade Account!
                  </Link>
                </div> */}
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default UpgradeAccountNotise;
