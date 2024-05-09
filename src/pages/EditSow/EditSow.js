import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  Col,
  Container,
  Nav,
  NavItem,
  Row,
  TabContent,
  NavLink,
  Button,
} from "reactstrap";
import classnames from "classnames";
import { TabPane, UncontrolledTooltip } from "reactstrap";
import "./EditSow.css";
import TaskerInfo from "./TaskerInfo";
import { api } from "../../globalConfig";
import { edit_sow, single_sow } from "../../assets/utils/sow";
import axios from "axios";
import TaskerProcess from "./TaskerProcess";
import CustomerProcess from "./CustomerProcess";
import { toast, ToastContainer } from "react-toastify";
import EditShowProjDet from "./EditShowProjDet";

const EditSow = () => {
  const { id } = useParams();
  const [data, setData] = React.useState(undefined);
  const [singleSowData, setSingleSowData] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [isErr, setIsErr] = React.useState(false);
  const [change, setChange] = React.useState(false);

  const [change1, setChange1] = React.useState(false);
  const [toastyes, setToastYes] = React.useState(false);

  const [customActiveTab, setcustomActiveTab] = useState("1");
  const toggleCustom = (tab) => {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  };

  console.log(data, "response data");

  const fileUpload = (e) => {
    const fileSelect = document.getElementById("resumeSel"),
      fileElem = document.getElementById("resumeEle");
    fileSelect.addEventListener(
      "click",
      function (e) {
        if (fileElem) {
          fileElem.click();
        }
      },
      false
    );
  };
  const pathname = api.VENDOR_URL + single_sow + `?sow_id=${id}`;
  const getdataedit = () => {
    setIsLoading(true);
    axios
      .get(pathname)
      .then((res) => {
        setIsLoading(false);
        setData(res.data);
      })
      .catch((err) => {
        setIsErr(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  React.useEffect(() => {
    setIsLoading(true);
    getdataedit();
  }, [change, change1]);

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    const apilink = api.OA_URL + edit_sow;
    singleSowData.sow_id = id;
    axios
      .patch(apilink, singleSowData)
      .then((res) => {
        if (res.data.error) {
          toast(res.data.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: false,
            className: "bg-warning text-white",
          });
        } else {
          toast("Successfully updated", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: false,
            className: "bg-success text-white",
          });
          // setChange1(!change1)
        }
      })
      .catch((err) => console.log(err));
  };
  return isLoading ? (
    <>...loading</>
  ) : isErr ? (
    <>something went wrong</>
  ) : (
    <>
      <div className="page-content">
        <Container fluid>
          <div>
            <Card>
              <CardBody>
                {/* <p className="text-muted">
                  Use <code>nav-tabs-custom</code> class to create custom tabs
                  with borders.
                </p> */}
                <Nav
                  tabs
                  className="nav nav-tabs nav-tabs-custom nav-success nav-justified mb-3"
                >
                  <NavItem>
                    <NavLink
                      style={{ cursor: "pointer" }}
                      className={classnames({
                        active: customActiveTab === "1",
                      })}
                      onClick={() => {
                        toggleCustom("1");
                      }}
                    >
                      Tasker Info
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      style={{ cursor: "pointer" }}
                      className={classnames({
                        active: customActiveTab === "2",
                      })}
                      onClick={() => {
                        toggleCustom("2");
                      }}
                    >
                      Tasker Process
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      style={{ cursor: "pointer" }}
                      className={classnames({
                        active: customActiveTab === "3",
                      })}
                      onClick={() => {
                        toggleCustom("3");
                      }}
                    >
                      Customer Process
                    </NavLink>
                  </NavItem>

                  <NavItem>
                    <NavLink
                      style={{ cursor: "pointer" }}
                      className={classnames({
                        active: customActiveTab === "4",
                      })}
                      onClick={() => {
                        toggleCustom("4");
                      }}
                    >
                      Project details
                    </NavLink>
                  </NavItem>
                </Nav>
                <form onSubmit={handleSubmitEdit}>
                  <TabContent
                    activeTab={customActiveTab}
                    className="text-muted"
                  >
                    <TabPane tabId="1" id="home1">
                      {data ? (
                        <TaskerInfo
                          data={data}
                          setChange={setChange}
                          change={change}
                          singleSowData={singleSowData}
                          setSingleSowData={setSingleSowData}
                        />
                      ) : (
                        ""
                      )}
                    </TabPane>
                    <TabPane tabId="2">
                      {data ? (
                        <TaskerProcess
                          data={data}
                          singleSowData={singleSowData}
                          setSingleSowData={setSingleSowData}
                        />
                      ) : (
                        ""
                      )}
                    </TabPane>
                    <TabPane tabId="3">
                      {data ? (
                        <CustomerProcess
                          data={data}
                          setChange={setChange}
                          change={change}
                          singleSowData={singleSowData}
                          setSingleSowData={setSingleSowData}
                          getdataedit={getdataedit}
                        />
                      ) : (
                        ""
                      )}
                    </TabPane>

                    <TabPane tabId="4">
                      {data?.data && (
                        <EditShowProjDet projectId={data.data.ref_project_id} />
                      )}
                    </TabPane>
                  </TabContent>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "flex-end",
                    }}
                  >
                    {customActiveTab != 4 && (
                      <Button type="submit">submit</Button>
                    )}
                  </div>
                </form>
              </CardBody>
            </Card>
          </div>
        </Container>
        {/* <ToastContainer/> */}
      </div>
    </>
  );
};

export default EditSow;
