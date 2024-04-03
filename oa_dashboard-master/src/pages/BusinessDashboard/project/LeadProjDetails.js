import moment from "moment";
import React from "react";
import { Card, CardBody, Col, Row } from "reactstrap";

const LeadProjDetails = () => {
  return (
    <div style={{ padding: "12px" }}>
      <Card>
        <CardBody>
          <Row>
            <Col xs="12" className="mt-5">
              <div className="d-flex justify-content-between">
                <h5 className="text-primary mb-4">Lead Nurturing</h5>
                {/* {data?.project_intro_status == "0" ? (
                  <div>
                    <i
                      className=" ri-edit-box-line fs-20 text-primary cursor-pointer"
                      onClick={() => setOpen(!open)}
                    ></i>
                  </div>
                ) : (
                  <></>
                )} */}
              </div>

              <p style={{ fontWeight: "500", color: "#000" }}>
                What are we supposed to do?
              </p>
              <p className="text-muted" style={{ fontSize: "12px" }}>
                <div
                //   dangerouslySetInnerHTML={{ __html: data.supposed_to_do }}
                />
              </p>
              <hr style={{ marginTop: "24px" }}></hr>
            </Col>
            <Col xs="12" className="mt-2">
              <p style={{ fontWeight: "500", color: "#000" }}>
                What are the requirments?
              </p>
              <p className="text-muted" style={{ fontSize: "12px" }}>
                {/* <div dangerouslySetInnerHTML={{ __html: data.requirements }} /> */}
              </p>
              <hr style={{ marginTop: "24px", marginBottom: "24px" }}></hr>
            </Col>
            <Col xs="12" className="mt-2">
              <p style={{ fontWeight: "500", color: "#000" }}>
                What are the qualifying criteria?
              </p>
              <p className="text-muted" style={{ fontSize: "12px" }}>
                <div
                //   dangerouslySetInnerHTML={{ __html: data.qualifying_criteria }}
                />
              </p>
              <hr style={{ marginTop: "24px", marginBottom: "24px" }}></hr>
            </Col>
            <Col xs="12" className="mt-2">
              <p style={{ fontWeight: "500", color: "#000" }}>
                What are the rejection criteria?
              </p>
              <p className="text-muted" style={{ fontSize: "12px" }}>
                <div
                //   dangerouslySetInnerHTML={{ __html: data.rejection_criteria }}
                />
              </p>
              <hr style={{ marginTop: "24px", marginBottom: "24px" }}></hr>
            </Col>
            <Col xs="12" className="mt-2">
              <p style={{ fontWeight: "500", color: "#000" }}>
                What are your market population?
              </p>
              <p className="text-muted" style={{ fontSize: "12px" }}>
                <div
                //   dangerouslySetInnerHTML={{ __html: data.market_population }}
                />
              </p>
              <hr style={{ marginTop: "24px", marginBottom: "24px" }}></hr>
            </Col>
            <Col xs="12" className="mt-2">
              <p style={{ fontWeight: "500", color: "#000" }}>
                What are your market penetration and growth?
              </p>
              <p className="text-muted" style={{ fontSize: "12px" }}>
                <div
                //   dangerouslySetInnerHTML={
                //     {
                //       __html: data.market_penetration_and_growth,
                //     }
                //   }
                />
              </p>
              <hr style={{ marginTop: "24px", marginBottom: "24px" }}></hr>
            </Col>
            <Col xs="12" className="mt-2">
              <h5 className="mb-4 text-primary">Difficulty level</h5>
              <div className="d-flex gap-4 align-items-center">
                <label className="m-0 d-flex align-items-center text-dark">
                  <input
                    type="radio"
                    name="option"
                    value="Low"
                    // checked={data.difficulty_level == "Low" ? true : false}
                    // onChange={handleOptionChange}
                  />
                  <span style={{ marginLeft: "8px" }}>Low</span>
                </label>
                <br />
                <label className="m-0 d-flex align-items-center  text-dark">
                  <input
                    type="radio"
                    name="option"
                    value="Medium"
                    // checked={data.difficulty_level == "Medium" ? true : false}
                    // onChange={handleOptionChange}
                  />
                  <span style={{ marginLeft: "8px" }}>Medium</span>
                </label>
                <br />
                <label className="m-0 d-flex align-items-center  text-dark">
                  <input
                    type="radio"
                    name="option"
                    value="High"
                    // checked={data.difficulty_level == "High" ? true : false}
                    // onChange={handleOptionChange}
                  />
                  <span style={{ marginLeft: "8px" }}>High</span>
                </label>
              </div>

              <hr style={{ marginTop: "24px", marginBottom: "24px" }}></hr>
            </Col>
            <Col xs="12" className="mt-2">
              <h5 className="mb-4 text-primary">Deliverables</h5>
              <div>
                <table className="table caption-top table-nowrap">
                  <thead className="table-light">
                    <tr>
                      <th scope="col">Type</th>
                      <th scope="col">City/Language</th>
                      <th scope="col">Month-Year</th>
                      <th scope="col">Quantity</th>
                      {/* <th scope="col">Payment</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {/* {data.milestones?.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.type}</td>
                          <td>{item.type_value}</td>
                          <td>{moment(item.month).format("YYYY-MM-DD")}</td>
                          <td>{item.quantity}</td>
                        </tr>
                      );
                    })} */}
                  </tbody>
                </table>
              </div>

              <hr style={{ marginTop: "24px", marginBottom: "24px" }}></hr>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};

export default LeadProjDetails;
