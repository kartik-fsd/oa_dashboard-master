import axios from "axios";
import React from "react";
import { Card, CardBody, CardHeader, Container } from "reactstrap";
import { invoiceList } from "../../assets/utils/farmingBase";
import { farming } from "../../globalConfig";
import InvoiceTable2020 from "./InvoiceTable2020";

const Invoice2020 = () => {
  document.title = "OnX | Finance";
  const [invtable, setInvTable] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [err, setErr] = React.useState(false);

  React.useEffect(() => {
    let link = farming.farming_URL + invoiceList;
    const body = {
      year: "2020",
    };
    axios
      .post(link, body)
      .then((res) => {
        setInvTable(res.data.invoices);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setErr(true);
      });
  }, []);
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
              <h5 className="card-title mb-0 fs-20">Invoice FY 20-21</h5>
            </CardHeader>
            <CardBody>
              {loading ? (
                <>Loading...</>
              ) : err ? (
                <>Something went wrong...!</>
              ) : (
                <InvoiceTable2020 invtable={invtable} />
              )}
            </CardBody>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default Invoice2020;
