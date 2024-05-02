import axios from "axios";
import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown,
} from "reactstrap";
import { getpaymentRequestOps } from "../../../assets/utils/farmingBase";
import { farming } from "../../../globalConfig";
import PaymentRequestTable from "./PaymentRequestTable";

const PaymentRequest = () => {
  // console.log("aurthur Schopenhauer");
  document.title = "Taskmo | Finance";
  const [data, setData] = React.useState([]);
  const [ops, setOps] = React.useState("");
  const [req, setReq] = React.useState("notprocessed");
  const [updated, setUpdated] = React.useState(false);
  const [showSplits, setShowSplits] = React.useState(true);

  const [spliData, setSpliData] = React.useState([]);
  const [spliData2, setSpliData2] = React.useState([]);

  React.useEffect(() => {
    let link = farming.farming_URL + getpaymentRequestOps;
    const body = {
      status: req,
    };

    axios
      .post(link, body)
      .then((res) => {
        let checkfilter = res.data.data.filter(
          (item) => item.status == "none" && item.split_status == "none"
        );
        setSpliData(checkfilter);

        let checkfilter2 = res.data.data;
        setSpliData2(checkfilter2);

        console.log(
          res.data.data,
          "testingdatacheck",
          checkfilter,
          checkfilter2
        );

        setData(res.data.data);
        setOps(res.data);
      })
      .catch((err) => console.log(err));
  }, [req, updated]);

  const indianNumbers = (num, len) => {
    return Number(num).toLocaleString("en-IN", {
      maximumFractionDigits: len,
    });
  };
  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Card>
            <CardHeader
              className="d-flex justify-content-between"
              style={{ marginTop: "10px", padding: "13px" }}
            >
              <h5 className="card-title mb-0 fs-20">Payment Request</h5>
              <div
                style={{ display: "flex", gap: "10px", marginRight: "220px" }}
              >
                <div>
                  <button
                    type="button"
                    className="btn"
                    style={{
                      backgroundColor: "#ec5c24",
                      color: "whitesmoke",
                      transition: "background-color 0.3s ease",
                      minWidth: "130px",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#dd4319")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#ec5c24")
                    }
                  >
                    Vendor: <span>{indianNumbers(ops.vendor, 2)}</span>
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="btn"
                    style={{
                      backgroundColor: "#ec5c24",
                      color: "whitesmoke",
                      transition: "background-color 0.3s ease",
                      minWidth: "130px",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#dd4319")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#ec5c24")
                    }
                  >
                    Tasker: <span>{indianNumbers(ops.tasker, 2)}</span>
                  </button>
                </div>
                <div>
                  {" "}
                  <button
                    type="button"
                    className="btn"
                    style={{
                      backgroundColor: "#ec5c24",
                      color: "whitesmoke",
                      transition: "background-color 0.3s ease",
                      minWidth: "130px",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#dd4319")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#ec5c24")
                    }
                  >
                    TSM: <span>{indianNumbers(ops.tsm, 2)}</span>
                  </button>
                </div>
                <div>
                  <UncontrolledButtonDropdown
                    id="btnGroupDrop1"
                    // style={{ marginRight: "220px" }}
                  >
                    <DropdownToggle
                      style={{ backgroundColor: "#ec5c24" }}
                      caret
                    >
                      <i
                        className=" ri-filter-line align-bottom"
                        style={{
                          // display:'inline-block',
                          marginRight: "4px",
                          marginTop: "10px",
                          fontSize: "13px",
                        }}
                      ></i>
                      Filter
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={() => setReq("all")}>
                        All
                      </DropdownItem>
                      <DropdownItem onClick={() => setReq("processed")}>
                        Processed
                      </DropdownItem>
                      <DropdownItem onClick={() => setReq("notprocessed")}>
                        Not Processed
                      </DropdownItem>
                      <DropdownItem onClick={() => setReq("rejected")}>
                        Rejected
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledButtonDropdown>
                </div>

                <div>
                  <UncontrolledButtonDropdown
                    id="btnGroupDrop1"
                    // style={{ marginRight: "220px" }}
                  >
                    <DropdownToggle
                      style={{ backgroundColor: "#ec5c24" }}
                      caret
                    >
                      <i
                        className=" ri-filter-line align-bottom"
                        style={{
                          // display:'inline-block',
                          marginRight: "4px",
                          marginTop: "10px",
                          fontSize: "13px",
                        }}
                      ></i>
                      Split Filter
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={() => setShowSplits(true)}>
                        Show Splits
                      </DropdownItem>
                      <DropdownItem onClick={() => setShowSplits(false)}>
                        All
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledButtonDropdown>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <PaymentRequestTable
                data={showSplits ? spliData : spliData2}
                updated={updated}
                setUpdated={setUpdated}
              />
            </CardBody>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default PaymentRequest;
