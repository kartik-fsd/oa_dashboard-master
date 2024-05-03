import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Card, CardBody, Col, Container, Row, Button } from "reactstrap";
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";
import OtpInput from "react-otp-input";
//import images
// import logoLight from "../../../assets/images/logo-light.png";
import logoLight from "../../assets/images/onxAwignDark.svg";
import axios from "axios";
import { verifyOtp } from "../../assets/utils/login";
import { use } from "i18next";
import { api } from "../../globalConfig";

const BasicTwosVerify = () => {
  document.title = "OnX |Enter OTP";

  const mbNumber = sessionStorage.getItem("mbnumber");
  const [code, setCode] = useState("");
  const [incorrect, setIncorrect] = useState(false);
  const history = useHistory();

  const callenterOTP = () => {
    const businessLoginUrl = api.BUSINESS_URL + "user-login";

    const otpData = {
      mobile_number: mbNumber,
      otp: code,
    };
    const pathName = api.OA_URL + verifyOtp;

    axios
      .post(businessLoginUrl, { phone: otpData.mobile_number })
      .then((res) => {})
      .catch((err) => console.log(err, "err"));

    axios
      .post(pathName, otpData)
      .then((res) => {
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("checktype", res?.data?.type);
        sessionStorage.removeItem("mbnumber");

        if (
          res?.data?.type == "all" ||
          res?.data?.type == "om" ||
          res?.data?.role == "kam"
        ) {
          history.push("/my-projects/new");
        } else if (res?.data?.type == "management") {
          history.push("/management/dailytracking");
        } else if (res?.data?.type == "fin") {
          history.push("/finance/project/active");
        } else {
          history.push("/dashboard");
        }
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((e) => setIncorrect(true));
  };

  const handleChange = (code) => setCode(code);
  return (
    <React.Fragment>
      <>
        <main
          style={{
            backgroundImage: `url(${require("../../assets/images/LoginImage.webp")})`,
            width: "100%",
            height: "100vh",
          }}
        >
          {" "}
          <div className="bg-overlay"></div>
          <div className="auth-page-content">
            <Container>
              <Row>
                <Col lg={12}>
                  <div className="text-center mt-sm-5 mb-4 text-white-50">
                    <div>
                      <Link to="/login" className="d-inline-block auth-logo">
                        <img src={logoLight} alt="" height={80} width={250} />
                      </Link>
                    </div>
                    <p className="mt-3 fs-15 fw-medium text-light">
                      Login to access
                    </p>
                  </div>
                </Col>
              </Row>

              <Row className="justify-content-center">
                <Col md={8} lg={6} xl={5}>
                  <Card className="mt-4">
                    <CardBody className="p-4">
                      <div className="mb-4">
                        <div className="avatar-lg mx-auto">
                          <div
                            className="avatar-title bg-light  display-5 rounded-circle"
                            style={{ color: "#b83016" }}
                          >
                            <i className="ri-mail-line"></i>
                          </div>
                        </div>
                      </div>

                      <div className="p-2 mt-4">
                        <div className="text-muted text-center mb-4 mx-lg-3">
                          <h4 className="">Verify Your Number</h4>
                          <p>
                            Please enter the 4 digit code sent to{" "}
                            <span className="fw-semibold">{mbNumber}</span>
                          </p>
                        </div>

                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <OtpInput
                            value={code}
                            onChange={handleChange}
                            numInputs={4}
                            separator={<span style={{ width: "8px" }}></span>}
                            isInputNum={true}
                            shouldAutoFocus={true}
                            inputStyle={{
                              border: "1px solid #CFD3DB ",
                              borderRadius: "8px",
                              width: "54px",
                              height: "54px",
                              fontSize: "12px",
                              color: "#000",
                              fontWeight: "400",
                              caretColor: "blue",
                            }}
                            focusStyle={{
                              border: "1px solid #CFD3DB",
                              outline: "none",
                            }}
                          />
                        </div>

                        {/* <form>
                          <Row>
                            <Col className="col-3">
                              <div className="mb-3">
                                <label
                                  htmlFor="digit1-input"
                                  className="visually-hidden"
                                >
                                  Dight 1
                                </label>
                                <input
                                  type="text"
                                  className="form-control form-control-lg bg-light border-light text-center"
                                  maxLength="1"
                                  id="digit1-input"
                                  data-next="digit2-input"
                                />
                              </div>
                            </Col>

                            <Col className="col-3">
                              <div className="mb-3">
                                <label
                                  htmlFor="digit2-input"
                                  className="visually-hidden"
                                >
                                  Dight 2
                                </label>
                                <input
                                  type="text"
                                  className="form-control form-control-lg bg-light border-light text-center"
                                  maxLength="1"
                                  id="digit2-input"
                                />
                              </div>
                            </Col>

                            <Col className="col-3">
                              <div className="mb-3">
                                <label
                                  htmlFor="digit3-input"
                                  className="visually-hidden"
                                >
                                  Dight 3
                                </label>
                                <input
                                  type="text"
                                  className="form-control form-control-lg bg-light border-light text-center"
                                  maxLength="1"
                                  id="digit3-input"
                                />
                              </div>
                            </Col>

                            <Col className="col-3">
                              <div className="mb-3">
                                <label
                                  htmlFor="digit4-input"
                                  className="visually-hidden"
                                >
                                  Dight 4
                                </label>
                                <input
                                  type="text"
                                  className="form-control form-control-lg bg-light border-light text-center"
                                  maxLength="1"
                                  id="digit4-input"
                                />
                              </div>
                            </Col>
                          </Row>
                        </form> */}
                        {incorrect && (
                          <>
                            <Row>
                              <div className="text-muted text-center mb-4 mx-lg-3 mt-2">
                                <p style={{ color: "red" }}>
                                  Entered OTP is Incorrect
                                </p>
                              </div>
                            </Row>

                            <div>
                              <Button
                                // color="success"
                                className="btn w-100"
                                style={{
                                  backgroundColor: "#dd4319",
                                  color: "#ffffff",
                                  border: "none",
                                }}
                                type="submit"
                                onMouseEnter={(e) =>
                                  (e.target.style.backgroundColor = "#dd4319")
                                }
                                onMouseLeave={(e) =>
                                  (e.target.style.backgroundColor = "#ec5c24")
                                }
                                onClick={callenterOTP}
                              >
                                Confirm
                              </Button>
                            </div>
                          </>
                        )}
                        {!incorrect && (
                          <div className="mt-3">
                            <Button
                              // color="success"
                              className="btn w-100"
                              style={{
                                backgroundColor: "#dd4319",
                                color: "#ffffff",
                                border: "none",
                              }}
                              type="submit"
                              onMouseEnter={(e) =>
                                (e.target.style.backgroundColor = "#dd4319")
                              }
                              onMouseLeave={(e) =>
                                (e.target.style.backgroundColor = "#ec5c24")
                              }
                              onClick={callenterOTP}
                            >
                              Confirm
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardBody>
                  </Card>
                  <div className="mt-4 text-center text-light">
                    <p className="mb-0">
                      Didn't receive a code ?{" "}
                      <Link
                        to="/auth-pass-reset-basic"
                        className="fw-semibold text-decoration-underline"
                        style={{ color: "#fed8b1" }}
                      >
                        Resend
                      </Link>{" "}
                    </p>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </main>
      </>
    </React.Fragment>
  );
};

export default BasicTwosVerify;
