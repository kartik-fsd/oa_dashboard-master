import moment from "moment";
import React from "react";
import {
  Button,
  Col,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import Flatpickr from "react-flatpickr";
import axios from "axios";
import {
  check_gst,
  client_list_business,
  company_details,
  create_gst,
} from "../../../assets/utils/Business";
import { api } from "../../../globalConfig";
import { useHistory, useParams } from "react-router-dom";
import { successnotify, warningnotify } from "../../Toasts";

const AddgstDet = ({ open, setOpen, companyGst, setCheck, check }) => {
  const [gst, setGst] = React.useState("");
  const [data, setData] = React.useState({});
  const [search, setSearch] = React.useState([]);
  const [openAlr, setOpenAlr] = React.useState(false);
  const [ext, setExt] = React.useState(false);
  const [but, setbut] = React.useState(false);
  const history = useHistory();
  const { id } = useParams();

  const handleCheckGst = (e) => {
    e.preventDefault();

    const link = api.TASKMO_URL + check_gst;
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

  const company = () => {
    const compLink = api.TASKMO_URL + company_details;
    // const clientLink = api.TASKMO_URL + client_list_business;
    axios
      .get(compLink)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const handleSubmit = () => {
    const link = api.TASKMO_URL + create_gst;
    data.company_id = id;
    console.log(data, "data123");
    const comp = Object.values(data);

    if (comp?.length >= 6) {
      axios
        .post(link, data)
        .then((res) => {
          successnotify("success");
          setOpen(false);
          // company();
          setCheck(!check);
        })
        .catch((err) => warningnotify("oops something went wrong...!"))
        .finally(
          () => setData({}),
          setTimeout(() => {
            setbut(false);
          }, 1000)
        );
    } else {
      warningnotify("Please fill all the details");
      setTimeout(() => {
        setbut(false);
      }, 1000);
    }
  };

  const debounce = function (fn, d) {
    let timer;
    return function () {
      let context = this,
        args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(context, arguments);
      }, d);
    };
  };

  const betterFunction = debounce(handleSubmit, 3000);

  return (
    <div>
      <Modal
        isOpen={open}
        toggle={() => {
          setOpen(false);
          setExt(false);
          setGst("");
          setSearch([]);
          setOpenAlr(false);
          setData({});
        }}
        centered={true}
        size={"lg"}
      >
        <ModalHeader
          toggle={() => {
            setOpen(false);
            setOpen(false);
            setExt(false);
            setGst("");
            setSearch([]);
            setOpenAlr(false);
            setData({});
          }}
        >
          <h5 className=" m-0" style={{ color: "#b83016" }}>
            Add Gst
          </h5>
        </ModalHeader>
        <ModalBody>
          <Row>
            <form onSubmit={(e) => handleCheckGst(e)}>
              <Col xs="12">
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

                  <button
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
                    type="submit"
                    //   onClick={() => handleCheckClient()}
                  >
                    check
                  </button>
                </div>
              </Col>
            </form>
          </Row>
          {ext && search?.length == 0 ? (
            <Row className="mt-4 ">
              <h5 className="m-0 " style={{ color: "#b83016" }}>
                Gst Details
              </h5>
              {/* <Col xs="6" className="mt-4">
                <div>
                  <label htmlFor="labelInput" className="form-label">
                    GST
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="labelInput"
                    value={gst}
                    readOnly
                    onChange={(e) =>
                      setData({ ...data, client_name: e.target.value })
                    }
                  />
                </div>
              </Col> */}
              <Col xs="6" className="mt-4">
                <div>
                  <label htmlFor="labelInput" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="labelInput"
                    onChange={(e) =>
                      setData({ ...data, address: e.target.value })
                    }
                  />
                </div>
              </Col>
              <Col xs="6" className="mt-4">
                <div>
                  <label htmlFor="labelInput" className="form-label">
                    Pincode
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="labelInput"
                    // onInput={(e) =>
                    //   (e.target.value = Math.max(
                    //     0,
                    //     parseInt(e.target.value).toString().slice(0, 10)
                    //   ))
                    // }
                    onChange={(e) =>
                      setData({ ...data, pincode: e.target.value })
                    }
                  />
                </div>
              </Col>

              <Col xs="6" className="mt-4">
                <div>
                  <label htmlFor="labelInput" className="form-label">
                    City
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="labelInput"
                    onChange={(e) => setData({ ...data, city: e.target.value })}
                  />
                </div>
                {/* <div>
                  <Label className="form-label ">Since</Label>
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
                      console.log(moment(e[0]).format("YYYY-MM-DD"), "ee");
                    }}
                  />
                </div> */}
              </Col>
              <Col xs="6" className="mt-4">
                <div>
                  <label htmlFor="labelInput" className="form-label">
                    State
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="labelInput"
                    onChange={(e) =>
                      setData({ ...data, state: e.target.value })
                    }
                  />
                </div>
              </Col>
              <Col xs="6" className="mt-4">
                <div>
                  <label htmlFor="labelInput" className="form-label">
                    Country
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="labelInput"
                    // readOnly
                    //   value={companyName}
                    onChange={(e) =>
                      setData({ ...data, country: e.target.value })
                    }
                  />
                </div>
              </Col>
            </Row>
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
                  console.log("hii");
                }}
              >
                Company Details
              </Button>
            </div>
          )}
        </ModalBody>
        {ext && search?.length == 0 ? (
          <ModalFooter>
            <button
              type="button"
              className="btn  waves-effect waves-light"
              style={{ backgroundColor: "#ec5c24" }}
              onClick={() => {
                setbut(true);
                handleSubmit();
              }}
              disabled={but}
            >
              save
            </button>
          </ModalFooter>
        ) : (
          <></>
        )}
      </Modal>
    </div>
  );
};

export default AddgstDet;
