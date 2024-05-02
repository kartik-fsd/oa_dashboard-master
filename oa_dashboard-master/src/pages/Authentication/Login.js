import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Label,
  Row,
  Button,
  Form,
  FormFeedback,
  Alert,
} from "reactstrap";
// import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";
import { useHistory } from "react-router-dom";

//redux
import { useSelector, useDispatch } from "react-redux";

import { withRouter, Link, useLocation, Redirect } from "react-router-dom";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

//Social Media Imports
// import { GoogleLogin } from "react-google-login";
// import TwitterLogin from "react-twitter-auth"
// import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
// actions
import { loginUser, socialLogin, resetLoginFlag } from "../../store/actions";

import logoLight from "../../assets/images/onxAwignDark.svg";
import { title } from "../../common/pathName";
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";
import axios from "axios";
import { getOtp } from "../../assets/utils/login";
import { api, business } from "../../globalConfig";
//Import config
// import { facebook, google } from "../../config";
//import images

const Login = (props) => {
  const dispatch = useDispatch();
  const [mbNumber, setmbNumber] = useState("");
  const [numberInvalid, setNumberInvalid] = useState(false);
  const history = useHistory();

  // const { user } = useSelector((state) => ({
  //   user: state.Account.user,
  // }));
  const [error, seterror] = useState("");
  const [pass, setPass] = useState(false);
  const [unauthorized, setUnAuthorized] = useState(false);

  // const [userLogin, setUserLogin] = useState([]);

  // useEffect(() => {
  //   if (user && user) {
  //     setUserLogin({
  //       email: user.user.email,
  //       password: user.user.confirm_password,
  //     });
  //   }
  // }, [user]);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "admin@taskmo.com" || "",
      password: "testing@123" || "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Mobile"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: (values) => {
      dispatch(loginUser(values, props.history));
    },
    onBlur: () => {},
  });

  // const { error } = useSelector((state) => ({
  //   error: state.Login.error,
  // }));

  // const signIn = (res, type) => {
  //   if (type === "google" && res) {
  //     const postData = {
  //       name: res.profileObj.name,
  //       email: res.profileObj.email,
  //       token: res.tokenObj.access_token,
  //       idToken: res.tokenId,
  //     };
  //     dispatch(socialLogin(postData, props.history, type));
  //   } else if (type === "facebook" && res) {
  //     const postData = {
  //       name: res.name,
  //       email: res.email,
  //       token: res.accessToken,
  //       idToken: res.tokenId,
  //     };
  //     dispatch(socialLogin(postData, props.history, type));
  //   }
  // };

  //handleGoogleLoginResponse
  // const googleResponse = (response) => {
  //   signIn(response, "google");
  // };

  //handleTwitterLoginResponse
  // const twitterResponse = e => {}

  //handleFacebookLoginResponse
  // const facebookResponse = (response) => {
  //   signIn(response, "facebook");
  // };

  // useEffect(() => {
  //   setTimeout(() => {
  //     dispatch(resetLoginFlag());
  //   }, 3000);
  // }, [dispatch, error]);

  //Title name dynamic
  const path = useLocation();
  const final = path.pathname.slice(1);
  const Cap = final.charAt(0).toUpperCase() + final.slice(1);
  document.title = `${title}`;
  const Mobile_Regex = new RegExp(/^[0]?[56789]\d{9}$/);
  const handlePassword = () => {
    setPass(!pass);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUnAuthorized(false);
    if (!Mobile_Regex.test(mbNumber)) {
      setNumberInvalid(true);
      return "";
    } else {
      setNumberInvalid(false);
    }
    const mobileNumber = {
      mobile_number: mbNumber,
    };
    const pathName = api.OA_URL + getOtp;

    const businessLoginUrl = business.BUSINESS_URL + "user-login";
    let dat = { phone: mbNumber };
    const headerEnter = {
      headers: {
        "x-auth-key": "mxhyz-bsmnr-pqknt",
      },
    };
    axios
      .post(businessLoginUrl, dat, headerEnter)
      .then((res) =>
        localStorage.setItem("businessToken", res?.data?.data[0]?.accessToken)
      )
      .catch((err) => console.log(err, "err"));

    axios
      .post(pathName, mobileNumber)
      .then((res) => {
        sessionStorage.setItem("mbnumber", mbNumber);
        setUnAuthorized(false);
        // <Redirect to="/enter-otp"/>
        history.push("/enter-otp");
      })
      .catch((e) => {
        setUnAuthorized(true);
      });
  };
  return (
    <React.Fragment>
      <ParticlesAuth>
        <div className="auth-page-content">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="text-center mt-sm-5 mb-4 text-white-50">
                  <div>
                    <Link to="/" className="d-inline-block auth-logo">
                      <img
                        src={logoLight}
                        alt="OnX-Awign"
                        height={80}
                        width={250}
                      />
                    </Link>
                  </div>
                  <p className="mt-3 fs-15 fw-medium text-light">
                    Login to access dashboard
                  </p>
                </div>
              </Col>
            </Row>
            {/* <Row>
          <Col lg={12}>
            <div className="auth-bg-black">
              <div className="text-center text-white-50 ">
                <div>
                  <Link to="/" className="d-inline-block auth-logo">
                    <img src={logoLight} alt="" height={80} width={250} />
                  </Link>
                </div>
                <p className="mt-3 fs-15 fw-medium">
                  Taskmo Admin & Performance Tracker
                </p>
              </div>
            </div>
          </Col>
        </Row> */}

            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <Card className="mt-4">
                  <CardBody className="p-4 mt-2">
                    <div className="text-center mt-2">
                      <h5 className="text-primary">Welcome Back !</h5>
                      <p className="text-muted">
                        Sign in to continue with OnX.
                      </p>
                    </div>
                    {error && error ? (
                      <Alert color="danger"> {error} </Alert>
                    ) : null}
                    <div className="p-2 mt-4">
                      <Form
                        // onSubmit={(e) => e.preventDefault()}
                        // onSubmit={(e) => {
                        //   e.preventDefault();
                        //   validation.handleSubmit();
                        //   return false;
                        // }}
                        onSubmit={handleSubmit}
                        // action="#"
                      >
                        <div className="mb-3">
                          <Label htmlFor="email" className="form-label">
                            Mobile Number
                          </Label>
                          <Input
                            name="email"
                            className="form-control"
                            placeholder="Enter Mobile Number"
                            // onChange={validation.handleChange}
                            onChange={(e) => setmbNumber(e.target.value)}
                            onBlur={validation.handleBlur}
                            value={mbNumber}
                            maxLength={10}
                            // invalid={
                            //   validation.touched.email &&
                            //   validation.errors.email
                            //     ? true
                            //     : false
                            // }
                            invalid={numberInvalid || unauthorized}
                          />

                          <FormFeedback type="invalid">
                            {/* {validation.errors.email} */}
                            {unauthorized
                              ? "unauthorized number"
                              : "Enter a valid Mobile Number"}
                          </FormFeedback>
                        </div>
                        {/* 
                        <div className="mb-3">
                          <div className="float-end">
                            <Link to="/forgot-password" className="text-muted">
                              Forgot password?
                            </Link>
                          </div>
                          <Label
                            className="form-label"
                            htmlFor="password-input"
                          >
                            Enter OTP
                          </Label>
                          <div className="position-relative auth-pass-inputgroup mb-3">
                            <Input
                              name="password"
                              value={validation.values.password || ""}
                              type={pass ? "text" : "password"}
                              className="form-control pe-5"
                              placeholder="Enter OTP"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              invalid={
                                validation.touched.password &&
                                validation.errors.password
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.password &&
                            validation.errors.password ? (
                              <FormFeedback type="invalid">
                                {validation.errors.password}
                              </FormFeedback>
                            ) : null}
                            <button
                              className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                              type="button"
                              id="password-addon"
                              onClick={handlePassword}
                            >
                              <i className="ri-eye-fill align-middle"></i>
                            </button>
                          </div>
                        </div> */}

                        {/* <div className="form-check">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="auth-remember-check"
                          />
                          <Label
                            className="form-check-label"
                            htmlFor="auth-remember-check"
                          >
                            Remember me
                          </Label>
                        </div> */}

                        <div className="mt-4">
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
                          >
                            Sign In With OTP
                          </Button>
                        </div>

                        {/* <div className="mt-4 text-center">
                        <div className="signin-other-title">
                          <h5 className="fs-13 mb-4 title">Sign In with</h5>
                        </div>
                        <div>
                          <Button color="dark" className="btn-icon">
                            <i className="ri-github-fill fs-16"></i>
                          </Button>{" "}
                          <Button color="info" className="btn-icon">
                            <i className="ri-twitter-fill fs-16"></i>
                          </Button>
                        </div>
                      </div> */}
                      </Form>
                    </div>
                  </CardBody>
                </Card>

                {/* <div className="mt-4 text-center">
                <p className="mb-0">
                  Don't have an account ?{" "}
                  <Link
                    to="/register"
                    className="fw-semibold text-primary text-decoration-underline"
                  >
                    {" "}
                    Signup{" "}
                  </Link>{" "}
                </p>
              </div> */}
              </Col>
            </Row>
          </Container>
          {/* <p>something</p> */}
        </div>
      </ParticlesAuth>
    </React.Fragment>
  );
};

export default withRouter(Login);
