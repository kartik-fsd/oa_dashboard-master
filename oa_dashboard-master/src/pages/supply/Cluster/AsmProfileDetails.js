import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { single_asm } from "../../../assets/utils/sow";
import { api } from "../../../globalConfig";

const AsmProfileDetails = () => {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [isErr, setIsErr] = React.useState(false);
  const [asmPrfData, setAsmPrfData] = React.useState({});
  const getAsmProfile = () => {
    setIsLoading(true);
    let apiData = api.VENDOR_URL + single_asm;
    let postData = {
      asm_id: id,
    };
    axios
      .post(apiData, postData)
      .then((res) => {
        setIsLoading(false);
        setAsmPrfData(res.data.asm[0]);
      })
      .catch((err) => setIsErr(true))
      .finally(() => setIsLoading(false));
  };

  React.useEffect(() => {
    getAsmProfile();
  }, []);
  return isLoading ? (
    <>...loading</>
  ) : isErr ? (
    <>something went wrong</>
  ) : (
    <>
      <div className="page-content">
        <Container fluid>
          <Card>
            <CardBody>
              <Row>
                <Col xs={12}>
                  <div style={{ display: "flex" }}>
                    <div>image</div>
                    <div>
                      <div>name</div>
                      <div>dob</div>
                    </div>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default AsmProfileDetails;
