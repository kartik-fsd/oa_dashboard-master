import axios from "axios";
import React from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import { invoiceList, getClient } from "../../assets/utils/farmingBase";
import { farming } from "../../globalConfig";
import { CreateInvoiceModal } from "./Invoice2022Modal";
import InvoiceTable2022 from "./InvoiceTable2022";
import CountUp from "react-countup";

const Invoice2022 = () => {
  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = React.useState(false);
  const [margin, setMargin] = React.useState("");
  const [payout, setPayout] = React.useState("");
  const [revenue, setRevenue] = React.useState("");
  const [datalist, setDatalist] = React.useState([]);
  const [invMod, setInvMod] = React.useState(false);
  const [clientData, setClientData] = React.useState([]);

  const indianNumbers = (num, len) => {
    return Number(num).toLocaleString("en-IN", {
      maximumFractionDigits: len,
    });
  };

  React.useEffect(() => {
    let link = farming.farming_URL + invoiceList;
    const data = {
      year: "2022",
    };
    setLoading(true);
    axios
      .post(link, data)
      .then((res) => {
        setMargin(res.data.margin);
        setPayout(res.data.payout);
        setRevenue(res.data.revenue);
        setDatalist(res.data.invoices);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
        setErr(true);
      });
  }, []);

  React.useEffect(() => {
    let link = farming.farming_URL + getClient;
    axios
      .get(link)
      .then((res) => {
        setClientData(res.data.client);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="page-content">
      {/* <ToastContainer /> */}

      <Container fluid>
        <Row style={{ gap: "143px" }}>
          <Col xs={"3"}>
            <Card className="card-animate overflow-hidden">
              <CardBody style={{ zIndex: "1" }}>
                <div
                  className="d-flex align-items-center justify-content-between"
                  style={{ fontWeight: "600" }}
                >
                  <p style={{ margin: "0px" }}>Payout</p>
                  <p style={{ margin: "0px" }}>
                    <CountUp start={0} end={payout} decimals={0} duration={3} />
                  </p>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xs={"3"}>
            <Card className="card-animate overflow-hidden">
              <CardBody style={{ zIndex: "1" }}>
                <div
                  className="d-flex align-items-center justify-content-between"
                  style={{ fontWeight: "600" }}
                >
                  <p style={{ margin: "0px" }}>Revenue</p>
                  <p style={{ margin: "0px" }}>
                    <CountUp
                      start={0}
                      end={revenue}
                      decimals={0}
                      duration={3}
                    />
                  </p>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xs={"3"}>
            <Card className="card-animate overflow-hidden">
              <CardBody style={{ zIndex: "1" }}>
                <div
                  className="d-flex align-items-center justify-content-between"
                  style={{ fontWeight: "600" }}
                >
                  <p style={{ margin: "0px" }}>Margin</p>
                  <p style={{ margin: "0px" }}>
                    <CountUp start={0} end={margin} decimals={0} duration={3} />
                  </p>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Card>
          <CardHeader
            className="d-flex justify-content-between"
            style={{ marginTop: "10px", padding: "13px" }}
          >
            <h5 className="card-title mb-0 fs-20">Invoice FY 22-23</h5>
            <div>
              <button
                type="button"
                className="btn"
                style={{
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
                onClick={() => setInvMod(!invMod)}
              >
                Create Invoice
              </button>
            </div>
          </CardHeader>
          <CardBody>
            {loading ? (
              <>Loading...</>
            ) : err ? (
              <>Something went wrong...!</>
            ) : (
              <InvoiceTable2022 datalist={datalist} />
            )}
          </CardBody>
        </Card>
      </Container>
      <CreateInvoiceModal
        invMod={invMod}
        setInvMod={setInvMod}
        clientData={clientData}
      />
    </div>
  );
};

export default Invoice2022;
