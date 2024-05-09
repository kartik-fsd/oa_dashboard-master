import axios from "axios";
import React from "react";
import { Button, Card, CardBody, Col, Label, Row } from "reactstrap";
import {
  check_client_email,
  create_client,
} from "../../../assets/utils/Business";
import { api } from "../../../globalConfig";
import Flatpickr from "react-flatpickr";
import moment from "moment";
import { successnotify, warningnotify } from "../../Toasts";
import { useHistory } from "react-router-dom";

const ClientDetails = ({ toggleTab, comId }) => {
  const [data, setData] = React.useState({});
  const [mail, setMail] = React.useState("");
  const [search, setSearch] = React.useState([]);
  const [openAlr, setOpenAlr] = React.useState(false);
  const [ext, setExt] = React.useState(false);
  const history = useHistory();

  console.log(comId, "com");

  const handleCheckClient = (e) => {
    e.preventDefault();
    const link = api.ONX_URL + check_client_email;
    axios
      .get(link, { params: { email: mail } })
      .then((res) => {
        setSearch(res.data.search);
        setExt(true);
        if (res.data.search?.length > 0) {
          setOpenAlr(true);
        } else setOpenAlr(false);
        console.log(res.data.search, "ser");
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = () => {
    const link = api.ONX_URL + create_client;
    data.company_id = comId;

    // if (id == undefined) {
    //   data.company_id = companyId;
    // } else {
    //   data.company_id = id;
    // }

    console.log(data, "jhgfh");
    const comp = Object.values(data);
    if (comp?.length >= 7 && !comp?.includes("")) {
      axios
        .post(link, data)
        .then((res) => {
          successnotify("success");
          toggleTab(3, 100);
          // setOpen(false);
          // client();
        })
        .catch((err) => warningnotify("oops something went wrong"))
        .finally(() => {
          setData({});
          setMail("");
        });
    } else {
      warningnotify("please fill all the details");
    }
  };
  return (
    <div>
      <Card>
        <CardBody>
          <form onSubmit={(e) => handleCheckClient(e)}>
            <div>
              <label htmlFor="basiInput" className="form-label">
                Enter Email Address
              </label>
              <input
                type="email"
                className="form-control"
                id="basiInput"
                onChange={(e) => {
                  setMail(e.target.value);
                  setData({ ...data, client_email: e.target.value });
                }}
              />
            </div>
            <div className="mt-4 d-flex justify-content-end">
              <button
                type="submit"
                className="btn  waves-effect waves-light"
                style={{ backgroundColor: "#ec5c24" }}
                disabled={mail == "" ? true : false}
                // onClick={() => handleCheckClient()}
              >
                <i className=" ri-arrow-down-line align-middle me-1"></i>
                Check
              </button>
            </div>
          </form>
        </CardBody>
      </Card>
      <Card>
        {ext && search?.length == 0 ? (
          <CardBody>
            <h5>Personal Details</h5>
            <Row>
              <Col xs="6" className="mt-4">
                <div>
                  <label htmlFor="basiInput" className="form-label">
                    Client Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="basiInput"
                    onChange={(e) =>
                      setData({ ...data, client_name: e.target.value })
                    }
                  />
                </div>
              </Col>
              <Col xs="6" className="mt-4">
                <div>
                  <label htmlFor="basiInput" className="form-label">
                    Phone
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="basiInput"
                    onInput={(e) =>
                      (e.target.value = Math.max(
                        0,
                        parseInt(e.target.value).toString().slice(0, 10)
                      ))
                    }
                    onChange={(e) =>
                      setData({ ...data, client_phone: e.target.value })
                    }
                  />
                </div>
              </Col>
              <Col xs="6" className="mt-4">
                <label htmlFor="basiInput" className="form-label">
                  Designation
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="basiInput"
                  onChange={(e) =>
                    setData({ ...data, client_designation: e.target.value })
                  }
                />
              </Col>
              <Col xs="6" className="mt-4">
                <div>
                  <Label className="form-label ">Join Date</Label>
                  <Flatpickr
                    className="form-control"
                    options={{
                      dateFormat: "d M, Y",
                    }}
                    onChange={(e) => {
                      setData({
                        ...data,
                        client_since: moment(e[0]).format("YYYY-MM-DD"),
                      });
                      // console.log(moment(e[0]).format("YYYY-MM-DD"), "ee");
                    }}
                  />
                </div>
              </Col>
              <Col xs="6" className="mt-4">
                <div>
                  <label htmlFor="basiInput" className="form-label">
                    Linkedin
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="basiInput"
                    onChange={(e) =>
                      setData({ ...data, client_linkedIn: e.target.value })
                    }
                  />
                </div>
              </Col>
              {/* <Col xs="6" className="mt-4">
                <div>
                  <label htmlFor="basiInput" className="form-label">
                    Company
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="basiInput"
                    onChange={(e) =>
                      setData({ ...data, company: e.target.value })
                    }
                  />
                </div>
              </Col> */}
            </Row>
            <div className="mt-4 d-flex justify-content-end">
              <div>
                {/* <button
                  type="button"
                  className="btn btn-outline-primary btn-label waves-effect waves-light w-xs px-2"
                  style={{ marginLeft: "10px" }}
                >
                  <i className="bx bx-reset align-middle fs-14 me-2"></i>
                  Reset
                </button> */}
                <button
                  type="button"
                  className="btn  btn-label waves-effect waves-light w-xs px-2"
                  style={{ marginLeft: "10px", backgroundColor: "#ec5c24" }}
                  onClick={() => handleSubmit()}
                >
                  <i className="bx bx-save align-middle fs-14 me-2 pt-1"></i>
                  Save
                </button>
              </div>
            </div>
          </CardBody>
        ) : (
          <></>
        )}
      </Card>
      {openAlr && (
        <div
          className="text-center mt-4 bg-soft-success "
          style={{ padding: "45px" }}
        >
          <p className="fs-20">Client already exists</p>
          <Button
            color="link"
            onClick={() =>
              history.push(
                `/business-dashboard/addclient/${search[0]?.client_id}`
              )
            }
          >
            Client Details
          </Button>
        </div>
      )}
    </div>
  );
};

export default ClientDetails;
