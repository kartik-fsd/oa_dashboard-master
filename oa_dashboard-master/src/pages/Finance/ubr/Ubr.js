import axios from "axios";
import React from "react";
import { useLocation } from "react-router-dom";
import { Card, CardBody, CardHeader } from "reactstrap";
import { ubrDetails } from "../../../assets/utils/farmingBase";
import { api, farming } from "../../../globalConfig";
import UbrModal from "./UbrModal";
import UbrTable from "./UbrTable";
import { indianNumbers } from "../../../components/common/indianNumbers";
import { extract_token } from "../../../assets/utils/common";

const Ubr = () => {
  const [tbaleData, setTableData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const token = sessionStorage.getItem("token");
  const location = useLocation();

  //loader
  const [isLoading, setIsLoading] = React.useState(false);
  const [isErr, setIsErr] = React.useState(false);
  const [userData, setUserData] = React.useState([]);

  console.log(userData, "testingon");

  const getTokenDetails = () => {
    let tokenapi = api.VENDOR_URL + extract_token;
    setIsLoading(true);
    axios
      .get(tokenapi)
      .then((res) => {
        setIsLoading(false);
        setUserData({ role: res.data.role, type: res.data.type });
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  React.useEffect(() => {
    getTokenDetails();
  }, []);

  console.log(location.pathname, "location");

  React.useState(() => {
    const link = farming.farming_URL + ubrDetails;

    axios
      .get(link)
      .then((res) => setTableData(res.data))
      .catch((err) => console.log(err));
  }, []);
  return isLoading ? (
    <>...loading</>
  ) : isErr ? (
    <>something went wrong</>
  ) : (
    <div className="page-content">
      <Card>
        <CardHeader>
          <div className="d-flex justify-content-between">
            <h5
              className=" fw-600 fs-16"
              style={{
                letterSpacing: "2px",
                marginLeft: "15px",
                color: "#b83016",
              }}
            >
              UBR
            </h5>
            <div style={{ marginRight: "228px" }}>
              <div className="d-flex gap-4">
                <a
                  href={`${farming.farming_URL}/invoatoken/download/ubrDetails?token=${token}`}
                  download
                >
                  <i
                    className=" ri-download-2-line "
                    style={{
                      fontSize: "24px",
                      cursor: "pointer",
                      color: "#b83016",
                    }}
                  ></i>
                </a>
                <span
                  className="badge badge-soft d-flex align-items-center px-4  fs-16"
                  style={{ height: "40px", backgroundColor: "#f07d47" }}
                >
                  Total : {indianNumbers(tbaleData.total?.toFixed(2))}
                </span>
                {location.pathname == "/finance/ubr" &&
                  (userData?.type == "all" || userData?.type == "fin") && (
                    <button
                      type="button"
                      className="btn waves-effect waves-light"
                      style={{ backgroundColor: "#ec5c24" }}
                      onClick={() => setOpen(!open)}
                    >
                      <i className=" ri-add-line align-middle me-1"></i>
                      Add Invoice
                    </button>
                  )}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <UbrTable data={tbaleData} />
        </CardBody>
      </Card>
      <UbrModal setOpen={setOpen} open={open} />
    </div>
  );
};

export default Ubr;
