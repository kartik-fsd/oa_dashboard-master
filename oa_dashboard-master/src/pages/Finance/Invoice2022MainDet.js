import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import BreadCrumb from "../../components/common/BreadCrumb";

import classnames from "classnames";
import { indianNumbers } from "../../components/common/indianNumbers";
import PayoutDetailsTable from "./PayoutDetailsTable";
import {
  fseDetailsNoFo,
  getpaymentRequest,
  invoiceDetails,
} from "../../assets/utils/farmingBase";
import { farming } from "../../globalConfig";
import { useEffect } from "react";
import axios from "axios";
import "./inv2022.css";
import NoFoTable from "./NoFoTable/NoFoTable";
import Agreement from "./agreement/Agreement";
import InvoiceModal from "./InvoiceModal";
import Invoice from "./invoice/Invoice";

const Invoice2022MainDet = () => {
  const [lightNavTab, setlightNavTab] = useState("1");
  const [payoutData, setPayoutData] = useState({});
  const [billableTotal, setBillableTotal] = useState(0);
  const [leadData, setleadData] = useState([]);
  const [totalcount, setTotalcount] = useState(0);
  const [updateboolProcess, setupdateBoolProcess] = React.useState(false);
  const [dataListNofo, setDataListNofo] = React.useState({});
  const [indata, setIndata] = React.useState("");

  console.log(dataListNofo, "datalist");

  const location = useLocation();
  const { state } = location;
  const invoiceNo = state.data.invoice_id;
  const token = sessionStorage.getItem("token");
  //   const token = sessionStorage.getItem("token");
  console.log(location.pathname, "state");

  const lightNavToggle = (tab) => {
    if (lightNavTab !== tab) {
      setlightNavTab(tab);
    }
  };

  useEffect(() => {
    const link = farming.farming_URL + getpaymentRequest;
    const body = {
      invoice_id: state.data.invoice_id,
    };
    axios
      .post(link, body)
      .then((res) => {
        setBillableTotal(res.data.billable_total);
        setleadData(res.data.data);
        setTotalcount(res.data.total);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [updateboolProcess]);

  useEffect(() => {
    const link = farming.farming_URL + invoiceDetails;
    const postData = {
      invoice_id: state.data.invoice_id,
      year: "2022",
    };
    axios
      .post(link, postData)
      .then((res) => {
        setIndata(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const fseDeatailsNoFoData = async () => {
    const link = farming.farming_URL + fseDetailsNoFo;
    const data = { invoice_id: state.data.invoice_id };
    await axios
      .post(link, data)
      .then((res) => {
        setDataListNofo(res?.data?.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <div className="page-content">
        <BreadCrumb
          title={
            <div className="d-flex gap-2">
              <span>Invoice</span>
              <span
                className="badge rounded-pill"
                style={{
                  backgroundColor: "#ec5c24",
                  color: "#ffffff",
                }}
              >
                {state.data.invoice_id}
              </span>
            </div>
          }
          pageTitle="Project Leads"
        />
        <Container>
          <Col xxl={12} className="color">
            <Nav pills className="nav nav-pills nav-custom-light  mb-3">
              <NavItem>
                <NavLink
                  style={{ cursor: "pointer" }}
                  className={classnames({ active: lightNavTab === "1" })}
                  onClick={() => {
                    lightNavToggle("1");
                  }}
                >
                  Payout Details
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  style={{ cursor: "pointer" }}
                  className={classnames({ active: lightNavTab === "2" })}
                  onClick={() => {
                    lightNavToggle("2");
                    fseDeatailsNoFoData();
                  }}
                >
                  FSE Details
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  style={{ cursor: "pointer" }}
                  className={classnames({ active: lightNavTab === "3" })}
                  onClick={() => {
                    lightNavToggle("3");
                    fseDeatailsNoFoData();
                  }}
                >
                  Documents
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  style={{ cursor: "pointer" }}
                  className={classnames({ active: lightNavTab === "4" })}
                  onClick={() => {
                    lightNavToggle("4");
                  }}
                >
                  Invoice
                </NavLink>
              </NavItem>
            </Nav>
            {location.pathname == "/finance/inv22/maindetails" ? (
              <a
                href={`https://financebackend.onxtasks.com/invtoken/downloadinvoice2022/2022?invoice_id=${invoiceNo}&token=${token}`}
                target="_blank"
              >
                <i
                  className=" ri-download-cloud-2-fill text-secondary"
                  style={{
                    fontSize: "24px",
                    position: "relative",
                    top: "-53px",
                    // right: "0px",
                    left: "1046px",
                  }}
                ></i>
              </a>
            ) : (
              <></>
            )}

            <TabContent activeTab={lightNavTab} className="text-muted">
              <TabPane tabId="1" id="nav-light-home">
                <PayoutDetailsTable
                  leadData={leadData}
                  totalcount={totalcount}
                  data={state.data}
                  setupdateBoolProcess={setupdateBoolProcess}
                  updateboolProcess={updateboolProcess}
                />
              </TabPane>

              <TabPane tabId="2" id="nav-light-profile">
                <NoFoTable data={dataListNofo} />
              </TabPane>

              <TabPane tabId="3" id="nav-colored-messages">
                <Agreement data={state.data} />
              </TabPane>
              <TabPane tabId="4" id="nav-colored-messages">
                <Invoice
                  inData={indata}
                  innId={state.data.invoice_id}
                  year={"2022"}
                />
              </TabPane>
            </TabContent>
          </Col>
        </Container>
      </div>
    </>
  );
};

export default Invoice2022MainDet;
