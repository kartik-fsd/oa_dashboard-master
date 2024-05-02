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
import { getAllpaymentRequest } from "../../../assets/utils/farmingBase";
import { farming } from "../../../globalConfig";
import ProcessRequestTable from "./ProcessRequestTable";

const ProcessRequest = () => {
  document.title = "Taskmo | Finance";
  const [leadData, setleadData] = React.useState({});
  const [updateboolProcess, setupdateBoolProcess] = React.useState(false);
  const [payment_stat, setPayment_stat] = React.useState("");

  React.useEffect(() => {
    let link = farming.farming_URL + getAllpaymentRequest;
    const data = {
      status: payment_stat,
    };

    axios
      .post(link, data)
      .then((res) => {
        setleadData(res.data.totalData);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [updateboolProcess, payment_stat]);

  const indianNumbers = (num, len) => {
    return Number(num).toLocaleString("en-IN", {
      maximumFractionDigits: len,
    });
  };
  return (
    <>
      <div className="page-content">
        {/* <ToastContainer /> */}

        <Container fluid>
          <Card>
            <CardHeader
              className="d-flex justify-content-between"
              style={{ marginTop: "10px", padding: "13px" }}
            >
              <h5 className="card-title mb-0 fs-20">Process Request</h5>
              <div>
                {/* <button
              className="btn" style={{
                      backgroundColor: "#ec5c24",
                      color: "whitesmoke",
                      transition: "background-color 0.3s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#dd4319")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#ec5c24")
                    }
              style={{ marginRight: "220px" }}
              onClick={() => {
                "";
              }}
            >
              <i
                className=" ri-filter-line"
                style={{
                  // display:'inline-block',
                  marginRight: "4px",
                  marginTop: "10px",
                  fontSize: "13px",
                }}
              ></i>
              Filter
            </button> */}
                {/* <button
                  type="button"
                  className="btn" style={{
                      backgroundColor: "#ec5c24",
                      color: "whitesmoke",
                      transition: "background-color 0.3s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#dd4319")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#ec5c24")
                    }
                  style={{ marginRight: "10px", minWidth: "105px" }}
                >
                  KL:{" "}
                  <span>
                    {indianNumbers(Math.floor(Number(leadData.kl), 2))}
                  </span>
                </button>
                <button
                  type="button"
                  className="btn" style={{
                      backgroundColor: "#ec5c24",
                      color: "whitesmoke",
                      transition: "background-color 0.3s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#dd4319")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#ec5c24")
                    }
                  style={{ marginRight: "8px", minWidth: "105px" }}
                >
                  CF:{" "}
                  <span>
                    {indianNumbers(Math.floor(Number(leadData.cf), 2))}
                  </span>
                </button> */}
                <button
                  type="button"
                  className="btn"
                  style={{
                    backgroundColor: "#ec5c24",
                    color: "whitesmoke",
                    transition: "background-color 0.3s ease",
                    marginRight: "18px",
                    minWidth: "105px",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#dd4319")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#ec5c24")
                  }
                >
                  Total:{" "}
                  <span>
                    {indianNumbers(Math.floor(Number(leadData.total), 2))}
                  </span>
                </button>
                <UncontrolledButtonDropdown
                  id="btnGroupDrop1"
                  style={{ marginRight: "220px" }}
                >
                  <DropdownToggle style={{ backgroundColor: "#ec5c24" }} caret>
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
                    <DropdownItem onClick={() => setPayment_stat("all")}>
                      All
                    </DropdownItem>
                    <DropdownItem onClick={() => setPayment_stat("processed")}>
                      Processed
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => setPayment_stat("notprocessed")}
                    >
                      Not Processed
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledButtonDropdown>
              </div>
            </CardHeader>
            <CardBody>
              <ProcessRequestTable leadData={leadData} />
            </CardBody>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default ProcessRequest;
