import React, { useEffect } from "react";
import {
  Col,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Row,
  Button,
  Card,
  CardBody,
} from "reactstrap";

import image from "../../../assets/images/users/avatar-1.jpg";
import { isSafeInteger } from "lodash";
import { api } from "../../../globalConfig";
import axios from "axios";
import {
  add_issue,
  get_sow_issue,
  update_sow_issue,
  upload_issue_proof,
} from "../../../assets/utils/sow";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
let resizeTimer;

const Issues = () => {
  const { id } = useParams();
  let sow = id.split("-")[0];

  const [modal, setModal] = React.useState(false);
  const [modal2, setModal2] = React.useState(false);
  const [modal3, setModal3] = React.useState(false);
  const [issue, setIssue] = React.useState({});
  const [solution, setSolution] = React.useState({});
  const [file, setFile] = React.useState({});
  const [resdataname, setResDataName] = React.useState("");
  const [resurl, setResurl] = React.useState("");
  const [getissue, setGetIssue] = React.useState([]);
  const [issueproof, setIssueProof] = React.useState("");
  const [updateData, setUpdateData] = React.useState(false);
  const [updateDataone, setUpdateDataone] = React.useState(false);
  const hiddenFileInput = React.useRef(null);
  const [color, setColor] = React.useState("");
  const [width, setWidth] = React.useState(1200);

  const toggle = () => setModal(!modal);
  const toggle2 = () => setModal2(!modal2);
  const toggle3 = () => setModal3(!modal3);
  const token = sessionStorage.getItem("token");
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChange = (e) => {
    //   file.file = event.target.files[0];

    const path = api.AWS_URL + upload_issue_proof;
    const axiosData = new FormData();
    axiosData.append("file", e.target.files[0]);
    setResDataName("");
    axios
      .post(path, axiosData, token)
      .then((res) => {
        setResDataName(res?.data?.name);
        setResurl(res?.data?.url);
      })
      .catch((err) => console.log(err, "err"));
  };

  const handleIssueChange = (e) => {
    const { name, value } = e.target;
    setIssue({ ...issue, [name]: value });
  };

  const handleIssueSubmit = (e) => {
    e.preventDefault();
    let pathname = api.OA_URL + add_issue;
    let postData = {
      ...issue,
      issue_proof: resurl,
      sow_id: sow,
    };
    axios
      .post(pathname, postData)
      .then((res) => {
        setModal(false);
        if (res.data?.error) {
          toast(res.data?.message, {
            position: "top-center",
            hideProgressBar: true,
            closeOnClick: false,
            className: "bg-danger text-white",
          });
        } else {
          setResDataName("");
          toast("data created successfully", {
            position: "top-center",
            hideProgressBar: true,
            closeOnClick: false,
            className: "bg-success text-white",
          });
          setUpdateDataone(!updateDataone);
        }
      })
      .catch((err) => console.log(err, "err"));
  };

  useEffect(() => {
    let path = api.OA_URL + get_sow_issue;
    const data = {
      sow_id: sow,
    };
    axios
      .post(path, data, token)
      .then((res) => setGetIssue(res.data.issues))
      .catch((err) => console.log(err));
  }, [issueproof, updateData, updateDataone]);

  const handleSolutionChange = (e) => {
    const { name, value } = e.target;
    setSolution({ ...solution, [name]: value });
  };

  const handleSolutionSubmit = (e) => {
    e.preventDefault();
    solution.id = issueproof.id;
    const path = api.OA_URL + update_sow_issue;
    axios
      .put(path, solution, token)
      .then((res) => {
        setModal2(false);
        setUpdateData(!updateData);
      })
      .error((err) => console.log(err));
  };

  // function getRandomColor() {
  //   var letters = "0123456789ABCDEF".split("");
  //   var color = "#";
  //   for (var i = 0; i < 6; i++) {
  //     color += letters[Math.round(Math.random() * 15)];
  //   }
  //   return color;
  // }
  const handleResize = () => {
    // Debounce window resize
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => setWidth(window.innerWidth), 300);
  };
  useEffect(() => {
    setWidth(window.innerWidth);

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  React.useEffect(() => {
    function getRandomColor() {
      var letters = "0123456789ABCDEF".split("");
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.round(Math.random() * 15)];
      }
      return color;
    }
    setColor(getRandomColor());
  }, []);

  return (
    <div>
      <div>
        <div className="d-flex justify-content-between align-items-center w-80 px-4 mb-3">
          <h5 className="card-title mb-0">Issue List </h5>
          <div className="flex-shrink-0">
            <button className="btn btn-danger add-btn" onClick={toggle}>
              <i className="ri-add-line align-bottom"></i> Issues
            </button>
          </div>
        </div>
        {getissue?.map((el) => {
          const percentage = el.rating;

          return (
            <>
              <Card className="mb-2" onClick={() => setIssueProof(el)}>
                <CardBody>
                  <Row className="d-flex justify-content-center align-items-center">
                    <Col sm="auto">
                      <div className="d-flex flex-column align-items-center gap-1">
                        {el.profile_image !== "" ? (
                          <img
                            src={el.profile_image}
                            alt="img"
                            className="rounded-circle avatar-md"
                          />
                        ) : (
                          <div className="avatar-md">
                            <div
                              className="avatar-title rounded-circle   fs-4"
                              style={{ backgroundColor: color }}
                            >
                              {el.full_name[0]}
                            </div>
                          </div>
                        )}
                        <p
                          style={{
                            textTransform: "capitalize",
                            margin: "0px",
                            color: "black",
                          }}
                        >
                          {el.full_name}
                        </p>
                      </div>
                    </Col>
                    <Col sm="7" style={{ flexGrow: 1 }}>
                      <div>
                        <h5
                          className="fs-20 text-capitalize"
                          onClick={toggle3}
                          style={{
                            textDecoration: "underline",
                            cursor: "pointer",
                          }}
                        >
                          {el.issue_title}
                        </h5>
                        <div className="d-flex gap-2">
                          <p
                            className="fs-12 m-1"
                            style={{
                              //   textDecoration: "underline",
                              fontWeight: "bold",
                            }}
                          >
                            Problem:
                          </p>

                          <p
                            className="m-1"
                            style={{
                              wordBreak: "break-word",
                              fontSize: "12px",
                            }}
                          >
                            {el.issue_desc}
                          </p>
                        </div>
                        <div className="d-flex gap-2">
                          <div>
                            <p
                              className="fs-12 m-1"
                              style={{
                                // textDecoration: "underline",
                                fontWeight: "bold",
                              }}
                            >
                              Solution:
                            </p>
                          </div>

                          {el.his_work == "yes" && el.solution_desc == "" ? (
                            <div
                              className="d-flex align-items-center"
                              style={{
                                textDecoration: "underline",
                                fontSize: "12px",
                                minWidth: "80px",
                                color: "#405189",
                                cursor: "pointer",
                              }}
                              onClick={toggle2}
                            >
                              Add Solution
                            </div>
                          ) : (
                            ""
                          )}

                          <div className="d-flex align-items-center">
                            <p
                              style={{
                                wordBreak: "break-word",
                                fontSize: "12px",
                                margin: "0px",
                              }}
                            >
                              {el.solution_desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col sm="auto">
                      <div>
                        <div
                          style={{
                            display: "flex",
                            gap: "12px",
                            justifyContent: "flex-end",
                            flexBasis: "100%",
                          }}
                        >
                          <p>{el.issue_date}</p>
                          <p>{`-`}</p>
                          {el.solution_date === "no" ? (
                            ""
                          ) : (
                            <p>{el.solution_date} </p>
                          )}
                        </div>

                        {percentage === 0 || (
                          <div className="d-flex  gap-1">
                            <div
                              style={{
                                width: "auto",
                                height: "50px",
                                marginLeft: "auto",
                                color:
                                  percentage >= 80
                                    ? "#3BB75C"
                                    : percentage >= 50
                                    ? "#E3A600"
                                    : percentage > 0
                                    ? "#FF2929"
                                    : "",
                                fontWeight: "600",
                                fontSize: "22px",
                              }}
                            >
                              {percentage}%
                            </div>
                            <p
                              style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                marginTop: "7px",
                                marginBottom: "0px",
                                fontSize: "10px",
                                color: "black",
                              }}
                            >
                              {el.day_diff >= 1 ? (
                                <span>
                                  solvency in{" "}
                                  <span style={{ fontWeight: "600" }}>
                                    {el.day_diff} days
                                  </span>
                                </span>
                              ) : el.hour_diff > 0 ? (
                                <span>
                                  solvency in less than{" "}
                                  <span style={{ fontWeight: "600" }}>
                                    {el.hour_diff} hours
                                  </span>{" "}
                                </span>
                              ) : (
                                <span>
                                  solvency in less than{" "}
                                  <span style={{ fontWeight: "600" }}>
                                    1 hour
                                  </span>
                                </span>
                              )}
                            </p>
                          </div>
                        )}
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </>
          );
        })}
      </div>
      <Modal isOpen={modal} toggle={toggle} centered={true} size="lg">
        <ModalHeader className="p-3" toggle={toggle}>
          <h2>Issue</h2>
        </ModalHeader>
        <form onSubmit={handleIssueSubmit}>
          <ModalBody>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "24px" }}
            >
              <div>
                <Button
                  color="info"
                  onClick={handleClick}
                  style={{
                    width: "100%",
                    border: "none",
                    backgroundColor: resdataname === "" ? "grey" : "#3577f1",
                  }}
                >
                  {resdataname === "" ? (
                    <i
                      className=" bx bx-upload fs-14"
                      style={{ marginRight: "12px" }}
                    ></i>
                  ) : (
                    <i
                      className=" bx bx-file fs-18 "
                      style={{ marginRight: "12px" }}
                    ></i>
                  )}
                  {resdataname == "" ? (
                    <span className="mb-2">Upload a file </span>
                  ) : (
                    <span className="mb-2">{resdataname}</span>
                  )}
                </Button>
                <input
                  type="file"
                  name="file"
                  accept="application/pdf"
                  ref={hiddenFileInput}
                  onChange={handleChange}
                  style={{ display: "none" }}
                />
              </div>
              <div>
                <label htmlFor="issue-input" className="form-label">
                  Issue Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id=""
                  name="issue_title"
                  onChange={handleIssueChange}
                />
              </div>
              <div>
                <label htmlFor="issue-textarea" className="form-label">
                  Issue Description
                </label>
                <textarea
                  className="form-control"
                  id="issue-textarea"
                  name="issue_desc"
                  onChange={handleIssueChange}
                ></textarea>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              style={{ width: "16%" }}
              type="submit"
              disabled={
                Object.values(issue).includes("") ||
                resdataname == "" ||
                Object.values(issue).length == 0
              }
            >
              <span>
                <i className="ri ri-check-fill fs-14 align-bottom me-1"></i>
              </span>
              Submit
            </Button>
          </ModalFooter>
        </form>
      </Modal>

      <Modal isOpen={modal2} toggle={toggle2} centered={true} size="lg">
        <ModalHeader className="p-3" toggle={toggle2}>
          <div>
            <h2>Solution</h2>
          </div>
        </ModalHeader>
        <form onSubmit={handleSolutionSubmit}>
          <ModalBody>
            <div>
              <div>
                <textarea
                  className="form-control"
                  required
                  id="issue-textarea"
                  name="solution_desc"
                  onChange={handleSolutionChange}
                ></textarea>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "18px",
                    marginTop: "18px",
                  }}
                >
                  <label htmlFor="issue-input" className="form-label m-0">
                    <h5 className="m-0 b-500">Rating:</h5>
                  </label>

                  <div className="input-group" style={{ width: "20%" }}>
                    <input
                      type="number"
                      className="form-control"
                      name="rating"
                      min="0"
                      max="100"
                      required
                      onChange={handleSolutionChange}
                    />
                    <span className="input-group-text">%</span>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button style={{ width: "16%" }} type="submit">
              Submit
            </Button>
          </ModalFooter>
        </form>
      </Modal>
      <Modal
        issueproof={issueproof}
        isOpen={modal3}
        toggle={toggle3}
        centered={true}
        size="lg"
      >
        <ModalHeader> Issue Proof </ModalHeader>

        <ModalBody>
          <Document file={issueproof?.issue_proof} className="mt-5">
            <Page pageNumber={1} scale={width > 786 ? 1.3 : 0.6} />
          </Document>
        </ModalBody>
      </Modal>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default Issues;
