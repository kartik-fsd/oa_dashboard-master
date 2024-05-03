import axios from "axios";
import React from "react";
import { useContext } from "react";
import { Card, CardBody, CardHeader, Container } from "reactstrap";
import { Context } from "../../../App";
import { supply_req } from "../../../assets/utils/SupplyApi";
import { farming } from "../../../globalConfig";
import { ManPowerModals } from "./ManPowerModals";
import ManPowerTable from "./ManPowerTable";

const ManPowerReq = () => {
  document.title = "OnX | Supply";
  const [data, setData] = React.useState([]);
  // const role = sessionStorage.getItem("role");

  const [context, setContext] = useContext(Context);
  // const role = sessionStorage.getItem("role");
  const role = context.oaDetials.role;
  console.log(context.oaDetials.role, "obj");
  React.useEffect(() => {
    const link = farming.farming_URL + supply_req;
    axios
      .get(link)
      .then((res) => setData(res.data.supply_req))
      .catch((err) => console.log(err));
  }, []);
  return (
    <React.Fragment>
      <div className="page-content">
        {/* <ToastContainer /> */}

        <Container fluid>
          <Card>
            <CardHeader
              className="d-flex justify-content-between"
              style={{ marginTop: "10px", padding: "13px" }}
            >
              <h5 className="card-title mb-0 fs-20">Supply Request</h5>

              {/* <button
                className="btn btn-primary  "
                style={{ marginRight: "220px" }}
              >
                <i
                  className="ri-add-line align-middle me-1 "
                  style={{ marginBottom: "30px" }}
                ></i>
                Add
              </button> */}
            </CardHeader>
            <CardBody>
              <ManPowerTable data={data} role={role} />
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ManPowerReq;
