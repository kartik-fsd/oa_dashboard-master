import axios from "axios";
import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Card, CardBody, Col, Label, Row } from "reactstrap";
import { check_gst, create_gst } from "../../../assets/utils/Business";
import { api } from "../../../globalConfig";
import { successnotify, warningnotify } from "../../Toasts";
import { AddGst } from "../Modals";

const Addgst = ({ toggleTab, comId }) => {
  const [modal, setModal] = React.useState(false);
  const [gst, setGst] = React.useState("");
  const [data, setData] = React.useState({});
  const [search, setSearch] = React.useState([]);
  const [openAlr, setOpenAlr] = React.useState(false);
  const [ext, setExt] = React.useState(false);
  const history = useHistory();

  const handleCheckGst = (e) => {
    e.preventDefault();

    const link = api.ONX_URL + check_gst;
    axios
      .get(link, { params: { gst: gst } })
      .then((res) => {
        setSearch(res.data.gsts);
        setExt(true);
        if (res.data.gsts?.length > 0) {
          setOpenAlr(true);
        } else setOpenAlr(false);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = () => {
    const link = api.ONX_URL + create_gst;
    // data.company_id = id;
    console.log(data, "data123");
    data.company_id = comId;
    const comp = Object.values(data);

    if (comp?.length >= 7 && !comp?.includes("")) {
      axios
        .post(link, data)
        .then((res) => {
          successnotify("success");
          history.push("/business-dashboard/company");
        })
        .catch((err) => warningnotify("oops something went wrong...!"))
        .finally(() => {
          setData({});
          setGst("");
        });
    } else {
      warningnotify("Please fill all the details");
    }
  };
  return (
    <div>
      <Card>
        <CardBody>
          <form onSubmit={(e) => handleCheckGst(e)}>
            <Row className="align-items-center ">
              <Col xs="10">
                <Label>Enter GST</Label>
                <div className="input-group">
                  <input
                    type="text"
                    required
                    className="form-control"
                    aria-label="Recipient's username with two button addons"
                    onChange={(e) => {
                      setGst(e.target.value);
                      setData({ ...data, gst: e.target.value });
                    }}
                  />
                </div>
              </Col>
              <Col xs="2">
                <button
                  type="submit"
                  className="btn  waves-effect waves-light mt-4"
                  style={{ backgroundColor: "#ec5c24" }}
                  disabled={gst == "" ? true : false}
                  // onClick={() => handleCheckGst()}
                >
                  Check
                </button>
              </Col>
            </Row>
          </form>
        </CardBody>
      </Card>
      {ext && search?.length == 0 ? (
        <Card>
          <CardBody>
            <div>
              <Row className="mt-4">
                <Col xs="6" className="mb-4">
                  <div>
                    <label htmlFor="address" className="form-label">
                      Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      placeholder=""
                      onChange={(e) =>
                        setData({ ...data, address: e.target.value })
                      }
                    />
                  </div>
                </Col>
                <Col xs="6" className="mb-4">
                  <div>
                    <label htmlFor="pincode" className="form-label">
                      Pincode
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="pincode"
                      placeholder=""
                      onChange={(e) =>
                        setData({ ...data, pincode: e.target.value })
                      }
                    />
                  </div>
                </Col>
                <Col xs="6" className="mb-4">
                  <div>
                    <label htmlFor="city" className="form-label">
                      City
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="city"
                      placeholder=""
                      onChange={(e) =>
                        setData({ ...data, city: e.target.value })
                      }
                    />
                  </div>
                </Col>
                <Col xs="6" className="mb-4">
                  <div>
                    <label htmlFor="pincode" className="form-label">
                      State
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="pincode"
                      placeholder=""
                      onChange={(e) =>
                        setData({ ...data, state: e.target.value })
                      }
                    />
                  </div>
                </Col>

                <Col xs="6" className="mb-4">
                  <div>
                    <label htmlFor="pincode" className="form-label">
                      Country
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="pincode"
                      placeholder=""
                      onChange={(e) =>
                        setData({ ...data, country: e.target.value })
                      }
                    />
                  </div>
                </Col>
              </Row>
              <div className="d-flex justify-content-end gap-2 mt-4 ">
                <button
                  type="button"
                  className="btn  btn-label waves-effect waves-light w-xs px-2"
                  style={{ marginLeft: "10px", backgroundColor: "#ec5c24" }}
                  onClick={() => handleSubmit()}
                >
                  <i className="bx bx-save align-middle me-1  fs-14 "></i>
                  Save
                </button>
              </div>
            </div>
          </CardBody>
        </Card>
      ) : (
        <></>
      )}

      {openAlr && (
        <div
          className="text-center mt-4 bg-soft-success "
          style={{ padding: "45px" }}
        >
          <p className="fs-20">Gst already exists</p>
          <Button
            color="link"
            onClick={() => {
              history.push(
                `/business-dashboard/company/${search[0]?.company_id}`
              );
            }}
          >
            Company Details
          </Button>
        </div>
      )}
    </div>
  );
};

export default Addgst;
